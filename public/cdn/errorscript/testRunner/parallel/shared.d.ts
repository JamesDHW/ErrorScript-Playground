import { TestRunnerKind } from "../_namespaces/Harness.js";
export interface RunnerTask {
    runner: TestRunnerKind;
    file: string;
    size: number;
}
export interface UnitTestTask {
    runner: "unittest";
    file: string;
    size: number;
}
export type Task = RunnerTask | UnitTestTask;
export interface TestInfo {
    name: string[];
}
export interface ErrorInfo {
    name: string[];
    error: string;
    stack: string;
}
export interface TaskTimeout {
    duration: number | "reset";
}
export interface TaskResult {
    passing: number;
    errors: ErrorInfo[];
    passes: TestInfo[];
    duration: number;
    task: Task;
}
export interface ParallelTestMessage {
    type: "test";
    payload: Task;
}
export interface ParallelBatchMessage {
    type: "batch";
    payload: Task[];
}
export interface ParallelCloseMessage {
    type: "close";
}
export type ParallelHostMessage = ParallelTestMessage | ParallelCloseMessage | ParallelBatchMessage;
export interface ParallelErrorMessage {
    type: "error";
    payload: {
        error: string;
        stack: string;
        name?: string[];
    };
}
export interface ParallelResultMessage {
    type: "result";
    payload: TaskResult;
}
export interface ParallelBatchProgressMessage {
    type: "progress";
    payload: TaskResult;
}
export interface ParallelTimeoutChangeMessage {
    type: "timeout";
    payload: TaskTimeout;
}
export type ParallelClientMessage = ParallelErrorMessage | ParallelResultMessage | ParallelBatchProgressMessage | ParallelTimeoutChangeMessage;
export declare function shimNoopTestInterface(global: Mocha.MochaGlobals): void;
//# sourceMappingURL=shared.d.ts.map