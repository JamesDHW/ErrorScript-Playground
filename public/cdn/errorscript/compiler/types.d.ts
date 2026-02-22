import { BaseNodeFactory, CreateSourceFileOptions, EmitHelperFactory, GetCanonicalFileName, MapLike, ModeAwareCache, ModeAwareCacheKey, ModuleResolutionCache, MultiMap, NodeFactoryFlags, OptionsNameMap, PackageJsonInfo, PackageJsonInfoCache, Pattern, ProgramDiagnostics, SymlinkCache, ThisContainer } from "./_namespaces/ts.js";
export type Path = string & {
    __pathBrand: any;
};
/** @internal */
export type MatchingKeys<TRecord, TMatch, K extends keyof TRecord = keyof TRecord> = K extends (TRecord[K] extends TMatch ? K : never) ? K : never;
export interface TextRange {
    pos: number;
    end: number;
}
export interface ReadonlyTextRange {
    readonly pos: number;
    readonly end: number;
}
export declare const enum SyntaxKind {
    Unknown = 0,
    EndOfFileToken = 1,
    SingleLineCommentTrivia = 2,
    MultiLineCommentTrivia = 3,
    NewLineTrivia = 4,
    WhitespaceTrivia = 5,
    ShebangTrivia = 6,
    ConflictMarkerTrivia = 7,
    NonTextFileMarkerTrivia = 8,
    NumericLiteral = 9,
    BigIntLiteral = 10,
    StringLiteral = 11,
    JsxText = 12,
    JsxTextAllWhiteSpaces = 13,
    RegularExpressionLiteral = 14,
    NoSubstitutionTemplateLiteral = 15,
    TemplateHead = 16,
    TemplateMiddle = 17,
    TemplateTail = 18,
    OpenBraceToken = 19,
    CloseBraceToken = 20,
    OpenParenToken = 21,
    CloseParenToken = 22,
    OpenBracketToken = 23,
    CloseBracketToken = 24,
    DotToken = 25,
    DotDotDotToken = 26,
    SemicolonToken = 27,
    CommaToken = 28,
    QuestionDotToken = 29,
    LessThanToken = 30,
    LessThanSlashToken = 31,
    GreaterThanToken = 32,
    LessThanEqualsToken = 33,
    GreaterThanEqualsToken = 34,
    EqualsEqualsToken = 35,
    ExclamationEqualsToken = 36,
    EqualsEqualsEqualsToken = 37,
    ExclamationEqualsEqualsToken = 38,
    EqualsGreaterThanToken = 39,
    PlusToken = 40,
    MinusToken = 41,
    AsteriskToken = 42,
    AsteriskAsteriskToken = 43,
    SlashToken = 44,
    PercentToken = 45,
    PlusPlusToken = 46,
    MinusMinusToken = 47,
    LessThanLessThanToken = 48,
    GreaterThanGreaterThanToken = 49,
    GreaterThanGreaterThanGreaterThanToken = 50,
    AmpersandToken = 51,
    BarToken = 52,
    CaretToken = 53,
    ExclamationToken = 54,
    TildeToken = 55,
    AmpersandAmpersandToken = 56,
    BarBarToken = 57,
    QuestionToken = 58,
    ColonToken = 59,
    AtToken = 60,
    QuestionQuestionToken = 61,
    /** Only the JSDoc scanner produces BacktickToken. The normal scanner produces NoSubstitutionTemplateLiteral and related kinds. */
    BacktickToken = 62,
    /** Only the JSDoc scanner produces HashToken. The normal scanner produces PrivateIdentifier. */
    HashToken = 63,
    EqualsToken = 64,
    PlusEqualsToken = 65,
    MinusEqualsToken = 66,
    AsteriskEqualsToken = 67,
    AsteriskAsteriskEqualsToken = 68,
    SlashEqualsToken = 69,
    PercentEqualsToken = 70,
    LessThanLessThanEqualsToken = 71,
    GreaterThanGreaterThanEqualsToken = 72,
    GreaterThanGreaterThanGreaterThanEqualsToken = 73,
    AmpersandEqualsToken = 74,
    BarEqualsToken = 75,
    BarBarEqualsToken = 76,
    AmpersandAmpersandEqualsToken = 77,
    QuestionQuestionEqualsToken = 78,
    CaretEqualsToken = 79,
    Identifier = 80,
    PrivateIdentifier = 81,
    /**
     * Only the special JSDoc comment text scanner produces JSDocCommentTextTokes. One of these tokens spans all text after a tag comment's start and before the next @
     * @internal
     */
    JSDocCommentTextToken = 82,
    BreakKeyword = 83,
    CaseKeyword = 84,
    CatchKeyword = 85,
    ClassKeyword = 86,
    ConstKeyword = 87,
    ContinueKeyword = 88,
    DebuggerKeyword = 89,
    DefaultKeyword = 90,
    DeleteKeyword = 91,
    DoKeyword = 92,
    ElseKeyword = 93,
    EnumKeyword = 94,
    ExportKeyword = 95,
    ExtendsKeyword = 96,
    FalseKeyword = 97,
    FinallyKeyword = 98,
    ForKeyword = 99,
    FunctionKeyword = 100,
    IfKeyword = 101,
    ImportKeyword = 102,
    InKeyword = 103,
    InstanceOfKeyword = 104,
    NewKeyword = 105,
    NullKeyword = 106,
    ReturnKeyword = 107,
    SuperKeyword = 108,
    SwitchKeyword = 109,
    ThisKeyword = 110,
    ThrowKeyword = 111,
    TrueKeyword = 112,
    TryKeyword = 113,
    TypeOfKeyword = 114,
    VarKeyword = 115,
    VoidKeyword = 116,
    WhileKeyword = 117,
    WithKeyword = 118,
    ImplementsKeyword = 119,
    InterfaceKeyword = 120,
    LetKeyword = 121,
    PackageKeyword = 122,
    PrivateKeyword = 123,
    ProtectedKeyword = 124,
    PublicKeyword = 125,
    StaticKeyword = 126,
    YieldKeyword = 127,
    AbstractKeyword = 128,
    AccessorKeyword = 129,
    AsKeyword = 130,
    AssertsKeyword = 131,
    AssertKeyword = 132,
    AnyKeyword = 133,
    AsyncKeyword = 134,
    AwaitKeyword = 135,
    ThrowsKeyword = 136,
    RejectsKeyword = 137,
    BooleanKeyword = 138,
    ConstructorKeyword = 139,
    DeclareKeyword = 140,
    GetKeyword = 141,
    InferKeyword = 142,
    IntrinsicKeyword = 143,
    IsKeyword = 144,
    KeyOfKeyword = 145,
    ModuleKeyword = 146,
    NamespaceKeyword = 147,
    NeverKeyword = 148,
    OutKeyword = 149,
    ReadonlyKeyword = 150,
    RequireKeyword = 151,
    NumberKeyword = 152,
    ObjectKeyword = 153,
    SatisfiesKeyword = 154,
    SetKeyword = 155,
    StringKeyword = 156,
    SymbolKeyword = 157,
    TypeKeyword = 158,
    UndefinedKeyword = 159,
    UniqueKeyword = 160,
    UnknownKeyword = 161,
    UsingKeyword = 162,
    FromKeyword = 163,
    GlobalKeyword = 164,
    BigIntKeyword = 165,
    OverrideKeyword = 166,
    OfKeyword = 167,
    DeferKeyword = 168,// LastKeyword and LastToken and LastContextualKeyword
    QualifiedName = 169,
    ComputedPropertyName = 170,
    TypeParameter = 171,
    Parameter = 172,
    Decorator = 173,
    PropertySignature = 174,
    PropertyDeclaration = 175,
    MethodSignature = 176,
    MethodDeclaration = 177,
    ClassStaticBlockDeclaration = 178,
    Constructor = 179,
    GetAccessor = 180,
    SetAccessor = 181,
    CallSignature = 182,
    ConstructSignature = 183,
    IndexSignature = 184,
    TypePredicate = 185,
    TypeReference = 186,
    FunctionType = 187,
    ConstructorType = 188,
    TypeQuery = 189,
    TypeLiteral = 190,
    ArrayType = 191,
    TupleType = 192,
    OptionalType = 193,
    RestType = 194,
    UnionType = 195,
    IntersectionType = 196,
    ConditionalType = 197,
    InferType = 198,
    ParenthesizedType = 199,
    ThisType = 200,
    TypeOperator = 201,
    IndexedAccessType = 202,
    MappedType = 203,
    LiteralType = 204,
    NamedTupleMember = 205,
    TemplateLiteralType = 206,
    TemplateLiteralTypeSpan = 207,
    ImportType = 208,
    ObjectBindingPattern = 209,
    ArrayBindingPattern = 210,
    BindingElement = 211,
    ArrayLiteralExpression = 212,
    ObjectLiteralExpression = 213,
    PropertyAccessExpression = 214,
    ElementAccessExpression = 215,
    CallExpression = 216,
    NewExpression = 217,
    TaggedTemplateExpression = 218,
    TypeAssertionExpression = 219,
    ParenthesizedExpression = 220,
    FunctionExpression = 221,
    ArrowFunction = 222,
    DeleteExpression = 223,
    TypeOfExpression = 224,
    VoidExpression = 225,
    AwaitExpression = 226,
    PrefixUnaryExpression = 227,
    PostfixUnaryExpression = 228,
    BinaryExpression = 229,
    ConditionalExpression = 230,
    TemplateExpression = 231,
    YieldExpression = 232,
    SpreadElement = 233,
    ClassExpression = 234,
    OmittedExpression = 235,
    ExpressionWithTypeArguments = 236,
    AsExpression = 237,
    NonNullExpression = 238,
    MetaProperty = 239,
    SyntheticExpression = 240,
    SatisfiesExpression = 241,
    TemplateSpan = 242,
    SemicolonClassElement = 243,
    Block = 244,
    EmptyStatement = 245,
    VariableStatement = 246,
    ExpressionStatement = 247,
    IfStatement = 248,
    DoStatement = 249,
    WhileStatement = 250,
    ForStatement = 251,
    ForInStatement = 252,
    ForOfStatement = 253,
    ContinueStatement = 254,
    BreakStatement = 255,
    ReturnStatement = 256,
    WithStatement = 257,
    SwitchStatement = 258,
    LabeledStatement = 259,
    ThrowStatement = 260,
    TryStatement = 261,
    DebuggerStatement = 262,
    VariableDeclaration = 263,
    VariableDeclarationList = 264,
    FunctionDeclaration = 265,
    ClassDeclaration = 266,
    InterfaceDeclaration = 267,
    TypeAliasDeclaration = 268,
    EnumDeclaration = 269,
    ModuleDeclaration = 270,
    ModuleBlock = 271,
    CaseBlock = 272,
    NamespaceExportDeclaration = 273,
    ImportEqualsDeclaration = 274,
    ImportDeclaration = 275,
    ImportClause = 276,
    NamespaceImport = 277,
    NamedImports = 278,
    ImportSpecifier = 279,
    ExportAssignment = 280,
    ExportDeclaration = 281,
    NamedExports = 282,
    NamespaceExport = 283,
    ExportSpecifier = 284,
    MissingDeclaration = 285,
    ExternalModuleReference = 286,
    JsxElement = 287,
    JsxSelfClosingElement = 288,
    JsxOpeningElement = 289,
    JsxClosingElement = 290,
    JsxFragment = 291,
    JsxOpeningFragment = 292,
    JsxClosingFragment = 293,
    JsxAttribute = 294,
    JsxAttributes = 295,
    JsxSpreadAttribute = 296,
    JsxExpression = 297,
    JsxNamespacedName = 298,
    CaseClause = 299,
    DefaultClause = 300,
    HeritageClause = 301,
    CatchClause = 302,
    ImportAttributes = 303,
    ImportAttribute = 304,
    /** @deprecated */ AssertClause = 303,
    /** @deprecated */ AssertEntry = 304,
    /** @deprecated */ ImportTypeAssertionContainer = 305,
    PropertyAssignment = 306,
    ShorthandPropertyAssignment = 307,
    SpreadAssignment = 308,
    EnumMember = 309,
    SourceFile = 310,
    Bundle = 311,
    JSDocTypeExpression = 312,
    JSDocNameReference = 313,
    JSDocMemberName = 314,// C#p
    JSDocAllType = 315,// The * type
    JSDocUnknownType = 316,// The ? type
    JSDocNullableType = 317,
    JSDocNonNullableType = 318,
    JSDocOptionalType = 319,
    JSDocFunctionType = 320,
    JSDocVariadicType = 321,
    JSDocNamepathType = 322,// https://jsdoc.app/about-namepaths.html
    JSDoc = 323,
    /** @deprecated Use SyntaxKind.JSDoc */
    JSDocComment = 323,
    JSDocText = 324,
    JSDocTypeLiteral = 325,
    JSDocSignature = 326,
    JSDocLink = 327,
    JSDocLinkCode = 328,
    JSDocLinkPlain = 329,
    JSDocTag = 330,
    JSDocAugmentsTag = 331,
    JSDocImplementsTag = 332,
    JSDocAuthorTag = 333,
    JSDocDeprecatedTag = 334,
    JSDocClassTag = 335,
    JSDocPublicTag = 336,
    JSDocPrivateTag = 337,
    JSDocProtectedTag = 338,
    JSDocReadonlyTag = 339,
    JSDocOverrideTag = 340,
    JSDocCallbackTag = 341,
    JSDocOverloadTag = 342,
    JSDocEnumTag = 343,
    JSDocParameterTag = 344,
    JSDocReturnTag = 345,
    JSDocThisTag = 346,
    JSDocTypeTag = 347,
    JSDocTemplateTag = 348,
    JSDocTypedefTag = 349,
    JSDocSeeTag = 350,
    JSDocPropertyTag = 351,
    JSDocThrowsTag = 352,
    JSDocSatisfiesTag = 353,
    JSDocImportTag = 354,
    SyntaxList = 355,
    NotEmittedStatement = 356,
    NotEmittedTypeElement = 357,
    PartiallyEmittedExpression = 358,
    CommaListExpression = 359,
    SyntheticReferenceExpression = 360,
    Count = 361,
    FirstAssignment = 64,
    LastAssignment = 79,
    FirstCompoundAssignment = 65,
    LastCompoundAssignment = 79,
    FirstReservedWord = 83,
    LastReservedWord = 118,
    FirstKeyword = 83,
    LastKeyword = 168,
    FirstFutureReservedWord = 119,
    LastFutureReservedWord = 127,
    FirstTypeNode = 185,
    LastTypeNode = 208,
    FirstPunctuation = 19,
    LastPunctuation = 79,
    FirstToken = 0,
    LastToken = 168,
    FirstTriviaToken = 2,
    LastTriviaToken = 7,
    FirstLiteralToken = 9,
    LastLiteralToken = 15,
    FirstTemplateToken = 15,
    LastTemplateToken = 18,
    FirstBinaryOperator = 30,
    LastBinaryOperator = 79,
    FirstStatement = 246,
    LastStatement = 262,
    FirstNode = 169,
    FirstJSDocNode = 312,
    LastJSDocNode = 354,
    FirstJSDocTagNode = 330,
    LastJSDocTagNode = 354,
    /** @internal */ FirstContextualKeyword = 128,
    /** @internal */ LastContextualKeyword = 168
}
export type TriviaSyntaxKind = SyntaxKind.SingleLineCommentTrivia | SyntaxKind.MultiLineCommentTrivia | SyntaxKind.NewLineTrivia | SyntaxKind.WhitespaceTrivia | SyntaxKind.ShebangTrivia | SyntaxKind.ConflictMarkerTrivia;
export type LiteralSyntaxKind = SyntaxKind.NumericLiteral | SyntaxKind.BigIntLiteral | SyntaxKind.StringLiteral | SyntaxKind.JsxText | SyntaxKind.JsxTextAllWhiteSpaces | SyntaxKind.RegularExpressionLiteral | SyntaxKind.NoSubstitutionTemplateLiteral;
export type PseudoLiteralSyntaxKind = SyntaxKind.TemplateHead | SyntaxKind.TemplateMiddle | SyntaxKind.TemplateTail;
export type PunctuationSyntaxKind = SyntaxKind.OpenBraceToken | SyntaxKind.CloseBraceToken | SyntaxKind.OpenParenToken | SyntaxKind.CloseParenToken | SyntaxKind.OpenBracketToken | SyntaxKind.CloseBracketToken | SyntaxKind.DotToken | SyntaxKind.DotDotDotToken | SyntaxKind.SemicolonToken | SyntaxKind.CommaToken | SyntaxKind.QuestionDotToken | SyntaxKind.LessThanToken | SyntaxKind.LessThanSlashToken | SyntaxKind.GreaterThanToken | SyntaxKind.LessThanEqualsToken | SyntaxKind.GreaterThanEqualsToken | SyntaxKind.EqualsEqualsToken | SyntaxKind.ExclamationEqualsToken | SyntaxKind.EqualsEqualsEqualsToken | SyntaxKind.ExclamationEqualsEqualsToken | SyntaxKind.EqualsGreaterThanToken | SyntaxKind.PlusToken | SyntaxKind.MinusToken | SyntaxKind.AsteriskToken | SyntaxKind.AsteriskAsteriskToken | SyntaxKind.SlashToken | SyntaxKind.PercentToken | SyntaxKind.PlusPlusToken | SyntaxKind.MinusMinusToken | SyntaxKind.LessThanLessThanToken | SyntaxKind.GreaterThanGreaterThanToken | SyntaxKind.GreaterThanGreaterThanGreaterThanToken | SyntaxKind.AmpersandToken | SyntaxKind.BarToken | SyntaxKind.CaretToken | SyntaxKind.ExclamationToken | SyntaxKind.TildeToken | SyntaxKind.AmpersandAmpersandToken | SyntaxKind.AmpersandAmpersandEqualsToken | SyntaxKind.BarBarToken | SyntaxKind.BarBarEqualsToken | SyntaxKind.QuestionQuestionToken | SyntaxKind.QuestionQuestionEqualsToken | SyntaxKind.QuestionToken | SyntaxKind.ColonToken | SyntaxKind.AtToken | SyntaxKind.BacktickToken | SyntaxKind.HashToken | SyntaxKind.EqualsToken | SyntaxKind.PlusEqualsToken | SyntaxKind.MinusEqualsToken | SyntaxKind.AsteriskEqualsToken | SyntaxKind.AsteriskAsteriskEqualsToken | SyntaxKind.SlashEqualsToken | SyntaxKind.PercentEqualsToken | SyntaxKind.LessThanLessThanEqualsToken | SyntaxKind.GreaterThanGreaterThanEqualsToken | SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken | SyntaxKind.AmpersandEqualsToken | SyntaxKind.BarEqualsToken | SyntaxKind.CaretEqualsToken;
/** @internal */
export type PunctuationOrKeywordSyntaxKind = PunctuationSyntaxKind | KeywordSyntaxKind;
export type KeywordSyntaxKind = SyntaxKind.AbstractKeyword | SyntaxKind.AccessorKeyword | SyntaxKind.AnyKeyword | SyntaxKind.AsKeyword | SyntaxKind.AssertsKeyword | SyntaxKind.AssertKeyword | SyntaxKind.AsyncKeyword | SyntaxKind.AwaitKeyword | SyntaxKind.BigIntKeyword | SyntaxKind.BooleanKeyword | SyntaxKind.BreakKeyword | SyntaxKind.CaseKeyword | SyntaxKind.CatchKeyword | SyntaxKind.ClassKeyword | SyntaxKind.ConstKeyword | SyntaxKind.ConstructorKeyword | SyntaxKind.ContinueKeyword | SyntaxKind.DebuggerKeyword | SyntaxKind.DeclareKeyword | SyntaxKind.DefaultKeyword | SyntaxKind.DeferKeyword | SyntaxKind.DeleteKeyword | SyntaxKind.DoKeyword | SyntaxKind.ElseKeyword | SyntaxKind.EnumKeyword | SyntaxKind.ExportKeyword | SyntaxKind.ExtendsKeyword | SyntaxKind.FalseKeyword | SyntaxKind.FinallyKeyword | SyntaxKind.ForKeyword | SyntaxKind.FromKeyword | SyntaxKind.FunctionKeyword | SyntaxKind.GetKeyword | SyntaxKind.GlobalKeyword | SyntaxKind.IfKeyword | SyntaxKind.ImplementsKeyword | SyntaxKind.ImportKeyword | SyntaxKind.InferKeyword | SyntaxKind.InKeyword | SyntaxKind.InstanceOfKeyword | SyntaxKind.InterfaceKeyword | SyntaxKind.IntrinsicKeyword | SyntaxKind.IsKeyword | SyntaxKind.KeyOfKeyword | SyntaxKind.LetKeyword | SyntaxKind.ModuleKeyword | SyntaxKind.NamespaceKeyword | SyntaxKind.NeverKeyword | SyntaxKind.NewKeyword | SyntaxKind.NullKeyword | SyntaxKind.NumberKeyword | SyntaxKind.ObjectKeyword | SyntaxKind.OfKeyword | SyntaxKind.PackageKeyword | SyntaxKind.PrivateKeyword | SyntaxKind.ProtectedKeyword | SyntaxKind.PublicKeyword | SyntaxKind.ReadonlyKeyword | SyntaxKind.OutKeyword | SyntaxKind.OverrideKeyword | SyntaxKind.RequireKeyword | SyntaxKind.RejectsKeyword | SyntaxKind.ReturnKeyword | SyntaxKind.SatisfiesKeyword | SyntaxKind.SetKeyword | SyntaxKind.StaticKeyword | SyntaxKind.StringKeyword | SyntaxKind.SuperKeyword | SyntaxKind.SwitchKeyword | SyntaxKind.SymbolKeyword | SyntaxKind.ThisKeyword | SyntaxKind.ThrowKeyword | SyntaxKind.ThrowsKeyword | SyntaxKind.TrueKeyword | SyntaxKind.TryKeyword | SyntaxKind.TypeKeyword | SyntaxKind.TypeOfKeyword | SyntaxKind.UndefinedKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.UnknownKeyword | SyntaxKind.UsingKeyword | SyntaxKind.VarKeyword | SyntaxKind.VoidKeyword | SyntaxKind.WhileKeyword | SyntaxKind.WithKeyword | SyntaxKind.YieldKeyword;
export type ModifierSyntaxKind = SyntaxKind.AbstractKeyword | SyntaxKind.AccessorKeyword | SyntaxKind.AsyncKeyword | SyntaxKind.ConstKeyword | SyntaxKind.DeclareKeyword | SyntaxKind.DefaultKeyword | SyntaxKind.ExportKeyword | SyntaxKind.InKeyword | SyntaxKind.PrivateKeyword | SyntaxKind.ProtectedKeyword | SyntaxKind.PublicKeyword | SyntaxKind.ReadonlyKeyword | SyntaxKind.OutKeyword | SyntaxKind.OverrideKeyword | SyntaxKind.StaticKeyword;
export type KeywordTypeSyntaxKind = SyntaxKind.AnyKeyword | SyntaxKind.BigIntKeyword | SyntaxKind.BooleanKeyword | SyntaxKind.IntrinsicKeyword | SyntaxKind.NeverKeyword | SyntaxKind.NumberKeyword | SyntaxKind.ObjectKeyword | SyntaxKind.StringKeyword | SyntaxKind.SymbolKeyword | SyntaxKind.UndefinedKeyword | SyntaxKind.UnknownKeyword | SyntaxKind.VoidKeyword;
/** @internal */
export type TypeNodeSyntaxKind = KeywordTypeSyntaxKind | SyntaxKind.TypePredicate | SyntaxKind.TypeReference | SyntaxKind.FunctionType | SyntaxKind.ConstructorType | SyntaxKind.TypeQuery | SyntaxKind.TypeLiteral | SyntaxKind.ArrayType | SyntaxKind.TupleType | SyntaxKind.NamedTupleMember | SyntaxKind.OptionalType | SyntaxKind.RestType | SyntaxKind.UnionType | SyntaxKind.IntersectionType | SyntaxKind.ConditionalType | SyntaxKind.InferType | SyntaxKind.ParenthesizedType | SyntaxKind.ThisType | SyntaxKind.TypeOperator | SyntaxKind.IndexedAccessType | SyntaxKind.MappedType | SyntaxKind.LiteralType | SyntaxKind.TemplateLiteralType | SyntaxKind.TemplateLiteralTypeSpan | SyntaxKind.ImportType | SyntaxKind.ExpressionWithTypeArguments | SyntaxKind.JSDocTypeExpression | SyntaxKind.JSDocAllType | SyntaxKind.JSDocUnknownType | SyntaxKind.JSDocNonNullableType | SyntaxKind.JSDocNullableType | SyntaxKind.JSDocOptionalType | SyntaxKind.JSDocFunctionType | SyntaxKind.JSDocVariadicType | SyntaxKind.JSDocNamepathType | SyntaxKind.JSDocSignature | SyntaxKind.JSDocTypeLiteral;
export type TokenSyntaxKind = SyntaxKind.Unknown | SyntaxKind.EndOfFileToken | TriviaSyntaxKind | LiteralSyntaxKind | PseudoLiteralSyntaxKind | PunctuationSyntaxKind | SyntaxKind.Identifier | KeywordSyntaxKind;
export type JsxTokenSyntaxKind = SyntaxKind.LessThanSlashToken | SyntaxKind.EndOfFileToken | SyntaxKind.ConflictMarkerTrivia | SyntaxKind.JsxText | SyntaxKind.JsxTextAllWhiteSpaces | SyntaxKind.OpenBraceToken | SyntaxKind.LessThanToken;
export type JSDocSyntaxKind = SyntaxKind.EndOfFileToken | SyntaxKind.WhitespaceTrivia | SyntaxKind.AtToken | SyntaxKind.NewLineTrivia | SyntaxKind.AsteriskToken | SyntaxKind.OpenBraceToken | SyntaxKind.CloseBraceToken | SyntaxKind.LessThanToken | SyntaxKind.GreaterThanToken | SyntaxKind.OpenBracketToken | SyntaxKind.CloseBracketToken | SyntaxKind.OpenParenToken | SyntaxKind.CloseParenToken | SyntaxKind.EqualsToken | SyntaxKind.CommaToken | SyntaxKind.DotToken | SyntaxKind.Identifier | SyntaxKind.BacktickToken | SyntaxKind.HashToken | SyntaxKind.Unknown | KeywordSyntaxKind;
export declare const enum NodeFlags {
    None = 0,
    Let = 1,// Variable declaration
    Const = 2,// Variable declaration
    Using = 4,// Variable declaration
    AwaitUsing = 6,// Variable declaration (NOTE: on a single node these flags would otherwise be mutually exclusive)
    NestedNamespace = 8,// Namespace declaration
    Synthesized = 16,// Node was synthesized during transformation
    Namespace = 32,// Namespace declaration
    OptionalChain = 64,// Chained MemberExpression rooted to a pseudo-OptionalExpression
    ExportContext = 128,// Export context (initialized by binding)
    ContainsThis = 256,// Interface contains references to "this"
    HasImplicitReturn = 512,// If function implicitly returns on one of codepaths (initialized by binding)
    HasExplicitReturn = 1024,// If function has explicit reachable return on one of codepaths (initialized by binding)
    GlobalAugmentation = 2048,// Set if module declaration is an augmentation for the global scope
    HasAsyncFunctions = 4096,// If the file has async functions (initialized by binding)
    DisallowInContext = 8192,// If node was parsed in a context where 'in-expressions' are not allowed
    YieldContext = 16384,// If node was parsed in the 'yield' context created when parsing a generator
    DecoratorContext = 32768,// If node was parsed as part of a decorator
    AwaitContext = 65536,// If node was parsed in the 'await' context created when parsing an async function
    DisallowConditionalTypesContext = 131072,// If node was parsed in a context where conditional types are not allowed
    ThisNodeHasError = 262144,// If the parser encountered an error when parsing the code that created this node
    JavaScriptFile = 524288,// If node was parsed in a JavaScript
    ThisNodeOrAnySubNodesHasError = 1048576,// If this node or any of its children had an error
    HasAggregatedChildData = 2097152,// If we've computed data from children and cached it in this node
    /** @internal */ PossiblyContainsDynamicImport = 4194304,
    /** @internal */ PossiblyContainsImportMeta = 8388608,
    JSDoc = 16777216,// If node was parsed inside jsdoc
    /** @internal */ Ambient = 33554432,// If node was inside an ambient context -- a declaration file, or inside something with the `declare` modifier.
    /** @internal */ InWithStatement = 67108864,// If any ancestor of node was the `statement` of a WithStatement (not the `expression`)
    JsonFile = 134217728,// If node was parsed in a Json
    /** @internal */ TypeCached = 268435456,// If a type was cached for node at any point
    /** @internal */ Deprecated = 536870912,// If has '@deprecated' JSDoc tag
    /** @internal */ Unreachable = 1073741824,// If node is unreachable according to the binder
    BlockScoped = 7,
    Constant = 6,
    ReachabilityCheckFlags = 1536,
    ReachabilityAndEmitFlags = 5632,
    ContextFlags = 101441536,
    TypeExcludesFlags = 81920,
    /** @internal */ PermanentlySetIncrementalFlags = 12582912,
    /** @internal */ IdentifierHasExtendedUnicodeEscape = 256,// Indicates whether the identifier contains an extended unicode escape sequence
    /** @internal */ IdentifierIsInJSDocNamespace = 4096
}
export declare const enum ModifierFlags {
    None = 0,
    Public = 1,// Property/Method
    Private = 2,// Property/Method
    Protected = 4,// Property/Method
    Readonly = 8,// Property/Method
    Override = 16,// Override method.
    Export = 32,// Declarations
    Abstract = 64,// Class/Method/ConstructSignature
    Ambient = 128,// Declarations
    Static = 256,// Property/Method
    Accessor = 512,// Property
    Async = 1024,// Property/Method/Function
    Default = 2048,// Function/Class (export default declaration)
    Const = 4096,// Const enum
    In = 8192,// Contravariance modifier
    Out = 16384,// Covariance modifier
    Decorator = 32768,// Contains a decorator.
    Deprecated = 65536,// Deprecated tag.
    /** @internal */ JSDocPublic = 8388608,// if this value changes, `selectEffectiveModifierFlags` must change accordingly
    /** @internal */ JSDocPrivate = 16777216,
    /** @internal */ JSDocProtected = 33554432,
    /** @internal */ JSDocReadonly = 67108864,
    /** @internal */ JSDocOverride = 134217728,
    /** @internal */ SyntacticOrJSDocModifiers = 31,
    /** @internal */ SyntacticOnlyModifiers = 65504,
    /** @internal */ SyntacticModifiers = 65535,
    /** @internal */ JSDocCacheOnlyModifiers = 260046848,
    /** @internal */ JSDocOnlyModifiers = 65536,
    /** @internal */ NonCacheOnlyModifiers = 131071,
    HasComputedJSDocModifiers = 268435456,// Indicates the computed modifier flags include modifiers from JSDoc.
    HasComputedFlags = 536870912,// Modifier flags have been computed
    AccessibilityModifier = 7,
    ParameterPropertyModifier = 31,
    NonPublicAccessibilityModifier = 6,
    TypeScriptModifier = 28895,
    ExportDefault = 2080,
    All = 131071,
    Modifier = 98303
}
export declare const enum JsxFlags {
    None = 0,
    /** An element from a named property of the JSX.IntrinsicElements interface */
    IntrinsicNamedElement = 1,
    /** An element inferred from the string index signature of the JSX.IntrinsicElements interface */
    IntrinsicIndexedElement = 2,
    IntrinsicElement = 3
}
/** @internal */
export declare const enum RelationComparisonResult {
    None = 0,
    Succeeded = 1,// Should be truthy
    Failed = 2,
    ReportsUnmeasurable = 8,
    ReportsUnreliable = 16,
    ReportsMask = 24,
    ComplexityOverflow = 32,
    StackDepthOverflow = 64,
    Overflow = 96
}
/** @internal */
export declare const enum PredicateSemantics {
    None = 0,
    Always = 1,
    Never = 2,
    Sometimes = 3
}
/** @internal */
export type NodeId = number;
export interface Node extends ReadonlyTextRange {
    readonly kind: SyntaxKind;
    readonly flags: NodeFlags;
    /** @internal */ modifierFlagsCache: ModifierFlags;
    /** @internal */ readonly transformFlags: TransformFlags;
    /** @internal */ id?: NodeId;
    readonly parent: Node;
    /** @internal */ original?: Node;
    /** @internal */ emitNode?: EmitNode;
}
export interface JSDocContainer extends Node {
    _jsdocContainerBrand: any;
    /** @internal */ jsDoc?: JSDocArray;
}
/** @internal */
export interface JSDocArray extends Array<JSDoc> {
    jsDocCache?: readonly JSDocTag[];
}
export interface LocalsContainer extends Node {
    _localsContainerBrand: any;
    /** @internal */ locals?: SymbolTable;
    /** @internal */ nextContainer?: HasLocals;
}
export interface FlowContainer extends Node {
    _flowContainerBrand: any;
    /** @internal */ flowNode?: FlowNode;
}
/** @internal */
export type HasFlowNode = Identifier | ThisExpression | SuperExpression | QualifiedName | MetaProperty | ElementAccessExpression | PropertyAccessExpression | BindingElement | FunctionExpression | ArrowFunction | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | VariableStatement | ExpressionStatement | IfStatement | DoStatement | WhileStatement | ForStatement | ForInStatement | ForOfStatement | ContinueStatement | BreakStatement | ReturnStatement | WithStatement | SwitchStatement | LabeledStatement | ThrowStatement | TryStatement | DebuggerStatement;
/** @internal */
export type ForEachChildNodes = HasChildren | MissingDeclaration | JSDocTypeExpression | JSDocNonNullableType | JSDocNullableType | JSDocOptionalType | JSDocVariadicType | JSDocFunctionType | JSDoc | JSDocSeeTag | JSDocNameReference | JSDocMemberName | JSDocParameterTag | JSDocPropertyTag | JSDocAuthorTag | JSDocImplementsTag | JSDocAugmentsTag | JSDocTemplateTag | JSDocTypedefTag | JSDocCallbackTag | JSDocReturnTag | JSDocTypeTag | JSDocThisTag | JSDocEnumTag | JSDocSignature | JSDocLink | JSDocLinkCode | JSDocLinkPlain | JSDocTypeLiteral | JSDocUnknownTag | JSDocClassTag | JSDocPublicTag | JSDocPrivateTag | JSDocProtectedTag | JSDocReadonlyTag | JSDocDeprecatedTag | JSDocThrowsTag | JSDocOverrideTag | JSDocSatisfiesTag | JSDocOverloadTag | JSDocImportTag;
/** @internal */
export type HasChildren = QualifiedName | ComputedPropertyName | TypeParameterDeclaration | ParameterDeclaration | Decorator | PropertySignature | PropertyDeclaration | MethodSignature | MethodDeclaration | ConstructorDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | ClassStaticBlockDeclaration | CallSignatureDeclaration | ConstructSignatureDeclaration | IndexSignatureDeclaration | TypePredicateNode | TypeReferenceNode | FunctionTypeNode | ConstructorTypeNode | TypeQueryNode | TypeLiteralNode | ArrayTypeNode | TupleTypeNode | OptionalTypeNode | RestTypeNode | UnionTypeNode | IntersectionTypeNode | ConditionalTypeNode | InferTypeNode | ImportTypeNode | ImportTypeAssertionContainer | NamedTupleMember | ParenthesizedTypeNode | TypeOperatorNode | IndexedAccessTypeNode | MappedTypeNode | LiteralTypeNode | TemplateLiteralTypeNode | TemplateLiteralTypeSpan | ObjectBindingPattern | ArrayBindingPattern | BindingElement | ArrayLiteralExpression | ObjectLiteralExpression | PropertyAccessExpression | ElementAccessExpression | CallExpression | NewExpression | TaggedTemplateExpression | TypeAssertion | ParenthesizedExpression | FunctionExpression | ArrowFunction | DeleteExpression | TypeOfExpression | VoidExpression | AwaitExpression | PrefixUnaryExpression | PostfixUnaryExpression | BinaryExpression | ConditionalExpression | TemplateExpression | YieldExpression | SpreadElement | ClassExpression | ExpressionWithTypeArguments | AsExpression | NonNullExpression | SatisfiesExpression | MetaProperty | TemplateSpan | Block | VariableStatement | ExpressionStatement | IfStatement | DoStatement | WhileStatement | ForStatement | ForInStatement | ForOfStatement | ContinueStatement | BreakStatement | ReturnStatement | WithStatement | SwitchStatement | LabeledStatement | ThrowStatement | TryStatement | VariableDeclaration | VariableDeclarationList | FunctionDeclaration | ClassDeclaration | InterfaceDeclaration | TypeAliasDeclaration | EnumDeclaration | ModuleDeclaration | ModuleBlock | CaseBlock | NamespaceExportDeclaration | ImportEqualsDeclaration | ImportDeclaration | AssertClause | AssertEntry | ImportAttributes | ImportAttribute | ImportClause | NamespaceImport | NamespaceExport | NamedImports | ImportSpecifier | ExportAssignment | ExportDeclaration | NamedExports | ExportSpecifier | ExternalModuleReference | JsxElement | JsxSelfClosingElement | JsxOpeningElement | JsxClosingElement | JsxFragment | JsxAttribute | JsxAttributes | JsxSpreadAttribute | JsxExpression | JsxNamespacedName | CaseClause | DefaultClause | HeritageClause | CatchClause | PropertyAssignment | ShorthandPropertyAssignment | SpreadAssignment | EnumMember | SourceFile | PartiallyEmittedExpression | CommaListExpression;
export type HasJSDoc = AccessorDeclaration | ArrowFunction | BinaryExpression | Block | BreakStatement | CallSignatureDeclaration | CaseClause | ClassLikeDeclaration | ClassStaticBlockDeclaration | ConstructorDeclaration | ConstructorTypeNode | ConstructSignatureDeclaration | ContinueStatement | DebuggerStatement | DoStatement | ElementAccessExpression | EmptyStatement | EndOfFileToken | EnumDeclaration | EnumMember | ExportAssignment | ExportDeclaration | ExportSpecifier | ExpressionStatement | ForInStatement | ForOfStatement | ForStatement | FunctionDeclaration | FunctionExpression | FunctionTypeNode | Identifier | IfStatement | ImportDeclaration | ImportEqualsDeclaration | IndexSignatureDeclaration | InterfaceDeclaration | JSDocFunctionType | JSDocSignature | LabeledStatement | MethodDeclaration | MethodSignature | ModuleDeclaration | NamedTupleMember | NamespaceExportDeclaration | ObjectLiteralExpression | ParameterDeclaration | ParenthesizedExpression | PropertyAccessExpression | PropertyAssignment | PropertyDeclaration | PropertySignature | ReturnStatement | SemicolonClassElement | ShorthandPropertyAssignment | SpreadAssignment | SwitchStatement | ThrowStatement | TryStatement | TypeAliasDeclaration | TypeParameterDeclaration | VariableDeclaration | VariableStatement | WhileStatement | WithStatement;
export type HasType = SignatureDeclaration | VariableDeclaration | ParameterDeclaration | PropertySignature | PropertyDeclaration | TypePredicateNode | ParenthesizedTypeNode | TypeOperatorNode | MappedTypeNode | AssertionExpression | TypeAliasDeclaration | JSDocTypeExpression | JSDocNonNullableType | JSDocNullableType | JSDocOptionalType | JSDocVariadicType;
/** @internal */
export type HasIllegalType = ConstructorDeclaration | SetAccessorDeclaration;
/** @internal */
export type HasIllegalTypeParameters = ConstructorDeclaration | SetAccessorDeclaration | GetAccessorDeclaration;
export type HasTypeArguments = CallExpression | NewExpression | TaggedTemplateExpression | JsxOpeningElement | JsxSelfClosingElement;
export type HasInitializer = HasExpressionInitializer | ForStatement | ForInStatement | ForOfStatement | JsxAttribute;
export type HasExpressionInitializer = VariableDeclaration | ParameterDeclaration | BindingElement | PropertyDeclaration | PropertyAssignment | EnumMember;
/** @internal @knipignore */
export type HasIllegalExpressionInitializer = PropertySignature;
export type HasDecorators = ParameterDeclaration | PropertyDeclaration | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | ClassExpression | ClassDeclaration;
/** @internal */
export type HasIllegalDecorators = PropertyAssignment | ShorthandPropertyAssignment | FunctionDeclaration | ConstructorDeclaration | IndexSignatureDeclaration | ClassStaticBlockDeclaration | MissingDeclaration | VariableStatement | InterfaceDeclaration | TypeAliasDeclaration | EnumDeclaration | ModuleDeclaration | ImportEqualsDeclaration | ImportDeclaration | NamespaceExportDeclaration | ExportDeclaration | ExportAssignment;
export type HasModifiers = TypeParameterDeclaration | ParameterDeclaration | ConstructorTypeNode | PropertySignature | PropertyDeclaration | MethodSignature | MethodDeclaration | ConstructorDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | IndexSignatureDeclaration | FunctionExpression | ArrowFunction | ClassExpression | VariableStatement | FunctionDeclaration | ClassDeclaration | InterfaceDeclaration | TypeAliasDeclaration | EnumDeclaration | ModuleDeclaration | ImportEqualsDeclaration | ImportDeclaration | ExportAssignment | ExportDeclaration;
/** @internal */
export type HasIllegalModifiers = ClassStaticBlockDeclaration | PropertyAssignment | ShorthandPropertyAssignment | MissingDeclaration | NamespaceExportDeclaration;
/** @internal */
export type PrimitiveLiteral = BooleanLiteral | NumericLiteral | StringLiteral | NoSubstitutionTemplateLiteral | BigIntLiteral | PrefixUnaryExpression & {
    operator: SyntaxKind.PlusToken;
    operand: NumericLiteral;
} | PrefixUnaryExpression & {
    operator: SyntaxKind.MinusToken;
    operand: NumericLiteral | BigIntLiteral;
};
/**
 * Declarations that can contain other declarations. Corresponds with `ContainerFlags.IsContainer` in binder.ts.
 *
 * @internal
 */
export type IsContainer = ClassExpression | ClassDeclaration | EnumDeclaration | ObjectLiteralExpression | TypeLiteralNode | JSDocTypeLiteral | JsxAttributes | InterfaceDeclaration | ModuleDeclaration | TypeAliasDeclaration | MappedTypeNode | IndexSignatureDeclaration | SourceFile | GetAccessorDeclaration | SetAccessorDeclaration | MethodDeclaration | ConstructorDeclaration | FunctionDeclaration | MethodSignature | CallSignatureDeclaration | JSDocSignature | JSDocFunctionType | FunctionTypeNode | ConstructSignatureDeclaration | ConstructorTypeNode | ClassStaticBlockDeclaration | FunctionExpression | ArrowFunction;
/**
 * Nodes that introduce a new block scope. Corresponds with `ContainerFlags.IsBlockScopedContainer` in binder.ts.
 *
 * @internal
 */
export type IsBlockScopedContainer = IsContainer | CatchClause | ForStatement | ForInStatement | ForOfStatement | CaseBlock | Block;
/**
 * Corresponds with `ContainerFlags.IsControlFlowContainer` in binder.ts.
 *
 * @internal
 */
export type IsControlFlowContainer = SourceFile | GetAccessorDeclaration | SetAccessorDeclaration | MethodDeclaration | ConstructorDeclaration | FunctionDeclaration | MethodSignature | CallSignatureDeclaration | JSDocSignature | JSDocFunctionType | FunctionTypeNode | ConstructSignatureDeclaration | ConstructorTypeNode | ClassStaticBlockDeclaration | FunctionExpression | ArrowFunction | ModuleBlock | PropertyDeclaration;
/**
 * Corresponds with `ContainerFlags.IsFunctionLike` in binder.ts.
 *
 * @internal
 */
export type IsFunctionLike = GetAccessorDeclaration | SetAccessorDeclaration | MethodDeclaration | ConstructorDeclaration | FunctionDeclaration | MethodSignature | CallSignatureDeclaration | JSDocSignature | JSDocFunctionType | FunctionTypeNode | ConstructSignatureDeclaration | ConstructorTypeNode | ClassStaticBlockDeclaration | FunctionExpression | ArrowFunction;
/**
 * Corresponds with `ContainerFlags.IsFunctionExpression` in binder.ts.
 *
 * @internal
 */
export type IsFunctionExpression = FunctionExpression | ArrowFunction;
/**
 * Nodes that can have local symbols. Corresponds with `ContainerFlags.HasLocals`. Constituents should extend
 * {@link LocalsContainer}.
 *
 * @internal
 */
export type HasLocals = ArrowFunction | Block | CallSignatureDeclaration | CaseBlock | CatchClause | ClassStaticBlockDeclaration | ConditionalTypeNode | ConstructorDeclaration | ConstructorTypeNode | ConstructSignatureDeclaration | ForStatement | ForInStatement | ForOfStatement | FunctionDeclaration | FunctionExpression | FunctionTypeNode | GetAccessorDeclaration | IndexSignatureDeclaration | JSDocCallbackTag | JSDocEnumTag | JSDocFunctionType | JSDocSignature | JSDocTypedefTag | MappedTypeNode | MethodDeclaration | MethodSignature | ModuleDeclaration | SetAccessorDeclaration | SourceFile | TypeAliasDeclaration;
/**
 * Corresponds with `ContainerFlags.IsInterface` in binder.ts.
 *
 * @internal
 */
export type IsInterface = InterfaceDeclaration;
/**
 * Corresponds with `ContainerFlags.IsObjectLiteralOrClassExpressionMethodOrAccessor` in binder.ts.
 *
 * @internal
 */
export type IsObjectLiteralOrClassExpressionMethodOrAccessor = GetAccessorDeclaration | SetAccessorDeclaration | MethodDeclaration;
/**
 * Corresponds with `ContainerFlags` in binder.ts.
 *
 * @internal
 */
export type HasContainerFlags = IsContainer | IsBlockScopedContainer | IsControlFlowContainer | IsFunctionLike | IsFunctionExpression | HasLocals | IsInterface | IsObjectLiteralOrClassExpressionMethodOrAccessor;
/** @internal */
export interface MutableNodeArray<T extends Node> extends Array<T>, TextRange {
    hasTrailingComma: boolean;
    /** @internal */ transformFlags: TransformFlags;
}
export interface NodeArray<T extends Node> extends ReadonlyArray<T>, ReadonlyTextRange {
    readonly hasTrailingComma: boolean;
    /** @internal */ transformFlags: TransformFlags;
}
export interface Token<TKind extends SyntaxKind> extends Node {
    readonly kind: TKind;
}
export type EndOfFileToken = Token<SyntaxKind.EndOfFileToken> & JSDocContainer;
export interface PunctuationToken<TKind extends PunctuationSyntaxKind> extends Token<TKind> {
}
export type DotToken = PunctuationToken<SyntaxKind.DotToken>;
export type DotDotDotToken = PunctuationToken<SyntaxKind.DotDotDotToken>;
export type QuestionToken = PunctuationToken<SyntaxKind.QuestionToken>;
export type ExclamationToken = PunctuationToken<SyntaxKind.ExclamationToken>;
export type ColonToken = PunctuationToken<SyntaxKind.ColonToken>;
export type EqualsToken = PunctuationToken<SyntaxKind.EqualsToken>;
export type AmpersandAmpersandEqualsToken = PunctuationToken<SyntaxKind.AmpersandAmpersandEqualsToken>;
export type BarBarEqualsToken = PunctuationToken<SyntaxKind.BarBarEqualsToken>;
export type QuestionQuestionEqualsToken = PunctuationToken<SyntaxKind.QuestionQuestionEqualsToken>;
export type AsteriskToken = PunctuationToken<SyntaxKind.AsteriskToken>;
export type EqualsGreaterThanToken = PunctuationToken<SyntaxKind.EqualsGreaterThanToken>;
export type PlusToken = PunctuationToken<SyntaxKind.PlusToken>;
export type MinusToken = PunctuationToken<SyntaxKind.MinusToken>;
export type QuestionDotToken = PunctuationToken<SyntaxKind.QuestionDotToken>;
export interface KeywordToken<TKind extends KeywordSyntaxKind> extends Token<TKind> {
}
export type AssertsKeyword = KeywordToken<SyntaxKind.AssertsKeyword>;
export type AssertKeyword = KeywordToken<SyntaxKind.AssertKeyword>;
export type AwaitKeyword = KeywordToken<SyntaxKind.AwaitKeyword>;
export type CaseKeyword = KeywordToken<SyntaxKind.CaseKeyword>;
export interface ModifierToken<TKind extends ModifierSyntaxKind> extends KeywordToken<TKind> {
}
export type AbstractKeyword = ModifierToken<SyntaxKind.AbstractKeyword>;
export type AccessorKeyword = ModifierToken<SyntaxKind.AccessorKeyword>;
export type AsyncKeyword = ModifierToken<SyntaxKind.AsyncKeyword>;
export type ConstKeyword = ModifierToken<SyntaxKind.ConstKeyword>;
export type DeclareKeyword = ModifierToken<SyntaxKind.DeclareKeyword>;
export type DefaultKeyword = ModifierToken<SyntaxKind.DefaultKeyword>;
export type ExportKeyword = ModifierToken<SyntaxKind.ExportKeyword>;
export type InKeyword = ModifierToken<SyntaxKind.InKeyword>;
export type PrivateKeyword = ModifierToken<SyntaxKind.PrivateKeyword>;
export type ProtectedKeyword = ModifierToken<SyntaxKind.ProtectedKeyword>;
export type PublicKeyword = ModifierToken<SyntaxKind.PublicKeyword>;
export type ReadonlyKeyword = ModifierToken<SyntaxKind.ReadonlyKeyword>;
export type OutKeyword = ModifierToken<SyntaxKind.OutKeyword>;
export type OverrideKeyword = ModifierToken<SyntaxKind.OverrideKeyword>;
export type StaticKeyword = ModifierToken<SyntaxKind.StaticKeyword>;
export type Modifier = AbstractKeyword | AccessorKeyword | AsyncKeyword | ConstKeyword | DeclareKeyword | DefaultKeyword | ExportKeyword | InKeyword | PrivateKeyword | ProtectedKeyword | PublicKeyword | OutKeyword | OverrideKeyword | ReadonlyKeyword | StaticKeyword;
export type ModifierLike = Modifier | Decorator;
export type AccessibilityModifier = PublicKeyword | PrivateKeyword | ProtectedKeyword;
export type ParameterPropertyModifier = AccessibilityModifier | ReadonlyKeyword;
export type ClassMemberModifier = AccessibilityModifier | ReadonlyKeyword | StaticKeyword | AccessorKeyword;
export type ModifiersArray = NodeArray<Modifier>;
export declare const enum GeneratedIdentifierFlags {
    None = 0,// Not automatically generated.
    /** @internal */ Auto = 1,// Automatically generated identifier.
    /** @internal */ Loop = 2,// Automatically generated identifier with a preference for '_i'.
    /** @internal */ Unique = 3,// Unique name based on the 'text' property.
    /** @internal */ Node = 4,// Unique name based on the node in the 'original' property.
    /** @internal */ KindMask = 7,// Mask to extract the kind of identifier from its flags.
    ReservedInNestedScopes = 8,// Reserve the generated name in nested scopes
    Optimistic = 16,// First instance won't use '_#' if there's no conflict
    FileLevel = 32,// Use only the file identifiers list and not generated names to search for conflicts
    AllowNameSubstitution = 64
}
export interface Identifier extends PrimaryExpression, Declaration, JSDocContainer, FlowContainer {
    readonly kind: SyntaxKind.Identifier;
    /**
     * Prefer to use `id.unescapedText`. (Note: This is available only in services, not internally to the TypeScript compiler.)
     * Text of identifier, but if the identifier begins with two underscores, this will begin with three.
     */
    readonly escapedText: __String;
}
export interface TransientIdentifier extends Identifier {
    resolvedSymbol: Symbol;
}
/** @internal */
export interface AutoGenerateInfo {
    flags: GeneratedIdentifierFlags;
    readonly id: number;
    readonly prefix?: string | GeneratedNamePart;
    readonly suffix?: string;
}
/** @internal */
export interface GeneratedIdentifier extends Identifier {
    readonly emitNode: EmitNode & {
        autoGenerate: AutoGenerateInfo;
    };
}
export interface QualifiedName extends Node, FlowContainer {
    readonly kind: SyntaxKind.QualifiedName;
    readonly left: EntityName;
    readonly right: Identifier;
}
export type EntityName = Identifier | QualifiedName;
export type PropertyName = Identifier | StringLiteral | NoSubstitutionTemplateLiteral | NumericLiteral | ComputedPropertyName | PrivateIdentifier | BigIntLiteral;
export type MemberName = Identifier | PrivateIdentifier;
export type DeclarationName = PropertyName | JsxAttributeName | StringLiteralLike | ElementAccessExpression | BindingPattern | EntityNameExpression;
export interface Declaration extends Node {
    _declarationBrand: any;
    /** @internal */ symbol: Symbol;
    /** @internal */ localSymbol?: Symbol;
}
export interface NamedDeclaration extends Declaration {
    readonly name?: DeclarationName;
}
/** @internal */
export interface DynamicNamedDeclaration extends NamedDeclaration {
    readonly name: ComputedPropertyName;
}
/** @internal */
export interface DynamicNamedBinaryExpression extends BinaryExpression {
    readonly left: ElementAccessExpression;
}
/** @internal */
export interface LateBoundDeclaration extends DynamicNamedDeclaration {
    readonly name: LateBoundName;
}
/** @internal */
export interface LateBoundBinaryExpressionDeclaration extends DynamicNamedBinaryExpression {
    readonly left: LateBoundElementAccessExpression;
}
/** @internal */
export interface LateBoundElementAccessExpression extends ElementAccessExpression {
    readonly argumentExpression: EntityNameExpression;
}
export interface DeclarationStatement extends NamedDeclaration, Statement {
    readonly name?: Identifier | StringLiteral | NumericLiteral;
}
export interface ComputedPropertyName extends Node {
    readonly kind: SyntaxKind.ComputedPropertyName;
    readonly parent: Declaration;
    readonly expression: Expression;
}
export interface PrivateIdentifier extends PrimaryExpression {
    readonly kind: SyntaxKind.PrivateIdentifier;
    readonly escapedText: __String;
}
/** @internal */
export interface GeneratedPrivateIdentifier extends PrivateIdentifier {
    readonly emitNode: EmitNode & {
        autoGenerate: AutoGenerateInfo;
    };
}
/** @internal */
export interface LateBoundName extends ComputedPropertyName {
    readonly expression: EntityNameExpression;
}
export interface Decorator extends Node {
    readonly kind: SyntaxKind.Decorator;
    readonly parent: NamedDeclaration;
    readonly expression: LeftHandSideExpression;
}
export interface TypeParameterDeclaration extends NamedDeclaration, JSDocContainer {
    readonly kind: SyntaxKind.TypeParameter;
    readonly parent: DeclarationWithTypeParameterChildren | InferTypeNode;
    readonly modifiers?: NodeArray<Modifier>;
    readonly name: Identifier;
    /** Note: Consider calling `getEffectiveConstraintOfTypeParameter` */
    readonly constraint?: TypeNode;
    readonly default?: TypeNode;
    expression?: Expression;
}
export interface SignatureDeclarationBase extends NamedDeclaration, JSDocContainer {
    readonly kind: SignatureDeclaration["kind"];
    readonly name?: PropertyName;
    readonly typeParameters?: NodeArray<TypeParameterDeclaration> | undefined;
    readonly parameters: NodeArray<ParameterDeclaration>;
    readonly type?: TypeNode | undefined;
    readonly throwsType: TypeNode | undefined;
    readonly rejectsType: TypeNode | undefined;
    /** @internal */ typeArguments?: NodeArray<TypeNode>;
}
export type SignatureDeclaration = CallSignatureDeclaration | ConstructSignatureDeclaration | MethodSignature | IndexSignatureDeclaration | FunctionTypeNode | ConstructorTypeNode | JSDocFunctionType | FunctionDeclaration | MethodDeclaration | ConstructorDeclaration | AccessorDeclaration | FunctionExpression | ArrowFunction;
export interface CallSignatureDeclaration extends SignatureDeclarationBase, TypeElement, LocalsContainer {
    readonly kind: SyntaxKind.CallSignature;
}
export interface ConstructSignatureDeclaration extends SignatureDeclarationBase, TypeElement, LocalsContainer {
    readonly kind: SyntaxKind.ConstructSignature;
}
export type BindingName = Identifier | BindingPattern;
export interface VariableDeclaration extends NamedDeclaration, JSDocContainer {
    readonly kind: SyntaxKind.VariableDeclaration;
    readonly parent: VariableDeclarationList | CatchClause;
    readonly name: BindingName;
    readonly exclamationToken?: ExclamationToken;
    readonly type?: TypeNode;
    readonly initializer?: Expression;
}
/** @internal */
export type InitializedVariableDeclaration = VariableDeclaration & {
    readonly initializer: Expression;
};
export interface VariableDeclarationList extends Node {
    readonly kind: SyntaxKind.VariableDeclarationList;
    readonly parent: VariableStatement | ForStatement | ForOfStatement | ForInStatement;
    readonly declarations: NodeArray<VariableDeclaration>;
}
export interface ParameterDeclaration extends NamedDeclaration, JSDocContainer {
    readonly kind: SyntaxKind.Parameter;
    readonly parent: SignatureDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly dotDotDotToken?: DotDotDotToken;
    readonly name: BindingName;
    readonly questionToken?: QuestionToken;
    readonly type?: TypeNode;
    readonly initializer?: Expression;
}
export interface BindingElement extends NamedDeclaration, FlowContainer {
    readonly kind: SyntaxKind.BindingElement;
    readonly parent: BindingPattern;
    readonly propertyName?: PropertyName;
    readonly dotDotDotToken?: DotDotDotToken;
    readonly name: BindingName;
    readonly initializer?: Expression;
}
/** @internal */
export type BindingElementGrandparent = BindingElement["parent"]["parent"];
export interface PropertySignature extends TypeElement, JSDocContainer {
    readonly kind: SyntaxKind.PropertySignature;
    readonly parent: TypeLiteralNode | InterfaceDeclaration;
    readonly modifiers?: NodeArray<Modifier>;
    readonly name: PropertyName;
    readonly questionToken?: QuestionToken;
    readonly type?: TypeNode;
    /** @internal */ readonly initializer?: Expression | undefined;
}
export interface PropertyDeclaration extends ClassElement, JSDocContainer {
    readonly kind: SyntaxKind.PropertyDeclaration;
    readonly parent: ClassLikeDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name: PropertyName;
    readonly questionToken?: QuestionToken;
    readonly exclamationToken?: ExclamationToken;
    readonly type?: TypeNode;
    readonly initializer?: Expression;
}
export interface AutoAccessorPropertyDeclaration extends PropertyDeclaration {
    _autoAccessorBrand: any;
}
/** @internal */
export interface PrivateIdentifierPropertyDeclaration extends PropertyDeclaration {
    name: PrivateIdentifier;
}
/** @internal */
export interface PrivateIdentifierAutoAccessorPropertyDeclaration extends AutoAccessorPropertyDeclaration {
    name: PrivateIdentifier;
}
/** @internal */
export interface PrivateIdentifierMethodDeclaration extends MethodDeclaration {
    name: PrivateIdentifier;
}
/** @internal */
export interface PrivateIdentifierGetAccessorDeclaration extends GetAccessorDeclaration {
    name: PrivateIdentifier;
}
/** @internal */
export interface PrivateIdentifierSetAccessorDeclaration extends SetAccessorDeclaration {
    name: PrivateIdentifier;
}
/** @internal */
export type PrivateIdentifierAccessorDeclaration = PrivateIdentifierGetAccessorDeclaration | PrivateIdentifierSetAccessorDeclaration;
/** @internal */
export type PrivateClassElementDeclaration = PrivateIdentifierPropertyDeclaration | PrivateIdentifierAutoAccessorPropertyDeclaration | PrivateIdentifierMethodDeclaration | PrivateIdentifierGetAccessorDeclaration | PrivateIdentifierSetAccessorDeclaration;
/** @internal */
export type InitializedPropertyDeclaration = PropertyDeclaration & {
    readonly initializer: Expression;
};
export interface ObjectLiteralElement extends NamedDeclaration {
    _objectLiteralBrand: any;
    readonly name?: PropertyName;
}
/** Unlike ObjectLiteralElement, excludes JSXAttribute and JSXSpreadAttribute. */
export type ObjectLiteralElementLike = PropertyAssignment | ShorthandPropertyAssignment | SpreadAssignment | MethodDeclaration | AccessorDeclaration;
export interface PropertyAssignment extends ObjectLiteralElement, JSDocContainer {
    readonly kind: SyntaxKind.PropertyAssignment;
    readonly parent: ObjectLiteralExpression;
    readonly name: PropertyName;
    readonly initializer: Expression;
    /** @internal */ readonly modifiers?: NodeArray<ModifierLike> | undefined;
    /** @internal */ readonly questionToken?: QuestionToken | undefined;
    /** @internal */ readonly exclamationToken?: ExclamationToken | undefined;
}
export interface ShorthandPropertyAssignment extends ObjectLiteralElement, JSDocContainer {
    readonly kind: SyntaxKind.ShorthandPropertyAssignment;
    readonly parent: ObjectLiteralExpression;
    readonly name: Identifier;
    readonly equalsToken?: EqualsToken;
    readonly objectAssignmentInitializer?: Expression;
    /** @internal */ readonly modifiers?: NodeArray<ModifierLike> | undefined;
    /** @internal */ readonly questionToken?: QuestionToken | undefined;
    /** @internal */ readonly exclamationToken?: ExclamationToken | undefined;
}
export interface SpreadAssignment extends ObjectLiteralElement, JSDocContainer {
    readonly kind: SyntaxKind.SpreadAssignment;
    readonly parent: ObjectLiteralExpression;
    readonly expression: Expression;
}
export type VariableLikeDeclaration = VariableDeclaration | ParameterDeclaration | BindingElement | PropertyDeclaration | PropertyAssignment | PropertySignature | JsxAttribute | ShorthandPropertyAssignment | EnumMember | JSDocPropertyTag | JSDocParameterTag;
export interface ObjectBindingPattern extends Node {
    readonly kind: SyntaxKind.ObjectBindingPattern;
    readonly parent: VariableDeclaration | ParameterDeclaration | BindingElement;
    readonly elements: NodeArray<BindingElement>;
}
export interface ArrayBindingPattern extends Node {
    readonly kind: SyntaxKind.ArrayBindingPattern;
    readonly parent: VariableDeclaration | ParameterDeclaration | BindingElement;
    readonly elements: NodeArray<ArrayBindingElement>;
}
export type BindingPattern = ObjectBindingPattern | ArrayBindingPattern;
export type ArrayBindingElement = BindingElement | OmittedExpression;
/**
 * Several node kinds share function-like features such as a signature,
 * a name, and a body. These nodes should extend FunctionLikeDeclarationBase.
 * Examples:
 * - FunctionDeclaration
 * - MethodDeclaration
 * - AccessorDeclaration
 */
export interface FunctionLikeDeclarationBase extends SignatureDeclarationBase {
    _functionLikeDeclarationBrand: any;
    readonly asteriskToken?: AsteriskToken | undefined;
    readonly questionToken?: QuestionToken | undefined;
    readonly exclamationToken?: ExclamationToken | undefined;
    readonly body?: Block | Expression | undefined;
    /** @internal */ endFlowNode?: FlowNode;
    /** @internal */ returnFlowNode?: FlowNode;
}
export type FunctionLikeDeclaration = FunctionDeclaration | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | ConstructorDeclaration | FunctionExpression | ArrowFunction;
/** @deprecated Use SignatureDeclaration */
export type FunctionLike = SignatureDeclaration;
export interface FunctionDeclaration extends FunctionLikeDeclarationBase, DeclarationStatement, LocalsContainer {
    readonly kind: SyntaxKind.FunctionDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name?: Identifier;
    readonly body?: FunctionBody;
}
export interface MethodSignature extends SignatureDeclarationBase, TypeElement, LocalsContainer {
    readonly kind: SyntaxKind.MethodSignature;
    readonly parent: TypeLiteralNode | InterfaceDeclaration;
    readonly modifiers?: NodeArray<Modifier>;
    readonly name: PropertyName;
}
export interface MethodDeclaration extends FunctionLikeDeclarationBase, ClassElement, ObjectLiteralElement, JSDocContainer, LocalsContainer, FlowContainer {
    readonly kind: SyntaxKind.MethodDeclaration;
    readonly parent: ClassLikeDeclaration | ObjectLiteralExpression;
    readonly modifiers?: NodeArray<ModifierLike> | undefined;
    readonly name: PropertyName;
    readonly body?: FunctionBody | undefined;
    /** @internal */ readonly exclamationToken?: ExclamationToken | undefined;
}
export interface ConstructorDeclaration extends FunctionLikeDeclarationBase, ClassElement, JSDocContainer, LocalsContainer {
    readonly kind: SyntaxKind.Constructor;
    readonly parent: ClassLikeDeclaration;
    readonly modifiers?: NodeArray<ModifierLike> | undefined;
    readonly body?: FunctionBody | undefined;
    /** @internal */ readonly typeParameters?: NodeArray<TypeParameterDeclaration>;
    /** @internal */ readonly type?: TypeNode;
}
/** For when we encounter a semicolon in a class declaration. ES6 allows these as class elements. */
export interface SemicolonClassElement extends ClassElement, JSDocContainer {
    readonly kind: SyntaxKind.SemicolonClassElement;
    readonly parent: ClassLikeDeclaration;
}
export interface GetAccessorDeclaration extends FunctionLikeDeclarationBase, ClassElement, TypeElement, ObjectLiteralElement, JSDocContainer, LocalsContainer, FlowContainer {
    readonly kind: SyntaxKind.GetAccessor;
    readonly parent: ClassLikeDeclaration | ObjectLiteralExpression | TypeLiteralNode | InterfaceDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name: PropertyName;
    readonly body?: FunctionBody;
    /** @internal */ readonly typeParameters?: NodeArray<TypeParameterDeclaration> | undefined;
}
export interface SetAccessorDeclaration extends FunctionLikeDeclarationBase, ClassElement, TypeElement, ObjectLiteralElement, JSDocContainer, LocalsContainer, FlowContainer {
    readonly kind: SyntaxKind.SetAccessor;
    readonly parent: ClassLikeDeclaration | ObjectLiteralExpression | TypeLiteralNode | InterfaceDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name: PropertyName;
    readonly body?: FunctionBody;
    /** @internal */ readonly typeParameters?: NodeArray<TypeParameterDeclaration> | undefined;
    /** @internal */ readonly type?: TypeNode | undefined;
}
export type AccessorDeclaration = GetAccessorDeclaration | SetAccessorDeclaration;
export interface IndexSignatureDeclaration extends SignatureDeclarationBase, ClassElement, TypeElement, LocalsContainer {
    readonly kind: SyntaxKind.IndexSignature;
    readonly parent: ObjectTypeDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly type: TypeNode;
}
export interface ClassStaticBlockDeclaration extends ClassElement, JSDocContainer, LocalsContainer {
    readonly kind: SyntaxKind.ClassStaticBlockDeclaration;
    readonly parent: ClassDeclaration | ClassExpression;
    readonly body: Block;
    /** @internal */ endFlowNode?: FlowNode;
    /** @internal */ returnFlowNode?: FlowNode;
    /** @internal */ readonly modifiers?: NodeArray<ModifierLike> | undefined;
}
export interface TypeNode extends Node {
    _typeNodeBrand: any;
}
/** @internal */
export interface TypeNode extends Node {
    readonly kind: TypeNodeSyntaxKind;
}
export interface KeywordTypeNode<TKind extends KeywordTypeSyntaxKind = KeywordTypeSyntaxKind> extends KeywordToken<TKind>, TypeNode {
    readonly kind: TKind;
}
/** @deprecated */
export interface ImportTypeAssertionContainer extends Node {
    readonly kind: SyntaxKind.ImportTypeAssertionContainer;
    readonly parent: ImportTypeNode;
    /** @deprecated */ readonly assertClause: AssertClause;
    readonly multiLine?: boolean;
}
export interface ImportTypeNode extends NodeWithTypeArguments {
    readonly kind: SyntaxKind.ImportType;
    readonly isTypeOf: boolean;
    readonly argument: TypeNode;
    /** @deprecated */ readonly assertions?: ImportTypeAssertionContainer;
    readonly attributes?: ImportAttributes;
    readonly qualifier?: EntityName;
}
/** @internal */
export type LiteralImportTypeNode = ImportTypeNode & {
    readonly argument: LiteralTypeNode & {
        readonly literal: StringLiteral;
    };
};
export interface ThisTypeNode extends TypeNode {
    readonly kind: SyntaxKind.ThisType;
}
export type FunctionOrConstructorTypeNode = FunctionTypeNode | ConstructorTypeNode;
export interface FunctionOrConstructorTypeNodeBase extends TypeNode, SignatureDeclarationBase {
    readonly kind: SyntaxKind.FunctionType | SyntaxKind.ConstructorType;
    readonly type: TypeNode;
}
export interface FunctionTypeNode extends FunctionOrConstructorTypeNodeBase, LocalsContainer {
    readonly kind: SyntaxKind.FunctionType;
    /** @internal */ readonly modifiers?: undefined;
}
export interface ConstructorTypeNode extends FunctionOrConstructorTypeNodeBase, LocalsContainer {
    readonly kind: SyntaxKind.ConstructorType;
    readonly modifiers?: NodeArray<Modifier>;
}
export interface NodeWithTypeArguments extends TypeNode {
    readonly typeArguments?: NodeArray<TypeNode>;
}
export type TypeReferenceType = TypeReferenceNode | ExpressionWithTypeArguments;
export interface TypeReferenceNode extends NodeWithTypeArguments {
    readonly kind: SyntaxKind.TypeReference;
    readonly typeName: EntityName;
}
export interface TypePredicateNode extends TypeNode {
    readonly kind: SyntaxKind.TypePredicate;
    readonly parent: SignatureDeclaration | JSDocTypeExpression;
    readonly assertsModifier?: AssertsKeyword;
    readonly parameterName: Identifier | ThisTypeNode;
    readonly type?: TypeNode;
}
export interface TypeQueryNode extends NodeWithTypeArguments {
    readonly kind: SyntaxKind.TypeQuery;
    readonly exprName: EntityName;
}
export interface TypeLiteralNode extends TypeNode, Declaration {
    readonly kind: SyntaxKind.TypeLiteral;
    readonly members: NodeArray<TypeElement>;
}
export interface ArrayTypeNode extends TypeNode {
    readonly kind: SyntaxKind.ArrayType;
    readonly elementType: TypeNode;
}
export interface TupleTypeNode extends TypeNode {
    readonly kind: SyntaxKind.TupleType;
    readonly elements: NodeArray<TypeNode | NamedTupleMember>;
}
export interface NamedTupleMember extends TypeNode, Declaration, JSDocContainer {
    readonly kind: SyntaxKind.NamedTupleMember;
    readonly dotDotDotToken?: Token<SyntaxKind.DotDotDotToken>;
    readonly name: Identifier;
    readonly questionToken?: Token<SyntaxKind.QuestionToken>;
    readonly type: TypeNode;
}
export interface OptionalTypeNode extends TypeNode {
    readonly kind: SyntaxKind.OptionalType;
    readonly type: TypeNode;
}
export interface RestTypeNode extends TypeNode {
    readonly kind: SyntaxKind.RestType;
    readonly type: TypeNode;
}
export type UnionOrIntersectionTypeNode = UnionTypeNode | IntersectionTypeNode;
export interface UnionTypeNode extends TypeNode {
    readonly kind: SyntaxKind.UnionType;
    readonly types: NodeArray<TypeNode>;
}
export interface IntersectionTypeNode extends TypeNode {
    readonly kind: SyntaxKind.IntersectionType;
    readonly types: NodeArray<TypeNode>;
}
export interface ConditionalTypeNode extends TypeNode, LocalsContainer {
    readonly kind: SyntaxKind.ConditionalType;
    readonly checkType: TypeNode;
    readonly extendsType: TypeNode;
    readonly trueType: TypeNode;
    readonly falseType: TypeNode;
}
export interface InferTypeNode extends TypeNode {
    readonly kind: SyntaxKind.InferType;
    readonly typeParameter: TypeParameterDeclaration;
}
export interface ParenthesizedTypeNode extends TypeNode {
    readonly kind: SyntaxKind.ParenthesizedType;
    readonly type: TypeNode;
}
export interface TypeOperatorNode extends TypeNode {
    readonly kind: SyntaxKind.TypeOperator;
    readonly operator: SyntaxKind.KeyOfKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.ReadonlyKeyword;
    readonly type: TypeNode;
}
/** @internal @knipignore */
export interface UniqueTypeOperatorNode extends TypeOperatorNode {
    readonly operator: SyntaxKind.UniqueKeyword;
}
export interface IndexedAccessTypeNode extends TypeNode {
    readonly kind: SyntaxKind.IndexedAccessType;
    readonly objectType: TypeNode;
    readonly indexType: TypeNode;
}
export interface MappedTypeNode extends TypeNode, Declaration, LocalsContainer {
    readonly kind: SyntaxKind.MappedType;
    readonly readonlyToken?: ReadonlyKeyword | PlusToken | MinusToken;
    readonly typeParameter: TypeParameterDeclaration;
    readonly nameType?: TypeNode;
    readonly questionToken?: QuestionToken | PlusToken | MinusToken;
    readonly type?: TypeNode;
    /** Used only to produce grammar errors */
    readonly members?: NodeArray<TypeElement>;
}
export interface LiteralTypeNode extends TypeNode {
    readonly kind: SyntaxKind.LiteralType;
    readonly literal: NullLiteral | BooleanLiteral | LiteralExpression | PrefixUnaryExpression;
}
export interface StringLiteral extends LiteralExpression, Declaration {
    readonly kind: SyntaxKind.StringLiteral;
    /** @internal */
    readonly textSourceNode?: Identifier | StringLiteralLike | NumericLiteral | PrivateIdentifier | JsxNamespacedName | BigIntLiteral;
    /**
     * Note: this is only set when synthesizing a node, not during parsing.
     *
     * @internal
     */
    readonly singleQuote?: boolean;
}
export type StringLiteralLike = StringLiteral | NoSubstitutionTemplateLiteral;
export type PropertyNameLiteral = Identifier | StringLiteralLike | NumericLiteral | JsxNamespacedName | BigIntLiteral;
export interface TemplateLiteralTypeNode extends TypeNode {
    kind: SyntaxKind.TemplateLiteralType;
    readonly head: TemplateHead;
    readonly templateSpans: NodeArray<TemplateLiteralTypeSpan>;
}
export interface TemplateLiteralTypeSpan extends TypeNode {
    readonly kind: SyntaxKind.TemplateLiteralTypeSpan;
    readonly parent: TemplateLiteralTypeNode;
    readonly type: TypeNode;
    readonly literal: TemplateMiddle | TemplateTail;
}
export interface Expression extends Node {
    _expressionBrand: any;
}
export interface OmittedExpression extends Expression {
    readonly kind: SyntaxKind.OmittedExpression;
}
export interface PartiallyEmittedExpression extends LeftHandSideExpression {
    readonly kind: SyntaxKind.PartiallyEmittedExpression;
    readonly expression: Expression;
}
export interface UnaryExpression extends Expression {
    _unaryExpressionBrand: any;
}
/** Deprecated, please use UpdateExpression */
export type IncrementExpression = UpdateExpression;
export interface UpdateExpression extends UnaryExpression {
    _updateExpressionBrand: any;
}
export type PrefixUnaryOperator = SyntaxKind.PlusPlusToken | SyntaxKind.MinusMinusToken | SyntaxKind.PlusToken | SyntaxKind.MinusToken | SyntaxKind.TildeToken | SyntaxKind.ExclamationToken;
export interface PrefixUnaryExpression extends UpdateExpression {
    readonly kind: SyntaxKind.PrefixUnaryExpression;
    readonly operator: PrefixUnaryOperator;
    readonly operand: UnaryExpression;
}
export type PostfixUnaryOperator = SyntaxKind.PlusPlusToken | SyntaxKind.MinusMinusToken;
export interface PostfixUnaryExpression extends UpdateExpression {
    readonly kind: SyntaxKind.PostfixUnaryExpression;
    readonly operand: LeftHandSideExpression;
    readonly operator: PostfixUnaryOperator;
}
export interface LeftHandSideExpression extends UpdateExpression {
    _leftHandSideExpressionBrand: any;
}
export interface MemberExpression extends LeftHandSideExpression {
    _memberExpressionBrand: any;
}
export interface PrimaryExpression extends MemberExpression {
    _primaryExpressionBrand: any;
}
export interface NullLiteral extends PrimaryExpression {
    readonly kind: SyntaxKind.NullKeyword;
}
export interface TrueLiteral extends PrimaryExpression {
    readonly kind: SyntaxKind.TrueKeyword;
}
export interface FalseLiteral extends PrimaryExpression {
    readonly kind: SyntaxKind.FalseKeyword;
}
export type BooleanLiteral = TrueLiteral | FalseLiteral;
export interface ThisExpression extends PrimaryExpression, FlowContainer {
    readonly kind: SyntaxKind.ThisKeyword;
}
export interface SuperExpression extends PrimaryExpression, FlowContainer {
    readonly kind: SyntaxKind.SuperKeyword;
}
export interface ImportExpression extends PrimaryExpression {
    readonly kind: SyntaxKind.ImportKeyword;
}
export interface DeleteExpression extends UnaryExpression {
    readonly kind: SyntaxKind.DeleteExpression;
    readonly expression: UnaryExpression;
}
export interface TypeOfExpression extends UnaryExpression {
    readonly kind: SyntaxKind.TypeOfExpression;
    readonly expression: UnaryExpression;
}
export interface VoidExpression extends UnaryExpression {
    readonly kind: SyntaxKind.VoidExpression;
    readonly expression: UnaryExpression;
}
export interface AwaitExpression extends UnaryExpression {
    readonly kind: SyntaxKind.AwaitExpression;
    readonly expression: UnaryExpression;
}
export interface YieldExpression extends Expression {
    readonly kind: SyntaxKind.YieldExpression;
    readonly asteriskToken?: AsteriskToken;
    readonly expression?: Expression;
}
export interface SyntheticExpression extends Expression {
    readonly kind: SyntaxKind.SyntheticExpression;
    readonly isSpread: boolean;
    readonly type: Type;
    readonly tupleNameSource?: ParameterDeclaration | NamedTupleMember;
}
export type ExponentiationOperator = SyntaxKind.AsteriskAsteriskToken;
export type MultiplicativeOperator = SyntaxKind.AsteriskToken | SyntaxKind.SlashToken | SyntaxKind.PercentToken;
export type MultiplicativeOperatorOrHigher = ExponentiationOperator | MultiplicativeOperator;
export type AdditiveOperator = SyntaxKind.PlusToken | SyntaxKind.MinusToken;
export type AdditiveOperatorOrHigher = MultiplicativeOperatorOrHigher | AdditiveOperator;
export type ShiftOperator = SyntaxKind.LessThanLessThanToken | SyntaxKind.GreaterThanGreaterThanToken | SyntaxKind.GreaterThanGreaterThanGreaterThanToken;
export type ShiftOperatorOrHigher = AdditiveOperatorOrHigher | ShiftOperator;
export type RelationalOperator = SyntaxKind.LessThanToken | SyntaxKind.LessThanEqualsToken | SyntaxKind.GreaterThanToken | SyntaxKind.GreaterThanEqualsToken | SyntaxKind.InstanceOfKeyword | SyntaxKind.InKeyword;
export type RelationalOperatorOrHigher = ShiftOperatorOrHigher | RelationalOperator;
export type EqualityOperator = SyntaxKind.EqualsEqualsToken | SyntaxKind.EqualsEqualsEqualsToken | SyntaxKind.ExclamationEqualsEqualsToken | SyntaxKind.ExclamationEqualsToken;
export type EqualityOperatorOrHigher = RelationalOperatorOrHigher | EqualityOperator;
export type BitwiseOperator = SyntaxKind.AmpersandToken | SyntaxKind.BarToken | SyntaxKind.CaretToken;
export type BitwiseOperatorOrHigher = EqualityOperatorOrHigher | BitwiseOperator;
export type LogicalOperator = SyntaxKind.AmpersandAmpersandToken | SyntaxKind.BarBarToken;
export type LogicalOperatorOrHigher = BitwiseOperatorOrHigher | LogicalOperator;
export type CompoundAssignmentOperator = SyntaxKind.PlusEqualsToken | SyntaxKind.MinusEqualsToken | SyntaxKind.AsteriskAsteriskEqualsToken | SyntaxKind.AsteriskEqualsToken | SyntaxKind.SlashEqualsToken | SyntaxKind.PercentEqualsToken | SyntaxKind.AmpersandEqualsToken | SyntaxKind.BarEqualsToken | SyntaxKind.CaretEqualsToken | SyntaxKind.LessThanLessThanEqualsToken | SyntaxKind.GreaterThanGreaterThanGreaterThanEqualsToken | SyntaxKind.GreaterThanGreaterThanEqualsToken | SyntaxKind.BarBarEqualsToken | SyntaxKind.AmpersandAmpersandEqualsToken | SyntaxKind.QuestionQuestionEqualsToken;
export type AssignmentOperator = SyntaxKind.EqualsToken | CompoundAssignmentOperator;
export type AssignmentOperatorOrHigher = SyntaxKind.QuestionQuestionToken | LogicalOperatorOrHigher | AssignmentOperator;
export type BinaryOperator = AssignmentOperatorOrHigher | SyntaxKind.CommaToken;
export type LogicalOrCoalescingAssignmentOperator = SyntaxKind.AmpersandAmpersandEqualsToken | SyntaxKind.BarBarEqualsToken | SyntaxKind.QuestionQuestionEqualsToken;
export type BinaryOperatorToken = Token<BinaryOperator>;
export interface BinaryExpression extends Expression, Declaration, JSDocContainer {
    readonly kind: SyntaxKind.BinaryExpression;
    readonly left: Expression;
    readonly operatorToken: BinaryOperatorToken;
    readonly right: Expression;
}
export type AssignmentOperatorToken = Token<AssignmentOperator>;
export interface AssignmentExpression<TOperator extends AssignmentOperatorToken> extends BinaryExpression {
    readonly left: LeftHandSideExpression;
    readonly operatorToken: TOperator;
}
export interface ObjectDestructuringAssignment extends AssignmentExpression<EqualsToken> {
    readonly left: ObjectLiteralExpression;
}
export interface ArrayDestructuringAssignment extends AssignmentExpression<EqualsToken> {
    readonly left: ArrayLiteralExpression;
}
export type DestructuringAssignment = ObjectDestructuringAssignment | ArrayDestructuringAssignment;
export type BindingOrAssignmentElement = VariableDeclaration | ParameterDeclaration | ObjectBindingOrAssignmentElement | ArrayBindingOrAssignmentElement;
export type ObjectBindingOrAssignmentElement = BindingElement | PropertyAssignment | ShorthandPropertyAssignment | SpreadAssignment;
/** @internal @knipignore */
export type ObjectAssignmentElement = Exclude<ObjectBindingOrAssignmentElement, BindingElement>;
export type ArrayBindingOrAssignmentElement = BindingElement | OmittedExpression | SpreadElement | ArrayLiteralExpression | ObjectLiteralExpression | AssignmentExpression<EqualsToken> | Identifier | PropertyAccessExpression | ElementAccessExpression;
/** @internal */
export type ArrayAssignmentElement = Exclude<ArrayBindingOrAssignmentElement, BindingElement>;
export type BindingOrAssignmentElementRestIndicator = DotDotDotToken | SpreadElement | SpreadAssignment;
export type BindingOrAssignmentElementTarget = BindingOrAssignmentPattern | Identifier | PropertyAccessExpression | ElementAccessExpression | OmittedExpression;
/** @internal @knipignore */
export type AssignmentElementTarget = Exclude<BindingOrAssignmentElementTarget, BindingPattern>;
export type ObjectBindingOrAssignmentPattern = ObjectBindingPattern | ObjectLiteralExpression;
export type ArrayBindingOrAssignmentPattern = ArrayBindingPattern | ArrayLiteralExpression;
export type AssignmentPattern = ObjectLiteralExpression | ArrayLiteralExpression;
export type BindingOrAssignmentPattern = ObjectBindingOrAssignmentPattern | ArrayBindingOrAssignmentPattern;
export interface ConditionalExpression extends Expression {
    readonly kind: SyntaxKind.ConditionalExpression;
    readonly condition: Expression;
    readonly questionToken: QuestionToken;
    readonly whenTrue: Expression;
    readonly colonToken: ColonToken;
    readonly whenFalse: Expression;
    /** @internal*/
    flowNodeWhenTrue: FlowNode | undefined;
    /** @internal */
    flowNodeWhenFalse: FlowNode | undefined;
}
export type FunctionBody = Block;
export type ConciseBody = FunctionBody | Expression;
export interface FunctionExpression extends PrimaryExpression, FunctionLikeDeclarationBase, JSDocContainer, LocalsContainer, FlowContainer {
    readonly kind: SyntaxKind.FunctionExpression;
    readonly modifiers?: NodeArray<Modifier>;
    readonly name?: Identifier;
    readonly body: FunctionBody;
}
export interface ArrowFunction extends Expression, FunctionLikeDeclarationBase, JSDocContainer, LocalsContainer, FlowContainer {
    readonly kind: SyntaxKind.ArrowFunction;
    readonly modifiers?: NodeArray<Modifier>;
    readonly equalsGreaterThanToken: EqualsGreaterThanToken;
    readonly body: ConciseBody;
    readonly name: never;
}
export interface LiteralLikeNode extends Node {
    text: string;
    isUnterminated?: boolean;
    hasExtendedUnicodeEscape?: boolean;
}
export interface TemplateLiteralLikeNode extends LiteralLikeNode {
    rawText?: string;
    /** @internal */
    templateFlags?: TokenFlags;
}
export interface LiteralExpression extends LiteralLikeNode, PrimaryExpression {
    _literalExpressionBrand: any;
}
export interface RegularExpressionLiteral extends LiteralExpression {
    readonly kind: SyntaxKind.RegularExpressionLiteral;
}
/** @internal */
export declare const enum RegularExpressionFlags {
    None = 0,
    HasIndices = 1,// d
    Global = 2,// g
    IgnoreCase = 4,// i
    Multiline = 8,// m
    DotAll = 16,// s
    Unicode = 32,// u
    UnicodeSets = 64,// v
    Sticky = 128,// y
    AnyUnicodeMode = 96,
    Modifiers = 28
}
export interface NoSubstitutionTemplateLiteral extends LiteralExpression, TemplateLiteralLikeNode, Declaration {
    readonly kind: SyntaxKind.NoSubstitutionTemplateLiteral;
    /** @internal */
    templateFlags?: TokenFlags;
}
export declare const enum TokenFlags {
    None = 0,
    /** @internal */
    PrecedingLineBreak = 1,
    /** @internal */
    PrecedingJSDocComment = 2,
    /** @internal */
    Unterminated = 4,
    /** @internal */
    ExtendedUnicodeEscape = 8,// e.g. `\u{10ffff}`
    Scientific = 16,// e.g. `10e2`
    Octal = 32,// e.g. `0777`
    HexSpecifier = 64,// e.g. `0x00000000`
    BinarySpecifier = 128,// e.g. `0b0110010000000000`
    OctalSpecifier = 256,// e.g. `0o777`
    /** @internal */
    ContainsSeparator = 512,// e.g. `0b1100_0101`
    /** @internal */
    UnicodeEscape = 1024,// e.g. `\u00a0`
    /** @internal */
    ContainsInvalidEscape = 2048,// e.g. `\uhello`
    /** @internal */
    HexEscape = 4096,// e.g. `\xa0`
    /** @internal */
    ContainsLeadingZero = 8192,// e.g. `0888`
    /** @internal */
    ContainsInvalidSeparator = 16384,// e.g. `0_1`
    /** @internal */
    PrecedingJSDocLeadingAsterisks = 32768,
    /** @internal */
    BinaryOrOctalSpecifier = 384,
    /** @internal */
    WithSpecifier = 448,
    /** @internal */
    StringLiteralFlags = 7176,
    /** @internal */
    NumericLiteralFlags = 25584,
    /** @internal */
    TemplateLiteralLikeFlags = 7176,
    /** @internal */
    IsInvalid = 26656
}
export interface NumericLiteral extends LiteralExpression, Declaration {
    readonly kind: SyntaxKind.NumericLiteral;
    /** @internal */
    readonly numericLiteralFlags: TokenFlags;
}
export interface BigIntLiteral extends LiteralExpression {
    readonly kind: SyntaxKind.BigIntLiteral;
}
export type LiteralToken = NumericLiteral | BigIntLiteral | StringLiteral | JsxText | RegularExpressionLiteral | NoSubstitutionTemplateLiteral;
export interface TemplateHead extends TemplateLiteralLikeNode {
    readonly kind: SyntaxKind.TemplateHead;
    readonly parent: TemplateExpression | TemplateLiteralTypeNode;
    /** @internal */
    templateFlags?: TokenFlags;
}
export interface TemplateMiddle extends TemplateLiteralLikeNode {
    readonly kind: SyntaxKind.TemplateMiddle;
    readonly parent: TemplateSpan | TemplateLiteralTypeSpan;
    /** @internal */
    templateFlags?: TokenFlags;
}
export interface TemplateTail extends TemplateLiteralLikeNode {
    readonly kind: SyntaxKind.TemplateTail;
    readonly parent: TemplateSpan | TemplateLiteralTypeSpan;
    /** @internal */
    templateFlags?: TokenFlags;
}
export type PseudoLiteralToken = TemplateHead | TemplateMiddle | TemplateTail;
export type TemplateLiteralToken = NoSubstitutionTemplateLiteral | PseudoLiteralToken;
export interface TemplateExpression extends PrimaryExpression {
    readonly kind: SyntaxKind.TemplateExpression;
    readonly head: TemplateHead;
    readonly templateSpans: NodeArray<TemplateSpan>;
}
export type TemplateLiteral = TemplateExpression | NoSubstitutionTemplateLiteral;
export interface TemplateSpan extends Node {
    readonly kind: SyntaxKind.TemplateSpan;
    readonly parent: TemplateExpression;
    readonly expression: Expression;
    readonly literal: TemplateMiddle | TemplateTail;
}
export interface ParenthesizedExpression extends PrimaryExpression, JSDocContainer {
    readonly kind: SyntaxKind.ParenthesizedExpression;
    readonly expression: Expression;
}
/** @internal */
export interface JSDocTypeAssertion extends ParenthesizedExpression {
    readonly _jsDocTypeAssertionBrand: never;
}
export interface ArrayLiteralExpression extends PrimaryExpression {
    readonly kind: SyntaxKind.ArrayLiteralExpression;
    readonly elements: NodeArray<Expression>;
    /** @internal */
    multiLine?: boolean;
}
export interface SpreadElement extends Expression {
    readonly kind: SyntaxKind.SpreadElement;
    readonly parent: ArrayLiteralExpression | CallExpression | NewExpression;
    readonly expression: Expression;
}
/**
 * This interface is a base interface for ObjectLiteralExpression and JSXAttributes to extend from. JSXAttributes is similar to
 * ObjectLiteralExpression in that it contains array of properties; however, JSXAttributes' properties can only be
 * JSXAttribute or JSXSpreadAttribute. ObjectLiteralExpression, on the other hand, can only have properties of type
 * ObjectLiteralElement (e.g. PropertyAssignment, ShorthandPropertyAssignment etc.)
 */
export interface ObjectLiteralExpressionBase<T extends ObjectLiteralElement> extends PrimaryExpression, Declaration {
    readonly properties: NodeArray<T>;
}
export interface ObjectLiteralExpression extends ObjectLiteralExpressionBase<ObjectLiteralElementLike>, JSDocContainer {
    readonly kind: SyntaxKind.ObjectLiteralExpression;
    /** @internal */
    multiLine?: boolean;
}
export type EntityNameExpression = Identifier | PropertyAccessEntityNameExpression;
export type EntityNameOrEntityNameExpression = EntityName | EntityNameExpression;
export type AccessExpression = PropertyAccessExpression | ElementAccessExpression;
export interface PropertyAccessExpression extends MemberExpression, NamedDeclaration, JSDocContainer, FlowContainer {
    readonly kind: SyntaxKind.PropertyAccessExpression;
    readonly expression: LeftHandSideExpression;
    readonly questionDotToken?: QuestionDotToken;
    readonly name: MemberName;
}
/** @internal */
export interface PrivateIdentifierPropertyAccessExpression extends PropertyAccessExpression {
    readonly name: PrivateIdentifier;
}
export interface PropertyAccessChain extends PropertyAccessExpression {
    _optionalChainBrand: any;
    readonly name: MemberName;
}
/** @internal */
export interface PropertyAccessChainRoot extends PropertyAccessChain {
    readonly questionDotToken: QuestionDotToken;
}
export interface SuperPropertyAccessExpression extends PropertyAccessExpression {
    readonly expression: SuperExpression;
}
/** Brand for a PropertyAccessExpression which, like a QualifiedName, consists of a sequence of identifiers separated by dots. */
export interface PropertyAccessEntityNameExpression extends PropertyAccessExpression {
    _propertyAccessExpressionLikeQualifiedNameBrand?: any;
    readonly expression: EntityNameExpression;
    readonly name: Identifier;
}
export interface ElementAccessExpression extends MemberExpression, Declaration, JSDocContainer, FlowContainer {
    readonly kind: SyntaxKind.ElementAccessExpression;
    readonly expression: LeftHandSideExpression;
    readonly questionDotToken?: QuestionDotToken;
    readonly argumentExpression: Expression;
}
export interface ElementAccessChain extends ElementAccessExpression {
    _optionalChainBrand: any;
}
/** @internal */
export interface ElementAccessChainRoot extends ElementAccessChain {
    readonly questionDotToken: QuestionDotToken;
}
export interface SuperElementAccessExpression extends ElementAccessExpression {
    readonly expression: SuperExpression;
}
export type SuperProperty = SuperPropertyAccessExpression | SuperElementAccessExpression;
export interface CallExpression extends LeftHandSideExpression, Declaration {
    readonly kind: SyntaxKind.CallExpression;
    readonly expression: LeftHandSideExpression;
    readonly questionDotToken?: QuestionDotToken;
    readonly typeArguments?: NodeArray<TypeNode>;
    readonly arguments: NodeArray<Expression>;
}
export interface CallChain extends CallExpression {
    _optionalChainBrand: any;
}
/** @internal */
export interface CallChainRoot extends CallChain {
    readonly questionDotToken: QuestionDotToken;
}
export type OptionalChain = PropertyAccessChain | ElementAccessChain | CallChain | NonNullChain;
/** @internal */
export type OptionalChainRoot = PropertyAccessChainRoot | ElementAccessChainRoot | CallChainRoot;
/** @internal */
export type BindableObjectDefinePropertyCall = CallExpression & {
    readonly arguments: readonly [BindableStaticNameExpression, StringLiteralLike | NumericLiteral, ObjectLiteralExpression] & Readonly<TextRange>;
};
/** @internal */
export type BindableStaticNameExpression = EntityNameExpression | BindableStaticElementAccessExpression;
/** @internal */
export type LiteralLikeElementAccessExpression = ElementAccessExpression & Declaration & {
    readonly argumentExpression: StringLiteralLike | NumericLiteral;
};
/** @internal */
export type BindableStaticElementAccessExpression = LiteralLikeElementAccessExpression & {
    readonly expression: BindableStaticNameExpression;
};
/** @internal */
export type BindableElementAccessExpression = ElementAccessExpression & {
    readonly expression: BindableStaticNameExpression;
};
/** @internal */
export type BindableStaticAccessExpression = PropertyAccessEntityNameExpression | BindableStaticElementAccessExpression;
/** @internal */
export type BindableAccessExpression = PropertyAccessEntityNameExpression | BindableElementAccessExpression;
/** @internal */
export interface BindableStaticPropertyAssignmentExpression extends BinaryExpression {
    readonly left: BindableStaticAccessExpression;
}
/** @internal */
export interface BindablePropertyAssignmentExpression extends BinaryExpression {
    readonly left: BindableAccessExpression;
}
export interface SuperCall extends CallExpression {
    readonly expression: SuperExpression;
}
export interface ImportCall extends CallExpression {
    readonly expression: ImportExpression | ImportDeferProperty;
}
export interface ExpressionWithTypeArguments extends MemberExpression, NodeWithTypeArguments {
    readonly kind: SyntaxKind.ExpressionWithTypeArguments;
    readonly expression: LeftHandSideExpression;
}
export interface NewExpression extends PrimaryExpression, Declaration {
    readonly kind: SyntaxKind.NewExpression;
    readonly expression: LeftHandSideExpression;
    readonly typeArguments?: NodeArray<TypeNode>;
    readonly arguments?: NodeArray<Expression>;
}
export interface TaggedTemplateExpression extends MemberExpression {
    readonly kind: SyntaxKind.TaggedTemplateExpression;
    readonly tag: LeftHandSideExpression;
    readonly typeArguments?: NodeArray<TypeNode>;
    readonly template: TemplateLiteral;
    /** @internal */ questionDotToken?: QuestionDotToken;
}
export interface InstanceofExpression extends BinaryExpression {
    readonly operatorToken: Token<SyntaxKind.InstanceOfKeyword>;
}
export type CallLikeExpression = CallExpression | NewExpression | TaggedTemplateExpression | Decorator | JsxCallLike | InstanceofExpression;
export interface AsExpression extends Expression {
    readonly kind: SyntaxKind.AsExpression;
    readonly expression: Expression;
    readonly type: TypeNode;
}
export interface TypeAssertion extends UnaryExpression {
    readonly kind: SyntaxKind.TypeAssertionExpression;
    readonly type: TypeNode;
    readonly expression: UnaryExpression;
}
export interface SatisfiesExpression extends Expression {
    readonly kind: SyntaxKind.SatisfiesExpression;
    readonly expression: Expression;
    readonly type: TypeNode;
}
export type AssertionExpression = TypeAssertion | AsExpression;
export interface NonNullExpression extends LeftHandSideExpression {
    readonly kind: SyntaxKind.NonNullExpression;
    readonly expression: Expression;
}
export interface NonNullChain extends NonNullExpression {
    _optionalChainBrand: any;
}
export interface MetaProperty extends PrimaryExpression, FlowContainer {
    readonly kind: SyntaxKind.MetaProperty;
    readonly keywordToken: SyntaxKind.NewKeyword | SyntaxKind.ImportKeyword;
    readonly name: Identifier;
}
/** @internal */
export interface ImportMetaProperty extends MetaProperty {
    readonly keywordToken: SyntaxKind.ImportKeyword;
    readonly name: Identifier & {
        readonly escapedText: __String & "meta";
    };
}
export interface ImportDeferProperty extends MetaProperty {
    readonly keywordToken: SyntaxKind.ImportKeyword;
    readonly name: Identifier & {
        readonly escapedText: __String & "defer";
    };
}
export interface JsxElement extends PrimaryExpression {
    readonly kind: SyntaxKind.JsxElement;
    readonly openingElement: JsxOpeningElement;
    readonly children: NodeArray<JsxChild>;
    readonly closingElement: JsxClosingElement;
}
export type JsxOpeningLikeElement = JsxSelfClosingElement | JsxOpeningElement;
export type JsxCallLike = JsxOpeningLikeElement | JsxOpeningFragment;
export type JsxAttributeLike = JsxAttribute | JsxSpreadAttribute;
export type JsxAttributeName = Identifier | JsxNamespacedName;
export type JsxTagNameExpression = Identifier | ThisExpression | JsxTagNamePropertyAccess | JsxNamespacedName;
export interface JsxTagNamePropertyAccess extends PropertyAccessExpression {
    readonly expression: Identifier | ThisExpression | JsxTagNamePropertyAccess;
}
export interface JsxAttributes extends PrimaryExpression, Declaration {
    readonly properties: NodeArray<JsxAttributeLike>;
    readonly kind: SyntaxKind.JsxAttributes;
    readonly parent: JsxOpeningLikeElement;
}
export interface JsxNamespacedName extends Node {
    readonly kind: SyntaxKind.JsxNamespacedName;
    readonly name: Identifier;
    readonly namespace: Identifier;
}
export interface JsxOpeningElement extends Expression {
    readonly kind: SyntaxKind.JsxOpeningElement;
    readonly parent: JsxElement;
    readonly tagName: JsxTagNameExpression;
    readonly typeArguments?: NodeArray<TypeNode>;
    readonly attributes: JsxAttributes;
}
export interface JsxSelfClosingElement extends PrimaryExpression {
    readonly kind: SyntaxKind.JsxSelfClosingElement;
    readonly tagName: JsxTagNameExpression;
    readonly typeArguments?: NodeArray<TypeNode>;
    readonly attributes: JsxAttributes;
}
export interface JsxFragment extends PrimaryExpression {
    readonly kind: SyntaxKind.JsxFragment;
    readonly openingFragment: JsxOpeningFragment;
    readonly children: NodeArray<JsxChild>;
    readonly closingFragment: JsxClosingFragment;
}
export interface JsxOpeningFragment extends Expression {
    readonly kind: SyntaxKind.JsxOpeningFragment;
    readonly parent: JsxFragment;
}
export interface JsxClosingFragment extends Expression {
    readonly kind: SyntaxKind.JsxClosingFragment;
    readonly parent: JsxFragment;
}
export interface JsxAttribute extends Declaration {
    readonly kind: SyntaxKind.JsxAttribute;
    readonly parent: JsxAttributes;
    readonly name: JsxAttributeName;
    readonly initializer?: JsxAttributeValue;
}
export type JsxAttributeValue = StringLiteral | JsxExpression | JsxElement | JsxSelfClosingElement | JsxFragment;
export interface JsxSpreadAttribute extends ObjectLiteralElement {
    readonly kind: SyntaxKind.JsxSpreadAttribute;
    readonly parent: JsxAttributes;
    readonly expression: Expression;
}
export interface JsxClosingElement extends Node {
    readonly kind: SyntaxKind.JsxClosingElement;
    readonly parent: JsxElement;
    readonly tagName: JsxTagNameExpression;
}
export interface JsxExpression extends Expression {
    readonly kind: SyntaxKind.JsxExpression;
    readonly parent: JsxElement | JsxFragment | JsxAttributeLike;
    readonly dotDotDotToken?: Token<SyntaxKind.DotDotDotToken>;
    readonly expression?: Expression;
}
export interface JsxText extends LiteralLikeNode {
    readonly kind: SyntaxKind.JsxText;
    readonly parent: JsxElement | JsxFragment;
    readonly containsOnlyTriviaWhiteSpaces: boolean;
}
export type JsxChild = JsxText | JsxExpression | JsxElement | JsxSelfClosingElement | JsxFragment;
export interface Statement extends Node, JSDocContainer {
    _statementBrand: any;
}
export interface NotEmittedStatement extends Statement {
    readonly kind: SyntaxKind.NotEmittedStatement;
}
export interface NotEmittedTypeElement extends TypeElement {
    readonly kind: SyntaxKind.NotEmittedTypeElement;
}
/**
 * A list of comma-separated expressions. This node is only created by transformations.
 */
export interface CommaListExpression extends Expression {
    readonly kind: SyntaxKind.CommaListExpression;
    readonly elements: NodeArray<Expression>;
}
/** @internal */
export interface SyntheticReferenceExpression extends LeftHandSideExpression {
    readonly kind: SyntaxKind.SyntheticReferenceExpression;
    readonly expression: Expression;
    readonly thisArg: Expression;
}
export interface EmptyStatement extends Statement {
    readonly kind: SyntaxKind.EmptyStatement;
}
export interface DebuggerStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.DebuggerStatement;
}
export interface MissingDeclaration extends DeclarationStatement, PrimaryExpression {
    readonly kind: SyntaxKind.MissingDeclaration;
    readonly name?: Identifier;
    /** @internal */ readonly modifiers?: NodeArray<ModifierLike> | undefined;
}
export type BlockLike = SourceFile | Block | ModuleBlock | CaseOrDefaultClause;
export interface Block extends Statement, LocalsContainer {
    readonly kind: SyntaxKind.Block;
    readonly statements: NodeArray<Statement>;
    /** @internal */ multiLine?: boolean;
}
export interface VariableStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.VariableStatement;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly declarationList: VariableDeclarationList;
}
export interface ExpressionStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.ExpressionStatement;
    readonly expression: Expression;
}
/** @internal */
export interface PrologueDirective extends ExpressionStatement {
    readonly expression: StringLiteral;
}
export interface IfStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.IfStatement;
    readonly expression: Expression;
    readonly thenStatement: Statement;
    readonly elseStatement?: Statement;
}
export interface IterationStatement extends Statement {
    readonly statement: Statement;
}
export interface DoStatement extends IterationStatement, FlowContainer {
    readonly kind: SyntaxKind.DoStatement;
    readonly expression: Expression;
}
export interface WhileStatement extends IterationStatement, FlowContainer {
    readonly kind: SyntaxKind.WhileStatement;
    readonly expression: Expression;
}
export type ForInitializer = VariableDeclarationList | Expression;
export interface ForStatement extends IterationStatement, LocalsContainer, FlowContainer {
    readonly kind: SyntaxKind.ForStatement;
    readonly initializer?: ForInitializer;
    readonly condition?: Expression;
    readonly incrementor?: Expression;
}
export type ForInOrOfStatement = ForInStatement | ForOfStatement;
export interface ForInStatement extends IterationStatement, LocalsContainer, FlowContainer {
    readonly kind: SyntaxKind.ForInStatement;
    readonly initializer: ForInitializer;
    readonly expression: Expression;
}
export interface ForOfStatement extends IterationStatement, LocalsContainer, FlowContainer {
    readonly kind: SyntaxKind.ForOfStatement;
    readonly awaitModifier?: AwaitKeyword;
    readonly initializer: ForInitializer;
    readonly expression: Expression;
}
export interface BreakStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.BreakStatement;
    readonly label?: Identifier;
}
export interface ContinueStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.ContinueStatement;
    readonly label?: Identifier;
}
export type BreakOrContinueStatement = BreakStatement | ContinueStatement;
export interface ReturnStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.ReturnStatement;
    readonly expression?: Expression;
}
export interface WithStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.WithStatement;
    readonly expression: Expression;
    readonly statement: Statement;
}
export interface SwitchStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.SwitchStatement;
    readonly expression: Expression;
    readonly caseBlock: CaseBlock;
    possiblyExhaustive?: boolean;
}
export interface CaseBlock extends Node, LocalsContainer {
    readonly kind: SyntaxKind.CaseBlock;
    readonly parent: SwitchStatement;
    readonly clauses: NodeArray<CaseOrDefaultClause>;
}
export interface CaseClause extends Node, JSDocContainer {
    readonly kind: SyntaxKind.CaseClause;
    readonly parent: CaseBlock;
    readonly expression: Expression;
    readonly statements: NodeArray<Statement>;
    /** @internal */ fallthroughFlowNode?: FlowNode;
}
export interface DefaultClause extends Node {
    readonly kind: SyntaxKind.DefaultClause;
    readonly parent: CaseBlock;
    readonly statements: NodeArray<Statement>;
    /** @internal */ fallthroughFlowNode?: FlowNode;
}
export type CaseOrDefaultClause = CaseClause | DefaultClause;
export interface LabeledStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.LabeledStatement;
    readonly label: Identifier;
    readonly statement: Statement;
}
export interface ThrowStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.ThrowStatement;
    readonly expression: Expression;
}
export interface TryStatement extends Statement, FlowContainer {
    readonly kind: SyntaxKind.TryStatement;
    readonly tryBlock: Block;
    readonly catchClause?: CatchClause;
    readonly finallyBlock?: Block;
}
export interface CatchClause extends Node, LocalsContainer {
    readonly kind: SyntaxKind.CatchClause;
    readonly parent: TryStatement;
    readonly variableDeclaration?: VariableDeclaration;
    readonly block: Block;
}
export type ObjectTypeDeclaration = ClassLikeDeclaration | InterfaceDeclaration | TypeLiteralNode;
export type DeclarationWithTypeParameters = DeclarationWithTypeParameterChildren | JSDocTypedefTag | JSDocCallbackTag | JSDocSignature;
export type DeclarationWithTypeParameterChildren = SignatureDeclaration | ClassLikeDeclaration | InterfaceDeclaration | TypeAliasDeclaration | JSDocTemplateTag;
export interface ClassLikeDeclarationBase extends NamedDeclaration, JSDocContainer {
    readonly kind: SyntaxKind.ClassDeclaration | SyntaxKind.ClassExpression;
    readonly name?: Identifier;
    readonly typeParameters?: NodeArray<TypeParameterDeclaration>;
    readonly heritageClauses?: NodeArray<HeritageClause>;
    readonly members: NodeArray<ClassElement>;
}
export interface ClassDeclaration extends ClassLikeDeclarationBase, DeclarationStatement {
    readonly kind: SyntaxKind.ClassDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    /** May be undefined in `export default class { ... }`. */
    readonly name?: Identifier;
}
export interface ClassExpression extends ClassLikeDeclarationBase, PrimaryExpression {
    readonly kind: SyntaxKind.ClassExpression;
    readonly modifiers?: NodeArray<ModifierLike>;
}
export type ClassLikeDeclaration = ClassDeclaration | ClassExpression;
export interface ClassElement extends NamedDeclaration {
    _classElementBrand: any;
    readonly name?: PropertyName;
}
export interface TypeElement extends NamedDeclaration {
    _typeElementBrand: any;
    readonly name?: PropertyName;
    readonly questionToken?: QuestionToken | undefined;
}
export interface InterfaceDeclaration extends DeclarationStatement, JSDocContainer {
    readonly kind: SyntaxKind.InterfaceDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name: Identifier;
    readonly typeParameters?: NodeArray<TypeParameterDeclaration>;
    readonly heritageClauses?: NodeArray<HeritageClause>;
    readonly members: NodeArray<TypeElement>;
}
export interface HeritageClause extends Node {
    readonly kind: SyntaxKind.HeritageClause;
    readonly parent: InterfaceDeclaration | ClassLikeDeclaration;
    readonly token: SyntaxKind.ExtendsKeyword | SyntaxKind.ImplementsKeyword;
    readonly types: NodeArray<ExpressionWithTypeArguments>;
}
export interface TypeAliasDeclaration extends DeclarationStatement, JSDocContainer, LocalsContainer {
    readonly kind: SyntaxKind.TypeAliasDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name: Identifier;
    readonly typeParameters?: NodeArray<TypeParameterDeclaration>;
    readonly type: TypeNode;
}
export interface EnumMember extends NamedDeclaration, JSDocContainer {
    readonly kind: SyntaxKind.EnumMember;
    readonly parent: EnumDeclaration;
    readonly name: PropertyName;
    readonly initializer?: Expression;
}
export interface EnumDeclaration extends DeclarationStatement, JSDocContainer {
    readonly kind: SyntaxKind.EnumDeclaration;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name: Identifier;
    readonly members: NodeArray<EnumMember>;
}
export type ModuleName = Identifier | StringLiteral;
export type ModuleBody = NamespaceBody | JSDocNamespaceBody;
/** @internal */
export interface AmbientModuleDeclaration extends ModuleDeclaration {
    readonly body?: ModuleBlock;
}
export interface ModuleDeclaration extends DeclarationStatement, JSDocContainer, LocalsContainer {
    readonly kind: SyntaxKind.ModuleDeclaration;
    readonly parent: ModuleBody | SourceFile;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name: ModuleName;
    readonly body?: ModuleBody | JSDocNamespaceDeclaration;
}
export type NamespaceBody = ModuleBlock | NamespaceDeclaration;
export interface NamespaceDeclaration extends ModuleDeclaration {
    readonly name: Identifier;
    readonly body: NamespaceBody;
}
export type JSDocNamespaceBody = Identifier | JSDocNamespaceDeclaration;
export interface JSDocNamespaceDeclaration extends ModuleDeclaration {
    readonly name: Identifier;
    readonly body?: JSDocNamespaceBody;
}
export interface ModuleBlock extends Node, Statement {
    readonly kind: SyntaxKind.ModuleBlock;
    readonly parent: ModuleDeclaration;
    readonly statements: NodeArray<Statement>;
}
export type ModuleReference = EntityName | ExternalModuleReference;
/**
 * One of:
 * - import x = require("mod");
 * - import x = M.x;
 */
export interface ImportEqualsDeclaration extends DeclarationStatement, JSDocContainer {
    readonly kind: SyntaxKind.ImportEqualsDeclaration;
    readonly parent: SourceFile | ModuleBlock;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly name: Identifier;
    readonly isTypeOnly: boolean;
    readonly moduleReference: ModuleReference;
}
export interface ExternalModuleReference extends Node {
    readonly kind: SyntaxKind.ExternalModuleReference;
    readonly parent: ImportEqualsDeclaration;
    readonly expression: Expression;
}
export interface ImportDeclaration extends Statement {
    readonly kind: SyntaxKind.ImportDeclaration;
    readonly parent: SourceFile | ModuleBlock;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly importClause?: ImportClause;
    /** If this is not a StringLiteral it will be a grammar error. */
    readonly moduleSpecifier: Expression;
    /** @deprecated */ readonly assertClause?: AssertClause;
    readonly attributes?: ImportAttributes;
}
export type NamedImportBindings = NamespaceImport | NamedImports;
export type NamedExportBindings = NamespaceExport | NamedExports;
export interface ImportClause extends NamedDeclaration {
    readonly kind: SyntaxKind.ImportClause;
    readonly parent: ImportDeclaration | JSDocImportTag;
    /** @deprecated Use `phaseModifier` instead */
    readonly isTypeOnly: boolean;
    readonly phaseModifier: undefined | ImportPhaseModifierSyntaxKind;
    readonly name?: Identifier;
    readonly namedBindings?: NamedImportBindings;
}
export type ImportPhaseModifierSyntaxKind = SyntaxKind.TypeKeyword | SyntaxKind.DeferKeyword;
/** @deprecated */
export type AssertionKey = ImportAttributeName;
/** @deprecated */
export interface AssertEntry extends ImportAttribute {
}
/** @deprecated */
export interface AssertClause extends ImportAttributes {
}
export type ImportAttributeName = Identifier | StringLiteral;
export interface ImportAttribute extends Node {
    readonly kind: SyntaxKind.ImportAttribute;
    readonly parent: ImportAttributes;
    readonly name: ImportAttributeName;
    readonly value: Expression;
}
export interface ImportAttributes extends Node {
    readonly token: SyntaxKind.WithKeyword | SyntaxKind.AssertKeyword;
    readonly kind: SyntaxKind.ImportAttributes;
    readonly parent: ImportDeclaration | ExportDeclaration;
    readonly elements: NodeArray<ImportAttribute>;
    readonly multiLine?: boolean;
}
export interface NamespaceImport extends NamedDeclaration {
    readonly kind: SyntaxKind.NamespaceImport;
    readonly parent: ImportClause;
    readonly name: Identifier;
}
export interface NamespaceExport extends NamedDeclaration {
    readonly kind: SyntaxKind.NamespaceExport;
    readonly parent: ExportDeclaration;
    readonly name: ModuleExportName;
}
export interface NamespaceExportDeclaration extends DeclarationStatement, JSDocContainer {
    readonly kind: SyntaxKind.NamespaceExportDeclaration;
    readonly name: Identifier;
    /** @internal */ readonly modifiers?: NodeArray<ModifierLike> | undefined;
}
export interface ExportDeclaration extends DeclarationStatement, JSDocContainer {
    readonly kind: SyntaxKind.ExportDeclaration;
    readonly parent: SourceFile | ModuleBlock;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly isTypeOnly: boolean;
    /** Will not be assigned in the case of `export * from "foo";` */
    readonly exportClause?: NamedExportBindings;
    /** If this is not a StringLiteral it will be a grammar error. */
    readonly moduleSpecifier?: Expression;
    /** @deprecated */ readonly assertClause?: AssertClause;
    readonly attributes?: ImportAttributes;
}
export interface NamedImports extends Node {
    readonly kind: SyntaxKind.NamedImports;
    readonly parent: ImportClause;
    readonly elements: NodeArray<ImportSpecifier>;
}
export interface NamedExports extends Node {
    readonly kind: SyntaxKind.NamedExports;
    readonly parent: ExportDeclaration;
    readonly elements: NodeArray<ExportSpecifier>;
}
export type NamedImportsOrExports = NamedImports | NamedExports;
export interface ImportSpecifier extends NamedDeclaration {
    readonly kind: SyntaxKind.ImportSpecifier;
    readonly parent: NamedImports;
    readonly propertyName?: ModuleExportName;
    readonly name: Identifier;
    readonly isTypeOnly: boolean;
}
export interface ExportSpecifier extends NamedDeclaration, JSDocContainer {
    readonly kind: SyntaxKind.ExportSpecifier;
    readonly parent: NamedExports;
    readonly isTypeOnly: boolean;
    readonly propertyName?: ModuleExportName;
    readonly name: ModuleExportName;
}
export type ModuleExportName = Identifier | StringLiteral;
export type ImportOrExportSpecifier = ImportSpecifier | ExportSpecifier;
export type TypeOnlyCompatibleAliasDeclaration = ImportClause | ImportEqualsDeclaration | NamespaceImport | ImportOrExportSpecifier | ExportDeclaration | NamespaceExport;
export type TypeOnlyImportDeclaration = ImportClause & {
    readonly isTypeOnly: true;
    readonly name: Identifier;
} | ImportEqualsDeclaration & {
    readonly isTypeOnly: true;
} | NamespaceImport & {
    readonly parent: ImportClause & {
        readonly isTypeOnly: true;
    };
} | ImportSpecifier & ({
    readonly isTypeOnly: true;
} | {
    readonly parent: NamedImports & {
        readonly parent: ImportClause & {
            readonly isTypeOnly: true;
        };
    };
});
export type TypeOnlyExportDeclaration = ExportSpecifier & ({
    readonly isTypeOnly: true;
} | {
    readonly parent: NamedExports & {
        readonly parent: ExportDeclaration & {
            readonly isTypeOnly: true;
        };
    };
}) | ExportDeclaration & {
    readonly isTypeOnly: true;
    readonly moduleSpecifier: Expression;
} | NamespaceExport & {
    readonly parent: ExportDeclaration & {
        readonly isTypeOnly: true;
        readonly moduleSpecifier: Expression;
    };
};
export type TypeOnlyAliasDeclaration = TypeOnlyImportDeclaration | TypeOnlyExportDeclaration;
/**
 * This is either an `export =` or an `export default` declaration.
 * Unless `isExportEquals` is set, this node was parsed as an `export default`.
 */
export interface ExportAssignment extends DeclarationStatement, JSDocContainer {
    readonly kind: SyntaxKind.ExportAssignment;
    readonly parent: SourceFile;
    readonly modifiers?: NodeArray<ModifierLike>;
    readonly isExportEquals?: boolean;
    readonly expression: Expression;
}
export interface FileReference extends TextRange {
    fileName: string;
    resolutionMode?: ResolutionMode;
    preserve?: boolean;
}
export interface CheckJsDirective extends TextRange {
    enabled: boolean;
}
export type CommentKind = SyntaxKind.SingleLineCommentTrivia | SyntaxKind.MultiLineCommentTrivia;
export interface CommentRange extends TextRange {
    hasTrailingNewLine?: boolean;
    kind: CommentKind;
}
export interface SynthesizedComment extends CommentRange {
    text: string;
    pos: -1;
    end: -1;
    hasLeadingNewline?: boolean;
}
export interface JSDocTypeExpression extends TypeNode {
    readonly kind: SyntaxKind.JSDocTypeExpression;
    readonly type: TypeNode;
}
export interface JSDocNameReference extends Node {
    readonly kind: SyntaxKind.JSDocNameReference;
    readonly name: EntityName | JSDocMemberName;
}
/** Class#method reference in JSDoc */
export interface JSDocMemberName extends Node {
    readonly kind: SyntaxKind.JSDocMemberName;
    readonly left: EntityName | JSDocMemberName;
    readonly right: Identifier;
}
export interface JSDocType extends TypeNode {
    _jsDocTypeBrand: any;
}
export interface JSDocAllType extends JSDocType {
    readonly kind: SyntaxKind.JSDocAllType;
}
export interface JSDocUnknownType extends JSDocType {
    readonly kind: SyntaxKind.JSDocUnknownType;
}
export interface JSDocNonNullableType extends JSDocType {
    readonly kind: SyntaxKind.JSDocNonNullableType;
    readonly type: TypeNode;
    readonly postfix: boolean;
}
export interface JSDocNullableType extends JSDocType {
    readonly kind: SyntaxKind.JSDocNullableType;
    readonly type: TypeNode;
    readonly postfix: boolean;
}
export interface JSDocOptionalType extends JSDocType {
    readonly kind: SyntaxKind.JSDocOptionalType;
    readonly type: TypeNode;
}
export interface JSDocFunctionType extends JSDocType, SignatureDeclarationBase, LocalsContainer {
    readonly kind: SyntaxKind.JSDocFunctionType;
}
export interface JSDocVariadicType extends JSDocType {
    readonly kind: SyntaxKind.JSDocVariadicType;
    readonly type: TypeNode;
}
export interface JSDocNamepathType extends JSDocType {
    readonly kind: SyntaxKind.JSDocNamepathType;
    readonly type: TypeNode;
}
export type JSDocTypeReferencingNode = JSDocVariadicType | JSDocOptionalType | JSDocNullableType | JSDocNonNullableType;
export interface JSDoc extends Node {
    readonly kind: SyntaxKind.JSDoc;
    readonly parent: HasJSDoc;
    readonly tags?: NodeArray<JSDocTag>;
    readonly comment?: string | NodeArray<JSDocComment>;
}
export interface JSDocTag extends Node {
    readonly parent: JSDoc | JSDocTypeLiteral;
    readonly tagName: Identifier;
    readonly comment?: string | NodeArray<JSDocComment>;
}
export interface JSDocLink extends Node {
    readonly kind: SyntaxKind.JSDocLink;
    readonly name?: EntityName | JSDocMemberName;
    text: string;
}
export interface JSDocLinkCode extends Node {
    readonly kind: SyntaxKind.JSDocLinkCode;
    readonly name?: EntityName | JSDocMemberName;
    text: string;
}
export interface JSDocLinkPlain extends Node {
    readonly kind: SyntaxKind.JSDocLinkPlain;
    readonly name?: EntityName | JSDocMemberName;
    text: string;
}
export type JSDocComment = JSDocText | JSDocLink | JSDocLinkCode | JSDocLinkPlain;
export interface JSDocText extends Node {
    readonly kind: SyntaxKind.JSDocText;
    text: string;
}
export interface JSDocUnknownTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocTag;
}
/**
 * Note that `@extends` is a synonym of `@augments`.
 * Both tags are represented by this interface.
 */
export interface JSDocAugmentsTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocAugmentsTag;
    readonly class: ExpressionWithTypeArguments & {
        readonly expression: Identifier | PropertyAccessEntityNameExpression;
    };
}
export interface JSDocImplementsTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocImplementsTag;
    readonly class: ExpressionWithTypeArguments & {
        readonly expression: Identifier | PropertyAccessEntityNameExpression;
    };
}
export interface JSDocAuthorTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocAuthorTag;
}
export interface JSDocDeprecatedTag extends JSDocTag {
    kind: SyntaxKind.JSDocDeprecatedTag;
}
export interface JSDocClassTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocClassTag;
}
export interface JSDocPublicTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocPublicTag;
}
export interface JSDocPrivateTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocPrivateTag;
}
export interface JSDocProtectedTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocProtectedTag;
}
export interface JSDocReadonlyTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocReadonlyTag;
}
export interface JSDocOverrideTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocOverrideTag;
}
export interface JSDocEnumTag extends JSDocTag, Declaration, LocalsContainer {
    readonly kind: SyntaxKind.JSDocEnumTag;
    readonly parent: JSDoc;
    readonly typeExpression: JSDocTypeExpression;
}
export interface JSDocThisTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocThisTag;
    readonly typeExpression: JSDocTypeExpression;
}
export interface JSDocTemplateTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocTemplateTag;
    readonly constraint: JSDocTypeExpression | undefined;
    readonly typeParameters: NodeArray<TypeParameterDeclaration>;
}
export interface JSDocSeeTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocSeeTag;
    readonly name?: JSDocNameReference;
}
export interface JSDocReturnTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocReturnTag;
    readonly typeExpression?: JSDocTypeExpression;
}
export interface JSDocTypeTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocTypeTag;
    readonly typeExpression: JSDocTypeExpression;
}
export interface JSDocTypedefTag extends JSDocTag, NamedDeclaration, LocalsContainer {
    readonly kind: SyntaxKind.JSDocTypedefTag;
    readonly parent: JSDoc;
    readonly fullName?: JSDocNamespaceDeclaration | Identifier;
    readonly name?: Identifier;
    readonly typeExpression?: JSDocTypeExpression | JSDocTypeLiteral;
}
export interface JSDocCallbackTag extends JSDocTag, NamedDeclaration, LocalsContainer {
    readonly kind: SyntaxKind.JSDocCallbackTag;
    readonly parent: JSDoc;
    readonly fullName?: JSDocNamespaceDeclaration | Identifier;
    readonly name?: Identifier;
    readonly typeExpression: JSDocSignature;
}
export interface JSDocOverloadTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocOverloadTag;
    readonly parent: JSDoc;
    readonly typeExpression: JSDocSignature;
}
export interface JSDocThrowsTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocThrowsTag;
    readonly typeExpression?: JSDocTypeExpression;
}
export interface JSDocSignature extends JSDocType, Declaration, JSDocContainer, LocalsContainer {
    readonly kind: SyntaxKind.JSDocSignature;
    readonly typeParameters?: readonly JSDocTemplateTag[];
    readonly parameters: readonly JSDocParameterTag[];
    readonly type: JSDocReturnTag | undefined;
}
export interface JSDocPropertyLikeTag extends JSDocTag, Declaration {
    readonly parent: JSDoc;
    readonly name: EntityName;
    readonly typeExpression?: JSDocTypeExpression;
    /** Whether the property name came before the type -- non-standard for JSDoc, but Typescript-like */
    readonly isNameFirst: boolean;
    readonly isBracketed: boolean;
}
export interface JSDocPropertyTag extends JSDocPropertyLikeTag {
    readonly kind: SyntaxKind.JSDocPropertyTag;
}
export interface JSDocParameterTag extends JSDocPropertyLikeTag {
    readonly kind: SyntaxKind.JSDocParameterTag;
}
export interface JSDocTypeLiteral extends JSDocType, Declaration {
    readonly kind: SyntaxKind.JSDocTypeLiteral;
    readonly jsDocPropertyTags?: readonly JSDocPropertyLikeTag[];
    /** If true, then this type literal represents an *array* of its type. */
    readonly isArrayType: boolean;
}
export interface JSDocSatisfiesTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocSatisfiesTag;
    readonly typeExpression: JSDocTypeExpression;
}
/** @internal */
export interface JSDocSatisfiesExpression extends ParenthesizedExpression {
    readonly _jsDocSatisfiesExpressionBrand: never;
}
export interface JSDocImportTag extends JSDocTag {
    readonly kind: SyntaxKind.JSDocImportTag;
    readonly parent: JSDoc;
    readonly importClause?: ImportClause;
    readonly moduleSpecifier: Expression;
    readonly attributes?: ImportAttributes;
}
/** @internal */
export declare const enum FlowFlags {
    Unreachable = 1,// Unreachable code
    Start = 2,// Start of flow graph
    BranchLabel = 4,// Non-looping junction
    LoopLabel = 8,// Looping junction
    Assignment = 16,// Assignment
    TrueCondition = 32,// Condition known to be true
    FalseCondition = 64,// Condition known to be false
    SwitchClause = 128,// Switch statement clause
    ArrayMutation = 256,// Potential array mutation
    Call = 512,// Potential assertion call
    ReduceLabel = 1024,// Temporarily reduce antecedents of label
    Referenced = 2048,// Referenced as antecedent once
    Shared = 4096,// Referenced as antecedent more than once
    Label = 12,
    Condition = 96
}
/** @internal */
export type FlowNode = FlowUnreachable | FlowStart | FlowLabel | FlowAssignment | FlowCondition | FlowSwitchClause | FlowArrayMutation | FlowCall | FlowReduceLabel;
/** @internal */
export interface FlowNodeBase {
    flags: FlowFlags;
    id: number;
    node: unknown;
    antecedent: FlowNode | FlowNode[] | undefined;
}
/** @internal */
export interface FlowUnreachable extends FlowNodeBase {
    node: undefined;
    antecedent: undefined;
}
/** @internal */
export interface FlowStart extends FlowNodeBase {
    node: FunctionExpression | ArrowFunction | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | undefined;
    antecedent: undefined;
}
/** @internal */
export interface FlowLabel extends FlowNodeBase {
    node: undefined;
    antecedent: FlowNode[] | undefined;
}
/** @internal */
export interface FlowAssignment extends FlowNodeBase {
    node: Expression | VariableDeclaration | BindingElement;
    antecedent: FlowNode;
}
/** @internal */
export interface FlowCall extends FlowNodeBase {
    node: CallExpression;
    antecedent: FlowNode;
}
/** @internal */
export interface FlowCondition extends FlowNodeBase {
    node: Expression;
    antecedent: FlowNode;
}
/** @internal */
export interface FlowSwitchClause extends FlowNodeBase {
    node: FlowSwitchClauseData;
    antecedent: FlowNode;
}
/** @internal */
export interface FlowSwitchClauseData {
    switchStatement: SwitchStatement;
    clauseStart: number;
    clauseEnd: number;
}
/** @internal */
export interface FlowArrayMutation extends FlowNodeBase {
    node: CallExpression | BinaryExpression;
    antecedent: FlowNode;
}
/** @internal */
export interface FlowReduceLabel extends FlowNodeBase {
    node: FlowReduceLabelData;
    antecedent: FlowNode;
}
/** @internal */
export interface FlowReduceLabelData {
    target: FlowLabel;
    antecedents: FlowNode[];
}
export type FlowType = Type | IncompleteType;
export interface IncompleteType {
    flags: TypeFlags | 0;
    type: Type;
}
export interface AmdDependency {
    path: string;
    name?: string;
}
/**
 * Subset of properties from SourceFile that are used in multiple utility functions
 */
export interface SourceFileLike {
    readonly text: string;
    /** @internal */
    lineMap?: readonly number[];
    /** @internal */
    getPositionOfLineAndCharacter?(line: number, character: number, allowEdits?: true): number;
}
/** @internal */
export interface FutureSourceFile {
    readonly path: Path;
    readonly fileName: string;
    readonly impliedNodeFormat?: ResolutionMode;
    readonly packageJsonScope?: PackageJsonInfo;
    readonly externalModuleIndicator?: true | undefined;
    readonly commonJsModuleIndicator?: true | undefined;
    readonly statements: readonly never[];
    readonly imports: readonly never[];
}
/** @internal */
export interface RedirectInfo {
    /** Source file this redirects to. */
    readonly redirectTarget: SourceFile;
    /**
     * Source file for the duplicate package. This will not be used by the Program,
     * but we need to keep this around so we can watch for changes in underlying.
     */
    readonly unredirected: SourceFile;
}
export type ResolutionMode = ModuleKind.ESNext | ModuleKind.CommonJS | undefined;
export interface SourceFile extends Declaration, LocalsContainer {
    readonly kind: SyntaxKind.SourceFile;
    readonly statements: NodeArray<Statement>;
    readonly endOfFileToken: Token<SyntaxKind.EndOfFileToken>;
    fileName: string;
    /** @internal */ path: Path;
    text: string;
    /** Resolved path can be different from path property,
     * when file is included through project reference is mapped to its output instead of source
     * in that case resolvedPath = path to output file
     * path = input file's path
     *
     * @internal
     */
    resolvedPath: Path;
    /** Original file name that can be different from fileName,
     * when file is included through project reference is mapped to its output instead of source
     * in that case originalFileName = name of input file
     * fileName = output file's name
     *
     * @internal
     */
    originalFileName: string;
    /**
     * If two source files are for the same version of the same package, one will redirect to the other.
     * (See `createRedirectSourceFile` in program.ts.)
     * The redirect will have this set. The redirected-to source file will be in `redirectTargetsMap`.
     *
     * @internal
     */
    redirectInfo?: RedirectInfo;
    amdDependencies: readonly AmdDependency[];
    moduleName?: string;
    referencedFiles: readonly FileReference[];
    typeReferenceDirectives: readonly FileReference[];
    libReferenceDirectives: readonly FileReference[];
    languageVariant: LanguageVariant;
    isDeclarationFile: boolean;
    /** @internal */
    renamedDependencies?: ReadonlyMap<string, string>;
    /** @deprecated Always false. Use a Program to determine if a file is a lib file. */
    hasNoDefaultLib: boolean;
    languageVersion: ScriptTarget;
    /**
     * When `module` is `Node16` or `NodeNext`, this field controls whether the
     * source file in question is an ESNext-output-format file, or a CommonJS-output-format
     * module. This is derived by the module resolver as it looks up the file, since
     * it is derived from either the file extension of the module, or the containing
     * `package.json` context, and affects both checking and emit.
     *
     * It is _public_ so that (pre)transformers can set this field,
     * since it switches the builtin `node` module transform. Generally speaking, if unset,
     * the field is treated as though it is `ModuleKind.CommonJS`.
     *
     * Note that this field is only set by the module resolution process when
     * `moduleResolution` is `Node16` or `NodeNext`, which is implied by the `module` setting
     * of `Node16` or `NodeNext`, respectively, but may be overriden (eg, by a `moduleResolution`
     * of `node`). If so, this field will be unset and source files will be considered to be
     * CommonJS-output-format by the node module transformer and type checker, regardless of extension or context.
     */
    impliedNodeFormat?: ResolutionMode;
    /** @internal */ packageJsonLocations?: readonly string[];
    /** @internal */ packageJsonScope?: PackageJsonInfo;
    /** @internal */ scriptKind: ScriptKind;
    /**
     * The first "most obvious" node that makes a file an external module.
     * This is intended to be the first top-level import/export,
     * but could be arbitrarily nested (e.g. `import.meta`).
     *
     * @internal
     */
    externalModuleIndicator?: Node | true;
    /**
     * The callback used to set the external module indicator - this is saved to
     * be later reused during incremental reparsing, which otherwise lacks the information
     * to set this field
     *
     * @internal
     */
    setExternalModuleIndicator?: (file: SourceFile) => void;
    /** @internal */ commonJsModuleIndicator?: Node;
    /** @internal */ jsGlobalAugmentations?: SymbolTable;
    /** @internal */ identifiers: ReadonlyMap<string, string>;
    /** @internal */ nodeCount: number;
    /** @internal */ identifierCount: number;
    /** @internal */ symbolCount: number;
    /** @internal */ parseDiagnostics: DiagnosticWithLocation[];
    /** @internal */ bindDiagnostics: DiagnosticWithLocation[];
    /** @internal */ bindSuggestionDiagnostics?: DiagnosticWithLocation[];
    /** @internal */ jsDocDiagnostics?: DiagnosticWithLocation[];
    /** @internal */ additionalSyntacticDiagnostics?: readonly DiagnosticWithLocation[];
    /** @internal */ lineMap: readonly number[];
    /** @internal */ classifiableNames?: ReadonlySet<__String>;
    /** @internal */ commentDirectives?: CommentDirective[];
    /** @internal */ imports: readonly StringLiteralLike[];
    /** @internal */ moduleAugmentations: readonly (StringLiteral | Identifier)[];
    /** @internal */ patternAmbientModules?: PatternAmbientModule[];
    /** @internal */ ambientModuleNames: readonly string[];
    /** @internal */ checkJsDirective?: CheckJsDirective;
    /** @internal */ version: string;
    /** @internal */ pragmas: ReadonlyPragmaMap;
    /** @internal */ localJsxNamespace?: __String;
    /** @internal */ localJsxFragmentNamespace?: __String;
    /** @internal */ localJsxFactory?: EntityName;
    /** @internal */ localJsxFragmentFactory?: EntityName;
    /** @internal */ endFlowNode?: FlowNode;
    /** @internal */ jsDocParsingMode?: JSDocParsingMode;
}
/** @internal */
export interface ReadonlyPragmaContext {
    languageVersion: ScriptTarget;
    pragmas?: ReadonlyPragmaMap;
    checkJsDirective?: CheckJsDirective;
    referencedFiles: readonly FileReference[];
    typeReferenceDirectives: readonly FileReference[];
    libReferenceDirectives: readonly FileReference[];
    amdDependencies: readonly AmdDependency[];
    moduleName?: string;
}
/** @internal */
export interface PragmaContext extends ReadonlyPragmaContext {
    pragmas?: PragmaMap;
    referencedFiles: FileReference[];
    typeReferenceDirectives: FileReference[];
    libReferenceDirectives: FileReference[];
    amdDependencies: AmdDependency[];
}
/** @internal */
export interface SourceFile extends ReadonlyPragmaContext {
}
/** @internal */
export interface CommentDirective {
    range: TextRange;
    type: CommentDirectiveType;
}
/** @internal */
export declare const enum CommentDirectiveType {
    ExpectError = 0,
    ExpectException = 1,
    Ignore = 2
}
export interface Bundle extends Node {
    readonly kind: SyntaxKind.Bundle;
    readonly sourceFiles: readonly SourceFile[];
    /** @internal */ syntheticFileReferences?: readonly FileReference[];
    /** @internal */ syntheticTypeReferences?: readonly FileReference[];
    /** @internal */ syntheticLibReferences?: readonly FileReference[];
}
export interface JsonSourceFile extends SourceFile {
    readonly statements: NodeArray<JsonObjectExpressionStatement>;
}
export interface TsConfigSourceFile extends JsonSourceFile {
    extendedSourceFiles?: string[];
    /** @internal */ configFileSpecs?: ConfigFileSpecs;
}
export interface JsonMinusNumericLiteral extends PrefixUnaryExpression {
    readonly kind: SyntaxKind.PrefixUnaryExpression;
    readonly operator: SyntaxKind.MinusToken;
    readonly operand: NumericLiteral;
}
export type JsonObjectExpression = ObjectLiteralExpression | ArrayLiteralExpression | JsonMinusNumericLiteral | NumericLiteral | StringLiteral | BooleanLiteral | NullLiteral;
export interface JsonObjectExpressionStatement extends ExpressionStatement {
    readonly expression: JsonObjectExpression;
}
export interface ScriptReferenceHost {
    getCompilerOptions(): CompilerOptions;
    getSourceFile(fileName: string): SourceFile | undefined;
    getSourceFileByPath(path: Path): SourceFile | undefined;
    getCurrentDirectory(): string;
}
export interface ParseConfigHost extends ModuleResolutionHost {
    useCaseSensitiveFileNames: boolean;
    readDirectory(rootDir: string, extensions: readonly string[], excludes: readonly string[] | undefined, includes: readonly string[], depth?: number): readonly string[];
    /**
     * Gets a value indicating whether the specified path exists and is a file.
     * @param path The path to test.
     */
    fileExists(path: string): boolean;
    readFile(path: string): string | undefined;
    trace?(s: string): void;
}
/**
 * Branded string for keeping track of when we've turned an ambiguous path
 * specified like "./blah" to an absolute path to an actual
 * tsconfig file, e.g. "/root/blah/tsconfig.json"
 */
export type ResolvedConfigFileName = string & {
    _isResolvedConfigFileName: never;
};
/** @internal */
export interface ResolvedRefAndOutputDts {
    resolvedRef: ResolvedProjectReference;
    outputDts?: string;
}
/** @internal */
export interface ResolvedRefAndSource {
    resolvedRef: ResolvedProjectReference;
    source?: string;
}
export interface WriteFileCallbackData {
    /** @internal */ sourceMapUrlPos?: number;
    /** @internal */ buildInfo?: BuildInfo;
    /** @internal */ diagnostics?: readonly DiagnosticWithLocation[];
    /** @internal */ differsOnlyInMap?: true;
    /** @internal */ skippedDtsWrite?: true;
}
export type WriteFileCallback = (fileName: string, text: string, writeByteOrderMark: boolean, onError?: (message: string) => void, sourceFiles?: readonly SourceFile[], data?: WriteFileCallbackData) => void;
export declare class OperationCanceledException {
}
export interface CancellationToken {
    isCancellationRequested(): boolean;
    /** @throws OperationCanceledException if isCancellationRequested is true */
    throwIfCancellationRequested(): void;
}
/** @internal */
export declare enum FileIncludeKind {
    RootFile = 0,
    SourceFromProjectReference = 1,
    OutputFromProjectReference = 2,
    Import = 3,
    ReferenceFile = 4,
    TypeReferenceDirective = 5,
    LibFile = 6,
    LibReferenceDirective = 7,
    AutomaticTypeDirectiveFile = 8
}
/** @internal */
export interface RootFile {
    kind: FileIncludeKind.RootFile;
    index: number;
}
/** @internal */
export interface LibFile {
    kind: FileIncludeKind.LibFile;
    index?: number;
}
/** @internal */
export type ProjectReferenceFileKind = FileIncludeKind.SourceFromProjectReference | FileIncludeKind.OutputFromProjectReference;
/** @internal */
export interface ProjectReferenceFile {
    kind: ProjectReferenceFileKind;
    index: number;
}
/** @internal */
export type ReferencedFileKind = FileIncludeKind.Import | FileIncludeKind.ReferenceFile | FileIncludeKind.TypeReferenceDirective | FileIncludeKind.LibReferenceDirective;
/** @internal */
export interface ReferencedFile {
    kind: ReferencedFileKind;
    file: Path;
    index: number;
}
/** @internal */
export interface AutomaticTypeDirectiveFile {
    kind: FileIncludeKind.AutomaticTypeDirectiveFile;
    typeReference: string;
    packageId: PackageId | undefined;
}
/** @internal */
export type FileIncludeReason = RootFile | LibFile | ProjectReferenceFile | ReferencedFile | AutomaticTypeDirectiveFile;
/** @internal */
export declare const enum FilePreprocessingDiagnosticsKind {
    FilePreprocessingLibReferenceDiagnostic = 0,
    FilePreprocessingFileExplainingDiagnostic = 1,
    ResolutionDiagnostics = 2
}
/** @internal */
export interface FilePreprocessingLibReferenceDiagnostic {
    kind: FilePreprocessingDiagnosticsKind.FilePreprocessingLibReferenceDiagnostic;
    reason: ReferencedFile & {
        kind: FileIncludeKind.LibReferenceDirective;
    };
}
/** @internal */
export interface FilePreprocessingFileExplainingDiagnostic {
    kind: FilePreprocessingDiagnosticsKind.FilePreprocessingFileExplainingDiagnostic;
    file: Path | undefined;
    fileProcessingReason: FileIncludeReason;
    diagnostic: DiagnosticMessage;
    args: DiagnosticArguments;
}
/** @internal */
export interface ResolutionDiagnostics {
    kind: FilePreprocessingDiagnosticsKind.ResolutionDiagnostics;
    diagnostics: readonly Diagnostic[];
}
/** @internal */
export type FilePreprocessingDiagnostics = FilePreprocessingLibReferenceDiagnostic | FilePreprocessingFileExplainingDiagnostic | ResolutionDiagnostics;
/** @internal */
export declare const enum EmitOnly {
    Js = 0,
    Dts = 1,
    BuilderSignature = 2
}
/** @internal */
export interface LibResolution<T extends ResolvedModuleWithFailedLookupLocations = ResolvedModuleWithFailedLookupLocations> {
    resolution: T;
    actual: string;
}
export interface Program extends ScriptReferenceHost {
    getCurrentDirectory(): string;
    /**
     * Get a list of root file names that were passed to a 'createProgram'
     */
    getRootFileNames(): readonly string[];
    /**
     * Get a list of files in the program
     */
    getSourceFiles(): readonly SourceFile[];
    /**
     * Get a list of file names that were passed to 'createProgram' or referenced in a
     * program source file but could not be located.
     *
     * @internal
     */
    getMissingFilePaths(): Map<Path, string>;
    /** @internal */
    getModuleResolutionCache(): ModuleResolutionCache | undefined;
    /** @internal */
    getFilesByNameMap(): Map<Path, SourceFile | false | undefined>;
    /** @internal */
    resolvedModules: Map<Path, ModeAwareCache<ResolvedModuleWithFailedLookupLocations>> | undefined;
    /** @internal */
    resolvedTypeReferenceDirectiveNames: Map<Path, ModeAwareCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>> | undefined;
    /** @internal */
    getResolvedModule(f: SourceFile, moduleName: string, mode: ResolutionMode): ResolvedModuleWithFailedLookupLocations | undefined;
    /** @internal */
    getResolvedModuleFromModuleSpecifier(moduleSpecifier: StringLiteralLike, sourceFile?: SourceFile): ResolvedModuleWithFailedLookupLocations | undefined;
    /** @internal */
    getResolvedTypeReferenceDirective(f: SourceFile, typeDirectiveName: string, mode: ResolutionMode): ResolvedTypeReferenceDirectiveWithFailedLookupLocations | undefined;
    /** @internal */
    getResolvedTypeReferenceDirectiveFromTypeReferenceDirective(typedRef: FileReference, sourceFile: SourceFile): ResolvedTypeReferenceDirectiveWithFailedLookupLocations | undefined;
    /** @internal */
    forEachResolvedModule(callback: (resolution: ResolvedModuleWithFailedLookupLocations, moduleName: string, mode: ResolutionMode, filePath: Path) => void, file?: SourceFile): void;
    /** @internal */
    forEachResolvedTypeReferenceDirective(callback: (resolution: ResolvedTypeReferenceDirectiveWithFailedLookupLocations, moduleName: string, mode: ResolutionMode, filePath: Path) => void, file?: SourceFile): void;
    /**
     * Emits the JavaScript and declaration files.  If targetSourceFile is not specified, then
     * the JavaScript and declaration files will be produced for all the files in this program.
     * If targetSourceFile is specified, then only the JavaScript and declaration for that
     * specific file will be generated.
     *
     * If writeFile is not specified then the writeFile callback from the compiler host will be
     * used for writing the JavaScript and declaration files.  Otherwise, the writeFile parameter
     * will be invoked when writing the JavaScript and declaration files.
     */
    emit(targetSourceFile?: SourceFile, writeFile?: WriteFileCallback, cancellationToken?: CancellationToken, emitOnlyDtsFiles?: boolean, customTransformers?: CustomTransformers): EmitResult;
    /** @internal */
    emit(targetSourceFile?: SourceFile, writeFile?: WriteFileCallback, cancellationToken?: CancellationToken, emitOnly?: boolean | EmitOnly, customTransformers?: CustomTransformers, forceDtsEmit?: boolean, skipBuildInfo?: boolean): EmitResult;
    getOptionsDiagnostics(cancellationToken?: CancellationToken): readonly Diagnostic[];
    getGlobalDiagnostics(cancellationToken?: CancellationToken): readonly Diagnostic[];
    getSyntacticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly DiagnosticWithLocation[];
    /** The first time this is called, it will return global diagnostics (no location). */
    getSemanticDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[];
    /** @internal */
    getSemanticDiagnostics(sourceFile: SourceFile | undefined, cancellationToken: CancellationToken | undefined, nodesToCheck: Node[]): readonly Diagnostic[];
    getDeclarationDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly DiagnosticWithLocation[];
    getConfigFileParsingDiagnostics(): readonly Diagnostic[];
    /** @internal */ getSuggestionDiagnostics(sourceFile: SourceFile, cancellationToken?: CancellationToken): readonly DiagnosticWithLocation[];
    /** @internal */ getBindAndCheckDiagnostics(sourceFile: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[];
    /** @internal */ getProgramDiagnostics(sourceFile: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[];
    /**
     * Gets a type checker that can be used to semantically analyze source files in the program.
     */
    getTypeChecker(): TypeChecker;
    /** @internal */ getCommonSourceDirectory(): string;
    /** @internal */ getCachedSemanticDiagnostics(sourceFile: SourceFile): readonly Diagnostic[] | undefined;
    /** @internal */ getClassifiableNames(): Set<__String>;
    getNodeCount(): number;
    getIdentifierCount(): number;
    getSymbolCount(): number;
    getTypeCount(): number;
    getInstantiationCount(): number;
    getRelationCacheSizes(): {
        assignable: number;
        identity: number;
        subtype: number;
        strictSubtype: number;
    };
    /** @internal */ getFileProcessingDiagnostics(): FilePreprocessingDiagnostics[] | undefined;
    /** @internal */ getAutomaticTypeDirectiveNames(): string[];
    /** @internal */ getAutomaticTypeDirectiveResolutions(): ModeAwareCache<ResolvedTypeReferenceDirectiveWithFailedLookupLocations>;
    isSourceFileFromExternalLibrary(file: SourceFile): boolean;
    isSourceFileDefaultLibrary(file: SourceFile): boolean;
    /**
     * Calculates the final resolution mode for a given module reference node. This function only returns a result when module resolution
     * settings allow differing resolution between ESM imports and CJS requires, or when a mode is explicitly provided via import attributes,
     * which cause an `import` or `require` condition to be used during resolution regardless of module resolution settings. In absence of
     * overriding attributes, and in modes that support differing resolution, the result indicates the syntax the usage would emit to JavaScript.
     * Some examples:
     *
     * ```ts
     * // tsc foo.mts --module nodenext
     * import {} from "mod";
     * // Result: ESNext - the import emits as ESM due to `impliedNodeFormat` set by .mts file extension
     *
     * // tsc foo.cts --module nodenext
     * import {} from "mod";
     * // Result: CommonJS - the import emits as CJS due to `impliedNodeFormat` set by .cts file extension
     *
     * // tsc foo.ts --module preserve --moduleResolution bundler
     * import {} from "mod";
     * // Result: ESNext - the import emits as ESM due to `--module preserve` and `--moduleResolution bundler`
     * // supports conditional imports/exports
     *
     * // tsc foo.ts --module preserve --moduleResolution node10
     * import {} from "mod";
     * // Result: undefined - the import emits as ESM due to `--module preserve`, but `--moduleResolution node10`
     * // does not support conditional imports/exports
     *
     * // tsc foo.ts --module commonjs --moduleResolution node10
     * import type {} from "mod" with { "resolution-mode": "import" };
     * // Result: ESNext - conditional imports/exports always supported with "resolution-mode" attribute
     * ```
     */
    getModeForUsageLocation(file: SourceFile, usage: StringLiteralLike): ResolutionMode;
    /**
     * Calculates the final resolution mode for an import at some index within a file's `imports` list. This function only returns a result
     * when module resolution settings allow differing resolution between ESM imports and CJS requires, or when a mode is explicitly provided
     * via import attributes, which cause an `import` or `require` condition to be used during resolution regardless of module resolution
     * settings. In absence of overriding attributes, and in modes that support differing resolution, the result indicates the syntax the
     * usage would emit to JavaScript. Some examples:
     *
     * ```ts
     * // tsc foo.mts --module nodenext
     * import {} from "mod";
     * // Result: ESNext - the import emits as ESM due to `impliedNodeFormat` set by .mts file extension
     *
     * // tsc foo.cts --module nodenext
     * import {} from "mod";
     * // Result: CommonJS - the import emits as CJS due to `impliedNodeFormat` set by .cts file extension
     *
     * // tsc foo.ts --module preserve --moduleResolution bundler
     * import {} from "mod";
     * // Result: ESNext - the import emits as ESM due to `--module preserve` and `--moduleResolution bundler`
     * // supports conditional imports/exports
     *
     * // tsc foo.ts --module preserve --moduleResolution node10
     * import {} from "mod";
     * // Result: undefined - the import emits as ESM due to `--module preserve`, but `--moduleResolution node10`
     * // does not support conditional imports/exports
     *
     * // tsc foo.ts --module commonjs --moduleResolution node10
     * import type {} from "mod" with { "resolution-mode": "import" };
     * // Result: ESNext - conditional imports/exports always supported with "resolution-mode" attribute
     * ```
     */
    getModeForResolutionAtIndex(file: SourceFile, index: number): ResolutionMode;
    /**
     * @internal
     * The resolution mode to use for module resolution or module specifier resolution
     * outside the context of an existing module reference, where
     * `program.getModeForUsageLocation` should be used instead.
     */
    getDefaultResolutionModeForFile(sourceFile: SourceFile): ResolutionMode;
    /** @internal */ getImpliedNodeFormatForEmit(sourceFile: SourceFile): ResolutionMode;
    /** @internal */ getEmitModuleFormatOfFile(sourceFile: SourceFile): ModuleKind;
    /** @internal */ shouldTransformImportCall(sourceFile: SourceFile): boolean;
    /** @internal */ readonly structureIsReused: StructureIsReused;
    /** @internal */ getSourceFileFromReference(referencingFile: SourceFile, ref: FileReference): SourceFile | undefined;
    /** @internal */ getLibFileFromReference(ref: FileReference): SourceFile | undefined;
    /**
     * Given a source file, get the name of the package it was imported from.
     *
     * @internal
     */
    sourceFileToPackageName: Map<Path, string>;
    /**
     * Set of all source files that some other source file redirects to.
     *
     * @internal
     */
    redirectTargetsMap: MultiMap<Path, string>;
    /**
     * Whether any (non-external, non-declaration) source files use `node:`-prefixed module specifiers
     * (except for those that are not available without the prefix).
     * `false` indicates that an unprefixed builtin module was seen; `undefined` indicates that no
     * builtin modules (or only modules exclusively available with the prefix) were seen.
     *
     * @internal
     */
    readonly usesUriStyleNodeCoreModules: boolean | undefined;
    /**
     * Map from libFileName to actual resolved location of the lib
     * @internal
     */
    resolvedLibReferences: Map<string, LibResolution> | undefined;
    /** @internal */ getProgramDiagnosticsContainer: () => ProgramDiagnostics;
    /** @internal */ getCurrentPackagesMap(): Map<string, boolean> | undefined;
    /**
     * Is the file emitted file
     *
     * @internal
     */
    isEmittedFile(file: string): boolean;
    /** @internal */ getFileIncludeReasons(): MultiMap<Path, FileIncludeReason>;
    /** @internal */ useCaseSensitiveFileNames(): boolean;
    /** @internal */ getCanonicalFileName: GetCanonicalFileName;
    getProjectReferences(): readonly ProjectReference[] | undefined;
    getResolvedProjectReferences(): readonly (ResolvedProjectReference | undefined)[] | undefined;
    /**
     * @internal
     * Get the referenced project if the file is input file from that reference project
     */
    getRedirectFromSourceFile(fileName: string): ResolvedRefAndOutputDts | undefined;
    /** @internal */ forEachResolvedProjectReference<T>(cb: (resolvedProjectReference: ResolvedProjectReference) => T | undefined): T | undefined;
    /** @internal */ getResolvedProjectReferenceByPath(projectReferencePath: Path): ResolvedProjectReference | undefined;
    /** @internal */ getRedirectFromOutput(filePath: Path): ResolvedRefAndSource | undefined;
    /** @internal */ isSourceOfProjectReferenceRedirect(fileName: string): boolean;
    /** @internal */ getCompilerOptionsForFile(file: SourceFile): CompilerOptions;
    /** @internal */ getBuildInfo?(): BuildInfo;
    /** @internal */ emitBuildInfo(writeFile?: WriteFileCallback, cancellationToken?: CancellationToken): EmitResult;
    /**
     * This implementation handles file exists to be true if file is source of project reference redirect when program is created using useSourceOfProjectReferenceRedirect
     *
     * @internal
     */
    fileExists(fileName: string): boolean;
    /**
     * Call compilerHost.writeFile on host program was created with
     *
     * @internal
     */
    writeFile: WriteFileCallback;
}
/** @internal */
export interface Program extends TypeCheckerHost, ModuleSpecifierResolutionHost {
}
/** @internal */
export type RedirectTargetsMap = ReadonlyMap<Path, readonly string[]>;
export interface ResolvedProjectReference {
    commandLine: ParsedCommandLine;
    sourceFile: SourceFile;
    references?: readonly (ResolvedProjectReference | undefined)[];
}
/** @internal */
export declare const enum StructureIsReused {
    Not = 0,
    SafeModules = 1,
    Completely = 2
}
export type CustomTransformerFactory = (context: TransformationContext) => CustomTransformer;
export interface CustomTransformer {
    transformSourceFile(node: SourceFile): SourceFile;
    transformBundle(node: Bundle): Bundle;
}
export interface CustomTransformers {
    /** Custom transformers to evaluate before built-in .js transformations. */
    before?: (TransformerFactory<SourceFile> | CustomTransformerFactory)[];
    /** Custom transformers to evaluate after built-in .js transformations. */
    after?: (TransformerFactory<SourceFile> | CustomTransformerFactory)[];
    /** Custom transformers to evaluate after built-in .d.ts transformations. */
    afterDeclarations?: (TransformerFactory<Bundle | SourceFile> | CustomTransformerFactory)[];
}
/** @internal */
export interface EmitTransformers {
    scriptTransformers: readonly TransformerFactory<SourceFile | Bundle>[];
    declarationTransformers: readonly TransformerFactory<SourceFile | Bundle>[];
}
export interface SourceMapSpan {
    /** Line number in the .js file. */
    emittedLine: number;
    /** Column number in the .js file. */
    emittedColumn: number;
    /** Line number in the .ts file. */
    sourceLine: number;
    /** Column number in the .ts file. */
    sourceColumn: number;
    /** Optional name (index into names array) associated with this span. */
    nameIndex?: number;
    /** .ts file (index into sources array) associated with this span */
    sourceIndex: number;
}
/** @internal */
export interface SourceMapEmitResult {
    inputSourceFileNames: readonly string[];
    sourceMap: RawSourceMap;
}
/** Return code used by getEmitOutput function to indicate status of the function */
export declare enum ExitStatus {
    Success = 0,
    DiagnosticsPresent_OutputsSkipped = 1,
    DiagnosticsPresent_OutputsGenerated = 2,
    InvalidProject_OutputsSkipped = 3,
    ProjectReferenceCycle_OutputsSkipped = 4
}
export interface EmitResult {
    emitSkipped: boolean;
    /** Contains declaration emit diagnostics */
    diagnostics: readonly Diagnostic[];
    emittedFiles?: string[];
    /** @internal */ sourceMaps?: SourceMapEmitResult[];
}
/** @internal */
export interface TypeCheckerHost extends ModuleSpecifierResolutionHost, SourceFileMayBeEmittedHost {
    getCompilerOptions(): CompilerOptions;
    getSourceFiles(): readonly SourceFile[];
    getSourceFile(fileName: string): SourceFile | undefined;
    getRedirectFromSourceFile(fileName: string): ResolvedRefAndOutputDts | undefined;
    isSourceOfProjectReferenceRedirect(fileName: string): boolean;
    getEmitSyntaxForUsageLocation(file: SourceFile, usage: StringLiteralLike): ResolutionMode;
    getRedirectFromOutput(filePath: Path): ResolvedRefAndSource | undefined;
    getModeForUsageLocation(file: SourceFile, usage: StringLiteralLike): ResolutionMode;
    getDefaultResolutionModeForFile(sourceFile: SourceFile): ResolutionMode;
    getImpliedNodeFormatForEmit(sourceFile: SourceFile): ResolutionMode;
    getEmitModuleFormatOfFile(sourceFile: SourceFile): ModuleKind;
    getResolvedModule(f: SourceFile, moduleName: string, mode: ResolutionMode): ResolvedModuleWithFailedLookupLocations | undefined;
    readonly redirectTargetsMap: RedirectTargetsMap;
    typesPackageExists(packageName: string): boolean;
    packageBundlesTypes(packageName: string): boolean;
    isSourceFileDefaultLibrary(file: SourceFile): boolean;
}
/** @internal */
export interface WriterContextOut {
    /** Whether increasing the expansion depth will cause us to expand more types. */
    canIncreaseExpansionDepth: boolean;
    truncated: boolean;
}
export interface TypeChecker {
    getTypeOfSymbolAtLocation(symbol: Symbol, node: Node): Type;
    getTypeOfSymbol(symbol: Symbol): Type;
    getDeclaredTypeOfSymbol(symbol: Symbol): Type;
    getPropertiesOfType(type: Type): Symbol[];
    getPropertyOfType(type: Type, propertyName: string): Symbol | undefined;
    getPrivateIdentifierPropertyOfType(leftType: Type, name: string, location: Node): Symbol | undefined;
    /** @internal */ getTypeOfPropertyOfType(type: Type, propertyName: string): Type | undefined;
    getIndexInfoOfType(type: Type, kind: IndexKind): IndexInfo | undefined;
    getIndexInfosOfType(type: Type): readonly IndexInfo[];
    getIndexInfosOfIndexSymbol: (indexSymbol: Symbol, siblingSymbols?: Symbol[] | undefined) => IndexInfo[];
    getSignaturesOfType(type: Type, kind: SignatureKind): readonly Signature[];
    getIndexTypeOfType(type: Type, kind: IndexKind): Type | undefined;
    /** @internal */ getIndexType(type: Type): Type;
    getBaseTypes(type: InterfaceType): BaseType[];
    getBaseTypeOfLiteralType(type: Type): Type;
    getWidenedType(type: Type): Type;
    /** @internal */
    getWidenedLiteralType(type: Type): Type;
    /** @internal */
    getPromisedTypeOfPromise(promise: Type, errorNode?: Node): Type | undefined;
    /**
     * Gets the "awaited type" of a type.
     *
     * If an expression has a Promise-like type, the "awaited type" of the expression is
     * derived from the type of the first argument of the fulfillment callback for that
     * Promise's `then` method. If the "awaited type" is itself a Promise-like, it is
     * recursively unwrapped in the same manner until a non-promise type is found.
     *
     * If an expression does not have a Promise-like type, its "awaited type" is the type
     * of the expression.
     *
     * If the resulting "awaited type" is a generic object type, then it is wrapped in
     * an `Awaited<T>`.
     *
     * In the event the "awaited type" circularly references itself, or is a non-Promise
     * object-type with a callable `then()` method, an "awaited type" cannot be determined
     * and the value `undefined` will be returned.
     *
     * This is used to reflect the runtime behavior of the `await` keyword.
     */
    getAwaitedType(type: Type): Type | undefined;
    /** @internal */
    isEmptyAnonymousObjectType(type: Type): boolean;
    getReturnTypeOfSignature(signature: Signature): Type;
    /** @internal */ getInferredThrowsType(signature: Signature): Type;
    /** @internal */ getInferredRejectsType(signature: Signature): Type;
    /**
     * Gets the type of a parameter at a given position in a signature.
     * Returns `any` if the index is not valid.
     *
     * @internal
     */
    getParameterType(signature: Signature, parameterIndex: number): Type;
    /** @internal */ getParameterIdentifierInfoAtPosition(signature: Signature, parameterIndex: number): {
        parameter: Identifier;
        parameterName: __String;
        isRestParameter: boolean;
    } | undefined;
    getNullableType(type: Type, flags: TypeFlags): Type;
    getNonNullableType(type: Type): Type;
    /** @internal */ getNonOptionalType(type: Type): Type;
    /** @internal */ isNullableType(type: Type): boolean;
    getTypeArguments(type: TypeReference): readonly Type[];
    /** Note that the resulting nodes cannot be checked. */
    typeToTypeNode(type: Type, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined): TypeNode | undefined;
    /** @internal */ typeToTypeNode(type: Type, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined, internalFlags?: InternalNodeBuilderFlags | undefined, tracker?: SymbolTracker): TypeNode | undefined;
    /** @internal */ typePredicateToTypePredicateNode(typePredicate: TypePredicate, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined, internalFlags?: InternalNodeBuilderFlags | undefined, tracker?: SymbolTracker): TypePredicateNode | undefined;
    /** Note that the resulting nodes cannot be checked. */
    signatureToSignatureDeclaration(signature: Signature, kind: SyntaxKind, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined): SignatureDeclaration & {
        typeArguments?: NodeArray<TypeNode>;
    } | undefined;
    /** @internal */ signatureToSignatureDeclaration(signature: Signature, kind: SyntaxKind, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined, internalFlags?: InternalNodeBuilderFlags | undefined, tracker?: SymbolTracker): SignatureDeclaration & {
        typeArguments?: NodeArray<TypeNode>;
    } | undefined;
    /** Note that the resulting nodes cannot be checked. */
    indexInfoToIndexSignatureDeclaration(indexInfo: IndexInfo, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined): IndexSignatureDeclaration | undefined;
    /** @internal */ indexInfoToIndexSignatureDeclaration(indexInfo: IndexInfo, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined, internalFlags?: InternalNodeBuilderFlags | undefined, tracker?: SymbolTracker): IndexSignatureDeclaration | undefined;
    /** Note that the resulting nodes cannot be checked. */
    symbolToEntityName(symbol: Symbol, meaning: SymbolFlags, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined): EntityName | undefined;
    /** Note that the resulting nodes cannot be checked. */
    symbolToExpression(symbol: Symbol, meaning: SymbolFlags, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined): Expression | undefined;
    /**
     * Note that the resulting nodes cannot be checked.
     *
     * @internal
     */
    symbolToNode(symbol: Symbol, meaning: SymbolFlags, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined, internalFlags: InternalNodeBuilderFlags | undefined): Node | undefined;
    /** Note that the resulting nodes cannot be checked. */
    symbolToTypeParameterDeclarations(symbol: Symbol, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined): NodeArray<TypeParameterDeclaration> | undefined;
    /** Note that the resulting nodes cannot be checked. */
    symbolToParameterDeclaration(symbol: Symbol, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined): ParameterDeclaration | undefined;
    /** Note that the resulting nodes cannot be checked. */
    typeParameterToDeclaration(parameter: TypeParameter, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined): TypeParameterDeclaration | undefined;
    /** @internal */ typeParameterToDeclaration(parameter: TypeParameter, enclosingDeclaration: Node | undefined, flags: NodeBuilderFlags | undefined, internalFlags?: InternalNodeBuilderFlags, tracker?: SymbolTracker, maximumLength?: number, verbosityLevel?: number, out?: WriterContextOut): TypeParameterDeclaration | undefined;
    getSymbolsInScope(location: Node, meaning: SymbolFlags): Symbol[];
    getSymbolAtLocation(node: Node): Symbol | undefined;
    /** @internal */ getIndexInfosAtLocation(node: Node): readonly IndexInfo[] | undefined;
    getSymbolsOfParameterPropertyDeclaration(parameter: ParameterDeclaration, parameterName: string): Symbol[];
    /**
     * The function returns the value (local variable) symbol of an identifier in the short-hand property assignment.
     * This is necessary as an identifier in short-hand property assignment can contains two meaning: property name and property value.
     */
    getShorthandAssignmentValueSymbol(location: Node | undefined): Symbol | undefined;
    getExportSpecifierLocalTargetSymbol(location: ExportSpecifier | Identifier): Symbol | undefined;
    /**
     * If a symbol is a local symbol with an associated exported symbol, returns the exported symbol.
     * Otherwise returns its input.
     * For example, at `export type T = number;`:
     *     - `getSymbolAtLocation` at the location `T` will return the exported symbol for `T`.
     *     - But the result of `getSymbolsInScope` will contain the *local* symbol for `T`, not the exported symbol.
     *     - Calling `getExportSymbolOfSymbol` on that local symbol will return the exported symbol.
     */
    getExportSymbolOfSymbol(symbol: Symbol): Symbol;
    getPropertySymbolOfDestructuringAssignment(location: Identifier): Symbol | undefined;
    getTypeOfAssignmentPattern(pattern: AssignmentPattern): Type;
    getTypeAtLocation(node: Node): Type;
    getTypeFromTypeNode(node: TypeNode): Type;
    signatureToString(signature: Signature, enclosingDeclaration?: Node, flags?: TypeFormatFlags, kind?: SignatureKind): string;
    typeToString(type: Type, enclosingDeclaration?: Node, flags?: TypeFormatFlags): string;
    symbolToString(symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags, flags?: SymbolFormatFlags): string;
    typePredicateToString(predicate: TypePredicate, enclosingDeclaration?: Node, flags?: TypeFormatFlags): string;
    /** @internal */ writeSignature(signature: Signature, enclosingDeclaration?: Node, flags?: TypeFormatFlags, kind?: SignatureKind, writer?: EmitTextWriter, maximumLength?: number, verbosityLevel?: number, out?: WriterContextOut): string;
    /** @internal */ writeType(type: Type, enclosingDeclaration?: Node, flags?: TypeFormatFlags, writer?: EmitTextWriter, maximumLength?: number, verbosityLevel?: number, out?: WriterContextOut): string;
    /** @internal */ writeSymbol(symbol: Symbol, enclosingDeclaration?: Node, meaning?: SymbolFlags, flags?: SymbolFormatFlags, writer?: EmitTextWriter): string;
    /** @internal */ writeTypePredicate(predicate: TypePredicate, enclosingDeclaration?: Node, flags?: TypeFormatFlags, writer?: EmitTextWriter): string;
    getFullyQualifiedName(symbol: Symbol): string;
    getAugmentedPropertiesOfType(type: Type): Symbol[];
    getRootSymbols(symbol: Symbol): readonly Symbol[];
    getSymbolOfExpando(node: Node, allowDeclaration: boolean): Symbol | undefined;
    getContextualType(node: Expression): Type | undefined;
    /** @internal */ getContextualType(node: Expression, contextFlags?: ContextFlags): Type | undefined;
    /** @internal */ getContextualTypeForObjectLiteralElement(element: ObjectLiteralElementLike): Type | undefined;
    /** @internal */ getContextualTypeForArgumentAtIndex(call: CallLikeExpression, argIndex: number): Type | undefined;
    /** @internal */ getContextualTypeForJsxAttribute(attribute: JsxAttribute | JsxSpreadAttribute): Type | undefined;
    /** @internal */ isContextSensitive(node: Expression | MethodDeclaration | ObjectLiteralElementLike | JsxAttributeLike): boolean;
    /** @internal */ getTypeOfPropertyOfContextualType(type: Type, name: __String): Type | undefined;
    /**
     * returns unknownSignature in the case of an error.
     * returns undefined if the node is not valid.
     * @param argumentCount Apparent number of arguments, passed in case of a possibly incomplete call. This should come from an ArgumentListInfo. See `signatureHelp.ts`.
     */
    getResolvedSignature(node: CallLikeExpression, candidatesOutArray?: Signature[], argumentCount?: number): Signature | undefined;
    /** @internal */ getResolvedSignatureForSignatureHelp(node: CallLikeExpression, candidatesOutArray?: Signature[], argumentCount?: number): Signature | undefined;
    /** @internal */ getCandidateSignaturesForStringLiteralCompletions(call: CallLikeExpression, editingArgument: Node): Signature[];
    /** @internal */ getExpandedParameters(sig: Signature): readonly (readonly Symbol[])[];
    /** @internal */ hasEffectiveRestParameter(sig: Signature): boolean;
    /** @internal */ containsArgumentsReference(declaration: SignatureDeclaration): boolean;
    getSignatureFromDeclaration(declaration: SignatureDeclaration): Signature | undefined;
    isImplementationOfOverload(node: SignatureDeclaration): boolean | undefined;
    isUndefinedSymbol(symbol: Symbol): boolean;
    isArgumentsSymbol(symbol: Symbol): boolean;
    isUnknownSymbol(symbol: Symbol): boolean;
    getMergedSymbol(symbol: Symbol): Symbol;
    /** @internal */ symbolIsValue(symbol: Symbol, includeTypeOnlyMembers?: boolean): boolean;
    getConstantValue(node: EnumMember | PropertyAccessExpression | ElementAccessExpression): string | number | undefined;
    isValidPropertyAccess(node: PropertyAccessExpression | QualifiedName | ImportTypeNode, propertyName: string): boolean;
    /**
     * Exclude accesses to private properties.
     *
     * @internal
     */
    isValidPropertyAccessForCompletions(node: PropertyAccessExpression | ImportTypeNode | QualifiedName, type: Type, property: Symbol): boolean;
    /** Follow all aliases to get the original symbol. */
    getAliasedSymbol(symbol: Symbol): Symbol;
    /** Follow a *single* alias to get the immediately aliased symbol. */
    getImmediateAliasedSymbol(symbol: Symbol): Symbol | undefined;
    getExportsOfModule(moduleSymbol: Symbol): Symbol[];
    /**
     * Unlike `getExportsOfModule`, this includes properties of an `export =` value.
     *
     * @internal
     */
    getExportsAndPropertiesOfModule(moduleSymbol: Symbol): Symbol[];
    /** @internal */ forEachExportAndPropertyOfModule(moduleSymbol: Symbol, cb: (symbol: Symbol, key: __String) => void): void;
    getJsxIntrinsicTagNamesAt(location: Node): Symbol[];
    isOptionalParameter(node: ParameterDeclaration): boolean;
    getAmbientModules(): Symbol[];
    tryGetMemberInModuleExports(memberName: string, moduleSymbol: Symbol): Symbol | undefined;
    /**
     * Unlike `tryGetMemberInModuleExports`, this includes properties of an `export =` value.
     * Does *not* return properties of primitive types.
     *
     * @internal
     */
    tryGetMemberInModuleExportsAndProperties(memberName: string, moduleSymbol: Symbol): Symbol | undefined;
    getApparentType(type: Type): Type;
    /** @internal */ getSuggestedSymbolForNonexistentProperty(name: MemberName | string, containingType: Type): Symbol | undefined;
    /** @internal */ getSuggestedSymbolForNonexistentJSXAttribute(name: Identifier | string, containingType: Type): Symbol | undefined;
    /** @internal */ getSuggestedSymbolForNonexistentSymbol(location: Node, name: string, meaning: SymbolFlags): Symbol | undefined;
    /** @internal */ getSuggestedSymbolForNonexistentModule(node: Identifier, target: Symbol): Symbol | undefined;
    /** @internal */ getSuggestedSymbolForNonexistentClassMember(name: string, baseType: Type): Symbol | undefined;
    getBaseConstraintOfType(type: Type): Type | undefined;
    getDefaultFromTypeParameter(type: Type): Type | undefined;
    /**
     * Gets the intrinsic `any` type. There are multiple types that act as `any` used internally in the compiler,
     * so the type returned by this function should not be used in equality checks to determine if another type
     * is `any`. Instead, use `type.flags & TypeFlags.Any`.
     */
    getAnyType(): Type;
    getStringType(): Type;
    getStringLiteralType(value: string): StringLiteralType;
    getNumberType(): Type;
    getNumberLiteralType(value: number): NumberLiteralType;
    getBigIntType(): Type;
    getBigIntLiteralType(value: PseudoBigInt): BigIntLiteralType;
    getBooleanType(): Type;
    getUnknownType(): Type;
    /** @internal */
    getFalseType(fresh?: boolean): Type;
    getFalseType(): Type;
    /** @internal */
    getTrueType(fresh?: boolean): Type;
    getTrueType(): Type;
    getVoidType(): Type;
    /**
     * Gets the intrinsic `undefined` type. There are multiple types that act as `undefined` used internally in the compiler
     * depending on compiler options, so the type returned by this function should not be used in equality checks to determine
     * if another type is `undefined`. Instead, use `type.flags & TypeFlags.Undefined`.
     */
    getUndefinedType(): Type;
    /**
     * Gets the intrinsic `null` type. There are multiple types that act as `null` used internally in the compiler,
     * so the type returned by this function should not be used in equality checks to determine if another type
     * is `null`. Instead, use `type.flags & TypeFlags.Null`.
     */
    getNullType(): Type;
    getESSymbolType(): Type;
    /**
     * Gets the intrinsic `never` type. There are multiple types that act as `never` used internally in the compiler,
     * so the type returned by this function should not be used in equality checks to determine if another type
     * is `never`. Instead, use `type.flags & TypeFlags.Never`.
     */
    getNeverType(): Type;
    /**
     * Gets the intrinsic `object` type.
     */
    getNonPrimitiveType(): Type;
    /** @internal */ getOptionalType(): Type;
    /** @internal */ getUnionType(types: Type[], subtypeReduction?: UnionReduction): Type;
    /** @internal */ createArrayType(elementType: Type): Type;
    /** @internal */ getElementTypeOfArrayType(arrayType: Type): Type | undefined;
    /** @internal */ createPromiseType(type: Type): Type;
    /** @internal */ getPromiseType(): Type;
    /** @internal */ getPromiseLikeType(): Type;
    /** @internal */ getAnyAsyncIterableType(): Type | undefined;
    /**
     * Returns true if the "source" type is assignable to the "target" type.
     *
     * ```ts
     * declare const abcLiteral: ts.Type; // Type of "abc"
     * declare const stringType: ts.Type; // Type of string
     *
     * isTypeAssignableTo(abcLiteral, abcLiteral); // true; "abc" is assignable to "abc"
     * isTypeAssignableTo(abcLiteral, stringType); // true; "abc" is assignable to string
     * isTypeAssignableTo(stringType, abcLiteral); // false; string is not assignable to "abc"
     * isTypeAssignableTo(stringType, stringType); // true; string is assignable to string
     * ```
     */
    isTypeAssignableTo(source: Type, target: Type): boolean;
    /** @internal */ createAnonymousType(symbol: Symbol | undefined, members: SymbolTable, callSignatures: Signature[], constructSignatures: Signature[], indexInfos: IndexInfo[]): Type;
    /** @internal */ createSignature(declaration: SignatureDeclaration | undefined, typeParameters: readonly TypeParameter[] | undefined, thisParameter: Symbol | undefined, parameters: readonly Symbol[], resolvedReturnType: Type, typePredicate: TypePredicate | undefined, minArgumentCount: number, flags: SignatureFlags): Signature;
    /** @internal */ createSymbol(flags: SymbolFlags, name: __String): TransientSymbol;
    /** @internal */ createIndexInfo(keyType: Type, type: Type, isReadonly: boolean, declaration?: SignatureDeclaration): IndexInfo;
    /** @internal */ isSymbolAccessible(symbol: Symbol, enclosingDeclaration: Node | undefined, meaning: SymbolFlags, shouldComputeAliasToMarkVisible: boolean): SymbolAccessibilityResult;
    /** @internal */ tryFindAmbientModule(moduleName: string): Symbol | undefined;
    /** @internal */ getSymbolWalker(accept?: (symbol: Symbol) => boolean): SymbolWalker;
    /** @internal */ getDiagnostics(sourceFile?: SourceFile, cancellationToken?: CancellationToken, nodesToCheck?: Node[]): Diagnostic[];
    /** @internal */ getGlobalDiagnostics(): Diagnostic[];
    /** @internal */ getEmitResolver(sourceFile?: SourceFile, cancellationToken?: CancellationToken, forceDts?: boolean): EmitResolver;
    /** @internal */ requiresAddingImplicitUndefined(parameter: ParameterDeclaration | JSDocParameterTag, enclosingDeclaration: Node | undefined): boolean;
    /** @internal */ getNodeCount(): number;
    /** @internal */ getIdentifierCount(): number;
    /** @internal */ getSymbolCount(): number;
    /** @internal */ getTypeCount(): number;
    /** @internal */ getInstantiationCount(): number;
    /** @internal */ getRelationCacheSizes(): {
        assignable: number;
        identity: number;
        subtype: number;
        strictSubtype: number;
    };
    /** @internal */ getRecursionIdentity(type: Type): object | undefined;
    /** @internal */ getUnmatchedProperties(source: Type, target: Type, requireOptionalProperties: boolean, matchDiscriminantProperties: boolean): IterableIterator<Symbol>;
    /**
     * True if this type is the `Array` or `ReadonlyArray` type from lib.d.ts.
     * This function will _not_ return true if passed a type which
     * extends `Array` (for example, the TypeScript AST's `NodeArray` type).
     */
    isArrayType(type: Type): boolean;
    /**
     * True if this type is a tuple type. This function will _not_ return true if
     * passed a type which extends from a tuple.
     */
    isTupleType(type: Type): boolean;
    /**
     * True if this type is assignable to `ReadonlyArray<any>`.
     */
    isArrayLikeType(type: Type): boolean;
    /**
     * True if `contextualType` should not be considered for completions because
     * e.g. it specifies `kind: "a"` and obj has `kind: "b"`.
     *
     * @internal
     */
    isTypeInvalidDueToUnionDiscriminant(contextualType: Type, obj: ObjectLiteralExpression | JsxAttributes): boolean;
    /** @internal */ getExactOptionalProperties(type: Type): Symbol[];
    /**
     * For a union, will include a property if it's defined in *any* of the member types.
     * So for `{ a } | { b }`, this will include both `a` and `b`.
     * Does not include properties of primitive types.
     *
     * @internal
     */
    getAllPossiblePropertiesOfTypes(type: readonly Type[]): Symbol[];
    resolveName(name: string, location: Node | undefined, meaning: SymbolFlags, excludeGlobals: boolean): Symbol | undefined;
    /** @internal */ getJsxNamespace(location?: Node): string;
    /** @internal */ getJsxFragmentFactory(location: Node): string | undefined;
    /**
     * Note that this will return undefined in the following case:
     *     // a.ts
     *     export namespace N { export class C { } }
     *     // b.ts
     *     <<enclosingDeclaration>>
     * Where `C` is the symbol we're looking for.
     * This should be called in a loop climbing parents of the symbol, so we'll get `N`.
     *
     * @internal
     */
    getAccessibleSymbolChain(symbol: Symbol, enclosingDeclaration: Node | undefined, meaning: SymbolFlags, useOnlyExternalAliasing: boolean): Symbol[] | undefined;
    getTypePredicateOfSignature(signature: Signature): TypePredicate | undefined;
    /** @internal */ resolveExternalModuleName(moduleSpecifier: Expression): Symbol | undefined;
    /**
     * An external module with an 'export =' declaration resolves to the target of the 'export =' declaration,
     * and an external module with no 'export =' declaration resolves to the module itself.
     *
     * @internal
     */
    resolveExternalModuleSymbol(symbol: Symbol): Symbol;
    /**
     * @param node A location where we might consider accessing `this`. Not necessarily a ThisExpression.
     *
     * @internal
     */
    tryGetThisTypeAt(node: Node, includeGlobalThis?: boolean, container?: ThisContainer): Type | undefined;
    /** @internal */ getTypeArgumentConstraint(node: TypeNode): Type | undefined;
    /**
     * Does *not* get *all* suggestion diagnostics, just the ones that were convenient to report in the checker.
     * Others are added in computeSuggestionDiagnostics.
     *
     * @internal
     */
    getSuggestionDiagnostics(file: SourceFile, cancellationToken?: CancellationToken): readonly DiagnosticWithLocation[];
    /**
     * Depending on the operation performed, it may be appropriate to throw away the checker
     * if the cancellation token is triggered. Typically, if it is used for error checking
     * and the operation is cancelled, then it should be discarded, otherwise it is safe to keep.
     */
    runWithCancellationToken<T>(token: CancellationToken, cb: (checker: TypeChecker) => T): T;
    /**@internal */
    runWithCancellationToken<T>(token: CancellationToken | undefined, cb: (checker: TypeChecker) => T): T;
    /** @internal */ getLocalTypeParametersOfClassOrInterfaceOrTypeAlias(symbol: Symbol): readonly TypeParameter[] | undefined;
    /** @internal */ isDeclarationVisible(node: Declaration | AnyImportSyntax): boolean;
    /** @internal */ isPropertyAccessible(node: Node, isSuper: boolean, isWrite: boolean, containingType: Type, property: Symbol): boolean;
    /** @internal */ getTypeOnlyAliasDeclaration(symbol: Symbol): TypeOnlyAliasDeclaration | undefined;
    /** @internal */ getMemberOverrideModifierStatus(node: ClassLikeDeclaration, member: ClassElement, memberSymbol: Symbol): MemberOverrideStatus;
    /** @internal */ isTypeParameterPossiblyReferenced(tp: TypeParameter, node: Node): boolean;
    /** @internal */ typeHasCallOrConstructSignatures(type: Type): boolean;
    /** @internal */ getSymbolFlags(symbol: Symbol): SymbolFlags;
    /** @internal */ fillMissingTypeArguments(typeArguments: readonly Type[], typeParameters: readonly TypeParameter[] | undefined, minTypeArgumentCount: number, isJavaScriptImplicitAny: boolean): Type[];
    getTypeArgumentsForResolvedSignature(signature: Signature): readonly Type[] | undefined;
    /** @internal */ isLibType(type: Type): boolean;
}
/** @internal */
export declare const enum MemberOverrideStatus {
    Ok = 0,
    NeedsOverride = 1,
    HasInvalidOverride = 2
}
/** @internal */
export declare const enum UnionReduction {
    None = 0,
    Literal = 1,
    Subtype = 2
}
/** @internal */
export declare const enum IntersectionFlags {
    None = 0,
    NoSupertypeReduction = 1,
    NoConstraintReduction = 2
}
/** @internal */
export declare const enum ContextFlags {
    None = 0,
    Signature = 1,// Obtaining contextual signature
    NoConstraints = 2,// Don't obtain type variable constraints
    IgnoreNodeInferences = 4,// Ignore inference to current node and parent nodes out to the containing call for, for example, completions
    SkipBindingPatterns = 8
}
export declare const enum NodeBuilderFlags {
    None = 0,
    NoTruncation = 1,// Don't truncate result
    WriteArrayAsGenericType = 2,// Write Array<T> instead T[]
    GenerateNamesForShadowedTypeParams = 4,// When a type parameter T is shadowing another T, generate a name for it so it can still be referenced
    UseStructuralFallback = 8,// When an alias cannot be named by its symbol, rather than report an error, fallback to a structural printout if possible
    ForbidIndexedAccessSymbolReferences = 16,// Forbid references like `I["a"]["b"]` - print `typeof I.a<x>.b<y>` instead
    WriteTypeArgumentsOfSignature = 32,// Write the type arguments instead of type parameters of the signature
    UseFullyQualifiedType = 64,// Write out the fully qualified type name (eg. Module.Type, instead of Type)
    UseOnlyExternalAliasing = 128,// Only use external aliases for a symbol
    SuppressAnyReturnType = 256,// If the return type is any-like and can be elided, don't offer a return type.
    WriteTypeParametersInQualifiedName = 512,
    MultilineObjectLiterals = 1024,// Always write object literals across multiple lines
    WriteClassExpressionAsTypeLiteral = 2048,// Write class {} as { new(): {} } - used for mixin declaration emit
    UseTypeOfFunction = 4096,// Build using typeof instead of function type literal
    OmitParameterModifiers = 8192,// Omit modifiers on parameters
    UseAliasDefinedOutsideCurrentScope = 16384,// Allow non-visible aliases
    UseSingleQuotesForStringLiteralType = 268435456,// Use single quotes for string literal type
    NoTypeReduction = 536870912,// Don't call getReducedType
    OmitThisParameter = 33554432,
    AllowThisInObjectLiteral = 32768,
    AllowQualifiedNameInPlaceOfIdentifier = 65536,
    AllowAnonymousIdentifier = 131072,
    AllowEmptyUnionOrIntersection = 262144,
    AllowEmptyTuple = 524288,
    AllowUniqueESSymbolType = 1048576,
    AllowEmptyIndexInfoType = 2097152,
    AllowNodeModulesRelativePaths = 67108864,
    IgnoreErrors = 70221824,
    InObjectTypeLiteral = 4194304,
    InTypeAlias = 8388608,// Writing type in type alias declaration
    InInitialEntityName = 16777216
}
/** @internal */
export declare const enum InternalNodeBuilderFlags {
    None = 0,
    WriteComputedProps = 1,// { [E.A]: 1 }
    NoSyntacticPrinter = 2,
    DoNotIncludeSymbolChain = 4,// Skip looking up and printing an accessible symbol chain
    AllowUnresolvedNames = 8
}
export declare const enum TypeFormatFlags {
    None = 0,
    NoTruncation = 1,// Don't truncate typeToString result
    WriteArrayAsGenericType = 2,// Write Array<T> instead T[]
    GenerateNamesForShadowedTypeParams = 4,// When a type parameter T is shadowing another T, generate a name for it so it can still be referenced
    UseStructuralFallback = 8,// When an alias cannot be named by its symbol, rather than report an error, fallback to a structural printout if possible
    WriteTypeArgumentsOfSignature = 32,// Write the type arguments instead of type parameters of the signature
    UseFullyQualifiedType = 64,// Write out the fully qualified type name (eg. Module.Type, instead of Type)
    SuppressAnyReturnType = 256,// If the return type is any-like, don't offer a return type.
    MultilineObjectLiterals = 1024,// Always print object literals across multiple lines (only used to map into node builder flags)
    WriteClassExpressionAsTypeLiteral = 2048,// Write a type literal instead of (Anonymous class)
    UseTypeOfFunction = 4096,// Write typeof instead of function type literal
    OmitParameterModifiers = 8192,// Omit modifiers on parameters
    UseAliasDefinedOutsideCurrentScope = 16384,// For a `type T = ... ` defined in a different file, write `T` instead of its value, even though `T` can't be accessed in the current scope.
    UseSingleQuotesForStringLiteralType = 268435456,// Use single quotes for string literal type
    NoTypeReduction = 536870912,// Don't call getReducedType
    OmitThisParameter = 33554432,
    AllowUniqueESSymbolType = 1048576,// This is bit 20 to align with the same bit in `NodeBuilderFlags`
    AddUndefined = 131072,// Add undefined to types of initialized, non-optional parameters
    WriteArrowStyleSignature = 262144,// Write arrow style signature
    InArrayType = 524288,// Writing an array element type
    InElementType = 2097152,// Writing an array or union element type
    InFirstTypeArgument = 4194304,// Writing first type argument of the instantiated type
    InTypeAlias = 8388608,// Writing type in type alias declaration
    NodeBuilderFlagsMask = 848330095
}
export declare const enum SymbolFormatFlags {
    None = 0,
    WriteTypeParametersOrArguments = 1,
    UseOnlyExternalAliasing = 2,
    AllowAnyNodeKind = 4,
    UseAliasDefinedOutsideCurrentScope = 8,
    /** @internal */ WriteComputedProps = 16,
    /** @internal */ DoNotIncludeSymbolChain = 32
}
/** @internal */
export interface SymbolWalker {
    /** Note: Return values are not ordered. */
    walkType(root: Type): {
        visitedTypes: readonly Type[];
        visitedSymbols: readonly Symbol[];
    };
    /** Note: Return values are not ordered. */
    walkSymbol(root: Symbol): {
        visitedTypes: readonly Type[];
        visitedSymbols: readonly Symbol[];
    };
}
/** @internal */
export interface SymbolWriter {
    writeKeyword(text: string): void;
    writeOperator(text: string): void;
    writePunctuation(text: string): void;
    writeSpace(text: string): void;
    writeStringLiteral(text: string): void;
    writeParameter(text: string): void;
    writeProperty(text: string): void;
    writeSymbol(text: string, symbol: Symbol): void;
    writeLine(force?: boolean): void;
    increaseIndent(): void;
    decreaseIndent(): void;
    clear(): void;
}
/** @internal */
export declare const enum SymbolAccessibility {
    Accessible = 0,
    NotAccessible = 1,
    CannotBeNamed = 2,
    NotResolved = 3
}
export declare const enum TypePredicateKind {
    This = 0,
    Identifier = 1,
    AssertsThis = 2,
    AssertsIdentifier = 3
}
export interface TypePredicateBase {
    kind: TypePredicateKind;
    type: Type | undefined;
}
export interface ThisTypePredicate extends TypePredicateBase {
    kind: TypePredicateKind.This;
    parameterName: undefined;
    parameterIndex: undefined;
    type: Type;
}
export interface IdentifierTypePredicate extends TypePredicateBase {
    kind: TypePredicateKind.Identifier;
    parameterName: string;
    parameterIndex: number;
    type: Type;
}
export interface AssertsThisTypePredicate extends TypePredicateBase {
    kind: TypePredicateKind.AssertsThis;
    parameterName: undefined;
    parameterIndex: undefined;
    type: Type | undefined;
}
export interface AssertsIdentifierTypePredicate extends TypePredicateBase {
    kind: TypePredicateKind.AssertsIdentifier;
    parameterName: string;
    parameterIndex: number;
    type: Type | undefined;
}
export type TypePredicate = ThisTypePredicate | IdentifierTypePredicate | AssertsThisTypePredicate | AssertsIdentifierTypePredicate;
/** @internal */
export type AnyImportSyntax = ImportDeclaration | ImportEqualsDeclaration;
/** @internal */
export type AnyImportOrJsDocImport = AnyImportSyntax | JSDocImportTag;
/** @internal */
export type AnyImportOrRequire = AnyImportOrJsDocImport | VariableDeclarationInitializedTo<RequireOrImportCall>;
/** @internal */
export type AnyImportOrBareOrAccessedRequire = AnyImportSyntax | VariableDeclarationInitializedTo<RequireOrImportCall | AccessExpression>;
/** @internal */
export type AliasDeclarationNode = ImportEqualsDeclaration | VariableDeclarationInitializedTo<RequireOrImportCall | AccessExpression> | ImportClause | NamespaceImport | ImportSpecifier | ExportSpecifier | NamespaceExport | BindingElementOfBareOrAccessedRequire;
/** @internal */
export type BindingElementOfBareOrAccessedRequire = BindingElement & {
    parent: {
        parent: VariableDeclarationInitializedTo<RequireOrImportCall | AccessExpression>;
    };
};
/** @internal */
export type AnyImportOrRequireStatement = AnyImportSyntax | RequireVariableStatement;
/** @internal */
export type AnyImportOrReExport = AnyImportSyntax | ExportDeclaration;
/** @internal */
export interface ValidImportTypeNode extends ImportTypeNode {
    argument: LiteralTypeNode & {
        literal: StringLiteral;
    };
}
/** @internal */
export type AnyValidImportOrReExport = (ImportDeclaration | ExportDeclaration | JSDocImportTag) & {
    moduleSpecifier: StringLiteral;
} | ImportEqualsDeclaration & {
    moduleReference: ExternalModuleReference & {
        expression: StringLiteral;
    };
} | RequireOrImportCall | ValidImportTypeNode;
/** @internal */
export type RequireOrImportCall = CallExpression & {
    expression: Identifier;
    arguments: [StringLiteralLike];
};
/** @internal */
export interface VariableDeclarationInitializedTo<T extends Expression> extends VariableDeclaration {
    readonly initializer: T;
}
/** @internal */
export interface RequireVariableStatement extends VariableStatement {
    readonly declarationList: RequireVariableDeclarationList;
}
/** @internal */
export interface RequireVariableDeclarationList extends VariableDeclarationList {
    readonly declarations: NodeArray<VariableDeclarationInitializedTo<RequireOrImportCall>>;
}
/** @internal */
export type CanHaveModuleSpecifier = AnyImportOrBareOrAccessedRequire | AliasDeclarationNode | ExportDeclaration | ImportTypeNode;
/** @internal */
export type LateVisibilityPaintedStatement = AnyImportOrJsDocImport | VariableStatement | ClassDeclaration | FunctionDeclaration | ModuleDeclaration | TypeAliasDeclaration | InterfaceDeclaration | EnumDeclaration;
/** @internal */
export interface SymbolVisibilityResult {
    accessibility: SymbolAccessibility;
    aliasesToMakeVisible?: LateVisibilityPaintedStatement[];
    errorSymbolName?: string;
    errorNode?: Node;
}
/** @internal */
export interface SymbolAccessibilityResult extends SymbolVisibilityResult {
    errorModuleName?: string;
}
/** @internal */
export interface AllAccessorDeclarations {
    firstAccessor: AccessorDeclaration;
    secondAccessor: AccessorDeclaration | undefined;
    getAccessor: GetAccessorDeclaration | undefined;
    setAccessor: SetAccessorDeclaration | undefined;
}
/** @internal */
export interface AllDecorators {
    decorators: readonly Decorator[] | undefined;
    parameters?: readonly (readonly Decorator[] | undefined)[];
    getDecorators?: readonly Decorator[] | undefined;
    setDecorators?: readonly Decorator[] | undefined;
}
/**
 * Indicates how to serialize the name for a TypeReferenceNode when emitting decorator metadata
 *
 * @internal
 */
export declare enum TypeReferenceSerializationKind {
    Unknown = 0,
    TypeWithConstructSignatureAndValue = 1,
    VoidNullableOrNeverType = 2,
    NumberLikeType = 3,
    BigIntLikeType = 4,
    StringLikeType = 5,
    BooleanType = 6,
    ArrayLikeType = 7,
    ESSymbolType = 8,
    Promise = 9,
    TypeWithCallSignature = 10,
    ObjectType = 11
}
/** @internal */
export type LazyNodeCheckFlags = NodeCheckFlags.SuperInstance | NodeCheckFlags.SuperStatic | NodeCheckFlags.MethodWithSuperPropertyAccessInAsync | NodeCheckFlags.MethodWithSuperPropertyAssignmentInAsync | NodeCheckFlags.ContainsSuperPropertyInStaticInitializer | NodeCheckFlags.CaptureArguments | NodeCheckFlags.ContainsCapturedBlockScopeBinding | NodeCheckFlags.NeedsLoopOutParameter | NodeCheckFlags.ContainsConstructorReference | NodeCheckFlags.ConstructorReference | NodeCheckFlags.CapturedBlockScopedBinding | NodeCheckFlags.BlockScopedBindingInLoop | NodeCheckFlags.LoopWithCapturedBlockScopedBinding;
/** @internal */
export interface EmitResolver {
    hasGlobalName(name: string): boolean;
    getReferencedExportContainer(node: Identifier, prefixLocals?: boolean): SourceFile | ModuleDeclaration | EnumDeclaration | undefined;
    getReferencedImportDeclaration(node: Identifier): Declaration | undefined;
    getReferencedDeclarationWithCollidingName(node: Identifier): Declaration | undefined;
    isDeclarationWithCollidingName(node: Declaration): boolean;
    isValueAliasDeclaration(node: Node): boolean;
    isReferencedAliasDeclaration(node: Node, checkChildren?: boolean): boolean;
    isTopLevelValueImportEqualsWithEntityName(node: ImportEqualsDeclaration): boolean;
    hasNodeCheckFlag(node: Node, flags: LazyNodeCheckFlags): boolean;
    isDeclarationVisible(node: Declaration | AnyImportSyntax): boolean;
    isLateBound(node: Declaration): node is LateBoundDeclaration;
    collectLinkedAliases(node: ModuleExportName, setVisibility?: boolean): Node[] | undefined;
    markLinkedReferences(node: Node): void;
    isImplementationOfOverload(node: SignatureDeclaration): boolean | undefined;
    requiresAddingImplicitUndefined(node: ParameterDeclaration, enclosingDeclaration: Node | undefined): boolean;
    isExpandoFunctionDeclaration(node: FunctionDeclaration | VariableDeclaration): boolean;
    getPropertiesOfContainerFunction(node: Declaration): Symbol[];
    createTypeOfDeclaration(declaration: HasInferredType, enclosingDeclaration: Node, flags: NodeBuilderFlags, internalFlags: InternalNodeBuilderFlags, tracker: SymbolTracker): TypeNode | undefined;
    createReturnTypeOfSignatureDeclaration(signatureDeclaration: SignatureDeclaration, enclosingDeclaration: Node, flags: NodeBuilderFlags, internalFlags: InternalNodeBuilderFlags, tracker: SymbolTracker): TypeNode | undefined;
    createTypeOfExpression(expr: Expression, enclosingDeclaration: Node, flags: NodeBuilderFlags, internalFlags: InternalNodeBuilderFlags, tracker: SymbolTracker): TypeNode | undefined;
    createLiteralConstValue(node: VariableDeclaration | PropertyDeclaration | PropertySignature | ParameterDeclaration, tracker: SymbolTracker): Expression;
    isSymbolAccessible(symbol: Symbol, enclosingDeclaration: Node | undefined, meaning: SymbolFlags | undefined, shouldComputeAliasToMarkVisible: boolean): SymbolAccessibilityResult;
    isEntityNameVisible(entityName: EntityNameOrEntityNameExpression, enclosingDeclaration: Node): SymbolVisibilityResult;
    getConstantValue(node: EnumMember | PropertyAccessExpression | ElementAccessExpression): string | number | undefined;
    getEnumMemberValue(node: EnumMember): EvaluatorResult | undefined;
    getReferencedValueDeclaration(reference: Identifier): Declaration | undefined;
    getReferencedValueDeclarations(reference: Identifier): Declaration[] | undefined;
    getTypeReferenceSerializationKind(typeName: EntityName, location?: Node): TypeReferenceSerializationKind;
    isOptionalParameter(node: ParameterDeclaration): boolean;
    isArgumentsLocalBinding(node: Identifier): boolean;
    getExternalModuleFileFromDeclaration(declaration: ImportEqualsDeclaration | ImportDeclaration | ExportDeclaration | ModuleDeclaration | ImportTypeNode | ImportCall): SourceFile | undefined;
    isLiteralConstDeclaration(node: VariableDeclaration | PropertyDeclaration | PropertySignature | ParameterDeclaration): boolean;
    getJsxFactoryEntity(location?: Node): EntityName | undefined;
    getJsxFragmentFactoryEntity(location?: Node): EntityName | undefined;
    isBindingCapturedByNode(node: Node, decl: VariableDeclaration | BindingElement): boolean;
    getDeclarationStatementsForSourceFile(node: SourceFile, flags: NodeBuilderFlags, internalFlags: InternalNodeBuilderFlags, tracker: SymbolTracker): Statement[] | undefined;
    isImportRequiredByAugmentation(decl: ImportDeclaration): boolean;
    isDefinitelyReferenceToGlobalSymbolObject(node: Node): boolean;
    createLateBoundIndexSignatures(cls: ClassLikeDeclaration, enclosingDeclaration: Node, flags: NodeBuilderFlags, internalFlags: InternalNodeBuilderFlags, tracker: SymbolTracker): (IndexSignatureDeclaration | PropertyDeclaration)[] | undefined;
    symbolToDeclarations(symbol: Symbol, meaning: SymbolFlags, flags: NodeBuilderFlags, maximumLength?: number, verbosityLevel?: number, out?: WriterContextOut): Declaration[];
}
export declare const enum SymbolFlags {
    None = 0,
    FunctionScopedVariable = 1,// Variable (var) or parameter
    BlockScopedVariable = 2,// A block-scoped variable (let or const)
    Property = 4,// Property or enum member
    EnumMember = 8,// Enum member
    Function = 16,// Function
    Class = 32,// Class
    Interface = 64,// Interface
    ConstEnum = 128,// Const enum
    RegularEnum = 256,// Enum
    ValueModule = 512,// Instantiated module
    NamespaceModule = 1024,// Uninstantiated module
    TypeLiteral = 2048,// Type Literal or mapped type
    ObjectLiteral = 4096,// Object Literal
    Method = 8192,// Method
    Constructor = 16384,// Constructor
    GetAccessor = 32768,// Get accessor
    SetAccessor = 65536,// Set accessor
    Signature = 131072,// Call, construct, or index signature
    TypeParameter = 262144,// Type parameter
    TypeAlias = 524288,// Type alias
    ExportValue = 1048576,// Exported value marker (see comment in declareModuleMember in binder)
    Alias = 2097152,// An alias for another symbol (see comment in isAliasSymbolDeclaration in checker)
    Prototype = 4194304,// Prototype property (no source representation)
    ExportStar = 8388608,// Export * declaration
    Optional = 16777216,// Optional property
    Transient = 33554432,// Transient symbol (created during type check)
    Assignment = 67108864,// Assignment treated as declaration (eg `this.prop = 1`)
    ModuleExports = 134217728,// Symbol for CommonJS `module` of `module.exports`
    All = -1,
    Enum = 384,
    Variable = 3,
    Value = 111551,
    Type = 788968,
    Namespace = 1920,
    Module = 1536,
    Accessor = 98304,
    FunctionScopedVariableExcludes = 111550,
    BlockScopedVariableExcludes = 111551,
    ParameterExcludes = 111551,
    PropertyExcludes = 0,
    EnumMemberExcludes = 900095,
    FunctionExcludes = 110991,
    ClassExcludes = 899503,// class-interface mergability done in checker.ts
    InterfaceExcludes = 788872,
    RegularEnumExcludes = 899327,// regular enums merge only with regular enums and modules
    ConstEnumExcludes = 899967,// const enums merge only with const enums
    ValueModuleExcludes = 110735,
    NamespaceModuleExcludes = 0,
    MethodExcludes = 103359,
    GetAccessorExcludes = 46015,
    SetAccessorExcludes = 78783,
    AccessorExcludes = 13247,
    TypeParameterExcludes = 526824,
    TypeAliasExcludes = 788968,
    AliasExcludes = 2097152,
    ModuleMember = 2623475,
    ExportHasLocal = 944,
    BlockScoped = 418,
    PropertyOrAccessor = 98308,
    ClassMember = 106500,
    /** @internal */
    ExportSupportsDefaultModifier = 112,
    /** @internal */
    ExportDoesNotSupportDefaultModifier = -113,
    /** @internal */
    Classifiable = 2885600,
    /** @internal */
    LateBindingContainer = 6256
}
/** @internal */
export type SymbolId = number;
export interface Symbol {
    flags: SymbolFlags;
    escapedName: __String;
    declarations?: Declaration[];
    valueDeclaration?: Declaration;
    members?: SymbolTable;
    exports?: SymbolTable;
    globalExports?: SymbolTable;
    /** @internal */ id: SymbolId;
    /** @internal */ mergeId: number;
    /** @internal */ parent?: Symbol;
    /** @internal */ exportSymbol?: Symbol;
    /** @internal */ constEnumOnlyModule: boolean | undefined;
    /** @internal */ isReferenced?: SymbolFlags;
    /** @internal */ lastAssignmentPos?: number;
    /** @internal */ isReplaceableByMethod?: boolean;
    /** @internal */ assignmentDeclarationMembers?: Map<number, Declaration>;
}
/** @internal */
export interface SymbolLinks {
    _symbolLinksBrand: any;
    immediateTarget?: Symbol;
    aliasTarget?: Symbol;
    target?: Symbol;
    type?: Type;
    writeType?: Type;
    nameType?: Type;
    uniqueESSymbolType?: Type;
    declaredType?: Type;
    typeParameters?: TypeParameter[];
    instantiations?: Map<string, Type>;
    inferredClassSymbol?: Map<SymbolId, TransientSymbol>;
    mapper?: TypeMapper;
    referenced?: boolean;
    containingType?: UnionOrIntersectionType;
    leftSpread?: Symbol;
    rightSpread?: Symbol;
    syntheticOrigin?: Symbol;
    isDiscriminantProperty?: boolean;
    resolvedExports?: SymbolTable;
    resolvedMembers?: SymbolTable;
    exportsChecked?: boolean;
    typeParametersChecked?: boolean;
    isDeclarationWithCollidingName?: boolean;
    originatingImport?: ImportDeclaration | ImportCall;
    lateSymbol?: Symbol;
    specifierCache?: Map<ModeAwareCacheKey, string>;
    extendedContainers?: Symbol[];
    extendedContainersByFile?: Map<NodeId, Symbol[]>;
    variances?: VarianceFlags[];
    deferralConstituents?: Type[];
    deferralWriteConstituents?: Type[];
    deferralParent?: Type;
    cjsExportMerged?: Symbol;
    typeOnlyDeclaration?: TypeOnlyAliasDeclaration | false;
    typeOnlyExportStarMap?: Map<__String, ExportDeclaration & {
        readonly isTypeOnly: true;
        readonly moduleSpecifier: Expression;
    }>;
    typeOnlyExportStarName?: __String;
    isConstructorDeclaredProperty?: boolean;
    tupleLabelDeclaration?: NamedTupleMember | ParameterDeclaration;
    accessibleChainCache?: Map<string, Symbol[] | undefined>;
    filteredIndexSymbolCache?: Map<string, Symbol>;
    requestedExternalEmitHelpers?: ExternalEmitHelpers;
}
/** @internal */
export declare const enum CheckFlags {
    None = 0,
    Instantiated = 1,// Instantiated symbol
    SyntheticProperty = 2,// Property in union or intersection type
    SyntheticMethod = 4,// Method in union or intersection type
    Readonly = 8,// Readonly transient symbol
    ReadPartial = 16,// Synthetic property present in some but not all constituents
    WritePartial = 32,// Synthetic property present in some but only satisfied by an index signature in others
    HasNonUniformType = 64,// Synthetic property with non-uniform type in constituents
    HasLiteralType = 128,// Synthetic property with at least one literal type in constituents
    ContainsPublic = 256,// Synthetic property with public constituent(s)
    ContainsProtected = 512,// Synthetic property with protected constituent(s)
    ContainsPrivate = 1024,// Synthetic property with private constituent(s)
    ContainsStatic = 2048,// Synthetic property with static constituent(s)
    Late = 4096,// Late-bound symbol for a computed property with a dynamic name
    ReverseMapped = 8192,// Property of reverse-inferred homomorphic mapped type
    OptionalParameter = 16384,// Optional parameter
    RestParameter = 32768,// Rest parameter
    DeferredType = 65536,// Calculation of the type of this symbol is deferred due to processing costs, should be fetched with `getTypeOfSymbolWithDeferredType`
    HasNeverType = 131072,// Synthetic property with at least one never type in constituents
    Mapped = 262144,// Property of mapped type
    StripOptional = 524288,// Strip optionality in mapped property
    Unresolved = 1048576,// Unresolved type alias symbol
    Synthetic = 6,
    Discriminant = 192,
    Partial = 48
}
/** @internal */
export interface TransientSymbolLinks extends SymbolLinks {
    checkFlags: CheckFlags;
}
/** @internal */
export interface TransientSymbol extends Symbol {
    links: TransientSymbolLinks;
}
/** @internal */
export interface MappedSymbolLinks extends TransientSymbolLinks {
    mappedType: MappedType;
    keyType: Type;
}
/** @internal */
export interface MappedSymbol extends TransientSymbol {
    links: MappedSymbolLinks;
}
/** @internal */
export interface ReverseMappedSymbolLinks extends TransientSymbolLinks {
    propertyType: Type;
    mappedType: MappedType;
    constraintType: IndexType;
}
/** @internal */
export interface ReverseMappedSymbol extends TransientSymbol {
    links: ReverseMappedSymbolLinks;
}
export declare const enum InternalSymbolName {
    Call = "__call",// Call signatures
    Constructor = "__constructor",// Constructor implementations
    New = "__new",// Constructor signatures
    Index = "__index",// Index signatures
    ExportStar = "__export",// Module export * declarations
    Global = "__global",// Global self-reference
    Missing = "__missing",// Indicates missing symbol
    Type = "__type",// Anonymous type literal symbol
    Object = "__object",// Anonymous object literal declaration
    JSXAttributes = "__jsxAttributes",// Anonymous JSX attributes object literal declaration
    Class = "__class",// Unnamed class expression
    Function = "__function",// Unnamed function expression
    Computed = "__computed",// Computed property name declaration with dynamic name
    Resolving = "__resolving__",// Indicator symbol used to mark partially resolved type aliases
    ExportEquals = "export=",// Export assignment symbol
    Default = "default",// Default export symbol (technically not wholly internal, but included here for usability)
    This = "this",
    InstantiationExpression = "__instantiationExpression",// Instantiation expressions
    ImportAttributes = "__importAttributes"
}
/**
 * This represents a string whose leading underscore have been escaped by adding extra leading underscores.
 * The shape of this brand is rather unique compared to others we've used.
 * Instead of just an intersection of a string and an object, it is that union-ed
 * with an intersection of void and an object. This makes it wholly incompatible
 * with a normal string (which is good, it cannot be misused on assignment or on usage),
 * while still being comparable with a normal string via === (also good) and castable from a string.
 */
export type __String = (string & {
    __escapedIdentifier: void;
}) | (void & {
    __escapedIdentifier: void;
}) | InternalSymbolName;
/** @deprecated Use ReadonlyMap<__String, T> instead. */
export type ReadonlyUnderscoreEscapedMap<T> = ReadonlyMap<__String, T>;
/** @deprecated Use Map<__String, T> instead. */
export type UnderscoreEscapedMap<T> = Map<__String, T>;
/** SymbolTable based on ES6 Map interface. */
export type SymbolTable = Map<__String, Symbol>;
/**
 * Used to track a `declare module "foo*"`-like declaration.
 *
 * @internal
 */
export interface PatternAmbientModule {
    pattern: Pattern;
    symbol: Symbol;
}
/** @internal */
export declare const enum NodeCheckFlags {
    None = 0,
    TypeChecked = 1,// Node has been type checked
    LexicalThis = 2,// Lexical 'this' reference
    CaptureThis = 4,// Lexical 'this' used in body
    CaptureNewTarget = 8,// Lexical 'new.target' used in body
    SuperInstance = 16,// Instance 'super' reference
    SuperStatic = 32,// Static 'super' reference
    ContextChecked = 64,// Contextual types have been assigned
    MethodWithSuperPropertyAccessInAsync = 128,// A method that contains a SuperProperty access in an async context.
    MethodWithSuperPropertyAssignmentInAsync = 256,// A method that contains a SuperProperty assignment in an async context.
    CaptureArguments = 512,// Lexical 'arguments' used in body
    EnumValuesComputed = 1024,// Values for enum members have been computed, and any errors have been reported for them.
    LexicalModuleMergesWithClass = 2048,// Instantiated lexical module declaration is merged with a previous class declaration.
    LoopWithCapturedBlockScopedBinding = 4096,// Loop that contains block scoped variable captured in closure
    ContainsCapturedBlockScopeBinding = 8192,// Part of a loop that contains block scoped variable captured in closure
    CapturedBlockScopedBinding = 16384,// Block-scoped binding that is captured in some function
    BlockScopedBindingInLoop = 32768,// Block-scoped binding with declaration nested inside iteration statement
    NeedsLoopOutParameter = 65536,// Block scoped binding whose value should be explicitly copied outside of the converted loop
    AssignmentsMarked = 131072,// Parameter assignments have been marked
    ContainsConstructorReference = 262144,// Class or class element that contains a binding that references the class constructor.
    ConstructorReference = 536870912,// Binding to a class constructor inside of the class's body.
    ContainsClassWithPrivateIdentifiers = 1048576,// Marked on all block-scoped containers containing a class with private identifiers.
    ContainsSuperPropertyInStaticInitializer = 2097152,// Marked on all block-scoped containers containing a static initializer with 'super.x' or 'super[x]'.
    InCheckIdentifier = 4194304,
    PartiallyTypeChecked = 8388608,// Node has been partially type checked
    /** These flags are LazyNodeCheckFlags and can be calculated lazily by `hasNodeCheckFlag` */
    LazyFlags = 539358128
}
/** @internal */
export interface EvaluatorResult<T extends string | number | undefined = string | number | undefined> {
    value: T;
    isSyntacticallyString: boolean;
    resolvedOtherFiles: boolean;
    hasExternalReferences: boolean;
}
/** @internal */
export interface NodeLinks {
    flags: NodeCheckFlags;
    calculatedFlags: NodeCheckFlags;
    resolvedType?: Type;
    resolvedSignature?: Signature;
    resolvedSymbol?: Symbol;
    effectsSignature?: Signature;
    enumMemberValue?: EvaluatorResult;
    isVisible?: boolean;
    containsArgumentsReference?: boolean;
    hasReportedStatementInAmbientContext?: boolean;
    jsxFlags: JsxFlags;
    resolvedJsxElementAttributesType?: Type;
    resolvedJSDocType?: Type;
    switchTypes?: Type[];
    jsxNamespace?: Symbol | false;
    jsxImplicitImportContainer?: Symbol | false;
    jsxFragmentType?: Type;
    contextFreeType?: Type;
    deferredNodes?: Set<Node>;
    capturedBlockScopeBindings?: Symbol[];
    outerTypeParameters?: TypeParameter[];
    isExhaustive?: boolean | 0;
    skipDirectInference?: true;
    declarationRequiresScopeChange?: boolean;
    serializedTypes?: Map<string, SerializedTypeEntry>;
    decoratorSignature?: Signature;
    spreadIndices?: {
        first: number | undefined;
        last: number | undefined;
    };
    parameterInitializerContainsUndefined?: boolean;
    fakeScopeForSignatureDeclaration?: "params" | "typeParams";
    assertionExpressionType?: Type;
    potentialThisCollisions?: Node[];
    potentialNewTargetCollisions?: Node[];
    potentialWeakMapSetCollisions?: Node[];
    potentialReflectCollisions?: Node[];
    potentialUnusedRenamedBindingElementsInTypes?: BindingElement[];
    externalHelpersModule?: Symbol;
    instantiationExpressionTypes?: Map<number, Type>;
    nonExistentPropCheckCache?: Set<string>;
}
/** @internal */
export type TrackedSymbol = [symbol: Symbol, enclosingDeclaration: Node | undefined, meaning: SymbolFlags];
/** @internal */
export interface SerializedTypeEntry {
    node: TypeNode;
    truncating?: boolean;
    addedLength: number;
    trackedSymbols: readonly TrackedSymbol[] | undefined;
}
export declare const enum TypeFlags {
    Any = 1,
    Unknown = 2,
    Undefined = 4,
    Null = 8,
    Void = 16,
    String = 32,
    Number = 64,
    BigInt = 128,
    Boolean = 256,
    ESSymbol = 512,// Type of symbol primitive introduced in ES6
    StringLiteral = 1024,
    NumberLiteral = 2048,
    BigIntLiteral = 4096,
    BooleanLiteral = 8192,
    UniqueESSymbol = 16384,// unique symbol
    EnumLiteral = 32768,// Always combined with StringLiteral, NumberLiteral, or Union
    Enum = 65536,// Numeric computed enum member value (must be right after EnumLiteral, see getSortOrderFlags)
    NonPrimitive = 131072,// intrinsic object type
    Never = 262144,// Never type
    TypeParameter = 524288,// Type parameter
    Object = 1048576,// Object type
    Index = 2097152,// keyof T
    TemplateLiteral = 4194304,// Template literal type
    StringMapping = 8388608,// Uppercase/Lowercase type
    Substitution = 16777216,// Type parameter substitution
    IndexedAccess = 33554432,// T[K]
    Conditional = 67108864,// T extends U ? X : Y
    Union = 134217728,// Union (T | U)
    Intersection = 268435456,// Intersection (T & U)
    /** @internal */
    Reserved1 = 536870912,// Used by union/intersection type construction
    /** @internal */
    Reserved2 = 1073741824,// Used by union/intersection type construction
    /** @internal */
    Reserved3 = -2147483648,
    /** @internal */
    AnyOrUnknown = 3,
    /** @internal */
    Nullable = 12,
    Literal = 15360,
    Unit = 97292,
    Freshable = 80896,
    StringOrNumberLiteral = 3072,
    /** @internal */
    StringOrNumberLiteralOrUnique = 19456,
    /** @internal */
    DefinitelyFalsy = 15388,
    PossiblyFalsy = 15868,
    /** @internal */
    Intrinsic = 402431,
    StringLike = 12583968,
    NumberLike = 67648,
    BigIntLike = 4224,
    BooleanLike = 8448,
    EnumLike = 98304,
    ESSymbolLike = 16896,
    VoidLike = 20,
    /** @internal */
    Primitive = 12713980,
    /** @internal */
    DefinitelyNonNullable = 13893600,
    /** @internal */
    DisjointDomains = 12812284,
    UnionOrIntersection = 402653184,
    StructuredType = 403701760,
    TypeVariable = 34078720,
    InstantiableNonPrimitive = 117964800,
    InstantiablePrimitive = 14680064,
    Instantiable = 132644864,
    StructuredOrInstantiable = 536346624,
    /** @internal */
    ObjectFlagsType = 403963917,
    /** @internal */
    Simplifiable = 102760448,
    /** @internal */
    Singleton = 394239,
    Narrowable = 536575971,
    /** @internal */
    IncludesMask = 416808959,
    /** @internal */
    IncludesMissingType = 524288,
    /** @internal */
    IncludesNonWideningType = 2097152,
    /** @internal */
    IncludesWildcard = 33554432,
    /** @internal */
    IncludesEmptyObject = 67108864,
    /** @internal */
    IncludesInstantiable = 16777216,
    /** @internal */
    IncludesConstrainedTypeVariable = 536870912,
    /** @internal */
    IncludesError = 1073741824,
    /** @internal */
    NotPrimitiveUnion = 286523411
}
export type DestructuringPattern = BindingPattern | ObjectLiteralExpression | ArrayLiteralExpression;
/** @internal */
export type TypeId = number;
export interface Type {
    flags: TypeFlags;
    /** @internal */ id: TypeId;
    /** @internal */ checker: TypeChecker;
    symbol: Symbol;
    pattern?: DestructuringPattern;
    aliasSymbol?: Symbol;
    aliasTypeArguments?: readonly Type[];
    /** @internal */
    permissiveInstantiation?: Type;
    /** @internal */
    restrictiveInstantiation?: Type;
    /** @internal */
    immediateBaseConstraint?: Type;
    /** @internal */
    widened?: Type;
}
/** @internal */
export interface IntrinsicType extends Type {
    intrinsicName: string;
    debugIntrinsicName: string | undefined;
    objectFlags: ObjectFlags;
}
/** @internal */
export interface NullableType extends IntrinsicType {
    objectFlags: ObjectFlags;
}
export interface FreshableType extends Type {
    freshType: FreshableType;
    regularType: FreshableType;
}
/** @internal */
export interface FreshableIntrinsicType extends FreshableType, IntrinsicType {
}
export interface LiteralType extends FreshableType {
    value: string | number | PseudoBigInt;
}
export interface UniqueESSymbolType extends Type {
    symbol: Symbol;
    escapedName: __String;
}
export interface StringLiteralType extends LiteralType {
    value: string;
}
export interface NumberLiteralType extends LiteralType {
    value: number;
}
export interface BigIntLiteralType extends LiteralType {
    value: PseudoBigInt;
}
export interface EnumType extends FreshableType {
}
export declare const enum ObjectFlags {
    None = 0,
    Class = 1,// Class
    Interface = 2,// Interface
    Reference = 4,// Generic type reference
    Tuple = 8,// Synthesized generic tuple type
    Anonymous = 16,// Anonymous
    Mapped = 32,// Mapped
    Instantiated = 64,// Instantiated anonymous or mapped type
    ObjectLiteral = 128,// Originates in an object literal
    EvolvingArray = 256,// Evolving array type
    ObjectLiteralPatternWithComputedProperties = 512,// Object literal pattern with computed properties
    ReverseMapped = 1024,// Object contains a property from a reverse-mapped type
    JsxAttributes = 2048,// Jsx attributes type
    JSLiteral = 4096,// Object type declared in JS - disables errors on read/write of nonexisting members
    FreshLiteral = 8192,// Fresh object literal
    ArrayLiteral = 16384,// Originates in an array literal
    /** @internal */
    PrimitiveUnion = 32768,// Union of only primitive types
    /** @internal */
    ContainsWideningType = 65536,// Type is or contains undefined or null widening type
    /** @internal */
    ContainsObjectOrArrayLiteral = 131072,// Type is or contains object literal type
    /** @internal */
    NonInferrableType = 262144,// Type is or contains anyFunctionType or silentNeverType, or it's a context free `returnTypeOnly`
    /** @internal */
    CouldContainTypeVariablesComputed = 524288,// CouldContainTypeVariables flag has been computed
    /** @internal */
    CouldContainTypeVariables = 1048576,// Type could contain a type variable
    SingleSignatureType = 134217728,// A single signature type extracted from a potentially broader type
    ClassOrInterface = 3,
    /** @internal */
    RequiresWidening = 196608,
    /** @internal */
    PropagatingFlags = 458752,
    /** @internal */
    InstantiatedMapped = 96,
    ContainsSpread = 2097152,// Object literal contains spread operation
    ObjectRestType = 4194304,// Originates in object rest declaration
    InstantiationExpressionType = 8388608,// Originates in instantiation expression
    /** @internal */
    ObjectTypeKindMask = 142607679,
    /** @internal */
    IsClassInstanceClone = 16777216,// Type is a clone of a class instance type
    /** @internal */
    IdenticalBaseTypeCalculated = 33554432,// has had `getSingleBaseForNonAugmentingSubtype` invoked on it already
    /** @internal */
    IdenticalBaseTypeExists = 67108864,// has a defined cachedEquivalentBaseType member
    /** @internal */
    IsGenericTypeComputed = 2097152,// IsGenericObjectType flag has been computed
    /** @internal */
    IsGenericObjectType = 4194304,// Union or intersection contains generic object type
    /** @internal */
    IsGenericIndexType = 8388608,// Union or intersection contains generic index type
    /** @internal */
    IsGenericType = 12582912,
    /** @internal */
    ContainsIntersections = 16777216,// Union contains intersections
    /** @internal */
    IsUnknownLikeUnionComputed = 33554432,// IsUnknownLikeUnion flag has been computed
    /** @internal */
    IsUnknownLikeUnion = 67108864,// Union of null, undefined, and empty object type
    /** @internal */
    /** @internal */
    IsNeverIntersectionComputed = 16777216,// IsNeverLike flag has been computed
    /** @internal */
    IsNeverIntersection = 33554432,// Intersection reduces to never
    /** @internal */
    IsConstrainedTypeVariable = 67108864
}
/** @internal */
export type ObjectFlagsType = NullableType | ObjectType | UnionType | IntersectionType;
export interface ObjectType extends Type {
    objectFlags: ObjectFlags;
    /** @internal */ members?: SymbolTable;
    /** @internal */ properties?: Symbol[];
    /** @internal */ callSignatures?: readonly Signature[];
    /** @internal */ constructSignatures?: readonly Signature[];
    /** @internal */ indexInfos?: readonly IndexInfo[];
    /** @internal */ objectTypeWithoutAbstractConstructSignatures?: ObjectType;
}
/** Class and interface types (ObjectFlags.Class and ObjectFlags.Interface). */
export interface InterfaceType extends ObjectType {
    typeParameters: TypeParameter[] | undefined;
    outerTypeParameters: TypeParameter[] | undefined;
    localTypeParameters: TypeParameter[] | undefined;
    thisType: TypeParameter | undefined;
    /** @internal */
    resolvedBaseConstructorType?: Type;
    /** @internal */
    resolvedBaseTypes: BaseType[];
    /** @internal */
    baseTypesResolved?: boolean;
}
export type BaseType = ObjectType | IntersectionType | TypeVariable;
export interface InterfaceTypeWithDeclaredMembers extends InterfaceType {
    declaredProperties: Symbol[];
    declaredCallSignatures: Signature[];
    declaredConstructSignatures: Signature[];
    declaredIndexInfos: IndexInfo[];
}
/**
 * Type references (ObjectFlags.Reference). When a class or interface has type parameters or
 * a "this" type, references to the class or interface are made using type references. The
 * typeArguments property specifies the types to substitute for the type parameters of the
 * class or interface and optionally includes an extra element that specifies the type to
 * substitute for "this" in the resulting instantiation. When no extra argument is present,
 * the type reference itself is substituted for "this". The typeArguments property is undefined
 * if the class or interface has no type parameters and the reference isn't specifying an
 * explicit "this" argument.
 */
export interface TypeReference extends ObjectType {
    target: GenericType;
    node?: TypeReferenceNode | ArrayTypeNode | TupleTypeNode;
    /** @internal */
    mapper?: TypeMapper;
    /** @internal */
    resolvedTypeArguments?: readonly Type[];
    /** @internal */
    literalType?: TypeReference;
    /** @internal */
    cachedEquivalentBaseType?: Type;
}
export interface DeferredTypeReference extends TypeReference {
    /** @internal */
    node: TypeReferenceNode | ArrayTypeNode | TupleTypeNode;
    /** @internal */
    mapper?: TypeMapper;
    /** @internal */
    instantiations?: Map<string, Type>;
}
/** @internal */
export declare const enum VarianceFlags {
    Invariant = 0,// Neither covariant nor contravariant
    Covariant = 1,// Covariant
    Contravariant = 2,// Contravariant
    Bivariant = 3,// Both covariant and contravariant
    Independent = 4,// Unwitnessed type parameter
    VarianceMask = 7,// Mask containing all measured variances without the unmeasurable flag
    Unmeasurable = 8,// Variance result is unusable - relationship relies on structural comparisons which are not reflected in generic relationships
    Unreliable = 16,// Variance result is unreliable - checking may produce false negatives, but not false positives
    AllowsStructuralFallback = 24
}
export interface GenericType extends InterfaceType, TypeReference {
    /** @internal */
    instantiations: Map<string, TypeReference>;
    /** @internal */
    variances?: VarianceFlags[];
}
export declare const enum ElementFlags {
    Required = 1,// T
    Optional = 2,// T?
    Rest = 4,// ...T[]
    Variadic = 8,// ...T
    Fixed = 3,
    Variable = 12,
    NonRequired = 14,
    NonRest = 11
}
export interface TupleType extends GenericType {
    elementFlags: readonly ElementFlags[];
    /** Number of required or variadic elements */
    minLength: number;
    /** Number of initial required or optional elements */
    fixedLength: number;
    /**
     * True if tuple has any rest or variadic elements
     *
     * @deprecated Use `.combinedFlags & ElementFlags.Variable` instead
     */
    hasRestElement: boolean;
    combinedFlags: ElementFlags;
    readonly: boolean;
    labeledElementDeclarations?: readonly (NamedTupleMember | ParameterDeclaration | undefined)[];
}
export interface TupleTypeReference extends TypeReference {
    target: TupleType;
}
export interface UnionOrIntersectionType extends Type {
    types: Type[];
    /** @internal */
    objectFlags: ObjectFlags;
    /** @internal */
    propertyCache?: SymbolTable;
    /** @internal */
    propertyCacheWithoutObjectFunctionPropertyAugment?: SymbolTable;
    /** @internal */
    resolvedProperties: Symbol[];
    /** @internal */
    resolvedIndexType: IndexType;
    /** @internal */
    resolvedStringIndexType: IndexType;
    /** @internal */
    resolvedBaseConstraint: Type;
}
export interface UnionType extends UnionOrIntersectionType {
    /** @internal */
    resolvedReducedType?: Type;
    /** @internal */
    regularType?: UnionType;
    /** @internal */
    origin?: Type;
    /** @internal */
    keyPropertyName?: __String;
    /** @internal */
    constituentMap?: Map<TypeId, Type>;
    /** @internal */
    arrayFallbackSignatures?: readonly Signature[];
}
export interface IntersectionType extends UnionOrIntersectionType {
    /** @internal */
    resolvedApparentType: Type;
    /** @internal */
    uniqueLiteralFilledInstantiation?: Type;
}
export type StructuredType = ObjectType | UnionType | IntersectionType;
/** @internal */
export interface AnonymousType extends ObjectType {
    target?: AnonymousType;
    mapper?: TypeMapper;
    instantiations?: Map<string, Type>;
}
/** @internal */
export interface InstantiationExpressionType extends AnonymousType {
    node: NodeWithTypeArguments;
}
/** @internal */
export interface MappedType extends AnonymousType {
    declaration: MappedTypeNode;
    typeParameter?: TypeParameter;
    constraintType?: Type;
    nameType?: Type;
    templateType?: Type;
    modifiersType?: Type;
    resolvedApparentType?: Type;
    containsError?: boolean;
}
export interface EvolvingArrayType extends ObjectType {
    elementType: Type;
    finalArrayType?: Type;
}
/** @internal */
export interface ReverseMappedType extends ObjectType {
    source: Type;
    mappedType: MappedType;
    constraintType: IndexType;
}
/** @internal */
export interface ResolvedType extends ObjectType, UnionOrIntersectionType {
    members: SymbolTable;
    properties: Symbol[];
    callSignatures: readonly Signature[];
    constructSignatures: readonly Signature[];
    indexInfos: readonly IndexInfo[];
}
/** @internal */
export interface FreshObjectLiteralType extends ResolvedType {
    regularType: ResolvedType;
}
/** @internal */
export interface IterationTypes {
    readonly yieldType: Type;
    readonly returnType: Type;
    readonly nextType: Type;
}
/** @internal */
export interface IterableOrIteratorType extends ObjectType, UnionType {
    iterationTypesOfGeneratorReturnType?: IterationTypes;
    iterationTypesOfAsyncGeneratorReturnType?: IterationTypes;
    iterationTypesOfIterable?: IterationTypes;
    iterationTypesOfIterator?: IterationTypes;
    iterationTypesOfAsyncIterable?: IterationTypes;
    iterationTypesOfAsyncIterator?: IterationTypes;
    iterationTypesOfIteratorResult?: IterationTypes;
}
/** @internal */
export interface PromiseOrAwaitableType extends ObjectType, UnionType {
    promiseTypeOfPromiseConstructor?: Type;
    promisedTypeOfPromise?: Type;
    awaitedTypeOfType?: Type;
}
/** @internal */
export interface SyntheticDefaultModuleType extends Type {
    syntheticType?: Type;
    defaultOnlyType?: Type;
}
export interface InstantiableType extends Type {
    /** @internal */
    resolvedBaseConstraint?: Type;
    /** @internal */
    resolvedIndexType?: IndexType;
    /** @internal */
    resolvedStringIndexType?: IndexType;
}
export interface TypeParameter extends InstantiableType {
    /**
     * Retrieve using getConstraintFromTypeParameter
     *
     * @internal
     */
    constraint?: Type;
    /** @internal */
    default?: Type;
    /** @internal */
    target?: TypeParameter;
    /** @internal */
    mapper?: TypeMapper;
    /** @internal */
    isThisType?: boolean;
    /** @internal */
    resolvedDefaultType?: Type;
}
/** @internal */
export declare const enum AccessFlags {
    None = 0,
    IncludeUndefined = 1,
    NoIndexSignatures = 2,
    Writing = 4,
    CacheSymbol = 8,
    AllowMissing = 16,
    ExpressionPosition = 32,
    ReportDeprecated = 64,
    SuppressNoImplicitAnyError = 128,
    Contextual = 256,
    Persistent = 1
}
export interface IndexedAccessType extends InstantiableType {
    objectType: Type;
    indexType: Type;
    /** @internal */
    accessFlags: AccessFlags;
    constraint?: Type;
    simplifiedForReading?: Type;
    simplifiedForWriting?: Type;
}
export type TypeVariable = TypeParameter | IndexedAccessType;
/** @internal */
export declare const enum IndexFlags {
    None = 0,
    StringsOnly = 1,
    NoIndexSignatures = 2,
    NoReducibleCheck = 4
}
export interface IndexType extends InstantiableType {
    type: InstantiableType | UnionOrIntersectionType;
    /** @internal */
    indexFlags: IndexFlags;
}
export interface ConditionalRoot {
    node: ConditionalTypeNode;
    checkType: Type;
    extendsType: Type;
    isDistributive: boolean;
    inferTypeParameters?: TypeParameter[];
    outerTypeParameters?: TypeParameter[];
    instantiations?: Map<string, Type>;
    aliasSymbol?: Symbol;
    aliasTypeArguments?: Type[];
}
export interface ConditionalType extends InstantiableType {
    root: ConditionalRoot;
    checkType: Type;
    extendsType: Type;
    resolvedTrueType?: Type;
    resolvedFalseType?: Type;
    /** @internal */
    resolvedInferredTrueType?: Type;
    /** @internal */
    resolvedDefaultConstraint?: Type;
    /** @internal */
    resolvedConstraintOfDistributive?: Type | false;
    /** @internal */
    mapper?: TypeMapper;
    /** @internal */
    combinedMapper?: TypeMapper;
}
export interface TemplateLiteralType extends InstantiableType {
    texts: readonly string[];
    types: readonly Type[];
}
export interface StringMappingType extends InstantiableType {
    symbol: Symbol;
    type: Type;
}
export interface SubstitutionType extends InstantiableType {
    objectFlags: ObjectFlags;
    baseType: Type;
    constraint: Type;
}
/** @internal */
export declare const enum JsxReferenceKind {
    Component = 0,
    Function = 1,
    Mixed = 2
}
export declare const enum SignatureKind {
    Call = 0,
    Construct = 1
}
/** @internal */
export declare const enum SignatureFlags {
    None = 0,
    HasRestParameter = 1,// Indicates last parameter is rest parameter
    HasLiteralTypes = 2,// Indicates signature is specialized
    Abstract = 4,// Indicates signature comes from an abstract class, abstract construct signature, or abstract constructor type
    IsInnerCallChain = 8,// Indicates signature comes from a CallChain nested in an outer OptionalChain
    IsOuterCallChain = 16,// Indicates signature comes from a CallChain that is the outermost chain of an optional expression
    IsUntypedSignatureInJSFile = 32,// Indicates signature is from a js file and has no types
    IsNonInferrable = 64,// Indicates signature comes from a non-inferrable type
    IsSignatureCandidateForOverloadFailure = 128,
    PropagatingFlags = 167,
    CallChainFlags = 24
}
export interface Signature {
    /** @internal */ flags: SignatureFlags;
    /** @internal */ checker?: TypeChecker;
    declaration?: SignatureDeclaration | JSDocSignature;
    typeParameters?: readonly TypeParameter[];
    parameters: readonly Symbol[];
    thisParameter?: Symbol;
    /** @internal */
    resolvedReturnType?: Type;
    /** @internal */
    resolvedTypePredicate?: TypePredicate;
    /** @internal */
    declaredThrowsType?: Type;
    /** @internal */
    declaredRejectsType?: Type;
    /** @internal */
    minArgumentCount: number;
    /** @internal */
    resolvedMinArgumentCount?: number;
    /** @internal */
    target?: Signature;
    /** @internal */
    mapper?: TypeMapper;
    /** @internal */
    compositeSignatures?: Signature[];
    /** @internal */
    compositeKind?: TypeFlags;
    /** @internal */
    erasedSignatureCache?: Signature;
    /** @internal */
    canonicalSignatureCache?: Signature;
    /** @internal */
    baseSignatureCache?: Signature;
    /** @internal */
    optionalCallSignatureCache?: {
        inner?: Signature;
        outer?: Signature;
    };
    /** @internal */
    isolatedSignatureType?: ObjectType;
    /** @internal */
    instantiations?: Map<string, Signature>;
}
export declare const enum IndexKind {
    String = 0,
    Number = 1
}
export type ElementWithComputedPropertyName = (ClassElement | ObjectLiteralElement) & {
    name: ComputedPropertyName;
};
export interface IndexInfo {
    keyType: Type;
    type: Type;
    isReadonly: boolean;
    declaration?: IndexSignatureDeclaration;
    components?: ElementWithComputedPropertyName[];
}
/** @internal */
export declare const enum TypeMapKind {
    Simple = 0,
    Array = 1,
    Deferred = 2,
    Function = 3,
    Composite = 4,
    Merged = 5
}
/** @internal */
export type TypeMapper = {
    kind: TypeMapKind.Simple;
    source: Type;
    target: Type;
} | {
    kind: TypeMapKind.Array;
    sources: readonly Type[];
    targets: readonly Type[] | undefined;
} | {
    kind: TypeMapKind.Deferred;
    sources: readonly Type[];
    targets: (() => Type)[];
} | {
    kind: TypeMapKind.Function;
    func: (t: Type) => Type;
    debugInfo?: () => string;
} | {
    kind: TypeMapKind.Composite | TypeMapKind.Merged;
    mapper1: TypeMapper;
    mapper2: TypeMapper;
};
export declare const enum InferencePriority {
    None = 0,
    NakedTypeVariable = 1,// Naked type variable in union or intersection type
    SpeculativeTuple = 2,// Speculative tuple inference
    SubstituteSource = 4,// Source of inference originated within a substitution type's substitute
    HomomorphicMappedType = 8,// Reverse inference for homomorphic mapped type
    PartialHomomorphicMappedType = 16,// Partial reverse inference for homomorphic mapped type
    MappedTypeConstraint = 32,// Reverse inference for mapped type
    ContravariantConditional = 64,// Conditional type in contravariant position
    ReturnType = 128,// Inference made from return type of generic function
    LiteralKeyof = 256,// Inference made from a string literal to a keyof T
    NoConstraints = 512,// Don't infer from constraints of instantiable types
    AlwaysStrict = 1024,// Always use strict rules for contravariant inferences
    MaxValue = 2048,// Seed for inference priority tracking
    PriorityImpliesCombination = 416,// These priorities imply that the resulting type should be a combination of all candidates
    Circularity = -1
}
/** @internal */
export interface InferenceInfo {
    typeParameter: TypeParameter;
    candidates: Type[] | undefined;
    contraCandidates: Type[] | undefined;
    inferredType?: Type;
    priority?: InferencePriority;
    topLevel: boolean;
    isFixed: boolean;
    impliedArity?: number;
}
/** @internal */
export declare const enum InferenceFlags {
    None = 0,// No special inference behaviors
    NoDefault = 1,// Infer silentNeverType for no inferences (otherwise anyType or unknownType)
    AnyDefault = 2,// Infer anyType (in JS files) for no inferences (otherwise unknownType)
    SkippedGenericFunction = 4
}
/**
 * Ternary values are defined such that
 * x & y picks the lesser in the order False < Unknown < Maybe < True, and
 * x | y picks the greater in the order False < Unknown < Maybe < True.
 * Generally, Ternary.Maybe is used as the result of a relation that depends on itself, and
 * Ternary.Unknown is used as the result of a variance check that depends on itself. We make
 * a distinction because we don't want to cache circular variance check results.
 *
 * @internal
 */
export declare const enum Ternary {
    False = 0,
    Unknown = 1,
    Maybe = 3,
    True = -1
}
/** @internal */
export type TypeComparer = (s: Type, t: Type, reportErrors?: boolean) => Ternary;
/** @internal */
export interface InferenceContext {
    inferences: InferenceInfo[];
    signature?: Signature;
    flags: InferenceFlags;
    compareTypes: TypeComparer;
    mapper: TypeMapper;
    nonFixingMapper: TypeMapper;
    returnMapper?: TypeMapper;
    outerReturnMapper?: TypeMapper;
    inferredTypeParameters?: readonly TypeParameter[];
    intraExpressionInferenceSites?: IntraExpressionInferenceSite[];
}
/** @internal */
export interface IntraExpressionInferenceSite {
    node: Expression | MethodDeclaration;
    type: Type;
}
/** @internal */
export interface WideningContext {
    parent?: WideningContext;
    propertyName?: __String;
    siblings?: Type[];
    resolvedProperties?: Symbol[];
}
/** @internal */
export declare const enum AssignmentDeclarationKind {
    None = 0,
    ExportsProperty = 1,
    ModuleExports = 2,
    PrototypeProperty = 3,
    ThisProperty = 4,
    Property = 5,
    Prototype = 6,
    ObjectDefinePropertyValue = 7,
    ObjectDefinePropertyExports = 8,
    ObjectDefinePrototypeProperty = 9
}
export interface FileExtensionInfo {
    extension: string;
    isMixedContent: boolean;
    scriptKind?: ScriptKind;
}
export interface DiagnosticMessage {
    key: string;
    category: DiagnosticCategory;
    code: number;
    message: string;
    reportsUnnecessary?: {};
    reportsDeprecated?: {};
    /** @internal */
    elidedInCompatabilityPyramid?: boolean;
}
/** @internal */
export interface RepopulateModuleNotFoundDiagnosticChain {
    moduleReference: string;
    mode: ResolutionMode;
    packageName: string | undefined;
}
/** @internal */
export type RepopulateModeMismatchDiagnosticChain = true;
/** @internal */
export type RepopulateDiagnosticChainInfo = RepopulateModuleNotFoundDiagnosticChain | RepopulateModeMismatchDiagnosticChain;
/**
 * A linked list of formatted diagnostic messages to be used as part of a multiline message.
 * It is built from the bottom up, leaving the head to be the "main" diagnostic.
 * While it seems that DiagnosticMessageChain is structurally similar to DiagnosticMessage,
 * the difference is that messages are all preformatted in DMC.
 */
export interface DiagnosticMessageChain {
    messageText: string;
    category: DiagnosticCategory;
    code: number;
    next?: DiagnosticMessageChain[];
    /** @internal */
    repopulateInfo?: () => RepopulateDiagnosticChainInfo;
    /** @internal */
    canonicalHead?: CanonicalDiagnostic;
}
export interface Diagnostic extends DiagnosticRelatedInformation {
    /** May store more in future. For now, this will simply be `true` to indicate when a diagnostic is an unused-identifier diagnostic. */
    reportsUnnecessary?: {};
    reportsDeprecated?: {};
    source?: string;
    relatedInformation?: DiagnosticRelatedInformation[];
    /** @internal */ skippedOn?: keyof CompilerOptions;
    /**
     * @internal
     * Used for deduplication and comparison.
     * Whenever it is possible for two diagnostics that report the same problem to be produced with
     * different messages (e.g. "Cannot find name 'foo'" vs "Cannot find name 'foo'. Did you mean 'bar'?"),
     * this property can be set to a canonical message,
     * so that those two diagnostics are appropriately considered to be the same.
     */
    canonicalHead?: CanonicalDiagnostic;
}
/** @internal */
export interface CanonicalDiagnostic {
    code: number;
    messageText: string;
}
/** @internal */
export type DiagnosticArguments = (string | number)[];
/** @internal */
export type DiagnosticAndArguments = [message: DiagnosticMessage, ...args: DiagnosticArguments];
export interface DiagnosticRelatedInformation {
    category: DiagnosticCategory;
    code: number;
    file: SourceFile | undefined;
    start: number | undefined;
    length: number | undefined;
    messageText: string | DiagnosticMessageChain;
}
export interface DiagnosticWithLocation extends Diagnostic {
    file: SourceFile;
    start: number;
    length: number;
}
/** @internal */
export interface DiagnosticWithDetachedLocation extends Diagnostic {
    file: undefined;
    fileName: string;
    start: number;
    length: number;
}
export declare enum DiagnosticCategory {
    Warning = 0,
    Error = 1,
    Suggestion = 2,
    Message = 3
}
/** @internal */
export declare function diagnosticCategoryName(d: {
    category: DiagnosticCategory;
}, lowerCase?: boolean): string;
export declare enum ModuleResolutionKind {
    /** @deprecated */
    Classic = 1,
    /**
     * @deprecated
     * `NodeJs` was renamed to `Node10` to better reflect the version of Node that it targets.
     * Use the new name or consider switching to a modern module resolution target.
     */
    NodeJs = 2,
    /**
     * @deprecated
     */
    Node10 = 2,
    Node16 = 3,
    NodeNext = 99,// Not simply `Node16` so that compiled code linked against TS can use the `Next` value reliably (same as with `ModuleKind`)
    Bundler = 100
}
export declare enum ModuleDetectionKind {
    /**
     * Files with imports, exports and/or import.meta are considered modules
     */
    Legacy = 1,
    /**
     * Legacy, but also files with jsx under react-jsx or react-jsxdev and esm mode files under moduleResolution: node16+
     */
    Auto = 2,
    /**
     * Consider all non-declaration files modules, regardless of present syntax
     */
    Force = 3
}
export interface PluginImport {
    name: string;
}
export interface ProjectReference {
    /** A normalized path on disk */
    path: string;
    /** The path as the user originally wrote it */
    originalPath?: string;
    /** @deprecated */
    prepend?: boolean;
    /** True if it is intended that this reference form a circularity */
    circular?: boolean;
}
export declare enum WatchFileKind {
    FixedPollingInterval = 0,
    PriorityPollingInterval = 1,
    DynamicPriorityPolling = 2,
    FixedChunkSizePolling = 3,
    UseFsEvents = 4,
    UseFsEventsOnParentDirectory = 5
}
export declare enum WatchDirectoryKind {
    UseFsEvents = 0,
    FixedPollingInterval = 1,
    DynamicPriorityPolling = 2,
    FixedChunkSizePolling = 3
}
export declare enum PollingWatchKind {
    FixedInterval = 0,
    PriorityInterval = 1,
    DynamicPriority = 2,
    FixedChunkSize = 3
}
export type CompilerOptionsValue = string | number | boolean | (string | number)[] | string[] | MapLike<string[]> | PluginImport[] | ProjectReference[] | null | undefined;
export interface CompilerOptions {
    /** @internal */ all?: boolean;
    allowImportingTsExtensions?: boolean;
    allowJs?: boolean;
    /** @internal */ allowNonTsExtensions?: boolean;
    allowArbitraryExtensions?: boolean;
    allowSyntheticDefaultImports?: boolean;
    allowUmdGlobalAccess?: boolean;
    allowUnreachableCode?: boolean;
    allowUnusedLabels?: boolean;
    alwaysStrict?: boolean;
    /** @deprecated */
    baseUrl?: string;
    /**
     * An error if set - this should only go through the -b pipeline and not actually be observed
     *
     * @internal
     */
    build?: boolean;
    /** @deprecated */
    charset?: string;
    checkJs?: boolean;
    checkedErrors?: boolean;
    /** @internal */ configFilePath?: string;
    /**
     * configFile is set as non enumerable property so as to avoid checking of json source files
     *
     * @internal
     */
    readonly configFile?: TsConfigSourceFile;
    customConditions?: string[];
    declaration?: boolean;
    declarationMap?: boolean;
    emitDeclarationOnly?: boolean;
    declarationDir?: string;
    /** @internal */ diagnostics?: boolean;
    /** @internal */ extendedDiagnostics?: boolean;
    disableSizeLimit?: boolean;
    disableSourceOfProjectReferenceRedirect?: boolean;
    disableSolutionSearching?: boolean;
    disableReferencedProjectLoad?: boolean;
    /** @deprecated */
    downlevelIteration?: boolean;
    emitBOM?: boolean;
    emitDecoratorMetadata?: boolean;
    exactOptionalPropertyTypes?: boolean;
    experimentalDecorators?: boolean;
    forceConsistentCasingInFileNames?: boolean;
    /** @internal */ generateCpuProfile?: string;
    /** @internal */ generateTrace?: string;
    /** @internal */ help?: boolean;
    ignoreDeprecations?: string;
    importHelpers?: boolean;
    /** @deprecated */
    importsNotUsedAsValues?: ImportsNotUsedAsValues;
    /** @internal */ init?: boolean;
    inlineSourceMap?: boolean;
    inlineSources?: boolean;
    isolatedModules?: boolean;
    isolatedDeclarations?: boolean;
    jsx?: JsxEmit;
    /** @deprecated */
    keyofStringsOnly?: boolean;
    lib?: string[];
    libReplacement?: boolean;
    /** @internal */ listEmittedFiles?: boolean;
    /** @internal */ listFiles?: boolean;
    /** @internal */ explainFiles?: boolean;
    /** @internal */ listFilesOnly?: boolean;
    locale?: string;
    mapRoot?: string;
    maxNodeModuleJsDepth?: number;
    module?: ModuleKind;
    moduleResolution?: ModuleResolutionKind;
    moduleSuffixes?: string[];
    moduleDetection?: ModuleDetectionKind;
    newLine?: NewLineKind;
    noEmit?: boolean;
    noCheck?: boolean;
    /** @internal */ noEmitForJsFiles?: boolean;
    noEmitHelpers?: boolean;
    noEmitOnError?: boolean;
    noErrorTruncation?: boolean;
    noFallthroughCasesInSwitch?: boolean;
    noImplicitAny?: boolean;
    noImplicitReturns?: boolean;
    noImplicitThis?: boolean;
    /** @deprecated */
    noStrictGenericChecks?: boolean;
    noUnusedLocals?: boolean;
    noUnusedParameters?: boolean;
    /** @deprecated */
    noImplicitUseStrict?: boolean;
    noPropertyAccessFromIndexSignature?: boolean;
    assumeChangesOnlyAffectDirectDependencies?: boolean;
    noLib?: boolean;
    noResolve?: boolean;
    /** @internal */
    noDtsResolution?: boolean;
    noUncheckedIndexedAccess?: boolean;
    /** @deprecated */
    out?: string;
    outDir?: string;
    outFile?: string;
    paths?: MapLike<string[]>;
    /**
     * The directory of the config file that specified 'paths'. Used to resolve relative paths when 'baseUrl' is absent.
     *
     * @internal
     */
    pathsBasePath?: string;
    /** @internal */ plugins?: PluginImport[];
    preserveConstEnums?: boolean;
    noImplicitOverride?: boolean;
    preserveSymlinks?: boolean;
    /** @deprecated */
    preserveValueImports?: boolean;
    /** @internal */ preserveWatchOutput?: boolean;
    project?: string;
    /** @internal */ pretty?: boolean;
    reactNamespace?: string;
    jsxFactory?: string;
    jsxFragmentFactory?: string;
    jsxImportSource?: string;
    composite?: boolean;
    incremental?: boolean;
    tsBuildInfoFile?: string;
    removeComments?: boolean;
    resolvePackageJsonExports?: boolean;
    resolvePackageJsonImports?: boolean;
    rewriteRelativeImportExtensions?: boolean;
    rootDir?: string;
    rootDirs?: string[];
    skipLibCheck?: boolean;
    skipDefaultLibCheck?: boolean;
    sourceMap?: boolean;
    sourceRoot?: string;
    strict?: boolean;
    strictFunctionTypes?: boolean;
    strictBindCallApply?: boolean;
    strictNullChecks?: boolean;
    strictPropertyInitialization?: boolean;
    strictBuiltinIteratorReturn?: boolean;
    /** @internal */
    stableTypeOrdering?: boolean;
    stripInternal?: boolean;
    /** @deprecated */
    suppressExcessPropertyErrors?: boolean;
    /** @deprecated */
    suppressImplicitAnyIndexErrors?: boolean;
    /** @internal */ suppressOutputPathCheck?: boolean;
    target?: ScriptTarget;
    traceResolution?: boolean;
    useUnknownInCatchVariables?: boolean;
    noUncheckedSideEffectImports?: boolean;
    resolveJsonModule?: boolean;
    types?: string[];
    /** Paths used to compute primary types search locations */
    typeRoots?: string[];
    verbatimModuleSyntax?: boolean;
    erasableSyntaxOnly?: boolean;
    /** @internal */ version?: boolean;
    /** @internal */ watch?: boolean;
    esModuleInterop?: boolean;
    /** @internal */ showConfig?: boolean;
    /** @internal */ ignoreConfig?: boolean;
    useDefineForClassFields?: boolean;
    /** @internal */ tscBuild?: boolean;
    [option: string]: CompilerOptionsValue | TsConfigSourceFile | undefined;
}
export interface WatchOptions {
    watchFile?: WatchFileKind;
    watchDirectory?: WatchDirectoryKind;
    fallbackPolling?: PollingWatchKind;
    synchronousWatchDirectory?: boolean;
    excludeDirectories?: string[];
    excludeFiles?: string[];
    [option: string]: CompilerOptionsValue | undefined;
}
export interface TypeAcquisition {
    enable?: boolean;
    include?: string[];
    exclude?: string[];
    disableFilenameBasedTypeAcquisition?: boolean;
    [option: string]: CompilerOptionsValue | undefined;
}
export declare enum ModuleKind {
    /** @deprecated */
    None = 0,
    CommonJS = 1,
    /** @deprecated */
    AMD = 2,
    /** @deprecated */
    UMD = 3,
    /** @deprecated */
    System = 4,
    ES2015 = 5,
    ES2020 = 6,
    ES2022 = 7,
    ESNext = 99,
    Node16 = 100,
    Node18 = 101,
    Node20 = 102,
    NodeNext = 199,
    Preserve = 200
}
export declare const enum JsxEmit {
    None = 0,
    Preserve = 1,
    React = 2,
    ReactNative = 3,
    ReactJSX = 4,
    ReactJSXDev = 5
}
/** @deprecated */
export declare const enum ImportsNotUsedAsValues {
    Remove = 0,
    Preserve = 1,
    Error = 2
}
export declare const enum NewLineKind {
    CarriageReturnLineFeed = 0,
    LineFeed = 1
}
export interface LineAndCharacter {
    /** 0-based. */
    line: number;
    character: number;
}
export declare const enum ScriptKind {
    Unknown = 0,
    JS = 1,
    JSX = 2,
    TS = 3,
    TSX = 4,
    External = 5,
    JSON = 6,
    /**
     * Used on extensions that doesn't define the ScriptKind but the content defines it.
     * Deferred extensions are going to be included in all project contexts.
     */
    Deferred = 7
}
export declare const enum ScriptTarget {
    /** @deprecated */
    ES3 = 0,
    /** @deprecated */
    ES5 = 1,
    ES2015 = 2,
    ES2016 = 3,
    ES2017 = 4,
    ES2018 = 5,
    ES2019 = 6,
    ES2020 = 7,
    ES2021 = 8,
    ES2022 = 9,
    ES2023 = 10,
    ES2024 = 11,
    ES2025 = 12,
    ESNext = 99,
    JSON = 100,
    Latest = 99,
    LatestStandard = 12
}
export declare const enum LanguageVariant {
    Standard = 0,
    JSX = 1
}
/** Either a parsed command line or a parsed tsconfig.json */
export interface ParsedCommandLine {
    options: CompilerOptions;
    typeAcquisition?: TypeAcquisition;
    fileNames: string[];
    projectReferences?: readonly ProjectReference[];
    watchOptions?: WatchOptions;
    raw?: any;
    errors: Diagnostic[];
    wildcardDirectories?: MapLike<WatchDirectoryFlags>;
    compileOnSave?: boolean;
}
export declare const enum WatchDirectoryFlags {
    None = 0,
    Recursive = 1
}
/** @internal */
export interface ConfigFileSpecs {
    filesSpecs: readonly string[] | undefined;
    /**
     * Present to report errors (user specified specs), validatedIncludeSpecs are used for file name matching
     */
    includeSpecs: readonly string[] | undefined;
    /**
     * Present to report errors (user specified specs), validatedExcludeSpecs are used for file name matching
     */
    excludeSpecs: readonly string[] | undefined;
    validatedFilesSpec: readonly string[] | undefined;
    validatedIncludeSpecs: readonly string[] | undefined;
    validatedExcludeSpecs: readonly string[] | undefined;
    validatedFilesSpecBeforeSubstitution: readonly string[] | undefined;
    validatedIncludeSpecsBeforeSubstitution: readonly string[] | undefined;
    validatedExcludeSpecsBeforeSubstitution: readonly string[] | undefined;
    isDefaultIncludeSpec: boolean;
}
/** @internal */
export type ModuleImportResult<T = {}> = {
    module: T;
    modulePath?: string;
    error: undefined;
} | {
    module: undefined;
    modulePath?: undefined;
    error: {
        stack?: string;
        message?: string;
    };
};
export interface CreateProgramOptions {
    rootNames: readonly string[];
    options: CompilerOptions;
    projectReferences?: readonly ProjectReference[];
    host?: CompilerHost;
    oldProgram?: Program;
    configFileParsingDiagnostics?: readonly Diagnostic[];
    /** @internal */
    typeScriptVersion?: string;
}
/** @internal */
export interface CommandLineOptionBase {
    name: string;
    type: "string" | "number" | "boolean" | "object" | "list" | "listOrElement" | Map<string, number | string>;
    isFilePath?: boolean;
    shortName?: string;
    description?: DiagnosticMessage;
    defaultValueDescription?: string | number | boolean | DiagnosticMessage | undefined;
    paramType?: DiagnosticMessage;
    isTSConfigOnly?: boolean;
    isCommandLineOnly?: boolean;
    showInSimplifiedHelpView?: boolean;
    showInHelp?: boolean;
    category?: DiagnosticMessage;
    strictFlag?: true;
    allowJsFlag?: true;
    affectsSourceFile?: true;
    affectsModuleResolution?: true;
    affectsBindDiagnostics?: true;
    affectsSemanticDiagnostics?: true;
    affectsEmit?: true;
    affectsProgramStructure?: true;
    affectsDeclarationPath?: true;
    affectsBuildInfo?: true;
    transpileOptionValue?: boolean | undefined;
    extraValidation?: (value: CompilerOptionsValue) => [DiagnosticMessage, ...string[]] | undefined;
    disallowNullOrUndefined?: true;
    allowConfigDirTemplateSubstitution?: true;
}
/** @internal */
export interface CommandLineOptionOfStringType extends CommandLineOptionBase {
    type: "string";
    defaultValueDescription?: string | undefined | DiagnosticMessage;
}
/** @internal */
export interface CommandLineOptionOfNumberType extends CommandLineOptionBase {
    type: "number";
    defaultValueDescription: number | undefined | DiagnosticMessage;
}
/** @internal */
export interface CommandLineOptionOfBooleanType extends CommandLineOptionBase {
    type: "boolean";
    defaultValueDescription: boolean | undefined | DiagnosticMessage;
}
/** @internal */
export interface CommandLineOptionOfCustomType extends CommandLineOptionBase {
    type: Map<string, number | string>;
    defaultValueDescription: number | string | undefined | DiagnosticMessage;
    deprecatedKeys?: Set<string>;
}
/** @internal */
export interface AlternateModeDiagnostics {
    diagnostic: DiagnosticMessage;
    getOptionsNameMap: () => OptionsNameMap;
}
/** @internal */
export interface DidYouMeanOptionsDiagnostics {
    alternateMode?: AlternateModeDiagnostics;
    optionDeclarations: CommandLineOption[];
    unknownOptionDiagnostic: DiagnosticMessage;
    unknownDidYouMeanDiagnostic: DiagnosticMessage;
}
/** @internal */
export interface TsConfigOnlyOption extends CommandLineOptionBase {
    type: "object";
    elementOptions?: Map<string, CommandLineOption>;
    extraKeyDiagnostics?: DidYouMeanOptionsDiagnostics;
}
/** @internal */
export interface CommandLineOptionOfListType extends CommandLineOptionBase {
    type: "list" | "listOrElement";
    element: CommandLineOptionOfCustomType | CommandLineOptionOfStringType | CommandLineOptionOfNumberType | CommandLineOptionOfBooleanType | TsConfigOnlyOption;
    listPreserveFalsyValues?: boolean;
}
/** @internal */
export type CommandLineOption = CommandLineOptionOfCustomType | CommandLineOptionOfStringType | CommandLineOptionOfNumberType | CommandLineOptionOfBooleanType | TsConfigOnlyOption | CommandLineOptionOfListType;
/** @internal */
export declare const enum CharacterCodes {
    EOF = -1,
    nullCharacter = 0,
    maxAsciiCharacter = 127,
    lineFeed = 10,// \n
    carriageReturn = 13,// \r
    lineSeparator = 8232,
    paragraphSeparator = 8233,
    nextLine = 133,
    space = 32,// " "
    nonBreakingSpace = 160,//
    enQuad = 8192,
    emQuad = 8193,
    enSpace = 8194,
    emSpace = 8195,
    threePerEmSpace = 8196,
    fourPerEmSpace = 8197,
    sixPerEmSpace = 8198,
    figureSpace = 8199,
    punctuationSpace = 8200,
    thinSpace = 8201,
    hairSpace = 8202,
    zeroWidthSpace = 8203,
    narrowNoBreakSpace = 8239,
    ideographicSpace = 12288,
    mathematicalSpace = 8287,
    ogham = 5760,
    replacementCharacter = 65533,
    _ = 95,
    $ = 36,
    _0 = 48,
    _1 = 49,
    _2 = 50,
    _3 = 51,
    _4 = 52,
    _5 = 53,
    _6 = 54,
    _7 = 55,
    _8 = 56,
    _9 = 57,
    a = 97,
    b = 98,
    c = 99,
    d = 100,
    e = 101,
    f = 102,
    g = 103,
    h = 104,
    i = 105,
    j = 106,
    k = 107,
    l = 108,
    m = 109,
    n = 110,
    o = 111,
    p = 112,
    q = 113,
    r = 114,
    s = 115,
    t = 116,
    u = 117,
    v = 118,
    w = 119,
    x = 120,
    y = 121,
    z = 122,
    A = 65,
    B = 66,
    C = 67,
    D = 68,
    E = 69,
    F = 70,
    G = 71,
    H = 72,
    I = 73,
    J = 74,
    K = 75,
    L = 76,
    M = 77,
    N = 78,
    O = 79,
    P = 80,
    Q = 81,
    R = 82,
    S = 83,
    T = 84,
    U = 85,
    V = 86,
    W = 87,
    X = 88,
    Y = 89,
    Z = 90,
    ampersand = 38,// &
    asterisk = 42,// *
    at = 64,// @
    backslash = 92,// \
    backtick = 96,// `
    bar = 124,// |
    caret = 94,// ^
    closeBrace = 125,// }
    closeBracket = 93,// ]
    closeParen = 41,// )
    colon = 58,// :
    comma = 44,// ,
    dot = 46,// .
    doubleQuote = 34,// "
    equals = 61,// =
    exclamation = 33,// !
    greaterThan = 62,// >
    hash = 35,// #
    lessThan = 60,// <
    minus = 45,// -
    openBrace = 123,// {
    openBracket = 91,// [
    openParen = 40,// (
    percent = 37,// %
    plus = 43,// +
    question = 63,// ?
    semicolon = 59,// ;
    singleQuote = 39,// '
    slash = 47,// /
    tilde = 126,// ~
    backspace = 8,// \b
    formFeed = 12,// \f
    byteOrderMark = 65279,
    tab = 9,// \t
    verticalTab = 11
}
export interface ModuleResolutionHost {
    fileExists(fileName: string): boolean;
    readFile(fileName: string): string | undefined;
    trace?(s: string): void;
    directoryExists?(directoryName: string): boolean;
    /**
     * Resolve a symbolic link.
     * @see https://nodejs.org/api/fs.html#fs_fs_realpathsync_path_options
     */
    realpath?(path: string): string;
    getCurrentDirectory?(): string;
    getDirectories?(path: string): string[];
    useCaseSensitiveFileNames?: boolean | (() => boolean) | undefined;
    /** @internal */ getGlobalTypingsCacheLocation?(): string | undefined;
}
/**
 * Used by services to specify the minimum host area required to set up source files under any compilation settings
 */
export interface MinimalResolutionCacheHost extends ModuleResolutionHost {
    getCompilationSettings(): CompilerOptions;
    getCompilerHost?(): CompilerHost | undefined;
}
/**
 * Represents the result of module resolution.
 * Module resolution will pick up tsx/jsx/js files even if '--jsx' and '--allowJs' are turned off.
 * The Program will then filter results based on these flags.
 *
 * Prefer to return a `ResolvedModuleFull` so that the file type does not have to be inferred.
 */
export interface ResolvedModule {
    /** Path of the file the module was resolved to. */
    resolvedFileName: string;
    /** True if `resolvedFileName` comes from `node_modules`. */
    isExternalLibraryImport?: boolean;
    /**
     * True if the original module reference used a .ts extension to refer directly to a .ts file,
     * which should produce an error during checking if emit is enabled.
     */
    resolvedUsingTsExtension?: boolean;
}
/**
 * ResolvedModule with an explicitly provided `extension` property.
 * Prefer this over `ResolvedModule`.
 * If changing this, remember to change `moduleResolutionIsEqualTo`.
 */
export interface ResolvedModuleFull extends ResolvedModule {
    /**
     * @internal
     * This is a file name with preserved original casing, not a normalized `Path`.
     */
    readonly originalPath?: string;
    /**
     * Extension of resolvedFileName. This must match what's at the end of resolvedFileName.
     * This is optional for backwards-compatibility, but will be added if not provided.
     */
    extension: string;
    packageId?: PackageId;
}
/**
 * Unique identifier with a package name and version.
 * If changing this, remember to change `packageIdIsEqual`.
 */
export interface PackageId {
    /**
     * Name of the package.
     * Should not include `@types`.
     * If accessing a non-index file, this should include its name e.g. "foo/bar".
     */
    name: string;
    /**
     * Name of a submodule within this package.
     * May be "".
     */
    subModuleName: string;
    /** Version of the package, e.g. "1.2.3" */
    version: string;
    /** @internal*/ peerDependencies?: string;
}
export declare const enum Extension {
    Ts = ".ts",
    Tsx = ".tsx",
    Dts = ".d.ts",
    Js = ".js",
    Jsx = ".jsx",
    Json = ".json",
    TsBuildInfo = ".tsbuildinfo",
    Mjs = ".mjs",
    Mts = ".mts",
    Dmts = ".d.mts",
    Cjs = ".cjs",
    Cts = ".cts",
    Dcts = ".d.cts"
}
export interface ResolvedModuleWithFailedLookupLocations {
    readonly resolvedModule: ResolvedModuleFull | undefined;
    /** @internal */
    failedLookupLocations?: string[];
    /** @internal */
    affectingLocations?: string[];
    /** @internal */
    resolutionDiagnostics?: Diagnostic[];
    /**
     * @internal
     * Used to issue a better diagnostic when an unresolvable module may
     * have been resolvable under different module resolution settings.
     */
    alternateResult?: string;
}
export interface ResolvedTypeReferenceDirective {
    primary: boolean;
    resolvedFileName: string | undefined;
    /**
     * @internal
     * The location of the symlink to the .d.ts file we found, if `resolvedFileName` was the realpath.
     * This is a file name with preserved original casing, not a normalized `Path`.
     */
    originalPath?: string;
    packageId?: PackageId;
    /** True if `resolvedFileName` comes from `node_modules`. */
    isExternalLibraryImport?: boolean;
}
export interface ResolvedTypeReferenceDirectiveWithFailedLookupLocations {
    readonly resolvedTypeReferenceDirective: ResolvedTypeReferenceDirective | undefined;
    /** @internal */ failedLookupLocations?: string[];
    /** @internal */ affectingLocations?: string[];
    /** @internal */ resolutionDiagnostics?: Diagnostic[];
}
/** @internal */
export type HasInvalidatedResolutions = (sourceFile: Path) => boolean;
/** @internal */
export type HasInvalidatedLibResolutions = (libFileName: string) => boolean;
/** @internal */
export type HasChangedAutomaticTypeDirectiveNames = () => boolean;
export interface CompilerHost extends ModuleResolutionHost {
    getSourceFile(fileName: string, languageVersionOrOptions: ScriptTarget | CreateSourceFileOptions, onError?: (message: string) => void, shouldCreateNewSourceFile?: boolean): SourceFile | undefined;
    getSourceFileByPath?(fileName: string, path: Path, languageVersionOrOptions: ScriptTarget | CreateSourceFileOptions, onError?: (message: string) => void, shouldCreateNewSourceFile?: boolean): SourceFile | undefined;
    getCancellationToken?(): CancellationToken;
    getDefaultLibFileName(options: CompilerOptions): string;
    getDefaultLibLocation?(): string;
    writeFile: WriteFileCallback;
    getCurrentDirectory(): string;
    getCanonicalFileName(fileName: string): string;
    useCaseSensitiveFileNames(): boolean;
    getNewLine(): string;
    readDirectory?(rootDir: string, extensions: readonly string[], excludes: readonly string[] | undefined, includes: readonly string[], depth?: number): string[];
    /** @deprecated supply resolveModuleNameLiterals instead for resolution that can handle newer resolution modes like nodenext */
    resolveModuleNames?(moduleNames: string[], containingFile: string, reusedNames: string[] | undefined, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions, containingSourceFile?: SourceFile): (ResolvedModule | undefined)[];
    /**
     * Returns the module resolution cache used by a provided `resolveModuleNames` implementation so that any non-name module resolution operations (eg, package.json lookup) can reuse it
     */
    getModuleResolutionCache?(): ModuleResolutionCache | undefined;
    /**
     * @deprecated supply resolveTypeReferenceDirectiveReferences instead for resolution that can handle newer resolution modes like nodenext
     *
     * This method is a companion for 'resolveModuleNames' and is used to resolve 'types' references to actual type declaration files
     */
    resolveTypeReferenceDirectives?(typeReferenceDirectiveNames: string[] | readonly FileReference[], containingFile: string, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions, containingFileMode?: ResolutionMode): (ResolvedTypeReferenceDirective | undefined)[];
    resolveModuleNameLiterals?(moduleLiterals: readonly StringLiteralLike[], containingFile: string, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions, containingSourceFile: SourceFile, reusedNames: readonly StringLiteralLike[] | undefined): readonly ResolvedModuleWithFailedLookupLocations[];
    resolveTypeReferenceDirectiveReferences?<T extends FileReference | string>(typeDirectiveReferences: readonly T[], containingFile: string, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions, containingSourceFile: SourceFile | undefined, reusedNames: readonly T[] | undefined): readonly ResolvedTypeReferenceDirectiveWithFailedLookupLocations[];
    /** @internal */
    resolveLibrary?(libraryName: string, resolveFrom: string, options: CompilerOptions, libFileName: string): ResolvedModuleWithFailedLookupLocations;
    /**
     * If provided along with custom resolveLibrary, used to determine if we should redo library resolutions
     * @internal
     */
    hasInvalidatedLibResolutions?(libFileName: string): boolean;
    getEnvironmentVariable?(name: string): string | undefined;
    /** @internal */ onReleaseOldSourceFile?(oldSourceFile: SourceFile, oldOptions: CompilerOptions, hasSourceFileByPath: boolean, newSourceFileByResolvedPath: SourceFile | undefined): void;
    /** @internal */ onReleaseParsedCommandLine?(configFileName: string, oldResolvedRef: ResolvedProjectReference | undefined, optionOptions: CompilerOptions): void;
    /** If provided along with custom resolveModuleNames or resolveTypeReferenceDirectives, used to determine if unchanged file path needs to re-resolve modules/type reference directives */
    hasInvalidatedResolutions?(filePath: Path): boolean;
    /** @internal */ hasChangedAutomaticTypeDirectiveNames?: HasChangedAutomaticTypeDirectiveNames;
    createHash?(data: string): string;
    getParsedCommandLine?(fileName: string): ParsedCommandLine | undefined;
    /** @internal */ useSourceOfProjectReferenceRedirect?(): boolean;
    /** @internal */ createDirectory?(directory: string): void;
    /** @internal */ getSymlinkCache?(): SymlinkCache;
    /** @internal */ storeSignatureInfo?: boolean;
    /** @internal */ getBuildInfo?(fileName: string, configFilePath: string | undefined): BuildInfo | undefined;
    jsDocParsingMode?: JSDocParsingMode;
}
/** @internal */
export declare const enum TransformFlags {
    None = 0,
    ContainsTypeScript = 1,
    ContainsJsx = 2,
    ContainsESNext = 4,
    ContainsES2022 = 8,
    ContainsES2021 = 16,
    ContainsES2020 = 32,
    ContainsES2019 = 64,
    ContainsES2018 = 128,
    ContainsES2017 = 256,
    ContainsES2016 = 512,
    ContainsES2015 = 1024,
    ContainsGenerator = 2048,
    ContainsDestructuringAssignment = 4096,
    ContainsTypeScriptClassSyntax = 8192,// Property Initializers, Parameter Property Initializers
    ContainsLexicalThis = 16384,
    ContainsRestOrSpread = 32768,
    ContainsObjectRestOrSpread = 65536,
    ContainsComputedPropertyName = 131072,
    ContainsBlockScopedBinding = 262144,
    ContainsBindingPattern = 524288,
    ContainsYield = 1048576,
    ContainsAwait = 2097152,
    ContainsHoistedDeclarationOrCompletion = 4194304,
    ContainsDynamicImport = 8388608,
    ContainsClassFields = 16777216,
    ContainsDecorators = 33554432,
    ContainsPossibleTopLevelAwait = 67108864,
    ContainsLexicalSuper = 134217728,
    ContainsUpdateExpressionForIdentifier = 268435456,
    ContainsPrivateIdentifierInExpression = 536870912,
    HasComputedFlags = -2147483648,// Transform flags have been computed.
    AssertTypeScript = 1,
    AssertJsx = 2,
    AssertESNext = 4,
    AssertES2022 = 8,
    AssertES2021 = 16,
    AssertES2020 = 32,
    AssertES2019 = 64,
    AssertES2018 = 128,
    AssertES2017 = 256,
    AssertES2016 = 512,
    AssertES2015 = 1024,
    AssertGenerator = 2048,
    AssertDestructuringAssignment = 4096,
    OuterExpressionExcludes = -2147483648,
    PropertyAccessExcludes = -2147483648,
    NodeExcludes = -2147483648,
    ArrowFunctionExcludes = -2072174592,
    FunctionExcludes = -1937940480,
    ConstructorExcludes = -1937948672,
    MethodOrAccessorExcludes = -2005057536,
    PropertyExcludes = -2013249536,
    ClassExcludes = -2147344384,
    ModuleExcludes = -1941676032,
    TypeExcludes = -2,
    ObjectLiteralExcludes = -2147278848,
    ArrayLiteralOrCallOrNewExcludes = -2147450880,
    VariableDeclarationListExcludes = -2146893824,
    ParameterExcludes = -2147483648,
    CatchClauseExcludes = -2147418112,
    BindingPatternExcludes = -2147450880,
    ContainsLexicalThisOrSuper = 134234112,
    PropertyNamePropagatingFlags = 134234112
}
export interface SourceMapRange extends TextRange {
    source?: SourceMapSource;
}
export interface SourceMapSource {
    fileName: string;
    text: string;
    /** @internal */ lineMap: readonly number[];
    skipTrivia?: (pos: number) => number;
}
/** @internal */
export interface EmitNode {
    flags: EmitFlags;
    internalFlags: InternalEmitFlags;
    annotatedNodes?: Node[];
    leadingComments?: SynthesizedComment[];
    trailingComments?: SynthesizedComment[];
    commentRange?: TextRange;
    sourceMapRange?: SourceMapRange;
    tokenSourceMapRanges?: (SourceMapRange | undefined)[];
    constantValue?: string | number;
    externalHelpersModuleName?: Identifier;
    externalHelpers?: boolean;
    helpers?: EmitHelper[];
    startsOnNewLine?: boolean;
    snippetElement?: SnippetElement;
    typeNode?: TypeNode;
    classThis?: Identifier;
    assignedName?: Expression;
    identifierTypeArguments?: NodeArray<TypeNode | TypeParameterDeclaration>;
    autoGenerate: AutoGenerateInfo | undefined;
    generatedImportReference?: ImportSpecifier;
}
/** @internal */
export type SnippetElement = TabStop | Placeholder;
/** @internal */
export interface TabStop {
    kind: SnippetKind.TabStop;
    order: number;
}
/** @internal */
export interface Placeholder {
    kind: SnippetKind.Placeholder;
    order: number;
}
/** @internal */
export declare const enum SnippetKind {
    TabStop = 0,// `$1`, `$2`
    Placeholder = 1,// `${1:foo}`
    Choice = 2,// `${1|one,two,three|}`
    Variable = 3
}
export declare const enum EmitFlags {
    None = 0,
    SingleLine = 1,// The contents of this node should be emitted on a single line.
    MultiLine = 2,
    AdviseOnEmitNode = 4,// The printer should invoke the onEmitNode callback when printing this node.
    NoSubstitution = 8,// Disables further substitution of an expression.
    CapturesThis = 16,// The function captures a lexical `this`
    NoLeadingSourceMap = 32,// Do not emit a leading source map location for this node.
    NoTrailingSourceMap = 64,// Do not emit a trailing source map location for this node.
    NoSourceMap = 96,// Do not emit a source map location for this node.
    NoNestedSourceMaps = 128,// Do not emit source map locations for children of this node.
    NoTokenLeadingSourceMaps = 256,// Do not emit leading source map location for token nodes.
    NoTokenTrailingSourceMaps = 512,// Do not emit trailing source map location for token nodes.
    NoTokenSourceMaps = 768,// Do not emit source map locations for tokens of this node.
    NoLeadingComments = 1024,// Do not emit leading comments for this node.
    NoTrailingComments = 2048,// Do not emit trailing comments for this node.
    NoComments = 3072,// Do not emit comments for this node.
    NoNestedComments = 4096,
    HelperName = 8192,// The Identifier refers to an *unscoped* emit helper (one that is emitted at the top of the file)
    ExportName = 16384,// Ensure an export prefix is added for an identifier that points to an exported declaration with a local name (see SymbolFlags.ExportHasLocal).
    LocalName = 32768,// Ensure an export prefix is not added for an identifier that points to an exported declaration.
    InternalName = 65536,// The name is internal to an ES5 class body function.
    Indented = 131072,// Adds an explicit extra indentation level for class and function bodies when printing (used to match old emitter).
    NoIndentation = 262144,// Do not indent the node.
    AsyncFunctionBody = 524288,
    ReuseTempVariableScope = 1048576,// Reuse the existing temp variable scope during emit.
    CustomPrologue = 2097152,// Treat the statement as if it were a prologue directive (NOTE: Prologue directives are *not* transformed).
    NoHoisting = 4194304,// Do not hoist this declaration in --module system
    Iterator = 8388608,// The expression to a `yield*` should be treated as an Iterator when down-leveling, not an Iterable.
    NoAsciiEscaping = 16777216
}
/** @internal */
export declare const enum InternalEmitFlags {
    None = 0,
    TypeScriptClassWrapper = 1,// The node is an IIFE class wrapper created by the ts transform.
    NeverApplyImportHelper = 2,// Indicates the node should never be wrapped with an import star helper (because, for example, it imports tslib itself)
    IgnoreSourceNewlines = 4,// Overrides `printerOptions.preserveSourceNewlines` to print this node (and all descendants) with default whitespace.
    Immutable = 8,// Indicates a node is a singleton intended to be reused in multiple locations. Any attempt to make further changes to the node will result in an error.
    IndirectCall = 16,// Emit CallExpression as an indirect call: `(0, f)()`
    TransformPrivateStaticElements = 32
}
export interface EmitHelperBase {
    readonly name: string;
    readonly scoped: boolean;
    readonly text: string | ((node: EmitHelperUniqueNameCallback) => string);
    readonly priority?: number;
    readonly dependencies?: EmitHelper[];
}
export interface ScopedEmitHelper extends EmitHelperBase {
    readonly scoped: true;
}
export interface UnscopedEmitHelper extends EmitHelperBase {
    readonly scoped: false;
    /** @internal */
    readonly importName?: string;
    readonly text: string;
}
export type EmitHelper = ScopedEmitHelper | UnscopedEmitHelper;
export type EmitHelperUniqueNameCallback = (name: string) => string;
/** @internal */
export type LanugageFeatures = "Classes" | "ForOf" | "Generators" | "Iteration" | "SpreadElements" | "RestElements" | "TaggedTemplates" | "DestructuringAssignment" | "BindingPatterns" | "ArrowFunctions" | "BlockScopedVariables" | "ObjectAssign" | "RegularExpressionFlagsUnicode" | "RegularExpressionFlagsSticky" | "Exponentiation" | "AsyncFunctions" | "ForAwaitOf" | "AsyncGenerators" | "AsyncIteration" | "ObjectSpreadRest" | "RegularExpressionFlagsDotAll" | "BindinglessCatch" | "BigInt" | "NullishCoalesce" | "OptionalChaining" | "LogicalAssignment" | "TopLevelAwait" | "ClassFields" | "PrivateNamesAndClassStaticBlocks" | "RegularExpressionFlagsHasIndices" | "ShebangComments" | "RegularExpressionFlagsUnicodeSets" | "UsingAndAwaitUsing" | "ClassAndClassElementDecorators";
/**
 * Indicates the minimum `ScriptTarget` (inclusive) after which a specific language feature is no longer transpiled.
 *
 * @internal
 */
export declare const LanguageFeatureMinimumTarget: Record<LanugageFeatures, ScriptTarget>;
/**
 * Used by the checker, this enum keeps track of external emit helpers that should be type
 * checked.
 *
 * @internal
 */
export declare const enum ExternalEmitHelpers {
    Extends = 1,// __extends (used by the ES2015 class transformation)
    Assign = 2,// __assign (used by Jsx and ESNext object spread transformations)
    Rest = 4,// __rest (used by ESNext object rest transformation)
    Decorate = 8,// __decorate (used by TypeScript decorators transformation)
    ESDecorateAndRunInitializers = 8,// __esDecorate and __runInitializers (used by ECMAScript decorators transformation)
    Metadata = 16,// __metadata (used by TypeScript decorators transformation)
    Param = 32,// __param (used by TypeScript decorators transformation)
    Awaiter = 64,// __awaiter (used by ES2017 async functions transformation)
    Generator = 128,// __generator (used by ES2015 generator transformation)
    Values = 256,// __values (used by ES2015 for..of and yield* transformations)
    Read = 512,// __read (used by ES2015 iterator destructuring transformation)
    SpreadArray = 1024,// __spreadArray (used by ES2015 array spread and argument list spread transformations)
    Await = 2048,// __await (used by ES2017 async generator transformation)
    AsyncGenerator = 4096,// __asyncGenerator (used by ES2017 async generator transformation)
    AsyncDelegator = 8192,// __asyncDelegator (used by ES2017 async generator yield* transformation)
    AsyncValues = 16384,// __asyncValues (used by ES2017 for..await..of transformation)
    ExportStar = 32768,// __exportStar (used by CommonJS/AMD/UMD module transformation)
    ImportStar = 65536,// __importStar (used by CommonJS/AMD/UMD module transformation)
    ImportDefault = 131072,// __importStar (used by CommonJS/AMD/UMD module transformation)
    MakeTemplateObject = 262144,// __makeTemplateObject (used for constructing template string array objects)
    ClassPrivateFieldGet = 524288,// __classPrivateFieldGet (used by the class private field transformation)
    ClassPrivateFieldSet = 1048576,// __classPrivateFieldSet (used by the class private field transformation)
    ClassPrivateFieldIn = 2097152,// __classPrivateFieldIn (used by the class private field transformation)
    SetFunctionName = 4194304,// __setFunctionName (used by class fields and ECMAScript decorators)
    PropKey = 8388608,// __propKey (used by class fields and ECMAScript decorators)
    AddDisposableResourceAndDisposeResources = 16777216,// __addDisposableResource and __disposeResources (used by ESNext transformations)
    RewriteRelativeImportExtension = 33554432,// __rewriteRelativeImportExtension (used by --rewriteRelativeImportExtensions)
    FirstEmitHelper = 1,
    LastEmitHelper = 16777216,
    ForOfIncludes = 256,
    ForAwaitOfIncludes = 16384,
    AsyncGeneratorIncludes = 6144,
    AsyncDelegatorIncludes = 26624,
    SpreadIncludes = 1536
}
export declare const enum EmitHint {
    SourceFile = 0,// Emitting a SourceFile
    Expression = 1,// Emitting an Expression
    IdentifierName = 2,// Emitting an IdentifierName
    MappedTypeParameter = 3,// Emitting a TypeParameterDeclaration inside of a MappedTypeNode
    Unspecified = 4,// Emitting an otherwise unspecified node
    EmbeddedStatement = 5,// Emitting an embedded statement
    JsxAttributeValue = 6,// Emitting a JSX attribute value
    ImportTypeNodeAttributes = 7
}
/** @internal */
export interface SourceFileMayBeEmittedHost {
    getCompilerOptions(): CompilerOptions;
    isSourceFileFromExternalLibrary(file: SourceFile): boolean;
    getRedirectFromSourceFile(fileName: string): ResolvedRefAndOutputDts | undefined;
    isSourceOfProjectReferenceRedirect(fileName: string): boolean;
    getCurrentDirectory(): string;
    getCanonicalFileName: GetCanonicalFileName;
    useCaseSensitiveFileNames(): boolean;
}
/** @internal */
export interface EmitHost extends ScriptReferenceHost, ModuleSpecifierResolutionHost, SourceFileMayBeEmittedHost {
    getSourceFiles(): readonly SourceFile[];
    useCaseSensitiveFileNames(): boolean;
    getCurrentDirectory(): string;
    getCommonSourceDirectory(): string;
    getCanonicalFileName(fileName: string): string;
    isEmitBlocked(emitFileName: string): boolean;
    shouldTransformImportCall(sourceFile: SourceFile): boolean;
    getEmitModuleFormatOfFile(sourceFile: SourceFile): ModuleKind;
    writeFile: WriteFileCallback;
    getBuildInfo(): BuildInfo | undefined;
    getSourceFileFromReference: Program["getSourceFileFromReference"];
    readonly redirectTargetsMap: RedirectTargetsMap;
    createHash?(data: string): string;
}
/** @internal */
export interface PropertyDescriptorAttributes {
    enumerable?: boolean | Expression;
    configurable?: boolean | Expression;
    writable?: boolean | Expression;
    value?: Expression;
    get?: Expression;
    set?: Expression;
}
export declare const enum OuterExpressionKinds {
    Parentheses = 1,
    TypeAssertions = 2,
    NonNullAssertions = 4,
    PartiallyEmittedExpressions = 8,
    ExpressionsWithTypeArguments = 16,
    Satisfies = 32,
    Assertions = 38,
    All = 63,
    ExcludeJSDocTypeAssertion = -2147483648
}
/** @internal */
export type OuterExpression = ParenthesizedExpression | TypeAssertion | SatisfiesExpression | AsExpression | NonNullExpression | ExpressionWithTypeArguments | PartiallyEmittedExpression;
/** @internal */
export type WrappedExpression<T extends Expression> = OuterExpression & {
    readonly expression: WrappedExpression<T>;
} | T;
/** @internal */
export type TypeOfTag = "null" | "undefined" | "number" | "bigint" | "boolean" | "string" | "symbol" | "object" | "function";
/** @internal */
export interface CallBinding {
    target: LeftHandSideExpression;
    thisArg: Expression;
}
/** @internal */
export interface ParenthesizerRules {
    getParenthesizeLeftSideOfBinaryForOperator(binaryOperator: SyntaxKind): (leftSide: Expression) => Expression;
    getParenthesizeRightSideOfBinaryForOperator(binaryOperator: SyntaxKind): (rightSide: Expression) => Expression;
    parenthesizeLeftSideOfBinary(binaryOperator: SyntaxKind, leftSide: Expression): Expression;
    parenthesizeRightSideOfBinary(binaryOperator: SyntaxKind, leftSide: Expression | undefined, rightSide: Expression): Expression;
    parenthesizeExpressionOfComputedPropertyName(expression: Expression): Expression;
    parenthesizeConditionOfConditionalExpression(condition: Expression): Expression;
    parenthesizeBranchOfConditionalExpression(branch: Expression): Expression;
    parenthesizeExpressionOfExportDefault(expression: Expression): Expression;
    parenthesizeExpressionOfNew(expression: Expression): LeftHandSideExpression;
    parenthesizeLeftSideOfAccess(expression: Expression, optionalChain?: boolean): LeftHandSideExpression;
    parenthesizeOperandOfPostfixUnary(operand: Expression): LeftHandSideExpression;
    parenthesizeOperandOfPrefixUnary(operand: Expression): UnaryExpression;
    parenthesizeExpressionsOfCommaDelimitedList(elements: readonly Expression[]): NodeArray<Expression>;
    parenthesizeExpressionForDisallowedComma(expression: Expression): Expression;
    parenthesizeExpressionOfExpressionStatement(expression: Expression): Expression;
    parenthesizeConciseBodyOfArrowFunction(body: Expression): Expression;
    parenthesizeConciseBodyOfArrowFunction(body: ConciseBody): ConciseBody;
    parenthesizeCheckTypeOfConditionalType(type: TypeNode): TypeNode;
    parenthesizeExtendsTypeOfConditionalType(type: TypeNode): TypeNode;
    parenthesizeOperandOfTypeOperator(type: TypeNode): TypeNode;
    parenthesizeOperandOfReadonlyTypeOperator(type: TypeNode): TypeNode;
    parenthesizeNonArrayTypeOfPostfixType(type: TypeNode): TypeNode;
    parenthesizeElementTypesOfTupleType(types: readonly (TypeNode | NamedTupleMember)[]): NodeArray<TypeNode>;
    parenthesizeElementTypeOfTupleType(type: TypeNode | NamedTupleMember): TypeNode | NamedTupleMember;
    parenthesizeTypeOfOptionalType(type: TypeNode): TypeNode;
    parenthesizeConstituentTypeOfUnionType(type: TypeNode): TypeNode;
    parenthesizeConstituentTypesOfUnionType(constituents: readonly TypeNode[]): NodeArray<TypeNode>;
    parenthesizeConstituentTypeOfIntersectionType(type: TypeNode): TypeNode;
    parenthesizeConstituentTypesOfIntersectionType(constituents: readonly TypeNode[]): NodeArray<TypeNode>;
    parenthesizeLeadingTypeArgument(typeNode: TypeNode): TypeNode;
    parenthesizeTypeArguments(typeParameters: readonly TypeNode[] | undefined): NodeArray<TypeNode> | undefined;
}
/** @internal */
export interface NodeConverters {
    convertToFunctionBlock(node: ConciseBody, multiLine?: boolean): Block;
    convertToFunctionExpression(node: FunctionDeclaration): FunctionExpression;
    convertToClassExpression(node: ClassDeclaration): ClassExpression;
    convertToArrayAssignmentElement(element: ArrayBindingOrAssignmentElement): Expression;
    convertToObjectAssignmentElement(element: ObjectBindingOrAssignmentElement): ObjectLiteralElementLike;
    convertToAssignmentPattern(node: BindingOrAssignmentPattern): AssignmentPattern;
    convertToObjectAssignmentPattern(node: ObjectBindingOrAssignmentPattern): ObjectLiteralExpression;
    convertToArrayAssignmentPattern(node: ArrayBindingOrAssignmentPattern): ArrayLiteralExpression;
    convertToAssignmentElementTarget(node: BindingOrAssignmentElementTarget): Expression;
}
/** @internal */
export interface GeneratedNamePart {
    /** an additional prefix to insert before the text sourced from `node` */
    prefix?: string;
    node: Identifier | PrivateIdentifier;
    /** an additional suffix to insert after the text sourced from `node` */
    suffix?: string;
}
export type ImmediatelyInvokedFunctionExpression = CallExpression & {
    readonly expression: FunctionExpression;
};
export type ImmediatelyInvokedArrowFunction = CallExpression & {
    readonly expression: ParenthesizedExpression & {
        readonly expression: ArrowFunction;
    };
};
export interface NodeFactory {
    /** @internal */ readonly parenthesizer: ParenthesizerRules;
    /** @internal */ readonly converters: NodeConverters;
    /** @internal */ readonly baseFactory: BaseNodeFactory;
    /** @internal */ readonly flags: NodeFactoryFlags;
    createNodeArray<T extends Node>(elements?: readonly T[], hasTrailingComma?: boolean): NodeArray<T>;
    createNumericLiteral(value: string | number, numericLiteralFlags?: TokenFlags): NumericLiteral;
    createBigIntLiteral(value: string | PseudoBigInt): BigIntLiteral;
    createStringLiteral(text: string, isSingleQuote?: boolean): StringLiteral;
    /** @internal */ createStringLiteral(text: string, isSingleQuote?: boolean, hasExtendedUnicodeEscape?: boolean): StringLiteral;
    createStringLiteralFromNode(sourceNode: PropertyNameLiteral | PrivateIdentifier, isSingleQuote?: boolean): StringLiteral;
    createRegularExpressionLiteral(text: string): RegularExpressionLiteral;
    createIdentifier(text: string): Identifier;
    /** @internal */ createIdentifier(text: string, originalKeywordKind?: SyntaxKind, hasExtendedUnicodeEscape?: boolean): Identifier;
    /**
     * Create a unique temporary variable.
     * @param recordTempVariable An optional callback used to record the temporary variable name. This
     * should usually be a reference to `hoistVariableDeclaration` from a `TransformationContext`, but
     * can be `undefined` if you plan to record the temporary variable manually.
     * @param reservedInNestedScopes When `true`, reserves the temporary variable name in all nested scopes
     * during emit so that the variable can be referenced in a nested function body. This is an alternative to
     * setting `EmitFlags.ReuseTempVariableScope` on the nested function itself.
     */
    createTempVariable(recordTempVariable: ((node: Identifier) => void) | undefined, reservedInNestedScopes?: boolean): Identifier;
    /** @internal */ createTempVariable(recordTempVariable: ((node: Identifier) => void) | undefined, reservedInNestedScopes?: boolean, prefix?: string | GeneratedNamePart, suffix?: string): Identifier;
    /**
     * Create a unique temporary variable for use in a loop.
     * @param reservedInNestedScopes When `true`, reserves the temporary variable name in all nested scopes
     * during emit so that the variable can be referenced in a nested function body. This is an alternative to
     * setting `EmitFlags.ReuseTempVariableScope` on the nested function itself.
     */
    createLoopVariable(reservedInNestedScopes?: boolean): Identifier;
    /** Create a unique name based on the supplied text. */
    createUniqueName(text: string, flags?: GeneratedIdentifierFlags): Identifier;
    /** @internal */ createUniqueName(text: string, flags?: GeneratedIdentifierFlags, prefix?: string | GeneratedNamePart, suffix?: string): Identifier;
    /** Create a unique name generated for a node. */
    getGeneratedNameForNode(node: Node | undefined, flags?: GeneratedIdentifierFlags): Identifier;
    /** @internal */ getGeneratedNameForNode(node: Node | undefined, flags?: GeneratedIdentifierFlags, prefix?: string | GeneratedNamePart, suffix?: string): Identifier;
    createPrivateIdentifier(text: string): PrivateIdentifier;
    createUniquePrivateName(text?: string): PrivateIdentifier;
    /** @internal */ createUniquePrivateName(text?: string, prefix?: string | GeneratedNamePart, suffix?: string): PrivateIdentifier;
    getGeneratedPrivateNameForNode(node: Node): PrivateIdentifier;
    /** @internal */ getGeneratedPrivateNameForNode(node: Node, prefix?: string | GeneratedNamePart, suffix?: string): PrivateIdentifier;
    createToken(token: SyntaxKind.SuperKeyword): SuperExpression;
    createToken(token: SyntaxKind.ThisKeyword): ThisExpression;
    createToken(token: SyntaxKind.NullKeyword): NullLiteral;
    createToken(token: SyntaxKind.TrueKeyword): TrueLiteral;
    createToken(token: SyntaxKind.FalseKeyword): FalseLiteral;
    createToken(token: SyntaxKind.EndOfFileToken): EndOfFileToken;
    createToken(token: SyntaxKind.Unknown): Token<SyntaxKind.Unknown>;
    createToken<TKind extends PunctuationSyntaxKind>(token: TKind): PunctuationToken<TKind>;
    createToken<TKind extends KeywordTypeSyntaxKind>(token: TKind): KeywordTypeNode<TKind>;
    createToken<TKind extends ModifierSyntaxKind>(token: TKind): ModifierToken<TKind>;
    createToken<TKind extends KeywordSyntaxKind>(token: TKind): KeywordToken<TKind>;
    /** @internal */ createToken<TKind extends SyntaxKind>(token: TKind): Token<TKind>;
    createSuper(): SuperExpression;
    createThis(): ThisExpression;
    createNull(): NullLiteral;
    createTrue(): TrueLiteral;
    createFalse(): FalseLiteral;
    createModifier<T extends ModifierSyntaxKind>(kind: T): ModifierToken<T>;
    createModifiersFromModifierFlags(flags: ModifierFlags): Modifier[] | undefined;
    createQualifiedName(left: EntityName, right: string | Identifier): QualifiedName;
    updateQualifiedName(node: QualifiedName, left: EntityName, right: Identifier): QualifiedName;
    createComputedPropertyName(expression: Expression): ComputedPropertyName;
    updateComputedPropertyName(node: ComputedPropertyName, expression: Expression): ComputedPropertyName;
    createTypeParameterDeclaration(modifiers: readonly Modifier[] | undefined, name: string | Identifier, constraint?: TypeNode, defaultType?: TypeNode): TypeParameterDeclaration;
    updateTypeParameterDeclaration(node: TypeParameterDeclaration, modifiers: readonly Modifier[] | undefined, name: Identifier, constraint: TypeNode | undefined, defaultType: TypeNode | undefined): TypeParameterDeclaration;
    createParameterDeclaration(modifiers: readonly ModifierLike[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: string | BindingName, questionToken?: QuestionToken, type?: TypeNode, initializer?: Expression): ParameterDeclaration;
    updateParameterDeclaration(node: ParameterDeclaration, modifiers: readonly ModifierLike[] | undefined, dotDotDotToken: DotDotDotToken | undefined, name: string | BindingName, questionToken: QuestionToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): ParameterDeclaration;
    createDecorator(expression: Expression): Decorator;
    updateDecorator(node: Decorator, expression: Expression): Decorator;
    createPropertySignature(modifiers: readonly Modifier[] | undefined, name: PropertyName | string, questionToken: QuestionToken | undefined, type: TypeNode | undefined): PropertySignature;
    updatePropertySignature(node: PropertySignature, modifiers: readonly Modifier[] | undefined, name: PropertyName, questionToken: QuestionToken | undefined, type: TypeNode | undefined): PropertySignature;
    createPropertyDeclaration(modifiers: readonly ModifierLike[] | undefined, name: string | PropertyName, questionOrExclamationToken: QuestionToken | ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): PropertyDeclaration;
    updatePropertyDeclaration(node: PropertyDeclaration, modifiers: readonly ModifierLike[] | undefined, name: string | PropertyName, questionOrExclamationToken: QuestionToken | ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): PropertyDeclaration;
    createMethodSignature(modifiers: readonly Modifier[] | undefined, name: string | PropertyName, questionToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, throwsType: TypeNode | undefined, rejectsType: TypeNode | undefined): MethodSignature;
    updateMethodSignature(node: MethodSignature, modifiers: readonly Modifier[] | undefined, name: PropertyName, questionToken: QuestionToken | undefined, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode | undefined, throwsType: TypeNode | undefined, rejectsType: TypeNode | undefined): MethodSignature;
    createMethodDeclaration(modifiers: readonly ModifierLike[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | PropertyName, questionToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined, throwsType: TypeNode | undefined, rejectsType: TypeNode | undefined): MethodDeclaration;
    updateMethodDeclaration(node: MethodDeclaration, modifiers: readonly ModifierLike[] | undefined, asteriskToken: AsteriskToken | undefined, name: PropertyName, questionToken: QuestionToken | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined, throwsType: TypeNode | undefined, rejectsType: TypeNode | undefined): MethodDeclaration;
    createConstructorDeclaration(modifiers: readonly ModifierLike[] | undefined, parameters: readonly ParameterDeclaration[], body: Block | undefined): ConstructorDeclaration;
    updateConstructorDeclaration(node: ConstructorDeclaration, modifiers: readonly ModifierLike[] | undefined, parameters: readonly ParameterDeclaration[], body: Block | undefined): ConstructorDeclaration;
    createGetAccessorDeclaration(modifiers: readonly ModifierLike[] | undefined, name: string | PropertyName, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined, throwsType: TypeNode | undefined, rejectsType: TypeNode | undefined): GetAccessorDeclaration;
    updateGetAccessorDeclaration(node: GetAccessorDeclaration, modifiers: readonly ModifierLike[] | undefined, name: PropertyName, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined, throwsType: TypeNode | undefined, rejectsType: TypeNode | undefined): GetAccessorDeclaration;
    createSetAccessorDeclaration(modifiers: readonly ModifierLike[] | undefined, name: string | PropertyName, parameters: readonly ParameterDeclaration[], body: Block | undefined): SetAccessorDeclaration;
    updateSetAccessorDeclaration(node: SetAccessorDeclaration, modifiers: readonly ModifierLike[] | undefined, name: PropertyName, parameters: readonly ParameterDeclaration[], body: Block | undefined): SetAccessorDeclaration;
    createCallSignature(typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, throwsType: TypeNode | undefined, rejectsType: TypeNode | undefined): CallSignatureDeclaration;
    updateCallSignature(node: CallSignatureDeclaration, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode | undefined, throwsType: TypeNode | undefined, rejectsType: TypeNode | undefined): CallSignatureDeclaration;
    createConstructSignature(typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): ConstructSignatureDeclaration;
    updateConstructSignature(node: ConstructSignatureDeclaration, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode | undefined): ConstructSignatureDeclaration;
    createIndexSignature(modifiers: readonly ModifierLike[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): IndexSignatureDeclaration;
    /** @internal */ createIndexSignature(modifiers: readonly ModifierLike[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): IndexSignatureDeclaration;
    updateIndexSignature(node: IndexSignatureDeclaration, modifiers: readonly ModifierLike[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): IndexSignatureDeclaration;
    createTemplateLiteralTypeSpan(type: TypeNode, literal: TemplateMiddle | TemplateTail): TemplateLiteralTypeSpan;
    updateTemplateLiteralTypeSpan(node: TemplateLiteralTypeSpan, type: TypeNode, literal: TemplateMiddle | TemplateTail): TemplateLiteralTypeSpan;
    createClassStaticBlockDeclaration(body: Block): ClassStaticBlockDeclaration;
    updateClassStaticBlockDeclaration(node: ClassStaticBlockDeclaration, body: Block): ClassStaticBlockDeclaration;
    createKeywordTypeNode<TKind extends KeywordTypeSyntaxKind>(kind: TKind): KeywordTypeNode<TKind>;
    createTypePredicateNode(assertsModifier: AssertsKeyword | undefined, parameterName: Identifier | ThisTypeNode | string, type: TypeNode | undefined): TypePredicateNode;
    updateTypePredicateNode(node: TypePredicateNode, assertsModifier: AssertsKeyword | undefined, parameterName: Identifier | ThisTypeNode, type: TypeNode | undefined): TypePredicateNode;
    createTypeReferenceNode(typeName: string | EntityName, typeArguments?: readonly TypeNode[]): TypeReferenceNode;
    updateTypeReferenceNode(node: TypeReferenceNode, typeName: EntityName, typeArguments: NodeArray<TypeNode> | undefined): TypeReferenceNode;
    createFunctionTypeNode(typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode, throwsType: TypeNode | undefined, rejectsType: TypeNode | undefined): FunctionTypeNode;
    updateFunctionTypeNode(node: FunctionTypeNode, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode, throwsType: TypeNode | undefined, rejectsType: TypeNode | undefined): FunctionTypeNode;
    createConstructorTypeNode(modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode): ConstructorTypeNode;
    updateConstructorTypeNode(node: ConstructorTypeNode, modifiers: readonly Modifier[] | undefined, typeParameters: NodeArray<TypeParameterDeclaration> | undefined, parameters: NodeArray<ParameterDeclaration>, type: TypeNode): ConstructorTypeNode;
    createTypeQueryNode(exprName: EntityName, typeArguments?: readonly TypeNode[]): TypeQueryNode;
    updateTypeQueryNode(node: TypeQueryNode, exprName: EntityName, typeArguments?: readonly TypeNode[]): TypeQueryNode;
    createTypeLiteralNode(members: readonly TypeElement[] | undefined): TypeLiteralNode;
    updateTypeLiteralNode(node: TypeLiteralNode, members: NodeArray<TypeElement>): TypeLiteralNode;
    createArrayTypeNode(elementType: TypeNode): ArrayTypeNode;
    updateArrayTypeNode(node: ArrayTypeNode, elementType: TypeNode): ArrayTypeNode;
    createTupleTypeNode(elements: readonly (TypeNode | NamedTupleMember)[]): TupleTypeNode;
    updateTupleTypeNode(node: TupleTypeNode, elements: readonly (TypeNode | NamedTupleMember)[]): TupleTypeNode;
    createNamedTupleMember(dotDotDotToken: DotDotDotToken | undefined, name: Identifier, questionToken: QuestionToken | undefined, type: TypeNode): NamedTupleMember;
    updateNamedTupleMember(node: NamedTupleMember, dotDotDotToken: DotDotDotToken | undefined, name: Identifier, questionToken: QuestionToken | undefined, type: TypeNode): NamedTupleMember;
    createOptionalTypeNode(type: TypeNode): OptionalTypeNode;
    updateOptionalTypeNode(node: OptionalTypeNode, type: TypeNode): OptionalTypeNode;
    createRestTypeNode(type: TypeNode): RestTypeNode;
    updateRestTypeNode(node: RestTypeNode, type: TypeNode): RestTypeNode;
    createUnionTypeNode(types: readonly TypeNode[]): UnionTypeNode;
    updateUnionTypeNode(node: UnionTypeNode, types: NodeArray<TypeNode>): UnionTypeNode;
    createIntersectionTypeNode(types: readonly TypeNode[]): IntersectionTypeNode;
    updateIntersectionTypeNode(node: IntersectionTypeNode, types: NodeArray<TypeNode>): IntersectionTypeNode;
    createConditionalTypeNode(checkType: TypeNode, extendsType: TypeNode, trueType: TypeNode, falseType: TypeNode): ConditionalTypeNode;
    updateConditionalTypeNode(node: ConditionalTypeNode, checkType: TypeNode, extendsType: TypeNode, trueType: TypeNode, falseType: TypeNode): ConditionalTypeNode;
    createInferTypeNode(typeParameter: TypeParameterDeclaration): InferTypeNode;
    updateInferTypeNode(node: InferTypeNode, typeParameter: TypeParameterDeclaration): InferTypeNode;
    createImportTypeNode(argument: TypeNode, attributes?: ImportAttributes, qualifier?: EntityName, typeArguments?: readonly TypeNode[], isTypeOf?: boolean): ImportTypeNode;
    updateImportTypeNode(node: ImportTypeNode, argument: TypeNode, attributes: ImportAttributes | undefined, qualifier: EntityName | undefined, typeArguments: readonly TypeNode[] | undefined, isTypeOf?: boolean): ImportTypeNode;
    createParenthesizedType(type: TypeNode): ParenthesizedTypeNode;
    updateParenthesizedType(node: ParenthesizedTypeNode, type: TypeNode): ParenthesizedTypeNode;
    createThisTypeNode(): ThisTypeNode;
    createTypeOperatorNode(operator: SyntaxKind.KeyOfKeyword | SyntaxKind.UniqueKeyword | SyntaxKind.ReadonlyKeyword, type: TypeNode): TypeOperatorNode;
    updateTypeOperatorNode(node: TypeOperatorNode, type: TypeNode): TypeOperatorNode;
    createIndexedAccessTypeNode(objectType: TypeNode, indexType: TypeNode): IndexedAccessTypeNode;
    updateIndexedAccessTypeNode(node: IndexedAccessTypeNode, objectType: TypeNode, indexType: TypeNode): IndexedAccessTypeNode;
    createMappedTypeNode(readonlyToken: ReadonlyKeyword | PlusToken | MinusToken | undefined, typeParameter: TypeParameterDeclaration, nameType: TypeNode | undefined, questionToken: QuestionToken | PlusToken | MinusToken | undefined, type: TypeNode | undefined, members: NodeArray<TypeElement> | undefined): MappedTypeNode;
    updateMappedTypeNode(node: MappedTypeNode, readonlyToken: ReadonlyKeyword | PlusToken | MinusToken | undefined, typeParameter: TypeParameterDeclaration, nameType: TypeNode | undefined, questionToken: QuestionToken | PlusToken | MinusToken | undefined, type: TypeNode | undefined, members: NodeArray<TypeElement> | undefined): MappedTypeNode;
    createLiteralTypeNode(literal: LiteralTypeNode["literal"]): LiteralTypeNode;
    updateLiteralTypeNode(node: LiteralTypeNode, literal: LiteralTypeNode["literal"]): LiteralTypeNode;
    createTemplateLiteralType(head: TemplateHead, templateSpans: readonly TemplateLiteralTypeSpan[]): TemplateLiteralTypeNode;
    updateTemplateLiteralType(node: TemplateLiteralTypeNode, head: TemplateHead, templateSpans: readonly TemplateLiteralTypeSpan[]): TemplateLiteralTypeNode;
    createObjectBindingPattern(elements: readonly BindingElement[]): ObjectBindingPattern;
    updateObjectBindingPattern(node: ObjectBindingPattern, elements: readonly BindingElement[]): ObjectBindingPattern;
    createArrayBindingPattern(elements: readonly ArrayBindingElement[]): ArrayBindingPattern;
    updateArrayBindingPattern(node: ArrayBindingPattern, elements: readonly ArrayBindingElement[]): ArrayBindingPattern;
    createBindingElement(dotDotDotToken: DotDotDotToken | undefined, propertyName: string | PropertyName | undefined, name: string | BindingName, initializer?: Expression): BindingElement;
    updateBindingElement(node: BindingElement, dotDotDotToken: DotDotDotToken | undefined, propertyName: PropertyName | undefined, name: BindingName, initializer: Expression | undefined): BindingElement;
    createArrayLiteralExpression(elements?: readonly Expression[], multiLine?: boolean): ArrayLiteralExpression;
    updateArrayLiteralExpression(node: ArrayLiteralExpression, elements: readonly Expression[]): ArrayLiteralExpression;
    createObjectLiteralExpression(properties?: readonly ObjectLiteralElementLike[], multiLine?: boolean): ObjectLiteralExpression;
    updateObjectLiteralExpression(node: ObjectLiteralExpression, properties: readonly ObjectLiteralElementLike[]): ObjectLiteralExpression;
    createPropertyAccessExpression(expression: Expression, name: string | MemberName): PropertyAccessExpression;
    updatePropertyAccessExpression(node: PropertyAccessExpression, expression: Expression, name: MemberName): PropertyAccessExpression;
    createPropertyAccessChain(expression: Expression, questionDotToken: QuestionDotToken | undefined, name: string | MemberName): PropertyAccessChain;
    updatePropertyAccessChain(node: PropertyAccessChain, expression: Expression, questionDotToken: QuestionDotToken | undefined, name: MemberName): PropertyAccessChain;
    createElementAccessExpression(expression: Expression, index: number | Expression): ElementAccessExpression;
    updateElementAccessExpression(node: ElementAccessExpression, expression: Expression, argumentExpression: Expression): ElementAccessExpression;
    createElementAccessChain(expression: Expression, questionDotToken: QuestionDotToken | undefined, index: number | Expression): ElementAccessChain;
    updateElementAccessChain(node: ElementAccessChain, expression: Expression, questionDotToken: QuestionDotToken | undefined, argumentExpression: Expression): ElementAccessChain;
    createCallExpression(expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined): CallExpression;
    updateCallExpression(node: CallExpression, expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[]): CallExpression;
    createCallChain(expression: Expression, questionDotToken: QuestionDotToken | undefined, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined): CallChain;
    updateCallChain(node: CallChain, expression: Expression, questionDotToken: QuestionDotToken | undefined, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[]): CallChain;
    createNewExpression(expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined): NewExpression;
    updateNewExpression(node: NewExpression, expression: Expression, typeArguments: readonly TypeNode[] | undefined, argumentsArray: readonly Expression[] | undefined): NewExpression;
    createTaggedTemplateExpression(tag: Expression, typeArguments: readonly TypeNode[] | undefined, template: TemplateLiteral): TaggedTemplateExpression;
    updateTaggedTemplateExpression(node: TaggedTemplateExpression, tag: Expression, typeArguments: readonly TypeNode[] | undefined, template: TemplateLiteral): TaggedTemplateExpression;
    createTypeAssertion(type: TypeNode, expression: Expression): TypeAssertion;
    updateTypeAssertion(node: TypeAssertion, type: TypeNode, expression: Expression): TypeAssertion;
    createParenthesizedExpression(expression: Expression): ParenthesizedExpression;
    updateParenthesizedExpression(node: ParenthesizedExpression, expression: Expression): ParenthesizedExpression;
    createFunctionExpression(modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[] | undefined, type: TypeNode | undefined, body: Block, throwsType: TypeNode | undefined, rejectsType: TypeNode | undefined): FunctionExpression;
    updateFunctionExpression(node: FunctionExpression, modifiers: readonly Modifier[] | undefined, asteriskToken: AsteriskToken | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block, throwsType: TypeNode | undefined, rejectsType: TypeNode | undefined): FunctionExpression;
    createArrowFunction(modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, equalsGreaterThanToken: EqualsGreaterThanToken | undefined, body: ConciseBody, throwsType: TypeNode | undefined, rejectsType: TypeNode | undefined): ArrowFunction;
    updateArrowFunction(node: ArrowFunction, modifiers: readonly Modifier[] | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, equalsGreaterThanToken: EqualsGreaterThanToken, body: ConciseBody, throwsType: TypeNode | undefined, rejectsType: TypeNode | undefined): ArrowFunction;
    createDeleteExpression(expression: Expression): DeleteExpression;
    updateDeleteExpression(node: DeleteExpression, expression: Expression): DeleteExpression;
    createTypeOfExpression(expression: Expression): TypeOfExpression;
    updateTypeOfExpression(node: TypeOfExpression, expression: Expression): TypeOfExpression;
    createVoidExpression(expression: Expression): VoidExpression;
    updateVoidExpression(node: VoidExpression, expression: Expression): VoidExpression;
    createAwaitExpression(expression: Expression): AwaitExpression;
    updateAwaitExpression(node: AwaitExpression, expression: Expression): AwaitExpression;
    createPrefixUnaryExpression(operator: PrefixUnaryOperator, operand: Expression): PrefixUnaryExpression;
    updatePrefixUnaryExpression(node: PrefixUnaryExpression, operand: Expression): PrefixUnaryExpression;
    createPostfixUnaryExpression(operand: Expression, operator: PostfixUnaryOperator): PostfixUnaryExpression;
    updatePostfixUnaryExpression(node: PostfixUnaryExpression, operand: Expression): PostfixUnaryExpression;
    createBinaryExpression(left: Expression, operator: BinaryOperator | BinaryOperatorToken, right: Expression): BinaryExpression;
    updateBinaryExpression(node: BinaryExpression, left: Expression, operator: BinaryOperator | BinaryOperatorToken, right: Expression): BinaryExpression;
    createConditionalExpression(condition: Expression, questionToken: QuestionToken | undefined, whenTrue: Expression, colonToken: ColonToken | undefined, whenFalse: Expression): ConditionalExpression;
    updateConditionalExpression(node: ConditionalExpression, condition: Expression, questionToken: QuestionToken, whenTrue: Expression, colonToken: ColonToken, whenFalse: Expression): ConditionalExpression;
    createTemplateExpression(head: TemplateHead, templateSpans: readonly TemplateSpan[]): TemplateExpression;
    updateTemplateExpression(node: TemplateExpression, head: TemplateHead, templateSpans: readonly TemplateSpan[]): TemplateExpression;
    createTemplateHead(text: string, rawText?: string, templateFlags?: TokenFlags): TemplateHead;
    createTemplateHead(text: string | undefined, rawText: string, templateFlags?: TokenFlags): TemplateHead;
    createTemplateMiddle(text: string, rawText?: string, templateFlags?: TokenFlags): TemplateMiddle;
    createTemplateMiddle(text: string | undefined, rawText: string, templateFlags?: TokenFlags): TemplateMiddle;
    createTemplateTail(text: string, rawText?: string, templateFlags?: TokenFlags): TemplateTail;
    createTemplateTail(text: string | undefined, rawText: string, templateFlags?: TokenFlags): TemplateTail;
    createNoSubstitutionTemplateLiteral(text: string, rawText?: string): NoSubstitutionTemplateLiteral;
    createNoSubstitutionTemplateLiteral(text: string | undefined, rawText: string): NoSubstitutionTemplateLiteral;
    /** @internal */ createLiteralLikeNode(kind: LiteralToken["kind"] | SyntaxKind.JsxTextAllWhiteSpaces, text: string): LiteralToken;
    /** @internal */ createTemplateLiteralLikeNode(kind: TemplateLiteralToken["kind"], text: string, rawText: string, templateFlags: TokenFlags | undefined): TemplateLiteralLikeNode;
    createYieldExpression(asteriskToken: AsteriskToken, expression: Expression): YieldExpression;
    createYieldExpression(asteriskToken: undefined, expression: Expression | undefined): YieldExpression;
    /** @internal */ createYieldExpression(asteriskToken: AsteriskToken | undefined, expression: Expression | undefined): YieldExpression;
    updateYieldExpression(node: YieldExpression, asteriskToken: AsteriskToken | undefined, expression: Expression | undefined): YieldExpression;
    createSpreadElement(expression: Expression): SpreadElement;
    updateSpreadElement(node: SpreadElement, expression: Expression): SpreadElement;
    createClassExpression(modifiers: readonly ModifierLike[] | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassExpression;
    updateClassExpression(node: ClassExpression, modifiers: readonly ModifierLike[] | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassExpression;
    createOmittedExpression(): OmittedExpression;
    createExpressionWithTypeArguments(expression: Expression, typeArguments: readonly TypeNode[] | undefined): ExpressionWithTypeArguments;
    updateExpressionWithTypeArguments(node: ExpressionWithTypeArguments, expression: Expression, typeArguments: readonly TypeNode[] | undefined): ExpressionWithTypeArguments;
    createAsExpression(expression: Expression, type: TypeNode): AsExpression;
    updateAsExpression(node: AsExpression, expression: Expression, type: TypeNode): AsExpression;
    createNonNullExpression(expression: Expression): NonNullExpression;
    updateNonNullExpression(node: NonNullExpression, expression: Expression): NonNullExpression;
    createNonNullChain(expression: Expression): NonNullChain;
    updateNonNullChain(node: NonNullChain, expression: Expression): NonNullChain;
    createMetaProperty(keywordToken: MetaProperty["keywordToken"], name: Identifier): MetaProperty;
    updateMetaProperty(node: MetaProperty, name: Identifier): MetaProperty;
    createSatisfiesExpression(expression: Expression, type: TypeNode): SatisfiesExpression;
    updateSatisfiesExpression(node: SatisfiesExpression, expression: Expression, type: TypeNode): SatisfiesExpression;
    createTemplateSpan(expression: Expression, literal: TemplateMiddle | TemplateTail): TemplateSpan;
    updateTemplateSpan(node: TemplateSpan, expression: Expression, literal: TemplateMiddle | TemplateTail): TemplateSpan;
    createSemicolonClassElement(): SemicolonClassElement;
    createBlock(statements: readonly Statement[], multiLine?: boolean): Block;
    updateBlock(node: Block, statements: readonly Statement[]): Block;
    createVariableStatement(modifiers: readonly ModifierLike[] | undefined, declarationList: VariableDeclarationList | readonly VariableDeclaration[]): VariableStatement;
    updateVariableStatement(node: VariableStatement, modifiers: readonly ModifierLike[] | undefined, declarationList: VariableDeclarationList): VariableStatement;
    createEmptyStatement(): EmptyStatement;
    createExpressionStatement(expression: Expression): ExpressionStatement;
    updateExpressionStatement(node: ExpressionStatement, expression: Expression): ExpressionStatement;
    createIfStatement(expression: Expression, thenStatement: Statement, elseStatement?: Statement): IfStatement;
    updateIfStatement(node: IfStatement, expression: Expression, thenStatement: Statement, elseStatement: Statement | undefined): IfStatement;
    createDoStatement(statement: Statement, expression: Expression): DoStatement;
    updateDoStatement(node: DoStatement, statement: Statement, expression: Expression): DoStatement;
    createWhileStatement(expression: Expression, statement: Statement): WhileStatement;
    updateWhileStatement(node: WhileStatement, expression: Expression, statement: Statement): WhileStatement;
    createForStatement(initializer: ForInitializer | undefined, condition: Expression | undefined, incrementor: Expression | undefined, statement: Statement): ForStatement;
    updateForStatement(node: ForStatement, initializer: ForInitializer | undefined, condition: Expression | undefined, incrementor: Expression | undefined, statement: Statement): ForStatement;
    createForInStatement(initializer: ForInitializer, expression: Expression, statement: Statement): ForInStatement;
    updateForInStatement(node: ForInStatement, initializer: ForInitializer, expression: Expression, statement: Statement): ForInStatement;
    createForOfStatement(awaitModifier: AwaitKeyword | undefined, initializer: ForInitializer, expression: Expression, statement: Statement): ForOfStatement;
    updateForOfStatement(node: ForOfStatement, awaitModifier: AwaitKeyword | undefined, initializer: ForInitializer, expression: Expression, statement: Statement): ForOfStatement;
    createContinueStatement(label?: string | Identifier): ContinueStatement;
    updateContinueStatement(node: ContinueStatement, label: Identifier | undefined): ContinueStatement;
    createBreakStatement(label?: string | Identifier): BreakStatement;
    updateBreakStatement(node: BreakStatement, label: Identifier | undefined): BreakStatement;
    createReturnStatement(expression?: Expression): ReturnStatement;
    updateReturnStatement(node: ReturnStatement, expression: Expression | undefined): ReturnStatement;
    createWithStatement(expression: Expression, statement: Statement): WithStatement;
    updateWithStatement(node: WithStatement, expression: Expression, statement: Statement): WithStatement;
    createSwitchStatement(expression: Expression, caseBlock: CaseBlock): SwitchStatement;
    updateSwitchStatement(node: SwitchStatement, expression: Expression, caseBlock: CaseBlock): SwitchStatement;
    createLabeledStatement(label: string | Identifier, statement: Statement): LabeledStatement;
    updateLabeledStatement(node: LabeledStatement, label: Identifier, statement: Statement): LabeledStatement;
    createThrowStatement(expression: Expression): ThrowStatement;
    updateThrowStatement(node: ThrowStatement, expression: Expression): ThrowStatement;
    createTryStatement(tryBlock: Block, catchClause: CatchClause | undefined, finallyBlock: Block | undefined): TryStatement;
    updateTryStatement(node: TryStatement, tryBlock: Block, catchClause: CatchClause | undefined, finallyBlock: Block | undefined): TryStatement;
    createDebuggerStatement(): DebuggerStatement;
    createVariableDeclaration(name: string | BindingName, exclamationToken?: ExclamationToken, type?: TypeNode, initializer?: Expression): VariableDeclaration;
    updateVariableDeclaration(node: VariableDeclaration, name: BindingName, exclamationToken: ExclamationToken | undefined, type: TypeNode | undefined, initializer: Expression | undefined): VariableDeclaration;
    createVariableDeclarationList(declarations: readonly VariableDeclaration[], flags?: NodeFlags): VariableDeclarationList;
    updateVariableDeclarationList(node: VariableDeclarationList, declarations: readonly VariableDeclaration[]): VariableDeclarationList;
    createFunctionDeclaration(modifiers: readonly ModifierLike[] | undefined, asteriskToken: AsteriskToken | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined, throwsType: TypeNode | undefined, rejectsType: TypeNode | undefined): FunctionDeclaration;
    updateFunctionDeclaration(node: FunctionDeclaration, modifiers: readonly ModifierLike[] | undefined, asteriskToken: AsteriskToken | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined, body: Block | undefined, throwsType: TypeNode | undefined, rejectsType: TypeNode | undefined): FunctionDeclaration;
    createClassDeclaration(modifiers: readonly ModifierLike[] | undefined, name: string | Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassDeclaration;
    updateClassDeclaration(node: ClassDeclaration, modifiers: readonly ModifierLike[] | undefined, name: Identifier | undefined, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly ClassElement[]): ClassDeclaration;
    createInterfaceDeclaration(modifiers: readonly ModifierLike[] | undefined, name: string | Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly TypeElement[]): InterfaceDeclaration;
    updateInterfaceDeclaration(node: InterfaceDeclaration, modifiers: readonly ModifierLike[] | undefined, name: Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, heritageClauses: readonly HeritageClause[] | undefined, members: readonly TypeElement[]): InterfaceDeclaration;
    createTypeAliasDeclaration(modifiers: readonly ModifierLike[] | undefined, name: string | Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, type: TypeNode): TypeAliasDeclaration;
    updateTypeAliasDeclaration(node: TypeAliasDeclaration, modifiers: readonly ModifierLike[] | undefined, name: Identifier, typeParameters: readonly TypeParameterDeclaration[] | undefined, type: TypeNode): TypeAliasDeclaration;
    createEnumDeclaration(modifiers: readonly ModifierLike[] | undefined, name: string | Identifier, members: readonly EnumMember[]): EnumDeclaration;
    updateEnumDeclaration(node: EnumDeclaration, modifiers: readonly ModifierLike[] | undefined, name: Identifier, members: readonly EnumMember[]): EnumDeclaration;
    createModuleDeclaration(modifiers: readonly ModifierLike[] | undefined, name: ModuleName, body: ModuleBody | undefined, flags?: NodeFlags): ModuleDeclaration;
    updateModuleDeclaration(node: ModuleDeclaration, modifiers: readonly ModifierLike[] | undefined, name: ModuleName, body: ModuleBody | undefined): ModuleDeclaration;
    createModuleBlock(statements: readonly Statement[]): ModuleBlock;
    updateModuleBlock(node: ModuleBlock, statements: readonly Statement[]): ModuleBlock;
    createCaseBlock(clauses: readonly CaseOrDefaultClause[]): CaseBlock;
    updateCaseBlock(node: CaseBlock, clauses: readonly CaseOrDefaultClause[]): CaseBlock;
    createNamespaceExportDeclaration(name: string | Identifier): NamespaceExportDeclaration;
    updateNamespaceExportDeclaration(node: NamespaceExportDeclaration, name: Identifier): NamespaceExportDeclaration;
    createImportEqualsDeclaration(modifiers: readonly ModifierLike[] | undefined, isTypeOnly: boolean, name: string | Identifier, moduleReference: ModuleReference): ImportEqualsDeclaration;
    updateImportEqualsDeclaration(node: ImportEqualsDeclaration, modifiers: readonly ModifierLike[] | undefined, isTypeOnly: boolean, name: Identifier, moduleReference: ModuleReference): ImportEqualsDeclaration;
    createImportDeclaration(modifiers: readonly ModifierLike[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, attributes?: ImportAttributes): ImportDeclaration;
    updateImportDeclaration(node: ImportDeclaration, modifiers: readonly ModifierLike[] | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, attributes: ImportAttributes | undefined): ImportDeclaration;
    createImportClause(phaseModifier: ImportPhaseModifierSyntaxKind | undefined, name: Identifier | undefined, namedBindings: NamedImportBindings | undefined): ImportClause;
    /** @deprecated */ createImportClause(isTypeOnly: boolean, name: Identifier | undefined, namedBindings: NamedImportBindings | undefined): ImportClause;
    updateImportClause(node: ImportClause, phaseModifier: ImportPhaseModifierSyntaxKind | undefined, name: Identifier | undefined, namedBindings: NamedImportBindings | undefined): ImportClause;
    /** @deprecated */ updateImportClause(node: ImportClause, isTypeOnly: boolean, name: Identifier | undefined, namedBindings: NamedImportBindings | undefined): ImportClause;
    /** @deprecated */ createAssertClause(elements: NodeArray<AssertEntry>, multiLine?: boolean): AssertClause;
    /** @deprecated */ updateAssertClause(node: AssertClause, elements: NodeArray<AssertEntry>, multiLine?: boolean): AssertClause;
    /** @deprecated */ createAssertEntry(name: AssertionKey, value: Expression): AssertEntry;
    /** @deprecated */ updateAssertEntry(node: AssertEntry, name: AssertionKey, value: Expression): AssertEntry;
    /** @deprecated */ createImportTypeAssertionContainer(clause: AssertClause, multiLine?: boolean): ImportTypeAssertionContainer;
    /** @deprecated */ updateImportTypeAssertionContainer(node: ImportTypeAssertionContainer, clause: AssertClause, multiLine?: boolean): ImportTypeAssertionContainer;
    createImportAttributes(elements: NodeArray<ImportAttribute>, multiLine?: boolean): ImportAttributes;
    /** @internal */ createImportAttributes(elements: NodeArray<ImportAttribute>, multiLine?: boolean, token?: ImportAttributes["token"]): ImportAttributes;
    updateImportAttributes(node: ImportAttributes, elements: NodeArray<ImportAttribute>, multiLine?: boolean): ImportAttributes;
    createImportAttribute(name: ImportAttributeName, value: Expression): ImportAttribute;
    updateImportAttribute(node: ImportAttribute, name: ImportAttributeName, value: Expression): ImportAttribute;
    createNamespaceImport(name: Identifier): NamespaceImport;
    updateNamespaceImport(node: NamespaceImport, name: Identifier): NamespaceImport;
    createNamespaceExport(name: ModuleExportName): NamespaceExport;
    updateNamespaceExport(node: NamespaceExport, name: ModuleExportName): NamespaceExport;
    createNamedImports(elements: readonly ImportSpecifier[]): NamedImports;
    updateNamedImports(node: NamedImports, elements: readonly ImportSpecifier[]): NamedImports;
    createImportSpecifier(isTypeOnly: boolean, propertyName: ModuleExportName | undefined, name: Identifier): ImportSpecifier;
    updateImportSpecifier(node: ImportSpecifier, isTypeOnly: boolean, propertyName: ModuleExportName | undefined, name: Identifier): ImportSpecifier;
    createExportAssignment(modifiers: readonly ModifierLike[] | undefined, isExportEquals: boolean | undefined, expression: Expression): ExportAssignment;
    updateExportAssignment(node: ExportAssignment, modifiers: readonly ModifierLike[] | undefined, expression: Expression): ExportAssignment;
    createExportDeclaration(modifiers: readonly ModifierLike[] | undefined, isTypeOnly: boolean, exportClause: NamedExportBindings | undefined, moduleSpecifier?: Expression, attributes?: ImportAttributes): ExportDeclaration;
    updateExportDeclaration(node: ExportDeclaration, modifiers: readonly ModifierLike[] | undefined, isTypeOnly: boolean, exportClause: NamedExportBindings | undefined, moduleSpecifier: Expression | undefined, attributes: ImportAttributes | undefined): ExportDeclaration;
    createNamedExports(elements: readonly ExportSpecifier[]): NamedExports;
    updateNamedExports(node: NamedExports, elements: readonly ExportSpecifier[]): NamedExports;
    createExportSpecifier(isTypeOnly: boolean, propertyName: string | ModuleExportName | undefined, name: string | ModuleExportName): ExportSpecifier;
    updateExportSpecifier(node: ExportSpecifier, isTypeOnly: boolean, propertyName: ModuleExportName | undefined, name: ModuleExportName): ExportSpecifier;
    /** @internal */ createMissingDeclaration(): MissingDeclaration;
    createExternalModuleReference(expression: Expression): ExternalModuleReference;
    updateExternalModuleReference(node: ExternalModuleReference, expression: Expression): ExternalModuleReference;
    createJSDocAllType(): JSDocAllType;
    createJSDocUnknownType(): JSDocUnknownType;
    createJSDocNonNullableType(type: TypeNode, postfix?: boolean): JSDocNonNullableType;
    updateJSDocNonNullableType(node: JSDocNonNullableType, type: TypeNode): JSDocNonNullableType;
    createJSDocNullableType(type: TypeNode, postfix?: boolean): JSDocNullableType;
    updateJSDocNullableType(node: JSDocNullableType, type: TypeNode): JSDocNullableType;
    createJSDocOptionalType(type: TypeNode): JSDocOptionalType;
    updateJSDocOptionalType(node: JSDocOptionalType, type: TypeNode): JSDocOptionalType;
    createJSDocFunctionType(parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): JSDocFunctionType;
    updateJSDocFunctionType(node: JSDocFunctionType, parameters: readonly ParameterDeclaration[], type: TypeNode | undefined): JSDocFunctionType;
    createJSDocVariadicType(type: TypeNode): JSDocVariadicType;
    updateJSDocVariadicType(node: JSDocVariadicType, type: TypeNode): JSDocVariadicType;
    createJSDocNamepathType(type: TypeNode): JSDocNamepathType;
    updateJSDocNamepathType(node: JSDocNamepathType, type: TypeNode): JSDocNamepathType;
    createJSDocTypeExpression(type: TypeNode): JSDocTypeExpression;
    updateJSDocTypeExpression(node: JSDocTypeExpression, type: TypeNode): JSDocTypeExpression;
    createJSDocNameReference(name: EntityName | JSDocMemberName): JSDocNameReference;
    updateJSDocNameReference(node: JSDocNameReference, name: EntityName | JSDocMemberName): JSDocNameReference;
    createJSDocMemberName(left: EntityName | JSDocMemberName, right: Identifier): JSDocMemberName;
    updateJSDocMemberName(node: JSDocMemberName, left: EntityName | JSDocMemberName, right: Identifier): JSDocMemberName;
    createJSDocLink(name: EntityName | JSDocMemberName | undefined, text: string): JSDocLink;
    updateJSDocLink(node: JSDocLink, name: EntityName | JSDocMemberName | undefined, text: string): JSDocLink;
    createJSDocLinkCode(name: EntityName | JSDocMemberName | undefined, text: string): JSDocLinkCode;
    updateJSDocLinkCode(node: JSDocLinkCode, name: EntityName | JSDocMemberName | undefined, text: string): JSDocLinkCode;
    createJSDocLinkPlain(name: EntityName | JSDocMemberName | undefined, text: string): JSDocLinkPlain;
    updateJSDocLinkPlain(node: JSDocLinkPlain, name: EntityName | JSDocMemberName | undefined, text: string): JSDocLinkPlain;
    createJSDocTypeLiteral(jsDocPropertyTags?: readonly JSDocPropertyLikeTag[], isArrayType?: boolean): JSDocTypeLiteral;
    updateJSDocTypeLiteral(node: JSDocTypeLiteral, jsDocPropertyTags: readonly JSDocPropertyLikeTag[] | undefined, isArrayType: boolean | undefined): JSDocTypeLiteral;
    createJSDocSignature(typeParameters: readonly JSDocTemplateTag[] | undefined, parameters: readonly JSDocParameterTag[], type?: JSDocReturnTag): JSDocSignature;
    updateJSDocSignature(node: JSDocSignature, typeParameters: readonly JSDocTemplateTag[] | undefined, parameters: readonly JSDocParameterTag[], type: JSDocReturnTag | undefined): JSDocSignature;
    createJSDocTemplateTag(tagName: Identifier | undefined, constraint: JSDocTypeExpression | undefined, typeParameters: readonly TypeParameterDeclaration[], comment?: string | NodeArray<JSDocComment>): JSDocTemplateTag;
    updateJSDocTemplateTag(node: JSDocTemplateTag, tagName: Identifier | undefined, constraint: JSDocTypeExpression | undefined, typeParameters: readonly TypeParameterDeclaration[], comment: string | NodeArray<JSDocComment> | undefined): JSDocTemplateTag;
    createJSDocTypedefTag(tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression | JSDocTypeLiteral, fullName?: Identifier | JSDocNamespaceDeclaration, comment?: string | NodeArray<JSDocComment>): JSDocTypedefTag;
    updateJSDocTypedefTag(node: JSDocTypedefTag, tagName: Identifier | undefined, typeExpression: JSDocTypeExpression | JSDocTypeLiteral | undefined, fullName: Identifier | JSDocNamespaceDeclaration | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocTypedefTag;
    createJSDocParameterTag(tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression, isNameFirst?: boolean, comment?: string | NodeArray<JSDocComment>): JSDocParameterTag;
    updateJSDocParameterTag(node: JSDocParameterTag, tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression: JSDocTypeExpression | undefined, isNameFirst: boolean, comment: string | NodeArray<JSDocComment> | undefined): JSDocParameterTag;
    createJSDocPropertyTag(tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression?: JSDocTypeExpression, isNameFirst?: boolean, comment?: string | NodeArray<JSDocComment>): JSDocPropertyTag;
    updateJSDocPropertyTag(node: JSDocPropertyTag, tagName: Identifier | undefined, name: EntityName, isBracketed: boolean, typeExpression: JSDocTypeExpression | undefined, isNameFirst: boolean, comment: string | NodeArray<JSDocComment> | undefined): JSDocPropertyTag;
    createJSDocTypeTag(tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment>): JSDocTypeTag;
    updateJSDocTypeTag(node: JSDocTypeTag, tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment: string | NodeArray<JSDocComment> | undefined): JSDocTypeTag;
    createJSDocSeeTag(tagName: Identifier | undefined, nameExpression: JSDocNameReference | undefined, comment?: string | NodeArray<JSDocComment>): JSDocSeeTag;
    updateJSDocSeeTag(node: JSDocSeeTag, tagName: Identifier | undefined, nameExpression: JSDocNameReference | undefined, comment?: string | NodeArray<JSDocComment>): JSDocSeeTag;
    createJSDocReturnTag(tagName: Identifier | undefined, typeExpression?: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment>): JSDocReturnTag;
    updateJSDocReturnTag(node: JSDocReturnTag, tagName: Identifier | undefined, typeExpression: JSDocTypeExpression | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocReturnTag;
    createJSDocThisTag(tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment>): JSDocThisTag;
    updateJSDocThisTag(node: JSDocThisTag, tagName: Identifier | undefined, typeExpression: JSDocTypeExpression | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocThisTag;
    createJSDocEnumTag(tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment>): JSDocEnumTag;
    updateJSDocEnumTag(node: JSDocEnumTag, tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment: string | NodeArray<JSDocComment> | undefined): JSDocEnumTag;
    createJSDocCallbackTag(tagName: Identifier | undefined, typeExpression: JSDocSignature, fullName?: Identifier | JSDocNamespaceDeclaration, comment?: string | NodeArray<JSDocComment>): JSDocCallbackTag;
    updateJSDocCallbackTag(node: JSDocCallbackTag, tagName: Identifier | undefined, typeExpression: JSDocSignature, fullName: Identifier | JSDocNamespaceDeclaration | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocCallbackTag;
    createJSDocOverloadTag(tagName: Identifier | undefined, typeExpression: JSDocSignature, comment?: string | NodeArray<JSDocComment>): JSDocOverloadTag;
    updateJSDocOverloadTag(node: JSDocOverloadTag, tagName: Identifier | undefined, typeExpression: JSDocSignature, comment: string | NodeArray<JSDocComment> | undefined): JSDocOverloadTag;
    createJSDocAugmentsTag(tagName: Identifier | undefined, className: JSDocAugmentsTag["class"], comment?: string | NodeArray<JSDocComment>): JSDocAugmentsTag;
    updateJSDocAugmentsTag(node: JSDocAugmentsTag, tagName: Identifier | undefined, className: JSDocAugmentsTag["class"], comment: string | NodeArray<JSDocComment> | undefined): JSDocAugmentsTag;
    createJSDocImplementsTag(tagName: Identifier | undefined, className: JSDocImplementsTag["class"], comment?: string | NodeArray<JSDocComment>): JSDocImplementsTag;
    updateJSDocImplementsTag(node: JSDocImplementsTag, tagName: Identifier | undefined, className: JSDocImplementsTag["class"], comment: string | NodeArray<JSDocComment> | undefined): JSDocImplementsTag;
    createJSDocAuthorTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocAuthorTag;
    updateJSDocAuthorTag(node: JSDocAuthorTag, tagName: Identifier | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocAuthorTag;
    createJSDocClassTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocClassTag;
    updateJSDocClassTag(node: JSDocClassTag, tagName: Identifier | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocClassTag;
    createJSDocPublicTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocPublicTag;
    updateJSDocPublicTag(node: JSDocPublicTag, tagName: Identifier | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocPublicTag;
    createJSDocPrivateTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocPrivateTag;
    updateJSDocPrivateTag(node: JSDocPrivateTag, tagName: Identifier | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocPrivateTag;
    createJSDocProtectedTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocProtectedTag;
    updateJSDocProtectedTag(node: JSDocProtectedTag, tagName: Identifier | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocProtectedTag;
    createJSDocReadonlyTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocReadonlyTag;
    updateJSDocReadonlyTag(node: JSDocReadonlyTag, tagName: Identifier | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocReadonlyTag;
    createJSDocUnknownTag(tagName: Identifier, comment?: string | NodeArray<JSDocComment>): JSDocUnknownTag;
    updateJSDocUnknownTag(node: JSDocUnknownTag, tagName: Identifier, comment: string | NodeArray<JSDocComment> | undefined): JSDocUnknownTag;
    createJSDocDeprecatedTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocDeprecatedTag;
    updateJSDocDeprecatedTag(node: JSDocDeprecatedTag, tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocDeprecatedTag;
    createJSDocOverrideTag(tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocOverrideTag;
    updateJSDocOverrideTag(node: JSDocOverrideTag, tagName: Identifier | undefined, comment?: string | NodeArray<JSDocComment>): JSDocOverrideTag;
    createJSDocThrowsTag(tagName: Identifier, typeExpression: JSDocTypeExpression | undefined, comment?: string | NodeArray<JSDocComment>): JSDocThrowsTag;
    updateJSDocThrowsTag(node: JSDocThrowsTag, tagName: Identifier | undefined, typeExpression: JSDocTypeExpression | undefined, comment?: string | NodeArray<JSDocComment> | undefined): JSDocThrowsTag;
    createJSDocSatisfiesTag(tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment?: string | NodeArray<JSDocComment>): JSDocSatisfiesTag;
    updateJSDocSatisfiesTag(node: JSDocSatisfiesTag, tagName: Identifier | undefined, typeExpression: JSDocTypeExpression, comment: string | NodeArray<JSDocComment> | undefined): JSDocSatisfiesTag;
    createJSDocImportTag(tagName: Identifier | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, attributes?: ImportAttributes, comment?: string | NodeArray<JSDocComment>): JSDocImportTag;
    updateJSDocImportTag(node: JSDocImportTag, tagName: Identifier | undefined, importClause: ImportClause | undefined, moduleSpecifier: Expression, attributes: ImportAttributes | undefined, comment: string | NodeArray<JSDocComment> | undefined): JSDocImportTag;
    createJSDocText(text: string): JSDocText;
    updateJSDocText(node: JSDocText, text: string): JSDocText;
    createJSDocComment(comment?: string | NodeArray<JSDocComment> | undefined, tags?: readonly JSDocTag[] | undefined): JSDoc;
    updateJSDocComment(node: JSDoc, comment: string | NodeArray<JSDocComment> | undefined, tags: readonly JSDocTag[] | undefined): JSDoc;
    createJsxElement(openingElement: JsxOpeningElement, children: readonly JsxChild[], closingElement: JsxClosingElement): JsxElement;
    updateJsxElement(node: JsxElement, openingElement: JsxOpeningElement, children: readonly JsxChild[], closingElement: JsxClosingElement): JsxElement;
    createJsxSelfClosingElement(tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes): JsxSelfClosingElement;
    updateJsxSelfClosingElement(node: JsxSelfClosingElement, tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes): JsxSelfClosingElement;
    createJsxOpeningElement(tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes): JsxOpeningElement;
    updateJsxOpeningElement(node: JsxOpeningElement, tagName: JsxTagNameExpression, typeArguments: readonly TypeNode[] | undefined, attributes: JsxAttributes): JsxOpeningElement;
    createJsxClosingElement(tagName: JsxTagNameExpression): JsxClosingElement;
    updateJsxClosingElement(node: JsxClosingElement, tagName: JsxTagNameExpression): JsxClosingElement;
    createJsxFragment(openingFragment: JsxOpeningFragment, children: readonly JsxChild[], closingFragment: JsxClosingFragment): JsxFragment;
    createJsxText(text: string, containsOnlyTriviaWhiteSpaces?: boolean): JsxText;
    updateJsxText(node: JsxText, text: string, containsOnlyTriviaWhiteSpaces?: boolean): JsxText;
    createJsxOpeningFragment(): JsxOpeningFragment;
    createJsxJsxClosingFragment(): JsxClosingFragment;
    updateJsxFragment(node: JsxFragment, openingFragment: JsxOpeningFragment, children: readonly JsxChild[], closingFragment: JsxClosingFragment): JsxFragment;
    createJsxAttribute(name: JsxAttributeName, initializer: JsxAttributeValue | undefined): JsxAttribute;
    updateJsxAttribute(node: JsxAttribute, name: JsxAttributeName, initializer: JsxAttributeValue | undefined): JsxAttribute;
    createJsxAttributes(properties: readonly JsxAttributeLike[]): JsxAttributes;
    updateJsxAttributes(node: JsxAttributes, properties: readonly JsxAttributeLike[]): JsxAttributes;
    createJsxSpreadAttribute(expression: Expression): JsxSpreadAttribute;
    updateJsxSpreadAttribute(node: JsxSpreadAttribute, expression: Expression): JsxSpreadAttribute;
    createJsxExpression(dotDotDotToken: DotDotDotToken | undefined, expression: Expression | undefined): JsxExpression;
    updateJsxExpression(node: JsxExpression, expression: Expression | undefined): JsxExpression;
    createJsxNamespacedName(namespace: Identifier, name: Identifier): JsxNamespacedName;
    updateJsxNamespacedName(node: JsxNamespacedName, namespace: Identifier, name: Identifier): JsxNamespacedName;
    createCaseClause(expression: Expression, statements: readonly Statement[]): CaseClause;
    updateCaseClause(node: CaseClause, expression: Expression, statements: readonly Statement[]): CaseClause;
    createDefaultClause(statements: readonly Statement[]): DefaultClause;
    updateDefaultClause(node: DefaultClause, statements: readonly Statement[]): DefaultClause;
    createHeritageClause(token: HeritageClause["token"], types: readonly ExpressionWithTypeArguments[]): HeritageClause;
    updateHeritageClause(node: HeritageClause, types: readonly ExpressionWithTypeArguments[]): HeritageClause;
    createCatchClause(variableDeclaration: string | BindingName | VariableDeclaration | undefined, block: Block): CatchClause;
    updateCatchClause(node: CatchClause, variableDeclaration: VariableDeclaration | undefined, block: Block): CatchClause;
    createPropertyAssignment(name: string | PropertyName, initializer: Expression): PropertyAssignment;
    updatePropertyAssignment(node: PropertyAssignment, name: PropertyName, initializer: Expression): PropertyAssignment;
    createShorthandPropertyAssignment(name: string | Identifier, objectAssignmentInitializer?: Expression): ShorthandPropertyAssignment;
    updateShorthandPropertyAssignment(node: ShorthandPropertyAssignment, name: Identifier, objectAssignmentInitializer: Expression | undefined): ShorthandPropertyAssignment;
    createSpreadAssignment(expression: Expression): SpreadAssignment;
    updateSpreadAssignment(node: SpreadAssignment, expression: Expression): SpreadAssignment;
    createEnumMember(name: string | PropertyName, initializer?: Expression): EnumMember;
    updateEnumMember(node: EnumMember, name: PropertyName, initializer: Expression | undefined): EnumMember;
    createSourceFile(statements: readonly Statement[], endOfFileToken: EndOfFileToken, flags: NodeFlags): SourceFile;
    updateSourceFile(node: SourceFile, statements: readonly Statement[], isDeclarationFile?: boolean, referencedFiles?: readonly FileReference[], typeReferences?: readonly FileReference[], hasNoDefaultLib?: boolean, libReferences?: readonly FileReference[]): SourceFile;
    /** @internal */ createRedirectedSourceFile(redirectInfo: RedirectInfo): SourceFile;
    /** @internal */ createSyntheticExpression(type: Type, isSpread?: boolean, tupleNameSource?: ParameterDeclaration | NamedTupleMember): SyntheticExpression;
    /** @internal */ createSyntaxList(children: readonly Node[]): SyntaxList;
    createNotEmittedStatement(original: Node): NotEmittedStatement;
    createNotEmittedTypeElement(): NotEmittedTypeElement;
    createPartiallyEmittedExpression(expression: Expression, original?: Node): PartiallyEmittedExpression;
    updatePartiallyEmittedExpression(node: PartiallyEmittedExpression, expression: Expression): PartiallyEmittedExpression;
    /** @internal */ createSyntheticReferenceExpression(expression: Expression, thisArg: Expression): SyntheticReferenceExpression;
    /** @internal */ updateSyntheticReferenceExpression(node: SyntheticReferenceExpression, expression: Expression, thisArg: Expression): SyntheticReferenceExpression;
    createCommaListExpression(elements: readonly Expression[]): CommaListExpression;
    updateCommaListExpression(node: CommaListExpression, elements: readonly Expression[]): CommaListExpression;
    createBundle(sourceFiles: readonly SourceFile[]): Bundle;
    updateBundle(node: Bundle, sourceFiles: readonly SourceFile[]): Bundle;
    createComma(left: Expression, right: Expression): BinaryExpression;
    createAssignment(left: ObjectLiteralExpression | ArrayLiteralExpression, right: Expression): DestructuringAssignment;
    createAssignment(left: Expression, right: Expression): AssignmentExpression<EqualsToken>;
    createLogicalOr(left: Expression, right: Expression): BinaryExpression;
    createLogicalAnd(left: Expression, right: Expression): BinaryExpression;
    createBitwiseOr(left: Expression, right: Expression): BinaryExpression;
    createBitwiseXor(left: Expression, right: Expression): BinaryExpression;
    createBitwiseAnd(left: Expression, right: Expression): BinaryExpression;
    createStrictEquality(left: Expression, right: Expression): BinaryExpression;
    createStrictInequality(left: Expression, right: Expression): BinaryExpression;
    createEquality(left: Expression, right: Expression): BinaryExpression;
    createInequality(left: Expression, right: Expression): BinaryExpression;
    createLessThan(left: Expression, right: Expression): BinaryExpression;
    createLessThanEquals(left: Expression, right: Expression): BinaryExpression;
    createGreaterThan(left: Expression, right: Expression): BinaryExpression;
    createGreaterThanEquals(left: Expression, right: Expression): BinaryExpression;
    createLeftShift(left: Expression, right: Expression): BinaryExpression;
    createRightShift(left: Expression, right: Expression): BinaryExpression;
    createUnsignedRightShift(left: Expression, right: Expression): BinaryExpression;
    createAdd(left: Expression, right: Expression): BinaryExpression;
    createSubtract(left: Expression, right: Expression): BinaryExpression;
    createMultiply(left: Expression, right: Expression): BinaryExpression;
    createDivide(left: Expression, right: Expression): BinaryExpression;
    createModulo(left: Expression, right: Expression): BinaryExpression;
    createExponent(left: Expression, right: Expression): BinaryExpression;
    createPrefixPlus(operand: Expression): PrefixUnaryExpression;
    createPrefixMinus(operand: Expression): PrefixUnaryExpression;
    createPrefixIncrement(operand: Expression): PrefixUnaryExpression;
    createPrefixDecrement(operand: Expression): PrefixUnaryExpression;
    createBitwiseNot(operand: Expression): PrefixUnaryExpression;
    createLogicalNot(operand: Expression): PrefixUnaryExpression;
    createPostfixIncrement(operand: Expression): PostfixUnaryExpression;
    createPostfixDecrement(operand: Expression): PostfixUnaryExpression;
    createImmediatelyInvokedFunctionExpression(statements: readonly Statement[]): CallExpression;
    createImmediatelyInvokedFunctionExpression(statements: readonly Statement[], param: ParameterDeclaration, paramValue: Expression): CallExpression;
    createImmediatelyInvokedArrowFunction(statements: readonly Statement[]): ImmediatelyInvokedArrowFunction;
    createImmediatelyInvokedArrowFunction(statements: readonly Statement[], param: ParameterDeclaration, paramValue: Expression): ImmediatelyInvokedArrowFunction;
    createVoidZero(): VoidExpression;
    createExportDefault(expression: Expression): ExportAssignment;
    createExternalModuleExport(exportName: Identifier): ExportDeclaration;
    /** @internal */ createTypeCheck(value: Expression, tag: TypeOfTag): Expression;
    /** @internal */ createIsNotTypeCheck(value: Expression, tag: TypeOfTag): Expression;
    /** @internal */ createMethodCall(object: Expression, methodName: string | Identifier, argumentsList: readonly Expression[]): CallExpression;
    /** @internal */ createGlobalMethodCall(globalObjectName: string, globalMethodName: string, argumentsList: readonly Expression[]): CallExpression;
    /** @internal */ createFunctionBindCall(target: Expression, thisArg: Expression, argumentsList: readonly Expression[]): CallExpression;
    /** @internal */ createFunctionCallCall(target: Expression, thisArg: Expression, argumentsList: readonly Expression[]): CallExpression;
    /** @internal */ createFunctionApplyCall(target: Expression, thisArg: Expression, argumentsExpression: Expression): CallExpression;
    /** @internal */ createObjectDefinePropertyCall(target: Expression, propertyName: string | Expression, attributes: Expression): CallExpression;
    /** @internal */ createObjectGetOwnPropertyDescriptorCall(target: Expression, propertyName: string | Expression): CallExpression;
    /** @internal */ createReflectGetCall(target: Expression, propertyKey: Expression, receiver?: Expression): CallExpression;
    /** @internal */ createReflectSetCall(target: Expression, propertyKey: Expression, value: Expression, receiver?: Expression): CallExpression;
    /** @internal */ createPropertyDescriptor(attributes: PropertyDescriptorAttributes, singleLine?: boolean): ObjectLiteralExpression;
    /** @internal */ createArraySliceCall(array: Expression, start?: number | Expression): CallExpression;
    /** @internal */ createArrayConcatCall(array: Expression, values: readonly Expression[]): CallExpression;
    /** @internal */ createCallBinding(expression: Expression, recordTempVariable: (temp: Identifier) => void, languageVersion?: ScriptTarget, cacheIdentifiers?: boolean): CallBinding;
    /**
     * Wraps an expression that cannot be an assignment target in an expression that can be.
     *
     * Given a `paramName` of `_a`:
     * ```
     * Reflect.set(obj, "x", _a)
     * ```
     * Becomes
     * ```ts
     * ({ set value(_a) { Reflect.set(obj, "x", _a); } }).value
     * ```
     *
     * @param paramName
     * @param expression
     *
     * @internal
     */
    createAssignmentTargetWrapper(paramName: Identifier, expression: Expression): PropertyAccessExpression;
    /** @internal */ inlineExpressions(expressions: readonly Expression[]): Expression;
    /**
     * Gets the internal name of a declaration. This is primarily used for declarations that can be
     * referred to by name in the body of an ES5 class function body. An internal name will *never*
     * be prefixed with an module or namespace export modifier like "exports." when emitted as an
     * expression. An internal name will also *never* be renamed due to a collision with a block
     * scoped variable.
     *
     * @param node The declaration.
     * @param allowComments A value indicating whether comments may be emitted for the name.
     * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
     *
     * @internal
     */
    getInternalName(node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean): Identifier;
    /**
     * Gets the local name of a declaration. This is primarily used for declarations that can be
     * referred to by name in the declaration's immediate scope (classes, enums, namespaces). A
     * local name will *never* be prefixed with an module or namespace export modifier like
     * "exports." when emitted as an expression.
     *
     * @param node The declaration.
     * @param allowComments A value indicating whether comments may be emitted for the name.
     * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
     * @param ignoreAssignedName Indicates that the assigned name of a declaration shouldn't be considered.
     *
     * @internal
     */
    getLocalName(node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean, ignoreAssignedName?: boolean): Identifier;
    /**
     * Gets the export name of a declaration. This is primarily used for declarations that can be
     * referred to by name in the declaration's immediate scope (classes, enums, namespaces). An
     * export name will *always* be prefixed with a module or namespace export modifier like
     * `"exports."` when emitted as an expression if the name points to an exported symbol.
     *
     * @param node The declaration.
     * @param allowComments A value indicating whether comments may be emitted for the name.
     * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
     *
     * @internal
     */
    getExportName(node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean): Identifier;
    /**
     * Gets the name of a declaration for use in declarations.
     *
     * @param node The declaration.
     * @param allowComments A value indicating whether comments may be emitted for the name.
     * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
     *
     * @internal
     */
    getDeclarationName(node: Declaration | undefined, allowComments?: boolean, allowSourceMaps?: boolean): Identifier;
    /**
     * Gets a namespace-qualified name for use in expressions.
     *
     * @param ns The namespace identifier.
     * @param name The name.
     * @param allowComments A value indicating whether comments may be emitted for the name.
     * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
     *
     * @internal
     */
    getNamespaceMemberName(ns: Identifier, name: Identifier, allowComments?: boolean, allowSourceMaps?: boolean): PropertyAccessExpression;
    /**
     * Gets the exported name of a declaration for use in expressions.
     *
     * An exported name will *always* be prefixed with an module or namespace export modifier like
     * "exports." if the name points to an exported symbol.
     *
     * @param ns The namespace identifier.
     * @param node The declaration.
     * @param allowComments A value indicating whether comments may be emitted for the name.
     * @param allowSourceMaps A value indicating whether source maps may be emitted for the name.
     *
     * @internal
     */
    getExternalModuleOrNamespaceExportName(ns: Identifier | undefined, node: Declaration, allowComments?: boolean, allowSourceMaps?: boolean): Identifier | PropertyAccessExpression;
    restoreOuterExpressions(outerExpression: Expression | undefined, innerExpression: Expression, kinds?: OuterExpressionKinds): Expression;
    /** @internal */ restoreEnclosingLabel(node: Statement, outermostLabeledStatement: LabeledStatement | undefined, afterRestoreLabelCallback?: (node: LabeledStatement) => void): Statement;
    /** @internal */ createUseStrictPrologue(): PrologueDirective;
    /**
     * Copies any necessary standard and custom prologue-directives into target array.
     * @param source origin statements array
     * @param target result statements array
     * @param ensureUseStrict boolean determining whether the function need to add prologue-directives
     * @param visitor Optional callback used to visit any custom prologue directives.
     *
     * @internal
     */
    copyPrologue(source: readonly Statement[], target: Statement[], ensureUseStrict?: boolean, visitor?: (node: Node) => VisitResult<Node | undefined>): number;
    /**
     * Copies only the standard (string-expression) prologue-directives into the target statement-array.
     * @param source origin statements array
     * @param target result statements array
     * @param statementOffset The offset at which to begin the copy.
     * @param ensureUseStrict boolean determining whether the function need to add prologue-directives
     *
     * @internal
     */
    copyStandardPrologue(source: readonly Statement[], target: Statement[], statementOffset: number | undefined, ensureUseStrict?: boolean): number;
    /**
     * Copies only the custom prologue-directives into target statement-array.
     * @param source origin statements array
     * @param target result statements array
     * @param statementOffset The offset at which to begin the copy.
     * @param visitor Optional callback used to visit any custom prologue directives.
     *
     * @internal
     */
    copyCustomPrologue(source: readonly Statement[], target: Statement[], statementOffset: number, visitor?: (node: Node) => VisitResult<Node | undefined>, filter?: (node: Statement) => boolean): number;
    /** @internal */ copyCustomPrologue(source: readonly Statement[], target: Statement[], statementOffset: number | undefined, visitor?: (node: Node) => VisitResult<Node | undefined>, filter?: (node: Statement) => boolean): number | undefined;
    /** @internal */ ensureUseStrict(statements: NodeArray<Statement>): NodeArray<Statement>;
    /** @internal */ liftToBlock(nodes: readonly Node[]): Statement;
    /**
     * Merges generated lexical declarations into a new statement list.
     *
     * @internal
     */
    mergeLexicalEnvironment(statements: NodeArray<Statement>, declarations: readonly Statement[] | undefined): NodeArray<Statement>;
    /**
     * Appends generated lexical declarations to an array of statements.
     *
     * @internal
     */
    mergeLexicalEnvironment(statements: Statement[], declarations: readonly Statement[] | undefined): Statement[];
    /**
     * Creates a shallow, memberwise clone of a node.
     * - The result will have its `original` pointer set to `node`.
     * - The result will have its `pos` and `end` set to `-1`.
     * - *DO NOT USE THIS* if a more appropriate function is available.
     *
     * @internal
     */
    cloneNode<T extends Node | undefined>(node: T): T;
    /**
     * Updates a node that may contain modifiers, replacing only the modifiers of the node.
     */
    replaceModifiers<T extends HasModifiers>(node: T, modifiers: readonly Modifier[] | ModifierFlags | undefined): T;
    /**
     * Updates a node that may contain decorators or modifiers, replacing only the decorators and modifiers of the node.
     */
    replaceDecoratorsAndModifiers<T extends HasModifiers & HasDecorators>(node: T, modifiers: readonly ModifierLike[] | undefined): T;
    /**
     * Updates a node that contains a property name, replacing only the name of the node.
     */
    replacePropertyName<T extends AccessorDeclaration | MethodDeclaration | MethodSignature | PropertyDeclaration | PropertySignature | PropertyAssignment>(node: T, name: T["name"]): T;
}
/** @internal */
export declare const enum LexicalEnvironmentFlags {
    None = 0,
    InParameters = 1,// currently visiting a parameter list
    VariablesHoistedInParameters = 2
}
export interface CoreTransformationContext {
    readonly factory: NodeFactory;
    /** Gets the compiler options supplied to the transformer. */
    getCompilerOptions(): CompilerOptions;
    /** Starts a new lexical environment. */
    startLexicalEnvironment(): void;
    /** @internal */ setLexicalEnvironmentFlags(flags: LexicalEnvironmentFlags, value: boolean): void;
    /** @internal */ getLexicalEnvironmentFlags(): LexicalEnvironmentFlags;
    /** Suspends the current lexical environment, usually after visiting a parameter list. */
    suspendLexicalEnvironment(): void;
    /** Resumes a suspended lexical environment, usually before visiting a function body. */
    resumeLexicalEnvironment(): void;
    /** Ends a lexical environment, returning any declarations. */
    endLexicalEnvironment(): Statement[] | undefined;
    /** Hoists a function declaration to the containing scope. */
    hoistFunctionDeclaration(node: FunctionDeclaration): void;
    /** Hoists a variable declaration to the containing scope. */
    hoistVariableDeclaration(node: Identifier): void;
    /** @internal */ startBlockScope(): void;
    /** @internal */ endBlockScope(): Statement[] | undefined;
    /** @internal */ addBlockScopedVariable(node: Identifier): void;
    /**
     * Adds an initialization statement to the top of the lexical environment.
     *
     * @internal
     */
    addInitializationStatement(node: Statement): void;
}
export interface TransformationContext extends CoreTransformationContext {
    /** @internal */ getEmitResolver(): EmitResolver;
    /** @internal */ getEmitHost(): EmitHost;
    /** @internal */ getEmitHelperFactory(): EmitHelperFactory;
    /** Records a request for a non-scoped emit helper in the current context. */
    requestEmitHelper(helper: EmitHelper): void;
    /** Gets and resets the requested non-scoped emit helpers. */
    readEmitHelpers(): EmitHelper[] | undefined;
    /** Enables expression substitutions in the pretty printer for the provided SyntaxKind. */
    enableSubstitution(kind: SyntaxKind): void;
    /** Determines whether expression substitutions are enabled for the provided node. */
    isSubstitutionEnabled(node: Node): boolean;
    /**
     * Hook used by transformers to substitute expressions just before they
     * are emitted by the pretty printer.
     *
     * NOTE: Transformation hooks should only be modified during `Transformer` initialization,
     * before returning the `NodeTransformer` callback.
     */
    onSubstituteNode: (hint: EmitHint, node: Node) => Node;
    /**
     * Enables before/after emit notifications in the pretty printer for the provided
     * SyntaxKind.
     */
    enableEmitNotification(kind: SyntaxKind): void;
    /**
     * Determines whether before/after emit notifications should be raised in the pretty
     * printer when it emits a node.
     */
    isEmitNotificationEnabled(node: Node): boolean;
    /**
     * Hook used to allow transformers to capture state before or after
     * the printer emits a node.
     *
     * NOTE: Transformation hooks should only be modified during `Transformer` initialization,
     * before returning the `NodeTransformer` callback.
     */
    onEmitNode: (hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void) => void;
    /** @internal */ addDiagnostic(diag: DiagnosticWithLocation): void;
}
export interface TransformationResult<T extends Node> {
    /** Gets the transformed source files. */
    transformed: T[];
    /** Gets diagnostics for the transformation. */
    diagnostics?: DiagnosticWithLocation[];
    /**
     * Gets a substitute for a node, if one is available; otherwise, returns the original node.
     *
     * @param hint A hint as to the intended usage of the node.
     * @param node The node to substitute.
     */
    substituteNode(hint: EmitHint, node: Node): Node;
    /**
     * Emits a node with possible notification.
     *
     * @param hint A hint as to the intended usage of the node.
     * @param node The node to emit.
     * @param emitCallback A callback used to emit the node.
     */
    emitNodeWithNotification(hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void): void;
    /**
     * Indicates if a given node needs an emit notification
     *
     * @param node The node to emit.
     */
    isEmitNotificationEnabled?(node: Node): boolean;
    /**
     * Clean up EmitNode entries on any parse-tree nodes.
     */
    dispose(): void;
}
/**
 * A function that is used to initialize and return a `Transformer` callback, which in turn
 * will be used to transform one or more nodes.
 */
export type TransformerFactory<T extends Node> = (context: TransformationContext) => Transformer<T>;
/**
 * A function that transforms a node.
 */
export type Transformer<T extends Node> = (node: T) => T;
/**
 * A function that accepts and possibly transforms a node.
 */
export type Visitor<TIn extends Node = Node, TOut extends Node | undefined = TIn | undefined> = (node: TIn) => VisitResult<TOut>;
/**
 * A function that walks a node using the given visitor, lifting node arrays into single nodes,
 * returning an node which satisfies the test.
 *
 * - If the input node is undefined, then the output is undefined.
 * - If the visitor returns undefined, then the output is undefined.
 * - If the output node is not undefined, then it will satisfy the test function.
 * - In order to obtain a return type that is more specific than `Node`, a test
 *   function _must_ be provided, and that function must be a type predicate.
 *
 * For the canonical implementation of this type, @see {visitNode}.
 */
export interface NodeVisitor {
    <TIn extends Node | undefined, TVisited extends Node | undefined, TOut extends Node>(node: TIn, visitor: Visitor<NonNullable<TIn>, TVisited>, test: (node: Node) => node is TOut, lift?: (node: readonly Node[]) => Node): TOut | (TIn & undefined) | (TVisited & undefined);
    <TIn extends Node | undefined, TVisited extends Node | undefined>(node: TIn, visitor: Visitor<NonNullable<TIn>, TVisited>, test?: (node: Node) => boolean, lift?: (node: readonly Node[]) => Node): Node | (TIn & undefined) | (TVisited & undefined);
}
/**
 * A function that walks a node array using the given visitor, returning an array whose contents satisfy the test.
 *
 * - If the input node array is undefined, the output is undefined.
 * - If the visitor can return undefined, the node it visits in the array will be reused.
 * - If the output node array is not undefined, then its contents will satisfy the test.
 * - In order to obtain a return type that is more specific than `NodeArray<Node>`, a test
 *   function _must_ be provided, and that function must be a type predicate.
 *
 * For the canonical implementation of this type, @see {visitNodes}.
 */
export interface NodesVisitor {
    <TIn extends Node, TInArray extends NodeArray<TIn> | undefined, TOut extends Node>(nodes: TInArray, visitor: Visitor<TIn, Node | undefined>, test: (node: Node) => node is TOut, start?: number, count?: number): NodeArray<TOut> | (TInArray & undefined);
    <TIn extends Node, TInArray extends NodeArray<TIn> | undefined>(nodes: TInArray, visitor: Visitor<TIn, Node | undefined>, test?: (node: Node) => boolean, start?: number, count?: number): NodeArray<Node> | (TInArray & undefined);
}
export type VisitResult<T extends Node | undefined> = T | readonly Node[];
export interface Printer {
    /**
     * Print a node and its subtree as-is, without any emit transformations.
     * @param hint A value indicating the purpose of a node. This is primarily used to
     * distinguish between an `Identifier` used in an expression position, versus an
     * `Identifier` used as an `IdentifierName` as part of a declaration. For most nodes you
     * should just pass `Unspecified`.
     * @param node The node to print. The node and its subtree are printed as-is, without any
     * emit transformations.
     * @param sourceFile A source file that provides context for the node. The source text of
     * the file is used to emit the original source content for literals and identifiers, while
     * the identifiers of the source file are used when generating unique names to avoid
     * collisions.
     */
    printNode(hint: EmitHint, node: Node, sourceFile: SourceFile): string;
    /**
     * Prints a list of nodes using the given format flags
     */
    printList<T extends Node>(format: ListFormat, list: NodeArray<T>, sourceFile: SourceFile): string;
    /**
     * Prints a source file as-is, without any emit transformations.
     */
    printFile(sourceFile: SourceFile): string;
    /**
     * Prints a bundle of source files as-is, without any emit transformations.
     */
    printBundle(bundle: Bundle): string;
    /** @internal */ writeNode(hint: EmitHint, node: Node, sourceFile: SourceFile | undefined, writer: EmitTextWriter): void;
    /** @internal */ writeList<T extends Node>(format: ListFormat, list: NodeArray<T> | undefined, sourceFile: SourceFile | undefined, writer: EmitTextWriter): void;
    /** @internal */ writeFile(sourceFile: SourceFile, writer: EmitTextWriter, sourceMapGenerator: SourceMapGenerator | undefined): void;
    /** @internal */ writeBundle(bundle: Bundle, writer: EmitTextWriter, sourceMapGenerator: SourceMapGenerator | undefined): void;
}
/** @internal */
export interface BuildInfo {
    version: string;
}
/** @internal */
export interface BuildInfoFileVersionMap {
    fileInfos: Map<Path, string>;
    roots: Map<Path, Path | undefined>;
}
export interface PrintHandlers {
    /**
     * A hook used by the Printer when generating unique names to avoid collisions with
     * globally defined names that exist outside of the current source file.
     */
    hasGlobalName?(name: string): boolean;
    /**
     * A hook used by the Printer to provide notifications prior to emitting a node. A
     * compatible implementation **must** invoke `emitCallback` with the provided `hint` and
     * `node` values.
     * @param hint A hint indicating the intended purpose of the node.
     * @param node The node to emit.
     * @param emitCallback A callback that, when invoked, will emit the node.
     * @example
     * ```ts
     * var printer = createPrinter(printerOptions, {
     *   onEmitNode(hint, node, emitCallback) {
     *     // set up or track state prior to emitting the node...
     *     emitCallback(hint, node);
     *     // restore state after emitting the node...
     *   }
     * });
     * ```
     */
    onEmitNode?(hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void): void;
    /**
     * A hook used to check if an emit notification is required for a node.
     * @param node The node to emit.
     */
    isEmitNotificationEnabled?(node: Node): boolean;
    /**
     * A hook used by the Printer to perform just-in-time substitution of a node. This is
     * primarily used by node transformations that need to substitute one node for another,
     * such as replacing `myExportedVar` with `exports.myExportedVar`.
     * @param hint A hint indicating the intended purpose of the node.
     * @param node The node to emit.
     * @example
     * ```ts
     * var printer = createPrinter(printerOptions, {
     *   substituteNode(hint, node) {
     *     // perform substitution if necessary...
     *     return node;
     *   }
     * });
     * ```
     */
    substituteNode?(hint: EmitHint, node: Node): Node;
    /** @internal */ onEmitSourceMapOfNode?: (hint: EmitHint, node: Node, emitCallback: (hint: EmitHint, node: Node) => void) => void;
    /** @internal */ onEmitSourceMapOfToken?: (node: Node | undefined, token: SyntaxKind, writer: (s: string) => void, pos: number, emitCallback: (token: SyntaxKind, writer: (s: string) => void, pos: number) => number) => number;
    /** @internal */ onEmitSourceMapOfPosition?: (pos: number) => void;
    /** @internal */ onSetSourceFile?: (node: SourceFile) => void;
    /** @internal */ onBeforeEmitNode?: (node: Node | undefined) => void;
    /** @internal */ onAfterEmitNode?: (node: Node | undefined) => void;
    /** @internal */ onBeforeEmitNodeArray?: (nodes: NodeArray<any> | undefined) => void;
    /** @internal */ onAfterEmitNodeArray?: (nodes: NodeArray<any> | undefined) => void;
    /** @internal */ onBeforeEmitToken?: (node: Node) => void;
    /** @internal */ onAfterEmitToken?: (node: Node) => void;
}
export interface PrinterOptions {
    removeComments?: boolean;
    newLine?: NewLineKind;
    omitTrailingSemicolon?: boolean;
    noEmitHelpers?: boolean;
    /** @internal */ module?: CompilerOptions["module"];
    /** @internal */ moduleResolution?: CompilerOptions["moduleResolution"];
    /** @internal */ target?: CompilerOptions["target"];
    /** @internal */ sourceMap?: boolean;
    /** @internal */ inlineSourceMap?: boolean;
    /** @internal */ inlineSources?: boolean;
    /** @internal*/ omitBraceSourceMapPositions?: boolean;
    /** @internal */ extendedDiagnostics?: boolean;
    /** @internal */ onlyPrintJsDocStyle?: boolean;
    /** @internal */ neverAsciiEscape?: boolean;
    /** @internal */ stripInternal?: boolean;
    /** @internal */ preserveSourceNewlines?: boolean;
    /** @internal */ terminateUnterminatedLiterals?: boolean;
    /** @internal */ omitEffectClauses?: boolean;
}
/** @internal */
export interface RawSourceMap {
    version: 3;
    file: string;
    sourceRoot?: string | null;
    sources: string[];
    sourcesContent?: (string | null)[] | null;
    mappings: string;
    names?: string[] | null;
}
/**
 * Generates a source map.
 *
 * @internal
 */
export interface SourceMapGenerator {
    getSources(): readonly string[];
    /**
     * Adds a source to the source map.
     */
    addSource(fileName: string): number;
    /**
     * Set the content for a source.
     */
    setSourceContent(sourceIndex: number, content: string | null): void;
    /**
     * Adds a name.
     */
    addName(name: string): number;
    /**
     * Adds a mapping without source information.
     */
    addMapping(generatedLine: number, generatedCharacter: number): void;
    /**
     * Adds a mapping with source information.
     */
    addMapping(generatedLine: number, generatedCharacter: number, sourceIndex: number, sourceLine: number, sourceCharacter: number, nameIndex?: number): void;
    /**
     * Appends a source map.
     */
    appendSourceMap(generatedLine: number, generatedCharacter: number, sourceMap: RawSourceMap, sourceMapPath: string, start?: LineAndCharacter, end?: LineAndCharacter): void;
    /**
     * Gets the source map as a `RawSourceMap` object.
     */
    toJSON(): RawSourceMap;
    /**
     * Gets the string representation of the source map.
     */
    toString(): string;
}
/** @internal */
export interface DocumentPositionMapperHost {
    getSourceFileLike(fileName: string): SourceFileLike | undefined;
    getCanonicalFileName(path: string): string;
    log(text: string): void;
}
/**
 * Maps positions between source and generated files.
 *
 * @internal
 */
export interface DocumentPositionMapper {
    getSourcePosition(input: DocumentPosition): DocumentPosition;
    getGeneratedPosition(input: DocumentPosition): DocumentPosition;
}
/** @internal */
export interface DocumentPosition {
    fileName: string;
    pos: number;
}
/** @internal */
export interface EmitTextWriter extends SymbolWriter {
    write(s: string): void;
    writeTrailingSemicolon(text: string): void;
    writeComment(text: string): void;
    getText(): string;
    rawWrite(s: string): void;
    writeLiteral(s: string): void;
    getTextPos(): number;
    getLine(): number;
    getColumn(): number;
    getIndent(): number;
    isAtStartOfLine(): boolean;
    hasTrailingComment(): boolean;
    hasTrailingWhitespace(): boolean;
    nonEscapingWrite?(text: string): void;
}
export interface GetEffectiveTypeRootsHost {
    getCurrentDirectory?(): string;
}
/** @internal */
export interface HasCurrentDirectory {
    getCurrentDirectory(): string;
}
/** @internal */
export interface ModuleSpecifierResolutionHost {
    useCaseSensitiveFileNames(): boolean;
    fileExists(path: string): boolean;
    getCurrentDirectory(): string;
    directoryExists?(path: string): boolean;
    readFile?(path: string): string | undefined;
    realpath?(path: string): string;
    getSymlinkCache?(): SymlinkCache;
    getModuleSpecifierCache?(): ModuleSpecifierCache;
    getPackageJsonInfoCache?(): PackageJsonInfoCache | undefined;
    getGlobalTypingsCacheLocation?(): string | undefined;
    getNearestAncestorDirectoryWithPackageJson?(fileName: string, rootDir?: string): string | undefined;
    readonly redirectTargetsMap: RedirectTargetsMap;
    getRedirectFromSourceFile(fileName: string): ResolvedRefAndOutputDts | undefined;
    isSourceOfProjectReferenceRedirect(fileName: string): boolean;
    getFileIncludeReasons(): MultiMap<Path, FileIncludeReason>;
    getCommonSourceDirectory(): string;
    getDefaultResolutionModeForFile(sourceFile: SourceFile): ResolutionMode;
    getModeForResolutionAtIndex(file: SourceFile, index: number): ResolutionMode;
    getModuleResolutionCache?(): ModuleResolutionCache | undefined;
    trace?(s: string): void;
}
/** @internal */
export interface ModulePath {
    path: string;
    isInNodeModules: boolean;
    isRedirect: boolean;
}
/** @internal */
export interface ResolvedModuleSpecifierInfo {
    kind: "node_modules" | "paths" | "redirect" | "relative" | "ambient" | undefined;
    modulePaths: readonly ModulePath[] | undefined;
    packageName: string | undefined;
    moduleSpecifiers: readonly string[] | undefined;
    isBlockedByPackageJsonDependencies: boolean | undefined;
}
/** @internal */
export interface ModuleSpecifierOptions {
    overrideImportMode?: ResolutionMode;
}
/** @internal */
export interface ModuleSpecifierCache {
    get(fromFileName: Path, toFileName: Path, preferences: UserPreferences, options: ModuleSpecifierOptions): Readonly<ResolvedModuleSpecifierInfo> | undefined;
    set(fromFileName: Path, toFileName: Path, preferences: UserPreferences, options: ModuleSpecifierOptions, kind: ResolvedModuleSpecifierInfo["kind"], modulePaths: readonly ModulePath[], moduleSpecifiers: readonly string[]): void;
    setBlockedByPackageJsonDependencies(fromFileName: Path, toFileName: Path, preferences: UserPreferences, options: ModuleSpecifierOptions, packageName: string | undefined, isBlockedByPackageJsonDependencies: boolean): void;
    setModulePaths(fromFileName: Path, toFileName: Path, preferences: UserPreferences, options: ModuleSpecifierOptions, modulePaths: readonly ModulePath[]): void;
    clear(): void;
    count(): number;
}
/** @internal */
export interface SymbolTracker {
    trackSymbol?(symbol: Symbol, enclosingDeclaration: Node | undefined, meaning: SymbolFlags): boolean;
    reportInaccessibleThisError?(): void;
    reportPrivateInBaseOfClassExpression?(propertyName: string): void;
    reportInaccessibleUniqueSymbolError?(): void;
    reportCyclicStructureError?(): void;
    reportLikelyUnsafeImportRequiredError?(specifier: string): void;
    reportTruncationError?(): void;
    moduleResolverHost?: ModuleSpecifierResolutionHost & {
        getCommonSourceDirectory(): string;
    };
    reportNonlocalAugmentation?(containingFile: SourceFile, parentSymbol: Symbol, augmentingSymbol: Symbol): void;
    reportNonSerializableProperty?(propertyName: string): void;
    reportInferenceFallback?(node: Node): void;
    pushErrorFallbackNode?(node: Declaration | undefined): void;
    popErrorFallbackNode?(): void;
}
export interface TextSpan {
    start: number;
    length: number;
}
export interface TextChangeRange {
    span: TextSpan;
    newLength: number;
}
/** @internal */
export interface ErrorOutputContainer {
    errors?: Diagnostic[];
    skipLogging?: boolean;
}
/** @internal */
export interface DiagnosticCollection {
    add(diagnostic: Diagnostic): void;
    lookup(diagnostic: Diagnostic): Diagnostic | undefined;
    getGlobalDiagnostics(): Diagnostic[];
    getDiagnostics(): Diagnostic[];
    getDiagnostics(fileName: string): DiagnosticWithLocation[];
}
export interface SyntaxList extends Node {
    kind: SyntaxKind.SyntaxList;
    /** @internal */ _children: readonly Node[];
}
export declare const enum ListFormat {
    None = 0,
    SingleLine = 0,// Prints the list on a single line (default).
    MultiLine = 1,// Prints the list on multiple lines.
    PreserveLines = 2,// Prints the list using line preservation if possible.
    LinesMask = 3,
    NotDelimited = 0,// There is no delimiter between list items (default).
    BarDelimited = 4,// Each list item is space-and-bar (" |") delimited.
    AmpersandDelimited = 8,// Each list item is space-and-ampersand (" &") delimited.
    CommaDelimited = 16,// Each list item is comma (",") delimited.
    AsteriskDelimited = 32,// Each list item is asterisk ("\n *") delimited, used with JSDoc.
    DelimitersMask = 60,
    AllowTrailingComma = 64,// Write a trailing comma (",") if present.
    Indented = 128,// The list should be indented.
    SpaceBetweenBraces = 256,// Inserts a space after the opening brace and before the closing brace.
    SpaceBetweenSiblings = 512,// Inserts a space between each sibling node.
    Braces = 1024,// The list is surrounded by "{" and "}".
    Parenthesis = 2048,// The list is surrounded by "(" and ")".
    AngleBrackets = 4096,// The list is surrounded by "<" and ">".
    SquareBrackets = 8192,// The list is surrounded by "[" and "]".
    BracketsMask = 15360,
    OptionalIfUndefined = 16384,// Do not emit brackets if the list is undefined.
    OptionalIfEmpty = 32768,// Do not emit brackets if the list is empty.
    Optional = 49152,
    PreferNewLine = 65536,// Prefer adding a LineTerminator between synthesized nodes.
    NoTrailingNewLine = 131072,// Do not emit a trailing NewLine for a MultiLine list.
    NoInterveningComments = 262144,// Do not emit comments between each node
    NoSpaceIfEmpty = 524288,// If the literal is empty, do not add spaces between braces.
    SingleElement = 1048576,
    SpaceAfterList = 2097152,// Add space after list
    Modifiers = 2359808,
    HeritageClauses = 512,
    SingleLineTypeLiteralMembers = 768,
    MultiLineTypeLiteralMembers = 32897,
    SingleLineTupleTypeElements = 528,
    MultiLineTupleTypeElements = 657,
    UnionTypeConstituents = 516,
    IntersectionTypeConstituents = 520,
    ObjectBindingPatternElements = 525136,
    ArrayBindingPatternElements = 524880,
    ObjectLiteralExpressionProperties = 526226,
    ImportAttributes = 526226,
    /** @deprecated */ ImportClauseEntries = 526226,
    ArrayLiteralExpressionElements = 8914,
    CommaListElements = 528,
    CallExpressionArguments = 2576,
    NewExpressionArguments = 18960,
    TemplateExpressionSpans = 262144,
    SingleLineBlockStatements = 768,
    MultiLineBlockStatements = 129,
    VariableDeclarationList = 528,
    SingleLineFunctionBodyStatements = 768,
    MultiLineFunctionBodyStatements = 1,
    ClassHeritageClauses = 0,
    ClassMembers = 129,
    InterfaceMembers = 129,
    EnumMembers = 145,
    CaseBlockClauses = 129,
    NamedImportsOrExportsElements = 525136,
    JsxElementOrFragmentChildren = 262144,
    JsxElementAttributes = 262656,
    CaseOrDefaultClauseStatements = 163969,
    HeritageClauseTypes = 528,
    SourceFileStatements = 131073,
    Decorators = 2146305,
    TypeArguments = 53776,
    TypeParameters = 53776,
    Parameters = 2576,
    IndexSignatureParameters = 8848,
    JSDocComment = 33
}
/** @internal */
export declare const enum PragmaKindFlags {
    None = 0,
    /**
     * Triple slash comment of the form
     * /// <pragma-name argname="value" />
     */
    TripleSlashXML = 1,
    /**
     * Single line comment of the form
     * // @pragma-name argval1 argval2
     * or
     * /// @pragma-name argval1 argval2
     */
    SingleLine = 2,
    /**
     * Multiline non-jsdoc pragma of the form
     * /* @pragma-name argval1 argval2 * /
     */
    MultiLine = 4,
    All = 7,
    Default = 7
}
/** @internal */
export interface PragmaArgumentSpecification<TName extends string> {
    name: TName;
    optional?: boolean;
    captureSpan?: boolean;
}
/** @internal */
export interface PragmaDefinition<T1 extends string = string, T2 extends string = string, T3 extends string = string, T4 extends string = string> {
    args?: readonly [PragmaArgumentSpecification<T1>] | readonly [PragmaArgumentSpecification<T1>, PragmaArgumentSpecification<T2>] | readonly [PragmaArgumentSpecification<T1>, PragmaArgumentSpecification<T2>, PragmaArgumentSpecification<T3>] | readonly [PragmaArgumentSpecification<T1>, PragmaArgumentSpecification<T2>, PragmaArgumentSpecification<T3>, PragmaArgumentSpecification<T4>];
    kind?: PragmaKindFlags;
}
/** @internal */
export declare const commentPragmas: ConcretePragmaSpecs;
export declare const enum JSDocParsingMode {
    /**
     * Always parse JSDoc comments and include them in the AST.
     *
     * This is the default if no mode is provided.
     */
    ParseAll = 0,
    /**
     * Never parse JSDoc comments, mo matter the file type.
     */
    ParseNone = 1,
    /**
     * Parse only JSDoc comments which are needed to provide correct type errors.
     *
     * This will always parse JSDoc in non-TS files, but only parse JSDoc comments
     * containing `@see` and `@link` in TS files.
     */
    ParseForTypeErrors = 2,
    /**
     * Parse only JSDoc comments which are needed to provide correct type info.
     *
     * This will always parse JSDoc in non-TS files, but never in TS files.
     *
     * Note: Do not use this mode if you require accurate type errors; use {@link ParseForTypeErrors} instead.
     */
    ParseForTypeInfo = 3
}
/** @internal */
export type PragmaArgTypeMaybeCapture<TDesc> = TDesc extends {
    captureSpan: true;
} ? {
    value: string;
    pos: number;
    end: number;
} : string;
/** @internal */
export type PragmaArgTypeOptional<TDesc, TName extends string> = TDesc extends {
    optional: true;
} ? {
    [K in TName]?: PragmaArgTypeMaybeCapture<TDesc>;
} : {
    [K in TName]: PragmaArgTypeMaybeCapture<TDesc>;
};
/** @internal */
export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
/** @internal */
export type ArgumentDefinitionToFieldUnion<T extends readonly PragmaArgumentSpecification<any>[]> = {
    [K in keyof T]: PragmaArgTypeOptional<T[K], T[K] extends {
        name: infer TName;
    } ? TName extends string ? TName : never : never>;
}[Extract<keyof T, number>];
/**
 * Maps a pragma definition into the desired shape for its arguments object
 *
 * @internal
 */
export type PragmaArgumentType<KPrag extends keyof ConcretePragmaSpecs> = ConcretePragmaSpecs[KPrag] extends {
    args: readonly PragmaArgumentSpecification<any>[];
} ? UnionToIntersection<ArgumentDefinitionToFieldUnion<ConcretePragmaSpecs[KPrag]["args"]>> : never;
/** @internal */
export interface ConcretePragmaSpecs {
    readonly "reference": {
        readonly args: readonly [
            {
                readonly name: "types";
                readonly optional: true;
                readonly captureSpan: true;
            },
            {
                readonly name: "lib";
                readonly optional: true;
                readonly captureSpan: true;
            },
            {
                readonly name: "path";
                readonly optional: true;
                readonly captureSpan: true;
            },
            {
                readonly name: "no-default-lib";
                readonly optional: true;
            },
            {
                readonly name: "resolution-mode";
                readonly optional: true;
            },
            {
                readonly name: "preserve";
                readonly optional: true;
            }
        ];
        readonly kind: PragmaKindFlags.TripleSlashXML;
    };
    readonly "amd-dependency": {
        readonly args: readonly [
            {
                readonly name: "path";
            },
            {
                readonly name: "name";
                readonly optional: true;
            }
        ];
        readonly kind: PragmaKindFlags.TripleSlashXML;
    };
    readonly "amd-module": {
        readonly args: readonly [
            {
                readonly name: "name";
            }
        ];
        readonly kind: PragmaKindFlags.TripleSlashXML;
    };
    readonly "ts-check": {
        readonly kind: PragmaKindFlags.SingleLine;
    };
    readonly "ts-nocheck": {
        readonly kind: PragmaKindFlags.SingleLine;
    };
    readonly "jsx": {
        readonly args: readonly [
            {
                readonly name: "factory";
            }
        ];
        readonly kind: PragmaKindFlags.MultiLine;
    };
    readonly "jsxfrag": {
        readonly args: readonly [
            {
                readonly name: "factory";
            }
        ];
        readonly kind: PragmaKindFlags.MultiLine;
    };
    readonly "jsximportsource": {
        readonly args: readonly [
            {
                readonly name: "factory";
            }
        ];
        readonly kind: PragmaKindFlags.MultiLine;
    };
    readonly "jsxruntime": {
        readonly args: readonly [
            {
                readonly name: "factory";
            }
        ];
        readonly kind: PragmaKindFlags.MultiLine;
    };
}
/** @internal */
export type PragmaPseudoMap = {
    [K in keyof ConcretePragmaSpecs]: {
        arguments: PragmaArgumentType<K>;
        range: CommentRange;
    };
};
/** @internal */
export type PragmaPseudoMapEntry = {
    [K in keyof PragmaPseudoMap]: {
        name: K;
        args: PragmaPseudoMap[K];
    };
}[keyof PragmaPseudoMap];
/** @internal */
export interface ReadonlyPragmaMap extends ReadonlyMap<string, PragmaPseudoMap[keyof PragmaPseudoMap] | PragmaPseudoMap[keyof PragmaPseudoMap][]> {
    get<TKey extends keyof PragmaPseudoMap>(key: TKey): PragmaPseudoMap[TKey] | PragmaPseudoMap[TKey][];
    forEach(action: <TKey extends keyof PragmaPseudoMap>(value: PragmaPseudoMap[TKey] | PragmaPseudoMap[TKey][], key: TKey, map: ReadonlyPragmaMap) => void): void;
}
/**
 * A strongly-typed es6 map of pragma entries, the values of which are either a single argument
 * value (if only one was found), or an array of multiple argument values if the pragma is present
 * in multiple places
 *
 * @internal
 */
export interface PragmaMap extends Map<string, PragmaPseudoMap[keyof PragmaPseudoMap] | PragmaPseudoMap[keyof PragmaPseudoMap][]>, ReadonlyPragmaMap {
    set<TKey extends keyof PragmaPseudoMap>(key: TKey, value: PragmaPseudoMap[TKey] | PragmaPseudoMap[TKey][]): this;
    get<TKey extends keyof PragmaPseudoMap>(key: TKey): PragmaPseudoMap[TKey] | PragmaPseudoMap[TKey][];
    forEach(action: <TKey extends keyof PragmaPseudoMap>(value: PragmaPseudoMap[TKey] | PragmaPseudoMap[TKey][], key: TKey, map: PragmaMap) => void): void;
}
/** @internal */
export interface CommentDirectivesMap {
    getUnusedExpectations(): CommentDirective[];
    getDirectiveForLine(matchedLine: number): CommentDirective | undefined;
    markUsed(matchedLine: number): boolean;
}
export interface UserPreferences {
    readonly disableSuggestions?: boolean;
    readonly quotePreference?: "auto" | "double" | "single";
    /**
     * If enabled, TypeScript will search through all external modules' exports and add them to the completions list.
     * This affects lone identifier completions but not completions on the right hand side of `obj.`.
     */
    readonly includeCompletionsForModuleExports?: boolean;
    /**
     * Enables auto-import-style completions on partially-typed import statements. E.g., allows
     * `import write|` to be completed to `import { writeFile } from "fs"`.
     */
    readonly includeCompletionsForImportStatements?: boolean;
    /**
     * Allows completions to be formatted with snippet text, indicated by `CompletionItem["isSnippet"]`.
     */
    readonly includeCompletionsWithSnippetText?: boolean;
    /**
     * Unless this option is `false`, or `includeCompletionsWithInsertText` is not enabled,
     * member completion lists triggered with `.` will include entries on potentially-null and potentially-undefined
     * values, with insertion text to replace preceding `.` tokens with `?.`.
     */
    readonly includeAutomaticOptionalChainCompletions?: boolean;
    /**
     * If enabled, the completion list will include completions with invalid identifier names.
     * For those entries, The `insertText` and `replacementSpan` properties will be set to change from `.x` property access to `["x"]`.
     */
    readonly includeCompletionsWithInsertText?: boolean;
    /**
     * If enabled, completions for class members (e.g. methods and properties) will include
     * a whole declaration for the member.
     * E.g., `class A { f| }` could be completed to `class A { foo(): number {} }`, instead of
     * `class A { foo }`.
     */
    readonly includeCompletionsWithClassMemberSnippets?: boolean;
    /**
     * If enabled, object literal methods will have a method declaration completion entry in addition
     * to the regular completion entry containing just the method name.
     * E.g., `const objectLiteral: T = { f| }` could be completed to `const objectLiteral: T = { foo(): void {} }`,
     * in addition to `const objectLiteral: T = { foo }`.
     */
    readonly includeCompletionsWithObjectLiteralMethodSnippets?: boolean;
    /**
     * Indicates whether {@link CompletionEntry.labelDetails completion entry label details} are supported.
     * If not, contents of `labelDetails` may be included in the {@link CompletionEntry.name} property.
     */
    readonly useLabelDetailsInCompletionEntries?: boolean;
    readonly allowIncompleteCompletions?: boolean;
    readonly importModuleSpecifierPreference?: "shortest" | "project-relative" | "relative" | "non-relative";
    /** Determines whether we import `foo/index.ts` as "foo", "foo/index", or "foo/index.js" */
    readonly importModuleSpecifierEnding?: "auto" | "minimal" | "index" | "js";
    readonly allowTextChangesInNewFiles?: boolean;
    readonly providePrefixAndSuffixTextForRename?: boolean;
    readonly includePackageJsonAutoImports?: "auto" | "on" | "off";
    readonly provideRefactorNotApplicableReason?: boolean;
    readonly jsxAttributeCompletionStyle?: "auto" | "braces" | "none";
    readonly includeInlayParameterNameHints?: "none" | "literals" | "all";
    readonly includeInlayParameterNameHintsWhenArgumentMatchesName?: boolean;
    readonly includeInlayFunctionParameterTypeHints?: boolean;
    readonly includeInlayVariableTypeHints?: boolean;
    readonly includeInlayVariableTypeHintsWhenTypeMatchesName?: boolean;
    readonly includeInlayPropertyDeclarationTypeHints?: boolean;
    readonly includeInlayFunctionLikeReturnTypeHints?: boolean;
    readonly includeInlayEnumMemberValueHints?: boolean;
    readonly interactiveInlayHints?: boolean;
    readonly allowRenameOfImportPath?: boolean;
    readonly autoImportFileExcludePatterns?: string[];
    readonly autoImportSpecifierExcludeRegexes?: string[];
    readonly preferTypeOnlyAutoImports?: boolean;
    /**
     * Indicates whether imports should be organized in a case-insensitive manner.
     */
    readonly organizeImportsIgnoreCase?: "auto" | boolean;
    /**
     * Indicates whether imports should be organized via an "ordinal" (binary) comparison using the numeric value
     * of their code points, or via "unicode" collation (via the
     * [Unicode Collation Algorithm](https://unicode.org/reports/tr10/#Scope)) using rules associated with the locale
     * specified in {@link organizeImportsCollationLocale}.
     *
     * Default: `"ordinal"`.
     */
    readonly organizeImportsCollation?: "ordinal" | "unicode";
    /**
     * Indicates the locale to use for "unicode" collation. If not specified, the locale `"en"` is used as an invariant
     * for the sake of consistent sorting. Use `"auto"` to use the detected UI locale.
     *
     * This preference is ignored if {@link organizeImportsCollation} is not `"unicode"`.
     *
     * Default: `"en"`
     */
    readonly organizeImportsLocale?: string;
    /**
     * Indicates whether numeric collation should be used for digit sequences in strings. When `true`, will collate
     * strings such that `a1z < a2z < a100z`. When `false`, will collate strings such that `a1z < a100z < a2z`.
     *
     * This preference is ignored if {@link organizeImportsCollation} is not `"unicode"`.
     *
     * Default: `false`
     */
    readonly organizeImportsNumericCollation?: boolean;
    /**
     * Indicates whether accents and other diacritic marks are considered unequal for the purpose of collation. When
     * `true`, characters with accents and other diacritics will be collated in the order defined by the locale specified
     * in {@link organizeImportsCollationLocale}.
     *
     * This preference is ignored if {@link organizeImportsCollation} is not `"unicode"`.
     *
     * Default: `true`
     */
    readonly organizeImportsAccentCollation?: boolean;
    /**
     * Indicates whether upper case or lower case should sort first. When `false`, the default order for the locale
     * specified in {@link organizeImportsCollationLocale} is used.
     *
     * This preference is ignored if {@link organizeImportsCollation} is not `"unicode"`. This preference is also
     * ignored if we are using case-insensitive sorting, which occurs when {@link organizeImportsIgnoreCase} is `true`,
     * or if {@link organizeImportsIgnoreCase} is `"auto"` and the auto-detected case sensitivity is determined to be
     * case-insensitive.
     *
     * Default: `false`
     */
    readonly organizeImportsCaseFirst?: "upper" | "lower" | false;
    /**
     * Indicates where named type-only imports should sort. "inline" sorts named imports without regard to if the import is
     * type-only.
     *
     * Default: `last`
     */
    readonly organizeImportsTypeOrder?: OrganizeImportsTypeOrder;
    /**
     * Indicates whether to exclude standard library and node_modules file symbols from navTo results.
     */
    readonly excludeLibrarySymbolsInNavTo?: boolean;
    readonly lazyConfiguredProjectsFromExternalProject?: boolean;
    readonly displayPartsForJSDoc?: boolean;
    readonly generateReturnInDocTemplate?: boolean;
    readonly disableLineTextInReferences?: boolean;
    /**
     * A positive integer indicating the maximum length of a hover text before it is truncated.
     *
     * Default: `500`
     */
    readonly maximumHoverLength?: number;
}
export type OrganizeImportsTypeOrder = "last" | "inline" | "first";
/** Represents a bigint literal value without requiring bigint support */
export interface PseudoBigInt {
    negative: boolean;
    base10Value: string;
}
/** @internal */
export interface Queue<T> {
    enqueue(...items: T[]): void;
    dequeue(): T;
    isEmpty(): boolean;
}
/** @internal */
export interface EvaluationResolver {
    evaluateEntityNameExpression(expr: EntityNameExpression, location: Declaration | undefined): EvaluatorResult;
    evaluateElementAccessExpression(expr: ElementAccessExpression, location: Declaration | undefined): EvaluatorResult;
}
/** @internal */
export type HasInferredType = Exclude<VariableLikeDeclaration, JsxAttribute | EnumMember> | PropertyAccessExpression | ElementAccessExpression | BinaryExpression | ExportAssignment;
/** @internal */
export interface SyntacticTypeNodeBuilderContext {
    flags: NodeBuilderFlags;
    tracker: Required<Pick<SymbolTracker, "reportInferenceFallback">>;
    enclosingFile: SourceFile | undefined;
    enclosingDeclaration: Node | undefined;
    approximateLength: number;
    noInferenceFallback?: boolean;
    suppressReportInferenceFallback: boolean;
}
/** @internal */
export interface SyntacticTypeNodeBuilderResolver {
    isOptionalParameter(p: ParameterDeclaration): boolean;
    isUndefinedIdentifierExpression(name: Identifier): boolean;
    isExpandoFunctionDeclaration(name: FunctionDeclaration | VariableDeclaration): boolean;
    getAllAccessorDeclarations(declaration: AccessorDeclaration): AllAccessorDeclarations;
    requiresAddingImplicitUndefined(declaration: ParameterDeclaration | PropertySignature | JSDocParameterTag | JSDocPropertyTag | PropertyDeclaration, symbol: Symbol | undefined, enclosingDeclaration: Node | undefined): boolean;
    isDefinitelyReferenceToGlobalSymbolObject(node: Node): boolean;
    isEntityNameVisible(context: SyntacticTypeNodeBuilderContext, entityName: EntityNameOrEntityNameExpression, shouldComputeAliasToMakeVisible?: boolean): SymbolVisibilityResult;
    serializeExistingTypeNode(context: SyntacticTypeNodeBuilderContext, node: TypeNode, addUndefined?: boolean): TypeNode | undefined;
    serializeReturnTypeForSignature(context: SyntacticTypeNodeBuilderContext, signatureDeclaration: SignatureDeclaration | JSDocSignature, symbol: Symbol | undefined): TypeNode | undefined;
    serializeTypeOfExpression(context: SyntacticTypeNodeBuilderContext, expr: Expression): TypeNode;
    serializeTypeOfDeclaration(context: SyntacticTypeNodeBuilderContext, node: HasInferredType | GetAccessorDeclaration | SetAccessorDeclaration, symbol: Symbol | undefined): TypeNode | undefined;
    serializeNameOfParameter(context: SyntacticTypeNodeBuilderContext, parameter: ParameterDeclaration): BindingName | string;
    serializeTypeName(context: SyntacticTypeNodeBuilderContext, node: EntityName, isTypeOf?: boolean, typeArguments?: readonly TypeNode[]): TypeNode | undefined;
    serializeEntityName(context: SyntacticTypeNodeBuilderContext, node: EntityNameExpression): Expression | undefined;
    getJsDocPropertyOverride(context: SyntacticTypeNodeBuilderContext, jsDocTypeLiteral: JSDocTypeLiteral, jsDocProperty: JSDocPropertyLikeTag): TypeNode | undefined;
    enterNewScope(context: SyntacticTypeNodeBuilderContext, node: IntroducesNewScopeNode | ConditionalTypeNode): () => void;
    markNodeReuse<T extends Node>(context: SyntacticTypeNodeBuilderContext, range: T, location: Node | undefined): T;
    trackExistingEntityName<T extends EntityNameOrEntityNameExpression>(context: SyntacticTypeNodeBuilderContext, node: T): {
        introducesError: boolean;
        node: T;
    };
    trackComputedName(context: SyntacticTypeNodeBuilderContext, accessExpression: EntityNameOrEntityNameExpression): void;
    evaluateEntityNameExpression(expression: EntityNameExpression): EvaluatorResult;
    getModuleSpecifierOverride(context: SyntacticTypeNodeBuilderContext, parent: ImportTypeNode, lit: StringLiteral): string | undefined;
    canReuseTypeNode(context: SyntacticTypeNodeBuilderContext, existing: TypeNode): boolean;
    canReuseTypeNodeAnnotation(context: SyntacticTypeNodeBuilderContext, node: Declaration, existing: TypeNode, symbol: Symbol | undefined, requiresAddingUndefined?: boolean): boolean;
    shouldRemoveDeclaration(context: SyntacticTypeNodeBuilderContext, node: DynamicNamedDeclaration): boolean;
    hasLateBindableName(node: Declaration): node is LateBoundDeclaration | LateBoundBinaryExpressionDeclaration;
    createRecoveryBoundary(context: SyntacticTypeNodeBuilderContext): {
        startRecoveryScope(): () => void;
        finalizeBoundary(): boolean;
        markError(): void;
        hadError(): boolean;
    };
}
/** @internal */
export interface SyntacticNodeBuilder {
    serializeTypeOfDeclaration: (node: HasInferredType, symbol: Symbol, context: SyntacticTypeNodeBuilderContext) => TypeNode | undefined;
    serializeReturnTypeForSignature: (signature: SignatureDeclaration | JSDocSignature, symbol: Symbol, context: SyntacticTypeNodeBuilderContext) => TypeNode | undefined;
    serializeTypeOfExpression: (expr: Expression | JsxAttributeValue, context: SyntacticTypeNodeBuilderContext, addUndefined?: boolean, preserveLiterals?: boolean) => TypeNode;
    tryReuseExistingTypeNode: (context: SyntacticTypeNodeBuilderContext, existing: TypeNode) => TypeNode | undefined;
    serializeTypeOfAccessor: (accessor: AccessorDeclaration, symbol: Symbol, context: SyntacticTypeNodeBuilderContext) => TypeNode | undefined;
}
/** @internal */
export type IntroducesNewScopeNode = SignatureDeclaration | JSDocSignature | MappedTypeNode;
//# sourceMappingURL=types.d.ts.map