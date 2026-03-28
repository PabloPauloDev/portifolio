import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Nav from ".";

/**
 * Nav uses: `useScroll()` / `useSpring` from Framer Motion (read-only page
 * scroll), `NAV_SECTIONS` + `scrollToSection` (plain util imports).
 * In isolation the progress bar stays at 0%. No context provider needed.
 */
const meta: Meta<typeof Nav> = {
  title: "Pages/Nav",
  component: Nav,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof Nav>;

export const Default: Story = {};
