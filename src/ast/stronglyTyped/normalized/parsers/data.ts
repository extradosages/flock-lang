import { z } from "zod";

import {
    StrongNodes,
    StrongNodeKind,
    strongNodeKindParser,
} from "../../common";
import { strongNodes } from "../../common/enumeration";

export const strongNormalizedDataParser = <Kind extends StrongNodeKind>(
    kind: Kind,
): StrongNodes[Kind]["normalizedData"] => strongNodes[kind].normalizedData;

export const strongNormalizedData_KindT_Parser = z.union(
    strongNodeKindParser.options.map(strongNormalizedDataParser) as any,
) as ReturnType<typeof strongNormalizedDataParser<StrongNodeKind>>;
