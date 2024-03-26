// # Flock Language Grammar Specification
{{
    const ast = require('@flock/ast');

    const nodes = [];
}}

// ## Source
source
    = library
    {
        return nodes;
    }

// ## Library
library
    = value:(typeDefinition / termDefinition)|..,_*| _*
    {
        const termDefinitions = value.filter(ast.isSpecificNode('termDefinition'));
        const typeDefinitions = value.filter(ast.isSpecificNode('typeDefinition'));
        const data = {
            termDefinitions,
            typeDefinitions,
        };

        const node = ast.library(data);
        nodes.push(node);
        return node;
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
        const node = ast.booleanTypeLiteral(undefined);
        nodes.push(node)
        return node;
    }

floatTypeLiteralKeyword
    = "Float"

floatTypeLiteral
    = floatTypeLiteralKeyword
    {
        const node = ast.floatTypeLiteral(undefined);
        nodes.push(node)
        return node;
    }

integerTypeLiteralKeyword
    = "Integer"

integerTypeLiteral
    = integerTypeLiteralKeyword
    {
        const node = ast.integerTypeLiteral(undefined);
        nodes.push(node)
        return node;
    }

stringTypeLiteralKeyword
    = "String"

stringTypeLiteral
    = stringTypeLiteralKeyword
    {
        const node = ast.stringTypeLiteral(undefined);
        nodes.push(node)
        return node;
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
        const node = ast.largeTypeTypeLiteral(undefined);
        nodes.push(node)
        return node;
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
        const node = ast.unsafeTypeBinding(data);
        nodes.push(node)
        return node;
    }

typeReference
    = data:$typeNameFormat
    {
        const node = ast.unsafeTypeReference(data);
        nodes.push(node)
        return node;
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
        const node = ast.booleanTermLiteral(data);
        nodes.push(node)
        return node;
    }

floatTermLiteral
    = value:$([0-9]+ "." [0-9]*)
    {
        const data = parseFloat(value);
        const node = ast.floatTermLiteral(data);
        nodes.push(node)
        return node;
    }

integerTermLiteral
    = value:[0-9]+
    {
        const data = parseInt(value, 10);
        const node = ast.unsafeIntegerTermLiteral(data);
        nodes.push(node)
        return node;
    }

stringTermLiteral
    = '"' data:$[^"]* '"'
    {
        const node = ast.stringTermLiteral(data);
        nodes.push(node)
        return node;
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
        const node = ast.clientImplementation(undefined);
        nodes.push(node)
        return node;
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
        const node = ast.unsafeTermBinding(data);
        nodes.push(node)
        return node;
    }

termReference
    = data:$termNameFormat
    {
        const node = ast.unsafeTermReference(data);
        nodes.push(node)
        return node;
    }

// ### Products (Associative)
// #### Product Type
// [* Boolean Float String *]
productType
    = "[*" _? data:smallType|..,_| _? "*]"
    {
        const node = ast.productType(data);
        nodes.push(node)
        return node;
    }

// #### Product Term
// ##### Constructor
// [* "abc" foo 3 *]
productTermConstructor
    = "[*" _? data:term|..,_| _? "*]"
    {
        const node = ast.productTermConstructor(data);
        nodes.push(node)
        return node;
    }

// ##### Eliminator
// (>0 [* "abc" foo *])
productTermEliminator
    = ">" value:[0-9]+
    {
        const data = parseInt(value, 10);
        const node = ast.unsafeProductTermEliminator(data);
        nodes.push(node)
        return node;
    }

// ### Sums (Associative)
// #### Sum Type
// [+ Boolean Float +]
sumType
    = "[+" _? data:smallType|..,_| _? "+]"
    {
        const node = ast.sumType(data);
        nodes.push(node)
        return node;
    }

// #### Sum terms
// ##### Constructor
// (<0 foo)
sumTermConstructor
    = "<" value:[0-9]+
    {
        const data = parseInt(value, 10);
        const node = ast.unsafeSumTermConstructor(data);
        nodes.push(node)
        return node;
    }

// ##### Eliminator
// [+ foo  bar +]
sumTermEliminator
    = "[+" _? data:(termReference / functionTermConstructor)|..,_| _? "+]"
    {
        const node = ast.sumTermEliminator(data);
        nodes.push(node)
        return node;
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

        const node = ast.functionType(data);
        nodes.push(node)
        return node;
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

        const node = ast.lambdaConstructor(data);
        nodes.push(node)
        return node;
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
    = "(" _? func:(termReference / functionTermConstructor / productTermEliminator / sumTermConstructor) args:(_ @term|1..,_|)? _? ")"
    {
        args = args ?? [];
        const data = {
            arguments: args,
            function: func,
        };

        const node = ast.functionTermEliminator(data);
        nodes.push(node)
        return node;
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

        const node = ast.genericTypeConstructor(data);
        nodes.push(node)
        return node;
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

        const node = ast.genericTypeEliminator(data);
        nodes.push(node)
        return node;
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

        const node = ast.typeDefinition(data);
        nodes.push(node)
        return node;
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

        const node = ast.termDefinition(data);
        nodes.push(node)
        return node;
    }

