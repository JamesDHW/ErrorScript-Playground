import { BinaryExpression, BindingElement, ClassDeclaration, codefix, Declaration, EnumDeclaration, ExpressionStatement, ExternalModuleReference, FunctionDeclaration, FutureSourceFile, GetCanonicalFileName, ImportDeclaration, ImportEqualsDeclaration, InterfaceDeclaration, LanguageServiceHost, ModuleDeclaration, Program, PropertyAccessExpression, RefactorContext, RequireOrImportCall, SourceFile, Statement, StringLiteralLike, Symbol, textChanges, TextRange, TypeAliasDeclaration, TypeChecker, UserPreferences, VariableDeclaration, VariableDeclarationList, VariableStatement } from "../_namespaces/ts.js";
/** @internal */
export declare function getNewStatementsAndRemoveFromOldFile(oldFile: SourceFile, targetFile: SourceFile | FutureSourceFile, usage: UsageInfo, changes: textChanges.ChangeTracker, toMove: ToMove, program: Program, host: LanguageServiceHost, preferences: UserPreferences, importAdderForNewFile: codefix.ImportAdder, importAdderForOldFile: codefix.ImportAdder): void;
/** @internal */
export declare function addNewFileToTsconfig(program: Program, changes: textChanges.ChangeTracker, oldFileName: string, newFileNameWithExtension: string, getCanonicalFileName: GetCanonicalFileName): void;
/** @internal */
export declare function addExportsInOldFile(oldFile: SourceFile, targetFileImportsFromOldFile: Map<Symbol, boolean>, changes: textChanges.ChangeTracker, useEsModuleSyntax: boolean): void;
/** @internal */
export type SupportedImport = ImportDeclaration & {
    moduleSpecifier: StringLiteralLike;
} | ImportEqualsDeclaration & {
    moduleReference: ExternalModuleReference & {
        expression: StringLiteralLike;
    };
} | VariableDeclaration & {
    initializer: RequireOrImportCall;
};
/** @internal */
export type SupportedImportStatement = ImportDeclaration | ImportEqualsDeclaration | VariableStatement;
/** @internal */
export declare function addImportsForMovedSymbols(symbols: Map<Symbol, boolean>, targetFileName: string, importAdder: codefix.ImportAdder, program: Program): void;
/** @internal */
export type TopLevelDeclarationStatement = NonVariableTopLevelDeclaration | VariableStatement;
/** @internal */
export interface ToMove {
    readonly all: readonly Statement[];
    readonly ranges: readonly StatementRange[];
}
/** @internal */
export interface StatementRange {
    readonly first: Statement;
    readonly afterLast: Statement | undefined;
}
/** @internal */
export interface UsageInfo {
    /** Symbols whose declarations are moved from the old file to the new file. */
    readonly movedSymbols: Set<Symbol>;
    /** Symbols declared in the old file that must be imported by the new file. (May not already be exported.) */
    readonly targetFileImportsFromOldFile: Map<Symbol, boolean>;
    /** Subset of movedSymbols that are still used elsewhere in the old file and must be imported back. */
    readonly oldFileImportsFromTargetFile: Map<Symbol, boolean>;
    readonly oldImportsNeededByTargetFile: Map<Symbol, [boolean, codefix.ImportOrRequireAliasDeclaration | undefined]>;
    /** Subset of oldImportsNeededByTargetFile that are will no longer be used in the old file. */
    readonly unusedImportsFromOldFile: Set<Symbol>;
}
/** @internal */
export type TopLevelExpressionStatement = ExpressionStatement & {
    expression: BinaryExpression & {
        left: PropertyAccessExpression;
    };
};
/** @internal */
export type NonVariableTopLevelDeclaration = FunctionDeclaration | ClassDeclaration | EnumDeclaration | TypeAliasDeclaration | InterfaceDeclaration | ModuleDeclaration | TopLevelExpressionStatement | ImportEqualsDeclaration;
/** @internal */
export interface TopLevelVariableDeclaration extends VariableDeclaration {
    parent: VariableDeclarationList & {
        parent: VariableStatement;
    };
}
/** @internal */
export type TopLevelDeclaration = NonVariableTopLevelDeclaration | TopLevelVariableDeclaration | BindingElement;
/** @internal */
export declare function createNewFileName(oldFile: SourceFile, program: Program, host: LanguageServiceHost, toMove: ToMove | undefined): string;
/** @internal */
export declare function getStatementsToMove(context: RefactorContext): ToMove | undefined;
/** @internal */
export declare function containsJsx(statements: readonly Statement[] | undefined): Statement | undefined;
/** @internal */
export declare function getUsageInfo(oldFile: SourceFile, toMove: readonly Statement[], checker: TypeChecker, existingTargetLocals?: ReadonlySet<Symbol>, enclosingRange?: TextRange): UsageInfo;
/** @internal */
export declare function isInImport(decl: Declaration): boolean;
/** @internal */
export declare function getExistingLocals(sourceFile: SourceFile, statements: readonly Statement[], checker: TypeChecker): Set<Symbol>;
//# sourceMappingURL=moveToFile.d.ts.map