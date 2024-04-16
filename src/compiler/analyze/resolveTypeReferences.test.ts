import { Parser } from "../parse";
import { ErrorWithContext } from "../util/errorsWithContext";

import { TypeResolution } from "./resolveTypeReferences";

describe("resolveTypeReferences", () => {
    it("resolves an un-nested reference to a binding in the library scope ", () => {
        const ast = new Parser().parse(
            "deftype Foo:Type Boolean\ndeftype Bar:Type Foo",
        );

        const fooBindingNodeId = ast.graph.findNode(
            (_, node) =>
                node.kind === "typeBinding" && node.data.value === "Foo",
        );
        if (fooBindingNodeId === undefined) {
            throw new ErrorWithContext({ ast }, "No Foo binding node found");
        }
        const fooReferenceNodeId = ast.graph.findNode(
            (_, node) =>
                node.kind === "typeReference" && node.data.value === "Foo",
        );
        if (fooReferenceNodeId === undefined) {
            throw new ErrorWithContext({ ast }, "No Foo reference node found");
        }

        const resolution = new TypeResolution(ast);

        const actual = resolution.lookup(fooReferenceNodeId);
        const expected = fooBindingNodeId;

        expect(actual).toBe(expected);
    });

    it("resolves a nested reference to a binding in the library scope", () => {
        const ast = new Parser().parse(
            "deftype Foo:Type Boolean\ndeftype Bar:Type ([^ Baz => Foo ^] Boolean)",
        );

        const fooBindingNodeId = ast.graph.findNode(
            (_, node) =>
                node.kind === "typeBinding" && node.data.value === "Foo",
        );
        if (fooBindingNodeId === undefined) {
            throw new ErrorWithContext({ ast }, "No Foo binding node found");
        }
        const fooReferenceNodeId = ast.graph.findNode(
            (_, node) =>
                node.kind === "typeReference" && node.data.value === "Foo",
        );
        if (fooReferenceNodeId === undefined) {
            throw new ErrorWithContext({ ast }, "No Foo reference node found");
        }

        const resolution = new TypeResolution(ast);

        const actual = resolution.lookup(fooReferenceNodeId);
        const expected = fooBindingNodeId;

        expect(actual).toBe(expected);
    });

    it("resolves a reference to a binding in a generic type constructor scope", () => {
        const ast = new Parser().parse("deftype Foo:Type [^ Bar => Bar ^]");

        const barBindingNodeId = ast.graph.findNode(
            (_, node) =>
                node.kind === "typeBinding" && node.data.value === "Bar",
        );
        if (barBindingNodeId === undefined) {
            throw new ErrorWithContext({ ast }, "No Bar binding node found");
        }
        const barReferenceNodeId = ast.graph.findNode(
            (_, node) =>
                node.kind === "typeReference" && node.data.value === "Bar",
        );
        if (barReferenceNodeId === undefined) {
            throw new ErrorWithContext({ ast }, "No Bar reference node found");
        }

        const resolution = new TypeResolution(ast);

        const actual = resolution.lookup(barReferenceNodeId);
        const expected = barBindingNodeId;

        expect(actual).toBe(expected);
    });

    it("resolves a nested reference to a binding in a generic type constructor scope", () => {
        const ast = new Parser().parse(
            "deftype Foo:Type [^ Bar => ([^ Baz => Bar ^] Boolean) ^]",
        );

        const barBindingNodeId = ast.graph.findNode(
            (_, node) =>
                node.kind === "typeBinding" && node.data.value === "Bar",
        );
        if (barBindingNodeId === undefined) {
            throw new ErrorWithContext({ ast }, "No Bar binding node found");
        }
        const barReferenceNodeId = ast.graph.findNode(
            (_, node) =>
                node.kind === "typeReference" && node.data.value === "Bar",
        );
        if (barReferenceNodeId === undefined) {
            throw new ErrorWithContext({ ast }, "No Bar reference node found");
        }

        const resolution = new TypeResolution(ast);

        const actual = resolution.lookup(barReferenceNodeId);
        const expected = barBindingNodeId;

        expect(actual).toBe(expected);
    });

    it("resolves a reference in a scope when the resolved binding shadows one in a broader scope", () => {
        const ast = new Parser().parse(
            "deftype Foo:Type Boolean\ndeftype Bar:Type [^ Foo => Foo ^]",
        );

        const fooBindingNodeId = ast.graph.findNode((_, node) => {
            const isFooBinding =
                node.kind === "typeBinding" && node.data.value === "Foo";
            const isLambdaConstructorDomainBinding =
                ast.graph.filterInNeighbors(
                    node.id,
                    (_, parentNode) =>
                        parentNode.kind === "genericTypeConstructor",
                ).length > 0;
            return isFooBinding && isLambdaConstructorDomainBinding;
        });
        if (fooBindingNodeId === undefined) {
            throw new ErrorWithContext({ ast }, "No Foo binding node found");
        }
        const fooReferenceNodeId = ast.graph.findNode(
            (_, node) =>
                node.kind === "typeReference" && node.data.value === "Foo",
        );
        if (fooReferenceNodeId === undefined) {
            throw new ErrorWithContext({ ast }, "No Foo reference node found");
        }

        const resolution = new TypeResolution(ast);

        const actual = resolution.lookup(fooReferenceNodeId);
        const expected = fooBindingNodeId;

        expect(actual).toBe(expected);
    });

    it("throws an error if a reference is unresolvable", () => {
        const ast = new Parser().parse("deftype Foo:Type Bar");

        expect(() => new TypeResolution(ast)).toThrow();
    });
});
