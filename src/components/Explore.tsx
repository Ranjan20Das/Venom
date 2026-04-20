import { useRef } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Zap,
  Maximize2,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  Brain,
  ArrowRight,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Capability = {
  icon: typeof Zap;
  meta: string;
  title: string;
  body: string;
  span: string; // grid span classes
};

const capabilities: Capability[] = [
  {
    icon: Zap,
    meta: "LIFTING CAPACITY: 40 TONS",
    title: "Superhuman Strength",
    body: "The symbiote augments its host's musculature to superhuman levels, granting the ability to lift 40 tons and strike with bone-crushing force. Reflexes and agility are enhanced far beyond peak human capability.",
    span: "md:col-span-7 md:row-span-2",
  },
  {
    icon: Maximize2,
    meta: "RANGE: 70 FEET · DISSOLVES IN ~3 HRS",
    title: "Bioorganic Webbing",
    body: "Venom fires high-pressure strands of regenerative symbiote matter — stronger than steel cable and indistinguishable from Spider-Man's web to most sensors.",
    span: "md:col-span-5",
  },
  {
    icon: Sparkles,
    meta: "FULL-BODY MORPHOLOGY",
    title: "Shape-Shifting",
    body: "Generates tendrils, shields, claws, and full alternate body forms from Brock's mass. Near-invisibility via colour and texture mimicry.",
    span: "md:col-span-3",
  },
  {
    icon: RefreshCw,
    meta: "HEALS IN SECONDS",
    title: "Rapid Regeneration",
    body: "Symbiote matter seals wounds and reconstitutes damaged tissue at extraordinary speed, making Venom nearly impossible to incapacitate.",
    span: "md:col-span-2",
  },
  {
    icon: ShieldCheck,
    meta: "IMMUNE TO SPIDER-SENSE · RESISTS GHOST RIDER'S PENANCE STARE",
    title: "Psychic & Supernatural Immunity",
    body: "Because the symbiote absorbed Spider-Man's genetic blueprint, Peter Parker's extrasensory spider-sense cannot detect Venom. The alien biology also provides resistance to certain supernatural attacks — though sonic waves and intense heat remain critical vulnerabilities.",
    span: "md:col-span-12",
  },
  {
    icon: Brain,
    meta: "SHARED CONSCIOUSNESS",
    title: "Symbiotic Hivemind",
    body: "Brock and the symbiote share thoughts, memories, and instincts in real time — two minds operating as one lethal organism.",
    span: "md:col-span-12",
  },
];

export function Explore() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const ghostX = useTransform(scrollYProgress, [0, 1], ["6%", "-14%"]);
  const ghostY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  useGSAP(
    () => {
      // Header reveal
      gsap.from(headerRef.current?.querySelectorAll("[data-reveal]") ?? [], {
        scrollTrigger: {
          trigger: headerRef.current,
          start: "top 80%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
      });

      // Cards stagger reveal
      const cards = cardsRef.current?.querySelectorAll("[data-card]") ?? [];
      gsap.from(cards, {
        scrollTrigger: {
          trigger: cardsRef.current,
          start: "top 75%",
        },
        y: 60,
        opacity: 0,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.1,
      });

      // Subtle continuous "breathing" on icon halos
      gsap.to(".cap-halo", {
        scale: 1.08,
        opacity: 0.55,
        duration: 2.4,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        stagger: { each: 0.3, from: "random" },
      });

      // CTA pulsing glow
      gsap.to(".cta-glow", {
        opacity: 0.85,
        scale: 1.06,
        duration: 1.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="explore"
      ref={sectionRef}
      className="relative overflow-hidden bg-background py-28 md:py-40"
    >
      {/* Ghost background word */}
      <motion.span
        aria-hidden
        style={{ x: ghostX, y: ghostY }}
        className="pointer-events-none absolute -top-6 right-0 select-none font-display text-[22vw] leading-none tracking-tighter text-foreground/[0.04] md:text-[14vw]"
      >
        POWER
      </motion.span>

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 [background:var(--gradient-vignette)]" />

      <div className="relative mx-auto max-w-7xl px-6">
        {/* Header */}
        <div
          ref={headerRef}
          className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16"
        >
          <div className="md:col-span-7">
            <span
              data-reveal
              className="text-xs font-semibold uppercase tracking-[0.4em] text-foreground/40"
            >
              Symbiote Capabilities
            </span>
            <h2
              data-reveal
              className="font-display mt-6 text-5xl leading-[0.95] tracking-tight text-foreground md:text-7xl"
            >
              Lethal
              <br />
              <span className="text-foreground/25">Protector.</span>
            </h2>
          </div>
          <div className="md:col-span-5 md:pt-10">
            <p
              data-reveal
              className="max-w-md text-base leading-relaxed text-foreground/70"
            >
              Six extraordinary abilities inherited from Spider-Man's genetics,
              amplified by alien biology.
            </p>
            <div
              data-reveal
              className="mt-6 flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-foreground/40"
            >
              <span>Weaknesses</span>
              <span className="h-px flex-1 bg-foreground/15" />
              <span className="text-foreground/70">Fire · Sonic Waves</span>
            </div>
          </div>
        </div>

        {/* Cards grid */}
        <div
          ref={cardsRef}
          className="mt-16 grid grid-cols-1 gap-4 md:mt-20 md:grid-cols-12 md:auto-rows-[minmax(220px,auto)]"
        >
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <article
                key={cap.title}
                data-card
                className={[
                  "group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-foreground/10 bg-card/40 p-7 backdrop-blur-sm transition-all duration-500",
                  "hover:border-foreground/25 hover:bg-card/70 hover:-translate-y-1",
                  cap.span,
                ].join(" ")}
              >
                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(600px_circle_at_var(--x,50%)_var(--y,0%),oklch(1_0_0/0.06),transparent_60%)]" />

                {/* Icon */}
                <div className="relative">
                  <div className="cap-halo pointer-events-none absolute -inset-2 rounded-full bg-foreground/10 blur-xl opacity-30" />
                  <div className="relative grid h-11 w-11 place-items-center rounded-full bg-foreground/10 ring-1 ring-foreground/15">
                    <Icon className="h-4 w-4 text-foreground" />
                  </div>
                </div>

                {/* Body */}
                <div className="mt-10 space-y-3">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/35">
                    {cap.meta}
                  </p>
                  <h3 className="font-display text-2xl leading-tight tracking-tight text-foreground md:text-[1.7rem]">
                    {cap.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/65">
                    {cap.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="relative mt-24 flex flex-col items-center justify-center text-center md:mt-32"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 text-xs font-semibold uppercase tracking-[0.4em] text-foreground/40"
          >
            The bond awaits
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative"
          >
            {/* Glow halo */}
            <div className="cta-glow pointer-events-none absolute -inset-8 rounded-full bg-foreground/30 blur-3xl opacity-60" />

            <Link
              to="/movies"
              className="group relative inline-flex items-center gap-3 rounded-full bg-foreground px-9 py-5 text-sm font-bold uppercase tracking-[0.25em] text-background shadow-[0_0_60px_-5px_oklch(1_0_0/0.6)] transition-all duration-500 hover:scale-[1.04] hover:shadow-[0_0_90px_-5px_oklch(1_0_0/0.85)]"
            >
              <span>Enter the Symbiote World</span>
              <ArrowRight className="h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, delay: 0.4 }}
            className="mt-6 max-w-sm text-xs text-foreground/40"
          >
            Step into the cinematic saga — three films, one lethal protector.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
