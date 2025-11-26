# QuickAI Backend

This directory contains the source code for the QuickAI backend service. It is a Node.js application built with Express.js that serves as the API for the QuickAI platform.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [API Endpoints](#api-endpoints)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [Building and Running with Docker](#building-and-running-with-docker)
  - [Building the Image](#building-the-image)
  - [Running the Container](#running-the-container)

---

## Features

- Provides a RESTful API for all frontend operations.
- Securely handles user authentication and session management using Clerk middleware.
- Interfaces with multiple third-party AI services (Gemini, ClipDrop) for content generation.
- Connects to a Neon serverless PostgreSQL database for all data persistence.
- Manages image uploads and transformations via the Cloudinary service.

## Tech Stack

- **Framework**: Express.js
- **Runtime**: Node.js
- **Database**: PostgreSQL (Neon)
- **Authentication**: Clerk
- **AI APIs**: Gemini, ClipDrop
- **Image Management**: Cloudinary

## API Endpoints

- `POST /api/ai/generate-article`
- `POST /api/ai/generate-blog-title`
- `POST /api/ai/generate-image`
- `POST /api/ai/remove-image-background`
- `POST /api/ai/remove-image-object`
- `POST /api/ai/review-resume`
- `GET /api/user/get-creations`
- `GET /api/user/get-published-creations`
- `POST /api/user/toggle-like-creations`

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 18.x or higher)
- A running PostgreSQL database (we recommend [Neon](https://neon.tech/)).

### Environment Variables

Create a `.env` file in this `server/` directory. This file contains **secret keys** and credentials that your server needs to function. **This file should never be committed to version control.**

```
DATABASE_URL=postgresql://...
CLERK_SECRET_KEY=sk_test_...
GEMINI_API_KEY=...
CLIPDROP_API_KEY=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```
- `DATABASE_URL`: The full connection string for your Neon PostgreSQL database.
- `CLERK_SECRET_KEY`: Your **secret** API key from Clerk, used for backend user session verification.
- `GEMINI_API_KEY`: Your API key for Google's Gemini service.
- `CLIPDROP_API_KEY`: Your API key for the ClipDrop service.
- `CLOUDINARY_*`: Your credentials for the Cloudinary service, used for storing and transforming images.

### Running Locally

1.  **Install dependencies:**
    ```sh
    npm install
    ```

2.  **Start the development server:**
    ```sh
    npm run dev
    ```
    The server will start on port 3000.

## Building and Running with Docker

The `Dockerfile` in this directory is configured to build a production-ready image of the backend server.

### Building the Image

```sh
docker build -t chethan0907/quick-ai-backend .
```
*Note: The tag `chethan0907/quick-ai-backend` is an example. You can name it whatever you like.*

### Running the Container

The running container needs access to the environment variables defined above. The recommended way to provide them is by using the `--env-file` flag.

**Important**: Ensure you have a valid `.env` file in this directory before running.

```sh
docker run -d -p 3000:3000 --env-file ./.env chethan0907/quick-ai-backend
```
- `-d`: Runs the container in detached mode (in the background).
- `-p 3000:3000`: Maps port `3000` on your local machine to port `3000` inside the container.
- `--env-file ./.env`: Tells Docker to load environment variables from your `.env` file.

The server will be running and accessible at `http://localhost:3000`.
