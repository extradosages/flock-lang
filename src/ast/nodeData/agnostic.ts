import { z } from "zod";

export const emptyParser = z.object({ dimensionality: z.literal("empty") });

export type Empty = z.infer<typeof emptyParser>;

export const scalarParser = z.object({ dimensionality: z.literal("scalar") });

export type Scalar = z.infer<typeof scalarParser>;

export const relationalParser = z.object({
    dimensionality: z.literal("relational"),
});

export type RelationalParser = z.infer<typeof relationalParser>;
