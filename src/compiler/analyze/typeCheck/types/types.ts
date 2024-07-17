import z from "zod";

import {
    booleanTypeParser,
    floatTypeParser,
    functionTypeParser,
    integerTypeParser,
    pass1LargeTypeParser,
    pass1SmallTypeParser,
    pass1TypeEliminationParser,
    pass1TypeExpressionParser,
    pass2LargeTypeParser,
    pass2SmallTypeParser,
    pass2TypeExpressionParser,
    productTypeParser,
    smallTypeParser,
    stringTypeParser,
    sumTypeParser,
    typeVariableParser,
} from "./parsers";

export type BooleanType = z.infer<typeof booleanTypeParser>;

export type FloatType = z.infer<typeof floatTypeParser>;

export type IntegerType = z.infer<typeof integerTypeParser>;

export type StringType = z.infer<typeof stringTypeParser>;

export type FunctionType = z.infer<typeof functionTypeParser>;

export type ProductType = z.infer<typeof productTypeParser>;

export type SumType = z.infer<typeof sumTypeParser>;

export type TypeVariable = z.infer<typeof typeVariableParser>;

export type SmallType = z.infer<typeof smallTypeParser>;

export type Pass1SmallType = z.infer<typeof pass1SmallTypeParser>;

export type Pass1TypeElimination = z.infer<typeof pass1TypeEliminationParser>;

export type Pass1TypeExpression<Type extends Pass1SmallType> = z.infer<
    ReturnType<typeof pass1TypeExpressionParser<Type>>
>;

export type Pass1LargeType = z.infer<typeof pass1LargeTypeParser>;

export type Pass2SmallType = z.infer<typeof pass2SmallTypeParser>;

export type Pass2TypeExpression<Type extends Pass2SmallType> = z.infer<
    ReturnType<typeof pass2TypeExpressionParser<Type>>
>;

export type Pass2LargeType = z.infer<typeof pass2LargeTypeParser>;
