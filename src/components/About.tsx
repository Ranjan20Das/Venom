import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { SymbioteOrbit } from "./SymbioteOrbit";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 },
  }),
};

const timeline = [
  {
    n: "01",
    title: "Klyntar Origin",
    body: "The symbiote species were created from 'living abyss' by the dark elder god Knull at the dawn of the universe. Venom's symbiote rebelled against Knull and was cast into exile, eventually reaching Earth via Battleworld.",
  },
  {
    n: "02",
    title: "Spider-Man's Black Suit",
    body: "In The Amazing Spider-Man #252 (1984), Peter Parker unwittingly bonded with the symbiote, gaining a sleek black costume. Upon discovering its sentient, parasitic nature, he expelled it — leaving the creature with Spider-Man's genetic memory.",
  },
  {
    n: "03",
    title: "Eddie Brock Becomes Venom",
    body: "Disgraced reporter Eddie Brock, ruined by Spider-Man's exposure of his false Sin-Eater story, shared a mutual hatred that drew the symbiote to him. Together in ASM #300 (1988), Venom was born — 'We are Venom.'",
  },
];

const stats = [
  { l: "Hosts Bonded", v: "12+" },
  { l: "Years Active", v: "38" },
  { l: "Lifting Capacity", v: "40T" },
  { l: "Comic Issues", v: "300+" },
];

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Giant ghost word drifts horizontally as you scroll
  const ghostX = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const ghostOpacity = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0, 0.06, 0.06, 0],
  );

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-background py-32 md:py-40"
    >
      {/* Giant ghost word in background */}
      <motion.h2
        style={{ x: ghostX, opacity: ghostOpacity }}
        className="font-display pointer-events-none absolute inset-x-0 top-16 select-none whitespace-nowrap text-center text-[22vw] leading-none tracking-tight text-foreground"
        aria-hidden
      >
        SYMBIOTE
      </motion.h2>

      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-8">
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.6 }}
              className="text-xs font-semibold uppercase tracking-[0.4em] text-muted-foreground"
            >
              The Origin
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
                Born from
              </motion.span>
              <motion.span
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
                custom={1}
                className="block text-foreground/35"
              >
                Living Abyss.
              </motion.span>
            </h2>
          </div>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            custom={2}
            className="lg:col-span-4 self-end max-w-md text-base leading-relaxed text-foreground/75"
          >
            A symbiote older than humanity itself — expelled by its own kind,
            bonded with Earth's greatest hero, then cast aside to find a more
            willing partner in darkness.
          </motion.p>
        </div>

        {/* Body grid */}
        <div className="mt-24 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Timeline */}
          <ol className="lg:col-span-7 space-y-0">
            {timeline.map((item, i) => (
              <motion.li
                key={item.n}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                custom={i}
                className="group grid grid-cols-[auto_1fr] gap-6 border-t border-foreground/10 py-8 md:gap-10"
              >
                <span className="font-mono text-xs text-foreground/40">
                  {item.n}
                </span>
                <div>
                  <h3 className="font-display text-xl uppercase tracking-wide text-foreground transition-colors group-hover:text-foreground md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/65 md:text-base">
                    {item.body}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>

          {/* Orbit + stats */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
            >
              <SymbioteOrbit />
            </motion.div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <motion.div
                  key={s.l}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.5 }}
                  custom={i}
                  whileHover={{ y: -4 }}
                  className="rounded-2xl border border-foreground/10 bg-foreground/[0.03] p-5 transition-colors hover:border-foreground/25 hover:bg-foreground/[0.06]"
                >
                  <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                    {s.l}
                  </div>
                  <div className="font-display mt-3 text-3xl text-foreground md:text-4xl">
                    {s.v}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
