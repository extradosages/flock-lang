import * as uuid from "uuid";

export const anonymize = (value: Record<string, unknown>) => {
    const anonymized = { ...value };
    for (const key in anonymized) {
        if (key.endsWith("id") || key.endsWith("Id")) {
            anonymized[key] = uuid.NIL;
        }
    }
    return anonymized;
};
