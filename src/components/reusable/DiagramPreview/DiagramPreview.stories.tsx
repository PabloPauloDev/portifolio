import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import DiagramPreview from ".";
import type { DiagramData } from "@/types/diagram";

const meta: Meta<typeof DiagramPreview> = {
  title: "Reusable/DiagramPreview",
  component: DiagramPreview,
  decorators: [(Story) => <div style={{ width: 500, height: 350, padding: 16 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof DiagramPreview>;

const simple: DiagramData = {
  systemName: "Sample System",
  nodes: [
    { id: "gw", label: "API Gateway", type: "entry", x: 40, y: 100 },
    { id: "svc", label: "Service", type: "compute", x: 260, y: 100 },
    { id: "db", label: "Database", type: "database", x: 480, y: 100 },
  ],
  edges: [
    { from: "gw", to: "svc", label: "REST" },
    { from: "svc", to: "db", label: "SQL" },
  ],
};

export const Default: Story = { args: { data: simple } };

export const SingleNode: Story = {
  args: {
    data: {
      systemName: "Single Node",
      nodes: [{ id: "a", label: "Standalone", type: "service", x: 200, y: 150 }],
      edges: [],
    },
  },
};
