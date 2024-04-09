import { ErrorWithContext } from "../../lib/errorsWithContext";

import {
    DenormalizedNode,
    DenormalizedNodeDataDimensionality,
    DenormalizedNodeDataValue,
    NodeKind,
    denormalizedNodeParser,
} from "../ast";
import { id } from "../id";
import {
    denormalizedEmpty,
    denormalizedRelational,
    denormalizedScalar,
} from "../nodeData";

const data = <Value>(
    dimensionality: "empty" | "scalar" | "relational",
    value: Value,
) => {
    if (dimensionality === "empty") {
        return denormalizedEmpty();
    }
    if (dimensionality === "scalar") {
        return denormalizedScalar(value);
    }
    if (dimensionality === "relational") {
        // Type inference needs to be helped out here
        // May need a refactor of the function
        return denormalizedRelational(value as any);
    }
    throw new ErrorWithContext({ dimensionality }, "Unknown dimensionality");
};

export const denormalizedNodeConstructor = <K extends NodeKind>(kind: K) => {
    const nodeParser = denormalizedNodeParser(kind);

    // Type unsafe
    const dimensionality = (nodeParser as any).shape.data.shape.dimensionality
        .value as DenormalizedNodeDataDimensionality<K>;

    return (value: DenormalizedNodeDataValue<K>): DenormalizedNode<K> => {
        return denormalizedNodeParser(kind).parse({
            id: id(),
            kind,
            data: data(dimensionality, value),
        });
    };
};
