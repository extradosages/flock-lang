import {
    DenormalizedAst,
    dBooleanType,
    dGenericTypeConstructor,
    dProductType,
    dStringType,
    dSumType,
    dTypeBinding,
    dTypeReference,
} from "../../ast";
import { Parser } from "../parser";

describe("genericTypeConstructor", () => {
    const parser = new Parser("genericTypeConstructor");

    it("parses a generic type constructor with only a codomain type", () => {
        const actual = parser
            .parse("[^ => [* Boolean String *] ^]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dGenericTypeConstructor({
                codomainType: dProductType({
                    components: [
                        dBooleanType(undefined),
                        dStringType(undefined),
                    ],
                }),
                domainTypeBindings: [],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a generic type constructor with a single domain binding", () => {
        const actual = parser
            .parse("[^ Foo => [+ Foo String +] ^]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dGenericTypeConstructor({
                codomainType: dSumType({
                    components: [dTypeReference("Foo"), dStringType(undefined)],
                }),
                domainTypeBindings: [dTypeBinding("Foo")],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a generic type constructor with several domain bindings", () => {
        const actual = parser
            .parse("[^ Foo Bar Baz => Baz ^]")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dGenericTypeConstructor({
                codomainType: dTypeReference("Baz"),
                domainTypeBindings: [
                    dTypeBinding("Foo"),
                    dTypeBinding("Bar"),
                    dTypeBinding("Baz"),
                ],
            }),
        ).anonymize();
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
