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

export const uniqueTermDefinitionBindings = (
    ast: NormalizedAst<"library">,
): void => {
    const duplicates = execPipe(
        ast.graph.filterNodes((_, node) => node.kind === "termDefinition"),
        // We skip over loading the edges, since the only term binding neighbors are the
        // ones connected by `binding` edges
        flatMap((termDefinitionNodeId) =>
            ast.graph.filterOutNeighbors(
                termDefinitionNodeId,
                (_, node) => node.kind === "termBinding",
            ),
        ),
        map((termBindingNodeId) => ast.node<"termBinding">(termBindingNodeId)),
        splitGroups((termBindingNode) => termBindingNode.data.value),
        map(([key, group]) => [key, arrayFrom(group)] as const),
        filter(([_, group]) => getSize(group) > 1),
        apply(objectFrom<StrongNormalizedNode<"termBinding">>),
    );

    if (size(objectKeys(duplicates)) > 1) {
        throw new ErrorWithContext({ duplicates }, "Duplicate term bindings");
    }
};
