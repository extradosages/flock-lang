import { z } from "zod";

import { emptyParser, relationalParser, scalarParser } from "./agnostic";

export const normalizedEmptyParser = emptyParser.strict();

export type NormalizedEmpty = z.infer<typeof normalizedEmptyParser>;

export type NormalizedScalar<Value> = {
    dimensionality: "scalar";
    value: Value;
};

export type NormalizedScalarǁ = NormalizedScalar<unknown>;

export const normalizedScalarParser = <Value>(value: z.ZodType<Value>) =>
    z.intersection(
        scalarParser.strict(),
        z.object({ value }).strict(),
    ) as z.ZodType<NormalizedScalar<Value>>;

export const normalizedRelationalParser = relationalParser.strict();

export type NormalizedRelational = z.infer<typeof normalizedRelationalParser>;

export type NormalizedData =
    | NormalizedEmpty
    | NormalizedScalarǁ
    | NormalizedRelational;
