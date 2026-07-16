import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, ArrowRight, MessageCircle } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SERVICES, getService } from "@/data/services";
import { SERVICE_PACKAGES } from "@/data/packages";
import { whatsappLink } from "@/constants/site";

export const Route = createFileRoute("/services/$slug")({
  head: ({ params }) => {
    const s = params ? getService(params.slug) : undefined;
    if (!s) {
      return { meta: [{ title: "Service — The Orbit X" }] };
    }
    return {
      meta: [
        { title: `${s.title} — The Orbit X` },
        { name: "description", content: s.description },
        { property: "og:title", content: `${s.title} — The Orbit X` },
        { property: "og:description", content: s.description },
      ],
    };
  },
  component: ServiceDetail,
  notFoundComponent: () => (
    <Section className="pt-24 text-center">
      <SectionHeading title="Service not found" description="This service page doesn't exist." />
      <div className="mt-8">
        <Button asChild variant="orbit">
          <Link to="/services">All services</Link>
        </Button>
      </div>
    </Section>
  ),
});

function ServiceDetail() {
  const { slug } = Route.useParams();
  const service = getService(slug);
  if (!service) {
    throw notFound();
  }
  const Icon = service.icon;

  const packages = SERVICE_PACKAGES.find((g) =>
    service.slug === "web-development" ? g.slug === "web-development" :
    service.slug === "social-media-management" ? g.slug === "social-media" :
    service.slug === "graphic-design" ? g.slug === "graphic-design" :
    g.slug === "video-editing",
  );

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-orbit/20 bg-orbit/10 px-3 py-1 text-xs font-medium text-orbit">
              <Icon className="h-3.5 w-3.5" /> {service.flagship ? "Flagship service" : "Service"}
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              {service.title}
            </h1>
            <p className="mt-5 text-lg text-muted-foreground">{service.short}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="orbit" size="lg">
                <Link to="/contact">Get a quote</Link>
              </Button>
              <Button asChild variant="whatsapp" size="lg">
                <a href={whatsappLink(`Hi Orbit X, I'm interested in ${service.title}.`)} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" /> WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problem / Solution */}
      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              The problem
            </span>
            <p className="mt-3 text-lg">{service.problem}</p>
          </div>
          <div className="rounded-3xl border border-orbit/20 bg-navy-gradient p-8 text-navy-foreground shadow-elevated">
            <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
              Our solution
            </span>
            <p className="mt-3 text-lg">{service.solution}</p>
          </div>
        </div>
      </Section>

      {/* Benefits */}
      <Section className="bg-secondary/40">
        <SectionHeading eyebrow="Benefits" title="Outcomes, not features." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {service.benefits.map((b) => (
            <div key={b} className="flex items-start gap-3 rounded-2xl border border-border bg-card p-5 shadow-soft">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-orbit" />
              <span className="font-medium">{b}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Deliverables */}
      <Section>
        <SectionHeading eyebrow="What you get" title="Deliverables." />
        <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {service.deliverables.map((d) => (
            <div key={d} className="rounded-xl border border-border bg-card p-4 text-sm shadow-soft">
              {d}
            </div>
          ))}
        </div>
      </Section>

      {/* Process */}
      <Section className="bg-secondary/40">
        <SectionHeading eyebrow="Process" title="How we work together." />
        <div className="mt-12 grid gap-4 md:grid-cols-5">
          {service.process.map((p, i) => (
            <div key={p} className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <span className="text-xs font-semibold text-orbit">Step 0{i + 1}</span>
              <h3 className="mt-1 font-semibold">{p}</h3>
            </div>
          ))}
        </div>
      </Section>

      {/* Packages */}
      {packages && (
        <Section>
          <SectionHeading eyebrow="Pricing" title={`${service.title} packages`} />
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {packages.packages.map((p) => (
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
                <p className={`mt-1 text-sm ${p.featured ? "text-white/70" : "text-muted-foreground"}`}>{p.tagline}</p>
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
      )}

      {/* FAQ */}
      {service.faqs.length > 0 && (
        <Section className="bg-secondary/40">
          <SectionHeading eyebrow="FAQ" title="Common questions." />
          <div className="mx-auto mt-10 max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {service.faqs.map((f, i) => (
                <AccordionItem key={i} value={`item-${i}`}>
                  <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
                  <AccordionContent>{f.a}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </Section>
      )}

      {/* CTA */}
      <Section>
        <div className="rounded-3xl border border-border bg-navy-gradient p-10 text-navy-foreground shadow-elevated sm:p-14">
          <h2 className="text-3xl font-semibold sm:text-4xl">Ready to start?</h2>
          <p className="mt-3 max-w-xl text-white/70">
            Send us a message on WhatsApp or request a quote. We reply the same day.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="whatsapp" size="lg">
              <a href={whatsappLink()} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="orbit">
              <Link to="/contact">Get quote</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
              <Link to="/pricing">Build package <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Related */}
      <Section className="pt-0">
        <SectionHeading eyebrow="Also from us" title="Other services." />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.filter((s) => s.slug !== service.slug).map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group rounded-2xl border border-border bg-card p-5 shadow-soft hover:shadow-elevated"
            >
              <s.icon className="h-5 w-5 text-orbit" />
              <div className="mt-3 font-semibold">{s.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{s.short}</p>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
