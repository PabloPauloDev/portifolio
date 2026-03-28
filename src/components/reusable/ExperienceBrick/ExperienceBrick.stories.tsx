import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ExperienceBrick from ".";

const meta: Meta<typeof ExperienceBrick> = {
  title: "Reusable/ExperienceBrick",
  component: ExperienceBrick,
  decorators: [(Story) => <div style={{ padding: 32, maxWidth: 320, height: 200 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof ExperienceBrick>;

export const Default: Story = {
  args: {
    job: {
      id: "acme", role: "Staff Engineer", company: "Acme Corp",
      period: "2022–Present", description: "Led platform team.",
      accent: "#FF9644", tech: ["React", "Node.js", "K8s"], rot: 1.2,
    },
    index: 0,
    phase: "resting",
  },
};

export const Dropping: Story = {
  args: {
    job: {
      id: "beta", role: "SRE Lead", company: "Beta Inc",
      period: "2020–2022", description: "Built observability stack.",
      accent: "#326CE5", tech: ["Go", "Prometheus", "Terraform"], rot: -0.8,
    },
    index: 1,
    phase: "dropping",
  },
};
