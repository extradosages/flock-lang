import * as peggy from "peggy";

import {
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

import { source } from "../parser";

describe("library", () => {
    const parser = peggy.generate(source, { allowedStartRules: ["library"] });

    it("parses an empty library", () => {
        const actual = parser.parse("");
        const expected = library({ termDefinitions: [], typeDefinitions: [] });
        expect(actual).toStrictEqual(expected);
    });

    it("parses a library with only newlines", () => {
        const actual = parser.parse("\n\n\n\n");
        const expected = library({ termDefinitions: [], typeDefinitions: [] });
        expect(actual).toStrictEqual(expected);
    });

    it("parses a small library", () => {
        const actual = parser.parse(
            "defterm not:[^ Boolean -> Boolean ^] client\ndefterm or:[^ Boolean Boolean -> Boolean ^] [^ left-prop right-prop -> (not (and (not left-prop) (not right-prop))) ^]\ndeftype Number:Type [+ Integer Float +]",
        );
        const expected = library({
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
        });
        expect(actual).toStrictEqual(expected);
    });
});
