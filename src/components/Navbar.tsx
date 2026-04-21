import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";

const links: { label: string; to: string; hash?: string }[] = [
  { label: "Home", to: "/", hash: "home" },
  { label: "Symbiote", to: "/", hash: "about" },
  { label: "Power", to: "/", hash: "explore" },
  { label: "Trilogy", to: "/movies" },
  { label: "Contact", to: "/", hash: "contact" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed top-4 left-1/2 z-50 -translate-x-1/2 w-[min(96%,1100px)]"
    >
      <nav className="flex items-center justify-between gap-6 rounded-full border border-foreground/10 bg-background/70 px-3 py-2 pl-5 backdrop-blur-xl shadow-[0_10px_40px_-10px_oklch(0_0_0/0.8)]">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-foreground/10">
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-foreground">
              <path d="M12 2c2.5 4 6 7 6 11a6 6 0 11-12 0c0-4 3.5-7 6-11z" />
            </svg>
          </span>
          <span className="font-display text-lg tracking-tight text-foreground">
            Venom<span className="text-foreground/60">Universe</span>
          </span>
        </Link>

        {/* Links */}
        <ul className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <li key={l.label}>
              <Link
                to={l.to}
                hash={l.hash}
                className="text-sm font-medium text-foreground/65 transition-colors hover:text-foreground"
                activeProps={{ className: "text-foreground" }}
                activeOptions={{ exact: true }}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Enter */}
        <Link
          to="/movies"
          className="inline-flex items-center justify-center rounded-full bg-foreground px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-background transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_oklch(1_0_0/0.4)]"
        >
          Enter
        </Link>
      </nav>
    </motion.header>
  );
}
