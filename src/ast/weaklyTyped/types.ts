import { weakAstParsers } from "./ast";
import { WeakNodeKind } from "./common";
import { WeakDenormalizedData, WeakDenormalizedNode } from "./denormalized";
import {
    WeakEdgeMap_SourceKindT_EdgeKindT_,
    WeakNormalizedData,
    WeakNormalizedNode,
} from "./normalized";

export type WeakAstParsers<
    Kind extends WeakNodeKind,
    DData extends WeakDenormalizedData,
    DNode extends WeakDenormalizedNode<Kind, DData>,
    NData extends WeakNormalizedData,
    NNode extends WeakNormalizedNode<Kind, NData>,
    NEdges extends WeakEdgeMap_SourceKindT_EdgeKindT_,
> = ReturnType<typeof weakAstParsers<Kind, DData, DNode, NData, NNode, NEdges>>;
