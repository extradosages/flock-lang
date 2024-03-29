import { Ast, AstNodeUnknown } from "@flock/ast";
import { readFileSync } from "fs";

import * as peggy from "peggy";

const sourcePath = "./grammar/library.pegjs";
export const source = readFileSync(sourcePath, "utf8");

export class Parser {
    private parser: peggy.Parser;

    constructor(rule?: string) {
        rule = rule ?? "source";
        this.parser = peggy.generate(source, { allowedStartRules: [rule] });
    }

    parse(input: string, rule?: string) {
        rule = rule ?? "source";
        const ast = new Ast();
        this.parser.parse(input, { ast });
        return ast;
    }
}
