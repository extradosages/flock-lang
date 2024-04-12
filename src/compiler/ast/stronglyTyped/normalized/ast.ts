import { DirectedGraph } from "graphology";
import _ from "lodash";

import { ErrorWithContext } from "../../../util/errorsWithContext";
import { anonymize } from "../../common";
import {
    WeakDenormalizedData,
    WeakDenormalizedNode_,
    WeakEdge_,
    WeakNormalizedRelationSpec,
} from "../../weaklyTyped";
import {
    StrongEdgeKind,
    StrongEdgeSourceKind,
    StrongNodeKind,
} from "../common";
import { DenormalizedAst, StrongDenormalizedNode } from "../denormalized";

import {
    StrongEdge,
    StrongNormalizedData_,
    StrongNormalizedNode,
    StrongNormalizedNode_,
} from "./types";

const isRoot = (graph: DirectedGraph) => (node: string) =>
    graph.inDegree(node) === 0;

export class NormalizedAst<RootKind extends StrongNodeKind = "library"> {
    #rootId?: string;
    rootKind: RootKind;
    graph: DirectedGraph<StrongNormalizedNode_, WeakEdge_>;

    constructor(rootKind: RootKind) {
        this.rootKind = rootKind;
        this.graph = new DirectedGraph();
    }

    #setRootId(rootId: string) {
        this.#rootId = rootId;
    }

    #resetRootId() {
        this.#rootId = undefined;
    }

    rootId() {
        if (this.#rootId === undefined) {
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
            this.#setRootId(rootId);
            return rootId;
        }
        return this.#rootId;
    }

    root() {
        const node = this.node<RootKind>(this.rootId());
        if (node.kind !== this.rootKind) {
            throw new ErrorWithContext(
                { rootKind: node.kind, astKind: this.rootKind },
                "Root node has the wrong kind",
            );
        }
        return node;
    }

    node<Kind extends StrongNodeKind = StrongNodeKind>(
        id: string,
    ): StrongNormalizedNode<Kind> {
        return this.graph.getNodeAttributes(id);
    }

    edge<
        SourceKind extends StrongEdgeSourceKind = StrongEdgeSourceKind,
        EdgeKind extends
            StrongEdgeKind<SourceKind> = StrongEdgeKind<SourceKind>,
    >(id: string): StrongEdge<SourceKind, EdgeKind> {
        return this.graph.getEdgeAttributes(id);
    }

    addNode(node: StrongNormalizedNode_) {
        this.graph.addNode(node.id, node);
        // This might be the new root, so invalidate the root id cache
        this.#resetRootId();
    }

    addEdge(edge: WeakEdge_) {
        this.graph.addEdge(edge.sourceId, edge.targetId, edge);
        // This might change the root, so invalidate the root id cache
        this.#resetRootId();
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
            this.#denormalizeNode(root.id) as StrongDenormalizedNode<RootKind>,
        );
    }
}
