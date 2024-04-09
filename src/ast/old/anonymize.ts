import { DenormalizedNode, Edgeǁ, NodeKind, NormalizedNodeǁ } from "./ast";
import { denormalizedDataMap } from "./nodeData";

export const anonymize = <Value extends { id: string }>(
    value: Value,
): Omit<Value, "id"> => {
    const { id: _id, ...rest } = value;
    return rest;
};

export const anonymizeDenormalizedNode = <K extends NodeKind>(
    node: DenormalizedNode<K>,
): unknown => {
    const { data } = node;
    const anonymizedData = denormalizedDataMap(
        { relationalFn: anonymizeDenormalizedNode as any },
        data,
    );
    return anonymize({ ...node, data: anonymizedData });
};

export const anonymizeNormalizedAst = (
    nodes: NormalizedNodeǁ[],
    edges: Edgeǁ[],
) => ({
    nodes: nodes.map(anonymize),
    edges: edges.map(anonymize),
});
