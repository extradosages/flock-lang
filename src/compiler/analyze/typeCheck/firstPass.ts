/**
 * Type checking first pass (generic inference).
 *
 * This assigns a generic type expression to each term.
 *
 * The expression assigned to each term corresponds to the obvious "final" type which will be
 * associated to the term, with the exception of term references and function eliminations.
 * Function eliminations, in particular, are assigned a utility type that gets resolved to
 * something more concrete during the second pass. Term references are sensibly assigned type
 * variables, which are also _usually_ resolved to a more concrete type during the second pass,
 * except possibly in the case that the ambient term has a generic type.
 */

import { NormalizedAst, StrongNormalizedTermNode } from "../../ast";

import {
    BooleanType,
    FloatType,
    FunctionType,
    IntegerType,
    Pass1SmallType,
    Pass1TypeElimination,
    Pass1TypeExpression,
    ProductType,
    StringType,
    TypeVariable,
    booleanType,
    floatType,
    integerType,
    pass1TypeExpression,
    stringType,
} from "./types";

type InferAs<Type extends Pass1SmallType> = (
    ast: NormalizedAst,
    termNode: StrongNormalizedTermNode,
) => Pass1TypeExpression<Type>;

const inferBooleanTerm: InferAs<BooleanType> = () =>
    pass1TypeExpression({ freeVariables: [], type: booleanType() });

const inferFloatTerm: InferAs<FloatType> = () =>
    pass1TypeExpression({
        freeVariables: [],
        type: floatType(),
    });

const inferFunctionTermEliminator: InferAs<Pass1TypeElimination> = () => {
    throw new Error("Not implemented");
};

const inferIntegerTerm: InferAs<IntegerType> = () =>
    pass1TypeExpression({ freeVariables: [], type: integerType() });

const inferLambdaConstructor: InferAs<FunctionType> = () => {
    throw new Error("Not implemented");
};

const inferProductTermConstructor: InferAs<ProductType> = () => {
    throw new Error("Not implemented");
};

const inferProductTermEliminator: InferAs<FunctionType> = () => {
    throw new Error("Not implemented");
};

const inferStringTerm: InferAs<StringType> = () =>
    pass1TypeExpression({ freeVariables: [], type: stringType() });

const inferSumTermConstructor: InferAs<FunctionType> = () => {
    throw new Error("Not implemented");
};

const inferSumTermEliminator: InferAs<FunctionType> = () => {
    throw new Error("Not implemented");
};

const inferTypeReference: InferAs<TypeVariable> = (ast, termNode) => {
    throw new Error("Not implemented");
};

export const firstPass = (ast: NormalizedAst) => {};
