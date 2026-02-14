import { JSDocTagInfo, Node, ScriptElementKind, SemanticMeaning, SourceFile, Symbol, SymbolDisplayPart, TypeChecker } from "./_namespaces/ts.js";
/** @internal */
export declare function getSymbolKind(typeChecker: TypeChecker, symbol: Symbol, location: Node): ScriptElementKind;
/** @internal */
export declare function getSymbolModifiers(typeChecker: TypeChecker, symbol: Symbol): string;
/** @internal */
export interface SymbolDisplayPartsDocumentationAndSymbolKind {
    displayParts: SymbolDisplayPart[];
    documentation: SymbolDisplayPart[];
    symbolKind: ScriptElementKind;
    tags: JSDocTagInfo[] | undefined;
    canIncreaseVerbosityLevel?: boolean;
}
/** @internal */
export declare function getSymbolDisplayPartsDocumentationAndSymbolKind(typeChecker: TypeChecker, symbol: Symbol, sourceFile: SourceFile, enclosingDeclaration: Node | undefined, location: Node, semanticMeaning?: SemanticMeaning, alias?: Symbol, maximumLength?: number, verbosityLevel?: number): SymbolDisplayPartsDocumentationAndSymbolKind;
//# sourceMappingURL=symbolDisplay.d.ts.map