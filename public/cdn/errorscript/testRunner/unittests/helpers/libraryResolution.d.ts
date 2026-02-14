import { TscWatchCompileChange } from "./tscWatch.js";
import { TestServerHost } from "./virtualFileSystemWithWatch.js";
export declare function forEachLibResolutionScenario(forTsserver: boolean, withoutConfig: true | undefined, action: (scenario: string, sys: () => TestServerHost, edits: () => readonly TscWatchCompileChange[]) => void): void;
export declare function getCommandLineArgsForLibResolution(withoutConfig: true | undefined): string[];
export declare function getSysForLibResolutionUnknown(): TestServerHost;
//# sourceMappingURL=libraryResolution.d.ts.map