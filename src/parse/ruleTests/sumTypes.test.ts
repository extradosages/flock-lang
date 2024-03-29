import {
    DenormalizedAst,
    booleanTypeLiteral,
    functionType,
    genericTypeEliminator,
    sumType,
    stringTypeLiteral,
    productType,
    unsafeTypeReference,
} from "@flock/ast";

import { Parser } from "../parser";

describe("sumType", () => {
    const parser = new Parser("sumType");

    it("parses the empty sum type", () => {
        const actual = parser.parse("[++]").root().denormalize().anonymize();

        const expected = new DenormalizedAst(sumType([])).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with one small literal type", () => {
        const actual = parser
            .parse("[+ Boolean +]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            sumType([booleanTypeLiteral(undefined)]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with several small literal types", () => {
        const actual = parser
            .parse("[+ Boolean String Boolean +]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            sumType([
                booleanTypeLiteral(undefined),
                stringTypeLiteral(undefined),
                booleanTypeLiteral(undefined),
            ]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with a single type reference", () => {
        const actual = parser
            .parse("[+ Foo +]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            sumType([unsafeTypeReference("Foo")]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with several type references", () => {
        const actual = parser
            .parse("[+ Foo Bar Baz Qux +]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            sumType([
                unsafeTypeReference("Foo"),
                unsafeTypeReference("Bar"),
                unsafeTypeReference("Baz"),
                unsafeTypeReference("Qux"),
            ]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with a single nested sum type", () => {
        const actual = parser
            .parse("[+ [++] +]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            sumType([sumType([])]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with several nested sum types", () => {
        const actual = parser
            .parse("[+ [++] [++] +]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            sumType([sumType([]), sumType([])]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with a single nested product type", () => {
        const actual = parser
            .parse("[+ [**] +]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            sumType([productType([])]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with several nested product types", () => {
        const actual = parser
            .parse("[+ [**] [**] +]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            sumType([productType([]), productType([])]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with a single nested function type", () => {
        const actual = parser
            .parse("[+ [^ -> Boolean ^] +]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            sumType([
                functionType({
                    codomain: booleanTypeLiteral(undefined),
                    domains: [],
                }),
            ]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with several nested function types", () => {
        const actual = parser
            .parse("[+ [^ -> Boolean ^] [^  -> String ^] +]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
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
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with a single generic type eliminator", () => {
        const actual = parser
            .parse("[+ (Foo String) +]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            sumType([
                genericTypeEliminator({
                    function: unsafeTypeReference("Foo"),
                    arguments: [stringTypeLiteral(undefined)],
                }),
            ]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with several generic type eliminators", () => {
        const actual = parser
            .parse("[+ (Foo String) (Foo Boolean) +]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
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
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a complicated sum type", () => {
        const actual = parser
            .parse("[+ String [+ [^ -> Boolean ^] Foo +] (Foo Boolean) [**] +]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
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
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });
});
