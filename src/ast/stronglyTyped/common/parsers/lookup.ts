import { enumeration } from "../enumeration";
import { Enumeration, StrongNodeKind } from "../types";

export const lookupParsers = <Kind extends StrongNodeKind>(
    kind: Kind,
): Enumeration[Kind] => enumeration[kind];
