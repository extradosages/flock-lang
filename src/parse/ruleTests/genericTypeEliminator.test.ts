import {
    anonymize,
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
        const ast = parser.parse("(Foo)");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            genericTypeEliminator({
                function: unsafeTypeReference("Foo"),
                arguments: [],
            }),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses the generic type eliminator on a reference with several arguments", () => {
        const ast = parser.parse("(Foo Boolean [* Bar String *])");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
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
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses the generic type eliminator on a generic type constructor with no arguments", () => {
        const ast = parser.parse("([^ => Boolean ^])");

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
            genericTypeEliminator({
                function: genericTypeConstructor({
                    codomainType: booleanTypeLiteral(undefined),
                    domainBindings: [],
                }),
                arguments: [],
            }),
        );
        expect(actual).toStrictEqual(expected);
    });

    it("parses the generic type eliminator on a generic type constructor with several arguments", () => {
        const ast = parser.parse(
            "([^ Foo Bar Baz => Foo ^] [* Boolean String *] Qux Float)",
        );

        const actual = anonymize(ast.denormalizedRoot());
        const expected = anonymize(
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
        );
        expect(actual).toStrictEqual(expected);
    });
});
