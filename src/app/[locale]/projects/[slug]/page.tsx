import ProjectPageClient from "@/components/layout/ProjectPageClient";

export const dynamicParams = false;

export function generateStaticParams() {
  return [
    { slug: "betmomo" },
    { slug: "woodin" },
    { slug: "le-lagon" },
    { slug: "h-choice" },
    { slug: "spicy" },
    { slug: "accent-media" },
    { slug: "cimencam" },
    { slug: "jamalia" },
    { slug: "liji" },
    { slug: "eventify" },
  ];
}

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  return <ProjectPageClient slug={slug} />;
}
