import { NormalizedAst, StrongNodeKind, StrongNormalizedNode } from "../ast";
import { Scopes } from "./scopes";

type SmallTypeKind = StrongNodeKind;
type SmallType = StrongNormalizedNode<SmallTypeKind>;
type LargeTypeKind = StrongNodeKind;
type LargeType = StrongNormalizedNode<LargeTypeKind>;
type TermKind = StrongNodeKind;
type Term = StrongNormalizedNode<TermKind>;

type TypeCheck = {
    descendingLargeType: LargeType;
    descendingSmallType: SmallType;
    ascendingType: SmallType;
};

const descend = (Record<TermKind> = (
    ast: NormalizedAst,
    term: Term,
    type: SmallType,
) => {});

const ascend = (ast: NormalizedAst, term: Term) => {};

const typeCheckTermDefinition = (
    ast: NormalizedAst,
    scopes: Scopes,
    typeReferenceResolution: Record<string, string>,
    termReferenceResolution: Record<string, string>,
    termDefinitionId: string,
) => {};
