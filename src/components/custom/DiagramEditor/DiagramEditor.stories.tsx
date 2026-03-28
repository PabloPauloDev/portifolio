import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DiagramEditor from ".";
import { monolithToMicro } from "@/data/diagrams";

const meta: Meta<typeof DiagramEditor> = {
  title: "Custom/DiagramEditor",
  component: DiagramEditor,
  decorators: [(Story) => <div style={{ height: 500, padding: 16 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof DiagramEditor>;

export const Default: Story = {
  args: { data: monolithToMicro, onChange: () => {} },
};

export const SmallDiagram: Story = {
  args: {
    data: {
      systemName: "Minimal",
      nodes: [{ id: "a", label: "App", type: "entry", x: 100, y: 100 }],
      edges: [],
    },
    onChange: () => {},
  },
};
