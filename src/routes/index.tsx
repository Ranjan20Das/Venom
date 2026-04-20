import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "VenomUniverse — We Are Venom" },
      {
        name: "description",
        content:
          "Enter the cinematic universe of Venom. Explore the Symbiote saga, films, and the lethal bond with Eddie Brock.",
      },
      { property: "og:title", content: "VenomUniverse — We Are Venom" },
      {
        property: "og:description",
        content: "Cinematic Venom experience: Symbiote lore, films, and origin story.",
      },
    ],
  }),
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Navbar />
      <Hero />
    </main>
  );
}
