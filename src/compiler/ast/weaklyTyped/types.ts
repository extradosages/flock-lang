import { parserBundle } from "./parserBundles";
import { WeakNodeKind } from "./common";
import { WeakDenormalizedData } from "./denormalized";
import {
    WeakEdgeMap_SourceKindT_EdgeKindT_,
    WeakNormalizedData,
    WeakNormalizedNode,
} from "./normalized";

export type WeakAstParsers<
    Kind extends WeakNodeKind,
    DData extends WeakDenormalizedData,
    NData extends WeakNormalizedData,
    NEdges extends WeakEdgeMap_SourceKindT_EdgeKindT_,
> = ReturnType<typeof parserBundle<Kind, DData, NData, NEdges>>;
