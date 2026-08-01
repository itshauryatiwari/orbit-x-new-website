import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Clapperboard, Play, X } from "lucide-react";
import { PROJECTS, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const REELS = PROJECTS.filter((p) => p.category === "Video Editing");

/**
 * Deterministic preview treatment for each reel card.
 * Same idea as DesignsExperience's DesignPreview: when a project doesn't ship
 * a real `thumbnail`, fall back to a brand-gradient tile with a mark. Once a
 * reel has `thumbnail` (and/or `video`) set on its PROJECTS entry, this swaps
 * in automatically — no component changes required.
 */
const PREVIEW_VARIANTS = ["bg-orbit-gradient", "bg-navy-gradient"] as const;

function ReelThumbnail({ reel, index, className }: { reel: Project; index: number; className?: string }) {
  if (reel.thumbnail) {
    return (
      <img
        src={reel.thumbnail}
        alt=""
        className={cn("h-full w-full object-cover", className)}
        loading="lazy"
      />
    );
  }
  const variant = PREVIEW_VARIANTS[index % PREVIEW_VARIANTS.length];
  return (
    <div className={cn("flex items-center justify-center", variant, className)}>
      <Clapperboard className="h-9 w-9 text-orbit-foreground/80" strokeWidth={1.5} />
    </div>
  );
}

function ReelViewer({
  reels,
  index,
  onClose,
  onNavigate,
}: {
  reels: Project[];
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const [closing, setClosing] = useState(false);
  const reel = reels[index];

  const close = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 280);
  }, [onClose]);

  const go = useCallback(
    (dir: 1 | -1) => {
      onNavigate((index + dir + reels.length) % reels.length);
    },
    [index, reels.length, onNavigate],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [close, go]);

  if (!reel) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] flex items-center justify-center bg-navy/90 p-4 backdrop-blur-md duration-300 sm:p-8 motion-reduce:animate-none",
        closing ? "animate-out fade-out zoom-out-95" : "animate-in fade-in zoom-in-95",
      )}
      role="dialog"
      aria-modal="true"
      aria-label={reel.title}
      onClick={close}
    >
      <button
        onClick={close}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-navy-foreground transition-colors hover:bg-white/10 sm:right-6 sm:top-6"
      >
        <X className="h-5 w-5" />
      </button>

      {reels.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label="Previous reel"
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-navy-foreground transition-colors hover:bg-white/10 sm:left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label="Next reel"
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-navy-foreground transition-colors hover:bg-white/10 sm:right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      <div
        className="flex h-full w-full items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-[90vh] aspect-[9/16] max-w-md overflow-hidden rounded-3xl border border-white/10 bg-navy shadow-elevated">
          {reel.video ? (
            <video
              key={reel.slug}
              src={reel.video}
              poster={reel.thumbnail}
              controls
              autoPlay
              playsInline
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="relative h-full w-full">
              <ReelThumbnail reel={reel} index={index} className="absolute inset-0 h-full w-full" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-navy/40">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur">
                  <Play className="ml-1 h-6 w-6 text-navy-foreground" fill="currentColor" />
                </span>
                <p className="text-xs font-medium uppercase tracking-widest text-navy-foreground/70">
                  Video coming soon
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ReelsExperience() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0 px-6 pb-6 pt-16 text-center sm:pt-20">
        <Clapperboard className="mx-auto h-9 w-9 text-orbit" />
        <h2 className="mt-4 text-3xl font-semibold text-navy-foreground sm:text-4xl">Reels</h2>
        <p className="mt-2 text-sm text-navy-foreground/60 sm:text-base">
          Short-form edits built to stop the scroll.
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-10 sm:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
          {REELS.map((reel, i) => (
            <button
              key={reel.slug}
              onClick={() => setOpenIndex(i)}
              aria-label={`Play ${reel.title}`}
              className="group relative aspect-[9/16] overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left shadow-elevated transition-shadow duration-300 hover:shadow-glow"
            >
              <ReelThumbnail
                reel={reel}
                index={i}
                className="absolute inset-0 h-full w-full transition-transform duration-500 ease-out group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-navy/20 transition-colors duration-300 group-hover:bg-navy/70" />

              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-white/15 backdrop-blur transition-transform duration-300 ease-out group-hover:scale-110 sm:h-12 sm:w-12">
                  <Play className="ml-0.5 h-4 w-4 text-navy-foreground sm:h-5 sm:w-5" fill="currentColor" />
                </span>
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-3.5 opacity-0 transition-all duration-300 group-hover:opacity-100 translate-y-1.5 group-hover:translate-y-0 sm:p-4">
                <span className="text-[10px] font-medium uppercase tracking-widest text-orbit">
                  {reel.category}
                </span>
                <h3 className="mt-1 text-sm font-semibold leading-tight text-navy-foreground sm:text-base">
                  {reel.title}
                </h3>
                <div className="mt-2 flex flex-wrap gap-1">
                  {reel.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-navy-foreground/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>

        {REELS.length === 0 && (
          <p className="mx-auto mt-10 max-w-md text-center text-sm text-navy-foreground/60">
            No reels yet — check back soon.
          </p>
        )}
      </div>

      {openIndex !== null && (
        <ReelViewer
          reels={REELS}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </div>
  );
}