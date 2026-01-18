import Link from "next/link";
import { MultimodalQueryBox } from "@/components/MultimodalQueryBox";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function VideoPage() {
  return (
    <div className="min-h-screen pb-16 text-primary">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-6 pb-12 pt-10 lg:px-10">
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="glass-surface flex h-12 w-12 items-center justify-center text-xl font-semibold text-primary">
              V
            </div>
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-tertiary">
                VERDICT AI
              </p>
              <h1 className="text-2xl font-semibold text-primary">
                Video Detection
              </h1>
            </div>
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <nav className="glass-surface flex flex-wrap items-center gap-3 px-4 py-2 text-xs text-secondary">
              <Link href="/text" className="rounded-full px-3 py-1 hover:text-primary">
                Text
              </Link>
              <Link href="/image" className="rounded-full px-3 py-1 hover:text-primary">
                Image
              </Link>
              <Link
                href="/video"
                className="rounded-full bg-white/10 px-3 py-1 text-primary [data-theme='dark']:bg-white/10 [data-theme='dark']:text-white"
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
              Video Forensics
            </p>
            <h2 className="text-3xl font-semibold leading-tight text-primary md:text-4xl">
              Detect deepfakes and AI-generated video content
            </h2>
            <p className="text-sm text-secondary">
              Upload or paste a video URL to check if it was created or modified
              by AI. We analyze frame consistency, lip sync, and temporal
              artifacts that deepfake tools leave behind.
            </p>
            <div className="flex flex-wrap gap-3 text-xs text-secondary">
              <span className="glass-surface px-3 py-2">Frame analysis</span>
              <span className="glass-surface px-3 py-2">Lip sync detection</span>
              <span className="glass-surface px-3 py-2">Temporal consistency</span>
            </div>
          </div>
        </section>

        <MultimodalQueryBox />

        <section className="mt-16">
          <div className="glass-card p-8 md:p-10">
            <h3 className="text-2xl font-semibold text-primary">
              How video detection works
            </h3>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div className="flex flex-col gap-3">
                <h4 className="text-lg font-semibold text-primary">
                  Frame-by-frame analysis
                </h4>
                <p className="text-sm text-secondary">
                  We check each frame for inconsistencies in lighting, shadows,
                  and object positions. AI-generated videos often have subtle
                  jumps or glitches between frames.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="text-lg font-semibold text-primary">
                  Lip sync accuracy
                </h4>
                <p className="text-sm text-secondary">
                  Deepfake videos often have imperfect lip synchronization. We
                  analyze how well mouth movements match the audio track.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="text-lg font-semibold text-primary">
                  Temporal consistency
                </h4>
                <p className="text-sm text-secondary">
                  Real videos have smooth, natural motion. AI-generated content
                  sometimes has unnatural movement patterns or temporal
                  artifacts that we can detect.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <h4 className="text-lg font-semibold text-primary">
                  Audio analysis
                </h4>
                <p className="text-sm text-secondary">
                  We check if the audio matches the video and look for signs of
                  AI-generated voices or manipulated audio tracks that don't
                  align with the visuals.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
