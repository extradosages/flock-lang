import { z } from "zod";

import {
    emptyDimensionalityParser,
    scalarDimensionalityParser,
} from "../../../common";
import {
    Enumeration,
    StrongNodeKind,
    strongAstParsers,
    strongNodeKindParser,
} from "../../common";

export const strongDenormalizedEmptyParser = z
    .object({
        dimensionality: emptyDimensionalityParser,
    })
    .strict();

export const strongDenormalizedScalarParser = <Value>(
    value: z.ZodType<Value>,
) =>
    z.object({
        dimensionality: scalarDimensionalityParser,
        value,
    });

export const strongDenormalizedDataParser = <Kind extends StrongNodeKind>(
    kind: Kind,
): Enumeration[Kind]["denormalized"]["data"] =>
    strongAstParsers(kind).denormalized.data;

export const strongDenormalizedData_KindT_Parser = z.union(
    strongNodeKindParser.options.map(strongDenormalizedDataParser) as any,
) as ReturnType<typeof strongDenormalizedDataParser<StrongNodeKind>>;
