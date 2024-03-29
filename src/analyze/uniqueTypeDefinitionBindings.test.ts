import { Parser } from "../parse";

import { uniqueTypeDefinitionBindings } from "./uniqueTypeDefinitionBindings";

describe("uniqueTypeDefinitionBindings", () => {
    it("throws an error if any type definitions have repeated bindings", () => {
        const ast = new Parser().parse(
            "deftype Foo:Type Boolean\ndeftype Foo:Type String",
        );
        expect(() => uniqueTypeDefinitionBindings(ast)).toThrow();
    });

    it("doesn't throw an error if all the type definitions have unique bindings", () => {
        const ast = new Parser().parse(
            "deftype Foo:Type Boolean\ndeftype Bar:Type String",
        );
        expect(() => uniqueTypeDefinitionBindings(ast)).not.toThrow();
    });
});
