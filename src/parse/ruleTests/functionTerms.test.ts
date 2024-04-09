import {
    DenormalizedAst,
    booleanTerm,
    functionTermEliminator,
    integerTerm,
    lambdaConstructor,
    productTermConstructor,
    productTermEliminator,
    sumTermConstructor,
    sumTermEliminator,
    termBinding,
    termReference,
} from "../../ast";
import { Parser } from "../parser";

describe("lambdaConstructor", () => {
    const parser = new Parser("lambdaConstructor");

    it("parses a lambda constructor with no bindings and a term literal body", () => {
        const actual = parser.parse("[^ -> true ^]").denormalize().anonymize();

        const expected = new DenormalizedAst(
            lambdaConstructor({
                codomainTerm: booleanTerm(true),
                domainTermBindings: [],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a lambda constructor with no bindings and a term reference body", () => {
        const actual = parser.parse("[^ -> foo ^]").denormalize().anonymize();

        const expected = new DenormalizedAst(
            lambdaConstructor({
                codomainTerm: termReference("foo"),
                domainTermBindings: [],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a lambda constructor with no bindings and a product term constructor body", () => {
        const actual = parser
            .parse("[^ -> [* foo bar *] ^]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            lambdaConstructor({
                codomainTerm: productTermConstructor({
                    components: [termReference("foo"), termReference("bar")],
                }),
                domainTermBindings: [],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a lambda constructor with no bindings and a lambda constructor body", () => {
        const actual = parser
            .parse("[^ -> [^ -> true ^] ^]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            lambdaConstructor({
                codomainTerm: lambdaConstructor({
                    codomainTerm: booleanTerm(true),
                    domainTermBindings: [],
                }),
                domainTermBindings: [],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a lambda constructor with no bindings and a function term eliminator body", () => {
        const actual = parser
            .parse("[^ -> (foo true) ^]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            lambdaConstructor({
                codomainTerm: functionTermEliminator({
                    arguments: [booleanTerm(true)],
                    function: termReference("foo"),
                }),
                domainTermBindings: [],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a lambda constructor with several bindings and a complicated body", () => {
        const actual = parser
            .parse("[^ foo bar baz -> [* [^ qux -> true ^] (add bar baz) *] ^]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            lambdaConstructor({
                codomainTerm: productTermConstructor({
                    components: [
                        lambdaConstructor({
                            codomainTerm: booleanTerm(true),
                            domainTermBindings: [termBinding("qux")],
                        }),
                        functionTermEliminator({
                            arguments: [
                                termReference("bar"),
                                termReference("baz"),
                            ],
                            function: termReference("add"),
                        }),
                    ],
                }),
                domainTermBindings: [
                    termBinding("foo"),
                    termBinding("bar"),
                    termBinding("baz"),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("doesn't parse an expression without a body", () => {
        expect(() => parser.parse("[^ -> ^]")).toThrow();
    });

    it("doesn't parse an expression with term literals for bindings", () => {
        expect(() => parser.parse("[^ 1 -> true ^]")).toThrow();
    });
});

describe("functionTermEliminator", () => {
    const parser = new Parser("functionTermEliminator");

    it("parses a function term eliminator with a term reference head and no arguments", () => {
        const actual = parser.parse("(foo)").denormalize().anonymize();

        const expected = new DenormalizedAst(
            functionTermEliminator({
                arguments: [],
                function: termReference("foo"),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function term eliminator with a term reference head and several arguments", () => {
        const actual = parser.parse("(foo bar 1)").denormalize().anonymize();

        const expected = new DenormalizedAst(
            functionTermEliminator({
                arguments: [termReference("bar"), integerTerm(1)],
                function: termReference("foo"),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function term eliminator with a lambda constructor head and no arguments", () => {
        const actual = parser
            .parse("([^ -> true ^])")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            functionTermEliminator({
                arguments: [],
                function: lambdaConstructor({
                    codomainTerm: booleanTerm(true),
                    domainTermBindings: [],
                }),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function term eliminator with a lambda constructor head and several arguments", () => {
        const actual = parser
            .parse("([^foo bar -> (add foo bar) ^] 1 2)")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            functionTermEliminator({
                arguments: [integerTerm(1), integerTerm(2)],
                function: lambdaConstructor({
                    codomainTerm: functionTermEliminator({
                        arguments: [termReference("foo"), termReference("bar")],
                        function: termReference("add"),
                    }),
                    domainTermBindings: [
                        termBinding("foo"),
                        termBinding("bar"),
                    ],
                }),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function term eliminator with a product eliminator head and an argument", () => {
        const actual = parser
            .parse("(>0 [* true false *])")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            functionTermEliminator({
                arguments: [
                    productTermConstructor({
                        components: [booleanTerm(true), booleanTerm(false)],
                    }),
                ],
                function: productTermEliminator(0),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function term eliminator with a sum type constructor head and an argument", () => {
        const actual = parser.parse("(<0 true)").denormalize().anonymize();

        const expected = new DenormalizedAst(
            functionTermEliminator({
                arguments: [booleanTerm(true)],
                function: sumTermConstructor(0),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function term eliminator with a sum type eliminator head and an argument", () => {
        const actual = parser
            .parse("([+ [^ foo -> foo ^] [^ bar -> true ^] +] (<1 true))")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            functionTermEliminator({
                arguments: [
                    functionTermEliminator({
                        arguments: [booleanTerm(true)],
                        function: sumTermConstructor(1),
                    }),
                ],
                function: sumTermEliminator([
                    lambdaConstructor({
                        codomainTerm: termReference("foo"),
                        domainTermBindings: [termBinding("foo")],
                    }),
                    lambdaConstructor({
                        codomainTerm: booleanTerm(true),
                        domainTermBindings: [termBinding("bar")],
                    }),
                ]),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });
});
