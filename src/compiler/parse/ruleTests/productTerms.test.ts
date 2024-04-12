import {
    DenormalizedAst,
    dBooleanTerm,
    dFunctionTermEliminator,
    dLambdaConstructor,
    dProductTermConstructor,
    dProductTermEliminator,
    dStringTerm,
    dSumTermEliminator,
    dTermBinding,
    dTermReference,
} from "../../ast";
import { Parser } from "../parser";

describe("productTermConstructor", () => {
    const parser = new Parser("productTermConstructor");

    it("parses an empty product", () => {
        const actual = parser.parse("[**]").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dProductTermConstructor({ components: [] }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product with a single term literal", () => {
        const actual = parser.parse("[* true *]").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dProductTermConstructor({ components: [dBooleanTerm(true)] }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product with a single term reference", () => {
        const actual = parser.parse("[* foo *]").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dProductTermConstructor({ components: [dTermReference("foo")] }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product with a single product term constructor", () => {
        const actual = parser
            .parse("[* [* true *] *]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dProductTermConstructor({
                components: [
                    dProductTermConstructor({
                        components: [dBooleanTerm(true)],
                    }),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product with a single sum term eliminator", () => {
        const actual = parser
            .parse("[* [+ foo bar +] *]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dProductTermConstructor({
                components: [
                    dSumTermEliminator({
                        components: [
                            dTermReference("foo"),
                            dTermReference("bar"),
                        ],
                    }),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product with a single function term constructor", () => {
        const actual = parser
            .parse("[* [^ foo -> bar ^] *]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dProductTermConstructor({
                components: [
                    dLambdaConstructor({
                        codomainTerm: dTermReference("bar"),
                        domainTermBindings: [dTermBinding("foo")],
                    }),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product with a single function term eliminator", () => {
        const actual = parser
            .parse("[* (foo true) *]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dProductTermConstructor({
                components: [
                    dFunctionTermEliminator({
                        function: dTermReference("foo"),
                        arguments: [dBooleanTerm(true)],
                    }),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product with several components", () => {
        const actual = parser
            .parse('[* true foo [* true *] [^ bar -> "hello" ^] *]')
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dProductTermConstructor({
                components: [
                    dBooleanTerm(true),
                    dTermReference("foo"),
                    dProductTermConstructor({
                        components: [dBooleanTerm(true)],
                    }),
                    dLambdaConstructor({
                        codomainTerm: dStringTerm("hello"),
                        domainTermBindings: [dTermBinding("bar")],
                    }),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });
});

describe("productTermEliminator", () => {
    const parser = new Parser("productTermEliminator");

    it("parses a product term eliminator with an index of <0`", () => {
        const actual = parser.parse(">0").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dProductTermEliminator(0),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product term eliminator with an index of <1`", () => {
        const actual = parser.parse(">1").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dProductTermEliminator(1),
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
