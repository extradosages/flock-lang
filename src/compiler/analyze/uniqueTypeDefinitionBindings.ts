import {
    apply,
    arrayFrom,
    execPipe,
    filter,
    flatMap,
    getSize,
    map,
    objectFrom,
    objectKeys,
    size,
    splitGroups,
} from "iter-tools";

import { NormalizedAst, StrongNormalizedNode } from "../ast";
import { ErrorWithContext } from "../util/errorsWithContext";

export const uniqueTypeDefinitionBindings = (
    ast: NormalizedAst<"library">,
): void => {
    const duplicates = execPipe(
        ast.graph.filterNodes((_, node) => node.kind === "typeDefinition"),
        // We skip over loading the edges, since the only term binding neighbors are the
        // ones connected by `binding` edges
        flatMap((typeDefinitionNodeId) =>
            ast.graph.filterOutNeighbors(
                typeDefinitionNodeId,
                (_, node) => node.kind === "typeBinding",
            ),
        ),
        map((typeBindingNodeId) => ast.node<"typeBinding">(typeBindingNodeId)),
        splitGroups((typeBindingNode) => typeBindingNode.data.value),
        map(([key, group]) => [key, arrayFrom(group)] as const),
        filter(([key, group]) => getSize(group) > 1),
        apply(objectFrom<StrongNormalizedNode<"typeBinding">>),
    );

    if (size(objectKeys(duplicates)) > 0) {
        throw new ErrorWithContext({ duplicates }, "Duplicate type bindings");
    }
};
