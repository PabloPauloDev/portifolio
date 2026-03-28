import type { App } from "./types";

export const APPS_EXT: App[] = [
  {
    id: "plex", name: "Plex Media Server",
    desc: "Secondary media server optimised for remote access. Transcoding profiles are tuned for cellular streaming with Tautulli feeding Discord webhook alerts.",
    compose: `version: '3.8'
services:
  plex:
    image: plexinc/pms-docker:latest
    restart: unless-stopped
    ports:
      - '32400:32400'
    environment:
      - PLEX_CLAIM=\${PLEX_CLAIM}
      - TZ=America/Sao_Paulo
    volumes:
      - ./config:/config
      - /mnt/media:/data:ro
    networks:
      - lab_net

networks:
  lab_net:
    external: true`,
  },
  {
    id: "firefly", name: "Firefly III",
    desc: "100% self-hosted personal finance. Bank imports via Spectre API, custom budget rules, and a monthly PDF report cron. No SaaS dependencies — full financial sovereignty.",
    compose: `version: '3.3'
services:
  fireflyiii:
    image: fireflyiii/core:latest
    restart: unless-stopped
    env_file: .env
    ports:
      - '8080:8080'
    volumes:
      - ./upload:/var/www/html/storage/upload
    depends_on:
      - db
    networks:
      - lab_net

  db:
    image: mariadb:10.11
    restart: unless-stopped
    environment:
      MYSQL_DATABASE: firefly
      MYSQL_USER: firefly
      MYSQL_PASSWORD: \${DB_PASSWORD}
      MYSQL_ROOT_PASSWORD: \${DB_ROOT_PASSWORD}
    volumes:
      - ./db:/var/lib/mysql
    networks:
      - lab_net

networks:
  lab_net:
    external: true`,
  },
];
