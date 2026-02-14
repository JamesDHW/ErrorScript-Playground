import { RunnerBase, TestRunnerKind } from "./_namespaces/Harness.js";
export declare class TranspileRunner extends RunnerBase {
    protected basePath: string;
    protected testSuiteName: TestRunnerKind;
    enumerateTestFiles(): string[];
    kind(): TestRunnerKind;
    initializeTests(): void;
}
//# sourceMappingURL=transpileRunner.d.ts.map