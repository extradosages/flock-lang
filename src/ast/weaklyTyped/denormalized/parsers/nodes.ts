import { z } from "zod";

import { nodeIdParser } from "../../../id";
import { WeakDenormalizedData } from "../types";
import { WeakNodeKind } from "../../common/types";
import { weakNodeKindParser } from "../../common/parsers";

import { weakDenormalizedDataParser } from "./data";

export const weakDenormalizedNodeParser = <
    Kind extends WeakNodeKind,
    Data extends WeakDenormalizedData,
>(
    kind: z.ZodType<Kind>,
    data: z.ZodType<Data>,
) =>
    z
        .object({
            data,
            id: nodeIdParser,
            kind,
        })
        .strict();

export const weakDenormalizedNode_KindT_Parser = <
    Data extends WeakDenormalizedData,
>(
    data: z.ZodType<Data>,
) => weakDenormalizedNodeParser(weakNodeKindParser, data);

export const weakDenormalizedNode_DataT_Parser = <Kind extends string>(
    kind: z.ZodType<Kind>,
) => weakDenormalizedNodeParser(kind, weakDenormalizedDataParser);

export const weakDenormalizedNode_ValueT_DataT_Parser =
    weakDenormalizedNodeParser(z.string(), weakDenormalizedDataParser);
