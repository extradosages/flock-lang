import { z } from "zod";

import { emptyParser } from "./agnostic";

export const denormalizedEmptyParser = emptyParser.strict();

export type DenormalizedEmpty = z.infer<typeof denormalizedEmptyParser>;

export type DenormalizedScalar<Value> = {
    dimensionality: "scalar";
    value: Value;
};

// Interestingly enough, you'd imagine that we'd want to have this top type be
// `DenormalizedScalar<unknown>`
// but, in practice scalars only take on these values, so when we infer what a
// `DenormalizedNodeǁ` looks like in `enumerated.ts`, the data takes on a tighter type,
// and that original type can't be assigned to it
export type WeakDenormalizedScalarǁ = DenormalizedScalar<unknown>;

export const denormalizedScalarParser = <Value>(value: z.ZodType<Value>) =>
    z.object({
        dimensionality: z.literal("scalar"),
        value,
    }) as z.ZodType<DenormalizedScalar<Value>>;

export type WeakDenormalizedRelational<
    RecordValue,
    Value extends Record<string, RecordValue | RecordValue[]>,
> = {
    dimensionality: "relational";
    value: Value;
};

export type WeakDenormalizedRelationalǁValue<RecordValue> =
    WeakDenormalizedRelational<
        RecordValue,
        Record<string, RecordValue | RecordValue[]>
    >;

export type WeakDenormalizedRelationalǁ =
    WeakDenormalizedRelationalǁValue<unknown>;

export const denormalizedRelationalParser = <
    RecordValue,
    Value extends Record<string, RecordValue | RecordValue[]>,
>(
    value: z.ZodType<Value>,
) =>
    z.object({
        dimensionality: z.literal("relational"),
        value,
    }) as z.ZodType<WeakDenormalizedRelational<RecordValue, Value>>;

export type DenormalizedData =
    | DenormalizedEmpty
    | WeakDenormalizedScalarǁ
    | WeakDenormalizedRelationalǁ;
