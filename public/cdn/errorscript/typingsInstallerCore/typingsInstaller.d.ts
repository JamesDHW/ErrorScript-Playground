import { MapLike, Path } from "./_namespaces/ts.js";
import { BeginInstallTypes, CloseProject, DiscoverTypings, EndInstallTypes, InstallPackageRequest, InstallTypingHost, InvalidateCachedTypings, PackageInstalledResponse, SetTypings, TypesRegistryResponse, TypingInstallerRequestUnion, WatchTypingLocations } from "./_namespaces/ts.server.js";
export interface Log {
    isEnabled(): boolean;
    writeLine(text: string): void;
}
/** @internal */
export declare function installNpmPackages(npmPath: string, tsVersion: string, packageNames: string[], install: (command: string) => boolean): boolean;
/** @internal */
export declare function getNpmCommandForInstallation(npmPath: string, tsVersion: string, packageNames: string[], remaining: number): {
    command: string;
    remaining: number;
};
export type RequestCompletedAction = (success: boolean) => void;
export interface PendingRequest {
    requestId: number;
    packageNames: string[];
    cwd: string;
    onRequestCompleted: RequestCompletedAction;
}
export declare abstract class TypingsInstaller {
    protected readonly installTypingHost: InstallTypingHost;
    private readonly globalCachePath;
    private readonly safeListPath;
    private readonly typesMapLocation;
    private readonly throttleLimit;
    protected readonly log: Log;
    private readonly packageNameToTypingLocation;
    private readonly missingTypingsSet;
    private readonly knownCachesSet;
    private readonly projectWatchers;
    private safeList;
    private pendingRunRequests;
    private installRunCount;
    private inFlightRequestCount;
    abstract readonly typesRegistry: Map<string, MapLike<string>>;
    constructor(installTypingHost: InstallTypingHost, globalCachePath: string, safeListPath: Path, typesMapLocation: Path, throttleLimit: number, log?: Log);
    /** @internal */
    handleRequest(req: TypingInstallerRequestUnion): void;
    closeProject(req: CloseProject): void;
    private closeWatchers;
    install(req: DiscoverTypings): void;
    /** @internal */
    installPackage(req: InstallPackageRequest): void;
    private initializeSafeList;
    private processCacheLocation;
    private filterTypings;
    protected ensurePackageDirectoryExists(directory: string): void;
    private installTypings;
    private ensureDirectoryExists;
    private watchFiles;
    private createSetTypings;
    private installTypingsAsync;
    private executeWithThrottling;
    protected abstract installWorker(requestId: number, packageNames: string[], cwd: string, onRequestCompleted: RequestCompletedAction): void;
    protected abstract sendResponse(response: SetTypings | InvalidateCachedTypings | BeginInstallTypes | EndInstallTypes | WatchTypingLocations): void;
    /** @internal */
    protected abstract sendResponse(response: SetTypings | InvalidateCachedTypings | BeginInstallTypes | EndInstallTypes | WatchTypingLocations | PackageInstalledResponse | TypesRegistryResponse): void;
    protected readonly latestDistTag = "latest";
}
/** @internal */
export declare function typingsName(packageName: string): string;
//# sourceMappingURL=typingsInstaller.d.ts.map