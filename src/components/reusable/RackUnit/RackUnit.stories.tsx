import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import Rack from ".";
import { BLADES } from "./repository/schema";

const meta: Meta<typeof Rack> = {
  title: "Reusable/RackUnit",
  component: Rack,
  decorators: [(Story) => <div style={{ padding: 24, maxWidth: 400, height: 500 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof Rack>;

export const Default: Story = {
  args: { blades: BLADES, isDimmed: false },
};

export const Dimmed: Story = {
  args: { blades: BLADES, isDimmed: true },
};
