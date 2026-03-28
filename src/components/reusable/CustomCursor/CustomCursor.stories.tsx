import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import CustomCursor from ".";

const meta: Meta<typeof CustomCursor> = {
  title: "Reusable/CustomCursor",
  component: CustomCursor,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof CustomCursor>;

export const Default: Story = {};

export const WithHoverTargets: Story = {
  decorators: [
    (Story) => (
      <div style={{ padding: 48, display: "flex", gap: 24 }}>
        <Story />
        <button className="px-4 py-2 bg-rust text-cream rounded font-mono text-sm">
          Hover me
        </button>
        <a href="#" className="font-mono text-sm text-amber underline">
          Link target
        </a>
      </div>
    ),
  ],
};
