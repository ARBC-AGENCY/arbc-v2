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
  year: string;
  descriptionEn: string;
  descriptionFr: string;
}

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    slug: "betmomo",
    name: "BETMOMO",
    tags: ["Stratégie", "Branding"],
    image: imgBetmomo,
    year: "2023",
    descriptionEn: "Pan-African sports betting brand — brand strategy, field marketing, and audiovisual production across Cameroon and Côte d'Ivoire.",
    descriptionFr: "Marque de paris sportifs panafricaine — stratégie de marque, marketing terrain et production audiovisuelle au Cameroun et en Côte d'Ivoire.",
  },
  {
    slug: "eventify",
    name: "EVENTIFY",
    tags: ["Branding", "Events"],
    image: imgEventify,
    year: "2024",
    descriptionEn: "360° events and communication agency — website, partner dossiers, and complete digital ecosystem.",
    descriptionFr: "Agence évènementielle 360° — site web, dossiers partenaires et écosystème digital complet.",
  },
  {
    slug: "le-lagon",
    name: "LE LAGON",
    tags: ["Branding", "Events"],
    image: imgLagon,
    year: "2024",
    descriptionEn: "Exclusive private members club — visual identity, premium editorial materials, and immersive digital platform.",
    descriptionFr: "Club privé exclusif — identité visuelle, supports éditoriaux premium et plateforme digitale immersive.",
  },
  {
    slug: "h-choice",
    name: "H-CHOICE",
    tags: ["Web", "Design"],
    image: imgHChoice,
    year: "2023",
    descriptionEn: "Functional medicine clinic — branding, digital ecosystem, and social media management.",
    descriptionFr: "Clinique de médecine fonctionnelle — branding, écosystème digital et gestion des réseaux sociaux.",
  },
  {
    slug: "liji",
    name: "LIJI",
    tags: ["Stratégie", "Branding"],
    image: imgLiji,
    year: "2023",
    descriptionEn: "Artisanal infant nutrition brand — packaging design, visual identity, and social media content strategy.",
    descriptionFr: "Marque de nutrition infantile artisanale — packaging, identité visuelle et stratégie de contenu sur les réseaux sociaux.",
  },
  {
    slug: "accent-media",
    name: "ACCENT MEDIA",
    tags: ["Media", "Digital"],
    image: imgAccent,
    year: "2024",
    descriptionEn: "Digital media group restructuring — dual brand identity, service pedagogy, and LinkedIn content strategy.",
    descriptionFr: "Restructuration d'un groupe média digital — double identité de marque, pédagogie de l'offre et stratégie de contenu LinkedIn.",
  },
  {
    slug: "jamalia",
    name: "JAMALIA",
    tags: ["Design", "Print"],
    image: imgJamalia,
    year: "2024",
    descriptionEn: "Agro-industrial premium snacks — market research, marketing plan, and operational field deployment.",
    descriptionFr: "Snacks premium agro-industriels — étude de marché, plan marketing et déploiement terrain opérationnel.",
  },
];
