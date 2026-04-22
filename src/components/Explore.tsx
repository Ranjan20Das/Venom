import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  Zap,
  Maximize2,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  Brain,
  ArrowRight,
} from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1] as const,
      delay: i * 0.08,
    },
  }),
};

type Capability = {
  icon: typeof Zap;
  meta: string;
  title: string;
  body: string;
  stat: string;
  statLabel: string;
};

const capabilities: Capability[] = [
  {
    icon: Zap,
    meta: "Physical Augmentation",
    title: "Superhuman Strength",
    body: "The symbiote rewires Eddie Brock's musculature, granting bone-crushing power, supernatural reflexes, and agility far beyond peak human limits.",
    stat: "40T",
    statLabel: "Lifting Capacity",
  },
  {
    icon: Maximize2,
    meta: "Ranged Combat",
    title: "Bioorganic Webbing",
    body: "Venom fires high-pressure strands of regenerative symbiote matter — stronger than steel cable and indistinguishable from Spider-Man's webbing.",
    stat: "70 FT",
    statLabel: "Effective Range",
  },
  {
    icon: Sparkles,
    meta: "Morphology",
    title: "Shape-Shifting",
    body: "Generates tendrils, shields, claws, and entire alternate body forms from Brock's mass. Achieves near-invisibility via colour and texture mimicry.",
    stat: "∞",
    statLabel: "Form Variations",
  },
  {
    icon: RefreshCw,
    meta: "Healing Factor",
    title: "Rapid Regeneration",
    body: "Symbiote matter seals open wounds and reconstitutes damaged tissue in seconds, making Venom nearly impossible to incapacitate in combat.",
    stat: "<5s",
    statLabel: "Tissue Recovery",
  },
  {
    icon: ShieldCheck,
    meta: "Defensive Trait",
    title: "Psychic Immunity",
    body: "Because the symbiote absorbed Spider-Man's genetic blueprint, Peter Parker's spider-sense cannot detect Venom — granting a permanent tactical edge.",
    stat: "100%",
    statLabel: "Spider-Sense Evasion",
  },
  {
    icon: Brain,
    meta: "Cognitive Bond",
    title: "Symbiotic Hivemind",
    body: "Brock and the symbiote share thoughts, memories, and instincts in real time — two minds operating as one lethal, coordinated organism.",
    stat: "2:1",
    statLabel: "Minds Bonded",
  },
];

export function Explore() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Giant ghost POWER drifts horizontally — same pattern as About's SYMBIOTE
  const ghostX = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const ghostOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 0.06, 0.06, 0],
  );

  // GSAP — only run client-side after mount to avoid hydration mismatch
  useEffect(() => {
    if (!mounted || !sectionRef.current) return;
    let ctx: { revert: () => void } | undefined;

    (async () => {
      const gsapModule = await import("gsap");
      const stModule = await import("gsap/ScrollTrigger");
      const gsap = gsapModule.default;
      const ScrollTrigger = stModule.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Card stagger reveal
        const cards = sectionRef.current!.querySelectorAll("[data-card]");
        gsap.from(cards, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
          },
          y: 50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.1,
        });

        // Breathing icon halos
        gsap.to(".cap-halo", {
          scale: 1.1,
          opacity: 0.55,
          duration: 2.4,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
          stagger: { each: 0.3, from: "random" },
        });

        // CTA pulse
        gsap.to(".cta-glow", {
          opacity: 0.9,
          scale: 1.08,
          duration: 1.8,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      }, sectionRef);
    })();

    return () => ctx?.revert();
  }, [mounted]);

  return (
    <section
      ref={sectionRef}
      id="explore"
      className="relative overflow-hidden bg-background py-32 md:py-40"
    >
      {/* Giant ghost POWER word — same treatment as SYMBIOTE in About */}
      <motion.h2
        style={{ x: ghostX, opacity: ghostOpacity }}
        className="font-display pointer-events-none absolute inset-x-0 top-16 z-0 select-none whitespace-nowrap text-center text-[22vw] leading-none tracking-tight text-foreground"
        aria-hidden
      >
        POWER
      </motion.h2>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
              className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground"
            >
              Symbiote Capabilities
            </motion.p>

            <h2 className="font-display mt-6 text-5xl leading-[0.95] tracking-tight md:text-7xl lg:text-[5.5rem]">
              <motion.span
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                custom={0}
                className="block text-foreground"
              >
                Lethal
              </motion.span>
              <motion.span
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                custom={1}
                className="block text-foreground/30"
              >
                Protector.
              </motion.span>
            </h2>
          </div>

          <div className="lg:col-span-5 lg:self-end">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
              custom={2}
              className="max-w-md text-base leading-relaxed text-foreground/75"
            >
              Six extraordinary abilities inherited from Spider-Man's genetics,
              amplified by alien biology.
            </motion.p>
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
              custom={3}
              className="mt-6 flex items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-foreground/40"
            >
              <span>Weaknesses</span>
              <span className="h-px flex-1 bg-foreground/15" />
              <span className="text-foreground/70">Fire · Sonic Waves</span>
            </motion.div>
          </div>
        </div>

        {/* Cards bento grid */}
        <div className="relative z-10 mt-20 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-24 md:grid-cols-12">
          {capabilities.map((cap) => {
            const Icon = cap.icon;
            return (
              <article
                key={cap.title}
                data-card
                className={[
                  "group relative z-10 flex h-full min-h-[340px] flex-col overflow-hidden rounded-3xl border border-foreground/20 bg-card/90 p-6 shadow-[0_8px_40px_-12px_oklch(0_0_0/0.6)] backdrop-blur-md transition-all duration-500 sm:p-7",
                  "hover:-translate-y-1 hover:border-foreground/40 hover:bg-card",
                  cap.span,
                ].join(" ")}
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(600px_circle_at_50%_0%,oklch(1_0_0/0.06),transparent_60%)]" />

                {/* Icon */}
                <div className="relative shrink-0">
                  <div className="cap-halo pointer-events-none absolute -inset-2 rounded-full bg-foreground/10 blur-xl opacity-30" />
                  <div className="relative grid h-11 w-11 place-items-center rounded-full bg-foreground/15 ring-1 ring-foreground/25">
                    <Icon className="h-4 w-4 text-foreground" />
                  </div>
                </div>

                {/* Body */}
                <div className="mt-6 flex flex-1 flex-col gap-3">
                  <p className="text-[10px] font-semibold uppercase leading-relaxed tracking-[0.2em] text-foreground/65">
                    {cap.meta}
                  </p>
                  <h3 className="font-display text-xl leading-tight tracking-tight text-foreground md:text-[1.6rem]">
                    {cap.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-foreground/85">
                    {cap.body}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* CTA */}
        <div className="relative mt-24 flex flex-col items-center justify-center text-center md:mt-32">
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
