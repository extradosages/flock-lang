/**
 * NOTE: The order of type binding between parsers and types
 * is reversed in this module; the parser types are bound to the
 * types, instead of the types to the parsers. This is because
 * inference was failing the other way around.
 */
import { z } from "zod";

import { StrongEdgeKind, StrongEdgeSourceKind } from "../../common";
import { strongEdges } from "../../common/enumeration";
import {
    StrongEdge,
    StrongEdge_EdgeKindT_,
    StrongEdge_SourceKindT_EdgeKindT_,
} from "../types";

export const strongEdgeParser = <
    SourceKind extends StrongEdgeSourceKind,
    EdgeKind extends StrongEdgeKind<SourceKind>,
>(
    sourceKind: SourceKind,
    edgeKind: EdgeKind,
) =>
    strongEdges[sourceKind][edgeKind] as z.ZodType<
        StrongEdge<SourceKind, EdgeKind>
    >;

export const strongEdge_EdgeKindT_Parser = <
    SourceKind extends StrongEdgeSourceKind,
>(
    sourceKind: SourceKind,
) =>
    z.union(
        Object.keys(strongEdges[sourceKind]).map((edgeKind) =>
            strongEdgeParser(sourceKind, edgeKind as any),
        ) as any,
    ) as z.ZodType<StrongEdge_EdgeKindT_<SourceKind>>;

export const strongEdge_SourceKindT_EdgeKindT_Parser = z.union(
    Object.keys(strongEdges).map((sourceKind) =>
        strongEdge_EdgeKindT_Parser(sourceKind as any),
    ) as any,
) as z.ZodType<StrongEdge_SourceKindT_EdgeKindT_>;

export const strongEdge_Parser = strongEdge_SourceKindT_EdgeKindT_Parser;
