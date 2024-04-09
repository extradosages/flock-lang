import {
    DenormalizedAst,
    dSumTermEliminator,
    dTermReference,
    dLambdaConstructor,
    dTermBinding,
    dStringTerm,
    dSumTermConstructor,
} from "../../ast";
import { sumTermConstructor } from "../../ast/defs";
import { Parser } from "../parser";

describe("sumTermEliminator", () => {
    const parser = new Parser("sumTermEliminator");

    it("parses an empty sum", () => {
        const actual = parser.parse("[++]").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dSumTermEliminator({ components: [] }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum with a single term reference", () => {
        const actual = parser.parse("[+ foo +]").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dSumTermEliminator({ components: [dTermReference("foo")] }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum with a single sum term eliminator", () => {
        const actual = parser
            .parse("[+ [+ foo bar +] +]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dSumTermEliminator({
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

    it("parses a sum with a single function term constructor", () => {
        const actual = parser
            .parse("[+ [^ foo -> bar ^] +]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dSumTermEliminator({
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

    it("parses a sum with several components", () => {
        const actual = parser
            .parse('[+  foo [+ bar +] [^ baz -> "hello" ^] +]')
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dSumTermEliminator({
                components: [
                    dTermReference("foo"),
                    dSumTermEliminator({ components: [dTermReference("bar")] }),
                    dLambdaConstructor({
                        codomainTerm: dStringTerm("hello"),
                        domainTermBindings: [dTermBinding("baz")],
                    }),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });
});

describe("sumTermConstructor", () => {
    const parser = new Parser("sumTermConstructor");

    it("parses a sum term constructor with an index of <0`", () => {
        const actual = parser.parse("<0").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dSumTermConstructor(0),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum term constructor with an index of <1`", () => {
        const actual = parser.parse("<1").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dSumTermConstructor(1),
        ).anonymize();
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
