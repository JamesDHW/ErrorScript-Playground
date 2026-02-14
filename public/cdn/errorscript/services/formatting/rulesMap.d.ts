import { FormatContext, FormattingContext, Rule } from "../_namespaces/ts.formatting.js";
import { FormatCodeSettings, FormattingHost } from "../_namespaces/ts.js";
/** @internal */
export declare function getFormatContext(options: FormatCodeSettings, host: FormattingHost): FormatContext;
/** @internal */
export type RulesMap = (context: FormattingContext) => readonly Rule[] | undefined;
//# sourceMappingURL=rulesMap.d.ts.map