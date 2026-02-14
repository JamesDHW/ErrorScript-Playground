import * as fakes from "./_namespaces/fakes.js";
import * as ts from "./_namespaces/ts.js";
import * as vfs from "./_namespaces/vfs.js";
import { LoggerWithInMemoryLogs } from "./tsserverLogger.js";
export declare function makeDefaultProxy(info: ts.server.PluginCreateInfo): ts.LanguageService;
export declare class ScriptInfo {
    fileName: string;
    content: string;
    isRootFile: boolean;
    version: number;
    editRanges: {
        length: number;
        textChangeRange: ts.TextChangeRange;
    }[];
    private lineMap;
    constructor(fileName: string, content: string, isRootFile: boolean);
    private setContent;
    getLineMap(): number[];
    updateContent(content: string): void;
    editContent(start: number, end: number, newText: string): void;
    getTextChangeRangeBetweenVersions(startVersion: number, endVersion: number): ts.TextChangeRange;
}
declare class DefaultHostCancellationToken implements ts.HostCancellationToken {
    static readonly instance: DefaultHostCancellationToken;
    isCancellationRequested(): boolean;
}
export interface LanguageServiceAdapter {
    getHost(): LanguageServiceAdapterHost;
    getLanguageService(): ts.LanguageService;
    getClassifier(): ts.Classifier;
    getPreProcessedFileInfo(fileName: string, fileContents: string): ts.PreProcessedFileInfo;
    getLogger(): LoggerWithInMemoryLogs | undefined;
}
export declare abstract class LanguageServiceAdapterHost {
    protected cancellationToken: DefaultHostCancellationToken;
    protected settings: ts.CompilerOptions;
    readonly sys: fakes.System;
    typesRegistry: Map<string, void> | undefined;
    private scriptInfos;
    jsDocParsingMode: ts.JSDocParsingMode | undefined;
    constructor(cancellationToken?: DefaultHostCancellationToken, settings?: ts.CompilerOptions);
    get vfs(): vfs.FileSystem;
    getNewLine(): string;
    getFilenames(): string[];
    realpath(path: string): string;
    fileExists(path: string): boolean;
    readFile(path: string): string | undefined;
    directoryExists(path: string): boolean;
    getScriptInfo(fileName: string): ScriptInfo | undefined;
    addScript(fileName: string, content: string, isRootFile: boolean): void;
    renameFileOrDirectory(oldPath: string, newPath: string): void;
    editScript(fileName: string, start: number, end: number, newText: string): void;
    openFile(_fileName: string, _content?: string, _scriptKindName?: string): void;
    /**
     * @param line 0 based index
     * @param col 0 based index
     */
    positionToLineAndCharacter(fileName: string, position: number): ts.LineAndCharacter;
    lineAndCharacterToPosition(fileName: string, lineAndCharacter: ts.LineAndCharacter): number;
    useCaseSensitiveFileNames(): boolean;
}
/** TypeScript Typings Installer global cache location for the tests */
export declare const harnessTypingInstallerCacheLocation = "/home/src/Library/Caches/typescript";
declare class NativeLanguageServiceHost extends LanguageServiceAdapterHost implements ts.LanguageServiceHost, LanguageServiceAdapterHost {
    isKnownTypesPackageName(name: string): boolean;
    getGlobalTypingsCacheLocation(): string;
    installPackage: typeof ts.notImplemented;
    getCompilationSettings(): ts.CompilerOptions;
    getCancellationToken(): DefaultHostCancellationToken;
    getDirectories(path: string): string[];
    getCurrentDirectory(): string;
    getDefaultLibFileName(): string;
    getScriptFileNames(): string[];
    getScriptSnapshot(fileName: string): ts.IScriptSnapshot | undefined;
    getScriptKind(): ts.ScriptKind;
    getScriptVersion(fileName: string): string;
    directoryExists(dirName: string): boolean;
    fileExists(fileName: string): boolean;
    readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[];
    readFile(path: string): string | undefined;
    realpath(path: string): string;
    getTypeRootsVersion(): number;
    log: typeof ts.noop;
    trace: typeof ts.noop;
    error: typeof ts.noop;
}
export declare class NativeLanguageServiceAdapter implements LanguageServiceAdapter {
    private host;
    private documentRegistry;
    getLogger: typeof ts.returnUndefined;
    constructor(cancellationToken?: ts.HostCancellationToken, options?: ts.CompilerOptions);
    getHost(): LanguageServiceAdapterHost;
    getLanguageService(): ts.LanguageService;
    getClassifier(): ts.Classifier;
    getPreProcessedFileInfo(fileName: string, fileContents: string): ts.PreProcessedFileInfo;
}
/**
 * This is set to vscode so that in tsserver tests its what is expected
 * and is unrelated and is error to not specify for tsc tests
 */
export declare const harnessSessionCurrentDirectory = "/home/src/Vscode/Projects/bin";
declare class SessionClientHost extends NativeLanguageServiceHost implements ts.server.SessionClientHost {
    private client;
    constructor(cancellationToken: ts.HostCancellationToken | undefined, settings: ts.CompilerOptions | undefined);
    getCurrentDirectory(): string;
    onMessage: typeof ts.noop;
    writeMessage: typeof ts.noop;
    setClient(client: ts.server.SessionClient): void;
    openFile(fileName: string, content?: string, scriptKindName?: "TS" | "JS" | "TSX" | "JSX"): void;
    editScript(fileName: string, start: number, end: number, newText: string): void;
}
export declare class ServerLanguageServiceAdapter implements LanguageServiceAdapter {
    private host;
    private client;
    private server;
    private logger;
    constructor(cancellationToken?: ts.HostCancellationToken, options?: ts.CompilerOptions);
    getLogger(): LoggerWithInMemoryLogs;
    getHost(): SessionClientHost;
    getLanguageService(): ts.LanguageService;
    getClassifier(): ts.Classifier;
    getPreProcessedFileInfo(): ts.PreProcessedFileInfo;
    assertTextConsistent(fileName: string): void;
}
export {};
//# sourceMappingURL=harnessLanguageService.d.ts.map