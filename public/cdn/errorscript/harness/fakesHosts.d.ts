import * as documents from "./_namespaces/documents.js";
import * as ts from "./_namespaces/ts.js";
import * as vfs from "./_namespaces/vfs.js";
export interface SystemOptions {
    executingFilePath?: string;
    newLine?: "\r\n" | "\n";
    env?: Record<string, string>;
}
/**
 * A fake `ts.System` that leverages a virtual file system.
 */
export declare class System implements ts.System {
    readonly vfs: vfs.FileSystem;
    readonly args: string[];
    readonly output: string[];
    readonly newLine: string;
    readonly useCaseSensitiveFileNames: boolean;
    exitCode: number | undefined;
    private readonly _executingFilePath;
    private readonly _env;
    constructor(vfs: vfs.FileSystem, { executingFilePath, newLine, env }?: SystemOptions);
    private testTerminalWidth;
    getWidthOfTerminal: (() => number) | undefined;
    writeOutputIsTTY(): boolean;
    write(message: string): void;
    readFile(path: string): string | undefined;
    writeFile(path: string, data: string, writeByteOrderMark?: boolean): void;
    deleteFile(path: string): void;
    fileExists(path: string): boolean;
    directoryExists(path: string): boolean;
    createDirectory(path: string): void;
    getCurrentDirectory(): string;
    getDirectories(path: string): string[];
    readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[];
    getAccessibleFileSystemEntries(path: string): ts.FileSystemEntries;
    exit(exitCode?: number): void;
    getFileSize(path: string): number;
    resolvePath(path: string): string;
    getExecutingFilePath(): string;
    getModifiedTime(path: string): Date;
    setModifiedTime(path: string, time: Date): void;
    createHash(data: string): string;
    realpath(path: string): string;
    getEnvironmentVariable(name: string): string;
    private _getStats;
    now(): Date;
}
/**
 * A fake `ts.ParseConfigHost` that leverages a virtual file system.
 */
export declare class ParseConfigHost implements ts.ParseConfigHost {
    readonly sys: System;
    constructor(sys: System | vfs.FileSystem);
    get vfs(): vfs.FileSystem;
    get useCaseSensitiveFileNames(): boolean;
    fileExists(fileName: string): boolean;
    directoryExists(directoryName: string): boolean;
    readFile(path: string): string | undefined;
    readDirectory(path: string, extensions: string[], excludes: string[], includes: string[], depth: number): string[];
    realpath(path: string): string;
    getDirectories(path: string): string[];
    getCurrentDirectory(): string;
}
/**
 * A fake `ts.CompilerHost` that leverages a virtual file system.
 */
export declare class CompilerHost implements ts.CompilerHost {
    readonly sys: System;
    readonly defaultLibLocation: string;
    readonly outputs: documents.TextDocument[];
    private readonly _outputsMap;
    readonly traces: string[];
    readonly shouldAssertInvariants: boolean;
    readonly jsDocParsingMode: ts.JSDocParsingMode | undefined;
    private _setParentNodes;
    private _sourceFiles;
    private _parseConfigHost;
    private _newLine;
    constructor(sys: System | vfs.FileSystem, options?: ts.CompilerOptions, setParentNodes?: boolean, jsDocParsingMode?: ts.JSDocParsingMode);
    get vfs(): vfs.FileSystem;
    get parseConfigHost(): ParseConfigHost;
    getCurrentDirectory(): string;
    useCaseSensitiveFileNames(): boolean;
    getNewLine(): string;
    getCanonicalFileName(fileName: string): string;
    deleteFile(fileName: string): void;
    fileExists(fileName: string): boolean;
    directoryExists(directoryName: string): boolean;
    getModifiedTime(fileName: string): Date;
    setModifiedTime(fileName: string, time: Date): void;
    getDirectories(path: string): string[];
    readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): string[];
    readFile(path: string): string | undefined;
    writeFile(fileName: string, content: string, writeByteOrderMark: boolean): void;
    trace(s: string): void;
    realpath(path: string): string;
    getDefaultLibLocation(): string;
    getDefaultLibFileName(options: ts.CompilerOptions): string;
    getSourceFile(fileName: string, languageVersionOrOptions: ts.ScriptTarget | ts.CreateSourceFileOptions): ts.SourceFile | undefined;
}
//# sourceMappingURL=fakesHosts.d.ts.map