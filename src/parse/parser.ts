import { AstNodeTypeUnknown, NormalizedAst } from "@flock/ast";
import { readFileSync } from "fs";

import * as peggy from "peggy";

const sourcePath = "./grammar/library.pegjs";
export const source = readFileSync(sourcePath, "utf8");

export class Parser<RootNodeType extends AstNodeTypeUnknown = "library"> {
    rootNodeType: RootNodeType;
    private parser: peggy.Parser;

    constructor(rule?: RootNodeType) {
        const rootNodeType = rule ?? ("library" as RootNodeType);
        this.rootNodeType = rootNodeType;
        this.parser = peggy.generate(source, {
            allowedStartRules: [rootNodeType],
        });
    }

    parse(input: string): NormalizedAst<RootNodeType> {
        const ast = new NormalizedAst(this.rootNodeType);
        this.parser.parse(input, { ast });
        return ast;
    }
}
