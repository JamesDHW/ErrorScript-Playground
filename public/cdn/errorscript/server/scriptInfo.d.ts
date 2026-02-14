import { DocumentPositionMapper, DocumentRegistryBucketKeyWithMode, FileWatcher, FormatCodeSettings, IScriptSnapshot, LineInfo, Path, ScriptKind, SourceFile, SourceFileLike, TextSpan } from "./_namespaces/ts.js";
import { AbsolutePositionAndLineText, NormalizedPath, Project, ScriptVersionCache, ServerHost } from "./_namespaces/ts.server.js";
import * as protocol from "./protocol.js";
/** @internal */
export declare class TextStorage {
    private readonly host;
    private readonly info;
    version: number;
    /**
     * Generated only on demand (based on edits, or information requested)
     * The property text is set to undefined when edits happen on the cache
     */
    private svc;
    /**
     * Stores the text when there are no changes to the script version cache
     * The script version cache is generated on demand and text is still retained.
     * Only on edits to the script version cache, the text will be set to undefined
     */
    private text;
    private textSnapshot;
    /**
     * Line map for the text when there is no script version cache present
     */
    private lineMap;
    /**
     * When a large file is loaded, text will artificially be set to "".
     * In order to be able to report correct telemetry, we store the actual
     * file size in this case.  (In other cases where text === "", e.g.
     * for mixed content or dynamic files, fileSize will be undefined.)
     */
    private fileSize;
    /**
     * True if the text is for the file thats open in the editor
     */
    isOpen: boolean;
    /**
     * True if the text present is the text from the file on the disk
     */
    private ownFileText;
    /**
     * True when reloading contents of file from the disk is pending
     */
    pendingReloadFromDisk: boolean;
    constructor(host: ServerHost, info: ScriptInfo, initialVersion?: number);
    getVersion(): string;
    hasScriptVersionCache_TestOnly(): boolean;
    private resetSourceMapInfo;
    /** Public for testing */
    useText(newText: string): void;
    edit(start: number, end: number, newText: string): void;
    /**
     * Set the contents as newText
     * returns true if text changed
     */
    reload(newText: string): boolean;
    /**
     * Reads the contents from tempFile(if supplied) or own file and sets it as contents
     * returns true if text changed
     */
    reloadWithFileText(tempFileName?: string): boolean;
    /**
     * Schedule reload from the disk if its not already scheduled and its not own text
     * returns true when scheduling reload
     */
    scheduleReloadIfNeeded(): boolean;
    delayReloadFromFileIntoText(): void;
    /**
     * For telemetry purposes, we would like to be able to report the size of the file.
     * However, we do not want telemetry to require extra file I/O so we report a size
     * that may be stale (e.g. may not reflect change made on disk since the last reload).
     * NB: Will read from disk if the file contents have never been loaded because
     * telemetry falsely indicating size 0 would be counter-productive.
     */
    getTelemetryFileSize(): number;
    getSnapshot(): IScriptSnapshot;
    getAbsolutePositionAndLineText(oneBasedLine: number): AbsolutePositionAndLineText;
    /**
     *  @param line 0 based index
     */
    lineToTextSpan(line: number): TextSpan;
    /**
     * @param line 1 based index
     * @param offset 1 based index
     */
    lineOffsetToPosition(line: number, offset: number, allowEdits?: true): number;
    positionToLineOffset(position: number): protocol.Location;
    private getFileTextAndSize;
    /** @internal */
    switchToScriptVersionCache(): ScriptVersionCache;
    private tryUseScriptVersionCache;
    private getOrLoadText;
    private getLineMap;
    getLineInfo(): LineInfo;
}
export declare function isDynamicFileName(fileName: NormalizedPath): boolean;
/** @internal */
export interface DocumentRegistrySourceFileCache {
    key: DocumentRegistryBucketKeyWithMode;
    sourceFile: SourceFile;
}
/** @internal */
export interface SourceMapFileWatcher {
    watcher: FileWatcher;
    sourceInfos?: Set<Path>;
}
export declare class ScriptInfo {
    private readonly host;
    readonly fileName: NormalizedPath;
    readonly scriptKind: ScriptKind;
    readonly hasMixedContent: boolean;
    readonly path: Path;
    /**
     * All projects that include this file
     */
    readonly containingProjects: Project[];
    private formatSettings;
    private preferences;
    /** @internal */
    fileWatcher: FileWatcher | undefined;
    /** @internal */
    readonly textStorage: TextStorage;
    /** @internal */
    readonly isDynamic: boolean;
    /**
     * Set to real path if path is different from info.path
     */
    private realpath;
    /** @internal */
    cacheSourceFile: DocumentRegistrySourceFileCache | undefined;
    /** @internal */
    mTime?: number;
    /** @internal */
    sourceFileLike?: SourceFileLike;
    /** @internal */
    sourceMapFilePath?: Path | SourceMapFileWatcher | false;
    /** @internal */
    declarationInfoPath?: Path;
    /** @internal */
    sourceInfos?: Set<Path>;
    /** @internal */
    documentPositionMapper?: DocumentPositionMapper | false;
    /** @internal */
    deferredDelete?: boolean;
    constructor(host: ServerHost, fileName: NormalizedPath, scriptKind: ScriptKind, hasMixedContent: boolean, path: Path, initialVersion?: number);
    /** @internal */
    isDynamicOrHasMixedContent(): boolean;
    isScriptOpen(): boolean;
    open(newText: string | undefined): void;
    close(fileExists?: boolean): void;
    getSnapshot(): IScriptSnapshot;
    private ensureRealPath;
    /** @internal */
    getRealpathIfDifferent(): Path | undefined;
    /**
     * @internal
     * Does not compute realpath; uses precomputed result. Use `ensureRealPath`
     * first if a definite result is needed.
     */
    isSymlink(): boolean | undefined;
    getFormatCodeSettings(): FormatCodeSettings | undefined;
    getPreferences(): protocol.UserPreferences | undefined;
    attachToProject(project: Project): boolean;
    isAttached(project: Project): boolean;
    detachFromProject(project: Project): void;
    detachAllProjects(): void;
    getDefaultProject(): Project;
    registerFileUpdate(): void;
    setOptions(formatSettings: FormatCodeSettings, preferences: protocol.UserPreferences | undefined): void;
    getLatestVersion(): string;
    saveTo(fileName: string): void;
    /** @internal */
    delayReloadNonMixedContentFile(): void;
    reloadFromFile(tempFileName?: NormalizedPath): boolean;
    editContent(start: number, end: number, newText: string): void;
    markContainingProjectsAsDirty(): void;
    isOrphan(): boolean;
    /**
     *  @param line 1 based index
     */
    lineToTextSpan(line: number): TextSpan;
    /**
     * @param line 1 based index
     * @param offset 1 based index
     */
    lineOffsetToPosition(line: number, offset: number): number;
    /** @internal */
    lineOffsetToPosition(line: number, offset: number, allowEdits?: true): number;
    positionToLineOffset(position: number): protocol.Location;
    isJavaScript(): boolean;
    /** @internal */
    closeSourceMapFileWatcher(): void;
}
/** @internal */
export declare function scriptInfoIsContainedByBackgroundProject(info: ScriptInfo): boolean;
/** @internal */
export declare function scriptInfoIsContainedByDeferredClosedProject(info: ScriptInfo): boolean;
//# sourceMappingURL=scriptInfo.d.ts.map