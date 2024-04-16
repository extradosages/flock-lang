import {
    DenormalizedAst,
    dBooleanTerm,
    dFunctionTermEliminator,
    dIntegerTerm,
    dLambdaConstructor,
    dProductTermConstructor,
    dProductTermEliminator,
    dSumTermConstructor,
    dSumTermEliminator,
    dTermBinding,
    dTermReference,
} from "../../ast";
import { Parser } from "../parser";

describe("lambdaConstructor", () => {
    const parser = new Parser("lambdaConstructor");

    it("parses a lambda constructor with no bindings and a term literal body", () => {
        const first = parser.parse("[^ -> true ^]");
        const second = first.denormalize();
        const third = second.anonymize();
        debugger;
        const actual = third;

        const expected = new DenormalizedAst(
            dLambdaConstructor({
                codomainTerm: dBooleanTerm(true),
                domainTermBindings: [],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a lambda constructor with no bindings and a term reference body", () => {
        const actual = parser.parse("[^ -> foo ^]").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dLambdaConstructor({
                codomainTerm: dTermReference("foo"),
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
            dLambdaConstructor({
                codomainTerm: dProductTermConstructor({
                    components: [dTermReference("foo"), dTermReference("bar")],
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
            dLambdaConstructor({
                codomainTerm: dLambdaConstructor({
                    codomainTerm: dBooleanTerm(true),
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
            dLambdaConstructor({
                codomainTerm: dFunctionTermEliminator({
                    arguments: [dBooleanTerm(true)],
                    function: dTermReference("foo"),
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
            dLambdaConstructor({
                codomainTerm: dProductTermConstructor({
                    components: [
                        dLambdaConstructor({
                            codomainTerm: dBooleanTerm(true),
                            domainTermBindings: [dTermBinding("qux")],
                        }),
                        dFunctionTermEliminator({
                            arguments: [
                                dTermReference("bar"),
                                dTermReference("baz"),
                            ],
                            function: dTermReference("add"),
                        }),
                    ],
                }),
                domainTermBindings: [
                    dTermBinding("foo"),
                    dTermBinding("bar"),
                    dTermBinding("baz"),
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
            dFunctionTermEliminator({
                arguments: [],
                function: dTermReference("foo"),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function term eliminator with a term reference head and several arguments", () => {
        const actual = parser.parse("(foo bar 1)").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dFunctionTermEliminator({
                arguments: [dTermReference("bar"), dIntegerTerm(1)],
                function: dTermReference("foo"),
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
            dFunctionTermEliminator({
                arguments: [],
                function: dLambdaConstructor({
                    codomainTerm: dBooleanTerm(true),
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
            dFunctionTermEliminator({
                arguments: [dIntegerTerm(1), dIntegerTerm(2)],
                function: dLambdaConstructor({
                    codomainTerm: dFunctionTermEliminator({
                        arguments: [
                            dTermReference("foo"),
                            dTermReference("bar"),
                        ],
                        function: dTermReference("add"),
                    }),
                    domainTermBindings: [
                        dTermBinding("foo"),
                        dTermBinding("bar"),
                    ],
                }),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function term eliminator with a product eliminator head and an argument", () => {
        const actual = parser
            .parse("(>0,0 [* true false *])")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dFunctionTermEliminator({
                arguments: [
                    dProductTermConstructor({
                        components: [dBooleanTerm(true), dBooleanTerm(false)],
                    }),
                ],
                function: dProductTermEliminator({ arity: 0, index: 0 }),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function term eliminator with a sum type constructor head and an argument", () => {
        const actual = parser.parse("(<0,0 true)").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dFunctionTermEliminator({
                arguments: [dBooleanTerm(true)],
                function: dSumTermConstructor({ arity: 0, index: 0 }),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function term eliminator with a sum type eliminator head and an argument", () => {
        const actual = parser
            .parse("([+ [^ foo -> foo ^] [^ bar -> true ^] +] (<1,0 true))")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dFunctionTermEliminator({
                arguments: [
                    dFunctionTermEliminator({
                        arguments: [dBooleanTerm(true)],
                        function: dSumTermConstructor({ arity: 1, index: 0 }),
                    }),
                ],
                function: dSumTermEliminator({
                    components: [
                        dLambdaConstructor({
                            codomainTerm: dTermReference("foo"),
                            domainTermBindings: [dTermBinding("foo")],
                        }),
                        dLambdaConstructor({
                            codomainTerm: dBooleanTerm(true),
                            domainTermBindings: [dTermBinding("bar")],
                        }),
                    ],
                }),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });
});
