import { AnyImportOrRequireStatement, Comparer, Comparison, ExportDeclaration, Expression, FileTextChanges, formatting, ImportDeclaration, ImportSpecifier, JSDocImportTag, LanguageServiceHost, OrganizeImportsMode, Program, SourceFile, UserPreferences } from "./_namespaces/ts.js";
/**
 * Organize imports by:
 *   1) Removing unused imports
 *   2) Coalescing imports from the same module
 *   3) Sorting imports
 *
 * @internal
 */
export declare function organizeImports(sourceFile: SourceFile, formatContext: formatting.FormatContext, host: LanguageServiceHost, program: Program, preferences: UserPreferences, mode: OrganizeImportsMode): FileTextChanges[];
/** @internal */
export declare function getOrganizeImportsStringComparerWithDetection(originalImportDecls: readonly AnyImportOrRequireStatement[], preferences: UserPreferences): {
    comparer: Comparer<string>;
    isSorted: boolean;
};
/** @internal */
export declare function getNamedImportSpecifierComparerWithDetection(importDecl: ImportDeclaration | JSDocImportTag, preferences: UserPreferences, sourceFile?: SourceFile): {
    specifierComparer: Comparer<ImportSpecifier>;
    isSorted: boolean | undefined;
};
/** @internal */
export declare function getImportDeclarationInsertionIndex(sortedImports: readonly AnyImportOrRequireStatement[], newImport: AnyImportOrRequireStatement, comparer: Comparer<string>): number;
/** @internal */
export declare function getImportSpecifierInsertionIndex(sortedImports: readonly ImportSpecifier[], newImport: ImportSpecifier, comparer: Comparer<ImportSpecifier>): number;
/** @internal */
export declare function compareImportsOrRequireStatements(s1: AnyImportOrRequireStatement, s2: AnyImportOrRequireStatement, comparer: Comparer<string>): Comparison;
/**
 * @param importGroup a list of ImportDeclarations, all with the same module name.
 *
 * @deprecated Only used for testing
 * @internal
 */
export declare function testCoalesceImports(importGroup: readonly ImportDeclaration[], ignoreCase: boolean, sourceFile?: SourceFile, preferences?: UserPreferences): readonly ImportDeclaration[];
/**
 * @param exportGroup a list of ExportDeclarations, all with the same module name.
 *
 * @deprecated Only used for testing
 * @internal
 */
export declare function testCoalesceExports(exportGroup: readonly ExportDeclaration[], ignoreCase: boolean, preferences?: UserPreferences): readonly ExportDeclaration[];
/**
 * @deprecated Only used for testing
 * @internal
 */
export declare function compareModuleSpecifiers(m1: Expression | undefined, m2: Expression | undefined, ignoreCase?: boolean): Comparison;
//# sourceMappingURL=organizeImports.d.ts.map