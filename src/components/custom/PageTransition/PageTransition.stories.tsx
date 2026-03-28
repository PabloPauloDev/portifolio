import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PageTransition from ".";

const meta: Meta<typeof PageTransition> = {
  title: "Custom/PageTransition",
  component: PageTransition,
};

export default meta;
type Story = StoryObj<typeof PageTransition>;

export const Default: Story = {
  args: {
    children: (
      <div className="p-8 glass-card rounded-xl">
        <h2 className="font-mono text-xl text-rust mb-2">Animated Content</h2>
        <p className="font-hand text-amber">This fades in via PageTransition.</p>
      </div>
    ),
  },
};

export const LongContent: Story = {
  args: {
    children: (
      <div className="p-8 space-y-4">
        {Array.from({ length: 5 }, (_, i) => (
          <div key={i} className="glass-card rounded-xl p-4">
            <p className="font-mono text-sm text-rust">Block {i + 1}</p>
          </div>
        ))}
      </div>
    ),
  },
};
