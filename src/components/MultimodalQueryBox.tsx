"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type Mode = "text" | "image" | "video";
type ScanStage = "idle" | "analyzing" | "result";

type MockResult = {
  verdictLabel: string;
  verdictTone: "ai" | "real" | "mixed";
  confidence: number;
  aiScore: number;
  crowdScore?: number;
  explanation: string;
  signals: string[];
  timestamp: string;
};

const tabs: { key: Mode; label: string; helper: string }[] = [
  { key: "text", label: "Text", helper: "Paste or upload writing to analyze." },
  { key: "image", label: "Image", helper: "Upload a photo or paste a link." },
  { key: "video", label: "Video", helper: "Upload a clip or paste a URL." },
];

export function MultimodalQueryBox() {
  const [mode, setMode] = useState<Mode>("text");
  const [isPrivate, setIsPrivate] = useState(false);
  const [stage, setStage] = useState<ScanStage>("idle");
  const [mockResult, setMockResult] = useState<MockResult | null>(null);
  const [textInput, setTextInput] = useState("");
  const [linkInput, setLinkInput] = useState("");
  const [fileName, setFileName] = useState("");
  const timerRef = useRef<number | null>(null);
  const activeTab = useMemo(() => tabs.find((tab) => tab.key === mode), [mode]);

  const buildMockResult = useCallback((): MockResult => {
    const isAi = Math.random() > 0.45;
    const confidence = Math.floor(62 + Math.random() * 30);
    const aiScore = Math.floor(55 + Math.random() * 35);
    const crowdScore = isPrivate ? undefined : Math.floor(50 + Math.random() * 40);
    const timestamp = new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const modeCopy = {
      text: {
        explanation:
          "The writing uses highly consistent sentence patterns and repeats key phrases.",
        signals: [
          "Low burstiness across paragraphs",
          "Uniform sentence length",
          "Predictable word choice",
        ],
      },
      image: {
        explanation:
          "Lighting and texture patterns look too uniform for a natural photo.",
        signals: [
          "Compression artifacts align evenly",
          "Metadata is missing or generic",
          "Repeating texture patterns",
        ],
      },
      video: {
        explanation:
          "Frame transitions and lip sync appear slightly inconsistent over time.",
        signals: [
          "Temporal artifacts detected",
          "Lighting jumps across frames",
          "Audio-visual mismatch",
        ],
      },
    }[mode];

    return {
      verdictLabel: isAi ? "Likely AI" : "Likely Real",
      verdictTone: isAi ? "ai" : "real",
      confidence,
      aiScore,
      crowdScore,
      explanation: modeCopy.explanation,
      signals: modeCopy.signals,
      timestamp,
    };
  }, [isPrivate, mode]);

  const handleRunScan = useCallback(() => {
    if (stage === "analyzing") return;
    setStage("analyzing");
    setMockResult(null);
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      setMockResult(buildMockResult());
      setStage("result");
    }, 1600);
  }, [buildMockResult, stage]);

  const handleReset = useCallback(() => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
    }
    setStage("idle");
    setMockResult(null);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const verdictStyles = {
    ai: "text-rose-600 [data-theme='dark']:text-rose-300",
    real: "text-emerald-600 [data-theme='dark']:text-emerald-200",
    mixed: "text-amber-600 [data-theme='dark']:text-amber-300",
  };

  return (
    <section className="glass-card p-6 md:p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-tertiary">
            Multimodal Scan
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-primary">
            Upload or paste to verify authenticity
          </h2>
          <p className="mt-2 text-sm text-tertiary">{activeTab?.helper}</p>
        </div>
        <div className="glass-surface flex w-full max-w-sm items-center gap-2 p-1">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setMode(tab.key)}
              className={`glass-tab flex-1 rounded-full px-4 py-2 text-sm font-medium transition ${
                mode === tab.key ? "glass-tab-active" : "hover:text-primary"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-2xl border-2 border-cyan-500/30 bg-linear-to-r from-cyan-500/10 to-blue-500/10 p-5 [data-theme='dark']:border-cyan-400/40 [data-theme='dark']:from-cyan-500/15 [data-theme='dark']:to-blue-500/15">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={!isPrivate}
                  onChange={(e) => setIsPrivate(!e.target.checked)}
                  className="peer sr-only"
                />
                <div className="peer h-7 w-14 rounded-full bg-slate-300 transition-colors after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all after:content-[''] peer-checked:bg-cyan-500 peer-checked:after:translate-x-7 [data-theme='dark']:bg-slate-600 [data-theme='dark']:peer-checked:bg-cyan-400"></div>
              </label>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-base font-semibold text-primary">
                    {isPrivate ? "Private Scan" : "Public Scan"}
                  </span>
                  {!isPrivate && (
                    <span className="rounded-full bg-cyan-500/20 px-2 py-0.5 text-xs font-semibold text-cyan-700 [data-theme='dark']:bg-cyan-400/20 [data-theme='dark']:text-cyan-300">
                      Recommended
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-secondary">
                  {isPrivate ? (
                    <>
                      <strong className="text-primary">Private:</strong> Only AI
                      analysis. No community votes. Your content stays completely
                      private.
                    </>
                  ) : (
                    <>
                      <strong className="text-primary">Public:</strong> Get both
                      AI analysis and community votes. Helps improve our system
                      if not sensitive info.
                    </>
                  )}
                </p>
              </div>
            </div>
          </div>
          {!isPrivate && (
            <div className="mt-2 flex items-start gap-2 rounded-xl bg-cyan-500/10 px-4 py-2.5 md:mt-0">
              <svg
                className="h-5 w-5 shrink-0 text-cyan-600 [data-theme='dark']:text-cyan-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-xs text-secondary">
                <strong className="text-primary">Tip:</strong> Public scans help
                train our models and improve accuracy for everyone. Choose
                private only if your content is sensitive.
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="glass-input flex flex-col gap-4 p-4 md:p-5">
          {stage === "analyzing" && (
            <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-cyan-500/30 border-t-cyan-500"></div>
              <div>
                <p className="text-base font-semibold text-primary">
                  Analyzing your {mode}...
                </p>
                <p className="mt-2 text-sm text-tertiary">
                  Running multi-model checks and preparing your verdict.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-tertiary">
                <span className="glass-surface px-3 py-1.5">Signal pass 1/3</span>
                <span className="glass-surface px-3 py-1.5">Signal pass 2/3</span>
                <span className="glass-surface px-3 py-1.5">Scoring</span>
              </div>
            </div>
          )}

          {stage === "result" && mockResult && (
            <div className="flex flex-col gap-5">
              <div className="flex flex-col gap-2">
                <p className="text-xs uppercase tracking-[0.3em] text-tertiary">
                  Verdict AI Result
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="text-2xl font-semibold text-primary">
                    {mockResult.verdictLabel}
                  </h3>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      verdictStyles[mockResult.verdictTone]
                    }`}
                  >
                    {mockResult.confidence}% confidence
                  </span>
                </div>
                <p className="text-sm text-secondary">
                  {mockResult.explanation}
                </p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="glass-surface p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-tertiary">
                    AI Score
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-primary">
                    {mockResult.aiScore}%
                  </p>
                </div>
                <div className="glass-surface p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-tertiary">
                    Community Score
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-primary">
                    {mockResult.crowdScore ? `${mockResult.crowdScore}%` : "—"}
                  </p>
                  <p className="mt-1 text-xs text-tertiary">
                    {isPrivate
                      ? "Private scan: community voting disabled."
                      : "Public scan: community votes included."}
                  </p>
                </div>
              </div>

              <div className="glass-surface p-4">
                <p className="text-xs uppercase tracking-[0.2em] text-tertiary">
                  Top signals
                </p>
                <ul className="mt-3 flex flex-col gap-2 text-sm text-secondary">
                  {mockResult.signals.map((signal) => (
                    <li key={signal} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-cyan-500"></span>
                      {signal}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between text-xs text-tertiary">
                <span>Generated at {mockResult.timestamp}</span>
                <button
                  type="button"
                  onClick={handleReset}
                  className="rounded-full border border-slate-300 px-3 py-1 text-xs font-semibold text-secondary transition hover:border-slate-400 hover:text-primary [data-theme='dark']:border-white/20 [data-theme='dark']:text-white/70"
                >
                  Start new scan
                </button>
              </div>
            </div>
          )}

          {stage === "idle" && mode === "text" ? (
            <>
              <textarea
                rows={7}
                className="w-full resize-none rounded-xl bg-transparent text-sm text-primary placeholder:text-tertiary focus:outline-none"
                placeholder="Paste text to inspect for AI fingerprints..."
                value={textInput}
                onChange={(event) => setTextInput(event.target.value)}
              />
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-tertiary">
                <span>Supported: TXT, DOCX, PDF</span>
                <label className="cursor-pointer rounded-full border border-white/20 px-4 py-2 text-secondary transition hover:border-white/40 hover:text-primary [data-theme='dark']:border-white/20 [data-theme='dark']:text-white/80 [data-theme='dark']:hover:border-white/40 [data-theme='dark']:hover:text-white">
                  Upload document
                  <input
                    type="file"
                    className="hidden"
                    onChange={(event) =>
                      setFileName(event.target.files?.[0]?.name ?? "")
                    }
                  />
                </label>
              </div>
            </>
          ) : stage === "idle" ? (
            <>
              <div className="flex min-h-[180px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/25 bg-white/5 px-4 py-6 text-center [data-theme='dark']:border-white/25 [data-theme='dark']:bg-white/5">
                <p className="text-sm font-medium text-primary">
                  Drag & drop {mode} file
                </p>
                <p className="text-xs text-tertiary">
                  {mode === "image"
                    ? "PNG, JPG, WEBP up to 20MB"
                    : "MP4, MOV, WEBM up to 500MB"}
                </p>
                <label className="cursor-pointer rounded-full border border-white/20 px-4 py-2 text-xs text-secondary transition hover:border-white/40 hover:text-primary [data-theme='dark']:border-white/20 [data-theme='dark']:text-white/80 [data-theme='dark']:hover:border-white/40 [data-theme='dark']:hover:text-white">
                  Upload {mode}
                  <input
                    type="file"
                    className="hidden"
                    onChange={(event) =>
                      setFileName(event.target.files?.[0]?.name ?? "")
                    }
                  />
                </label>
                {fileName && (
                  <span className="text-xs text-tertiary">Selected: {fileName}</span>
                )}
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-white/15 bg-white/5 px-4 py-3 [data-theme='dark']:border-white/15 [data-theme='dark']:bg-white/5">
                <span className="text-xs uppercase tracking-[0.2em] text-tertiary">
                  Or
                </span>
                <input
                  type="text"
                  className="w-full bg-transparent text-sm text-primary placeholder:text-tertiary focus:outline-none"
                  placeholder={`Paste ${mode} URL`}
                  value={linkInput}
                  onChange={(event) => setLinkInput(event.target.value)}
                />
              </div>
            </>
          ) : null}
        </div>

        <div className="glass-surface flex flex-col gap-4 p-4 md:p-5">
          <div>
            <h3 className="text-sm font-semibold text-primary">Scan settings</h3>
            <p className="mt-1 text-xs text-tertiary">
              Ensemble signal + community consensus
            </p>
          </div>
          <div className="flex flex-col gap-3 text-sm text-secondary">
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 [data-theme='dark']:border-white/10 [data-theme='dark']:bg-white/5">
              <span>Auto-detect language</span>
              <span className="text-xs text-emerald-600 [data-theme='dark']:text-emerald-200">Enabled</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 [data-theme='dark']:border-white/10 [data-theme='dark']:bg-white/5">
              <span>Submit to Community Court</span>
              <span className="text-xs text-amber-600 [data-theme='dark']:text-amber-200">Optional</span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 [data-theme='dark']:border-white/10 [data-theme='dark']:bg-white/5">
              <span>Explain Like I'm 5</span>
              <span className="text-xs text-cyan-600 [data-theme='dark']:text-cyan-200">On</span>
            </div>
          </div>
          <button
            type="button"
            onClick={stage === "result" ? handleReset : handleRunScan}
            disabled={stage === "analyzing"}
            className="mt-auto rounded-2xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60 [data-theme='dark']:bg-white/90 [data-theme='dark']:text-slate-900 [data-theme='dark']:hover:bg-white"
          >
            {stage === "analyzing"
              ? "Analyzing..."
              : stage === "result"
                ? "Start new scan"
                : "Get Verdict"}
          </button>
        </div>
      </div>
    </section>
  );
}
