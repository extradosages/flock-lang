import {
    DenormalizedAst,
    dBooleanType,
    dFloatType,
    dFunctionType,
    dProductType,
    dStringType,
    dSumType,
    dTypeReference,
} from "../../ast";
import { Parser } from "../parser";

describe("functionType", () => {
    const parser = new Parser("functionType");

    it("parses a function type with only a type literal codomain", () => {
        const actual = parser
            .parse("[^ -> Boolean ^]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dFunctionType({
                codomain: dBooleanType(undefined),
                domains: [],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function type with only a type reference codomain", () => {
        const actual = parser.parse("[^ -> Foo ^]").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dFunctionType({
                codomain: dTypeReference("Foo"),
                domains: [],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function type with only a product type codomain", () => {
        const actual = parser
            .parse("[^ -> [* Boolean Foo *] ^]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dFunctionType({
                codomain: dProductType({
                    components: [
                        dBooleanType(undefined),
                        dTypeReference("Foo"),
                    ],
                }),
                domains: [],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function type with only a sum type codomain", () => {
        const actual = parser
            .parse("[^ -> [+ Boolean Foo +] ^]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dFunctionType({
                codomain: dSumType({
                    components: [
                        dBooleanType(undefined),
                        dTypeReference("Foo"),
                    ],
                }),
                domains: [],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function type with only a function type codomain", () => {
        const actual = parser
            .parse("[^ -> [^ Boolean -> [+ String String +] ^] ^]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dFunctionType({
                codomain: dFunctionType({
                    codomain: dSumType({
                        components: [
                            dStringType(undefined),
                            dStringType(undefined),
                        ],
                    }),
                    domains: [dBooleanType(undefined)],
                }),
                domains: [],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function type with several type literal domains", () => {
        const actual = parser
            .parse("[^ Boolean Boolean String -> [* Foo String *] ^]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dFunctionType({
                codomain: dProductType({
                    components: [dTypeReference("Foo"), dStringType(undefined)],
                }),
                domains: [
                    dBooleanType(undefined),
                    dBooleanType(undefined),
                    dStringType(undefined),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function type with several type reference domains", () => {
        const actual = parser
            .parse("[^ Foo Foo Bar -> [* Baz Bar *] ^]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dFunctionType({
                codomain: dProductType({
                    components: [dTypeReference("Baz"), dTypeReference("Bar")],
                }),
                domains: [
                    dTypeReference("Foo"),
                    dTypeReference("Foo"),
                    dTypeReference("Bar"),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function type with several product type, sum type, and function type domains", () => {
        const actual = parser
            .parse(
                "[^ [* Foo String *] [+ Boolean +] [^ Boolean -> [+ String Bar +] ^] -> Float ^]",
            )
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dFunctionType({
                codomain: dFloatType(undefined),
                domains: [
                    dProductType({
                        components: [
                            dTypeReference("Foo"),
                            dStringType(undefined),
                        ],
                    }),
                    dSumType({ components: [dBooleanType(undefined)] }),
                    dFunctionType({
                        codomain: dSumType({
                            components: [
                                dStringType(undefined),
                                dTypeReference("Bar"),
                            ],
                        }),
                        domains: [dBooleanType(undefined)],
                    }),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });
});
