import * as ts from "./_namespaces/ts.js";
import * as vfs from "./_namespaces/vfs.js";
export declare const FakeSymbol: SymbolConstructor;
export declare function evaluateTypeScript(source: string | {
    files: vfs.FileSet;
    rootFiles: string[];
    main: string;
}, options?: ts.CompilerOptions, globals?: Record<string, any>): any;
export declare function evaluateJavaScript(sourceText: string, globals?: Record<string, any>, sourceFile?: string): any;
//# sourceMappingURL=evaluatorImpl.d.ts.map