import type { App } from "./types";

export const APPS: App[] = [
  {
    id: "nginx", name: "Nginx Proxy Manager",
    desc: "The Nginx container acts as the ingress controller for this entire stack, handling SSL termination via Let's Encrypt before routing traffic to the internal Docker network.",
    compose: `version: '3.8'
services:
  app:
    image: 'jc21/nginx-proxy-manager:latest'
    restart: unless-stopped
    ports:
      - '80:80'
      - '443:443'
      - '81:81'
    volumes:
      - ./data:/data
      - ./letsencrypt:/etc/letsencrypt
    networks:
      - lab_net

networks:
  lab_net:
    external: true`,
  },
  {
    id: "jellyfin", name: "Jellyfin Media Server",
    desc: "Self-hosted media server with hardware transcoding via Intel QuickSync iGPU. Serves 4K HDR content to all devices on the local network with zero CPU overhead.",
    compose: `version: '3.8'
services:
  jellyfin:
    image: jellyfin/jellyfin:latest
    restart: unless-stopped
    ports:
      - '8096:8096'
    volumes:
      - ./config:/config
      - /mnt/media:/media:ro
    devices:
      - /dev/dri:/dev/dri   # iGPU passthrough
    networks:
      - lab_net

networks:
  lab_net:
    external: true`,
  },
];
