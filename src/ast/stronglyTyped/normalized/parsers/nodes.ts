import { z } from "zod";

import {
    Enumeration,
    StrongNodeKind,
    lookupParsers,
    strongNodeKindParser,
} from "../../common";

export const strongNormalizedNodeParser = <Kind extends StrongNodeKind>(
    kind: Kind,
): Enumeration[Kind]["normalizedNode"] => lookupParsers(kind).normalizedNode;

export const strongNormalizedNode_KindT_Parser = z.union(
    strongNodeKindParser.options.map(strongNormalizedNodeParser) as any,
) as unknown as ReturnType<typeof strongNormalizedNodeParser<StrongNodeKind>>;
