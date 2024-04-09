import { DirectedGraph } from "graphology";
import { groupBy, mapValues, orderBy } from "typedash";

import {
    DenormalizedNodeǁ,
    Edgeǁ,
    NodeKind,
    NormalizedNode,
    NormalizedNodeǁ,
} from "./ast/strong";
import { ErrorWithContext } from "../../lib/errorsWithContext";
import {
    DenormalizedData,
    DenormalizedEmpty,
    WeakDenormalizedRelationalǁ,
    WeakDenormalizedScalarǁ,
    NormalizedData,
    denormalizedEmpty,
    denormalizedRelational,
    denormalizedScalar,
} from "./nodeData";
import { WeakDenormalizedNodeǁ } from "./ast/weak";

const isRoot = (graph: DirectedGraph) => (node: string) =>
    graph.inDegree(node) === 0;

export class NormalizedAst<Kind extends NodeKind> {
    #rootId?: string;
    #kind: Kind;
    graph: DirectedGraph<NormalizedNodeǁ, Edgeǁ>;

    constructor(kind: Kind) {
        this.#kind = kind;
        this.graph = new DirectedGraph();
    }

    #setRootIdCache(rootId: string) {
        this.#rootId = rootId;
    }

    #clearRootIdCache() {
        this.#rootId = undefined;
    }

    #getRootId() {
        if (this.#rootId === undefined) {
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
            this.#rootId = rootId;
            return rootId;
        }
        return this.#rootId;
    }

    getRoot(): NormalizedNode<Kind> {
        const node = this.getNodeById(this.#getRootId());
        if (node.kind !== this.#kind) {
            throw new ErrorWithContext(
                { rootKind: node.kind, astKind: this.#kind },
                "Root node has the wrong kind",
            );
        }
        return node;
    }

    addNode(node: NormalizedNodeǁ) {
        this.graph.addNode(node.id, node);
        this.#clearRootIdCache();
    }

    addEdge(edge: Edgeǁ) {
        this.graph.addDirectedEdgeWithKey(edge.sourceId, edge.targetId, edge);
        this.#clearRootIdCache();
    }

    getNodeById(id: string) {
        return this.graph.getNodeAttributes(id);
    }

    getEdgeById(id: string) {
        return this.graph.getEdgeAttributes(id);
    }

    getChildren(id: string) {
        return this.graph.outNeighborEntries(id);
    }

    #denormalizeEmptyData(): DenormalizedEmpty {
        return denormalizedEmpty();
    }

    #denormalizeScalarData(value: unknown) {
        return denormalizedScalar(value);
    }

    #denormalizeRelationalData(id: string): WeakDenormalizedRelationalǁ {
        const edges = Array.from(this.graph.outEdgeEntries(id)).map(
            ({ attributes: edge }) => edge,
        );

        const edgesByKind = groupBy(edges, (edge) => edge.kind);
        const value = mapValues(edgesByKind, (edges, kind) => {
            if (edges === undefined) {
                throw new ErrorWithContext({ kind }, "Edges are undefined");
            }

            const isOneToOne = edges.every(({ index }) => index === undefined);
            if (isOneToOne && edges.length !== 1) {
                throw new ErrorWithContext(
                    { kind },
                    "Multiple one-to-one edges found",
                );
            }

            if (isOneToOne) {
                return this.#denormalizeNode(edges[0].targetId);
            }

            const orderedEdges = orderBy(edges, ({ index }) => index);
            return orderedEdges.map((edge) =>
                this.#denormalizeNode(edge.targetId),
            );
        });

        return denormalizedRelational(value);
    }

    #denormalizeData(id: string, data: NormalizedData): DenormalizedData {
        if (data.dimensionality === "empty") {
            return this.#denormalizeEmptyData();
        }
        if (data.dimensionality === "scalar") {
            return this.#denormalizeScalarData(data.value);
        }
        if (data.dimensionality === "relational") {
            return this.#denormalizeRelationalData(id);
        }
        throw new ErrorWithContext({ data }, "Unknown dimensionality");
    }

    #denormalizeNode(id: string): WeakDenormalizedNodeǁ {
        const node = this.getNodeById(id);
        const data = this.#denormalizeData(id, node.data);
        return {
            ...node,
            data,
        };
    }

    denormalize() {
        const root = this.getRoot();
        return;
    }
}
