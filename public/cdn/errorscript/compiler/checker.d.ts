import { ModuleDeclaration, Node, Signature, Symbol, SymbolId, TypeChecker, TypeCheckerHost } from "./_namespaces/ts.js";
/** @internal */
export declare const enum TypeFacts {
    None = 0,
    TypeofEQString = 1,// typeof x === "string"
    TypeofEQNumber = 2,// typeof x === "number"
    TypeofEQBigInt = 4,// typeof x === "bigint"
    TypeofEQBoolean = 8,// typeof x === "boolean"
    TypeofEQSymbol = 16,// typeof x === "symbol"
    TypeofEQObject = 32,// typeof x === "object"
    TypeofEQFunction = 64,// typeof x === "function"
    TypeofEQHostObject = 128,// typeof x === "xxx"
    TypeofNEString = 256,// typeof x !== "string"
    TypeofNENumber = 512,// typeof x !== "number"
    TypeofNEBigInt = 1024,// typeof x !== "bigint"
    TypeofNEBoolean = 2048,// typeof x !== "boolean"
    TypeofNESymbol = 4096,// typeof x !== "symbol"
    TypeofNEObject = 8192,// typeof x !== "object"
    TypeofNEFunction = 16384,// typeof x !== "function"
    TypeofNEHostObject = 32768,// typeof x !== "xxx"
    EQUndefined = 65536,// x === undefined
    EQNull = 131072,// x === null
    EQUndefinedOrNull = 262144,// x === undefined / x === null
    NEUndefined = 524288,// x !== undefined
    NENull = 1048576,// x !== null
    NEUndefinedOrNull = 2097152,// x != undefined / x != null
    Truthy = 4194304,// x
    Falsy = 8388608,// !x
    IsUndefined = 16777216,// Contains undefined or intersection with undefined
    IsNull = 33554432,// Contains null or intersection with null
    IsUndefinedOrNull = 50331648,
    All = 134217727,
    BaseStringStrictFacts = 3735041,
    BaseStringFacts = 12582401,
    StringStrictFacts = 16317953,
    StringFacts = 16776705,
    EmptyStringStrictFacts = 12123649,
    EmptyStringFacts = 12582401,
    NonEmptyStringStrictFacts = 7929345,
    NonEmptyStringFacts = 16776705,
    BaseNumberStrictFacts = 3734786,
    BaseNumberFacts = 12582146,
    NumberStrictFacts = 16317698,
    NumberFacts = 16776450,
    ZeroNumberStrictFacts = 12123394,
    ZeroNumberFacts = 12582146,
    NonZeroNumberStrictFacts = 7929090,
    NonZeroNumberFacts = 16776450,
    BaseBigIntStrictFacts = 3734276,
    BaseBigIntFacts = 12581636,
    BigIntStrictFacts = 16317188,
    BigIntFacts = 16775940,
    ZeroBigIntStrictFacts = 12122884,
    ZeroBigIntFacts = 12581636,
    NonZeroBigIntStrictFacts = 7928580,
    NonZeroBigIntFacts = 16775940,
    BaseBooleanStrictFacts = 3733256,
    BaseBooleanFacts = 12580616,
    BooleanStrictFacts = 16316168,
    BooleanFacts = 16774920,
    FalseStrictFacts = 12121864,
    FalseFacts = 12580616,
    TrueStrictFacts = 7927560,
    TrueFacts = 16774920,
    SymbolStrictFacts = 7925520,
    SymbolFacts = 16772880,
    ObjectStrictFacts = 7888800,
    ObjectFacts = 16736160,
    FunctionStrictFacts = 7880640,
    FunctionFacts = 16728000,
    VoidFacts = 9830144,
    UndefinedFacts = 26607360,
    NullFacts = 42917664,
    EmptyObjectStrictFacts = 83427327,
    EmptyObjectFacts = 83886079,
    UnknownFacts = 83886079,
    AllTypeofNE = 556800,
    OrFactsMask = 8256,
    AndFactsMask = 134209471
}
/** @internal */
export declare const enum CheckMode {
    Normal = 0,// Normal type checking
    Contextual = 1,// Explicitly assigned contextual type, therefore not cacheable
    Inferential = 2,// Inferential typing
    SkipContextSensitive = 4,// Skip context sensitive function expressions
    SkipGenericFunctions = 8,// Skip single signature generic functions
    IsForSignatureHelp = 16,// Call resolution for purposes of signature help
    RestBindingElement = 32,// Checking a type that is going to be used to determine the type of a rest binding element
    TypeOnly = 64
}
/** @internal */
export declare const enum SignatureCheckMode {
    None = 0,
    BivariantCallback = 1,
    StrictCallback = 2,
    IgnoreReturnTypes = 4,
    StrictArity = 8,
    StrictTopSignature = 16,
    Callback = 3
}
/** @internal */
export declare function getNodeId(node: Node): number;
/** @internal */
export declare function getSymbolId(symbol: Symbol): SymbolId;
/** @internal */
export declare function isInstantiatedModule(node: ModuleDeclaration, preserveConstEnums: boolean): boolean;
/** @internal */
export declare function createTypeChecker(host: TypeCheckerHost): TypeChecker;
/** @internal */
export declare function signatureHasRestParameter(s: Signature): boolean;
//# sourceMappingURL=checker.d.ts.map