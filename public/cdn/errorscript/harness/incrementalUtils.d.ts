import * as ts from "./_namespaces/ts.js";
export declare function reportDocumentRegistryStats(documentRegistry: ts.DocumentRegistry): string[];
export declare function verifyProgramStructure(expectedProgram: ts.Program, actualProgram: ts.Program, projectName: string): void;
export declare function verifyResolutionCache(actual: ts.ResolutionCache, actualProgram: ts.Program, resolutionHostCacheHost: ts.ResolutionCacheHost, projectName: string): void;
export interface IncrementalVerifierCallbacks {
    beforeVerification?(): any;
    afterVerification?(dataFromBefore: any): void;
}
export declare function incrementalVerifier(service: ts.server.ProjectService): void;
//# sourceMappingURL=incrementalUtils.d.ts.map