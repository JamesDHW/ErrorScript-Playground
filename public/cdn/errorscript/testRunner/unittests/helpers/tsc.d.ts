import { CommandLineCallbacks, TscWatchSystem } from "./baseline.js";
import { TestServerHost } from "./virtualFileSystemWithWatch.js";
export declare const noChangeRun: TestTscEdit;
export declare const noChangeOnlyRuns: TestTscEdit[];
export interface TestTscCompile {
    commandLineArgs: readonly string[];
    sys: () => TestServerHost;
    modifySystem?: (fs: TestServerHost) => void;
    computeDtsSignatures?: boolean;
    getWrittenFiles?: boolean;
    baselineSourceMap?: boolean;
    baselineReadFileCalls?: boolean;
    baselinePrograms?: boolean;
    baselineDependencies?: boolean;
    compile?: (sys: TscWatchSystem) => CommandLineCallbacks["getPrograms"];
}
export interface TestTscEdit {
    edit: (sys: TscWatchSystem) => void;
    caption: string;
    commandLineArgs?: readonly string[];
    /** An array of lines to be printed in order when a discrepancy is detected */
    discrepancyExplanation?: () => readonly string[];
}
export interface VerifyTscWithEditsInput extends Omit<TestTscCompile, "computeDtsSignatures" | "getWrittenFiles"> {
    scenario: string;
    subScenario: string;
    edits?: readonly TestTscEdit[];
}
/**
 * Verify non watch tsc invokcation after each edit
 */
export declare function verifyTsc(input: VerifyTscWithEditsInput): void;
//# sourceMappingURL=tsc.d.ts.map