import {
    BooleanType,
    FloatType,
    FunctionType,
    IntegerType,
    Pass1SmallType,
    Pass1TypeElimination,
    Pass1TypeExpression,
    Pass2SmallType,
    Pass2TypeExpression,
    ProductType,
    StringType,
    SumType,
    TypeVariable,
} from "./types";

const constructorWithoutArgs =
    <Type extends BooleanType | FloatType | IntegerType | StringType>(
        kind: Type["kind"],
    ) =>
    () => ({ kind, data: undefined });

const basicConstructor =
    <Type extends { kind: unknown; data: unknown }>(kind: Type["kind"]) =>
    (data: Type["data"]) => ({
        kind,
        data,
    });

export const booleanType = constructorWithoutArgs<BooleanType>("boolean");

export const floatType = constructorWithoutArgs<FloatType>("float");

export const integerType = constructorWithoutArgs<IntegerType>("integer");

export const stringType = constructorWithoutArgs<StringType>("string");

export const functionType = basicConstructor<FunctionType>("function");

export const productType = basicConstructor<ProductType>("product");

export const sumType = basicConstructor<SumType>("sum");

export const typeVariable = basicConstructor<TypeVariable>("typeVariable");

export const pass1TypeElimination =
    basicConstructor<Pass1TypeElimination>("typeElimination");

export const pass1TypeExpression = <Type extends Pass1SmallType>(data: {
    freeVariables: TypeVariable[];
    type: Type;
}): Pass1TypeExpression<Type> => ({ kind: "pass1Expression", data });

export const pass2TypeExpression = <Type extends Pass2SmallType>(data: {
    freeVariables: TypeVariable[];
    type: Type;
}): Pass2TypeExpression<Type> => ({ kind: "pass2Expression", data });
