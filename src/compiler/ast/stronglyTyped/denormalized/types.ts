import { z } from "zod";

import { StrongNodeKind } from "../common";

import {
    strongDenormalizedDataParser,
    strongDenormalizedData_KindT_Parser,
    strongDenormalizedNodeParser,
    strongDenormalizedNode_KindT_Parser,
} from "./parsers";

/**
 * Strongly typed data in denormalized AST.
 */
export type StrongDenormalizedData<Kind extends StrongNodeKind> = z.infer<
    ReturnType<typeof strongDenormalizedDataParser<Kind>>
>;

/**
 * Strongly typed data in denormalized AST, marginalized over the `Kind` parameter.
 */
export type StrongDenormalizedData_KindT_ = z.infer<
    typeof strongDenormalizedData_KindT_Parser
>;

/**
 * Strongly typed node in denormalized AST, marginalized over all parameters.
 *
 * @alias StrongDenormalizedNode_KindT_
 */
export type StrongDenormalizedData_ = StrongDenormalizedData_KindT_;

/**
 * Strongly typed nodes in denormalized AST.
 */
export type StrongDenormalizedNode<Kind extends StrongNodeKind> = z.infer<
    ReturnType<typeof strongDenormalizedNodeParser<Kind>>
>;

/**
 * Strongly typed nodes in denormalized AST, marginalized over the `Kind` parameter.
 */
export type StrongDenormalizedNode_KindT_ = z.infer<
    typeof strongDenormalizedNode_KindT_Parser
>;

/**
 * Strongly typed nodes in denormalized AST, marginalized over all parameters.
 *
 * @alias StrongDenormalizedNode_KindT_
 */
export type StrongDenormalizedNode_ = StrongDenormalizedNode_KindT_;
