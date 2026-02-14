import * as ts from "../../_namespaces/ts.js";
import { TestServerHost, TestServerHostTrackingWrittenFiles } from "./virtualFileSystemWithWatch.js";
export type CommandLineProgram = [ts.Program, ts.BuilderProgram?];
export interface CommandLineCallbacks {
    cb: ts.ExecuteCommandLineCallbacks;
    getPrograms: () => readonly CommandLineProgram[];
}
export declare function commandLineCallbacks(sys: TestServerHost, originalReadCall?: ts.System["readFile"]): CommandLineCallbacks;
export type ReadableIncrementalBuildInfoDiagnosticOfFile = [file: string, diagnostics: readonly ts.ReusableDiagnostic[]];
export type ReadableIncrementalBuildInfoDiagnostic = [file: string, "not cached or not changed"] | ReadableIncrementalBuildInfoDiagnosticOfFile;
export type ReadableIncrementalBuildInfoEmitDiagnostic = ReadableIncrementalBuildInfoDiagnosticOfFile;
export type ReadableBuilderFileEmit = string & {
    __readableBuilderFileEmit: any;
};
export type ReadableIncrementalBuilderInfoFilePendingEmit = [original: string | [file: string] | [file: string, emitKind: ts.BuilderFileEmit], emitKind: ReadableBuilderFileEmit];
export type ReadableIncrementalBuildInfoEmitSignature = string | [file: string, signature: ts.EmitSignature | []];
export type ReadableIncrementalBuildInfoFileInfo<T> = Omit<ts.BuilderState.FileInfo, "impliedFormat"> & {
    impliedFormat: string | undefined;
    original: T | undefined;
};
export type ReadableIncrementalBuildInfoRoot = [original: ts.IncrementalBuildInfoFileId, readable: string] | [original: ts.IncrementalBuildInfoRootStartEnd, readable: readonly string[]];
export type ReadableIncrementalBuildInfoResolvedRoot = [
    original: ts.IncrementalBuildInfoResolvedRoot,
    readable: [resolved: string, root: string]
];
export type ReadableIncrementalBuildInfoBase = Omit<ts.IncrementalBuildInfoBase, "root" | "resolvedRoot" | "semanticDiagnosticsPerFile" | "emitDiagnosticsPerFile" | "changeFileSet"> & {
    root: readonly ReadableIncrementalBuildInfoRoot[];
    resolvedRoot: readonly ReadableIncrementalBuildInfoResolvedRoot[] | undefined;
    semanticDiagnosticsPerFile: readonly ReadableIncrementalBuildInfoDiagnostic[] | undefined;
    emitDiagnosticsPerFile: readonly ReadableIncrementalBuildInfoEmitDiagnostic[] | undefined;
    changeFileSet: readonly string[] | undefined;
} & ReadableBuildInfo;
export type ReadableIncrementalMultiFileEmitBuildInfo = Omit<ts.IncrementalMultiFileEmitBuildInfo, "fileIdsList" | "fileInfos" | "root" | "resolvedRoot" | "referencedMap" | "semanticDiagnosticsPerFile" | "emitDiagnosticsPerFile" | "changeFileSet" | "affectedFilesPendingEmit" | "emitSignatures"> & ReadableIncrementalBuildInfoBase & {
    fileIdsList: readonly (readonly string[])[] | undefined;
    fileInfos: ts.MapLike<ReadableIncrementalBuildInfoFileInfo<ts.IncrementalMultiFileEmitBuildInfoFileInfo>>;
    referencedMap: ts.MapLike<string[]> | undefined;
    affectedFilesPendingEmit: readonly ReadableIncrementalBuilderInfoFilePendingEmit[] | undefined;
    emitSignatures: readonly ReadableIncrementalBuildInfoEmitSignature[] | undefined;
};
export type ReadableIncrementalBuildInfoBundlePendingEmit = [emitKind: ReadableBuilderFileEmit, original: ts.IncrementalBuildInfoBundlePendingEmit];
export type ReadableIncrementalBundleEmitBuildInfo = Omit<ts.IncrementalBundleEmitBuildInfo, "fileInfos" | "root" | "resolvedRoot" | "semanticDiagnosticsPerFile" | "emitDiagnosticsPerFile" | "changeFileSet" | "pendingEmit"> & ReadableIncrementalBuildInfoBase & {
    fileInfos: ts.MapLike<string | ReadableIncrementalBuildInfoFileInfo<ts.BuilderState.FileInfo>>;
    pendingEmit: ReadableIncrementalBuildInfoBundlePendingEmit | undefined;
};
export type ReadableIncrementalBuildInfo = ReadableIncrementalMultiFileEmitBuildInfo | ReadableIncrementalBundleEmitBuildInfo;
export declare function isReadableIncrementalBuildInfo(buildInfo: ReadableBuildInfo): buildInfo is ReadableIncrementalBuildInfo;
export declare function isReadableIncrementalBundleEmitBuildInfo(info: ReadableBuildInfo | undefined): info is ReadableIncrementalBundleEmitBuildInfo;
export declare function isReadableIncrementalMultiFileEmitBuildInfo(info: ReadableBuildInfo | undefined): info is ReadableIncrementalMultiFileEmitBuildInfo;
export interface ReadableBuildInfo extends ts.BuildInfo {
    size: number;
}
export declare function toPathWithSystem(sys: ts.System, fileName: string): ts.Path;
export declare function baselineBuildInfo(options: ts.CompilerOptions, sys: TestServerHost, originalReadCall?: ts.System["readFile"]): void;
export declare function isWatch(commandLineArgs: readonly string[]): boolean | undefined;
export type TscWatchSystem = TestServerHostTrackingWrittenFiles;
export interface BaselineBase {
    baseline: string[];
    sys: TscWatchSystem;
}
export interface Baseline extends BaselineBase, CommandLineCallbacks {
}
export declare const fakeTsVersion = "FakeTSVersion";
export declare function patchHostForBuildInfoReadWrite<T extends ts.System>(sys: T): T;
export declare function patchHostForBuildInfoWrite<T extends ts.System>(sys: T, version: string): T;
export declare function createBaseline(system: TestServerHost, modifySystem?: (sys: TestServerHost, originalRead: TestServerHost["readFile"]) => void): Baseline;
export declare function applyEdit(sys: BaselineBase["sys"], baseline: BaselineBase["baseline"], edit: (sys: TscWatchSystem) => void, caption?: string): void;
export declare function baselineAfterTscCompile(sys: BaselineBase["sys"], baseline: BaselineBase["baseline"], getPrograms: CommandLineCallbacks["getPrograms"], oldPrograms: readonly (CommandLineProgram | undefined)[], baselineSourceMap: boolean | undefined, shouldBaselinePrograms: boolean | undefined, baselineDependencies: boolean | undefined): readonly CommandLineProgram[];
export declare function tscBaselineName(scenario: string, subScenario: string, commandLineArgs: readonly string[], suffix?: string): string;
//# sourceMappingURL=baseline.d.ts.map