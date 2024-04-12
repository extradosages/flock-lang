import { DenormalizedAst, dTypeReference } from "../../ast";
import { Parser } from "../parser";

describe("typeReference", () => {
    const parser = new Parser("typeReference");

    it("parses PascalCase identifiers", () => {
        const actual = parser.parse("FooBar").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dTypeReference("FooBar"),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses identifiers with hyphens in tail positions", () => {
        const actual = parser.parse("Foo-Bar").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dTypeReference("Foo-Bar"),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses identifiers with numerals in tail positions", () => {
        const actual = parser.parse("Foo1Bar").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dTypeReference("Foo1Bar"),
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
});
