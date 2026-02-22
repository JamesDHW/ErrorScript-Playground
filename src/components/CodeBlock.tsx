/* ---------- Code Block ---------- */

export function CodeBlock({
  snippet,
  visible,
}: {
  snippet: { code: string; highlights: { line: number; type: "safe" | "unsafe" }[] };
  visible: boolean;
}) {
  const lines = snippet.code.split("\n");

  return (
    <div className={`transition-all duration-500 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
      <div className="rounded-xl border border-black/30 bg-card overflow-hidden shadow-sm bg-white">
        <div className="flex items-center gap-1.5 px-3 py-2 bg-muted/50 border-b border-black/30">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        </div>
        <pre className="p-3 md:p-4 text-[11px] md:text-[13px] font-mono leading-6 overflow-x-auto">
          {lines.map((line, i) => {
            const highlight = snippet.highlights.find((h) => h.line === i);
            return (
              <div
                key={i}
                className={`rounded-sm font-semibold transition-colors duration-500 ${highlight?.type === "unsafe"
                  ? "bg-red-500/8 border-l-2 border-red-400/60 pl-2 -ml-0.5"
                  : highlight?.type === "safe"
                    ? "bg-emerald-500/8 border-l-2 border-emerald-400/60 pl-2 -ml-0.5"
                    : "pl-3"
                  }`}
              >
                <span className={`text-black/50 select-none mr-3 inline-block w-3 text-right text-[10px] ${highlight ? "ml-1" : ""}`}>
                  {i + 1}
                </span>
                {tokenize(line).map((token, j) => (
                  <span key={j} className={token.className}>
                    {token.text}
                  </span>
                ))}
              </div>
            );
          })}
        </pre>
      </div>
    </div>
  );
}


/* ---------- Syntax highlighting (light theme) ---------- */

function tokenize(line: string): { text: string; className: string }[] {
  const result: { text: string; className: string }[] = [];
  const keywords = ["function", "return", "const", "throws", "throw", "try", "catch", "async", "await", "new", "if"];
  const types = ["User", "Data", "DbError", "SyntaxError", "string", "number", "void"];
  let remaining = line;

  while (remaining.length > 0) {
    const commentMatch = remaining.match(/^(\/\/.*)$/);
    if (commentMatch) {
      result.push({ text: commentMatch[1], className: "text-[#8b8fa3]" });
      remaining = remaining.slice(commentMatch[1].length);
      continue;
    }

    const stringMatch = remaining.match(/^("[^"]*"|'[^']*')/);
    if (stringMatch) {
      result.push({ text: stringMatch[1], className: "text-[#b35e14]" });
      remaining = remaining.slice(stringMatch[1].length);
      continue;
    }

    let foundKeyword = false;
    for (const kw of keywords) {
      if (remaining.startsWith(kw) && (remaining.length === kw.length || /\W/.test(remaining[kw.length]))) {
        result.push({
          text: kw,
          className: kw === "throws" ? "text-[#c0392b] font-semibold" : "text-[#4060c0]",
        });
        remaining = remaining.slice(kw.length);
        foundKeyword = true;
        break;
      }
    }
    if (foundKeyword) continue;

    let foundType = false;
    for (const t of types) {
      if (remaining.startsWith(t) && (remaining.length === t.length || /\W/.test(remaining[t.length]))) {
        result.push({ text: t, className: "text-[#1a7a5a]" });
        remaining = remaining.slice(t.length);
        foundType = true;
        break;
      }
    }
    if (foundType) continue;

    const funcMatch = remaining.match(/^(\w+)(\()/);
    if (funcMatch) {
      result.push({ text: funcMatch[1], className: "text-[#8a6b20]" });
      remaining = remaining.slice(funcMatch[1].length);
      continue;
    }

    result.push({ text: remaining[0], className: "text-[#343746]" });
    remaining = remaining.slice(1);
  }

  return result;
}