import { anonymizeDenormalizedNode } from "../anonymize";
import { denormalizedNodeConstructor } from "./utils";

describe("denormalizedNodeConstructor", () => {
    it("works with a node with empty data", () => {
        const constructor = denormalizedNodeConstructor("booleanType");

        const actual = anonymizeDenormalizedNode(constructor(undefined));
        const expected = {
            data: { dimensionality: "empty" },
            kind: "booleanType",
        };

        expect(actual).toStrictEqual(expected);
    });

    it("works with a node with scalar data", () => {
        const constructor = denormalizedNodeConstructor("booleanTerm");

        const actual = anonymizeDenormalizedNode(constructor(true));
        const expected = {
            data: { dimensionality: "scalar", value: true },
            kind: "booleanTerm",
        };

        expect(actual).toStrictEqual(expected);
    });

    it("works with a node with relational data", () => {
        const codomainConstructor = denormalizedNodeConstructor("booleanType");
        const codomain = codomainConstructor(undefined);

        const domain0Constructor = denormalizedNodeConstructor("booleanType");
        const domain0 = domain0Constructor(undefined);
        const domain1Constructor = denormalizedNodeConstructor("booleanType");
        const domain1 = domain1Constructor(undefined);
        const domains = [domain0, domain1];

        const constructor = denormalizedNodeConstructor("functionType");

        const actual = anonymizeDenormalizedNode(
            constructor({
                codomain,
                domains,
            }),
        );
        const expected = {
            data: {
                dimensionality: "relational",
                value: {
                    codomain: {
                        data: { dimensionality: "empty" },
                        kind: "booleanType",
                    },
                    domains: [
                        {
                            data: { dimensionality: "empty" },
                            kind: "booleanType",
                        },
                        {
                            data: { dimensionality: "empty" },
                            kind: "booleanType",
                        },
                    ],
                },
            },
            kind: "functionType",
        };

        expect(actual).toStrictEqual(expected);
    });
});
