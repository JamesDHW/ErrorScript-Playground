/** @internal */
export interface PerformanceHooks {
    shouldWriteNativeEvents: boolean;
    performance?: Performance;
    performanceTime?: PerformanceTime;
}
/** @internal */
export interface PerformanceTime {
    now(): number;
    timeOrigin: number;
}
/** @internal */
export interface Performance extends PerformanceTime {
    mark(name: string): void;
    measure(name: string, startMark?: string, endMark?: string): void;
    clearMeasures(name?: string): void;
    clearMarks(name?: string): void;
}
/** @internal */
export declare function tryGetNativePerformanceHooks(): PerformanceHooks | undefined;
/**
 * Gets a timestamp with (at least) ms resolution
 *
 * @internal
 */
export declare const timestamp: () => number;
//# sourceMappingURL=performanceCore.d.ts.map