import {
    anonymize,
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
        const ast = parser.parse("[^ -> Boolean ^]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            functionType({
                codomain: booleanTypeLiteral(undefined),
                domains: [],
            }),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function type with only a type reference codomain", () => {
        const ast = parser.parse("[^ -> Foo ^]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            functionType({
                codomain: unsafeTypeReference("Foo"),
                domains: [],
            }),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function type with only a product type codomain", () => {
        const ast = parser.parse("[^ -> [* Boolean Foo *] ^]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            functionType({
                codomain: productType([
                    booleanTypeLiteral(undefined),
                    unsafeTypeReference("Foo"),
                ]),
                domains: [],
            }),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function type with only a sum type codomain", () => {
        const ast = parser.parse("[^ -> [+ Boolean Foo +] ^]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            functionType({
                codomain: sumType([
                    booleanTypeLiteral(undefined),
                    unsafeTypeReference("Foo"),
                ]),
                domains: [],
            }),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function type with only a function type codomain", () => {
        const ast = parser.parse(
            "[^ -> [^ Boolean -> [+ String String +] ^] ^]",
        );

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
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
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function type with several type literal domains", () => {
        const ast = parser.parse(
            "[^ Boolean Boolean String -> [* Foo String *] ^]",
        );

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
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
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function type with several type reference domains", () => {
        const ast = parser.parse("[^ Foo Foo Bar -> [* Baz Bar *] ^]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
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
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function type with several product type, sum type, and function type domains", () => {
        const ast = parser.parse(
            "[^ [* Foo String *] [+ Boolean +] [^ Boolean -> [+ String Bar +] ^] -> Float ^]",
        );

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
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
        );
        expect(actual).toStrictEqual(expected);
    });
});
