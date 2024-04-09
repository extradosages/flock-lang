import { z } from "zod";

import { idParser } from "../id";
import {
    denormalizedEmptyParser,
    denormalizedRelationalParser,
    denormalizedScalarParser,
    normalizedEmptyParser,
    normalizedRelationalParser,
    normalizedScalarParser,
} from "../nodeData";

import {
    astParsers,
    denormalizedNodeParser,
    edgeParser,
    normalizedNodeParser,
} from "./weak";

// Boolean term

export const booleanTermKindParser = z.literal("booleanTerm");

type BooleanTermKind = z.infer<typeof booleanTermKindParser>;

export const normalizedBooleanTermNodeParser = normalizedNodeParser(
    booleanTermKindParser,
    normalizedScalarParser(z.boolean()),
);

type NormalizedBooleanTermNode = z.infer<
    typeof normalizedBooleanTermNodeParser
>;

export const normalizedBooleanTermEdgeParsers = [] as const;

type NormalizedBooleanTermEdge = z.infer<
    (typeof normalizedBooleanTermEdgeParsers)[number]
>;

export const denormalizedBooleanTermNodeParser = denormalizedNodeParser(
    booleanTermKindParser,
    denormalizedScalarParser(z.boolean()),
);

type DenormalizedBooleanTermNode = z.infer<
    typeof denormalizedBooleanTermNodeParser
>;

export const booleanTerm = astParsers(
    booleanTermKindParser,
    denormalizedBooleanTermNodeParser,
    normalizedBooleanTermNodeParser,
    normalizedBooleanTermEdgeParsers,
);

// Boolean type

export const booleanTypeKindParser = z.literal("booleanType");

type BooleanTypeKind = z.infer<typeof booleanTypeKindParser>;

export const normalizedBooleanTypeNodeParser = normalizedNodeParser(
    booleanTypeKindParser,
    normalizedEmptyParser,
);

type NormalizedBooleanTypeNode = z.infer<
    typeof normalizedBooleanTypeNodeParser
>;

export const normalizedBooleanTypeEdgeParsers = [] as const;

type NormalizedBooleanTypeEdge = z.infer<
    (typeof normalizedBooleanTypeEdgeParsers)[number]
>;

export const denormalizedBooleanTypeNodeParser = denormalizedNodeParser(
    booleanTypeKindParser,
    denormalizedEmptyParser,
);

type DenormalizedBooleanTypeNode = z.infer<
    typeof denormalizedBooleanTypeNodeParser
>;

export const booleanType = astParsers(
    booleanTypeKindParser,
    denormalizedBooleanTypeNodeParser,
    normalizedBooleanTypeNodeParser,
    normalizedBooleanTypeEdgeParsers,
);

// Client implementation

export const clientImplementationKindParser = z.literal("clientImplementation");

type ClientImplementationKind = z.infer<typeof clientImplementationKindParser>;

export const normalizedClientImplementationNodeParser = normalizedNodeParser(
    clientImplementationKindParser,
    normalizedEmptyParser,
);

type NormalizedClientImplementationNode = z.infer<
    typeof normalizedClientImplementationNodeParser
>;

export const normalizedClientImplementationEdgeParsers = [] as const;

type NormalizedClientImplementationEdge = z.infer<
    (typeof normalizedClientImplementationEdgeParsers)[number]
>;

export const denormalizedClientImplementationNodeParser =
    denormalizedNodeParser(
        clientImplementationKindParser,
        denormalizedEmptyParser,
    );

type DenormalizedClientImplementationNode = z.infer<
    typeof denormalizedClientImplementationNodeParser
>;

export const clientImplementation = astParsers(
    clientImplementationKindParser,
    denormalizedClientImplementationNodeParser,
    normalizedClientImplementationNodeParser,
    normalizedClientImplementationEdgeParsers,
);

// Float term

export const floatTermKindParser = z.literal("floatTerm");

type FloatTermKind = z.infer<typeof floatTermKindParser>;

export const normalizedFloatTermNodeParser = normalizedNodeParser(
    floatTermKindParser,
    normalizedScalarParser(z.number()),
);

type NormalizedFloatTermNode = z.infer<typeof normalizedFloatTermNodeParser>;

export const normalizedFloatTermEdgeParsers = [] as const;

type NormalizedFloatTermEdge = z.infer<
    (typeof normalizedFloatTermEdgeParsers)[number]
>;

export const denormalizedFloatTermNodeParser = denormalizedNodeParser(
    floatTermKindParser,
    denormalizedScalarParser(z.number()),
);

type DenormalizedFloatTermNode = z.infer<
    typeof denormalizedFloatTermNodeParser
>;

export const floatTerm = astParsers(
    floatTermKindParser,
    denormalizedFloatTermNodeParser,
    normalizedFloatTermNodeParser,
    normalizedFloatTermEdgeParsers,
);

// Float type

export const floatTypeKindParser = z.literal("floatType");

type FloatTypeKind = z.infer<typeof floatTypeKindParser>;

export const normalizedFloatTypeNodeParser = normalizedNodeParser(
    floatTypeKindParser,
    normalizedEmptyParser,
);

type NormalizedFloatTypeNode = z.infer<typeof normalizedFloatTypeNodeParser>;

export const normalizedFloatTypeEdgeParsers = [] as const;

type NormalizedFloatTypeEdge = z.infer<
    (typeof normalizedFloatTypeEdgeParsers)[number]
>;

export const denormalizedFloatTypeNodeParser = denormalizedNodeParser(
    floatTypeKindParser,
    denormalizedEmptyParser,
);

type DenormalizedFloatTypeNode = z.infer<
    typeof denormalizedFloatTypeNodeParser
>;

export const floatType = astParsers(
    floatTypeKindParser,
    denormalizedFloatTypeNodeParser,
    normalizedFloatTypeNodeParser,
    normalizedFloatTypeEdgeParsers,
);

// Function term eliminator

export const functionTermEliminatorKindParser = z.literal(
    "functionTermEliminator",
);

type FunctionTermEliminatorKind = z.infer<
    typeof functionTermEliminatorKindParser
>;

export const normalizedFunctionTermEliminatorNodeParser = normalizedNodeParser(
    functionTermEliminatorKindParser,
    normalizedRelationalParser,
);

type NormalizedFunctionTermEliminatorNode = z.infer<
    typeof normalizedFunctionTermEliminatorNodeParser
>;

export const normalizedFunctionTermEliminatorEdgeParsers = [
    edgeParser({
        kind: z.literal("function"),
        manyToOne: false,
        sourceKind: functionTermEliminatorKindParser,
        targetKind: z.lazy(() => functionTermConstructorKindParser),
    }),
    edgeParser({
        kind: z.literal("arguments"),
        manyToOne: true,
        sourceKind: functionTermEliminatorKindParser,
        targetKind: z.lazy(() => termKindParser),
    }),
] as const;

type NormalizedFunctionTermEliminatorEdge = z.infer<
    (typeof normalizedFunctionTermEliminatorEdgeParsers)[number]
>;

type DenormalizedFunctionTermEliminatorNode = {
    data: {
        dimensionality: "relational";
        value: {
            arguments: DenormalizedTermNode[];
            function: DenormalizedFunctionTermConstructorNode;
        };
    };
    id: string;
    kind: FunctionTermEliminatorKind;
};

export const denormalizedFunctionTermEliminatorNodeParser: z.ZodType<DenormalizedFunctionTermEliminatorNode> =
    denormalizedNodeParser(
        functionTermEliminatorKindParser,
        denormalizedRelationalParser(
            z.object({
                arguments: z.array(z.lazy(() => denormalizedTermNodeParser)),
                function: z.lazy(
                    () => denormalizedFunctionTermConstructorNodeParser,
                ),
            }),
        ),
    );

export const functionTermEliminator = astParsers(
    functionTermEliminatorKindParser,
    denormalizedFunctionTermEliminatorNodeParser,
    normalizedFunctionTermEliminatorNodeParser,
    normalizedFunctionTermEliminatorEdgeParsers,
);

// Function type

export const functionTypeKindParser = z.literal("functionType");

type FunctionTypeKind = z.infer<typeof functionTypeKindParser>;

export const normalizedFunctionTypeNodeParser = normalizedNodeParser(
    functionTypeKindParser,
    normalizedRelationalParser,
);

type NormalizedFunctionTypeNode = z.infer<
    typeof normalizedFunctionTypeNodeParser
>;

export const normalizedFunctionTypeEdgeParsers = [
    edgeParser({
        kind: z.literal("codomain"),
        manyToOne: false,
        sourceKind: functionTypeKindParser,
        targetKind: z.lazy(() => smallTypeKindParser),
    }),
    edgeParser({
        kind: z.literal("domains"),
        manyToOne: true,
        sourceKind: functionTypeKindParser,
        targetKind: z.lazy(() => smallTypeKindParser),
    }),
] as const;

type NormalizedFunctionTypeEdge = z.infer<
    (typeof normalizedFunctionTypeEdgeParsers)[number]
>;

type DenormalizedFunctionTypeNode = {
    data: {
        dimensionality: "relational";
        value: {
            codomain: DenormalizedSmallTypeNode;
            domains: DenormalizedSmallTypeNode[];
        };
    };
    id: string;
    kind: FunctionTypeKind;
};

export const denormalizedFunctionTypeNodeParser: z.ZodType<DenormalizedFunctionTypeNode> =
    denormalizedNodeParser(
        functionTypeKindParser,
        denormalizedRelationalParser(
            z.object({
                codomain: z.lazy(() => denormalizedSmallTypeNodeParser),
                domains: z.array(z.lazy(() => denormalizedSmallTypeNodeParser)),
            }),
        ),
    );

export const functionType = astParsers(
    functionTypeKindParser,
    denormalizedFunctionTypeNodeParser,
    normalizedFunctionTypeNodeParser,
    normalizedFunctionTypeEdgeParsers,
);

// Generic type constructor

export const genericTypeConstructorKindParser = z.literal(
    "genericTypeConstructor",
);

type GenericTypeConstructorKind = z.infer<
    typeof genericTypeConstructorKindParser
>;

export const normalizedGenericTypeConstructorNodeParser = normalizedNodeParser(
    genericTypeConstructorKindParser,
    normalizedRelationalParser,
);

type NormalizedGenericTypeConstructorNode = z.infer<
    typeof normalizedGenericTypeConstructorNodeParser
>;

export const normalizedGenericTypeConstructorEdgeParsers = [
    edgeParser({
        kind: z.literal("codomainType"),
        manyToOne: false,
        sourceKind: genericTypeConstructorKindParser,
        targetKind: z.lazy(() => smallTypeKindParser),
    }),
    edgeParser({
        kind: z.literal("domainTypeBindings"),
        manyToOne: true,
        sourceKind: genericTypeConstructorKindParser,
        targetKind: z.lazy(() => z.literal("typeBinding")),
    }),
] as const;

type NormalizedGenericTypeConstructorEdge = z.infer<
    (typeof normalizedGenericTypeConstructorEdgeParsers)[number]
>;

type DenormalizedGenericTypeConstructorNode = {
    data: {
        dimensionality: "relational";
        value: {
            codomainType: DenormalizedSmallTypeNode;
            domainTypeBindings: DenormalizedTypeBindingNode[];
        };
    };
    id: string;
    kind: GenericTypeConstructorKind;
};

export const denormalizedGenericTypeConstructorNodeParser: z.ZodType<DenormalizedGenericTypeConstructorNode> =
    denormalizedNodeParser(
        genericTypeConstructorKindParser,
        denormalizedRelationalParser(
            z.object({
                codomainType: z.lazy(() => denormalizedSmallTypeNodeParser),
                domainTypeBindings: z.array(
                    z.lazy(() => denormalizedTypeBindingNodeParser),
                ),
            }),
        ),
    );

export const genericTypeConstructor = astParsers(
    genericTypeConstructorKindParser,
    denormalizedGenericTypeConstructorNodeParser,
    normalizedGenericTypeConstructorNodeParser,
    normalizedGenericTypeConstructorEdgeParsers,
);

// Generic type eliminator

export const genericTypeEliminatorKindParser = z.literal(
    "genericTypeEliminator",
);

type GenericTypeEliminatorKind = z.infer<
    typeof genericTypeEliminatorKindParser
>;

export const normalizedGenericTypeEliminatorNodeParser = normalizedNodeParser(
    genericTypeEliminatorKindParser,
    normalizedRelationalParser,
);

type NormalizedGenericTypeEliminatorNode = z.infer<
    typeof normalizedGenericTypeEliminatorNodeParser
>;

export const normalizedGenericTypeEliminatorEdgeParsers = [
    edgeParser({
        kind: z.literal("arguments"),
        manyToOne: true,
        sourceKind: genericTypeEliminatorKindParser,
        targetKind: z.lazy(() => smallTypeKindParser),
    }),
    edgeParser({
        kind: z.literal("genericType"),
        manyToOne: false,
        sourceKind: genericTypeEliminatorKindParser,
        targetKind: z.lazy(() => largeTypeKindParser),
    }),
] as const;

type NormalizedGenericTypeEliminatorEdge = z.infer<
    (typeof normalizedGenericTypeEliminatorEdgeParsers)[number]
>;

type DenormalizedGenericTypeEliminatorNode = {
    data: {
        dimensionality: "relational";
        value: {
            arguments: DenormalizedSmallTypeNode[];
            genericType: DenormalizedLargeTypeNode;
        };
    };
    id: string;
    kind: GenericTypeEliminatorKind;
};

export const denormalizedGenericTypeEliminatorNodeParser: z.ZodType<DenormalizedGenericTypeEliminatorNode> =
    z.object({
        data: denormalizedRelationalParser(
            z.object({
                arguments: z.array(
                    z.lazy(() => denormalizedSmallTypeNodeParser),
                ),
                genericType: z.lazy(() => denormalizedLargeTypeNodeParser),
            }),
        ),
        id: idParser,
        kind: genericTypeEliminatorKindParser,
    });

export const genericTypeEliminator = astParsers(
    genericTypeEliminatorKindParser,
    denormalizedGenericTypeEliminatorNodeParser,
    normalizedGenericTypeEliminatorNodeParser,
    normalizedGenericTypeEliminatorEdgeParsers,
);

// Integer term

export const integerTermKindParser = z.literal("integerTerm");

type IntegerTermKind = z.infer<typeof integerTermKindParser>;

export const normalizedIntegerTermNodeParser = normalizedNodeParser(
    integerTermKindParser,
    normalizedScalarParser(z.number().int()),
);

type NormalizedIntegerTermNode = z.infer<
    typeof normalizedIntegerTermNodeParser
>;

export const normalizedIntegerTermEdgeParsers = [] as const;

type NormalizedIntegerTermEdge = z.infer<
    (typeof normalizedIntegerTermEdgeParsers)[number]
>;

export const denormalizedIntegerTermNodeParser = denormalizedNodeParser(
    integerTermKindParser,
    denormalizedScalarParser(z.number().int()),
);

type DenormalizedIntegerTermNode = z.infer<
    typeof denormalizedIntegerTermNodeParser
>;

export const integerTerm = astParsers(
    integerTermKindParser,
    denormalizedIntegerTermNodeParser,
    normalizedIntegerTermNodeParser,
    normalizedIntegerTermEdgeParsers,
);

// Integer type

export const integerTypeKindParser = z.literal("integerType");

type IntegerTypeKind = z.infer<typeof integerTypeKindParser>;

export const normalizedIntegerTypeNodeParser = normalizedNodeParser(
    integerTypeKindParser,
    normalizedEmptyParser,
);

type NormalizedIntegerTypeNode = z.infer<
    typeof normalizedIntegerTypeNodeParser
>;

export const normalizedIntegerTypeEdgeParsers = [] as const;

type NormalizedIntegerTypeEdge = z.infer<
    (typeof normalizedIntegerTypeEdgeParsers)[number]
>;

export const denormalizedIntegerTypeNodeParser = denormalizedNodeParser(
    integerTypeKindParser,
    denormalizedEmptyParser,
);

type DenormalizedIntegerTypeNode = z.infer<
    typeof denormalizedIntegerTypeNodeParser
>;

export const integerType = astParsers(
    integerTypeKindParser,
    denormalizedIntegerTypeNodeParser,
    normalizedIntegerTypeNodeParser,
    normalizedIntegerTypeEdgeParsers,
);

// Lambda constructor

export const lambdaConstructorKindParser = z.literal("lambdaConstructor");

type LambdaConstructorKind = z.infer<typeof lambdaConstructorKindParser>;

export const normalizedLambdaConstructorNodeParser = normalizedNodeParser(
    lambdaConstructorKindParser,
    normalizedRelationalParser,
);

type NormalizedLambdaConstructorNode = z.infer<
    typeof normalizedLambdaConstructorNodeParser
>;

export const normalizedLambdaConstructorEdgeParsers = [
    edgeParser({
        kind: z.literal("codomainTerm"),
        manyToOne: false,
        sourceKind: lambdaConstructorKindParser,
        targetKind: z.lazy(() => termKindParser),
    }),
    edgeParser({
        kind: z.literal("domainTermBindings"),
        manyToOne: true,
        sourceKind: lambdaConstructorKindParser,
        targetKind: z.lazy(() => z.literal("termBinding")),
    }),
] as const;

type NormalizedLambdaConstructorEdge = z.infer<
    (typeof normalizedLambdaConstructorEdgeParsers)[number]
>;

type DenormalizedLambdaConstructorNode = {
    data: {
        dimensionality: "relational";
        value: {
            codomainTerm: DenormalizedTermNode;
            domainTermBindings: DenormalizedTermBindingNode[];
        };
    };
    id: string;
    kind: LambdaConstructorKind;
};

export const denormalizedLambdaConstructorNodeParser: z.ZodType<DenormalizedLambdaConstructorNode> =
    denormalizedNodeParser(
        lambdaConstructorKindParser,
        denormalizedRelationalParser(
            z.object({
                codomainTerm: z.lazy(() => denormalizedTermNodeParser),
                domainTermBindings: z.array(
                    z.lazy(() => denormalizedTermBindingNodeParser),
                ),
            }),
        ),
    );

export const lambdaConstructor = astParsers(
    lambdaConstructorKindParser,
    denormalizedLambdaConstructorNodeParser,
    normalizedLambdaConstructorNodeParser,
    normalizedLambdaConstructorEdgeParsers,
);

// Large type type

export const largeTypeTypeKindParser = z.literal("largeTypeType");

type LargeTypeTypeKind = z.infer<typeof largeTypeTypeKindParser>;

export const normalizedLargeTypeTypeNodeParser = normalizedNodeParser(
    largeTypeTypeKindParser,
    normalizedEmptyParser,
);

type NormalizedLargeTypeTypeNode = z.infer<
    typeof normalizedLargeTypeTypeNodeParser
>;

export const normalizedLargeTypeTypeEdgeParsers = [] as const;

type NormalizedLargeTypeTypeEdge = z.infer<
    (typeof normalizedLargeTypeTypeEdgeParsers)[number]
>;

export const denormalizedLargeTypeTypeNodeParser = denormalizedNodeParser(
    largeTypeTypeKindParser,
    denormalizedEmptyParser,
);

type DenormalizedLargeTypeTypeNode = z.infer<
    typeof denormalizedLargeTypeTypeNodeParser
>;

export const largeTypeType = astParsers(
    largeTypeTypeKindParser,
    denormalizedLargeTypeTypeNodeParser,
    normalizedLargeTypeTypeNodeParser,
    normalizedLargeTypeTypeEdgeParsers,
);

// Library

export const libraryKindParser = z.literal("library");

type LibraryKind = z.infer<typeof libraryKindParser>;

export const normalizedLibraryNodeParser = normalizedNodeParser(
    libraryKindParser,
    normalizedRelationalParser,
);

type NormalizedLibraryNode = z.infer<typeof normalizedLibraryNodeParser>;

export const normalizedLibraryEdgeParsers = [
    edgeParser({
        kind: z.literal("termDefinitions"),
        manyToOne: true,
        sourceKind: libraryKindParser,
        targetKind: z.lazy(() => termDefinitionKindParser),
    }),
    edgeParser({
        kind: z.literal("typeDefinitions"),
        manyToOne: true,
        sourceKind: libraryKindParser,
        targetKind: z.lazy(() => typeDefinitionKindParser),
    }),
] as const;

type NormalizedLibraryEdge = z.infer<
    (typeof normalizedLibraryEdgeParsers)[number]
>;

export const denormalizedLibraryNodeParser = denormalizedNodeParser(
    libraryKindParser,
    denormalizedRelationalParser(
        z.object({
            termDefinitions: z.array(
                z.lazy(() => denormalizedTermDefinitionNodeParser),
            ),
            typeDefinitions: z.array(
                z.lazy(() => denormalizedTypeDefinitionNodeParser),
            ),
        }),
    ),
);

type DenormalizedLibraryNode = z.infer<typeof denormalizedLibraryNodeParser>;

export const library = astParsers(
    libraryKindParser,
    denormalizedLibraryNodeParser,
    normalizedLibraryNodeParser,
    normalizedLibraryEdgeParsers,
);

// Product term constructor

export const productTermConstructorKindParser = z.literal(
    "productTermConstructor",
);

type ProductTermConstructorKind = z.infer<
    typeof productTermConstructorKindParser
>;

export const normalizedProductTermConstructorNodeParser = normalizedNodeParser(
    productTermConstructorKindParser,
    normalizedRelationalParser,
);

type NormalizedProductTermConstructorNode = z.infer<
    typeof normalizedProductTermConstructorNodeParser
>;

export const normalizedProductTermConstructorEdgeParsers = [
    edgeParser({
        kind: z.literal("components"),
        manyToOne: true,
        sourceKind: productTermConstructorKindParser,
        targetKind: z.lazy(() => termKindParser),
    }),
] as const;

type NormalizedProductTermConstructorEdge = z.infer<
    (typeof normalizedProductTermConstructorEdgeParsers)[number]
>;

type DenormalizedProductTermConstructorNode = {
    data: {
        dimensionality: "relational";
        value: {
            components: DenormalizedTermNode[];
        };
    };
    id: string;
    kind: ProductTermConstructorKind;
};

export const denormalizedProductTermConstructorNodeParser: z.ZodType<DenormalizedProductTermConstructorNode> =
    denormalizedNodeParser(
        productTermConstructorKindParser,
        denormalizedRelationalParser(
            z.object({
                components: z.array(z.lazy(() => denormalizedTermNodeParser)),
            }),
        ),
    );

export const productTermConstructor = astParsers(
    productTermConstructorKindParser,
    denormalizedProductTermConstructorNodeParser,
    normalizedProductTermConstructorNodeParser,
    normalizedProductTermConstructorEdgeParsers,
);

// Product term eliminator

export const productTermEliminatorKindParser = z.literal(
    "productTermEliminator",
);

type ProductTermEliminatorKind = z.infer<
    typeof productTermEliminatorKindParser
>;

export const normalizedProductTermEliminatorNodeParser = normalizedNodeParser(
    productTermEliminatorKindParser,
    normalizedScalarParser(z.number().int()),
);

type NormalizedProductTermEliminatorNode = z.infer<
    typeof normalizedProductTermEliminatorNodeParser
>;

export const normalizedProductTermEliminatorEdgeParsers = [] as const;

type NormalizedProductTermEliminatorEdge = z.infer<
    (typeof normalizedProductTermEliminatorEdgeParsers)[number]
>;

export const denormalizedProductTermEliminatorNodeParser =
    denormalizedNodeParser(
        productTermEliminatorKindParser,
        denormalizedScalarParser(z.number().int()),
    );

type DenormalizedProductTermEliminatorNode = z.infer<
    typeof denormalizedProductTermEliminatorNodeParser
>;

export const productTermEliminator = astParsers(
    productTermEliminatorKindParser,
    denormalizedProductTermEliminatorNodeParser,
    normalizedProductTermEliminatorNodeParser,
    normalizedProductTermEliminatorEdgeParsers,
);

// Product type

export const productTypeKindParser = z.literal("productType");

type ProductTypeKind = z.infer<typeof productTypeKindParser>;

export const normalizedProductTypeNodeParser = normalizedNodeParser(
    productTypeKindParser,
    normalizedRelationalParser,
);

type NormalizedProductTypeNode = z.infer<
    typeof normalizedProductTypeNodeParser
>;

export const normalizedProductTypeEdgeParsers = [
    edgeParser({
        kind: z.literal("components"),
        manyToOne: true,
        sourceKind: productTypeKindParser,
        targetKind: z.lazy(() => smallTypeKindParser),
    }),
] as const;

type NormalizedProductTypeEdge = z.infer<
    (typeof normalizedProductTypeEdgeParsers)[number]
>;

type DenormalizedProductTypeNode = {
    data: {
        dimensionality: "relational";
        value: {
            components: DenormalizedSmallTypeNode[];
        };
    };
    id: string;
    kind: ProductTypeKind;
};

export const denormalizedProductTypeNodeParser: z.ZodType<DenormalizedProductTypeNode> =
    denormalizedNodeParser(
        productTypeKindParser,
        denormalizedRelationalParser(
            z.object({
                components: z.array(
                    z.lazy(() => denormalizedSmallTypeNodeParser),
                ),
            }),
        ),
    );

export const productType = astParsers(
    productTypeKindParser,
    denormalizedProductTypeNodeParser,
    normalizedProductTypeNodeParser,
    normalizedProductTypeEdgeParsers,
);

// Sum term constructor

export const sumTermConstructorKindParser = z.literal("sumTermConstructor");

type SumTermConstructorKind = z.infer<typeof sumTermConstructorKindParser>;

export const normalizedSumTermConstructorNodeParser = normalizedNodeParser(
    sumTermConstructorKindParser,
    normalizedScalarParser(z.number().int()),
);

type NormalizedSumTermConstructorNode = z.infer<
    typeof normalizedSumTermConstructorNodeParser
>;

export const normalizedSumTermConstructorEdgeParsers = [] as const;

type NormalizedSumTermConstructorEdge = z.infer<
    (typeof normalizedSumTermConstructorEdgeParsers)[number]
>;

export const denormalizedSumTermConstructorNodeParser = denormalizedNodeParser(
    sumTermConstructorKindParser,
    denormalizedScalarParser(z.number().int()),
);

type DenormalizedSumTermConstructorNode = z.infer<
    typeof denormalizedSumTermConstructorNodeParser
>;

export const sumTermConstructor = astParsers(
    sumTermConstructorKindParser,
    denormalizedSumTermConstructorNodeParser,
    normalizedSumTermConstructorNodeParser,
    normalizedSumTermConstructorEdgeParsers,
);

// Sum term eliminator

export const sumTermEliminatorKindParser = z.literal("sumTermEliminator");

type SumTermEliminatorKind = z.infer<typeof sumTermEliminatorKindParser>;

export const normalizedSumTermEliminatorNodeParser = normalizedNodeParser(
    sumTermEliminatorKindParser,
    normalizedRelationalParser,
);

type NormalizedSumTermEliminatorNode = z.infer<
    typeof normalizedSumTermEliminatorNodeParser
>;

export const normalizedSumTermEliminatorEdgeParsers = [
    edgeParser({
        kind: z.literal("components"),
        manyToOne: true,
        sourceKind: sumTermEliminatorKindParser,
        targetKind: z.lazy(() => functionTermConstructorKindParser),
    }),
] as const;

type NormalizedSumTermEliminatorEdge = z.infer<
    (typeof normalizedSumTermEliminatorEdgeParsers)[number]
>;

type DenormalizedSumTermEliminatorNode = {
    data: {
        dimensionality: "relational";
        value: {
            components: DenormalizedFunctionTermConstructorNode[];
        };
    };
    id: string;
    kind: SumTermEliminatorKind;
};

export const denormalizedSumTermEliminatorNodeParser: z.ZodType<DenormalizedSumTermEliminatorNode> =
    denormalizedNodeParser(
        sumTermEliminatorKindParser,
        denormalizedRelationalParser(
            z.object({
                components: z.array(
                    z.lazy(() => denormalizedFunctionTermConstructorNodeParser),
                ),
            }),
        ),
    );

export const sumTermEliminator = astParsers(
    sumTermEliminatorKindParser,
    denormalizedSumTermEliminatorNodeParser,
    normalizedSumTermEliminatorNodeParser,
    normalizedSumTermEliminatorEdgeParsers,
);

// Sum type

export const sumTypeKindParser = z.literal("sumType");

type SumTypeKind = z.infer<typeof sumTypeKindParser>;

export const normalizedSumTypeNodeParser = normalizedNodeParser(
    sumTypeKindParser,
    normalizedRelationalParser,
);

type NormalizedSumTypeNode = z.infer<typeof normalizedSumTypeNodeParser>;

export const normalizedSumTypeEdgeParsers = [
    edgeParser({
        kind: z.literal("components"),
        manyToOne: true,
        sourceKind: sumTypeKindParser,
        targetKind: z.lazy(() => smallTypeKindParser),
    }),
] as const;

type NormalizedSumTypeEdge = z.infer<
    (typeof normalizedSumTypeEdgeParsers)[number]
>;

type DenormalizedSumTypeNode = {
    data: {
        dimensionality: "relational";
        value: {
            components: DenormalizedSmallTypeNode[];
        };
    };
    id: string;
    kind: SumTypeKind;
};

export const denormalizedSumTypeNodeParser: z.ZodType<DenormalizedSumTypeNode> =
    denormalizedNodeParser(
        sumTypeKindParser,
        denormalizedRelationalParser(
            z.object({
                components: z.array(
                    z.lazy(() => denormalizedSmallTypeNodeParser),
                ),
            }),
        ),
    );

export const sumType = astParsers(
    sumTypeKindParser,
    denormalizedSumTypeNodeParser,
    normalizedSumTypeNodeParser,
    normalizedSumTypeEdgeParsers,
);

// String term

export const stringTermKindParser = z.literal("stringTerm");

type StringTermKind = z.infer<typeof stringTermKindParser>;

export const normalizedStringTermNodeParser = normalizedNodeParser(
    stringTermKindParser,
    normalizedScalarParser(z.string()),
);

type NormalizedStringTermNode = z.infer<typeof normalizedStringTermNodeParser>;

export const normalizedStringTermEdgeParsers = [] as const;

type NormalizedStringTermEdge = z.infer<
    (typeof normalizedStringTermEdgeParsers)[number]
>;

export const denormalizedStringTermNodeParser = denormalizedNodeParser(
    stringTermKindParser,
    denormalizedScalarParser(z.string()),
);

type DenormalizedStringTermNode = z.infer<
    typeof denormalizedStringTermNodeParser
>;

export const stringTerm = astParsers(
    stringTermKindParser,
    denormalizedStringTermNodeParser,
    normalizedStringTermNodeParser,
    normalizedStringTermEdgeParsers,
);

// String type

export const stringTypeKindParser = z.literal("stringType");

type StringTypeKind = z.infer<typeof stringTypeKindParser>;

export const normalizedStringTypeNodeParser = normalizedNodeParser(
    stringTypeKindParser,
    normalizedEmptyParser,
);

type NormalizedStringTypeNode = z.infer<typeof normalizedStringTypeNodeParser>;

export const normalizedStringTypeEdgeParsers = [] as const;

type NormalizedStringTypeEdge = z.infer<
    (typeof normalizedStringTypeEdgeParsers)[number]
>;

export const denormalizedStringTypeNodeParser = denormalizedNodeParser(
    stringTypeKindParser,
    denormalizedEmptyParser,
);

type DenormalizedStringTypeNode = z.infer<
    typeof denormalizedStringTypeNodeParser
>;

export const stringType = astParsers(
    stringTypeKindParser,
    denormalizedStringTypeNodeParser,
    normalizedStringTypeNodeParser,
    normalizedStringTypeEdgeParsers,
);

// Term binding

export const termBindingKindParser = z.literal("termBinding");

type TermBindingKind = z.infer<typeof termBindingKindParser>;

export const normalizedTermBindingNodeParser = normalizedNodeParser(
    termBindingKindParser,
    normalizedScalarParser(z.string()),
);

type NormalizedTermBindingNode = z.infer<
    typeof normalizedTermBindingNodeParser
>;

export const normalizedTermBindingEdgeParsers = [] as const;

type NormalizedTermBindingEdge = z.infer<
    (typeof normalizedTermBindingEdgeParsers)[number]
>;

export const denormalizedTermBindingNodeParser = denormalizedNodeParser(
    termBindingKindParser,
    denormalizedScalarParser(z.string()),
);

type DenormalizedTermBindingNode = z.infer<
    typeof denormalizedTermBindingNodeParser
>;

export const termBinding = astParsers(
    termBindingKindParser,
    denormalizedTermBindingNodeParser,
    normalizedTermBindingNodeParser,
    normalizedTermBindingEdgeParsers,
);

// Term definition

export const termDefinitionKindParser = z.literal("termDefinition");

type TermDefinitionKind = z.infer<typeof termDefinitionKindParser>;

export const normalizedTermDefinitionNodeParser = normalizedNodeParser(
    termDefinitionKindParser,
    normalizedRelationalParser,
);

type NormalizedTermDefinitionNode = z.infer<
    typeof normalizedTermDefinitionNodeParser
>;

export const normalizedTermDefinitionEdgeParsers = [
    edgeParser({
        kind: z.literal("binding"),
        manyToOne: false,
        sourceKind: termDefinitionKindParser,
        targetKind: termBindingKindParser,
    }),
    edgeParser({
        kind: z.literal("term"),
        manyToOne: false,
        sourceKind: termDefinitionKindParser,
        targetKind: z.lazy(() =>
            z.union([termKindParser, clientImplementationKindParser]),
        ),
    }),
    edgeParser({
        kind: z.literal("type"),
        manyToOne: false,
        sourceKind: termDefinitionKindParser,
        targetKind: z.lazy(() => largeTypeKindParser),
    }),
] as const;

type NormalizedTermDefinitionEdge = z.infer<
    (typeof normalizedTermDefinitionEdgeParsers)[number]
>;

export const denormalizedTermDefinitionNodeParser = denormalizedNodeParser(
    termDefinitionKindParser,
    denormalizedRelationalParser(
        z.object({
            binding: denormalizedTermBindingNodeParser,
            term: z.lazy(() =>
                z.union([
                    denormalizedTermNodeParser,
                    denormalizedClientImplementationNodeParser,
                ]),
            ),
            type: z.lazy(() => denormalizedLargeTypeNodeParser),
        }),
    ),
);

type DenormalizedTermDefinitionNode = z.infer<
    typeof denormalizedTermDefinitionNodeParser
>;

export const termDefinition = astParsers(
    termDefinitionKindParser,
    denormalizedTermDefinitionNodeParser,
    normalizedTermDefinitionNodeParser,
    normalizedTermDefinitionEdgeParsers,
);

// Term reference

export const termReferenceKindParser = z.literal("termReference");

type TermReferenceKind = z.infer<typeof termReferenceKindParser>;

export const normalizedTermReferenceNodeParser = normalizedNodeParser(
    termReferenceKindParser,
    normalizedScalarParser(z.string()),
);

type NormalizedTermReferenceNode = z.infer<
    typeof normalizedTermReferenceNodeParser
>;

export const normalizedTermReferenceEdgeParsers = [] as const;

type NormalizedTermReferenceEdge = z.infer<
    (typeof normalizedTermReferenceEdgeParsers)[number]
>;

export const denormalizedTermReferenceNodeParser = denormalizedNodeParser(
    termReferenceKindParser,
    denormalizedScalarParser(z.string()),
);

type DenormalizedTermReferenceNode = z.infer<
    typeof denormalizedTermReferenceNodeParser
>;

export const termReference = astParsers(
    termReferenceKindParser,
    denormalizedTermReferenceNodeParser,
    normalizedTermReferenceNodeParser,
    normalizedTermReferenceEdgeParsers,
);

// Type binding

export const typeBindingKindParser = z.literal("typeBinding");

type TypeBindingKind = z.infer<typeof typeBindingKindParser>;

export const normalizedTypeBindingNodeParser = normalizedNodeParser(
    typeBindingKindParser,
    normalizedScalarParser(z.string()),
);

type NormalizedTypeBindingNode = z.infer<
    typeof normalizedTypeBindingNodeParser
>;

export const normalizedTypeBindingEdgeParsers = [] as const;

type NormalizedTypeBindingEdge = z.infer<
    (typeof normalizedTypeBindingEdgeParsers)[number]
>;

export const denormalizedTypeBindingNodeParser = denormalizedNodeParser(
    typeBindingKindParser,
    denormalizedScalarParser(z.string()),
);

type DenormalizedTypeBindingNode = z.infer<
    typeof denormalizedTypeBindingNodeParser
>;

export const typeBinding = astParsers(
    typeBindingKindParser,
    denormalizedTypeBindingNodeParser,
    normalizedTypeBindingNodeParser,
    normalizedTypeBindingEdgeParsers,
);

// Type definition

export const typeDefinitionKindParser = z.literal("typeDefinition");

type TypeDefinitionKind = z.infer<typeof typeDefinitionKindParser>;

export const normalizedTypeDefinitionNodeParser = normalizedNodeParser(
    typeDefinitionKindParser,
    normalizedRelationalParser,
);

type NormalizedTypeDefinitionNode = z.infer<
    typeof normalizedTypeDefinitionNodeParser
>;

export const normalizedTypeDefinitionEdgeParsers = [
    edgeParser({
        kind: z.literal("binding"),
        manyToOne: false,
        sourceKind: typeDefinitionKindParser,
        targetKind: typeBindingKindParser,
    }),
    edgeParser({
        kind: z.literal("type"),
        manyToOne: false,
        sourceKind: typeDefinitionKindParser,
        targetKind: z.lazy(() => largeTypeKindParser),
    }),
] as const;

type NormalizedTypeDefinitionEdge = z.infer<
    (typeof normalizedTypeDefinitionEdgeParsers)[number]
>;

export const denormalizedTypeDefinitionNodeParser = denormalizedNodeParser(
    typeDefinitionKindParser,
    denormalizedRelationalParser(
        z.object({
            binding: denormalizedTypeBindingNodeParser,
            type: z.lazy(() => denormalizedLargeTypeNodeParser),
        }),
    ),
);

type DenormalizedTypeDefinitionNode = z.infer<
    typeof denormalizedTypeDefinitionNodeParser
>;

export const typeDefinition = astParsers(
    typeDefinitionKindParser,
    denormalizedTypeDefinitionNodeParser,
    normalizedTypeDefinitionNodeParser,
    normalizedTypeDefinitionEdgeParsers,
);

// Type reference

export const typeReferenceKindParser = z.literal("typeReference");

type TypeReferenceKind = z.infer<typeof typeReferenceKindParser>;

export const normalizedTypeReferenceNodeParser = normalizedNodeParser(
    typeReferenceKindParser,
    normalizedScalarParser(z.string()),
);

type NormalizedTypeReferenceNode = z.infer<
    typeof normalizedTypeReferenceNodeParser
>;

export const normalizedTypeReferenceEdgeParsers = [] as const;

type NormalizedTypeReferenceEdge = z.infer<
    (typeof normalizedTypeReferenceEdgeParsers)[number]
>;

export const denormalizedTypeReferenceNodeParser = denormalizedNodeParser(
    typeReferenceKindParser,
    denormalizedScalarParser(z.string()),
);

type DenormalizedTypeReferenceNode = z.infer<
    typeof denormalizedTypeReferenceNodeParser
>;

export const typeReference = astParsers(
    typeReferenceKindParser,
    denormalizedTypeReferenceNodeParser,
    normalizedTypeReferenceNodeParser,
    normalizedTypeReferenceEdgeParsers,
);

// ## Unions

// Function term constructor

export const functionTermConstructorKindParser = z.union([
    lambdaConstructorKindParser,
    productTermEliminatorKindParser,
    sumTermConstructorKindParser,
    termReferenceKindParser,
]);

type FunctionTermConstructorKind = z.infer<
    typeof functionTermConstructorKindParser
>;

export const normalizedFunctionTermConstructorNodeParser = z.union([
    normalizedLambdaConstructorNodeParser,
    normalizedProductTermEliminatorNodeParser,
    normalizedSumTermConstructorNodeParser,
    normalizedSumTermEliminatorNodeParser,
    normalizedTermReferenceNodeParser,
]);

type NormalizedFunctionTermConstructorNode = z.infer<
    typeof normalizedFunctionTermConstructorNodeParser
>;

export const normalizedFunctionTermConstructorEdgeParsers = [
    ...normalizedLambdaConstructorEdgeParsers,
    ...normalizedProductTermEliminatorEdgeParsers,
    ...normalizedSumTermConstructorEdgeParsers,
    ...normalizedSumTermEliminatorEdgeParsers,
    ...normalizedTermReferenceEdgeParsers,
] as const;

export const denormalizedFunctionTermConstructorNodeParser = z.union([
    denormalizedLambdaConstructorNodeParser,
    denormalizedProductTermEliminatorNodeParser,
    denormalizedSumTermConstructorNodeParser,
    denormalizedSumTermEliminatorNodeParser,
    denormalizedTermReferenceNodeParser,
]);

type DenormalizedFunctionTermConstructorNode = z.infer<
    typeof denormalizedFunctionTermConstructorNodeParser
>;

// Term

export const termKindParser = z.union([
    booleanTermKindParser,
    floatTermKindParser,
    functionTermEliminatorKindParser,
    integerTermKindParser,
    lambdaConstructorKindParser,
    productTermConstructorKindParser,
    productTermEliminatorKindParser,
    sumTermConstructorKindParser,
    sumTermEliminatorKindParser,
    stringTermKindParser,
    termReferenceKindParser,
]);

type TermKind = z.infer<typeof termKindParser>;

export const normalizedTermNodeParser = z.union([
    normalizedBooleanTermNodeParser,
    normalizedFloatTermNodeParser,
    normalizedFunctionTermEliminatorNodeParser,
    normalizedIntegerTermNodeParser,
    normalizedLambdaConstructorNodeParser,
    normalizedProductTermConstructorNodeParser,
    normalizedProductTermEliminatorNodeParser,
    normalizedSumTermConstructorNodeParser,
    normalizedSumTermEliminatorNodeParser,
    normalizedStringTermNodeParser,
    normalizedTermReferenceNodeParser,
]);

type NormalizedTermNode = z.infer<typeof normalizedTermNodeParser>;

export const normalizedTermEdgeParsers = [
    ...normalizedBooleanTermEdgeParsers,
    ...normalizedFloatTermEdgeParsers,
    ...normalizedFunctionTermEliminatorEdgeParsers,
    ...normalizedIntegerTermEdgeParsers,
    ...normalizedLambdaConstructorEdgeParsers,
    ...normalizedProductTermConstructorEdgeParsers,
    ...normalizedProductTermEliminatorEdgeParsers,
    ...normalizedSumTermConstructorEdgeParsers,
    ...normalizedSumTermEliminatorEdgeParsers,
    ...normalizedStringTermEdgeParsers,
    ...normalizedTermReferenceEdgeParsers,
] as const;

export const denormalizedTermNodeParser = z.union([
    denormalizedBooleanTermNodeParser,
    denormalizedFloatTermNodeParser,
    denormalizedFunctionTermEliminatorNodeParser,
    denormalizedIntegerTermNodeParser,
    denormalizedLambdaConstructorNodeParser,
    denormalizedProductTermConstructorNodeParser,
    denormalizedProductTermEliminatorNodeParser,
    denormalizedSumTermConstructorNodeParser,
    denormalizedSumTermEliminatorNodeParser,
    denormalizedStringTermNodeParser,
    denormalizedTermReferenceNodeParser,
]);

type DenormalizedTermNode = z.infer<typeof denormalizedTermNodeParser>;

// Small types

export const smallTypeKindParser = z.union([
    booleanTypeKindParser,
    floatTypeKindParser,
    functionTypeKindParser,
    genericTypeEliminatorKindParser,
    integerTypeKindParser,
    productTypeKindParser,
    sumTypeKindParser,
    stringTypeKindParser,
    typeReferenceKindParser,
]);

type SmallTypeKind = z.infer<typeof smallTypeKindParser>;

export const normalizedSmallTypeNodeParser = z.discriminatedUnion("kind", [
    normalizedBooleanTypeNodeParser,
    normalizedFloatTypeNodeParser,
    normalizedFunctionTypeNodeParser,
    normalizedGenericTypeEliminatorNodeParser,
    normalizedIntegerTypeNodeParser,
    normalizedProductTypeNodeParser,
    normalizedSumTypeNodeParser,
    normalizedStringTypeNodeParser,
    normalizedTypeReferenceNodeParser,
]);

type NormalizedSmallTypeNode = z.infer<typeof normalizedSmallTypeNodeParser>;

export const normalizedSmallTypeEdgeParsers = [
    ...normalizedBooleanTypeEdgeParsers,
    ...normalizedFloatTypeEdgeParsers,
    ...normalizedFunctionTypeEdgeParsers,
    ...normalizedGenericTypeEliminatorEdgeParsers,
    ...normalizedIntegerTypeEdgeParsers,
    ...normalizedProductTypeEdgeParsers,
    ...normalizedSumTypeEdgeParsers,
    ...normalizedStringTypeEdgeParsers,
    ...normalizedTypeReferenceEdgeParsers,
] as const;

export const denormalizedSmallTypeNodeParser = z.union([
    denormalizedBooleanTypeNodeParser,
    denormalizedFloatTypeNodeParser,
    denormalizedFunctionTypeNodeParser,
    denormalizedGenericTypeEliminatorNodeParser,
    denormalizedIntegerTypeNodeParser,
    denormalizedProductTypeNodeParser,
    denormalizedSumTypeNodeParser,
    denormalizedStringTypeNodeParser,
    denormalizedTypeReferenceNodeParser,
]);

type DenormalizedSmallTypeNode = z.infer<
    typeof denormalizedSmallTypeNodeParser
>;

// Large type

export const largeTypeKindParser = z.union([
    smallTypeKindParser,
    genericTypeConstructorKindParser,
]);

type LargeTypeKind = z.infer<typeof largeTypeKindParser>;

export const normalizedLargeTypeNodeParser = z.union([
    normalizedSmallTypeNodeParser,
    normalizedGenericTypeConstructorNodeParser,
]);

type NormalizedLargeTypeNode = z.infer<typeof normalizedLargeTypeNodeParser>;

export const normalizedLargeTypeEdgeParsers = [
    ...normalizedSmallTypeEdgeParsers,
    ...normalizedGenericTypeConstructorEdgeParsers,
] as const;

export const denormalizedLargeTypeNodeParser = z.union([
    denormalizedSmallTypeNodeParser,
    denormalizedGenericTypeConstructorNodeParser,
]);

type DenormalizedLargeTypeNode = z.infer<
    typeof denormalizedLargeTypeNodeParser
>;
