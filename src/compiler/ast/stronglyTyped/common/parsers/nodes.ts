import z from "zod";
import {
    largeTypeKindParser,
    smallTypeKindParser,
    termKindParser,
} from "../../../defs";
import { strongNodeKinds } from "../enumeration";

export const strongNodeKindParser = z.enum(strongNodeKinds);

export const strongTermNodeKindParser = termKindParser;

export const strongSmallTypeNodeKindParser = smallTypeKindParser;

export const strongLargeTypeNodeKindParser = largeTypeKindParser;
