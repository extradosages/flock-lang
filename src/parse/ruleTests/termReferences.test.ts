import { DenormalizedAst, unsafeTermReference } from "@flock/ast";

import { Parser } from "../parser";

describe("termReference", () => {
    const parser = new Parser("termReference");

    it("parses a camelCase identifier", () => {
        const actual = parser.parse("fooBar").root().denormalize().anonymize();

        const expected = new DenormalizedAst(
            unsafeTermReference("fooBar"),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses an all lower-case identifier", () => {
        const actual = parser.parse("foo").root().denormalize().anonymize();

        const expected = new DenormalizedAst(
            unsafeTermReference("foo"),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses an identifier with a hyphen in a tail position", () => {
        const actual = parser.parse("foo-Bar").root().denormalize().anonymize();

        const expected = new DenormalizedAst(
            unsafeTermReference("foo-Bar"),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses an identifier with numerals in tail positions", () => {
        const actual = parser.parse("foo-123").root().denormalize().anonymize();

        const expected = new DenormalizedAst(
            unsafeTermReference("foo-123"),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("doesn't parse an identifier starting with an upper case letter", () => {
        expect(() => parser.parse("Foo")).toThrow();
    });

    it("doesn't parse an identifier starting with a hyphen", () => {
        expect(() => parser.parse("-foo")).toThrow();
    });

    it("doesn't parse an identifiers starting with a numeral", () => {
        expect(() => parser.parse("1foo")).toThrow();
    });

    it("doesn't parse an identifier with whitespace", () => {
        expect(() => parser.parse("foo bar")).toThrow();
    });

    it("doesn't parse the empty identifier", () => {
        expect(() => parser.parse("")).toThrow();
    });
});
