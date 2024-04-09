import { z } from "zod";

import { enumeration } from "./enumeration";
import { strongNodeKindParser } from "./parsers";

export type Enumeration = typeof enumeration;

export type StrongNodeKind = z.infer<typeof strongNodeKindParser>;

export type StrongNodeKindOptions = typeof strongNodeKindParser.options;

export type StrongEdges<SourceKind extends StrongNodeKind> =
    Enumeration[SourceKind]["normalizedEdges"];

export type StrongEdgeKind<SourceKind extends StrongNodeKind> =
    keyof StrongEdges<SourceKind>;
