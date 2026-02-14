import * as compiler from "./_namespaces/compiler.js";
import * as documents from "./_namespaces/documents.js";
import { RunnerBase } from "./_namespaces/Harness.js";
import * as ts from "./_namespaces/ts.js";
import * as vfs from "./_namespaces/vfs.js";
export interface IO {
    newLine(): string;
    getCurrentDirectory(): string;
    useCaseSensitiveFileNames(): boolean;
    resolvePath(path: string): string | undefined;
    getFileSize(path: string): number;
    readFile(path: string): string | undefined;
    writeFile(path: string, contents: string): void;
    directoryName(path: string): string | undefined;
    getDirectories(path: string): string[];
    createDirectory(path: string): void;
    fileExists(fileName: string): boolean;
    directoryExists(path: string): boolean;
    deleteFile(fileName: string): void;
    enumerateTestFiles(runner: RunnerBase): string[];
    listFiles(path: string, filter?: RegExp, options?: {
        recursive?: boolean;
    }): string[];
    log(text: string): void;
    args(): string[];
    getExecutingFilePath(): string;
    getWorkspaceRoot(): string;
    exit(exitCode?: number): void;
    readDirectory(path: string, extension?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): readonly string[];
    getAccessibleFileSystemEntries(dirname: string): ts.FileSystemEntries;
    tryEnableSourceMapsForHost?(): void;
    getEnvironmentVariable?(name: string): string;
    getMemoryUsage?(): number | undefined;
    joinPath(...components: string[]): string;
}
export declare let IO: IO;
export declare function setHarnessIO(io: IO): void;
export declare const harnessNewLine = "\r\n";
export declare const virtualFileSystemRoot = "/";
export declare function mockHash(s: string): string;
export declare const libFolder = "built/local/";
export type SourceMapEmitterCallback = (emittedFile: string, emittedLine: number, emittedColumn: number, sourceFile: string, sourceLine: number, sourceColumn: number, sourceName: string) => void;
export declare let userSpecifiedRoot: string;
export declare let lightMode: boolean;
export declare function setLightMode(flag: boolean): void;
/** Functionality for compiling TypeScript code */
export declare namespace Compiler {
    /** Aggregate various writes into a single array of lines. Useful for passing to the
     *  TypeScript compiler to fill with source code or errors.
     */
    export class WriterAggregator {
        lines: string[];
        currentLine: string;
        Write(str: string): void;
        WriteLine(str: string): void;
        Close(): void;
        reset(): void;
    }
    export function createSourceFileAndAssertInvariants(fileName: string, sourceText: string, languageVersionOrOptions: ts.ScriptTarget | ts.CreateSourceFileOptions): ts.SourceFile;
    export const fourslashFileName = "fourslash.ts";
    export let fourslashSourceFile: ts.SourceFile;
    export function getCanonicalFileName(fileName: string): string;
    interface HarnessOptions {
        useCaseSensitiveFileNames?: boolean;
        baselineFile?: string;
        noTypesAndSymbols?: boolean;
        captureSuggestions?: boolean;
    }
    export function setCompilerOptionsFromHarnessSetting(settings: TestCaseParser.CompilerSettings, options: ts.CompilerOptions & HarnessOptions): void;
    export interface TestFile {
        unitName: string;
        content: string;
        fileOptions?: any;
    }
    export type CompileFilesResult = compiler.CompilationResult & {
        repeat(newOptions: TestCaseParser.CompilerSettings): CompileFilesResult;
    };
    export function compileFiles(inputFiles: TestFile[], otherFiles: TestFile[], harnessSettings: TestCaseParser.CompilerSettings | undefined, compilerOptions: ts.CompilerOptions | undefined, currentDirectory: string | undefined, symlinks?: vfs.FileSet): CompileFilesResult;
    export interface DeclarationCompilationContext {
        declInputFiles: TestFile[];
        declOtherFiles: TestFile[];
        harnessSettings: TestCaseParser.CompilerSettings & HarnessOptions | undefined;
        options: ts.CompilerOptions;
        currentDirectory: string;
    }
    export function prepareDeclarationCompilationContext(inputFiles: readonly TestFile[], otherFiles: readonly TestFile[], result: compiler.CompilationResult, harnessSettings: TestCaseParser.CompilerSettings & HarnessOptions, options: ts.CompilerOptions, currentDirectory: string | undefined): DeclarationCompilationContext | undefined;
    export function compileDeclarationFiles(context: DeclarationCompilationContext | undefined, symlinks: vfs.FileSet | undefined): {
        declInputFiles: TestFile[];
        declOtherFiles: TestFile[];
        declResult: CompileFilesResult;
    } | undefined;
    export function minimalDiagnosticsToString(diagnostics: readonly ts.Diagnostic[], pretty?: boolean): string;
    export function getErrorBaseline(inputFiles: readonly TestFile[], diagnostics: readonly ts.Diagnostic[], pretty?: boolean): string;
    export const diagnosticSummaryMarker = "__diagnosticSummary";
    export const globalErrorsMarker = "__globalErrors";
    export function iterateErrorBaseline(inputFiles: readonly TestFile[], diagnostics: readonly ts.Diagnostic[], options?: {
        pretty?: boolean;
        caseSensitive?: boolean;
        currentDirectory?: string;
    }): IterableIterator<[string, string, number]>;
    export function doErrorBaseline(baselinePath: string, inputFiles: readonly TestFile[], errors: readonly ts.Diagnostic[], pretty?: boolean): void;
    export function doTypeAndSymbolBaseline(baselinePath: string, header: string, program: ts.Program, allFiles: {
        unitName: string;
        content: string;
    }[], opts?: Baseline.BaselineOptions, multifile?: boolean, skipTypeBaselines?: boolean, skipSymbolBaselines?: boolean, hasErrorBaseline?: boolean): void;
    export function doSourcemapBaseline(baselinePath: string, options: ts.CompilerOptions, result: compiler.CompilationResult, harnessSettings: TestCaseParser.CompilerSettings): void;
    export function doJsEmitBaseline(baselinePath: string, header: string, options: ts.CompilerOptions, result: CompileFilesResult, tsConfigFiles: readonly TestFile[], toBeCompiled: readonly TestFile[], otherFiles: readonly TestFile[], harnessSettings: TestCaseParser.CompilerSettings): void;
    export function collateOutputs(outputFiles: readonly documents.TextDocument[]): string;
    export function iterateOutputs(outputFiles: Iterable<documents.TextDocument>): IterableIterator<[string, string]>;
    export function sanitizeTestFilePath(name: string): string;
    export {};
}
export interface FileBasedTest {
    file: string;
    configurations?: FileBasedTestConfiguration[];
}
export interface FileBasedTestConfiguration {
    [key: string]: string;
}
/**
 * Compute FileBasedTestConfiguration variations based on a supplied list of variable settings.
 */
export declare function getFileBasedTestConfigurations(settings: TestCaseParser.CompilerSettings, varyBy: readonly string[]): FileBasedTestConfiguration[] | undefined;
/**
 * Compute a description for this configuration based on its entries
 */
export declare function getFileBasedTestConfigurationDescription(configuration: FileBasedTestConfiguration): string;
export declare namespace TestCaseParser {
    /** all the necessary information to set the right compiler settings */
    interface CompilerSettings {
        [name: string]: string;
    }
    /** All the necessary information to turn a multi file test into useful units for later compilation */
    interface TestUnitData {
        content: string;
        name: string;
        fileOptions: any;
        originalFilePath: string;
        references: string[];
    }
    function parseSymlinkFromTest(line: string, symlinks: vfs.FileSet | undefined, absoluteRootDir?: string): vfs.FileSet | undefined;
    function extractCompilerSettings(content: string): CompilerSettings;
    interface TestCaseContent {
        settings: CompilerSettings;
        testUnitData: TestUnitData[];
        tsConfig: ts.ParsedCommandLine | undefined;
        tsConfigFileUnitData: TestUnitData | undefined;
        symlinks?: vfs.FileSet;
    }
    /** Given a test file containing // @FileName directives, return an array of named units of code to be added to an existing compiler instance */
    function makeUnitsFromTest(code: string, fileName: string, settings?: CompilerSettings): TestCaseContent;
}
/** Support class for baseline files */
export declare namespace Baseline {
    interface BaselineOptions {
        Subfolder?: string;
        Baselinefolder?: string;
        PrintDiff?: true;
    }
    function localPath(fileName: string, baselineFolder?: string, subfolder?: string): string;
    function runBaseline(relativeFileName: string, actual: string | null, opts?: BaselineOptions): void;
    function runMultifileBaseline(relativeFileBase: string, extension: string, generateContent: () => IterableIterator<[string, string, number]> | IterableIterator<[string, string]> | null, opts?: BaselineOptions, referencedExtensions?: string[]): void;
}
export declare function isDefaultLibraryFile(filePath: string): boolean;
export declare function isBuiltFile(filePath: string): boolean;
export declare function getDefaultLibraryFile(filePath: string, io: IO): Compiler.TestFile;
export declare function getConfigNameFromFileName(filename: string): "tsconfig.json" | "jsconfig.json" | undefined;
//# sourceMappingURL=harnessIO.d.ts.map