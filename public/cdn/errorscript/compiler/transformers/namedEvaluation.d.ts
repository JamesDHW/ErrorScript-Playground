import { Block, CallExpression, ClassLikeDeclaration, ClassStaticBlockDeclaration, Expression, ExpressionStatement, Identifier, NamedEvaluation, Node, NodeArray, Statement, TransformationContext } from "../_namespaces/ts.js";
/** @internal */
export type ClassNamedEvaluationHelperBlock = ClassStaticBlockDeclaration & {
    readonly body: Block & {
        readonly statements: NodeArray<Statement> & readonly [
            ExpressionStatement & {
                readonly expression: CallExpression & {
                    readonly expression: Identifier;
                };
            }
        ];
    };
};
/**
 * Gets whether a node is a `static {}` block containing only a single call to the `__setFunctionName` helper where that
 * call's second argument is the value stored in the `assignedName` property of the block's `EmitNode`.
 * @internal
 */
export declare function isClassNamedEvaluationHelperBlock(node: Node): node is ClassNamedEvaluationHelperBlock;
/**
 * Gets whether a `ClassLikeDeclaration` has a `static {}` block containing only a single call to the
 * `__setFunctionName` helper.
 * @internal
 */
export declare function classHasExplicitlyAssignedName(node: ClassLikeDeclaration): boolean;
/**
 * Gets whether a `ClassLikeDeclaration` has a declared name or contains a `static {}` block containing only a single
 * call to the `__setFunctionName` helper.
 * @internal
 */
export declare function classHasDeclaredOrExplicitlyAssignedName(node: ClassLikeDeclaration): boolean;
/**
 * Injects a class `static {}` block used to dynamically set the name of a class, if one does not already exist.
 * @internal
 */
export declare function injectClassNamedEvaluationHelperBlockIfMissing<T extends ClassLikeDeclaration>(context: TransformationContext, node: T, assignedName: Expression, thisExpression?: Expression): Extract<ClassLikeDeclaration, Pick<T, "kind">>;
/**
 * Performs a shallow transformation of a `NamedEvaluation` node, such that a valid name will be assigned.
 * @internal
 */
export declare function transformNamedEvaluation<T extends NamedEvaluation>(context: TransformationContext, node: T, ignoreEmptyStringLiteral?: boolean, assignedName?: string): Extract<NamedEvaluation, Pick<T, "kind" | keyof T & "operatorToken" | keyof T & "name">>;
//# sourceMappingURL=namedEvaluation.d.ts.map