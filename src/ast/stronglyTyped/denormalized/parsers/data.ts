import { z } from "zod";

import {
    StrongNodes,
    StrongNodeKind,
    strongNodeKindParser,
} from "../../common";
import { strongNodes } from "../../common/enumeration";

export const strongDenormalizedDataParser = <Kind extends StrongNodeKind>(
    kind: Kind,
): StrongNodes[Kind]["denormalizedData"] => strongNodes[kind].denormalizedData;

export const strongDenormalizedData_KindT_Parser = z.union(
    strongNodeKindParser.options.map(strongDenormalizedDataParser) as any,
) as ReturnType<typeof strongDenormalizedDataParser<StrongNodeKind>>;
