import { z } from "zod";

import { idParser } from "../../../id";
import {
    WeakEdgeKind,
    WeakNodeKind,
    weakEdgeKindParser,
    weakNodeKindParser,
} from "../../common";
import { source } from "../../../../parse/parser";

export type EdgeIndex<ManyToOne extends boolean> = ManyToOne extends true
    ? number
    : undefined;

const indexParser = <ManyToOne extends boolean>(
    manyToOne: ManyToOne,
): z.ZodType<EdgeIndex<ManyToOne>> =>
    (manyToOne ? z.number().int() : z.undefined()) as unknown as z.ZodType<
        EdgeIndex<ManyToOne>
    >;

export const weakEdgeParser = <
    SourceKind extends WeakNodeKind,
    TargetKind extends WeakNodeKind,
    Kind extends WeakEdgeKind,
    ManyToOne extends boolean,
>({
    sourceKind,
    targetKind,
    kind,
    manyToOne,
}: {
    sourceKind: z.ZodType<SourceKind>;
    targetKind: z.ZodType<TargetKind>;
    kind: z.ZodType<Kind>;
    manyToOne: ManyToOne;
}) =>
    z
        .object({
            id: idParser,
            index: indexParser(manyToOne),
            kind,
            sourceId: idParser,
            sourceKind,
            targetId: idParser,
            targetKind,
        })
        .strict();

export const weakEdge_TargetKindT_ManyToOneT_Parser = <
    SourceKind extends WeakNodeKind,
    Kind extends WeakEdgeKind,
>({
    kind,
    sourceKind,
}: {
    kind: z.ZodType<Kind>;
    sourceKind: z.ZodType<SourceKind>;
}) =>
    z.union([
        weakEdgeParser({
            sourceKind,
            targetKind: weakNodeKindParser,
            kind,
            manyToOne: false,
        }),
        weakEdgeParser({
            sourceKind,
            targetKind: weakNodeKindParser,
            kind,
            manyToOne: true,
        }),
    ]);

export const weakEdge_KindT_ManyToOneT_Parser = <
    SourceKind extends WeakNodeKind,
    TargetKind extends WeakNodeKind,
>({
    sourceKind,
    targetKind,
}: {
    sourceKind: z.ZodType<SourceKind>;
    targetKind: z.ZodType<TargetKind>;
}) =>
    z.union([
        weakEdgeParser({
            sourceKind,
            targetKind,
            kind: weakEdgeKindParser,
            manyToOne: false,
        }),
        weakEdgeParser({
            sourceKind,
            targetKind,
            kind: weakEdgeKindParser,
            manyToOne: true,
        }),
    ]);

export const weakEdge_TargetKindT_KindT_ManyToOneT_Parser = <
    SourceKind extends WeakNodeKind,
>({
    sourceKind,
}: {
    sourceKind: z.ZodType<SourceKind>;
}) =>
    weakEdge_KindT_ManyToOneT_Parser({
        sourceKind,
        targetKind: weakNodeKindParser,
    });

export const weakEdge_SourceKindT_TargetKindT_KindT_ManyToOneT_Parser =
    weakEdge_TargetKindT_KindT_ManyToOneT_Parser({
        sourceKind: weakNodeKindParser,
    });
