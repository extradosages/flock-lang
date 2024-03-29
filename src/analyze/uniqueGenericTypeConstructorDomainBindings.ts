import {
    AstNode,
    NormalizedAst,
    isGenericTypeConstructor,
    isLambdaConstructor,
} from "@flock/ast";

type genericTypeConstructorDuplicateBindings = {
    genericTypeConstructorId: string;
    duplicateDomainBindings: string[];
};

const genericTypeConstructorDuplicateBindings = (
    ast: NormalizedAst<"library">,
    genericTypeConstructorNode: AstNode<"genericTypeConstructor">,
): genericTypeConstructorDuplicateBindings => {
    const bindings = genericTypeConstructorNode.data.domainBindings
        .map(ast.deref)
        .map((node) => node.data);
    const counts = bindings.reduce(
        (counts: Record<string, number>, binding) => ({
            ...counts,
            [binding]: (counts[binding] ?? 0) + 1,
        }),
        {},
    );
    const duplicates = Object.entries(counts)
        .filter(([_, count]) => count > 1)
        .map(([binding]) => binding);

    return {
        genericTypeConstructorId: genericTypeConstructorNode.id,
        duplicateDomainBindings: duplicates,
    };
};

const formatByGenericTypeConstructor = (
    issue: genericTypeConstructorDuplicateBindings,
): string =>
    `(${issue.genericTypeConstructorId}: ${issue.duplicateDomainBindings.join(", ")})`;

const format = (issue: genericTypeConstructorDuplicateBindings[]): string =>
    `Duplicate domain bindings in generic type constructors: ${issue.map(formatByGenericTypeConstructor)}`;

export const uniqueGenericTypeConstructorDomainBindings = (
    ast: NormalizedAst<"library">,
): void => {
    const duplicates = ast.nodes
        .filter(isGenericTypeConstructor)
        .map((node) => genericTypeConstructorDuplicateBindings(ast, node))
        .filter((issue) => issue.duplicateDomainBindings.length > 0);

    if (duplicates.length > 0) {
        throw new Error(format(duplicates));
    }
};
