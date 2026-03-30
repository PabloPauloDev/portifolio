import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import PhysicsBadges from ".";

const meta: Meta<typeof PhysicsBadges> = {
  title: "Pages/Footer/PhysicsBadges",
  component: PhysicsBadges,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div style={{
        width: "100vw",
        height: "100vh",
        position: "relative",
        background: "#562F00",
      }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof PhysicsBadges>;

export const Default: Story = {};
