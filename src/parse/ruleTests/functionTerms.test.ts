import {
    DenormalizedAst,
    booleanTermLiteral,
    functionTermEliminator,
    lambdaConstructor,
    productTermConstructor,
    sumTermEliminator,
    unsafeIntegerTermLiteral,
    unsafeProductTermEliminator,
    unsafeSumTermConstructor,
    unsafeTermBinding,
    unsafeTermReference,
} from "@flock/ast";

import { Parser } from "../parser";

describe("lambdaConstructor", () => {
    const parser = new Parser("lambdaConstructor");

    it("parses a lambda constructor with no bindings and a term literal body", () => {
        const actual = parser
            .parse("[^ -> true ^]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            lambdaConstructor({
                codomainTerm: booleanTermLiteral(true),
                domainBindings: [],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a lambda constructor with no bindings and a term reference body", () => {
        const actual = parser
            .parse("[^ -> foo ^]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            lambdaConstructor({
                codomainTerm: unsafeTermReference("foo"),
                domainBindings: [],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a lambda constructor with no bindings and a product term constructor body", () => {
        const actual = parser
            .parse("[^ -> [* foo bar *] ^]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            lambdaConstructor({
                codomainTerm: productTermConstructor([
                    unsafeTermReference("foo"),
                    unsafeTermReference("bar"),
                ]),
                domainBindings: [],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a lambda constructor with no bindings and a lambda constructor body", () => {
        const actual = parser
            .parse("[^ -> [^ -> true ^] ^]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            lambdaConstructor({
                codomainTerm: lambdaConstructor({
                    codomainTerm: booleanTermLiteral(true),
                    domainBindings: [],
                }),
                domainBindings: [],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a lambda constructor with no bindings and a function term eliminator body", () => {
        const actual = parser
            .parse("[^ -> (foo true) ^]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            lambdaConstructor({
                codomainTerm: functionTermEliminator({
                    arguments: [booleanTermLiteral(true)],
                    function: unsafeTermReference("foo"),
                }),
                domainBindings: [],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a lambda constructor with several bindings and a complicated body", () => {
        const actual = parser
            .parse("[^ foo bar baz -> [* [^ qux -> true ^] (add bar baz) *] ^]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            lambdaConstructor({
                codomainTerm: productTermConstructor([
                    lambdaConstructor({
                        codomainTerm: booleanTermLiteral(true),
                        domainBindings: [unsafeTermBinding("qux")],
                    }),
                    functionTermEliminator({
                        arguments: [
                            unsafeTermReference("bar"),
                            unsafeTermReference("baz"),
                        ],
                        function: unsafeTermReference("add"),
                    }),
                ]),
                domainBindings: [
                    unsafeTermBinding("foo"),
                    unsafeTermBinding("bar"),
                    unsafeTermBinding("baz"),
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
        const actual = parser.parse("(foo)").root().denormalize().anonymize();

        const expected = new DenormalizedAst(
            functionTermEliminator({
                arguments: [],
                function: unsafeTermReference("foo"),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function term eliminator with a term reference head and several arguments", () => {
        const actual = parser
            .parse("(foo bar 1)")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            functionTermEliminator({
                arguments: [
                    unsafeTermReference("bar"),
                    unsafeIntegerTermLiteral(1),
                ],
                function: unsafeTermReference("foo"),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function term eliminator with a lambda constructor head and no arguments", () => {
        const actual = parser
            .parse("([^ -> true ^])")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            functionTermEliminator({
                arguments: [],
                function: lambdaConstructor({
                    codomainTerm: booleanTermLiteral(true),
                    domainBindings: [],
                }),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function term eliminator with a lambda constructor head and several arguments", () => {
        const actual = parser
            .parse("([^foo bar -> (add foo bar) ^] 1 2)")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            functionTermEliminator({
                arguments: [
                    unsafeIntegerTermLiteral(1),
                    unsafeIntegerTermLiteral(2),
                ],
                function: lambdaConstructor({
                    codomainTerm: functionTermEliminator({
                        arguments: [
                            unsafeTermReference("foo"),
                            unsafeTermReference("bar"),
                        ],
                        function: unsafeTermReference("add"),
                    }),
                    domainBindings: [
                        unsafeTermBinding("foo"),
                        unsafeTermBinding("bar"),
                    ],
                }),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function term eliminator with a product eliminator head and an argument", () => {
        const actual = parser
            .parse("(>0 [* true false *])")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            functionTermEliminator({
                arguments: [
                    productTermConstructor([
                        booleanTermLiteral(true),
                        booleanTermLiteral(false),
                    ]),
                ],
                function: unsafeProductTermEliminator(0),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function term eliminator with a sum type constructor head and an argument", () => {
        const actual = parser
            .parse("(<0 true)")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            functionTermEliminator({
                arguments: [booleanTermLiteral(true)],
                function: unsafeSumTermConstructor(0),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function term eliminator with a sum type eliminator head and an argument", () => {
        const actual = parser
            .parse("([+ [^ foo -> foo ^] [^ bar -> true ^] +] (<1 true))")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            functionTermEliminator({
                arguments: [
                    functionTermEliminator({
                        arguments: [booleanTermLiteral(true)],
                        function: unsafeSumTermConstructor(1),
                    }),
                ],
                function: sumTermEliminator([
                    lambdaConstructor({
                        codomainTerm: unsafeTermReference("foo"),
                        domainBindings: [unsafeTermBinding("foo")],
                    }),
                    lambdaConstructor({
                        codomainTerm: booleanTermLiteral(true),
                        domainBindings: [unsafeTermBinding("bar")],
                    }),
                ]),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });
});
