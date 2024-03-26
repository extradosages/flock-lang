import * as ast from "@flock/ast";

const nodesWithTypeSemantics = [] as const satisfies ast.NodeUnknown[];

type NodeWithTypeSemantics = (typeof nodesWithTypeSemantics)[number];

type TypeSemanticsMixin = {
    knownType?: ast.SmallType;
    expectedType?: ast.SmallType;
};
