import * as Harness from "./_namespaces/Harness.js";
export declare class TextDocument {
    readonly meta: Map<string, string>;
    readonly file: string;
    readonly text: string;
    private _lineStarts;
    private _testFile;
    constructor(file: string, text: string, meta?: Map<string, string>);
    get lineStarts(): readonly number[];
    static fromTestFile(file: Harness.Compiler.TestFile): TextDocument;
    asTestFile(): Harness.Compiler.TestFile;
}
export interface RawSourceMap {
    version: number;
    file: string;
    sourceRoot?: string;
    sources: string[];
    sourcesContent?: string[];
    names: string[];
    mappings: string;
}
export interface Mapping {
    mappingIndex: number;
    emittedLine: number;
    emittedColumn: number;
    sourceIndex: number;
    sourceLine: number;
    sourceColumn: number;
    nameIndex?: number;
}
export declare class SourceMap {
    readonly raw: RawSourceMap;
    readonly mapFile: string | undefined;
    readonly version: number;
    readonly file: string;
    readonly sourceRoot: string | undefined;
    readonly sources: readonly string[];
    readonly sourcesContent: readonly string[] | undefined;
    readonly mappings: readonly Mapping[];
    readonly names: readonly string[] | undefined;
    private static readonly _mappingRegExp;
    private static readonly _sourceMappingURLRegExp;
    private static readonly _dataURLRegExp;
    private static readonly _base64Chars;
    private _emittedLineMappings;
    private _sourceLineMappings;
    constructor(mapFile: string | undefined, data: string | RawSourceMap);
    static getUrl(text: string): string | undefined;
    static fromUrl(url: string): SourceMap | undefined;
    static fromSource(text: string): SourceMap | undefined;
    getMappingsForEmittedLine(emittedLine: number): readonly Mapping[] | undefined;
    getMappingsForSourceLine(sourceIndex: number, sourceLine: number): readonly Mapping[] | undefined;
    private static _decodeVLQ;
}
//# sourceMappingURL=documentsUtil.d.ts.map