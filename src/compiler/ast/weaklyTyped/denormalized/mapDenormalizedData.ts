import { ErrorWithContext } from "../../../util/errorsWithContext";
import { EmptyData, emptyData } from "../../common";
import { WeakScalarData_ } from "../common";

import { WeakDenormalizedData, WeakDenormalizedRelationalData_ } from "./types";

const defaultEmptyFn = () => emptyData();
const defaultScalarFn = <Input>(input: Input) => input;
const defaultRelationalFn = <Input>(input: Input) => input;

export const mapDenormalizedData = <
    EmptyOutput = EmptyData,
    ScalarOutput = WeakScalarData_,
    RelationalOutput = WeakDenormalizedRelationalData_,
>(
    {
        emptyFn,
        scalarFn,
        relationalFn,
    }: {
        emptyFn?: () => EmptyOutput;
        scalarFn?: (input: WeakScalarData_) => ScalarOutput;
        relationalFn?: (
            input: WeakDenormalizedRelationalData_,
        ) => RelationalOutput;
    },
    data: WeakDenormalizedData,
) => {
    emptyFn = emptyFn ?? (defaultEmptyFn as () => EmptyOutput);
    scalarFn =
        scalarFn ??
        (defaultScalarFn as (input: WeakScalarData_) => ScalarOutput);
    relationalFn =
        relationalFn ??
        (defaultRelationalFn as (
            input: WeakDenormalizedRelationalData_,
        ) => RelationalOutput);

    if (data.dimensionality === "empty") {
        return emptyFn();
    }

    if (data.dimensionality === "scalar") {
        return scalarFn(data);
    }

    if (data.dimensionality === "relational") {
        return relationalFn(data);
    }

    // This should be impossible, but is used to constrain the return type.
    throw new ErrorWithContext(
        { dimensionality: (data as any).dimensionality },
        "Invalid dimensionality",
    );
};
