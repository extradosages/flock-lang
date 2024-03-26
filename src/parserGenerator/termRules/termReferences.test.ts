import * as peggy from "peggy";

import { unsafeTermReference } from "@flock/ast";
import { source } from "../parser";

describe("termReference", () => {
    const parser = peggy.generate(source, {
        allowedStartRules: ["termReference"],
    });

    it("parses a camelCase identifier", () => {
        const actual = parser.parse("fooBar");
        const expected = unsafeTermReference("fooBar");
        expect(actual).toStrictEqual(expected);
    });

    it("parses an all lower-case identifier", () => {
        const actual = parser.parse("foo");
        const expected = unsafeTermReference("foo");
        expect(actual).toStrictEqual(expected);
    });

    it("parses an identifier with a hyphen in a tail position", () => {
        const actual = parser.parse("foo-Bar");
        const expected = unsafeTermReference("foo-Bar");
        expect(actual).toStrictEqual(expected);
    });

    it("parses an identifier with numerals in tail positions", () => {
        const actual = parser.parse("foo-123");
        const expected = unsafeTermReference("foo-123");
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
