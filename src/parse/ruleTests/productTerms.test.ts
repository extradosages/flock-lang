import {
    booleanTermLiteral,
    lambdaConstructor,
    functionTermEliminator,
    productTermConstructor,
    unsafeProductTermEliminator,
    stringTermLiteral,
    sumTermEliminator,
    unsafeTermBinding,
    unsafeTermReference,
    anonymize,
} from "@flock/ast";
import { Parser } from "../parser";

describe("productTermConstructor", () => {
    const parser = new Parser("productTermConstructor");

    it("parses an empty product", () => {
        const ast = parser.parse("[**]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(productTermConstructor([]));
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product with a single term literal", () => {
        const ast = parser.parse("[* true *]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            productTermConstructor([booleanTermLiteral(true)]),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product with a single term reference", () => {
        const ast = parser.parse("[* foo *]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            productTermConstructor([unsafeTermReference("foo")]),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product with a single product term constructor", () => {
        const ast = parser.parse("[* [* true *] *]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            productTermConstructor([
                productTermConstructor([booleanTermLiteral(true)]),
            ]),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product with a single sum term eliminator", () => {
        const ast = parser.parse("[* [+ foo bar +] *]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            productTermConstructor([
                sumTermEliminator([
                    unsafeTermReference("foo"),
                    unsafeTermReference("bar"),
                ]),
            ]),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product with a single function term constructor", () => {
        const ast = parser.parse("[* [^ foo -> bar ^] *]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            productTermConstructor([
                lambdaConstructor({
                    codomainTerm: unsafeTermReference("bar"),
                    domainBindings: [unsafeTermBinding("foo")],
                }),
            ]),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product with a single function term eliminator", () => {
        const ast = parser.parse("[* (foo true) *]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            productTermConstructor([
                functionTermEliminator({
                    function: unsafeTermReference("foo"),
                    arguments: [booleanTermLiteral(true)],
                }),
            ]),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product with several components", () => {
        const ast = parser.parse(
            '[* true foo [* true *] [^ bar -> "hello" ^] *]',
        );

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            productTermConstructor([
                booleanTermLiteral(true),
                unsafeTermReference("foo"),
                productTermConstructor([booleanTermLiteral(true)]),
                lambdaConstructor({
                    codomainTerm: stringTermLiteral("hello"),
                    domainBindings: [unsafeTermBinding("bar")],
                }),
            ]),
        );
        expect(actual).toStrictEqual(expected);
    });
});

describe("productTermEliminator", () => {
    const parser = new Parser("productTermEliminator");

    it("parses a product term eliminator with an index of <0`", () => {
        const ast = parser.parse(">0");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(unsafeProductTermEliminator(0));
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product term eliminator with an index of <1`", () => {
        const ast = parser.parse(">1");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(unsafeProductTermEliminator(1));
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
