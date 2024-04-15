import {
    functionTermConstructorNodeKindParser,
    genericTypeEliminatorGenericTypeNodeKindParser,
    largeTypeNodeKindParser,
    nodeKindParser,
    smallTypeNodeKindParser,
    termDefinitionTermNodeKindParser,
    termNodeKindParser,
} from "../../../defs";

// Unions

export const strongNodeKindParser = nodeKindParser;

export const strongFunctionTermConstructorNodeKindParser =
    functionTermConstructorNodeKindParser;

export const strongGenericTypeEliminatorGenericTypeNodeKindParser =
    genericTypeEliminatorGenericTypeNodeKindParser;

export const strongTermNodeKindParser = termNodeKindParser;

export const strongSmallTypeNodeKindParser = smallTypeNodeKindParser;

export const strongLargeTypeNodeKindParser = largeTypeNodeKindParser;

export const strongTermDefinitionTermNodeKindParser =
    termDefinitionTermNodeKindParser;
