import { Parser } from "../parse";
import { ErrorWithContext } from "../util/errorsWithContext";

import { resolveTypeReferences } from "./resolveTypeReferences";

describe("resolveTypeReferences", () => {
    it("resolves an un-nested reference to a binding in the library scope ", () => {
        const ast = new Parser().parse(
            "deftype Foo:Type Boolean\ndeftype Bar:Type Foo",
        );

        const FooBindingNodeId = ast.graph.findNode(
            (_, node) =>
                node.kind === "typeBinding" && node.data.value === "Foo",
        );
        if (FooBindingNodeId === undefined) {
            throw new ErrorWithContext({ ast }, "No Foo binding node found");
        }
        const FooReferenceNodeId = ast.graph.findNode(
            (_, node) =>
                node.kind === "typeReference" && node.data.value === "Foo",
        );
        if (FooReferenceNodeId === undefined) {
            throw new ErrorWithContext({ ast }, "No Foo reference node found");
        }

        const resolution = resolveTypeReferences(ast);

        const actual = resolution[FooReferenceNodeId];
        const expected = FooBindingNodeId;

        expect(actual).toBe(expected);
    });

    it("resolves a nested reference to a binding in the library scope", () => {
        const ast = new Parser().parse(
            "deftype Foo:Type Boolean\ndeftype Bar:Type ([^ Baz => Foo ^] Boolean)",
        );

        const FooBindingNodeId = ast.graph.findNode(
            (_, node) =>
                node.kind === "typeBinding" && node.data.value === "Foo",
        );
        if (FooBindingNodeId === undefined) {
            throw new ErrorWithContext({ ast }, "No Foo binding node found");
        }
        const FooReferenceNodeId = ast.graph.findNode(
            (_, node) =>
                node.kind === "typeReference" && node.data.value === "Foo",
        );
        if (FooReferenceNodeId === undefined) {
            throw new ErrorWithContext({ ast }, "No Foo reference node found");
        }

        const resolution = resolveTypeReferences(ast);

        const actual = resolution[FooReferenceNodeId];
        const expected = FooBindingNodeId;

        expect(actual).toBe(expected);
    });

    it("resolves a reference to a binding in a generic type constructor scope", () => {
        const ast = new Parser().parse("deftype Foo:Type [^ Bar => Bar ^]");

        const BarBindingNodeId = ast.graph.findNode(
            (_, node) =>
                node.kind === "typeBinding" && node.data.value === "Bar",
        );
        if (BarBindingNodeId === undefined) {
            throw new ErrorWithContext({ ast }, "No Bar binding node found");
        }
        const BarReferenceNodeId = ast.graph.findNode(
            (_, node) =>
                node.kind === "typeReference" && node.data.value === "Bar",
        );
        if (BarReferenceNodeId === undefined) {
            throw new ErrorWithContext({ ast }, "No Bar reference node found");
        }

        const resolution = resolveTypeReferences(ast);

        const actual = resolution[BarReferenceNodeId];
        const expected = BarBindingNodeId;

        expect(actual).toBe(expected);
    });

    it("resolves a nested reference to a binding in a generic type constructor scope", () => {
        const ast = new Parser().parse(
            "deftype Foo:Type [^ Bar => ([^ Baz => Bar ^] Boolean) ^]",
        );

        const BarBindingNodeId = ast.graph.findNode(
            (_, node) =>
                node.kind === "typeBinding" && node.data.value === "Bar",
        );
        if (BarBindingNodeId === undefined) {
            throw new ErrorWithContext({ ast }, "No Bar binding node found");
        }
        const BarReferenceNodeId = ast.graph.findNode(
            (_, node) =>
                node.kind === "typeReference" && node.data.value === "Bar",
        );
        if (BarReferenceNodeId === undefined) {
            throw new ErrorWithContext({ ast }, "No Bar reference node found");
        }

        const resolution = resolveTypeReferences(ast);

        const actual = resolution[BarReferenceNodeId];
        const expected = BarBindingNodeId;

        expect(actual).toBe(expected);
    });

    it("resolves a reference in a scope when the resolved binding shadows one in a broader scope", () => {
        const ast = new Parser().parse(
            "deftype Foo:Type Boolean\ndeftype Bar:Type [^ Foo => Foo ^]",
        );

        const FooBindingNodeId = ast.graph.findNode((_, node) => {
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
        if (FooBindingNodeId === undefined) {
            throw new ErrorWithContext({ ast }, "No Foo binding node found");
        }
        const FooReferenceNodeId = ast.graph.findNode(
            (_, node) =>
                node.kind === "typeReference" && node.data.value === "Foo",
        );
        if (FooReferenceNodeId === undefined) {
            throw new ErrorWithContext({ ast }, "No Foo reference node found");
        }

        const resolution = resolveTypeReferences(ast);

        const actual = resolution[FooReferenceNodeId];
        const expected = FooBindingNodeId;

        expect(actual).toBe(expected);
    });

    it("throws an error if a reference is unresolvable", () => {
        const ast = new Parser().parse("deftype Foo:Type Bar");

        expect(() => resolveTypeReferences(ast)).toThrow();
    });
});
