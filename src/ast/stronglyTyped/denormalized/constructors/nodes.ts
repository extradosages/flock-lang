import { denormalizedNodeConstructor } from "./nodeUtils";

export const booleanTerm = denormalizedNodeConstructor("booleanTerm");

export const booleanType = denormalizedNodeConstructor("booleanType");

export const clientImplementation = denormalizedNodeConstructor(
    "clientImplementation",
);

export const floatTerm = denormalizedNodeConstructor("floatTerm");

export const floatType = denormalizedNodeConstructor("floatType");

export const functionTermEliminator = denormalizedNodeConstructor(
    "functionTermEliminator",
);

export const functionType = denormalizedNodeConstructor("functionType");

export const genericTypeConstructor = denormalizedNodeConstructor(
    "genericTypeConstructor",
);

export const genericTypeEliminator = denormalizedNodeConstructor(
    "genericTypeEliminator",
);

export const integerTerm = denormalizedNodeConstructor("integerTerm");

export const integerType = denormalizedNodeConstructor("integerType");

export const lambdaConstructor =
    denormalizedNodeConstructor("lambdaConstructor");

export const largeTypeType = denormalizedNodeConstructor("largeTypeType");

export const library = denormalizedNodeConstructor("library");

export const productTermConstructor = denormalizedNodeConstructor(
    "productTermConstructor",
);

export const productTermEliminator = denormalizedNodeConstructor(
    "productTermEliminator",
);

export const productType = denormalizedNodeConstructor("productType");

export const stringType = denormalizedNodeConstructor("stringType");

export const sumTermConstructor =
    denormalizedNodeConstructor("sumTermConstructor");

export const sumTermEliminator =
    denormalizedNodeConstructor("sumTermEliminator");

export const sumType = denormalizedNodeConstructor("sumType");

export const termBinding = denormalizedNodeConstructor("termBinding");

export const termDefinition = denormalizedNodeConstructor("termDefinition");

export const termReference = denormalizedNodeConstructor("termReference");

export const typeBinding = denormalizedNodeConstructor("typeBinding");

export const typeDefinition = denormalizedNodeConstructor("typeDefinition");

export const typeReference = denormalizedNodeConstructor("typeReference");
