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
  Menu,
  X,
  ArrowRight,
  Sparkles,
  Star,
} from "lucide-react";
import { useState, useEffect, useRef, type ReactNode } from "react";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Clarity -- Simple project management for focused teams" },
      {
        name: "description",
        content:
          "Clarity helps small teams plan work, track progress, and ship faster without the clutter of complex project management tools.",
      },
      {
        property: "og:title",
        content: "Clarity -- Simple project management for focused teams",
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

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView } as const;
}

function AnimateOnScroll({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(20px)",
        transition: `opacity 0.6s ease-out ${delay}s, transform 0.6s ease-out ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}

function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="/" className="flex items-center gap-2.5 font-semibold text-foreground">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Layout className="h-4 w-4" />
            </div>
            Clarity
          </a>

          <nav className="hidden items-center gap-8 text-sm font-medium text-muted-foreground md:flex">
            <a href="#features" className="transition-colors hover:text-foreground">
              Features
            </a>
            <a href="#how-it-works" className="transition-colors hover:text-foreground">
              How it works
            </a>
            <a href="#pricing" className="transition-colors hover:text-foreground">
              Pricing
            </a>
            <a href="#faq" className="transition-colors hover:text-foreground">
              FAQ
            </a>
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <Button variant="ghost" size="sm">
              Log in
            </Button>
            <Button size="sm">
              Start free trial
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </div>

          <button
            className="rounded-md p-2 transition-colors hover:bg-muted md:hidden"
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
        {/* Hero */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-primary/[0.02]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/[0.03] blur-3xl" />

          <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-36">
            <div className="mx-auto max-w-3xl text-center">
              <div className="animate-fade-in mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm text-muted-foreground">
                <Sparkles className="h-3.5 w-3.5 text-primary" />
                Trusted by hundreds of growing teams
              </div>

              <h1 className="animate-fade-in-up text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                Project management <span className="gradient-text">without the noise</span>
              </h1>

              <p className="animate-fade-in-up-delay-1 mt-6 text-lg leading-8 text-muted-foreground sm:text-xl">
                Clarity gives small teams a clean, focused workspace to plan tasks, track progress,
                and ship work together. No bloat, no steep learning curve.
              </p>

              <div className="animate-fade-in-up-delay-2 mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <div className="flex w-full max-w-md items-center gap-2 sm:w-auto">
                  <Input
                    type="email"
                    placeholder="Enter your work email"
                    className="h-12 flex-1 sm:w-64"
                    aria-label="Work email"
                  />
                  <Button size="lg" className="h-12 shrink-0 px-6">
                    Get started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="animate-fade-in-up-delay-3 mt-4 text-sm text-muted-foreground">
                Free 14-day trial. No credit card required.
              </p>
            </div>

            {/* Product Preview */}
            <AnimateOnScroll className="animate-fade-in-up-delay-4 mx-auto mt-16 max-w-4xl lg:mt-20">
              <div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-primary/[0.06]">
                <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
                  <div className="h-3 w-3 rounded-full bg-muted-foreground/20" />
                  <div className="h-3 w-3 rounded-full bg-muted-foreground/20" />
                  <div className="h-3 w-3 rounded-full bg-muted-foreground/20" />
                  <span className="ml-3 text-xs text-muted-foreground">Clarity Workspace</span>
                </div>
                <div className="grid grid-cols-5 gap-px bg-border">
                  <div className="col-span-1 hidden bg-card p-4 sm:block">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 rounded-md bg-primary/10 px-2.5 py-1.5 text-xs font-medium text-primary">
                        <Layout className="h-3 w-3" /> Board
                      </div>
                      <div className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs text-muted-foreground">
                        <BarChart3 className="h-3 w-3" /> Progress
                      </div>
                      <div className="flex items-center gap-2 rounded-md px-2.5 py-1.5 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" /> Team
                      </div>
                    </div>
                  </div>
                  <div className="col-span-4 bg-card p-4 sm:p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <h4 className="text-sm font-semibold text-foreground">Sprint Board</h4>
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        8 tasks
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-3 sm:gap-4">
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">To do</p>
                        <div className="space-y-2">
                          <div className="rounded-lg border border-border bg-background p-2.5">
                            <p className="text-xs font-medium text-foreground">
                              Update landing page
                            </p>
                            <div className="mt-1.5 flex items-center gap-1">
                              <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                              <span className="text-[10px] text-muted-foreground">High</span>
                            </div>
                          </div>
                          <div className="rounded-lg border border-border bg-background p-2.5">
                            <p className="text-xs font-medium text-foreground">Write blog post</p>
                            <div className="mt-1.5 flex items-center gap-1">
                              <div className="h-1.5 w-1.5 rounded-full bg-muted-foreground/40" />
                              <span className="text-[10px] text-muted-foreground">Low</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">In progress</p>
                        <div className="space-y-2">
                          <div className="rounded-lg border border-primary/20 bg-primary/[0.03] p-2.5">
                            <p className="text-xs font-medium text-foreground">API integration</p>
                            <div className="mt-1.5 flex items-center gap-1">
                              <div className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                              <span className="text-[10px] text-muted-foreground">Medium</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-muted-foreground">Done</p>
                        <div className="space-y-2">
                          <div className="rounded-lg border border-border bg-background p-2.5 opacity-70">
                            <p className="text-xs font-medium text-foreground line-through">
                              Design system
                            </p>
                            <div className="mt-1.5 flex items-center gap-1">
                              <Check className="h-3 w-3 text-emerald-500" />
                              <span className="text-[10px] text-muted-foreground">Complete</span>
                            </div>
                          </div>
                          <div className="rounded-lg border border-border bg-background p-2.5 opacity-70">
                            <p className="text-xs font-medium text-foreground line-through">
                              Setup CI/CD
                            </p>
                            <div className="mt-1.5 flex items-center gap-1">
                              <Check className="h-3 w-3 text-emerald-500" />
                              <span className="text-[10px] text-muted-foreground">Complete</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-t border-border">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <AnimateOnScroll>
              <div className="mb-14 max-w-2xl">
                <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Everything you need, nothing more
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Built for teams that want to move fast without getting lost in complex workflows.
                </p>
              </div>
            </AnimateOnScroll>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <AnimateOnScroll delay={0}>
                <FeatureCard
                  icon={<Layout className="h-5 w-5" />}
                  title="Simple task boards"
                  description="Organize work with drag-and-drop boards that stay out of your way."
                />
              </AnimateOnScroll>
              <AnimateOnScroll delay={0.1}>
                <FeatureCard
                  icon={<Zap className="h-5 w-5" />}
                  title="Fast prioritization"
                  description="Focus on what matters today with clear priorities and due dates."
                />
              </AnimateOnScroll>
              <AnimateOnScroll delay={0.2}>
                <FeatureCard
                  icon={<Users className="h-5 w-5" />}
                  title="Team collaboration"
                  description="Comment, assign, and mention teammates to keep everyone aligned."
                />
              </AnimateOnScroll>
              <AnimateOnScroll delay={0}>
                <FeatureCard
                  icon={<BarChart3 className="h-5 w-5" />}
                  title="Clear progress"
                  description="See project health at a glance with lightweight progress tracking."
                />
              </AnimateOnScroll>
              <AnimateOnScroll delay={0.1}>
                <FeatureCard
                  icon={<Shield className="h-5 w-5" />}
                  title="Private by default"
                  description="Your data is encrypted and only visible to people you invite."
                />
              </AnimateOnScroll>
              <AnimateOnScroll delay={0.2}>
                <FeatureCard
                  icon={<Check className="h-5 w-5" />}
                  title="Zero setup"
                  description="Create a project in seconds and invite your team with one link."
                />
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="border-t border-border bg-muted/30">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <AnimateOnScroll>
              <div className="mb-14 text-center">
                <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Get your team up and running in minutes
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
                  Three simple steps from sign-up to your first shipped task.
                </p>
              </div>
            </AnimateOnScroll>

            <div className="grid gap-6 md:grid-cols-3">
              <AnimateOnScroll delay={0}>
                <StepCard
                  step="01"
                  title="Create a workspace"
                  description="Sign up and create a workspace for your team in under a minute."
                />
              </AnimateOnScroll>
              <AnimateOnScroll delay={0.15}>
                <StepCard
                  step="02"
                  title="Add your projects"
                  description="Break work into projects and tasks that everyone can see and own."
                />
              </AnimateOnScroll>
              <AnimateOnScroll delay={0.3}>
                <StepCard
                  step="03"
                  title="Ship together"
                  description="Track progress, remove blockers, and celebrate wins as a team."
                />
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="border-y border-border">
          <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-6 sm:py-24 lg:px-8">
            <AnimateOnScroll>
              <div className="mb-6 flex justify-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="text-xl font-medium leading-relaxed text-foreground sm:text-2xl lg:text-3xl">
                &ldquo;We tried three other tools before Clarity. It is the first one our team
                actually wanted to keep using.&rdquo;
              </blockquote>
              <div className="mt-8 flex items-center justify-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  SC
                </div>
                <div className="text-left">
                  <p className="font-semibold text-foreground">Sarah Chen</p>
                  <p className="text-sm text-muted-foreground">Product Lead, Northwind Studios</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <AnimateOnScroll>
              <div className="mb-14 text-center">
                <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                  Straightforward pricing
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  Start free, then scale as your team grows.
                </p>
              </div>
            </AnimateOnScroll>

            <div className="grid items-start gap-6 md:grid-cols-3">
              <AnimateOnScroll delay={0}>
                <PricingCard
                  name="Starter"
                  price="$0"
                  description="For individuals and small side projects."
                  features={["Up to 3 projects", "2 team members", "Basic task boards"]}
                  cta="Get started free"
                  variant="outline"
                />
              </AnimateOnScroll>
              <AnimateOnScroll delay={0.1}>
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
              </AnimateOnScroll>
              <AnimateOnScroll delay={0.2}>
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
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq">
          <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <AnimateOnScroll>
              <h2 className="mb-10 text-center text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Frequently asked questions
              </h2>
            </AnimateOnScroll>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="trial">
                <AccordionTrigger>Is there a free trial?</AccordionTrigger>
                <AccordionContent>
                  Yes. Every paid plan starts with a 14-day free trial. You can also use the Starter
                  plan for free indefinitely.
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

        {/* CTA Banner */}
        <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24">
          <AnimateOnScroll>
            <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-center sm:p-12 lg:p-16">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-primary/[0.02]" />
              <div className="relative">
                <h2 className="text-3xl font-semibold tracking-tight text-card-foreground sm:text-4xl">
                  Ready to bring clarity to your work?
                </h2>
                <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
                  Join hundreds of teams who have simplified the way they manage projects.
                </p>
                <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <Button size="lg" className="px-8">
                    Start your free trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button size="lg" variant="outline" className="px-8">
                    Talk to sales
                  </Button>
                </div>
              </div>
            </div>
          </AnimateOnScroll>
        </section>
      </main>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <a href="/" className="flex items-center gap-2.5 font-semibold text-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Layout className="h-4 w-4" />
              </div>
              Clarity
            </a>
            <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="transition-colors hover:text-foreground">
                Privacy
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                Terms
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                Security
              </a>
              <a href="#" className="transition-colors hover:text-foreground">
                Contact
              </a>
            </nav>
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} Clarity, Inc. All rights reserved.
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
    <Card className="group h-full border-border bg-background transition-all duration-200 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.04]">
      <CardContent className="p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
          {icon}
        </div>
        <h3 className="mt-4 text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-2 text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

function StepCard({
  step,
  title,
  description,
}: {
  step: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative h-full rounded-xl border border-border bg-background p-6 transition-all duration-200 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.04]">
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
        {step}
      </span>
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
      className={`flex h-full flex-col border-border transition-all duration-200 ${
        isHighlight
          ? "border-2 border-primary bg-background shadow-xl shadow-primary/[0.08]"
          : "bg-background hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.04]"
      }`}
    >
      {isHighlight && (
        <div className="rounded-t-[calc(var(--radius)-1px)] bg-primary px-4 py-1.5 text-center text-xs font-semibold text-primary-foreground">
          Most popular
        </div>
      )}
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
          size={isHighlight ? "default" : "default"}
        >
          {cta}
          {isHighlight && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </CardContent>
    </Card>
  );
}
