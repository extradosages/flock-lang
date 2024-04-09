import { z } from "zod";

import {
    dimensionalityParser,
    emptyDataParser,
    scalarDataParser,
} from "./parsers";

export type Dimensionality = z.infer<typeof dimensionalityParser>;

export type EmptyData<Value = unknown> = z.infer<typeof emptyDataParser>;

export type ScalarData<Value> = z.infer<
    ReturnType<typeof scalarDataParser<Value>>
>;
