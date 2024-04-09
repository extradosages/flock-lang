import { ErrorWithContext } from "../../../lib/errorsWithContext";
import { denormalizedEmpty } from "./constructors";
import {
    DenormalizedData,
    DenormalizedEmpty,
    WeakDenormalizedRelationalǁ,
    WeakDenormalizedScalarǁ,
} from "./denormalized";

const defaultEmptyFn = () => denormalizedEmpty();
const defaultScalarFn = <Input>(input: Input) => input;
const defaultRelationalFn = <Input>(input: Input) => input;

export const denormalizedDataMap = <
    EmptyOutput = DenormalizedEmpty,
    ScalarOutput = WeakDenormalizedScalarǁ,
    RelationalOutput = WeakDenormalizedRelationalǁ,
>(
    {
        emptyFn,
        scalarFn,
        relationalFn,
    }: {
        emptyFn?: () => EmptyOutput;
        scalarFn?: (input: WeakDenormalizedScalarǁ) => ScalarOutput;
        relationalFn?: (input: WeakDenormalizedRelationalǁ) => RelationalOutput;
    },
    data: DenormalizedData,
) => {
    emptyFn = emptyFn ?? (defaultEmptyFn as () => EmptyOutput);
    scalarFn =
        scalarFn ??
        (defaultScalarFn as (input: WeakDenormalizedScalarǁ) => ScalarOutput);
    relationalFn =
        relationalFn ??
        (defaultRelationalFn as (
            input: WeakDenormalizedRelationalǁ,
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
