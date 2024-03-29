import {
    booleanTypeLiteral,
    functionType,
    genericTypeEliminator,
    sumType,
    stringTypeLiteral,
    productType,
    unsafeTypeReference,
    anonymize,
} from "@flock/ast";

import { Parser } from "../parser";

describe("sumType", () => {
    const parser = new Parser("sumType");

    it("parses the empty sum type", () => {
        const ast = parser.parse("[++]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(sumType([]));
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with one small literal type", () => {
        const ast = parser.parse("[+ Boolean +]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(sumType([booleanTypeLiteral(undefined)]));
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with several small literal types", () => {
        const ast = parser.parse("[+ Boolean String Boolean +]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            sumType([
                booleanTypeLiteral(undefined),
                stringTypeLiteral(undefined),
                booleanTypeLiteral(undefined),
            ]),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with a single type reference", () => {
        const ast = parser.parse("[+ Foo +]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(sumType([unsafeTypeReference("Foo")]));
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with several type references", () => {
        const ast = parser.parse("[+ Foo Bar Baz Qux +]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            sumType([
                unsafeTypeReference("Foo"),
                unsafeTypeReference("Bar"),
                unsafeTypeReference("Baz"),
                unsafeTypeReference("Qux"),
            ]),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with a single nested sum type", () => {
        const ast = parser.parse("[+ [++] +]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(sumType([sumType([])]));
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with several nested sum types", () => {
        const ast = parser.parse("[+ [++] [++] +]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(sumType([sumType([]), sumType([])]));
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with a single nested product type", () => {
        const ast = parser.parse("[+ [**] +]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(sumType([productType([])]));
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with several nested product types", () => {
        const ast = parser.parse("[+ [**] [**] +]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(sumType([productType([]), productType([])]));
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with a single nested function type", () => {
        const ast = parser.parse("[+ [^ -> Boolean ^] +]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            sumType([
                functionType({
                    codomain: booleanTypeLiteral(undefined),
                    domains: [],
                }),
            ]),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with several nested function types", () => {
        const ast = parser.parse("[+ [^ -> Boolean ^] [^  -> String ^] +]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            sumType([
                functionType({
                    codomain: booleanTypeLiteral(undefined),
                    domains: [],
                }),
                functionType({
                    codomain: stringTypeLiteral(undefined),
                    domains: [],
                }),
            ]),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with a single generic type eliminator", () => {
        const ast = parser.parse("[+ (Foo String) +]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            sumType([
                genericTypeEliminator({
                    function: unsafeTypeReference("Foo"),
                    arguments: [stringTypeLiteral(undefined)],
                }),
            ]),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with several generic type eliminators", () => {
        const ast = parser.parse("[+ (Foo String) (Foo Boolean) +]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            sumType([
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

    it("parses a complicated sum type", () => {
        const ast = parser.parse(
            "[+ String [+ [^ -> Boolean ^] Foo +] (Foo Boolean) [**] +]",
        );

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            sumType([
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
            ]),
        );
        expect(actual).toStrictEqual(expected);
    });
});
