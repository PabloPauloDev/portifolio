import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import VerifiedExpertise from ".";

/**
 * VerifiedExpertise imports certifications from `@/data/certifications`
 * and renders CertCard composites. No external mocks needed.
 */
const meta: Meta<typeof VerifiedExpertise> = {
  title: "Pages/VerifiedExpertise",
  component: VerifiedExpertise,
  parameters: { layout: "fullscreen" },
  decorators: [
    (Story) => (
      <div style={{ width: "100vw", height: "100vh", position: "relative" }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof VerifiedExpertise>;

export const Default: Story = {};
