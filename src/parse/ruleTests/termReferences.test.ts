import { anonymize, unsafeTermReference } from "@flock/ast";

import { Parser } from "../parser";

describe("termReference", () => {
    const parser = new Parser("termReference");

    it("parses a camelCase identifier", () => {
        const ast = parser.parse("fooBar");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(unsafeTermReference("fooBar"));
        expect(actual).toStrictEqual(expected);
    });

    it("parses an all lower-case identifier", () => {
        const ast = parser.parse("foo");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(unsafeTermReference("foo"));
        expect(actual).toStrictEqual(expected);
    });

    it("parses an identifier with a hyphen in a tail position", () => {
        const ast = parser.parse("foo-Bar");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(unsafeTermReference("foo-Bar"));
        expect(actual).toStrictEqual(expected);
    });

    it("parses an identifier with numerals in tail positions", () => {
        const ast = parser.parse("foo-123");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(unsafeTermReference("foo-123"));
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
