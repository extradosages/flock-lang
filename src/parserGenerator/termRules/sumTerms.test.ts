import * as peggy from "peggy";

import {
    sumTermEliminator,
    stringTermLiteral,
    unsafeTermBinding,
    unsafeTermReference,
    lambdaConstructor,
    unsafeSumTermConstructor,
} from "@flock/ast";
import { source } from "../parser";

describe("sumTermEliminator", () => {
    const parser = peggy.generate(source, {
        allowedStartRules: ["sumTermEliminator"],
    });

    it("parses an empty sum", () => {
        const actual = parser.parse("[++]");
        const expected = sumTermEliminator([]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum with a single term reference", () => {
        const actual = parser.parse("[+ foo +]");
        const expected = sumTermEliminator([unsafeTermReference("foo")]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum with a single sum term eliminator", () => {
        const actual = parser.parse("[+ [+ foo bar +] +]");
        const expected = sumTermEliminator([
            sumTermEliminator([
                unsafeTermReference("foo"),
                unsafeTermReference("bar"),
            ]),
        ]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum with a single function term constructor", () => {
        const actual = parser.parse("[+ [^ foo -> bar ^] +]");
        const expected = sumTermEliminator([
            lambdaConstructor({
                codomainTerm: unsafeTermReference("bar"),
                domainBindings: [unsafeTermBinding("foo")],
            }),
        ]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum with several components", () => {
        const actual = parser.parse(
            '[+  foo [+ bar +] [^ baz -> "hello" ^] +]',
        );
        const expected = sumTermEliminator([
            unsafeTermReference("foo"),
            sumTermEliminator([unsafeTermReference("bar")]),
            lambdaConstructor({
                codomainTerm: stringTermLiteral("hello"),
                domainBindings: [unsafeTermBinding("baz")],
            }),
        ]);
        expect(actual).toStrictEqual(expected);
    });
});

describe("sumTermConstructor", () => {
    const parser = peggy.generate(source, {
        allowedStartRules: ["sumTermConstructor"],
    });

    it("parses a sum term constructor with an index of <0`", () => {
        const actual = parser.parse("<0");
        const expected = unsafeSumTermConstructor(0);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum term constructor with an index of <1`", () => {
        const actual = parser.parse("<1");
        const expected = unsafeSumTermConstructor(1);
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
