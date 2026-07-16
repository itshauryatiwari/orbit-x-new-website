import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { PROJECTS } from "@/data/projects";

export const Route = createFileRoute("/work/")({
  head: () => ({
    meta: [
      { title: "Work — The Orbit X" },
      {
        name: "description",
        content: "Selected websites, brand design and video work from The Orbit X.",
      },
      { property: "og:title", content: "Our Work — The Orbit X" },
      { property: "og:description", content: "Selected projects across web, brand and video." },
    ],
  }),
  component: WorkIndex,
});

const CATS = ["All", "Web Development", "Graphic Design", "Video Editing"] as const;

function WorkIndex() {
  return (
    <>
      <Section className="pt-24">
        <SectionHeading
          eyebrow="Portfolio"
          title="Work we're proud of."
          description="A small but growing portfolio. Every project shipped end-to-end."
        />
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {CATS.map((c) => (
            <span
              key={c}
              className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-medium"
            >
              {c}
            </span>
          ))}
        </div>
      </Section>
      <Section className="pt-0">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((p) => (
            <Link
              key={p.slug}
              to="/work/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft hover:shadow-elevated"
            >
              <span className="text-[11px] font-medium uppercase tracking-widest text-orbit">
                {p.category}
              </span>
              <h3 className="mt-2 text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px]">
                    {t}
                  </span>
                ))}
              </div>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-orbit">
                View case <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
