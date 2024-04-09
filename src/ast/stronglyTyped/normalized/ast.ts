import { DirectedGraph } from "graphology";

import { ErrorWithContext } from "../../../lib/errorsWithContext";
import { WeakEdge_ } from "../../weaklyTyped";
import { StrongNodeKind } from "../common";
import { StrongDenormalizedData, StrongDenormalizedNode } from "../denormalized";
import { StrongNormalizedData, StrongNormalizedNode, StrongNormalizedNode_ } from "./types";

const isRoot = (graph: DirectedGraph) => (node: string) =>
    graph.inDegree(node) === 0;

export class NormalizedAst<Kind extends StrongNodeKind> {
    #rootIdCache?: string;
    #kind: Kind;
    graph: DirectedGraph<StrongNormalizedNode_, WeakEdge_>;

    constructor(kind: Kind) {
        this.#kind = kind;
        this.graph = new DirectedGraph();
    }

    #setRootIdCache(rootId: string) {
        this.#rootIdCache = rootId;
    }

    #clearRootIdCache() {
        this.#rootIdCache = undefined;
    }

    #rootId() {
        if (this.#rootIdCache === undefined) {
            if (this.graph.nodes.length === 0) {
                throw new Error("No nodes in the graph!");
            }

            const nodeIds = this.graph.filterNodes(isRoot(this.graph));
            if (nodeIds === undefined) {
                throw new Error("Graph has no root!");
            }

            if (nodeIds.length > 1) {
                throw new Error("Graph has more than one root!");
            }

            const rootId = nodeIds[0];
            this.#setRootIdCache(rootId);
            return rootId;
        }
        return this.#rootIdCache;
    }

    root(): StrongNormalizedNode<Kind> {
        const node = this.node(this.#rootId());
        if (node.kind !== this.#kind) {
            throw new ErrorWithContext(
                { rootKind: node.kind, astKind: this.#kind },
                "Root node has the wrong kind",
            );
        }
        return node;
    }

    node(id: string) {
        return this.graph.getNodeAttributes(id);
    }

    edge(id: string) {
        return this.graph.getEdgeAttributes(id);
    }

    addNode(node: StrongNormalizedNode_) {
        this.graph.addNode(node.id, node);
        this.#clearRootIdCache();
    }

    addEdge(edge: WeakEdge_) {
        this.graph.addEdge(edge.sourceId, edge.targetId, edge);
        this.#clearRootIdCache();
    }

    // Denormalization

    #denormalizeData<Kind extends StrongNodeKind>(data: StrongNormalizedData<Kind>): StrongDenormalizedData<Kind> {

    }

    #denormalizeNode<Kind extends StrongNodeKind>(node: StrongNormalizedNode<Kind>): StrongDenormalizedNode<Kind> {
        const data = this.#denormalizeData(id, node.data);
        return {
            ...node,
            data,
        };
    }
        const node = this.getNodeById(id);
        const data = this.#denormalizeData(id, node.data);
        return {
            ...node,
            data,
        };
    }
    denormalize() {
        const root = this.root();
    }
}
