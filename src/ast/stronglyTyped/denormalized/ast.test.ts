import _ from "lodash";
import { stringify } from "safe-stable-stringify";

import { StrongNodeKind } from "../common";
import { DenormalizedAst, dBooleanType, dFunctionType } from "../denormalized";
import {
    NormalizedAst,
    StrongEdge,
    edge,
    nBooleanType,
    nFunctionType,
} from "../normalized";

const sort = (record: Record<string, unknown[]>) =>
    _.mapValues(record, (value) => _.orderBy(value, stringify));

const standardize = (normalizedAst: NormalizedAst<StrongNodeKind>) =>
    sort(normalizedAst.anonymize());

describe("DenormalizedAst", () => {
    describe("`.normalize`", () => {
        it("normalizes", () => {
            const automaticallyNormalized = new DenormalizedAst(
                dFunctionType({
                    codomain: dBooleanType(undefined),
                    domains: [dBooleanType(undefined), dBooleanType(undefined)],
                }),
            ).normalize();

            const manuallyNormalized = new NormalizedAst("functionType");

            const functionTypeNode = nFunctionType(undefined);
            const domainNode0 = nBooleanType(undefined);
            const domainNode1 = nBooleanType(undefined);
            const codomainNode = nBooleanType(undefined);

            const domainEdge0: StrongEdge<"functionType", "domains"> = edge({
                index: 0,
                kind: "domains",
                sourceId: functionTypeNode.id,
                targetId: domainNode0.id,
                sourceKind: "functionType",
                targetKind: "booleanType",
            });
            const domainEdge1: StrongEdge<"functionType", "domains"> = edge({
                index: 1,
                kind: "domains",
                sourceId: functionTypeNode.id,
                targetId: domainNode1.id,
                sourceKind: "functionType",
                targetKind: "booleanType",
            });
            const codomainEdge: StrongEdge<"functionType", "codomain"> = edge({
                index: undefined,
                kind: "codomain",
                sourceId: functionTypeNode.id,
                targetId: codomainNode.id,
                sourceKind: "functionType",
                targetKind: "booleanType",
            });

            manuallyNormalized.addNode(functionTypeNode);
            manuallyNormalized.addNode(domainNode0);
            manuallyNormalized.addNode(domainNode1);
            manuallyNormalized.addNode(codomainNode);
            manuallyNormalized.addEdge(domainEdge0);
            manuallyNormalized.addEdge(domainEdge1);
            manuallyNormalized.addEdge(codomainEdge);

            const actual = standardize(automaticallyNormalized);
            const expected = standardize(manuallyNormalized);

            expect(actual).toStrictEqual(expected);
        });
    });
});
