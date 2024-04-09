import {
    DenormalizedAst,
    dBooleanType,
    dClientImplementation,
    dFloatType,
    dFunctionTermEliminator,
    dFunctionType,
    dIntegerType,
    dLambdaConstructor,
    dLibrary,
    dSumType,
    dTermBinding,
    dTermDefinition,
    dTermReference,
    dTypeBinding,
    dTypeDefinition,
} from "../../ast";
import { Parser } from "../parser";

describe("library", () => {
    const parser = new Parser("library");

    it("parses an empty library", () => {
        const actual = parser.parse("").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dLibrary({ termDefinitions: [], typeDefinitions: [] }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a library with only newlines", () => {
        const actual = parser.parse("\n\n\n\n").denormalize().anonymize();

        const expected = new DenormalizedAst(
            dLibrary({ termDefinitions: [], typeDefinitions: [] }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });

    it("parses a small library", () => {
        const actual = parser
            .parse(
                "defterm not:[^ Boolean -> Boolean ^] client\ndefterm or:[^ Boolean Boolean -> Boolean ^] [^ left-prop right-prop -> (not (and (not left-prop) (not right-prop))) ^]\ndeftype Number:Type [+ Integer Float +]",
            )
            .denormalize()
            .anonymize();

        const expected = new DenormalizedAst(
            dLibrary({
                termDefinitions: [
                    dTermDefinition({
                        binding: dTermBinding("not"),
                        term: dClientImplementation(undefined),
                        type: dFunctionType({
                            codomain: dBooleanType(undefined),
                            domains: [dBooleanType(undefined)],
                        }),
                    }),
                    dTermDefinition({
                        binding: dTermBinding("or"),
                        term: dLambdaConstructor({
                            codomainTerm: dFunctionTermEliminator({
                                arguments: [
                                    dFunctionTermEliminator({
                                        arguments: [
                                            dFunctionTermEliminator({
                                                arguments: [
                                                    dTermReference("left-prop"),
                                                ],
                                                function: dTermReference("not"),
                                            }),
                                            dFunctionTermEliminator({
                                                arguments: [
                                                    dTermReference(
                                                        "right-prop",
                                                    ),
                                                ],
                                                function: dTermReference("not"),
                                            }),
                                        ],
                                        function: dTermReference("and"),
                                    }),
                                ],
                                function: dTermReference("not"),
                            }),
                            domainTermBindings: [
                                dTermBinding("left-prop"),
                                dTermBinding("right-prop"),
                            ],
                        }),
                        type: dFunctionType({
                            codomain: dBooleanType(undefined),
                            domains: [
                                dBooleanType(undefined),
                                dBooleanType(undefined),
                            ],
                        }),
                    }),
                ],
                typeDefinitions: [
                    dTypeDefinition({
                        binding: dTypeBinding("Number"),
                        type: dSumType({
                            components: [
                                dIntegerType(undefined),
                                dFloatType(undefined),
                            ],
                        }),
                    }),
                ],
            }),
        ).anonymize();
        expect(actual).toStrictEqual(expected);
    });
});
