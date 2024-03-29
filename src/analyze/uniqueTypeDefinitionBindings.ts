import { NormalizedAst, isTypeDefinition } from "@flock/ast";

export const uniqueTypeDefinitionBindings = (
    ast: NormalizedAst<"library">,
): void => {
    const bindings = ast.nodes
        .filter(isTypeDefinition)
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
            `Duplicate type definitions found: ${duplicateBindings.join(", ")}`,
        );
    }
};
