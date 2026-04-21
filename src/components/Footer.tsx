export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-foreground/10 bg-background py-14">
      <div className="mx-auto flex w-[min(92%,1200px)] flex-col items-center gap-6 text-center">
        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-full bg-foreground/10">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-foreground">
              <path d="M12 2c2.5 4 6 7 6 11a6 6 0 11-12 0c0-4 3.5-7 6-11z" />
            </svg>
          </span>
          <span className="font-display text-2xl tracking-tight text-foreground">
            Venom<span className="text-foreground/60">Universe</span>
          </span>
        </div>

        {/* Tagline */}
        <p className="max-w-md text-xs uppercase tracking-[0.35em] text-foreground/50">
          We Are Venom — Bonded Beyond Flesh
        </p>

        {/* Divider */}
        <div className="h-px w-24 bg-foreground/15" />

        {/* Credits */}
        <div className="flex flex-col items-center gap-2 text-sm text-foreground/60">
          <p>
            Crafted by{" "}
            <span className="font-semibold text-foreground">Ranjan Das</span>
          </p>
          <p className="text-xs uppercase tracking-[0.3em] text-foreground/40">
            © 2026 All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
