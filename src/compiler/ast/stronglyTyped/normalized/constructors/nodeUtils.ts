import { id } from "../../../id";
import { StrongNodeKind } from "../../common";
import { strongNormalizedNodeParser } from "../parsers";
import { StrongNormalizedData, StrongNormalizedNode } from "../types";
import { strongNormalizedData } from "./data";

export const normalizedNodeConstructor =
    <Kind extends StrongNodeKind>(kind: Kind) =>
    (
        value: StrongNormalizedData<Kind>["value"],
    ): StrongNormalizedNode<Kind> => {
        const data = strongNormalizedData(kind, value);
        return strongNormalizedNodeParser(kind).parse({
            id: id(),
            kind,
            data,
        });
    };
