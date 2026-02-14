import { LoggerWithInMemoryLogs } from "../../../harness/tsserverLogger.js";
import * as ts from "../../_namespaces/ts.js";
import { TestSession } from "./tsserver.js";
import { File, TestServerHost } from "./virtualFileSystemWithWatch.js";
export declare const customTypesMap: File;
export declare function loggerToTypingsInstallerLog(logger: LoggerWithInMemoryLogs): ts.server.typingsInstaller.Log;
interface TypesRegistryFile {
    entries: ts.MapLike<ts.MapLike<string>>;
}
export declare function getTypesRegistryFileLocation(globalTypingsCacheLocation: string): string;
export interface FileWithPackageName extends File {
    package?: string;
}
export type InstallActionThrowingError = string;
export type InstallActionWithSuccess = boolean;
export type InstallActionWithTypingFiles = readonly FileWithPackageName[];
export type InstallAction = InstallActionThrowingError | InstallActionWithSuccess | InstallActionWithTypingFiles;
export type PendingInstallCallback = (pendingInstallInfo: string, installedTypingsOrSuccess: string[] | string | boolean, typingFiles: readonly File[], onRequestCompleted: ts.server.typingsInstaller.RequestCompletedAction) => void;
export declare class TestTypingsInstallerWorker extends ts.server.typingsInstaller.TypingsInstaller {
    readonly testTypingInstaller: TestTypingsInstallerAdapter;
    readonly typesRegistry: Map<string, ts.MapLike<string>>;
    constructor(testTypingInstaller: TestTypingsInstallerAdapter);
    installWorker(requestId: number, packageNames: string[], cwd: string, onRequestCompleted: ts.server.typingsInstaller.RequestCompletedAction): void;
    private scheduleInstall;
    sendResponse(response: ts.server.SetTypings | ts.server.InvalidateCachedTypings | ts.server.BeginInstallTypes | ts.server.EndInstallTypes | ts.server.WatchTypingLocations | ts.server.PackageInstalledResponse): void;
}
export interface TestTypingsInstallerOptions {
    host: TestServerHost;
    logger?: LoggerWithInMemoryLogs;
    throttleLimit?: number;
    installAction?: InstallAction;
    throttledRequests?: number;
}
export declare class TestTypingsInstallerAdapter extends ts.server.TypingsInstallerAdapter {
    worker: TestTypingsInstallerWorker | undefined;
    session: TestSession;
    readonly throttleLimit: number;
    readonly installAction: InstallAction;
    readonly throttledRequests: number | undefined;
    constructor(options: TestTypingsInstallerOptions);
    protected createInstallerProcess(): ts.server.TypingsInstallerWorkerProcess;
    scheduleRequest(request: ts.server.DiscoverTypings): void;
}
export declare function createTypesRegistryFileContent(list: readonly string[]): TypesRegistryFile;
export declare function createTypesRegistry(...list: string[]): Map<string, ts.MapLike<string>>;
export {};
//# sourceMappingURL=typingsInstaller.d.ts.map