import {
    booleanTerm,
    booleanType,
    clientImplementation,
    floatTerm,
    floatType,
    functionTermEliminator,
    functionType,
    genericTypeConstructor,
    genericTypeEliminator,
    integerTerm,
    integerType,
    largeTypeType,
    library,
    productTermConstructor,
    productTermEliminator,
    productType,
    stringTerm,
    stringType,
    sumTermConstructor,
    sumTermEliminator,
    sumType,
    termBinding,
    termDefinition,
    termReference,
    typeBinding,
    typeDefinition,
    typeReference,
} from "../../defs";

export const strongNodeKinds = [
    "booleanTerm",
    "booleanType",
    "clientImplementation",
    "floatTerm",
    "floatType",
    "functionTermEliminator",
    "functionType",
    "genericTypeConstructor",
    "genericTypeEliminator",
    "integerTerm",
    "integerType",
    "largeTypeType",
    "library",
    "productTermConstructor",
    "productTermEliminator",
    "productType",
    "stringTerm",
    "stringType",
    "sumTermConstructor",
    "sumTermEliminator",
    "sumType",
    "termBinding",
    "termDefinition",
    "termReference",
    "typeBinding",
    "typeDefinition",
    "typeReference",
] as const;

export const enumeration = {
    booleanTerm,
    booleanType,
    clientImplementation,
    floatTerm,
    floatType,
    functionTermEliminator,
    functionType,
    genericTypeConstructor,
    genericTypeEliminator,
    integerTerm,
    integerType,
    largeTypeType,
    library,
    productTermConstructor,
    productTermEliminator,
    productType,
    stringTerm,
    stringType,
    sumTermConstructor,
    sumTermEliminator,
    sumType,
    termBinding,
    termDefinition,
    termReference,
    typeBinding,
    typeDefinition,
    typeReference,
} as const satisfies Record<(typeof strongNodeKinds)[number], unknown>;
