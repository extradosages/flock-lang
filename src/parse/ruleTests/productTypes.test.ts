import * as peggy from "peggy";

import {
    booleanTypeLiteral,
    functionType,
    genericTypeEliminator,
    productType,
    stringTypeLiteral,
    sumType,
    unsafeTypeReference,
} from "@flock/ast";

import { source } from "../parser";

describe("productType", () => {
    const parser = peggy.generate(source, {
        allowedStartRules: ["productType"],
    });

    it("parses the empty product type", () => {
        const actual = parser.parse("[**]");
        const expected = productType([]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with one small literal type", () => {
        const actual = parser.parse("[* Boolean *]");
        const expected = productType([booleanTypeLiteral(undefined)]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with several small literal types", () => {
        const actual = parser.parse("[* Boolean String Boolean *]");
        const expected = productType([
            booleanTypeLiteral(undefined),
            stringTypeLiteral(undefined),
            booleanTypeLiteral(undefined),
        ]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with a single type reference", () => {
        const actual = parser.parse("[* Foo *]");
        const expected = productType([unsafeTypeReference("Foo")]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with several type references", () => {
        const actual = parser.parse("[* Foo Bar Baz Qux *]");
        const expected = productType([
            unsafeTypeReference("Foo"),
            unsafeTypeReference("Bar"),
            unsafeTypeReference("Baz"),
            unsafeTypeReference("Qux"),
        ]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with a single nested product type", () => {
        const actual = parser.parse("[* [**] *]");
        const expected = productType([productType([])]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with several nested product types", () => {
        const actual = parser.parse("[* [**] [**] *]");
        const expected = productType([productType([]), productType([])]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with a single nested sum type", () => {
        const actual = parser.parse("[* [++] *]");
        const expected = productType([sumType([])]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with several nested sum types", () => {
        const actual = parser.parse("[* [++] [++] *]");
        const expected = productType([sumType([]), sumType([])]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with a single nested function type", () => {
        const actual = parser.parse("[* [^ -> Boolean ^] *]");
        const expected = productType([
            functionType({
                codomain: booleanTypeLiteral(undefined),
                domains: [],
            }),
        ]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with several nested function types", () => {
        const actual = parser.parse("[* [^ -> Boolean ^] [^ -> Boolean ^] *]");
        const expected = productType([
            functionType({
                codomain: booleanTypeLiteral(undefined),
                domains: [],
            }),
            functionType({
                codomain: booleanTypeLiteral(undefined),
                domains: [],
            }),
        ]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with a single generic type eliminator", () => {
        const actual = parser.parse("[* (Foo String) *]");
        const expected = productType([
            genericTypeEliminator({
                function: unsafeTypeReference("Foo"),
                arguments: [stringTypeLiteral(undefined)],
            }),
        ]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with several generic type eliminators", () => {
        const actual = parser.parse("[* (Foo String) (Foo Boolean) *]");
        const expected = productType([
            genericTypeEliminator({
                function: unsafeTypeReference("Foo"),
                arguments: [stringTypeLiteral(undefined)],
            }),
            genericTypeEliminator({
                function: unsafeTypeReference("Foo"),
                arguments: [booleanTypeLiteral(undefined)],
            }),
        ]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a complicated product type", () => {
        const actual = parser.parse(
            "[* String [* [^ -> Boolean ^] Foo *] (Foo Boolean) [++] *]",
        );
        const expected = productType([
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
        ]);
        expect(actual).toStrictEqual(expected);
    });
});
