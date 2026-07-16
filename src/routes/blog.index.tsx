import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/ui/section";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — The Orbit X" },
      {
        name: "description",
        content:
          "Insights on web, social media, design and video from The Orbit X.",
      },
      { property: "og:title", content: "Blog — The Orbit X" },
      { property: "og:description", content: "Growth insights from The Orbit X." },
    ],
  }),
  component: BlogIndex,
});

const POSTS = [
  {
    title: "Why small businesses lose leads (and how to fix it)",
    desc: "Five conversion mistakes on small business sites, and simple fixes for each.",
    date: "Coming soon",
    category: "Web",
  },
  {
    title: "A social calendar that actually gets posted",
    desc: "A lightweight monthly system to plan, batch and publish without burnout.",
    date: "Coming soon",
    category: "Social",
  },
  {
    title: "What premium brand design looks like in 2026",
    desc: "The visual patterns modern brands use, and how to bring them to yours.",
    date: "Coming soon",
    category: "Design",
  },
];

function BlogIndex() {
  return (
    <>
      <section className="bg-hero-gradient">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-orbit">Blog</span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Growth notes from The Orbit X.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Practical guides on web, social, design and video — for founders who ship.
          </p>
        </div>
      </section>

      <Section>
        <SectionHeading eyebrow="Upcoming articles" title="Fresh writing, launching soon." />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {POSTS.map((p) => (
            <article
              key={p.title}
              className="flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft"
            >
              <span className="text-[11px] font-medium uppercase tracking-widest text-orbit">
                {p.category}
              </span>
              <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm text-muted-foreground">{p.desc}</p>
              <span className="mt-6 text-xs text-muted-foreground">{p.date}</span>
            </article>
          ))}
        </div>
      </Section>
    </>
  );
}
