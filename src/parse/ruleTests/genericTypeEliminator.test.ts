import {
    DenormalizedAst,
    booleanTypeLiteral,
    floatTypeLiteral,
    genericTypeConstructor,
    genericTypeEliminator,
    productType,
    stringTypeLiteral,
    unsafeTypeBinding,
    unsafeTypeReference,
} from "@flock/ast";

import { Parser } from "../parser";

describe("genericTypeEliminator", () => {
    const parser = new Parser("genericTypeEliminator");

    it("parses the generic type eliminator on a reference with no arguments", () => {
        const actual = parser.parse("(Foo)").root().denormalize().anonymize();

        const expected = new DenormalizedAst(
            genericTypeEliminator({
                function: unsafeTypeReference("Foo"),
                arguments: [],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses the generic type eliminator on a reference with several arguments", () => {
        const actual = parser
            .parse("(Foo Boolean [* Bar String *])")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            genericTypeEliminator({
                function: unsafeTypeReference("Foo"),
                arguments: [
                    booleanTypeLiteral(undefined),
                    productType([
                        unsafeTypeReference("Bar"),
                        stringTypeLiteral(undefined),
                    ]),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses the generic type eliminator on a generic type constructor with no arguments", () => {
        const actual = parser
            .parse("([^ => Boolean ^])")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            genericTypeEliminator({
                function: genericTypeConstructor({
                    codomainType: booleanTypeLiteral(undefined),
                    domainBindings: [],
                }),
                arguments: [],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses the generic type eliminator on a generic type constructor with several arguments", () => {
        const actual = parser
            .parse("([^ Foo Bar Baz => Foo ^] [* Boolean String *] Qux Float)")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            genericTypeEliminator({
                function: genericTypeConstructor({
                    codomainType: unsafeTypeReference("Foo"),
                    domainBindings: [
                        unsafeTypeBinding("Foo"),
                        unsafeTypeBinding("Bar"),
                        unsafeTypeBinding("Baz"),
                    ],
                }),
                arguments: [
                    productType([
                        booleanTypeLiteral(undefined),
                        stringTypeLiteral(undefined),
                    ]),
                    unsafeTypeReference("Qux"),
                    floatTypeLiteral(undefined),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });
});
