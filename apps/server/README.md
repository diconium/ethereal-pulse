# Server

This directory contains the backend server for the Ethereal-Pulse application. The server is built using Node.js and NestJS, and it connects to a MongoDB database. It provides APIs for managing email services and user authentication.

## Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- [PNPM](https://pnpm.io/) (Preferred package manager)
- [Docker](https://www.docker.com/get-started) (For containerization)

## Project Setup

### Install Dependencies

Navigate to the `/server` directory and install the dependencies using PNPM:

```sh
pnpm install
```

## Create the '.env'
Create `.env` and ask for credentials

```sh
cp .env.example .env
```

## Run it 

You can chose to run it localy beware that a MongoDb instance needs to be set up!

```sh
pnpm start
```
