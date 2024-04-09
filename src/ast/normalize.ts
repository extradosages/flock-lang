/**
 * TODO: This file and principal function are essentially untyped.
 */
import { ErrorWithContext } from "../lib/errorsWithContext";
import {
    recordValueOrValueArrayFlatMap,
    recordValueOrValueArrayMap,
} from "../lib/recordMaps";

import { Edgeǁ, DenormalizedNodeǁ, NormalizedNodeǁ } from "./ast";
import { edge } from "./constructors";
import {
    DenormalizedData,
    NormalizedData,
    denormalizedDataMap,
    normalizedEmpty,
    normalizedRelational,
    normalizedScalar,
} from "./nodeData";

type Accumulator = {
    nodes: NormalizedNodeǁ[];
    edges: Edgeǁ[];
};

const edgesFromNode = <Node extends DenormalizedNodeǁ>(node: Node): Edgeǁ[] => {
    const { data } = node;

    const edges = denormalizedDataMap(
        {
            emptyFn: () => [],
            scalarFn: () => [],
            relationalFn: (input) => {
                const mapped: Record<string, Edgeǁ[]> =
                    recordValueOrValueArrayFlatMap(
                        (value, key, index) =>
                            edge({
                                index,
                                kind: key as any,
                                sourceId: node.id,
                                sourceKind: node.kind,
                                targetId: (value as any).id,
                                targetKind: (value as any).kind,
                            }),
                        input.value,
                    );

                return Array.from(Object.values(mapped)).flatMap((x) => x);
            },
        },
        data,
    );

    return edges;
};

const normalizedData = (data: DenormalizedData): NormalizedData =>
    denormalizedDataMap(
        {
            emptyFn: () => normalizedEmpty(),
            scalarFn: (input) => normalizedScalar(input),
            relationalFn: (input) => normalizedRelational(),
        },
        data,
    );

const nodeFromNode = (node: DenormalizedNodeǁ): NormalizedNodeǁ => ({
    ...node,
    data: normalizedData(node.data) as any,
});

const kernel = (
    accumulator: Accumulator,
    denormalized: DenormalizedNodeǁ,
): void => {
    const node = nodeFromNode(denormalized);
    const edges = edgesFromNode(denormalized);

    accumulator.nodes.push(node);
    accumulator.edges.push(...edges);

    denormalizedDataMap(
        {
            relationalFn: (input) =>
                recordValueOrValueArrayMap((subNode) => {
                    kernel(accumulator, subNode as DenormalizedNodeǁ);
                }, input.value),
        },
        denormalized.data,
    );
};

export const normalize = (node: DenormalizedNodeǁ): Accumulator => {
    const accumulator = { nodes: [], edges: [] };
    kernel(accumulator, node);
    return accumulator;
};
