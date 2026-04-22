# VenomUniverse — We Are Venom

A cinematic, high-performance web platform dedicated to the Marvel Symbiote Saga. This project serves as a comprehensive digital encyclopedia and lore hub for the "Venom" universe, covering comic origins, symbiote capabilities, and the Sony film trilogy.

**Live preview**:- https://venom-website.lovable.app/

## 🕸️ Project Overview

VenomUniverse is designed with a "Dark Mode" first philosophy, utilizing high-contrast visuals, smooth parallax scrolling, and interactive data visualizations to immerse fans in the world of Eddie Brock and the Klyntar species.

### Key Features
- **Interactive Lore Timeline:** Detailed history from the Klyntar origins to the current cinematic era.
- **Symbiote Bio-Metrics:** Animated data points showcasing strength, host history, and comic longevity.
- **Power & Weakness Matrix:** Breakdown of morphological capabilities and sonic/thermal vulnerabilities.
- **Film Trilogy Hub:** Dynamic summaries and box office stats for the Sony Spider-Man Universe films.
- **The Hive (Newsletter):** A custom contact and lead generation system integrated with Brevo.

## 🛠️ Tech Stack

- **Frontend:** [React.js](https://reactjs.org/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (Custom Cinematic Theme)
- **Backend/Database:** [Supabase](https://supabase.com/) (User data management)
- **Communication:** [Brevo](https://www.brevo.com/) (Email API for "The Hive" updates)
- **Animations:** Framer Motion / CSS Transitions

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn
- A Supabase account and project
- A Brevo API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/venom-universe.git](https://github.com/your-username/venom-universe.git)
   cd venom-universe
Install dependencies:

Bash

npm install
Environment Setup:
Create a .env file in the root directory and add your credentials:

Code snippet

VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_BREVO_API_KEY=your_brevo_key
Run the development server:

Bash

npm run dev
🎨 Design Philosophy
The project follows a specific aesthetic guideline:

Primary Palette: Deep Obsidian (#000000), Stark White (#FFFFFF).

Accents: Symbiote Violet and Neon Teal gradients for interactive elements.

Typography: Heavy, bold sans-serif headers (representing Venom's power) paired with clean, readable body text.

📁 Project Structure
src/
├── components/     # Reusable UI elements (Buttons, Cards, Nav)
├── sections/       # Major landing page blocks (Hero, Power, Trilogy)
├── hooks/          # Custom React hooks for Supabase/API logic
├── styles/         # Tailwind configurations and global CSS
├── types/          # TypeScript interfaces and definitions
└── utils/          # Helper functions for API integrations

🛡️ License
This project is for educational and fan purposes. All characters, names, and related indicia are trademarks of © Marvel and Sony Pictures.

Crafted by Ranjan Das || We Are Venom.
