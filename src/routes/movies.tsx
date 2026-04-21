import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import filmVenom from "@/assets/film-venom.jpg";
import filmCarnage from "@/assets/film-carnage.jpg";
import filmLastDance from "@/assets/film-lastdance.jpg";

export const Route = createFileRoute("/movies")({
  component: MoviesPage,
  head: () => ({
    meta: [
      { title: "The Film Trilogy — VenomUniverse" },
      {
        name: "description",
        content:
          "Three films. One symbiote. Explore the Venom trilogy: Venom (2018), Let There Be Carnage, and The Last Dance.",
      },
      { property: "og:title", content: "The Film Trilogy — VenomUniverse" },
      {
        property: "og:description",
        content: "Three films. One symbiote. $1.5 billion at the global box office.",
      },
    ],
  }),
});

const films = [
  {
    year: "2018",
    tag: "ORIGIN",
    title: "Venom",
    tagline: "The world has enough superheroes.",
    description:
      "Journalist Eddie Brock bonds with an alien symbiote from the Life Foundation, gaining extraordinary powers while wrestling with a dangerous, ravenous alter-ego.",
    director: "Ruben Fleischer",
    box: "$856.1M",
    image: filmVenom,
  },
  {
    year: "2021",
    tag: "CARNAGE",
    title: "Let There Be Carnage",
    tagline: "There will be carnage.",
    description:
      "Eddie and Venom's chaotic cohabitation is shattered when serial killer Cletus Kasady bonds with Venom's offspring to become the red-drenched Carnage.",
    director: "Andy Serkis",
    box: "$502.1M",
    image: filmCarnage,
  },
  {
    year: "2024",
    tag: "FINALE",
    title: "The Last Dance",
    tagline: "Every symbiote has a last host.",
    description:
      "Eddie Brock and Venom are hunted across the globe by the ancient Xenophage as the symbiote's true origins and its connection to the god Knull are finally revealed.",
    director: "Kelly Marcel",
    box: "$138.9M",
    image: filmLastDance,
  },
];

function MoviesPage() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const ghostX = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const ghostOpacity = useTransform(scrollYProgress, [0, 0.6], [0.07, 0.02]);

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    let mounted = true;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      gsap.registerPlugin(ScrollTrigger);
      if (!mounted || !cardsRef.current) return;

      ctx = gsap.context(() => {
        const cards = gsap.utils.toArray<HTMLElement>(".film-card");
        cards.forEach((card, i) => {
          gsap.fromTo(
            card,
            { y: 120, opacity: 0, scale: 0.94, rotateX: 8 },
            {
              y: 0,
              opacity: 1,
              scale: 1,
              rotateX: 0,
              duration: 1.2,
              delay: i * 0.18,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 88%",
              },
            },
          );

          const img = card.querySelector(".film-img");
          if (img) {
            gsap.to(img, {
              yPercent: -12,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          }
        });
      }, cardsRef);
    })();

    return () => {
      mounted = false;
      ctx?.revert();
    };
  }, []);

  const handlePointerMove = (e: ReactPointerEvent<HTMLElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width; // 0..1
    const py = (e.clientY - rect.top) / rect.height; // 0..1
    const rx = (0.5 - py) * 14; // tilt X (deg)
    const ry = (px - 0.5) * 18; // tilt Y (deg)
    card.style.setProperty("--rx", `${rx}deg`);
    card.style.setProperty("--ry", `${ry}deg`);
    card.style.setProperty("--mx", `${px * 100}%`);
    card.style.setProperty("--my", `${py * 100}%`);
    card.style.setProperty(
      "--shadow",
      `${(px - 0.5) * -40}px ${(py - 0.5) * -40 + 30}px 60px -10px oklch(0 0 0 / 0.7)`,
    );
  };

  const handlePointerLeave = (e: ReactPointerEvent<HTMLElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--rx", "0deg");
    card.style.setProperty("--ry", "0deg");
    card.style.setProperty("--shadow", "0 20px 40px -20px oklch(0 0 0 / 0.5)");
  };

  return (
    <main
      ref={sectionRef}
      className="relative min-h-screen overflow-hidden bg-background text-foreground"
    >
      <Navbar />

      {/* Giant ghost TRILOGY text */}
      <motion.h2
        aria-hidden
        style={{ x: ghostX, opacity: ghostOpacity }}
        className="font-display pointer-events-none absolute left-0 top-32 z-0 select-none whitespace-nowrap text-[26vw] font-black leading-none tracking-tighter text-foreground md:top-40"
      >
        TRILOGY
      </motion.h2>

      <section className="relative z-10 px-6 pb-32 pt-32 md:pt-40">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-foreground/50 transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3 w-3" /> Back
            </Link>
          </motion.div>

          <div className="mt-16 grid grid-cols-1 items-end gap-12 md:mt-24 md:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="md:col-span-7"
            >
              <span className="block text-xs font-semibold uppercase tracking-[0.4em] text-foreground/40">
                Sony's Spider-Man Universe
              </span>
              <h1 className="font-display mt-6 text-6xl font-black leading-[0.9] tracking-tight md:text-8xl">
                The Film
                <br />
                <span className="text-foreground/30">Trilogy.</span>
              </h1>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="max-w-md text-base leading-relaxed text-foreground/60 md:col-span-5"
            >
              Three films. One symbiote. $1.5 billion at the global box office. Tom Hardy's Eddie
              Brock defined a generation of anti-heroes.
            </motion.p>
          </div>

          {/* Cards */}
          <div
            ref={cardsRef}
            className="mt-24 grid grid-cols-1 gap-7 md:grid-cols-3"
            style={{ perspective: "1200px" }}
          >
            {films.map((f) => (
              <article
                key={f.title}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
                style={{
                  transform:
                    "perspective(1100px) rotateX(var(--rx,0deg)) rotateY(var(--ry,0deg))",
                  boxShadow: "var(--shadow, 0 20px 40px -20px oklch(0 0 0 / 0.5))",
                  transition:
                    "transform 0.35s cubic-bezier(0.22,1,0.36,1), box-shadow 0.35s ease, border-color 0.5s ease",
                  transformStyle: "preserve-3d",
                }}
                className="film-card group relative flex flex-col overflow-hidden rounded-3xl border border-foreground/10 bg-card/50 backdrop-blur-sm hover:border-foreground/30"
              >
                {/* Pointer-following sheen */}
                <div
                  className="pointer-events-none absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(450px circle at var(--mx,50%) var(--my,50%), oklch(1 0 0 / 0.18), transparent 55%)",
                  }}
                />
                <div className="pointer-events-none absolute -inset-px z-0 rounded-3xl opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-60 [background:radial-gradient(400px_circle_at_50%_50%,oklch(1_0_0/0.25),transparent_70%)]" />

                {/* Image */}
                <div className="relative z-10 h-72 overflow-hidden">
                  <img
                    src={f.image}
                    alt={`${f.title} (${f.year}) — cinematic still`}
                    width={1024}
                    height={1280}
                    loading="lazy"
                    className="film-img absolute inset-0 h-[120%] w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

                  {/* Year & tag pills */}
                  <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-5">
                    <span className="rounded-full border border-foreground/20 bg-background/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/80 backdrop-blur-md">
                      {f.year}
                    </span>
                    <span className="rounded-full border border-foreground/20 bg-background/60 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.25em] text-foreground/80 backdrop-blur-md">
                      {f.tag}
                    </span>
                  </div>

                  {/* Open icon (middle card emphasis) */}
                  <div className="absolute right-5 top-16 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-foreground/20 bg-background/60 opacity-0 backdrop-blur-md transition-opacity duration-500 group-hover:opacity-100">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>

                  {/* Tagline overlay on image bottom */}
                  <p className="absolute bottom-4 left-5 right-5 z-10 text-[11px] font-semibold uppercase italic tracking-[0.2em] text-foreground/70">
                    {f.tagline}
                  </p>
                </div>

                {/* Body */}
                <div className="relative z-10 flex flex-1 flex-col p-6">
                  <h3 className="font-display text-3xl font-black leading-tight tracking-tight">
                    {f.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-foreground/60">
                    {f.description}
                  </p>

                  <div className="mt-8 flex items-end justify-between border-t border-foreground/10 pt-5">
                    <div>
                      <span className="block text-[9px] font-semibold uppercase tracking-[0.25em] text-foreground/40">
                        Directed By
                      </span>
                      <span className="mt-1 block text-sm font-semibold">{f.director}</span>
                    </div>
                    <div className="text-right">
                      <span className="block text-[9px] font-semibold uppercase tracking-[0.25em] text-foreground/40">
                        Box Office
                      </span>
                      <span className="mt-1 block text-lg font-black tracking-tight">
                        {f.box}
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
