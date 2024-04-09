import { z } from "zod";

import { Enumeration, StrongEdgeKind, StrongNodeKind } from "../common";

import {
    strongNormalizedDataParser,
    strongNormalizedData_KindT_Parser,
    strongNormalizedNodeParser,
    strongNormalizedNode_KindT_Parser,
} from "./parsers";

/**
 * Strongly typed data in normalized AST.
 */
export type StrongNormalizedData<Kind extends StrongNodeKind> = z.infer<
    ReturnType<typeof strongNormalizedDataParser<Kind>>
>;

/**
 * Strongly typed data in normalized AST, marginalized over the `Kind` parameter.
 */
export type StrongNormalizedData_KindT_ = z.infer<
    typeof strongNormalizedData_KindT_Parser
>;

/**
 * Strongly typed data in normalized AST, marginalized over all the parameters.
 *
 * @alias StrongNormalizedData_KindT_
 */
export type StrongNormalizedData_ = StrongNormalizedData_KindT_;

/**
 * Strongly typed nodes in normalized AST.
 */
export type StrongNormalizedNode<Kind extends StrongNodeKind> = z.infer<
    ReturnType<typeof strongNormalizedNodeParser<Kind>>
>;

/**
 * Strongly typed nodes in normalized AST, marginalized over the `Kind` parameter.
 */
export type StrongNormalizedNode_KindT_ = z.infer<
    typeof strongNormalizedNode_KindT_Parser
>;

/**
 * Strongly typed nodes in normalized AST, marginalized over all the parameters.
 *
 * @alias StrongNormalizedNode_KindT_
 */
export type StrongNormalizedNode_ = StrongNormalizedNode_KindT_;

/**
 * Strongly typed edge PARSERS in normalized AST.
 */
type StrongEdgeParser<
    SourceKind extends StrongNodeKind,
    EdgeKind extends StrongEdgeKind<SourceKind>,
> = Enumeration[SourceKind]["normalized"]["edges"][EdgeKind];

/**
 * Strongly typed edges in normalized AST.
 *
 * TODO: Derive from parser!
 *
 */
export type StrongEdge<
    SourceKind extends StrongNodeKind,
    EdgeKind extends StrongEdgeKind<SourceKind>,
> = z.infer<
    StrongEdgeParser<SourceKind, EdgeKind> extends z.ZodType
        ? StrongEdgeParser<SourceKind, EdgeKind>
        : never
>;

/**
 * Strongly typed edges in normalized AST, marginalized over the `EdgeKind` parameter.
 *
 * TODO: Derive from parser!
 */
export type StrongEdge_EdgeKindT_<SourceKind extends StrongNodeKind> =
    StrongEdge<SourceKind, StrongEdgeKind<SourceKind>>;

/**
 * Strongly typed edges in normalized AST, marginalized over all `EdgeKind` and `SourceKind` parameters.
 *
 * TODO: This type is totally broken, doesn't work at all.
 */
// export type StrongEdge_SourceKindT_EdgeKindT_ =
//     StrongEdge_EdgeKindT_<StrongNodeKind>;

/**
 * Strongly typed edges in normalized AST, marginalized over all the parameters.
 */
// export type StrongEdge_ = StrongEdge_SourceKindT_EdgeKindT_;
