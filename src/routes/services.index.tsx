import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/data/services";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — The Orbit X" },
      {
        name: "description",
        content:
          "Web development, social media, graphic design and video editing services from The Orbit X.",
      },
      { property: "og:title", content: "Services — The Orbit X" },
      {
        property: "og:description",
        content: "Explore all four services offered by The Orbit X.",
      },
    ],
  }),
  component: ServicesIndex,
});

function ServicesIndex() {
  return (
    <>
      <Section className="pt-24">
        <SectionHeading
          eyebrow="Services"
          title="Everything you need to grow online."
          description="Pick a single service, or bundle several for a complete digital presence."
        />
      </Section>
      <Section className="pt-0">
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group flex flex-col rounded-3xl border border-border bg-card p-8 shadow-soft transition-shadow hover:shadow-elevated"
            >
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-orbit/10 text-orbit">
                <s.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-2xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-muted-foreground">{s.description}</p>
              <ul className="mt-6 grid grid-cols-2 gap-2 text-sm">
                {s.deliverables.slice(0, 4).map((d) => (
                  <li key={d} className="flex items-start gap-2">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-orbit" />
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <span className="mt-8 inline-flex items-center gap-1 text-sm font-medium text-orbit">
                Explore {s.title}{" "}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-14 text-center">
          <Button asChild variant="orbit" size="lg">
            <Link to="/pricing">See pricing & packages</Link>
          </Button>
        </div>
      </Section>
    </>
  );
}
