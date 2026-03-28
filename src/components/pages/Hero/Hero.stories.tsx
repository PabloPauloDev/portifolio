import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Hero from ".";

/**
 * Hero uses `scrollToSection` from `@/hooks/useHybridScroll` — a plain
 * function wrapping `window.scrollTo`. No context provider needed.
 */
const meta: Meta<typeof Hero> = {
  title: "Pages/Hero",
  component: Hero,
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
type Story = StoryObj<typeof Hero>;

export const Default: Story = {};
