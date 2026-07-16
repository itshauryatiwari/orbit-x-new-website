import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Mail, MessageCircle, CheckCircle2 } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SITE, whatsappLink } from "@/constants/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — The Orbit X" },
      {
        name: "description",
        content:
          "Get in touch with The Orbit X. WhatsApp, email or send us a project inquiry.",
      },
      { property: "og:title", content: "Contact — The Orbit X" },
      { property: "og:description", content: "Reach out via WhatsApp, email or the inquiry form." },
    ],
  }),
  component: ContactPage,
});

const SERVICES = [
  "Web Development",
  "Social Media Management",
  "Graphic Design",
  "Video Editing",
  "Custom bundle",
];

function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    business: "",
    service: SERVICES[0],
    budget: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Required";
    if (!form.email.trim()) errs.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Invalid email";
    if (!form.message.trim()) errs.message = "Tell us a bit about your project";
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const text = `*New inquiry — The Orbit X*\n\nName: ${form.name}\nEmail: ${form.email}\nPhone: ${form.phone}\nBusiness: ${form.business}\nService: ${form.service}\nBudget: ${form.budget}\n\nMessage:\n${form.message}`;
    window.open(whatsappLink(text), "_blank");
    setSent(true);
  }

  return (
    <>
      <section className="bg-hero-gradient">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-28 lg:px-8">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-orbit">Contact</span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
            Let's talk about your project.
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Reply within a business day. WhatsApp is fastest.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-1">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noreferrer"
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elevated"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-whatsapp/10 text-whatsapp">
                <MessageCircle className="h-5 w-5" />
              </span>
              <span>
                <span className="block font-semibold">WhatsApp</span>
                <span className="mt-1 block text-sm text-muted-foreground">Fastest way to reach us</span>
              </span>
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 shadow-soft hover:shadow-elevated"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-orbit/10 text-orbit">
                <Mail className="h-5 w-5" />
              </span>
              <span className="min-w-0">
                <span className="block font-semibold">Email</span>
                <span className="mt-1 block truncate text-sm text-muted-foreground">{SITE.email}</span>
              </span>
            </a>
          </div>

          <form
            onSubmit={submit}
            className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-8 lg:col-span-2"
          >
            {sent ? (
              <div className="flex flex-col items-center py-10 text-center">
                <CheckCircle2 className="h-10 w-10 text-whatsapp" />
                <h3 className="mt-4 text-xl font-semibold">Ready to send on WhatsApp</h3>
                <p className="mt-2 max-w-md text-sm text-muted-foreground">
                  We opened WhatsApp with your message pre-filled. If it didn't open, tap the
                  button below.
                </p>
                <Button asChild variant="whatsapp" className="mt-6">
                  <a href={whatsappLink()} target="_blank" rel="noreferrer">
                    Open WhatsApp
                  </a>
                </Button>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold">Send an inquiry</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  Fill in the details below — we'll pick it up in WhatsApp.
                </p>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Name *</Label>
                    <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} aria-invalid={!!errors.name} />
                    {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} aria-invalid={!!errors.email} />
                    {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="business">Business name</Label>
                    <Input id="business" value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })} />
                  </div>
                  <div>
                    <Label htmlFor="service">Service</Label>
                    <select
                      id="service"
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className="mt-1 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-soft focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      {SERVICES.map((s) => (
                        <option key={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="budget">Budget</Label>
                    <Input id="budget" placeholder="e.g. ₹25,000/mo" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea id="message" rows={4} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} aria-invalid={!!errors.message} />
                    {errors.message && <p className="mt-1 text-xs text-destructive">{errors.message}</p>}
                  </div>
                </div>
                <div className="mt-6 flex justify-end">
                  <Button type="submit" variant="orbit" size="lg">
                    Send inquiry
                  </Button>
                </div>
              </>
            )}
          </form>
        </div>
      </Section>
    </>
  );
}
