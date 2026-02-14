import { ArrowFunction, CallHierarchyIncomingCall, CallHierarchyItem, CallHierarchyOutgoingCall, CancellationToken, ClassDeclaration, ClassExpression, ClassStaticBlockDeclaration, FunctionDeclaration, FunctionExpression, GetAccessorDeclaration, Identifier, MethodDeclaration, ModuleDeclaration, Node, Program, PropertyDeclaration, SetAccessorDeclaration, SourceFile, VariableDeclaration } from "./_namespaces/ts.js";
/** @internal */
export type NamedExpression = ClassExpression & {
    name: Identifier;
} | FunctionExpression & {
    name: Identifier;
};
/** @internal */
export type VariableLike = VariableDeclaration | PropertyDeclaration;
/** @internal */
export type AssignedExpression = ClassExpression & {
    name: undefined;
    parent: VariableLike & {
        name: Identifier;
    };
} | FunctionExpression & {
    name: undefined;
    parent: VariableLike & {
        name: Identifier;
    };
} | ArrowFunction & {
    name: undefined;
    parent: VariableLike & {
        name: Identifier;
    };
};
/** @internal */
export type CallHierarchyDeclaration = SourceFile | ModuleDeclaration & {
    name: Identifier;
} | FunctionDeclaration | ClassDeclaration | ClassStaticBlockDeclaration | MethodDeclaration | GetAccessorDeclaration | SetAccessorDeclaration | NamedExpression | AssignedExpression;
/**
 * Resolves the call hierarchy declaration for a node.
 *
 * @internal
 */
export declare function resolveCallHierarchyDeclaration(program: Program, location: Node): CallHierarchyDeclaration | CallHierarchyDeclaration[] | undefined;
/**
 * Creates a `CallHierarchyItem` for a call hierarchy declaration.
 *
 * @internal
 */
export declare function createCallHierarchyItem(program: Program, node: CallHierarchyDeclaration): CallHierarchyItem;
/**
 * Gets the call sites that call into the provided call hierarchy declaration.
 *
 * @internal
 */
export declare function getIncomingCalls(program: Program, declaration: CallHierarchyDeclaration, cancellationToken: CancellationToken): CallHierarchyIncomingCall[];
/**
 * Gets the call sites that call out of the provided call hierarchy declaration.
 *
 * @internal
 */
export declare function getOutgoingCalls(program: Program, declaration: CallHierarchyDeclaration): CallHierarchyOutgoingCall[];
//# sourceMappingURL=callHierarchy.d.ts.map