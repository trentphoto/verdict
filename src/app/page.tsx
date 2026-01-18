import Link from "next/link";
import { CommunityFeed } from "@/components/CommunityFeed";
import { MultimodalQueryBox } from "@/components/MultimodalQueryBox";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  return (
    <div className="min-h-screen pb-16 text-primary">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-12 pt-10 lg:px-10">
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <div className="glass-surface flex h-12 w-12 items-center justify-center text-xl font-semibold text-primary">
              V
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-tertiary">
                VERDICT AI
              </p>
              <h1 className="text-2xl font-semibold text-primary">
                Get the Human & AI Verdict
              </h1>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <nav className="glass-surface flex flex-wrap items-center gap-3 px-4 py-2 text-xs text-secondary">
              <Link
                href="/text"
                className="rounded-full px-3 py-1 hover:text-primary"
              >
                Text
              </Link>
              <Link
                href="/image"
                className="rounded-full px-3 py-1 hover:text-primary"
              >
                Image
              </Link>
              <Link
                href="/video"
                className="rounded-full px-3 py-1 hover:text-primary"
              >
                Video
              </Link>
              <Link
                href="/community"
                className="rounded-full px-3 py-1 hover:text-primary"
              >
                Community
              </Link>
            </nav>
            <ThemeToggle />
          </div>
        </header>

        <section>
          <div className="glass-card flex flex-col gap-6 p-6 md:p-8">
            <p className="text-xs uppercase tracking-[0.3em] text-tertiary">
              Find the Truth
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-primary md:text-4xl">
              Is it real or AI? Check text, images, and videos with multiple
              tools and community votes.
            </h2>
            <p className="text-sm text-secondary">
              We use several AI detection tools plus real people voting to give
              you a clear answer you can trust.
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-secondary">
              <span className="glass-surface px-3 py-2">
                Multiple AI checks
              </span>
              <span className="glass-surface px-3 py-2">See why we think it's AI</span>
              <span className="glass-surface px-3 py-2">Community votes</span>
            </div>
          </div>
        </section>

        <MultimodalQueryBox />
        <CommunityFeed />

        <section className="mt-16">
          <div className="glass-card p-8 md:p-10">
            <div className="mb-8">
              <p className="text-xs uppercase tracking-[0.3em] text-tertiary">
                How It Works
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-primary md:text-4xl">
                Why you can trust our verdicts
              </h2>
              <p className="mt-4 text-sm text-secondary">
                We combine the best AI detection tools with real human judgment
                to give you answers you can defend.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col gap-3">
                <div className="glass-surface flex h-12 w-12 items-center justify-center text-xl font-semibold text-primary">
                  1
                </div>
                <h3 className="text-lg font-semibold text-primary">
                  Multiple AI checks
                </h3>
                <p className="text-sm text-secondary">
                  We run your content through several leading detection tools
                  and combine their results using our own weighted system. No
                  single tool is perfect, but together they catch more fakes.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="glass-surface flex h-12 w-12 items-center justify-center text-xl font-semibold text-primary">
                  2
                </div>
                <h3 className="text-lg font-semibold text-primary">
                  Human verification
                </h3>
                <p className="text-sm text-secondary">
                  When AI results are unclear, our community votes on whether
                  content is real or fake. People often spot things algorithms
                  miss, especially in edge cases.
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="glass-surface flex h-12 w-12 items-center justify-center text-xl font-semibold text-primary">
                  3
                </div>
                <h3 className="text-lg font-semibold text-primary">
                  Transparent results
                </h3>
                <p className="text-sm text-secondary">
                  We show you exactly why we think something is AI-generated,
                  highlighting specific parts that triggered our detectors. No
                  black box—you see the evidence.
                </p>
              </div>
            </div>

            <div className="mt-12 grid gap-6 border-t border-white/10 pt-8 md:grid-cols-2 [data-theme='dark']:border-white/10">
              <div>
                <h3 className="text-lg font-semibold text-primary">
                  What makes us different
                </h3>
                <p className="mt-3 text-sm text-secondary">
                  Most detection tools give you one score from one algorithm.
                  We combine multiple AI detectors with community consensus,
                  creating a more reliable answer. Our weighted scoring system
                  learns from both AI and human feedback to improve over time.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">
                  Your data stays private
                </h3>
                <p className="mt-3 text-sm text-secondary">
                  By default, your scans are private. We only use public
                  submissions (that you opt into) to improve our detection
                  system. Your sensitive content never leaves your control unless
                  you choose to share it.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <div className="glass-surface flex flex-col gap-4 p-6 md:p-8">
            <div>
              <h3 className="text-lg font-semibold text-primary">System Status</h3>
              <p className="mt-2 text-sm text-tertiary">
                All our detection tools are running and ready to check your content.
              </p>
            </div>
            <div className="space-y-3 text-sm text-secondary">
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 [data-theme='dark']:border-white/10 [data-theme='dark']:bg-white/5">
                <span>Text checkers</span>
                <span className="text-emerald-600 [data-theme='dark']:text-emerald-200">4/4</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 [data-theme='dark']:border-white/10 [data-theme='dark']:bg-white/5">
                <span>Image checkers</span>
                <span className="text-emerald-600 [data-theme='dark']:text-emerald-200">3/3</span>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 [data-theme='dark']:border-white/10 [data-theme='dark']:bg-white/5">
                <span>People voting</span>
                <span className="text-cyan-600 [data-theme='dark']:text-cyan-200">18,402</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
