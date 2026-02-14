import * as collections from "./_namespaces/collections.js";
import * as documents from "./_namespaces/documents.js";
import * as ts from "./_namespaces/ts.js";
/**
 * Posix-style path to the TypeScript compiler build outputs (including tsc.js, lib.d.ts, etc.)
 */
export declare const builtFolder = "/.ts";
/**
 * Posix-style path to libs for fourslash server tests (mounted to same location as builtFolder)
 */
export declare const fourslashLibFolder = "/home/src/tslibs/TS/Lib";
/**
 * Posix-style path to additional mountable folders (./tests/projects in this repo)
 */
export declare const projectsFolder = "/.projects";
/**
 * Posix-style path to additional test libraries
 */
export declare const testLibFolder = "/.lib";
/**
 * Posix-style path to sources under test
 */
export declare const srcFolder = "/.src";
export interface DiffOptions {
    includeChangedFileWithSameContent?: boolean;
    baseIsNotShadowRoot?: boolean;
}
export declare const timeIncrements = 1000;
/**
 * Represents a virtual POSIX-like file system.
 */
export declare class FileSystem {
    /** Indicates whether the file system is case-sensitive (`false`) or case-insensitive (`true`). */
    readonly ignoreCase: boolean;
    /** Gets the comparison function used to compare two paths. */
    readonly stringComparer: (a: string, b: string) => number;
    private _lazy;
    private _cwd;
    private _time;
    private _shadowRoot;
    private _dirStack;
    constructor(ignoreCase: boolean, options?: FileSystemOptions);
    /**
     * Gets metadata for this `FileSystem`.
     */
    get meta(): collections.Metadata;
    /**
     * Gets a value indicating whether the file system is read-only.
     */
    get isReadonly(): boolean;
    /**
     * Makes the file system read-only.
     */
    makeReadonly(): this;
    /**
     * Gets the file system shadowed by this file system.
     */
    get shadowRoot(): FileSystem | undefined;
    /**
     * Snapshots the current file system, effectively shadowing itself. This is useful for
     * generating file system patches using `.diff()` from one snapshot to the next. Performs
     * no action if this file system is read-only.
     */
    snapshot(): void;
    /**
     * Gets a shadow copy of this file system. Changes to the shadow copy do not affect the
     * original, allowing multiple copies of the same core file system without multiple copies
     * of the same data.
     */
    shadow(ignoreCase?: boolean): FileSystem;
    /**
     * Gets or sets the timestamp (in milliseconds) used for file status, returning the previous timestamp.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/time.html
     */
    time(value?: number): number;
    /**
     * Gets the metadata object for a path.
     * @param path
     */
    filemeta(path: string): collections.Metadata;
    private _filemeta;
    /**
     * Get the pathname of the current working directory.
     *
     * @link - http://pubs.opengroup.org/onlinepubs/9699919799/functions/getcwd.html
     */
    cwd(): string;
    /**
     * Changes the current working directory.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/chdir.html
     */
    chdir(path: string): void;
    /**
     * Pushes the current directory onto the directory stack and changes the current working directory to the supplied path.
     */
    pushd(path?: string): void;
    /**
     * Pops the previous directory from the location stack and changes the current directory to that directory.
     */
    popd(): void;
    /**
     * Update the file system with a set of files.
     */
    apply(files: FileSet): void;
    /**
     * Scan file system entries along a path. If `path` is a symbolic link, it is dereferenced.
     * @param path The path at which to start the scan.
     * @param axis The axis along which to traverse.
     * @param traversal The traversal scheme to use.
     */
    scanSync(path: string, axis: Axis, traversal: Traversal): string[];
    /**
     * Scan file system entries along a path.
     * @param path The path at which to start the scan.
     * @param axis The axis along which to traverse.
     * @param traversal The traversal scheme to use.
     */
    lscanSync(path: string, axis: Axis, traversal: Traversal): string[];
    private _scan;
    /**
     * Mounts a physical or virtual file system at a location in this virtual file system.
     *
     * @param source The path in the physical (or other virtual) file system.
     * @param target The path in this virtual file system.
     * @param resolver An object used to resolve files in `source`.
     */
    mountSync(source: string, target: string, resolver: FileSystemResolver): void;
    /**
     * Recursively remove all files and directories underneath the provided path.
     */
    rimrafSync(path: string): void;
    /**
     * Make a directory and all of its parent paths (if they don't exist).
     */
    mkdirpSync(path: string): void;
    getFileListing(): string;
    /**
     * Print diagnostic information about the structure of the file system to the console.
     */
    debugPrint(): void;
    /**
     * Determines whether a path exists.
     */
    existsSync(path: string): boolean;
    /**
     * Get file status. If `path` is a symbolic link, it is dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/stat.html
     *
     * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
     */
    statSync(path: string): Stats;
    /**
     * Change file access times
     *
     * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
     */
    utimesSync(path: string, atime: Date, mtime: Date): void;
    /**
     * Get file status. If `path` is a symbolic link, it is dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/lstat.html
     *
     * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
     */
    lstatSync(path: string): Stats;
    private _stat;
    /**
     * Read a directory. If `path` is a symbolic link, it is dereferenced.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/readdir.html
     *
     * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
     */
    readdirSync(path: string): string[];
    /**
     * Make a directory.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/mkdir.html
     *
     * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
     */
    mkdirSync(path: string): void;
    private _mkdir;
    /**
     * Remove a directory.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/rmdir.html
     *
     * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
     */
    rmdirSync(path: string): void;
    /**
     * Link one file to another file (also known as a "hard link").
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/link.html
     *
     * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
     */
    linkSync(oldpath: string, newpath: string): void;
    /**
     * Remove a directory entry.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/unlink.html
     *
     * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
     */
    unlinkSync(path: string): void;
    /**
     * Rename a file.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/rename.html
     *
     * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
     */
    renameSync(oldpath: string, newpath: string): void;
    /**
     * Make a symbolic link.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/symlink.html
     *
     * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
     */
    symlinkSync(target: string, linkpath: string): void;
    /**
     * Resolve a pathname.
     *
     * @link http://pubs.opengroup.org/onlinepubs/9699919799/functions/realpath.html
     *
     * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
     */
    realpathSync(path: string): string;
    /**
     * Read from a file.
     *
     * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
     */
    readFileSync(path: string, encoding?: null): Buffer<ArrayBuffer>;
    /**
     * Read from a file.
     *
     * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
     */
    readFileSync(path: string, encoding: BufferEncoding): string;
    /**
     * Read from a file.
     *
     * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
     */
    readFileSync(path: string, encoding?: BufferEncoding | null): string | Buffer<ArrayBuffer>;
    /**
     * Write to a file.
     *
     * NOTE: do not rename this method as it is intended to align with the same named export of the "fs" module.
     */
    writeFileSync(path: string, data: string | Buffer, encoding?: string | null): void;
    /**
     * Generates a `FileSet` patch containing all the entries in this `FileSystem` that are not in `base`.
     * @param base The base file system. If not provided, this file system's `shadowRoot` is used (if present).
     */
    diff(base?: FileSystem | undefined, options?: DiffOptions): FileSet | undefined;
    static defaultEncoding: BufferEncoding | undefined;
    /**
     * Generates a `FileSet` patch containing all the entries in `changed` that are not in `base`.
     */
    static diff(changed: FileSystem, base: FileSystem, options?: DiffOptions): FileSet | undefined;
    private static diffWorker;
    private static rootDiff;
    private static directoryDiff;
    private static fileDiff;
    private static symlinkDiff;
    private static trackCreatedInode;
    private static trackCreatedInodes;
    private static trackDeletedInodes;
    private _mknod;
    private _addLink;
    private _removeLink;
    private _replaceLink;
    private _getRootLinks;
    private _getLinks;
    private _getShadow;
    private _copyShadowLinks;
    private _getSize;
    private _getBuffer;
    /**
     * Walk a path to its end.
     *
     * @param path The path to follow.
     * @param noFollow A value indicating whether to *not* dereference a symbolic link at the
     * end of a path.
     *
     * @link http://man7.org/linux/man-pages/man7/path_resolution.7.html
     */
    private _walk;
    /**
     * Resolve a path relative to the current working directory.
     */
    private _resolve;
    private _applyFiles;
    private _applyFileExtendedOptions;
    private _applyFilesWorker;
}
export interface FileSystemOptions {
    time?: number;
    files?: FileSet;
    cwd?: string;
    meta?: Record<string, any>;
}
export interface FileSystemCreateOptions extends FileSystemOptions {
    documents?: readonly documents.TextDocument[];
}
export type Axis = "ancestors" | "ancestors-or-self" | "self" | "descendants-or-self" | "descendants";
export interface Traversal {
    /** A function called to choose whether to continue to traverse to either ancestors or descendants. */
    traverse?(path: string, stats: Stats): boolean;
    /** A function called to choose whether to accept a path as part of the result. */
    accept?(path: string, stats: Stats): boolean;
}
export interface FileSystemResolver {
    statSync(path: string): {
        mode: number;
        size: number;
    };
    readdirSync(path: string): string[];
    readFileSync(path: string): FileDataBuffer;
}
export interface FileSystemResolverHost {
    useCaseSensitiveFileNames(): boolean;
    getAccessibleFileSystemEntries(path: string): ts.FileSystemEntries;
    directoryExists(path: string): boolean;
    fileExists(path: string): boolean;
    getFileSize(path: string): number;
    readFile(path: string): string | undefined;
    getWorkspaceRoot(): string;
}
export declare function createResolver(host: FileSystemResolverHost): FileSystemResolver;
/**
 * Create a virtual file system from a physical file system using the following path mappings:
 *
 *  - `/.ts` is a directory mapped to `${workspaceRoot}/built/local`
 *  - `/.lib` is a directory mapped to `${workspaceRoot}/tests/lib`
 *  - `/.src` is a virtual directory to be used for tests.
 *
 * Unless overridden, `/.src` will be the current working directory for the virtual file system.
 */
export declare function createFromFileSystem(host: FileSystemResolverHost, ignoreCase: boolean, { documents, files, cwd, time, meta }?: FileSystemCreateOptions): FileSystem;
export declare class Stats {
    dev: number;
    ino: number;
    mode: number;
    nlink: number;
    uid: number;
    gid: number;
    rdev: number;
    size: number;
    blksize: number;
    blocks: number;
    atimeMs: number;
    mtimeMs: number;
    ctimeMs: number;
    birthtimeMs: number;
    atime: Date;
    mtime: Date;
    ctime: Date;
    birthtime: Date;
    constructor();
    constructor(dev: number, ino: number, mode: number, nlink: number, rdev: number, size: number, blksize: number, blocks: number, atimeMs: number, mtimeMs: number, ctimeMs: number, birthtimeMs: number);
    isFile(): boolean;
    isDirectory(): boolean;
    isSymbolicLink(): boolean;
    isBlockDevice(): boolean;
    isCharacterDevice(): boolean;
    isFIFO(): boolean;
    isSocket(): boolean;
}
declare const TemplateIOErrorMessages: {
    readonly EACCES: "access denied";
    readonly EIO: "an I/O error occurred";
    readonly ENOENT: "no such file or directory";
    readonly EEXIST: "file already exists";
    readonly ELOOP: "too many symbolic links encountered";
    readonly ENOTDIR: "no such directory";
    readonly EISDIR: "path is a directory";
    readonly EBADF: "invalid file descriptor";
    readonly EINVAL: "invalid value";
    readonly ENOTEMPTY: "directory not empty";
    readonly EPERM: "operation not permitted";
    readonly EROFS: "file system is read-only";
};
export declare const IOErrorMessages: typeof TemplateIOErrorMessages;
export declare function createIOError(code: keyof typeof IOErrorMessages, details?: string): NodeJS.ErrnoException;
/**
 * A template used to populate files, directories, links, etc. in a virtual file system.
 */
export interface FileSet {
    [name: string]: DirectoryLike | FileLike | Link | Symlink | Mount | Rmdir | Unlink | null | undefined;
}
export type DirectoryLike = FileSet | Directory;
export type FileLike = File | Buffer | string;
/** Extended options for a directory in a `FileSet` */
export declare class Directory {
    readonly files: FileSet;
    readonly meta: Record<string, any> | undefined;
    constructor(files: FileSet, { meta }?: {
        meta?: Record<string, any>;
    });
}
/** Extended options for a file in a `FileSet` */
export declare class File {
    readonly data: Buffer | string;
    readonly encoding: string | undefined;
    readonly meta: Record<string, any> | undefined;
    constructor(data: Buffer | string, { meta, encoding }?: {
        encoding?: string;
        meta?: Record<string, any>;
    });
}
export declare class SameFileContentFile extends File {
    constructor(data: Buffer | string, metaAndEncoding?: {
        encoding?: string;
        meta?: Record<string, any>;
    });
}
export declare class SameFileWithModifiedTime extends File {
    constructor(data: Buffer | string, metaAndEncoding?: {
        encoding?: string;
        meta?: Record<string, any>;
    });
}
/** Extended options for a hard link in a `FileSet` */
export declare class Link {
    readonly path: string;
    constructor(path: string);
}
/** Removes a directory in a `FileSet` */
export declare class Rmdir {
    _rmdirBrand?: never;
}
/** Unlinks a file in a `FileSet` */
export declare class Unlink {
    _unlinkBrand?: never;
}
/** Extended options for a symbolic link in a `FileSet` */
export declare class Symlink {
    readonly symlink: string;
    readonly meta: Record<string, any> | undefined;
    constructor(symlink: string, { meta }?: {
        meta?: Record<string, any>;
    });
}
/** Extended options for mounting a virtual copy of an external file system via a `FileSet` */
export declare class Mount {
    readonly source: string;
    readonly resolver: FileSystemResolver;
    readonly meta: Record<string, any> | undefined;
    constructor(source: string, resolver: FileSystemResolver, { meta }?: {
        meta?: Record<string, any>;
    });
}
type FileDataBuffer = {
    encoding?: undefined;
    data: Buffer;
} | {
    encoding: BufferEncoding;
    data: string;
};
/**
 * Creates a VFS with only libs mounted at fourslashLibFolder, suitable for fourslash tests.
 */
export declare function createFourslashVfs(host: FileSystemResolverHost, ignoreCase: boolean, { documents, files, cwd, time, meta }?: FileSystemCreateOptions): FileSystem;
export declare function formatPatch(patch: FileSet): string;
export declare function formatPatch(patch: FileSet | undefined): string | null;
export declare function iteratePatch(patch: FileSet | undefined): IterableIterator<[string, string]> | null;
export {};
//# sourceMappingURL=vfsUtil.d.ts.map