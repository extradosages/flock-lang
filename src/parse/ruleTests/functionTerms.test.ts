import {
    anonymize,
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
        const ast = parser.parse("[^ -> true ^]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            lambdaConstructor({
                codomainTerm: booleanTermLiteral(true),
                domainBindings: [],
            }),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a lambda constructor with no bindings and a term reference body", () => {
        const ast = parser.parse("[^ -> foo ^]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            lambdaConstructor({
                codomainTerm: unsafeTermReference("foo"),
                domainBindings: [],
            }),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a lambda constructor with no bindings and a product term constructor body", () => {
        const ast = parser.parse("[^ -> [* foo bar *] ^]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            lambdaConstructor({
                codomainTerm: productTermConstructor([
                    unsafeTermReference("foo"),
                    unsafeTermReference("bar"),
                ]),
                domainBindings: [],
            }),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a lambda constructor with no bindings and a lambda constructor body", () => {
        const ast = parser.parse("[^ -> [^ -> true ^] ^]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            lambdaConstructor({
                codomainTerm: lambdaConstructor({
                    codomainTerm: booleanTermLiteral(true),
                    domainBindings: [],
                }),
                domainBindings: [],
            }),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a lambda constructor with no bindings and a function term eliminator body", () => {
        const ast = parser.parse("[^ -> (foo true) ^]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            lambdaConstructor({
                codomainTerm: functionTermEliminator({
                    arguments: [booleanTermLiteral(true)],
                    function: unsafeTermReference("foo"),
                }),
                domainBindings: [],
            }),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a lambda constructor with several bindings and a complicated body", () => {
        const ast = parser.parse(
            "[^ foo bar baz -> [* [^ qux -> true ^] (add bar baz) *] ^]",
        );

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
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
        );
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
        const ast = parser.parse("(foo)");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            functionTermEliminator({
                arguments: [],
                function: unsafeTermReference("foo"),
            }),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function term eliminator with a term reference head and several arguments", () => {
        const ast = parser.parse("(foo bar 1)");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            functionTermEliminator({
                arguments: [
                    unsafeTermReference("bar"),
                    unsafeIntegerTermLiteral(1),
                ],
                function: unsafeTermReference("foo"),
            }),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function term eliminator with a lambda constructor head and no arguments", () => {
        const ast = parser.parse("([^ -> true ^])");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            functionTermEliminator({
                arguments: [],
                function: lambdaConstructor({
                    codomainTerm: booleanTermLiteral(true),
                    domainBindings: [],
                }),
            }),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function term eliminator with a lambda constructor head and several arguments", () => {
        const ast = parser.parse("([^foo bar -> (add foo bar) ^] 1 2)");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
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
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function term eliminator with a product eliminator head and an argument", () => {
        const ast = parser.parse("(>0 [* true false *])");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            functionTermEliminator({
                arguments: [
                    productTermConstructor([
                        booleanTermLiteral(true),
                        booleanTermLiteral(false),
                    ]),
                ],
                function: unsafeProductTermEliminator(0),
            }),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function term eliminator with a sum type constructor head and an argument", () => {
        const ast = parser.parse("(<0 true)");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            functionTermEliminator({
                arguments: [booleanTermLiteral(true)],
                function: unsafeSumTermConstructor(0),
            }),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function term eliminator with a sum type eliminator head and an argument", () => {
        const ast = parser.parse(
            "([+ [^ foo -> foo ^] [^ bar -> true ^] +] (<1 true))",
        );

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
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
        );
        expect(actual).toStrictEqual(expected);
    });
});
