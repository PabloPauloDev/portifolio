import { HobbyItem } from "@/types/diagram";

export const hobbies: HobbyItem[] = [
  {
    name: "Home Server",
    description: "Proxmox VE hypervisor running 8 LXC containers and 3 VMs on a Dell PowerEdge R720. Automated provisioning with Ansible.",
    icon: "🖥",
  },
  {
    name: "Jellyfin",
    description: "Self-hosted media server with hardware transcoding via Intel QuickSync. Serves 4K HDR to all devices on the local network.",
    icon: "🎬",
  },
  {
    name: "Nginx Reverse Proxy",
    description: "Central gateway for all self-hosted services. Let's Encrypt wildcard certs, rate limiting, and geo-IP blocking configured.",
    icon: "🔀",
  },
  {
    name: "Plex",
    description: "Secondary media server for remote access. Optimized transcoding profiles for mobile streaming over cellular networks.",
    icon: "📺",
  },
  {
    name: "Firefly III",
    description: "Self-hosted personal finance manager. Automated bank imports via Spectre API, custom budget rules, and monthly reporting.",
    icon: "💰",
  },
  {
    name: "Pi-hole DNS",
    description: "Network-wide ad blocking and DNS sinkhole. Custom block lists and conditional forwarding for split-horizon DNS.",
    icon: "🛡",
  },
];
