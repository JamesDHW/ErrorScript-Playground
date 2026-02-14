import * as ts from "../../_namespaces/ts.js";
import { CommandLineCallbacks, TscWatchSystem } from "./baseline.js";
import { VerifyTscWithEditsInput } from "./tsc.js";
import { TestServerHost } from "./virtualFileSystemWithWatch.js";
export type SolutionBuilderHostWithGetPrograms = ts.SolutionBuilderHost<ts.EmitAndSemanticDiagnosticsBuilderProgram> & {
    getPrograms: CommandLineCallbacks["getPrograms"];
};
export declare function createSolutionBuilderHostForBaseline(sys: TscWatchSystem, originalRead?: TestServerHost["readFile"]): ts.SolutionBuilderHost<ts.EmitAndSemanticDiagnosticsBuilderProgram> & {
    getPrograms: CommandLineCallbacks["getPrograms"];
};
export declare function createSolutionBuilder(system: TscWatchSystem, rootNames: readonly string[], buildOptions?: ts.BuildOptions, originalRead?: TestServerHost["readFile"]): ts.SolutionBuilder<ts.EmitAndSemanticDiagnosticsBuilderProgram>;
export declare function ensureErrorFreeBuild(host: TestServerHost, rootNames: readonly string[]): void;
export declare function solutionBuildWithBaseline(sys: TestServerHost, solutionRoots: readonly string[], buildOptions?: ts.BuildOptions, versionToWrite?: string, originalRead?: TestServerHost["readFile"]): TestServerHost;
export declare function verifySolutionBuilderWithDifferentTsVersion(input: VerifyTscWithEditsInput, rootNames: readonly string[]): void;
//# sourceMappingURL=solutionBuilder.d.ts.map