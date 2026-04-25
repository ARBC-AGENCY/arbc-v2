export interface Project {
  slug: string
  title: string
  tags: string[]
  coverImage: string
  year: string
}

export const projects: Project[] = [
  { slug: "betmomo",      title: "BetMomo",       tags: ["Strategy", "Branding", "Field Marketing"],    coverImage: "/images/projects/betmomo.jpg",      year: "2023" },
  { slug: "accent-media", title: "Accent Media",   tags: ["Visual Identity", "Branding", "Content"],    coverImage: "/images/projects/accent-media.jpg", year: "2024" },
  { slug: "eventify",     title: "Eventify",       tags: ["Web", "Design", "Strategy"],                  coverImage: "/images/projects/eventify.jpg",     year: "2024" },
  { slug: "h-choice",     title: "Heart Choice",   tags: ["Branding", "Digital", "Social Media"],        coverImage: "/images/projects/h-choice.jpg",     year: "2023" },
  { slug: "le-lagon",     title: "Le Lagon Club",  tags: ["Branding", "Events", "Print"],                coverImage: "/images/projects/le-lagon.jpg",     year: "2024" },
  { slug: "liji",         title: "Liji",           tags: ["Packaging", "Social Media", "Strategy"],      coverImage: "/images/projects/liji.jpg",         year: "2023" },
  { slug: "jamalia",      title: "Jamalia Group",  tags: ["Marketing", "Field", "Content"],              coverImage: "/images/projects/jamalia.jpg",      year: "2024" },
  { slug: "woodin",       title: "Woodin",         tags: ["Motion", "Digital"],                          coverImage: "/images/projects/woodin.jpg",       year: "2024" },
  { slug: "cimencam",     title: "Cimencam",       tags: ["Institutional", "Print"],                     coverImage: "/images/projects/cimencam.jpg",     year: "2023" },
]
