import { AnyImportOrRequireStatement, BindingElement, CancellationToken, CodeAction, CodeFixContextBase, DiagnosticWithLocation, ExportKind, ExportMapInfoKey, formatting, FutureSourceFile, FutureSymbolExportInfo, Identifier, ImportClause, ImportEqualsDeclaration, ImportKind, ImportSpecifier, LanguageServiceHost, NamespaceImport, Program, QuotePreference, RequireOrImportCall, SourceFile, Symbol, SymbolExportInfo, SymbolFlags, textChanges, UserPreferences, VariableDeclarationInitializedTo } from "../_namespaces/ts.js";
/** @internal */
export declare const importFixName = "import";
/**
 * The node kinds that may be the declaration of an alias symbol imported/required from an external module.
 * `ImportClause` is the declaration for a syntactic default import. `VariableDeclaration` is the declaration
 * for a non-destructured `require` call.
 * @internal
 */
export type ImportOrRequireAliasDeclaration = ImportEqualsDeclaration | ImportClause | ImportSpecifier | NamespaceImport | VariableDeclarationInitializedTo<RequireOrImportCall> | BindingElement;
/**
 * Computes multiple import additions to a file and writes them to a ChangeTracker.
 *
 * @internal
 */
export interface ImportAdder {
    hasFixes(): boolean;
    addImportFromDiagnostic: (diagnostic: DiagnosticWithLocation, context: CodeFixContextBase) => void;
    addImportFromExportedSymbol: (exportedSymbol: Symbol, isValidTypeOnlyUseSite?: boolean, referenceImport?: ImportOrRequireAliasDeclaration) => void;
    addImportForNonExistentExport: (exportName: string, exportingFileName: string, exportKind: ExportKind, exportedMeanings: SymbolFlags, isImportUsageValidAsTypeOnly: boolean) => void;
    addImportForModuleSymbol: (symbolAlias: Symbol, isValidTypeOnlyUseSite: boolean, referenceImport: ImportOrRequireAliasDeclaration) => void;
    addImportForUnresolvedIdentifier: (context: CodeFixContextBase, symbolToken: Identifier, useAutoImportProvider: boolean) => void;
    addVerbatimImport: (declaration: AnyImportOrRequireStatement | ImportOrRequireAliasDeclaration) => void;
    removeExistingImport: (declaration: ImportOrRequireAliasDeclaration) => void;
    writeFixes: (changeTracker: textChanges.ChangeTracker, oldFileQuotePreference?: QuotePreference) => void;
}
/** @internal */
export declare function createImportAdder(sourceFile: SourceFile | FutureSourceFile, program: Program, preferences: UserPreferences, host: LanguageServiceHost, cancellationToken?: CancellationToken): ImportAdder;
/**
 * Computes module specifiers for multiple import additions to a file.
 *
 * @internal
 */
export interface ImportSpecifierResolver {
    getModuleSpecifierForBestExportInfo(exportInfo: readonly SymbolExportInfo[], position: number, isValidTypeOnlyUseSite: boolean, fromCacheOnly?: boolean): {
        exportInfo?: SymbolExportInfo | FutureSymbolExportInfo;
        moduleSpecifier: string;
        computedWithoutCacheCount: number;
    } | undefined;
}
/** @internal */
export declare function createImportSpecifierResolver(importingFile: SourceFile, program: Program, host: LanguageServiceHost, preferences: UserPreferences): ImportSpecifierResolver;
/** @internal */
export declare function getImportCompletionAction(targetSymbol: Symbol, moduleSymbol: Symbol, exportMapKey: ExportMapInfoKey | undefined, sourceFile: SourceFile, symbolName: string, isJsxTagName: boolean, host: LanguageServiceHost, program: Program, formatContext: formatting.FormatContext, position: number, preferences: UserPreferences, cancellationToken: CancellationToken): {
    readonly moduleSpecifier: string;
    readonly codeAction: CodeAction;
};
/** @internal */
export declare function getPromoteTypeOnlyCompletionAction(sourceFile: SourceFile, symbolToken: Identifier, program: Program, host: LanguageServiceHost, formatContext: formatting.FormatContext, preferences: UserPreferences): CodeAction | undefined;
/**
 * @param forceImportKeyword Indicates that the user has already typed `import`, so the result must start with `import`.
 * (In other words, do not allow `const x = require("...")` for JS files.)
 *
 * @internal
 */
export declare function getImportKind(importingFile: SourceFile | FutureSourceFile, exportKind: ExportKind, program: Program, forceImportKeyword?: boolean): ImportKind;
//# sourceMappingURL=importFixes.d.ts.map