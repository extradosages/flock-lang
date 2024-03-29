import {
    sumTermEliminator,
    stringTermLiteral,
    unsafeTermBinding,
    unsafeTermReference,
    lambdaConstructor,
    unsafeSumTermConstructor,
    anonymize,
} from "@flock/ast";

import { Parser } from "../parser";

describe("sumTermEliminator", () => {
    const parser = new Parser("sumTermEliminator");

    it("parses an empty sum", () => {
        const ast = parser.parse("[++]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(sumTermEliminator([]));
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum with a single term reference", () => {
        const ast = parser.parse("[+ foo +]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            sumTermEliminator([unsafeTermReference("foo")]),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum with a single sum term eliminator", () => {
        const ast = parser.parse("[+ [+ foo bar +] +]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            sumTermEliminator([
                sumTermEliminator([
                    unsafeTermReference("foo"),
                    unsafeTermReference("bar"),
                ]),
            ]),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum with a single function term constructor", () => {
        const ast = parser.parse("[+ [^ foo -> bar ^] +]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            sumTermEliminator([
                lambdaConstructor({
                    codomainTerm: unsafeTermReference("bar"),
                    domainBindings: [unsafeTermBinding("foo")],
                }),
            ]),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum with several components", () => {
        const ast = parser.parse('[+  foo [+ bar +] [^ baz -> "hello" ^] +]');

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            sumTermEliminator([
                unsafeTermReference("foo"),
                sumTermEliminator([unsafeTermReference("bar")]),
                lambdaConstructor({
                    codomainTerm: stringTermLiteral("hello"),
                    domainBindings: [unsafeTermBinding("baz")],
                }),
            ]),
        );
        expect(actual).toStrictEqual(expected);
    });
});

describe("sumTermConstructor", () => {
    const parser = new Parser("sumTermConstructor");

    it("parses a sum term constructor with an index of <0`", () => {
        const ast = parser.parse("<0");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(unsafeSumTermConstructor(0));
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum term constructor with an index of <1`", () => {
        const ast = parser.parse("<1");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(unsafeSumTermConstructor(1));
        expect(actual).toStrictEqual(expected);
    });

    it("does not parse a sum term constructor without an index", () => {
        expect(() => parser.parse("`")).toThrow();
    });

    it("does not parse a sum term constructor with a float index", () => {
        expect(() => parser.parse("<1.5")).toThrow();
    });

    it("does not parse a sum term constructor with a negative index", () => {
        expect(() => parser.parse("`-1")).toThrow();
    });

    it("does not parse a sum term constructor with whitespace", () => {
        expect(() => parser.parse("` 1")).toThrow();
    });
});
