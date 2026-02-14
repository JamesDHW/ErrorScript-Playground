import { WatchUtils } from "../../../harness/watchUtils.js";
import { CreateDirectoryWatcherEventBody, CreateFileWatcherEventBody } from "../../../server/protocol.js";
import { FileSystemEntryKind, FileWatcherCallback, FileWatcherEventKind, FormatDiagnosticsHost, FsWatchCallback, FsWatchWorkerWatcher, HostWatchDirectory, HostWatchFile, ModuleImportResult, ModuleResolutionHost, Path, PollingInterval, server, SortedArray } from "../../_namespaces/ts.js";
import { typingsInstaller } from "../../_namespaces/ts.server.js";
export declare const libFile: File;
export declare const enum TestServerHostOsFlavor {
    Windows = 0,
    MacOs = 1,
    Linux = 2
}
export interface TestServerHostCreationParameters {
    useCaseSensitiveFileNames?: boolean;
    executingFilePath?: string;
    currentDirectory?: string;
    newLine?: string;
    windowsStyleRoot?: string;
    environmentVariables?: Map<string, string>;
    runWithFallbackPolling?: boolean;
    osFlavor?: TestServerHostOsFlavor;
    typingsInstallerGlobalCacheLocation?: string;
    typingsInstallerTypesRegistry?: string | readonly string[];
}
export interface WatchableExempt {
    /** Add this field to true only if its the interesting scenario about what to watch  */
    watchableExempt?: boolean;
}
export interface File extends WatchableExempt {
    path: string;
    content: string;
    fileSize?: number;
}
export interface Folder extends WatchableExempt {
    path: string;
}
export interface SymLink extends WatchableExempt {
    /** Location of the symlink. */
    path: string;
    /** Relative path to the real file. */
    symLink: string;
}
export interface LibFile extends WatchableExempt {
    path: string;
    libFile: true;
}
export type FileOrFolderOrSymLink = File | Folder | SymLink;
export type FileOrFolderOrSymLinkOrLibFile = FileOrFolderOrSymLink | LibFile;
export interface FileOrFolderOrSymLinkMap {
    [path: string]: string | Omit<File, "path"> | Omit<SymLink, "path"> | undefined;
}
export declare function isFile(fileOrFolderOrSymLink: FileOrFolderOrSymLinkOrLibFile): fileOrFolderOrSymLink is File | LibFile;
export declare function isSymLink(fileOrFolderOrSymLink: FileOrFolderOrSymLinkOrLibFile): fileOrFolderOrSymLink is SymLink;
interface FSEntryBase {
    path: Path;
    fullPath: string;
    modifiedTime: Date;
}
interface FsFile extends FSEntryBase {
    content: string;
    fileSize?: number;
}
interface FsLibFile extends FSEntryBase {
    content?: string;
    libFile: true;
}
interface FsFolder extends FSEntryBase {
    entries: SortedArray<FSEntry>;
}
interface FsSymLink extends FSEntryBase {
    symLink: string;
}
export type FSEntry = FsFile | FsFolder | FsSymLink | FsLibFile;
export type FSFileOrLibFile = FsFile | FsLibFile;
export declare function isFsFile(s: FSEntry | undefined): s is FsFile;
export interface StateLogger {
    log(s: string): void;
    logs: string[];
}
interface CallbackData {
    cb: TimeOutCallback;
    args: any[];
    ms: number | undefined;
    time: number;
}
declare class Callbacks {
    private host;
    readonly callbackType: string;
    private readonly swallowExitException?;
    readonly map: Map<number, CallbackData>;
    private nextId;
    invoke: (invokeKey?: number) => void;
    private hasChanges;
    private serializedKeys;
    constructor(host: TestServerHost, callbackType: string, swallowExitException?: boolean | undefined);
    getNextId(): number;
    register(cb: TimeOutCallback, args: any[], ms?: number): number;
    unregister(id: any): void;
    log(logChanges?: boolean): string;
    private invokeCallback;
    invokeWorker(invokeKey?: number): void;
    switchToBaseliningInvoke(logger: StateLogger, serializeOutputOrder: SerializeOutputOrder): void;
    serialize(baseline: string[]): void;
}
type TimeOutCallback = (...args: any[]) => void;
export interface TestFileWatcher {
    cb: FileWatcherCallback;
    pollingInterval: PollingInterval;
    event?: CreateFileWatcherEventBody;
}
export interface TestFsWatcher {
    cb: FsWatchCallback;
    inode: number | undefined;
    event?: CreateDirectoryWatcherEventBody;
}
export interface WatchInvokeOptions {
    /** Invokes the directory watcher for the parent instead of the file changed */
    invokeDirectoryWatcherInsteadOfFileChanged: boolean;
    /** When new file is created, do not invoke watches for it */
    ignoreWatchInvokedWithTriggerAsFileCreate: boolean;
    /** Invoke the file delete, followed by create instead of file changed */
    invokeFileDeleteCreateAsPartInsteadOfChange: boolean;
    /** Dont invoke delete watches */
    ignoreDelete: boolean;
    /** ignore all watches */
    ignoreWatches?: boolean;
    /** Skip inode check on file or folder create*/
    skipInodeCheckOnCreate: boolean;
    /** When invoking rename event on fs watch, send event with file name suffixed with tilde */
    useTildeAsSuffixInRenameEventFileName: boolean;
}
export declare enum Tsc_WatchFile {
    DynamicPolling = "DynamicPriorityPolling"
}
export declare enum Tsc_WatchDirectory {
    WatchFile = "RecursiveDirectoryUsingFsWatchFile",
    NonRecursiveWatchDirectory = "RecursiveDirectoryUsingNonRecursiveWatchDirectory",
    DynamicPolling = "RecursiveDirectoryUsingDynamicPriorityPolling"
}
export interface TestServerHostOptions {
    useCaseSensitiveFileNames: boolean;
    executingFilePath: string;
    currentDirectory: string;
    newLine?: string;
    useWindowsStylePaths?: boolean;
    environmentVariables?: Map<string, string>;
}
export type PendingInstallCallback = (pendingInstallInfo: string, installedTypingsOrSuccess: string[] | string | boolean, typingFiles: readonly File[], onRequestCompleted: typingsInstaller.RequestCompletedAction) => void;
export declare enum SerializeOutputOrder {
    None = 0,
    BeforeDiff = 1,
    AfterDiff = 2
}
export type TestServerHostSnapshot = Map<Path, FSEntry>;
export declare function cloneFsMap(fs: Map<Path, FSEntry>): TestServerHostSnapshot;
export declare class TestServerHost implements server.ServerHost, FormatDiagnosticsHost, ModuleResolutionHost {
    args: string[];
    private readonly output;
    private fs;
    private time;
    getCanonicalFileName: (s: string) => string;
    toPath: (f: string) => Path;
    readonly timeoutCallbacks: Callbacks;
    readonly immediateCallbacks: Callbacks;
    readonly pendingInstalls: Callbacks;
    readonly screenClears: number[];
    readonly watchUtils: WatchUtils<TestFileWatcher, TestFsWatcher>;
    runWithFallbackPolling: boolean;
    readonly useCaseSensitiveFileNames: boolean;
    readonly newLine: string;
    readonly windowsStyleRoot?: string;
    private readonly environmentVariables?;
    private readonly executingFilePath;
    private readonly currentDirectory;
    require?: (initialPath: string, moduleName: string) => ModuleImportResult;
    importPlugin?: (root: string, moduleName: string) => Promise<ModuleImportResult>;
    storeSignatureInfo: boolean;
    watchFile: HostWatchFile;
    private inodeWatching;
    private readonly inodes?;
    watchDirectory: HostWatchDirectory;
    service?: server.ProjectService;
    osFlavor: TestServerHostOsFlavor;
    preferNonRecursiveWatch: boolean;
    globalTypingsCacheLocation: string;
    private readonly typesRegistry;
    private constructor();
    private ensureLib;
    ensureTypingRegistryFile(): void;
    static createWatchedSystem(fileOrFolderList: FileOrFolderOrSymLinkMap | readonly FileOrFolderOrSymLink[], params?: Omit<TestServerHostCreationParameters, "typingsInstallerGlobalCacheLocation" | "typingsInstallerTypesRegistry">): TestServerHost;
    static createServerHost(fileOrFolderList: FileOrFolderOrSymLinkMap | readonly FileOrFolderOrSymLink[], params?: Omit<TestServerHostCreationParameters, "currentDirectory"> & {
        overrideCurrentDirectory?: string;
    }): TestServerHost;
    static getCreateWatchedSystem(forTsserver: boolean | undefined): typeof TestServerHost.createWatchedSystem | typeof TestServerHost.createServerHost;
    private nextInode;
    private setInode;
    writeOutputIsTTY(): boolean;
    getNewLine(): string;
    toNormalizedAbsolutePath(s: string): string;
    toFullPath(s: string): Path;
    getHostSpecificPath(s: string): string;
    now(): Date;
    getTime(): number;
    setTime(time: number): void;
    switchToBaseliningInvoke(logger: StateLogger, serializeOutputOrder: SerializeOutputOrder): void;
    private ensureInitialFileOrFolder;
    private reloadFS;
    modifyFile(filePath: string, content: string, options?: Partial<WatchInvokeOptions>): void;
    renameFile(fileName: string, newFileName: string): void;
    renameFolder(folderName: string, newFolderName: string, skipFolderEntryWatches?: true): void;
    private renameFolderEntries;
    ensureFileOrFolder(fileOrDirectoryOrSymLink: FileOrFolderOrSymLinkOrLibFile, ignoreWatchInvokedWithTriggerAsFileCreate?: boolean, ignoreParentWatch?: boolean, options?: Partial<WatchInvokeOptions>): void;
    private ensureFolder;
    private addFileOrFolderInFolder;
    private removeFileOrFolder;
    rimrafSync(fileOrFolderPath: string): void;
    deleteFile(filePath: string): void;
    deleteFolder(folderPath: string, recursive?: boolean): void;
    private watchFileWorker;
    fsWatchWorker(fileOrDirectory: string, recursive: boolean, cb: FsWatchCallback): FsWatchWorkerWatcher;
    invokeFileWatcher(fileFullPath: string, eventKind: FileWatcherEventKind, modifiedTime: Date | undefined): void;
    private fsWatchCallback;
    invokeFsWatchesCallbacks(fullPath: string, eventName: "rename" | "change", eventFullPath: string | undefined, useTildeSuffix?: boolean): void;
    invokeFsWatchesRecursiveCallbacks(fullPath: string, eventName: "rename" | "change", eventFullPath: string | undefined, useTildeSuffix?: boolean): void;
    private getRelativePathToDirectory;
    private invokeRecursiveFsWatches;
    invokeFsWatches(fullPath: string, eventName: "rename" | "change", eventFullPath: string | undefined, useTildeSuffix: boolean | undefined): void;
    private invokeFileAndFsWatches;
    private toFsEntry;
    private toFsFileOrLibFile;
    private toFsSymLink;
    private toFsFolder;
    private getRealFsEntry;
    private isFsFile;
    private getRealFile;
    private isFsFolder;
    private getRealFolder;
    private getRealFileOrFolder;
    fileSystemEntryExists(s: string, entryKind: FileSystemEntryKind): boolean;
    fileExists(s: string): boolean;
    getModifiedTime(s: string): Date | undefined;
    setModifiedTime(s: string, date: Date): void;
    readFile(s: string): string | undefined;
    getFileSize(s: string): number;
    directoryExists(s: string): boolean;
    getDirectories(s: string): string[];
    readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[];
    createHash(s: string): string;
    createSHA256Hash(s: string): string;
    setTimeout(callback: TimeOutCallback, ms: number, ...args: any[]): number;
    getNextTimeoutId(): number;
    clearTimeout(timeoutId: any): void;
    clearScreen(): void;
    runQueuedTimeoutCallbacks(timeoutId?: number): void;
    runQueuedImmediateCallbacks(): void;
    setImmediate(callback: TimeOutCallback, ...args: any[]): number;
    clearImmediate(timeoutId: any): void;
    scheduleInstall(cb: TimeOutCallback, ...args: any[]): void;
    runPendingInstalls(): void;
    createDirectory(directoryName: string): void;
    writeFile(path: string, content: string): void;
    prependFile(path: string, content: string, options?: Partial<WatchInvokeOptions>): void;
    appendFile(path: string, content: string, options?: Partial<WatchInvokeOptions>): void;
    replaceFileText(file: string, searchValue: string | RegExp, replaceValue: string): void;
    write(message: string): void;
    getOutput(): readonly string[];
    clearOutput(): void;
    serializeOutput(baseline: string[]): void;
    getSnap(): TestServerHostSnapshot;
    private snap;
    serializeState(baseline: string[], serializeOutput: SerializeOutputOrder): void;
    writtenFiles?: Map<Path, number>;
    private serializedDiff;
    diff(baseline: string[]): void;
    serializeWatches(baseline?: string[]): string[];
    realpath(s: string): string;
    exitCode: number | undefined;
    readonly resolvePath: (s: string) => string;
    readonly getExecutingFilePath: () => string;
    readonly getCurrentDirectory: () => string;
    exit(exitCode?: number): void;
    getEnvironmentVariable(name: string): string;
}
export type TestServerHostTrackingWrittenFiles = TestServerHost & {
    writtenFiles: Map<Path, number>;
};
export declare function changeToHostTrackingWrittenFiles(inputHost: TestServerHost): TestServerHostTrackingWrittenFiles;
export declare function osFlavorToString(osFlavor: TestServerHostOsFlavor): "Windows" | "MacOs" | "Linux";
export {};
//# sourceMappingURL=virtualFileSystemWithWatch.d.ts.map