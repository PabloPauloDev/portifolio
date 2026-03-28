import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Projects from ".";

/**
 * Projects is self-contained — it imports PROJECTS from its own constants.ts
 * and renders ProjectCard composites. Each card uses next/link via
 * ProjectCardOverlay (mocked by `@storybook/nextjs-vite`).
 */
const meta: Meta<typeof Projects> = {
  title: "Pages/Projects",
  component: Projects,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Projects>;

export const Default: Story = {};
