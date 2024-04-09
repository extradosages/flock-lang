import { ErrorWithContext } from "../../../../lib/errorsWithContext";
import { emptyData, scalarData } from "../../../common";
import { WeakDenormalizedRelationalData_ } from "../../../weaklyTyped";
import { StrongNodeKind } from "../../common";
import { enumeration } from "../../common/enumeration";
import { StrongDenormalizedData } from "../types";

type StrongDenormalizedRelationalValue<Kind extends StrongNodeKind> =
    StrongDenormalizedData<Kind> extends WeakDenormalizedRelationalData_
        ? StrongDenormalizedData<Kind>["value"]
        : never;

export const strongDenormalizedRelationalData = <Kind extends StrongNodeKind>(
    value: StrongDenormalizedRelationalValue<Kind>,
): StrongDenormalizedData<Kind> => ({
    dimensionality: "relational",
    value,
});

const strongDenormalizedDataParser = (kind: StrongNodeKind) =>
    enumeration[kind].denormalizedData as any;

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
        return strongDenormalizedRelationalData(value as any);
    }
    throw new ErrorWithContext({ dimensionality }, "Unknown dimensionality");
};
