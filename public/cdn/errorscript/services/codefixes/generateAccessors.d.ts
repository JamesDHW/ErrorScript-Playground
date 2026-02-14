import { ClassLikeDeclaration, FileTextChanges, Identifier, ObjectLiteralExpression, ParameterPropertyDeclaration, Program, PropertyAssignment, PropertyDeclaration, refactor, SourceFile, StringLiteral, textChanges, TypeNode } from "../_namespaces/ts.js";
/** @internal */
export type AcceptedDeclaration = ParameterPropertyDeclaration | PropertyDeclaration | PropertyAssignment;
/** @internal */
export type AcceptedNameType = Identifier | StringLiteral;
/** @internal */
export type ContainerDeclaration = ClassLikeDeclaration | ObjectLiteralExpression;
/** @internal */
export type AccessorOrRefactorErrorInfo = AccessorInfo | refactor.RefactorErrorInfo;
/** @internal */
export interface AccessorInfo {
    readonly container: ContainerDeclaration;
    readonly isStatic: boolean;
    readonly isReadonly: boolean;
    readonly type: TypeNode | undefined;
    readonly declaration: AcceptedDeclaration;
    readonly fieldName: AcceptedNameType;
    readonly accessorName: AcceptedNameType;
    readonly originalName: string;
    readonly renameAccessor: boolean;
}
/** @internal */
export declare function generateAccessorFromProperty(file: SourceFile, program: Program, start: number, end: number, context: textChanges.TextChangesContext, _actionName: string): FileTextChanges[] | undefined;
/** @internal */
export declare function getAccessorConvertiblePropertyAtPosition(file: SourceFile, program: Program, start: number, end: number, considerEmptySpans?: boolean): AccessorOrRefactorErrorInfo | undefined;
//# sourceMappingURL=generateAccessors.d.ts.map