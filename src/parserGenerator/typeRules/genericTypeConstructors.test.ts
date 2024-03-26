import * as peggy from "peggy";

import { source } from "../parser";
import {
    booleanTypeLiteral,
    genericTypeConstructor,
    productType,
    stringTypeLiteral,
    sumType,
    unsafeTypeBinding,
    unsafeTypeReference,
} from "@flock/ast";

describe("genericTypeConstructor", () => {
    const parser = peggy.generate(source, {
        allowedStartRules: ["genericTypeConstructor"],
    });

    it("parses a generic type constructor with only a codomain type", () => {
        const actual = parser.parse("[^ => [* Boolean String *] ^]");
        const expected = genericTypeConstructor({
            codomainType: productType([
                booleanTypeLiteral(undefined),
                stringTypeLiteral(undefined),
            ]),
            domainBindings: [],
        });
        expect(actual).toStrictEqual(expected);
    });

    it("parses a generic type constructor with a single domain binding", () => {
        const actual = parser.parse("[^ Foo => [+ Foo String +] ^]");
        const expected = genericTypeConstructor({
            codomainType: sumType([
                unsafeTypeReference("Foo"),
                stringTypeLiteral(undefined),
            ]),
            domainBindings: [unsafeTypeBinding("Foo")],
        });
        expect(actual).toStrictEqual(expected);
    });

    it("parses a generic type constructor with several domain bindings", () => {
        const actual = parser.parse("[^ Foo Bar Baz => Baz ^]");
        const expected = genericTypeConstructor({
            codomainType: unsafeTypeReference("Baz"),
            domainBindings: [
                unsafeTypeBinding("Foo"),
                unsafeTypeBinding("Bar"),
                unsafeTypeBinding("Baz"),
            ],
        });
        expect(actual).toStrictEqual(expected);
    });

    it("doesn't parse a constructor with term-cased bindings", () => {
        expect(() => parser.parse("[^ foo Bar => Bar ^]")).toThrow();
    });

    it("doesn't parse a constructor with a type literal as a binding", () => {
        expect(() => parser.parse("[^ Boolean => Boolean ^]")).toThrow();
    });

    it("doesn't parse a constructor with a composite type as a binding", () => {
        expect(() => parser.parse("[^ [* Foo Bar *] => Foo ^]")).toThrow();
    });

    it("doesn't parse a constructor without a codomain", () => {
        expect(() => parser.parse("[^ Foo => ^]")).toThrow();
    });

    it("doesn't parse a constructor with a generic type constructor for a codomain", () => {
        expect(() => parser.parse("[^ Foo => [^ Bar => Bar ^] ^]")).toThrow();
    });

    it("doesn't parse a constructor missing the separator", () => {
        expect(() => parser.parse("[^ Foo Foo ^]")).toThrow();
    });
});
