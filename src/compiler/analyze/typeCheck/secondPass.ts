/**
 * Type checking second pass (resolution).
 *
 * During the second pass all term references are resolved and their corresponding type variables
 * are bound to the types of the resolutions. This enables elimination of the function elimination
 * utilities/intermediates, so as an additional step, these types are replaced with inferrable
 * "codomain" types.
 */
