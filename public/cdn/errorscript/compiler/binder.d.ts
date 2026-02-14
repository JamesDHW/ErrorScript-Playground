import { CompilerOptions, Expression, FlowFlags, FlowNode, ModuleDeclaration, Node, SourceFile } from "./_namespaces/ts.js";
/** @internal */
export declare const enum ModuleInstanceState {
    NonInstantiated = 0,
    Instantiated = 1,
    ConstEnumOnly = 2
}
/** @internal */
export declare function getModuleInstanceState(node: ModuleDeclaration, visited?: Map<number, ModuleInstanceState | undefined>): ModuleInstanceState;
/** @internal */
export declare const enum ContainerFlags {
    None = 0,
    IsContainer = 1,
    IsBlockScopedContainer = 2,
    IsControlFlowContainer = 4,
    IsFunctionLike = 8,
    IsFunctionExpression = 16,
    HasLocals = 32,
    IsInterface = 64,
    IsObjectLiteralOrClassExpressionMethodOrAccessor = 128,
    PropagatesThisKeyword = 256
}
/** @internal */
export declare function createFlowNode(flags: FlowFlags, node: unknown, antecedent: FlowNode | FlowNode[] | undefined): FlowNode;
/** @internal */
export declare function bindSourceFile(file: SourceFile, options: CompilerOptions): void;
/** @internal */
export declare function isExportsOrModuleExportsOrAlias(sourceFile: SourceFile, node: Expression): boolean;
/** @internal */
export declare function getContainerFlags(node: Node): ContainerFlags;
//# sourceMappingURL=binder.d.ts.map