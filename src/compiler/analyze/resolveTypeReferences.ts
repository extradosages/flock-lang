import { fromPairs, groupBy } from "lodash";

import { NormalizedAst } from "../ast";
import { ErrorWithContext } from "../util/errorsWithContext";
import { Scopes } from "./scopes";

type TypeResolution = Record<string, string>;

const kernel = (
    ast: NormalizedAst,
    scopes: Scopes,
    scopeTypeBindings: Record<string, string[]>,
    scopeId: string,
    typeReferenceIdentifier: string,
): string | undefined => {
    const localTypeBindingIds = scopeTypeBindings[scopeId];
    if (localTypeBindingIds === undefined) {
        throw new ErrorWithContext(
            { scopeId, scopeTypeBindings },
            "Scope not found",
        );
    }

    const resolution = localTypeBindingIds.find((typeBindingId) => {
        const typeBindingIdentifier =
            ast.node<"typeBinding">(typeBindingId).data.value;
        return typeBindingIdentifier === typeReferenceIdentifier;
    });

    if (resolution === undefined) {
        const scopeKind = ast.graph.getNodeAttribute(scopeId, "kind");

        if (scopeKind === "genericTypeConstructor") {
            const nextScopeId = scopes.lookup(scopeId);
            return kernel(
                ast,
                scopes,
                scopeTypeBindings,
                nextScopeId,
                typeReferenceIdentifier,
            );
        }

        if (scopeKind === "library") {
            return undefined;
        }

        throw new ErrorWithContext(
            { scopeId, scopeKind },
            'Scope kind is not `"library"` or `"genericTypeConstructor"`',
        );
    }

    return resolution;
};

export const resolveTypeReferences = (ast: NormalizedAst): TypeResolution => {
    const scopes = new Scopes(["genericTypeConstructor"], ast);

    // Associate to each scope a set of term bindings.
    const typeBindingNodeIds = ast.graph.filterNodes(
        (_, node) => node.kind === "typeBinding",
    );

    const scopeTypeBindings = groupBy(typeBindingNodeIds, (nodeId) =>
        scopes.lookup(nodeId),
    );

    const typeReferenceNodeIds = ast.graph.filterNodes(
        (_, node) => node.kind === "typeReference",
    );

    const resolutions = typeReferenceNodeIds.map((nodeId) => {
        // Look-up the scope id and the identifier for the resolution
        const scopeId = scopes.lookup(nodeId);
        const identifier = ast.node<"typeReference">(nodeId).data.value;

        const resolution = kernel(
            ast,
            scopes,
            scopeTypeBindings,
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
        const unresolvableTypeReferenceNodes = failures.map(([nodeId]) =>
            ast.node<"typeReference">(nodeId),
        );

        throw new ErrorWithContext(
            { unresolvableTypeReferenceNodes },
            "Failed to resolve type references",
        );
    }

    // Separate out the successes and return a map
    const successes = resolutions.filter(
        (pair): pair is [string, string] => pair[1] !== undefined,
    );

    return fromPairs(successes);
};
