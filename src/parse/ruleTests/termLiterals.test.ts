import {
    DenormalizedAst,
    dBooleanTerm,
    dFloatTerm,
    dIntegerTerm,
    dStringTerm,
} from "../../ast";
import { Parser } from "../parser";

describe("booleanTerm", () => {
    const parser = new Parser("booleanTerm");

    it("parses `true`", () => {
        const actual = parser.parse("true").denormalize().anonymize();

        const expected = new DenormalizedAst(dBooleanTerm(true)).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses `false`", () => {
        const actual = parser.parse("false").denormalize().anonymize();

        const expected = new DenormalizedAst(dBooleanTerm(false)).anonymize();
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

describe("floatTerm", () => {
    const parser = new Parser("floatTerm");

    it("parses <1.0`", () => {
        const actual = parser.parse("1.0").denormalize().anonymize();

        const expected = new DenormalizedAst(dFloatTerm(1.0)).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses <1.`", () => {
        const actual = parser.parse("1.").denormalize().anonymize();

        const expected = new DenormalizedAst(dFloatTerm(1.0)).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("doesn't parse `.1`", () => {
        expect(() => parser.parse(".1")).toThrow();
    });

    it("doesn't parse <1`", () => {
        expect(() => parser.parse("1")).toThrow();
    });
});

describe("integerTerm", () => {
    const parser = new Parser("integerTerm");

    it("parses <1`", () => {
        const actual = parser.parse("1").denormalize().anonymize();

        const expected = new DenormalizedAst(dIntegerTerm(1)).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("doesn't parse <1.0`", () => {
        expect(() => parser.parse("1.0")).toThrow();
    });
});

describe("stringTerm", () => {
    const parser = new Parser("stringTerm");

    it('parses `"foo"`', () => {
        const actual = parser.parse('"foo"').denormalize().anonymize();

        const expected = new DenormalizedAst(dStringTerm("foo")).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it('parses `"foo bar"`', () => {
        const actual = parser.parse('"foo bar"').denormalize().anonymize();

        const expected = new DenormalizedAst(
            dStringTerm("foo bar"),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it('parses `"foo 1234 quod LIBER"`', () => {
        const actual = parser
            .parse('"foo 1234 quod LIBER"')
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dStringTerm("foo 1234 quod LIBER"),
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
