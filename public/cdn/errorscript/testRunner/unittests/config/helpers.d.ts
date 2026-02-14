import * as fakes from "../../_namespaces/fakes.js";
import * as ts from "../../_namespaces/ts.js";
export interface ParseConfigInput {
    createHost: (baseline: string[]) => fakes.ParseConfigHost;
    jsonText: string;
    configFileName: string;
    basePath?: string;
    existingOptions?: ts.CompilerOptions;
    existingWatchOptions?: ts.WatchOptions;
    baselineParsed(baseline: string[], parsed: ts.ParsedCommandLine): void;
}
export interface BaselineParseConfigInput {
    scenario: string;
    subScenario: string;
    input(): ParseConfigInput[];
    skipJson?: boolean;
    skipErrors?: boolean;
    skipFs?: boolean;
    header?(baseline: string[]): void;
}
export declare function baselineParseConfig(input: BaselineParseConfigInput): void;
export declare function baselineParseConfigHost(baseline: string[], host: fakes.ParseConfigHost): void;
//# sourceMappingURL=helpers.d.ts.map