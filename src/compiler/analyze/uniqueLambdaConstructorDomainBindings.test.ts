import { Parser } from "../parse";

import { uniqueLambdaConstructorDomainBindings } from "./uniqueLambdaConstructorDomainBindings";

describe("uniqueLambdaConstructorDomainBindings", () => {
    it("throws an error if a lambda constructor has duplicate domain bindings", () => {
        const ast = new Parser().parse(
            "defterm or:[^ Boolean Boolean -> Boolean ^] [^ prop prop -> (not (and (not prop) (not prop))) ^]",
        );

        expect(() => uniqueLambdaConstructorDomainBindings(ast)).toThrow();
    });

    it("doesn't throw an error if all lambda constructors have unique domain bindings", () => {
        const ast = new Parser().parse(
            "defterm or:[^ Boolean Boolean -> Boolean ^] [^ left-prop right-prop -> (not (and (not left-prop) (not right-prop))) ^]\ndefterm is-greater-than:[^ Number Number -> Boolean ^] [^ x y -> (not (is-less-than-or-equal x y)) ^]",
        );

        expect(() => uniqueLambdaConstructorDomainBindings(ast)).not.toThrow();
    });

    it("doesn't throw an error if different lambda constructors have the same bindings", () => {
        const ast = new Parser().parse(
            "defterm pick-first:[^ First Second => [^ First Second -> First ^] ^] [^ first second -> first ^]\ndefterm pick-second:[^ First Second => [^ First Second -> Second ^] ^] [^ first second -> second ^]",
        );

        expect(() => uniqueLambdaConstructorDomainBindings(ast)).not.toThrow();
    });
});
