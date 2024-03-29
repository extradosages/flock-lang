import { Parser } from "../parse";

import { uniqueTermDefinitionBindings } from "./uniqueTermDefinitionBindings";

describe("uniqueTermDefinitionBindings", () => {
    it("throws an error if any term definitions have repeated bindings", () => {
        const ast = new Parser().parse(
            'defterm foo:Boolean true\ndefterm foo:String "string"',
        );
        expect(() => uniqueTermDefinitionBindings(ast)).toThrow();
    });

    it("doesn't throw an error in all of the term definitions have unique bindings", () => {
        const ast = new Parser().parse(
            'defterm foo:Boolean true\ndefterm bar:String "string"',
        );
        expect(() => uniqueTermDefinitionBindings(ast)).not.toThrow();
    });
});
