// # Flock Language Grammar Specification
{{
    const flockAst = require('@flock/ast');

    const { ast } = options;
}}

// ## Library
library
    = value:(typeDefinition / termDefinition)|..,_*| _*
    {
        const termDefinitions = value.filter(ref => ref.type === 'termDefinition');
        const typeDefinitions = value.filter(ref => ref.type === 'typeDefinition');
        const data = {
            termDefinitions,
            typeDefinitions,
        };

        const node = flockAst.library(data);
        options.ast.addNode(node);;
        return flockAst.ref(node);
    }

// ## Structural Elements
newline "newline"
    = "\n"

space "space"
    = " "

_
    = (space / newline)+

// ## Terms and Types
// ### Type Literals
booleanTypeLiteralKeyword
    = "Boolean"

booleanTypeLiteral
    = booleanTypeLiteralKeyword
    {
        const node = flockAst.booleanTypeLiteral(undefined);
        options.ast.addNode(node);
        return flockAst.ref(node);
    }

floatTypeLiteralKeyword
    = "Float"

floatTypeLiteral
    = floatTypeLiteralKeyword
    {
        const node = flockAst.floatTypeLiteral(undefined);
        options.ast.addNode(node);
        return flockAst.ref(node);
    }

integerTypeLiteralKeyword
    = "Integer"

integerTypeLiteral
    = integerTypeLiteralKeyword
    {
        const node = flockAst.integerTypeLiteral(undefined);
        options.ast.addNode(node);
        return flockAst.ref(node);
    }

stringTypeLiteralKeyword
    = "String"

stringTypeLiteral
    = stringTypeLiteralKeyword
    {
        const node = flockAst.stringTypeLiteral(undefined);
        options.ast.addNode(node);
        return flockAst.ref(node);
    }

smallTypeLiteral
    = booleanTypeLiteral
    / floatTypeLiteral
    / integerTypeLiteral
    / stringTypeLiteral

largeTypeTypeLiteralKeyword
    = "Type"

largeTypeTypeLiteral
    = largeTypeTypeLiteralKeyword
    {
        const node = flockAst.largeTypeTypeLiteral(undefined);
        options.ast.addNode(node);
        return flockAst.ref(node);
    }

// ### Type Definition Identifiers and References
reservedTypeKeywords
    = booleanTypeLiteralKeyword
    / floatTypeLiteralKeyword
    / integerTypeLiteralKeyword
    / stringTypeLiteralKeyword
    / largeTypeTypeLiteralKeyword

typeNameFormat
    = [A-Z] [a-zA-Z0-9-]*

typeBinding
    = data:$(!reservedTypeKeywords typeNameFormat)
    {
        const node = flockAst.unsafeTypeBinding(data);
        options.ast.addNode(node);
        return flockAst.ref(node);
    }

typeReference
    = data:$typeNameFormat
    {
        const node = flockAst.unsafeTypeReference(data);
        options.ast.addNode(node);
        return flockAst.ref(node);
    }

// #### Term Literals
booleanTermLiteralFalseKeyword
    = "false"

booleanTermLiteralTrueKeyword
    = "true"

booleanTermLiteral
    = value:(
        booleanTermLiteralFalseKeyword
        / booleanTermLiteralTrueKeyword
    )
    {
        const data = value === 'true';
        const node = flockAst.booleanTermLiteral(data);
        options.ast.addNode(node);
        return flockAst.ref(node);
    }

floatTermLiteral
    = value:$([0-9]+ "." [0-9]*)
    {
        const data = parseFloat(value);
        const node = flockAst.floatTermLiteral(data);
        options.ast.addNode(node);
        return flockAst.ref(node);
    }

integerTermLiteral
    = value:[0-9]+
    {
        const data = parseInt(value, 10);
        const node = flockAst.unsafeIntegerTermLiteral(data);
        options.ast.addNode(node);
        return flockAst.ref(node);
    }

stringTermLiteral
    = '"' data:$[^"]* '"'
    {
        const node = flockAst.stringTermLiteral(data);
        options.ast.addNode(node);
        return flockAst.ref(node);
    }

termLiteral
    = booleanTermLiteral
    / floatTermLiteral
    / integerTermLiteral
    / stringTermLiteral

// ### Client Implementation Terms
clientKeyword
    = "client"

clientImplementation
    = clientKeyword
    {
        const node = flockAst.clientImplementation(undefined);
        options.ast.addNode(node);
        return flockAst.ref(node);
    }

// ### Term Definition Identifiers and References
reservedTermKeywords
    = booleanTermLiteralFalseKeyword
    / booleanTermLiteralTrueKeyword
    / clientKeyword

termNameFormat
    = [a-z] [a-zA-Z0-9-]*

termBinding
    = data:$(!reservedTermKeywords termNameFormat)
    {
        const node = flockAst.unsafeTermBinding(data);
        options.ast.addNode(node);
        return flockAst.ref(node);
    }

termReference
    = data:$termNameFormat
    {
        const node = flockAst.unsafeTermReference(data);
        options.ast.addNode(node);
        return flockAst.ref(node);
    }

// ### Products (Associative)
// #### Product Type
// [* Boolean Float String *]
productType
    = "[*" _? data:smallType|..,_| _? "*]"
    {
        const node = flockAst.productType(data);
        options.ast.addNode(node);
        return flockAst.ref(node);
    }

// #### Product Term
// ##### Constructor
// [* "abc" foo 3 *]
productTermConstructor
    = "[*" _? data:term|..,_| _? "*]"
    {
        const node = flockAst.productTermConstructor(data);
        options.ast.addNode(node);
        return flockAst.ref(node);
    }

// ##### Eliminator
// (>0 [* "abc" foo *])
productTermEliminator
    = ">" value:[0-9]+
    {
        const data = parseInt(value, 10);
        const node = flockAst.unsafeProductTermEliminator(data);
        options.ast.addNode(node);
        return flockAst.ref(node);
    }

// ### Sums (Associative)
// #### Sum Type
// [+ Boolean Float +]
sumType
    = "[+" _? data:smallType|..,_| _? "+]"
    {
        const node = flockAst.sumType(data);
        options.ast.addNode(node);
        return flockAst.ref(node);
    }

// #### Sum terms
// ##### Constructor
// (<0 foo)
sumTermConstructor
    = "<" value:[0-9]+
    {
        const data = parseInt(value, 10);
        const node = flockAst.unsafeSumTermConstructor(data);
        options.ast.addNode(node);
        return flockAst.ref(node);
    }

// ##### Eliminator
// [+ foo  bar +]
sumTermEliminator
    = "[+" _? data:(termReference / functionTermConstructor)|..,_| _? "+]"
    {
        const node = flockAst.sumTermEliminator(data);
        options.ast.addNode(node);
        return flockAst.ref(node);
    }

// ### Functions (Associative)
// #### Function Type
// [^ Float Float -> Boolean ^]
functionType
    = "[^" _? domains:(@smallType|1..,_| _)? "->" _ codomain:smallType _? "^]"
    {
        domains = domains ?? [];
        const data = {
            codomain,
            domains,
        };

        const node = flockAst.functionType(data);
        options.ast.addNode(node);
        return flockAst.ref(node);
    }

// #### Function Term
// ##### Constructors
// [^ foo bar -> (foo bar) ^]
lambdaConstructor
    = "[^" _? domainBindings:(@termBinding|0..,_| _)? "->" _ codomainTerm:term _? "^]"
    {
        domainBindings = domainBindings ?? [];
        const data = {
            codomainTerm,
            domainBindings,
        };

        const node = flockAst.lambdaConstructor(data);
        options.ast.addNode(node);
        return flockAst.ref(node);
    }

// Note that the product term constructor is a term instead
// because of the isomorphism between A^C x B^C and (A x B)^C.
functionTermConstructor
    = lambdaConstructor
    / productTermEliminator
    / sumTermConstructor
    / sumTermEliminator

// ##### Eliminator
// (foo 0)
functionTermEliminator
    = "(" _? func:(termReference / functionTermConstructor) args:(_ @term|1..,_|)? _? ")"
    {
        args = args ?? [];
        const data = {
            arguments: args,
            function: func,
        };

        const node = flockAst.functionTermEliminator(data);
        options.ast.addNode(node);
        return flockAst.ref(node);
    }

// ### Small Types
smallType
    = smallTypeLiteral
    / typeReference
    / productType
    / sumType
    / functionType
    / genericTypeEliminator

// ### Generic Types
// #### Constructor
// [^ Left => [* Left Boolean *] ^]
genericTypeConstructor
    = "[^" _? domainBindings:(@typeBinding|1..,_| _)? "=>" _ codomainType:smallType _? "^]"
    {
        domainBindings = domainBindings ?? [];
        const data = {
            codomainType,
            domainBindings,
        };

        const node = flockAst.genericTypeConstructor(data);
        options.ast.addNode(node);
        return flockAst.ref(node);
    }

// #### Eliminator
// ([^ Left => [* Left Boolean *] ^] [+ Integer Float +])
genericTypeEliminator
    = "(" _? func:(typeReference / genericTypeConstructor) args:(_ @smallType|1..,_|)? _? ")"
    {
        args = args ?? [];
        const data = {
            arguments: args,
            function: func,
        };

        const node = flockAst.genericTypeEliminator(data);
        options.ast.addNode(node);
        return flockAst.ref(node);
    }

// ### Types
largeType
    = smallType
    / genericTypeConstructor

// ### Terms
term
    = termLiteral
    / termReference
    / productTermConstructor
    / functionTermConstructor
    / functionTermEliminator

// ## Definitions
// ### Type Definitions
typeDefinitionKeyword
    = "deftype"

typeDefinition
    = typeDefinitionKeyword _ binding:typeBinding ":" largeTypeTypeLiteral _ type:largeType
    {
        const data = {
            binding,
            type,
        };

        const node = flockAst.typeDefinition(data);
        options.ast.addNode(node);
        return flockAst.ref(node);
    }

// ### Term Definitions
termDefinitionKeyword
    = "defterm"

termDefinition
    = termDefinitionKeyword _ binding:termBinding ":" type:largeType _ term:(clientImplementation / term)
    {
        const data = {
            binding,
            term,
            type,
        };

        const node = flockAst.termDefinition(data);
        options.ast.addNode(node);
        return flockAst.ref(node);
    }

