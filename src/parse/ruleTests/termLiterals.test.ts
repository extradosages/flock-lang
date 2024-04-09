import {
    DenormalizedAst,
    booleanTerm,
    floatTermLiteral,
    stringTermLiteral,
    integerTerm,
} from "@flock/ast";

import { Parser } from "../parser";

describe("booleanTerm", () => {
    const parser = new Parser("booleanTerm");

    it("parses `true`", () => {
        const actual = parser.parse("true").root().denormalize().anonymize();

        const expected = new DenormalizedAst(booleanTerm(true)).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses `false`", () => {
        const actual = parser.parse("false").root().denormalize().anonymize();

        const expected = new DenormalizedAst(booleanTerm(false)).anonymize();
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
        const actual = parser.parse("1.0").root().denormalize().anonymize();

        const expected = new DenormalizedAst(floatTermLiteral(1.0)).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses <1.`", () => {
        const actual = parser.parse("1.").root().denormalize().anonymize();

        const expected = new DenormalizedAst(floatTermLiteral(1.0)).anonymize();
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
        const actual = parser.parse("1").root().denormalize().anonymize();

        const expected = new DenormalizedAst(integerTerm(1)).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("doesn't parse <1.0`", () => {
        expect(() => parser.parse("1.0")).toThrow();
    });
});

describe("stringTermLiteral", () => {
    const parser = new Parser("stringTermLiteral");

    it('parses `"foo"`', () => {
        const actual = parser.parse('"foo"').root().denormalize().anonymize();

        const expected = new DenormalizedAst(
            stringTermLiteral("foo"),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it('parses `"foo bar"`', () => {
        const actual = parser
            .parse('"foo bar"')
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            stringTermLiteral("foo bar"),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it('parses `"foo 1234 quod LIBER"`', () => {
        const actual = parser
            .parse('"foo 1234 quod LIBER"')
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            stringTermLiteral("foo 1234 quod LIBER"),
        ).anonymize();
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
