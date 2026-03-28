import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Footer from ".";

const meta: Meta<typeof Footer> = {
  title: "Pages/Footer",
  component: Footer,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div style={{ width: "100vw", height: "100vh", "--bg-color": "var(--primary)" } as React.CSSProperties}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Footer>;

export const Default: Story = {};

export const Compact: Story = {
  decorators: [
    (Story) => (
      <div style={{ width: "100vw", height: "50vh", "--bg-color": "var(--primary)" } as React.CSSProperties}>
        <Story />
      </div>
    ),
  ],
};
