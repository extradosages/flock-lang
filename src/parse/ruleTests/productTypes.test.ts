import {
    DenormalizedAst,
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
        const actual = parser.parse("[**]").root().denormalize().anonymize();

        const expected = new DenormalizedAst(productType([])).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with one small literal type", () => {
        const actual = parser
            .parse("[* Boolean *]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            productType([booleanTypeLiteral(undefined)]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with several small literal types", () => {
        const actual = parser
            .parse("[* Boolean String Boolean *]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            productType([
                booleanTypeLiteral(undefined),
                stringTypeLiteral(undefined),
                booleanTypeLiteral(undefined),
            ]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with a single type reference", () => {
        const actual = parser
            .parse("[* Foo *]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            productType([unsafeTypeReference("Foo")]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with several type references", () => {
        const actual = parser
            .parse("[* Foo Bar Baz Qux *]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            productType([
                unsafeTypeReference("Foo"),
                unsafeTypeReference("Bar"),
                unsafeTypeReference("Baz"),
                unsafeTypeReference("Qux"),
            ]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with a single nested product type", () => {
        const actual = parser
            .parse("[* [**] *]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            productType([productType([])]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with several nested product types", () => {
        const actual = parser
            .parse("[* [**] [**] *]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            productType([productType([]), productType([])]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with a single nested sum type", () => {
        const actual = parser
            .parse("[* [++] *]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            productType([sumType([])]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with several nested sum types", () => {
        const actual = parser
            .parse("[* [++] [++] *]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            productType([sumType([]), sumType([])]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with a single nested function type", () => {
        const actual = parser
            .parse("[* [^ -> Boolean ^] *]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            productType([
                functionType({
                    codomain: booleanTypeLiteral(undefined),
                    domains: [],
                }),
            ]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with several nested function types", () => {
        const actual = parser
            .parse("[* [^ -> Boolean ^] [^ -> Boolean ^] *]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
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
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with a single generic type eliminator", () => {
        const actual = parser
            .parse("[* (Foo String) *]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            productType([
                genericTypeEliminator({
                    function: unsafeTypeReference("Foo"),
                    arguments: [stringTypeLiteral(undefined)],
                }),
            ]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with several generic type eliminators", () => {
        const actual = parser
            .parse("[* (Foo String) (Foo Boolean) *]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
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
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a complicated product type", () => {
        const actual = parser
            .parse("[* String [* [^ -> Boolean ^] Foo *] (Foo Boolean) [++] *]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
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
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });
});
