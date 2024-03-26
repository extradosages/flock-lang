import * as peggy from "peggy";

import { source } from "../parser";
import {
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

describe("typeDefinition", () => {
    const parser = peggy.generate(source, {
        allowedStartRules: ["typeDefinition"],
    });

    it("parses a type definition with a type literal body", () => {
        const actual = parser.parse("deftype Foo:Type Boolean");
        const expected = typeDefinition({
            binding: unsafeTypeBinding("Foo"),
            type: booleanTypeLiteral(undefined),
        });
        expect(actual).toStrictEqual(expected);
    });

    it("parses a type definition with a type composite body", () => {
        const actual = parser.parse("deftype Foo:Type [* Boolean String *]");
        const expected = typeDefinition({
            binding: unsafeTypeBinding("Foo"),
            type: productType([
                booleanTypeLiteral(undefined),
                stringTypeLiteral(undefined),
            ]),
        });
        expect(actual).toStrictEqual(expected);
    });

    it("parses a type definition with a function type body", () => {
        const actual = parser.parse("deftype Foo:Type [^ Boolean -> String ^]");
        const expected = typeDefinition({
            binding: unsafeTypeBinding("Foo"),
            type: functionType({
                codomain: stringTypeLiteral(undefined),
                domains: [booleanTypeLiteral(undefined)],
            }),
        });
        expect(actual).toStrictEqual(expected);
    });

    it("parses a type definition with a generic type constructor body", () => {
        const actual = parser.parse(
            "deftype Foo:Type [^ Bar => [^ Bar -> Boolean ^] ^]",
        );
        const expected = typeDefinition({
            binding: unsafeTypeBinding("Foo"),
            type: genericTypeConstructor({
                codomainType: functionType({
                    codomain: booleanTypeLiteral(undefined),
                    domains: [unsafeTypeReference("Bar")],
                }),
                domainBindings: [unsafeTypeBinding("Bar")],
            }),
        });
        expect(actual).toStrictEqual(expected);
    });

    it("parses a type definition with a generic type eliminator body", () => {
        const actual = parser.parse("deftype Foo:Type (Bar Boolean)");
        const expected = typeDefinition({
            binding: unsafeTypeBinding("Foo"),
            type: genericTypeEliminator({
                arguments: [booleanTypeLiteral(undefined)],
                function: unsafeTypeReference("Bar"),
            }),
        });
        expect(actual).toStrictEqual(expected);
    });
});
