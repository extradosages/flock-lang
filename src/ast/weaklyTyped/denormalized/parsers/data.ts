import { z } from "zod";
import {
    emptyDimensionalityParser,
    relationalDimensionalityParser,
    scalarDimensionalityParser,
} from "../../common";

export const weakDenormalizedEmptyParser = z
    .object({ dimensionality: emptyDimensionalityParser })
    .strict();

export const weakDenormalizedScalarParser = <Value>(value: z.ZodType<Value>) =>
    z
        .object({
            dimensionality: scalarDimensionalityParser,
            value,
        })
        .strict();

export const weakDenormalizedScalar_ValueT_Parser =
    weakDenormalizedScalarParser(z.unknown());

export const weakDenormalizedRelationalParser = <
    RecordValue,
    Value extends Record<string, RecordValue | RecordValue[]>,
>(
    value: z.ZodType<Value>,
) =>
    z
        .object({
            dimensionality: relationalDimensionalityParser,
            value,
        })
        .strict();

export const weakDenormalizedRelational_ValueT_Parser = <RecordValue>(
    recordValue: z.ZodType<RecordValue>,
) =>
    weakDenormalizedRelationalParser<
        RecordValue,
        Record<string, RecordValue | RecordValue[]>
    >(z.record(z.string(), z.union([recordValue, z.array(recordValue)])));

export const weakDenormalizedRelational_ValueT_RecordValueT_Parser =
    weakDenormalizedRelational_ValueT_Parser(z.unknown());

export const weakDenormalizedDataParser = z.discriminatedUnion(
    "dimensionality",
    [
        weakDenormalizedEmptyParser,
        weakDenormalizedScalar_ValueT_Parser,
        weakDenormalizedRelational_ValueT_RecordValueT_Parser,
    ],
);
