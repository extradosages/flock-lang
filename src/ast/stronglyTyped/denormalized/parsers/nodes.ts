import { z } from "zod";

import {
    Enumeration,
    StrongNodeKind,
    lookupParsers,
    strongNodeKindParser,
} from "../../common";

export const strongDenormalizedNodeParser = <Kind extends StrongNodeKind>(
    kind: Kind,
): Enumeration[Kind]["denormalizedNode"] =>
    lookupParsers(kind).denormalizedNode;

export const strongDenormalizedNode_KindT_Parser = z.union(
    strongNodeKindParser.options.map(strongDenormalizedNodeParser) as any,
) as unknown as ReturnType<typeof strongDenormalizedNodeParser<StrongNodeKind>>;
