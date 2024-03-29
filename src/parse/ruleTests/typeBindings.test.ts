import { anonymize, unsafeTypeBinding } from "@flock/ast";

import { Parser } from "../parser";

describe("typeBinding", () => {
    const parser = new Parser("typeBinding");

    it("parses PascalCase identifiers", () => {
        const ast = parser.parse("FooBar");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(unsafeTypeBinding("FooBar"));
        expect(actual).toStrictEqual(expected);
    });

    it("parses identifiers with hyphens in tail positions", () => {
        const ast = parser.parse("Foo-Bar");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(unsafeTypeBinding("Foo-Bar"));
        expect(actual).toStrictEqual(expected);
    });

    it("parses identifiers with numerals in tail positions", () => {
        const ast = parser.parse("Foo1Bar");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(unsafeTypeBinding("Foo1Bar"));
        expect(actual).toStrictEqual(expected);
    });

    it("does not parse identifiers with underscores", () => {
        expect(() => parser.parse("Foo_Bar")).toThrow();
    });

    it("does not parse identifiers starting with a lower-cased letter", () => {
        expect(() => parser.parse("fooBar")).toThrow();
    });

    it("does not parse identifiers starting with a hyphen", () => {
        expect(() => parser.parse("-FooBar")).toThrow();
    });

    it("does not parse identifiers starting with numerals", () => {
        expect(() => parser.parse("1FooBar")).toThrow();
    });

    it("does not parse identifiers with whitespace", () => {
        expect(() => parser.parse("Foo Bar")).toThrow();
    });

    it("does not parse the empty identifier", () => {
        expect(() => parser.parse("")).toThrow();
    });

    it("does not parse reserved keyword `Boolean`", () => {
        expect(() => parser.parse("Boolean")).toThrow();
    });

    it("does not parse reserved keyword `Float`", () => {
        expect(() => parser.parse("Float")).toThrow();
    });

    it("does not parse reserved keyword `Integer`", () => {
        expect(() => parser.parse("Integer")).toThrow();
    });

    it("does not parse reserved keyword `String`", () => {
        expect(() => parser.parse("String")).toThrow();
    });

    it("does not parse reserved keyword `Type`", () => {
        expect(() => parser.parse("Type")).toThrow();
    });
});
