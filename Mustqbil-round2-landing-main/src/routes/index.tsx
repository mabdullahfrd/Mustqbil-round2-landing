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
  Copy,
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
      { name: "twitter:card", content: "summary" },
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

function useTypewriter(text: string, speed = 38, startDelay = 600) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        if (i < text.length) {
          setDisplayed(text.slice(0, i + 1));
          i++;
        } else {
          setDone(true);
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);
    return () => clearTimeout(timer);
  }, [text, speed, startDelay]);

  return { displayed, done };
}

function Index() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const typewriterText =
    "Glad you stopped by. Good teams tend to find us. Now, what are we building?";
  const { displayed, done } = useTypewriter(typewriterText);

  return (
    <div className="flex min-h-screen flex-col bg-background relative">
      {/* Background Video */}
      <video
        className="video-bg"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4"
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      <header className="fixed top-0 left-0 right-0 z-10 px-5 sm:px-8 py-4 sm:py-5 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a href="/" className="flex items-center gap-3 font-heading font-semibold text-foreground" style={{ fontSize: "21px" }}>
            <span className="text-[21px] sm:text-[26px] tracking-tight">Clarity</span>
            <span className="text-[25px] sm:text-[30px] select-none" style={{ letterSpacing: "-0.02em" }}>
              ✳︎
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-[23px] text-foreground">
            <a href="#features" className="hover:opacity-60 transition-opacity">
              Features
            </a>
            <a href="#how-it-works" className="hover:opacity-60 transition-opacity">
              How it works
            </a>
            <a href="#pricing" className="hover:opacity-60 transition-opacity">
              Pricing
            </a>
            <a href="#faq" className="hover:opacity-60 transition-opacity">
              FAQ
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-[23px] underline underline-offset-2 hover:opacity-60 transition-opacity text-foreground">
              Log in
            </a>
            <a
              href="#"
              className="text-[23px] underline underline-offset-2 hover:opacity-60 transition-opacity text-foreground"
            >
              Start free trial
              <ArrowRight className="ml-1.5 h-5 w-5 inline" />
            </a>
          </div>

          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              setHamburgerOpen(!hamburgerOpen);
            }}
            aria-label="Toggle menu"
          >
            <span
              className="w-6 h-[2px] bg-black transition-all duration-300 origin-center"
              style={{
                transform: hamburgerOpen ? "rotate(45deg) translate(7px, 7px)" : "none",
              }}
            />
            <span
              className="w-6 h-[2px] bg-black transition-opacity duration-300"
              style={{ opacity: hamburgerOpen ? 0 : 1 }}
            />
            <span
              className="w-6 h-[2px] bg-black transition-all duration-300 origin-center"
              style={{
                transform: hamburgerOpen ? "rotate(-45deg) translate(7px, -7px)" : "none",
              }}
            />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-9 bg-white/95 backdrop-blur-sm flex flex-col items-start justify-center px-8 gap-8 pt-20">
            <nav className="flex flex-col gap-4 text-left">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-[32px] font-medium text-foreground hover:opacity-60 transition-opacity">
                Features
              </a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-[32px] font-medium text-foreground hover:opacity-60 transition-opacity">
                How it works
              </a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-[32px] font-medium text-foreground hover:opacity-60 transition-opacity">
                Pricing
              </a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-[32px] font-medium text-foreground hover:opacity-60 transition-opacity">
                FAQ
              </a>
              <hr className="w-full border-border" />
              <a href="#" className="text-[32px] font-medium text-foreground hover:opacity-60 transition-opacity">
                Log in
              </a>
              <a href="#" className="text-[32px] font-medium text-foreground underline underline-offset-2 hover:opacity-60 transition-opacity">
                Start free trial
              </a>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col md:justify-center md:pb-0 justify-end pb-12 px-5 sm:px-8 md:px-10 overflow-hidden">
          <div className="max-w-xl relative z-10 w-full">
            <div className="animate-fade-in pointer-events-none select-none mb-5 sm:mb-6" style={{ fontSize: "clamp(18px, 4vw, 26px)", lineHeight: 1.3, fontWeight: 400, color: "#000", filter: "blur(4px)" }}>
              <span className="block">Hey there, meet Clarity,</span>
              <span className="block">Simple project management for focused teams</span>
            </div>

            <p className="animate-fade-in-up mb-5 sm:mb-6 min-h-[54px]" style={{ fontSize: "clamp(18px, 4vw, 26px)", lineHeight: 1.35, fontWeight: 400, color: "#000" }}>
              {displayed}
              {!done && (
                <span className="inline-block w-[2px] h-[1.1em] bg-black align-middle ml-[2px] animate-blink" aria-hidden="true" />
              )}
            </p>

            <div
              className="flex flex-wrap gap-y-1"
              style={{
                opacity: done ? 1 : 0,
                transform: done ? "translateY(0)" : "translateY(8px)",
                transition: "opacity 0.4s ease, transform 0.4s ease",
                transitionDelay: "400ms",
              }}
            >
              <Button className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200">
                Pitch us an idea
              </Button>
              <Button className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200">
                Come work here
              </Button>
              <Button className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200">
                Send a brief hello
              </Button>
              <Button className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200">
                See how we operate
              </Button>
              <Button
                variant="outline"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-transparent text-white border-white rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-white hover:text-black transition-colors duration-200"
                onClick={() => navigator.clipboard.writeText("hello@clarity.inc")}
              >
                <span className="underline underline-offset-1">Reach us: hello@clarity.inc</span>
                <Copy className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              </Button>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="border-t border-border bg-white">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <AnimateOnScroll>
              <div className="mb-14 max-w-2xl">
                <h2 className="font-heading font-semibold tracking-tight text-foreground sm:text-4xl text-3xl">
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
              <div className="mb-14">
                <h2 className="font-heading font-semibold tracking-tight text-foreground sm:text-4xl text-3xl">
                  Get your team up and running in minutes
                </h2>
                <p className="mt-4 text-lg text-muted-foreground max-w-xl">
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
        <section className="border-y border-border bg-white">
          <div className="mx-auto max-w-4xl px-4 py-20 text-left sm:px-6 sm:py-24 lg:px-8">
            <AnimateOnScroll>
              <div className="mb-6 flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="text-xl font-medium leading-relaxed text-foreground sm:text-2xl lg:text-3xl">
                &ldquo;We tried three other tools before Clarity. It is the first one our team
                actually wanted to keep using.&rdquo;
              </blockquote>
              <div className="mt-8 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  SC
                </div>
                <div>
                  <p className="font-semibold text-foreground">Sarah Chen</p>
                  <p className="text-sm text-muted-foreground">Product Lead, Northwind Studios</p>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="border-b border-border bg-white">
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <AnimateOnScroll>
              <div className="mb-14">
                <h2 className="font-heading font-semibold tracking-tight text-foreground sm:text-4xl text-3xl">
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
        <section id="faq" className="bg-muted/30">
          <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
            <AnimateOnScroll>
              <h2 className="mb-10 font-heading font-semibold tracking-tight text-foreground sm:text-4xl text-3xl">
                Frequently asked questions
              </h2>
            </AnimateOnScroll>
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
                  Absolutely. You can upgrade or downgrade at any time, and changes take
                  effect on your next billing cycle.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="cancel">
                <AccordionTrigger>How do I cancel?</AccordionTrigger>
                <AccordionContent>
                  You can cancel your subscription from your workspace settings at any time.
                  No cancellation fees or hidden charges.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="data">
                <AccordionTrigger>Where is my data stored?</AccordionTrigger>
                <AccordionContent>
                  Your data is stored in secure, SOC 2 compliant data centers with encryption
                  at rest and in transit.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-white">
          <div className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-24">
            <AnimateOnScroll>
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-8 text-left sm:p-12 lg:p-16">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-primary/[0.02]" />
                <div className="relative">
                  <h2 className="font-heading font-semibold tracking-tight text-card-foreground sm:text-4xl text-3xl">
                    Ready to bring clarity to your work?
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
                    Join hundreds of teams who have simplified the way they manage projects.
                  </p>
                  <div className="mt-8 flex flex-col items-start justify-start gap-3 sm:flex-row">
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
          </div>
        </section>
      </main>

      <footer className="border-t border-border bg-background">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row">
            <a href="/" className="flex items-center gap-2.5 font-heading font-semibold text-foreground">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Layout className="h-4 w-4" />
              </div>
              Clarity
            </a>
            <nav className="flex flex-wrap justify-start gap-6 text-sm text-muted-foreground">
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
          <span className="text-4xl font-semibold tracking-tight text-foreground">
            {price}
          </span>
          {period && (
            <span className="ml-1 text-sm text-muted-foreground">{period}</span>
          )}
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
          {isHighlight && <ArrowRight className="ml-2 h-4 w-4" />}
        </Button>
      </CardContent>
    </Card>
  );
}