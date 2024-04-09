import { z } from "zod";
import {
    Enumeration,
    StrongEdgeKind,
    StrongEdges,
    StrongNodeKind,
    lookupParsers,
} from "../../common";

export const strongEdgeParsers = <SourceKind extends StrongNodeKind>(
    sourceKind: SourceKind,
): StrongEdges<SourceKind> => lookupParsers(sourceKind).normalizedEdges;

export const strongEdgeParser = <
    SourceKind extends StrongNodeKind,
    EdgeKind extends StrongEdgeKind<SourceKind>,
>(
    sourceKind: SourceKind,
    edgeKind: EdgeKind,
): StrongEdges<SourceKind>[EdgeKind] => strongEdgeParsers(sourceKind)[edgeKind];

export const strongEdge_EdgeKindT_Parser = <SourceKind extends StrongNodeKind>(
    sourceKind: SourceKind,
) =>
    z.union(
        Array.from(Object.values(strongEdgeParsers(sourceKind))) as any,
    ) as StrongEdges<SourceKind>[StrongEdgeKind<SourceKind>];
