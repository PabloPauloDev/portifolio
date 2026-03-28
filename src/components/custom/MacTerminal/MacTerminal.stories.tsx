import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import MacTerminal from ".";

/**
 * MacTerminal is self-contained — it uses `useTerminal()` internally
 * which manages its own state (cwd, lines, exec). No external mocks needed.
 */
const meta: Meta<typeof MacTerminal> = {
  title: "Custom/MacTerminal",
  component: MacTerminal,
  decorators: [
    (Story) => <div style={{ width: 600, height: 400, padding: 16 }}><Story /></div>,
  ],
};

export default meta;
type Story = StoryObj<typeof MacTerminal>;

export const Default: Story = {};

export const Wide: Story = {
  decorators: [
    (Story) => <div style={{ width: 900, height: 500, padding: 16 }}><Story /></div>,
  ],
};
