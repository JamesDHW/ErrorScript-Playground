import { ClassLikeDeclaration, codefix, FunctionLikeDeclaration, ModuleBlock, Node, Program, SourceFile, Symbol, TypeChecker } from "../_namespaces/ts.js";
/**
 * Returned by refactor functions when some error message needs to be surfaced to users.
 *
 * @internal
 */
export interface RefactorErrorInfo {
    error: string;
}
/**
 * Checks if some refactor info has refactor error info.
 *
 * @internal
 */
export declare function isRefactorErrorInfo(info: unknown): info is RefactorErrorInfo;
/**
 * Checks if string "known" begins with string "requested".
 * Used to match requested kinds with a known kind.
 *
 * @internal
 */
export declare function refactorKindBeginsWith(known: string, requested: string | undefined): boolean;
/**
 * Try to come up with a unique name for a given node within the scope for the
 * use of being used as a property/variable name.
 *
 * @internal
 */
export declare function getIdentifierForNode(node: Node, scope: FunctionLikeDeclaration | SourceFile | ModuleBlock | ClassLikeDeclaration, checker: TypeChecker, file: SourceFile): string;
/** @internal */
export declare function addTargetFileImports(oldFile: SourceFile, importsToCopy: Map<Symbol, [boolean, codefix.ImportOrRequireAliasDeclaration | undefined]>, targetFileImportsFromOldFile: Map<Symbol, boolean>, checker: TypeChecker, program: Program, importAdder: codefix.ImportAdder): void;
//# sourceMappingURL=helpers.d.ts.map