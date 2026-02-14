import { Node, SourceFileLike } from "../_namespaces/ts.js";
/** @internal */
export declare function getNodeChildren(node: Node, sourceFile: SourceFileLike): readonly Node[] | undefined;
/** @internal */
export declare function setNodeChildren(node: Node, sourceFile: SourceFileLike, children: readonly Node[]): readonly Node[];
/** @internal */
export declare function unsetNodeChildren(node: Node, origSourceFile: SourceFileLike): void;
/** @internal */
export declare function transferSourceFileChildren(sourceFile: SourceFileLike, targetSourceFile: SourceFileLike): void;
//# sourceMappingURL=nodeChildren.d.ts.map