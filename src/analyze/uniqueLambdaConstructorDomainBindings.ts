import { AstNode, NormalizedAst, isLambdaConstructor } from "@flock/ast";

type LambdaDuplicateBindings = {
    lambdaId: string;
    duplicateDomainBindings: string[];
};

const lambdaDuplicateBindings = (
    ast: NormalizedAst<"library">,
    lambdaNode: AstNode<"lambdaConstructor">,
): LambdaDuplicateBindings => {
    const bindings = lambdaNode.data.domainBindings
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

    return { lambdaId: lambdaNode.id, duplicateDomainBindings: duplicates };
};

const formatByLambda = (issue: LambdaDuplicateBindings): string =>
    `(${issue.lambdaId}: ${issue.duplicateDomainBindings.join(", ")})`;

const format = (issue: LambdaDuplicateBindings[]): string =>
    `Duplicate domain bindings in lambda constructors: ${issue.map(formatByLambda)}`;

export const uniqueLambdaConstructorDomainBindings = (
    ast: NormalizedAst<"library">,
): void => {
    const duplicates = ast.nodes
        .filter(isLambdaConstructor)
        .map((node) => lambdaDuplicateBindings(ast, node))
        .filter((issue) => issue.duplicateDomainBindings.length > 0);

    if (duplicates.length > 0) {
        throw new Error(format(duplicates));
    }
};
