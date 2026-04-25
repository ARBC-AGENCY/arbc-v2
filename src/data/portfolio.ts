import type { StaticImageData } from "next/image";

import imgBetmomo from "@/assets/images/logos/projectSliderImage/BETMOMO.webp";
import imgEventify from "@/assets/images/eventify/EV00.webp";
import imgLagon    from "@/assets/images/logos/projectSliderImage/LagonClub.webp";
import imgHChoice  from "@/assets/images/heartchoice/Notepad-Branding-2.webp";
import imgLiji     from "@/assets/images/liji/Cover-Facebook.webp";
import imgAccent   from "@/assets/images/acm/Billboard.webp";
import imgJamalia  from "@/assets/images/jamalia/MeloFamily.webp";

export interface PortfolioItem {
  slug: string;
  name: string;
  tags: string[];
  image: StaticImageData;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  { slug: "betmomo",      name: "BETMOMO",      tags: ["Stratégie", "Branding"], image: imgBetmomo  },
  { slug: "eventify",     name: "EVENTIFY",     tags: ["Branding", "Events"],    image: imgEventify },
  { slug: "le-lagon",     name: "LE LAGON",     tags: ["Branding", "Events"],    image: imgLagon    },
  { slug: "h-choice",     name: "H-CHOICE",     tags: ["Web", "Design"],         image: imgHChoice  },
  { slug: "liji",         name: "LIJI",         tags: ["Stratégie", "Branding"], image: imgLiji     },
  { slug: "accent-media", name: "ACCENT MEDIA", tags: ["Media", "Digital"],      image: imgAccent   },
  { slug: "jamalia",      name: "JAMALIA",      tags: ["Design", "Print"],       image: imgJamalia  },
];
