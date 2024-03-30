import { DirectedGraph } from "graphology";

// Helpers

/**
 * Helper type, sub-types of which must be constructed as string literals or unions of string literals.
 */
type StringLiteral = `${any}`;

// Type API

type Node<Kind extends StringLiteral, Data = undefined> = {
    /**
     *
     */
    data: Data;

    /**
     * The node id.
     */
    id: string;

    /**
     * Node type discriminant.
     */
    kind: Kind;
};

type EdgeDiscriminant = {
    /**
     * This discriminant is used to distinguish categorically between edges coming out of a node.
     */
    kind?: StringLiteral;

    /**
     * This discriminant is used to distinguish numerically between edges coming out of a node.
     */
    index?: number;
};

type Edge<
    SourceType extends StringLiteral & NodeTypeUnknown,
    TargetKind extends StringLiteral & NodeTypeUnknown,
    Discriminant extends EdgeDiscriminant = {},
> = {
    /**
     * The edge id.
     */
    id: string;

    /**
     * This discriminator field is used to distinguish numerically between edges coming out of a node.
     */
    index: Discriminant["index"];

    /**
     * This discriminator field is used to distinguish categorically between edges coming out of a node.
     */
    kind: Discriminant["kind"];

    /**
     * The id of the edge's source.
     */
    sourceId: string;

    /**
     * The kind of node for the edge's source
     */
    sourceType: SourceType;

    /**
     * The id of the edge's target.
     */
    targetId: string;

    /**
     * The kind of node for the edge's target.
     */
    targetKind: TargetKind;
};

// Instances

/**
 * Boolean term AST node.
 */
type BooleanTerm = Node<"booleanTerm", boolean>;

/**
 * Boolean type AST node.
 */
type BooleanType = Node<"booleanType">;

/**
 * Client implementation AST node.
 */
type ClientImplementation = Node<"clientImplementation">;

/**
 * Float term AST node.
 */
type FloatTerm = Node<"floatTerm", number>;

/**
 * Float type AST node.
 */
type FloatType = Node<"floatType">;

/**
 * Function term constructor AST node.
 * @see FunctionTermEliminatorFunctionData
 */
type FunctionTermEliminator = Node<"functionTermEliminator">;

/**
 * Relates a function term eliminator AST node to the term AST nodes comprising its `arguments`.
 *
 * @see FunctionTermEliminator
 */
type FunctionTermEliminatorArgumentsData = Edge<
    "functionTermEliminator",
    TermNodeTypeUnknown,
    { kind: "arguments"; index: number }
>;

/**
 * Relates a function term eliminator AST node to the term reference or lambda constructor AST node
 * comprising its `function`.
 *
 * @see FunctionTermEliminator
 */
type FunctionTermEliminatorFunctionData = Edge<
    "functionTermEliminator",
    "termReference" | "lambdaConstructor",
    { kind: "function" }
>;

/**
 * Function type AST node.
 * @see FunctionTypeDomainTypesData
 */
type FunctionType = Node<"functionType">;

/**
 * Relates a function type AST node to the small type AST node comprising its `codomainType`.
 *
 * @see FunctionType
 */
type FunctionTypeCodomainTypeData = Edge<
    "functionType",
    SmallTypeNodeTypeUnknown,
    { kind: "codomainType" }
>;

/**
 * Relates a function type AST node to the small type AST nodes comprising its `domainTypes`.
 *
 * @see FunctionType
 */
type FunctionTypeDomainTypesData = Edge<
    "functionType",
    SmallTypeNodeTypeUnknown,
    { kind: "domainTypes"; index: number }
>;

/**
 * Generic type constructor AST node.
 * @see GenericTypeEliminatorDomainTypeBindingsData
 */
type GenericTypeConstructor = Node<"genericTypeConstructor">;

/**
 * Relates a generic type constructor AST node to the AST node comprising its `codomainType`.
 *
 * @see GenericTypeConstructor
 */
type GenericTypeEliminatorCodomainTypeData = Edge<
    "genericTypeEliminator",
    SmallTypeNodeTypeUnknown,
    { kind: "codomainType" }
>;

/**
 * Relates a generic type constructor AST node to the AST nodes comprising its `domainTypeBindings`.
 *
 * @see GenericTypeConstructor
 */
type GenericTypeEliminatorDomainTypeBindingsData = Edge<
    "genericTypeEliminator",
    "typeBinding",
    { kind: "domainTypeBindings"; index: number }
>;

/**
 * Generic type eliminator AST node.
 * @see GenericTypeEliminatorArgumentsData
 */
type GenericTypeEliminator = Node<"genericTypeEliminator">;

/**
 * Relates a generic type eliminator AST node to the small type AST node comprising its `arguments`.
 *
 * @see GenericTypeEliminator
 */
type GenericTypeEliminatorArgumentsData = Edge<
    "genericTypeEliminator",
    SmallTypeNodeTypeUnknown,
    { kind: "arguments"; index: number }
>;

/**
 * Relates a generic type eliminator AST node to the type reference or generic type constructor AST
 * node comprising its `genericType`.
 *
 * @see GenericTypeEliminator
 */
type GenericTypeEliminatorGenericTypeData = Edge<
    "genericTypeEliminator",
    "typeReference" | "genericTypeConstructor",
    { kind: "genericType" }
>;

/**
 * Integer term AST node.
 */
type IntegerTerm = Node<"integerTerm", number>;

/**
 * Integer type AST node.
 */
type IntegerType = Node<"integerType">;

/**
 * Lambda constructor AST node.
 * @see LambdaConstructorDomainBindingsData
 */
type LambdaConstructor = Node<"lambdaConstructor">;

/**
 * Relates a lambda constructor AST node to the term AST node comprising its `codomainTerm`.
 *
 * @see LambdaConstructor
 */
type LambdaConstructorCodomainTermData = Edge<
    "lambdaConstructor",
    TermNodeTypeUnknown,
    { kind: "codomainTerm" }
>;

/**
 * Relates a lambda constructor AST node to the term binding AST nodes comprising its
 * `domainBindings`.
 *
 * @see LambdaConstructor
 */
type LambdaConstructorDomainBindingsData = Edge<
    "lambdaConstructor",
    "termBinding",
    { kind: "domainBindings"; index: number }
>;

/**
 * Large type AST node.
 */
type LargeTypeType = Node<"largeTypeType">;

/**
 * Library AST node.
 */
type Library = Node<"library">;

/**
 * Relates a library AST node to the term definition AST nodes comprising its `termDefinitions`.
 *
 * @see Library
 */
type LibraryTermDefinitionsData = Edge<
    "library",
    "termDefinition",
    { kind: "termDefinitions"; index: number }
>;

/**
 * Relates a library AST node to the type definition AST nodes comprising its `typeDefinitions`.
 *
 * @see Library
 */
type LibraryTypeDefinitionsData = Edge<
    "library",
    "typeDefinition",
    { kind: "typeDefinitions"; index: number }
>;

/**
 * Product term constructor AST node.
 *
 * @see ProductTermConstructorData
 */
type ProductTermConstructor = Node<"productTermConstructor">;

/**
 * Relates a product term constructor AST node to the term AST nodes comprising its data.
 *
 * @see ProductTermConstructor
 */
type ProductTermConstructorData = Edge<
    "productTermConstructor",
    TermNodeTypeUnknown,
    { index: number }
>;

/**
 * Product term eliminator AST node.
 */
type ProductTermEliminator = Node<"productTermEliminator", number>;

/**
 * Product type AST node.
 *
 * @see ProductTypeData
 */
type ProductType = Node<"productType">;

/**
 * Relates a product type AST node to the small type AST nodes comprising its data.
 *
 * @see ProductType
 */
type ProductTypeData = Edge<
    "productType",
    SmallTypeNodeTypeUnknown,
    { index: number }
>;

/**
 * Sum term constructor AST node.
 */
type SumTermConstructor = Node<"sumTermConstructor", number>;

/**
 * Sum term eliminator AST node.
 *
 * @see SumTermEliminatorData
 */
type SumTermEliminator = Node<"sumTermEliminator">;

/**
 * Relates a sum term eliminator AST node to the function term constructor AST nodes comprising its
 * data.
 *
 * @see SumTermEliminator
 */
type SumTermEliminatorData = Edge<
    "sumTermEliminator",
    FunctionTermConstructorNodeTypeUnknown,
    { index: number }
>;

/**
 * Sum type AST node.
 */
type SumType = Node<"sumType">;

/**
 * Relates a sum type AST node to the small type AST nodes comprising its data.
 */
type SumTypeData = Edge<"sumType", SmallTypeNodeTypeUnknown, { index: number }>;

type StringTerm = Node<"stringTerm", string>;

type StringType = Node<"stringType">;

type TermBinding = Node<"termBinding", string>;

type TermDefinition = Node<"termDefinition">;

type TermDefinitionBindingData = Edge<
    "termDefinition",
    "termBinding",
    { kind: "binding" }
>;

type TermDefinitionTermData = Edge<
    "termDefinition",
    TermNodeTypeUnknown,
    { kind: "term" }
>;

type TermDefinitionTypeData = Edge<
    "termDefinition",
    LargeTypeNodeTypeUnknown,
    { kind: "type" }
>;

type TermReference = Node<"termReference", string>;

type TypeBinding = Node<"typeBinding", string>;

type TypeDefinition = Node<"typeDefinition">;

type TypeDefinitionBindingData = Edge<
    "typeDefinition",
    "typeBinding",
    { kind: "binding" }
>;

type TypeDefinitionTypeData = Edge<
    "typeDefinition",
    LargeTypeNodeTypeUnknown,
    { kind: "type" }
>;

type TypeReference = Node<"typeReference", string>;

// Unions

type FunctionTermConstructorUnknown =
    | LambdaConstructor
    | ProductTermEliminator
    | SumTermConstructor
    | SumTermEliminator
    | TermReference;

type FunctionTermConstructorNodeTypeUnknown =
    FunctionTermConstructorUnknown["kind"];

type LargeTypeUnknown = SmallTypeUnknown | GenericTypeConstructor;

type LargeTypeNodeTypeUnknown = LargeTypeUnknown["kind"];

type NodeUnknown =
    | BooleanTerm
    | BooleanType
    | ClientImplementation
    | FloatTerm
    | FloatType
    | FunctionTermEliminator
    | FunctionType
    | GenericTypeConstructor
    | GenericTypeEliminator
    | IntegerTerm
    | IntegerType
    | LambdaConstructor
    | LargeTypeType
    | Library
    | ProductTermConstructor
    | ProductTermEliminator
    | ProductType
    | SumTermConstructor
    | SumTermEliminator
    | SumType
    | StringTerm
    | StringType
    | TermBinding
    | TermDefinition
    | TermReference
    | TypeBinding
    | TypeDefinition
    | TypeReference;

type NodeTypeUnknown = NodeUnknown["kind"];

type NonTerminalUnknown =
    | FunctionTermEliminator
    | FunctionType
    | GenericTypeConstructor
    | GenericTypeEliminator
    | LambdaConstructor
    | Library
    | ProductTermConstructor
    | ProductTermEliminator
    | ProductType
    | SumTermConstructor
    | SumTermEliminator
    | SumType
    | TermDefinition
    | TypeDefinition;

type NonTerminalNodeTypeUnknown = NonTerminalUnknown["kind"];

type SmallTypeUnknown =
    | BooleanType
    | FloatType
    | FunctionType
    | GenericTypeEliminator
    | IntegerType
    | ProductType
    | SumType
    | StringType
    | TypeReference;

type SmallTypeNodeTypeUnknown = SmallTypeUnknown["kind"];

type TermUnknown =
    | BooleanTerm
    | FloatTerm
    | FunctionTermEliminator
    | IntegerTerm
    | LambdaConstructor
    | ProductTermConstructor
    | ProductTermEliminator
    | SumTermConstructor
    | SumTermEliminator
    | StringTerm
    | TermReference;

type TermNodeTypeUnknown = TermUnknown["kind"];

type EdgeUnknown =
    | FunctionTermEliminatorArgumentsData
    | FunctionTermEliminatorFunctionData
    | FunctionTypeDomainTypesData
    | FunctionTypeCodomainTypeData
    | GenericTypeEliminatorArgumentsData
    | GenericTypeEliminatorCodomainTypeData
    | GenericTypeEliminatorDomainTypeBindingsData
    | GenericTypeEliminatorGenericTypeData
    | LambdaConstructorCodomainTermData
    | LambdaConstructorDomainBindingsData
    | LibraryTermDefinitionsData
    | LibraryTypeDefinitionsData
    | ProductTermConstructorData
    | ProductTypeData
    | SumTermEliminatorData
    | SumTypeData
    | TermDefinitionBindingData
    | TermDefinitionTermData
    | TermDefinitionTypeData
    | TypeDefinitionBindingData
    | TypeDefinitionTypeData;

type EdgeSourceTypeUnknown = EdgeUnknown["sourceType"];

type EdgeTargetTypeUnknown = EdgeUnknown["targetKind"];

type EdgeSourceType<TargetType extends EdgeTargetTypeUnknown> = (EdgeUnknown & {
    targetType: TargetType;
})["sourceType"];

type EdgeTargetType<SourceType extends EdgeSourceTypeUnknown> = (EdgeUnknown & {
    sourceType: SourceType;
})["targetKind"];

type EdgeTypeFromTargetType<TargetType extends EdgeTargetTypeUnknown> =
    (EdgeUnknown & {
        targetType: TargetType;
    })["kind"];

type EdgeTypeFromSourceType<SourceType extends EdgeSourceTypeUnknown> =
    (EdgeUnknown & {
        sourceType: SourceType;
    })["kind"];

// Smaller API for specializing `NodeUnknown`

type NodeFromType<Type extends NodeTypeUnknown> = NodeUnknown & {
    type: Type;
};

// Denormalize

type Denormalize<T> =
    T extends Node<infer Type, infer Data>
        ? // `T` is a node, denormalize it
          never
        : // `T` is a primitive type, pass it through
          T;

export class Ast {
    private graph: DirectedGraph<NodeUnknown>;

    constructor() {
        this.graph = new DirectedGraph({ allowSelfLoops: false });
    }

    test() {
        this.graph.addNode();
    }
}
