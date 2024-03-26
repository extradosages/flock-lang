import * as peggy from "peggy";

import { source } from "../parser";
import {
    booleanTypeLiteral,
    floatTypeLiteral,
    functionType,
    productType,
    stringTypeLiteral,
    sumType,
    unsafeTypeReference,
} from "@flock/ast";

describe("functionType", () => {
    const parser = peggy.generate(source, {
        allowedStartRules: ["functionType"],
    });

    it("parses a function type with only a type literal codomain", () => {
        const actual = parser.parse("[^ -> Boolean ^]");
        const expected = functionType({
            codomain: booleanTypeLiteral(undefined),
            domains: [],
        });
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function type with only a type reference codomain", () => {
        const actual = parser.parse("[^ -> Foo ^]");
        const expected = functionType({
            codomain: unsafeTypeReference("Foo"),
            domains: [],
        });
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function type with only a product type codomain", () => {
        const actual = parser.parse("[^ -> [* Boolean Foo *] ^]");
        const expected = functionType({
            codomain: productType([
                booleanTypeLiteral(undefined),
                unsafeTypeReference("Foo"),
            ]),
            domains: [],
        });
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function type with only a sum type codomain", () => {
        const actual = parser.parse("[^ -> [+ Boolean Foo +] ^]");
        const expected = functionType({
            codomain: sumType([
                booleanTypeLiteral(undefined),
                unsafeTypeReference("Foo"),
            ]),
            domains: [],
        });
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function type with only a function type codomain", () => {
        const actual = parser.parse(
            "[^ -> [^ Boolean -> [+ String String +] ^] ^]",
        );
        const expected = functionType({
            codomain: functionType({
                codomain: sumType([
                    stringTypeLiteral(undefined),
                    stringTypeLiteral(undefined),
                ]),
                domains: [booleanTypeLiteral(undefined)],
            }),
            domains: [],
        });
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function type with several type literal domains", () => {
        const actual = parser.parse(
            "[^ Boolean Boolean String -> [* Foo String *] ^]",
        );
        const expected = functionType({
            codomain: productType([
                unsafeTypeReference("Foo"),
                stringTypeLiteral(undefined),
            ]),
            domains: [
                booleanTypeLiteral(undefined),
                booleanTypeLiteral(undefined),
                stringTypeLiteral(undefined),
            ],
        });
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function type with several type reference domains", () => {
        const actual = parser.parse("[^ Foo Foo Bar -> [* Baz Bar *] ^]");
        const expected = functionType({
            codomain: productType([
                unsafeTypeReference("Baz"),
                unsafeTypeReference("Bar"),
            ]),
            domains: [
                unsafeTypeReference("Foo"),
                unsafeTypeReference("Foo"),
                unsafeTypeReference("Bar"),
            ],
        });
        expect(actual).toStrictEqual(expected);
    });

    it("parses a function type with several product type, sum type, and function type domains", () => {
        const actual = parser.parse(
            "[^ [* Foo String *] [+ Boolean +] [^ Boolean -> [+ String Bar +] ^] -> Float ^]",
        );
        const expected = functionType({
            codomain: floatTypeLiteral(undefined),
            domains: [
                productType([
                    unsafeTypeReference("Foo"),
                    stringTypeLiteral(undefined),
                ]),
                sumType([booleanTypeLiteral(undefined)]),
                functionType({
                    codomain: sumType([
                        stringTypeLiteral(undefined),
                        unsafeTypeReference("Bar"),
                    ]),
                    domains: [booleanTypeLiteral(undefined)],
                }),
            ],
        });
        expect(actual).toStrictEqual(expected);
    });
});
