import * as peggy from "peggy";

import { source } from "../parser";
import {
    booleanTermLiteral,
    floatTermLiteral,
    stringTermLiteral,
    unsafeIntegerTermLiteral,
} from "@flock/ast";

describe("booleanTermLiteral", () => {
    const parser = peggy.generate(source, {
        allowedStartRules: ["booleanTermLiteral"],
    });

    it("parses `true`", () => {
        const actual = parser.parse("true");
        const expected = booleanTermLiteral(true);
        expect(actual).toStrictEqual(expected);
    });

    it("parses `false`", () => {
        const actual = parser.parse("false");
        const expected = booleanTermLiteral(false);
        expect(actual).toStrictEqual(expected);
    });

    it("doesn't parse some arbitrary third thing", () => {
        expect(() => parser.parse("maybe")).toThrow();
    });

    it("doesn't parse `True`", () => {
        expect(() => parser.parse("True")).toThrow();
    });

    it("doesn't parse `False`", () => {
        expect(() => parser.parse("False")).toThrow();
    });
});

describe("floatTermLiteral", () => {
    const parser = peggy.generate(source, {
        allowedStartRules: ["floatTermLiteral"],
    });

    it("parses <1.0`", () => {
        const actual = parser.parse("1.0");
        const expected = floatTermLiteral(1.0);
        expect(actual).toStrictEqual(expected);
    });

    it("parses <1.`", () => {
        const actual = parser.parse("1.");
        const expected = floatTermLiteral(1.0);
        expect(actual).toStrictEqual(expected);
    });

    it("doesn't parse `.1`", () => {
        expect(() => parser.parse(".1")).toThrow();
    });

    it("doesn't parse <1`", () => {
        expect(() => parser.parse("1")).toThrow();
    });
});

describe("integerTermLiteral", () => {
    const parser = peggy.generate(source, {
        allowedStartRules: ["integerTermLiteral"],
    });

    it("parses <1`", () => {
        const actual = parser.parse("1");
        const expected = unsafeIntegerTermLiteral(1);
        expect(actual).toStrictEqual(expected);
    });

    it("doesn't parse <1.0`", () => {
        expect(() => parser.parse("1.0")).toThrow();
    });
});

describe("stringTermLiteral", () => {
    const parser = peggy.generate(source, {
        allowedStartRules: ["stringTermLiteral"],
    });

    it('parses `"foo"`', () => {
        const actual = parser.parse('"foo"');
        const expected = stringTermLiteral("foo");
        expect(actual).toStrictEqual(expected);
    });

    it('parses `"foo bar"`', () => {
        const actual = parser.parse('"foo bar"');
        const expected = stringTermLiteral("foo bar");
        expect(actual).toStrictEqual(expected);
    });

    it('parses `"foo 1234 quod LIBER"`', () => {
        const actual = parser.parse('"foo 1234 quod LIBER"');
        const expected = stringTermLiteral("foo 1234 quod LIBER");
        expect(actual).toStrictEqual(expected);
    });

    it("doesn't parse a string with no quotes", () => {
        expect(() => parser.parse("foo")).toThrow();
    });

    it("doesn't parse a string with no leading quotes", () => {
        expect(() => parser.parse('foo"')).toThrow();
    });

    it("doesn't parse a string with no trailing quotes", () => {
        expect(() => parser.parse('"foo')).toThrow();
    });
});
