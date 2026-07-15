import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Check,
  Layout,
  Zap,
  Shield,
  BarChart3,
  Users,
  ArrowRight,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Clarity — Simple project management for focused teams" },
      {
        name: "description",
        content:
          "Clarity helps small teams plan work, track progress, and ship faster without the clutter of complex project management tools.",
      },
      {
        property: "og:title",
        content: "Clarity — Simple project management for focused teams",
      },
      {
        property: "og:description",
        content:
          "Clarity helps small teams plan work, track progress, and ship faster without the clutter of complex project management tools.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
});

function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-2 font-semibold text-foreground">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Layout className="h-4 w-4" />
            </div>
            Clarity
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">
              Features
            </a>
            <a href="#how-it-works" className="hover:text-foreground">
              How it works
            </a>
            <a href="#pricing" className="hover:text-foreground">
              Pricing
            </a>
            <a href="#faq" className="hover:text-foreground">
              FAQ
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
            <Button size="sm">Start free trial</Button>
          </div>

          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-border px-4 py-4 md:hidden">
            <nav className="flex flex-col gap-3 text-sm font-medium text-muted-foreground">
              <a href="#features" onClick={() => setMobileMenuOpen(false)}>
                Features
              </a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>
                How it works
              </a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>
                Pricing
              </a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)}>
                FAQ
              </a>
              <hr className="border-border" />
              <a href="#" className="text-foreground">
                Log in
              </a>
              <a href="#" className="text-foreground">
                Start free trial
              </a>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <section className="mx-auto max-w-6xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Project management without the noise
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Clarity gives small teams a clean, focused workspace to plan tasks, track progress,
              and ship work together. No bloat, no steep learning curve.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <div className="flex w-full max-w-sm items-center gap-2 sm:w-auto">
                <Input
                  type="email"
                  placeholder="Enter your work email"
                  className="h-11"
                  aria-label="Work email"
                />
                <Button size="lg" className="shrink-0">
                  Get started
                </Button>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              Free 14-day trial. No credit card required.
            </p>
          </div>
        </section>

        <section id="features" className="border-t border-border bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
            <div className="mb-12 max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Everything you need, nothing more
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Built for teams that want to move fast without getting lost in complex workflows.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Layout className="h-5 w-5" />}
                title="Simple task boards"
                description="Organize work with drag-and-drop boards that stay out of your way."
              />
              <FeatureCard
                icon={<Zap className="h-5 w-5" />}
                title="Fast prioritization"
                description="Focus on what matters today with clear priorities and due dates."
              />
              <FeatureCard
                icon={<Users className="h-5 w-5" />}
                title="Team collaboration"
                description="Comment, assign, and mention teammates to keep everyone aligned."
              />
              <FeatureCard
                icon={<BarChart3 className="h-5 w-5" />}
                title="Clear progress"
                description="See project health at a glance with lightweight progress tracking."
              />
              <FeatureCard
                icon={<Shield className="h-5 w-5" />}
                title="Private by default"
                description="Your data is encrypted and only visible to people you invite."
              />
              <FeatureCard
                icon={<Check className="h-5 w-5" />}
                title="Zero setup"
                description="Create a project in seconds and invite your team with one link."
              />
            </div>
          </div>
        </section>

        <section id="how-it-works" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Get your team up and running in minutes
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <StepCard
              step="01"
              title="Create a workspace"
              description="Sign up and create a workspace for your team in under a minute."
            />
            <StepCard
              step="02"
              title="Add your projects"
              description="Break work into projects and tasks that everyone can see and own."
            />
            <StepCard
              step="03"
              title="Ship together"
              description="Track progress, remove blockers, and celebrate wins as a team."
            />
          </div>
        </section>

        <section className="border-y border-border bg-muted/30">
          <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 lg:px-8">
            <blockquote className="text-2xl font-medium leading-relaxed text-foreground sm:text-3xl">
              “We tried three other tools before Clarity. It is the first one our team actually
              wanted to keep using.”
            </blockquote>
            <div className="mt-8">
              <p className="font-semibold text-foreground">Sarah Chen</p>
              <p className="text-sm text-muted-foreground">Product Lead, Northwind Studios</p>
            </div>
          </div>
        </section>

        <section id="pricing" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Straightforward pricing
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Start free, then scale as your team grows.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <PricingCard
              name="Starter"
              price="$0"
              description="For individuals and small side projects."
              features={["Up to 3 projects", "2 team members", "Basic task boards"]}
              cta="Get started free"
              variant="outline"
            />
            <PricingCard
              name="Team"
              price="$12"
              period="/user/month"
              description="For growing teams that need to move faster."
              features={[
                "Unlimited projects",
                "Unlimited team members",
                "Advanced progress tracking",
                "Priority support",
              ]}
              cta="Start free trial"
              variant="highlight"
            />
            <PricingCard
              name="Business"
              price="$29"
              period="/user/month"
              description="For organizations with advanced needs."
              features={[
                "Everything in Team",
                "SSO and audit logs",
                "Custom workflows",
                "Dedicated account manager",
              ]}
              cta="Contact sales"
              variant="outline"
            />
          </div>
        </section>

        <section id="faq" className="border-t border-border bg-muted/30">
          <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
            <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Frequently asked questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="trial">
                <AccordionTrigger>Is there a free trial?</AccordionTrigger>
                <AccordionContent>
                  Yes. Every paid plan starts with a 14-day free trial. You can also use the
                  Starter plan for free indefinitely.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="change-plan">
                <AccordionTrigger>Can I change plans later?</AccordionTrigger>
                <AccordionContent>
                  Absolutely. You can upgrade or downgrade at any time, and changes take effect on
                  your next billing cycle.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="cancel">
                <AccordionTrigger>How do I cancel?</AccordionTrigger>
                <AccordionContent>
                  You can cancel your subscription from your workspace settings at any time. No
                  cancellation fees or hidden charges.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="data">
                <AccordionTrigger>Where is my data stored?</AccordionTrigger>
                <AccordionContent>
                  Your data is stored in secure, SOC 2 compliant data centers with encryption at
                  rest and in transit.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-card p-8 text-center sm:p-12 lg:p-16">
            <h2 className="text-3xl font-semibold tracking-tight text-card-foreground sm:text-4xl">
              Ready to bring clarity to your work?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Join hundreds of teams who have simplified the way they manage projects.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg">Start your free trial</Button>
              <Button size="lg" variant="outline">
                Talk to sales
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <a href="/" className="flex items-center gap-2 font-semibold text-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <Layout className="h-4 w-4" />
              </div>
              Clarity
            </a>
            <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground">
                Terms
              </a>
              <a href="#" className="hover:text-foreground">
                Security
              </a>
              <a href="#" className="hover:text-foreground">
                Contact
              </a>
            </nav>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Clarity, Inc. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <Card className="border-border bg-background">
      <CardContent className="p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-md bg-secondary text-secondary-foreground">
          {icon}
        </div>
        <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function StepCard({ step, title, description }: { step: string; title: string; description: string }) {
  return (
    <div className="relative rounded-xl border border-border bg-background p-6">
      <span className="text-sm font-semibold text-muted-foreground">{step}</span>
      <h3 className="mt-4 text-xl font-semibold text-foreground">{title}</h3>
      <p className="mt-2 text-muted-foreground">{description}</p>
    </div>
  );
}

function PricingCard({
  name,
  price,
  period,
  description,
  features,
  cta,
  variant,
}: {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  variant: "outline" | "highlight";
}) {
  const isHighlight = variant === "highlight";

  return (
    <Card
      className={`flex flex-col border-border ${isHighlight ? "border-2 border-primary bg-background shadow-sm" : "bg-background"}`}
    >
      <CardContent className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-foreground">{name}</h3>
        <div className="mt-4 flex items-baseline">
          <span className="text-4xl font-semibold tracking-tight text-foreground">{price}</span>
          {period && <span className="ml-1 text-sm text-muted-foreground">{period}</span>}
        </div>
        <p className="mt-2 text-sm text-muted-foreground">{description}</p>
        <ul className="mt-6 flex-1 space-y-3">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-3 text-sm text-foreground">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
              {feature}
            </li>
          ))}
        </ul>
        <Button
          className="mt-8 w-full"
          variant={isHighlight ? "default" : "outline"}
        >
          {cta}
        </Button>
      </CardContent>
    </Card>
  );
}
