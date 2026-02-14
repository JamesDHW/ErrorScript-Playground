import { Diagnostic, DiagnosticArguments, DiagnosticCollection, DiagnosticMessage, FileIncludeReason, FilePreprocessingDiagnostics, MultiMap, ObjectLiteralExpression, Path, Program, SourceFile } from "./_namespaces/ts.js";
/** @internal */
export interface LazyConfigDiagnostic {
    file: SourceFile;
    diagnostic: DiagnosticMessage;
    args: DiagnosticArguments;
}
/** @internal */
export interface ProgramDiagnostics {
    addConfigDiagnostic(diag: Diagnostic): void;
    addLazyConfigDiagnostic(file: SourceFile, message: DiagnosticMessage, ...args: DiagnosticArguments): void;
    addFileProcessingDiagnostic(diag: FilePreprocessingDiagnostics): void;
    setCommonSourceDirectory(directory: string): void;
    reuseStateFromOldProgram(oldProgramDiagnostics: ProgramDiagnostics, isConfigIdentical: boolean): void;
    getFileProcessingDiagnostics(): FilePreprocessingDiagnostics[] | undefined;
    getFileReasons(): MultiMap<Path, FileIncludeReason>;
    getConfigDiagnostics(): DiagnosticCollection | undefined;
    getLazyConfigDiagnostics(): LazyConfigDiagnostic[] | undefined;
    getCommonSourceDirectory(): string | undefined;
    getCombinedDiagnostics(program: Program): DiagnosticCollection;
}
/** @internal */
export declare function createProgramDiagnostics(getCompilerOptionsObjectLiteralSyntax: () => ObjectLiteralExpression | undefined): ProgramDiagnostics;
//# sourceMappingURL=programDiagnostics.d.ts.map