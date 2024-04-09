import { z } from "zod";

import { scalarDataParser } from "../../../common";

export const weakScalarData_ValueT_Parser = scalarDataParser(z.unknown());

export const weakScalarData_Parser = weakScalarData_ValueT_Parser;
