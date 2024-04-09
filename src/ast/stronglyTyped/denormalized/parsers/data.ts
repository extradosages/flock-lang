import { z } from "zod";

import {
    Enumeration,
    StrongNodeKind,
    lookupParsers,
    strongNodeKindParser,
} from "../../common";

export const strongDenormalizedDataParser = <Kind extends StrongNodeKind>(
    kind: Kind,
): Enumeration[Kind]["denormalizedData"] =>
    lookupParsers(kind).denormalizedData;

export const strongDenormalizedData_KindT_Parser = z.union(
    strongNodeKindParser.options.map(strongDenormalizedDataParser) as any,
) as ReturnType<typeof strongDenormalizedDataParser<StrongNodeKind>>;
