import {
    DenormalizedAst,
    dBooleanType,
    dFloatType,
    dGenericTypeConstructor,
    dGenericTypeEliminator,
    dProductType,
    dStringType,
    dTypeBinding,
    dTypeReference,
} from "../../ast";
import { Parser } from "../parser";

describe("genericTypeEliminator", () => {
    const parser = new Parser("genericTypeEliminator");

    it("parses the generic type eliminator on a reference with no arguments", () => {
        const actual = parser.parse("(Foo)").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dGenericTypeEliminator({
                genericType: dTypeReference("Foo"),
                arguments: [],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses the generic type eliminator on a reference with several arguments", () => {
        const actual = parser
            .parse("(Foo Boolean [* Bar String *])")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dGenericTypeEliminator({
                genericType: dTypeReference("Foo"),
                arguments: [
                    dBooleanType(undefined),
                    dProductType({
                        components: [
                            dTypeReference("Bar"),
                            dStringType(undefined),
                        ],
                    }),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses the generic type eliminator on a generic type constructor with no arguments", () => {
        const actual = parser
            .parse("([^ => Boolean ^])")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dGenericTypeEliminator({
                genericType: dGenericTypeConstructor({
                    codomainType: dBooleanType(undefined),
                    domainTypeBindings: [],
                }),
                arguments: [],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses the generic type eliminator on a generic type constructor with several arguments", () => {
        const actual = parser
            .parse("([^ Foo Bar Baz => Foo ^] [* Boolean String *] Qux Float)")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dGenericTypeEliminator({
                genericType: dGenericTypeConstructor({
                    codomainType: dTypeReference("Foo"),
                    domainTypeBindings: [
                        dTypeBinding("Foo"),
                        dTypeBinding("Bar"),
                        dTypeBinding("Baz"),
                    ],
                }),
                arguments: [
                    dProductType({
                        components: [
                            dBooleanType(undefined),
                            dStringType(undefined),
                        ],
                    }),
                    dTypeReference("Qux"),
                    dFloatType(undefined),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });
});
