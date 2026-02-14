import * as FourSlash from "./_namespaces/FourSlash.js";
import * as ts from "./_namespaces/ts.js";
export declare class Test {
    private state;
    constructor(state: FourSlash.TestState);
    markers(): FourSlash.Marker[];
    markerNames(): string[];
    marker(name: string): FourSlash.Marker;
    markerName(m: FourSlash.Marker): string;
    ranges(): FourSlash.Range[];
    rangesInFile(fileName?: string): FourSlash.Range[];
    spans(): ts.TextSpan[];
    rangesByText(): Map<string, FourSlash.Range[]>;
    markerByName(s: string): FourSlash.Marker;
    symbolsInScope(range: FourSlash.Range): ts.Symbol[];
    setTypesRegistry(map: ts.MapLike<void>): void;
    getSemanticDiagnostics(): Diagnostic[];
}
export declare class Config {
    private state;
    constructor(state: FourSlash.TestState);
    configurePlugin(pluginName: string, configuration: any): void;
    setCompilerOptionsForInferredProjects(options: ts.server.protocol.CompilerOptions): void;
}
export declare class GoTo {
    private state;
    constructor(state: FourSlash.TestState);
    marker(name?: string | FourSlash.Marker): void;
    eachMarker(markers: readonly string[], action: (marker: FourSlash.Marker, index: number) => void): void;
    eachMarker(action: (marker: FourSlash.Marker, index: number) => void): void;
    rangeStart(range: FourSlash.Range): void;
    eachRange(action: (range: FourSlash.Range) => void): void;
    bof(): void;
    eof(): void;
    position(positionOrLineAndCharacter: number | ts.LineAndCharacter, fileNameOrIndex?: string | number): void;
    file(indexOrName: number | string, content?: string, scriptKindName?: string): void;
    select(startMarker: string, endMarker: string): void;
    selectAllInFile(fileName: string): void;
    selectRange(range: FourSlash.Range): void;
}
export declare class VerifyNegatable {
    protected state: FourSlash.TestState;
    private negative;
    not: VerifyNegatable | undefined;
    constructor(state: FourSlash.TestState, negative?: boolean);
    assertHasRanges(ranges: FourSlash.Range[]): void;
    noSignatureHelp(...markers: (string | FourSlash.Marker)[]): void;
    noSignatureHelpForTriggerReason(reason: ts.SignatureHelpTriggerReason, ...markers: (string | FourSlash.Marker)[]): void;
    signatureHelpPresentForTriggerReason(reason: ts.SignatureHelpTriggerReason, ...markers: (string | FourSlash.Marker)[]): void;
    signatureHelp(...options: VerifySignatureHelpOptions[]): void;
    errorExistsBetweenMarkers(startMarker: string, endMarker: string): void;
    errorExistsAfterMarker(markerName?: string): void;
    errorExistsBeforeMarker(markerName?: string): void;
    quickInfoExists(): void;
    isValidBraceCompletionAtPosition(openingBrace: string): void;
    jsxClosingTag(map: {
        [markerName: string]: ts.JsxClosingTagInfo | undefined;
    }): void;
    linkedEditing(map: {
        [markerName: string]: ts.LinkedEditingInfo | undefined;
    }): void;
    baselineLinkedEditing(): void;
    isInCommentAtPosition(onlyMultiLineDiverges?: boolean): void;
    codeFix(options: VerifyCodeFixOptions): void;
    codeFixAvailable(options?: VerifyCodeFixAvailableOptions[]): void;
    codeFixAllAvailable(fixName: string): void;
    applicableRefactorAvailableAtMarker(markerName: string): void;
    applicableRefactorAvailableForRange(): void;
    refactorsAvailable(names: readonly string[]): void;
    refactorAvailable(name: string, actionName?: string, actionDescription?: string, kind?: string, preferences?: {}, includeInteractiveActions?: boolean): void;
    refactorAvailableForTriggerReason(triggerReason: ts.RefactorTriggerReason, name: string, actionName?: string, actionDescription?: string, kind?: string, preferences?: {}, includeInteractiveActions?: boolean): void;
    refactorKindAvailable(kind: string, expected: string[], preferences?: {}): void;
    toggleLineComment(newFileContent: string): void;
    toggleMultilineComment(newFileContent: string): void;
    commentSelection(newFileContent: string): void;
    uncommentSelection(newFileContent: string): void;
    baselineMapCode(ranges: FourSlash.Range[][], changes?: string[]): void;
}
export interface CompletionsResult {
    andApplyCodeAction: (options: {
        name: string;
        source: string;
        description: string;
        newFileContent?: string;
        newRangeContent?: string;
    }) => void;
}
export declare class Verify extends VerifyNegatable {
    constructor(state: FourSlash.TestState);
    completions(...optionsArray: VerifyCompletionsOptions[]): CompletionsResult | undefined;
    baselineInlayHints(span: ts.TextSpan, preference?: ts.UserPreferences): void;
    quickInfoIs(expectedText: string, expectedDocumentation?: string, expectedTags?: {
        name: string;
        text: string;
    }[]): void;
    quickInfoAt(markerName: string | FourSlash.Range, expectedText: string, expectedDocumentation?: string, expectedTags?: {
        name: string;
        text: string;
    }[]): void;
    quickInfos(namesAndTexts: {
        [name: string]: string;
    }): void;
    caretAtMarker(markerName?: string): void;
    indentationIs(numberOfSpaces: number): void;
    indentationAtPositionIs(fileName: string, position: number, numberOfSpaces: number, indentStyle?: ts.IndentStyle, baseIndentSize?: number): void;
    textAtCaretIs(text: string): void;
    /**
     * Compiles the current file and evaluates 'expr' in a context containing
     * the emitted output, then compares (using ===) the result of that expression
     * to 'value'. Do not use this function with external modules as it is not supported.
     */
    eval(expr: string, value: any): void;
    currentLineContentIs(text: string): void;
    currentFileContentIs(text: string): void;
    formatDocumentChangesNothing(): void;
    verifyGetEmitOutputForCurrentFile(expected: string): void;
    verifyGetEmitOutputContentsForCurrentFile(expected: ts.OutputFile[]): void;
    symbolAtLocation(startRange: FourSlash.Range, ...declarationRanges: FourSlash.Range[]): void;
    typeOfSymbolAtLocation(range: FourSlash.Range, symbol: ts.Symbol, expected: string): void;
    typeAtLocation(range: FourSlash.Range, expected: string): void;
    baselineFindAllReferences(...markerOrRange: FourSlash.MarkerOrNameOrRange[]): void;
    baselineFindAllReferencesAtRangesWithText(...rangeText: string[]): void;
    baselineGetFileReferences(...fileName: string[]): void;
    baselineGoToDefinition(...markerOrRange: FourSlash.MarkerOrNameOrRange[]): void;
    baselineGoToDefinitionAtRangesWithText(...rangeText: string[]): void;
    baselineGetDefinitionAtPosition(...markerOrRange: FourSlash.MarkerOrNameOrRange[]): void;
    baselineGetDefinitionAtRangesWithText(...rangeText: string[]): void;
    baselineGoToSourceDefinition(...markerOrRange: FourSlash.MarkerOrNameOrRange[]): void;
    baselineGoToSourceDefinitionAtRangesWithText(...rangeText: string[]): void;
    baselineGoToType(...markerOrRange: FourSlash.MarkerOrNameOrRange[]): void;
    baselineGoToTypeAtRangesWithText(...rangeText: string[]): void;
    baselineGoToImplementation(...markerOrRange: FourSlash.MarkerOrNameOrRange[]): void;
    baselineGoToImplementationAtRangesWithText(...rangeText: string[]): void;
    baselineDocumentHighlights(markerOrRange?: ArrayOrSingle<FourSlash.MarkerOrNameOrRange>, options?: VerifyDocumentHighlightsOptions): void;
    baselineDocumentHighlightsAtRangesWithText(rangeText?: ArrayOrSingle<string>, options?: VerifyDocumentHighlightsOptions): void;
    noErrors(): void;
    errorExistsAtRange(range: FourSlash.Range, code: number, message?: string): void;
    numberOfErrorsInCurrentFile(expected: number): void;
    baselineCurrentFileBreakpointLocations(): void;
    baselineCurrentFileNameOrDottedNameSpans(): void;
    getEmitOutput(expectedOutputFiles: readonly string[]): void;
    baselineGetEmitOutput(): void;
    baselineQuickInfo(verbosityLevels?: FourSlash.VerbosityLevels, maximumLength?: number): void;
    baselineSignatureHelp(): void;
    baselineCompletions(preferences?: ts.UserPreferences): void;
    baselineSmartSelection(): void;
    baselineSyntacticDiagnostics(): void;
    baselineSyntacticAndSemanticDiagnostics(): void;
    nameOrDottedNameSpanTextIs(text: string): void;
    outliningSpansInCurrentFile(spans: FourSlash.Range[], kind?: "comment" | "region" | "code" | "imports"): void;
    outliningHintSpansInCurrentFile(spans: FourSlash.Range[]): void;
    todoCommentsInCurrentFile(descriptors: string[]): void;
    matchingBracePositionInCurrentFile(bracePosition: number, expectedMatchPosition: number): void;
    noMatchingBracePositionInCurrentFile(bracePosition: number): void;
    docCommentTemplateAt(marker: string | FourSlash.Marker, expectedOffset: number, expectedText: string, options?: ts.DocCommentTemplateOptions): void;
    noDocCommentTemplateAt(marker: string | FourSlash.Marker): void;
    rangeAfterCodeFix(expectedText: string, includeWhiteSpace?: boolean, errorCode?: number, index?: number): void;
    codeFixAll(options: VerifyCodeFixAllOptions): void;
    fileAfterApplyingRefactorAtMarker(markerName: string, expectedContent: string, refactorNameToApply: string, actionName: string, formattingOptions?: ts.FormatCodeSettings): void;
    rangeIs(expectedText: string, includeWhiteSpace?: boolean): void;
    getAndApplyCodeFix(errorCode?: number, index?: number): void;
    applyCodeActionFromCompletion(markerName: string | undefined, options: VerifyCompletionActionOptions): void;
    importFixAtPosition(expectedTextArray: string[], errorCode?: number, preferences?: ts.UserPreferences): void;
    importFixModuleSpecifiers(marker: string, moduleSpecifiers: string[], preferences?: ts.UserPreferences): void;
    baselineAutoImports(marker: string, fullNamesForCodeFix?: string[], options?: ts.UserPreferences): void;
    navigationBar(json: any, options?: {
        checkSpans?: boolean;
    }): void;
    navigationTree(json: any, options?: {
        checkSpans?: boolean;
    }): void;
    navigateTo(...options: VerifyNavigateToOptions[]): void;
    /**
     * This method *requires* a contiguous, complete, and ordered stream of classifications for a file.
     */
    syntacticClassificationsAre(...classifications: {
        classificationType: string;
        text: string;
    }[]): void;
    encodedSyntacticClassificationsLength(length: number): void;
    encodedSemanticClassificationsLength(format: ts.SemanticClassificationFormat, length: number): void;
    /**
     * This method *requires* an ordered stream of classifications for a file, and spans are highly recommended.
     */
    semanticClassificationsAre(format: ts.SemanticClassificationFormat, ...classifications: Classification[]): void;
    replaceWithSemanticClassifications(format: ts.SemanticClassificationFormat.TwentyTwenty): void;
    renameInfoSucceeded(displayName?: string, fullDisplayName?: string, kind?: string, kindModifiers?: string, fileToRename?: string, expectedRange?: FourSlash.Range, preferences?: ts.UserPreferences): void;
    renameInfoFailed(message?: string, preferences?: ts.UserPreferences): void;
    baselineRename(markerOrRange?: ArrayOrSingle<FourSlash.MarkerOrNameOrRange>, options?: RenameOptions): void;
    baselineRenameAtRangesWithText(rangeText?: ArrayOrSingle<string>, options?: RenameOptions): void;
    verifyQuickInfoDisplayParts(kind: string, kindModifiers: string, textSpan: FourSlash.TextSpan, displayParts: ts.SymbolDisplayPart[], documentation: ts.SymbolDisplayPart[], tags: ts.JSDocTagInfo[]): void;
    getSyntacticDiagnostics(expected: readonly Diagnostic[]): void;
    getSemanticDiagnostics(expected: readonly Diagnostic[]): void;
    getRegionSemanticDiagnostics(ranges: ts.TextRange[], expectedDiagnostics: readonly Diagnostic[], expectedRanges: ts.TextRange[] | undefined): void;
    getSuggestionDiagnostics(expected: readonly Diagnostic[]): void;
    ProjectInfo(expected: string[]): void;
    getEditsForFileRename(options: GetEditsForFileRenameOptions): void;
    baselineCallHierarchy(): void;
    moveToNewFile(options: MoveToNewFileOptions): void;
    moveToFile(options: MoveToFileOptions): void;
    noMoveToNewFile(): void;
    organizeImports(newContent: string, mode?: ts.OrganizeImportsMode, preferences?: ts.UserPreferences): void;
    preparePasteEdits(options: PreparePasteEditsOptions): void;
    pasteEdits(options: PasteEditsOptions): void;
}
export declare class Edit {
    private state;
    constructor(state: FourSlash.TestState);
    caretPosition(): FourSlash.Marker;
    backspace(count?: number): void;
    deleteAtCaret(times?: number): void;
    replace(start: number, length: number, text: string): void;
    paste(text: string): void;
    insert(text: string): void;
    insertLine(text: string): void;
    insertLines(...lines: string[]): void;
    deleteLine(index: number): void;
    deleteLineRange(startIndex: number, endIndexInclusive: number): void;
    replaceLine(index: number, text: string): void;
    moveRight(count?: number): void;
    moveLeft(count?: number): void;
    enableFormatting(): void;
    disableFormatting(): void;
    applyRefactor(options: ApplyRefactorOptions): void;
}
export declare class Debug {
    private state;
    constructor(state: FourSlash.TestState);
    printCurrentParameterHelp(): void;
    printCurrentFileState(): void;
    printCurrentFileStateWithWhitespace(): void;
    printCurrentFileStateWithoutCaret(): void;
    printCurrentQuickInfo(): void;
    printCurrentSignatureHelp(): void;
    printCompletionListMembers(options: ts.UserPreferences | undefined): void;
    printAvailableCodeFixes(): void;
    printBreakpointLocation(pos: number): void;
    printBreakpointAtCurrentLocation(): void;
    printNameOrDottedNameSpans(pos: number): void;
    printErrorList(): void;
    printNavigationItems(searchValue?: string): void;
    printNavigationBar(): void;
    printContext(): void;
    printOutliningSpans(): void;
}
export declare class Format {
    private state;
    constructor(state: FourSlash.TestState);
    document(): void;
    copyFormatOptions(): ts.FormatCodeSettings;
    setFormatOptions(options: ts.FormatCodeOptions): ts.FormatCodeSettings;
    selection(startMarker: string, endMarker: string): void;
    onType(posMarker: string, key: string): void;
    setOption(name: keyof ts.FormatCodeSettings, value: number | string | boolean): void;
}
export declare class Cancellation {
    private state;
    constructor(state: FourSlash.TestState);
    resetCancelled(): void;
    setCancelled(numberOfCalls?: number): void;
}
interface OlderClassification {
    classificationType: ts.ClassificationTypeNames;
    text: string;
    textSpan?: FourSlash.TextSpan;
}
interface ModernClassification {
    classificationType: string;
    text?: string;
    textSpan?: FourSlash.TextSpan;
}
type Classification = OlderClassification | ModernClassification;
export declare function classification(format: ts.SemanticClassificationFormat): {
    semanticToken: (identifier: string, text: string, _position: number) => Classification;
    comment?: undefined;
    identifier?: undefined;
    keyword?: undefined;
    numericLiteral?: undefined;
    operator?: undefined;
    stringLiteral?: undefined;
    whiteSpace?: undefined;
    text?: undefined;
    punctuation?: undefined;
    docCommentTagName?: undefined;
    className?: undefined;
    enumName?: undefined;
    interfaceName?: undefined;
    moduleName?: undefined;
    typeParameterName?: undefined;
    parameterName?: undefined;
    typeAliasName?: undefined;
    jsxOpenTagName?: undefined;
    jsxCloseTagName?: undefined;
    jsxSelfClosingTagName?: undefined;
    jsxAttribute?: undefined;
    jsxText?: undefined;
    jsxAttributeStringLiteralValue?: undefined;
    getClassification?: undefined;
} | {
    comment: (text: string, position?: number) => Classification;
    identifier: (text: string, position?: number) => Classification;
    keyword: (text: string, position?: number) => Classification;
    numericLiteral: (text: string, position?: number) => Classification;
    operator: (text: string, position?: number) => Classification;
    stringLiteral: (text: string, position?: number) => Classification;
    whiteSpace: (text: string, position?: number) => Classification;
    text: (text: string, position?: number) => Classification;
    punctuation: (text: string, position?: number) => Classification;
    docCommentTagName: (text: string, position?: number) => Classification;
    className: (text: string, position?: number) => Classification;
    enumName: (text: string, position?: number) => Classification;
    interfaceName: (text: string, position?: number) => Classification;
    moduleName: (text: string, position?: number) => Classification;
    typeParameterName: (text: string, position?: number) => Classification;
    parameterName: (text: string, position?: number) => Classification;
    typeAliasName: (text: string, position?: number) => Classification;
    jsxOpenTagName: (text: string, position?: number) => Classification;
    jsxCloseTagName: (text: string, position?: number) => Classification;
    jsxSelfClosingTagName: (text: string, position?: number) => Classification;
    jsxAttribute: (text: string, position?: number) => Classification;
    jsxText: (text: string, position?: number) => Classification;
    jsxAttributeStringLiteralValue: (text: string, position?: number) => Classification;
    getClassification: (classificationType: ts.ClassificationTypeNames, text: string, position?: number) => Classification;
    semanticToken?: undefined;
};
export declare namespace Completion {
    import SortTextType = ts.Completions.SortText;
    type SortText = SortTextType;
    export import CompletionSource = ts.Completions.CompletionSource;
    const SortText: {
        LocalDeclarationPriority: SortText;
        LocationPriority: SortText;
        OptionalMember: SortText;
        MemberDeclaredBySpreadAssignment: SortText;
        SuggestedClassMembers: SortText;
        GlobalsOrKeywords: SortText;
        AutoImportSuggestions: SortText;
        ClassMemberSnippets: SortText;
        JavascriptIdentifiers: SortText;
        Deprecated(sortText: SortText): SortText;
        ObjectLiteralProperty(presetSortText: SortText, symbolDisplayName: string): SortText;
        SortBelow(sortText: SortText): SortText;
    };
    const keywordsWithUndefined: readonly ExpectedCompletionEntryObject[];
    const keywords: readonly ExpectedCompletionEntryObject[];
    const typeKeywords: readonly ExpectedCompletionEntryObject[];
    function sorted(entries: readonly ExpectedCompletionEntry[]): readonly ExpectedCompletionEntry[];
    function typeKeywordsPlus(plus: readonly ExpectedCompletionEntry[]): ExpectedExactCompletionsPlus;
    const globalThisEntry: ExpectedCompletionEntry;
    const globalTypes: ExpectedExactCompletionsPlus;
    function globalTypesPlus(plus: readonly ExpectedCompletionEntry[]): ExpectedExactCompletionsPlus;
    const typeAssertionKeywords: readonly ExpectedCompletionEntry[];
    const classElementKeywords: readonly ExpectedCompletionEntryObject[];
    const classElementInJsKeywords: readonly ExpectedCompletionEntryObject[];
    const constructorParameterKeywords: readonly ExpectedCompletionEntryObject[];
    const functionMembers: readonly ExpectedCompletionEntryObject[];
    function functionMembersPlus(plus: readonly ExpectedCompletionEntryObject[]): ExpectedExactCompletionsPlus;
    const stringMembers: readonly ExpectedCompletionEntryObject[];
    const functionMembersWithPrototype: readonly ExpectedCompletionEntryObject[];
    function functionMembersWithPrototypePlus(plus: readonly ExpectedCompletionEntryObject[]): ExpectedCompletionEntryObject[];
    const statementKeywordsWithTypes: readonly ExpectedCompletionEntryObject[];
    const statementKeywords: readonly ExpectedCompletionEntryObject[];
    const statementInJsKeywords: readonly ExpectedCompletionEntryObject[];
    const globalsVars: readonly ExpectedCompletionEntryObject[];
    const undefinedVarEntry: ExpectedCompletionEntryObject;
    const globalsInsideFunction: (plus: readonly ExpectedCompletionEntry[], options?: {
        noLib?: boolean;
    }) => readonly ExpectedCompletionEntry[];
    const globalsInJsInsideFunction: (plus: readonly ExpectedCompletionEntry[], options?: {
        noLib?: boolean;
    }) => readonly ExpectedCompletionEntry[];
    const globalKeywords: readonly ExpectedCompletionEntryObject[];
    const globalInJsKeywords: readonly ExpectedCompletionEntryObject[];
    const insideMethodKeywords: readonly ExpectedCompletionEntryObject[];
    const insideMethodInJsKeywords: readonly ExpectedCompletionEntryObject[];
    const globals: readonly ExpectedCompletionEntryObject[];
    const globalsInJs: readonly ExpectedCompletionEntryObject[];
    function globalsPlus(plus: readonly ExpectedCompletionEntry[], options?: {
        noLib?: boolean;
    }): ExpectedExactCompletionsPlus;
    function globalsInJsPlus(plus: readonly ExpectedCompletionEntry[], options?: {
        noLib?: boolean;
    }): ExpectedExactCompletionsPlus;
}
export interface ReferenceGroup {
    definition: ReferenceGroupDefinition;
    ranges: FourSlash.Range[];
}
export type ReferenceGroupDefinition = string | {
    text: string;
    range: FourSlash.Range;
};
export interface ApplyRefactorOptions {
    refactorName: string;
    actionName: string;
    actionDescription: string;
    newContent: NewFileContent;
    triggerReason?: ts.RefactorTriggerReason;
}
export type ExpectedCompletionEntry = string | ExpectedCompletionEntryObject;
export interface ExpectedCompletionEntryObject {
    readonly name: string;
    readonly source?: string;
    readonly insertText?: string;
    readonly filterText?: string;
    readonly replacementSpan?: FourSlash.Range;
    readonly hasAction?: boolean;
    readonly isRecommended?: boolean;
    readonly isFromUncheckedFile?: boolean;
    readonly kind?: string;
    readonly isPackageJsonImport?: boolean;
    readonly isSnippet?: boolean;
    readonly kindModifiers?: string;
    readonly text?: string;
    readonly documentation?: string;
    readonly sourceDisplay?: string;
    readonly labelDetails?: ExpectedCompletionEntryLabelDetails;
    readonly tags?: readonly ts.JSDocTagInfo[];
    readonly sortText?: ts.Completions.SortText;
    readonly commitCharacters?: string[];
}
export interface ExpectedCompletionEntryLabelDetails {
    detail?: string;
    description?: string;
}
export type ExpectedExactCompletionsPlus = readonly ExpectedCompletionEntry[] & {
    plusFunctionName: string;
    plusArgument: readonly ExpectedCompletionEntry[];
};
export interface VerifyCompletionsOptions {
    readonly marker?: ArrayOrSingle<string | FourSlash.Marker>;
    readonly isNewIdentifierLocation?: boolean;
    readonly isGlobalCompletion?: boolean;
    readonly optionalReplacementSpan?: FourSlash.Range;
    readonly exact?: ArrayOrSingle<ExpectedCompletionEntry> | ExpectedExactCompletionsPlus;
    readonly unsorted?: readonly ExpectedCompletionEntry[];
    readonly includes?: ArrayOrSingle<ExpectedCompletionEntry>;
    readonly excludes?: ArrayOrSingle<string>;
    readonly preferences?: ts.UserPreferences;
    readonly triggerCharacter?: ts.CompletionsTriggerCharacter;
    readonly defaultCommitCharacters?: string[];
}
export interface VerifySignatureHelpOptions {
    readonly marker?: ArrayOrSingle<string | FourSlash.Marker>;
    /** @default 1 */
    readonly overloadsCount?: number;
    /** @default undefined */
    readonly docComment?: string;
    readonly text?: string;
    readonly parameterName?: string;
    readonly parameterSpan?: string;
    /** @default undefined */
    readonly parameterDocComment?: string;
    readonly parameterCount?: number;
    readonly argumentCount?: number;
    /** @default false */
    readonly isVariadic?: boolean;
    /** @default ts.emptyArray */
    readonly tags?: readonly ts.JSDocTagInfo[];
    readonly triggerReason?: ts.SignatureHelpTriggerReason;
    readonly overrideSelectedItemIndex?: number;
}
export interface VerifyNavigateToOptions {
    readonly pattern: string;
    readonly fileName?: string;
    readonly expected: readonly ExpectedNavigateToItem[];
    readonly excludeLibFiles?: boolean;
}
export interface ExpectedNavigateToItem {
    readonly name: string;
    readonly kind: ts.ScriptElementKind;
    readonly kindModifiers?: string;
    readonly matchKind?: keyof typeof ts.PatternMatchKind;
    readonly isCaseSensitive?: boolean;
    readonly range: FourSlash.Range;
    readonly containerName?: string;
    readonly containerKind?: ts.ScriptElementKind;
}
export interface VerifyInlayHintsOptions {
    text: string;
    position: number;
    kind?: ts.InlayHintKind;
    whitespaceBefore?: boolean;
    whitespaceAfter?: boolean;
}
export type ArrayOrSingle<T> = T | readonly T[];
export interface VerifyCompletionListContainsOptions extends ts.UserPreferences {
    triggerCharacter?: ts.CompletionsTriggerCharacter;
    sourceDisplay: string;
    isRecommended?: true;
    insertText?: string;
    replacementSpan?: FourSlash.Range;
}
export interface VerifyDocumentHighlightsOptions {
    filesToSearch: readonly string[];
}
export type NewFileContent = string | {
    readonly [filename: string]: string;
};
export interface NewContentOptions {
    newFileContent?: NewFileContent;
    newRangeContent?: string;
}
export interface VerifyCodeFixOptions extends NewContentOptions {
    readonly description: string | [string, ...(string | number)[]] | DiagnosticIgnoredInterpolations;
    readonly errorCode?: number;
    readonly index?: number;
    readonly preferences?: ts.UserPreferences;
    readonly applyChanges?: boolean;
    readonly commands?: readonly ts.CodeActionCommand[];
}
export interface VerifyCodeFixAvailableOptions {
    description: string;
    commands?: ts.CodeActionCommand[];
}
export interface VerifyCodeFixAllOptions {
    fixId: string;
    fixAllDescription: string;
    newFileContent: NewFileContent;
    commands: readonly {}[];
    preferences?: ts.UserPreferences;
}
export interface VerifyRefactorOptions {
    name: string;
    actionName: string;
    refactors: readonly ts.ApplicableRefactorInfo[];
}
export interface VerifyCompletionActionOptions extends NewContentOptions {
    name: string;
    source?: string;
    data?: ts.CompletionEntryData;
    description: string;
    preferences?: ts.UserPreferences;
}
export interface Diagnostic {
    message: string;
    range?: FourSlash.Range;
    code: number;
    reportsUnnecessary?: true;
    reportsDeprecated?: true;
}
export interface GetEditsForFileRenameOptions {
    readonly oldPath: string;
    readonly newPath: string;
    readonly newFileContents: {
        readonly [fileName: string]: string;
    };
    readonly preferences?: ts.UserPreferences;
}
export interface MoveToNewFileOptions {
    readonly newFileContents: {
        readonly [fileName: string]: string;
    };
    readonly preferences?: ts.UserPreferences;
}
export interface MoveToFileOptions {
    readonly newFileContents: {
        readonly [fileName: string]: string;
    };
    readonly interactiveRefactorArguments: ts.InteractiveRefactorArguments;
    readonly preferences?: ts.UserPreferences;
}
export interface PreparePasteEditsOptions {
    readonly providePasteEdits: boolean;
    readonly copiedTextRange: ts.TextRange[];
    readonly copiedFromFile: string;
}
export interface PasteEditsOptions {
    readonly newFileContents: {
        readonly [fileName: string]: string;
    };
    args: ts.PasteEditsArgs;
    readonly fixId: string;
}
export type RenameLocationsOptions = readonly RenameLocationOptions[] | {
    readonly findInStrings?: boolean;
    readonly findInComments?: boolean;
    readonly ranges: readonly RenameLocationOptions[];
    readonly providePrefixAndSuffixTextForRename?: boolean;
};
export interface DiagnosticIgnoredInterpolations {
    template: string;
}
export type RenameLocationOptions = FourSlash.Range | {
    readonly range: FourSlash.Range;
    readonly prefixText?: string;
    readonly suffixText?: string;
};
export interface RenameOptions {
    readonly findInStrings?: boolean;
    readonly findInComments?: boolean;
    readonly providePrefixAndSuffixTextForRename?: boolean;
    readonly quotePreference?: "auto" | "double" | "single";
}
export {};
//# sourceMappingURL=fourslashInterfaceImpl.d.ts.map