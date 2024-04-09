import { Edge, EdgeTargetKind, NodeKind, EdgeKind } from "../ast";
import { id } from "../../id";

export const edge = <
    SK extends NodeKind,
    EK extends EdgeKind<SK>,
    TK extends EdgeTargetKind<SK, EK>,
>({
    index,
    kind,
    sourceId,
    sourceKind,
    targetId,
    targetKind,
}: {
    index?: number;
    kind: EK;
    sourceId: string;
    sourceKind: SK;
    targetId: string;
    targetKind: TK;
}): Edge<SK, EK> =>
    ({
        id: id(),
        index,
        kind,
        sourceId,
        sourceKind,
        targetId,
        targetKind,
    }) as Edge<SK, EK>;
