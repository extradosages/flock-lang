import { AstNodeUnknown, isSpecificNode, isTerm } from "@flock/ast";

import { parse } from "./parser";

const source =
    "defterm not:[^ Boolean -> Boolean ^] client\ndefterm or:[^ Boolean Boolean -> Boolean ^] [^ left-prop right-prop -> (not (and (not left-prop) (not right-prop))) ^]\ndeftype Number:Type [+ Integer Float +]";

describe("parse", () => {
    it("returns a list of nodes", () => {
        const actual = Array.isArray(parse(source));
        expect(actual).toBe(true);
    });

    it("returns a non-empty list of nodes (always)", () => {
        const actual = parse(source).length;
        expect(actual).toBeGreaterThan(0);
    });

    it("draws references to nodes in the ast from the list", () => {
        const ast = parse(source);

        const library = ast.find(isSpecificNode("library"));
        if (library === undefined) {
            throw new Error("`parse` failed to produce a library");
        }

        const termDefinition = library.data.termDefinitions[0];
        if (termDefinition === undefined) {
            throw new Error("`parse` failed to produce a term definition");
        }

        const actual = termDefinition;
        const expected = ast
            .filter(isSpecificNode("termDefinition"))
            .find((val) => val.data.binding === actual.data.binding);
        // Note the use of `.toBe` here; this is object identity, not serialized equality.
        expect(actual).toBe(expected);
    });
});
