import {
    DenormalizedAst,
    booleanTypeLiteral,
    clientImplementation,
    floatTypeLiteral,
    functionTermEliminator,
    functionType,
    integerTypeLiteral,
    lambdaConstructor,
    library,
    sumType,
    termDefinition,
    typeDefinition,
    termBinding,
    termReference,
    unsafeTypeBinding,
} from "@flock/ast";

import { Parser } from "../parser";

describe("library", () => {
    const parser = new Parser("library");

    it("parses an empty library", () => {
        const actual = parser.parse("").root().denormalize().anonymize();

        const expected = new DenormalizedAst(
            library({ termDefinitions: [], typeDefinitions: [] }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a library with only newlines", () => {
        const actual = parser
            .parse("\n\n\n\n")
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            library({ termDefinitions: [], typeDefinitions: [] }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a small library", () => {
        const actual = parser
            .parse(
                "defterm not:[^ Boolean -> Boolean ^] client\ndefterm or:[^ Boolean Boolean -> Boolean ^] [^ left-prop right-prop -> (not (and (not left-prop) (not right-prop))) ^]\ndeftype Number:Type [+ Integer Float +]",
            )
            .root()
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            library({
                termDefinitions: [
                    termDefinition({
                        binding: termBinding("not"),
                        term: clientImplementation(undefined),
                        type: functionType({
                            codomain: booleanTypeLiteral(undefined),
                            domains: [booleanTypeLiteral(undefined)],
                        }),
                    }),
                    termDefinition({
                        binding: termBinding("or"),
                        term: lambdaConstructor({
                            codomainTerm: functionTermEliminator({
                                arguments: [
                                    functionTermEliminator({
                                        arguments: [
                                            functionTermEliminator({
                                                arguments: [
                                                    termReference("left-prop"),
                                                ],
                                                function: termReference("not"),
                                            }),
                                            functionTermEliminator({
                                                arguments: [
                                                    termReference("right-prop"),
                                                ],
                                                function: termReference("not"),
                                            }),
                                        ],
                                        function: termReference("and"),
                                    }),
                                ],
                                function: termReference("not"),
                            }),
                            domainBindings: [
                                termBinding("left-prop"),
                                termBinding("right-prop"),
                            ],
                        }),
                        type: functionType({
                            codomain: booleanTypeLiteral(undefined),
                            domains: [
                                booleanTypeLiteral(undefined),
                                booleanTypeLiteral(undefined),
                            ],
                        }),
                    }),
                ],
                typeDefinitions: [
                    typeDefinition({
                        binding: unsafeTypeBinding("Number"),
                        type: sumType([
                            integerTypeLiteral(undefined),
                            floatTypeLiteral(undefined),
                        ]),
                    }),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });
});
