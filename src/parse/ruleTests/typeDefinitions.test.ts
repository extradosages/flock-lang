import {
    anonymize,
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
        const ast = parser.parse("deftype Foo:Type Boolean");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            typeDefinition({
                binding: unsafeTypeBinding("Foo"),
                type: booleanTypeLiteral(undefined),
            }),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a type definition with a type composite body", () => {
        const ast = parser.parse("deftype Foo:Type [* Boolean String *]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            typeDefinition({
                binding: unsafeTypeBinding("Foo"),
                type: productType([
                    booleanTypeLiteral(undefined),
                    stringTypeLiteral(undefined),
                ]),
            }),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a type definition with a function type body", () => {
        const ast = parser.parse("deftype Foo:Type [^ Boolean -> String ^]");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            typeDefinition({
                binding: unsafeTypeBinding("Foo"),
                type: functionType({
                    codomain: stringTypeLiteral(undefined),
                    domains: [booleanTypeLiteral(undefined)],
                }),
            }),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a type definition with a generic type constructor body", () => {
        const ast = parser.parse(
            "deftype Foo:Type [^ Bar => [^ Bar -> Boolean ^] ^]",
        );

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
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
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses a type definition with a generic type eliminator body", () => {
        const ast = parser.parse("deftype Foo:Type (Bar Boolean)");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            typeDefinition({
                binding: unsafeTypeBinding("Foo"),
                type: genericTypeEliminator({
                    arguments: [booleanTypeLiteral(undefined)],
                    function: unsafeTypeReference("Bar"),
                }),
            }),
        );
        expect(actual).toStrictEqual(expected);
    });
});
