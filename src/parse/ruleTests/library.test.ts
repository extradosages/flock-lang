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
    unsafeTermBinding,
    unsafeTermReference,
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
                        binding: unsafeTermBinding("not"),
                        term: clientImplementation(undefined),
                        type: functionType({
                            codomain: booleanTypeLiteral(undefined),
                            domains: [booleanTypeLiteral(undefined)],
                        }),
                    }),
                    termDefinition({
                        binding: unsafeTermBinding("or"),
                        term: lambdaConstructor({
                            codomainTerm: functionTermEliminator({
                                arguments: [
                                    functionTermEliminator({
                                        arguments: [
                                            functionTermEliminator({
                                                arguments: [
                                                    unsafeTermReference(
                                                        "left-prop",
                                                    ),
                                                ],
                                                function:
                                                    unsafeTermReference("not"),
                                            }),
                                            functionTermEliminator({
                                                arguments: [
                                                    unsafeTermReference(
                                                        "right-prop",
                                                    ),
                                                ],
                                                function:
                                                    unsafeTermReference("not"),
                                            }),
                                        ],
                                        function: unsafeTermReference("and"),
                                    }),
                                ],
                                function: unsafeTermReference("not"),
                            }),
                            domainBindings: [
                                unsafeTermBinding("left-prop"),
                                unsafeTermBinding("right-prop"),
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
