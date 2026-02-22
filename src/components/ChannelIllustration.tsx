"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Check, ShieldCheck, ShieldX, AlertTriangle } from "lucide-react";
import { CodeBlock } from "./CodeBlock";

type Language = "js" | "ts" | "es";

const languages: { key: Language; label: string }[] = [
  { key: "js", label: "JavaScript" },
  { key: "ts", label: "TypeScript" },
  { key: "es", label: "ErrorScript" },
];

const langColors: Record<Language, { bg: string; text: string; ring: string; dot: string; border: string }> = {
  js: { bg: "bg-js  ", text: "text-black", ring: "ring-yellow-300/50", dot: "bg-yellow-500", border: "border-yellow-300" },
  ts: { bg: "bg-ts", text: "text-white", ring: "ring-blue-300/50", dot: "bg-blue-500", border: "border-blue-300" },
  es: { bg: "bg-brand", text: "text-white", ring: "ring-primary/25", dot: "bg-red-500", border: "border-red-300" },
};

const channelStatus: Record<Language, { returnSafe: boolean; throwSafe: boolean }> = {
  js: { returnSafe: false, throwSafe: false },
  ts: { returnSafe: true, throwSafe: false },
  es: { returnSafe: true, throwSafe: true },
};

const codeSnippets: Record<Language, { code: string; highlights: { line: number; type: "safe" | "unsafe" }[] }> = {
  js: {
    code: `function getUser(id) {
  return db.find(id);
}

const user = getUser(1);
user.name; // runtime crash?`,
    highlights: [
      { line: 1, type: "unsafe" },
      { line: 5, type: "unsafe" },
    ],
  },
  ts: {
    code: `function getUser(id: number): User {
  return db.find(id);
}

const user = getUser(1);
user.name; // safe`,
    highlights: [
      { line: 0, type: "safe" },
      { line: 4, type: "safe" },
    ],
  },
  es: {
    code: `function getUser(id: number): User
  throws DbError {
  return db.find(id);
}
// must handle DbError
const user = getUser(1);`,
    highlights: [
      { line: 0, type: "safe" },
      { line: 1, type: "safe" },
    ],
  },
};

const throwSnippets: Record<Language, { code: string; highlights: { line: number; type: "safe" | "unsafe" }[] }> = {
  js: {
    code: `function parse(str) {
  return JSON.parse(str);
}

// silently crashes
const data = parse(input);`,
    highlights: [
      { line: 1, type: "unsafe" },
      { line: 4, type: "unsafe" },
    ],
  },
  ts: {
    code: `function parse(str: string): Data {
  return JSON.parse(str);
}

// throws are untyped!
const data = parse(input);`,
    highlights: [
      { line: 0, type: "safe" },
      { line: 4, type: "unsafe" },
    ],
  },
  es: {
    code: `function parse(str: string): Data
  throws SyntaxError {
  return JSON.parse(str);
}
// compile error if unhandled!
const data = parse(input);`,
    highlights: [
      { line: 0, type: "safe" },
      { line: 1, type: "safe" },
    ],
  },
};

/* ---------- Flow Diagram (the killer element) ---------- */

/* Shared sub-component for a single arrow segment with label pill */
function ArrowSegment({
  safe,
  label,
}: {
  safe: boolean;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col items-center">
        <svg width="2" height="24" className="overflow-visible shrink-0">
          <line
            x1="1" y1="0" x2="1" y2="24"
            className={`transition-all duration-700 ${safe ? "stroke-emerald-500" : "stroke-red-400"}`}
            strokeWidth="2"
            strokeDasharray={safe ? "none" : "4 3"}
          />
        </svg>
      </div>
      <div
        className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium whitespace-nowrap transition-all duration-500 ${
          safe
            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
            : "bg-red-50 text-red-600 border border-red-200"
        }`}
      >
        {safe ? <ShieldCheck className="w-3 h-3 shrink-0" /> : <ShieldX className="w-3 h-3 shrink-0" />}
        {label}
      </div>
    </div>
  );
}

/* Shared sub-component for a value/error node */
function ChannelNode({ safe, label }: { safe: boolean; label: string }) {
  return (
    <div
      className={`px-3 py-1.5 rounded-md border transition-all duration-500 ${
        safe ? "border-emerald-200 bg-emerald-50/80" : "border-red-200 bg-red-50/80"
      }`}
    >
      <span
        className={`font-mono text-[11px] transition-colors duration-500 ${
          safe ? "text-emerald-700" : "text-red-600"
        }`}
      >
        {label}
      </span>
    </div>
  );
}

function FlowDiagram({ active, visible }: { active: Language; visible: boolean }) {
  const status = channelStatus[active];

  /* ---- Mobile: horizontal compact layout ---- */
  const mobileLayout = (
    <div className="flex items-center justify-center gap-3 sm:hidden">
      {/* Return side */}
      <div className="flex flex-col items-center gap-0">
        <div className="px-3 py-1.5 rounded-lg border border-border bg-muted/50">
          <span className="font-mono text-[10px] text-foreground/80">{"fn()"}</span>
        </div>
        <ArrowSegment safe={status.returnSafe} label="return" />
        <ChannelNode safe={status.returnSafe} label="Value" />
      </div>

      {/* Divider */}
      <div className="h-16 w-px bg-border" />

      {/* Throw side */}
      <div className="flex flex-col items-center gap-0">
        <div className="px-3 py-1.5 rounded-lg border border-border bg-muted/50">
          <span className="font-mono text-[10px] text-foreground/80">{"fn()"}</span>
        </div>
        <ArrowSegment safe={status.throwSafe} label="throw" />
        <ChannelNode safe={status.throwSafe} label="Error" />
      </div>
    </div>
  );

  /* ---- Desktop: vertical full layout ---- */
  const desktopLayout = (
    <div className="hidden sm:flex flex-col items-center gap-0">
      <div className="px-4 py-2 rounded-lg border border-border bg-muted/50">
        <span className="font-mono text-xs md:text-sm text-foreground/80">{"fn()"}</span>
      </div>
      <ArrowSegment safe={status.returnSafe} label="return" />
      <ChannelNode safe={status.returnSafe} label="Value" />
      <ArrowSegment safe={status.throwSafe} label="throw" />
      <ChannelNode safe={status.throwSafe} label="Error" />
    </div>
  );

  return (
    <div className={`transition-all duration-500 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}>
      {mobileLayout}
      {desktopLayout}
    </div>
  );
}

/* ---------- Tab Selector ---------- */

function TabSelector({ active, onSelect }: { active: Language; onSelect: (lang: Language) => void }) {
  return (
    <div className="inline-flex items-center rounded-lg bg-muted/60 border border-border p-1">
      {languages.map((lang) => {
        const c = langColors[lang.key];
        const isActive = active === lang.key;
        return (
          <button
            key={lang.key}
            onClick={() => onSelect(lang.key)}
            className={`relative px-3 md:px-5 py-2 md:py-2.5 rounded-md text-xs md:text-sm font-medium transition-all duration-300 cursor-pointer ${
              isActive
                ? `${c.bg} ${c.text} font-bold shadow-sm ring-1 ${c.ring}`
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
}

/* ---------- Stepper ---------- */

function Stepper({ active }: { active: Language }) {
  const idx = languages.findIndex((l) => l.key === active);

  return (
    <div className="flex items-center justify-center gap-1">
      {languages.map((lang, i) => {
        const c = langColors[lang.key];
        return (
          <div key={lang.key} className="flex items-center gap-1">
            <div
              className={`flex items-center justify-center w-6 h-6 md:w-7 md:h-7 rounded-full text-[10px] md:text-xs font-bold transition-all duration-500 ${
                i < idx
                  ? "bg-foreground/8 text-foreground/40"
                  : i === idx
                    ? `${c.bg} ${c.text} font-bold ring-2 ${c.ring} scale-110`
                    : "bg-muted text-muted-foreground/40"
              }`}
            >
              {i < idx ? <Check className="w-3 h-3" /> : i + 1}
            </div>
            {i < languages.length - 1 && (
              <div className={`w-6 md:w-10 h-px transition-all duration-500 ${i < idx ? "bg-foreground/12" : "bg-border"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Status Badge ---------- */

function StatusBadge({ active, visible }: { active: Language; visible: boolean }) {
  return (
    <div className={`flex justify-center transition-all duration-500 ${visible ? "opacity-100" : "opacity-0"}`}>
      {active === "es" ? (
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 border border-emerald-200">
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span className="text-xs md:text-sm font-medium text-emerald-700">Both channels protected</span>
        </div>
      ) : active === "ts" ? (
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 border border-amber-200">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          <span className="text-xs md:text-sm font-medium text-amber-700">Error channel unprotected</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-200">
          <ShieldX className="w-4 h-4 text-red-600" />
          <span className="text-xs md:text-sm font-medium text-red-700">No type safety</span>
        </div>
      )}
    </div>
  );
}

/* ---------- Main ---------- */

export function ChannelIllustration() {
  const [active, setActive] = useState<Language>("js");
  const [visible, setVisible] = useState(true);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const switchTo = useCallback((lang: Language) => {
    setVisible(false);
    setTimeout(() => {
      setActive(lang);
      setVisible(true);
    }, 280);
  }, []);

  const handleManualSwitch = useCallback(
    (lang: Language) => {
      if (lang === active) return;
      if (timerRef.current) clearInterval(timerRef.current);
      switchTo(lang);
    },
    [active, switchTo],
  );

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setActive((prev) => {
          const idx = languages.findIndex((l) => l.key === prev);
          return languages[(idx + 1) % languages.length].key;
        });
        setVisible(true);
      }, 280);
    }, 8000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [active]);

  const status = channelStatus[active];

  return (
    <section className="w-full py-10 md:py-20 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Tabs + Stepper */}
        <div className="flex flex-col items-center gap-4 md:gap-5 mb-6 md:mb-8">
          <TabSelector active={active} onSelect={handleManualSwitch} />
          <Stepper active={active} />
        </div>

        {/* Status Badge */}
        <div className="mb-5 md:mb-6">
          <StatusBadge active={active} visible={visible} />
        </div>

        {/* Flow Diagram + Code: stacked on mobile/tablet, side by side on lg */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-center lg:items-start">
          {/* Flow Diagram */}
          <div className="w-full lg:w-auto flex justify-center lg:justify-start lg:pt-10 shrink-0">
            <FlowDiagram active={active} visible={visible} />
          </div>

          {/* Code Examples: single column on mobile, 2-col on sm+ */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 min-w-0 w-full">
            <div>
              <div className={`flex items-center gap-2 mb-2.5 transition-all duration-500 ${visible ? "opacity-100" : "opacity-0"}`}>
                <div className={`w-2 h-2 rounded-full transition-colors duration-700 ${status.returnSafe ? "bg-emerald-500" : "bg-red-500"}`} />
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Value channel</span>
              </div>
              <CodeBlock snippet={codeSnippets[active]} visible={visible} />
            </div>
            <div>
              <div className={`flex items-center gap-2 mb-2.5 transition-all duration-500 ${visible ? "opacity-100" : "opacity-0"}`}>
                <div className={`w-2 h-2 rounded-full transition-colors duration-700 ${status.throwSafe ? "bg-emerald-500" : "bg-red-500"}`} />
                <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium">Error channel</span>
              </div>
              <CodeBlock snippet={throwSnippets[active]} visible={visible} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
