import { anonymize, unsafeTypeReference } from "@flock/ast";

import { Parser } from "../parser";

describe("typeReference", () => {
    const parser = new Parser("typeReference");

    it("parses PascalCase identifiers", () => {
        const ast = parser.parse("FooBar");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(unsafeTypeReference("FooBar"));
        expect(actual).toStrictEqual(expected);
    });

    it("parses identifiers with hyphens in tail positions", () => {
        const ast = parser.parse("Foo-Bar");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(unsafeTypeReference("Foo-Bar"));
        expect(actual).toStrictEqual(expected);
    });

    it("parses identifiers with numerals in tail positions", () => {
        const ast = parser.parse("Foo1Bar");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(unsafeTypeReference("Foo1Bar"));
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
});
