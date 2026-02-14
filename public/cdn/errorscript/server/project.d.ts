import * as ts from "./_namespaces/ts.js";
import { ApplyCodeActionCommandResult, CachedDirectoryStructureHost, CompilerHost, CompilerOptions, Diagnostic, DirectoryStructureHost, DirectoryWatcherCallback, DocumentPositionMapper, ExportInfoMap, FileReference, FileWatcher, FileWatcherCallback, GetCanonicalFileName, GetPackageJsonEntrypointsHost, HasInvalidatedLibResolutions, HasInvalidatedResolutions, HostCancellationToken, IncompleteCompletionsCache, InstallPackageOptions, IScriptSnapshot, JSDocParsingMode, JsTyping, LanguageService, LanguageServiceHost, ModuleResolutionCache, ModuleResolutionHost, ModuleSpecifierCache, PackageJsonAutoImportPreference, ParsedCommandLine, Path, PerformanceEvent, PluginImport, Program, ProgramUpdateLevel, ProjectPackageJsonInfo, ProjectReference, ResolutionCache, ResolvedModuleWithFailedLookupLocations, ResolvedProjectReference, ResolvedRefAndOutputDts, ResolvedTypeReferenceDirectiveWithFailedLookupLocations, ScriptKind, SortedReadonlyArray, SourceFile, SourceFileLike, SourceMapper, StringLiteralLike, SymlinkCache, TypeAcquisition, WatchDirectoryFlags, WatchOptions } from "./_namespaces/ts.js";
import { FileStats, NormalizedPath, PackageJsonCache, PackageJsonWatcher, ProjectOptions, ProjectService, ScriptInfo, ServerHost, Session } from "./_namespaces/ts.server.js";
import * as protocol from "./protocol.js";
export declare enum ProjectKind {
    Inferred = 0,
    Configured = 1,
    External = 2,
    AutoImportProvider = 3,
    Auxiliary = 4
}
/** @internal */
export type Mutable<T> = {
    -readonly [K in keyof T]: T[K];
};
/** @internal */
export declare function countEachFileTypes(infos: ScriptInfo[], includeSizes?: boolean): FileStats;
export declare function allRootFilesAreJsOrDts(project: Project): boolean;
export declare function allFilesAreJsOrDts(project: Project): boolean;
/** @internal */
export declare function hasNoTypeScriptSource(fileNames: string[]): boolean;
/** @internal */
export interface ProjectFilesWithTSDiagnostics extends protocol.ProjectFiles {
    projectErrors: readonly Diagnostic[];
}
export interface PluginCreateInfo {
    project: Project;
    languageService: LanguageService;
    languageServiceHost: LanguageServiceHost;
    serverHost: ServerHost;
    session?: Session<unknown>;
    config: any;
}
export interface PluginModule {
    create(createInfo: PluginCreateInfo): LanguageService;
    getExternalFiles?(proj: Project, updateLevel: ProgramUpdateLevel): string[];
    onConfigurationChanged?(config: any): void;
}
export interface PluginModuleWithName {
    name: string;
    module: PluginModule;
}
export type PluginModuleFactory = (mod: {
    typescript: typeof ts;
}) => PluginModule;
/** @internal */
export interface PluginImportResult<T> {
    pluginConfigEntry: PluginImport;
    resolvedModule: T | undefined;
    errorLogs: string[] | undefined;
}
/** @internal */
export type BeginEnablePluginResult = PluginImportResult<PluginModuleFactory>;
/**
 * The project root can be script info - if root is present,
 * or it could be just normalized path if root wasn't present on the host(only for non inferred project)
 *
 * @internal
 */
export interface ProjectRootFile {
    fileName: NormalizedPath;
    info?: ScriptInfo;
}
/** @internal */
export interface EmitResult {
    emitSkipped: boolean;
    diagnostics: readonly Diagnostic[];
}
export declare abstract class Project implements LanguageServiceHost, ModuleResolutionHost {
    readonly projectKind: ProjectKind;
    readonly projectService: ProjectService;
    private compilerOptions;
    compileOnSaveEnabled: boolean;
    protected watchOptions: WatchOptions | undefined;
    private rootFilesMap;
    private program;
    private externalFiles;
    private missingFilesMap;
    private generatedFilesMap;
    /** @internal */
    protected readonly plugins: PluginModuleWithName[];
    /**
     * This is map from files to unresolved imports in it
     * Maop does not contain entries for files that do not have unresolved imports
     * This helps in containing the set of files to invalidate
     *
     * @internal
     */
    cachedUnresolvedImportsPerFile: Map<Path, readonly string[]>;
    /** @internal */
    lastCachedUnresolvedImportsList: SortedReadonlyArray<string> | undefined;
    private hasAddedorRemovedFiles;
    private hasAddedOrRemovedSymlinks;
    /** @internal */
    lastFileExceededProgramSize: string | undefined;
    protected languageService: LanguageService;
    languageServiceEnabled: boolean;
    readonly trace?: (s: string) => void;
    readonly realpath?: (path: string) => string;
    /** @internal */
    hasInvalidatedResolutions?: HasInvalidatedResolutions | undefined;
    /** @internal */
    hasInvalidatedLibResolutions: HasInvalidatedLibResolutions | undefined;
    /** @internal */
    resolutionCache: ResolutionCache;
    private builderState;
    /**
     * Set of files names that were updated since the last call to getChangesSinceVersion.
     */
    private updatedFileNames;
    /**
     * Set of files that was returned from the last call to getChangesSinceVersion.
     */
    private lastReportedFileNames;
    /**
     * Last version that was reported.
     */
    private lastReportedVersion;
    /**
     * Current project's program version. (incremented everytime new program is created that is not complete reuse from the old one)
     * This property is changed in 'updateGraph' based on the set of files in program
     * @internal
     */
    projectProgramVersion: number;
    /**
     * Current version of the project state. It is changed when:
     * - new root file was added/removed
     * - edit happen in some file that is currently included in the project.
     * This property is different from projectStructureVersion since in most cases edits don't affect set of files in the project
     * @internal
     */
    projectStateVersion: number;
    protected projectErrors: Diagnostic[] | undefined;
    /** @internal */
    initialLoadPending: boolean;
    /** @internal */
    dirty: boolean;
    /** @internal */
    typingFiles: SortedReadonlyArray<string>;
    private typingsCache;
    private typingWatchers;
    /** @internal */
    originalConfiguredProjects: Set<NormalizedPath> | undefined;
    /** @internal */
    packageJsonWatches: Set<PackageJsonWatcher> | undefined;
    /** @internal */
    noDtsResolutionProject?: AuxiliaryProject | undefined;
    /** @internal */
    getRedirectFromSourceFile(_fileName: string): ResolvedRefAndOutputDts | undefined;
    /** @internal */ useSourceOfProjectReferenceRedirect?(): boolean;
    /** @internal */ getParsedCommandLine?(fileName: string): ParsedCommandLine | undefined;
    private readonly cancellationToken;
    isNonTsProject(): boolean;
    isJsOnlyProject(): boolean;
    static resolveModule(moduleName: string, initialDir: string, host: ServerHost, log: (message: string) => void): {} | undefined;
    /** @internal */
    static importServicePluginSync<T = {}>(pluginConfigEntry: PluginImport, searchPaths: string[], host: ServerHost, log: (message: string) => void): PluginImportResult<T>;
    /** @internal */
    static importServicePluginAsync<T = {}>(pluginConfigEntry: PluginImport, searchPaths: string[], host: ServerHost, log: (message: string) => void): Promise<PluginImportResult<T>>;
    /** @internal */
    readonly currentDirectory: string;
    /** @internal */
    readonly projectName: string;
    /** @internal */
    directoryStructureHost: DirectoryStructureHost;
    /** @internal */
    readonly getCanonicalFileName: GetCanonicalFileName;
    private exportMapCache;
    private changedFilesForExportMapCache;
    private moduleSpecifierCache;
    private symlinks;
    /** @internal */
    autoImportProviderHost: AutoImportProviderProject | false | undefined;
    /** @internal */
    protected typeAcquisition: TypeAcquisition | undefined;
    /** @internal */
    createHash: ((data: string) => string) | undefined;
    /** @internal*/ preferNonRecursiveWatch: boolean | undefined;
    readonly jsDocParsingMode: JSDocParsingMode | undefined;
    /** @internal */
    constructor(projectName: string, projectKind: ProjectKind, projectService: ProjectService, hasExplicitListOfFiles: boolean, lastFileExceededProgramSize: string | undefined, compilerOptions: CompilerOptions, compileOnSaveEnabled: boolean, watchOptions: WatchOptions | undefined, directoryStructureHost: DirectoryStructureHost, currentDirectory: string);
    isKnownTypesPackageName(name: string): boolean;
    installPackage(options: InstallPackageOptions): Promise<ApplyCodeActionCommandResult>;
    /** @internal */
    getGlobalTypingsCacheLocation(): string | undefined;
    /** @internal */
    getSymlinkCache(): SymlinkCache;
    getCompilationSettings(): CompilerOptions;
    getCompilerOptions(): CompilerOptions;
    getNewLine(): string;
    getProjectVersion(): string;
    getProjectReferences(): readonly ProjectReference[] | undefined;
    getScriptFileNames(): string[];
    private getOrCreateScriptInfoAndAttachToProject;
    getScriptKind(fileName: string): ScriptKind;
    getScriptVersion(filename: string): string;
    getScriptSnapshot(filename: string): IScriptSnapshot | undefined;
    getCancellationToken(): HostCancellationToken;
    getCurrentDirectory(): string;
    getDefaultLibFileName(): string;
    useCaseSensitiveFileNames(): boolean;
    readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[];
    readFile(fileName: string): string | undefined;
    writeFile(fileName: string, content: string): void;
    fileExists(file: string): boolean;
    /** @internal */
    resolveModuleNameLiterals(moduleLiterals: readonly StringLiteralLike[], containingFile: string, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions, containingSourceFile: SourceFile, reusedNames: readonly StringLiteralLike[] | undefined): readonly ResolvedModuleWithFailedLookupLocations[];
    /** @internal */
    getModuleResolutionCache(): ModuleResolutionCache | undefined;
    /** @internal */
    resolveTypeReferenceDirectiveReferences<T extends string | FileReference>(typeDirectiveReferences: readonly T[], containingFile: string, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions, containingSourceFile: SourceFile | undefined, reusedNames: readonly T[] | undefined): readonly ResolvedTypeReferenceDirectiveWithFailedLookupLocations[];
    /** @internal */
    resolveLibrary(libraryName: string, resolveFrom: string, options: CompilerOptions, libFileName: string): ResolvedModuleWithFailedLookupLocations;
    directoryExists(path: string): boolean;
    getDirectories(path: string): string[];
    /** @internal */
    getCachedDirectoryStructureHost(): CachedDirectoryStructureHost;
    /** @internal */
    toPath(fileName: string): Path;
    /** @internal */
    watchDirectoryOfFailedLookupLocation(directory: string, cb: DirectoryWatcherCallback, flags: WatchDirectoryFlags): FileWatcher;
    /** @internal */
    watchAffectingFileLocation(file: string, cb: FileWatcherCallback): FileWatcher;
    /** @internal */
    clearInvalidateResolutionOfFailedLookupTimer(): boolean;
    /** @internal */
    scheduleInvalidateResolutionsOfFailedLookupLocations(): void;
    /** @internal */
    invalidateResolutionsOfFailedLookupLocations(): void;
    /** @internal */
    onInvalidatedResolution(): void;
    /** @internal */
    watchTypeRootsDirectory(directory: string, cb: DirectoryWatcherCallback, flags: WatchDirectoryFlags): FileWatcher;
    /** @internal */
    hasChangedAutomaticTypeDirectiveNames(): boolean;
    /** @internal */
    onChangedAutomaticTypeDirectiveNames(): void;
    /** @internal */
    globalCacheResolutionModuleName: typeof JsTyping.nonRelativeModuleNameForTypingCache;
    /** @internal */
    fileIsOpen(filePath: Path): boolean;
    /** @internal */
    writeLog(s: string): void;
    log(s: string): void;
    error(s: string): void;
    private setInternalCompilerOptionsForEmittingJsFiles;
    /**
     * Get the errors that dont have any file name associated
     */
    getGlobalProjectErrors(): readonly Diagnostic[];
    /**
     * Get all the project errors
     */
    getAllProjectErrors(): readonly Diagnostic[];
    setProjectErrors(projectErrors: Diagnostic[] | undefined): void;
    getLanguageService(ensureSynchronized?: boolean): LanguageService;
    /** @internal */
    getSourceMapper(): SourceMapper;
    /** @internal */
    clearSourceMapperCache(): void;
    /** @internal */
    getDocumentPositionMapper(generatedFileName: string, sourceFileName?: string): DocumentPositionMapper | undefined;
    /** @internal */
    getSourceFileLike(fileName: string): SourceFileLike | undefined;
    /** @internal */
    shouldEmitFile(scriptInfo: ScriptInfo | undefined): boolean | undefined;
    getCompileOnSaveAffectedFileList(scriptInfo: ScriptInfo): string[];
    /**
     * Returns true if emit was conducted
     */
    emitFile(scriptInfo: ScriptInfo, writeFile: (path: string, data: string, writeByteOrderMark?: boolean) => void): EmitResult;
    enableLanguageService(): void;
    /** @internal */
    cleanupProgram(): void;
    disableLanguageService(lastFileExceededProgramSize?: string): void;
    getProjectName(): string;
    protected removeLocalTypingsFromTypeAcquisition(newTypeAcquisition: TypeAcquisition): TypeAcquisition;
    getExternalFiles(updateLevel?: ProgramUpdateLevel): SortedReadonlyArray<string>;
    getSourceFile(path: Path): SourceFile | undefined;
    /** @internal */
    getSourceFileOrConfigFile(path: Path): SourceFile | undefined;
    close(): void;
    private detachScriptInfoIfNotRoot;
    isClosed(): boolean;
    hasRoots(): boolean;
    /** @internal */
    isOrphan(): boolean;
    getRootFiles(): NormalizedPath[];
    /** @internal */
    getRootFilesMap(): Map<Path, ProjectRootFile>;
    getRootScriptInfos(): ScriptInfo[];
    getScriptInfos(): ScriptInfo[];
    getExcludedFiles(): readonly NormalizedPath[];
    getFileNames(excludeFilesFromExternalLibraries?: boolean, excludeConfigFiles?: boolean): NormalizedPath[];
    /** @internal */
    getFileNamesWithRedirectInfo(includeProjectReferenceRedirectInfo: boolean): protocol.FileWithProjectReferenceRedirectInfo[];
    hasConfigFile(configFilePath: NormalizedPath): boolean;
    containsScriptInfo(info: ScriptInfo): boolean;
    containsFile(filename: NormalizedPath, requireOpen?: boolean): boolean;
    isRoot(info: ScriptInfo): boolean;
    addRoot(info: ScriptInfo, fileName?: NormalizedPath): void;
    addMissingFileRoot(fileName: NormalizedPath): void;
    removeFile(info: ScriptInfo, fileExists: boolean, detachFromProject: boolean): void;
    registerFileUpdate(fileName: string): void;
    /** @internal */
    markFileAsDirty(changedFile: Path): void;
    /** @internal */
    markAsDirty(): void;
    /** @internal */
    markAutoImportProviderAsDirty(): void;
    /** @internal */
    onAutoImportProviderSettingsChanged(): void;
    /** @internal */
    onPackageJsonChange(): void;
    /** @internal */
    onFileAddedOrRemoved(isSymlink: boolean | undefined): void;
    /** @internal */
    onDiscoveredSymlink(): void;
    /** @internal */
    onReleaseOldSourceFile(oldSourceFile: SourceFile, _oldOptions: CompilerOptions, hasSourceFileByPath: boolean, newSourceFileByResolvedPath: SourceFile | undefined): void;
    /** @internal */
    updateFromProjectInProgress: boolean;
    /** @internal */
    updateFromProject(): void;
    /**
     * Updates set of files that contribute to this project
     * @returns: true if set of files in the project stays the same and false - otherwise.
     */
    updateGraph(): boolean;
    /** @internal */
    enqueueInstallTypingsForProject(forceRefresh: boolean): void;
    /** @internal */
    updateTypingFiles(compilerOptions: CompilerOptions, typeAcquisition: TypeAcquisition, unresolvedImports: SortedReadonlyArray<string>, newTypings: string[]): void;
    private closeWatchingTypingLocations;
    private onTypingInstallerWatchInvoke;
    /** @internal */
    watchTypingLocations(files: readonly string[] | undefined): void;
    /** @internal */
    skipWatchingFailedLookups(path: Path): boolean | undefined;
    /** @internal */
    skipWatchingTypeRoots(): boolean | undefined;
    /** @internal */
    getCurrentProgram(): Program | undefined;
    protected removeExistingTypings(include: string[]): string[];
    private updateGraphWorker;
    /** @internal */
    sendPerformanceEvent(kind: PerformanceEvent["kind"], durationMs: number): void;
    private detachScriptInfoFromProject;
    private addMissingFileWatcher;
    private isWatchedMissingFile;
    /** @internal */
    addGeneratedFileWatch(generatedFile: string, sourceFile: string): void;
    private createGeneratedFileWatcher;
    private isValidGeneratedFileWatcher;
    private clearGeneratedFileWatch;
    getScriptInfoForNormalizedPath(fileName: NormalizedPath): ScriptInfo | undefined;
    getScriptInfo(uncheckedFileName: string): ScriptInfo | undefined;
    filesToString(writeProjectFileNames: boolean): string;
    private filesToStringWorker;
    /** @internal */
    print(writeProjectFileNames: boolean, writeFileExplaination: boolean, writeFileVersionAndText: boolean): void;
    setCompilerOptions(compilerOptions: CompilerOptions): void;
    /** @internal */
    setWatchOptions(watchOptions: WatchOptions | undefined): void;
    /** @internal */
    getWatchOptions(): WatchOptions | undefined;
    setTypeAcquisition(newTypeAcquisition: TypeAcquisition | undefined): void;
    getTypeAcquisition(): TypeAcquisition;
    /** @internal */
    getChangesSinceVersion(lastKnownVersion?: number, includeProjectReferenceRedirectInfo?: boolean): ProjectFilesWithTSDiagnostics;
    protected removeRoot(info: ScriptInfo): void;
    /** @internal */
    isSourceOfProjectReferenceRedirect(fileName: string): boolean;
    /** @internal */
    protected getGlobalPluginSearchPaths(): string[];
    protected enableGlobalPlugins(options: CompilerOptions): void;
    protected enablePlugin(pluginConfigEntry: PluginImport, searchPaths: string[]): void;
    /** @internal */
    enableProxy(pluginModuleFactory: PluginModuleFactory, configEntry: PluginImport): void;
    /** @internal */
    onPluginConfigurationChanged(pluginName: string, configuration: any): void;
    /** Starts a new check for diagnostics. Call this if some file has updated that would cause diagnostics to be changed. */
    refreshDiagnostics(): void;
    /** @internal */
    getPackageJsonsVisibleToFile(fileName: string, rootDir?: string): readonly ProjectPackageJsonInfo[];
    /** @internal */
    getNearestAncestorDirectoryWithPackageJson(fileName: string): string | undefined;
    /** @internal */
    getPackageJsonsForAutoImport(rootDir?: string): readonly ProjectPackageJsonInfo[];
    /** @internal */
    getPackageJsonCache(): PackageJsonCache;
    /** @internal */
    getCachedExportInfoMap(): ExportInfoMap;
    /** @internal */
    clearCachedExportInfoMap(): void;
    /** @internal */
    getModuleSpecifierCache(): ModuleSpecifierCache;
    /** @internal */
    includePackageJsonAutoImports(): PackageJsonAutoImportPreference;
    /** @internal */
    getHostForAutoImportProvider(): GetPackageJsonEntrypointsHost;
    /** @internal */
    getPackageJsonAutoImportProvider(): Program | undefined;
    private isDefaultProjectForOpenFiles;
    /** @internal */
    watchNodeModulesForPackageJsonChanges(directoryPath: string): FileWatcher;
    /** @internal */
    getIncompleteCompletionsCache(): IncompleteCompletionsCache;
    /** @internal */
    getNoDtsResolutionProject(rootFile: NormalizedPath): AuxiliaryProject;
    /** @internal */
    runWithTemporaryFileUpdate(rootFile: string, updatedText: string, cb: (updatedProgram: Program, originalProgram: Program | undefined, updatedFile: SourceFile) => void): void;
    /** @internal */
    getCompilerOptionsForNoDtsResolutionProject(): CompilerOptions;
}
/**
 * If a file is opened and no tsconfig (or jsconfig) is found,
 * the file and its imports/references are put into an InferredProject.
 */
export declare class InferredProject extends Project {
    private _isJsInferredProject;
    toggleJsInferredProject(isJsInferredProject: boolean): void;
    setCompilerOptions(options?: CompilerOptions): void;
    /** this is canonical project root path */
    readonly projectRootPath: string | undefined;
    /**
     * stored only if their is no projectRootPath and this isnt single inferred project
     *
     * @internal
     */
    readonly canonicalCurrentDirectory: string | undefined;
    /** @internal */
    constructor(projectService: ProjectService, compilerOptions: CompilerOptions, watchOptions: WatchOptions | undefined, projectRootPath: NormalizedPath | undefined, currentDirectory: string, typeAcquisition: TypeAcquisition | undefined);
    addRoot(info: ScriptInfo): void;
    removeRoot(info: ScriptInfo): void;
    /** @internal */
    isOrphan(): boolean;
    isProjectWithSingleRoot(): boolean;
    close(): void;
    getTypeAcquisition(): TypeAcquisition;
}
/** @internal */
export declare class AuxiliaryProject extends Project {
    /** @internal */ rootFile: NormalizedPath | undefined;
    constructor(hostProject: Project);
    isOrphan(): boolean;
    scheduleInvalidateResolutionsOfFailedLookupLocations(): void;
}
export declare class AutoImportProviderProject extends Project {
    private hostProject;
    private static readonly maxDependencies;
    /** @internal */
    static getRootFileNames(dependencySelection: PackageJsonAutoImportPreference, hostProject: Project, host: GetPackageJsonEntrypointsHost, compilerOptions: CompilerOptions): string[];
    /** @internal */
    static readonly compilerOptionsOverrides: CompilerOptions;
    /** @internal */
    static create(dependencySelection: PackageJsonAutoImportPreference, hostProject: Project, host: GetPackageJsonEntrypointsHost): AutoImportProviderProject | undefined;
    private rootFileNames;
    /** @internal */
    constructor(hostProject: Project, initialRootNames: string[], compilerOptions: CompilerOptions);
    /** @internal */
    isEmpty(): boolean;
    /** @internal */
    isOrphan(): boolean;
    updateGraph(): boolean;
    /** @internal */
    scheduleInvalidateResolutionsOfFailedLookupLocations(): void;
    hasRoots(): boolean;
    /** @internal */
    markAsDirty(): void;
    getScriptFileNames(): string[];
    getLanguageService(): never;
    /** @internal */
    onAutoImportProviderSettingsChanged(): never;
    /** @internal */
    onPackageJsonChange(): never;
    getHostForAutoImportProvider(): never;
    getProjectReferences(): readonly ProjectReference[] | undefined;
    /** @internal */
    includePackageJsonAutoImports(): PackageJsonAutoImportPreference;
    /** @internal */
    getSymlinkCache(): SymlinkCache;
    /** @internal */
    getModuleResolutionCache(): ModuleResolutionCache | undefined;
}
/**
 * If a file is opened, the server will look for a tsconfig (or jsconfig)
 * and if successful create a ConfiguredProject for it.
 * Otherwise it will create an InferredProject.
 */
export declare class ConfiguredProject extends Project {
    readonly canonicalConfigFilePath: NormalizedPath;
    /** @internal */
    pendingUpdateLevel: ProgramUpdateLevel;
    /** @internal */
    pendingUpdateReason: string | undefined;
    /** @internal */
    openFileWatchTriggered: Map<string, ProgramUpdateLevel>;
    /** @internal */
    parsedCommandLine: ParsedCommandLine | undefined;
    /** @internal */
    resolvedChildConfigs?: Set<NormalizedPath>;
    private projectReferences;
    /**
     * Potential project references before the project is actually loaded (read config file)
     *
     * @internal
     */
    potentialProjectReferences: Set<NormalizedPath> | undefined;
    /** @internal */
    projectOptions?: ProjectOptions | true;
    /** @internal */
    initialLoadPending: boolean;
    /** @internal */
    sendLoadingProjectFinish: boolean;
    private compilerHost?;
    /** @internal */
    configDiagDiagnosticsReported?: number;
    /** @internal */
    triggerFileForConfigFileDiag?: NormalizedPath;
    /** @internal */
    deferredClose?: boolean;
    /** @internal */
    constructor(configFileName: NormalizedPath, canonicalConfigFilePath: NormalizedPath, projectService: ProjectService, cachedDirectoryStructureHost: CachedDirectoryStructureHost, pendingUpdateReason: string);
    /** @internal */
    setCompilerHost(host: CompilerHost): void;
    /** @internal */
    getCompilerHost(): CompilerHost | undefined;
    /** @internal */
    useSourceOfProjectReferenceRedirect(): boolean;
    /** @internal */
    getParsedCommandLine(fileName: string): ParsedCommandLine | undefined;
    /** @internal */
    onReleaseParsedCommandLine(fileName: string): void;
    private releaseParsedConfig;
    /**
     * If the project has reload from disk pending, it reloads (and then updates graph as part of that) instead of just updating the graph
     * @returns: true if set of files in the project stays the same and false - otherwise.
     */
    updateGraph(): boolean;
    /** @internal */
    getCachedDirectoryStructureHost(): CachedDirectoryStructureHost;
    getConfigFilePath(): NormalizedPath;
    getProjectReferences(): readonly ProjectReference[] | undefined;
    updateReferences(refs: readonly ProjectReference[] | undefined): void;
    /** @internal */
    setPotentialProjectReference(canonicalConfigPath: NormalizedPath): void;
    /** @internal */
    getRedirectFromSourceFile(fileName: string): ResolvedRefAndOutputDts | undefined;
    /** @internal */
    forEachResolvedProjectReference<T>(cb: (resolvedProjectReference: ResolvedProjectReference) => T | undefined): T | undefined;
    /** @internal */
    enablePluginsWithOptions(options: CompilerOptions): void;
    /**
     * Get the errors that dont have any file name associated
     */
    getGlobalProjectErrors(): readonly Diagnostic[];
    /**
     * Get all the project errors
     */
    getAllProjectErrors(): readonly Diagnostic[];
    setProjectErrors(projectErrors: Diagnostic[]): void;
    close(): void;
    /** @internal */
    markAsDirty(): void;
    /** @internal */
    isOrphan(): boolean;
    getEffectiveTypeRoots(): string[];
    /** @internal */
    updateErrorOnNoInputFiles(parsedCommandLine: ParsedCommandLine): void;
}
/**
 * Project whose configuration is handled externally, such as in a '.csproj'.
 * These are created only if a host explicitly calls `openExternalProject`.
 */
export declare class ExternalProject extends Project {
    externalProjectName: string;
    compileOnSaveEnabled: boolean;
    excludedFiles: readonly NormalizedPath[];
    /** @internal */
    constructor(externalProjectName: string, projectService: ProjectService, compilerOptions: CompilerOptions, lastFileExceededProgramSize: string | undefined, compileOnSaveEnabled: boolean, projectFilePath: string | undefined, watchOptions: WatchOptions | undefined);
    updateGraph(): boolean;
    getExcludedFiles(): readonly NormalizedPath[];
}
/** @internal */
export declare function isInferredProject(project: Project): project is InferredProject;
/** @internal */
export declare function isConfiguredProject(project: Project): project is ConfiguredProject;
/** @internal */
export declare function isExternalProject(project: Project): project is ExternalProject;
/**@internal */
export declare function isBackgroundProject(project: Project): project is AutoImportProviderProject | AuxiliaryProject;
/** @internal */
export declare function isProjectDeferredClose(project: Project): project is ConfiguredProject;
//# sourceMappingURL=project.d.ts.map