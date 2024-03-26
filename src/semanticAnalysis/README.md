# `semanticAnalysis`

The semantic analysis module.

## Overview

The current steps in semantic analysis are:

1. Bindings are unique.
    1. Verify that the bindings across term definitions are unique.
    1. Verify that the bindings across type definitions are unique.
    1. For each lambda constructor, verify that the bindings are unique.
    1. For each generic type constructor, verify that the bindings are unique.
1. References are resolvable.
    1. Verify that each term reference is resolvable.
    1. Verify that each type reference is resolvable.
1. Top-down type-checking.
