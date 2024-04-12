import { z } from "zod";

import {
    StrongNodes,
    StrongNodeKind,
    strongNodeKindParser,
} from "../../common";
import { strongNodes } from "../../common/enumeration";

export const strongDenormalizedNodeParser = <Kind extends StrongNodeKind>(
    kind: Kind,
): StrongNodes[Kind]["denormalizedNode"] => strongNodes[kind].denormalizedNode;

export const strongDenormalizedNode_KindT_Parser = z.union(
    strongNodeKindParser.options.map(strongDenormalizedNodeParser) as any,
) as unknown as ReturnType<typeof strongDenormalizedNodeParser<StrongNodeKind>>;
