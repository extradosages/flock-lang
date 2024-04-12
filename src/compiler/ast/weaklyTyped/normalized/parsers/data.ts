import { z } from "zod";

import {
    emptyDataParser,
    relationalDimensionalityParser,
} from "../../../common";
import { weakEdgeKindParser, weakScalarData_Parser } from "../../common";
import { WeakNormalizedRelationSpec } from "../types";

export const weakNormalizedRelationSpecParser = z.record(
    weakEdgeKindParser,
    z.object({ manyToOne: z.boolean() }),
);

export const weakNormalizedRelationalDataParser = <
    RelSpec extends WeakNormalizedRelationSpec,
>(
    relSpec: z.ZodType<RelSpec>,
) => {
    return z
        .object({
            dimensionality: relationalDimensionalityParser,
            value: z.undefined(),
            relSpec,
        })
        .strict();
};

export const weakNormalizedRelationalData_TypeT_Parser =
    weakNormalizedRelationalDataParser(weakNormalizedRelationSpecParser);

export const weakNormalizedRelationalData_Parser =
    weakNormalizedRelationalData_TypeT_Parser;

export const weakNormalizedDataParser = z.union([
    emptyDataParser,
    weakScalarData_Parser,
    weakNormalizedRelationalData_Parser,
]);
