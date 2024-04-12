import { fromPairs, groupBy } from "lodash";

import { NormalizedAst } from "../ast";
import { ErrorWithContext } from "../util/errorsWithContext";
import { Scopes } from "./scopes";

const resolveReference = (
    ast: NormalizedAst,
    scopes: Scopes,
    scopeTermBindings: Record<string, string[]>,
    scopeId: string,
    termReferenceIdentifier: string,
): string | undefined => {
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
            return resolveReference(
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
};

export const resolveTermReferences = (ast: NormalizedAst) => {
    const scopes = new Scopes(["lambdaConstructor"], ast);

    // Associate to each scope a set of term bindings.
    const termBindingNodeIds = ast.graph.filterNodes(
        (_, node) => node.kind === "termBinding",
    );

    const scopeTermBindings = groupBy(termBindingNodeIds, scopes.lookup);

    const termReferenceNodeIds = ast.graph.filterNodes(
        (_, node) => node.kind === "termReference",
    );

    const resolutions = termReferenceNodeIds.map((nodeId) => {
        // Look-up the scope id and the identifier for the resolution
        const scopeId = scopes.lookup(nodeId);
        const identifier = ast.node<"termReference">(nodeId).data.value;

        const resolution = resolveReference(
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

    return fromPairs(successes);
};
