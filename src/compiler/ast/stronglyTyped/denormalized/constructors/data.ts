import { ErrorWithContext } from "../../../../util/errorsWithContext";
import { emptyData, scalarData } from "../../../common";
import { StrongNodeKind } from "../../common";
import { strongNodes } from "../../common/enumeration";
import { StrongDenormalizedData } from "../types";

const relationalData = (value: any) => ({
    dimensionality: "relational",
    value,
});

const strongDenormalizedDataParser = (kind: StrongNodeKind) =>
    strongNodes[kind].denormalizedData as any;

export const strongDenormalizedData = <Kind extends StrongNodeKind>(
    kind: Kind,
    value: unknown,
): StrongDenormalizedData<Kind> => {
    /* Dropping out of the type system here */
    const data = strongDenormalizedDataParser(kind);
    const dimensionality: "empty" | "scalar" | "relational" =
        data.shape.dimensionality.value;

    if (dimensionality === "empty") {
        return emptyData();
    }
    if (dimensionality === "scalar") {
        return scalarData(value) as any;
    }
    if (dimensionality === "relational") {
        return relationalData(value) as any;
    }
    throw new ErrorWithContext({ dimensionality }, "Unknown dimensionality");
};
