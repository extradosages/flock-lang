import { WeakEdgeKind } from "../../common";
import {
    WeakNormalizedRelationSpec,
    WeakNormalizedRelationalData,
} from "../types";

export const weakNormalizedRelationalData = <
    Type extends WeakNormalizedRelationSpec,
>(
    type: Type,
): WeakNormalizedRelationalData<Type> => ({
    dimensionality: "relational",
    value: undefined,
    relSpec: type,
});
