import { AstNodeUnknown } from "@flock/ast";
import { readFileSync } from "fs";

import * as peggy from "peggy";

const sourcePath = "./grammar/library.pegjs";
export const source = readFileSync(sourcePath, "utf8");

export const parser = peggy.generate(source, { allowedStartRules: ["source"] });

export const parse = (input: string) => parser.parse(input) as AstNodeUnknown[];
