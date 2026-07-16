import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { PROJECTS, getProject } from "@/data/projects";
import { whatsappLink } from "@/constants/site";

export const Route = createFileRoute("/work/$slug")({
  head: ({ params }) => {
    const p = params ? getProject(params.slug) : undefined;
    if (!p) return { meta: [{ title: "Project — The Orbit X" }] };
    return {
      meta: [
        { title: `${p.title} — The Orbit X` },
        { name: "description", content: p.summary },
        { property: "og:title", content: `${p.title} — The Orbit X` },
        { property: "og:description", content: p.summary },
      ],
    };
  },
  component: ProjectPage,
  notFoundComponent: () => (
    <Section className="pt-24 text-center">
      <SectionHeading title="Project not found" />
      <div className="mt-8">
        <Button asChild variant="orbit">
          <Link to="/work">Back to work</Link>
        </Button>
      </div>
    </Section>
  ),
});

function ProjectPage() {
  const { slug } = Route.useParams();
  const project = getProject(slug);
  if (!project) throw notFound();

  return (
    <>
      <section className="bg-hero-gradient">
        <div className="mx-auto max-w-5xl px-4 pb-14 pt-20 sm:px-6 sm:pt-28 lg:px-8">
          <Link to="/work" className="inline-flex items-center gap-1 text-sm text-orbit">
            <ArrowLeft className="h-4 w-4" /> All work
          </Link>
          <span className="mt-6 block text-xs font-semibold uppercase tracking-widest text-orbit">
            {project.category}
          </span>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            {project.title}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{project.summary}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {project.tags.map((t) => (
              <span key={t} className="rounded-full border border-border bg-card px-3 py-1 text-xs">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <Section>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { label: "Overview", body: project.summary },
            {
              label: "Challenge",
              body:
                "The client needed a digital presence that felt premium, communicated the offer clearly, and converted qualified leads without a heavy sales team.",
            },
            {
              label: "Solution",
              body:
                "A focused build with clear positioning, a fast responsive design, and integrated inquiry funnels wired to WhatsApp.",
            },
          ].map((b) => (
            <div key={b.label} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <span className="text-xs font-semibold uppercase tracking-widest text-orbit">
                {b.label}
              </span>
              <p className="mt-3 text-sm">{b.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <SectionHeading eyebrow="Outcomes" title="What changed after launch." />
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            { n: "3×", label: "More inbound inquiries" },
            { n: "< 2s", label: "Page load" },
            { n: "90+", label: "Lighthouse score" },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft">
              <div className="font-display text-4xl font-semibold text-navy">{s.n}</div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="rounded-3xl border border-border bg-navy-gradient p-10 text-navy-foreground shadow-elevated sm:p-14">
          <h2 className="text-3xl font-semibold sm:text-4xl">Want something like this?</h2>
          <p className="mt-3 max-w-xl text-white/70">
            Tell us about your project. We'll come back with a plan.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="whatsapp" size="lg">
              <a href={whatsappLink()} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" /> WhatsApp us
              </a>
            </Button>
            <Button asChild variant="orbit" size="lg">
              <Link to="/contact">Get quote</Link>
            </Button>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Next" title="More work." />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {PROJECTS.filter((p) => p.slug !== project.slug).slice(0, 3).map((p) => (
            <Link
              key={p.slug}
              to="/work/$slug"
              params={{ slug: p.slug }}
              className="rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-elevated"
            >
              <span className="text-[11px] font-medium uppercase tracking-widest text-orbit">
                {p.category}
              </span>
              <div className="mt-2 font-semibold">{p.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{p.summary}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
