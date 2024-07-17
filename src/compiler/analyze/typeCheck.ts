import {
    NormalizedAst,
    StrongFunctionTermConstructorNodeKind,
    StrongLargeTypeNodeKind,
    StrongNodeKind,
    StrongNormalizedLargeTypeNode,
    StrongNormalizedNode,
    StrongNormalizedSmallTypeNode,
    StrongTermNodeKind,
    nBooleanType,
    nFloatType,
} from "../ast";
import { Scopes } from "./scopes";

type TypeCheck = {
    descendingLargeType: StrongNormalizedLargeTypeNode;
    descendingSmallType: StrongNormalizedSmallTypeNode;
    ascendingType: StrongNormalizedSmallTypeNode;
};

const getCodomainType = (node: StrongNormalizedNode<StrongFunctionTermConstructorNodeKind>) => {
    if (node.kind === 'lambdaConstructor') {
        
    }
}

type InferType<NodeKind extends StrongNodeKind> = (ast: NormalizedAst, term: StrongNormalizedNode<NodeKind>) => StrongNormalizedNode<StrongLargeTypeNodeKind>

const inferCodomainType = (ast: NormalizedAst, term: StrongNormalizedNode<StrongFunctionTermConstructorNodeKind>): StrongNormalizedNode<STrongLargeTypeNodeKind>  => {
    if (term.kind === 'lambdaConstructor') {
        const codomainTermNode = ast.oneToOneChild<'lambdaConstructor', 'codomainTerm'>(term.id, 'codomainTerm')
        return inferType[codomainTermNode.kind](ast, codomainTermNode as any)
    }
    if (term.kind === 'productTermEliminator') {
        const componentTermNodes = ast.manyToOneChildren<'productTermConstructor', 'components'>(term.id, 'components');
    }
}

const inferType: {
    [NodeKind in StrongTermNodeKind]: InferType<NodeKind>
} = {
    booleanTerm: () => nBooleanType(undefined),
    floatTerm: () => nFloatType(undefined),
    functionTermEliminator: (ast, term) => inferType
}

type CheckType<NodeKind extends StrongNodeKind> = (
    ast: NormalizedAst,
    term: StrongNormalizedNode<NodeKind>,
    type: StrongNormalizedSmallTypeNode,
) => boolean;

const checkType: {
    [NodeKind in StrongTermNodeKind]: CheckType<NodeKind>;
} = {
    booleanTerm: (ast, term, type) => {
        return type.kind === "booleanType";
    },
    floatTerm: (ast, term, type) => {
        return type.kind === "floatType";
    },
    functionTermEliminator: (ast, term, type) => {
        // Check that the result of elimination will have the right type
        const functionTerm = ast.oneToOneChild<
            "functionTermEliminator",
            "function"
        >(term.id, "function");

        const codomainType = ast.oneToOneChild<"functionType", "codomain">(
            functionTerm.id,
            "codomain",
        );

        if (type.kind !== codomainType.kind) {
            return false;
        }

        // Check that the arguments have the right type
        const argumentTerms = ast.manyToOneChildren<'functionTermEliminator', 'arguments'>(term.id, 'arguments');

        const argumentTypes = 

    },
    integerTerm: (ast, term, type) => {
        return type.kind === "integerType";
    },
    lambdaConstructor: (ast, term, type) => {},
    productTermConstructor: (ast, term, type) => {},
    productTermEliminator: (ast, term, type) => {},
    stringTerm: (ast, term, type) => {
        return type.kind === "stringType";
    },
    sumTermConstructor: (ast, term, type) => {},
    sumTermEliminator: (ast, term, type) => {},
    termReference: (ast, term, type) => {},
};

const typeCheckTermDefinition = (
    ast: NormalizedAst,
    scopes: Scopes,
    typeReferenceResolution: Record<string, string>,
    termReferenceResolution: Record<string, string>,
    termDefinitionId: string,
) => {};
