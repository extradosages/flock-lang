export const anonymize = <Value extends { id: string }>(
    value: Value,
): Omit<Value, "id"> => {
    const { id: _id, ...rest } = value;
    return rest;
};
