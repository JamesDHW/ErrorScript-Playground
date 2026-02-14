import { FileWatcher, FileWatcherCallback, GetCanonicalFileName, MultiMap, PollingInterval, System } from "./_namespaces/ts.js";
export declare function ensureWatchablePath(path: string, locationType: string): void;
export interface TestFileWatcher {
    cb: FileWatcherCallback;
    pollingInterval: PollingInterval;
}
export interface TestFsWatcher<DirCallback> {
    cb: DirCallback;
    inode: number | undefined;
}
export interface Watches<Data> {
    add(path: string, data: Data): void;
    remove(path: string, data: Data): void;
    forEach(path: string, cb: (data: Data, path: string) => void): void;
    serialize(baseline: string[]): void;
}
export interface WatchUtils<PollingWatcherData, FsWatcherData> {
    pollingWatches: Watches<PollingWatcherData>;
    fsWatches: Watches<FsWatcherData>;
    fsWatchesRecursive: Watches<FsWatcherData>;
    pollingWatch(path: string, data: PollingWatcherData): FileWatcher;
    fsWatch(path: string, recursive: boolean, data: FsWatcherData): FileWatcher;
    serializeWatches(baseline?: string[]): string[];
    getHasWatchChanges(): boolean;
    setHasWatchChanges(): void;
}
export declare function createWatchUtils<PollingWatcherData, FsWatcherData>(pollingWatchesName: string, fsWatchesName: string, getCanonicalFileName: GetCanonicalFileName, system: Required<Pick<System, "realpath">>): WatchUtils<PollingWatcherData, FsWatcherData>;
export declare function serializeMultiMap<T>(baseline: string[], caption: string, multiMap: MultiMap<string, T>, serialized: Map<string, T[]> | undefined): Map<string, T[]> | undefined;
//# sourceMappingURL=watchUtils.d.ts.map