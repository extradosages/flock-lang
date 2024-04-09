import { anonymizeDenormalizedNode } from "./anonymize";
import { DenormalizedNode, NodeKind } from "./ast/strong";

export class DenormalizedAst<Kind extends NodeKind> {
    #root: DenormalizedNode<Kind>;

    constructor(root: DenormalizedNode<Kind>) {
        this.#root = root;
    }

    anonymize() {
        return anonymizeDenormalizedNode(this.#root);
    }

    root() {
        return this.#root;
    }
}
