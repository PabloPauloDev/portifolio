import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DiagramRenderer from ".";
import { multiRegionAWS, monolithToMicro } from "@/data/diagrams";

const meta: Meta<typeof DiagramRenderer> = {
  title: "Custom/DiagramRenderer",
  component: DiagramRenderer,
  decorators: [(Story) => <div style={{ maxWidth: 800, padding: 16 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof DiagramRenderer>;

export const Default: Story = {
  args: { data: multiRegionAWS },
};

export const Microservices: Story = {
  args: { data: monolithToMicro },
};
