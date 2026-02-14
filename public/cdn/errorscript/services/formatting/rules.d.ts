import { Rule, TokenRange } from "../_namespaces/ts.formatting.js";
/** @internal */
export interface RuleSpec {
    readonly leftTokenRange: TokenRange;
    readonly rightTokenRange: TokenRange;
    readonly rule: Rule;
}
/** @internal */
export declare function getAllRules(): RuleSpec[];
//# sourceMappingURL=rules.d.ts.map