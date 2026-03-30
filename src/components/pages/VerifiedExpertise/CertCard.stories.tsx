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
      certificateName: "AWS Cloud Practitioner",
      description: "Foundational cloud literacy — core AWS services, security, architecture, and pricing models.",
      issueDate: "2021-09-10",
      badgeUrl: "/badges/cloud-practitioner-aws.png",
      color: "#FF9900",
      shape: "hexagon",
    },
    index: 0,
    phase: "idle",
  },
};

export const Degree: Story = {
  args: {
    cert: {
      certificateName: "B.Sc. Computer Science",
      description: "Four-year degree covering algorithms, distributed systems, databases, and software engineering.",
      issueDate: "2019-06-30",
      badgeUrl: "/degrees/computer-science-bachelor.png",
      color: "#4285F4",
      shape: "rectangle",
    },
    index: 1,
    phase: "idle",
  },
};
