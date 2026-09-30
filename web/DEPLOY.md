# Docker deployment

## Configuration

Create the runtime environment file from the template and fill in the Azure Speech and Cloudflare R2 credentials:

```sh
cp .env.example .env
```

Do not add `.env` to the image or source control. `R2_PUBLIC_URL` must be the public base URL that serves the bucket's audio objects.

## Run with Docker Compose

```sh
docker compose up -d --build
docker compose ps
curl https://portuguese.vocafree.com/healthz
```

Before starting the stack, create a DNS `A` record for `portuguese.vocafree.com` pointing to the server's public IPv4 address. Add an `AAAA` record only when IPv6 is configured and reachable on the server.

Allow SSH, HTTP, and HTTPS through the firewall:

```sh
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 443/udp
sudo ufw enable
```

Caddy obtains and renews the TLS certificate automatically. The application port `4173` is available only inside the Docker network.

View logs or stop the service with:

```sh
docker compose logs -f app
docker compose logs -f caddy
docker compose down
```

## Run with Docker

```sh
docker build -t be-ghep-chu-pt-pt .
docker run -d \
  --name be-ghep-chu-pt-pt \
  --restart unless-stopped \
  --env-file .env \
  -p 4173:4173 \
  be-ghep-chu-pt-pt
```

The container serves the React application and `/api/audio` from the same origin. Its health endpoint is `/healthz`.