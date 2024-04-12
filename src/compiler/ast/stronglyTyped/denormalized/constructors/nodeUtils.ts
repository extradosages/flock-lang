import { id } from "../../../id";
import { StrongNodeKind } from "../../common";
import { StrongDenormalizedData, StrongDenormalizedNode } from "../types";

import { strongDenormalizedData } from "./data";

export const denormalizedNodeConstructor =
    <Kind extends StrongNodeKind>(kind: Kind) =>
    // NOTE: without this `Required` on the return type assertion every field is for some reason
    // considered optional in the values
    (value: StrongDenormalizedData<Kind>["value"]) =>
        ({
            id: id(),
            kind,
            data: strongDenormalizedData(kind, value),
        }) as unknown as Required<StrongDenormalizedNode<Kind>>;
