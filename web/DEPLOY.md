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
curl http://127.0.0.1:4173/healthz
```

Before starting the stack, create a DNS `A` record for `portuguese.vocafree.com` pointing to the server's public IPv4 address. Add an `AAAA` record only when IPv6 is configured and reachable on the server.

The Compose service binds port `4173` to localhost only. Install Nginx and Certbot on the host:

```sh
sudo apt update
sudo apt install -y nginx certbot python3-certbot-nginx
sudo cp nginx/portuguese.vocafree.com.conf /etc/nginx/sites-available/portuguese.vocafree.com
sudo ln -sfn /etc/nginx/sites-available/portuguese.vocafree.com /etc/nginx/sites-enabled/portuguese.vocafree.com
sudo nginx -t
sudo systemctl reload nginx
```

Allow SSH, HTTP, and HTTPS through the firewall:

```sh
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

After DNS points to the server and HTTP works, obtain the TLS certificate:

```sh
sudo certbot --nginx -d portuguese.vocafree.com --redirect
curl https://portuguese.vocafree.com/healthz
sudo certbot renew --dry-run
```

Certbot updates the Nginx virtual host and renews the certificate automatically. In Cloudflare, use SSL/TLS mode `Full (strict)` after HTTPS succeeds.

View logs or stop the service with:

```sh
docker compose logs -f app
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