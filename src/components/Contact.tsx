import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function Contact() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const ghostRef = useRef<HTMLDivElement | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let ctx: { revert: () => void } | null = null;
    (async () => {
      try {
        const gsapMod = await import("gsap");
        const stMod = await import("gsap/ScrollTrigger");
        const gsap = gsapMod.default ?? gsapMod;
        const ScrollTrigger = stMod.ScrollTrigger ?? stMod.default;
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          if (ghostRef.current) {
            gsap.to(ghostRef.current, {
              yPercent: -15,
              ease: "none",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          }
        }, sectionRef);
      } catch (e) {
        console.warn("GSAP load failed", e);
      }
    })();
    return () => ctx?.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Failed to send");
      }
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden bg-background py-32 md:py-40"
    >
      {/* Ghost background text */}
      <div
        ref={ghostRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
      >
        <span
          className="font-display text-[28vw] md:text-[22vw] leading-none text-foreground/[0.04] tracking-tighter"
          style={{ WebkitTextStroke: "1px oklch(1 0 0 / 0.05)" }}
        >
          JOIN
        </span>
      </div>

      <div className="relative z-10 mx-auto w-[min(92%,640px)]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-foreground/50">
            The Symbiote Awaits
          </p>
          <h2 className="mt-4 font-display text-6xl md:text-8xl leading-[0.9]">
            JOIN THE
            <br />
            <span className="text-stroke">HIVE.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-foreground/60">
            Get exclusive updates on Venom lore drops, comic spotlights, and news from Sony's
            Spider-Man Universe. First access, no noise.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 space-y-5"
        >
          <input
            type="text"
            required
            maxLength={100}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="YOUR NAME"
            className="w-full border-b border-foreground/15 bg-transparent py-3 text-sm tracking-[0.25em] text-foreground placeholder:text-foreground/30 focus:border-foreground/60 focus:outline-none transition-colors"
          />
          <input
            type="email"
            required
            maxLength={255}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="YOUR_IDENTITY@SYMBIOTE.NET"
            className="w-full border-b border-foreground/15 bg-transparent py-3 text-sm tracking-[0.25em] text-foreground placeholder:text-foreground/30 focus:border-foreground/60 focus:outline-none transition-colors"
          />
          <textarea
            required
            maxLength={2000}
            rows={3}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="YOUR MESSAGE..."
            className="w-full resize-none border-b border-foreground/15 bg-transparent py-3 text-sm tracking-[0.25em] text-foreground placeholder:text-foreground/30 focus:border-foreground/60 focus:outline-none transition-colors"
          />

          <div className="pt-6">
            <button
              type="submit"
              disabled={status === "loading"}
              className="group relative w-full overflow-hidden rounded-full bg-foreground py-4 text-xs font-bold uppercase tracking-[0.4em] text-background transition-all duration-500 hover:shadow-[0_0_60px_oklch(1_0_0/0.5)] disabled:opacity-60"
            >
              <span className="relative z-10">
                {status === "loading" ? "BONDING..." : status === "success" ? "BOND FORMED ✓" : "BOND"}
              </span>
            </button>
            {status === "error" && (
              <p className="mt-3 text-center text-xs text-destructive">{errorMsg}</p>
            )}
            {status === "success" && (
              <p className="mt-3 text-center text-xs text-foreground/60">
                Check your inbox — the Symbiote has responded.
              </p>
            )}
          </div>
        </motion.form>

        <div className="mt-10 flex items-center justify-center gap-10 text-[10px] uppercase tracking-[0.3em] text-foreground/40">
          <span>13,400+ Members</span>
          <span>Weekly Drops</span>
          <span>No Spam</span>
        </div>

        <div className="mt-16 flex flex-col items-center gap-4 border-t border-foreground/10 pt-12 sm:flex-row sm:justify-center">
          <Link
            to="/"
            className="group inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.3em] text-foreground transition-all hover:border-foreground/60 hover:bg-foreground/5"
          >
            Explore the Venom Universe
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/movies"
            className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-[11px] font-bold uppercase tracking-[0.3em] text-background transition-all hover:shadow-[0_0_30px_oklch(1_0_0/0.4)]"
          >
            Enter the Symbiote World
            <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
