import { z } from "zod";

import {
    StrongNodes,
    StrongNodeKind,
    strongNodeKindParser,
} from "../../common";
import { strongNodes } from "../../common/enumeration";

export const strongNormalizedNodeParser = <Kind extends StrongNodeKind>(
    kind: Kind,
): StrongNodes[Kind]["normalizedNode"] => strongNodes[kind].normalizedNode;

export const strongNormalizedNode_KindT_Parser = z.union(
    strongNodeKindParser.options.map(strongNormalizedNodeParser) as any,
) as unknown as ReturnType<typeof strongNormalizedNodeParser<StrongNodeKind>>;
