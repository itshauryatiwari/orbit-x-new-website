import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SERVICE_PACKAGES, BUNDLES } from "@/data/packages";
import { PackageBuilder } from "@/components/builders/package-builder";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing — The Orbit X" },
      {
        name: "description",
        content:
          "Transparent pricing for web, social, design and video. Growth bundles and a custom package builder.",
      },
      { property: "og:title", content: "Pricing — The Orbit X" },
      {
        property: "og:description",
        content: "Flexible solutions for every stage of growth.",
      },
    ],
  }),
  component: PricingPage,
});

const FAQ = [
  {
    q: "Can I mix and match services?",
    a: "Yes. Use the custom package builder to combine services and deliverables that fit your goals.",
  },
  {
    q: "Do you offer one-off projects?",
    a: "Yes. Web development is typically project-based. Social, design and video are monthly retainers.",
  },
  {
    q: "Are prices in INR?",
    a: "Yes, listed in INR. International clients can request USD-equivalent pricing.",
  },
];

function PricingPage() {
  return (
    <>
      <section className="bg-hero-gradient">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-orbit">Pricing</span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Flexible solutions for every stage of growth.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Pick a package, bundle services, or build a custom plan that fits your business.
          </p>
        </div>
      </section>

      {SERVICE_PACKAGES.map((group) => (
        <Section key={group.slug} className="pt-16">
          <SectionHeading eyebrow={group.title} title={`${group.title} packages`} />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {group.packages.map((p) => (
              <div
                key={p.name}
                className={`relative rounded-3xl border p-6 shadow-soft ${
                  p.featured
                    ? "border-orbit bg-navy text-navy-foreground shadow-elevated"
                    : "border-border bg-card"
                }`}
              >
                {p.featured && (
                  <span className="absolute right-4 top-4 rounded-full bg-orbit px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-orbit-foreground">
                    Popular
                  </span>
                )}
                <h3 className="text-lg font-semibold">{p.name}</h3>
                <p className={`mt-1 text-sm ${p.featured ? "text-white/70" : "text-muted-foreground"}`}>
                  {p.tagline}
                </p>
                <div className="mt-4 font-display text-3xl font-semibold">{p.price}</div>
                <ul className="mt-6 space-y-2 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className={`mt-0.5 h-4 w-4 shrink-0 ${p.featured ? "text-orbit-foreground" : "text-orbit"}`} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      ))}

      <Section className="bg-secondary/40">
        <SectionHeading
          eyebrow="Growth bundles"
          title="Save when you bundle."
          description="Combine services for a complete, coordinated digital presence."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {BUNDLES.map((p) => (
            <div
              key={p.name}
              className={`relative rounded-3xl border p-6 shadow-soft ${
                p.featured
                  ? "border-orbit bg-navy text-navy-foreground shadow-elevated"
                  : "border-border bg-card"
              }`}
            >
              {p.featured && (
                <span className="absolute right-4 top-4 rounded-full bg-orbit px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-orbit-foreground">
                  Best value
                </span>
              )}
              <h3 className="text-lg font-semibold">{p.name}</h3>
              <p className={`mt-1 text-sm ${p.featured ? "text-white/70" : "text-muted-foreground"}`}>
                {p.tagline}
              </p>
              <div className="mt-4 font-display text-3xl font-semibold">{p.price}</div>
              <ul className="mt-6 space-y-2 text-sm">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${p.featured ? "text-orbit-foreground" : "text-orbit"}`} />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Custom builder"
          title="Not sure? Build your own package."
          description="Answer 4 quick steps and get a personalized plan on WhatsApp."
        />
        <div className="mx-auto mt-12 max-w-3xl">
          <PackageBuilder />
        </div>
      </Section>

      <Section className="bg-secondary/40">
        <SectionHeading eyebrow="FAQ" title="Package questions." />
        <div className="mx-auto mt-10 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {FAQ.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                <AccordionContent>{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      <Section>
        <div className="rounded-3xl border border-border bg-navy-gradient p-10 text-center text-navy-foreground shadow-elevated sm:p-14">
          <h2 className="text-3xl font-semibold sm:text-4xl">Free consultation?</h2>
          <p className="mx-auto mt-3 max-w-xl text-white/70">
            15 minutes on WhatsApp or email. We'll help you scope the right first move.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="orbit" size="lg">
              <Link to="/contact">Book consultation</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
