import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import IntroScreen from ".";

/**
 * IntroScreen auto-triggers an exit animation after ~2.9s and calls `onDone`
 * after ~4s total. Mocked dependencies: none — pure Framer Motion timing.
 */
const meta: Meta<typeof IntroScreen> = {
  title: "Pages/IntroScreen",
  component: IntroScreen,
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "rust" },
  },
};

export default meta;
type Story = StoryObj<typeof IntroScreen>;

export const Default: Story = {
  args: { onDone: () => console.log("[IntroScreen] onDone fired") },
};
