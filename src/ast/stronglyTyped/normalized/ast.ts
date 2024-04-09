import { DirectedGraph } from "graphology";
import * as _ from "lodash";

import { ErrorWithContext } from "../../../lib/errorsWithContext";
import { anonymize } from "../../common";
import {
    WeakDenormalizedData,
    WeakDenormalizedNode_,
    WeakEdge_,
    WeakNormalizedRelationSpec,
} from "../../weaklyTyped";
import { StrongNodeKind } from "../common";
import { DenormalizedAst, StrongDenormalizedNode } from "../denormalized";

import {
    StrongNormalizedData_,
    StrongNormalizedNode,
    StrongNormalizedNode_,
} from "./types";

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
            if (this.graph.nodes().length === 0) {
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

    // Anonymize

    anonymize() {
        return {
            nodes: _.orderBy(
                this.graph.mapNodes((_, node) => anonymize(node)),
                JSON.stringify,
            ),
            edges: _.orderBy(
                this.graph.mapEdges((_, edge) => anonymize(edge)),
                JSON.stringify,
            ),
        };
    }

    // Denormalize

    #denormalizeRelationalData(
        nodeId: string,
        relSpec: WeakNormalizedRelationSpec,
    ): WeakDenormalizedData {
        const value = _.mapValues(relSpec, ({ manyToOne }, kind) => {
            const edges = Array.from(this.graph.outEdgeEntries(nodeId))
                .map(({ attributes: edge }) => edge)
                .filter((edge) => edge.kind === kind);

            if (manyToOne) {
                const orderedEdges = _.orderBy(edges, ({ index }) => index);
                return orderedEdges.map((edge) =>
                    this.#denormalizeNode(edge.targetId),
                );
            }

            if (edges.length > 1) {
                throw new ErrorWithContext(
                    { kind },
                    "Multiple one-to-one edges found",
                );
            }
            if (edges.length === 0) {
                throw new ErrorWithContext(
                    { kind },
                    "No one-to-one edges found",
                );
            }
            return this.#denormalizeNode(edges[0].targetId);
        });

        return { dimensionality: "relational", value };
    }

    #denormalizeData(
        id: string,
        data: StrongNormalizedData_,
    ): WeakDenormalizedData {
        if (data.dimensionality === "empty") {
            return data;
        }
        if (data.dimensionality === "scalar") {
            return data;
        }
        if (data.dimensionality === "relational") {
            const { relSpec } = data;
            return this.#denormalizeRelationalData(id, relSpec);
        }
        throw new ErrorWithContext({ data }, "Unknown dimensionality");
    }

    #denormalizeNode(id: string): WeakDenormalizedNode_ {
        const node = this.node(id);
        const data = this.#denormalizeData(id, node.data);
        return {
            ...node,
            data,
        };
    }

    denormalize() {
        const root = this.root();
        return new DenormalizedAst(
            this.#denormalizeNode(root.id) as StrongDenormalizedNode<Kind>,
        );
    }
}
