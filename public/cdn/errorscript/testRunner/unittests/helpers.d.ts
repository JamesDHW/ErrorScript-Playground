import * as ts from "../_namespaces/ts.js";
declare const enum ChangedPart {
    none = 0,
    references = 1,
    importsAndExports = 2,
    program = 4
}
export declare const newLine = "\r\n";
export interface SourceFileWithText extends ts.SourceFile {
    sourceText?: SourceText;
}
export interface NamedSourceText {
    name: string;
    text: SourceText;
}
export interface ProgramWithSourceTexts extends ts.Program {
    sourceTexts?: readonly NamedSourceText[];
    host: TestCompilerHost;
    version: number;
}
export interface TestCompilerHost extends ts.CompilerHost {
    getTrace(): string[];
    clearTrace(): void;
}
export declare class SourceText implements ts.IScriptSnapshot {
    private references;
    private importsAndExports;
    private program;
    private changedPart;
    private version;
    private fullText;
    constructor(references: string, importsAndExports: string, program: string, changedPart?: ChangedPart, version?: number);
    static New(references: string, importsAndExports: string, program: string): SourceText;
    getVersion(): number;
    updateReferences(newReferences: string): SourceText;
    updateImportsAndExports(newImportsAndExports: string): SourceText;
    updateProgram(newProgram: string): SourceText;
    getFullText(): string;
    getText(start: number, end: number): string;
    getLength(): number;
    getChangeRange(oldSnapshot: ts.IScriptSnapshot): ts.TextChangeRange;
}
export declare function createTestCompilerHost(texts: readonly NamedSourceText[], target: ts.ScriptTarget, oldProgram?: ProgramWithSourceTexts, useGetSourceFileByPath?: boolean, useCaseSensitiveFileNames?: boolean): TestCompilerHost;
export declare function newProgram(texts: NamedSourceText[], rootNames: string[], options: ts.CompilerOptions, useGetSourceFileByPath?: boolean, useCaseSensitiveFileNames?: boolean): ProgramWithSourceTexts;
export declare function updateProgram(oldProgram: ProgramWithSourceTexts, rootNames: readonly string[], options: ts.CompilerOptions, updater: (files: NamedSourceText[]) => void, newTexts?: NamedSourceText[], useGetSourceFileByPath?: boolean, useCaseSensitiveFileNames?: boolean): ProgramWithSourceTexts;
export declare function updateProgramText(files: readonly NamedSourceText[], fileName: string, newProgramText: string): void;
export declare function jsonToReadableText(json: any): string;
export {};
//# sourceMappingURL=helpers.d.ts.map