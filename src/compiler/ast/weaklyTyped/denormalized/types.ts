import { z } from "zod";

import { WeakNodeKind } from "../common/types";

import {
    weakDenormalizedDataParser,
    weakDenormalizedRelationalDataParser,
    weakDenormalizedRelationalData_ValueT_Parser,
    weakDenormalizedNodeParser,
    weakDenormalizedNode_DataT_Parser,
    weakDenormalizedNode_KindT_Parser,
    weakDenormalizedNode_ValueT_DataT_Parser,
    weakDenormalizedRelationalData_TT_ValueT_Parser,
} from "./parsers";

/**
 * Weakly typed relational data in denormalized AST.
 *
 * We've got two type parameters here to make type inference a little easier.
 */
export type WeakDenormalizedRelationalData<
    T,
    Value extends Record<string, T | T[]>,
> = z.infer<ReturnType<typeof weakDenormalizedRelationalDataParser<T, Value>>>;

/**
 * Weakly typed relational data in denormalized AST, marginalized over the `Value` parameter.
 */
export type WeakDenormalizedRelationalData_ValueT_<T> = z.infer<
    ReturnType<typeof weakDenormalizedRelationalData_ValueT_Parser<T>>
>;

/**
 * Weakly typed relational data in denormalized AST, marginalized over the `T` and `Value` parameters.
 */
export type WeakDenormalizedRelationalData_TT_ValueT_ = z.infer<
    typeof weakDenormalizedRelationalData_TT_ValueT_Parser
>;

/**
 * Weakly typed relational data in denormalized AST, marginalized over all parameters.
 *
 * @alias WeakDenormalizedRelationalData_TT_ValueT_
 */
export type WeakDenormalizedRelationalData_ =
    WeakDenormalizedRelationalData_TT_ValueT_;

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
