import { __String, CancellationToken, FutureSourceFile, LanguageServiceHost, ModuleSpecifierCache, ModuleSpecifierResolutionHost, PackageJsonImportFilter, Path, Program, ScriptTarget, SourceFile, Symbol, SymbolFlags, TypeChecker, UserPreferences } from "./_namespaces/ts.js";
/** @internal */
export declare const enum ImportKind {
    Named = 0,
    Default = 1,
    Namespace = 2,
    CommonJS = 3
}
/** @internal */
export declare const enum ExportKind {
    Named = 0,
    Default = 1,
    ExportEquals = 2,
    UMD = 3,
    Module = 4
}
/** @internal */
export interface SymbolExportInfo {
    readonly symbol: Symbol;
    readonly moduleSymbol: Symbol;
    /** Set if `moduleSymbol` is an external module, not an ambient module */
    moduleFileName: string | undefined;
    exportKind: ExportKind;
    targetFlags: SymbolFlags;
    /** True if export was only found via the package.json AutoImportProvider (for telemetry). */
    isFromPackageJson: boolean;
}
/**
 * @internal
 * ExportInfo for an export that does not exist yet, so does not have a symbol.
 */
export type FutureSymbolExportInfo = Omit<SymbolExportInfo, "symbol"> & {
    readonly symbol?: undefined;
};
/** @internal */
export interface ExportInfoMap {
    isUsableByFile(importingFile: Path): boolean;
    clear(): void;
    add(importingFile: Path, symbol: Symbol, key: __String, moduleSymbol: Symbol, moduleFile: SourceFile | undefined, exportKind: ExportKind, isFromPackageJson: boolean, checker: TypeChecker): void;
    get(importingFile: Path, key: ExportMapInfoKey): readonly SymbolExportInfo[] | undefined;
    search<T>(importingFile: Path, preferCapitalized: boolean, matches: (name: string, targetFlags: SymbolFlags) => boolean, action: (info: readonly SymbolExportInfo[], symbolName: string, isFromAmbientModule: boolean, key: ExportMapInfoKey) => T | undefined): T | undefined;
    releaseSymbols(): void;
    isEmpty(): boolean;
    /** @returns Whether the change resulted in the cache being cleared */
    onFileChanged(oldSourceFile: SourceFile, newSourceFile: SourceFile, typeAcquisitionEnabled: boolean): boolean;
}
/** @internal */
export interface CacheableExportInfoMapHost {
    getCurrentProgram(): Program | undefined;
    getPackageJsonAutoImportProvider(): Program | undefined;
    getGlobalTypingsCacheLocation(): string | undefined;
}
export type ExportMapInfoKey = string & {
    __exportInfoKey: void;
};
/** @internal */
export declare function createCacheableExportInfoMap(host: CacheableExportInfoMapHost): ExportInfoMap;
/** @internal */
export declare function isImportable(program: Program, fromFile: SourceFile, toFile: SourceFile | undefined, toModule: Symbol, preferences: UserPreferences, packageJsonFilter: PackageJsonImportFilter | undefined, moduleSpecifierResolutionHost: ModuleSpecifierResolutionHost, moduleSpecifierCache: ModuleSpecifierCache | undefined): boolean;
/** @internal */
export declare function forEachExternalModuleToImportFrom(program: Program, host: LanguageServiceHost, preferences: UserPreferences, useAutoImportProvider: boolean, cb: (module: Symbol, moduleFile: SourceFile | undefined, program: Program, isFromPackageJson: boolean) => void): void;
/** @internal */
export declare function getIsFileExcluded(host: LanguageServiceHost, preferences: UserPreferences): (sourceFile: SourceFile) => boolean;
/** @internal */
export declare function getExportInfoMap(importingFile: SourceFile | FutureSourceFile, host: LanguageServiceHost, program: Program, preferences: UserPreferences, cancellationToken: CancellationToken | undefined): ExportInfoMap;
/** @internal */
export declare function getDefaultLikeExportInfo(moduleSymbol: Symbol, checker: TypeChecker): {
    symbol: Symbol;
    exportKind: ExportKind;
} | undefined;
/**
 * @internal
 * May call `cb` multiple times with the same name.
 * Terminates when `cb` returns a truthy value.
 */
export declare function forEachNameOfDefaultExport<T>(defaultExport: Symbol, checker: TypeChecker, scriptTarget: ScriptTarget | undefined, cb: (name: string, capitalizedName?: string) => T | undefined): T | undefined;
//# sourceMappingURL=exportInfoMap.d.ts.map