import * as peggy from "peggy";

import {
    booleanTypeLiteral,
    functionType,
    genericTypeEliminator,
    sumType,
    stringTypeLiteral,
    productType,
    unsafeTypeReference,
} from "@flock/ast";

import { source } from "../parser";

describe("sumType", () => {
    const parser = peggy.generate(source, {
        allowedStartRules: ["sumType"],
    });

    it("parses the empty sum type", () => {
        const actual = parser.parse("[++]");
        const expected = sumType([]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with one small literal type", () => {
        const actual = parser.parse("[+ Boolean +]");
        const expected = sumType([booleanTypeLiteral(undefined)]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with several small literal types", () => {
        const actual = parser.parse("[+ Boolean String Boolean +]");
        const expected = sumType([
            booleanTypeLiteral(undefined),
            stringTypeLiteral(undefined),
            booleanTypeLiteral(undefined),
        ]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with a single type reference", () => {
        const actual = parser.parse("[+ Foo +]");
        const expected = sumType([unsafeTypeReference("Foo")]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with several type references", () => {
        const actual = parser.parse("[+ Foo Bar Baz Qux +]");
        const expected = sumType([
            unsafeTypeReference("Foo"),
            unsafeTypeReference("Bar"),
            unsafeTypeReference("Baz"),
            unsafeTypeReference("Qux"),
        ]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with a single nested sum type", () => {
        const actual = parser.parse("[+ [++] +]");
        const expected = sumType([sumType([])]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with several nested sum types", () => {
        const actual = parser.parse("[+ [++] [++] +]");
        const expected = sumType([sumType([]), sumType([])]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with a single nested product type", () => {
        const actual = parser.parse("[+ [**] +]");
        const expected = sumType([productType([])]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with several nested product types", () => {
        const actual = parser.parse("[+ [**] [**] +]");
        const expected = sumType([productType([]), productType([])]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with a single nested function type", () => {
        const actual = parser.parse("[+ [^ -> Boolean ^] +]");
        const expected = sumType([
            functionType({
                codomain: booleanTypeLiteral(undefined),
                domains: [],
            }),
        ]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with several nested function types", () => {
        const actual = parser.parse("[+ [^ -> Boolean ^] [^  -> String ^] +]");
        const expected = sumType([
            functionType({
                codomain: booleanTypeLiteral(undefined),
                domains: [],
            }),
            functionType({
                codomain: stringTypeLiteral(undefined),
                domains: [],
            }),
        ]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with a single generic type eliminator", () => {
        const actual = parser.parse("[+ (Foo String) +]");
        const expected = sumType([
            genericTypeEliminator({
                function: unsafeTypeReference("Foo"),
                arguments: [stringTypeLiteral(undefined)],
            }),
        ]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with several generic type eliminators", () => {
        const actual = parser.parse("[+ (Foo String) (Foo Boolean) +]");
        const expected = sumType([
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

    it("parses a complicated sum type", () => {
        const actual = parser.parse(
            "[+ String [+ [^ -> Boolean ^] Foo +] (Foo Boolean) [**] +]",
        );
        const expected = sumType([
            stringTypeLiteral(undefined),
            sumType([
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
            productType([]),
        ]);
        expect(actual).toStrictEqual(expected);
    });
});
