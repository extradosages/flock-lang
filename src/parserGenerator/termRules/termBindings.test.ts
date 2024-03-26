import * as peggy from "peggy";

import { source } from "../parser";
import { unsafeTermBinding } from "@flock/ast";

describe("termBinding", () => {
    const parser = peggy.generate(source, {
        allowedStartRules: ["termBinding"],
    });

    it("parses a camelCase identifier", () => {
        const actual = parser.parse("fooBar");
        const expected = unsafeTermBinding("fooBar");
        expect(actual).toStrictEqual(expected);
    });

    it("parses an all lower-case identifier", () => {
        const actual = parser.parse("foo");
        const expected = unsafeTermBinding("foo");
        expect(actual).toStrictEqual(expected);
    });

    it("parses an identifier with a hyphen in a tail position", () => {
        const actual = parser.parse("foo-Bar");
        const expected = unsafeTermBinding("foo-Bar");
        expect(actual).toStrictEqual(expected);
    });

    it("parses an identifier with numerals in tail positions", () => {
        const actual = parser.parse("foo-123");
        const expected = unsafeTermBinding("foo-123");
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

    it("doesn't parse reserved keyword `true`", () => {
        expect(() => parser.parse("true")).toThrow();
    });

    it("doesn't parse reserved keyword `false`", () => {
        expect(() => parser.parse("false")).toThrow();
    });

    it("doesn't parse reserved keyword `client`", () => {
        expect(() => parser.parse("client")).toThrow();
    });
});
