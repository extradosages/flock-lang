import { denormalizedNodeConstructor } from "./nodeUtils";

export const dBooleanTerm = denormalizedNodeConstructor("booleanTerm");

export const dBooleanType = denormalizedNodeConstructor("booleanType");

export const dClientImplementation = denormalizedNodeConstructor(
    "clientImplementation",
);

export const dFloatTerm = denormalizedNodeConstructor("floatTerm");

export const dFloatType = denormalizedNodeConstructor("floatType");

export const dFunctionTermEliminator = denormalizedNodeConstructor(
    "functionTermEliminator",
);

export const dFunctionType = denormalizedNodeConstructor("functionType");

export const dGenericTypeConstructor = denormalizedNodeConstructor(
    "genericTypeConstructor",
);

export const dGenericTypeEliminator = denormalizedNodeConstructor(
    "genericTypeEliminator",
);

export const dIntegerTerm = denormalizedNodeConstructor("integerTerm");

export const dIntegerType = denormalizedNodeConstructor("integerType");

export const dLambdaConstructor =
    denormalizedNodeConstructor("lambdaConstructor");

export const dLargeTypeType = denormalizedNodeConstructor("largeTypeType");

export const dLibrary = denormalizedNodeConstructor("library");

export const dProductTermConstructor = denormalizedNodeConstructor(
    "productTermConstructor",
);

export const dProductTermEliminator = denormalizedNodeConstructor(
    "productTermEliminator",
);

export const dProductType = denormalizedNodeConstructor("productType");

export const dStringTerm = denormalizedNodeConstructor("stringTerm");

export const dStringType = denormalizedNodeConstructor("stringType");

export const dSumTermConstructor =
    denormalizedNodeConstructor("sumTermConstructor");

export const dSumTermEliminator =
    denormalizedNodeConstructor("sumTermEliminator");

export const dSumType = denormalizedNodeConstructor("sumType");

export const dTermBinding = denormalizedNodeConstructor("termBinding");

export const dTermDefinition = denormalizedNodeConstructor("termDefinition");

export const dTermReference = denormalizedNodeConstructor("termReference");

export const dTypeBinding = denormalizedNodeConstructor("typeBinding");

export const dTypeDefinition = denormalizedNodeConstructor("typeDefinition");

export const dTypeReference = denormalizedNodeConstructor("typeReference");
