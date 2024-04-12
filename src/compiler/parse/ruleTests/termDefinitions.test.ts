import {
    DenormalizedAst,
    dTermDefinition,
    dTermBinding,
    dBooleanTerm,
    dBooleanType,
    dGenericTypeConstructor,
    dTypeBinding,
    dProductTermConstructor,
    dStringTerm,
    dProductType,
    dStringType,
    dFunctionTermEliminator,
    dTermReference,
    dLambdaConstructor,
    dFunctionType,
    dTypeReference,
    dClientImplementation,
} from "../../ast";
import { Parser } from "../parser";

describe("termDefinition", () => {
    const parser = new Parser("termDefinition");

    it("parses a a term definition with a literal type and a term literal body", () => {
        const actual = parser
            .parse("defterm foo:Boolean true")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dTermDefinition({
                binding: dTermBinding("foo"),
                term: dBooleanTerm(true),
                type: dBooleanType(undefined),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a term definition with a generic type and a term literal body", () => {
        const actual = parser
            .parse("defterm foo:[^ Foo => Boolean ^] true")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dTermDefinition({
                binding: dTermBinding("foo"),
                term: dBooleanTerm(true),
                type: dGenericTypeConstructor({
                    codomainType: dBooleanType(undefined),
                    domainTypeBindings: [dTypeBinding("Foo")],
                }),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a term definition with a composite type and a composite term body", () => {
        const actual = parser
            .parse('defterm foo:[* Boolean String *] [* true "bar" *]')
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dTermDefinition({
                binding: dTermBinding("foo"),
                term: dProductTermConstructor({
                    components: [dBooleanTerm(true), dStringTerm("bar")],
                }),
                type: dProductType({
                    components: [
                        dBooleanType(undefined),
                        dStringType(undefined),
                    ],
                }),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a term definition with a function eliminator body", () => {
        const actual = parser
            .parse("defterm foo:Boolean (not true)")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dTermDefinition({
                binding: dTermBinding("foo"),
                term: dFunctionTermEliminator({
                    arguments: [dBooleanTerm(true)],
                    function: dTermReference("not"),
                }),
                type: dBooleanType(undefined),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a term definition with a lambda constructor body", () => {
        const actual = parser
            .parse(
                'defterm foo:[^ Boolean -> String ^] [^ bar -> (if-then-else bar "true" "false") ^]',
            )
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dTermDefinition({
                binding: dTermBinding("foo"),
                term: dLambdaConstructor({
                    codomainTerm: dFunctionTermEliminator({
                        arguments: [
                            dTermReference("bar"),
                            dStringTerm("true"),
                            dStringTerm("false"),
                        ],
                        function: dTermReference("if-then-else"),
                    }),
                    domainTermBindings: [dTermBinding("bar")],
                }),
                type: dFunctionType({
                    codomain: dStringType(undefined),
                    domains: [dBooleanType(undefined)],
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
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dTermDefinition({
                binding: dTermBinding("not-is-equal"),
                term: dLambdaConstructor({
                    codomainTerm: dFunctionTermEliminator({
                        arguments: [
                            dFunctionTermEliminator({
                                arguments: [
                                    dTermReference("term1"),
                                    dTermReference("term2"),
                                ],
                                function: dTermReference("is-equal"),
                            }),
                        ],
                        function: dTermReference("not"),
                    }),
                    domainTermBindings: [
                        dTermBinding("term1"),
                        dTermBinding("term2"),
                    ],
                }),
                type: dGenericTypeConstructor({
                    codomainType: dFunctionType({
                        codomain: dBooleanType(undefined),
                        domains: [dTypeReference("T"), dTypeReference("T")],
                    }),
                    domainTypeBindings: [dTypeBinding("T")],
                }),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a term definition with a literal type and a client implementation body", () => {
        const actual = parser
            .parse("defterm foo:Boolean client")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dTermDefinition({
                binding: dTermBinding("foo"),
                term: dClientImplementation(undefined),
                type: dBooleanType(undefined),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a term definition with a composite type and a client implementation body", () => {
        const actual = parser
            .parse("defterm foo:[* Boolean String *] client")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dTermDefinition({
                binding: dTermBinding("foo"),
                term: dClientImplementation(undefined),
                type: dProductType({
                    components: [
                        dBooleanType(undefined),
                        dStringType(undefined),
                    ],
                }),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a term definition with a function type and a client implementation body", () => {
        const actual = parser
            .parse("defterm foo:[^ Boolean -> String ^] client")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dTermDefinition({
                binding: dTermBinding("foo"),
                term: dClientImplementation(undefined),
                type: dFunctionType({
                    codomain: dStringType(undefined),
                    domains: [dBooleanType(undefined)],
                }),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a term definition with a generic type and a client implementation body", () => {
        const actual = parser
            .parse("defterm is-equal:[^ T => [^ T T -> Boolean ^] ^] client")
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dTermDefinition({
                binding: dTermBinding("is-equal"),
                term: dClientImplementation(undefined),
                type: dGenericTypeConstructor({
                    codomainType: dFunctionType({
                        codomain: dBooleanType(undefined),
                        domains: [dTypeReference("T"), dTypeReference("T")],
                    }),
                    domainTypeBindings: [dTypeBinding("T")],
                }),
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });
});
