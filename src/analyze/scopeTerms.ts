import { includes } from "lodash";
import { dfsFromNode } from "graphology-traversal";

import { NormalizedAst, StrongNodeKind } from "../ast";

type Scope = Record<string, string>;

const newScopeNodes = [
    "lambdaConstructor",
    "library",
] as const satisfies Array<StrongNodeKind>;

const scope = (ast: NormalizedAst) => {
    const ds: Scope = {};

    let currentScope: string = ast.rootId();
    dfsFromNode(ast.graph, ast.rootId(), (_, node) => {
        if (includes(newScopeNodes, node.kind)) {
            currentScope = node.id;
        }
    });
};
