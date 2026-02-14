import * as ts from "./_namespaces/ts.js";
export interface TypeWriterTypeResult {
    line: number;
    syntaxKind: number;
    sourceText: string;
    type: string;
    underline?: string;
}
export interface TypeWriterSymbolResult {
    line: number;
    syntaxKind: number;
    sourceText: string;
    symbol: string;
}
export interface TypeWriterResult {
    line: number;
    syntaxKind: number;
    sourceText: string;
    symbol?: string;
    type?: string;
    underline?: string;
}
export declare class TypeWriterWalker {
    private program;
    private hadErrorBaseline;
    currentSourceFile: ts.SourceFile;
    private checker;
    constructor(program: ts.Program, hadErrorBaseline: boolean);
    getSymbols(fileName: string): IterableIterator<TypeWriterSymbolResult>;
    getTypes(fileName: string): IterableIterator<TypeWriterTypeResult>;
    private visitNode;
    private isImportStatementName;
    private isExportStatementName;
    private isIntrinsicJsxTag;
    private writeTypeOrSymbol;
}
//# sourceMappingURL=typeWriter.d.ts.map