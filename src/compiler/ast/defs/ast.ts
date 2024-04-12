/**
 * TODO: This file was generated with extreme redundancy and explicitness.
 * It deserves a lot of refactoring.
 */
import { z } from "zod";

import { emptyDataParser, scalarDataParser } from "../common";
import {
    parserBundle,
    weakDenormalizedNodeParser,
    weakDenormalizedRelationalDataParser,
    weakEdgeParser,
    weakNormalizedNodeParser,
    weakNormalizedRelationalDataParser,
} from "../weaklyTyped";

// Boolean term

const booleanTermNodeKindParser = z.literal("booleanTerm");

type BooleanTermNodeKind = z.infer<typeof booleanTermNodeKindParser>;

const normalizedBooleanTermDataParser = scalarDataParser(z.boolean());

type NormalizedBooleanTermData = z.infer<
    typeof normalizedBooleanTermDataParser
>;

const normalizedBooleanTermNodeParser = weakNormalizedNodeParser(
    booleanTermNodeKindParser,
    normalizedBooleanTermDataParser,
);

type NormalizedBooleanTermNode = z.infer<
    typeof normalizedBooleanTermNodeParser
>;

const booleanTermEdgeParsers = {} as const;

type BooleanTermEdge = z.infer<(typeof booleanTermEdgeParsers)[never]>;

const denormalizedBooleanTermDataParser = scalarDataParser(z.boolean());

type DenormalizedBooleanTermDataParser = z.infer<
    typeof denormalizedBooleanTermDataParser
>;

const denormalizedBooleanTermNodeParser = weakDenormalizedNodeParser(
    booleanTermNodeKindParser,
    denormalizedBooleanTermDataParser,
);

type DenormalizedBooleanTermNode = z.infer<
    typeof denormalizedBooleanTermNodeParser
>;

export const booleanTerm = parserBundle({
    denormalizedData: denormalizedBooleanTermDataParser,
    edgeKind: z.never(),

    kind: booleanTermNodeKindParser,
    normalizedData: normalizedBooleanTermDataParser,
    edges: booleanTermEdgeParsers,
});

// Boolean type

const booleanTypeNodeKindParser = z.literal("booleanType");

type BooleanTypeNodeKind = z.infer<typeof booleanTypeNodeKindParser>;

const normalizedBooleanTypeDataParser = emptyDataParser;

type NormalizedBooleanTypeData = z.infer<
    typeof normalizedBooleanTypeDataParser
>;

const normalizedBooleanTypeNodeParser = weakNormalizedNodeParser(
    booleanTypeNodeKindParser,
    normalizedBooleanTypeDataParser,
);

type NormalizedBooleanTypeNode = z.infer<
    typeof normalizedBooleanTypeNodeParser
>;

const booleanTypeEdgeParsers = {} as const;

type BooleanTypeEdge = z.infer<(typeof booleanTypeEdgeParsers)[never]>;

const denormalizedBooleanTypeDataParser = emptyDataParser;

const denormalizedBooleanTypeNodeParser = weakDenormalizedNodeParser(
    booleanTypeNodeKindParser,
    denormalizedBooleanTypeDataParser,
);

type DenormalizedBooleanTypeNode = z.infer<
    typeof denormalizedBooleanTypeNodeParser
>;

export const booleanType = parserBundle({
    denormalizedData: denormalizedBooleanTypeDataParser,
    edgeKind: z.never(),
    kind: booleanTypeNodeKindParser,
    normalizedData: normalizedBooleanTypeDataParser,
    edges: booleanTypeEdgeParsers,
});

// Client implementation

const clientImplementationNodeKindParser = z.literal("clientImplementation");

type ClientImplementationNodeKind = z.infer<
    typeof clientImplementationNodeKindParser
>;

const normalizedClientImplementationDataParser = emptyDataParser;

type NormalizedClientImplementationData = z.infer<
    typeof normalizedClientImplementationDataParser
>;

const normalizedClientImplementationNodeParser = weakNormalizedNodeParser(
    clientImplementationNodeKindParser,
    normalizedClientImplementationDataParser,
);

type NormalizedClientImplementationNode = z.infer<
    typeof normalizedClientImplementationNodeParser
>;

const clientImplementationEdgeParsers = {} as const;

type ClientImplementationEdge = z.infer<
    (typeof clientImplementationEdgeParsers)[never]
>;

const denormalizedClientImplementationDataParser = emptyDataParser;

type DenormalizedClientImplementationData = z.infer<
    typeof denormalizedClientImplementationDataParser
>;

const denormalizedClientImplementationNodeParser = weakDenormalizedNodeParser(
    clientImplementationNodeKindParser,
    denormalizedClientImplementationDataParser,
);

type DenormalizedClientImplementationNode = z.infer<
    typeof denormalizedClientImplementationNodeParser
>;

export const clientImplementation = parserBundle({
    denormalizedData: denormalizedClientImplementationDataParser,
    edgeKind: z.never(),
    kind: clientImplementationNodeKindParser,
    normalizedData: normalizedClientImplementationDataParser,
    edges: clientImplementationEdgeParsers,
});

// Float term

const floatTermNodeKindParser = z.literal("floatTerm");

type FloatTermNodeKind = z.infer<typeof floatTermNodeKindParser>;

const normalizedFloatTermDataParser = scalarDataParser(z.number());

type NormalizedFloatTermData = z.infer<typeof normalizedFloatTermDataParser>;

const normalizedFloatTermNodeParser = weakNormalizedNodeParser(
    floatTermNodeKindParser,
    normalizedFloatTermDataParser,
);

type NormalizedFloatTermNode = z.infer<typeof normalizedFloatTermNodeParser>;

const floatTermEdgeParsers = {} as const;

type FloatTermEdge = z.infer<(typeof floatTermEdgeParsers)[never]>;

const denormalizedFloatTermDataParser = scalarDataParser(z.number());

type DenormalizedFloatTermData = z.infer<
    typeof denormalizedFloatTermDataParser
>;

const denormalizedFloatTermNodeParser = weakDenormalizedNodeParser(
    floatTermNodeKindParser,
    denormalizedFloatTermDataParser,
);

type DenormalizedFloatTermNode = z.infer<
    typeof denormalizedFloatTermNodeParser
>;

export const floatTerm = parserBundle({
    denormalizedData: denormalizedFloatTermDataParser,
    edgeKind: z.never(),
    kind: floatTermNodeKindParser,
    normalizedData: normalizedFloatTermDataParser,
    edges: floatTermEdgeParsers,
});

// Float type

const floatTypeNodeKindParser = z.literal("floatType");

type FloatTypeNodeKind = z.infer<typeof floatTypeNodeKindParser>;

const normalizedFloatTypeDataParser = emptyDataParser;

type NormalizedFloatTypeData = z.infer<typeof normalizedFloatTypeDataParser>;

const normalizedFloatTypeNodeParser = weakNormalizedNodeParser(
    floatTypeNodeKindParser,
    normalizedFloatTypeDataParser,
);

type NormalizedFloatTypeNode = z.infer<typeof normalizedFloatTypeNodeParser>;

const floatTypeEdgeParsers = {} as const;

type FloatTypeEdge = z.infer<(typeof floatTypeEdgeParsers)[never]>;

const denormalizedFloatTypeDataParser = emptyDataParser;

type DenormalizedFloatTypeData = z.infer<
    typeof denormalizedFloatTypeDataParser
>;

const denormalizedFloatTypeNodeParser = weakDenormalizedNodeParser(
    floatTypeNodeKindParser,
    denormalizedFloatTypeDataParser,
);

type DenormalizedFloatTypeNode = z.infer<
    typeof denormalizedFloatTypeNodeParser
>;

export const floatType = parserBundle({
    denormalizedData: denormalizedFloatTypeDataParser,
    edgeKind: z.never(),
    kind: floatTypeNodeKindParser,
    normalizedData: normalizedFloatTypeDataParser,
    edges: floatTypeEdgeParsers,
});

// Function term eliminator

const functionTermEliminatorNodeKindParser = z.literal(
    "functionTermEliminator",
);

type FunctionTermEliminatorNodeKind = z.infer<
    typeof functionTermEliminatorNodeKindParser
>;

const functionTermEliminatorEdgeKindParser = z.enum(["arguments", "function"]);

type FunctionTermEliminatorEdgeKind = z.infer<
    typeof functionTermEliminatorEdgeKindParser
>;

const normalizedFunctionTermEliminatorDataParser =
    weakNormalizedRelationalDataParser(
        z.object({
            arguments: z.object({ manyToOne: z.literal(true) }),
            function: z.object({ manyToOne: z.literal(false) }),
        }),
    );

type NormalizedFunctionTermEliminatorData = z.infer<
    typeof normalizedFunctionTermEliminatorDataParser
>;

const normalizedFunctionTermEliminatorNodeParser = weakNormalizedNodeParser(
    functionTermEliminatorNodeKindParser,
    normalizedFunctionTermEliminatorDataParser,
);

type NormalizedFunctionTermEliminatorNode = z.infer<
    typeof normalizedFunctionTermEliminatorNodeParser
>;

const functionTermEliminatorEdgeParsers = {
    function: weakEdgeParser({
        kind: z.literal("function"),
        manyToOne: false,
        sourceKind: functionTermEliminatorNodeKindParser,
        targetKind: z.lazy(() => functionTermConstructorKindParser),
    }),
    arguments: weakEdgeParser({
        kind: z.literal("arguments"),
        manyToOne: true,
        sourceKind: functionTermEliminatorNodeKindParser,
        targetKind: z.lazy(() => termKindParser),
    }),
} as const;

type FunctionTermEliminatorEdge = z.infer<
    (typeof functionTermEliminatorEdgeParsers)["function" | "arguments"]
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
    kind: FunctionTermEliminatorNodeKind;
};

const denormalizedFunctionTermEliminatorNodeParser: z.ZodType<DenormalizedFunctionTermEliminatorNode> =
    weakDenormalizedNodeParser(
        functionTermEliminatorNodeKindParser,
        denormalizedFunctionTermEliminatorDataParser,
    );

export const functionTermEliminator = parserBundle({
    denormalizedData: denormalizedFunctionTermEliminatorDataParser,
    edgeKind: functionTermEliminatorEdgeKindParser,
    kind: functionTermEliminatorNodeKindParser,
    normalizedData: normalizedFunctionTermEliminatorDataParser,
    edges: functionTermEliminatorEdgeParsers,
});

// Function type

const functionTypeNodeKindParser = z.literal("functionType");

type FunctionTypeNodeKind = z.infer<typeof functionTypeNodeKindParser>;

const functionTypeEdgeKindParser = z.enum(["codomain", "domains"]);

type FunctionTypeEdgeKindParser = z.infer<typeof functionTypeEdgeKindParser>;

const normalizedFunctionTypeDataParser = weakNormalizedRelationalDataParser(
    z.object({
        codomain: z.object({ manyToOne: z.literal(false) }),
        domains: z.object({ manyToOne: z.literal(true) }),
    }),
);

type NormalizedFunctionTypeData = z.infer<
    typeof normalizedFunctionTypeDataParser
>;

const normalizedFunctionTypeNodeParser = weakNormalizedNodeParser(
    functionTypeNodeKindParser,
    normalizedFunctionTypeDataParser,
);

type NormalizedFunctionTypeNode = z.infer<
    typeof normalizedFunctionTypeNodeParser
>;

const functionTypeEdgeParsers = {
    codomain: weakEdgeParser({
        kind: z.literal("codomain"),
        manyToOne: false,
        sourceKind: functionTypeNodeKindParser,
        targetKind: z.lazy(() => smallTypeKindParser),
    }),
    domains: weakEdgeParser({
        kind: z.literal("domains"),
        manyToOne: true,
        sourceKind: functionTypeNodeKindParser,
        targetKind: z.lazy(() => smallTypeKindParser),
    }),
} as const;

type FunctionTypeEdge = z.infer<
    (typeof functionTypeEdgeParsers)["codomain" | "domains"]
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
    kind: FunctionTypeNodeKind;
};

const denormalizedFunctionTypeNodeParser: z.ZodType<DenormalizedFunctionTypeNode> =
    weakDenormalizedNodeParser(
        functionTypeNodeKindParser,
        denormalizedFunctionTypeDataParser,
    );

export const functionType = parserBundle({
    denormalizedData: denormalizedFunctionTypeDataParser,
    edgeKind: functionTypeEdgeKindParser,
    kind: functionTypeNodeKindParser,
    normalizedData: normalizedFunctionTypeDataParser,
    edges: functionTypeEdgeParsers,
});

// Generic type constructor

const genericTypeConstructorNodeKindParser = z.literal(
    "genericTypeConstructor",
);

type GenericTypeConstructorNodeKind = z.infer<
    typeof genericTypeConstructorNodeKindParser
>;

const genericTypeConstructorEdgeKindParser = z.enum([
    "codomainType",
    "domainTypeBindings",
]);

type GenericTypeConstructorEdgeKind = z.infer<
    typeof genericTypeConstructorEdgeKindParser
>;

const normalizedGenericTypeConstructorDataParser =
    weakNormalizedRelationalDataParser(
        z.object({
            codomainType: z.object({ manyToOne: z.literal(false) }),
            domainTypeBindings: z.object({ manyToOne: z.literal(true) }),
        }),
    );

type NormalizedGenericTypeConstructorData = z.infer<
    typeof normalizedGenericTypeConstructorDataParser
>;

const normalizedGenericTypeConstructorNodeParser = weakNormalizedNodeParser(
    genericTypeConstructorNodeKindParser,
    normalizedGenericTypeConstructorDataParser,
);

type NormalizedGenericTypeConstructorNode = z.infer<
    typeof normalizedGenericTypeConstructorNodeParser
>;

const genericTypeConstructorEdgeParsers = {
    codomainType: weakEdgeParser({
        kind: z.literal("codomainType"),
        manyToOne: false,
        sourceKind: genericTypeConstructorNodeKindParser,
        targetKind: z.lazy(() => smallTypeKindParser),
    }),
    domainTypeBindings: weakEdgeParser({
        kind: z.literal("domainTypeBindings"),
        manyToOne: true,
        sourceKind: genericTypeConstructorNodeKindParser,
        targetKind: z.lazy(() => z.literal("typeBinding")),
    }),
} as const;

type GenericTypeConstructorEdge = z.infer<
    (typeof genericTypeConstructorEdgeParsers)[GenericTypeConstructorEdgeKind]
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
    kind: GenericTypeConstructorNodeKind;
};

const denormalizedGenericTypeConstructorNodeParser: z.ZodType<DenormalizedGenericTypeConstructorNode> =
    weakDenormalizedNodeParser(
        genericTypeConstructorNodeKindParser,
        denormalizedGenericTypeConstructorDataParser,
    );

export const genericTypeConstructor = parserBundle({
    denormalizedData: denormalizedGenericTypeConstructorDataParser,
    edgeKind: genericTypeConstructorEdgeKindParser,
    kind: genericTypeConstructorNodeKindParser,
    normalizedData: normalizedGenericTypeConstructorDataParser,
    edges: genericTypeConstructorEdgeParsers,
});

// Generic type eliminator

const genericTypeEliminatorNodeKindParser = z.literal("genericTypeEliminator");

type GenericTypeEliminatorNodeKind = z.infer<
    typeof genericTypeEliminatorNodeKindParser
>;

const genericTypeEliminatorEdgeKindParser = z.enum([
    "arguments",
    "genericType",
]);

type GenericTypeEliminatorEdgeKind = z.infer<
    typeof genericTypeEliminatorEdgeKindParser
>;

const normalizedGenericTypeEliminatorDataParser =
    weakNormalizedRelationalDataParser(
        z.object({
            arguments: z.object({ manyToOne: z.literal(true) }),
            genericType: z.object({ manyToOne: z.literal(false) }),
        }),
    );

type NormalizedGenericTypeEliminatorData = z.infer<
    typeof normalizedGenericTypeEliminatorDataParser
>;

const normalizedGenericTypeEliminatorNodeParser = weakNormalizedNodeParser(
    genericTypeEliminatorNodeKindParser,
    normalizedGenericTypeEliminatorDataParser,
);

type NormalizedGenericTypeEliminatorNode = z.infer<
    typeof normalizedGenericTypeEliminatorNodeParser
>;

const genericTypeEliminatorEdgeParsers = {
    arguments: weakEdgeParser({
        kind: z.literal("arguments"),
        manyToOne: true,
        sourceKind: genericTypeEliminatorNodeKindParser,
        targetKind: z.lazy(() => smallTypeKindParser),
    }),
    genericType: weakEdgeParser({
        kind: z.literal("genericType"),
        manyToOne: false,
        sourceKind: genericTypeEliminatorNodeKindParser,
        targetKind: z.lazy(() => largeTypeKindParser),
    }),
} as const;

type GenericTypeEliminatorEdge = z.infer<
    (typeof genericTypeEliminatorEdgeParsers)[GenericTypeEliminatorEdgeKind]
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
    kind: GenericTypeEliminatorNodeKind;
};

const denormalizedGenericTypeEliminatorNodeParser: z.ZodType<DenormalizedGenericTypeEliminatorNode> =
    weakDenormalizedNodeParser(
        genericTypeEliminatorNodeKindParser,
        denormalizedGenericTypeEliminatorDataParser,
    );

export const genericTypeEliminator = parserBundle({
    denormalizedData: denormalizedGenericTypeEliminatorDataParser,
    edgeKind: genericTypeEliminatorEdgeKindParser,
    kind: genericTypeEliminatorNodeKindParser,
    normalizedData: normalizedGenericTypeEliminatorDataParser,
    edges: genericTypeEliminatorEdgeParsers,
});

// Integer term

const integerTermNodeKindParser = z.literal("integerTerm");

type IntegerTermNodeKind = z.infer<typeof integerTermNodeKindParser>;

const normalizedIntegerTermDataParser = scalarDataParser(z.number().int());

type NormalizedIntegerTermData = z.infer<
    typeof normalizedIntegerTermDataParser
>;

const normalizedIntegerTermNodeParser = weakNormalizedNodeParser(
    integerTermNodeKindParser,
    normalizedIntegerTermDataParser,
);

type NormalizedIntegerTermNode = z.infer<
    typeof normalizedIntegerTermNodeParser
>;

const integerTermEdgeParsers = {} as const;

type IntegerTermEdge = z.infer<(typeof integerTermEdgeParsers)[never]>;

const denormalizedIntegerTermDataParser = scalarDataParser(z.number().int());

type DenormalizedIntegerTermData = z.infer<
    typeof denormalizedIntegerTermDataParser
>;

const denormalizedIntegerTermNodeParser = weakDenormalizedNodeParser(
    integerTermNodeKindParser,
    denormalizedIntegerTermDataParser,
);

type DenormalizedIntegerTermNode = z.infer<
    typeof denormalizedIntegerTermNodeParser
>;

export const integerTerm = parserBundle({
    denormalizedData: denormalizedIntegerTermDataParser,
    edgeKind: z.never(),
    kind: integerTermNodeKindParser,
    normalizedData: normalizedIntegerTermDataParser,
    edges: integerTermEdgeParsers,
});

// Integer type

const integerTypeNodeKindParser = z.literal("integerType");

type IntegerTypeNodeKind = z.infer<typeof integerTypeNodeKindParser>;

const normalizedIntegerTypeDataParser = emptyDataParser;

type NormalizedIntegerTypeData = z.infer<
    typeof normalizedIntegerTypeDataParser
>;

const normalizedIntegerTypeNodeParser = weakNormalizedNodeParser(
    integerTypeNodeKindParser,
    normalizedIntegerTypeDataParser,
);

type NormalizedIntegerTypeNode = z.infer<
    typeof normalizedIntegerTypeNodeParser
>;

const integerTypeEdgeParsers = {} as const;

type IntegerTypeEdge = z.infer<(typeof integerTypeEdgeParsers)[never]>;

const denormalizedIntegerTypeDataParser = emptyDataParser;

type DenormalizedIntegerTypeData = z.infer<
    typeof denormalizedIntegerTypeDataParser
>;

const denormalizedIntegerTypeNodeParser = weakDenormalizedNodeParser(
    integerTypeNodeKindParser,
    denormalizedIntegerTypeDataParser,
);

type DenormalizedIntegerTypeNode = z.infer<
    typeof denormalizedIntegerTypeNodeParser
>;

export const integerType = parserBundle({
    denormalizedData: denormalizedIntegerTypeDataParser,
    edgeKind: z.never(),
    kind: integerTypeNodeKindParser,
    normalizedData: normalizedIntegerTypeDataParser,
    edges: integerTypeEdgeParsers,
});

// Lambda constructor

const lambdaConstructorNodeKindParser = z.literal("lambdaConstructor");

type LambdaConstructorNodeKind = z.infer<
    typeof lambdaConstructorNodeKindParser
>;

const lambdaConstructorEdgeKindParser = z.enum([
    "codomainTerm",
    "domainTermBindings",
]);

type LambdaConstructorEdgeKind = z.infer<
    typeof lambdaConstructorEdgeKindParser
>;

const normalizedLambdaConstructorDataParser =
    weakNormalizedRelationalDataParser(
        z.object({
            codomainTerm: z.object({ manyToOne: z.literal(false) }),
            domainTermBindings: z.object({ manyToOne: z.literal(true) }),
        }),
    );

type NormalizedLambdaConstructorData = z.infer<
    typeof normalizedLambdaConstructorDataParser
>;

const normalizedLambdaConstructorNodeParser = weakNormalizedNodeParser(
    lambdaConstructorNodeKindParser,
    normalizedLambdaConstructorDataParser,
);

type NormalizedLambdaConstructorNode = z.infer<
    typeof normalizedLambdaConstructorNodeParser
>;

const lambdaConstructorEdgeParsers = {
    codomainTerm: weakEdgeParser({
        kind: z.literal("codomainTerm"),
        manyToOne: false,
        sourceKind: lambdaConstructorNodeKindParser,
        targetKind: z.lazy(() => termKindParser),
    }),
    domainTermBindings: weakEdgeParser({
        kind: z.literal("domainTermBindings"),
        manyToOne: true,
        sourceKind: lambdaConstructorNodeKindParser,
        targetKind: z.lazy(() => z.literal("termBinding")),
    }),
} as const;

type LambdaConstructorEdge = z.infer<
    (typeof lambdaConstructorEdgeParsers)[LambdaConstructorEdgeKind]
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
    kind: LambdaConstructorNodeKind;
};

const denormalizedLambdaConstructorNodeParser: z.ZodType<DenormalizedLambdaConstructorNode> =
    weakDenormalizedNodeParser(
        lambdaConstructorNodeKindParser,
        denormalizedLambdaConstructorDataParser,
    );

export const lambdaConstructor = parserBundle({
    denormalizedData: denormalizedLambdaConstructorDataParser,
    edgeKind: lambdaConstructorEdgeKindParser,
    kind: lambdaConstructorNodeKindParser,
    normalizedData: normalizedLambdaConstructorDataParser,
    edges: lambdaConstructorEdgeParsers,
});

// Large type type

const largeTypeTypeNodeKindParser = z.literal("largeTypeType");

type LargeTypeTypeNodeKind = z.infer<typeof largeTypeTypeNodeKindParser>;

const normalizedLargeTypeTypeDataParser = emptyDataParser;

type NormalizedLargeTypeTypeData = z.infer<
    typeof normalizedLargeTypeTypeDataParser
>;

const normalizedLargeTypeTypeNodeParser = weakNormalizedNodeParser(
    largeTypeTypeNodeKindParser,
    normalizedLargeTypeTypeDataParser,
);

type NormalizedLargeTypeTypeNode = z.infer<
    typeof normalizedLargeTypeTypeNodeParser
>;

const largeTypeTypeEdgeParsers = {} as const;

type LargeTypeTypeEdge = z.infer<(typeof largeTypeTypeEdgeParsers)[never]>;

const denormalizedLargeTypeTypeDataParser = emptyDataParser;

type DenormalizedLargeTypeTypeData = z.infer<
    typeof denormalizedLargeTypeTypeDataParser
>;

const denormalizedLargeTypeTypeNodeParser = weakDenormalizedNodeParser(
    largeTypeTypeNodeKindParser,
    denormalizedLargeTypeTypeDataParser,
);

type DenormalizedLargeTypeTypeNode = z.infer<
    typeof denormalizedLargeTypeTypeNodeParser
>;

export const largeTypeType = parserBundle({
    denormalizedData: denormalizedLargeTypeTypeDataParser,
    edgeKind: z.never(),
    kind: largeTypeTypeNodeKindParser,
    normalizedData: normalizedLargeTypeTypeDataParser,
    edges: largeTypeTypeEdgeParsers,
});

// Library

const libraryNodeKindParser = z.literal("library");

type LibraryNodeKind = z.infer<typeof libraryNodeKindParser>;

const libraryEdgeKindParser = z.enum(["termDefinitions", "typeDefinitions"]);

type LibraryEdgeKind = z.infer<typeof libraryEdgeKindParser>;

const normalizedLibraryDataParser = weakNormalizedRelationalDataParser(
    z.object({
        termDefinitions: z.object({ manyToOne: z.literal(true) }),
        typeDefinitions: z.object({ manyToOne: z.literal(true) }),
    }),
);

type NormalizedLibraryData = z.infer<typeof normalizedLibraryDataParser>;

const normalizedLibraryNodeParser = weakNormalizedNodeParser(
    libraryNodeKindParser,
    normalizedLibraryDataParser,
);

type NormalizedLibraryNode = z.infer<typeof normalizedLibraryNodeParser>;

const libraryEdgeParsers = {
    termDefinitions: weakEdgeParser({
        kind: z.literal("termDefinitions"),
        manyToOne: true,
        sourceKind: libraryNodeKindParser,
        targetKind: z.lazy(() => termDefinitionNodeKindParser),
    }),
    typeDefinitions: weakEdgeParser({
        kind: z.literal("typeDefinitions"),
        manyToOne: true,
        sourceKind: libraryNodeKindParser,
        targetKind: z.lazy(() => typeDefinitionNodeKindParser),
    }),
} as const;

type LibraryEdge = z.infer<(typeof libraryEdgeParsers)[LibraryEdgeKind]>;

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
    libraryNodeKindParser,
    denormalizedLibraryDataParser,
);

type DenormalizedLibraryNode = z.infer<typeof denormalizedLibraryNodeParser>;

export const library = parserBundle({
    denormalizedData: denormalizedLibraryDataParser,
    edgeKind: libraryEdgeKindParser,
    kind: libraryNodeKindParser,
    normalizedData: normalizedLibraryDataParser,
    edges: libraryEdgeParsers,
});

// Product term constructor

const productTermConstructorNodeKindParser = z.literal(
    "productTermConstructor",
);

type ProductTermConstructorNodeKind = z.infer<
    typeof productTermConstructorNodeKindParser
>;

const productTermConstructorEdgeKindParser = z.enum(["components"]);

type ProductTermConstructorEdgeKind = z.infer<
    typeof productTermConstructorEdgeKindParser
>;

const normalizedProductTermConstructorDataParser =
    weakNormalizedRelationalDataParser(
        z.object({ components: z.object({ manyToOne: z.literal(true) }) }),
    );

type NormalizedProductTermConstructorData = z.infer<
    typeof normalizedProductTermConstructorDataParser
>;

const normalizedProductTermConstructorNodeParser = weakNormalizedNodeParser(
    productTermConstructorNodeKindParser,
    normalizedProductTermConstructorDataParser,
);

type NormalizedProductTermConstructorNode = z.infer<
    typeof normalizedProductTermConstructorNodeParser
>;

const productTermConstructorEdgeParsers = {
    components: weakEdgeParser({
        kind: z.literal("components"),
        manyToOne: true,
        sourceKind: productTermConstructorNodeKindParser,
        targetKind: z.lazy(() => termKindParser),
    }),
} as const;

type ProductTermConstructorEdge = z.infer<
    (typeof productTermConstructorEdgeParsers)[ProductTermConstructorEdgeKind]
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
    kind: ProductTermConstructorNodeKind;
};

const denormalizedProductTermConstructorNodeParser: z.ZodType<DenormalizedProductTermConstructorNode> =
    weakDenormalizedNodeParser(
        productTermConstructorNodeKindParser,
        denormalizedProductTermConstructorDataParser,
    );

export const productTermConstructor = parserBundle({
    denormalizedData: denormalizedProductTermConstructorDataParser,
    edgeKind: productTermConstructorEdgeKindParser,
    kind: productTermConstructorNodeKindParser,
    normalizedData: normalizedProductTermConstructorDataParser,
    edges: productTermConstructorEdgeParsers,
});

// Product term eliminator

const productTermEliminatorNodeKindParser = z.literal("productTermEliminator");

type ProductTermEliminatorNodeKind = z.infer<
    typeof productTermEliminatorNodeKindParser
>;

const normalizedProductTermEliminatorDataParser = scalarDataParser(
    z.number().int(),
);

type NormalizedProductTermEliminatorData = z.infer<
    typeof normalizedProductTermEliminatorDataParser
>;

const normalizedProductTermEliminatorNodeParser = weakNormalizedNodeParser(
    productTermEliminatorNodeKindParser,
    normalizedProductTermEliminatorDataParser,
);

type NormalizedProductTermEliminatorNode = z.infer<
    typeof normalizedProductTermEliminatorNodeParser
>;

const productTermEliminatorEdgeParsers = {} as const;

type ProductTermEliminatorEdge = z.infer<
    (typeof productTermEliminatorEdgeParsers)[never]
>;

const denormalizedProductTermEliminatorDataParser = scalarDataParser(
    z.number().int(),
);

type DenormalizedProductTermEliminatorData = z.infer<
    typeof denormalizedProductTermEliminatorDataParser
>;

const denormalizedProductTermEliminatorNodeParser = weakDenormalizedNodeParser(
    productTermEliminatorNodeKindParser,
    denormalizedProductTermEliminatorDataParser,
);

type DenormalizedProductTermEliminatorNode = z.infer<
    typeof denormalizedProductTermEliminatorNodeParser
>;

export const productTermEliminator = parserBundle({
    denormalizedData: denormalizedProductTermEliminatorDataParser,
    edgeKind: z.never(),
    kind: productTermEliminatorNodeKindParser,
    normalizedData: normalizedProductTermEliminatorDataParser,
    edges: productTermEliminatorEdgeParsers,
});

// Product type

const productTypeNodeKindParser = z.literal("productType");

type ProductTypeNodeKind = z.infer<typeof productTypeNodeKindParser>;

const productTypeEdgeKindParser = z.enum(["components"]);

type ProductTypeEdgeKind = z.infer<typeof productTypeEdgeKindParser>;

const normalizedProductTypeDataParser = weakNormalizedRelationalDataParser(
    z.object({ components: z.object({ manyToOne: z.literal(true) }) }),
);

type NormalizedProductTypeData = z.infer<
    typeof normalizedProductTypeDataParser
>;

const normalizedProductTypeNodeParser = weakNormalizedNodeParser(
    productTypeNodeKindParser,
    normalizedProductTypeDataParser,
);

type NormalizedProductTypeNode = z.infer<
    typeof normalizedProductTypeNodeParser
>;

const productTypeEdgeParsers = {
    components: weakEdgeParser({
        kind: z.literal("components"),
        manyToOne: true,
        sourceKind: productTypeNodeKindParser,
        targetKind: z.lazy(() => smallTypeKindParser),
    }),
} as const;

type ProductTypeEdge = z.infer<
    (typeof productTypeEdgeParsers)[ProductTypeEdgeKind]
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
    kind: ProductTypeNodeKind;
};

const denormalizedProductTypeNodeParser: z.ZodType<DenormalizedProductTypeNode> =
    weakDenormalizedNodeParser(
        productTypeNodeKindParser,
        denormalizedProductTypeDataParser,
    );

export const productType = parserBundle({
    denormalizedData: denormalizedProductTypeDataParser,
    edgeKind: productTypeEdgeKindParser,
    kind: productTypeNodeKindParser,
    normalizedData: normalizedProductTypeDataParser,
    edges: productTypeEdgeParsers,
});

// Sum term constructor

const sumTermConstructorNodeKindParser = z.literal("sumTermConstructor");

type SumTermConstructorNodeKind = z.infer<
    typeof sumTermConstructorNodeKindParser
>;

const normalizedSumTermConstructorDataParser = scalarDataParser(
    z.number().int(),
);

type NormalizedSumTermConstructorData = z.infer<
    typeof normalizedSumTermConstructorDataParser
>;

const normalizedSumTermConstructorNodeParser = weakNormalizedNodeParser(
    sumTermConstructorNodeKindParser,
    normalizedSumTermConstructorDataParser,
);

type NormalizedSumTermConstructorNode = z.infer<
    typeof normalizedSumTermConstructorNodeParser
>;

const sumTermConstructorEdgeParsers = {} as const;

type SumTermConstructorEdge = z.infer<
    (typeof sumTermConstructorEdgeParsers)[never]
>;

const denormalizedSumTermConstructorDataParser = scalarDataParser(
    z.number().int(),
);

type DenormalizedSumTermConstructorData = z.infer<
    typeof denormalizedSumTermConstructorDataParser
>;

const denormalizedSumTermConstructorNodeParser = weakDenormalizedNodeParser(
    sumTermConstructorNodeKindParser,
    denormalizedSumTermConstructorDataParser,
);

type DenormalizedSumTermConstructorNode = z.infer<
    typeof denormalizedSumTermConstructorNodeParser
>;

export const sumTermConstructor = parserBundle({
    denormalizedData: denormalizedSumTermConstructorDataParser,
    edgeKind: z.never(),
    kind: sumTermConstructorNodeKindParser,
    normalizedData: normalizedSumTermConstructorDataParser,
    edges: sumTermConstructorEdgeParsers,
});

// Sum term eliminator

const sumTermEliminatorNodeKindParser = z.literal("sumTermEliminator");

type SumTermEliminatorNodeKind = z.infer<
    typeof sumTermEliminatorNodeKindParser
>;

const sumTermEliminatorEdgeKindParser = z.enum(["components"]);

type SumTermEliminatorEdgeKind = z.infer<
    typeof sumTermEliminatorEdgeKindParser
>;

const normalizedSumTermEliminatorDataParser =
    weakNormalizedRelationalDataParser(
        z.object({ components: z.object({ manyToOne: z.literal(true) }) }),
    );

type NormalizedSumTermEliminatorData = z.infer<
    typeof normalizedSumTermEliminatorDataParser
>;

const normalizedSumTermEliminatorNodeParser = weakNormalizedNodeParser(
    sumTermEliminatorNodeKindParser,
    normalizedSumTermEliminatorDataParser,
);

type NormalizedSumTermEliminatorNode = z.infer<
    typeof normalizedSumTermEliminatorNodeParser
>;

const sumTermEliminatorEdgeParsers = {
    components: weakEdgeParser({
        kind: z.literal("components"),
        manyToOne: true,
        sourceKind: sumTermEliminatorNodeKindParser,
        targetKind: z.lazy(() => functionTermConstructorKindParser),
    }),
} as const;

type SumTermEliminatorEdge = z.infer<
    (typeof sumTermEliminatorEdgeParsers)[SumTermEliminatorEdgeKind]
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
    kind: SumTermEliminatorNodeKind;
};

const denormalizedSumTermEliminatorNodeParser: z.ZodType<DenormalizedSumTermEliminatorNode> =
    weakDenormalizedNodeParser(
        sumTermEliminatorNodeKindParser,
        denormalizedSumTermEliminatorDataParser,
    );

export const sumTermEliminator = parserBundle({
    denormalizedData: denormalizedSumTermEliminatorDataParser,
    edgeKind: sumTermEliminatorEdgeKindParser,
    kind: sumTermEliminatorNodeKindParser,
    normalizedData: normalizedSumTermEliminatorDataParser,
    edges: sumTermEliminatorEdgeParsers,
});

// Sum type

const sumTypeNodeKindParser = z.literal("sumType");

type SumTypeNodeKind = z.infer<typeof sumTypeNodeKindParser>;

const sumTypeEdgeKindParser = z.enum(["components"]);

type SumTypeEdgeKind = z.infer<typeof sumTypeEdgeKindParser>;

const normalizedSumTypeDataParser = weakNormalizedRelationalDataParser(
    z.object({ components: z.object({ manyToOne: z.literal(true) }) }),
);

type NormalizedSumTypeData = z.infer<typeof normalizedSumTypeDataParser>;

const normalizedSumTypeNodeParser = weakNormalizedNodeParser(
    sumTypeNodeKindParser,
    normalizedSumTypeDataParser,
);

type NormalizedSumTypeNode = z.infer<typeof normalizedSumTypeNodeParser>;

const sumTypeEdgeParsers = {
    components: weakEdgeParser({
        kind: z.literal("components"),
        manyToOne: true,
        sourceKind: sumTypeNodeKindParser,
        targetKind: z.lazy(() => smallTypeKindParser),
    }),
} as const;

type SumTypeEdge = z.infer<(typeof sumTypeEdgeParsers)[SumTypeEdgeKind]>;

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
    kind: SumTypeNodeKind;
};

const denormalizedSumTypeNodeParser: z.ZodType<DenormalizedSumTypeNode> =
    weakDenormalizedNodeParser(
        sumTypeNodeKindParser,
        denormalizedSumTypeDataParser,
    );

export const sumType = parserBundle({
    denormalizedData: denormalizedSumTypeDataParser,
    edgeKind: sumTypeEdgeKindParser,
    kind: sumTypeNodeKindParser,
    normalizedData: normalizedSumTypeDataParser,
    edges: sumTypeEdgeParsers,
});

// String term

const stringTermNodeKindParser = z.literal("stringTerm");

type StringTermNodeKind = z.infer<typeof stringTermNodeKindParser>;

const normalizedStringTermDataParser = scalarDataParser(z.string());

type NormalizedStringTermData = z.infer<typeof normalizedStringTermDataParser>;

const normalizedStringTermNodeParser = weakNormalizedNodeParser(
    stringTermNodeKindParser,
    normalizedStringTermDataParser,
);

type NormalizedStringTermNode = z.infer<typeof normalizedStringTermNodeParser>;

const stringTermEdgeParsers = {} as const;

type StringTermEdge = z.infer<(typeof stringTermEdgeParsers)[never]>;

const denormalizedStringTermDataParser = scalarDataParser(z.string());

type DenormalizedStringTermData = z.infer<
    typeof denormalizedStringTermDataParser
>;

const denormalizedStringTermNodeParser = weakDenormalizedNodeParser(
    stringTermNodeKindParser,
    denormalizedStringTermDataParser,
);

type DenormalizedStringTermNode = z.infer<
    typeof denormalizedStringTermNodeParser
>;

export const stringTerm = parserBundle({
    denormalizedData: denormalizedStringTermDataParser,
    edgeKind: z.never(),
    kind: stringTermNodeKindParser,
    normalizedData: normalizedStringTermDataParser,
    edges: stringTermEdgeParsers,
});

// String type

const stringTypeNodeKindParser = z.literal("stringType");

type StringTypeNodeKind = z.infer<typeof stringTypeNodeKindParser>;

const normalizedStringTypeDataParser = emptyDataParser;

type NormalizedStringTypeData = z.infer<typeof normalizedStringTypeDataParser>;

const normalizedStringTypeNodeParser = weakNormalizedNodeParser(
    stringTypeNodeKindParser,
    normalizedStringTypeDataParser,
);

type NormalizedStringTypeNode = z.infer<typeof normalizedStringTypeNodeParser>;

const stringTypeEdgeParsers = {} as const;

type StringTypeEdge = z.infer<(typeof stringTypeEdgeParsers)[never]>;

const denormalizedStringTypeDataParser = emptyDataParser;

type DenormalizedStringTypeData = z.infer<
    typeof denormalizedStringTypeDataParser
>;

const denormalizedStringTypeNodeParser = weakDenormalizedNodeParser(
    stringTypeNodeKindParser,
    denormalizedStringTypeDataParser,
);

type DenormalizedStringTypeNode = z.infer<
    typeof denormalizedStringTypeNodeParser
>;

export const stringType = parserBundle({
    denormalizedData: denormalizedStringTypeDataParser,
    edgeKind: z.never(),
    kind: stringTypeNodeKindParser,
    normalizedData: normalizedStringTypeDataParser,
    edges: stringTypeEdgeParsers,
});

// Term binding

const termBindingNodeKindParser = z.literal("termBinding");

type TermBindingNodeKind = z.infer<typeof termBindingNodeKindParser>;

const normalizedTermBindingDataParser = scalarDataParser(z.string());

type NormalizedTermBindingData = z.infer<
    typeof normalizedTermBindingDataParser
>;

const normalizedTermBindingNodeParser = weakNormalizedNodeParser(
    termBindingNodeKindParser,
    normalizedTermBindingDataParser,
);

type NormalizedTermBindingNode = z.infer<
    typeof normalizedTermBindingNodeParser
>;

const termBindingEdgeParsers = {} as const;

type TermBindingEdge = z.infer<(typeof termBindingEdgeParsers)[never]>;

const denormalizedTermBindingDataParser = scalarDataParser(z.string());

type DenormalizedTermBindingData = z.infer<
    typeof denormalizedTermBindingDataParser
>;

const denormalizedTermBindingNodeParser = weakDenormalizedNodeParser(
    termBindingNodeKindParser,
    denormalizedTermBindingDataParser,
);

type DenormalizedTermBindingNode = z.infer<
    typeof denormalizedTermBindingNodeParser
>;

export const termBinding = parserBundle({
    denormalizedData: denormalizedTermBindingDataParser,
    edgeKind: z.never(),
    kind: termBindingNodeKindParser,
    normalizedData: normalizedTermBindingDataParser,
    edges: termBindingEdgeParsers,
});

// Term definition

const termDefinitionNodeKindParser = z.literal("termDefinition");

type TermDefinitionNodeKind = z.infer<typeof termDefinitionNodeKindParser>;

const termDefinitionEdgeKindParser = z.enum(["binding", "term", "type"]);

type TermDefinitionEdgeKind = z.infer<typeof termDefinitionEdgeKindParser>;

const normalizedTermDefinitionDataParser = weakNormalizedRelationalDataParser(
    z.object({
        binding: z.object({ manyToOne: z.literal(false) }),
        term: z.object({ manyToOne: z.literal(false) }),
        type: z.object({ manyToOne: z.literal(false) }),
    }),
);

type NormalizedTermDefinitionData = z.infer<
    typeof normalizedTermDefinitionDataParser
>;

const normalizedTermDefinitionNodeParser = weakNormalizedNodeParser(
    termDefinitionNodeKindParser,
    normalizedTermDefinitionDataParser,
);

type NormalizedTermDefinitionNode = z.infer<
    typeof normalizedTermDefinitionNodeParser
>;

const termDefinitionEdgeParsers = {
    binding: weakEdgeParser({
        kind: z.literal("binding"),
        manyToOne: false,
        sourceKind: termDefinitionNodeKindParser,
        targetKind: termBindingNodeKindParser,
    }),
    term: weakEdgeParser({
        kind: z.literal("term"),
        manyToOne: false,
        sourceKind: termDefinitionNodeKindParser,
        targetKind: z.lazy(() =>
            z.union([termKindParser, clientImplementationNodeKindParser]),
        ),
    }),
    type: weakEdgeParser({
        kind: z.literal("type"),
        manyToOne: false,
        sourceKind: termDefinitionNodeKindParser,
        targetKind: z.lazy(() => largeTypeKindParser),
    }),
} as const;

type TermDefinitionEdge = z.infer<
    (typeof termDefinitionEdgeParsers)[TermDefinitionEdgeKind]
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
    termDefinitionNodeKindParser,
    denormalizedTermDefinitionDataParser,
);

type DenormalizedTermDefinitionNode = z.infer<
    typeof denormalizedTermDefinitionNodeParser
>;

export const termDefinition = parserBundle({
    denormalizedData: denormalizedTermDefinitionDataParser,
    edgeKind: termDefinitionEdgeKindParser,
    kind: termDefinitionNodeKindParser,
    normalizedData: normalizedTermDefinitionDataParser,
    edges: termDefinitionEdgeParsers,
});

// Term reference

const termReferenceNodeKindParser = z.literal("termReference");

type TermReferenceNodeKind = z.infer<typeof termReferenceNodeKindParser>;

const normalizedTermReferenceDataParser = scalarDataParser(z.string());

type NormalizedTermReferenceData = z.infer<
    typeof normalizedTermReferenceDataParser
>;

const normalizedTermReferenceNodeParser = weakNormalizedNodeParser(
    termReferenceNodeKindParser,
    normalizedTermReferenceDataParser,
);

type NormalizedTermReferenceNode = z.infer<
    typeof normalizedTermReferenceNodeParser
>;

const termReferenceEdgeParsers = {} as const;

type TermReferenceEdge = z.infer<(typeof termReferenceEdgeParsers)[never]>;

const denormalizedTermReferenceDataParser = scalarDataParser(z.string());

type DenormalizedTermReferenceData = z.infer<
    typeof denormalizedTermReferenceDataParser
>;

const denormalizedTermReferenceNodeParser = weakDenormalizedNodeParser(
    termReferenceNodeKindParser,
    denormalizedTermReferenceDataParser,
);

type DenormalizedTermReferenceNode = z.infer<
    typeof denormalizedTermReferenceNodeParser
>;

export const termReference = parserBundle({
    denormalizedData: denormalizedTermReferenceDataParser,
    edgeKind: z.never(),
    kind: termReferenceNodeKindParser,
    normalizedData: normalizedTermReferenceDataParser,
    edges: termReferenceEdgeParsers,
});

// Type binding

const typeBindingNodeKindParser = z.literal("typeBinding");

type TypeBindingNodeKind = z.infer<typeof typeBindingNodeKindParser>;

const normalizedTypeBindingDataParser = scalarDataParser(z.string());

type NormalizedTypeBindingData = z.infer<
    typeof normalizedTypeBindingDataParser
>;

const normalizedTypeBindingNodeParser = weakNormalizedNodeParser(
    typeBindingNodeKindParser,
    normalizedTypeBindingDataParser,
);

type NormalizedTypeBindingNode = z.infer<
    typeof normalizedTypeBindingNodeParser
>;

const typeBindingEdgeParsers = {} as const;

type TypeBindingEdge = z.infer<(typeof typeBindingEdgeParsers)[never]>;

const denormalizedTypeBindingDataParser = scalarDataParser(z.string());

type DenormalizedTypeBindingData = z.infer<
    typeof denormalizedTypeBindingDataParser
>;

const denormalizedTypeBindingNodeParser = weakDenormalizedNodeParser(
    typeBindingNodeKindParser,
    denormalizedTypeBindingDataParser,
);

type DenormalizedTypeBindingNode = z.infer<
    typeof denormalizedTypeBindingNodeParser
>;

export const typeBinding = parserBundle({
    denormalizedData: denormalizedTypeBindingDataParser,
    edgeKind: z.never(),
    kind: typeBindingNodeKindParser,
    normalizedData: normalizedTypeBindingDataParser,
    edges: typeBindingEdgeParsers,
});

// Type definition

const typeDefinitionNodeKindParser = z.literal("typeDefinition");

type TypeDefinitionNodeKind = z.infer<typeof typeDefinitionNodeKindParser>;

const typeDefinitionEdgeKindParser = z.enum(["binding", "type"]);

type TypeDefinitionEdgeKind = z.infer<typeof typeDefinitionEdgeKindParser>;

const normalizedTypeDefinitionDataParser = weakNormalizedRelationalDataParser(
    z.object({
        binding: z.object({ manyToOne: z.literal(false) }),
        type: z.object({ manyToOne: z.literal(false) }),
    }),
);

type NormalizedTypeDefinitionData = z.infer<
    typeof normalizedTypeDefinitionDataParser
>;

const normalizedTypeDefinitionNodeParser = weakNormalizedNodeParser(
    typeDefinitionNodeKindParser,
    normalizedTypeDefinitionDataParser,
);

type NormalizedTypeDefinitionNode = z.infer<
    typeof normalizedTypeDefinitionNodeParser
>;

const typeDefinitionEdgeParsers = {
    binding: weakEdgeParser({
        kind: z.literal("binding"),
        manyToOne: false,
        sourceKind: typeDefinitionNodeKindParser,
        targetKind: typeBindingNodeKindParser,
    }),
    type: weakEdgeParser({
        kind: z.literal("type"),
        manyToOne: false,
        sourceKind: typeDefinitionNodeKindParser,
        targetKind: z.lazy(() => largeTypeKindParser),
    }),
} as const;

type TypeDefinitionEdge = z.infer<
    (typeof typeDefinitionEdgeParsers)[TypeDefinitionEdgeKind]
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
    typeDefinitionNodeKindParser,
    denormalizedTypeDefinitionDataParser,
);

type DenormalizedTypeDefinitionNode = z.infer<
    typeof denormalizedTypeDefinitionNodeParser
>;

export const typeDefinition = parserBundle({
    denormalizedData: denormalizedTypeDefinitionDataParser,
    edgeKind: typeDefinitionEdgeKindParser,
    kind: typeDefinitionNodeKindParser,
    normalizedData: normalizedTypeDefinitionDataParser,
    edges: typeDefinitionEdgeParsers,
});

// Type reference

const typeReferenceNodeKindParser = z.literal("typeReference");

type TypeReferenceNodeKind = z.infer<typeof typeReferenceNodeKindParser>;

const normalizedTypeReferenceDataParser = scalarDataParser(z.string());

type NormalizedTypeReferenceData = z.infer<
    typeof normalizedTypeReferenceDataParser
>;

const normalizedTypeReferenceNodeParser = weakNormalizedNodeParser(
    typeReferenceNodeKindParser,
    normalizedTypeReferenceDataParser,
);

type NormalizedTypeReferenceNode = z.infer<
    typeof normalizedTypeReferenceNodeParser
>;

const typeReferenceEdgeParsers = {} as const;

type TypeReferenceEdge = z.infer<(typeof typeReferenceEdgeParsers)[never]>;

const denormalizedTypeReferenceDataParser = scalarDataParser(z.string());

type DenormalizedTypeReferenceData = z.infer<
    typeof denormalizedTypeReferenceDataParser
>;

const denormalizedTypeReferenceNodeParser = weakDenormalizedNodeParser(
    typeReferenceNodeKindParser,
    denormalizedTypeReferenceDataParser,
);

type DenormalizedTypeReferenceNode = z.infer<
    typeof denormalizedTypeReferenceNodeParser
>;

export const typeReference = parserBundle({
    denormalizedData: denormalizedTypeReferenceDataParser,
    edgeKind: z.never(),
    kind: typeReferenceNodeKindParser,
    normalizedData: normalizedTypeReferenceDataParser,
    edges: typeReferenceEdgeParsers,
});

// ## Unions

// Node

export const nodeKindParser = z.union([
    booleanTermNodeKindParser,
    booleanTypeNodeKindParser,
    clientImplementationNodeKindParser,
    floatTermNodeKindParser,
    floatTypeNodeKindParser,
    functionTermEliminatorNodeKindParser,
    functionTypeNodeKindParser,
    genericTypeConstructorNodeKindParser,
    genericTypeEliminatorNodeKindParser,
    integerTermNodeKindParser,
    integerTypeNodeKindParser,
    lambdaConstructorNodeKindParser,
    largeTypeTypeNodeKindParser,
    libraryNodeKindParser,
    productTermConstructorNodeKindParser,
    productTermEliminatorNodeKindParser,
    productTypeNodeKindParser,
    stringTermNodeKindParser,
    stringTypeNodeKindParser,
    sumTermConstructorNodeKindParser,
    sumTermEliminatorNodeKindParser,
    sumTypeNodeKindParser,
    termBindingNodeKindParser,
    termDefinitionNodeKindParser,
    termReferenceNodeKindParser,
    typeBindingNodeKindParser,
    typeDefinitionNodeKindParser,
    typeReferenceNodeKindParser,
]);

type NodeNodeKind = z.infer<typeof nodeKindParser>;

const normalizedNodeParser = z.union([
    normalizedBooleanTermNodeParser,
    normalizedBooleanTypeNodeParser,
    normalizedClientImplementationNodeParser,
    normalizedFloatTermNodeParser,
    normalizedFloatTypeNodeParser,
    normalizedFunctionTermEliminatorNodeParser,
    normalizedFunctionTypeNodeParser,
    normalizedGenericTypeConstructorNodeParser,
    normalizedGenericTypeEliminatorNodeParser,
    normalizedIntegerTermNodeParser,
    normalizedIntegerTypeNodeParser,
    normalizedLambdaConstructorNodeParser,
    normalizedLargeTypeTypeNodeParser,
    normalizedLibraryNodeParser,
    normalizedProductTermConstructorNodeParser,
    normalizedProductTermEliminatorNodeParser,
    normalizedProductTypeNodeParser,
    normalizedStringTermNodeParser,
    normalizedStringTypeNodeParser,
    normalizedSumTermConstructorNodeParser,
    normalizedSumTermEliminatorNodeParser,
    normalizedSumTypeNodeParser,
    normalizedTermBindingNodeParser,
    normalizedTermDefinitionNodeParser,
    normalizedTermReferenceNodeParser,
    normalizedTypeBindingNodeParser,
    normalizedTypeDefinitionNodeParser,
    normalizedTypeReferenceNodeParser,
]);

type NormalizedNode = z.infer<typeof normalizedNodeParser>;

export const edgeParsers = {
    ...booleanTermEdgeParsers,
    ...booleanTypeEdgeParsers,
    ...clientImplementationEdgeParsers,
    ...floatTermEdgeParsers,
    ...floatTypeEdgeParsers,
    ...functionTermEliminatorEdgeParsers,
    ...functionTypeEdgeParsers,
    ...genericTypeConstructorEdgeParsers,
    ...genericTypeEliminatorEdgeParsers,
    ...integerTermEdgeParsers,
    ...integerTypeEdgeParsers,
    ...lambdaConstructorEdgeParsers,
    ...largeTypeTypeEdgeParsers,
    ...libraryEdgeParsers,
    ...productTermConstructorEdgeParsers,
    ...productTermEliminatorEdgeParsers,
    ...productTypeEdgeParsers,
    ...stringTermEdgeParsers,
    ...stringTypeEdgeParsers,
    ...sumTermConstructorEdgeParsers,
    ...sumTermEliminatorEdgeParsers,
    ...sumTypeEdgeParsers,
    ...termBindingEdgeParsers,
    ...termDefinitionEdgeParsers,
    ...termReferenceEdgeParsers,
    ...typeBindingEdgeParsers,
    ...typeDefinitionEdgeParsers,
    ...typeReferenceEdgeParsers,
};

const denormalizedNodeParser = z.union([
    denormalizedBooleanTermNodeParser,
    denormalizedBooleanTypeNodeParser,
    denormalizedClientImplementationNodeParser,
    denormalizedFloatTermNodeParser,
    denormalizedFloatTypeNodeParser,
    denormalizedFunctionTermEliminatorNodeParser,
    denormalizedFunctionTypeNodeParser,
    denormalizedGenericTypeConstructorNodeParser,
    denormalizedGenericTypeEliminatorNodeParser,
    denormalizedIntegerTermNodeParser,
    denormalizedIntegerTypeNodeParser,
    denormalizedLambdaConstructorNodeParser,
    denormalizedLargeTypeTypeNodeParser,
    denormalizedLibraryNodeParser,
    denormalizedProductTermConstructorNodeParser,
    denormalizedProductTermEliminatorNodeParser,
    denormalizedProductTypeNodeParser,
    denormalizedStringTermNodeParser,
    denormalizedStringTypeNodeParser,
    denormalizedSumTermConstructorNodeParser,
    denormalizedSumTermEliminatorNodeParser,
    denormalizedSumTypeNodeParser,
    denormalizedTermBindingNodeParser,
    denormalizedTermDefinitionNodeParser,
    denormalizedTermReferenceNodeParser,
    denormalizedTypeBindingNodeParser,
    denormalizedTypeDefinitionNodeParser,
    denormalizedTypeReferenceNodeParser,
]);

type DenormalizedNode = z.infer<typeof denormalizedNodeParser>;

// Function term constructor

const functionTermConstructorKindParser = z.union([
    lambdaConstructorNodeKindParser,
    productTermEliminatorNodeKindParser,
    sumTermConstructorNodeKindParser,
    termReferenceNodeKindParser,
]);

type FunctionTermConstructorNodeKind = z.infer<
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
    ...lambdaConstructorEdgeParsers,
    ...productTermEliminatorEdgeParsers,
    ...sumTermConstructorEdgeParsers,
    ...sumTermEliminatorEdgeParsers,
    ...termReferenceEdgeParsers,
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

export const termKindParser = z.union([
    booleanTermNodeKindParser,
    floatTermNodeKindParser,
    functionTermEliminatorNodeKindParser,
    integerTermNodeKindParser,
    lambdaConstructorNodeKindParser,
    productTermConstructorNodeKindParser,
    productTermEliminatorNodeKindParser,
    sumTermConstructorNodeKindParser,
    sumTermEliminatorNodeKindParser,
    stringTermNodeKindParser,
    termReferenceNodeKindParser,
]);

type TermNodeKind = z.infer<typeof termKindParser>;

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
    ...booleanTermEdgeParsers,
    ...floatTermEdgeParsers,
    ...functionTermEliminatorEdgeParsers,
    ...integerTermEdgeParsers,
    ...lambdaConstructorEdgeParsers,
    ...productTermConstructorEdgeParsers,
    ...productTermEliminatorEdgeParsers,
    ...sumTermConstructorEdgeParsers,
    ...sumTermEliminatorEdgeParsers,
    ...stringTermEdgeParsers,
    ...termReferenceEdgeParsers,
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

export const smallTypeKindParser = z.union([
    booleanTypeNodeKindParser,
    floatTypeNodeKindParser,
    functionTypeNodeKindParser,
    genericTypeEliminatorNodeKindParser,
    integerTypeNodeKindParser,
    productTypeNodeKindParser,
    sumTypeNodeKindParser,
    stringTypeNodeKindParser,
    typeReferenceNodeKindParser,
]);

type SmallTypeNodeKind = z.infer<typeof smallTypeKindParser>;

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
    ...booleanTypeEdgeParsers,
    ...floatTypeEdgeParsers,
    ...functionTypeEdgeParsers,
    ...genericTypeEliminatorEdgeParsers,
    ...integerTypeEdgeParsers,
    ...productTypeEdgeParsers,
    ...sumTypeEdgeParsers,
    ...stringTypeEdgeParsers,
    ...typeReferenceEdgeParsers,
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

export const largeTypeKindParser = z.union([
    smallTypeKindParser,
    genericTypeConstructorNodeKindParser,
]);

type LargeTypeNodeKind = z.infer<typeof largeTypeKindParser>;

const normalizedLargeTypeNodeParser = z.union([
    normalizedSmallTypeNodeParser,
    normalizedGenericTypeConstructorNodeParser,
]);

type NormalizedLargeTypeNode = z.infer<typeof normalizedLargeTypeNodeParser>;

const normalizedLargeTypeEdgeParsers = {
    ...normalizedSmallTypeEdgeParsers,
    ...genericTypeConstructorEdgeParsers,
} as const;

const denormalizedLargeTypeNodeParser = z.union([
    denormalizedSmallTypeNodeParser,
    denormalizedGenericTypeConstructorNodeParser,
]);

type DenormalizedLargeTypeNode = z.infer<
    typeof denormalizedLargeTypeNodeParser
>;
