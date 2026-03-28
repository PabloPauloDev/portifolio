import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MiniMap from ".";

/**
 * MiniMap uses `useScroll()` from Framer Motion (reads page scroll progress)
 * and `scrollToSection` / `SECTION_KEYS` / `GRID` / `BREAKS` — all plain
 * re-exported constants. The dot position is derived from scrollYProgress.
 * In isolation, the dot stays at position 0 (first section).
 */
const meta: Meta<typeof MiniMap> = {
  title: "Pages/MiniMap",
  component: MiniMap,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MiniMap>;

export const Default: Story = {};
