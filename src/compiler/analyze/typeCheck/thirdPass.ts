/**
 * Type checking third pass (specialization).
 *
 * In this pass, we descend down the term tree of each term definition, and attempt to specialize
 * encountered types by serially binding type variables.
 */
