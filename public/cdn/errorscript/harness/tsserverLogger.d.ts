import * as ts from "./_namespaces/ts.js";
export declare const HarnessLSCouldNotResolveModule = "HarnessLanguageService:: Could not resolve module";
export declare function replaceAll(source: string, searchValue: string, replaceValue: string): string;
export interface Logger extends ts.server.Logger {
    logs?: string[];
    log(s: string): void;
    host?: ts.server.ServerHost;
}
export declare function nullLogger(): Logger;
export declare function createHasErrorMessageLogger(): Logger;
export declare function nowString(logger: Logger): string;
export declare function createLoggerWritingToConsole(host: ts.server.ServerHost, sanitizeLibs?: true): LoggerWithInMemoryLogs;
export declare function sanitizeLog(s: string): string;
export declare function sanitizeLibFileText(s: string): string;
export interface LoggerWithInMemoryLogs extends Logger {
    logs: string[];
}
export declare function createLoggerWithInMemoryLogs(host: ts.server.ServerHost, sanitizeLibs?: true): LoggerWithInMemoryLogs;
//# sourceMappingURL=tsserverLogger.d.ts.map