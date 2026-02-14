export type TestRunnerKind = CompilerTestKind | FourslashTestKind | "project" | "transpile";
export type CompilerTestKind = "conformance" | "compiler";
export type FourslashTestKind = "fourslash" | "fourslash-server";
export declare let shards: number;
export declare let shardId: number;
export declare function setShards(count: number): void;
export declare function setShardId(id: number): void;
export declare abstract class RunnerBase {
    tests: string[];
    /** Add a source file to the runner's list of tests that need to be initialized with initializeTests */
    addTest(fileName: string): void;
    enumerateFiles(folder: string, regex?: RegExp, options?: {
        recursive: boolean;
    }): string[];
    abstract kind(): TestRunnerKind;
    abstract enumerateTestFiles(): string[];
    getTestFiles(): ReturnType<this["enumerateTestFiles"]>;
    /** The working directory where tests are found. Needed for batch testing where the input path will differ from the output path inside baselines */
    workingDirectory: string;
    /** Setup the runner's tests so that they are ready to be executed by the harness
     *  The first test should be a describe/it block that sets up the harness's compiler instance appropriately
     */
    abstract initializeTests(): void;
    /** Replaces instances of full paths with fileNames only */
    static removeFullPaths(path: string): string;
}
//# sourceMappingURL=runnerbase.d.ts.map