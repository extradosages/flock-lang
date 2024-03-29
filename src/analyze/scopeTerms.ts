import {
    NormalizedAst,
    TermAstNodeUnknown,
    isTermDefinition,
    termAstNodeTypeParser,
} from "@flock/ast";

type Id = string;

type Scoping = Record<Id, Id[]>;

export const scopeTerms = (ast: NormalizedAst<"library">) => {
    const scoping: Scoping = {};

    const terms = ast.nodes.filter((node): node is TermAstNodeUnknown => {
        const nodeType = node.type;
        // @ts-expect-error `.includes` typing is messed up
        return termAstNodeTypeParser.options.includes(nodeType);
    });

    for (const term of terms) {
    }
};
