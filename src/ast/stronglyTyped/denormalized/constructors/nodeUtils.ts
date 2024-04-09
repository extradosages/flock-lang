import { id } from "../../../id";
import { StrongNodeKind } from "../../common";
import { strongDenormalizedNodeParser } from "../parsers";
import { StrongDenormalizedData, StrongDenormalizedNode } from "../types";
import { Dimensionality } from "../../../common";
import { strongDenormalizedData } from "./data";

export const denormalizedNodeConstructor =
    <Kind extends StrongNodeKind>(kind: Kind) =>
    (
        value: StrongDenormalizedData<Kind>["value"],
    ): StrongDenormalizedNode<Kind> => {
        return strongDenormalizedNodeParser(kind).parse({
            id: id(),
            kind,
            data: strongDenormalizedData(kind, value),
        });
    };
