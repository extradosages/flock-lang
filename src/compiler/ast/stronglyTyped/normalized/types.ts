import { z } from "zod";

import {
    StrongEdgeKind,
    StrongEdgeSourceKind,
    StrongEdges,
    StrongNodeKind,
} from "../common";

import {
    strongNormalizedDataParser,
    strongNormalizedData_KindT_Parser,
    strongNormalizedLargeTypeNodeParser,
    strongNormalizedNodeParser,
    strongNormalizedNode_KindT_Parser,
    strongNormalizedSmallTypeNodeParser,
    strongNormalizedTermNodeParser,
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
 * Strongly typed term nodes in normalized AST.
 */
export type StrongNormalizedTermNode = z.infer<
    typeof strongNormalizedTermNodeParser
>;

/**
 * Strongly typed small type nodes in normalized AST.
 */
export type StrongNormalizedSmallTypeNode = z.infer<
    typeof strongNormalizedSmallTypeNodeParser
>;

/**
 * Strongly typed large type nodes in normalized AST.
 */
export type StrongNormalizedLargeTypeNode = z.infer<
    typeof strongNormalizedLargeTypeNodeParser
>;

type StrongEdgeParser<
    SourceKind extends StrongEdgeSourceKind,
    EdgeKind extends StrongEdgeKind<SourceKind>,
> = StrongEdges[SourceKind][EdgeKind];

/**
 * Strongly typed edges in normalized AST.
 */
export type StrongEdge<
    SourceKind extends StrongEdgeSourceKind,
    EdgeKind extends StrongEdgeKind<SourceKind>,
> = z.infer<
    StrongEdgeParser<SourceKind, EdgeKind> extends z.ZodTypeAny
        ? StrongEdgeParser<SourceKind, EdgeKind>
        : never
>;

/**
 * Strongly typed edges in normalized AST, marginalized over the `EdgeKind` parameter.
 */
export type StrongEdge_EdgeKindT_<SourceKind extends StrongEdgeSourceKind> =
    StrongEdge<SourceKind, StrongEdgeKind<SourceKind>>;

/**
 * Strongly typed edges in normalized AST, marginalized over all `EdgeKind` and `SourceKind` parameters.
 *
 * This definition is crazy but it is necessary to avoid this type collapsing to `never`.
 */
export type StrongEdge_SourceKindT_EdgeKindT_ = {
    [SourceKind in StrongEdgeSourceKind]: StrongEdge_EdgeKindT_<SourceKind>;
}[StrongEdgeSourceKind];

/**
 * Strongly typed edges in normalized AST, marginalized over all the parameters.
 */
export type StrongEdge_ = StrongEdge_SourceKindT_EdgeKindT_;

/**
 * Strongly typed edge target kind in normalized AST.
 */
export type StrongEdgeTargetKind<
    SourceKind extends StrongEdgeSourceKind,
    EdgeKind extends StrongEdgeKind<SourceKind>,
> = StrongEdge<SourceKind, EdgeKind>["targetKind"];
