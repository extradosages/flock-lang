import { dfsFromNode } from "graphology-traversal";
import { includes } from "lodash";

import { NormalizedAst, StrongNodeKind } from "../ast";

export class Scopes {
    #lookup: Record<string, string>;
    all: Set<string>;

    constructor(scopeBoundaries: Array<StrongNodeKind>, ast: NormalizedAst) {
        scopeBoundaries = [...scopeBoundaries, "library"];

        const scopes = new Set<string>();
        const lookup: Record<string, string> = {};

        let currScope: string;
        dfsFromNode(ast.graph, ast.rootId(), (_, node) => {
            lookup[node.id] = currScope ?? ast.rootId();
            if (includes(scopeBoundaries, node.kind)) {
                currScope = node.id;
                scopes.add(currScope);
            }
        });

        this.#lookup = lookup;
        this.all = scopes;
    }

    lookup(nodeId: string) {
        return this.#lookup[nodeId] as string;
    }
}
