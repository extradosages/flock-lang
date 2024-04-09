import { z } from "zod";

import {
    weakEdgeKindParser,
    weakNodeKindParser,
    weakScalarData_ValueT_Parser,
} from "./parsers";

export type WeakNodeKind = z.infer<typeof weakNodeKindParser>;

export type WeakEdgeKind = z.infer<typeof weakEdgeKindParser>;

/**
 * Weakly typed scalar data in AST nodes, marginalized over the `Value` parameter.
 */
export type WeakScalarData_ValueT_ = z.infer<
    typeof weakScalarData_ValueT_Parser
>;

/**
 * Weakly typed scalar data in AST nodes, marginalized over all parameters.
 *
 * @alias WeakScalarData_ValueT_
 */
export type WeakScalarData_ = WeakScalarData_ValueT_;
