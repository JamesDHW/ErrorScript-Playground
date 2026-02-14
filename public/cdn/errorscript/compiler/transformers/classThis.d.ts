import { AssignmentExpression, Block, ClassLikeDeclaration, ClassStaticBlockDeclaration, EqualsToken, ExpressionStatement, Identifier, Node, NodeArray, NodeFactory, Statement, ThisExpression } from "../_namespaces/ts.js";
/** @internal */
export type ClassThisAssignmentBlock = ClassStaticBlockDeclaration & {
    readonly body: Block & {
        readonly statements: NodeArray<Statement> & readonly [
            ExpressionStatement & {
                readonly expression: AssignmentExpression<EqualsToken> & {
                    readonly left: Identifier;
                    readonly right: ThisExpression;
                };
            }
        ];
    };
};
/**
 * Gets whether a node is a `static {}` block containing only a single assignment of the static `this` to the `_classThis`
 * (or similar) variable stored in the `classthis` property of the block's `EmitNode`.
 * @internal
 */
export declare function isClassThisAssignmentBlock(node: Node): node is ClassThisAssignmentBlock;
/**
 * Gets whether a `ClassLikeDeclaration` has a `static {}` block containing only a single assignment to a
 * `_classThis` (or similar) variable.
 * @internal
 */
export declare function classHasClassThisAssignment(node: ClassLikeDeclaration): boolean;
/**
 * Injects a class `static {}` block containing only an assignment of the static `this` to a `_classThis` (or similar)
 * variable.
 *
 * @param classThis The identifier to use for the captured static `this` reference, usually with the name `_classThis`.
 * @param thisExpression Overrides the expression to use for the actual `this` reference. This can be used to provide an
 * expression that has already had its `EmitFlags` set or may have been tracked to prevent substitution.
 * @internal
 */
export declare function injectClassThisAssignmentIfMissing<T extends ClassLikeDeclaration>(factory: NodeFactory, node: T, classThis: Identifier, thisExpression?: ThisExpression): Extract<ClassLikeDeclaration, Pick<T, "kind">>;
//# sourceMappingURL=classThis.d.ts.map