export declare function removeTestPathPrefixes(text: string, retainTrailingDirectorySeparator?: boolean): string;
export declare function sanitizeTraceResolutionLogEntry(text: string): string;
/**
 * Removes leading indentation from a template literal string.
 */
export declare function dedent(array: TemplateStringsArray, ...args: any[]): string;
export declare function getByteOrderMarkLength(text: string): number;
export declare function removeByteOrderMark(text: string): string;
export declare function addUTF8ByteOrderMark(text: string): string;
export declare function theory<T extends any[]>(name: string, cb: (...args: T) => void, data: T[]): void;
export interface Deferred<T> {
    resolve: (value: T | PromiseLike<T>) => void;
    reject: (reason: unknown) => void;
    promise: Promise<T>;
}
export declare function defer<T = void>(): Deferred<T>;
//# sourceMappingURL=util.d.ts.map