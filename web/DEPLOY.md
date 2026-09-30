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
curl http://localhost:4173/healthz
```

Set `APP_PORT` to publish a different host port:

```sh
APP_PORT=8080 docker compose up -d
```

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