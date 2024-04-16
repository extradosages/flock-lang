// # Flock Language Grammar Specification
{{}}

// ## Library
library
    = value:(typeDefinition / termDefinition)|..,_*| _*
    {
        const termDefinitions = value.filter(node => node.kind === 'termDefinition');
        const typeDefinitions = value.filter(node => node.kind === 'typeDefinition');
        const data = {
            termDefinitions,
            typeDefinitions,
        };

        return options.flockAst.dLibrary(data);
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
booleanTypeKeyword
    = "Boolean"

booleanType
    = booleanTypeKeyword
    {
        return options.flockAst.dBooleanType(undefined);
    }

floatTypeKeyword
    = "Float"

floatType
    = floatTypeKeyword
    {
        return options.flockAst.dFloatType(undefined);
    }

integerTypeKeyword
    = "Integer"

integerType
    = integerTypeKeyword
    {
        return options.flockAst.dIntegerType(undefined);
    }

stringTypeKeyword
    = "String"

stringType
    = stringTypeKeyword
    {
        return options.flockAst.dStringType(undefined);
    }

primitiveType
    = booleanType
    / floatType
    / integerType
    / stringType

largeTypeTypeKeyword
    = "Type"

largeTypeType
    = largeTypeTypeKeyword
    {
        return options.flockAst.dLargeTypeType(undefined);
    }

// ### Type Definition Identifiers and References
reservedTypeKeywords
    = booleanTypeKeyword
    / floatTypeKeyword
    / integerTypeKeyword
    / stringTypeKeyword
    / largeTypeTypeKeyword

typeNameFormat
    = [A-Z] [a-zA-Z0-9-]*

typeBinding
    = data:$(!reservedTypeKeywords typeNameFormat)
    {
        return options.flockAst.dTypeBinding(data);
    }

typeReference
    = data:$typeNameFormat
    {
        return options.flockAst.dTypeReference(data);
    }

// #### Term Literals
booleanTermFalseKeyword
    = "false"

booleanTermTrueKeyword
    = "true"

booleanTerm
    = value:(
        booleanTermFalseKeyword
        / booleanTermTrueKeyword
    )
    {
        const data = value === 'true';
        return options.flockAst.dBooleanTerm(data);
    }

floatTerm
    = value:$([0-9]+ "." [0-9]*)
    {
        const data = parseFloat(value);
        return options.flockAst.dFloatTerm(data);
    }

integerTerm
    = value:[0-9]+
    {
        const data = parseInt(value, 10);
        return options.flockAst.dIntegerTerm(data);
    }

stringTerm
    = '"' data:$[^"]* '"'
    {
        return options.flockAst.dStringTerm(data);
    }

termLiteral
    = booleanTerm
    / floatTerm
    / integerTerm
    / stringTerm

// ### Client Implementation Terms
clientKeyword
    = "client"

clientImplementation
    = clientKeyword
    {
        return options.flockAst.dClientImplementation(undefined);
    }

// ### Term Definition Identifiers and References
reservedTermKeywords
    = booleanTermFalseKeyword
    / booleanTermTrueKeyword
    / clientKeyword

termNameFormat
    = [a-z] [a-zA-Z0-9-]*

termBinding
    = data:$(!reservedTermKeywords termNameFormat)
    {
        return options.flockAst.dTermBinding(data);
    }

termReference
    = data:$termNameFormat
    {
        return options.flockAst.dTermReference(data);
    }

// ### Products (Associative)
// #### Product Type
// [* Boolean Float String *]
productType
    = "[*" _? components:smallType|..,_| _? "*]"
    {
        const data = { components };
        return options.flockAst.dProductType(data);
    }

// #### Product Term
// ##### Constructor
// [* "abc" foo 3 *]
productTermConstructor
    = "[*" _? components:term|..,_| _? "*]"
    {
        const data = { components };
        return options.flockAst.dProductTermConstructor(data);
    }

// ##### Eliminator
// (>0,0 [* "abc" foo *])
productTermEliminator
    = ">" arity:[0-9]+ "," index:[0-9]+
    {
        const data = {
            arity: parseInt(arity, 10),
            index: parseInt(index, 10),
        };
        return options.flockAst.dProductTermEliminator(data);
    }

// ### Sums (Associative)
// #### Sum Type
// [+ Boolean Float +]
sumType
    = "[+" _? components:smallType|..,_| _? "+]"
    {
        components = components ?? [];
        const data = { components };
        return options.flockAst.dSumType(data);
    }

// #### Sum terms
// ##### Constructor
// (<0,0 foo)
sumTermConstructor
    = "<" arity:[0-9]+ "," index:[0-9]+
    {
        const data = {
            arity: parseInt(arity, 10),
            index: parseInt(index, 10),
        };
        return options.flockAst.dSumTermConstructor(data);
    }

// ##### Eliminator
// [+ foo  bar +]
sumTermEliminator
    = "[+" _? components:(termReference / functionTermConstructor)|..,_| _? "+]"
    {
        components = components ?? [];
        const data = { components };
        return options.flockAst.dSumTermEliminator(data);
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

        const node = options.flockAst.dFunctionType(data);
                return node;
    }

// #### Function Term
// ##### Constructors
// [^ foo bar -> (foo bar) ^]
lambdaConstructor
    = "[^" _? domainTermBindings:(@termBinding|0..,_| _)? "->" _ codomainTerm:term _? "^]"
    {
        domainTermBindings = domainTermBindings ?? [];
        const data = {
            codomainTerm,
            domainTermBindings,
        };

        return options.flockAst.dLambdaConstructor(data);
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

        return options.flockAst.dFunctionTermEliminator(data);
    }

// ### Small Types
smallType
    = primitiveType
    / typeReference
    / productType
    / sumType
    / functionType
    / genericTypeEliminator

// ### Generic Types
// #### Constructor
// [^ Left => [* Left Boolean *] ^]
genericTypeConstructor
    = "[^" _? domainTypeBindings:(@typeBinding|1..,_| _)? "=>" _ codomainType:smallType _? "^]"
    {
        domainTypeBindings = domainTypeBindings ?? [];
        const data = {
            codomainType,
            domainTypeBindings,
        };

        return options.flockAst.dGenericTypeConstructor(data);
    }

// #### Eliminator
// ([^ Left => [* Left Boolean *] ^] [+ Integer Float +])
genericTypeEliminator
    = "(" _? func:(typeReference / genericTypeConstructor) args:(_ @smallType|1..,_|)? _? ")"
    {
        args = args ?? [];
        const data = {
            arguments: args,
            genericType: func,
        };

        return options.flockAst.dGenericTypeEliminator(data);
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
    = typeDefinitionKeyword _ binding:typeBinding ":" largeTypeType _ type:largeType
    {
        const data = {
            binding,
            type,
        };

        return options.flockAst.dTypeDefinition(data);
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

        return options.flockAst.dTermDefinition(data);
    }

