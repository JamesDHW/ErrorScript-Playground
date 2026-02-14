import { CompilerOptions, Extension, FutureSourceFile, ModuleSpecifierEnding, ModuleSpecifierOptions, ModuleSpecifierResolutionHost, ResolutionMode, ResolvedModuleSpecifierInfo, SourceFile, Symbol, TypeChecker, UserPreferences } from "./_namespaces/ts.js";
/** @internal */
export declare const enum RelativePreference {
    Relative = 0,
    NonRelative = 1,
    Shortest = 2,
    ExternalNonRelative = 3
}
/** @internal */
export interface ModuleSpecifierPreferences {
    readonly relativePreference: RelativePreference;
    /**
     * @param syntaxImpliedNodeFormat Used when the import syntax implies ESM or CJS irrespective of the mode of the file.
     */
    getAllowedEndingsInPreferredOrder(syntaxImpliedNodeFormat?: ResolutionMode): ModuleSpecifierEnding[];
    readonly excludeRegexes?: readonly string[];
}
/** @internal */
export declare function getModuleSpecifierPreferences({ importModuleSpecifierPreference, importModuleSpecifierEnding, autoImportSpecifierExcludeRegexes }: UserPreferences, host: Pick<ModuleSpecifierResolutionHost, "getDefaultResolutionModeForFile">, compilerOptions: CompilerOptions, importingSourceFile: Pick<SourceFile, "fileName" | "impliedNodeFormat">, oldImportSpecifier?: string): ModuleSpecifierPreferences;
/** @internal */
export declare function updateModuleSpecifier(compilerOptions: CompilerOptions, importingSourceFile: SourceFile, importingSourceFileName: string, toFileName: string, host: ModuleSpecifierResolutionHost, oldImportSpecifier: string, options?: ModuleSpecifierOptions): string | undefined;
/** @internal */
export declare function getModuleSpecifier(compilerOptions: CompilerOptions, importingSourceFile: SourceFile | FutureSourceFile, importingSourceFileName: string, toFileName: string, host: ModuleSpecifierResolutionHost, options?: ModuleSpecifierOptions): string;
/** @internal */
export declare function getNodeModulesPackageName(compilerOptions: CompilerOptions, importingSourceFile: SourceFile | FutureSourceFile, nodeModulesFileName: string, host: ModuleSpecifierResolutionHost, preferences: UserPreferences, options?: ModuleSpecifierOptions): string | undefined;
/** @internal */
export declare function tryGetModuleSpecifiersFromCache(moduleSymbol: Symbol, importingSourceFile: SourceFile | FutureSourceFile, host: ModuleSpecifierResolutionHost, userPreferences: UserPreferences, options?: ModuleSpecifierOptions): ModuleSpecifierResult | undefined;
/**
 * Returns an import for each symlink and for the realpath.
 *
 * @internal
 */
export declare function getModuleSpecifiers(moduleSymbol: Symbol, checker: TypeChecker, compilerOptions: CompilerOptions, importingSourceFile: SourceFile, host: ModuleSpecifierResolutionHost, userPreferences: UserPreferences, options?: ModuleSpecifierOptions): readonly string[];
/** @internal */
export interface ModuleSpecifierResult {
    kind: ResolvedModuleSpecifierInfo["kind"];
    moduleSpecifiers: readonly string[];
    computedWithoutCache: boolean;
}
/** @internal */
export declare function getModuleSpecifiersWithCacheInfo(moduleSymbol: Symbol, checker: TypeChecker, compilerOptions: CompilerOptions, importingSourceFile: SourceFile | FutureSourceFile, host: ModuleSpecifierResolutionHost, userPreferences: UserPreferences, options: ModuleSpecifierOptions | undefined, forAutoImport: boolean): ModuleSpecifierResult;
/** @internal */
export declare function getLocalModuleSpecifierBetweenFileNames(importingFile: Pick<SourceFile, "fileName" | "impliedNodeFormat">, targetFileName: string, compilerOptions: CompilerOptions, host: ModuleSpecifierResolutionHost, preferences: UserPreferences, options?: ModuleSpecifierOptions): string;
/** @internal */
export declare function countPathComponents(path: string): number;
/** @internal */
export declare function forEachFileNameOfModule<T>(importingFileName: string, importedFileName: string, host: ModuleSpecifierResolutionHost, preferSymlinks: boolean, cb: (fileName: string, isRedirect: boolean) => T | undefined): T | undefined;
/** @internal */
export declare function tryGetRealFileNameForNonJsDeclarationFileName(fileName: string): string | undefined;
/** @internal */
export declare function tryGetJSExtensionForFile(fileName: string, options: CompilerOptions): Extension | undefined;
//# sourceMappingURL=moduleSpecifiers.d.ts.map