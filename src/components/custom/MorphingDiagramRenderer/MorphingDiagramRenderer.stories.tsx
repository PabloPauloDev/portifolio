import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MorphingDiagramRenderer from ".";
import { multiRegionAWS, mlEdtech } from "@/data/diagrams";

const meta: Meta<typeof MorphingDiagramRenderer> = {
  title: "Custom/MorphingDiagramRenderer",
  component: MorphingDiagramRenderer,
  decorators: [(Story) => <div style={{ maxWidth: 800, padding: 16 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof MorphingDiagramRenderer>;

export const Default: Story = {
  args: { data: multiRegionAWS },
};

export const MLPipeline: Story = {
  args: { data: mlEdtech },
};
