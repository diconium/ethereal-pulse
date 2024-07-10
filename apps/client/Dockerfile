# Use the official Node.js image as a base
FROM node:lts AS base

# Set environment variables for pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

# Enable corepack (which includes pnpm)
RUN corepack enable

# Set the working directory in the container
WORKDIR /app

# Copy all files into the container
COPY . .

# Stage 1: Install production dependencies
#RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --no-frozen-lockfile

# --mount=type=cache causes error when building on container apps
# also as this will run on github i dont think cache will even be preserved so no point in runn it like so
RUN id=pnpm,target=/pnpm/store pnpm install --no-frozen-lockfile

# Stage 3: Build 
RUN pnpm run build

# Set environment variables for the Remix application
ENV HOST=0.0.0.0
ENV PORT=5173

# Expose the port the app runs on
EXPOSE 5173

# Start the application
CMD ["pnpm", "preview"]
