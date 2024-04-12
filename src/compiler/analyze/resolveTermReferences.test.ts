import { Parser } from "../parse";
import { ErrorWithContext } from "../util/errorsWithContext";

import { resolveTermReferences } from "./resolveTermReferences";

describe("resolveTermReferences", () => {
    it("resolves an un-nested reference to a binding in the library scope ", () => {
        const ast = new Parser().parse(
            "defterm foo:Boolean client\ndefterm bar:Boolean foo",
        );

        const fooBindingNodeId = ast.graph.findNode(
            (_, node) =>
                node.kind === "termBinding" && node.data.value === "foo",
        );
        if (fooBindingNodeId === undefined) {
            throw new ErrorWithContext({ ast }, "No foo binding node found");
        }
        const fooReferenceNodeId = ast.graph.findNode(
            (_, node) =>
                node.kind === "termReference" && node.data.value === "foo",
        );
        if (fooReferenceNodeId === undefined) {
            throw new ErrorWithContext({ ast }, "No foo reference node found");
        }

        const resolution = resolveTermReferences(ast);

        const actual = resolution[fooReferenceNodeId];
        const expected = fooBindingNodeId;

        expect(actual).toBe(expected);
    });

    it("resolves a nested reference to a binding in the library scope", () => {
        const ast = new Parser().parse(
            "defterm foo:Boolean client\ndefterm bar:[^ Boolean -> Boolean ^] [^ baz -> foo ^]",
        );

        const fooBindingNodeId = ast.graph.findNode(
            (_, node) =>
                node.kind === "termBinding" && node.data.value === "foo",
        );
        if (fooBindingNodeId === undefined) {
            throw new ErrorWithContext({ ast }, "No foo binding node found");
        }
        const fooReferenceNodeId = ast.graph.findNode(
            (_, node) =>
                node.kind === "termReference" && node.data.value === "foo",
        );
        if (fooReferenceNodeId === undefined) {
            throw new ErrorWithContext({ ast }, "No foo reference node found");
        }

        const resolution = resolveTermReferences(ast);

        const actual = resolution[fooReferenceNodeId];
        const expected = fooBindingNodeId;

        expect(actual).toBe(expected);
    });

    it("resolves an un-nested reference to a binding in a lambda constructor scope", () => {
        const ast = new Parser().parse(
            "defterm foo:[^ Boolean -> Boolean ^] [^ bar -> bar ^]",
        );

        const barBindingNodeId = ast.graph.findNode(
            (_, node) =>
                node.kind === "termBinding" && node.data.value === "bar",
        );
        if (barBindingNodeId === undefined) {
            throw new ErrorWithContext({ ast }, "No bar binding node found");
        }
        const barReferenceNodeId = ast.graph.findNode(
            (_, node) =>
                node.kind === "termReference" && node.data.value === "bar",
        );
        if (barReferenceNodeId === undefined) {
            throw new ErrorWithContext({ ast }, "No bar reference node found");
        }

        const resolution = resolveTermReferences(ast);

        const actual = resolution[barReferenceNodeId];
        const expected = barBindingNodeId;

        expect(actual).toBe(expected);
    });

    it("resolves a nested reference to a binding in a lambda constructor scope", () => {
        const ast = new Parser().parse(
            "defterm foo:[^ Boolean -> [^ Boolean -> Boolean ^] ^] [^ bar -> [^ baz -> bar ^] ^]",
        );

        const barBindingNodeId = ast.graph.findNode(
            (_, node) =>
                node.kind === "termBinding" && node.data.value === "bar",
        );
        if (barBindingNodeId === undefined) {
            throw new ErrorWithContext({ ast }, "No bar binding node found");
        }
        const barReferenceNodeId = ast.graph.findNode(
            (_, node) =>
                node.kind === "termReference" && node.data.value === "bar",
        );
        if (barReferenceNodeId === undefined) {
            throw new ErrorWithContext({ ast }, "No bar reference node found");
        }

        const resolution = resolveTermReferences(ast);

        const actual = resolution[barReferenceNodeId];
        const expected = barBindingNodeId;

        expect(actual).toBe(expected);
    });

    it("resolves a reference in a scope when the resolved binding shadows one in a broader scope", () => {
        const ast = new Parser().parse(
            "defterm foo:Boolean client\ndefterm bar:[^ Boolean -> [^ Boolean -> Boolean ^] ^] [^ foo -> [^ baz -> foo ^] ^]",
        );

        const fooBindingNodeId = ast.graph.findNode((_, node) => {
            const isFooBinding =
                node.kind === "termBinding" && node.data.value === "foo";
            const isLambdaConstructorDomainBinding =
                ast.graph.filterInNeighbors(
                    node.id,
                    (_, parentNode) => parentNode.kind === "lambdaConstructor",
                ).length > 0;
            return isFooBinding && isLambdaConstructorDomainBinding;
        });
        if (fooBindingNodeId === undefined) {
            throw new ErrorWithContext({ ast }, "No foo binding node found");
        }
        const fooReferenceNodeId = ast.graph.findNode(
            (_, node) =>
                node.kind === "termReference" && node.data.value === "foo",
        );
        if (fooReferenceNodeId === undefined) {
            throw new ErrorWithContext({ ast }, "No foo reference node found");
        }

        const resolution = resolveTermReferences(ast);

        const actual = resolution[fooReferenceNodeId];
        const expected = fooBindingNodeId;

        expect(actual).toBe(expected);
    });

    it("throws an error if a reference is unresolvable", () => {
        const ast = new Parser().parse("defterm foo:Boolean bar");

        expect(() => resolveTermReferences(ast)).toThrow();
    });
});
