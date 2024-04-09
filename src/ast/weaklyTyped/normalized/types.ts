import { z } from "zod";

import {
    weakEdgeParser,
    weakEdge_KindT_ManyToOneT_Parser,
    weakEdge_TargetKindT_KindT_ManyToOneT_Parser,
    weakNormalizedDataParser,
    weakNormalizedEmptyParser,
    weakNormalizedNodeParser,
    weakNormalizedNode_KindT_Parser,
    weakNormalizedNode_KindT_DataT_Parser,
    weakNormalizedRelationalParser,
    weakNormalizedScalarParser,
    weakNormalizedScalar_ValueT_Parser,
    weakNormalizedNode_DataT_Parser,
    weakEdge_SourceKindT_TargetKindT_KindT_ManyToOneT_Parser,
    weakEdge_TargetKindT_ManyToOneT_Parser,
} from "./parsers";
import { WeakEdgeKind, WeakNodeKind } from "../common";

/**
 * Weakly typed empty data in normalized AST.
 */
export type WeakNormalizedEmpty = z.infer<typeof weakNormalizedEmptyParser>;

/**
 * Weakly typed scalar data in normalized AST.
 */
export type WeakNormalizedScalar<Value> = z.infer<
    ReturnType<typeof weakNormalizedScalarParser<Value>>
>;

/**
 * Weakly typed scalar data in normalized AST, marginalized over `Value` parameter.
 */
export type WeakNormalizedScalar_ValueT_ = z.infer<
    typeof weakNormalizedScalar_ValueT_Parser
>;

/**
 * Weakly typed scalar data in normalized AST, marginalized over all parameters.
 *
 * @alias WeakNormalizedScalar_ValueT_
 */
export type WeakNormalizedScalar_ = WeakNormalizedScalar_ValueT_;

/**
 * Weakly typed relational data in normalized AST.
 */
export type WeakNormalizedRelational = z.infer<
    typeof weakNormalizedRelationalParser
>;

/**
 * Weakly typed data in normalized AST.
 */
export type WeakNormalizedData = z.infer<typeof weakNormalizedDataParser>;

/**
 * Weakly typed nodes in normalized AST.
 */
export type WeakNormalizedNode<
    Kind extends string,
    Data extends WeakNormalizedData,
> = z.infer<ReturnType<typeof weakNormalizedNodeParser<Kind, Data>>>;

/**
 * Weakly typed nodes in normalized AST, marginalized over `Kind` parameter.
 */
export type WeakNormalizedNode_KindT_<Data extends WeakNormalizedData> =
    z.infer<ReturnType<typeof weakNormalizedNode_KindT_Parser<Data>>>;

/**
 * Weakly typed nodes in normalized AST, marginalized over `Data` parameter.
 */
export type WeakNormalizedNode_DataT_<Kind extends string> = z.infer<
    ReturnType<typeof weakNormalizedNode_DataT_Parser<Kind>>
>;

/**
 * Weakly typed nodes in normalized AST, marginalized over `Kind` and `Data` parameters.
 */
export type WeakNormalizedNode_KindT_DataT_ = z.infer<
    typeof weakNormalizedNode_KindT_DataT_Parser
>;

/**
 * Weakly typed nodes in normalized AST, marginalized over all parameters.
 *
 * @alias WeakNormalizedNode_KindT_DataT_
 */
export type WeakNormalizedNode_ = WeakNormalizedNode_KindT_DataT_;

/**
 * Weakly typed edges in normalized AST.
 */
export type WeakEdge<
    SourceKind extends WeakNodeKind,
    TargetKind extends WeakNodeKind,
    Kind extends WeakEdgeKind,
    ManyToOne extends boolean,
> = z.infer<
    ReturnType<typeof weakEdgeParser<Kind, SourceKind, TargetKind, ManyToOne>>
>;

/**
 * Weakly typed edges in normalized AST, marginalized over `TargetKind` and `ManyToOne` parameters.
 */
export type WeakEdge_TargetKindT_ManyToOneT_<
    SourceKind extends WeakNodeKind,
    Kind extends WeakEdgeKind,
> = z.infer<
    ReturnType<typeof weakEdge_TargetKindT_ManyToOneT_Parser<SourceKind, Kind>>
>;

/**
 * Weakly typed edges in normalized AST, marginalized over `Kind` and `ManyToOne` parameters.
 */
export type WeakEdge_KindT_ManyToOneT_<
    SourceKind extends WeakNodeKind,
    TargetKind extends WeakNodeKind,
> = z.infer<
    ReturnType<typeof weakEdge_KindT_ManyToOneT_Parser<SourceKind, TargetKind>>
>;

/**
 * Weakly typed edges in normalized AST, marginalized over `TargetKind`, `Kind`, and `ManyToOne` parameters.
 */
export type WeakEdge_TargetKindT_KindT_ManyToOneT_<
    SourceKind extends WeakNodeKind,
> = z.infer<
    ReturnType<typeof weakEdge_TargetKindT_KindT_ManyToOneT_Parser<SourceKind>>
>;

/**
 * Weakly typed edges in normalized AST, marginalized over `SourceKind`, `TargetKind`, `Kind`, and `ManyToOne` parameters.
 */
export type WeakEdge_SourceKindT_TargetKindT_KindT_ManyToOneT_ = z.infer<
    typeof weakEdge_SourceKindT_TargetKindT_KindT_ManyToOneT_Parser
>;

/**
 * Weakly typed edges in normalized AST, marginalized over all parameters.
 *
 * @alias WeakEdge_SourceKindT_TargetKindT_KindT_ManyToOneT_
 */
export type WeakEdge_ = WeakEdge_SourceKindT_TargetKindT_KindT_ManyToOneT_;

/**
 * Weakly typed edges in a record, all associated to a source kind, keyed by their kind.
 *
 * For use in auxiliary data structures used for defining AST.
 */
export type WeakEdgeMap<
    SourceKind extends WeakNodeKind,
    EdgeKind extends WeakEdgeKind,
> = Record<
    EdgeKind,
    z.ZodType<WeakEdge_TargetKindT_ManyToOneT_<SourceKind, EdgeKind>>
>;

/**
 * Weakly typed edges in a record.
 *
 * For use in auxiliary data structures used for defining AST.
 */
export type WeakEdgeMap_SourceKindT_EdgeKindT_ = WeakEdgeMap<
    WeakNodeKind,
    WeakEdgeKind
>;

/**
 * Weakly typed edges in a record.
 */
export type WeakEdgeMap_ = WeakEdgeMap_SourceKindT_EdgeKindT_;
