import { readFileSync } from "fs";

import * as peggy from "peggy";

import * as ast from "../ast";

const sourcePath = "./grammar/library.pegjs";
export const source = readFileSync(sourcePath, "utf8");

export class Parser<Kind extends ast.StrongNodeKind = "library"> {
    #kind: Kind;
    #parser: peggy.Parser;

    constructor(rule?: Kind) {
        const kind = rule ?? ("library" as Kind);
        this.#kind = kind;
        this.#parser = peggy.generate(source, {
            allowedStartRules: [kind],
        });
    }

    parse(input: string): ast.NormalizedAst<Kind> {
        const tree = new ast.NormalizedAst(this.#kind);
        this.#parser.parse(input, { ast, tree });
        return tree;
    }
}
