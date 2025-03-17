# Payload Website Template w/ Tanstack Forms v1

This is a customized version of the official [Payload Website Template](https://github.com/payloadcms/payload/blob/main/templates/website). It has been modified to use **TanStack Form v1** instead of react-hook-form, with additional features and integrations.

## Enhancements & Custom Features

### Forms
- Replaced **react-hook-form** with **TanStack Form v1** for better form management.
- Added **custom form fields** including:
  - Phone number input
  - Array fields with dynamic input handling
- Customize original fields as well

## Quick Start
To spin up this example locally, follow these steps:

### Clone the Repository
```sh
git clone <your-repo-url>
cd <your-repo-folder>
```

### Install Dependencies
```sh
pnpm i
```
### Run MongoBD in Docker
```sh
docker-compose up -d
```
### Run the Development Server
```sh
pnpm dev --turbo
```

## TODO
- Integrate **motion.dev** animations.
- Improve **React Email** with additional templates.
- Enhance form UX and validation with TanStack Form.
