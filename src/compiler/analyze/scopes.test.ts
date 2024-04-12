import { orderBy } from "lodash";

import { normalizedAstFixture } from "../ast/stronglyTyped/normalized/ast.fixture";
import { Scopes } from "./scopes";

const fix = normalizedAstFixture();
const { ast } = fix;
const unNestedBoundaryNode = fix.nodes["termDef1TermNode"];
const nestedBoundaryNode = fix.nodes["lambdaConstructor0CodomainTermNode"];

describe("Scopes", () => {
    const scopes = new Scopes(["lambdaConstructor"], fix.ast);

    it("assigns a scope to every node", () => {
        const actual = ast.graph
            .mapNodes((nodeId) => scopes.lookup(nodeId))
            .every((scopeId) => scopeId !== undefined);

        expect(actual).toBe(true);
    });

    it("assigns across all nodes a set of scopes which is exactly the root and boundary nodes", () => {
        const actual = orderBy([...scopes.all]);
        const expected = orderBy([
            ast.rootId(),
            unNestedBoundaryNode.id,
            nestedBoundaryNode.id,
        ]);

        expect(actual).toStrictEqual(expected);
    });

    it("assigns the root as the scope for the root", () => {
        const actual = scopes.lookup(fix.ast.rootId());
        const expected = fix.ast.rootId();

        expect(actual).toBe(expected);
    });

    it("assigns the root as the scope for a un-nested boundary node", () => {
        const actual = scopes.lookup(unNestedBoundaryNode.id);
        const expected = fix.ast.rootId();

        expect(actual).toBe(expected);
    });

    it("assigns the root as the scope for all the un-nested boundary nodes", () => {
        const termDefNodeIds = fix.ast.graph.filterNodes(
            (_, node) => node.kind === "termDefinition",
        );

        const actual = termDefNodeIds.map((nodeId) => scopes.lookup(nodeId));
        const expected = termDefNodeIds.map(() => fix.ast.rootId());

        expect(actual).toStrictEqual(expected);
    });

    it("assigns a parent boundary node as the scope for a nested boundary node", () => {
        const actual = scopes.lookup(nestedBoundaryNode.id);
        const expected = unNestedBoundaryNode.id;

        expect(actual).toBe(expected);
    });
});
