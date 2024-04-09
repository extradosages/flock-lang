import { EmptyData, ScalarData } from "../types";

export const emptyData = (): EmptyData => ({
    dimensionality: "empty",
    value: undefined,
});

export const scalarData = <Value>(value: Value): ScalarData<Value> => ({
    dimensionality: "scalar",
    value,
});
