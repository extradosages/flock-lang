import { z } from "zod";

import {
    Enumeration,
    StrongNodeKind,
    strongAstParsers,
    strongNodeKindParser,
} from "../../common";

export const strongNormalizedNodeParser = <Kind extends StrongNodeKind>(
    kind: Kind,
): Enumeration[Kind]["normalized"]["node"] =>
    strongAstParsers(kind).normalized.node;

export const strongNormalizedNode_KindT_Parser = z.union(
    strongNodeKindParser.options.map(strongNormalizedNodeParser) as any,
) as ReturnType<typeof strongNormalizedNodeParser<StrongNodeKind>>;
