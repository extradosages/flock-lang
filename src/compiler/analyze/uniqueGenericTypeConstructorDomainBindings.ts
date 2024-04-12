import {
    apply,
    arrayFrom,
    execPipe,
    filter,
    getSize,
    map,
    objectFrom,
    objectKeys,
    size,
    splitGroups,
} from "iter-tools";

import {
    NormalizedAst,
    StrongEdge_EdgeKindT_,
    StrongNormalizedNode,
} from "../ast";
import { ErrorWithContext } from "../util/errorsWithContext";

const duplicatesByNode = (
    ast: NormalizedAst<"library">,
    genericTypeConstructorNodeId: string,
) => {
    const duplicates = execPipe(
        ast.graph.filterOutEdges(
            genericTypeConstructorNodeId,
            (_, edge) =>
                (edge as StrongEdge_EdgeKindT_<"genericTypeConstructor">)
                    .kind === "domainTypeBindings",
        ),
        map((domainTypeBindingEdgeId) =>
            ast.graph.getEdgeAttribute(domainTypeBindingEdgeId, "targetId"),
        ),
        map((typeBindingNodeId) => ast.node<"typeBinding">(typeBindingNodeId)),
        splitGroups((typeBindingNode) => typeBindingNode.data.value),
        map(([key, group]) => [key, arrayFrom(group)] as const),
        filter(([_, group]) => getSize(group) > 1),
        apply(objectFrom<StrongNormalizedNode<"typeBinding">>),
    );

    const genericTypeConstructorNode = ast.node(genericTypeConstructorNodeId);

    return { duplicates, genericTypeConstructorNode };
};

export const uniqueGenericTypeConstructorDomainBindings = (
    ast: NormalizedAst<"library">,
): void => {
    const duplicates = execPipe(
        ast.graph.filterNodes(
            (_, node) => node.kind === "genericTypeConstructor",
        ),
        map((genericTypeConstructorNodeId) =>
            duplicatesByNode(ast, genericTypeConstructorNodeId),
        ),
        filter(({ duplicates }) => size(objectKeys(duplicates)) > 1),
        apply(arrayFrom),
    );

    if (getSize(duplicates) > 0) {
        throw new ErrorWithContext(
            { duplicates },
            "Duplicate generic type constructor domain type bindings",
        );
    }
};
