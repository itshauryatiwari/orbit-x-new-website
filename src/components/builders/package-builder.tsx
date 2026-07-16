import { useMemo, useState } from "react";
import { Check, ArrowRight, ArrowLeft, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { whatsappLink } from "@/constants/site";

const SERVICES_OPTIONS = [
  { id: "web", label: "Web Development", deliverables: ["Landing page", "Business site (5+ pages)", "E-commerce", "Redesign / revamp", "Ongoing maintenance"] },
  { id: "social", label: "Social Media", deliverables: ["Content strategy", "Feed posts", "Reels", "Community management", "Paid ads"] },
  { id: "design", label: "Graphic Design", deliverables: ["Logo & brand kit", "Social creatives", "Ad graphics", "Brochures", "Pitch deck"] },
  { id: "video", label: "Video Editing", deliverables: ["Reels & shorts", "YouTube long-form", "Motion graphics", "Testimonials", "Thumbnails"] },
] as const;

export function PackageBuilder() {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string[]>([]);
  const [deliverables, setDeliverables] = useState<Record<string, string[]>>({});
  const [info, setInfo] = useState({ name: "", business: "", email: "", whatsapp: "", budget: "" });

  const activeServices = useMemo(
    () => SERVICES_OPTIONS.filter((s) => selected.includes(s.id)),
    [selected],
  );

  const canNext =
    (step === 1 && selected.length > 0) ||
    (step === 2 && activeServices.every((s) => (deliverables[s.id] ?? []).length > 0)) ||
    (step === 3 && info.name.trim() && info.email.trim() && info.whatsapp.trim()) ||
    step === 4;

  const summaryText = useMemo(() => {
    const lines: string[] = [
      "*New Package Inquiry — The Orbit X*",
      "",
      `Name: ${info.name}`,
      `Business: ${info.business}`,
      `Email: ${info.email}`,
      `WhatsApp: ${info.whatsapp}`,
      `Budget: ${info.budget || "—"}`,
      "",
      "*Services:*",
    ];
    activeServices.forEach((s) => {
      lines.push(`- ${s.label}`);
      (deliverables[s.id] ?? []).forEach((d) => lines.push(`   • ${d}`));
    });
    return lines.join("\n");
  }, [activeServices, deliverables, info]);

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sm:p-10">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-orbit">
            Custom package builder
          </p>
          <h3 className="mt-1 text-2xl font-semibold">Build your package</h3>
        </div>
        <span className="text-sm text-muted-foreground">Step {step} of 4</span>
      </div>

      <div className="mb-8 h-1.5 w-full overflow-hidden rounded-full bg-secondary">
        <div
          className="h-full bg-orbit-gradient transition-all"
          style={{ width: `${(step / 4) * 100}%` }}
        />
      </div>

      {step === 1 && (
        <div>
          <h4 className="text-lg font-semibold">Which services do you need?</h4>
          <p className="mt-1 text-sm text-muted-foreground">Select one or more.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {SERVICES_OPTIONS.map((s) => {
              const active = selected.includes(s.id);
              return (
                <button
                  key={s.id}
                  type="button"
                  onClick={() =>
                    setSelected((prev) =>
                      prev.includes(s.id) ? prev.filter((x) => x !== s.id) : [...prev, s.id],
                    )
                  }
                  className={`flex items-center justify-between rounded-xl border p-4 text-left transition ${
                    active ? "border-orbit bg-orbit/5" : "border-border bg-background hover:bg-accent"
                  }`}
                >
                  <span className="font-medium">{s.label}</span>
                  {active && <Check className="h-4 w-4 text-orbit" />}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-semibold">Pick your deliverables</h4>
            <p className="mt-1 text-sm text-muted-foreground">
              At least one per selected service.
            </p>
          </div>
          {activeServices.map((s) => (
            <div key={s.id} className="rounded-2xl border border-border bg-background p-5">
              <div className="font-semibold">{s.label}</div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {s.deliverables.map((d) => {
                  const list = deliverables[s.id] ?? [];
                  const active = list.includes(d);
                  return (
                    <label
                      key={d}
                      className={`flex items-center gap-2 rounded-lg border p-3 text-sm ${
                        active ? "border-orbit bg-orbit/5" : "border-border"
                      }`}
                    >
                      <Checkbox
                        checked={active}
                        onCheckedChange={() =>
                          setDeliverables((prev) => {
                            const cur = prev[s.id] ?? [];
                            return {
                              ...prev,
                              [s.id]: cur.includes(d) ? cur.filter((x) => x !== d) : [...cur, d],
                            };
                          })
                        }
                      />
                      <span>{d}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {step === 3 && (
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <h4 className="text-lg font-semibold">Your details</h4>
          </div>
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input id="name" value={info.name} onChange={(e) => setInfo({ ...info, name: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="business">Business name</Label>
            <Input id="business" value={info.business} onChange={(e) => setInfo({ ...info, business: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input id="email" type="email" value={info.email} onChange={(e) => setInfo({ ...info, email: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="wa">WhatsApp *</Label>
            <Input id="wa" value={info.whatsapp} onChange={(e) => setInfo({ ...info, whatsapp: e.target.value })} />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="budget">Approx. budget</Label>
            <Input id="budget" placeholder="e.g. ₹25,000/mo" value={info.budget} onChange={(e) => setInfo({ ...info, budget: e.target.value })} />
          </div>
        </div>
      )}

      {step === 4 && (
        <div>
          <h4 className="text-lg font-semibold">Review & send</h4>
          <p className="mt-1 text-sm text-muted-foreground">
            We'll open WhatsApp with your summary prefilled — hit send and we'll take it from there.
          </p>
          <pre className="mt-6 max-h-80 overflow-auto whitespace-pre-wrap rounded-2xl border border-border bg-background p-5 text-sm">
{summaryText}
          </pre>
        </div>
      )}

      <div className="mt-8 flex items-center justify-between gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
        >
          <ArrowLeft className="h-4 w-4" /> Back
        </Button>
        {step < 4 ? (
          <Button
            type="button"
            variant="orbit"
            onClick={() => setStep((s) => s + 1)}
            disabled={!canNext}
          >
            Continue <ArrowRight className="h-4 w-4" />
          </Button>
        ) : (
          <Button asChild variant="whatsapp">
            <a href={whatsappLink(summaryText)} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" /> Send to WhatsApp
            </a>
          </Button>
        )}
      </div>
    </div>
  );
}
