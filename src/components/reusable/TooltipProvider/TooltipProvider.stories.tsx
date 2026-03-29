import type { Meta, StoryObj } from "@storybook/nextjs";
import TooltipProvider, { useTooltip } from ".";

const meta: Meta<typeof TooltipProvider> = {
  title: "Reusable/TooltipProvider",
  component: TooltipProvider,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof TooltipProvider>;

function TriggerButton({ label, content }: { label: string; content: string }) {
  const { show, hide } = useTooltip();
  return (
    <button
      className="px-4 py-2 bg-rust text-cream rounded font-mono text-sm"
      onPointerEnter={() => show(<div className="glass-card rounded-lg px-3 py-2 text-rust font-mono text-xs">{content}</div>)}
      onPointerLeave={hide}
    >
      {label}
    </button>
  );
}

export const Default: Story = {
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
        <div style={{ padding: 80, display: "flex", gap: 32 }}>
          <TriggerButton label="Hover node A" content="Node A — entry service handling ingress traffic" />
          <TriggerButton label="Hover rack blade" content="nginx-proxy:8080 — reverse proxy blade" />
        </div>
      </TooltipProvider>
    ),
  ],
};
