import { z } from "zod";

import {
    WeakEdgeMap_SourceKindT_EdgeKindT_,
    WeakNormalizedData,
    weakNormalizedNodeParser,
} from "./normalized";
import {
    WeakDenormalizedData,
    weakDenormalizedNodeParser,
} from "./denormalized";
import { WeakNodeKind } from "./common";

/**
 *
 */
export const parserBundle = <
    Kind extends WeakNodeKind,
    DData extends WeakDenormalizedData,
    NData extends WeakNormalizedData,
    NEdges extends WeakEdgeMap_SourceKindT_EdgeKindT_,
>({
    denormalizedData,
    kind,
    normalizedData,
    normalizedEdges,
}: {
    denormalizedData: z.ZodType<DData>;
    kind: z.ZodType<Kind>;
    normalizedData: z.ZodType<NData>;
    normalizedEdges: NEdges;
}) => {
    const denormalizedNode = weakDenormalizedNodeParser<Kind, DData>(
        kind,
        denormalizedData,
    );

    const normalizedNode = weakNormalizedNodeParser<Kind, NData>(
        kind,
        normalizedData,
    );

    return {
        denormalizedData,
        denormalizedNode,
        kind,
        normalizedData,
        normalizedEdges,
        normalizedNode,
    } as const;
};
