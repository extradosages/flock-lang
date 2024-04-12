import { id } from "../../../id";
import { StrongEdgeKind, StrongEdgeSourceKind } from "../../common";
import {
    StrongEdge,
    StrongEdgeTargetKind,
    StrongNormalizedNode,
} from "../types";

export const edge = <
    SourceKind extends StrongEdgeSourceKind,
    EdgeKind extends StrongEdgeKind<SourceKind>,
    TargetKind extends StrongEdgeTargetKind<SourceKind, EdgeKind>,
>({
    index,
    kind,
    sourceId,
    sourceKind,
    targetId,
    targetKind,
}: {
    index?: number;
    kind: EdgeKind;
    sourceId: string;
    sourceKind: SourceKind;
    targetId: string;
    targetKind: TargetKind;
}): StrongEdge<SourceKind, EdgeKind> => ({
    id: id(),
    index,
    kind,
    sourceId,
    sourceKind,
    targetId,
    targetKind,
});

export const edgeFromNodes = <
    SourceKind extends StrongEdgeSourceKind,
    EdgeKind extends StrongEdgeKind<SourceKind>,
    TargetKind extends StrongEdgeTargetKind<SourceKind, EdgeKind>,
>(
    sourceNode: StrongNormalizedNode<SourceKind>,
    edgeKind: EdgeKind,
    targetNode: StrongNormalizedNode<TargetKind>,
    index?: number,
) =>
    edge<SourceKind, EdgeKind, TargetKind>({
        index,
        kind: edgeKind,
        sourceId: sourceNode.id,
        sourceKind: sourceNode.kind as SourceKind,
        targetId: targetNode.id,
        targetKind: targetNode.kind,
    });
