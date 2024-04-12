import {
    DenormalizedAst,
    dProductType,
    dBooleanType,
    dStringType,
    dTypeReference,
    dSumType,
    dFunctionType,
    dGenericTypeEliminator,
} from "../../ast";
import { Parser } from "../parser";

describe("productType", () => {
    const parser = new Parser("productType");

    it("parses the empty product type", () => {
        const first = parser.parse("[**]");
        debugger;
        const second = first.denormalize();
        const actual = second.anonymize();

        const expected = new DenormalizedAst(
            dProductType({ components: [] }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with one small literal type", () => {
        const actual = parser.parse("[* Boolean *]").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dProductType({ components: [dBooleanType(undefined)] }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with several small literal types", () => {
        const actual = parser
            .parse("[* Boolean String Boolean *]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dProductType({
                components: [
                    dBooleanType(undefined),
                    dStringType(undefined),
                    dBooleanType(undefined),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with a single type reference", () => {
        const actual = parser.parse("[* Foo *]").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dProductType({ components: [dTypeReference("Foo")] }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with several type references", () => {
        const actual = parser
            .parse("[* Foo Bar Baz Qux *]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dProductType({
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

    it("parses a product type with a single nested product type", () => {
        const actual = parser.parse("[* [**] *]").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dProductType({ components: [dProductType({ components: [] })] }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with several nested product types", () => {
        const actual = parser
            .parse("[* [**] [**] *]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dProductType({
                components: [
                    dProductType({ components: [] }),
                    dProductType({ components: [] }),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with a single nested sum type", () => {
        const actual = parser.parse("[* [++] *]").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dProductType({ components: [dSumType({ components: [] })] }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with several nested sum types", () => {
        const actual = parser
            .parse("[* [++] [++] *]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dProductType({
                components: [
                    dSumType({ components: [] }),
                    dSumType({ components: [] }),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with a single nested function type", () => {
        const actual = parser
            .parse("[* [^ -> Boolean ^] *]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dProductType({
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

    it("parses a product type with several nested function types", () => {
        const actual = parser
            .parse("[* [^ -> Boolean ^] [^ -> Boolean ^] *]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dProductType({
                components: [
                    dFunctionType({
                        codomain: dBooleanType(undefined),
                        domains: [],
                    }),
                    dFunctionType({
                        codomain: dBooleanType(undefined),
                        domains: [],
                    }),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a product type with a single generic type eliminator", () => {
        const actual = parser
            .parse("[* (Foo String) *]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dProductType({
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

    it("parses a product type with several generic type eliminators", () => {
        const actual = parser
            .parse("[* (Foo String) (Foo Boolean) *]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dProductType({
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

    it("parses a complicated product type", () => {
        const actual = parser
            .parse("[* String [* [^ -> Boolean ^] Foo *] (Foo Boolean) [++] *]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dProductType({
                components: [
                    dStringType(undefined),
                    dProductType({
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
                    dSumType({ components: [] }),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });
});
