import * as ts from "./_namespaces/ts.js";
export import sep = ts.directorySeparator;
export import normalizeSeparators = ts.normalizeSlashes;
export import isAbsolute = ts.isRootedDiskPath;
export import isRoot = ts.isDiskPathRoot;
export import hasTrailingSeparator = ts.hasTrailingDirectorySeparator;
export import addTrailingSeparator = ts.ensureTrailingDirectorySeparator;
export import removeTrailingSeparator = ts.removeTrailingDirectorySeparator;
export import normalize = ts.normalizePath;
export import combine = ts.combinePaths;
export import parse = ts.getPathComponents;
export import reduce = ts.reducePathComponents;
export import format = ts.getPathFromPathComponents;
export import resolve = ts.resolvePath;
export import compare = ts.comparePaths;
export import compareCaseSensitive = ts.comparePathsCaseSensitive;
export import compareCaseInsensitive = ts.comparePathsCaseInsensitive;
export import dirname = ts.getDirectoryPath;
export import basename = ts.getBaseFileName;
export import extname = ts.getAnyExtensionFromPath;
export import relative = ts.getRelativePathFromDirectory;
export import beneath = ts.containsPath;
export import changeExtension = ts.changeAnyExtension;
export import isTypeScript = ts.hasTSFileExtension;
export import isJavaScript = ts.hasJSFileExtension;
export declare const enum ValidationFlags {
    None = 0,
    RequireRoot = 1,
    RequireDirname = 2,
    RequireBasename = 4,
    RequireExtname = 8,
    RequireTrailingSeparator = 16,
    AllowRoot = 32,
    AllowDirname = 64,
    AllowBasename = 128,
    AllowExtname = 256,
    AllowTrailingSeparator = 512,
    AllowNavigation = 1024,
    AllowWildcard = 2048,
    /** Path must be a valid directory root */
    Root = 545,
    /** Path must be a absolute */
    Absolute = 2017,
    /** Path may be relative or absolute */
    RelativeOrAbsolute = 2016,
    /** Path may only be a filename */
    Basename = 260
}
export declare function validate(path: string, flags?: ValidationFlags): string;
export declare function isDeclaration(path: string): boolean;
export declare function isSourceMap(path: string): boolean;
export declare function isJavaScriptSourceMap(path: string): boolean;
export declare function isJson(path: string): boolean;
export declare function isDefaultLibrary(path: string): boolean;
export declare function isTsConfigFile(path: string): boolean;
//# sourceMappingURL=vpathUtil.d.ts.map