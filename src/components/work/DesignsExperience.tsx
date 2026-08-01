import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Palette, X } from "lucide-react";
import { PROJECTS, type Project } from "@/data/projects";
import { cn } from "@/lib/utils";

const DESIGNS = PROJECTS.filter((p) => p.category === "Graphic Design");

/**
 * Preview treatment for each design card. Renders the design's real
 * thumbnail image when one is available; falls back to a brand-gradient
 * tile with a Palette mark (same treatment WebsitesExperience uses with
 * its Globe icon) if no thumbnail exists or the image fails to load.
 */
const PREVIEW_VARIANTS = ["bg-orbit-gradient", "bg-navy-gradient"] as const;

function DesignPreview({
  design,
  index,
  className,
}: {
  design: Project;
  index: number;
  className?: string;
}) {
  const [errored, setErrored] = useState(false);
  const variant = PREVIEW_VARIANTS[index % PREVIEW_VARIANTS.length];

  if (design.thumbnail && !errored) {
    return (
      <div className={cn("overflow-hidden", className)}>
        <img
          src={design.thumbnail}
          alt={design.title}
          onError={() => setErrored(true)}
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className={cn("flex items-center justify-center", variant, className)}>
      <Palette className="h-10 w-10 text-orbit-foreground/80" strokeWidth={1.5} />
    </div>
  );
}

function DesignLightbox({
  designs,
  index,
  onClose,
  onNavigate,
}: {
  designs: Project[];
  index: number;
  onClose: () => void;
  onNavigate: (next: number) => void;
}) {
  const [closing, setClosing] = useState(false);
  const design = designs[index];

  const close = useCallback(() => {
    setClosing(true);
    setTimeout(() => {
      setClosing(false);
      onClose();
    }, 280);
  }, [onClose]);

  const go = useCallback(
    (dir: 1 | -1) => {
      onNavigate((index + dir + designs.length) % designs.length);
    },
    [designs.length, index, onNavigate],
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

  if (!design) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[60] flex items-center justify-center bg-navy/90 p-4 backdrop-blur-md duration-300 sm:p-8 motion-reduce:animate-none",
        closing ? "animate-out fade-out zoom-out-95" : "animate-in fade-in zoom-in-95",
      )}
      role="dialog"
      aria-modal="true"
      aria-label={design.title}
      onClick={close}
    >
      <button
        onClick={close}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-navy-foreground transition-colors hover:bg-white/10 sm:right-6 sm:top-6"
      >
        <X className="h-5 w-5" />
      </button>

      {designs.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label="Previous design"
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-navy-foreground transition-colors hover:bg-white/10 sm:left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label="Next design"
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 text-navy-foreground transition-colors hover:bg-white/10 sm:right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </>
      )}

      <div
        className="flex max-h-full w-full max-w-4xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <DesignPreview
          design={design}
          index={index}
          className="aspect-[4/3] w-full max-h-[65vh] overflow-hidden rounded-3xl border border-white/10 shadow-elevated"
        />
        <div className="mt-6 w-full text-center">
          <span className="text-[11px] font-medium uppercase tracking-widest text-orbit">
            {design.category}
          </span>
          <h3 className="mt-2 text-2xl font-semibold text-navy-foreground sm:text-3xl">
            {design.title}
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm text-navy-foreground/70">{design.summary}</p>
          <div className="mt-4 flex flex-wrap justify-center gap-1.5">
            {design.tags.map((t) => (
              <span
                key={t}
                className="rounded-full bg-white/10 px-2.5 py-0.5 text-[11px] text-navy-foreground/80"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DesignsExperience() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="flex h-full flex-col">
      <div className="shrink-0 px-6 pb-6 pt-16 text-center sm:pt-20">
        <Palette className="mx-auto h-9 w-9 text-orbit" />
        <h2 className="mt-4 text-3xl font-semibold text-navy-foreground sm:text-4xl">
          Graphic Designs
        </h2>
        <p className="mt-2 text-sm text-navy-foreground/60 sm:text-base">
          Brand systems, decks, and visual identity.
        </p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-10 sm:px-6">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {DESIGNS.map((design, i) => (
            <button
              key={design.slug}
              onClick={() => setOpenIndex(i)}
              aria-label={`Open ${design.title}`}
              className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 bg-white/5 text-left shadow-elevated transition-shadow duration-300 hover:shadow-glow"
            >
              <DesignPreview
                design={design}
                index={i}
                className="absolute inset-0 h-full w-full transition-transform duration-500 ease-out group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-navy/0 transition-colors duration-300 group-hover:bg-navy/70" />

              <div className="absolute inset-0 flex flex-col justify-end p-3.5 opacity-0 transition-all duration-300 group-hover:opacity-100 translate-y-1.5 group-hover:translate-y-0 sm:p-4">
                <span className="text-[10px] font-medium uppercase tracking-widest text-orbit">
                  {design.category}
                </span>
                <h3 className="mt-1 text-sm font-semibold leading-tight text-navy-foreground sm:text-base">
                  {design.title}
                </h3>
                <div className="mt-2 flex flex-wrap gap-1">
                  {design.tags.map((t) => (
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

        {DESIGNS.length === 0 && (
          <p className="mx-auto mt-10 max-w-md text-center text-sm text-navy-foreground/60">
            No graphic design projects yet — check back soon.
          </p>
        )}
      </div>

      {openIndex !== null && (
        <DesignLightbox
          designs={DESIGNS}
          index={openIndex}
          onClose={() => setOpenIndex(null)}
          onNavigate={setOpenIndex}
        />
      )}
    </div>
  );
}