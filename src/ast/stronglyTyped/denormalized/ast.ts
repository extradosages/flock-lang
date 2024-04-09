import { recordValueOrValueArrayMap } from "../../../lib/recordMaps";
import { anonymize } from "../../common";
import { id } from "../../id";
import {
    WeakDenormalizedNode_,
    WeakDenormalizedRelationalData_ValueT_,
    WeakEdge_,
    mapDenormalizedData,
} from "../../weaklyTyped";
import { StrongNodeKind } from "../common";
import { NormalizedAst } from "../normalized";

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

export class DenormalizedAst<Kind extends StrongNodeKind> {
    #root: StrongDenormalizedNode<Kind>;

    constructor(root: StrongDenormalizedNode<Kind>) {
        this.#root = root;
    }

    root() {
        return this.#root;
    }

    // Anonymize
    anonymize() {
        return anonymizeNode(this.root());
    }

    // Normalize

    #normalizeNode(
        ast: NormalizedAst<StrongNodeKind>,
        node: StrongDenormalizedNode_,
        edgeIds: EdgeId[],
    ): void {
        ast.addNode(node);

        const { data } = node;
        if (data.dimensionality === "relational") {
            recordValueOrValueArrayMap<StrongDenormalizedNode_, void, any>(
                (targetNode, kind, index) => {
                    const edgeId =
                        findEdgeId(edgeIds, node.id, targetNode.id) ?? id();

                    const edge: WeakEdge_ = {
                        id: edgeId,
                        kind,
                        sourceId: node.id,
                        sourceKind: node.kind,
                        targetId: targetNode.id,
                        targetKind: targetNode.kind,
                        index,
                    };

                    ast.addEdge(edge);
                    this.#normalizeNode(ast, targetNode, edgeIds);
                },
                data as any,
            );
        }
    }

    normalize(edgeIds: EdgeId[] = []) {
        const root = this.root();
        const ast = new NormalizedAst(root.kind);
        this.#normalizeNode(ast, root, edgeIds);
        return ast;
    }
}
