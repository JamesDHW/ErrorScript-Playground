export interface ThrowMapEntry {
    throws?: string[];
    rejects?: string[];
}
export type ThrowMap = Record<string, ThrowMapEntry>;
export declare function getNativeThrowMap(): ThrowMap;
//# sourceMappingURL=nativeThrowMap.d.ts.map