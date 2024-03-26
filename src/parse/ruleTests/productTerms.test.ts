import * as peggy from "peggy";

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
} from "@flock/ast";
import { source } from "../parser";

describe("productTermConstructor", () => {
    const parser = peggy.generate(source, {
        allowedStartRules: ["productTermConstructor"],
    });

    it("parses an empty product", () => {
        const actual = parser.parse("[**]");
        const expected = productTermConstructor([]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product with a single term literal", () => {
        const actual = parser.parse("[* true *]");
        const expected = productTermConstructor([booleanTermLiteral(true)]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product with a single term reference", () => {
        const actual = parser.parse("[* foo *]");
        const expected = productTermConstructor([unsafeTermReference("foo")]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product with a single product term constructor", () => {
        const actual = parser.parse("[* [* true *] *]");
        const expected = productTermConstructor([
            productTermConstructor([booleanTermLiteral(true)]),
        ]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product with a single sum term eliminator", () => {
        const actual = parser.parse("[* [+ foo bar +] *]");
        const expected = productTermConstructor([
            sumTermEliminator([
                unsafeTermReference("foo"),
                unsafeTermReference("bar"),
            ]),
        ]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product with a single function term constructor", () => {
        const actual = parser.parse("[* [^ foo -> bar ^] *]");
        const expected = productTermConstructor([
            lambdaConstructor({
                codomainTerm: unsafeTermReference("bar"),
                domainBindings: [unsafeTermBinding("foo")],
            }),
        ]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product with a single function term eliminator", () => {
        const actual = parser.parse("[* (foo true) *]");
        const expected = productTermConstructor([
            functionTermEliminator({
                function: unsafeTermReference("foo"),
                arguments: [booleanTermLiteral(true)],
            }),
        ]);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product with several components", () => {
        const actual = parser.parse(
            '[* true foo [* true *] [^ bar -> "hello" ^] *]',
        );
        const expected = productTermConstructor([
            booleanTermLiteral(true),
            unsafeTermReference("foo"),
            productTermConstructor([booleanTermLiteral(true)]),
            lambdaConstructor({
                codomainTerm: stringTermLiteral("hello"),
                domainBindings: [unsafeTermBinding("bar")],
            }),
        ]);
        expect(actual).toStrictEqual(expected);
    });
});

describe("productTermEliminator", () => {
    const parser = peggy.generate(source, {
        allowedStartRules: ["productTermEliminator"],
    });

    it("parses a product term eliminator with an index of <0`", () => {
        const actual = parser.parse(">0");
        const expected = unsafeProductTermEliminator(0);
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product term eliminator with an index of <1`", () => {
        const actual = parser.parse(">1");
        const expected = unsafeProductTermEliminator(1);
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
