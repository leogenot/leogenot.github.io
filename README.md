# Nuxt/Sanity starting point

[Frontend](https://leogenot.github.io/)  
[CMS](https://leogenot.sanity.studio/structure)

## Getting started

### Sanity

Copy paste the `.env.template`, rename it to `.env` and fill out the required fields:

```yaml
SANITY_STUDIO_PROJECT_ID=<sanity-project-id>
SANITY_STUDIO_DATASET=<sanity-dataset>
SANITY_STUDIO_HOSTNAME=<sanity-hostname>
SANITY_STUDIO_READING_TOKEN=<sanity-read-token>

SANITY_AUTH_TOKEN=<sanity-api-token>
```

Token is generated in the "API" section of the projects settings on sanity.io.

### Nuxt

Copy paste the `.env.example`, remane it to `.env` and fill out the required fields:

```yaml
NUXT_PROJECT_ID=<sanity-project-id>
NUXT_DATASET=<sanity-dataset>
```

Add the local Nuxt url to CORS origins in the API-section in sanity.io

### Both

Install dependencies and run development servers, from the root directory of the repo:

```sh
pnpm install
pnpm run dev
```

The `pnpm-workspace.yml` will make both Nuxt and Sanity servers run in parallel.

## Deployment

Every push to the `main` branch triggers a deployment.

### Sanity

Create 4 GitHub Action Secrets. These will be used by the GitHub Action when deploying the Sanity Studio, and should have the same name and value as the 4 local variables set up in `Getting started`.

```yaml
SANITY_STUDIO_PROJECT_ID=<sanity-project-id>
SANITY_STUDIO_DATASET=<sanity-dataset>
SANITY_STUDIO_HOSTNAME=<sanity-hostname>

SANITY_AUTH_TOKEN=<sanity-api-token>
```

Add the Nuxt url to allowed CORS domains, in the API section.