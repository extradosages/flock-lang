import { z } from "zod";

import { idParser } from "../../id";
import { DenormalizedData, NormalizedData } from "../nodeData";

export const normalizedNodeParser = <Kind, Data extends NormalizedData>(
    kind: z.ZodLiteral<Kind>,
    data: z.ZodType<Data>,
) =>
    z
        .object({
            data,
            id: idParser,
            kind,
        })
        .strict();

export type WeakNormalizedNode<Kind, Data extends NormalizedData> = z.infer<
    ReturnType<typeof normalizedNodeParser<Kind, Data>>
>;

export type EdgeIndex<ManyToOne extends boolean> = ManyToOne extends true
    ? number
    : undefined;

const indexParser = <ManyToOne extends boolean>(
    manyToOne: ManyToOne,
): z.ZodType<EdgeIndex<ManyToOne>> =>
    (manyToOne ? z.number().int() : z.undefined()) as unknown as z.ZodType<
        EdgeIndex<ManyToOne>
    >;

export const edgeParser = <
    Kind,
    SourceKind,
    TargetKind,
    ManyToOne extends boolean,
>({
    kind,
    sourceKind,
    targetKind,
    manyToOne,
}: {
    kind: z.ZodLiteral<Kind>;
    sourceKind: z.ZodLiteral<SourceKind>;
    targetKind: z.ZodType<TargetKind>;
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

type WeakEdge<
    Kind,
    SourceKind,
    TargetKind,
    ManyToOne extends boolean,
> = z.infer<
    ReturnType<typeof edgeParser<Kind, SourceKind, TargetKind, ManyToOne>>
>;

export const denormalizedNodeParser = <Kind, Data extends DenormalizedData>(
    kind: z.ZodType<Kind>,
    data: z.ZodType<Data>,
) =>
    z
        .object({
            data,
            id: idParser,
            kind,
        })
        .strict();

export type WeakDenormalizedNode<Kind, Data extends DenormalizedData> = z.infer<
    ReturnType<typeof denormalizedNodeParser<Kind, Data>>
>;

export type WeakDenormalizedNodeǁKind<Data extends DenormalizedData> =
    WeakDenormalizedNode<unknown, Data>;

export type WeakDenormalizedNodeǁ = WeakDenormalizedNode<
    unknown,
    DenormalizedData
>;
