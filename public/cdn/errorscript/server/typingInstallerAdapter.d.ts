import { ApplyCodeActionCommandResult, server, SortedReadonlyArray, TypeAcquisition } from "./_namespaces/ts.js";
import { BeginInstallTypes, DiscoverTypings, EndInstallTypes, Event, InitializationFailedResponse, InstallPackageOptionsWithProject, InvalidateCachedTypings, ITypingsInstaller, Logger, PackageInstalledResponse, Project, ProjectService, ServerHost, SetTypings, TypesRegistryResponse, TypingInstallerRequestUnion } from "./_namespaces/ts.server.js";
/** @internal */
export interface TypingsInstallerWorkerProcess {
    send<T extends TypingInstallerRequestUnion>(rq: T): void;
}
/** @internal */
export declare abstract class TypingsInstallerAdapter implements ITypingsInstaller {
    protected readonly telemetryEnabled: boolean;
    protected readonly logger: Logger;
    protected readonly host: ServerHost;
    readonly globalTypingsCacheLocation: string;
    protected event: Event;
    private readonly maxActiveRequestCount;
    protected installer: TypingsInstallerWorkerProcess;
    private projectService;
    protected activeRequestCount: number;
    private requestQueue;
    private requestMap;
    /** We will lazily request the types registry on the first call to `isKnownTypesPackageName` and store it in `typesRegistryCache`. */
    private requestedRegistry;
    private typesRegistryCache;
    private static readonly requestDelayMillis;
    private packageInstalledPromise;
    private packageInstallId;
    constructor(telemetryEnabled: boolean, logger: Logger, host: ServerHost, globalTypingsCacheLocation: string, event: Event, maxActiveRequestCount: number);
    isKnownTypesPackageName(name: string): boolean;
    installPackage(options: InstallPackageOptionsWithProject): Promise<ApplyCodeActionCommandResult>;
    attach(projectService: ProjectService): void;
    onProjectClosed(p: Project): void;
    enqueueInstallTypingsRequest(project: Project, typeAcquisition: TypeAcquisition, unresolvedImports: SortedReadonlyArray<string>): void;
    handleMessage(response: TypesRegistryResponse | PackageInstalledResponse | SetTypings | InvalidateCachedTypings | BeginInstallTypes | EndInstallTypes | InitializationFailedResponse | server.WatchTypingLocations): void;
    scheduleRequest(request: DiscoverTypings): void;
    protected abstract createInstallerProcess(): TypingsInstallerWorkerProcess;
}
//# sourceMappingURL=typingInstallerAdapter.d.ts.map