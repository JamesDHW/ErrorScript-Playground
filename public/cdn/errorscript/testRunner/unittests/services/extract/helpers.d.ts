import * as ts from "../../../_namespaces/ts.js";
import { TestServerHost } from "../../helpers/virtualFileSystemWithWatch.js";
export interface TestProjectServiceOptions extends ts.server.ProjectServiceOptions {
    host: TestServerHost;
}
export type TestProjectServicePartialOptionsAndHost = Partial<Omit<TestProjectServiceOptions, "typingsInstaller" | "logger" | "host">> & Pick<TestProjectServiceOptions, "host">;
export declare class TestProjectService extends ts.server.ProjectService {
    constructor(optsOrHost: TestServerHost | TestProjectServicePartialOptionsAndHost);
}
interface Range {
    pos: number;
    end: number;
    name: string;
}
interface Test {
    source: string;
    ranges: Map<string, Range>;
}
export declare function extractTest(source: string): Test;
export declare const newLineCharacter = "\n";
export declare const notImplementedHost: ts.LanguageServiceHost;
export declare function testExtractSymbol(caption: string, text: string, baselineFolder: string, description: ts.DiagnosticMessage): void;
export declare function testExtractSymbolFailed(caption: string, text: string, description: ts.DiagnosticMessage): void;
export {};
//# sourceMappingURL=helpers.d.ts.map