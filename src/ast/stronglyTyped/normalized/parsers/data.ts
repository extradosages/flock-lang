import { z } from "zod";

import {
    Enumeration,
    StrongNodeKind,
    strongAstParsers,
    strongNodeKindParser,
} from "../../common";

export const strongNormalizedDataParser = <Kind extends StrongNodeKind>(
    kind: Kind,
): Enumeration[Kind]["normalized"]["data"] =>
    strongAstParsers(kind).normalized.data;

export const strongNormalizedData_KindT_Parser = z.union(
    strongNodeKindParser.options.map(strongNormalizedDataParser) as any,
) as ReturnType<typeof strongNormalizedDataParser<StrongNodeKind>>;
