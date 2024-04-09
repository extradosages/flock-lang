import { z } from "zod";

import {
    WeakEdgeMap_SourceKindT_EdgeKindT_,
    WeakNormalizedData,
    WeakNormalizedNode,
} from "./normalized";
import { WeakDenormalizedData, WeakDenormalizedNode } from "./denormalized";
import { WeakNodeKind } from "./common";

/**
 *
 * "Weak" because in practice `DNode`, `NNode`, and `NEdges` are more tightly bound than via
 * the relationship indicated here.
 */
export const weakAstParsers = <
    Kind extends WeakNodeKind,
    DData extends WeakDenormalizedData,
    DNode extends WeakDenormalizedNode<Kind, DData>,
    NData extends WeakNormalizedData,
    NNode extends WeakNormalizedNode<Kind, NData>,
    NEdges extends WeakEdgeMap_SourceKindT_EdgeKindT_,
>({
    kind,
    denormalizedData,
    denormalizedNode,
    normalizedData,
    normalizedEdges,
    normalizedNode,
}: {
    kind: z.ZodType<Kind>;
    denormalizedData: z.ZodType<DData>;
    denormalizedNode: z.ZodType<DNode>;
    normalizedData: z.ZodType<NData>;
    normalizedEdges: NEdges;
    normalizedNode: z.ZodType<NNode>;
}) => ({
    denormalized: { data: denormalizedData, node: denormalizedNode },
    kind,
    normalized: {
        data: normalizedData,
        node: normalizedNode,
        edges: normalizedEdges,
    },
});
