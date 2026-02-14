import { FileBasedTest, RunnerBase, TestRunnerKind } from "./_namespaces/Harness.js";
export declare const enum CompilerTestType {
    Conformance = 0,
    Regressions = 1
}
interface CompilerFileBasedTest extends FileBasedTest {
    readonly content?: string;
}
export declare class CompilerBaselineRunner extends RunnerBase {
    testType: CompilerTestType;
    private basePath;
    private testSuiteName;
    private emit;
    options: string | undefined;
    constructor(testType: CompilerTestType);
    kind(): TestRunnerKind;
    private testFiles;
    enumerateTestFiles(): string[];
    initializeTests(): void;
    checkTestCodeOutput(fileName: string, test?: CompilerFileBasedTest): void;
    private runSuite;
    private parseOptions;
}
export {};
//# sourceMappingURL=compilerRunner.d.ts.map