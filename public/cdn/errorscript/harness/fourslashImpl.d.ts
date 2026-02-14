import * as FourSlashInterface from "./_namespaces/FourSlashInterface.js";
import * as Harness from "./_namespaces/Harness.js";
import * as ts from "./_namespaces/ts.js";
import * as vfs from "./_namespaces/vfs.js";
import ArrayOrSingle = FourSlashInterface.ArrayOrSingle;
export declare const enum FourSlashTestType {
    Native = 0,
    Server = 1
}
interface FourSlashFile {
    content: string;
    fileName: string;
    symlinks?: string[];
    version: number;
    fileOptions: Harness.TestCaseParser.CompilerSettings;
}
interface FourSlashData {
    globalOptions: Harness.TestCaseParser.CompilerSettings;
    files: FourSlashFile[];
    symlinks: vfs.FileSet | undefined;
    markerPositions: Map<string, Marker>;
    markers: Marker[];
    /**
     * Inserted in source files by surrounding desired text
     * in a range with `[|` and `|]`. For example,
     *
     * [|text in range|]
     *
     * is a range with `text in range` "selected".
     */
    ranges: Range[];
    rangesByText?: ts.MultiMap<string, Range>;
}
export interface Marker {
    fileName: string;
    position: number;
    data?: {};
}
export interface Range extends ts.TextRange {
    fileName: string;
    marker?: Marker;
}
export type MarkerOrNameOrRange = string | Marker | Range;
export interface TextSpan {
    start: number;
    end: number;
}
export interface VerbosityLevels {
    [markerName: string]: number | number[] | undefined;
}
export declare class TestCancellationToken implements ts.HostCancellationToken {
    private static readonly notCanceled;
    private numberOfCallsBeforeCancellation;
    isCancellationRequested(): boolean;
    setCancelled(numberOfCalls?: number): void;
    resetCancelled(): void;
}
export declare function verifyOperationIsCancelled(f: () => void): void;
export declare function ignoreInterpolations(diagnostic: string | ts.DiagnosticMessage): FourSlashInterface.DiagnosticIgnoredInterpolations;
export declare class TestState {
    private originalInputFileName;
    private basePath;
    private testType;
    testData: FourSlashData;
    private languageServiceAdapterHost;
    private languageService;
    private cancellationToken;
    private assertTextConsistent;
    currentCaretPosition: number;
    selectionEnd: number;
    lastKnownMarker: string | undefined;
    activeFile: FourSlashFile;
    enableFormatting: boolean;
    formatCodeSettings: ts.FormatCodeSettings;
    private inputFiles;
    private logger;
    private static getDisplayPartsJson;
    private addMatchedInputFile;
    private getLanguageServiceAdapter;
    constructor(originalInputFileName: string, basePath: string, testType: FourSlashTestType, testData: FourSlashData);
    private baselineFromTest;
    private baseline;
    baselineTest(): void;
    baselineTsserverLog(): void;
    private getFileContent;
    private tryGetFileContent;
    goToMarker(name?: string | Marker): void;
    private goToMarkerOrNameOrRange;
    goToEachMarker(markers: readonly Marker[], action: (marker: Marker, index: number) => void): void;
    goToEachRange(action: (range: Range) => void): void;
    markerName(m: Marker): string;
    goToPosition(positionOrLineAndCharacter: number | ts.LineAndCharacter): void;
    select(startMarker: string, endMarker: string): void;
    selectAllInFile(fileName: string): void;
    selectRange(range: Range): void;
    selectLine(index: number): void;
    moveCaretRight(count?: number): void;
    openFile(indexOrName: number | string, content?: string, scriptKindName?: string): void;
    verifyErrorExistsBetweenMarkers(startMarkerName: string, endMarkerName: string, shouldExist: boolean): void;
    verifyOrganizeImports(newContent: string, mode?: ts.OrganizeImportsMode, preferences?: ts.UserPreferences): void;
    private raiseError;
    private messageAtLastKnownMarker;
    private assertionMessageAtLastKnownMarker;
    private getDiagnostics;
    private getAllDiagnostics;
    verifyErrorExistsAfterMarker(markerName: string, shouldExist: boolean, after: boolean): void;
    private anyErrorInRange;
    private printErrorLog;
    private formatRange;
    private formatLineAndCharacterOfPosition;
    private formatPosition;
    verifyNoErrors(): void;
    verifyErrorExistsAtRange(range: Range, code: number, expectedMessage?: string): void;
    verifyNumberOfErrorsInCurrentFile(expected: number): void;
    verifyEval(expr: string, value: any): void;
    private getGoToDefinition;
    private getGoToDefinitionAndBoundSpan;
    private renderMarkers;
    private baselineGoToDefs;
    baselineGoToDefinition(markerOrRange: MarkerOrNameOrRange[] | undefined, rangeText: string[] | undefined): void;
    baselineGetDefinitionAtPosition(markerOrRange: MarkerOrNameOrRange[] | undefined, rangeText: string[] | undefined): void;
    baselineGoToSourceDefinition(markerOrRange: MarkerOrNameOrRange[] | undefined, rangeText: string[] | undefined): void;
    baselineGoToType(markerOrRange: MarkerOrNameOrRange[] | undefined, rangeText: string[] | undefined): void;
    baselineGoToImplementation(markerOrRange: MarkerOrNameOrRange[] | undefined, rangeText: string[] | undefined): void;
    verifyGetEmitOutputForCurrentFile(expected: string): void;
    verifyGetEmitOutputContentsForCurrentFile(expected: ts.OutputFile[]): void;
    baselineInlayHints(span?: ts.TextSpan, preferences?: ts.UserPreferences): void;
    verifyCompletions(options: FourSlashInterface.VerifyCompletionsOptions): FourSlashInterface.CompletionsResult | undefined;
    private verifyCompletionsWorker;
    private verifyCompletionEntry;
    private verifyCompletionsAreExactly;
    /** Use `getProgram` instead of accessing this directly. */
    private _program;
    /** Use `getChecker` instead of accessing this directly. */
    private _checker;
    private getProgram;
    private getChecker;
    private getSourceFile;
    private getNode;
    private goToAndGetNode;
    private verifyRange;
    private verifySymbol;
    verifySymbolAtLocation(startRange: Range, declarationRanges: Range[]): void;
    symbolsInScope(range: Range): ts.Symbol[];
    setTypesRegistry(map: ts.MapLike<void>): void;
    verifyTypeOfSymbolAtLocation(range: Range, symbol: ts.Symbol, expected: string): void;
    verifyTypeAtLocation(range: Range, expected: string): void;
    private baselineEachMarkerOrRangeArrayOrSingle;
    private baselineEachMarkerOrRange;
    private baselineArray;
    baselineFindAllReferences(markerOrRange: MarkerOrNameOrRange[] | undefined, rangeText: string[] | undefined): void;
    baselineGetFileReferences(fileNames: string[]): void;
    private getBaselineForDocumentSpansWithFileContents;
    private getBaselineForGroupedDocumentSpansWithFileContents;
    private static readonly nLinesContext;
    private getBaselineContentForFile;
    private assertObjectsEqual;
    private configure;
    private getCompletionListAtCaret;
    private getCompletionEntryDetails;
    private findReferencesAtCaret;
    getSyntacticDiagnostics(expected: readonly FourSlashInterface.Diagnostic[]): void;
    getSemanticDiagnostics(): ts.Diagnostic[];
    verifySemanticDiagnostics(expected: readonly FourSlashInterface.Diagnostic[]): void;
    getSuggestionDiagnostics(expected: readonly FourSlashInterface.Diagnostic[]): void;
    getRegionSemanticDiagnostics(ranges: ts.TextRange[], expectedDiagnostics: readonly FourSlashInterface.Diagnostic[] | undefined, expectedRanges: ts.TextRange[] | undefined): void;
    private testDiagnostics;
    verifyQuickInfoAt(markerName: string | Range, expectedText: string, expectedDocumentation?: string, expectedTags?: {
        name: string;
        text: string;
    }[]): void;
    verifyQuickInfos(namesAndTexts: {
        [name: string]: string | [string, string];
    }): void;
    verifyQuickInfoString(expectedText: string, expectedDocumentation?: string, expectedTags?: {
        name: string;
        text: string;
    }[]): void;
    verifyQuickInfoDisplayParts(kind: string, kindModifiers: string, textSpan: TextSpan, displayParts: ts.SymbolDisplayPart[], documentation: ts.SymbolDisplayPart[], tags: ts.JSDocTagInfo[] | undefined): void;
    baselineRename(markerOrRange: ArrayOrSingle<MarkerOrNameOrRange> | undefined, rangeText: ArrayOrSingle<string> | undefined, options: FourSlashInterface.RenameOptions | undefined): void;
    verifyQuickInfoExists(negative: boolean): void;
    verifySignatureHelpPresence(expectPresent: boolean, triggerReason: ts.SignatureHelpTriggerReason | undefined, markers: readonly (string | Marker)[]): void;
    verifySignatureHelp(optionses: readonly FourSlashInterface.VerifySignatureHelpOptions[]): void;
    private verifySignatureHelpWorker;
    private validate;
    verifyRenameInfoSucceeded(displayName: string | undefined, fullDisplayName: string | undefined, kind: string | undefined, kindModifiers: string | undefined, fileToRename: string | undefined, expectedRange: Range | undefined, preferences: ts.UserPreferences | undefined): void;
    verifyRenameInfoFailed(message?: string, preferences?: ts.UserPreferences): void;
    private alignmentForExtraInfo;
    private spanLines;
    private spanInfoToString;
    private baselineCurrentFileLocations;
    getBreakpointStatementLocation(pos: number): ts.TextSpan | undefined;
    baselineCurrentFileBreakpointLocations(): void;
    private getEmitFiles;
    verifyGetEmitOutput(expectedOutputFiles: readonly string[]): void;
    baselineGetEmitOutput(): void;
    private flattenChainedMessage;
    baselineSyntacticDiagnostics(): void;
    private getCompilerTestFiles;
    baselineSyntacticAndSemanticDiagnostics(): void;
    private getSyntacticDiagnosticBaselineText;
    private getSemanticDiagnosticBaselineText;
    baselineQuickInfo(verbosityLevels?: VerbosityLevels, maximumLength?: number): void;
    baselineSignatureHelp(): void;
    baselineCompletions(preferences?: ts.UserPreferences): void;
    private annotateContentWithTooltips;
    baselineSmartSelection(): void;
    printBreakpointLocation(pos: number): void;
    printBreakpointAtCurrentLocation(): void;
    printCurrentParameterHelp(): void;
    printCurrentQuickInfo(): void;
    printErrorList(): void;
    printCurrentFileState(showWhitespace: boolean, makeCaretVisible: boolean): void;
    printCurrentSignatureHelp(): void;
    private getBaselineFileNameForContainingTestFile;
    private getSignatureHelp;
    printCompletionListMembers(preferences: ts.UserPreferences | undefined): void;
    private printMembersOrCompletions;
    printContext(): void;
    deleteChar(count?: number): void;
    replace(start: number, length: number, text: string): void;
    deleteLineRange(startIndex: number, endIndexInclusive: number): void;
    caretPosition(): Marker;
    deleteCharBehindMarker(count?: number): void;
    type(text: string, highFidelity?: boolean): void;
    paste(text: string): void;
    private checkPostEditInvariants;
    /**
     * @returns The number of characters added to the file as a result of the edits.
     * May be negative.
     */
    private applyEdits;
    copyFormatOptions(): ts.FormatCodeSettings;
    setFormatOptions(formatCodeOptions: ts.FormatCodeOptions | ts.FormatCodeSettings): ts.FormatCodeSettings;
    formatDocument(): void;
    formatSelection(start: number, end: number): void;
    formatOnType(pos: number, key: string): void;
    private editScriptAndUpdateMarkers;
    private removeWhitespace;
    goToBOF(): void;
    goToEOF(): void;
    goToRangeStart({ fileName, pos }: Range): void;
    getMarkers(): Marker[];
    getMarkerNames(): string[];
    getRanges(): Range[];
    getRangesInFile(fileName?: string): Range[];
    rangesByText(): Map<string, Range[]>;
    private rangeText;
    verifyCaretAtMarker(markerName?: string): void;
    private getIndentation;
    verifyIndentationAtCurrentPosition(numberOfSpaces: number, indentStyle?: ts.IndentStyle, baseIndentSize?: number): void;
    verifyIndentationAtPosition(fileName: string, position: number, numberOfSpaces: number, indentStyle?: ts.IndentStyle, baseIndentSize?: number): void;
    verifyCurrentLineContent(text: string): void;
    verifyCurrentFileContent(text: string): void;
    private verifyFileContent;
    verifyFormatDocumentChangesNothing(): void;
    verifyTextAtCaretIs(text: string): void;
    verifyCurrentNameOrDottedNameSpanText(text: string): undefined;
    private getNameOrDottedNameSpan;
    baselineCurrentFileNameOrDottedNameSpans(): void;
    printNameOrDottedNameSpans(pos: number): void;
    private classificationToIdentifier;
    private verifyClassifications;
    verifyProjectInfo(expected: string[]): void;
    replaceWithSemanticClassifications(format: ts.SemanticClassificationFormat.TwentyTwenty): void;
    verifyEncodedSyntacticClassificationsLength(expected: number): void;
    verifyEncodedSemanticClassificationsLength(format: ts.SemanticClassificationFormat, expected: number): void;
    verifySemanticClassifications(format: ts.SemanticClassificationFormat, expected: {
        classificationType: string | number;
        text?: string;
    }[]): void;
    verifySyntacticClassifications(expected: {
        classificationType: string;
        text: string;
    }[]): void;
    printOutliningSpans(): void;
    private printOutliningSpansInline;
    verifyOutliningSpans(spans: Range[], kind?: "comment" | "region" | "code" | "imports"): void;
    verifyOutliningHintSpans(spans: Range[]): void;
    verifyTodoComments(descriptors: string[], spans: Range[]): void;
    /**
     * Finds and applies a code action corresponding to the supplied parameters.
     * If index is undefined, applies the unique code action available.
     * @param errorCode The error code that generated the code action.
     * @param index The nth (0-index-based) codeaction available generated by errorCode.
     */
    getAndApplyCodeActions(errorCode?: number, index?: number): void;
    applyCodeActionFromCompletion(markerName: string | undefined, options: FourSlashInterface.VerifyCompletionActionOptions): undefined;
    verifyRangeIs(expectedText: string, includeWhiteSpace?: boolean): void;
    private getOnlyRange;
    private verifyTextMatches;
    /**
     * Compares expected text to the text that would be in the sole range
     * (ie: [|...|]) in the file after applying the codefix sole codefix
     * in the source file.
     */
    verifyRangeAfterCodeFix(expectedText: string, includeWhiteSpace?: boolean, errorCode?: number, index?: number): void;
    verifyCodeFixAll({ fixId, fixAllDescription, newFileContent, commands: expectedCommands, preferences }: FourSlashInterface.VerifyCodeFixAllOptions): void;
    verifyCodeFix(options: FourSlashInterface.VerifyCodeFixOptions): void;
    private verifyNewContent;
    private verifyNewContentAfterChange;
    /**
     * Rerieves a codefix satisfying the parameters, or undefined if no such codefix is found.
     * @param fileName Path to file where error should be retrieved from.
     */
    private getCodeFixes;
    private applyChanges;
    verifyImportFixAtPosition(expectedTextArray: string[], errorCode: number | undefined, preferences: ts.UserPreferences | undefined): void;
    verifyImportFixModuleSpecifiers(markerName: string, moduleSpecifiers: string[], preferences?: ts.UserPreferences): void;
    verifyPreparePasteEdits(options: FourSlashInterface.PreparePasteEditsOptions): void;
    verifyPasteEdits(options: FourSlashInterface.PasteEditsOptions): void;
    verifyDocCommentTemplate(expected: ts.TextInsertion | undefined, options?: ts.DocCommentTemplateOptions): void;
    verifyBraceCompletionAtPosition(negative: boolean, openingBrace: string): void;
    baselineAutoImports(markerName: string, fullNamesForCodeFix?: string[], preferences?: ts.UserPreferences): void;
    verifyJsxClosingTag(map: {
        [markerName: string]: ts.JsxClosingTagInfo | undefined;
    }): void;
    verifyLinkedEditingRange(map: {
        [markerName: string]: ts.LinkedEditingInfo | undefined;
    }): void;
    baselineLinkedEditing(): void;
    verifyMatchingBracePosition(bracePosition: number, expectedMatchPosition: number): void;
    verifyNoMatchingBracePosition(bracePosition: number): void;
    verifySpanOfEnclosingComment(negative: boolean, onlyMultiLineDiverges?: boolean): void;
    verifyNavigateTo(options: readonly FourSlashInterface.VerifyNavigateToOptions[]): void;
    verifyNavigationBar(json: any, options: {
        checkSpans?: boolean;
    } | undefined): void;
    verifyNavigationTree(json: any, options: {
        checkSpans?: boolean;
    } | undefined): void;
    private verifyNavigationTreeOrBar;
    printNavigationItems(searchValue: string): void;
    printNavigationBar(): void;
    private getDocumentHighlightsAtCurrentPosition;
    baselineDocumentHighlights(markerOrRange: ArrayOrSingle<MarkerOrNameOrRange> | undefined, rangeText: ArrayOrSingle<string> | undefined, options: FourSlashInterface.VerifyDocumentHighlightsOptions | undefined): void;
    verifyCodeFixAvailable(negative: boolean, expected: FourSlashInterface.VerifyCodeFixAvailableOptions[] | string | undefined): void;
    verifyCodeFixAllAvailable(negative: boolean, fixName: string): void;
    verifyApplicableRefactorAvailableAtMarker(negative: boolean, markerName: string): void;
    private getSelection;
    verifyRefactorAvailable(negative: boolean, triggerReason: ts.RefactorTriggerReason, name: string, actionName?: string, actionDescription?: string, kind?: string, preferences?: {}, includeInteractiveActions?: boolean): void;
    verifyRefactorKindsAvailable(kind: string, expected: string[], preferences?: {}): void;
    verifyRefactorsAvailable(names: readonly string[]): void;
    verifyApplicableRefactorAvailableForRange(negative: boolean): void;
    applyRefactor({ refactorName, actionName, actionDescription, newContent: newContentWithRenameMarker, triggerReason }: FourSlashInterface.ApplyRefactorOptions): void;
    private static parseNewContent;
    noMoveToNewFile(): void;
    moveToNewFile(options: FourSlashInterface.MoveToNewFileOptions): void;
    moveToFile(options: FourSlashInterface.MoveToFileOptions): void;
    private testNewFileContents;
    verifyFileAfterApplyingRefactorAtMarker(markerName: string, expectedContent: string, refactorNameToApply: string, actionName: string, formattingOptions?: ts.FormatCodeSettings): void;
    printAvailableCodeFixes(): void;
    private formatCallHierarchyItemSpan;
    private formatCallHierarchyItemSpans;
    private formatCallHierarchyItem;
    private formatCallHierarchy;
    baselineCallHierarchy(): void;
    private getLineContent;
    private getCurrentLineContent;
    private findFile;
    private tryFindFileWorker;
    private hasFile;
    private getLineColStringAtPosition;
    getMarkerByName(markerName: string): Marker;
    setCancelled(numberOfCalls: number): void;
    resetCancelled(): void;
    getEditsForFileRename({ oldPath, newPath, newFileContents, preferences }: FourSlashInterface.GetEditsForFileRenameOptions): void;
    private getApplicableRefactorsAtSelection;
    private getApplicableRefactors;
    private getApplicableRefactorsWorker;
    configurePlugin(pluginName: string, configuration: any): void;
    setCompilerOptionsForInferredProjects(options: ts.server.protocol.CompilerOptions): void;
    toggleLineComment(newFileContent: string): void;
    toggleMultilineComment(newFileContent: string): void;
    commentSelection(newFileContent: string): void;
    uncommentSelection(newFileContent: string): void;
    baselineMapCode(ranges: Range[][], changes?: string[]): void;
}
export interface FourSlashServerLogBaseliner {
    baseline?: () => void;
}
export declare function runFourSlashTest(basePath: string, testType: FourSlashTestType, fileName: string, serverLogBaseliner?: FourSlashServerLogBaseliner): void;
export declare function runFourSlashTestContent(basePath: string, testType: FourSlashTestType, content: string, fileName: string, serverLogBaseliner?: FourSlashServerLogBaseliner): void;
export {};
//# sourceMappingURL=fourslashImpl.d.ts.map