// Helper types

import {
    NormalizedAst,
    StrongLargeTypeNodeKind,
    StrongNormalizedNode,
    StrongTermNodeKind,
    strongNormalizedNodeParser,
} from "../../ast";
import { ErrorWithContext } from "../../util/errorsWithContext";
import { TermResolution } from "../resolveTermReferences";
import { Scopes } from "../scopes";
import {
    FunctionType,
    GenericTypePass2,
    LargeType,
    SmallType,
    booleanType,
    floatType,
    functionType,
    genericTypePass1,
    integerType,
    productType,
    stringType,
    typeVariable,
} from "./types";

type Semantics = {
    scopes: Scopes;
    termResolution: TermResolution;
};

type DispatchInference = {
    [NodeKind in StrongTermNodeKind as `infer${Capitalize<NodeKind>}Type`]: (
        term: StrongNormalizedNode<NodeKind>,
    ) => LargeType;
};

// Type nodes to types

const getType: (
    typeNode: StrongNormalizedNode<StrongLargeTypeNodeKind>,
) => LargeType = (typeNode) => {
    throw new Error("Not implemented");
};

// Term nodes to types

export class InferenceEnvironment implements DispatchInference {
    #ast: NormalizedAst;
    #semantics: Semantics;

    constructor(ast: NormalizedAst, semantics: Semantics) {
        this.#ast = ast;
        this.#semantics = semantics;
    }

    inferBooleanTermType(term: StrongNormalizedNode<"booleanTerm">) {
        return booleanType();
    }

    inferFloatTermType(term: StrongNormalizedNode<"floatTerm">) {
        return floatType();
    }

    inferFunctionTermEliminatorType(
        term: StrongNormalizedNode<"functionTermEliminator">,
    ): SmallType {
        throw new Error("Not implemented");
    }

    inferIntegerTermType(term: StrongNormalizedNode<"integerTerm">) {
        return integerType();
    }

    inferLambdaConstructorType(
        term: StrongNormalizedNode<"lambdaConstructor">,
    ) {
        const domainTermBindingNodes = this.#ast.manyToOneChildren<
            "lambdaConstructor",
            "domainTermBindings"
        >(term.id, "domainTermBindings");

        const freeVariables = domainTermBindingNodes.map(
            (domainTermBindingNode) => {
                const scope = term.id;
                const identifier = domainTermBindingNode.data.value;
                return typeVariable(`${scope}:${identifier}`);
            },
        );

        const domains = freeVariables;

        const codomainNode = this.#ast.oneToOneChild<
            "lambdaConstructor",
            "codomainTerm"
        >(term.id, "codomainTerm");
        const codomain = this.inferType(codomainNode);

        const type = functionType({ domains, codomain });

        return genericTypePass1({ freeVariables, type });
    }

    inferProductTermConstructorType(
        term: StrongNormalizedNode<"productTermConstructor">,
    ) {
        const componentNodes = this.#ast.manyToOneChildren<
            "productTermConstructor",
            "components"
        >(term.id, "components");
        const componentTypes = componentNodes.map(this.inferType);
        return productType(componentTypes);
    }

    inferProductTermEliminatorType(
        term: StrongNormalizedNode<"productTermEliminator">,
    ): GenericTypePass2<FunctionType> {
        throw new Error("Not implemented");
    }

    inferStringTermType(term: StrongNormalizedNode<"stringTerm">) {
        return stringType();
    }

    inferSumTermConstructorType(
        term: StrongNormalizedNode<"sumTermConstructor">,
    ): GenericTypePass2<FunctionType> {
        throw new Error("Not implemented");
    }

    inferSumTermEliminatorType(
        term: StrongNormalizedNode<"sumTermEliminator">,
    ): GenericTypePass2<FunctionType> {
        throw new Error("Not implemented");
    }

    inferTermReferenceType(term: StrongNormalizedNode<"termReference">) {
        const resolutionId = this.#semantics.termResolution.lookup(term.id);
        const resolutionParentNode = this.#ast.parent(resolutionId);

        const termDefinitionResult =
            strongNormalizedNodeParser("termDefinition").safeParse(
                resolutionParentNode,
            );
        if (termDefinitionResult.success) {
            const termDefinitionNode = termDefinitionResult.data;
            const typeNode = this.#ast.oneToOneChild<"termDefinition", "type">(
                termDefinitionNode.id,
                "type",
            );

            return getType(typeNode);
        }

        const lambdaConstructorResult =
            strongNormalizedNodeParser("lambdaConstructor").safeParse(
                resolutionParentNode,
            );
        if (lambdaConstructorResult.success) {
            const lambdaConstructorNode = lambdaConstructorResult.data;

            // or should it be generic
            return typeVariable(lambdaConstructorNode.id);
        }

        throw new ErrorWithContext(
            { term, resolutionId, resolutionParentNode },
            "Resolved binding node is not a child of a term definition or lambda constructor",
        );
    }

    inferType(term: StrongNormalizedNode<StrongTermNodeKind>): SmallType {
        throw new Error("Not implemented");
    }
}
