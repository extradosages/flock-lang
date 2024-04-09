import {
    DenormalizedAst,
    dTypeDefinition,
    dTypeBinding,
    dBooleanType,
    dProductType,
    dStringType,
    dFunctionType,
    dGenericTypeConstructor,
    dTypeReference,
    dGenericTypeEliminator,
} from "../../ast";
import { Parser } from "../parser";

describe("typeDefinition", () => {
    const parser = new Parser("typeDefinition");

    it("parses a type definition with a type literal body", () => {
        const actual = parser
            .parse("deftype Foo:Type Boolean")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dTypeDefinition({
                binding: dTypeBinding("Foo"),
                type: dBooleanType(undefined),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a type definition with a type composite body", () => {
        const actual = parser
            .parse("deftype Foo:Type [* Boolean String *]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dTypeDefinition({
                binding: dTypeBinding("Foo"),
                type: dProductType({
                    components: [
                        dBooleanType(undefined),
                        dStringType(undefined),
                    ],
                }),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a type definition with a function type body", () => {
        const actual = parser
            .parse("deftype Foo:Type [^ Boolean -> String ^]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dTypeDefinition({
                binding: dTypeBinding("Foo"),
                type: dFunctionType({
                    codomain: dStringType(undefined),
                    domains: [dBooleanType(undefined)],
                }),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a type definition with a generic type constructor body", () => {
        const actual = parser
            .parse("deftype Foo:Type [^ Bar => [^ Bar -> Boolean ^] ^]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dTypeDefinition({
                binding: dTypeBinding("Foo"),
                type: dGenericTypeConstructor({
                    codomainType: dFunctionType({
                        codomain: dBooleanType(undefined),
                        domains: [dTypeReference("Bar")],
                    }),
                    domainTypeBindings: [dTypeBinding("Bar")],
                }),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a type definition with a generic type eliminator body", () => {
        const actual = parser
            .parse("deftype Foo:Type (Bar Boolean)")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dTypeDefinition({
                binding: dTypeBinding("Foo"),
                type: dGenericTypeEliminator({
                    arguments: [dBooleanType(undefined)],
                    genericType: dTypeReference("Bar"),
                }),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });
});
