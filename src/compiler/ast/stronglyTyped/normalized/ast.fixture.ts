import { values } from "lodash";
import { NormalizedAst } from "./ast";
import {
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
} from "./constructors";
import { StrongEdge_, StrongNormalizedNode_ } from "./types";

export const normalizedAstFixture = () => {
    const ast = new NormalizedAst("library");

    const nodes: Record<string, StrongNormalizedNode_> = {};
    const edges: Record<string, StrongEdge_> = {};

    // library
    const libraryNode = nLibrary(undefined);
    nodes["libraryNode"] = libraryNode;

    // term def 0
    const termDef0Node = nTermDefinition(undefined);
    nodes["termDef0Node"] = termDef0Node;

    const termDef0Edge = edgeFromNodes<
        "library",
        "termDefinitions",
        "termDefinition"
    >(libraryNode, "termDefinitions", termDef0Node, 0);
    edges["termDef0Edge"] = termDef0Edge;

    // term def 0 binding
    const termDef0BindingNode = nTermBinding("foo");
    nodes["termDef0BindingNode"] = termDef0BindingNode;

    const termDef0BindingEdge = edgeFromNodes<
        "termDefinition",
        "binding",
        "termBinding"
    >(termDef0Node, "binding", termDef0BindingNode);
    edges["termDef0BindingEdge"] = termDef0BindingEdge;

    // term def 0 type
    const termDef0TypeNode = nBooleanType(undefined);
    nodes["termDef0TypeNode"] = termDef0TypeNode;

    const termDef0TypeEdge = edgeFromNodes<
        "termDefinition",
        "type",
        "booleanType"
    >(termDef0Node, "type", termDef0TypeNode);
    edges["termDef0TypeEdge"] = termDef0TypeEdge;

    // term def 0 term
    const termDef0TermNode = nClientImplementation(undefined);
    nodes["termDef0TermNode"] = termDef0TermNode;

    const termDef0TermEdge = edgeFromNodes<
        "termDefinition",
        "term",
        "clientImplementation"
    >(termDef0Node, "term", termDef0TermNode);
    edges["termDef0TermEdge"] = termDef0TermEdge;

    // term def 1
    const termDef1Node = nTermDefinition(undefined);
    nodes["termDef1Node"] = termDef1Node;

    const termDef1Edge = edgeFromNodes<
        "library",
        "termDefinitions",
        "termDefinition"
    >(libraryNode, "termDefinitions", termDef1Node, 1);
    edges["termDef1Edge"] = termDef1Edge;

    // term def 1 binding
    const termDef1BindingNode = nTermBinding("bar");
    nodes["termDef1BindingNode"] = termDef1BindingNode;

    const termDef1BindingEdge = edgeFromNodes<
        "termDefinition",
        "binding",
        "termBinding"
    >(termDef1Node, "binding", termDef1BindingNode);
    edges["termDef1BindingEdge"] = termDef1BindingEdge;

    // term def 1 type / function type 0
    const termDef1TypeNode = nFunctionType(undefined);
    nodes["termDef1TypeNode"] = termDef1TypeNode;

    const termDef1TypeEdge = edgeFromNodes<
        "termDefinition",
        "type",
        "functionType"
    >(termDef1Node, "type", termDef1TypeNode);
    edges["termDef1TypeEdge"] = termDef1TypeEdge;

    // function type 0 domain 0
    const functionType0Domain0Node = nBooleanType(undefined);
    nodes["functionType0Domain0Node"] = functionType0Domain0Node;

    const functionType0Domain0Edge = edgeFromNodes<
        "functionType",
        "domains",
        "booleanType"
    >(termDef1TypeNode, "domains", functionType0Domain0Node, 0);
    edges["functionType0Domain0Edge"] = functionType0Domain0Edge;

    // function type 0 codomain / function type 1
    const functionType0CodomainNode = nFunctionType(undefined);
    nodes["functionType0CodomainNode"] = functionType0CodomainNode;

    const functionType0CodomainEdge = edgeFromNodes<
        "functionType",
        "codomain",
        "functionType"
    >(termDef1TypeNode, "codomain", functionType0CodomainNode);
    edges["functionType0CodomainEdge"] = functionType0CodomainEdge;

    // function type 1 domain 0
    const functionType1Domain0Node = nBooleanType(undefined);
    nodes["functionType1Domain0Node"] = functionType1Domain0Node;

    const functionType1Domain0Edge = edgeFromNodes<
        "functionType",
        "domains",
        "booleanType"
    >(functionType0CodomainNode, "domains", functionType1Domain0Node, 0);
    edges["functionType1Domain0Edge"] = functionType1Domain0Edge;

    // function type 1 codomain
    const functionType1CodomainNode = nBooleanType(undefined);
    nodes["functionType1CodomainNode"] = functionType1CodomainNode;

    const functionType1CodomainEdge = edgeFromNodes<
        "functionType",
        "codomain",
        "booleanType"
    >(functionType0CodomainNode, "codomain", functionType1CodomainNode);
    edges["functionType1CodomainEdge"] = functionType1CodomainEdge;

    // term def 1 term / lambda constructor 0
    const termDef1TermNode = nLambdaConstructor(undefined);
    nodes["termDef1TermNode"] = termDef1TermNode;

    const termDef1TermEdge = edgeFromNodes<
        "termDefinition",
        "term",
        "lambdaConstructor"
    >(termDef1Node, "term", termDef1TermNode);
    edges["termDef1TermEdge"] = termDef1TermEdge;

    // lambda constructor 0 domain term binding 0
    const lambdaConstructor0DomainTermBinding0Node = nTermBinding("prop1");
    nodes["lambdaConstructor0DomainTermBinding0Node"] =
        lambdaConstructor0DomainTermBinding0Node;

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
    edges["lambdaConstructor0DomainTermBinding0Edge"] =
        lambdaConstructor0DomainTermBinding0Edge;

    // lambda constructor 0 codomain term / lambda constructor 1
    const lambdaConstructor0CodomainTermNode = nLambdaConstructor(undefined);
    nodes["lambdaConstructor0CodomainTermNode"] =
        lambdaConstructor0CodomainTermNode;

    const lambdaConstructor0CodomainTermEdge = edgeFromNodes<
        "lambdaConstructor",
        "codomainTerm",
        "lambdaConstructor"
    >(termDef1TermNode, "codomainTerm", lambdaConstructor0CodomainTermNode);
    edges["lambdaConstructor0CodomainTermEdge"] =
        lambdaConstructor0CodomainTermEdge;

    // lambda constructor 1 domain term binding 0
    const lambdaConstructor1DomainTermBinding0Node = nTermBinding("prop2");
    nodes["lambdaConstructor1DomainTermBinding0Node"] =
        lambdaConstructor1DomainTermBinding0Node;

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
    edges["lambdaConstructor1DomainTermBinding0Edge"] =
        lambdaConstructor1DomainTermBinding0Edge;

    // lambda constructor 1 codomain term / function term eliminator
    const lambdaConstructor1CodomainTermNode =
        nFunctionTermEliminator(undefined);
    nodes["lambdaConstructor1CodomainTermNode"] =
        lambdaConstructor1CodomainTermNode;

    const lambdaConstructor1CodomainTermEdge = edgeFromNodes<
        "lambdaConstructor",
        "codomainTerm",
        "functionTermEliminator"
    >(termDef1TermNode, "codomainTerm", lambdaConstructor1CodomainTermNode);
    edges["lambdaConstructor1CodomainTermEdge"] =
        lambdaConstructor1CodomainTermEdge;

    // function term eliminator function
    const functionTermEliminatorFunctionNode = nTermReference("foo");
    nodes["functionTermEliminatorFunctionNode"] =
        functionTermEliminatorFunctionNode;

    const functionTermEliminatorFunctionEdge = edgeFromNodes<
        "functionTermEliminator",
        "function",
        "termReference"
    >(
        lambdaConstructor1CodomainTermNode,
        "function",
        functionTermEliminatorFunctionNode,
    );
    edges["functionTermEliminatorFunctionEdge"] =
        functionTermEliminatorFunctionEdge;

    // function term eliminator argument 0
    const functionTermEliminatorArgument0Node = nTermReference("prop1");
    nodes["functionTermEliminatorArgument0Node"] =
        functionTermEliminatorArgument0Node;

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
    edges["functionTermEliminatorArgument0Edge"] =
        functionTermEliminatorArgument0Edge;

    // function term eliminator argument 1
    const functionTermEliminatorArgument1Node = nTermReference("prop2");
    nodes["functionTermEliminatorArgument1Node"] =
        functionTermEliminatorArgument1Node;

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
    edges["functionTermEliminatorArgument1Edge"] =
        functionTermEliminatorArgument1Edge;

    values(nodes).forEach((node) => ast.addNode(node));
    values(edges).forEach((edge) => ast.addEdge(edge));

    return {
        ast,
        nodes,
        edges,
    };
};
