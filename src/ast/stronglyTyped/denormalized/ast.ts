import { StrongNodeKind } from "../common";

import { StrongDenormalizedNode } from "./types";

export class DenormalizedAst<Kind extends StrongNodeKind> {
    #root: StrongDenormalizedNode<Kind>;

    constructor(root: StrongDenormalizedNode<Kind>) {
        this.#root = root;
    }

    root() {
        return this.#root;
    }

    normalize() {}
}
