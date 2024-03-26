import * as peggy from "peggy";

import {
    booleanTypeLiteral,
    floatTypeLiteral,
    genericTypeConstructor,
    genericTypeEliminator,
    productType,
    stringTypeLiteral,
    unsafeTypeBinding,
    unsafeTypeReference,
} from "@flock/ast";

import { source } from "../parser";

describe("genericTypeEliminator", () => {
    const parser = peggy.generate(source, {
        allowedStartRules: ["genericTypeEliminator"],
    });

    it("parses the generic type eliminator on a reference with no arguments", () => {
        const actual = parser.parse("(Foo)");
        const expected = genericTypeEliminator({
            function: unsafeTypeReference("Foo"),
            arguments: [],
        });
        expect(actual).toStrictEqual(expected);
    });

    it("parses the generic type eliminator on a reference with several arguments", () => {
        const actual = parser.parse("(Foo Boolean [* Bar String *])");
        const expected = genericTypeEliminator({
            function: unsafeTypeReference("Foo"),
            arguments: [
                booleanTypeLiteral(undefined),
                productType([
                    unsafeTypeReference("Bar"),
                    stringTypeLiteral(undefined),
                ]),
            ],
        });
        expect(actual).toStrictEqual(expected);
    });

    it("parses the generic type eliminator on a generic type constructor with no arguments", () => {
        const actual = parser.parse("([^ => Boolean ^])");
        const expected = genericTypeEliminator({
            function: genericTypeConstructor({
                codomainType: booleanTypeLiteral(undefined),
                domainBindings: [],
            }),
            arguments: [],
        });
        expect(actual).toStrictEqual(expected);
    });

    it("parses the generic type eliminator on a generic type constructor with several arguments", () => {
        const actual = parser.parse(
            "([^ Foo Bar Baz => Foo ^] [* Boolean String *] Qux Float)",
        );
        const expected = genericTypeEliminator({
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
        });
        expect(actual).toStrictEqual(expected);
    });
});
