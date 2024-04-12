import { orderBy } from "lodash";

import {
    NormalizedAst,
    StrongEdge_,
    StrongNormalizedNode_,
    edgeFromNodes,
    nBooleanType,
    nClientImplementation,
    nFunctionTermEliminator,
    nFunctionType,
    nLambdaConstructor,
    nLibrary,
    nTermBinding,
    nTermDefinition,
    nTermReference,
} from "../ast";

import { Scopes } from "./scopes";

describe("Scopes", () => {
    const fixture = (() => {
        const ast = new NormalizedAst("library");

        const nodes: StrongNormalizedNode_[] = [];
        const edges: StrongEdge_[] = [];

        // library
        const libraryNode = nLibrary(undefined);
        nodes.push(libraryNode);

        // term def 0
        const termDef0Node = nTermDefinition(undefined);
        nodes.push(termDef0Node);

        const termDef0Edge = edgeFromNodes<
            "library",
            "termDefinitions",
            "termDefinition"
        >(libraryNode, "termDefinitions", termDef0Node, 0);
        edges.push(termDef0Edge);

        // term def 0 binding
        const termDef0BindingNode = nTermBinding("foo");
        nodes.push(termDef0BindingNode);

        const termDef0BindingEdge = edgeFromNodes<
            "termDefinition",
            "binding",
            "termBinding"
        >(termDef0Node, "binding", termDef0BindingNode);
        edges.push(termDef0BindingEdge);

        // term def 0 type
        const termDef0TypeNode = nBooleanType(undefined);
        nodes.push(termDef0TypeNode);

        const termDef0TypeEdge = edgeFromNodes<
            "termDefinition",
            "type",
            "booleanType"
        >(termDef0Node, "type", termDef0TypeNode);
        edges.push(termDef0TypeEdge);

        // term def 0 term
        const termDef0TermNode = nClientImplementation(undefined);
        nodes.push(termDef0TermNode);

        const termDef0TermEdge = edgeFromNodes<
            "termDefinition",
            "term",
            "clientImplementation"
        >(termDef0Node, "term", termDef0TermNode);
        edges.push(termDef0TermEdge);

        // term def 1
        const termDef1Node = nTermDefinition(undefined);
        nodes.push(termDef1Node);

        const termDef1Edge = edgeFromNodes<
            "library",
            "termDefinitions",
            "termDefinition"
        >(libraryNode, "termDefinitions", termDef1Node, 1);
        edges.push(termDef1Edge);

        // term def 1 binding
        const termDef1BindingNode = nTermBinding("bar");
        nodes.push(termDef1BindingNode);

        const termDef1BindingEdge = edgeFromNodes<
            "termDefinition",
            "binding",
            "termBinding"
        >(termDef1Node, "binding", termDef1BindingNode);
        edges.push(termDef1BindingEdge);

        // term def 1 type / function type 0
        const termDef1TypeNode = nFunctionType(undefined);
        nodes.push(termDef1TypeNode);

        const termDef1TypeEdge = edgeFromNodes<
            "termDefinition",
            "type",
            "functionType"
        >(termDef1Node, "type", termDef1TypeNode);
        edges.push(termDef1TypeEdge);

        // function type 0 domain 0
        const functionType0Domain0Node = nBooleanType(undefined);
        nodes.push(functionType0Domain0Node);

        const functionType0Domain0Edge = edgeFromNodes<
            "functionType",
            "domains",
            "booleanType"
        >(termDef1TypeNode, "domains", functionType0Domain0Node, 0);
        edges.push(functionType0Domain0Edge);

        // function type 0 codomain / function type 1
        const functionType0CodomainNode = nFunctionType(undefined);
        nodes.push(functionType0CodomainNode);

        const functionType0CodomainEdge = edgeFromNodes<
            "functionType",
            "codomain",
            "functionType"
        >(termDef1TypeNode, "codomain", functionType0CodomainNode);
        edges.push(functionType0CodomainEdge);

        // function type 1 domain 0
        const functionType1Domain0Node = nBooleanType(undefined);
        nodes.push(functionType1Domain0Node);

        const functionType1Domain0Edge = edgeFromNodes<
            "functionType",
            "domains",
            "booleanType"
        >(functionType0CodomainNode, "domains", functionType1Domain0Node, 0);
        edges.push(functionType1Domain0Edge);

        // function type 1 codomain
        const functionType1CodomainNode = nBooleanType(undefined);
        nodes.push(functionType1CodomainNode);

        const functionType1CodomainEdge = edgeFromNodes<
            "functionType",
            "codomain",
            "booleanType"
        >(functionType0CodomainNode, "codomain", functionType1CodomainNode);
        edges.push(functionType1CodomainEdge);

        // term def 1 term / lambda constructor 0
        const termDef1TermNode = nLambdaConstructor(undefined);
        nodes.push(termDef1TermNode);

        const termDef1TermEdge = edgeFromNodes<
            "termDefinition",
            "term",
            "lambdaConstructor"
        >(termDef1Node, "term", termDef1TermNode);
        edges.push(termDef1TermEdge);

        // lambda constructor 0 domain term binding 0
        const lambdaConstructor0DomainTermBinding0Node = nTermBinding("prop1");
        nodes.push(lambdaConstructor0DomainTermBinding0Node);

        const lambdaConstructor0DomainTermBinding0Edge = edgeFromNodes<
            "lambdaConstructor",
            "domainTermBindings",
            "termBinding"
        >(
            termDef1TermNode,
            "domainTermBindings",
            lambdaConstructor0DomainTermBinding0Node,
            0,
        );
        edges.push(lambdaConstructor0DomainTermBinding0Edge);

        // lambda constructor 0 codomain term / lambda constructor 1
        const lambdaConstructor0CodomainTermNode =
            nLambdaConstructor(undefined);
        nodes.push(lambdaConstructor0CodomainTermNode);

        const lambdaConstructor0CodomainTermEdge = edgeFromNodes<
            "lambdaConstructor",
            "codomainTerm",
            "lambdaConstructor"
        >(termDef1TermNode, "codomainTerm", lambdaConstructor0CodomainTermNode);
        edges.push(lambdaConstructor0CodomainTermEdge);

        // lambda constructor 1 domain term binding 0
        const lambdaConstructor1DomainTermBinding0Node = nTermBinding("prop2");
        nodes.push(lambdaConstructor1DomainTermBinding0Node);

        const lambdaConstructor1DomainTermBinding0Edge = edgeFromNodes<
            "lambdaConstructor",
            "domainTermBindings",
            "termBinding"
        >(
            lambdaConstructor0CodomainTermNode,
            "domainTermBindings",
            lambdaConstructor1DomainTermBinding0Node,
            0,
        );
        edges.push(lambdaConstructor1DomainTermBinding0Edge);

        // lambda constructor 1 codomain term / function term eliminator
        const lambdaConstructor1CodomainTermNode =
            nFunctionTermEliminator(undefined);
        nodes.push(lambdaConstructor1CodomainTermNode);

        const lambdaConstructor1CodomainTermEdge = edgeFromNodes<
            "lambdaConstructor",
            "codomainTerm",
            "functionTermEliminator"
        >(termDef1TermNode, "codomainTerm", lambdaConstructor1CodomainTermNode);
        edges.push(lambdaConstructor1CodomainTermEdge);

        // function term eliminator function
        const functionTermEliminatorFunctionNode = nTermReference("and");
        nodes.push(functionTermEliminatorFunctionNode);

        const functionTermEliminatorFunctionEdge = edgeFromNodes<
            "functionTermEliminator",
            "function",
            "termReference"
        >(
            lambdaConstructor1CodomainTermNode,
            "function",
            functionTermEliminatorFunctionNode,
        );
        edges.push(functionTermEliminatorFunctionEdge);

        // function term eliminator argument 0
        const functionTermEliminatorArgument0Node = nTermReference("prop1");
        nodes.push(functionTermEliminatorArgument0Node);

        const functionTermEliminatorArgument0Edge = edgeFromNodes<
            "functionTermEliminator",
            "arguments",
            "termReference"
        >(
            lambdaConstructor1CodomainTermNode,
            "arguments",
            functionTermEliminatorArgument0Node,
            0,
        );
        edges.push(functionTermEliminatorArgument0Edge);

        // function term eliminator argument 1
        const functionTermEliminatorArgument1Node = nTermReference("prop2");
        nodes.push(functionTermEliminatorArgument1Node);

        const functionTermEliminatorArgument1Edge = edgeFromNodes<
            "functionTermEliminator",
            "arguments",
            "termReference"
        >(
            lambdaConstructor1CodomainTermNode,
            "arguments",
            functionTermEliminatorArgument1Node,
            1,
        );
        edges.push(functionTermEliminatorArgument1Edge);

        for (const node of nodes) {
            ast.addNode(node);
        }
        for (const edge of edges) {
            ast.addEdge(edge);
        }

        return {
            ast,
            unNestedBoundaryNode: termDef1TermNode,
            nestedBoundaryNode: lambdaConstructor0CodomainTermNode,
        };
    })();

    const scopes = new Scopes(["lambdaConstructor"], fixture.ast);

    it("assigns a scope to every node", () => {
        const actual = fixture.ast.graph
            .mapNodes((nodeId) => scopes.lookup(nodeId))
            .every((scopeId) => scopeId !== undefined);

        expect(actual).toBe(true);
    });

    it("assigns across all nodes a set of scopes which is exactly the root and boundary nodes", () => {
        const actual = orderBy([...scopes.all]);
        const expected = orderBy([
            fixture.ast.rootId(),
            fixture.unNestedBoundaryNode.id,
            fixture.nestedBoundaryNode.id,
        ]);

        expect(actual).toStrictEqual(expected);
    });

    it("assigns the root as the scope for the root", () => {
        const actual = scopes.lookup(fixture.ast.rootId());
        const expected = fixture.ast.rootId();

        expect(actual).toBe(expected);
    });

    it("assigns the root as the scope for a un-nested boundary node", () => {
        const actual = scopes.lookup(fixture.unNestedBoundaryNode.id);
        const expected = fixture.ast.rootId();

        expect(actual).toBe(expected);
    });

    it("assigns a parent boundary node as the scope for a nested boundary node", () => {
        const actual = scopes.lookup(fixture.nestedBoundaryNode.id);
        const expected = fixture.unNestedBoundaryNode.id;

        expect(actual).toBe(expected);
    });
});
