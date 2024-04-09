import { z } from "zod";

import { enumeration, strongNodeKinds } from "./enumeration";
import { Enumeration, StrongNodeKind } from "./types";

export const strongNodeKindParser = z.enum(strongNodeKinds);

export const strongAstParsers = <Kind extends StrongNodeKind>(
    kind: Kind,
): Enumeration[Kind] => enumeration[kind];
