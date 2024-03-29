import {
    DenormalizedAst,
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
        const actual = parser.parse("Boolean").root().denormalize().anonymize();

        const expected = new DenormalizedAst(
            booleanTypeLiteral(undefined),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });
});

describe("floatTypeLiteral", () => {
    const parser = new Parser("floatTypeLiteral");

    it("parses `Float`", () => {
        const actual = parser.parse("Float").root().denormalize().anonymize();

        const expected = new DenormalizedAst(
            floatTypeLiteral(undefined),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });
});

describe("integerTypeLiteral", () => {
    const parser = new Parser("integerTypeLiteral");

    it("parses `Integer`", () => {
        const actual = parser.parse("Integer").root().denormalize().anonymize();

        const expected = new DenormalizedAst(
            integerTypeLiteral(undefined),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });
});

describe("stringTypeLiteral", () => {
    const parser = new Parser("stringTypeLiteral");

    it("parses `String`", () => {
        const actual = parser.parse("String").root().denormalize().anonymize();

        const expected = new DenormalizedAst(
            stringTypeLiteral(undefined),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });
});

describe("largeTypeTypeLiteral", () => {
    const parser = new Parser("largeTypeTypeLiteral");

    it("parses `Type`", () => {
        const actual = parser.parse("Type").root().denormalize().anonymize();

        const expected = new DenormalizedAst(
            largeTypeTypeLiteral(undefined),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });
});
