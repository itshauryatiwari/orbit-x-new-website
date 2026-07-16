import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  Sparkles,
  Zap,
  Rocket,
  MessageCircle,
  Wrench,
  Globe2,
  Clock,
  ShieldCheck,
} from "lucide-react";
import heroOrbit from "@/assets/hero-orbit.jpg";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/ui/section";
import { SERVICES } from "@/data/services";
import { SERVICE_PACKAGES } from "@/data/packages";
import { PROJECTS } from "@/data/projects";
import { whatsappLink } from "@/constants/site";

export function Home() {
  return (
    <>
      {/* 1. Hero */}
      <section className="relative overflow-hidden bg-hero-gradient">
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="orbit-ring animate-orbit left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2" />
          <div className="orbit-ring left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 opacity-60" />
          <div className="orbit-ring left-1/2 top-1/2 h-[1200px] w-[1200px] -translate-x-1/2 -translate-y-1/2 opacity-30" />
        </div>
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 pb-20 pt-16 sm:px-6 sm:pt-24 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pt-28">
          <div className="flex flex-col justify-center">
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-orbit/20 bg-orbit/10 px-3 py-1 text-xs font-medium text-orbit">
              <Sparkles className="h-3.5 w-3.5" /> Digital agency, in orbit around your growth
            </span>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
              Grow your brand with strategic{" "}
              <span className="bg-orbit-gradient bg-clip-text text-transparent">
                web, social, design & video
              </span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-muted-foreground">
              The Orbit X helps small and growing businesses turn their digital presence into a
              real growth engine. Flexible services, honest pricing, fast turnarounds.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="whatsapp" size="lg">
                <a href={whatsappLink("Hi Orbit X, I'd like to chat.")} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" /> WhatsApp us
                </a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/work">
                  View our work <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-4 w-4 text-orbit" /> Fast turnaround
              </span>
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-orbit" /> Transparent pricing
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Globe2 className="h-4 w-4 text-orbit" /> India-first, global-ready
              </span>
            </div>
          </div>
          <div className="relative">
            <div className="relative mx-auto aspect-square w-full max-w-lg overflow-hidden rounded-3xl border border-border shadow-elevated">
              <img
                src={heroOrbit}
                alt="Abstract orbit visual representing The Orbit X"
                width={1600}
                height={1200}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 grid grid-cols-3 gap-2">
                {SERVICES.slice(0, 3).map((s) => (
                  <div
                    key={s.slug}
                    className="rounded-xl border border-white/20 bg-white/80 p-3 text-xs backdrop-blur-md"
                  >
                    <s.icon className="mb-1 h-4 w-4 text-orbit" />
                    <div className="font-medium">{s.title}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Services */}
      <Section>
        <SectionHeading
          eyebrow="What we do"
          title="Four services. One growth engine."
          description="Pick a single service to solve a specific problem, or bundle them for a complete digital presence."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <Link
              key={s.slug}
              to="/services/$slug"
              params={{ slug: s.slug }}
              className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-elevated"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-orbit/10 text-orbit">
                <s.icon className="h-5 w-5" />
              </span>
              {s.flagship && (
                <span className="absolute right-4 top-4 rounded-full bg-navy px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-navy-foreground">
                  Flagship
                </span>
              )}
              <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.short}</p>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-orbit">
                Learn more{" "}
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* 3. Work delivered */}
      <Section className="bg-secondary/50 py-16 sm:py-20">
        <SectionHeading
          eyebrow="Work delivered"
          title="Real numbers, honestly stated."
          description="We're building. Here's what we've shipped so far."
        />
        <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { n: "2", label: "Websites Built" },
            { n: "15+", label: "Creative Designs" },
            { n: "3+", label: "Reels Edited" },
            { n: "2", label: "Active Clients" },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-2xl border border-border bg-card p-6 text-center shadow-soft"
            >
              <div className="font-display text-4xl font-semibold text-navy sm:text-5xl">
                {s.n}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. Why choose */}
      <Section>
        <SectionHeading
          eyebrow="Why The Orbit X"
          title="Built to be the easy choice."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3 lg:grid-cols-5">
          {[
            { icon: Wrench, title: "Flexible Services", desc: "Pick single services or bundle for scale." },
            { icon: Rocket, title: "Growth Packages", desc: "Bundles designed to compound results." },
            { icon: Zap, title: "Fast Communication", desc: "Same-day replies. No ghosting." },
            { icon: ShieldCheck, title: "Affordable", desc: "Clear pricing. Real ROI." },
            { icon: Check, title: "Professional Delivery", desc: "Design systems, QA, on-time." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-orbit/10 text-orbit">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-semibold">{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. Featured work */}
      <Section className="bg-secondary/40">
        <SectionHeading
          eyebrow="Featured work"
          title="Selected projects."
          description="A small but growing portfolio across web, brand and video."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          <Link
            to="/work/$slug"
            params={{ slug: PROJECTS[0].slug }}
            className="group relative overflow-hidden rounded-3xl border border-border bg-navy-gradient p-8 text-navy-foreground shadow-elevated lg:col-span-2 lg:row-span-2"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orbit/40 blur-3xl" />
            <span className="text-xs font-medium uppercase tracking-widest text-white/60">
              Featured — {PROJECTS[0].category}
            </span>
            <h3 className="mt-3 max-w-md text-3xl font-semibold sm:text-4xl">
              {PROJECTS[0].title}
            </h3>
            <p className="mt-4 max-w-md text-white/70">{PROJECTS[0].summary}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {PROJECTS[0].tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/80"
                >
                  {t}
                </span>
              ))}
            </div>
            <span className="mt-10 inline-flex items-center gap-1 text-sm font-medium text-white">
              View case <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
          {PROJECTS.slice(1, 4).map((p) => (
            <Link
              key={p.slug}
              to="/work/$slug"
              params={{ slug: p.slug }}
              className="group flex flex-col justify-between rounded-3xl border border-border bg-card p-6 shadow-soft transition-shadow hover:shadow-elevated"
            >
              <div>
                <span className="text-[11px] font-medium uppercase tracking-widest text-orbit">
                  {p.category}
                </span>
                <h3 className="mt-2 text-xl font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.summary}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-orbit">
                View <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

      {/* 6. Process */}
      <Section>
        <SectionHeading
          eyebrow="Process"
          title="A simple, repeatable way of working."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-5">
          {["Discovery", "Strategy", "Creation", "Review", "Delivery"].map((step, i) => (
            <div key={step} className="rounded-2xl border border-border bg-card p-6 shadow-soft">
              <span className="font-display text-sm font-semibold text-orbit">
                Step 0{i + 1}
              </span>
              <h3 className="mt-2 text-lg font-semibold">{step}</h3>
            </div>
          ))}
        </div>
      </Section>

      {/* 7. Packages preview */}
      <Section className="bg-secondary/40">
        <SectionHeading
          eyebrow="Packages"
          title="Starter, Growth, Premium."
          description="Clear tiers for each service — pick where you are today, upgrade as you grow."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {SERVICE_PACKAGES[0].packages.map((p) => (
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
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${p.featured ? "text-orbit-foreground" : "text-orbit"}`}
                    />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="orbit" size="lg">
            <Link to="/pricing">View all pricing</Link>
          </Button>
        </div>
      </Section>

      {/* 8. Custom package builder preview */}
      <Section>
        <div className="relative overflow-hidden rounded-3xl border border-border bg-navy-gradient p-10 text-navy-foreground shadow-elevated sm:p-14">
          <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-orbit/40 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-white/60">
                Custom package builder
              </span>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
                Build your own package in under 2 minutes.
              </h2>
              <p className="mt-4 max-w-xl text-white/70">
                Pick your services, tell us your goals, and send it straight to our WhatsApp. We'll
                come back with a tailored quote fast.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button asChild variant="orbit" size="lg">
                  <Link to="/pricing">Build your package</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-white/20 bg-white/5 text-white hover:bg-white/10">
                  <Link to="/services/web-development">Website builder</Link>
                </Button>
              </div>
            </div>
            <ul className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-6 text-sm backdrop-blur-md">
              {[
                "Select services you want",
                "Choose specific deliverables",
                "Share business info & budget",
                "Review your summary",
                "Send directly to WhatsApp",
              ].map((s, i) => (
                <li key={s} className="flex items-center gap-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-orbit-gradient text-xs font-semibold">
                    {i + 1}
                  </span>
                  <span className="text-white/90">{s}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 9. Logos */}
      <Section className="py-14">
        <p className="text-center text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          Businesses we've worked with
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 opacity-70">
          {["AURORA", "MERIDIAN", "NORTHWIND"].map((n) => (
            <span key={n} className="font-display text-xl font-semibold tracking-widest text-navy">
              {n}
            </span>
          ))}
        </div>
      </Section>

      {/* 10. Final CTA */}
      <Section>
        <div className="rounded-3xl border border-border bg-card p-10 text-center shadow-elevated sm:p-16">
          <SectionHeading
            eyebrow="Let's talk"
            title="Ready to grow your digital presence?"
            description="Get a free consultation. No pressure, no salesy scripts — just a clear plan for your next move."
          />
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button asChild variant="whatsapp" size="lg">
              <a href={whatsappLink()} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" /> WhatsApp us
              </a>
            </Button>
            <Button asChild variant="orbit" size="lg">
              <Link to="/contact">Get a quote</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
