# Vote App

Look at the [nuxt 3 documentation](https://v3.nuxtjs.org) to learn more.

## Development Server

Start the development server on http://localhost:7000

```bash
yarn run dev
```


docker build \
--build-arg HOST=0.0.0.0 \
--build-arg PORT=3000 \
--build-arg APP_BASE_API=https://vote-api.mhalong.com \
--build-arg APP_BASE_API_MOCK=https://vote.mhalong.com \
-t pskclub/t6601-frontend:latest  .
docker push pskclub/t6601-frontend:latest
