import * as ts from "../../_namespaces/ts.js";
/** Default typescript and lib installs location for tests */
export declare const tscTypeScriptTestLocation: string;
export declare function getPathForTypeScriptTestLocation(fileName: string): string;
export declare function getTypeScriptLibTestLocation(libName: string): string;
export declare function getPathForTypeScriptTypingInstallerCacheTest(fileName: string): string;
export declare function compilerOptionsToConfigJson(options: ts.CompilerOptions): object;
export declare const symbolLibContent = "\ninterface SymbolConstructor {\n    readonly species: symbol;\n    readonly toStringTag: symbol;\n}\ndeclare var Symbol: SymbolConstructor;\ninterface Symbol {\n    readonly [Symbol.toStringTag]: string;\n}\n";
export declare function getProjectConfigWithNodeNext(withNodeNext: boolean | undefined): object | undefined;
//# sourceMappingURL=contents.d.ts.map