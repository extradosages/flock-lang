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

export class Parser<RootKind extends StrongNodeKind = "library"> {
    #rootKind: RootKind;
    #parser: peggy.Parser;

    constructor(rule?: RootKind) {
        const rootKind = rule ?? ("library" as RootKind);
        this.#rootKind = rootKind;
        this.#parser = peggy.generate(source, {
            allowedStartRules: [rootKind],
        });
    }

    parse(input: string) {
        const root: StrongDenormalizedNode<RootKind> = this.#parser.parse(
            input,
            {
                flockAst,
            },
        );
        return new DenormalizedAst(root).normalize();
    }
}
