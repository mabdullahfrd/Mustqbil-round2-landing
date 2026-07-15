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
  Layout,
  Zap,
  Shield,
  BarChart3,
  Users,
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
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const monitorRef = useRef<HTMLDivElement>(null);
  const [monitorAngle, setMonitorAngle] = useState(0);

  const typewriterText =
    "Clarity gives small teams a clean, focused workspace to plan tasks, track progress, and ship work together. No bloat, no steep learning curve.";
  const { displayed, done } = useTypewriter(typewriterText);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
      const monitor = monitorRef.current;
      if (monitor) {
        const rect = monitor.getBoundingClientRect();
        const mx = rect.left + rect.width / 2;
        const my = rect.top + rect.height / 2;
        const dx = e.clientX - mx;
        const dy = e.clientY - my;
        const deg = Math.atan2(dy, dx) * (180 / Math.PI);
        setMonitorAngle(deg);
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const translateX = (mousePos.x - 0.5) * -40;
  const translateY = (mousePos.y - 0.5) * -40;

  return (
    <div className="flex min-h-screen flex-col bg-background relative overflow-x-hidden">
      {/* Background Video - man always visible */}
      <video
        className="video-bg"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260530_042513_df96a13b-6155-4f6e-8b93-c9dee66fba08.mp4"
        muted
        playsInline
        preload="auto"
        aria-hidden="true"
        style={{
          transform: `scale(1.15) translate(${translateX}px, ${translateY}px)`,
          transition: "transform 0.15s ease-out",
          objectPosition: "65% center",
        }}
      />
      {/* Left-side gradient overlay for text readability, right side clear for man */}
      <div className="fixed inset-0 z-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      {/* Cursor-tracking monitor above man's head */}
      <div
        ref={monitorRef}
        className="fixed z-20 pointer-events-none"
        style={{ top: "14%", right: "26%" }}
      >
        <div className="relative">
          <div className="w-20 h-14 rounded-xl border-2 border-white/70 bg-white/10 backdrop-blur-md flex items-center justify-center shadow-lg">
            <div className="w-3 h-3 rounded-full bg-cyan-300 animate-pulse" />
          </div>
          <div
            className="absolute top-1/2 left-1/2 h-1 bg-gradient-to-r from-cyan-300 to-transparent rounded-full origin-left"
            style={{
              width: "3rem",
              transform: `translate(0, -50%) rotate(${monitorAngle}deg)`,
              transition: "transform 0.1s ease-out",
            }}
          />
        </div>
      </div>

      <header className="fixed top-0 left-0 right-0 z-30 px-5 sm:px-8 py-4 sm:py-5 glass-dark border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <a href="/" className="flex items-center gap-3 font-heading font-semibold text-white" style={{ fontSize: "21px" }}>
            <span className="text-[21px] sm:text-[26px] tracking-tight">Clarity</span>
            <span className="text-[25px] sm:text-[30px] select-none" style={{ letterSpacing: "-0.02em" }}>
              ✳︎
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-[23px] text-white">
            <a href="#features" className="hover:opacity-60 transition-opacity">Features</a>
            <a href="#how-it-works" className="hover:opacity-60 transition-opacity">How it works</a>
            <a href="#pricing" className="hover:opacity-60 transition-opacity">Pricing</a>
            <a href="#faq" className="hover:opacity-60 transition-opacity">FAQ</a>
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <a href="#" className="text-[23px] underline underline-offset-2 hover:opacity-60 transition-opacity text-white">Log in</a>
            <a href="#" className="text-[23px] underline underline-offset-2 hover:opacity-60 transition-opacity text-white">
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
            <span className="w-6 h-[2px] bg-white transition-all duration-300 origin-center" style={{ transform: hamburgerOpen ? "rotate(45deg) translate(7px, 7px)" : "none" }} />
            <span className="w-6 h-[2px] bg-white transition-opacity duration-300" style={{ opacity: hamburgerOpen ? 0 : 1 }} />
            <span className="w-6 h-[2px] bg-white transition-all duration-300 origin-center" style={{ transform: hamburgerOpen ? "rotate(-45deg) translate(7px, -7px)" : "none" }} />
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-9 glass-dark flex flex-col items-start justify-center px-8 gap-8 pt-20">
            <nav className="flex flex-col gap-4 text-left">
              <a href="#features" onClick={() => setMobileMenuOpen(false)} className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity">Features</a>
              <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)} className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity">How it works</a>
              <a href="#pricing" onClick={() => setMobileMenuOpen(false)} className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity">Pricing</a>
              <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity">FAQ</a>
              <hr className="w-full border-white/20" />
              <a href="#" className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity">Log in</a>
              <a href="#" className="text-[32px] font-medium text-white underline underline-offset-2 hover:opacity-60 transition-opacity">Start free trial</a>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1 relative z-10">
        {/* Hero Section - content on left */}
        <section className="min-h-screen flex flex-col justify-center px-5 sm:px-8 md:px-10 overflow-hidden">
          <div className="max-w-xl relative z-10 w-full">
            <div className="animate-fade-in pointer-events-none select-none mb-5 sm:mb-6" style={{ fontSize: "clamp(18px, 4vw, 26px)", lineHeight: 1.3, fontWeight: 400, color: "#fff", filter: "blur(4px)" }}>
              <span className="block">Hey there, meet Clarity,</span>
              <span className="block">Simple project management for focused teams</span>
            </div>

            <h1 className="animate-fade-in-up font-heading font-semibold tracking-tight text-white mb-6" style={{ fontSize: "clamp(28px, 6vw, 56px)", lineHeight: 1.1 }}>
              Project management <span className="gradient-text">without the noise</span>
            </h1>

            <p className="animate-fade-in-up-delay-1 mb-5 sm:mb-6 min-h-[54px] text-white" style={{ fontSize: "clamp(18px, 4vw, 26px)", lineHeight: 1.35, fontWeight: 400 }}>
              {displayed}
              {!done && (
                <span className="inline-block w-[2px] h-[1.1em] bg-white align-middle ml-[2px] animate-blink" aria-hidden="true" />
              )}
            </p>

            <div className="mt-8 flex flex-wrap gap-y-1">
              <Button className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200">
                Get started
              </Button>
              <Button className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200">
                Start free trial
              </Button>
              <Button className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200">
                Log in
              </Button>
              <Button className="inline-flex items-center justify-center bg-white text-black border border-black/10 rounded-full text-[13px] sm:text-[15px] px-4 sm:px-5 py-[0.3em] mx-[0.2em] mb-[0.4em] whitespace-nowrap hover:bg-black hover:text-white transition-colors duration-200">
                Talk to sales
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
            <p className="animate-fade-in-up-delay-2 mt-4 text-sm text-white/70">
              Free 14-day trial. No credit card required.
            </p>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="relative py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll>
              <div className="mb-14 max-w-2xl">
                <h2 className="font-heading font-semibold tracking-tight text-white sm:text-4xl text-3xl">Everything you need, nothing more</h2>
                <p className="mt-4 text-lg text-white/70">Built for teams that want to move fast without getting lost in complex workflows.</p>
              </div>
            </AnimateOnScroll>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl">
              {[
                { icon: <Layout className="h-5 w-5" />, title: "Simple task boards", description: "Organize work with drag-and-drop boards that stay out of your way." },
                { icon: <Zap className="h-5 w-5" />, title: "Fast prioritization", description: "Focus on what matters today with clear priorities and due dates." },
                { icon: <Users className="h-5 w-5" />, title: "Team collaboration", description: "Comment, assign, and mention teammates to keep everyone aligned." },
                { icon: <BarChart3 className="h-5 w-5" />, title: "Clear progress", description: "See project health at a glance with lightweight progress tracking." },
                { icon: <Shield className="h-5 w-5" />, title: "Private by default", description: "Your data is encrypted and only visible to people you invite." },
                { icon: <Check className="h-5 w-5" />, title: "Zero setup", description: "Create a project in seconds and invite your team with one link." },
              ].map((feature, i) => (
                <AnimateOnScroll key={feature.title} delay={i * 0.1}>
                  <div className="glass-card h-full rounded-xl p-6 transition-all duration-200 hover:bg-white/15">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/20 text-white">{feature.icon}</div>
                    <h3 className="mt-4 text-lg font-semibold text-white">{feature.title}</h3>
                    <p className="mt-2 text-white/70">{feature.description}</p>
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
              <div className="mb-14 max-w-2xl">
                <h2 className="font-heading font-semibold tracking-tight text-white sm:text-4xl text-3xl">Get your team up and running in minutes</h2>
                <p className="mt-4 text-lg text-white/70 max-w-xl">Three simple steps from sign-up to your first shipped task.</p>
              </div>
            </AnimateOnScroll>

            <div className="grid gap-6 md:grid-cols-3 max-w-5xl">
              {[
                { step: "01", title: "Create a workspace", description: "Sign up and create a workspace for your team in under a minute." },
                { step: "02", title: "Add your projects", description: "Break work into projects and tasks that everyone can see and own." },
                { step: "03", title: "Ship together", description: "Track progress, remove blockers, and celebrate wins as a team." },
              ].map((step, i) => (
                <AnimateOnScroll key={step.step} delay={i * 0.15}>
                  <div className="glass-card h-full rounded-xl p-6">
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-sm font-bold text-white">{step.step}</span>
                    <h3 className="mt-4 text-xl font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-white/70">{step.description}</p>
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
              <div className="glass-card rounded-2xl p-8 sm:p-12 max-w-2xl">
                <div className="mb-6 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-xl font-medium leading-relaxed text-white sm:text-2xl lg:text-3xl">
                  &ldquo;We tried three other tools before Clarity. It is the first one our team actually wanted to keep using.&rdquo;
                </blockquote>
                <div className="mt-8 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-sm font-semibold text-white">SC</div>
                  <div>
                    <p className="font-semibold text-white">Sarah Chen</p>
                    <p className="text-sm text-white/70">Product Lead, Northwind Studios</p>
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
              <div className="mb-14 max-w-2xl">
                <h2 className="font-heading font-semibold tracking-tight text-white sm:text-4xl text-3xl">Straightforward pricing</h2>
                <p className="mt-4 text-lg text-white/70">Start free, then scale as your team grows.</p>
              </div>
            </AnimateOnScroll>

            <div className="grid items-start gap-6 md:grid-cols-3 max-w-5xl">
              <AnimateOnScroll delay={0}>
                <div className="glass-card h-full flex flex-col rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white">Starter</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-semibold tracking-tight text-white">$0</span>
                  </div>
                  <p className="mt-2 text-sm text-white/70">For individuals and small side projects.</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {["Up to 3 projects", "2 team members", "Basic task boards"].map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-white"><Check className="mt-0.5 h-4 w-4 shrink-0 text-white" />{f}</li>
                    ))}
                  </ul>
                  <Button variant="outline" className="mt-8 w-full border-white/30 text-white hover:bg-white hover:text-black">Get started free</Button>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll delay={0.1}>
                <div className="glass-card h-full flex flex-col rounded-2xl p-6 border-2 border-white/40 shadow-xl">
                  <div className="rounded-t-[calc(var(--radius)-1px)] bg-white/90 px-4 py-1.5 text-center text-xs font-semibold text-black mb-4">Most popular</div>
                  <h3 className="text-lg font-semibold text-white">Team</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-semibold tracking-tight text-white">$12</span>
                    <span className="ml-1 text-sm text-white/70">/user/month</span>
                  </div>
                  <p className="mt-2 text-sm text-white/70">For growing teams that need to move faster.</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {["Unlimited projects", "Unlimited team members", "Advanced progress tracking", "Priority support"].map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-white"><Check className="mt-0.5 h-4 w-4 shrink-0 text-white" />{f}</li>
                    ))}
                  </ul>
                  <Button className="mt-8 w-full bg-white text-black hover:bg-white/80">Start free trial<ArrowRight className="ml-2 h-4 w-4" /></Button>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll delay={0.2}>
                <div className="glass-card h-full flex flex-col rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white">Business</h3>
                  <div className="mt-4 flex items-baseline">
                    <span className="text-4xl font-semibold tracking-tight text-white">$29</span>
                    <span className="ml-1 text-sm text-white/70">/user/month</span>
                  </div>
                  <p className="mt-2 text-sm text-white/70">For organizations with advanced needs.</p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {["Everything in Team", "SSO and audit logs", "Custom workflows", "Dedicated account manager"].map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-white"><Check className="mt-0.5 h-4 w-4 shrink-0 text-white" />{f}</li>
                    ))}
                  </ul>
                  <Button variant="outline" className="mt-8 w-full border-white/30 text-white hover:bg-white hover:text-black">Contact sales</Button>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="relative py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll>
              <h2 className="mb-10 font-heading font-semibold tracking-tight text-white sm:text-4xl text-3xl">Frequently asked questions</h2>
            </AnimateOnScroll>
            <div className="glass-card rounded-2xl p-6 sm:p-8 max-w-2xl">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="trial" className="border-white/15">
                  <AccordionTrigger className="text-white hover:text-white/80">Is there a free trial?</AccordionTrigger>
                  <AccordionContent className="text-white/70">Yes. Every paid plan starts with a 14-day free trial. You can also use the Starter plan for free indefinitely.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="change-plan" className="border-white/15">
                  <AccordionTrigger className="text-white hover:text-white/80">Can I change plans later?</AccordionTrigger>
                  <AccordionContent className="text-white/70">Absolutely. You can upgrade or downgrade at any time, and changes take effect on your next billing cycle.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="cancel" className="border-white/15">
                  <AccordionTrigger className="text-white hover:text-white/80">How do I cancel?</AccordionTrigger>
                  <AccordionContent className="text-white/70">You can cancel your subscription from your workspace settings at any time. No cancellation fees or hidden charges.</AccordionContent>
                </AccordionItem>
                <AccordionItem value="data" className="border-white/15">
                  <AccordionTrigger className="text-white hover:text-white/80">Where is my data stored?</AccordionTrigger>
                  <AccordionContent className="text-white/70">Your data is stored in secure, SOC 2 compliant data centers with encryption at rest and in transit.</AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="relative py-20 sm:py-24 lg:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <AnimateOnScroll>
              <div className="glass-card relative overflow-hidden rounded-2xl p-8 sm:p-12 lg:p-16 max-w-2xl">
                <h2 className="font-heading font-semibold tracking-tight text-white sm:text-4xl text-3xl">Ready to bring clarity to your work?</h2>
                <p className="mt-4 max-w-xl text-lg text-white/70">Join hundreds of teams who have simplified the way they manage projects.</p>
                <div className="mt-8 flex flex-col items-start justify-start gap-3 sm:flex-row">
                  <Button size="lg" className="px-8 bg-white text-black hover:bg-white/80">Start your free trial<ArrowRight className="ml-2 h-4 w-4" /></Button>
                  <Button size="lg" variant="outline" className="px-8 border-white/30 text-white hover:bg-white hover:text-black">Talk to sales</Button>
                </div>
              </div>
            </AnimateOnScroll>
          </div>
        </section>
      </main>

      <footer className="relative z-10 glass-dark border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-6 sm:flex-row">
            <a href="/" className="flex items-center gap-2.5 font-heading font-semibold text-white">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/20 text-white"><Layout className="h-4 w-4" /></div>
              Clarity
            </a>
            <nav className="flex flex-wrap justify-start gap-6 text-sm text-white/70">
              <a href="#" className="transition-colors hover:text-white">Privacy</a>
              <a href="#" className="transition-colors hover:text-white">Terms</a>
              <a href="#" className="transition-colors hover:text-white">Security</a>
              <a href="#" className="transition-colors hover:text-white">Contact</a>
            </nav>
            <p className="text-sm text-white/70">&copy; {new Date().getFullYear()} Clarity, Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}