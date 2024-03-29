import {
    DenormalizedAst,
    booleanTermLiteral,
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
    unsafeTermBinding,
    unsafeTermReference,
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
                binding: unsafeTermBinding("foo"),
                term: booleanTermLiteral(true),
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
                binding: unsafeTermBinding("foo"),
                term: booleanTermLiteral(true),
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
                binding: unsafeTermBinding("foo"),
                term: productTermConstructor([
                    booleanTermLiteral(true),
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
                binding: unsafeTermBinding("foo"),
                term: functionTermEliminator({
                    arguments: [booleanTermLiteral(true)],
                    function: unsafeTermReference("not"),
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
                binding: unsafeTermBinding("foo"),
                term: lambdaConstructor({
                    codomainTerm: functionTermEliminator({
                        arguments: [
                            unsafeTermReference("bar"),
                            stringTermLiteral("true"),
                            stringTermLiteral("false"),
                        ],
                        function: unsafeTermReference("if-then-else"),
                    }),
                    domainBindings: [unsafeTermBinding("bar")],
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
                binding: unsafeTermBinding("not-is-equal"),
                term: lambdaConstructor({
                    codomainTerm: functionTermEliminator({
                        arguments: [
                            functionTermEliminator({
                                arguments: [
                                    unsafeTermReference("term1"),
                                    unsafeTermReference("term2"),
                                ],
                                function: unsafeTermReference("is-equal"),
                            }),
                        ],
                        function: unsafeTermReference("not"),
                    }),
                    domainBindings: [
                        unsafeTermBinding("term1"),
                        unsafeTermBinding("term2"),
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
                binding: unsafeTermBinding("foo"),
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
                binding: unsafeTermBinding("foo"),
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
                binding: unsafeTermBinding("foo"),
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
                binding: unsafeTermBinding("is-equal"),
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
