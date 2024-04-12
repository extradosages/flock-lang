import { includes } from "lodash";

import { bfsFromNode } from "graphology-traversal";
import { NormalizedAst, StrongNodeKind } from "../ast";

export class Scopes {
    _lookup: Record<string, string>;
    all: Set<string>;

    constructor(scopeBoundaries: Array<StrongNodeKind>, ast: NormalizedAst) {
        scopeBoundaries = [...scopeBoundaries, "library"];

        const scopes = new Set<string>();
        const lookup: Record<string, string> = {};

        let currScope: string;
        bfsFromNode(ast.graph, ast.rootId(), (_, node) => {
            lookup[node.id] = currScope ?? ast.rootId();
            if (includes(scopeBoundaries, node.kind)) {
                currScope = node.id;
                scopes.add(currScope);
            }
        });

        this._lookup = lookup;
        this.all = scopes;
    }

    lookup(nodeId: string) {
        return this._lookup[nodeId] as string;
    }
}
