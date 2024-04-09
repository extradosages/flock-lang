export const recordValueOrValueArrayMap = <
    Input,
    Output,
    Value extends Record<string, Input | Input[]>,
>(
    fn: (input: Input, key: string, index?: number) => Output,
    record: Value,
): { [K in keyof Value]: Value[K] extends Input ? Output : Output[] } => {
    const mapped = Object.fromEntries(
        Object.entries(record).map(([key, valueOrValueArray]) => {
            if (Array.isArray(valueOrValueArray)) {
                return [
                    key,
                    valueOrValueArray.map((value, index) =>
                        fn(value, key, index),
                    ),
                ];
            }

            // Manual type guard
            const value = valueOrValueArray as Input;
            return [key, fn(value, key)];
        }),
    );

    return mapped;
};

export const recordValueOrValueArrayFlatMap = <
    Input,
    Output,
    Value extends Record<string, Input | Input[]>,
>(
    fn: (input: Input, key: string, index?: number) => Output,
    record: Record<string, Input | Input[]>,
): { [K in keyof Value]: Output[] } => {
    const mapped = Object.fromEntries(
        Object.entries(record).map(([key, valueOrValueArray]) => {
            if (Array.isArray(valueOrValueArray)) {
                return [
                    key,
                    valueOrValueArray.map((value, index) =>
                        fn(value, key, index),
                    ),
                ];
            }

            // Manual type guard
            const value = valueOrValueArray as Input;
            return [key, [fn(value, key)]];
        }),
    );

    return mapped as { [K in keyof Value]: Output[] };
};
