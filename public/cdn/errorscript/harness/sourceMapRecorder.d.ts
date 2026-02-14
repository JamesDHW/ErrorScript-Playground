import * as documents from "./_namespaces/documents.js";
import * as ts from "./_namespaces/ts.js";
export declare function getSourceMapRecord(sourceMapDataList: readonly ts.SourceMapEmitResult[], program: ts.Program, jsFiles: readonly documents.TextDocument[], declarationFiles: readonly documents.TextDocument[]): string;
export declare function getSourceMapRecordWithSystem(sys: ts.System, sourceMapFile: string): string;
//# sourceMappingURL=sourceMapRecorder.d.ts.map