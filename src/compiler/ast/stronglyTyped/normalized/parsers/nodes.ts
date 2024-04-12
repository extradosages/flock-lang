import { z } from "zod";

import {
    StrongLargeTypeNodeKind,
    StrongNodeKind,
    StrongNodes,
    StrongSmallTypeNodeKind,
    StrongTermNodeKind,
    strongLargeTypeNodeKindParser,
    strongNodeKindParser,
    strongSmallTypeNodeKindParser,
    strongTermNodeKindParser,
} from "../../common";
import { strongNodes } from "../../common/enumeration";

export const strongNormalizedNodeParser = <Kind extends StrongNodeKind>(
    kind: Kind,
): StrongNodes[Kind]["normalizedNode"] => strongNodes[kind].normalizedNode;

export const strongNormalizedNode_KindT_Parser = z.union(
    strongNodeKindParser.options.map(strongNormalizedNodeParser) as any,
) as unknown as ReturnType<typeof strongNormalizedNodeParser<StrongNodeKind>>;

export const strongNormalizedTermNodeParser = z.union(
    strongTermNodeKindParser.options.map(strongNormalizedNodeParser) as any,
) as unknown as ReturnType<
    typeof strongNormalizedNodeParser<StrongTermNodeKind>
>;

export const strongNormalizedSmallTypeNodeParser = z.union(
    strongSmallTypeNodeKindParser.options.map(
        strongNormalizedNodeParser,
    ) as any,
) as unknown as ReturnType<
    typeof strongNormalizedNodeParser<StrongSmallTypeNodeKind>
>;

export const strongNormalizedLargeTypeNodeParser = z.union(
    strongLargeTypeNodeKindParser.options.map(
        strongNormalizedNodeParser,
    ) as any,
) as unknown as ReturnType<
    typeof strongNormalizedNodeParser<StrongLargeTypeNodeKind>
>;
