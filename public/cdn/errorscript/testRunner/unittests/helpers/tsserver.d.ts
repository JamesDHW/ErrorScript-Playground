import { LoggerWithInMemoryLogs } from "../../../harness/tsserverLogger.js";
import { FileRangesRequestArgs } from "../../../server/protocol.js";
import * as ts from "../../_namespaces/ts.js";
import { TscWatchCompileChange } from "./tscWatch.js";
import { TestTypingsInstallerAdapter, TestTypingsInstallerOptions } from "./typingsInstaller.js";
import { File, FileOrFolderOrSymLink, TestServerHost, TestServerHostTrackingWrittenFiles } from "./virtualFileSystemWithWatch.js";
export declare function baselineTsserverLogs(scenario: string, subScenario: string, sessionOrService: {
    logger: LoggerWithInMemoryLogs;
}): void;
export declare function toExternalFile(fileName: string): ts.server.protocol.ExternalFile;
export declare function toExternalFiles(fileNames: string[]): ts.server.protocol.ExternalFile[];
export type TestSessionAndServiceHost = TestServerHostTrackingWrittenFiles & {
    patched: boolean;
    baselineHost(title: string): void;
};
export declare function patchHostTimeouts(inputHost: TestServerHostTrackingWrittenFiles, session: TestSession | undefined, logger: LoggerWithInMemoryLogs): TestSessionAndServiceHost;
export interface TestSessionOptions extends ts.server.SessionOptions, TestTypingsInstallerOptions {
    host: TestServerHost;
    logger: LoggerWithInMemoryLogs;
    disableAutomaticTypingAcquisition?: boolean;
    useCancellationToken?: boolean | number;
    regionDiagLineCountThreshold?: number;
}
export type TestSessionPartialOptionsAndHost = Partial<Omit<TestSessionOptions, "typingsInstaller" | "cancellationToken">> & Pick<TestSessionOptions, "host">;
export type TestSessionConstructorOptions = TestServerHost | TestSessionPartialOptionsAndHost;
export type TestSessionRequest<T extends ts.server.protocol.Request> = Pick<T, "command" | "arguments">;
export declare class TestSession extends ts.server.Session {
    private seq;
    host: TestSessionAndServiceHost;
    logger: LoggerWithInMemoryLogs;
    readonly typingsInstaller: TestTypingsInstallerAdapter;
    serverCancellationToken: TestServerCancellationToken;
    watchChanges: Map<number, ts.server.protocol.WatchChangeRequestArgs>;
    constructor(optsOrHost: TestSessionConstructorOptions);
    getProjectService(): ts.server.ProjectService;
    getSeq(): number;
    getNextSeq(): number;
    executeCommand(request: ts.server.protocol.Request): ts.server.HandlerResponse;
    executeCommandSeq<T extends ts.server.protocol.Request>(inputRequest: TestSessionRequest<T>): ts.server.HandlerResponse;
    invokeWatchChanges(): void;
}
export declare function createSessionWithCustomEventHandler(optsOrHost: TestSessionConstructorOptions, customAction?: (event: ts.server.ProjectServiceEvent) => void): TestSession;
export declare function protocolLocationFromSubstring(str: string, substring: string, options?: SpanFromSubstringOptions): ts.server.protocol.Location;
export declare function protocolToLocation(text: string): (pos: number) => ts.server.protocol.Location;
export declare function protocolTextSpanFromSubstring(str: string, substring: string, options?: SpanFromSubstringOptions): ts.server.protocol.TextSpan;
export declare function textSpanFromSubstring(str: string, substring: string, options?: SpanFromSubstringOptions): ts.TextSpan;
export declare function protocolTextSpanToFileRange(span: ts.server.protocol.TextSpan): ts.server.protocol.FileRange;
export declare function protocolFileLocationFromSubstring(file: File, substring: string, options?: SpanFromSubstringOptions): ts.server.protocol.FileLocationRequestArgs;
export interface SpanFromSubstringOptions {
    readonly index: number;
}
/**
 * Test server cancellation token used to mock host token cancellation requests.
 * The cancelAfterRequest constructor param specifies how many isCancellationRequested() calls
 * should be made before canceling the token. The id of the request to cancel should be set with
 * setRequestToCancel();
 */
export declare class TestServerCancellationToken implements ts.server.ServerCancellationToken {
    private logger;
    private cancelAfterRequest;
    private currentId;
    private requestToCancel;
    private isCancellationRequestedCount;
    constructor(logger: LoggerWithInMemoryLogs, cancelAfterRequest?: number);
    setRequest(requestId: number): void;
    setRequestToCancel(requestId: number): void;
    resetRequest(requestId: number): void;
    isCancellationRequested(): boolean;
    resetToken(): void;
}
export declare function openFilesForSession(files: readonly (string | File | {
    readonly file: File | string;
    readonly projectRootPath?: string;
    content?: string;
    scriptKindName?: ts.server.protocol.ScriptKindName;
})[], session: TestSession): void;
export declare function projectInfoForSession(session: TestSession, file: string | File): ts.server.protocol.ProjectInfo;
export declare function closeFilesForSession(files: readonly (File | string)[], session: TestSession): void;
export declare function openExternalProjectForSession(project: ts.server.protocol.ExternalProject, session: TestSession): void;
export declare function openExternalProjectsForSession(projects: ts.server.protocol.ExternalProject[], session: TestSession): void;
export declare function setCompilerOptionsForInferredProjectsRequestForSession(options: ts.server.protocol.InferredProjectCompilerOptions | ts.server.protocol.SetCompilerOptionsForInferredProjectsArgs, session: TestSession): void;
export declare function logDiagnostics(sessionOrService: TestSession, diagnosticsType: string, project: ts.server.Project, diagnostics: readonly ts.Diagnostic[]): void;
export interface VerifyGetErrRequestBase {
    session: TestSession;
    existingTimeouts?: boolean;
}
export interface VerifyGetErrRequest extends VerifyGetErrRequestBase {
    files: readonly (string | File | FileRangesRequestArgs)[];
    skip?: CheckAllErrors["skip"];
}
export declare function verifyGetErrRequest(request: VerifyGetErrRequest): void;
interface SkipErrors {
    semantic?: true;
    suggestion?: true;
    /** Region semantic checking will only happen if this is */
    regionSemantic?: false;
}
export interface CheckAllErrors extends VerifyGetErrRequestBase {
    files: readonly any[];
    skip?: readonly (SkipErrors | undefined)[];
}
export interface GetErrForProjectDiagnostics {
    project: string | File;
    files: readonly (string | File)[];
    skip?: CheckAllErrors["skip"];
}
export interface SyncDiagnostics {
    file: string | File;
    project?: string | File;
}
export interface VerifyGetErrScenario {
    scenario: string;
    subScenario: string;
    allFiles: () => readonly File[];
    openFiles: () => readonly File[];
    getErrRequest: () => VerifyGetErrRequest["files"];
    getErrForProjectRequest: () => readonly GetErrForProjectDiagnostics[];
    syncDiagnostics: () => readonly SyncDiagnostics[];
}
export declare function verifyGetErrScenario(scenario: VerifyGetErrScenario): void;
export declare function createHostWithSolutionBuild(files: readonly FileOrFolderOrSymLink[], rootNames: readonly string[]): TestServerHost;
export declare function forEachTscWatchEdit(session: TestSession, edits: readonly TscWatchCompileChange[], action: () => void): void;
export {};
//# sourceMappingURL=tsserver.d.ts.map