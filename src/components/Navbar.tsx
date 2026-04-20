import { Link } from "@tanstack/react-router";

const links = ["Home", "About", "Explore", "Movies", "Contact"];

export function Navbar() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 animate-fade-in-slow">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-10">
        <Link to="/" className="font-display text-2xl tracking-tight text-foreground">
          Venom<span className="text-muted-foreground">Universe</span>
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <li key={l}>
              <a
                href="#"
                className="text-xs font-semibold uppercase tracking-[0.2em] text-foreground/70 transition-colors hover:text-foreground"
              >
                {l}
              </a>
            </li>
          ))}
        </ul>

        <a
          href="#"
          className="group relative inline-flex items-center justify-center rounded-full border border-foreground/60 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.25em] text-foreground transition-all duration-300 hover:border-foreground hover:shadow-[0_0_30px_oklch(1_0_0_/_0.35)]"
        >
          Enter
        </a>
      </nav>
    </header>
  );
}
