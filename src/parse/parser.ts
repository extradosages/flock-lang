import { readFileSync } from "fs";

import * as peggy from "peggy";

import * as flockAst from "../ast";
import {
    DenormalizedAst,
    NormalizedAst,
    StrongDenormalizedNode,
    StrongNodeKind,
} from "../ast";

const sourcePath = "./grammar/library.pegjs";
export const source = readFileSync(sourcePath, "utf8");

export class Parser<Kind extends StrongNodeKind = "library"> {
    #kind: Kind;
    #parser: peggy.Parser;

    constructor(rule?: Kind) {
        const kind = rule ?? ("library" as Kind);
        this.#kind = kind;
        this.#parser = peggy.generate(source, {
            allowedStartRules: [kind],
        });
    }

    parse(input: string) {
        const root: StrongDenormalizedNode<Kind> = this.#parser.parse(input, {
            flockAst,
        });
        debugger;
        return new DenormalizedAst(root).normalize();
    }
}
