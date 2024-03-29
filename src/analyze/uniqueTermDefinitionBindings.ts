import { NormalizedAst, isTermDefinition } from "@flock/ast";

export const uniqueTermDefinitionBindings = (
    ast: NormalizedAst<"library">,
): void => {
    const bindings = ast.nodes
        .filter(isTermDefinition)
        .map((node) => node.data.binding)
        .map(ast.deref)
        .map((node) => node.data);
    const counts = bindings.reduce(
        (counts: Record<string, number>, binding) => ({
            ...counts,
            [binding]: (counts[binding] ?? 0) + 1,
        }),
        {},
    );
    const duplicateBindings = Object.entries(counts)
        .filter(([, count]) => count > 1)
        .map(([identifier]) => identifier);
    if (duplicateBindings.length > 0) {
        throw new Error(
            `Duplicate term definitions found: ${duplicateBindings.join(", ")}`,
        );
    }
};
