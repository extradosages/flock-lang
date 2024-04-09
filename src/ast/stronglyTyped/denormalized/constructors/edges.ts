import { id } from "../../../id";
import {
    StrongEdge,
    StrongEdgeKind,
    StrongEdgeTargetKind,
    StrongNodeKind,
} from "../..";

export const edge = <
    SourceKind extends StrongNodeKind,
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
