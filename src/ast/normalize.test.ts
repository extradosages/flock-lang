import { anonymize } from "./anonymize";
import { DenormalizedNode, Edge, NormalizedNode } from "./ast";
import { id } from "./id";
import { normalize } from "./normalize";

describe("normalize", () => {
    const domainNode1Id = id();
    const denormalizedDomainNode1: DenormalizedNode<"booleanType"> = {
        data: { dimensionality: "empty" },
        id: domainNode1Id,
        kind: "booleanType",
    };
    const normalizedDomainNode1: NormalizedNode<"booleanType"> = {
        data: { dimensionality: "empty" },
        id: domainNode1Id,
        kind: "booleanType",
    };

    const productNode1Id = id();
    const denormalizedProductNode1: DenormalizedNode<"stringType"> = {
        data: { dimensionality: "empty" },
        id: productNode1Id,
        kind: "stringType",
    };
    const normalizedProductNode1: NormalizedNode<"stringType"> = {
        data: { dimensionality: "empty" },
        id: productNode1Id,
        kind: "stringType",
    };

    const productNode2Id = id();
    const denormalizedProductNode2: DenormalizedNode<"booleanType"> = {
        data: { dimensionality: "empty" },
        id: productNode2Id,
        kind: "booleanType",
    };
    const normalizedProductNode2: NormalizedNode<"booleanType"> = {
        data: { dimensionality: "empty" },
        id: productNode2Id,
        kind: "booleanType",
    };

    const domainNode2Id = id();
    const domainNode2: DenormalizedNode<"productType"> = {
        data: {
            dimensionality: "relational",
            value: {
                components: [
                    denormalizedProductNode1,
                    denormalizedProductNode2,
                ],
            },
        },
        id: domainNode2Id,
        kind: "productType",
    };
    const normalizedDomainNode2: NormalizedNode<"productType"> = {
        data: { dimensionality: "relational" },
        id: domainNode2Id,
        kind: "productType",
    };
    const domainNode2ComponentsEdges: Array<Edge<"productType", "components">> =
        [
            {
                id: id(),
                index: 0,
                kind: "components",
                sourceId: domainNode2Id,
                targetId: productNode1Id,
                sourceKind: "productType",
                targetKind: "stringType",
            },
            {
                id: id(),
                index: 1,
                kind: "components",
                sourceId: domainNode2Id,
                targetId: productNode2Id,
                sourceKind: "productType",
                targetKind: "booleanType",
            },
        ] as const satisfies Array<Record<string, unknown>>;

    const codomainNodeId = id();
    const denormalizedCodomainNode: DenormalizedNode<"stringType"> = {
        data: { dimensionality: "empty" },
        id: codomainNodeId,
        kind: "stringType",
    };
    const normalizedCodomainNode: NormalizedNode<"stringType"> = {
        data: { dimensionality: "empty" },
        id: codomainNodeId,
        kind: "stringType",
    };

    const functionTypeNodeId = id();
    const denormalizedFunctionTypeNode: DenormalizedNode<"functionType"> = {
        data: {
            dimensionality: "relational",
            value: {
                codomain: denormalizedCodomainNode,
                domains: [denormalizedDomainNode1, domainNode2],
            },
        },
        id: functionTypeNodeId,
        kind: "functionType",
    };
    const normalizedFunctionTypeNode: NormalizedNode<"functionType"> = {
        data: { dimensionality: "relational" },
        id: functionTypeNodeId,
        kind: "functionType",
    };
    const functionTypeNodeDomainsEdges: Array<Edge<"functionType", "domains">> =
        [
            {
                id: id(),
                index: 0,
                kind: "domains",
                sourceId: functionTypeNodeId,
                targetId: domainNode1Id,
                sourceKind: "functionType",
                targetKind: "booleanType",
            },
            {
                id: id(),
                index: 1,
                kind: "domains",
                sourceId: functionTypeNodeId,
                targetId: domainNode2Id,
                sourceKind: "functionType",
                targetKind: "productType",
            },
        ] as const satisfies Array<Record<string, unknown>>;
    const functionTypeNodeCodomainEdges: Array<
        Edge<"functionType", "codomain">
    > = [
        {
            id: id(),
            index: undefined,
            kind: "codomain",
            sourceId: functionTypeNodeId,
            targetId: codomainNodeId,
            sourceKind: "functionType",
            targetKind: "stringType",
        },
    ] as const satisfies Array<Record<string, unknown>>;

    const actual = normalize(denormalizedFunctionTypeNode);

    it("produces the correct nodes", () => {
        const actualNodes = actual.nodes;
        actualNodes.sort((a, b) => a.id.localeCompare(b.id));
        const expectedNodes = [
            normalizedDomainNode1,
            normalizedProductNode1,
            normalizedProductNode2,
            normalizedDomainNode2,
            normalizedCodomainNode,
            normalizedFunctionTypeNode,
        ];
        expectedNodes.sort((a, b) => a.id.localeCompare(b.id));
        expect(actualNodes).toStrictEqual(expectedNodes);
    });

    it("produces the correct edges", () => {
        const actualEdges = actual.edges.map(anonymize);
        actualEdges.sort((a, b) =>
            JSON.stringify(a).localeCompare(JSON.stringify(b)),
        );
        const expectedEdges = (
            [
                ...domainNode2ComponentsEdges,
                ...functionTypeNodeDomainsEdges,
                ...functionTypeNodeCodomainEdges,
            ] as Array<{ id: string }>
        ).map(anonymize);
        expectedEdges.sort((a, b) =>
            JSON.stringify(a).localeCompare(JSON.stringify(b)),
        );
        expect(actualEdges).toStrictEqual(expectedEdges);
    });
});
