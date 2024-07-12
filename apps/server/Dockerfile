# Use the official Node.js image as a base
FROM node:lts AS base

# Set environment variables for pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Enable corepack to use pnpm
RUN corepack enable

# Set the working directory in the container
WORKDIR /app

# Copy the root package.json, pnpm-lock.yaml, and pnpm-workspace.yaml
COPY  . .

# --mount=type=cache causes error when building on container apps
# also as this will run on github i dont think cache will even be preserved so no point in runn it like so
RUN id=pnpm,target=/pnpm/store pnpm install --no-frozen-lockfile

# Set the working directory to the server package
WORKDIR /app/apps/server

# Build the application
RUN pnpm run build

# Set environment variables for the NestJs application
ENV HOST=0.0.0.0

# Expose the port the app runs on
EXPOSE 8080

# Define the command to run the app
CMD ["pnpm", "preview"]
