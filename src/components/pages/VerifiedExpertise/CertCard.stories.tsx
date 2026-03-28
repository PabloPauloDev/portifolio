import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import CertCard from "./CertCard";

const meta: Meta<typeof CertCard> = {
  title: "Pages/VerifiedExpertise/CertCard",
  component: CertCard,
  decorators: [(Story) => <div style={{ perspective: 800, padding: 40 }}><Story /></div>],
};

export default meta;
type Story = StoryObj<typeof CertCard>;

export const Default: Story = {
  args: {
    cert: {
      certificateName: "AWS Solutions Architect — Professional",
      issueDate: "2023-06-15",
      badgeUrl: "#",
      color: "#FF9900",
    },
  },
};

export const Kubernetes: Story = {
  args: {
    cert: {
      certificateName: "Certified Kubernetes Administrator (CKA)",
      issueDate: "2022-08-10",
      badgeUrl: "#",
      color: "#326CE5",
    },
  },
};
