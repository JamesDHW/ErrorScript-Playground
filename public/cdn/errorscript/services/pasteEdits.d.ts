import { CancellationToken, formatting, SourceFile, TextRange, UserPreferences } from "./_namespaces/ts.js";
import { LanguageServiceHost, PasteEdits } from "./types.js";
/** @internal */
export declare function pasteEditsProvider(targetFile: SourceFile, pastedText: string[], pasteLocations: TextRange[], copiedFrom: {
    file: SourceFile;
    range: TextRange[];
} | undefined, host: LanguageServiceHost, preferences: UserPreferences, formatContext: formatting.FormatContext, cancellationToken: CancellationToken): PasteEdits;
//# sourceMappingURL=pasteEdits.d.ts.map