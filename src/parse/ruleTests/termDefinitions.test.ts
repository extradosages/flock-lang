import {
    DenormalizedAst,
    booleanTerm,
    booleanTypeLiteral,
    clientImplementation,
    functionTermEliminator,
    functionType,
    genericTypeConstructor,
    lambdaConstructor,
    productTermConstructor,
    productType,
    stringTermLiteral,
    stringTypeLiteral,
    termDefinition,
    termBinding,
    termReference,
    unsafeTypeBinding,
    unsafeTypeReference,
} from "@flock/ast";

import { Parser } from "../parser";

describe("termDefinition", () => {
    const parser = new Parser("termDefinition");

    it("parses a a term definition with a literal type and a term literal body", () => {
        const actual = parser
            .parse("defterm foo:Boolean true")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            termDefinition({
                binding: termBinding("foo"),
                term: booleanTerm(true),
                type: booleanTypeLiteral(undefined),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a term definition with a generic type and a term literal body", () => {
        const actual = parser
            .parse("defterm foo:[^ Foo => Boolean ^] true")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            termDefinition({
                binding: termBinding("foo"),
                term: booleanTerm(true),
                type: genericTypeConstructor({
                    codomainType: booleanTypeLiteral(undefined),
                    domainBindings: [unsafeTypeBinding("Foo")],
                }),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a term definition with a composite type and a composite term body", () => {
        const actual = parser
            .parse('defterm foo:[* Boolean String *] [* true "bar" *]')
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            termDefinition({
                binding: termBinding("foo"),
                term: productTermConstructor([
                    booleanTerm(true),
                    stringTermLiteral("bar"),
                ]),
                type: productType([
                    booleanTypeLiteral(undefined),
                    stringTypeLiteral(undefined),
                ]),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a term definition with a function eliminator body", () => {
        const actual = parser
            .parse("defterm foo:Boolean (not true)")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            termDefinition({
                binding: termBinding("foo"),
                term: functionTermEliminator({
                    arguments: [booleanTerm(true)],
                    function: termReference("not"),
                }),
                type: booleanTypeLiteral(undefined),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a term definition with a lambda constructor body", () => {
        const actual = parser
            .parse(
                'defterm foo:[^ Boolean -> String ^] [^ bar -> (if-then-else bar "true" "false") ^]',
            )
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            termDefinition({
                binding: termBinding("foo"),
                term: lambdaConstructor({
                    codomainTerm: functionTermEliminator({
                        arguments: [
                            termReference("bar"),
                            stringTermLiteral("true"),
                            stringTermLiteral("false"),
                        ],
                        function: termReference("if-then-else"),
                    }),
                    domainBindings: [termBinding("bar")],
                }),
                type: functionType({
                    codomain: stringTypeLiteral(undefined),
                    domains: [booleanTypeLiteral(undefined)],
                }),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a term definition with a generic type and a lambda constructor body", () => {
        const actual = parser
            .parse(
                "defterm not-is-equal:[^ T => [^ T T -> Boolean ^] ^] [^ term1 term2 -> (not (is-equal term1 term2)) ^]",
            )
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            termDefinition({
                binding: termBinding("not-is-equal"),
                term: lambdaConstructor({
                    codomainTerm: functionTermEliminator({
                        arguments: [
                            functionTermEliminator({
                                arguments: [
                                    termReference("term1"),
                                    termReference("term2"),
                                ],
                                function: termReference("is-equal"),
                            }),
                        ],
                        function: termReference("not"),
                    }),
                    domainBindings: [
                        termBinding("term1"),
                        termBinding("term2"),
                    ],
                }),
                type: genericTypeConstructor({
                    codomainType: functionType({
                        codomain: booleanTypeLiteral(undefined),
                        domains: [
                            unsafeTypeReference("T"),
                            unsafeTypeReference("T"),
                        ],
                    }),
                    domainBindings: [unsafeTypeBinding("T")],
                }),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a term definition with a literal type and a client implementation body", () => {
        const actual = parser
            .parse("defterm foo:Boolean client")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            termDefinition({
                binding: termBinding("foo"),
                term: clientImplementation(undefined),
                type: booleanTypeLiteral(undefined),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a term definition with a composite type and a client implementation body", () => {
        const actual = parser
            .parse("defterm foo:[* Boolean String *] client")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            termDefinition({
                binding: termBinding("foo"),
                term: clientImplementation(undefined),
                type: productType([
                    booleanTypeLiteral(undefined),
                    stringTypeLiteral(undefined),
                ]),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a term definition with a function type and a client implementation body", () => {
        const actual = parser
            .parse("defterm foo:[^ Boolean -> String ^] client")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            termDefinition({
                binding: termBinding("foo"),
                term: clientImplementation(undefined),
                type: functionType({
                    codomain: stringTypeLiteral(undefined),
                    domains: [booleanTypeLiteral(undefined)],
                }),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a term definition with a generic type and a client implementation body", () => {
        const actual = parser
            .parse("defterm is-equal:[^ T => [^ T T -> Boolean ^] ^] client")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            termDefinition({
                binding: termBinding("is-equal"),
                term: clientImplementation(undefined),
                type: genericTypeConstructor({
                    codomainType: functionType({
                        codomain: booleanTypeLiteral(undefined),
                        domains: [
                            unsafeTypeReference("T"),
                            unsafeTypeReference("T"),
                        ],
                    }),
                    domainBindings: [unsafeTypeBinding("T")],
                }),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });
});
