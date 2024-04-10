import { dfsFromNode } from "graphology-traversal";
import { includes } from "lodash";

import { NormalizedAst, StrongNodeKind } from "../ast";

export class Scopes {
    #index: Record<string, string>;

    constructor(scopeBoundaries: Array<StrongNodeKind>, ast: NormalizedAst) {
        const index: Record<string, string> = {};

        let currentScope: string = ast.rootId();
        dfsFromNode(ast.graph, ast.rootId(), (_, node) => {
            index[node.id] = currentScope;
            if (includes(scopeBoundaries, node.kind)) {
                currentScope = node.id;
            }
        });

        this.#index = index;
    }

    getScope(nodeId: string) {
        return this.#index[nodeId] as string;
    }
}
