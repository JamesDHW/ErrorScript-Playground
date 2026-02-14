import { __String, ArrayLiteralExpression, BindingOrAssignmentElement, Block, Comparison, EmitHelper, EntityName, Expression, FunctionExpression, Identifier, ParameterDeclaration, PrivateIdentifier, TextRange, TransformationContext } from "../_namespaces/ts.js";
/** @internal */
export declare const enum PrivateIdentifierKind {
    Field = "f",
    Method = "m",
    Accessor = "a"
}
/**
 * Describes the decorator context object passed to a native ECMAScript decorator for a class.
 *
 * @internal
 */
export interface ESDecorateClassContext {
    /**
     * The kind of the decorated element.
     */
    kind: "class";
    /**
     * The name of the decorated element.
     */
    name: Expression;
    metadata: Expression;
}
/**
 * Describes the decorator context object passed to a native ECMAScript decorator for a class element.
 *
 * @internal
 */
export interface ESDecorateClassElementContext {
    /**
     * The kind of the decorated element.
     */
    kind: "method" | "getter" | "setter" | "accessor" | "field";
    name: ESDecorateName;
    static: boolean;
    private: boolean;
    access: ESDecorateClassElementAccess;
    metadata: Expression;
}
/** @internal */
export interface ESDecorateClassElementAccess {
    get?: boolean;
    set?: boolean;
}
/** @internal */
export type ESDecorateName = {
    computed: true;
    name: Expression;
} | {
    computed: false;
    name: Identifier | PrivateIdentifier;
};
/** @internal */
export type ESDecorateContext = ESDecorateClassContext | ESDecorateClassElementContext;
/** @internal */
export interface EmitHelperFactory {
    getUnscopedHelperName(name: string): Identifier;
    createDecorateHelper(decoratorExpressions: readonly Expression[], target: Expression, memberName?: Expression, descriptor?: Expression): Expression;
    createMetadataHelper(metadataKey: string, metadataValue: Expression): Expression;
    createParamHelper(expression: Expression, parameterOffset: number): Expression;
    createESDecorateHelper(ctor: Expression, descriptorIn: Expression, decorators: Expression, contextIn: ESDecorateContext, initializers: Expression, extraInitializers: Expression): Expression;
    createRunInitializersHelper(thisArg: Expression, initializers: Expression, value?: Expression): Expression;
    createAssignHelper(attributesSegments: readonly Expression[]): Expression;
    createAwaitHelper(expression: Expression): Expression;
    createAsyncGeneratorHelper(generatorFunc: FunctionExpression, hasLexicalThis: boolean): Expression;
    createAsyncDelegatorHelper(expression: Expression): Expression;
    createAsyncValuesHelper(expression: Expression): Expression;
    createRestHelper(value: Expression, elements: readonly BindingOrAssignmentElement[], computedTempVariables: readonly Expression[] | undefined, location: TextRange): Expression;
    createAwaiterHelper(hasLexicalThis: boolean, argumentsExpression: Expression | undefined, promiseConstructor: EntityName | Expression | undefined, parameters: readonly ParameterDeclaration[] | undefined, body: Block): Expression;
    createExtendsHelper(name: Identifier): Expression;
    createTemplateObjectHelper(cooked: ArrayLiteralExpression, raw: ArrayLiteralExpression): Expression;
    createSpreadArrayHelper(to: Expression, from: Expression, packFrom: boolean): Expression;
    createPropKeyHelper(expr: Expression): Expression;
    createSetFunctionNameHelper(f: Expression, name: Expression, prefix?: string): Expression;
    createValuesHelper(expression: Expression): Expression;
    createReadHelper(iteratorRecord: Expression, count: number | undefined): Expression;
    createGeneratorHelper(body: FunctionExpression): Expression;
    createImportStarHelper(expression: Expression): Expression;
    createImportStarCallbackHelper(): Expression;
    createImportDefaultHelper(expression: Expression): Expression;
    createExportStarHelper(moduleExpression: Expression, exportsExpression?: Expression): Expression;
    createClassPrivateFieldGetHelper(receiver: Expression, state: Identifier, kind: PrivateIdentifierKind, f: Identifier | undefined): Expression;
    createClassPrivateFieldSetHelper(receiver: Expression, state: Identifier, value: Expression, kind: PrivateIdentifierKind, f: Identifier | undefined): Expression;
    createClassPrivateFieldInHelper(state: Identifier, receiver: Expression): Expression;
    createAddDisposableResourceHelper(envBinding: Expression, value: Expression, async: boolean): Expression;
    createDisposeResourcesHelper(envBinding: Expression): Expression;
    createRewriteRelativeImportExtensionsHelper(expression: Expression): Expression;
}
/** @internal */
export declare function createEmitHelperFactory(context: TransformationContext): EmitHelperFactory;
/** @internal */
export declare function compareEmitHelpers(x: EmitHelper, y: EmitHelper): Comparison;
/** @internal */
export declare const asyncSuperHelper: EmitHelper;
/** @internal */
export declare const advancedAsyncSuperHelper: EmitHelper;
/** @internal */
export declare function isCallToHelper(firstSegment: Expression, helperName: __String): boolean;
//# sourceMappingURL=emitHelpers.d.ts.map