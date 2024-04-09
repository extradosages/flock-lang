import { anonymizeDenormalizedNode } from "./anonymize";
import { DenormalizedNode } from "./ast";
import { id } from "../id";

describe("anonymizeDenormalizedNode", () => {
    it("anonymizes a node with empty data", () => {
        const node: DenormalizedNode<"booleanType"> = {
            data: { dimensionality: "empty" },
            id: id(),
            kind: "booleanType",
        };

        const actual = anonymizeDenormalizedNode(node);
        const { id: _id, ...expected } = node;

        expect(actual).toStrictEqual(expected);
    });

    it("anonymizes a node with scalar data", () => {
        const node: DenormalizedNode<"booleanTerm"> = {
            data: { dimensionality: "scalar", value: true },
            id: id(),
            kind: "booleanTerm",
        };

        const actual = anonymizeDenormalizedNode(node);
        const { id: _id, ...expected } = node;

        expect(actual).toStrictEqual(expected);
    });

    it("anonymizes a node with relational (nested) data", () => {
        const domainNode1: DenormalizedNode<"booleanType"> = {
            data: { dimensionality: "empty" },
            id: id(),
            kind: "booleanType",
        };
        const expectedDomainNode1 = {
            data: { dimensionality: "empty" },
            kind: "booleanType",
        };
        const productNode1: DenormalizedNode<"stringType"> = {
            data: { dimensionality: "empty" },
            id: id(),
            kind: "stringType",
        };
        const expectedProductNode1 = {
            data: { dimensionality: "empty" },
            kind: "stringType",
        };
        const productNode2: DenormalizedNode<"booleanType"> = {
            data: { dimensionality: "empty" },
            id: id(),
            kind: "booleanType",
        };
        const expectedProductNode2 = {
            data: { dimensionality: "empty" },
            kind: "booleanType",
        };
        const domainNode2: DenormalizedNode<"productType"> = {
            data: {
                dimensionality: "relational",
                value: {
                    components: [productNode1, productNode2],
                },
            },
            id: id(),
            kind: "productType",
        };
        const expectedDomainNode2 = {
            data: {
                dimensionality: "relational",
                value: {
                    components: [expectedProductNode1, expectedProductNode2],
                },
            },
            kind: "productType",
        };
        const codomainNode: DenormalizedNode<"stringType"> = {
            data: { dimensionality: "empty" },
            id: id(),
            kind: "stringType",
        };
        const expectedCodomainNode = {
            data: { dimensionality: "empty" },
            kind: "stringType",
        };
        const functionTypeNode: DenormalizedNode<"functionType"> = {
            data: {
                dimensionality: "relational",
                value: {
                    codomain: codomainNode,
                    domains: [domainNode1, domainNode2],
                },
            },
            id: id(),
            kind: "functionType",
        };
        const expected = {
            data: {
                dimensionality: "relational",
                value: {
                    codomain: expectedCodomainNode,
                    domains: [expectedDomainNode1, expectedDomainNode2],
                },
            },
            kind: "functionType",
        };

        const actual = anonymizeDenormalizedNode(functionTypeNode);

        expect(actual).toStrictEqual(expected);
    });
});
