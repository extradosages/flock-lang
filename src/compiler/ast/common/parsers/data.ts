import { z } from "zod";

export const emptyDimensionalityParser = z.literal("empty");

export const scalarDimensionalityParser = z.literal("scalar");

export const relationalDimensionalityParser = z.literal("relational");

export const dimensionalityParser = z.union([
    emptyDimensionalityParser,
    scalarDimensionalityParser,
    relationalDimensionalityParser,
]);

export const emptyDataParser = z
    .object({
        dimensionality: emptyDimensionalityParser,
        // Value is here so that we can consistently index a data object with the `value` key
        // and typescript won't complain
        value: z.undefined(),
    })
    .strict();

export const scalarDataParser = <Value>(value: z.ZodType<Value>) =>
    z
        .object({
            dimensionality: scalarDimensionalityParser,
            value,
        })
        .strict();
