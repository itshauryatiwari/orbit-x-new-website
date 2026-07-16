import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/ui/section";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — The Orbit X" },
      { name: "description", content: "Terms and conditions for engaging The Orbit X." },
    ],
  }),
  component: () => (
    <Section className="pt-24">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-4xl font-semibold tracking-tight">Terms &amp; Conditions</h1>
        <div className="prose prose-neutral mt-8 space-y-4 text-muted-foreground">
          <p>
            By engaging The Orbit X for services, you agree to our project scoping, payment
            schedule, and delivery terms as specified in your project agreement.
          </p>
          <p>
            Deliverables become the client's property upon full payment. The Orbit X retains the
            right to feature completed work in its portfolio unless otherwise agreed.
          </p>
          <p>
            Detailed terms are provided in individual project agreements. Please contact us with
            any questions before signing off on a project.
          </p>
        </div>
      </div>
    </Section>
  ),
});
