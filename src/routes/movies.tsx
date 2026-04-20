import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";

export const Route = createFileRoute("/movies")({
  component: MoviesPage,
  head: () => ({
    meta: [
      { title: "Movies — VenomUniverse" },
      {
        name: "description",
        content:
          "Explore the Venom film trilogy: Venom (2018), Let There Be Carnage, and The Last Dance.",
      },
      { property: "og:title", content: "Movies — VenomUniverse" },
      {
        property: "og:description",
        content: "The cinematic Venom trilogy.",
      },
    ],
  }),
});

const films = [
  {
    year: "2018",
    title: "Venom",
    tagline: "The world has enough superheroes.",
    runtime: "112 min",
    box: "$856M",
  },
  {
    year: "2021",
    title: "Let There Be Carnage",
    tagline: "There will be carnage.",
    runtime: "97 min",
    box: "$506M",
  },
  {
    year: "2024",
    title: "The Last Dance",
    tagline: "Til death do they part.",
    runtime: "109 min",
    box: "$476M",
  },
];

function MoviesPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <Navbar />

      <section className="relative px-6 pb-32 pt-40 md:pt-48">
        <div className="mx-auto max-w-7xl">
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

            <span className="mt-10 block text-xs font-semibold uppercase tracking-[0.4em] text-foreground/40">
              The Trilogy
            </span>
            <h1 className="font-display mt-6 text-6xl leading-[0.95] tracking-tight md:text-8xl">
              Three Films.
              <br />
              <span className="text-foreground/30">One Symbiote.</span>
            </h1>
          </motion.div>

          <div className="mt-20 grid grid-cols-1 gap-6 md:grid-cols-3">
            {films.map((f, i) => (
              <motion.article
                key={f.title}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.2 + i * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-foreground/10 bg-card/40 p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-foreground/25 hover:bg-card/70"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 [background:radial-gradient(500px_circle_at_50%_0%,oklch(1_0_0/0.08),transparent_60%)]" />
                <div className="relative">
                  <span className="text-xs font-semibold uppercase tracking-[0.3em] text-foreground/40">
                    {f.year}
                  </span>
                  <h2 className="font-display mt-4 text-4xl leading-tight tracking-tight">
                    {f.title}
                  </h2>
                  <p className="mt-4 text-sm italic text-foreground/60">
                    "{f.tagline}"
                  </p>
                </div>
                <div className="relative mt-12 flex items-center justify-between border-t border-foreground/10 pt-5 text-xs uppercase tracking-[0.2em] text-foreground/50">
                  <span>{f.runtime}</span>
                  <span className="text-foreground/80">{f.box}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
