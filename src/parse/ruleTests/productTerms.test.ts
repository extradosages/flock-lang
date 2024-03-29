import {
    DenormalizedAst,
    booleanTermLiteral,
    lambdaConstructor,
    functionTermEliminator,
    productTermConstructor,
    unsafeProductTermEliminator,
    stringTermLiteral,
    sumTermEliminator,
    unsafeTermBinding,
    unsafeTermReference,
} from "@flock/ast";
import { Parser } from "../parser";

describe("productTermConstructor", () => {
    const parser = new Parser("productTermConstructor");

    it("parses an empty product", () => {
        const actual = parser.parse("[**]").root().denormalize().anonymize();

        const expected = new DenormalizedAst(
            productTermConstructor([]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product with a single term literal", () => {
        const actual = parser
            .parse("[* true *]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            productTermConstructor([booleanTermLiteral(true)]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product with a single term reference", () => {
        const actual = parser
            .parse("[* foo *]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            productTermConstructor([unsafeTermReference("foo")]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product with a single product term constructor", () => {
        const actual = parser
            .parse("[* [* true *] *]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            productTermConstructor([
                productTermConstructor([booleanTermLiteral(true)]),
            ]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product with a single sum term eliminator", () => {
        const actual = parser
            .parse("[* [+ foo bar +] *]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            productTermConstructor([
                sumTermEliminator([
                    unsafeTermReference("foo"),
                    unsafeTermReference("bar"),
                ]),
            ]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product with a single function term constructor", () => {
        const actual = parser
            .parse("[* [^ foo -> bar ^] *]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            productTermConstructor([
                lambdaConstructor({
                    codomainTerm: unsafeTermReference("bar"),
                    domainBindings: [unsafeTermBinding("foo")],
                }),
            ]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product with a single function term eliminator", () => {
        const actual = parser
            .parse("[* (foo true) *]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            productTermConstructor([
                functionTermEliminator({
                    function: unsafeTermReference("foo"),
                    arguments: [booleanTermLiteral(true)],
                }),
            ]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product with several components", () => {
        const actual = parser
            .parse('[* true foo [* true *] [^ bar -> "hello" ^] *]')
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            productTermConstructor([
                booleanTermLiteral(true),
                unsafeTermReference("foo"),
                productTermConstructor([booleanTermLiteral(true)]),
                lambdaConstructor({
                    codomainTerm: stringTermLiteral("hello"),
                    domainBindings: [unsafeTermBinding("bar")],
                }),
            ]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });
});

describe("productTermEliminator", () => {
    const parser = new Parser("productTermEliminator");

    it("parses a product term eliminator with an index of <0`", () => {
        const actual = parser.parse(">0").root().denormalize().anonymize();

        const expected = new DenormalizedAst(
            unsafeProductTermEliminator(0),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product term eliminator with an index of <1`", () => {
        const actual = parser.parse(">1").root().denormalize().anonymize();

        const expected = new DenormalizedAst(
            unsafeProductTermEliminator(1),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("does not parse a product term eliminator without an index", () => {
        expect(() => parser.parse(",")).toThrow();
    });

    it("does not parse a product term eliminator with a float index", () => {
        expect(() => parser.parse(">1.5")).toThrow();
    });

    it("does not parse a product term eliminator with a negative index", () => {
        expect(() => parser.parse(",-1")).toThrow();
    });

    it("does not parse a product term eliminator with whitespace", () => {
        expect(() => parser.parse(", 1")).toThrow();
    });
});
