import { TscWatchCompileChange } from "./tscWatch.js";
import { TestServerHost } from "./virtualFileSystemWithWatch.js";
export declare function getSymlinkedExtendsSys(forTsserver?: true): TestServerHost;
export declare function getConfigDirExtendsSys(forTsserver?: boolean): TestServerHost;
export declare function forConfigDirExtendsSysScenario(forTsserver: boolean, action: (scenario: string, sys: () => TestServerHost, edits: () => readonly TscWatchCompileChange[]) => void): void;
//# sourceMappingURL=extends.d.ts.map