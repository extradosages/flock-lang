import _ from "lodash";

import { ErrorWithContext } from "../../../../lib/errorsWithContext";
import { emptyData, scalarData } from "../../../common";
import {
    WeakNormalizedRelationSpec,
    WeakNormalizedRelationalData,
} from "../../../weaklyTyped";
import { StrongNodeKind } from "../../common";
import { strongNodes } from "../../common/enumeration";
import { StrongNormalizedData } from "../types";

const relationalData = <Type extends WeakNormalizedRelationSpec>(
    type: Type,
): WeakNormalizedRelationalData<Type> => ({
    dimensionality: "relational",
    value: undefined,
    relSpec: type,
});

const strongNormalizedDataParser = (kind: StrongNodeKind) =>
    strongNodes[kind].normalizedData as any;

export const strongNormalizedData = <Kind extends StrongNodeKind>(
    kind: Kind,
    value: unknown,
): StrongNormalizedData<Kind> => {
    /* Dropping out of the type system here */
    const dataParser = strongNormalizedDataParser(kind);
    const dimensionality: "empty" | "scalar" | "relational" =
        dataParser.shape.dimensionality.value;

    if (dimensionality === "empty") {
        return emptyData();
    }
    if (dimensionality === "scalar") {
        return scalarData(value) as any;
    }
    if (dimensionality === "relational") {
        const relSpec = _.mapValues(dataParser.shape.relSpec.shape, (kind) => ({
            manyToOne: kind.shape.manyToOne.value,
        }));
        return relationalData(relSpec) as any;
    }
    throw new ErrorWithContext({ dimensionality }, "Unknown dimensionality");
};
