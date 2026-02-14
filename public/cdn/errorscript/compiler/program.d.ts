import { BuilderProgram, CancellationToken, CompilerHost, CompilerOptions, CreateProgramOptions, CreateSourceFileOptions, Diagnostic, DiagnosticMessage, DiagnosticMessageChain, DiagnosticReporter, DirectoryStructureHost, EmitResult, ExportDeclaration, FileIncludeReason, FileReference, GetCanonicalFileName, HasChangedAutomaticTypeDirectiveNames, HasInvalidatedLibResolutions, HasInvalidatedResolutions, ImportAttributes, ImportDeclaration, JSDocImportTag, ModuleKind, ModuleResolutionCache, ModuleResolutionHost, Node, PackageId, PackageJsonInfoCache, ParseConfigFileHost, ParsedCommandLine, Path, Program, ProgramHost, ProjectReference, ReferencedFile, ResolutionMode, ResolvedConfigFileName, ResolvedModuleFull, ResolvedModuleWithFailedLookupLocations, ResolvedProjectReference, ResolvedTypeReferenceDirectiveWithFailedLookupLocations, ScriptTarget, SourceFile, StringLiteralLike, System, TypeReferenceDirectiveResolutionCache, WriteFileCallback } from "./_namespaces/ts.js";
export declare function findConfigFile(searchPath: string, fileExists: (fileName: string) => boolean, configName?: string): string | undefined;
export declare function resolveTripleslashReference(moduleName: string, containingFile: string): string;
/** @internal */
export declare function computeCommonSourceDirectoryOfFilenames(fileNames: readonly string[], currentDirectory: string, getCanonicalFileName: GetCanonicalFileName): string;
export declare function createCompilerHost(options: CompilerOptions, setParentNodes?: boolean): CompilerHost;
/** @internal */
export declare function createGetSourceFile(readFile: ProgramHost<any>["readFile"], setParentNodes: boolean | undefined): CompilerHost["getSourceFile"];
/** @internal */
export declare function createWriteFileMeasuringIO(actualWriteFile: (path: string, data: string, writeByteOrderMark: boolean) => void, createDirectory: (path: string) => void, directoryExists: (path: string) => boolean): CompilerHost["writeFile"];
/** @internal */
export declare function createCompilerHostWorker(options: CompilerOptions, setParentNodes?: boolean, system?: System): CompilerHost;
/** @internal */
export interface CompilerHostLikeForCache {
    fileExists(fileName: string): boolean;
    readFile(fileName: string, encoding?: string): string | undefined;
    directoryExists?(directory: string): boolean;
    createDirectory?(directory: string): void;
    writeFile?: WriteFileCallback;
}
/** @internal */
export interface CompilerHostLikeWithCache {
    originalReadFile: (fileName: string, encoding?: string) => string | undefined;
    originalFileExists: (fileName: string) => boolean;
    originalDirectoryExists: ((directory: string) => boolean) | undefined;
    originalCreateDirectory: ((directory: string) => void) | undefined;
    originalWriteFile: WriteFileCallback | undefined;
    getSourceFileWithCache: ((fileName: string, languageVersionOrOptions: ScriptTarget | CreateSourceFileOptions, onError?: (message: string) => void, shouldCreateNewSourceFile?: boolean) => SourceFile | undefined) | undefined;
    readFileWithCache: (fileName: string) => string | undefined;
}
/** @internal */
export declare function changeCompilerHostLikeToUseCache(host: CompilerHostLikeForCache, toPath: (fileName: string) => Path, getSourceFile?: CompilerHost["getSourceFile"]): CompilerHostLikeWithCache;
export declare function getPreEmitDiagnostics(program: Program, sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[];
/** @internal */ export declare function getPreEmitDiagnostics(program: BuilderProgram, sourceFile?: SourceFile, cancellationToken?: CancellationToken): readonly Diagnostic[];
export interface FormatDiagnosticsHost {
    getCurrentDirectory(): string;
    getCanonicalFileName(fileName: string): string;
    getNewLine(): string;
}
export declare function formatDiagnostics(diagnostics: readonly Diagnostic[], host: FormatDiagnosticsHost): string;
export declare function formatDiagnostic(diagnostic: Diagnostic, host: FormatDiagnosticsHost): string;
/** @internal */
export declare enum ForegroundColorEscapeSequences {
    Grey = "\u001B[90m",
    Red = "\u001B[91m",
    Yellow = "\u001B[93m",
    Blue = "\u001B[94m",
    Cyan = "\u001B[96m"
}
/** @internal */
export declare function formatColorAndReset(text: string, formatStyle: string): string;
/** @internal */
export declare function formatLocation(file: SourceFile, start: number, host: FormatDiagnosticsHost, color?: typeof formatColorAndReset): string;
export declare function formatDiagnosticsWithColorAndContext(diagnostics: readonly Diagnostic[], host: FormatDiagnosticsHost): string;
export declare function flattenDiagnosticMessageText(diag: string | DiagnosticMessageChain | undefined, newLine: string, indent?: number): string;
/**
 * Subset of a SourceFile used to calculate index-based resolutions
 * This includes some internal fields, so unless you have very good reason,
 * (and are willing to use some less stable internals) you should probably just pass a SourceFile.
 *
 * @internal
 */
export interface SourceFileImportsList {
    imports: SourceFile["imports"];
    moduleAugmentations: SourceFile["moduleAugmentations"];
    impliedNodeFormat?: ResolutionMode;
    fileName: string;
    packageJsonScope?: SourceFile["packageJsonScope"];
}
/**
 * Calculates the resulting resolution mode for some reference in some file - this is generally the explicitly
 * provided resolution mode in the reference, unless one is not present, in which case it is the mode of the containing file.
 */
export declare function getModeForFileReference(ref: FileReference | string, containingFileMode: ResolutionMode): ResolutionMode;
/**
 * Use `program.getModeForResolutionAtIndex`, which retrieves the correct `compilerOptions`, instead of this function whenever possible.
 * Calculates the final resolution mode for an import at some index within a file's `imports` list. This is the resolution mode
 * explicitly provided via import attributes, if present, or the syntax the usage would have if emitted to JavaScript. In
 * `--module node16` or `nodenext`, this may depend on the file's `impliedNodeFormat`. In `--module preserve`, it depends only on the
 * input syntax of the reference. In other `module` modes, when overriding import attributes are not provided, this function returns
 * `undefined`, as the result would have no impact on module resolution, emit, or type checking.
 * @param file File to fetch the resolution mode within
 * @param index Index into the file's complete resolution list to get the resolution of - this is a concatenation of the file's imports and module augmentations
 * @param compilerOptions The compiler options for the program that owns the file. If the file belongs to a referenced project, the compiler options
 * should be the options of the referenced project, not the referencing project.
 */
export declare function getModeForResolutionAtIndex(file: SourceFile, index: number, compilerOptions: CompilerOptions): ResolutionMode;
/** @internal @knipignore */
export declare function getModeForResolutionAtIndex(file: SourceFileImportsList, index: number, compilerOptions: CompilerOptions): ResolutionMode;
/** @internal */
export declare function isExclusivelyTypeOnlyImportOrExport(decl: ImportDeclaration | ExportDeclaration | JSDocImportTag): boolean;
/**
 * Use `program.getModeForUsageLocation`, which retrieves the correct `compilerOptions`, instead of this function whenever possible.
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
 *
 * @param file The file the import or import-like reference is contained within
 * @param usage The module reference string
 * @param compilerOptions The compiler options for the program that owns the file. If the file belongs to a referenced project, the compiler options
 * should be the options of the referenced project, not the referencing project.
 * @returns The final resolution mode of the import
 */
export declare function getModeForUsageLocation(file: SourceFile, usage: StringLiteralLike, compilerOptions: CompilerOptions): ResolutionMode;
/** @internal */
export declare function getResolutionModeOverride(node: ImportAttributes | undefined, grammarErrorOnNode?: (node: Node, diagnostic: DiagnosticMessage) => void): ResolutionMode | undefined;
/** @internal */
export interface ResolutionWithResolvedFileName {
    resolvedFileName: string | undefined;
    packageId?: PackageId;
}
/** @internal */
export interface ResolutionNameAndModeGetter<Entry, SourceFile> {
    getName(entry: Entry): string;
    getMode(entry: Entry, file: SourceFile, compilerOptions: CompilerOptions): ResolutionMode;
}
/** @internal */
export interface ResolutionLoader<Entry, Resolution, SourceFile> {
    nameAndMode: ResolutionNameAndModeGetter<Entry, SourceFile>;
    resolve(name: string, mode: ResolutionMode): Resolution;
}
/** @internal */
export declare const moduleResolutionNameAndModeGetter: ResolutionNameAndModeGetter<StringLiteralLike, SourceFile>;
/** @internal */
export declare function createModuleResolutionLoader(containingFile: string, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions, host: ModuleResolutionHost, cache: ModuleResolutionCache | undefined): ResolutionLoader<StringLiteralLike, ResolvedModuleWithFailedLookupLocations, SourceFile>;
/** @internal */
export declare function createTypeReferenceResolutionLoader<T extends FileReference | string>(containingFile: string, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions, host: ModuleResolutionHost, cache: TypeReferenceDirectiveResolutionCache | undefined): ResolutionLoader<T, ResolvedTypeReferenceDirectiveWithFailedLookupLocations, SourceFile | undefined>;
/** @internal */
export declare function loadWithModeAwareCache<Entry, SourceFile, ResolutionCache, Resolution>(entries: readonly Entry[], containingFile: string, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions, containingSourceFile: SourceFile, host: ModuleResolutionHost, resolutionCache: ResolutionCache | undefined, createLoader: (containingFile: string, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions, host: ModuleResolutionHost, resolutionCache: ResolutionCache | undefined) => ResolutionLoader<Entry, Resolution, SourceFile>): readonly Resolution[];
/** @internal */
export declare const inferredTypesContainingFile = "__inferred type names__.ts";
/** @internal */
export declare function getInferredLibraryNameResolveFrom(options: CompilerOptions, currentDirectory: string, libFileName: string): string;
/** @internal */
export declare function getLibraryNameFromLibFileName(libFileName: string): string;
/** @internal */
export declare function isReferencedFile(reason: FileIncludeReason | undefined): reason is ReferencedFile;
/** @internal */
export interface ReferenceFileLocation {
    file: SourceFile;
    pos: number;
    end: number;
    packageId: PackageId | undefined;
}
/** @internal */
export interface SyntheticReferenceFileLocation {
    file: SourceFile;
    packageId: PackageId | undefined;
    text: string;
}
/** @internal */
export declare function isReferenceFileLocation(location: ReferenceFileLocation | SyntheticReferenceFileLocation): location is ReferenceFileLocation;
/** @internal */
export declare function getReferencedFileLocation(program: Program, ref: ReferencedFile): ReferenceFileLocation | SyntheticReferenceFileLocation;
/**
 * Determines if program structure is upto date or needs to be recreated
 *
 * @internal
 */
export declare function isProgramUptoDate(program: Program | undefined, rootFileNames: string[], newOptions: CompilerOptions, getSourceVersion: (path: Path, fileName: string) => string | undefined, fileExists: (fileName: string) => boolean, hasInvalidatedResolutions: HasInvalidatedResolutions, hasInvalidatedLibResolutions: HasInvalidatedLibResolutions, hasChangedAutomaticTypeDirectiveNames: HasChangedAutomaticTypeDirectiveNames | undefined, getParsedCommandLine: (fileName: string) => ParsedCommandLine | undefined, projectReferences: readonly ProjectReference[] | undefined): boolean;
export declare function getConfigFileParsingDiagnostics(configFileParseResult: ParsedCommandLine): readonly Diagnostic[];
/**
 * A function for determining if a given file is esm or cjs format, assuming modern node module resolution rules, as configured by the
 * `options` parameter.
 *
 * @param fileName The file name to check the format of (it need not exist on disk)
 * @param [packageJsonInfoCache] A cache for package file lookups - it's best to have a cache when this function is called often
 * @param host The ModuleResolutionHost which can perform the filesystem lookups for package json data
 * @param options The compiler options to perform the analysis under - relevant options are `moduleResolution` and `traceResolution`
 * @returns `undefined` if the path has no relevant implied format, `ModuleKind.ESNext` for esm format, and `ModuleKind.CommonJS` for cjs format
 */
export declare function getImpliedNodeFormatForFile(fileName: string, packageJsonInfoCache: PackageJsonInfoCache | undefined, host: ModuleResolutionHost, options: CompilerOptions): ResolutionMode;
/** @internal */
export declare function getImpliedNodeFormatForFileWorker(fileName: string, packageJsonInfoCache: PackageJsonInfoCache | undefined, host: ModuleResolutionHost, options: CompilerOptions): ResolutionMode | Partial<CreateSourceFileOptions> | undefined;
/**
 * Create a new 'Program' instance. A Program is an immutable collection of 'SourceFile's and a 'CompilerOptions'
 * that represent a compilation unit.
 *
 * Creating a program proceeds from a set of root files, expanding the set of inputs by following imports and
 * triple-slash-reference-path directives transitively. '@types' and triple-slash-reference-types are also pulled in.
 *
 * @param createProgramOptions - The options for creating a program.
 * @returns A 'Program' object.
 */
export declare function createProgram(createProgramOptions: CreateProgramOptions): Program;
/**
 * Create a new 'Program' instance. A Program is an immutable collection of 'SourceFile's and a 'CompilerOptions'
 * that represent a compilation unit.
 *
 * Creating a program proceeds from a set of root files, expanding the set of inputs by following imports and
 * triple-slash-reference-path directives transitively. '@types' and triple-slash-reference-types are also pulled in.
 *
 * @param rootNames - A set of root files.
 * @param options - The compiler options which should be used.
 * @param host - The host interacts with the underlying file system.
 * @param oldProgram - Reuses an old program structure.
 * @param configFileParsingDiagnostics - error during config file parsing
 * @returns A 'Program' object.
 */
export declare function createProgram(rootNames: readonly string[], options: CompilerOptions, host?: CompilerHost, oldProgram?: Program, configFileParsingDiagnostics?: readonly Diagnostic[]): Program;
/** @internal Prefer `program.getEmitModuleFormatOfFile` when possible. */
export declare function getEmitModuleFormatOfFileWorker(sourceFile: Pick<SourceFile, "fileName" | "impliedNodeFormat" | "packageJsonScope">, options: CompilerOptions): ModuleKind;
/** @internal Prefer `program.getImpliedNodeFormatForEmit` when possible. */
export declare function getImpliedNodeFormatForEmitWorker(sourceFile: Pick<SourceFile, "fileName" | "impliedNodeFormat" | "packageJsonScope">, options: CompilerOptions): ResolutionMode;
/** @internal Prefer `program.getDefaultResolutionModeForFile` when possible. */
export declare function getDefaultResolutionModeForFileWorker(sourceFile: Pick<SourceFile, "fileName" | "impliedNodeFormat" | "packageJsonScope">, options: CompilerOptions): ResolutionMode;
/** @internal */
export declare const emitSkippedWithNoDiagnostics: EmitResult;
/** @internal */
export declare function handleNoEmitOptions<T extends BuilderProgram>(program: Program | T, sourceFile: SourceFile | undefined, writeFile: WriteFileCallback | undefined, cancellationToken: CancellationToken | undefined): EmitResult | undefined;
/** @internal */
export declare function filterSemanticDiagnostics(diagnostic: readonly Diagnostic[], option: CompilerOptions): readonly Diagnostic[];
/** @internal */
export declare function parseConfigHostFromCompilerHostLike<T extends BuilderProgram>(host: (CompilerHost | ProgramHost<T>) & {
    onUnRecoverableConfigFileDiagnostic?: DiagnosticReporter;
}, directoryStructureHost?: DirectoryStructureHost): ParseConfigFileHost;
/**
 * Returns the target config filename of a project reference.
 * Note: The file might not exist.
 */
export declare function resolveProjectReferencePath(ref: ProjectReference): ResolvedConfigFileName;
/**
 * Returns a DiagnosticMessage if we won't include a resolved module due to its extension.
 * The DiagnosticMessage's parameters are the imported module name, and the filename it resolved to.
 * This returns a diagnostic even if the module will be an untyped module.
 *
 * @internal
 */
export declare function getResolutionDiagnostic(options: CompilerOptions, { extension }: ResolvedModuleFull, { isDeclarationFile }: {
    isDeclarationFile: SourceFile["isDeclarationFile"];
}): DiagnosticMessage | undefined;
/** @internal */
export declare function getModuleNameStringLiteralAt({ imports, moduleAugmentations }: SourceFileImportsList, index: number): StringLiteralLike;
//# sourceMappingURL=program.d.ts.map