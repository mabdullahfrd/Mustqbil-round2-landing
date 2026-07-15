import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Check,
  Menu,
  X,
  ArrowRight,
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
  const videoRef = useRef<HTMLVideoElement>(null);

  const typewriterText =
    "Clarity gives small teams a clean, focused workspace to plan tasks, track progress, and ship work together. No bloat, no steep learning curve.";
  const { displayed, done } = useTypewriter(typewriterText);

  useEffect(() => {
    const video = videoRef.current;
    let prevX: number | null = null;
    let targetTime = 0;
    let seeking = false;
    const SENSITIVITY = 0.8;

    const handleMouseMove = (e: MouseEvent) => {
      if (prevX === null) {
        prevX = e.clientX;
        return;
      }
      const delta = e.clientX - prevX;
      prevX = e.clientX;
      if (!video || !video.duration || !isFinite(video.duration)) return;
      targetTime = Math.max(
        0,
        Math.min(video.duration, targetTime + (delta / window.innerWidth) * SENSITIVITY * video.duration),
      );
      if (!seeking) {
        seeking = true;
        video.currentTime = targetTime;
      }
    };

    const handleSeeked = () => {
      if (!video) return;
      if (Math.abs(video.currentTime - targetTime) > 0.01) {
        video.currentTime = targetTime;
      } else {
        seeking = false;
      }
    };

    if (video) video.addEventListener("seeked", handleSeeked);
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (video) video.removeEventListener("seeked", handleSeeked);
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background relative overflow-x-hidden">
      {/* Background Video - man always visible, scrubs on horizontal mouse move */}
      <video
        ref={videoRef}
        className="video-bg"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4"
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        style={{
          objectPosition: "65% center",
        }}
      />
      {/* Left-side gradient overlay for text readability, right side clear for man */}
      <div className="fixed inset-0 z-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      <header className="fixed top-0 left-0 right-0 z-30 px-5 sm:px-8 py-4 sm:py-5 glass-dark border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a href="/" className="flex items-center gap-3 font-heading font-semibold text-primary-foreground" style={{ fontSize: "21px" }}>
            <span className="text-[21px] sm:text-[26px] tracking-tight">Clarity</span>
            <span className="text-[25px] sm:text-[30px] select-none text-primary" style={{ letterSpacing: "-0.02em" }}>
              ✳︎
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-[23px] text-primary-foreground">
            <a href="#features" className="hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-primary transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-primary transition-colors">Pricing</a>
            <a href="#faq" className="hover:text-primary transition-colors">FAQ</a>
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-[23px] underline underline-offset-2 hover:text-primary transition-colors text-primary-foreground">Log in</a>
            <a href="#" className="text-[23px] underline underline-offset-2 hover:text-primary transition-colors text-primary-foreground">
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
            <span className="w-6 h-[2px] bg-primary-foreground transition-all duration-300 origin-center" style={{ transform: hamburgerOpen ? "rotate(45deg) translate(7px, 7px)" : "none" }} />
            <span className="w-6 h-[2px] bg-primary-foreground transition-opacity duration-300" style={{ opacity: hamburgerOpen ? 0 : 1 }} />
            <span className="w-6 h-[2px] bg-primary-foreground transition-all duration-300 origin-center" style={{ transform: hamburgerOpen ? "rotate(-45deg) translate(7px, -7px)" : "none" }} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-9 glass-dark flex flex-col items-start justify-center px-8 gap-8 pt-20">
            <nav className="flex flex-col gap-4 text-left">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-[32px] font-medium text-primary-foreground hover:text-primary transition-colors">Features</a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-[32px] font-medium text-primary-foreground hover:text-primary transition-colors">How it works</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-[32px] font-medium text-primary-foreground hover:text-primary transition-colors">Pricing</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-[32px] font-medium text-primary-foreground hover:text-primary transition-colors">FAQ</a>
              <hr className="w-full border-white/20" />
              <a href="#" className="text-[32px] font-medium text-primary-foreground hover:text-primary transition-colors">Log in</a>
              <a href="#" className="text-[32px] font-medium text-primary-foreground underline underline-offset-2 hover:text-primary transition-colors">Start free trial</a>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 relative z-10">
        {/* Hero Section - content on left, text-left */}
        <section className="min-h-screen flex flex-col justify-center px-5 sm:px-8 md:px-10 overflow-x-hidden py-28 md:py-32">
          <div className="max-w-xl relative z-10 w-full text-left">
            <div className="pointer-events-none select-none mb-5 sm:mb-6" style={{ fontSize: "clamp(18px, 4vw, 26px)", lineHeight: 1.3, fontWeight: 400, color: "var(--color-primary-foreground)", filter: "blur(4px)" }}>
              <span className="block">Hey there, meet Clarity,</span>
              <span className="block">Simple project management for focused teams</span>
            </div>

            <h1 className="font-heading font-semibold tracking-tight text-primary-foreground mb-6 text-left" style={{ fontSize: "clamp(32px, 6vw, 60px)", lineHeight: 1.05 }}>
              Project management <span className="gradient-text">without the noise</span>
            </h1>

            <p className="mb-6 text-left text-primary-foreground/80" style={{ fontSize: "clamp(16px, 3vw, 20px)", fontWeight: 500 }}>
              Reach out at{" "}
              <a href="mailto:hello@clarity.ai" className="text-primary underline underline-offset-2 hover:opacity-80 transition-opacity">
                clarity.ai
              </a>
            </p>

            <p className="mb-6 text-left text-primary-foreground/80" style={{ fontSize: "clamp(18px, 4vw, 26px)", lineHeight: 1.4, fontWeight: 400, minHeight: "3.6em" }}>
              {displayed}
              {!done && (
                <span className="inline-block w-[2px] h-[1.1em] bg-primary align-middle ml-[2px] animate-blink" aria-hidden="true" />
              )}
            </p>

            <div className="mt-8 flex flex-wrap gap-y-1 text-left">
              <Button className="inline-flex items-center justify-center bg-primary text-primary-foreground border border-primary/20 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-primary/80 transition-colors duration-200">
                Get started
              </Button>
              <Button className="inline-flex items-center justify-center bg-primary text-primary-foreground border border-primary/20 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-primary/80 transition-colors duration-200">
                Start free trial
              </Button>
              <Button className="inline-flex items-center justify-center bg-primary text-primary-foreground border border-primary/20 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-primary/80 transition-colors duration-200">
                Log in
              </Button>
              <Button className="inline-flex items-center justify-center bg-primary text-primary-foreground border border-primary/20 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-primary/80 transition-colors duration-200">
                Talk to sales
              </Button>
              <Button
                variant="outline"
                className="inline-flex items-center justify-center gap-2 sm:gap-3 bg-transparent text-primary-foreground border-primary rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                onClick={() => navigator.clipboard.writeText("hello@clarity.ai")}
              >
                <span className="underline underline-offset-1">Reach us: hello@clarity.ai</span>
                <Copy className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              </Button>
            </div>
            <p className="mt-4 text-sm text-primary-foreground/60 text-left">
              Free 14-day trial. No credit card required.
            </p>
          </div>
        </section>

        {/* Stats / Trust strip */}
        <section className="relative py-10 sm:py-12">
          <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll>
              <div className="glass-card flex flex-col items-center justify-center gap-8 rounded-2xl px-6 py-8 text-center sm:flex-row sm:gap-0 sm:divide-x sm:divide-white/15">
                {[
                  { value: "12,000+", label: "Focused teams" },
                  { value: "99.9%", label: "Uptime" },
                  { value: "SOC 2", label: "Compliant" },
                ].map((stat) => (
                  <div key={stat.label} className="flex flex-col items-center px-6 sm:flex-1">
                    <span className="font-heading text-2xl font-semibold text-primary sm:text-3xl">{stat.value}</span>
                    <span className="mt-1 text-sm text-primary-foreground/70">{stat.label}</span>
                  </div>
                ))}
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="relative py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll>
              <div className="mb-14 max-w-2xl text-left">
                <h2 className="font-heading font-semibold tracking-tight text-primary-foreground sm:text-4xl text-3xl text-left">Everything you need, nothing more</h2>
                <p className="mt-4 text-lg text-primary-foreground/70 text-left">Built for teams that want to move fast without getting lost in complex workflows.</p>
              </div>
            </AnimateOnScroll>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl text-left">
              {[
                { title: "Simple task boards", description: "Organize work with drag-and-drop boards that stay out of your way." },
                { title: "Fast prioritization", description: "Focus on what matters today with clear priorities and due dates." },
                { title: "Team collaboration", description: "Comment, assign, and mention teammates to keep everyone aligned." },
                { title: "Clear progress", description: "See project health at a glance with lightweight progress tracking." },
                { title: "Private by default", description: "Your data is encrypted and only visible to people you invite." },
                { title: "Zero setup", description: "Create a project in seconds and invite your team with one link." },
              ].map((feature, i) => (
                <AnimateOnScroll key={feature.title} delay={i * 0.1}>
                  <div className="glass-card h-full rounded-xl p-6 transition-all duration-200 hover:bg-white/15">
                    <h3 className="text-lg font-semibold text-primary-foreground">{feature.title}</h3>
                    <p className="mt-2 text-primary-foreground/70">{feature.description}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="relative py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll>
              <div className="mb-14 max-w-2xl text-left">
                <h2 className="font-heading font-semibold tracking-tight text-primary-foreground sm:text-4xl text-3xl text-left">Get your team up and running in minutes</h2>
                <p className="mt-4 text-lg text-primary-foreground/70 text-left max-w-xl">Three simple steps from sign-up to your first shipped task.</p>
              </div>
            </AnimateOnScroll>

            <div className="grid gap-6 md:grid-cols-3 max-w-5xl text-left">
              {[
                { step: "01", title: "Create a workspace", description: "Sign up and create a workspace for your team in under a minute." },
                { step: "02", title: "Add your projects", description: "Break work into projects and tasks that everyone can see and own." },
                { step: "03", title: "Ship together", description: "Track progress, remove blockers, and celebrate wins as a team." },
              ].map((step, i) => (
                <AnimateOnScroll key={step.step} delay={i * 0.15}>
                  <div className="glass-card h-full rounded-xl p-6">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-sm font-bold text-primary">{step.step}</span>
                    <h3 className="mt-4 text-xl font-semibold text-primary-foreground">{step.title}</h3>
                    <p className="mt-2 text-primary-foreground/70">{step.description}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        <section className="relative py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll>
              <div className="glass-card rounded-2xl p-8 sm:p-12 max-w-2xl text-left">
                <div className="mb-6 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                  ))}
                </div>
                <blockquote className="text-xl font-medium leading-relaxed text-primary-foreground sm:text-2xl lg:text-3xl">
                  &ldquo;We tried three other tools before Clarity. It is the first one our team actually wanted to keep using.&rdquo;
                </blockquote>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-sm font-semibold text-primary">SC</div>
                  <div className="text-left">
                    <p className="font-semibold text-primary-foreground">Sarah Chen</p>
                    <p className="text-sm text-primary-foreground/70">Product Lead, Northwind Studios</p>
                  </div>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="relative py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll>
              <div className="mb-14 max-w-2xl text-left">
                <h2 className="font-heading font-semibold tracking-tight text-primary-foreground sm:text-4xl text-3xl text-left">Straightforward pricing</h2>
                <p className="mt-4 text-lg text-primary-foreground/70 text-left">Start free, then scale as your team grows.</p>
              </div>
            </AnimateOnScroll>

            <div className="grid items-start gap-6 md:grid-cols-3 max-w-5xl text-left">
              <AnimateOnScroll delay={0}>
                <div className="glass-card h-full flex flex-col rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-primary-foreground">Starter</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-semibold tracking-tight text-primary-foreground">$0</span>
                  </div>
                  <p className="mt-2 text-sm text-primary-foreground/70">For individuals and small side projects.</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {["Up to 3 projects", "2 team members", "Basic task boards"].map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-primary-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{f}</li>
                    ))}
                  </ul>
                  <Button variant="outline" className="mt-8 w-full border-primary/40 bg-primary/20 text-primary-foreground hover:bg-primary hover:text-primary-foreground">Get started free</Button>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll delay={0.1}>
                <div className="glass-card h-full flex flex-col rounded-2xl p-6 border-2 border-primary/50 shadow-xl">
                  <div className="rounded-t-[calc(var(--radius)-1px)] bg-primary px-4 py-1.5 text-center text-xs font-semibold text-primary-foreground mb-4">Most popular</div>
                  <h3 className="text-lg font-semibold text-primary-foreground">Team</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-semibold tracking-tight text-primary-foreground">$12</span>
                    <span className="ml-1 text-sm text-primary-foreground/70">/user/month</span>
                  </div>
                  <p className="mt-2 text-sm text-primary-foreground/70">For growing teams that need to move faster.</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {["Unlimited projects", "Unlimited team members", "Advanced progress tracking", "Priority support"].map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-primary-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{f}</li>
                    ))}
                  </ul>
                  <Button className="mt-8 w-full bg-primary text-primary-foreground hover:bg-primary/80">Start free trial<ArrowRight className="ml-2 h-4 w-4" /></Button>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll delay={0.2}>
                <div className="glass-card h-full flex flex-col rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-primary-foreground">Business</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-semibold tracking-tight text-primary-foreground">$29</span>
                    <span className="ml-1 text-sm text-primary-foreground/70">/user/month</span>
                  </div>
                  <p className="mt-2 text-sm text-primary-foreground/70">For organizations with advanced needs.</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {["Everything in Team", "SSO and audit logs", "Custom workflows", "Dedicated account manager"].map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-primary-foreground"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{f}</li>
                    ))}
                  </ul>
                  <Button variant="outline" className="mt-8 w-full border-primary/40 bg-primary/20 text-primary-foreground hover:bg-primary hover:text-primary-foreground">Contact sales</Button>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="relative py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll>
              <h2 className="mb-10 font-heading font-semibold tracking-tight text-primary-foreground sm:text-4xl text-3xl text-left">Frequently asked questions</h2>
            </AnimateOnScroll>
            <div className="glass-card rounded-2xl p-6 sm:p-8 max-w-2xl text-left">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="trial" className="border-white/15">
                  <AccordionTrigger className="text-primary-foreground hover:text-primary transition-colors">Is there a free trial?</AccordionTrigger>
                  <AccordionContent className="text-primary-foreground/70">Yes. Every paid plan starts with a 14-day free trial. You can also use the Starter plan for free indefinitely.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="change-plan" className="border-white/15">
                  <AccordionTrigger className="text-primary-foreground hover:text-primary transition-colors">Can I change plans later?</AccordionTrigger>
                  <AccordionContent className="text-primary-foreground/70">Absolutely. You can upgrade or downgrade at any time, and changes take effect on your next billing cycle.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="cancel" className="border-white/15">
                  <AccordionTrigger className="text-primary-foreground hover:text-primary transition-colors">How do I cancel?</AccordionTrigger>
                  <AccordionContent className="text-primary-foreground/70">You can cancel your subscription from your workspace settings at any time. No cancellation fees or hidden charges.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="data" className="border-white/15">
                  <AccordionTrigger className="text-primary-foreground hover:text-primary transition-colors">Where is my data stored?</AccordionTrigger>
                  <AccordionContent className="text-primary-foreground/70">Your data is stored in secure, SOC 2 compliant data centers with encryption at rest and in transit.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="relative py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll>
              <div className="glass-card relative overflow-hidden rounded-2xl p-8 sm:p-12 lg:p-16 max-w-2xl text-left">
                <h2 className="font-heading font-semibold tracking-tight text-primary-foreground sm:text-4xl text-3xl">Ready to bring clarity to your work?</h2>
                <p className="mt-4 max-w-xl text-lg text-primary-foreground/70">Join hundreds of teams who have simplified the way they manage projects.</p>
                <div className="mt-8 flex flex-col items-start justify-start gap-3 sm:flex-row">
                  <Button size="lg" className="px-8 bg-primary text-primary-foreground hover:bg-primary/80">Start your free trial<ArrowRight className="ml-2 h-4 w-4" /></Button>
                  <Button size="lg" variant="outline" className="px-8 border-primary/40 bg-primary/20 text-primary-foreground hover:bg-primary hover:text-primary-foreground">Talk to sales</Button>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      </main>

      <footer className="relative z-10 glass-dark border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row">
            <a href="/" className="flex items-center gap-2.5 font-heading font-semibold text-primary-foreground">
              <span className="text-[22px] sm:text-[26px] select-none text-primary" style={{ letterSpacing: "-0.02em" }}>
                ✳︎
              </span>
              Clarity
            </a>
            <nav className="flex flex-wrap justify-start gap-6 text-sm text-primary-foreground/70">
              <a href="#" className="transition-colors hover:text-primary">Privacy</a>
              <a href="#" className="transition-colors hover:text-primary">Terms</a>
              <a href="#" className="transition-colors hover:text-primary">Security</a>
              <a href="#" className="transition-colors hover:text-primary">Contact</a>
            </nav>
            <p className="text-sm text-primary-foreground/60">&copy; {new Date().getFullYear()} Clarity, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}