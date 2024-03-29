import {
    DenormalizedAst,
    booleanTypeLiteral,
    functionType,
    genericTypeConstructor,
    genericTypeEliminator,
    productType,
    stringTypeLiteral,
    typeDefinition,
    unsafeTypeBinding,
    unsafeTypeReference,
} from "@flock/ast";

import { Parser } from "../parser";

describe("typeDefinition", () => {
    const parser = new Parser("typeDefinition");

    it("parses a type definition with a type literal body", () => {
        const actual = parser
            .parse("deftype Foo:Type Boolean")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            typeDefinition({
                binding: unsafeTypeBinding("Foo"),
                type: booleanTypeLiteral(undefined),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a type definition with a type composite body", () => {
        const actual = parser
            .parse("deftype Foo:Type [* Boolean String *]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            typeDefinition({
                binding: unsafeTypeBinding("Foo"),
                type: productType([
                    booleanTypeLiteral(undefined),
                    stringTypeLiteral(undefined),
                ]),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a type definition with a function type body", () => {
        const actual = parser
            .parse("deftype Foo:Type [^ Boolean -> String ^]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            typeDefinition({
                binding: unsafeTypeBinding("Foo"),
                type: functionType({
                    codomain: stringTypeLiteral(undefined),
                    domains: [booleanTypeLiteral(undefined)],
                }),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a type definition with a generic type constructor body", () => {
        const actual = parser
            .parse("deftype Foo:Type [^ Bar => [^ Bar -> Boolean ^] ^]")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            typeDefinition({
                binding: unsafeTypeBinding("Foo"),
                type: genericTypeConstructor({
                    codomainType: functionType({
                        codomain: booleanTypeLiteral(undefined),
                        domains: [unsafeTypeReference("Bar")],
                    }),
                    domainBindings: [unsafeTypeBinding("Bar")],
                }),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a type definition with a generic type eliminator body", () => {
        const actual = parser
            .parse("deftype Foo:Type (Bar Boolean)")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            typeDefinition({
                binding: unsafeTypeBinding("Foo"),
                type: genericTypeEliminator({
                    arguments: [booleanTypeLiteral(undefined)],
                    function: unsafeTypeReference("Bar"),
                }),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });
});
