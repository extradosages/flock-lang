import { normalizedNodeConstructor } from "./nodeUtils";

export const nBooleanTerm = normalizedNodeConstructor("booleanTerm");

export const nBooleanType = normalizedNodeConstructor("booleanType");

export const nClientImplementation = normalizedNodeConstructor(
    "clientImplementation",
);

export const nFloatTerm = normalizedNodeConstructor("floatTerm");

export const nFloatType = normalizedNodeConstructor("floatType");

export const nFunctionTermEliminator = normalizedNodeConstructor(
    "functionTermEliminator",
);

export const nFunctionType = normalizedNodeConstructor("functionType");

export const nGenericTypeConstructor = normalizedNodeConstructor(
    "genericTypeConstructor",
);

export const nGenericTypeEliminator = normalizedNodeConstructor(
    "genericTypeEliminator",
);

export const nIntegerTerm = normalizedNodeConstructor("integerTerm");

export const nIntegerType = normalizedNodeConstructor("integerType");

export const nLambdaConstructor =
    normalizedNodeConstructor("lambdaConstructor");

export const nLargeTypeType = normalizedNodeConstructor("largeTypeType");

export const nLibrary = normalizedNodeConstructor("library");

export const nProductTermConstructor = normalizedNodeConstructor(
    "productTermConstructor",
);

export const nProductTermEliminator = normalizedNodeConstructor(
    "productTermEliminator",
);

export const nProductType = normalizedNodeConstructor("productType");

export const nStringType = normalizedNodeConstructor("stringType");

export const nSumTermConstructor =
    normalizedNodeConstructor("sumTermConstructor");

export const nSumTermEliminator =
    normalizedNodeConstructor("sumTermEliminator");

export const nSumType = normalizedNodeConstructor("sumType");

export const nTermBinding = normalizedNodeConstructor("termBinding");

export const nTermDefinition = normalizedNodeConstructor("termDefinition");

export const nTermReference = normalizedNodeConstructor("termReference");

export const nTypeBinding = normalizedNodeConstructor("typeBinding");

export const nTypeDefinition = normalizedNodeConstructor("typeDefinition");

export const nTypeReference = normalizedNodeConstructor("typeReference");
