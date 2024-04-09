import { denormalizedNodeConstructor } from "./utils";

export const denormalizedBooleanTerm =
    denormalizedNodeConstructor("booleanTerm");

export const denormalizedBooleanType =
    denormalizedNodeConstructor("booleanType");

export const denormalizedClientImplementation = denormalizedNodeConstructor(
    "clientImplementation",
);

export const denormalizedFloatTerm = denormalizedNodeConstructor("floatTerm");

export const denormalizedFloatType = denormalizedNodeConstructor("floatType");

export const denormalizedFunctionType =
    denormalizedNodeConstructor("functionType");

export const denormalizedGenericTypeConstructor = denormalizedNodeConstructor(
    "genericTypeConstructor",
);

export const denormalizedGenericTypeEliminator = denormalizedNodeConstructor(
    "genericTypeEliminator",
);

export const denormalizedIntegerTerm =
    denormalizedNodeConstructor("integerTerm");

export const denormalizedIntegerType =
    denormalizedNodeConstructor("integerType");

export const denormalizedLargeTypeType =
    denormalizedNodeConstructor("largeTypeType");

export const denormalizedLibrary = denormalizedNodeConstructor("library");

export const denormalizedProductTermConstructor = denormalizedNodeConstructor(
    "productTermConstructor",
);

export const denormalizedProductTermEliminator = denormalizedNodeConstructor(
    "productTermEliminator",
);

export const denormalizedProductType =
    denormalizedNodeConstructor("productType");

export const denormalizedStringType = denormalizedNodeConstructor("stringType");

export const denormalizedSumTermConstructor =
    denormalizedNodeConstructor("sumTermConstructor");

export const denormalizedSumTermEliminator =
    denormalizedNodeConstructor("sumTermEliminator");

export const denormalizedSumType = denormalizedNodeConstructor("sumType");

export const denormalizedTermBinding =
    denormalizedNodeConstructor("termBinding");

export const denormalizedTermDefinition =
    denormalizedNodeConstructor("termDefinition");

export const denormalizedTermReference =
    denormalizedNodeConstructor("termReference");

export const denormalizedTypeBinding =
    denormalizedNodeConstructor("typeBinding");

export const denormalizedTypeDefinition =
    denormalizedNodeConstructor("typeDefinition");

export const denormalizedTypeReference =
    denormalizedNodeConstructor("typeReference");
