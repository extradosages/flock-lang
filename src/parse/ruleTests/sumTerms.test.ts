import {
    DenormalizedAst,
    sumTermEliminator,
    stringTermLiteral,
    termBinding,
    termReference,
    lambdaConstructor,
    sumTermConstructor,
} from "@flock/ast";

import { Parser } from "../parser";

describe("sumTermEliminator", () => {
    const parser = new Parser("sumTermEliminator");

    it("parses an empty sum", () => {
        const actual = parser.parse("[++]").root().denormalize().anonymize();

        const expected = new DenormalizedAst(sumTermEliminator([])).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum with a single term reference", () => {
        const actual = parser
            .parse("[+ foo +]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            sumTermEliminator([termReference("foo")]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum with a single sum term eliminator", () => {
        const actual = parser
            .parse("[+ [+ foo bar +] +]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            sumTermEliminator([
                sumTermEliminator([termReference("foo"), termReference("bar")]),
            ]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum with a single function term constructor", () => {
        const actual = parser
            .parse("[+ [^ foo -> bar ^] +]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            sumTermEliminator([
                lambdaConstructor({
                    codomainTerm: termReference("bar"),
                    domainBindings: [termBinding("foo")],
                }),
            ]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum with several components", () => {
        const actual = parser
            .parse('[+  foo [+ bar +] [^ baz -> "hello" ^] +]')
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            sumTermEliminator([
                termReference("foo"),
                sumTermEliminator([termReference("bar")]),
                lambdaConstructor({
                    codomainTerm: stringTermLiteral("hello"),
                    domainBindings: [termBinding("baz")],
                }),
            ]),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });
});

describe("sumTermConstructor", () => {
    const parser = new Parser("sumTermConstructor");

    it("parses a sum term constructor with an index of <0`", () => {
        const actual = parser.parse("<0").root().denormalize().anonymize();

        const expected = new DenormalizedAst(sumTermConstructor(0)).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum term constructor with an index of <1`", () => {
        const actual = parser.parse("<1").root().denormalize().anonymize();

        const expected = new DenormalizedAst(sumTermConstructor(1)).anonymize();
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
