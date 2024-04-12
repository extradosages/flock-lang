import {
    DenormalizedAst,
    dSumType,
    dBooleanType,
    dStringType,
    dTypeReference,
    dProductType,
    dFunctionType,
    dGenericTypeEliminator,
} from "../../ast";
import { Parser } from "../parser";

describe("sumType", () => {
    const parser = new Parser("sumType");

    it("parses the empty sum type", () => {
        const actual = parser.parse("[++]").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dSumType({ components: [] }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with one small literal type", () => {
        const actual = parser.parse("[+ Boolean +]").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dSumType({ components: [dBooleanType(undefined)] }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with several small literal types", () => {
        const actual = parser
            .parse("[+ Boolean String Boolean +]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dSumType({
                components: [
                    dBooleanType(undefined),
                    dStringType(undefined),
                    dBooleanType(undefined),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with a single type reference", () => {
        const actual = parser.parse("[+ Foo +]").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dSumType({ components: [dTypeReference("Foo")] }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with several type references", () => {
        const actual = parser
            .parse("[+ Foo Bar Baz Qux +]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dSumType({
                components: [
                    dTypeReference("Foo"),
                    dTypeReference("Bar"),
                    dTypeReference("Baz"),
                    dTypeReference("Qux"),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with a single nested sum type", () => {
        const actual = parser.parse("[+ [++] +]").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dSumType({ components: [dSumType({ components: [] })] }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with several nested sum types", () => {
        const actual = parser
            .parse("[+ [++] [++] +]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dSumType({
                components: [
                    dSumType({ components: [] }),
                    dSumType({ components: [] }),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with a single nested product type", () => {
        const actual = parser.parse("[+ [**] +]").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dSumType({ components: [dProductType({ components: [] })] }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with several nested product types", () => {
        const actual = parser
            .parse("[+ [**] [**] +]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dSumType({
                components: [
                    dProductType({ components: [] }),
                    dProductType({ components: [] }),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with a single nested function type", () => {
        const actual = parser
            .parse("[+ [^ -> Boolean ^] +]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dSumType({
                components: [
                    dFunctionType({
                        codomain: dBooleanType(undefined),
                        domains: [],
                    }),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with several nested function types", () => {
        const actual = parser
            .parse("[+ [^ -> Boolean ^] [^  -> String ^] +]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dSumType({
                components: [
                    dFunctionType({
                        codomain: dBooleanType(undefined),
                        domains: [],
                    }),
                    dFunctionType({
                        codomain: dStringType(undefined),
                        domains: [],
                    }),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with a single generic type eliminator", () => {
        const actual = parser
            .parse("[+ (Foo String) +]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dSumType({
                components: [
                    dGenericTypeEliminator({
                        genericType: dTypeReference("Foo"),
                        arguments: [dStringType(undefined)],
                    }),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a sum type with several generic type eliminators", () => {
        const actual = parser
            .parse("[+ (Foo String) (Foo Boolean) +]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dSumType({
                components: [
                    dGenericTypeEliminator({
                        genericType: dTypeReference("Foo"),
                        arguments: [dStringType(undefined)],
                    }),
                    dGenericTypeEliminator({
                        genericType: dTypeReference("Foo"),
                        arguments: [dBooleanType(undefined)],
                    }),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a complicated sum type", () => {
        const actual = parser
            .parse("[+ String [+ [^ -> Boolean ^] Foo +] (Foo Boolean) [**] +]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dSumType({
                components: [
                    dStringType(undefined),
                    dSumType({
                        components: [
                            dFunctionType({
                                codomain: dBooleanType(undefined),
                                domains: [],
                            }),
                            dTypeReference("Foo"),
                        ],
                    }),
                    dGenericTypeEliminator({
                        arguments: [dBooleanType(undefined)],
                        genericType: dTypeReference("Foo"),
                    }),
                    dProductType({ components: [] }),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });
});
