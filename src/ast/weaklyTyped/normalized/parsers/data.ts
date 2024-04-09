import { z } from "zod";

import {
    emptyDataParser,
    relationalDimensionalityParser,
} from "../../../common";
import { weakScalarData_Parser } from "../../common";

export const weakNormalizedRelationalDataParser = z
    .object({ dimensionality: relationalDimensionalityParser })
    .strict();

export const weakNormalizedDataParser = z.union([
    emptyDataParser,
    weakScalarData_Parser,
    weakNormalizedRelationalDataParser,
]);
