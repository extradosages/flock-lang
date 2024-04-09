import {
    DenormalizedEmpty,
    WeakDenormalizedRelational,
    DenormalizedScalar,
} from "./denormalized";
import {
    NormalizedEmpty,
    NormalizedRelational,
    NormalizedScalar,
} from "./normalized";

export const denormalizedEmpty = (): DenormalizedEmpty => ({
    dimensionality: "empty",
});

export const normalizedEmpty = (): NormalizedEmpty => ({
    dimensionality: "empty",
});

export const denormalizedScalar = <Value>(
    value: Value,
): DenormalizedScalar<Value> => ({
    dimensionality: "scalar",
    value,
});

export const normalizedScalar = <Value>(
    value: Value,
): NormalizedScalar<Value> => ({
    dimensionality: "scalar",
    value,
});

export const denormalizedRelational = <
    RecordValue,
    Value extends Record<string, RecordValue | RecordValue[]>,
>(
    value: Value,
): WeakDenormalizedRelational<RecordValue, Value> => ({
    dimensionality: "relational",
    value,
});

export const normalizedRelational = (): NormalizedRelational => ({
    dimensionality: "relational",
});
