import { WeakEdgeKind, WeakNodeKind } from "./common";
import { WeakDenormalizedData } from "./denormalized";
import {
    WeakEdgeMap_SourceKindT_EdgeKindT_,
    WeakNormalizedData,
} from "./normalized";
import { parserBundle } from "./parserBundles";

export type WeakAstParsers<
    Kind extends WeakNodeKind,
    DData extends WeakDenormalizedData,
    NData extends WeakNormalizedData,
    EdgeKind extends WeakEdgeKind,
    NEdges extends WeakEdgeMap_SourceKindT_EdgeKindT_,
> = ReturnType<typeof parserBundle<DData, EdgeKind, Kind, NData, NEdges>>;
