import z from "zod";

type Type<Kind extends string, Data> = { kind: Kind; data: Data };

const typeParser = <Kind extends string, Data>(
    kind: z.ZodType<Kind>,
    data: z.ZodType<Data>,
): z.ZodType<Type<Kind, Data>> =>
    z.object({ kind, data }).strict() as z.ZodType<Type<Kind, Data>>;

export const booleanTypeParser = typeParser(
    z.literal("boolean"),
    z.undefined(),
);

export const floatTypeParser = typeParser(z.literal("float"), z.undefined());

export const integerTypeParser = typeParser(
    z.literal("integer"),
    z.undefined(),
);

export const stringTypeParser = typeParser(z.literal("string"), z.undefined());

type FunctionType = Type<
    "function",
    { domains: SmallType[]; codomain: SmallType }
>;

export const functionTypeParser: z.ZodType<FunctionType> = typeParser(
    z.literal("function"),
    z.object({
        domains: z.array(z.lazy(() => smallTypeParser)),
        codomain: z.lazy(() => smallTypeParser),
    }),
);

type ProductType = Type<"product", SmallType[]>;

export const productTypeParser: z.ZodType<ProductType> = typeParser(
    z.literal("product"),
    z.array(z.lazy(() => smallTypeParser)),
);

type SumType = Type<"sum", SmallType[]>;

export const sumTypeParser: z.ZodType<SumType> = typeParser(
    z.literal("sum"),
    z.array(z.lazy(() => smallTypeParser)),
);

export const typeVariableParser = typeParser(
    z.literal("typeVariable"),
    z.string(),
);

export const smallTypeParser = z.union([
    booleanTypeParser,
    floatTypeParser,
    integerTypeParser,
    stringTypeParser,
    typeVariableParser,
    functionTypeParser,
    productTypeParser,
    sumTypeParser,
]);

type SmallType = z.infer<typeof smallTypeParser>;

type Pass1TypeElimination = Type<
    "typeElimination",
    { head: SmallType; tail: SmallType[] }
>;

export const pass1TypeEliminationParser: z.ZodType<Pass1TypeElimination> =
    typeParser(
        z.literal("typeElimination"),
        z.lazy(() =>
            z.object({ head: smallTypeParser, tail: z.array(smallTypeParser) }),
        ),
    );

export const pass1SmallTypeParser = z.union([
    smallTypeParser,
    pass1TypeEliminationParser,
]);

type Pass1SmallType = z.infer<typeof pass1SmallTypeParser>;

export const pass1TypeExpressionParser = <Type extends Pass1SmallType>(
    type: z.ZodType<Type>,
) =>
    typeParser(
        z.literal("pass1Expression"),
        z.object({ freeVariables: z.array(typeVariableParser), type }),
    );

export const pass1LargeTypeParser = z.union([
    pass1SmallTypeParser,
    pass1TypeExpressionParser(pass1SmallTypeParser),
]);

export const pass2SmallTypeParser = smallTypeParser;

type Pass2SmallType = z.infer<typeof pass2SmallTypeParser>;

export const pass2TypeExpressionParser = <Type extends Pass2SmallType>(
    type: z.ZodType<Type>,
) =>
    typeParser(
        z.literal("pass2Expression"),
        z.object({
            freeVariables: z.array(typeVariableParser),
            type,
        }),
    );

export const pass2LargeTypeParser = z.union([
    pass2SmallTypeParser,
    pass2TypeExpressionParser(pass2SmallTypeParser),
]);
