import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import InteractiveDiagram from ".";

/**
 * InteractiveDiagram is self-contained — it imports `multiRegionAWS`
 * from `@/data/diagrams` internally and composes DiagramRenderer + DiagramEditor.
 * No external mocks needed; `@storybook/nextjs-vite` handles next/link.
 */
const meta: Meta<typeof InteractiveDiagram> = {
  title: "Custom/InteractiveDiagram",
  component: InteractiveDiagram,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div style={{ width: "100vw", height: "100vh" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof InteractiveDiagram>;

export const Default: Story = {};
