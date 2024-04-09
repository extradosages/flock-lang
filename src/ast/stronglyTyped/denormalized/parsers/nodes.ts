import { z } from "zod";

import {
    Enumeration,
    StrongNodeKind,
    strongAstParsers,
    strongNodeKindParser,
} from "../../common";

export const strongDenormalizedNodeParser = <Kind extends StrongNodeKind>(
    kind: Kind,
): Enumeration[Kind]["denormalized"]["node"] =>
    strongAstParsers(kind).denormalized.node;

export const strongDenormalizedNode_KindT_Parser = z.union(
    strongNodeKindParser.options.map(strongDenormalizedNodeParser) as any,
) as ReturnType<typeof strongDenormalizedNodeParser<StrongNodeKind>>;
