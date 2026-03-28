import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Scrollytelling from ".";
import { stories } from "@/data/stories";

/**
 * Uses next/link internally — mocked by `@storybook/nextjs-vite`.
 * Chapters with `visual` diagrams render the MorphingDiagramRenderer;
 * text-only chapters show a placeholder.
 */
const meta: Meta<typeof Scrollytelling> = {
  title: "Custom/Scrollytelling",
  component: Scrollytelling,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof Scrollytelling>;

export const WithDiagrams: Story = {
  args: {
    projectId: "monolith-to-micro",
    projectTitle: "Monolith → Microservices",
    chapters: stories["monolith-to-micro"],
  },
};

export const TextOnly: Story = {
  args: {
    projectId: "multi-region-aws",
    projectTitle: "Multi-Region AWS Infrastructure",
    chapters: stories["multi-region-aws"],
  },
};
