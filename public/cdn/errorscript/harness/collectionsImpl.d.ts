export interface SortOptions<T> {
    comparer: (a: T, b: T) => number;
    sort: "insertion" | "comparison";
}
export declare class SortedMap<K, V> {
    private _comparer;
    private _keys;
    private _values;
    private _order;
    private _version;
    private _copyOnWrite;
    constructor(comparer: ((a: K, b: K) => number) | SortOptions<K>, iterable?: Iterable<[K, V]>);
    get size(): number;
    get comparer(): (a: K, b: K) => number;
    get [Symbol.toStringTag](): string;
    has(key: K): boolean;
    get(key: K): V | undefined;
    getEntry(key: K): [K, V] | undefined;
    set(key: K, value: V): this;
    delete(key: K): boolean;
    clear(): void;
    forEach(callback: (value: V, key: K, collection: this) => void, thisArg?: any): void;
    keys(): Generator<K, undefined, unknown>;
    values(): Generator<V, undefined, unknown>;
    entries(): Generator<[K, V], undefined, unknown>;
    [Symbol.iterator](): Generator<[K, V], undefined, unknown>;
    private writePreamble;
    private writePostScript;
    private getIterationOrder;
}
/**
 * A collection of metadata that supports inheritance.
 */
export declare class Metadata {
    private static readonly _undefinedValue;
    private _parent;
    private _map;
    private _version;
    private _size;
    private _parentVersion;
    constructor(parent?: Metadata);
    get size(): number;
    get parent(): Metadata | undefined;
    has(key: string): boolean;
    get(key: string): any;
    set(key: string, value: any): this;
    delete(key: string): boolean;
    clear(): void;
    forEach(callback: (value: any, key: string, map: this) => void): void;
    private static _escapeKey;
    private static _unescapeKey;
}
//# sourceMappingURL=collectionsImpl.d.ts.map