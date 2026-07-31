import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Globe, Palette, Clapperboard, X } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { PROJECTS } from "@/data/projects";
import { WebsitesExperience } from "@/components/work/websites-experience";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — The Orbit X" },
      { name: "description", content: "Selected websites, brand design and video work from The Orbit X." },
      { property: "og:title", content: "Our Work — The Orbit X" },
      { property: "og:description", content: "Selected projects across web, brand and video." },
    ],
  }),
  component: WorkIndex,
});

const PORTALS = [
  { key: "web", label: "Websites", desc: "Conversion-focused sites we've shipped.", icon: Globe, category: "Web Development" as const },
  { key: "design", label: "Graphic Designs", desc: "Brand systems, decks, and visual identity.", icon: Palette, category: "Graphic Design" as const },
  { key: "reels", label: "Reels", desc: "Short-form edits built to stop the scroll.", icon: Clapperboard, category: "Video Editing" as const },
];

function WorkIndex() {
  const [active, setActive] = useState<(typeof PORTALS)[number] | null>(null);
  const [closing, setClosing] = useState(false);

  const close = () => {
    setClosing(true);
    setTimeout(() => {
      setActive(null);
      setClosing(false);
    }, 280);
  };

  return (
    <>
      <Section className="pt-24">
        <SectionHeading
          eyebrow="Portfolio"
          title="Explore our work."
          description="Three disciplines. One growth engine. Pick where you want to look."
        />
      </Section>

      <Section className="pt-0">
        <div className="grid gap-6 lg:grid-cols-3">
          {PORTALS.map((p) => {
            const count = PROJECTS.filter((x) => x.category === p.category).length;
            const Icon = p.icon;
            return (
              <button
                key={p.key}
                onClick={() => setActive(p)}
                className="group relative flex min-h-80 flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-7 text-left shadow-soft transition-all hover:shadow-elevated hover:bg-orbit-gradient hover:text-orbit-foreground"
              >
                <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-orbit/10 text-orbit transition-colors group-hover:bg-white/15 group-hover:text-orbit-foreground">
                  <span className="orbit-ring inset-0 animate-orbit motion-reduce:animate-none" />
                  <Icon className="h-5 w-5" />
                </div>
                <div className="mt-6">
                  <h3 className="text-2xl font-semibold">{p.label}</h3>
                  <p className="mt-2 text-sm text-muted-foreground group-hover:text-orbit-foreground/80">
                    {p.desc}
                  </p>
                </div>
                <div className="mt-8 flex items-center justify-between border-t border-border/50 pt-5 group-hover:border-white/20">
                  <span className="text-xs font-medium uppercase tracking-widest opacity-70">
                    {count > 0 ? `${count} project${count === 1 ? "" : "s"}` : "Coming soon"}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-medium">
                    Enter <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </Section>

      {active && (
        <div
          className={cn(
            "fixed inset-0 z-50 flex flex-col bg-navy-gradient text-navy-foreground duration-300 motion-reduce:animate-none",
            closing ? "animate-out fade-out zoom-out-95" : "animate-in fade-in zoom-in-95",
          )}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={close}
            aria-label="Close"
            className="absolute right-6 top-6 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>

          {active.key === "web" ? (
            <WebsitesExperience />
          ) : (
            <div className="flex flex-1 flex-col items-center justify-center p-6 text-center">
              <active.icon className="mx-auto h-10 w-10 text-orbit" />
              <h2 className="mt-5 text-4xl font-semibold sm:text-5xl">{active.label}</h2>
              <p className="mx-auto mt-4 max-w-md text-sm text-navy-foreground/70 sm:text-base">
                Full {active.label.toLowerCase()} gallery in progress. Placeholder for the fullscreen experience.
              </p>
            </div>
          )}
        </div>
      )}
    </>
  );
}