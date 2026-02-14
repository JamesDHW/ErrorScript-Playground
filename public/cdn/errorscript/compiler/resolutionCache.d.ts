import { CachedDirectoryStructureHost, CompilerOptions, DirectoryWatcherCallback, FileReference, FileWatcher, FileWatcherCallback, GetCanonicalFileName, HasInvalidatedLibResolutions, HasInvalidatedResolutions, MinimalResolutionCacheHost, ModeAwareCache, ModuleResolutionCache, Path, PathPathComponents, Program, ResolutionLoader, ResolutionWithResolvedFileName, ResolvedModuleWithFailedLookupLocations, ResolvedProjectReference, ResolvedTypeReferenceDirectiveWithFailedLookupLocations, SourceFile, StringLiteralLike, WatchDirectoryFlags } from "./_namespaces/ts.js";
/** @internal */
export interface HasInvalidatedFromResolutionCache {
    hasInvalidatedResolutions: HasInvalidatedResolutions;
    hasInvalidatedLibResolutions: HasInvalidatedLibResolutions;
}
/**
 * This is the cache of module/typedirectives resolution that can be retained across program
 *
 * @internal
 */
export interface ResolutionCache {
    rootDirForResolution: string;
    resolvedModuleNames: Map<Path, ModeAwareCache<CachedResolvedModuleWithFailedLookupLocations>>;
    resolvedTypeReferenceDirectives: Map<Path, ModeAwareCache<CachedResolvedTypeReferenceDirectiveWithFailedLookupLocations>>;
    resolvedLibraries: Map<string, CachedResolvedModuleWithFailedLookupLocations>;
    resolvedFileToResolution: Map<Path, Set<ResolutionWithFailedLookupLocations>>;
    resolutionsWithFailedLookups: Set<ResolutionWithFailedLookupLocations>;
    resolutionsWithOnlyAffectingLocations: Set<ResolutionWithFailedLookupLocations>;
    directoryWatchesOfFailedLookups: Map<string, DirectoryWatchesOfFailedLookup>;
    fileWatchesOfAffectingLocations: Map<string, FileWatcherOfAffectingLocation>;
    packageDirWatchers: Map<Path, PackageDirWatcher>;
    dirPathToSymlinkPackageRefCount: Map<Path, number>;
    startRecordingFilesWithChangedResolutions(): void;
    finishRecordingFilesWithChangedResolutions(): Path[] | undefined;
    watchFailedLookupLocationsOfExternalModuleResolutions<T extends ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName>(name: string, resolution: T, filePath: Path, getResolutionWithResolvedFileName: GetResolutionWithResolvedFileName<T, R>, deferWatchingNonRelativeResolution: boolean): void;
    resolveModuleNameLiterals(moduleLiterals: readonly StringLiteralLike[], containingFile: string, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions, containingSourceFile: SourceFile, reusedNames: readonly StringLiteralLike[] | undefined): readonly ResolvedModuleWithFailedLookupLocations[];
    resolveTypeReferenceDirectiveReferences<T extends FileReference | string>(typeDirectiveReferences: readonly T[], containingFile: string, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions, containingSourceFile: SourceFile | undefined, reusedNames: readonly T[] | undefined): readonly ResolvedTypeReferenceDirectiveWithFailedLookupLocations[];
    resolveLibrary(libraryName: string, resolveFrom: string, options: CompilerOptions, libFileName: string): ResolvedModuleWithFailedLookupLocations;
    resolveSingleModuleNameWithoutWatching(moduleName: string, containingFile: string): ResolvedModuleWithFailedLookupLocations;
    invalidateResolutionsOfFailedLookupLocations(): boolean;
    invalidateResolutionOfFile(filePath: Path): void;
    removeResolutionsOfFile(filePath: Path): void;
    removeResolutionsFromProjectReferenceRedirects(filePath: Path): void;
    setFilesWithInvalidatedNonRelativeUnresolvedImports(filesWithUnresolvedImports: Map<Path, readonly string[]>): void;
    createHasInvalidatedResolutions(customHasInvalidatedResolutions: HasInvalidatedResolutions, customHasInvalidatedLibResolutions: HasInvalidatedLibResolutions): HasInvalidatedFromResolutionCache;
    hasChangedAutomaticTypeDirectiveNames(): boolean;
    isFileWithInvalidatedNonRelativeUnresolvedImports(path: Path): boolean;
    startCachingPerDirectoryResolution(): void;
    finishCachingPerDirectoryResolution(newProgram: Program | undefined, oldProgram: Program | undefined): void;
    updateTypeRootsWatch(): void;
    closeTypeRootsWatch(): void;
    getModuleResolutionCache(): ModuleResolutionCache;
    clear(): void;
    onChangesAffectModuleResolution(): void;
}
/** @internal */
export interface ResolutionWithFailedLookupLocations {
    failedLookupLocations?: string[];
    affectingLocations?: string[];
    isInvalidated?: boolean;
    files?: Set<Path>;
    alternateResult?: string;
}
/** @internal */
export interface CachedResolvedModuleWithFailedLookupLocations extends ResolvedModuleWithFailedLookupLocations, ResolutionWithFailedLookupLocations {
}
/** @internal */
export interface CachedResolvedTypeReferenceDirectiveWithFailedLookupLocations extends ResolvedTypeReferenceDirectiveWithFailedLookupLocations, ResolutionWithFailedLookupLocations {
}
/** @internal */
export interface ResolutionCacheHost extends MinimalResolutionCacheHost {
    toPath(fileName: string): Path;
    getCanonicalFileName: GetCanonicalFileName;
    getCompilationSettings(): CompilerOptions;
    preferNonRecursiveWatch: boolean | undefined;
    watchDirectoryOfFailedLookupLocation(directory: string, cb: DirectoryWatcherCallback, flags: WatchDirectoryFlags): FileWatcher;
    watchAffectingFileLocation(file: string, cb: FileWatcherCallback): FileWatcher;
    onInvalidatedResolution(): void;
    watchTypeRootsDirectory(directory: string, cb: DirectoryWatcherCallback, flags: WatchDirectoryFlags): FileWatcher;
    onChangedAutomaticTypeDirectiveNames(): void;
    scheduleInvalidateResolutionsOfFailedLookupLocations(): void;
    getCachedDirectoryStructureHost(): CachedDirectoryStructureHost | undefined;
    projectName?: string;
    globalCacheResolutionModuleName?(externalModuleName: string): string;
    writeLog(s: string): void;
    getCurrentProgram(): Program | undefined;
    fileIsOpen(filePath: Path): boolean;
    onDiscoveredSymlink?(): void;
    skipWatchingFailedLookups?(path: Path): boolean | undefined;
    skipWatchingTypeRoots?(): boolean | undefined;
    beforeResolveSingleModuleNameWithoutWatching?(moduleResolutionCache: ModuleResolutionCache): any;
    afterResolveSingleModuleNameWithoutWatching?(moduleResolutionCache: ModuleResolutionCache, moduleName: string, containingFile: string, result: ResolvedModuleWithFailedLookupLocations, data: any): any;
}
/** @internal */
export interface FileWatcherOfAffectingLocation {
    /** watcher for the lookup */
    watcher: FileWatcher;
    resolutions: number;
    files: number;
    symlinks: Set<string> | undefined;
}
/** @internal */
export interface DirectoryWatchesOfFailedLookup {
    /** watcher for the lookup */
    watcher: FileWatcher;
    /** ref count keeping this watch alive */
    refCount: number;
    /** is the directory watched being non recursive */
    nonRecursive?: boolean;
}
/** @internal */
export interface DirPathToWatcherOfPackageDirWatcher {
    watcher: DirectoryWatchesOfFailedLookup;
    refCount: number;
}
/** @internal */
export interface PackageDirWatcher {
    dirPathToWatcher: Map<Path, DirPathToWatcherOfPackageDirWatcher>;
    isSymlink: boolean;
}
/** @internal */
export interface DirectoryOfFailedLookupWatch {
    dir: string;
    dirPath: Path;
    nonRecursive?: boolean;
    packageDir?: string;
    packageDirPath?: Path;
}
/** @internal */
export declare function removeIgnoredPath(path: Path): Path | undefined;
/**
 * Filter out paths like
 * "/", "/user", "/user/username", "/user/username/folderAtRoot",
 * "c:/", "c:/users", "c:/users/username", "c:/users/username/folderAtRoot", "c:/folderAtRoot"
 * @param dirPath
 *
 * @internal
 */
export declare function canWatchDirectoryOrFile(pathComponents: Readonly<PathPathComponents>, length?: number): boolean;
/** @internal */
export declare function canWatchDirectoryOrFilePath(path: Path): boolean;
/** @internal */
export declare function canWatchAtTypes(atTypes: Path): boolean;
/** @internal */
export declare function canWatchAffectingLocation(filePath: Path): boolean;
/** @internal */
export declare function getDirectoryToWatchFailedLookupLocation(failedLookupLocation: string, failedLookupLocationPath: Path, rootDir: string, rootPath: Path, rootPathComponents: Readonly<PathPathComponents>, isRootWatchable: boolean, getCurrentDirectory: () => string | undefined, preferNonRecursiveWatch: boolean | undefined): DirectoryOfFailedLookupWatch | undefined;
/** @internal */
export declare function getDirectoryToWatchFailedLookupLocationFromTypeRoot(typeRoot: string, typeRootPath: Path, rootPath: Path, rootPathComponents: Readonly<PathPathComponents>, isRootWatchable: boolean, getCurrentDirectory: () => string | undefined, preferNonRecursiveWatch: boolean | undefined, filterCustomPath: (path: Path) => boolean): Path | undefined;
/** @internal */
export declare function getRootDirectoryOfResolutionCache(rootDirForResolution: string, getCurrentDirectory: () => string | undefined): string;
/** @internal */
export declare function createModuleResolutionLoaderUsingGlobalCache(containingFile: string, redirectedReference: ResolvedProjectReference | undefined, options: CompilerOptions, resolutionHost: ResolutionCacheHost, moduleResolutionCache: ModuleResolutionCache): ResolutionLoader<StringLiteralLike, ResolvedModuleWithFailedLookupLocations, SourceFile>;
/** @internal */
export type GetResolutionWithResolvedFileName<T extends ResolutionWithFailedLookupLocations = ResolutionWithFailedLookupLocations, R extends ResolutionWithResolvedFileName = ResolutionWithResolvedFileName> = (resolution: T) => R | undefined;
/** @internal */
export declare function createResolutionCache(resolutionHost: ResolutionCacheHost, rootDirForResolution: string, logChangesWhenResolvingModule: boolean): ResolutionCache;
//# sourceMappingURL=resolutionCache.d.ts.map