import { createFileRoute, Link } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/data/services";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — The Orbit X" },
      {
        name: "description",
        content:
          "The Orbit X is a growth-focused digital agency helping small and medium businesses build a stronger digital presence.",
      },
      { property: "og:title", content: "About — The Orbit X" },
      {
        property: "og:description",
        content: "Why The Orbit X exists and how we work.",
      },
    ],
  }),
  component: AboutPage,
});

const VALUES = [
  { title: "Quality", desc: "We ship work we'd sign our name to." },
  { title: "Transparency", desc: "Clear pricing, honest timelines, no surprises." },
  { title: "Reliability", desc: "We reply fast and deliver when we said we would." },
  { title: "Improvement", desc: "We iterate — on our work, our process, ourselves." },
];

const APPROACH = ["Understand", "Plan", "Create", "Refine", "Deliver"];

function AboutPage() {
  return (
    <>
      <section className="bg-hero-gradient">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-orbit">About</span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            A small, focused agency in orbit around your growth.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            We're The Orbit X — a digital agency helping ambitious small and medium businesses
            build a digital presence that actually works.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Our mission"
              title="Make premium digital work accessible."
              description="Great websites, brand and content shouldn't be locked behind agency retainers only enterprises can afford. We make the same quality accessible to founders, coaches and local businesses."
            />
          </div>
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <p className="text-lg italic text-muted-foreground">
              "We started The Orbit X because we kept seeing small businesses with great offers
              held back by weak digital execution. We fix that — fast, honestly, affordably."
            </p>
          </div>
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <SectionHeading eyebrow="Our approach" title="Five steps, every project." />
        <div className="mt-12 grid gap-4 md:grid-cols-5">
          {APPROACH.map((s, i) => (
            <div key={s} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <span className="text-xs font-semibold text-orbit">0{i + 1}</span>
              <h3 className="mt-1 text-lg font-semibold">{s}</h3>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Values" title="What we believe." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <h3 className="font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{v.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <SectionHeading eyebrow="Snapshot" title="What we offer." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elevated"
            >
              <s.icon className="h-5 w-5 text-orbit" />
              <div className="mt-3 font-semibold">{s.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{s.short}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-3xl border border-border bg-navy-gradient p-10 text-center text-navy-foreground shadow-elevated sm:p-14">
          <h2 className="text-3xl font-semibold sm:text-4xl">Let's build something together.</h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="orbit" size="lg">
              <Link to="/contact">Start a project</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
              <Link to="/work">See our work</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
