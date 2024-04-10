import * as _ from "lodash";

import { ErrorWithContext } from "../../../lib/errorsWithContext";
import { recordValueOrValueArrayMap } from "../../../lib/recordMaps";
import { anonymize, emptyData, scalarData } from "../../common";
import { id } from "../../id";
import {
    WeakDenormalizedNode_,
    WeakDenormalizedRelationalData_ValueT_,
    WeakEdge_,
    mapDenormalizedData,
    weakNormalizedRelationalData,
} from "../../weaklyTyped";
import { StrongNodeKind } from "../common";
import {
    NormalizedAst,
    StrongNormalizedData_,
    StrongNormalizedNode_,
} from "../normalized";

import { StrongDenormalizedNode, StrongDenormalizedNode_ } from "./types";

type EdgeId = {
    sourceId: string;
    targetId: string;
    id: string;
};

const findEdgeId = (
    edgeIds: EdgeId[],
    sourceId: string,
    targetId: string,
): string | undefined =>
    edgeIds.find(
        (triple) =>
            triple.sourceId === sourceId && triple.targetId === targetId,
    )?.id;

const anonymizeData = (
    data: WeakDenormalizedRelationalData_ValueT_<WeakDenormalizedNode_>,
): unknown => recordValueOrValueArrayMap(anonymizeNode, data.value);

const anonymizeNode = (node: WeakDenormalizedNode_): unknown => {
    const { data } = node;
    const anonymizedData = mapDenormalizedData(
        { relationalFn: anonymizeData as any },
        data,
    );
    return anonymize({ ...node, data: anonymizedData });
};

export class DenormalizedAst<RootKind extends StrongNodeKind> {
    #root: StrongDenormalizedNode<RootKind>;

    constructor(root: StrongDenormalizedNode<RootKind>) {
        this.#root = root;
    }

    root() {
        return this.#root;
    }

    rootKind() {
        return this.#root.kind as RootKind;
    }

    // Anonymize
    anonymize() {
        return anonymizeNode(this.root());
    }

    // Normalize

    #normalizedRelationalData(
        nodesAccumulator: StrongNormalizedNode_[],
        edgesAccumulator: WeakEdge_[],
        node: StrongDenormalizedNode_,
    ) {
        const value = node.data.value as Record<
            string,
            StrongDenormalizedNode_ | StrongDenormalizedNode_[]
        >;

        // Imperative recursive kernel
        recordValueOrValueArrayMap<
            StrongDenormalizedNode_,
            void,
            Record<string, StrongDenormalizedNode_ | StrongDenormalizedNode_[]>
        >((targetNode, kind, index) => {
            const edgeId = id();

            const edge: WeakEdge_ = {
                id: edgeId,
                kind,
                sourceId: node.id,
                sourceKind: node.kind,
                targetId: targetNode.id,
                targetKind: targetNode.kind,
                index,
            };

            edgesAccumulator.push(edge);

            this.#normalizeNode(nodesAccumulator, edgesAccumulator, targetNode);

            return {};
        }, value);

        // Infer type
        const type = _.mapValues(value, (value) => ({
            manyToOne: Array.isArray(value),
        })) as Record<string, { manyToOne: boolean }>;

        return weakNormalizedRelationalData(type);
    }

    #normalizedData(
        nodesAccumulator: StrongNormalizedNode_[],
        edgesAccumulator: WeakEdge_[],
        node: StrongDenormalizedNode_,
    ): StrongNormalizedData_ {
        const {
            data: { dimensionality, value },
        } = node;

        if (dimensionality === "empty") {
            return emptyData();
        }
        if (dimensionality === "scalar") {
            return scalarData(value);
        }
        if (dimensionality === "relational") {
            return this.#normalizedRelationalData(
                nodesAccumulator,
                edgesAccumulator,
                node,
            ) as any;
        }

        throw new ErrorWithContext(
            { dimensionality },
            "Unsupported dimensionality",
        );
    }

    #normalizeNode(
        nodesAccumulator: StrongNormalizedNode_[],
        edgesAccumulator: WeakEdge_[],
        node: StrongDenormalizedNode_,
    ): void {
        const normalizedData = this.#normalizedData(
            nodesAccumulator,
            edgesAccumulator,
            node,
        );

        const normalizedNode = {
            ...node,
            data: normalizedData,
        } as StrongNormalizedNode_;

        nodesAccumulator.push(normalizedNode);
    }

    normalize() {
        const nodesAccumulator: StrongNormalizedNode_[] = [];
        const edgesAccumulator: WeakEdge_[] = [];
        const root = this.root();
        this.#normalizeNode(nodesAccumulator, edgesAccumulator, root);

        const ast = new NormalizedAst(this.rootKind());
        nodesAccumulator.forEach((node) => ast.addNode(node));
        edgesAccumulator.forEach((edge) => ast.addEdge(edge));
        return ast;
    }
}
