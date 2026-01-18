"use client";

import Link from "next/link";
import { useState, useCallback } from "react";

type VoteType = "real" | "ai" | "skip";

interface CommunityItem {
  id: string;
  type: string;
  title: string;
  excerpt: string;
  crowdScore: string;
  aiScore: string;
  votes: number;
  actualAnswer: "real" | "ai";
}

const initialItems: CommunityItem[] = [
  {
    id: "case-918",
    type: "Image",
    title: "City skyline at golden hour",
    excerpt: "Lighting looks uniform across reflective glass towers.",
    crowdScore: "82% AI",
    aiScore: "76% AI",
    votes: 412,
    actualAnswer: "ai",
  },
  {
    id: "case-771",
    type: "Text",
    title: "Scholarship essay excerpt",
    excerpt:
      "The narrative cadence shifts every sentence and the vocabulary is highly repetitive.",
    crowdScore: "54% AI",
    aiScore: "61% AI",
    votes: 238,
    actualAnswer: "ai",
  },
  {
    id: "case-553",
    type: "Video",
    title: "Breaking news interview clip",
    excerpt: "Lip sync drifts subtly around 00:19 with inconsistent shadows.",
    crowdScore: "67% AI",
    aiScore: "72% AI",
    votes: 301,
    actualAnswer: "ai",
  },
  {
    id: "case-412",
    type: "Image",
    title: "Nature trail photo",
    excerpt: "EXIF metadata missing; FFT highlights repeating patterns.",
    crowdScore: "48% AI",
    aiScore: "52% AI",
    votes: 129,
    actualAnswer: "real",
  },
  {
    id: "case-289",
    type: "Text",
    title: "Product review on Amazon",
    excerpt: "Natural typos and personal anecdotes throughout the review.",
    crowdScore: "23% AI",
    aiScore: "18% AI",
    votes: 89,
    actualAnswer: "real",
  },
  {
    id: "case-156",
    type: "Image",
    title: "Portrait of a young woman",
    excerpt: "Asymmetric earrings and natural skin texture visible.",
    crowdScore: "31% AI",
    aiScore: "28% AI",
    votes: 203,
    actualAnswer: "real",
  },
];

const feedbackMessages = {
  correct: [
    "Nice catch!",
    "You nailed it!",
    "Sharp eye!",
    "Exactly right!",
    "Perfect!",
    "Great instincts!",
  ],
  wrong: [
    "Tricky one!",
    "Close call!",
    "That fooled many!",
    "Tough to spot!",
    "A hard one!",
  ],
  skip: ["No worries!", "Next one!", "Moving on!", "Fair enough!"],
};

function getRandomMessage(type: "correct" | "wrong" | "skip") {
  const messages = feedbackMessages[type];
  return messages[Math.floor(Math.random() * messages.length)];
}

export function CommunityFeed() {
  const [items, setItems] = useState<CommunityItem[]>(initialItems);
  const [votedItems, setVotedItems] = useState<
    Map<string, { vote: VoteType; correct?: boolean; message: string }>
  >(new Map());
  const [stats, setStats] = useState({ correct: 0, total: 0, streak: 0 });
  const [animatingId, setAnimatingId] = useState<string | null>(null);

  const handleVote = useCallback(
    (itemId: string, vote: VoteType) => {
      if (votedItems.has(itemId) || animatingId) return;

      const item = items.find((i) => i.id === itemId);
      if (!item) return;

      setAnimatingId(itemId);

      let isCorrect: boolean | undefined;
      let messageType: "correct" | "wrong" | "skip" = "skip";

      if (vote !== "skip") {
        isCorrect = vote === item.actualAnswer;
        messageType = isCorrect ? "correct" : "wrong";

        setStats((prev) => ({
          correct: prev.correct + (isCorrect ? 1 : 0),
          total: prev.total + 1,
          streak: isCorrect ? prev.streak + 1 : 0,
        }));
      }

      const message = getRandomMessage(messageType);

      setVotedItems((prev) => {
        const newMap = new Map(prev);
        newMap.set(itemId, { vote, correct: isCorrect, message });
        return newMap;
      });

      // Remove item after animation
      setTimeout(() => {
        setItems((prev) => prev.filter((i) => i.id !== itemId));
        setAnimatingId(null);
      }, 1500);
    },
    [items, votedItems, animatingId]
  );

  const visibleItems = items.slice(0, 4); // Show 4 items as preview

  return (
    <section className="mt-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-tertiary">
            Help Train Our AI
          </p>
          <h3 className="mt-2 text-2xl font-semibold text-primary">
            Vote: Real or AI?
          </h3>
          <p className="mt-2 text-sm text-tertiary">
            Test your skills and help improve detection accuracy. Preview below,
            or view the full queue.
          </p>
        </div>
        <div className="flex items-center gap-4">
          {stats.total > 0 && (
            <div className="glass-surface flex items-center gap-4 px-4 py-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-tertiary">Score:</span>
                <span className="font-semibold text-primary">
                  {stats.correct}/{stats.total}
                </span>
              </div>
              {stats.streak > 1 && (
                <div className="flex items-center gap-1 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-600 [data-theme='dark']:bg-amber-400/20 [data-theme='dark']:text-amber-300">
                  <span className="animate-pulse">🔥</span>
                  <span>{stats.streak} streak!</span>
                </div>
              )}
            </div>
          )}
        <Link
          href="/community"
          className="glass-surface px-4 py-2 text-xs font-semibold text-secondary transition hover:text-primary"
        >
          View all
        </Link>
        </div>
      </div>

      <div className="mt-6 grid gap-6">
        {visibleItems.length === 0 ? (
          <div className="glass-card flex flex-col items-center justify-center p-12 text-center">
            <div className="mb-4 text-5xl">🎉</div>
            <h4 className="text-xl font-semibold text-primary">
              You voted on everything!
            </h4>
            <p className="mt-2 text-sm text-secondary">
              Thanks for helping improve our detection. Check back later for
              more.
            </p>
            {stats.total > 0 && (
              <div className="mt-4 glass-surface px-6 py-3 text-sm">
                Final score:{" "}
                <span className="font-semibold text-primary">
                  {stats.correct}/{stats.total}
                </span>{" "}
                ({Math.round((stats.correct / stats.total) * 100)}% accuracy)
              </div>
            )}
          </div>
        ) : (
          visibleItems.map((item) => {
            const voteData = votedItems.get(item.id);
            const isAnimating = animatingId === item.id;

            return (
              <article
                key={item.id}
                className={`glass-card relative overflow-hidden p-5 transition-all duration-500 md:p-6 ${
                  isAnimating
                    ? voteData?.correct === true
                      ? "scale-95 border-2 border-emerald-500 opacity-0 translate-x-full"
                      : voteData?.correct === false
                        ? "scale-95 border-2 border-rose-500 opacity-0 -translate-x-full"
                        : "scale-95 opacity-0 translate-y-8"
                    : ""
                }`}
              >
                {/* Feedback overlay */}
                {isAnimating && voteData && (
                  <div
                    className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 rounded-3xl ${
                      voteData.correct === true
                        ? "bg-emerald-500/90"
                        : voteData.correct === false
                          ? "bg-rose-500/90"
                          : "bg-slate-500/90"
                    }`}
                  >
                    <span className="text-4xl">
                      {voteData.correct === true
                        ? "✓"
                        : voteData.correct === false
                          ? "✗"
                          : "→"}
                    </span>
                    <span className="text-lg font-semibold text-white">
                      {voteData.message}
                    </span>
                    {voteData.vote !== "skip" && (
                      <span className="mt-1 text-sm text-white/80">
                        It was {item.actualAnswer === "ai" ? "AI" : "Real"}
                      </span>
                    )}
                    {voteData.correct && stats.streak > 1 && (
                      <span className="mt-2 animate-bounce text-2xl">🔥</span>
                    )}
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="text-xs uppercase tracking-[0.25em] text-tertiary">
                      {item.type}
                    </p>
                    <h4 className="mt-2 text-lg font-semibold text-primary">
                      {item.title}
                    </h4>
                  </div>
                  <div className="glass-surface flex items-center gap-4 px-4 py-2 text-xs text-secondary">
                    <span>Crowd: {item.crowdScore}</span>
                    <span className="text-tertiary">|</span>
                    <span>AI: {item.aiScore}</span>
                  </div>
                </div>

                <p className="mt-4 text-sm text-secondary">{item.excerpt}</p>

                <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-xs text-tertiary">
                    <span>{item.votes + (voteData ? 1 : 0)} votes</span>
                    <span>•</span>
                    <span>What do you think?</span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleVote(item.id, "real")}
                      disabled={!!voteData || !!animatingId}
                      className="group relative overflow-hidden rounded-full border-2 border-emerald-500/50 px-5 py-2.5 text-sm font-semibold text-emerald-700 transition-all hover:border-emerald-500 hover:bg-emerald-500 hover:text-white hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed [data-theme='dark']:border-emerald-400/50 [data-theme='dark']:text-emerald-300 [data-theme='dark']:hover:border-emerald-400 [data-theme='dark']:hover:bg-emerald-500"
                    >
                      <span className="relative z-10">REAL</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleVote(item.id, "ai")}
                      disabled={!!voteData || !!animatingId}
                      className="group relative overflow-hidden rounded-full border-2 border-rose-500/50 px-5 py-2.5 text-sm font-semibold text-rose-700 transition-all hover:border-rose-500 hover:bg-rose-500 hover:text-white hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed [data-theme='dark']:border-rose-400/50 [data-theme='dark']:text-rose-300 [data-theme='dark']:hover:border-rose-400 [data-theme='dark']:hover:bg-rose-500"
                    >
                      <span className="relative z-10">AI</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => handleVote(item.id, "skip")}
                      disabled={!!voteData || !!animatingId}
                      className="rounded-full border border-slate-300 px-4 py-2 text-xs font-semibold text-secondary transition-all hover:border-slate-400 hover:bg-slate-100 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed [data-theme='dark']:border-white/20 [data-theme='dark']:text-white/70 [data-theme='dark']:hover:border-white/40 [data-theme='dark']:hover:bg-white/10"
                    >
                      Skip
                    </button>
                  </div>
                </div>
              </article>
            );
          })
        )}
      </div>

      {items.length > visibleItems.length && (
        <div className="mt-6 text-center">
          <Link
            href="/community"
            className="glass-surface inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-secondary transition hover:text-primary"
          >
            <span>View all {items.length} items in queue</span>
            <span>→</span>
          </Link>
        </div>
      )}
    </section>
  );
}
