import { z } from "zod";
import { idParser } from "../../../id";
import { WeakNormalizedData } from "../types";
import { weakNormalizedDataParser } from "./data";

export const weakNormalizedNodeParser = <
    Kind extends string,
    Data extends WeakNormalizedData,
>(
    kind: z.ZodType<Kind>,
    data: z.ZodType<Data>,
) =>
    z
        .object({
            data,
            id: idParser,
            kind,
        })
        .strict();

export const weakNormalizedNode_KindT_Parser = <
    Data extends WeakNormalizedData,
>(
    data: z.ZodType<Data>,
) => weakNormalizedNodeParser(z.string(), data);

export const weakNormalizedNode_DataT_Parser = <Kind extends string>(
    kind: z.ZodType<Kind>,
) => weakNormalizedNodeParser(kind, weakNormalizedDataParser);

export const weakNormalizedNode_KindT_DataT_Parser = weakNormalizedNodeParser(
    z.string(),
    weakNormalizedDataParser,
);
