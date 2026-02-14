import { BuilderProgram, BuilderProgramHost, BuilderState, BuildInfo, BuildInfoFileVersionMap, CompilerHost, CompilerOptions, Diagnostic, DiagnosticCategory, DiagnosticMessageChain, EmitAndSemanticDiagnosticsBuilderProgram, HostForComputeHash, Path, Program, ProjectReference, ReadBuildProgramHost, RepopulateDiagnosticChainInfo, SemanticDiagnosticsBuilderProgram, SourceFile, WriteFileCallbackData } from "./_namespaces/ts.js";
/** @internal */
export interface ReusableDiagnostic extends ReusableDiagnosticRelatedInformation {
    /** May store more in future. For now, this will simply be `true` to indicate when a diagnostic is an unused-identifier diagnostic. */
    reportsUnnecessary?: {};
    reportDeprecated?: {};
    source?: string;
    relatedInformation?: ReusableDiagnosticRelatedInformation[];
    skippedOn?: keyof CompilerOptions;
}
/** @internal */
export interface ReusableDiagnosticRelatedInformation {
    category: DiagnosticCategory;
    code: number;
    file: string | undefined | false;
    start: number | undefined;
    length: number | undefined;
    messageText: string | ReusableDiagnosticMessageChain;
}
/** @internal */
export interface ReusableRepopulateInfoChain {
    info: RepopulateDiagnosticChainInfo;
    next?: ReusableDiagnosticMessageChain[];
}
/** @internal */
export type SerializedDiagnosticMessageChain = Omit<DiagnosticMessageChain, "next" | "repopulateInfo"> & {
    next?: ReusableDiagnosticMessageChain[];
};
/** @internal */
export type ReusableDiagnosticMessageChain = SerializedDiagnosticMessageChain | ReusableRepopulateInfoChain;
/**
 * Signature (Hash of d.ts emitted), is string if it was emitted using same d.ts.map option as what compilerOptions indicate, otherwise tuple of string
 *
 * @internal
 */
export type EmitSignature = string | [signature: string];
/** @internal */
export interface ReusableBuilderProgramState extends BuilderState {
    /**
     * Cache of bind and check diagnostics for files with their Path being the key
     */
    semanticDiagnosticsPerFile: Map<Path, readonly ReusableDiagnostic[] | readonly Diagnostic[]>;
    /** Cache of dts emit diagnostics for files with their Path being the key */
    emitDiagnosticsPerFile?: Map<Path, readonly ReusableDiagnostic[] | readonly Diagnostic[]> | undefined;
    /**
     * The map has key by source file's path that has been changed
     */
    changedFilesSet?: Set<Path>;
    /**
     * program corresponding to this state
     */
    program?: Program | undefined;
    /**
     * compilerOptions for the program
     */
    compilerOptions: CompilerOptions;
    /**
     * Files pending to be emitted
     */
    affectedFilesPendingEmit?: ReadonlyMap<Path, BuilderFileEmit>;
    /**
     * emitKind pending for a program with --out
     */
    programEmitPending?: BuilderFileEmit;
    /** If semantic diagnsotic check is pending */
    checkPending?: true;
    hasReusableDiagnostic?: true;
    /**
     * Hash of d.ts emitted for the file, use to track when emit of d.ts changes
     */
    emitSignatures?: Map<Path, EmitSignature>;
    /**
     * Hash of d.ts emit with --out
     */
    outSignature?: EmitSignature;
    /**
     * Name of the file whose dts was the latest to change
     */
    latestChangedDtsFile: string | undefined;
    /** Recorded if program had errors */
    hasErrors?: boolean;
}
/** @internal */
export declare const enum BuilderFileEmit {
    None = 0,
    Js = 1,// emit js file
    JsMap = 2,// emit js.map file
    JsInlineMap = 4,// emit inline source map in js file
    DtsErrors = 8,// emit dts errors
    DtsEmit = 16,// emit d.ts file
    DtsMap = 32,// emit d.ts.map file
    Dts = 24,
    AllJs = 7,
    AllDtsEmit = 48,
    AllDts = 56,
    All = 63
}
/**
 * State to store the changed files, affected files and cache semantic diagnostics
 *
 * @internal
 */
export interface BuilderProgramState extends BuilderState, ReusableBuilderProgramState {
    /**
     * Cache of bind and check diagnostics for files with their Path being the key
     */
    semanticDiagnosticsPerFile: Map<Path, readonly Diagnostic[]>;
    /** Cache of dts emit diagnostics for files with their Path being the key */
    emitDiagnosticsPerFile?: Map<Path, readonly Diagnostic[]> | undefined;
    /**
     * The map has key by source file's path that has been changed
     */
    changedFilesSet: Set<Path>;
    /**
     * Set of affected files being iterated
     */
    affectedFiles?: readonly SourceFile[] | undefined;
    /**
     * Current index to retrieve affected file from
     */
    affectedFilesIndex: number | undefined;
    /**
     * Current changed file for iterating over affected files
     */
    currentChangedFilePath?: Path | undefined;
    /**
     * Already seen affected files
     */
    seenAffectedFiles: Set<Path> | undefined;
    /**
     * whether this program has cleaned semantic diagnostics cache for lib files
     */
    cleanedDiagnosticsOfLibFiles?: boolean;
    /**
     * True if the semantic diagnostics were copied from the old state
     */
    semanticDiagnosticsFromOldState?: Set<Path>;
    /**
     * Records if change in dts emit was detected
     */
    hasChangedEmitSignature?: boolean;
    /**
     * Files pending to be emitted
     */
    affectedFilesPendingEmit?: Map<Path, BuilderFileEmit>;
    /**
     * true if build info is emitted
     */
    buildInfoEmitPending: boolean;
    /**
     * Already seen emitted files
     */
    seenEmittedFiles: Map<Path, BuilderFileEmit> | undefined;
    /** Already seen program emit */
    seenProgramEmit: BuilderFileEmit | undefined;
    hasErrorsFromOldState?: boolean;
}
/**
 * Get flags determining what all needs to be emitted
 *
 * @internal
 */
export declare function getBuilderFileEmit(options: CompilerOptions): BuilderFileEmit;
/**
 * Determining what all is pending to be emitted based on previous options or previous file emit flags
 *  @internal
 */
export declare function getPendingEmitKindWithSeen(optionsOrEmitKind: CompilerOptions | BuilderFileEmit, seenOldOptionsOrEmitKind: CompilerOptions | BuilderFileEmit | undefined, emitOnlyDtsFiles: boolean | undefined, isForDtsErrors: boolean): BuilderFileEmit;
/** @internal */
export type IncrementalBuildInfoFileId = number & {
    __incrementalBuildInfoFileIdBrand: any;
};
/** @internal */
export type IncrementalBuildInfoFileIdListId = number & {
    __incrementalBuildInfoFileIdListIdBrand: any;
};
/** @internal */
export type IncrementalBuildInfoDiagnosticOfFile = [fileId: IncrementalBuildInfoFileId, diagnostics: readonly ReusableDiagnostic[]];
/** @internal */
export type IncrementalBuildInfoDiagnostic = IncrementalBuildInfoFileId | IncrementalBuildInfoDiagnosticOfFile;
/** @internal */
export type IncrementalBuildInfoEmitDiagnostic = IncrementalBuildInfoDiagnosticOfFile;
/**
 * fileId if pending emit is same as what compilerOptions suggest
 * [fileId] if pending emit is only dts file emit
 * [fileId, emitKind] if any other type emit is pending
 *
 * @internal
 */
export type IncrementalBuildInfoFilePendingEmit = IncrementalBuildInfoFileId | [fileId: IncrementalBuildInfoFileId] | [fileId: IncrementalBuildInfoFileId, emitKind: BuilderFileEmit];
/** @internal */
export type IncrementalBuildInfoReferencedMap = [fileId: IncrementalBuildInfoFileId, fileIdListId: IncrementalBuildInfoFileIdListId][];
/** @internal */
export type IncrementalMultiFileEmitBuildInfoBuilderStateFileInfo = Omit<BuilderState.FileInfo, "signature"> & {
    /**
     * Signature is
     * - undefined if FileInfo.version === FileInfo.signature
     * - false if FileInfo has signature as undefined (not calculated)
     * - string actual signature
     */
    signature: string | false | undefined;
};
/**
 * [fileId, signature] if different from file's signature
 * fileId if file wasnt emitted
 *
 * @internal
 */
export type IncrementalBuildInfoEmitSignature = IncrementalBuildInfoFileId | [fileId: IncrementalBuildInfoFileId, signature: EmitSignature | []];
/**
 * IncrementalMultiFileEmitBuildInfoFileInfo is string if FileInfo.version === FileInfo.signature && !FileInfo.affectsGlobalScope otherwise encoded FileInfo
 *
 * @internal
 */
export type IncrementalMultiFileEmitBuildInfoFileInfo = string | IncrementalMultiFileEmitBuildInfoBuilderStateFileInfo;
/** @internal */
export type IncrementalBuildInfoRootStartEnd = [start: IncrementalBuildInfoFileId, end: IncrementalBuildInfoFileId];
/**
 * Either start and end of FileId for consecutive fileIds to be included as root or single fileId that is root
 * @internal
 */
export type IncrementalBuildInfoRoot = IncrementalBuildInfoRootStartEnd | IncrementalBuildInfoFileId;
/** @internal */
export type IncrementalBuildInfoResolvedRoot = [resolved: IncrementalBuildInfoFileId, root: IncrementalBuildInfoFileId];
/** @internal */
export interface IncrementalBuildInfoBase extends BuildInfo {
    fileNames: readonly string[];
    root: readonly IncrementalBuildInfoRoot[];
    resolvedRoot: readonly IncrementalBuildInfoResolvedRoot[] | undefined;
    options: CompilerOptions | undefined;
    semanticDiagnosticsPerFile: IncrementalBuildInfoDiagnostic[] | undefined;
    emitDiagnosticsPerFile: IncrementalBuildInfoEmitDiagnostic[] | undefined;
    changeFileSet: readonly IncrementalBuildInfoFileId[] | undefined;
    latestChangedDtsFile?: string | undefined;
    errors: true | undefined;
    checkPending: true | undefined;
}
/** @internal */
export interface IncrementalMultiFileEmitBuildInfo extends IncrementalBuildInfoBase {
    fileInfos: readonly IncrementalMultiFileEmitBuildInfoFileInfo[];
    fileIdsList: readonly (readonly IncrementalBuildInfoFileId[])[] | undefined;
    referencedMap: IncrementalBuildInfoReferencedMap | undefined;
    affectedFilesPendingEmit: IncrementalBuildInfoFilePendingEmit[] | undefined;
    emitSignatures: readonly IncrementalBuildInfoEmitSignature[] | undefined;
}
/**
 * IncrementalBundleEmitBuildInfoFileInfo is string if !FileInfo.impliedFormat otherwise encoded FileInfo
 *
 * @internal
 */
export type IncrementalBundleEmitBuildInfoFileInfo = string | BuilderState.FileInfo;
/**
 * false if it is the emit corresponding to compilerOptions
 * value otherwise
 *
 * @internal
 */
export type IncrementalBuildInfoBundlePendingEmit = BuilderFileEmit | false;
/** @internal */
export interface IncrementalBundleEmitBuildInfo extends IncrementalBuildInfoBase {
    fileInfos: readonly IncrementalBundleEmitBuildInfoFileInfo[];
    outSignature: EmitSignature | undefined;
    pendingEmit: IncrementalBuildInfoBundlePendingEmit | undefined;
}
/** @internal */
export type IncrementalBuildInfo = IncrementalMultiFileEmitBuildInfo | IncrementalBundleEmitBuildInfo;
/** @internal */
export declare function isIncrementalBundleEmitBuildInfo(info: IncrementalBuildInfo): info is IncrementalBundleEmitBuildInfo;
/** @internal */
export declare function isIncrementalBuildInfo(info: BuildInfo): info is IncrementalBuildInfo;
/** @internal */
export interface NonIncrementalBuildInfo extends BuildInfo {
    root: readonly string[];
    errors: true | undefined;
    checkPending: true | undefined;
}
/** @internal */
export declare enum BuilderProgramKind {
    SemanticDiagnosticsBuilderProgram = 0,
    EmitAndSemanticDiagnosticsBuilderProgram = 1
}
/** @internal */
export interface BuilderCreationParameters {
    newProgram: Program;
    host: BuilderProgramHost;
    oldProgram: BuilderProgram | undefined;
    configFileParsingDiagnostics: readonly Diagnostic[];
}
/** @internal */
export declare function getBuilderCreationParameters(newProgramOrRootNames: Program | readonly string[] | undefined, hostOrOptions: BuilderProgramHost | CompilerOptions | undefined, oldProgramOrHost?: BuilderProgram | CompilerHost, configFileParsingDiagnosticsOrOldProgram?: readonly Diagnostic[] | BuilderProgram, configFileParsingDiagnostics?: readonly Diagnostic[], projectReferences?: readonly ProjectReference[]): BuilderCreationParameters;
/** @internal */
export declare function computeSignatureWithDiagnostics(program: Program, sourceFile: SourceFile, text: string, host: HostForComputeHash, data: WriteFileCallbackData | undefined): string;
/** @internal */
export declare function createBuilderProgram(kind: BuilderProgramKind.SemanticDiagnosticsBuilderProgram, builderCreationParameters: BuilderCreationParameters): SemanticDiagnosticsBuilderProgram;
/** @internal */
export declare function createBuilderProgram(kind: BuilderProgramKind.EmitAndSemanticDiagnosticsBuilderProgram, builderCreationParameters: BuilderCreationParameters): EmitAndSemanticDiagnosticsBuilderProgram;
/** @internal */
export declare function toBuilderStateFileInfoForMultiEmit(fileInfo: IncrementalMultiFileEmitBuildInfoFileInfo): BuilderState.FileInfo;
/** @internal */
export declare function toBuilderFileEmit(value: IncrementalBuildInfoFilePendingEmit, fullEmitForOptions: BuilderFileEmit): BuilderFileEmit;
/** @internal */
export declare function toProgramEmitPending(value: IncrementalBuildInfoBundlePendingEmit, options: CompilerOptions | undefined): BuilderFileEmit | undefined;
/** @internal */
export declare function createBuilderProgramUsingIncrementalBuildInfo(buildInfo: IncrementalBuildInfo, buildInfoPath: string, host: ReadBuildProgramHost): EmitAndSemanticDiagnosticsBuilderProgram;
/** @internal */
export declare function getBuildInfoFileVersionMap(program: IncrementalBuildInfo, buildInfoPath: string, host: Pick<ReadBuildProgramHost, "useCaseSensitiveFileNames" | "getCurrentDirectory">): BuildInfoFileVersionMap;
/** @internal */
export declare function getNonIncrementalBuildInfoRoots(buildInfo: BuildInfo, buildInfoPath: string, host: Pick<ReadBuildProgramHost, "useCaseSensitiveFileNames" | "getCurrentDirectory">): Path[] | undefined;
/** @internal */
export declare function createRedirectedBuilderProgram(state: Pick<ReusableBuilderProgramState, "program" | "compilerOptions">, configFileParsingDiagnostics: readonly Diagnostic[]): BuilderProgram;
//# sourceMappingURL=builder.d.ts.map