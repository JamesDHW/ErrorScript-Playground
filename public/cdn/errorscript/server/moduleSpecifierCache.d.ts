import { FileWatcher, ModuleSpecifierCache, Path } from "./_namespaces/ts.js";
/** @internal */
export interface ModuleSpecifierResolutionCacheHost {
    watchNodeModulesForPackageJsonChanges(directoryPath: string): FileWatcher;
    toPath(fileName: string): Path;
}
/** @internal */
export declare function createModuleSpecifierCache(host: ModuleSpecifierResolutionCacheHost): ModuleSpecifierCache;
//# sourceMappingURL=moduleSpecifierCache.d.ts.map