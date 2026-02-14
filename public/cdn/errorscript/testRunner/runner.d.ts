import { RunnerBase, TestRunnerKind } from "./_namespaces/Harness.js";
export declare let runners: RunnerBase[];
export declare let iterations: number;
export declare function createRunner(kind: TestRunnerKind): RunnerBase;
export declare let taskConfigsFolder: string;
export declare let workerCount: number;
export declare let runUnitTests: boolean | undefined;
export declare let skipSysTests: boolean | undefined;
export declare let stackTraceLimit: number | "full" | undefined;
export declare let noColors: boolean;
export declare let keepFailed: boolean;
export interface TestConfig {
    light?: boolean;
    taskConfigsFolder?: string;
    listenForWork?: boolean;
    workerCount?: number;
    stackTraceLimit?: number | "full";
    test?: string[];
    runners?: string[];
    runUnitTests?: boolean;
    skipSysTests?: boolean;
    noColors?: boolean;
    timeout?: number;
    keepFailed?: boolean;
    shardId?: number;
    shards?: number;
}
export interface TaskSet {
    runner: TestRunnerKind;
    files: string[];
}
export declare let configOption: string;
export declare let globalTimeout: number;
export declare let isWorker: boolean;
//# sourceMappingURL=runner.d.ts.map