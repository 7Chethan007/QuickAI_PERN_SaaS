# QuickAI Frontend

This directory contains the source code for the QuickAI frontend application. It is a modern single-page application (SPA) built with React and Vite, and styled with Tailwind CSS.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Environment Variables](#environment-variables)
  - [Running Locally](#running-locally)
- [Building and Running with Docker](#building-and-running-with-docker)
  - [Building the Image](#building-the-image)
  - [Running the Container](#running-the-container)

---

## Features

- A responsive and intuitive user interface for interacting with all AI features.
- Client-side routing handled by React Router.
- Secure authentication flow managed by the Clerk React library.
- Seamless API communication with the backend service.

## Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router
- **HTTP Client**: Axios
- **Authentication**: Clerk

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en/) (version 22.x or higher)
- An instance of the [QuickAI backend service](https://github.com/7Chethan007/my-PERN-SaaS/tree/main/server) running.

### Environment Variables

Create a `.env` file in this `client/` directory. This file contains public keys that are safe to expose in a browser.

```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_BASE_URL=http://localhost:3000
```
- `VITE_CLERK_PUBLISHABLE_KEY`: Your **public** API key from your Clerk application. It is used to identify your application to Clerk's frontend libraries.
- `VITE_BASE_URL`: The full URL of the running backend server. The frontend uses this to make all its API requests.

### Running Locally

1.  **Install dependencies:**
    ```sh
    npm install
    ```

2.  **Start the development server:**
    ```sh
    npm run dev
    ```
    The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Building and Running with Docker

The `Dockerfile` in this directory is configured to build a production-ready image of the frontend application served by Nginx.

### Building the Image

The Docker build process requires the environment variables to be present to "bake" them into the static files.

**Important**: Ensure you have a valid `.env` file in this directory before building.

```sh
docker build -t chethan0907/quick-ai-frontend .
```
*Note: The tag `chethan0907/quick-ai-frontend` is an example. You can name it whatever you like.*

### Running the Container

Once the image is built, you can run it as a container.

```sh
docker run -d -p 8080:80 chethan0907/quick-ai-frontend
```
- `-d`: Runs the container in detached mode (in the background).
- `-p 8080:80`: Maps port `8080` on your local machine to port `80` inside the container (where Nginx is listening).

The application will be accessible at `http://localhost:8080`.
