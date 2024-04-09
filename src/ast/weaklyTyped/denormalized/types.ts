import { z } from "zod";

import { WeakNodeKind } from "../common/types";

import {
    weakDenormalizedDataParser,
    weakDenormalizedEmptyParser,
    weakDenormalizedRelationalParser,
    weakDenormalizedRelational_ValueT_Parser,
    weakDenormalizedRelational_ValueT_RecordValueT_Parser,
    weakDenormalizedScalarParser,
    weakDenormalizedScalar_ValueT_Parser,
} from "./parsers/data";
import {
    weakDenormalizedNodeParser,
    weakDenormalizedNode_DataT_Parser,
    weakDenormalizedNode_KindT_Parser,
    weakDenormalizedNode_ValueT_DataT_Parser,
} from "./parsers/nodes";

/**
 * Weakly typed empty data in denormalized AST.
 */
export type WeakDenormalizedEmpty = z.infer<typeof weakDenormalizedEmptyParser>;

/**
 * Weakly typed scalar data in denormalized AST.
 */
export type WeakDenormalizedScalar<Value> = z.infer<
    ReturnType<typeof weakDenormalizedScalarParser<Value>>
>;

/**
 * Weakly typed scalar data in denormalized AST, marginalized over the `Value` parameter.
 */
export type WeakDenormalizedScalar_ValueT_ = z.infer<
    typeof weakDenormalizedScalar_ValueT_Parser
>;

/**
 * Weakly typed scalar data in denormalized AST, marginalized over all parameters.
 *
 * @alias WeakDenormalizedScalar_ValueT_
 */
export type WeakDenormalizedScalar_ = WeakDenormalizedScalar_ValueT_;

/**
 * Weakly typed relational data in denormalized AST.
 */
export type WeakDenormalizedRelational<
    RecordValue,
    Value extends Record<string, RecordValue | RecordValue[]>,
> = z.infer<
    ReturnType<typeof weakDenormalizedRelationalParser<RecordValue, Value>>
>;

/**
 * Weakly typed relational data in denormalized AST, marginalized over the `Value` parameter.
 */
export type WeakDenormalizedRelational_ValueT_<RecordValue> = z.infer<
    ReturnType<typeof weakDenormalizedRelational_ValueT_Parser<RecordValue>>
>;

/**
 * Weakly typed relational data in denormalized AST, marginalized over the `RecordValue` and `Value` parameters.
 */
export type WeakDenormalizedRelational_ValueT_RecordValueT_ = z.infer<
    typeof weakDenormalizedRelational_ValueT_RecordValueT_Parser
>;

/**
 * Weakly typed relational data in denormalized AST, marginalized over all parameters.
 *
 * @alias WeakDenormalizedRelational_ValueT_RecordValueT_
 */
export type WeakDenormalizedRelational_ =
    WeakDenormalizedRelational_ValueT_RecordValueT_;

/**
 * Weakly typed data in denormalized AST.
 */
export type WeakDenormalizedData = z.infer<typeof weakDenormalizedDataParser>;

/**
 * Weakly typed node in denormalized AST.
 */
export type WeakDenormalizedNode<
    Kind extends WeakNodeKind,
    Data extends WeakDenormalizedData,
> = z.infer<ReturnType<typeof weakDenormalizedNodeParser<Kind, Data>>>;

/**
 * Weakly typed node in denormalized AST, marginalized over the `Kind` parameter.
 */
export type WeakDenormalizedNode_KindT_<Data extends WeakDenormalizedData> =
    z.infer<ReturnType<typeof weakDenormalizedNode_KindT_Parser<Data>>>;

/**
 * Weakly typed node in denormalized AST, marginalized over the `Data` parameter.
 */
export type WeakDenormalizedNode_DataT_<Kind extends WeakNodeKind> = z.infer<
    ReturnType<typeof weakDenormalizedNode_DataT_Parser<Kind>>
>;

/**
 * Weakly typed node in denormalized AST, marginalized over the `Kind` and `Data` parameters.
 */
export type WeakDenormalizedNode_KindT_DataT_ = z.infer<
    typeof weakDenormalizedNode_ValueT_DataT_Parser
>;

/**
 * Weakly typed node in denormalized AST, marginalized over all parameters.
 *
 * @alias WeakDenormalizedNode_KindT_DataT_
 */
export type WeakDenormalizedNode_ = WeakDenormalizedNode_KindT_DataT_;
