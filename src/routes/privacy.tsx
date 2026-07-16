import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/ui/section";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — The Orbit X" },
      { name: "description", content: "Privacy policy for The Orbit X." },
      { name: "robots", content: "index,follow" },
    ],
  }),
  component: () => (
    <Section className="pt-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight">Privacy Policy</h1>
        <div className="prose prose-neutral mt-8 space-y-4 text-muted-foreground">
          <p>
            The Orbit X respects your privacy. We collect only the information necessary to
            respond to inquiries and deliver our services. We do not sell your data.
          </p>
          <p>
            Information collected via forms (name, email, phone, business details, project
            details) is used solely to communicate with you about your project. Analytics tools
            collect anonymized usage data to help us improve the site.
          </p>
          <p>
            You can request deletion of your data at any time by writing to us. This is a summary
            policy for a small agency and will be expanded as our services grow.
          </p>
        </div>
      </div>
    </Section>
  ),
});
