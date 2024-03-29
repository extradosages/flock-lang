import {
    anonymize,
    booleanTypeLiteral,
    floatTypeLiteral,
    integerTypeLiteral,
    largeTypeTypeLiteral,
    stringTypeLiteral,
} from "@flock/ast";

import { Parser } from "../parser";

describe("booleanTypeLiteral", () => {
    const parser = new Parser("booleanTypeLiteral");

    it("parses `Boolean`", () => {
        const ast = parser.parse("Boolean");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(booleanTypeLiteral(undefined));
        expect(actual).toStrictEqual(expected);
    });
});

describe("floatTypeLiteral", () => {
    const parser = new Parser("floatTypeLiteral");

    it("parses `Float`", () => {
        const ast = parser.parse("Float");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(floatTypeLiteral(undefined));
        expect(actual).toStrictEqual(expected);
    });
});

describe("integerTypeLiteral", () => {
    const parser = new Parser("integerTypeLiteral");

    it("parses `Integer`", () => {
        const ast = parser.parse("Integer");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(integerTypeLiteral(undefined));
        expect(actual).toStrictEqual(expected);
    });
});

describe("stringTypeLiteral", () => {
    const parser = new Parser("stringTypeLiteral");

    it("parses `String`", () => {
        const ast = parser.parse("String");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(stringTypeLiteral(undefined));
        expect(actual).toStrictEqual(expected);
    });
});

describe("largeTypeTypeLiteral", () => {
    const parser = new Parser("largeTypeTypeLiteral");

    it("parses `Type`", () => {
        const ast = parser.parse("Type");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(largeTypeTypeLiteral(undefined));
        expect(actual).toStrictEqual(expected);
    });
});
