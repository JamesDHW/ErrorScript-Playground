import { CancellationToken, NavigateToItem, Program, SourceFile, TypeChecker } from "./_namespaces/ts.js";
/** @internal */
export declare function getNavigateToItems(sourceFiles: readonly SourceFile[], checker: TypeChecker, cancellationToken: CancellationToken, searchValue: string, maxResultCount: number | undefined, excludeDtsFiles: boolean, excludeLibFiles: boolean | undefined, program: Program): NavigateToItem[];
//# sourceMappingURL=navigateTo.d.ts.map