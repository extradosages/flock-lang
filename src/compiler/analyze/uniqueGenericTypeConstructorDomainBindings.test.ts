import { Parser } from "../parse";

import { uniqueGenericTypeConstructorDomainBindings } from "./uniqueGenericTypeConstructorDomainBindings";

describe("uniqueGenericTypeConstructorDomainBindings", () => {
    it("throws an error if a generic type constructor has duplicate domain bindings", () => {
        const ast = new Parser().parse("deftype Snake:Type [^ S S => S ^]");

        expect(() => uniqueGenericTypeConstructorDomainBindings(ast)).toThrow();
    });

    it("doesn't throw an error if all generic type constructors have unique domain bindings", () => {
        const ast = new Parser().parse(
            "deftype Snake:Type [^ S C H => S ^]\ndeftype Penguin:Type [^ P N => (G N) ^]",
        );

        expect(() =>
            uniqueGenericTypeConstructorDomainBindings(ast),
        ).not.toThrow();
    });

    it("doesn't throw an error if different generic type constructors have the same bindings", () => {
        const ast = new Parser().parse(
            "defterm pick-first:[^ First Second => [^ First Second -> First ^] ^] [^ first second -> first ^]\ndefterm pick-second:[^ First Second => [^ First Second -> Second ^] ^] [^ first second -> second ^]",
        );

        expect(() =>
            uniqueGenericTypeConstructorDomainBindings(ast),
        ).not.toThrow();
    });
});
