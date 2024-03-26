import * as peggy from "peggy";

import {
    booleanTypeLiteral,
    floatTypeLiteral,
    integerTypeLiteral,
    largeTypeTypeLiteral,
    stringTypeLiteral,
} from "@flock/ast";

import { source } from "../parser";

describe("booleanTypeLiteral", () => {
    const parser = peggy.generate(source, {
        allowedStartRules: ["booleanTypeLiteral"],
    });

    it("parses `Boolean`", () => {
        const actual = parser.parse("Boolean");
        const expected = booleanTypeLiteral(undefined);
        expect(actual).toStrictEqual(expected);
    });
});

describe("floatTypeLiteral(undefined)", () => {
    const parser = peggy.generate(source, {
        allowedStartRules: ["floatTypeLiteral"],
    });

    it("parses `Float`", () => {
        const actual = parser.parse("Float");
        const expected = floatTypeLiteral(undefined);
        expect(actual).toStrictEqual(expected);
    });
});

describe("integerTypeLiteral", () => {
    const parser = peggy.generate(source, {
        allowedStartRules: ["integerTypeLiteral"],
    });

    it("parses `Integer`", () => {
        const actual = parser.parse("Integer");
        const expected = integerTypeLiteral(undefined);
        expect(actual).toStrictEqual(expected);
    });
});

describe("stringTypeLiteral", () => {
    const parser = peggy.generate(source, {
        allowedStartRules: ["stringTypeLiteral"],
    });

    it("parses `String`", () => {
        const actual = parser.parse("String");
        const expected = stringTypeLiteral(undefined);
        expect(actual).toStrictEqual(expected);
    });
});

describe("largeTypeTypeLiteral", () => {
    const parser = peggy.generate(source, {
        allowedStartRules: ["largeTypeTypeLiteral"],
    });

    it("parses `Type`", () => {
        const actual = parser.parse("Type");
        const expected = largeTypeTypeLiteral(undefined);
        expect(actual).toStrictEqual(expected);
    });
});
