import {
    DenormalizedAst,
    dBooleanType,
    dFloatType,
    dIntegerType,
    dStringType,
    dLargeTypeType,
} from "../../ast";
import { Parser } from "../parser";

describe("booleanType", () => {
    const parser = new Parser("booleanType");

    it("parses `Boolean`", () => {
        const actual = parser.parse("Boolean").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dBooleanType(undefined),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });
});

describe("floatType", () => {
    const parser = new Parser("floatType");

    it("parses `Float`", () => {
        const actual = parser.parse("Float").denormalize().anonymize();

        const expected = new DenormalizedAst(dFloatType(undefined)).anonymize();
        expect(actual).toStrictEqual(expected);
    });
});

describe("integerType", () => {
    const parser = new Parser("integerType");

    it("parses `Integer`", () => {
        const actual = parser.parse("Integer").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dIntegerType(undefined),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });
});

describe("stringType", () => {
    const parser = new Parser("stringType");

    it("parses `String`", () => {
        const actual = parser.parse("String").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dStringType(undefined),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });
});

describe("largeTypeType", () => {
    const parser = new Parser("largeTypeType");

    it("parses `Type`", () => {
        const actual = parser.parse("Type").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dLargeTypeType(undefined),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });
});
