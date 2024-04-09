import { z } from "zod";

import {
    Enumeration,
    StrongNodeKind,
    lookupParsers,
    strongNodeKindParser,
} from "../../common";

export const strongNormalizedDataParser = <Kind extends StrongNodeKind>(
    kind: Kind,
): Enumeration[Kind]["normalizedData"] => lookupParsers(kind).normalizedData;

export const strongNormalizedData_KindT_Parser = z.union(
    strongNodeKindParser.options.map(strongNormalizedDataParser) as any,
) as ReturnType<typeof strongNormalizedDataParser<StrongNodeKind>>;
