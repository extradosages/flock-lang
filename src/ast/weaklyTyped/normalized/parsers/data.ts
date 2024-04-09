import { z } from "zod";
import {
    emptyDimensionalityParser,
    relationalDimensionalityParser,
    scalarDimensionalityParser,
} from "../../common";

export const weakNormalizedEmptyParser = z
    .object({
        dimensionality: emptyDimensionalityParser,
    })
    .strict();

export const weakNormalizedScalarParser = <Value>(value: z.ZodType<Value>) =>
    z
        .object({
            dimensionality: scalarDimensionalityParser,
            value,
        })
        .strict();

export const weakNormalizedScalar_ValueT_Parser = weakNormalizedScalarParser(
    z.unknown(),
);

export const weakNormalizedRelationalParser = z
    .object({ dimensionality: relationalDimensionalityParser })
    .strict();

export const weakNormalizedDataParser = z.discriminatedUnion("dimensionality", [
    weakNormalizedEmptyParser,
    weakNormalizedScalar_ValueT_Parser,
    weakNormalizedRelationalParser,
]);
