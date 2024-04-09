import { z } from "zod";

import {
    emptyDimensionalityParser,
    relationalDimensionalityParser,
    scalarDimensionalityParser,
    weakEdgeKindParser,
    weakNodeKindParser,
} from "./parsers";

export type WeakNodeKind = z.infer<typeof weakNodeKindParser>;

export type WeakEdgeKind = z.infer<typeof weakEdgeKindParser>;

export type EmptyDimensionality = z.infer<typeof emptyDimensionalityParser>;

export type ScalarDimensionality = z.infer<typeof scalarDimensionalityParser>;

export type RelationalDimensionality = z.infer<
    typeof relationalDimensionalityParser
>;
