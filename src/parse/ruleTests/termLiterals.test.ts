import {
    anonymize,
    booleanTermLiteral,
    floatTermLiteral,
    stringTermLiteral,
    unsafeIntegerTermLiteral,
} from "@flock/ast";

import { Parser } from "../parser";

describe("booleanTermLiteral", () => {
    const parser = new Parser("booleanTermLiteral");

    it("parses `true`", () => {
        const ast = parser.parse("true");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(booleanTermLiteral(true));
        expect(actual).toStrictEqual(expected);
    });

    it("parses `false`", () => {
        const ast = parser.parse("false");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(booleanTermLiteral(false));
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
    const parser = new Parser("floatTermLiteral");

    it("parses <1.0`", () => {
        const ast = parser.parse("1.0");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(floatTermLiteral(1.0));
        expect(actual).toStrictEqual(expected);
    });

    it("parses <1.`", () => {
        const ast = parser.parse("1.");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(floatTermLiteral(1.0));
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
    const parser = new Parser("integerTermLiteral");

    it("parses <1`", () => {
        const ast = parser.parse("1");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(unsafeIntegerTermLiteral(1));
        expect(actual).toStrictEqual(expected);
    });

    it("doesn't parse <1.0`", () => {
        expect(() => parser.parse("1.0")).toThrow();
    });
});

describe("stringTermLiteral", () => {
    const parser = new Parser("stringTermLiteral");

    it('parses `"foo"`', () => {
        const ast = parser.parse('"foo"');

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(stringTermLiteral("foo"));
        expect(actual).toStrictEqual(expected);
    });

    it('parses `"foo bar"`', () => {
        const ast = parser.parse('"foo bar"');

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(stringTermLiteral("foo bar"));
        expect(actual).toStrictEqual(expected);
    });

    it('parses `"foo 1234 quod LIBER"`', () => {
        const ast = parser.parse('"foo 1234 quod LIBER"');

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(stringTermLiteral("foo 1234 quod LIBER"));
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
