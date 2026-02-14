import * as documents from "./_namespaces/documents.js";
import * as fakes from "./_namespaces/fakes.js";
import * as ts from "./_namespaces/ts.js";
import * as vfs from "./_namespaces/vfs.js";
/**
 * Test harness compiler functionality.
 */
export interface Project {
    file: string;
    config?: ts.ParsedCommandLine;
    errors?: ts.Diagnostic[];
}
export declare function readProject(host: fakes.ParseConfigHost, project: string | undefined, existingOptions?: ts.CompilerOptions): Project | undefined;
/**
 * Correlates compilation inputs and outputs
 */
export interface CompilationOutput {
    readonly inputs: readonly documents.TextDocument[];
    readonly js: documents.TextDocument | undefined;
    readonly dts: documents.TextDocument | undefined;
    readonly map: documents.TextDocument | undefined;
}
export declare class CompilationResult {
    readonly host: fakes.CompilerHost;
    readonly program: ts.Program | undefined;
    readonly result: ts.EmitResult | undefined;
    readonly options: ts.CompilerOptions;
    readonly diagnostics: readonly ts.Diagnostic[];
    readonly js: ReadonlyMap<string, documents.TextDocument>;
    readonly dts: ReadonlyMap<string, documents.TextDocument>;
    readonly maps: ReadonlyMap<string, documents.TextDocument>;
    symlinks?: vfs.FileSet;
    private _inputs;
    private _inputsAndOutputs;
    constructor(host: fakes.CompilerHost, options: ts.CompilerOptions, program: ts.Program | undefined, result: ts.EmitResult | undefined, diagnostics: readonly ts.Diagnostic[]);
    get vfs(): vfs.FileSystem;
    get inputs(): readonly documents.TextDocument[];
    get outputs(): readonly documents.TextDocument[];
    get traces(): readonly string[];
    get emitSkipped(): boolean;
    get singleFile(): boolean;
    get commonSourceDirectory(): string;
    getInputsAndOutputs(path: string): CompilationOutput | undefined;
    getInputs(path: string): readonly documents.TextDocument[] | undefined;
    getOutput(path: string, kind: "js" | "dts" | "map"): documents.TextDocument | undefined;
    getSourceMapRecord(): string | undefined;
    getSourceMap(path: string): documents.SourceMap | undefined;
    getOutputPath(path: string, ext: string): string;
    getNumberOfJsFiles(includeJson: boolean): number;
}
export declare function compileFiles(host: fakes.CompilerHost, rootFiles: string[] | undefined, compilerOptions: ts.CompilerOptions, typeScriptVersion?: string, captureSuggestions?: boolean): CompilationResult;
//# sourceMappingURL=compilerImpl.d.ts.map