import { z } from "zod";

import {
    emptyDataParser,
    relationalDimensionalityParser,
} from "../../../common";
import { weakScalarData_Parser } from "../../common";

export const weakDenormalizedRelationalDataParser = <
    T,
    Value extends Record<string, T | T[]>,
>(
    value: z.ZodType<Value>,
) =>
    z
        .object({
            dimensionality: relationalDimensionalityParser,
            value,
        })
        .strict();

export const weakDenormalizedRelationalData_ValueT_Parser = <T>(
    t: z.ZodType<T>,
) =>
    weakDenormalizedRelationalDataParser(
        z.record(z.string(), z.union([t, z.array(t)])),
    );

export const weakDenormalizedRelationalData_TT_ValueT_Parser =
    weakDenormalizedRelationalData_ValueT_Parser(z.unknown());

export const weakDenormalizedRelationalData_Parser =
    weakDenormalizedRelationalData_TT_ValueT_Parser;

export const weakDenormalizedDataParser = z.union([
    emptyDataParser,
    weakScalarData_Parser,
    weakDenormalizedRelationalData_Parser,
]);
