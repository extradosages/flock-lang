import { DenormalizedAst, unsafeTypeBinding } from "@flock/ast";

import { Parser } from "../parser";

describe("typeBinding", () => {
    const parser = new Parser("typeBinding");

    it("parses PascalCase identifiers", () => {
        const actual = parser.parse("FooBar").root().denormalize().anonymize();

        const expected = new DenormalizedAst(
            unsafeTypeBinding("FooBar"),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses identifiers with hyphens in tail positions", () => {
        const actual = parser.parse("Foo-Bar").root().denormalize().anonymize();

        const expected = new DenormalizedAst(
            unsafeTypeBinding("Foo-Bar"),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses identifiers with numerals in tail positions", () => {
        const actual = parser.parse("Foo1Bar").root().denormalize().anonymize();

        const expected = new DenormalizedAst(
            unsafeTypeBinding("Foo1Bar"),
        ).anonymize();
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
