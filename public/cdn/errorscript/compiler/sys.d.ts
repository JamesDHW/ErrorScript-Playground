import { FileSystemEntries, ModuleImportResult, WatchOptions } from "./_namespaces/ts.js";
/**
 * djb2 hashing algorithm
 * http://www.cse.yorku.ca/~oz/hash.html
 *
 * @internal
 */
export declare function generateDjb2Hash(data: string): string;
/**
 * Set a high stack trace limit to provide more information in case of an error.
 * Called for command-line and server use cases.
 * Not called if TypeScript is used as a library.
 *
 * @internal
 */
export declare function setStackTraceLimit(): void;
export declare enum FileWatcherEventKind {
    Created = 0,
    Changed = 1,
    Deleted = 2
}
export type FileWatcherCallback = (fileName: string, eventKind: FileWatcherEventKind, modifiedTime?: Date) => void;
export type DirectoryWatcherCallback = (fileName: string) => void;
/** @internal */
export declare enum PollingInterval {
    High = 2000,
    Medium = 500,
    Low = 250
}
/** @internal */
export type HostWatchFile = (fileName: string, callback: FileWatcherCallback, pollingInterval: PollingInterval, options: WatchOptions | undefined) => FileWatcher;
/** @internal */
export type HostWatchDirectory = (fileName: string, callback: DirectoryWatcherCallback, recursive: boolean, options: WatchOptions | undefined) => FileWatcher;
/** @internal */
export declare const missingFileModifiedTime: Date;
/** @internal */
export declare function getModifiedTime(host: {
    getModifiedTime: NonNullable<System["getModifiedTime"]>;
}, fileName: string): Date;
/** @internal */
export declare let unchangedPollThresholds: {
    [K in PollingInterval]: number;
};
/** @internal */
export declare function getFileWatcherEventKind(oldTime: number, newTime: number): FileWatcherEventKind;
/** @internal */
export declare const ignoredPaths: readonly string[];
/** @internal */
export declare function sysLog(s: string): void;
/** @internal */
export declare function setSysLog(logger: typeof sysLog): void;
/** @internal */
export type FsWatchCallback = (eventName: "rename" | "change", relativeFileName: string | undefined | null, modifiedTime?: Date) => void;
/** @internal */
export type FsWatch = (fileOrDirectory: string, entryKind: FileSystemEntryKind, callback: FsWatchCallback, recursive: boolean, fallbackPollingInterval: PollingInterval, fallbackOptions: WatchOptions | undefined) => FileWatcher;
/** @internal */
export interface FsWatchWorkerWatcher extends FileWatcher {
    on(eventName: string, listener: () => void): void;
}
/** @internal */
export type FsWatchWorker = (fileOrDirectory: string, recursive: boolean, callback: FsWatchCallback) => FsWatchWorkerWatcher;
/** @internal */
export declare const enum FileSystemEntryKind {
    File = 0,
    Directory = 1
}
/** @internal */
export type FileSystemEntryExists = (fileorDirectrory: string, entryKind: FileSystemEntryKind) => boolean;
/** @internal */
export interface CreateSystemWatchFunctions {
    pollingWatchFileWorker: HostWatchFile;
    getModifiedTime: NonNullable<System["getModifiedTime"]>;
    setTimeout: NonNullable<System["setTimeout"]>;
    clearTimeout: NonNullable<System["clearTimeout"]>;
    fsWatchWorker: FsWatchWorker;
    fileSystemEntryExists: FileSystemEntryExists;
    useCaseSensitiveFileNames: boolean;
    getCurrentDirectory: System["getCurrentDirectory"];
    fsSupportsRecursiveFsWatch: boolean;
    getAccessibleSortedChildDirectories(path: string): readonly string[];
    realpath(s: string): string;
    tscWatchFile: string | undefined;
    useNonPollingWatchers?: boolean;
    tscWatchDirectory: string | undefined;
    inodeWatching: boolean;
    fsWatchWithTimestamp: boolean | undefined;
    sysLog: (s: string) => void;
}
/** @internal */
export declare function createSystemWatchFunctions({ pollingWatchFileWorker, getModifiedTime, setTimeout, clearTimeout, fsWatchWorker, fileSystemEntryExists, useCaseSensitiveFileNames, getCurrentDirectory, fsSupportsRecursiveFsWatch, getAccessibleSortedChildDirectories, realpath, tscWatchFile, useNonPollingWatchers, tscWatchDirectory, inodeWatching, fsWatchWithTimestamp, sysLog, }: CreateSystemWatchFunctions): {
    watchFile: HostWatchFile;
    watchDirectory: HostWatchDirectory;
};
/**
 * patch writefile to create folder before writing the file
 *
 * @internal
 */
export declare function patchWriteFileEnsuringDirectory(sys: System): void;
export type BufferEncoding = "ascii" | "utf8" | "utf-8" | "utf16le" | "ucs2" | "ucs-2" | "base64" | "latin1" | "binary" | "hex";
export interface System {
    args: string[];
    newLine: string;
    useCaseSensitiveFileNames: boolean;
    write(s: string): void;
    writeOutputIsTTY?(): boolean;
    getWidthOfTerminal?(): number;
    readFile(path: string, encoding?: string): string | undefined;
    getFileSize?(path: string): number;
    writeFile(path: string, data: string, writeByteOrderMark?: boolean): void;
    /**
     * @pollingInterval - this parameter is used in polling-based watchers and ignored in watchers that
     * use native OS file watching
     */
    watchFile?(path: string, callback: FileWatcherCallback, pollingInterval?: number, options?: WatchOptions): FileWatcher;
    watchDirectory?(path: string, callback: DirectoryWatcherCallback, recursive?: boolean, options?: WatchOptions): FileWatcher;
    /**@internal */ preferNonRecursiveWatch?: boolean;
    resolvePath(path: string): string;
    fileExists(path: string): boolean;
    directoryExists(path: string): boolean;
    createDirectory(path: string): void;
    getExecutingFilePath(): string;
    getCurrentDirectory(): string;
    getDirectories(path: string): string[];
    readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[];
    getModifiedTime?(path: string): Date | undefined;
    setModifiedTime?(path: string, time: Date): void;
    deleteFile?(path: string): void;
    /**
     * A good implementation is node.js' `crypto.createHash`. (https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm)
     */
    createHash?(data: string): string;
    /** This must be cryptographically secure. Only implement this method using `crypto.createHash("sha256")`. */
    createSHA256Hash?(data: string): string;
    getMemoryUsage?(): number;
    exit(exitCode?: number): void;
    /** @internal */ enableCPUProfiler?(path: string, continuation: () => void): boolean;
    /** @internal */ disableCPUProfiler?(continuation: () => void): boolean;
    /** @internal */ cpuProfilingEnabled?(): boolean;
    realpath?(path: string): string;
    /** @internal */ getEnvironmentVariable(name: string): string;
    /** @internal */ tryEnableSourceMapsForHost?(): void;
    /** @internal */ getAccessibleFileSystemEntries?(path: string): FileSystemEntries;
    /** @internal */ debugMode?: boolean;
    setTimeout?(callback: (...args: any[]) => void, ms: number, ...args: any[]): any;
    clearTimeout?(timeoutId: any): void;
    clearScreen?(): void;
    /** @internal */ setBlocking?(): void;
    base64decode?(input: string): string;
    base64encode?(input: string): string;
    /** @internal */ require?(baseDir: string, moduleName: string): ModuleImportResult;
    /** @internal */ now?(): Date;
    /** @internal */ storeSignatureInfo?: boolean;
}
export interface FileWatcher {
    close(): void;
}
export declare let sys: System;
/** @internal @knipignore */
export declare function setSys(s: System): void;
//# sourceMappingURL=sys.d.ts.map