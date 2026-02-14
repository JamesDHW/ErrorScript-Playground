import { BaseNodeFactory, Node, NodeFactory, SourceMapSource } from "../_namespaces/ts.js";
/** @internal */
export declare const enum NodeFactoryFlags {
    None = 0,
    NoParenthesizerRules = 1,
    NoNodeConverters = 2,
    NoIndentationOnFreshPropertyAccess = 4,
    NoOriginalNode = 8
}
/** @internal @knipignore */
export declare function addNodeFactoryPatcher(fn: (factory: NodeFactory) => void): void;
/**
 * Creates a `NodeFactory` that can be used to create and update a syntax tree.
 * @param flags Flags that control factory behavior.
 * @param baseFactory A `BaseNodeFactory` used to create the base `Node` objects.
 *
 * @internal
 */
export declare function createNodeFactory(flags: NodeFactoryFlags, baseFactory: BaseNodeFactory): NodeFactory;
export declare const factory: NodeFactory;
declare let SourceMapSource: new (fileName: string, text: string, skipTrivia?: (pos: number) => number) => SourceMapSource;
/**
 * Create an external source map source file reference
 */
export declare function createSourceMapSource(fileName: string, text: string, skipTrivia?: (pos: number) => number): SourceMapSource;
export declare function setOriginalNode<T extends Node>(node: T, original: Node | undefined): T;
export {};
//# sourceMappingURL=nodeFactory.d.ts.map