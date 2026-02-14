import { CallLikeExpression, CancellationToken, Node, Program, SignatureHelpItems, SignatureHelpTriggerReason, SourceFile, TypeChecker } from "./_namespaces/ts.js";
/** @internal */
export declare function getSignatureHelpItems(program: Program, sourceFile: SourceFile, position: number, triggerReason: SignatureHelpTriggerReason | undefined, cancellationToken: CancellationToken): SignatureHelpItems | undefined;
/** @internal */
export interface ArgumentInfoForCompletions {
    readonly invocation: CallLikeExpression;
    readonly argumentIndex: number;
    readonly argumentCount: number;
}
/** @internal */
export declare function getArgumentInfoForCompletions(node: Node, position: number, sourceFile: SourceFile, checker: TypeChecker): ArgumentInfoForCompletions | undefined;
//# sourceMappingURL=signatureHelp.d.ts.map