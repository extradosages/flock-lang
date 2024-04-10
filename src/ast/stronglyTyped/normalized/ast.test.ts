import { stringify } from "safe-stable-stringify";
import { apply, execPipe, map, objectEntries, objectFrom } from "iter-tools";

import { StrongNodeKind } from "../common";
import { DenormalizedAst, dBooleanType, dFunctionType } from "../denormalized";
import { NormalizedAst } from "./ast";
import { edge, nBooleanType, nFunctionType } from "./constructors";
import { StrongEdge } from "./types";

const sort = (arr: NonNullable<unknown>[]) =>
    arr.sort((left, right) => (stringify(left) > stringify(right) ? -1 : 1));

const standardize = (normalizedAst: NormalizedAst<StrongNodeKind>) =>
    execPipe(
        objectEntries(normalizedAst.anonymize()),
        map(([key, value]) => [key, sort(value)] as const),
        apply(objectFrom),
    );

describe("NormalizedAst", () => {
    describe("`.constructor`", () => {
        it("constructs ast with no nodes", () => {
            const ast = new NormalizedAst("booleanType");

            const actual = ast.graph.nodes().length;
            expect(actual).toBe(0);
        });
    });

    describe("`.addNode`", () => {
        it("adds a node to the graph", () => {
            const ast = new NormalizedAst("booleanType");
            const node = nBooleanType(undefined);
            ast.addNode(node);

            const actual = ast.graph.nodes().length;
            expect(actual).toBe(1);
        });
    });

    describe("`.addEdge`", () => {
        it("adds an edge to the graph", () => {
            const ast = new NormalizedAst("functionType");

            const functionTypeNode = nFunctionType(undefined);
            const codomainNode = nBooleanType(undefined);
            const codomainEdge = edge({
                kind: "codomain",
                sourceId: functionTypeNode.id,
                sourceKind: "functionType",
                targetId: codomainNode.id,
                targetKind: "booleanType",
                index: undefined,
            });

            ast.addNode(functionTypeNode);
            ast.addNode(codomainNode);
            ast.addEdge(codomainEdge);

            const actual = ast.graph.edges().length;
            expect(actual).toBe(1);
        });
    });

    describe("`.root`", () => {
        it("works under trivial circumstances", () => {
            const ast = new NormalizedAst("booleanType");

            const node = nBooleanType(undefined);
            ast.addNode(node);

            const actual = ast.root();
            const expected = node;
            expect(actual).toStrictEqual(expected);
        });

        it("throws an error if the ast has no nodes", () => {
            const ast = new NormalizedAst("booleanType");
            expect(() => ast.root()).toThrow();
        });

        it("throws an error if the ast has multiple root nodes", () => {
            const ast = new NormalizedAst("booleanType");

            ast.addNode(nBooleanType(undefined));
            ast.addNode(nBooleanType(undefined));

            expect(() => ast.root()).toThrow();
        });

        it("throws an error if the root has a different kind from the ast", () => {
            const ast = new NormalizedAst("floatType");

            ast.addNode(nBooleanType(undefined));

            expect(() => ast.root()).toThrow();
        });
    });

    describe("`.denormalize`", () => {
        const functionTypeFixture = (() => {
            const ast = new NormalizedAst("functionType");

            const functionTypeNode = nFunctionType(undefined);
            const domainNode0 = nBooleanType(undefined);
            const domainNode1 = nBooleanType(undefined);
            const codomainNode = nBooleanType(undefined);

            const domainEdge0: StrongEdge<"functionType", "domains"> = edge({
                index: 0,
                kind: "domains",
                sourceId: functionTypeNode.id,
                targetId: domainNode0.id,
                sourceKind: "functionType",
                targetKind: "booleanType",
            });
            const domainEdge1: StrongEdge<"functionType", "domains"> = edge({
                index: 1,
                kind: "domains",
                sourceId: functionTypeNode.id,
                targetId: domainNode1.id,
                sourceKind: "functionType",
                targetKind: "booleanType",
            });
            const codomainEdge: StrongEdge<"functionType", "codomain"> = edge({
                index: undefined,
                kind: "codomain",
                sourceId: functionTypeNode.id,
                targetId: codomainNode.id,
                sourceKind: "functionType",
                targetKind: "booleanType",
            });

            ast.addNode(functionTypeNode);
            ast.addNode(domainNode0);
            ast.addNode(domainNode1);
            ast.addNode(codomainNode);
            ast.addEdge(domainEdge0);
            ast.addEdge(domainEdge1);
            ast.addEdge(codomainEdge);

            return ast;
        })();

        it("denormalizes", () => {
            const actual = functionTypeFixture.denormalize().anonymize();
            const expected = new DenormalizedAst(
                dFunctionType({
                    codomain: dBooleanType(undefined),
                    domains: [dBooleanType(undefined), dBooleanType(undefined)],
                }),
            ).anonymize();

            expect(actual).toStrictEqual(expected);
        });

        it("has `.normalize` as a left-inverse (modulo anonymity)", () => {
            const actual = standardize(
                functionTypeFixture.denormalize().normalize(),
            );
            const expected = standardize(functionTypeFixture);

            expect(actual).toStrictEqual(expected);
        });

        it("is able to produce empty arrays when a many-to-one relation has no edges", () => {
            const ast = new NormalizedAst("functionType");

            const functionType = nFunctionType(undefined);
            const codomainNode = nBooleanType(undefined);
            const codomainEdge = edge({
                kind: "codomain",
                sourceId: functionType.id,
                sourceKind: "functionType",
                targetId: codomainNode.id,
                targetKind: "booleanType",
                index: undefined,
            });
            ast.addNode(functionType);
            ast.addNode(codomainNode);
            ast.addEdge(codomainEdge);

            const actual = ast.denormalize().anonymize();
            const expected = new DenormalizedAst(
                dFunctionType({
                    codomain: dBooleanType(undefined),
                    domains: [],
                }),
            ).anonymize();

            expect(actual).toStrictEqual(expected);
        });

        it("throws an error if a one-to-one relation has no edges", () => {
            const ast = new NormalizedAst("functionType");

            const functionType = nFunctionType(undefined);
            ast.addNode(functionType);

            expect(() => ast.denormalize()).toThrow();
        });

        it("throws an error if a one-to-one relation has multiple edges", () => {
            const ast = new NormalizedAst("functionType");

            const functionType = nFunctionType(undefined);

            const codomainNode0 = nBooleanType(undefined);
            const codomainEdge0 = edge({
                kind: "codomain",
                sourceId: functionType.id,
                sourceKind: "functionType",
                targetId: codomainNode0.id,
                targetKind: "booleanType",
                index: undefined,
            });

            const codomainNode1 = nBooleanType(undefined);
            const codomainEdge1 = edge({
                kind: "codomain",
                sourceId: functionType.id,
                sourceKind: "functionType",
                targetId: codomainNode1.id,
                targetKind: "booleanType",
                index: undefined,
            });

            ast.addNode(functionType);
            ast.addNode(codomainNode0);
            ast.addNode(codomainNode1);
            ast.addEdge(codomainEdge0);
            ast.addEdge(codomainEdge1);

            expect(() => ast.denormalize()).toThrow();
        });
    });
});
