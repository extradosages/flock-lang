import { z } from "zod";

import { Values } from "../../../util/values";
import { strongEdges, strongNodes } from "./enumeration";
import {
    strongFunctionTermConstructorNodeKindParser,
    strongGenericTypeEliminatorGenericTypeNodeKindParser,
    strongLargeTypeNodeKindParser,
    strongNodeKindParser,
    strongSmallTypeNodeKindParser,
    strongTermDefinitionTermNodeKindParser,
    strongTermNodeKindParser,
} from "./parsers";

export type StrongNodes = typeof strongNodes;

export type StrongNodeKind = z.infer<typeof strongNodeKindParser>;

export type StrongNodeKindOptions = typeof strongNodeKindParser.options;

export type StrongFunctionTermConstructorNodeKind = z.infer<
    typeof strongFunctionTermConstructorNodeKindParser
>;

export type StrongFunctionTermConstructorNodeKindOptions =
    typeof strongFunctionTermConstructorNodeKindParser.options;

export type StrongGenericTypeEliminatorGenericTypeNodeKind = z.infer<
    typeof strongGenericTypeEliminatorGenericTypeNodeKindParser
>;

export type StrongGenericTypeEliminatorGenericTypeNodeKindOptions =
    typeof strongGenericTypeEliminatorGenericTypeNodeKindParser.options;

export type StrongTermNodeKind = z.infer<typeof strongTermNodeKindParser>;

export type StrongTermNodeKindOptions = typeof strongTermNodeKindParser.options;

export type StrongSmallTypeNodeKind = z.infer<
    typeof strongSmallTypeNodeKindParser
>;

export type StrongSmallTypeNodeKindOptions =
    typeof strongSmallTypeNodeKindParser.options;

export type StrongLargeTypeNodeKind = z.infer<
    typeof strongLargeTypeNodeKindParser
>;

export type StrongLargeTypeNodeKindOptions =
    typeof strongLargeTypeNodeKindParser.options;

export type StrongTermDefinitionTermNodeKind = z.infer<
    typeof strongTermDefinitionTermNodeKindParser
>;

export type StrongTermDefinitionTermNodeKindOptions =
    typeof strongTermDefinitionTermNodeKindParser.options;

export type StrongEdges = typeof strongEdges;

export type StrongEdgeSourceKind = keyof StrongEdges;

export type StrongEdgeKind<SourceKind extends StrongEdgeSourceKind> =
    keyof StrongEdges[SourceKind];

export type StrongEdgeKind_SourceKind_ = Values<{
    [SourceKind in keyof StrongEdges]: keyof StrongEdges[SourceKind];
}>;
