import { z } from "zod";

import { WeakEdgeKind, WeakNodeKind } from "./common";
import {
    WeakDenormalizedData,
    weakDenormalizedNodeParser,
} from "./denormalized";
import {
    WeakEdgeMap_SourceKindT_EdgeKindT_,
    WeakNormalizedData,
    weakNormalizedNodeParser,
} from "./normalized";

/**
 *
 */
export const parserBundle = <
    DData extends WeakDenormalizedData,
    EdgeKind extends WeakEdgeKind,
    Kind extends WeakNodeKind,
    NData extends WeakNormalizedData,
    NEdges extends WeakEdgeMap_SourceKindT_EdgeKindT_,
>({
    denormalizedData,
    edgeKind,
    kind,
    normalizedData,
    edges,
}: {
    denormalizedData: z.ZodType<DData>;
    edgeKind: z.ZodType<EdgeKind>;
    kind: z.ZodType<Kind>;
    normalizedData: z.ZodType<NData>;
    edges: NEdges;
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
        edgeKind,
        edges,
        kind,
        normalizedData,
        normalizedNode,
    } as const;
};
