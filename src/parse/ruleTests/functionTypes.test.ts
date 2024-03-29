import {
    DenormalizedAst,
    booleanTypeLiteral,
    floatTypeLiteral,
    functionType,
    productType,
    stringTypeLiteral,
    sumType,
    unsafeTypeReference,
} from "@flock/ast";

import { Parser } from "../parser";

describe("functionType", () => {
    const parser = new Parser("functionType");

    it("parses a function type with only a type literal codomain", () => {
        const actual = parser
            .parse("[^ -> Boolean ^]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            functionType({
                codomain: booleanTypeLiteral(undefined),
                domains: [],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function type with only a type reference codomain", () => {
        const actual = parser
            .parse("[^ -> Foo ^]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            functionType({
                codomain: unsafeTypeReference("Foo"),
                domains: [],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function type with only a product type codomain", () => {
        const actual = parser
            .parse("[^ -> [* Boolean Foo *] ^]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            functionType({
                codomain: productType([
                    booleanTypeLiteral(undefined),
                    unsafeTypeReference("Foo"),
                ]),
                domains: [],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function type with only a sum type codomain", () => {
        const actual = parser
            .parse("[^ -> [+ Boolean Foo +] ^]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            functionType({
                codomain: sumType([
                    booleanTypeLiteral(undefined),
                    unsafeTypeReference("Foo"),
                ]),
                domains: [],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function type with only a function type codomain", () => {
        const actual = parser
            .parse("[^ -> [^ Boolean -> [+ String String +] ^] ^]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            functionType({
                codomain: functionType({
                    codomain: sumType([
                        stringTypeLiteral(undefined),
                        stringTypeLiteral(undefined),
                    ]),
                    domains: [booleanTypeLiteral(undefined)],
                }),
                domains: [],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function type with several type literal domains", () => {
        const actual = parser
            .parse("[^ Boolean Boolean String -> [* Foo String *] ^]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            functionType({
                codomain: productType([
                    unsafeTypeReference("Foo"),
                    stringTypeLiteral(undefined),
                ]),
                domains: [
                    booleanTypeLiteral(undefined),
                    booleanTypeLiteral(undefined),
                    stringTypeLiteral(undefined),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function type with several type reference domains", () => {
        const actual = parser
            .parse("[^ Foo Foo Bar -> [* Baz Bar *] ^]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            functionType({
                codomain: productType([
                    unsafeTypeReference("Baz"),
                    unsafeTypeReference("Bar"),
                ]),
                domains: [
                    unsafeTypeReference("Foo"),
                    unsafeTypeReference("Foo"),
                    unsafeTypeReference("Bar"),
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
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            functionType({
                codomain: floatTypeLiteral(undefined),
                domains: [
                    productType([
                        unsafeTypeReference("Foo"),
                        stringTypeLiteral(undefined),
                    ]),
                    sumType([booleanTypeLiteral(undefined)]),
                    functionType({
                        codomain: sumType([
                            stringTypeLiteral(undefined),
                            unsafeTypeReference("Bar"),
                        ]),
                        domains: [booleanTypeLiteral(undefined)],
                    }),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });
});
