import { notFound } from "next/navigation";
import { stories } from "@/data/stories";
import Scrollytelling from "@/components/custom/Scrollytelling";

const projectTitles: Record<string, string> = {
  "monolith-to-micro": "Monolith → Microservices",
  "multi-region-aws": "Multi-Region AWS Infrastructure",
  "ml-edtech": "ML Integration — EdTech",
};

export function generateStaticParams() {
  return Object.keys(stories).map((id) => ({ id }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function StoryPage({ params }: PageProps) {
  const { id } = await params;
  const chapters = stories[id];
  const title = projectTitles[id];

  if (!chapters || !title) {
    notFound();
  }

  return <Scrollytelling projectId={id} projectTitle={title} chapters={chapters} />;
}
