# How to Guide: Dockerizing Astro Web Application

## Prerequisites

- Ensure you have`Docker` installed on your machine. 
- Make sure you have `pnpm` installed. If you don't have `pnpm`, you can install it globally using npm:
    ```shell
    npm install -g pnpm
    ```

 ## Step 1 Project Setup
1. Clone the project repository (if not already done):
    ```shell
    gh repo clone diconium/ethereal-pulse
    cd ./ethereal-pulse
    ```

2. Install project dependencies:
    ```shell
    pnpm install
    ```

## Step 2 DockerFile
Create a **`Dockerfile`** in the root dir of your project. this file will define the Docker image for you aplication.

    ```shell
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
    FROM base AS prod-deps
    RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

    # Stage 2: Install all dependencies and build the application
    FROM base AS build
    RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
    RUN pnpm run build

    # Stage 3: Create the final image with only the necessary files
    FROM base
    COPY --from=prod-deps /app/node_modules /app/node_modules
    COPY --from=build /app/dist /app/dist

    # Set environment variables for the Astro application
    ENV HOST=0.0.0.0
    ENV PORT=5173

    # Expose the port the app runs on
    EXPOSE 5173

    # Start the application
    CMD ["pnpm", "start"]
    ```
    

## Step 3 Create a .dockerignore File    
Create a **`.dockerignore`** file in the root of your project to exclude files and directories that are not needed inside the Docker image:

```shell    
    node_modules
    dist
    .build
    .cache
    .DS_Store
```
## Step 4 Modify Start Script
Ensure your **`package.json`** has the correct start script to run the Astro application on the desired host and port:

```json
"scripts": {
    "start": "astro preview --host 0.0.0.0 --port 5173"
    }
```

## Step 5: Build the Docker Image
Use the **`"docker build"`** command to create a Docker image for your application. The `'-t'` flag is used to tag the image with a name for easier reference:

```shell
docker build -t your-astro-app .
```

- `'docker build'`: Command to build a Docker image.
- `'-t'` your-astro-app: The `'-t'` (or `'--tag'`) flag names the image `'your-astro-app.'`
- `'.'`: The build context, which is the current directory.

## Step 6: Run the Docker Container
Use the **`"docker run"`** command to start a container from the image you just built. The `'-p'` flag maps a port on your host to a port in the container:

```shell
docker run -p 5173:5173 your-astro-app
```

- `'docker run'`: Command to run a Docker container.
- `'-p 5173:5173'`: Maps port '`5173'` on the host to port `'5173'` in the container.
- `'your-astro-app'`: The name of the Docker image to run.

## Step 7: Access Your Application
Open your web browser and navigate to http://localhost:5173 to see your Astro web application running inside the Docker container.