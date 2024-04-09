import { z } from "zod";

import {
    booleanTerm,
    booleanType,
    clientImplementation,
    floatTerm,
    floatType,
    functionTermEliminator,
    functionType,
    genericTypeConstructor,
    genericTypeEliminator,
    integerTerm,
    integerType,
    largeTypeType,
    library,
    productTermConstructor,
    productTermEliminator,
    productType,
    stringTerm,
    stringType,
    sumTermConstructor,
    sumTermEliminator,
    sumType,
    termBinding,
    termDefinition,
    termReference,
    typeBinding,
    typeDefinition,
    typeReference,
} from "../../defs/ast";

const index = {
    booleanTerm,
    booleanType,
    clientImplementation,
    floatTerm,
    floatType,
    functionTermEliminator,
    functionType,
    genericTypeConstructor,
    genericTypeEliminator,
    integerTerm,
    integerType,
    largeTypeType,
    library,
    productTermConstructor,
    productTermEliminator,
    productType,
    stringTerm,
    stringType,
    sumTermConstructor,
    sumTermEliminator,
    sumType,
    termBinding,
    termDefinition,
    termReference,
    typeBinding,
    typeDefinition,
    typeReference,
};

type Index = typeof index;

export type NodeKind = keyof Index;

// Normalized

export const normalizedNodeParser = <K extends NodeKind>(kind: K) =>
    index[kind].normalized.node;

export type NormalizedNode<K extends NodeKind> = z.infer<
    Index[K]["normalized"]["node"]
>;

export type NormalizedNodeǁ = NormalizedNode<NodeKind>;

export const sourceEdgeParsers = <SK extends NodeKind>(sourceKind: SK) =>
    index[sourceKind].normalized.edges;

export type EdgeǁEdgeKind<SK extends NodeKind> = z.infer<
    Index[SK]["normalized"]["edges"][number]
>;

export type Edgeǁ = EdgeǁEdgeKind<NodeKind>;

export type EdgeKind<SK extends NodeKind> = EdgeǁEdgeKind<SK>["kind"];

export type EdgeKindǁ = EdgeKind<NodeKind>;

export type Edge<
    SK extends NodeKind,
    EK extends EdgeKind<SK>,
> = EdgeǁEdgeKind<SK> & { kind: EK };

export type EdgeTargetKind<SK extends NodeKind, EK extends EdgeKind<SK>> = Edge<
    SK,
    EK
>["targetKind"];

// Denormalized

export const denormalizedNodeParser = <K extends NodeKind>(kind: K) =>
    index[kind].denormalized.node;

export type DenormalizedNode<K extends NodeKind> = z.infer<
    Index[K]["denormalized"]["node"]
>;

export type DenormalizedNodeǁ = DenormalizedNode<NodeKind>;

export type DenormalizedNodeData<K extends NodeKind> =
    DenormalizedNode<K>["data"];

export type DenormalizedNodeDataDimensionality<K extends NodeKind> =
    DenormalizedNodeData<K>["dimensionality"];

export type DenormalizedNodeDataValue<K extends NodeKind> =
    DenormalizedNodeData<K> extends { value: infer Value } ? Value : undefined;
