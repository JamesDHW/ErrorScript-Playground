import { TscWatchCompileChange } from "./tscWatch.js";
import { TestServerHost } from "./virtualFileSystemWithWatch.js";
export declare function forEachMonorepoSymlinkScenario(forTsserver: boolean, action: (scenario: string, sys: () => TestServerHost, edits: () => readonly TscWatchCompileChange[], indexFile: string, currentDirectory: string) => void): void;
//# sourceMappingURL=monorepoSymlinkedSiblingPackages.d.ts.map