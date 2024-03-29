import {
    anonymize,
    booleanTypeLiteral,
    functionType,
    genericTypeEliminator,
    productType,
    stringTypeLiteral,
    sumType,
    unsafeTypeReference,
} from "@flock/ast";

import { Parser } from "../parser";

describe("productType", () => {
    const parser = new Parser("productType");

    it("parses the empty product type", () => {
        const ast = parser.parse("[**]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(productType([]));
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with one small literal type", () => {
        const ast = parser.parse("[* Boolean *]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            productType([booleanTypeLiteral(undefined)]),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with several small literal types", () => {
        const ast = parser.parse("[* Boolean String Boolean *]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            productType([
                booleanTypeLiteral(undefined),
                stringTypeLiteral(undefined),
                booleanTypeLiteral(undefined),
            ]),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with a single type reference", () => {
        const ast = parser.parse("[* Foo *]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(productType([unsafeTypeReference("Foo")]));
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with several type references", () => {
        const ast = parser.parse("[* Foo Bar Baz Qux *]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            productType([
                unsafeTypeReference("Foo"),
                unsafeTypeReference("Bar"),
                unsafeTypeReference("Baz"),
                unsafeTypeReference("Qux"),
            ]),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with a single nested product type", () => {
        const ast = parser.parse("[* [**] *]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(productType([productType([])]));
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with several nested product types", () => {
        const ast = parser.parse("[* [**] [**] *]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            productType([productType([]), productType([])]),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with a single nested sum type", () => {
        const ast = parser.parse("[* [++] *]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(productType([sumType([])]));
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with several nested sum types", () => {
        const ast = parser.parse("[* [++] [++] *]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(productType([sumType([]), sumType([])]));
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with a single nested function type", () => {
        const ast = parser.parse("[* [^ -> Boolean ^] *]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            productType([
                functionType({
                    codomain: booleanTypeLiteral(undefined),
                    domains: [],
                }),
            ]),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with several nested function types", () => {
        const ast = parser.parse("[* [^ -> Boolean ^] [^ -> Boolean ^] *]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            productType([
                functionType({
                    codomain: booleanTypeLiteral(undefined),
                    domains: [],
                }),
                functionType({
                    codomain: booleanTypeLiteral(undefined),
                    domains: [],
                }),
            ]),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with a single generic type eliminator", () => {
        const ast = parser.parse("[* (Foo String) *]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            productType([
                genericTypeEliminator({
                    function: unsafeTypeReference("Foo"),
                    arguments: [stringTypeLiteral(undefined)],
                }),
            ]),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with several generic type eliminators", () => {
        const ast = parser.parse("[* (Foo String) (Foo Boolean) *]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            productType([
                genericTypeEliminator({
                    function: unsafeTypeReference("Foo"),
                    arguments: [stringTypeLiteral(undefined)],
                }),
                genericTypeEliminator({
                    function: unsafeTypeReference("Foo"),
                    arguments: [booleanTypeLiteral(undefined)],
                }),
            ]),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a complicated product type", () => {
        const ast = parser.parse(
            "[* String [* [^ -> Boolean ^] Foo *] (Foo Boolean) [++] *]",
        );

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            productType([
                stringTypeLiteral(undefined),
                productType([
                    functionType({
                        codomain: booleanTypeLiteral(undefined),
                        domains: [],
                    }),
                    unsafeTypeReference("Foo"),
                ]),
                genericTypeEliminator({
                    arguments: [booleanTypeLiteral(undefined)],
                    function: unsafeTypeReference("Foo"),
                }),
                sumType([]),
            ]),
        );
        expect(actual).toStrictEqual(expected);
    });
});
