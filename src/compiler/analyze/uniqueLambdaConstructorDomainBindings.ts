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
    lambdaConstructorNodeId: string,
) => {
    const duplicates = execPipe(
        ast.graph.filterOutEdges(
            lambdaConstructorNodeId,
            (_, edge) =>
                (edge as StrongEdge_EdgeKindT_<"lambdaConstructor">).kind ===
                "domainTermBindings",
        ),
        map((domainTermBindingEdgeId) =>
            ast.graph.getEdgeAttribute(domainTermBindingEdgeId, "targetId"),
        ),
        map((termBindingNodeId) => ast.node<"termBinding">(termBindingNodeId)),
        splitGroups((termBindingNode) => termBindingNode.data.value),
        map(([key, group]) => [key, arrayFrom(group)] as const),
        filter(([_, group]) => getSize(group) > 1),
        apply(objectFrom<StrongNormalizedNode<"termBinding">>),
    );

    const lambdaConstructorNode = ast.node(lambdaConstructorNodeId);

    return { duplicates, lambdaConstructorNode };
};

export const uniqueLambdaConstructorDomainBindings = (
    ast: NormalizedAst<"library">,
): void => {
    const duplicates = execPipe(
        ast.graph.filterNodes((_, node) => node.kind === "lambdaConstructor"),
        map((lambdaConstructorNodeId) =>
            duplicatesByNode(ast, lambdaConstructorNodeId),
        ),
        filter(({ duplicates }) => size(objectKeys(duplicates)) > 1),
        apply(arrayFrom),
    );

    if (getSize(duplicates) > 0) {
        throw new ErrorWithContext(
            { duplicates },
            "Duplicate lambda constructor domain term bindings",
        );
    }
};
