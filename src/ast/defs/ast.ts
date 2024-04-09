/**
 * TODO: This file was generated with extreme redundancy and explicitness.
 * It deserves a lot of refactoring.
 */
import { z } from "zod";

import { emptyDataParser, scalarDataParser } from "../common";
import {
    parserBundle,
    weakNormalizedRelationalDataParser,
    weakDenormalizedRelationalDataParser,
    weakNormalizedNodeParser,
    weakDenormalizedNodeParser,
    weakEdgeParser,
} from "../weaklyTyped";

// Boolean term

const booleanTermKindParser = z.literal("booleanTerm");

type BooleanTermKind = z.infer<typeof booleanTermKindParser>;

const normalizedBooleanTermDataParser = scalarDataParser(z.boolean());

type NormalizedBooleanTermData = z.infer<
    typeof normalizedBooleanTermDataParser
>;

const normalizedBooleanTermNodeParser = weakNormalizedNodeParser(
    booleanTermKindParser,
    normalizedBooleanTermDataParser,
);

type NormalizedBooleanTermNode = z.infer<
    typeof normalizedBooleanTermNodeParser
>;

const normalizedBooleanTermEdgeParsers = {} as const;

type NormalizedBooleanTermEdge = z.infer<
    (typeof normalizedBooleanTermEdgeParsers)[never]
>;

const denormalizedBooleanTermDataParser = scalarDataParser(z.boolean());

type DenormalizedBooleanTermDataParser = z.infer<
    typeof denormalizedBooleanTermDataParser
>;

const denormalizedBooleanTermNodeParser = weakDenormalizedNodeParser(
    booleanTermKindParser,
    denormalizedBooleanTermDataParser,
);

type DenormalizedBooleanTermNode = z.infer<
    typeof denormalizedBooleanTermNodeParser
>;

export const booleanTerm = parserBundle({
    denormalizedData: denormalizedBooleanTermDataParser,
    kind: booleanTermKindParser,
    normalizedData: normalizedBooleanTermDataParser,
    normalizedEdges: normalizedBooleanTermEdgeParsers,
});

// Boolean type

const booleanTypeKindParser = z.literal("booleanType");

type BooleanTypeKind = z.infer<typeof booleanTypeKindParser>;

const normalizedBooleanTypeDataParser = emptyDataParser;

type NormalizedBooleanTypeData = z.infer<
    typeof normalizedBooleanTypeDataParser
>;

const normalizedBooleanTypeNodeParser = weakNormalizedNodeParser(
    booleanTypeKindParser,
    normalizedBooleanTypeDataParser,
);

type NormalizedBooleanTypeNode = z.infer<
    typeof normalizedBooleanTypeNodeParser
>;

const normalizedBooleanTypeEdgeParsers = {} as const;

type NormalizedBooleanTypeEdge = z.infer<
    (typeof normalizedBooleanTypeEdgeParsers)[never]
>;

const denormalizedBooleanTypeDataParser = emptyDataParser;

const denormalizedBooleanTypeNodeParser = weakDenormalizedNodeParser(
    booleanTypeKindParser,
    denormalizedBooleanTypeDataParser,
);

type DenormalizedBooleanTypeNode = z.infer<
    typeof denormalizedBooleanTypeNodeParser
>;

export const booleanType = parserBundle({
    denormalizedData: denormalizedBooleanTypeDataParser,
    kind: booleanTypeKindParser,
    normalizedData: normalizedBooleanTypeDataParser,
    normalizedEdges: normalizedBooleanTypeEdgeParsers,
});

// Client implementation

const clientImplementationKindParser = z.literal("clientImplementation");

type ClientImplementationKind = z.infer<typeof clientImplementationKindParser>;

const normalizedClientImplementationDataParser = emptyDataParser;

type NormalizedClientImplementationData = z.infer<
    typeof normalizedClientImplementationDataParser
>;

const normalizedClientImplementationNodeParser = weakNormalizedNodeParser(
    clientImplementationKindParser,
    normalizedClientImplementationDataParser,
);

type NormalizedClientImplementationNode = z.infer<
    typeof normalizedClientImplementationNodeParser
>;

const normalizedClientImplementationEdgeParsers = {} as const;

type NormalizedClientImplementationEdge = z.infer<
    (typeof normalizedClientImplementationEdgeParsers)[never]
>;

const denormalizedClientImplementationDataParser = emptyDataParser;

type DenormalizedClientImplementationData = z.infer<
    typeof denormalizedClientImplementationDataParser
>;

const denormalizedClientImplementationNodeParser = weakDenormalizedNodeParser(
    clientImplementationKindParser,
    denormalizedClientImplementationDataParser,
);

type DenormalizedClientImplementationNode = z.infer<
    typeof denormalizedClientImplementationNodeParser
>;

export const clientImplementation = parserBundle({
    denormalizedData: denormalizedClientImplementationDataParser,
    kind: clientImplementationKindParser,
    normalizedData: normalizedClientImplementationDataParser,
    normalizedEdges: normalizedClientImplementationEdgeParsers,
});

// Float term

const floatTermKindParser = z.literal("floatTerm");

type FloatTermKind = z.infer<typeof floatTermKindParser>;

const normalizedFloatTermDataParser = scalarDataParser(z.number());

type NormalizedFloatTermData = z.infer<typeof normalizedFloatTermDataParser>;

const normalizedFloatTermNodeParser = weakNormalizedNodeParser(
    floatTermKindParser,
    normalizedFloatTermDataParser,
);

type NormalizedFloatTermNode = z.infer<typeof normalizedFloatTermNodeParser>;

const normalizedFloatTermEdgeParsers = {} as const;

type NormalizedFloatTermEdge = z.infer<
    (typeof normalizedFloatTermEdgeParsers)[never]
>;

const denormalizedFloatTermDataParser = scalarDataParser(z.number());

type DenormalizedFloatTermData = z.infer<
    typeof denormalizedFloatTermDataParser
>;

const denormalizedFloatTermNodeParser = weakDenormalizedNodeParser(
    floatTermKindParser,
    denormalizedFloatTermDataParser,
);

type DenormalizedFloatTermNode = z.infer<
    typeof denormalizedFloatTermNodeParser
>;

export const floatTerm = parserBundle({
    denormalizedData: denormalizedFloatTermDataParser,
    kind: floatTermKindParser,
    normalizedData: normalizedFloatTermDataParser,
    normalizedEdges: normalizedFloatTermEdgeParsers,
});

// Float type

const floatTypeKindParser = z.literal("floatType");

type FloatTypeKind = z.infer<typeof floatTypeKindParser>;

const normalizedFloatTypeDataParser = emptyDataParser;

type NormalizedFloatTypeData = z.infer<typeof normalizedFloatTypeDataParser>;

const normalizedFloatTypeNodeParser = weakNormalizedNodeParser(
    floatTypeKindParser,
    normalizedFloatTypeDataParser,
);

type NormalizedFloatTypeNode = z.infer<typeof normalizedFloatTypeNodeParser>;

const normalizedFloatTypeEdgeParsers = {} as const;

type NormalizedFloatTypeEdge = z.infer<
    (typeof normalizedFloatTypeEdgeParsers)[never]
>;

const denormalizedFloatTypeDataParser = emptyDataParser;

type DenormalizedFloatTypeData = z.infer<
    typeof denormalizedFloatTypeDataParser
>;

const denormalizedFloatTypeNodeParser = weakDenormalizedNodeParser(
    floatTypeKindParser,
    denormalizedFloatTypeDataParser,
);

type DenormalizedFloatTypeNode = z.infer<
    typeof denormalizedFloatTypeNodeParser
>;

export const floatType = parserBundle({
    denormalizedData: denormalizedFloatTypeDataParser,
    kind: floatTypeKindParser,
    normalizedData: normalizedFloatTypeDataParser,
    normalizedEdges: normalizedFloatTypeEdgeParsers,
});

// Function term eliminator

const functionTermEliminatorKindParser = z.literal("functionTermEliminator");

type FunctionTermEliminatorKind = z.infer<
    typeof functionTermEliminatorKindParser
>;

const normalizedFunctionTermEliminatorDataParser =
    weakNormalizedRelationalDataParser;

type NormalizedFunctionTermEliminatorData = z.infer<
    typeof normalizedFunctionTermEliminatorDataParser
>;

const normalizedFunctionTermEliminatorNodeParser = weakNormalizedNodeParser(
    functionTermEliminatorKindParser,
    normalizedFunctionTermEliminatorDataParser,
);

type NormalizedFunctionTermEliminatorNode = z.infer<
    typeof normalizedFunctionTermEliminatorNodeParser
>;

const normalizedFunctionTermEliminatorEdgeParsers = {
    function: weakEdgeParser({
        kind: z.literal("function"),
        manyToOne: false,
        sourceKind: functionTermEliminatorKindParser,
        targetKind: z.lazy(() => functionTermConstructorKindParser),
    }),
    arguments: weakEdgeParser({
        kind: z.literal("arguments"),
        manyToOne: true,
        sourceKind: functionTermEliminatorKindParser,
        targetKind: z.lazy(() => termKindParser),
    }),
} as const;

type NormalizedFunctionTermEliminatorEdge = z.infer<
    (typeof normalizedFunctionTermEliminatorEdgeParsers)[
        | "function"
        | "arguments"]
>;

type DenormalizedFunctionTermEliminatorData = {
    dimensionality: "relational";
    value: {
        arguments: DenormalizedTermNode[];
        function: DenormalizedFunctionTermConstructorNode;
    };
};

const denormalizedFunctionTermEliminatorDataParser: z.ZodType<DenormalizedFunctionTermEliminatorData> =
    weakDenormalizedRelationalDataParser(
        z.object({
            arguments: z.array(z.lazy(() => denormalizedTermNodeParser)),
            function: z.lazy(
                () => denormalizedFunctionTermConstructorNodeParser,
            ),
        }),
    );

type DenormalizedFunctionTermEliminatorNode = {
    data: DenormalizedFunctionTermEliminatorData;
    id: string;
    kind: FunctionTermEliminatorKind;
};

const denormalizedFunctionTermEliminatorNodeParser: z.ZodType<DenormalizedFunctionTermEliminatorNode> =
    weakDenormalizedNodeParser(
        functionTermEliminatorKindParser,
        denormalizedFunctionTermEliminatorDataParser,
    );

export const functionTermEliminator = parserBundle({
    denormalizedData: denormalizedFunctionTermEliminatorDataParser,
    kind: functionTermEliminatorKindParser,
    normalizedData: normalizedFunctionTermEliminatorDataParser,
    normalizedEdges: normalizedFunctionTermEliminatorEdgeParsers,
});

// Function type

const functionTypeKindParser = z.literal("functionType");

type FunctionTypeKind = z.infer<typeof functionTypeKindParser>;

const normalizedFunctionTypeDataParser = weakNormalizedRelationalDataParser;

type NormalizedFunctionTypeData = z.infer<
    typeof normalizedFunctionTypeDataParser
>;

const normalizedFunctionTypeNodeParser = weakNormalizedNodeParser(
    functionTypeKindParser,
    normalizedFunctionTypeDataParser,
);

type NormalizedFunctionTypeNode = z.infer<
    typeof normalizedFunctionTypeNodeParser
>;

const normalizedFunctionTypeEdgeParsers = {
    codomain: weakEdgeParser({
        kind: z.literal("codomain"),
        manyToOne: false,
        sourceKind: functionTypeKindParser,
        targetKind: z.lazy(() => smallTypeKindParser),
    }),
    domains: weakEdgeParser({
        kind: z.literal("domains"),
        manyToOne: true,
        sourceKind: functionTypeKindParser,
        targetKind: z.lazy(() => smallTypeKindParser),
    }),
} as const;

type NormalizedFunctionTypeEdge = z.infer<
    (typeof normalizedFunctionTypeEdgeParsers)["codomain" | "domains"]
>;

type DenormalizedFunctionTypeData = {
    dimensionality: "relational";
    value: {
        codomain: DenormalizedSmallTypeNode;
        domains: DenormalizedSmallTypeNode[];
    };
};

const denormalizedFunctionTypeDataParser: z.ZodType<DenormalizedFunctionTypeData> =
    weakDenormalizedRelationalDataParser(
        z.object({
            codomain: z.lazy(() => denormalizedSmallTypeNodeParser),
            domains: z.array(z.lazy(() => denormalizedSmallTypeNodeParser)),
        }),
    );

type DenormalizedFunctionTypeNode = {
    data: DenormalizedFunctionTypeData;
    id: string;
    kind: FunctionTypeKind;
};

const denormalizedFunctionTypeNodeParser: z.ZodType<DenormalizedFunctionTypeNode> =
    weakDenormalizedNodeParser(
        functionTypeKindParser,
        denormalizedFunctionTypeDataParser,
    );

export const functionType = parserBundle({
    denormalizedData: denormalizedFunctionTypeDataParser,
    kind: functionTypeKindParser,
    normalizedData: normalizedFunctionTypeDataParser,
    normalizedEdges: normalizedFunctionTypeEdgeParsers,
});

// Generic type constructor

const genericTypeConstructorKindParser = z.literal("genericTypeConstructor");

type GenericTypeConstructorKind = z.infer<
    typeof genericTypeConstructorKindParser
>;

const normalizedGenericTypeConstructorDataParser =
    weakNormalizedRelationalDataParser;

type NormalizedGenericTypeConstructorData = z.infer<
    typeof normalizedGenericTypeConstructorDataParser
>;

const normalizedGenericTypeConstructorNodeParser = weakNormalizedNodeParser(
    genericTypeConstructorKindParser,
    normalizedGenericTypeConstructorDataParser,
);

type NormalizedGenericTypeConstructorNode = z.infer<
    typeof normalizedGenericTypeConstructorNodeParser
>;

const normalizedGenericTypeConstructorEdgeParsers = {
    codomainType: weakEdgeParser({
        kind: z.literal("codomainType"),
        manyToOne: false,
        sourceKind: genericTypeConstructorKindParser,
        targetKind: z.lazy(() => smallTypeKindParser),
    }),
    domainTypeBindings: weakEdgeParser({
        kind: z.literal("domainTypeBindings"),
        manyToOne: true,
        sourceKind: genericTypeConstructorKindParser,
        targetKind: z.lazy(() => z.literal("typeBinding")),
    }),
} as const;

type NormalizedGenericTypeConstructorEdge = z.infer<
    (typeof normalizedGenericTypeConstructorEdgeParsers)[
        | "codomainType"
        | "domainTypeBindings"]
>;

type DenormalizedGenericTypeConstructorData = {
    dimensionality: "relational";
    value: {
        codomainType: DenormalizedSmallTypeNode;
        domainTypeBindings: DenormalizedTypeBindingNode[];
    };
};

const denormalizedGenericTypeConstructorDataParser: z.ZodType<DenormalizedGenericTypeConstructorData> =
    weakDenormalizedRelationalDataParser(
        z.object({
            codomainType: z.lazy(() => denormalizedSmallTypeNodeParser),
            domainTypeBindings: z.array(
                z.lazy(() => denormalizedTypeBindingNodeParser),
            ),
        }),
    );

type DenormalizedGenericTypeConstructorNode = {
    data: DenormalizedGenericTypeConstructorData;
    id: string;
    kind: GenericTypeConstructorKind;
};

const denormalizedGenericTypeConstructorNodeParser: z.ZodType<DenormalizedGenericTypeConstructorNode> =
    weakDenormalizedNodeParser(
        genericTypeConstructorKindParser,
        denormalizedGenericTypeConstructorDataParser,
    );

export const genericTypeConstructor = parserBundle({
    denormalizedData: denormalizedGenericTypeConstructorDataParser,
    kind: genericTypeConstructorKindParser,
    normalizedData: normalizedGenericTypeConstructorDataParser,
    normalizedEdges: normalizedGenericTypeConstructorEdgeParsers,
});

// Generic type eliminator

const genericTypeEliminatorKindParser = z.literal("genericTypeEliminator");

type GenericTypeEliminatorKind = z.infer<
    typeof genericTypeEliminatorKindParser
>;

const normalizedGenericTypeEliminatorDataParser =
    weakNormalizedRelationalDataParser;

type NormalizedGenericTypeEliminatorData = z.infer<
    typeof normalizedGenericTypeEliminatorDataParser
>;

const normalizedGenericTypeEliminatorNodeParser = weakNormalizedNodeParser(
    genericTypeEliminatorKindParser,
    normalizedGenericTypeEliminatorDataParser,
);

type NormalizedGenericTypeEliminatorNode = z.infer<
    typeof normalizedGenericTypeEliminatorNodeParser
>;

const normalizedGenericTypeEliminatorEdgeParsers = {
    arguments: weakEdgeParser({
        kind: z.literal("arguments"),
        manyToOne: true,
        sourceKind: genericTypeEliminatorKindParser,
        targetKind: z.lazy(() => smallTypeKindParser),
    }),
    genericType: weakEdgeParser({
        kind: z.literal("genericType"),
        manyToOne: false,
        sourceKind: genericTypeEliminatorKindParser,
        targetKind: z.lazy(() => largeTypeKindParser),
    }),
} as const;

type NormalizedGenericTypeEliminatorEdge = z.infer<
    (typeof normalizedGenericTypeEliminatorEdgeParsers)[
        | "arguments"
        | "genericType"]
>;

type DenormalizedGenericTypeEliminatorData = {
    dimensionality: "relational";
    value: {
        arguments: DenormalizedSmallTypeNode[];
        genericType: DenormalizedLargeTypeNode;
    };
};

const denormalizedGenericTypeEliminatorDataParser: z.ZodType<DenormalizedGenericTypeEliminatorData> =
    weakDenormalizedRelationalDataParser(
        z.object({
            arguments: z.array(z.lazy(() => denormalizedSmallTypeNodeParser)),
            genericType: z.lazy(() => denormalizedLargeTypeNodeParser),
        }),
    );

type DenormalizedGenericTypeEliminatorNode = {
    data: DenormalizedGenericTypeEliminatorData;
    id: string;
    kind: GenericTypeEliminatorKind;
};

const denormalizedGenericTypeEliminatorNodeParser: z.ZodType<DenormalizedGenericTypeEliminatorNode> =
    weakDenormalizedNodeParser(
        genericTypeEliminatorKindParser,
        denormalizedGenericTypeEliminatorDataParser,
    );

export const genericTypeEliminator = parserBundle({
    denormalizedData: denormalizedGenericTypeEliminatorDataParser,
    kind: genericTypeEliminatorKindParser,
    normalizedData: normalizedGenericTypeEliminatorDataParser,
    normalizedEdges: normalizedGenericTypeEliminatorEdgeParsers,
});

// Integer term

const integerTermKindParser = z.literal("integerTerm");

type IntegerTermKind = z.infer<typeof integerTermKindParser>;

const normalizedIntegerTermDataParser = scalarDataParser(z.number().int());

type NormalizedIntegerTermData = z.infer<
    typeof normalizedIntegerTermDataParser
>;

const normalizedIntegerTermNodeParser = weakNormalizedNodeParser(
    integerTermKindParser,
    normalizedIntegerTermDataParser,
);

type NormalizedIntegerTermNode = z.infer<
    typeof normalizedIntegerTermNodeParser
>;

const normalizedIntegerTermEdgeParsers = {} as const;

type NormalizedIntegerTermEdge = z.infer<
    (typeof normalizedIntegerTermEdgeParsers)[never]
>;

const denormalizedIntegerTermDataParser = scalarDataParser(z.number().int());

type DenormalizedIntegerTermData = z.infer<
    typeof denormalizedIntegerTermDataParser
>;

const denormalizedIntegerTermNodeParser = weakDenormalizedNodeParser(
    integerTermKindParser,
    denormalizedIntegerTermDataParser,
);

type DenormalizedIntegerTermNode = z.infer<
    typeof denormalizedIntegerTermNodeParser
>;

export const integerTerm = parserBundle({
    denormalizedData: denormalizedIntegerTermDataParser,
    kind: integerTermKindParser,
    normalizedData: normalizedIntegerTermDataParser,
    normalizedEdges: normalizedIntegerTermEdgeParsers,
});

// Integer type

const integerTypeKindParser = z.literal("integerType");

type IntegerTypeKind = z.infer<typeof integerTypeKindParser>;

const normalizedIntegerTypeDataParser = emptyDataParser;

type NormalizedIntegerTypeData = z.infer<
    typeof normalizedIntegerTypeDataParser
>;

const normalizedIntegerTypeNodeParser = weakNormalizedNodeParser(
    integerTypeKindParser,
    normalizedIntegerTypeDataParser,
);

type NormalizedIntegerTypeNode = z.infer<
    typeof normalizedIntegerTypeNodeParser
>;

const normalizedIntegerTypeEdgeParsers = {} as const;

type NormalizedIntegerTypeEdge = z.infer<
    (typeof normalizedIntegerTypeEdgeParsers)[never]
>;

const denormalizedIntegerTypeDataParser = emptyDataParser;

type DenormalizedIntegerTypeData = z.infer<
    typeof denormalizedIntegerTypeDataParser
>;

const denormalizedIntegerTypeNodeParser = weakDenormalizedNodeParser(
    integerTypeKindParser,
    denormalizedIntegerTypeDataParser,
);

type DenormalizedIntegerTypeNode = z.infer<
    typeof denormalizedIntegerTypeNodeParser
>;

export const integerType = parserBundle({
    denormalizedData: denormalizedIntegerTypeDataParser,
    kind: integerTypeKindParser,
    normalizedData: normalizedIntegerTypeDataParser,
    normalizedEdges: normalizedIntegerTypeEdgeParsers,
});

// Lambda constructor

const lambdaConstructorKindParser = z.literal("lambdaConstructor");

type LambdaConstructorKind = z.infer<typeof lambdaConstructorKindParser>;

const normalizedLambdaConstructorDataParser =
    weakNormalizedRelationalDataParser;

type NormalizedLambdaConstructorData = z.infer<
    typeof normalizedLambdaConstructorDataParser
>;

const normalizedLambdaConstructorNodeParser = weakNormalizedNodeParser(
    lambdaConstructorKindParser,
    normalizedLambdaConstructorDataParser,
);

type NormalizedLambdaConstructorNode = z.infer<
    typeof normalizedLambdaConstructorNodeParser
>;

const normalizedLambdaConstructorEdgeParsers = {
    codomainTerm: weakEdgeParser({
        kind: z.literal("codomainTerm"),
        manyToOne: false,
        sourceKind: lambdaConstructorKindParser,
        targetKind: z.lazy(() => termKindParser),
    }),
    domainTermBindings: weakEdgeParser({
        kind: z.literal("domainTermBindings"),
        manyToOne: true,
        sourceKind: lambdaConstructorKindParser,
        targetKind: z.lazy(() => z.literal("termBinding")),
    }),
} as const;

type NormalizedLambdaConstructorEdge = z.infer<
    (typeof normalizedLambdaConstructorEdgeParsers)[
        | "codomainTerm"
        | "domainTermBindings"]
>;

type DenormalizedLambdaConstructorData = {
    dimensionality: "relational";
    value: {
        codomainTerm: DenormalizedTermNode;
        domainTermBindings: DenormalizedTermBindingNode[];
    };
};

const denormalizedLambdaConstructorDataParser: z.ZodType<DenormalizedLambdaConstructorData> =
    weakDenormalizedRelationalDataParser(
        z.object({
            codomainTerm: z.lazy(() => denormalizedTermNodeParser),
            domainTermBindings: z.array(
                z.lazy(() => denormalizedTermBindingNodeParser),
            ),
        }),
    );

type DenormalizedLambdaConstructorNode = {
    data: DenormalizedLambdaConstructorData;
    id: string;
    kind: LambdaConstructorKind;
};

const denormalizedLambdaConstructorNodeParser: z.ZodType<DenormalizedLambdaConstructorNode> =
    weakDenormalizedNodeParser(
        lambdaConstructorKindParser,
        denormalizedLambdaConstructorDataParser,
    );

export const lambdaConstructor = parserBundle({
    denormalizedData: denormalizedLambdaConstructorDataParser,
    kind: lambdaConstructorKindParser,
    normalizedData: normalizedLambdaConstructorDataParser,
    normalizedEdges: normalizedLambdaConstructorEdgeParsers,
});

// Large type type

const largeTypeTypeKindParser = z.literal("largeTypeType");

type LargeTypeTypeKind = z.infer<typeof largeTypeTypeKindParser>;

const normalizedLargeTypeTypeDataParser = emptyDataParser;

type NormalizedLargeTypeTypeData = z.infer<
    typeof normalizedLargeTypeTypeDataParser
>;

const normalizedLargeTypeTypeNodeParser = weakNormalizedNodeParser(
    largeTypeTypeKindParser,
    normalizedLargeTypeTypeDataParser,
);

type NormalizedLargeTypeTypeNode = z.infer<
    typeof normalizedLargeTypeTypeNodeParser
>;

const normalizedLargeTypeTypeEdgeParsers = {} as const;

type NormalizedLargeTypeTypeEdge = z.infer<
    (typeof normalizedLargeTypeTypeEdgeParsers)[never]
>;

const denormalizedLargeTypeTypeDataParser = emptyDataParser;

type DenormalizedLargeTypeTypeData = z.infer<
    typeof denormalizedLargeTypeTypeDataParser
>;

const denormalizedLargeTypeTypeNodeParser = weakDenormalizedNodeParser(
    largeTypeTypeKindParser,
    denormalizedLargeTypeTypeDataParser,
);

type DenormalizedLargeTypeTypeNode = z.infer<
    typeof denormalizedLargeTypeTypeNodeParser
>;

export const largeTypeType = parserBundle({
    denormalizedData: denormalizedLargeTypeTypeDataParser,
    kind: largeTypeTypeKindParser,
    normalizedData: normalizedLargeTypeTypeDataParser,
    normalizedEdges: normalizedLargeTypeTypeEdgeParsers,
});

// Library

const libraryKindParser = z.literal("library");

type LibraryKind = z.infer<typeof libraryKindParser>;

const normalizedLibraryDataParser = weakNormalizedRelationalDataParser;

type NormalizedLibraryData = z.infer<typeof normalizedLibraryDataParser>;

const normalizedLibraryNodeParser = weakNormalizedNodeParser(
    libraryKindParser,
    normalizedLibraryDataParser,
);

type NormalizedLibraryNode = z.infer<typeof normalizedLibraryNodeParser>;

const normalizedLibraryEdgeParsers = {
    termDefinitions: weakEdgeParser({
        kind: z.literal("termDefinitions"),
        manyToOne: true,
        sourceKind: libraryKindParser,
        targetKind: z.lazy(() => termDefinitionKindParser),
    }),
    typeDefinitions: weakEdgeParser({
        kind: z.literal("typeDefinitions"),
        manyToOne: true,
        sourceKind: libraryKindParser,
        targetKind: z.lazy(() => typeDefinitionKindParser),
    }),
} as const;

type NormalizedLibraryEdge = z.infer<
    (typeof normalizedLibraryEdgeParsers)["termDefinitions" | "typeDefinitions"]
>;

const denormalizedLibraryDataParser = weakDenormalizedRelationalDataParser(
    z.object({
        termDefinitions: z.array(
            z.lazy(() => denormalizedTermDefinitionNodeParser),
        ),
        typeDefinitions: z.array(
            z.lazy(() => denormalizedTypeDefinitionNodeParser),
        ),
    }),
);

type DenormalizedLibraryData = z.infer<typeof denormalizedLibraryDataParser>;

const denormalizedLibraryNodeParser = weakDenormalizedNodeParser(
    libraryKindParser,
    denormalizedLibraryDataParser,
);

type DenormalizedLibraryNode = z.infer<typeof denormalizedLibraryNodeParser>;

export const library = parserBundle({
    denormalizedData: denormalizedLibraryDataParser,
    kind: libraryKindParser,
    normalizedData: normalizedLibraryDataParser,
    normalizedEdges: normalizedLibraryEdgeParsers,
});

// Product term constructor

const productTermConstructorKindParser = z.literal("productTermConstructor");

type ProductTermConstructorKind = z.infer<
    typeof productTermConstructorKindParser
>;

const normalizedProductTermConstructorDataParser =
    weakNormalizedRelationalDataParser;

type NormalizedProductTermConstructorData = z.infer<
    typeof normalizedProductTermConstructorDataParser
>;

const normalizedProductTermConstructorNodeParser = weakNormalizedNodeParser(
    productTermConstructorKindParser,
    normalizedProductTermConstructorDataParser,
);

type NormalizedProductTermConstructorNode = z.infer<
    typeof normalizedProductTermConstructorNodeParser
>;

const normalizedProductTermConstructorEdgeParsers = {
    components: weakEdgeParser({
        kind: z.literal("components"),
        manyToOne: true,
        sourceKind: productTermConstructorKindParser,
        targetKind: z.lazy(() => termKindParser),
    }),
} as const;

type NormalizedProductTermConstructorEdge = z.infer<
    (typeof normalizedProductTermConstructorEdgeParsers)["components"]
>;

type DenormalizedProductTermConstructorData = {
    dimensionality: "relational";
    value: {
        components: DenormalizedTermNode[];
    };
};

const denormalizedProductTermConstructorDataParser: z.ZodType<DenormalizedProductTermConstructorData> =
    weakDenormalizedRelationalDataParser(
        z.object({
            components: z.array(z.lazy(() => denormalizedTermNodeParser)),
        }),
    );

type DenormalizedProductTermConstructorNode = {
    data: DenormalizedProductTermConstructorData;
    id: string;
    kind: ProductTermConstructorKind;
};

const denormalizedProductTermConstructorNodeParser: z.ZodType<DenormalizedProductTermConstructorNode> =
    weakDenormalizedNodeParser(
        productTermConstructorKindParser,
        denormalizedProductTermConstructorDataParser,
    );

export const productTermConstructor = parserBundle({
    denormalizedData: denormalizedProductTermConstructorDataParser,
    kind: productTermConstructorKindParser,
    normalizedData: normalizedProductTermConstructorDataParser,
    normalizedEdges: normalizedProductTermConstructorEdgeParsers,
});

// Product term eliminator

const productTermEliminatorKindParser = z.literal("productTermEliminator");

type ProductTermEliminatorKind = z.infer<
    typeof productTermEliminatorKindParser
>;

const normalizedProductTermEliminatorDataParser = scalarDataParser(
    z.number().int(),
);

type NormalizedProductTermEliminatorData = z.infer<
    typeof normalizedProductTermEliminatorDataParser
>;

const normalizedProductTermEliminatorNodeParser = weakNormalizedNodeParser(
    productTermEliminatorKindParser,
    normalizedProductTermEliminatorDataParser,
);

type NormalizedProductTermEliminatorNode = z.infer<
    typeof normalizedProductTermEliminatorNodeParser
>;

const normalizedProductTermEliminatorEdgeParsers = {} as const;

type NormalizedProductTermEliminatorEdge = z.infer<
    (typeof normalizedProductTermEliminatorEdgeParsers)[never]
>;

const denormalizedProductTermEliminatorDataParser = scalarDataParser(
    z.number().int(),
);

type DenormalizedProductTermEliminatorData = z.infer<
    typeof denormalizedProductTermEliminatorDataParser
>;

const denormalizedProductTermEliminatorNodeParser = weakDenormalizedNodeParser(
    productTermEliminatorKindParser,
    denormalizedProductTermEliminatorDataParser,
);

type DenormalizedProductTermEliminatorNode = z.infer<
    typeof denormalizedProductTermEliminatorNodeParser
>;

export const productTermEliminator = parserBundle({
    denormalizedData: denormalizedProductTermEliminatorDataParser,
    kind: productTermEliminatorKindParser,
    normalizedData: normalizedProductTermEliminatorDataParser,
    normalizedEdges: normalizedProductTermEliminatorEdgeParsers,
});

// Product type

const productTypeKindParser = z.literal("productType");

type ProductTypeKind = z.infer<typeof productTypeKindParser>;

const normalizedProductTypeDataParser = weakNormalizedRelationalDataParser;

type NormalizedProductTypeData = z.infer<
    typeof normalizedProductTypeDataParser
>;

const normalizedProductTypeNodeParser = weakNormalizedNodeParser(
    productTypeKindParser,
    normalizedProductTypeDataParser,
);

type NormalizedProductTypeNode = z.infer<
    typeof normalizedProductTypeNodeParser
>;

const normalizedProductTypeEdgeParsers = {
    components: weakEdgeParser({
        kind: z.literal("components"),
        manyToOne: true,
        sourceKind: productTypeKindParser,
        targetKind: z.lazy(() => smallTypeKindParser),
    }),
} as const;

type NormalizedProductTypeEdge = z.infer<
    (typeof normalizedProductTypeEdgeParsers)["components"]
>;

type DenormalizedProductTypeData = {
    dimensionality: "relational";
    value: {
        components: DenormalizedSmallTypeNode[];
    };
};

const denormalizedProductTypeDataParser: z.ZodType<DenormalizedProductTypeData> =
    weakDenormalizedRelationalDataParser(
        z.object({
            components: z.array(z.lazy(() => denormalizedSmallTypeNodeParser)),
        }),
    );

type DenormalizedProductTypeNode = {
    data: DenormalizedProductTypeData;
    id: string;
    kind: ProductTypeKind;
};

const denormalizedProductTypeNodeParser: z.ZodType<DenormalizedProductTypeNode> =
    weakDenormalizedNodeParser(
        productTypeKindParser,
        denormalizedProductTypeDataParser,
    );

export const productType = parserBundle({
    denormalizedData: denormalizedProductTypeDataParser,
    kind: productTypeKindParser,
    normalizedData: normalizedProductTypeDataParser,
    normalizedEdges: normalizedProductTypeEdgeParsers,
});

// Sum term constructor

const sumTermConstructorKindParser = z.literal("sumTermConstructor");

type SumTermConstructorKind = z.infer<typeof sumTermConstructorKindParser>;

const normalizedSumTermConstructorDataParser = scalarDataParser(
    z.number().int(),
);

type NormalizedSumTermConstructorData = z.infer<
    typeof normalizedSumTermConstructorDataParser
>;

const normalizedSumTermConstructorNodeParser = weakNormalizedNodeParser(
    sumTermConstructorKindParser,
    normalizedSumTermConstructorDataParser,
);

type NormalizedSumTermConstructorNode = z.infer<
    typeof normalizedSumTermConstructorNodeParser
>;

const normalizedSumTermConstructorEdgeParsers = {} as const;

type NormalizedSumTermConstructorEdge = z.infer<
    (typeof normalizedSumTermConstructorEdgeParsers)[never]
>;

const denormalizedSumTermConstructorDataParser = scalarDataParser(
    z.number().int(),
);

type DenormalizedSumTermConstructorData = z.infer<
    typeof denormalizedSumTermConstructorDataParser
>;

const denormalizedSumTermConstructorNodeParser = weakDenormalizedNodeParser(
    sumTermConstructorKindParser,
    denormalizedSumTermConstructorDataParser,
);

type DenormalizedSumTermConstructorNode = z.infer<
    typeof denormalizedSumTermConstructorNodeParser
>;

export const sumTermConstructor = parserBundle({
    denormalizedData: denormalizedSumTermConstructorDataParser,
    kind: sumTermConstructorKindParser,
    normalizedData: normalizedSumTermConstructorDataParser,
    normalizedEdges: normalizedSumTermConstructorEdgeParsers,
});

// Sum term eliminator

const sumTermEliminatorKindParser = z.literal("sumTermEliminator");

type SumTermEliminatorKind = z.infer<typeof sumTermEliminatorKindParser>;

const normalizedSumTermEliminatorDataParser =
    weakNormalizedRelationalDataParser;

type NormalizedSumTermEliminatorData = z.infer<
    typeof normalizedSumTermEliminatorDataParser
>;

const normalizedSumTermEliminatorNodeParser = weakNormalizedNodeParser(
    sumTermEliminatorKindParser,
    normalizedSumTermEliminatorDataParser,
);

type NormalizedSumTermEliminatorNode = z.infer<
    typeof normalizedSumTermEliminatorNodeParser
>;

const normalizedSumTermEliminatorEdgeParsers = {
    components: weakEdgeParser({
        kind: z.literal("components"),
        manyToOne: true,
        sourceKind: sumTermEliminatorKindParser,
        targetKind: z.lazy(() => functionTermConstructorKindParser),
    }),
} as const;

type NormalizedSumTermEliminatorEdge = z.infer<
    (typeof normalizedSumTermEliminatorEdgeParsers)["components"]
>;

type DenormalizedSumTermEliminatorData = {
    dimensionality: "relational";
    value: {
        components: DenormalizedFunctionTermConstructorNode[];
    };
};

const denormalizedSumTermEliminatorDataParser: z.ZodType<DenormalizedSumTermEliminatorData> =
    weakDenormalizedRelationalDataParser(
        z.object({
            components: z.array(
                z.lazy(() => denormalizedFunctionTermConstructorNodeParser),
            ),
        }),
    );

type DenormalizedSumTermEliminatorNode = {
    data: DenormalizedSumTermEliminatorData;
    id: string;
    kind: SumTermEliminatorKind;
};

const denormalizedSumTermEliminatorNodeParser: z.ZodType<DenormalizedSumTermEliminatorNode> =
    weakDenormalizedNodeParser(
        sumTermEliminatorKindParser,
        denormalizedSumTermEliminatorDataParser,
    );

export const sumTermEliminator = parserBundle({
    denormalizedData: denormalizedSumTermEliminatorDataParser,
    kind: sumTermEliminatorKindParser,
    normalizedData: normalizedSumTermEliminatorDataParser,
    normalizedEdges: normalizedSumTermEliminatorEdgeParsers,
});

// Sum type

const sumTypeKindParser = z.literal("sumType");

type SumTypeKind = z.infer<typeof sumTypeKindParser>;

const normalizedSumTypeDataParser = weakNormalizedRelationalDataParser;

type NormalizedSumTypeData = z.infer<typeof normalizedSumTypeDataParser>;

const normalizedSumTypeNodeParser = weakNormalizedNodeParser(
    sumTypeKindParser,
    normalizedSumTypeDataParser,
);

type NormalizedSumTypeNode = z.infer<typeof normalizedSumTypeNodeParser>;

const normalizedSumTypeEdgeParsers = {
    components: weakEdgeParser({
        kind: z.literal("components"),
        manyToOne: true,
        sourceKind: sumTypeKindParser,
        targetKind: z.lazy(() => smallTypeKindParser),
    }),
} as const;

type NormalizedSumTypeEdge = z.infer<
    (typeof normalizedSumTypeEdgeParsers)["components"]
>;

type DenormalizedSumTypeData = {
    dimensionality: "relational";
    value: {
        components: DenormalizedSmallTypeNode[];
    };
};

const denormalizedSumTypeDataParser: z.ZodType<DenormalizedSumTypeData> =
    weakDenormalizedRelationalDataParser(
        z.object({
            components: z.array(z.lazy(() => denormalizedSmallTypeNodeParser)),
        }),
    );

type DenormalizedSumTypeNode = {
    data: DenormalizedSumTypeData;
    id: string;
    kind: SumTypeKind;
};

const denormalizedSumTypeNodeParser: z.ZodType<DenormalizedSumTypeNode> =
    weakDenormalizedNodeParser(
        sumTypeKindParser,
        denormalizedSumTypeDataParser,
    );

export const sumType = parserBundle({
    denormalizedData: denormalizedSumTypeDataParser,
    kind: sumTypeKindParser,
    normalizedData: normalizedSumTypeDataParser,
    normalizedEdges: normalizedSumTypeEdgeParsers,
});

// String term

const stringTermKindParser = z.literal("stringTerm");

type StringTermKind = z.infer<typeof stringTermKindParser>;

const normalizedStringTermDataParser = scalarDataParser(z.string());

type NormalizedStringTermData = z.infer<typeof normalizedStringTermDataParser>;

const normalizedStringTermNodeParser = weakNormalizedNodeParser(
    stringTermKindParser,
    normalizedStringTermDataParser,
);

type NormalizedStringTermNode = z.infer<typeof normalizedStringTermNodeParser>;

const normalizedStringTermEdgeParsers = {} as const;

type NormalizedStringTermEdge = z.infer<
    (typeof normalizedStringTermEdgeParsers)[never]
>;

const denormalizedStringTermDataParser = scalarDataParser(z.string());

type DenormalizedStringTermData = z.infer<
    typeof denormalizedStringTermDataParser
>;

const denormalizedStringTermNodeParser = weakDenormalizedNodeParser(
    stringTermKindParser,
    denormalizedStringTermDataParser,
);

type DenormalizedStringTermNode = z.infer<
    typeof denormalizedStringTermNodeParser
>;

export const stringTerm = parserBundle({
    denormalizedData: denormalizedStringTermDataParser,
    kind: stringTermKindParser,
    normalizedData: normalizedStringTermDataParser,
    normalizedEdges: normalizedStringTermEdgeParsers,
});

// String type

const stringTypeKindParser = z.literal("stringType");

type StringTypeKind = z.infer<typeof stringTypeKindParser>;

const normalizedStringTypeDataParser = emptyDataParser;

type NormalizedStringTypeData = z.infer<typeof normalizedStringTypeDataParser>;

const normalizedStringTypeNodeParser = weakNormalizedNodeParser(
    stringTypeKindParser,
    normalizedStringTypeDataParser,
);

type NormalizedStringTypeNode = z.infer<typeof normalizedStringTypeNodeParser>;

const normalizedStringTypeEdgeParsers = {} as const;

type NormalizedStringTypeEdge = z.infer<
    (typeof normalizedStringTypeEdgeParsers)[never]
>;

const denormalizedStringTypeDataParser = emptyDataParser;

type DenormalizedStringTypeData = z.infer<
    typeof denormalizedStringTypeDataParser
>;

const denormalizedStringTypeNodeParser = weakDenormalizedNodeParser(
    stringTypeKindParser,
    denormalizedStringTypeDataParser,
);

type DenormalizedStringTypeNode = z.infer<
    typeof denormalizedStringTypeNodeParser
>;

export const stringType = parserBundle({
    denormalizedData: denormalizedStringTypeDataParser,
    kind: stringTypeKindParser,
    normalizedData: normalizedStringTypeDataParser,
    normalizedEdges: normalizedStringTypeEdgeParsers,
});

// Term binding

const termBindingKindParser = z.literal("termBinding");

type TermBindingKind = z.infer<typeof termBindingKindParser>;

const normalizedTermBindingDataParser = scalarDataParser(z.string());

type NormalizedTermBindingData = z.infer<
    typeof normalizedTermBindingDataParser
>;

const normalizedTermBindingNodeParser = weakNormalizedNodeParser(
    termBindingKindParser,
    normalizedTermBindingDataParser,
);

type NormalizedTermBindingNode = z.infer<
    typeof normalizedTermBindingNodeParser
>;

const normalizedTermBindingEdgeParsers = {} as const;

type NormalizedTermBindingEdge = z.infer<
    (typeof normalizedTermBindingEdgeParsers)[never]
>;

const denormalizedTermBindingDataParser = scalarDataParser(z.string());

type DenormalizedTermBindingData = z.infer<
    typeof denormalizedTermBindingDataParser
>;

const denormalizedTermBindingNodeParser = weakDenormalizedNodeParser(
    termBindingKindParser,
    denormalizedTermBindingDataParser,
);

type DenormalizedTermBindingNode = z.infer<
    typeof denormalizedTermBindingNodeParser
>;

export const termBinding = parserBundle({
    denormalizedData: denormalizedTermBindingDataParser,
    kind: termBindingKindParser,
    normalizedData: normalizedTermBindingDataParser,
    normalizedEdges: normalizedTermBindingEdgeParsers,
});

// Term definition

const termDefinitionKindParser = z.literal("termDefinition");

type TermDefinitionKind = z.infer<typeof termDefinitionKindParser>;

const normalizedTermDefinitionDataParser = weakNormalizedRelationalDataParser;

type NormalizedTermDefinitionData = z.infer<
    typeof normalizedTermDefinitionDataParser
>;

const normalizedTermDefinitionNodeParser = weakNormalizedNodeParser(
    termDefinitionKindParser,
    normalizedTermDefinitionDataParser,
);

type NormalizedTermDefinitionNode = z.infer<
    typeof normalizedTermDefinitionNodeParser
>;

const normalizedTermDefinitionEdgeParsers = {
    binding: weakEdgeParser({
        kind: z.literal("binding"),
        manyToOne: false,
        sourceKind: termDefinitionKindParser,
        targetKind: termBindingKindParser,
    }),
    term: weakEdgeParser({
        kind: z.literal("term"),
        manyToOne: false,
        sourceKind: termDefinitionKindParser,
        targetKind: z.lazy(() =>
            z.union([termKindParser, clientImplementationKindParser]),
        ),
    }),
    type: weakEdgeParser({
        kind: z.literal("type"),
        manyToOne: false,
        sourceKind: termDefinitionKindParser,
        targetKind: z.lazy(() => largeTypeKindParser),
    }),
} as const;

type NormalizedTermDefinitionEdge = z.infer<
    (typeof normalizedTermDefinitionEdgeParsers)["binding" | "term" | "type"]
>;

const denormalizedTermDefinitionDataParser =
    weakDenormalizedRelationalDataParser(
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
    );

type DenormalizedTermDefinitionData = z.infer<
    typeof denormalizedTermDefinitionDataParser
>;

const denormalizedTermDefinitionNodeParser = weakDenormalizedNodeParser(
    termDefinitionKindParser,
    denormalizedTermDefinitionDataParser,
);

type DenormalizedTermDefinitionNode = z.infer<
    typeof denormalizedTermDefinitionNodeParser
>;

export const termDefinition = parserBundle({
    denormalizedData: denormalizedTermDefinitionDataParser,
    kind: termDefinitionKindParser,
    normalizedData: normalizedTermDefinitionDataParser,
    normalizedEdges: normalizedTermDefinitionEdgeParsers,
});

// Term reference

const termReferenceKindParser = z.literal("termReference");

type TermReferenceKind = z.infer<typeof termReferenceKindParser>;

const normalizedTermReferenceDataParser = scalarDataParser(z.string());

type NormalizedTermReferenceData = z.infer<
    typeof normalizedTermReferenceDataParser
>;

const normalizedTermReferenceNodeParser = weakNormalizedNodeParser(
    termReferenceKindParser,
    normalizedTermReferenceDataParser,
);

type NormalizedTermReferenceNode = z.infer<
    typeof normalizedTermReferenceNodeParser
>;

const normalizedTermReferenceEdgeParsers = {} as const;

type NormalizedTermReferenceEdge = z.infer<
    (typeof normalizedTermReferenceEdgeParsers)[never]
>;

const denormalizedTermReferenceDataParser = scalarDataParser(z.string());

type DenormalizedTermReferenceData = z.infer<
    typeof denormalizedTermReferenceDataParser
>;

const denormalizedTermReferenceNodeParser = weakDenormalizedNodeParser(
    termReferenceKindParser,
    denormalizedTermReferenceDataParser,
);

type DenormalizedTermReferenceNode = z.infer<
    typeof denormalizedTermReferenceNodeParser
>;

export const termReference = parserBundle({
    denormalizedData: denormalizedTermReferenceDataParser,
    kind: termReferenceKindParser,
    normalizedData: normalizedTermReferenceDataParser,
    normalizedEdges: normalizedTermReferenceEdgeParsers,
});

// Type binding

const typeBindingKindParser = z.literal("typeBinding");

type TypeBindingKind = z.infer<typeof typeBindingKindParser>;

const normalizedTypeBindingDataParser = scalarDataParser(z.string());

type NormalizedTypeBindingData = z.infer<
    typeof normalizedTypeBindingDataParser
>;

const normalizedTypeBindingNodeParser = weakNormalizedNodeParser(
    typeBindingKindParser,
    normalizedTypeBindingDataParser,
);

type NormalizedTypeBindingNode = z.infer<
    typeof normalizedTypeBindingNodeParser
>;

const normalizedTypeBindingEdgeParsers = {} as const;

type NormalizedTypeBindingEdge = z.infer<
    (typeof normalizedTypeBindingEdgeParsers)[never]
>;

const denormalizedTypeBindingDataParser = scalarDataParser(z.string());

type DenormalizedTypeBindingData = z.infer<
    typeof denormalizedTypeBindingDataParser
>;

const denormalizedTypeBindingNodeParser = weakDenormalizedNodeParser(
    typeBindingKindParser,
    denormalizedTypeBindingDataParser,
);

type DenormalizedTypeBindingNode = z.infer<
    typeof denormalizedTypeBindingNodeParser
>;

export const typeBinding = parserBundle({
    denormalizedData: denormalizedTypeBindingDataParser,
    kind: typeBindingKindParser,
    normalizedData: normalizedTypeBindingDataParser,
    normalizedEdges: normalizedTypeBindingEdgeParsers,
});

// Type definition

const typeDefinitionKindParser = z.literal("typeDefinition");

type TypeDefinitionKind = z.infer<typeof typeDefinitionKindParser>;

const normalizedTypeDefinitionDataParser = weakNormalizedRelationalDataParser;

type NormalizedTypeDefinitionData = z.infer<
    typeof normalizedTypeDefinitionDataParser
>;

const normalizedTypeDefinitionNodeParser = weakNormalizedNodeParser(
    typeDefinitionKindParser,
    normalizedTypeDefinitionDataParser,
);

type NormalizedTypeDefinitionNode = z.infer<
    typeof normalizedTypeDefinitionNodeParser
>;

const normalizedTypeDefinitionEdgeParsers = {
    binding: weakEdgeParser({
        kind: z.literal("binding"),
        manyToOne: false,
        sourceKind: typeDefinitionKindParser,
        targetKind: typeBindingKindParser,
    }),
    type: weakEdgeParser({
        kind: z.literal("type"),
        manyToOne: false,
        sourceKind: typeDefinitionKindParser,
        targetKind: z.lazy(() => largeTypeKindParser),
    }),
} as const;

type NormalizedTypeDefinitionEdge = z.infer<
    (typeof normalizedTypeDefinitionEdgeParsers)["binding" | "type"]
>;

const denormalizedTypeDefinitionDataParser =
    weakDenormalizedRelationalDataParser(
        z.object({
            binding: denormalizedTypeBindingNodeParser,
            type: z.lazy(() => denormalizedLargeTypeNodeParser),
        }),
    );

type DenormalizedTypeDefinitionData = z.infer<
    typeof denormalizedTypeDefinitionDataParser
>;

const denormalizedTypeDefinitionNodeParser = weakDenormalizedNodeParser(
    typeDefinitionKindParser,
    denormalizedTypeDefinitionDataParser,
);

type DenormalizedTypeDefinitionNode = z.infer<
    typeof denormalizedTypeDefinitionNodeParser
>;

export const typeDefinition = parserBundle({
    denormalizedData: denormalizedTypeDefinitionDataParser,
    kind: typeDefinitionKindParser,
    normalizedData: normalizedTypeDefinitionDataParser,
    normalizedEdges: normalizedTypeDefinitionEdgeParsers,
});

// Type reference

const typeReferenceKindParser = z.literal("typeReference");

type TypeReferenceKind = z.infer<typeof typeReferenceKindParser>;

const normalizedTypeReferenceDataParser = scalarDataParser(z.string());

type NormalizedTypeReferenceData = z.infer<
    typeof normalizedTypeReferenceDataParser
>;

const normalizedTypeReferenceNodeParser = weakNormalizedNodeParser(
    typeReferenceKindParser,
    normalizedTypeReferenceDataParser,
);

type NormalizedTypeReferenceNode = z.infer<
    typeof normalizedTypeReferenceNodeParser
>;

const normalizedTypeReferenceEdgeParsers = {} as const;

type NormalizedTypeReferenceEdge = z.infer<
    (typeof normalizedTypeReferenceEdgeParsers)[never]
>;

const denormalizedTypeReferenceDataParser = scalarDataParser(z.string());

type DenormalizedTypeReferenceData = z.infer<
    typeof denormalizedTypeReferenceDataParser
>;

const denormalizedTypeReferenceNodeParser = weakDenormalizedNodeParser(
    typeReferenceKindParser,
    denormalizedTypeReferenceDataParser,
);

type DenormalizedTypeReferenceNode = z.infer<
    typeof denormalizedTypeReferenceNodeParser
>;

export const typeReference = parserBundle({
    denormalizedData: denormalizedTypeReferenceDataParser,
    kind: typeReferenceKindParser,
    normalizedData: normalizedTypeReferenceDataParser,
    normalizedEdges: normalizedTypeReferenceEdgeParsers,
});

// ## Unions

// Function term constructor

const functionTermConstructorKindParser = z.union([
    lambdaConstructorKindParser,
    productTermEliminatorKindParser,
    sumTermConstructorKindParser,
    termReferenceKindParser,
]);

type FunctionTermConstructorKind = z.infer<
    typeof functionTermConstructorKindParser
>;

const normalizedFunctionTermConstructorNodeParser = z.union([
    normalizedLambdaConstructorNodeParser,
    normalizedProductTermEliminatorNodeParser,
    normalizedSumTermConstructorNodeParser,
    normalizedSumTermEliminatorNodeParser,
    normalizedTermReferenceNodeParser,
]);

type NormalizedFunctionTermConstructorNode = z.infer<
    typeof normalizedFunctionTermConstructorNodeParser
>;

const normalizedFunctionTermConstructorEdgeParsers = {
    ...normalizedLambdaConstructorEdgeParsers,
    ...normalizedProductTermEliminatorEdgeParsers,
    ...normalizedSumTermConstructorEdgeParsers,
    ...normalizedSumTermEliminatorEdgeParsers,
    ...normalizedTermReferenceEdgeParsers,
} as const;

const denormalizedFunctionTermConstructorNodeParser = z.union([
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

const termKindParser = z.union([
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

const normalizedTermNodeParser = z.union([
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

const normalizedTermEdgeParsers = {
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
} as const;

const denormalizedTermNodeParser = z.union([
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

const smallTypeKindParser = z.union([
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

const normalizedSmallTypeNodeParser = z.discriminatedUnion("kind", [
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

const normalizedSmallTypeEdgeParsers = {
    ...normalizedBooleanTypeEdgeParsers,
    ...normalizedFloatTypeEdgeParsers,
    ...normalizedFunctionTypeEdgeParsers,
    ...normalizedGenericTypeEliminatorEdgeParsers,
    ...normalizedIntegerTypeEdgeParsers,
    ...normalizedProductTypeEdgeParsers,
    ...normalizedSumTypeEdgeParsers,
    ...normalizedStringTypeEdgeParsers,
    ...normalizedTypeReferenceEdgeParsers,
} as const;

const denormalizedSmallTypeNodeParser = z.union([
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

const largeTypeKindParser = z.union([
    smallTypeKindParser,
    genericTypeConstructorKindParser,
]);

type LargeTypeKind = z.infer<typeof largeTypeKindParser>;

const normalizedLargeTypeNodeParser = z.union([
    normalizedSmallTypeNodeParser,
    normalizedGenericTypeConstructorNodeParser,
]);

type NormalizedLargeTypeNode = z.infer<typeof normalizedLargeTypeNodeParser>;

const normalizedLargeTypeEdgeParsers = {
    ...normalizedSmallTypeEdgeParsers,
    ...normalizedGenericTypeConstructorEdgeParsers,
} as const;

const denormalizedLargeTypeNodeParser = z.union([
    denormalizedSmallTypeNodeParser,
    denormalizedGenericTypeConstructorNodeParser,
]);

type DenormalizedLargeTypeNode = z.infer<
    typeof denormalizedLargeTypeNodeParser
>;
