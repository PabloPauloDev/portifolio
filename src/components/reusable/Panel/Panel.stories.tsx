import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Panel from ".";

const meta: Meta<typeof Panel> = {
  title: "Reusable/Panel",
  component: Panel,
  decorators: [
    (Story) => (
      <div style={{ position: "relative", width: "100vw", height: "100vh", overflow: "hidden" }}>
        <Story />
      </div>
    ),
  ],
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof Panel>;

export const Default: Story = {
  args: {
    col: 0,
    row: 0,
    children: (
      <div className="w-full h-full flex items-center justify-center bg-cream">
        <p className="font-mono text-rust text-lg">Panel at (0, 0)</p>
      </div>
    ),
  },
};

export const Transparent: Story = {
  args: {
    col: 0,
    row: 0,
    transparent: true,
    children: (
      <div className="w-full h-full flex items-center justify-center">
        <p className="font-mono text-rust text-lg">Transparent Panel</p>
      </div>
    ),
  },
};
