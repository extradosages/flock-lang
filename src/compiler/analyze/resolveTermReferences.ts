import { fromPairs, groupBy } from "lodash";

import { NormalizedAst } from "../ast";
import { ErrorWithContext } from "../util/errorsWithContext";
import { Scopes } from "./scopes";

export class TermResolution {
    #lookup: Record<string, string>;

    #kernel(
        ast: NormalizedAst,
        scopes: Scopes,
        scopeTermBindings: Record<string, string[]>,
        scopeId: string,
        termReferenceIdentifier: string,
    ): string | undefined {
        const localTermBindingIds = scopeTermBindings[scopeId];
        if (localTermBindingIds === undefined) {
            throw new ErrorWithContext(
                { scopeId, scopeTermBindings },
                "Scope not found",
            );
        }

        const resolution = localTermBindingIds.find((termBindingId) => {
            const termBindingIdentifier =
                ast.node<"termBinding">(termBindingId).data.value;
            return termBindingIdentifier === termReferenceIdentifier;
        });

        if (resolution === undefined) {
            const scopeKind = ast.graph.getNodeAttribute(scopeId, "kind");

            if (scopeKind === "lambdaConstructor") {
                const nextScopeId = scopes.lookup(scopeId);
                return this.#kernel(
                    ast,
                    scopes,
                    scopeTermBindings,
                    nextScopeId,
                    termReferenceIdentifier,
                );
            }

            if (scopeKind === "library") {
                return undefined;
            }

            throw new ErrorWithContext(
                { scopeId, scopeKind },
                'Scope kind is not `"library"` or `"lambdaConstructor"`',
            );
        }

        return resolution;
    }

    constructor(ast: NormalizedAst) {
        const scopes = new Scopes(["lambdaConstructor"], ast);

        // Associate to each scope a set of term bindings.
        const termBindingNodeIds = ast.graph.filterNodes(
            (_, node) => node.kind === "termBinding",
        );

        const scopeTermBindings = groupBy(termBindingNodeIds, (nodeId) =>
            scopes.lookup(nodeId),
        );

        const termReferenceNodeIds = ast.graph.filterNodes(
            (_, node) => node.kind === "termReference",
        );

        const resolutions = termReferenceNodeIds.map((nodeId) => {
            // Look-up the scope id and the identifier for the resolution
            const scopeId = scopes.lookup(nodeId);
            const identifier = ast.node<"termReference">(nodeId).data.value;

            const resolution = this.#kernel(
                ast,
                scopes,
                scopeTermBindings,
                scopeId,
                identifier,
            );

            return [nodeId, resolution] as const;
        });

        // Separate out the failures and throw if there are any.
        const failures = resolutions.filter(
            ([_, resolution]) => resolution === undefined,
        );

        if (failures.length > 0) {
            const unresolvableTermReferenceNodes = failures.map(([nodeId]) =>
                ast.node<"termReference">(nodeId),
            );

            throw new ErrorWithContext(
                { unresolvableTermReferenceNodes },
                "Failed to resolve term references",
            );
        }

        // Separate out the successes and return a map
        const successes = resolutions.filter(
            (pair): pair is [string, string] => pair[1] !== undefined,
        );

        this.#lookup = fromPairs(successes);
    }

    lookup(termReferenceNodeId: string): string {
        const resolution = this.#lookup[termReferenceNodeId];

        if (resolution === undefined) {
            throw new ErrorWithContext(
                { termReferenceNodeId },
                "Term reference unresolvable",
            );
        }

        return resolution;
    }
}
