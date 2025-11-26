# QuickAI - Your Personal AI SaaS Platform

**Live Demo**: [https://quick-ai-rust-five.vercel.app/](https://quick-ai-rust-five.vercel.app/)

QuickAI is a fully functional AI-powered Software-as-a-Service (SaaS) application built with the PERN stack (PostgreSQL, Express, React, Node.js). It offers a suite of powerful AI tools, complete with user authentication and subscription-based billing.

This project is containerized with Docker for consistent development and easy deployment.

## Table of Contents

- [Key Features](#key-features)
  - [Free Tier Features](#free-tier-features)
  - [Premium Tier Features](#premium-tier-features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Application](#running-the-application)
  - [Using Docker Compose (Recommended)](#using-docker-compose-recommended)
  - [Running Services Individually](#running-services-individually)
- [Docker Hub Images](#docker-hub-images)
- [Environment Variables](#environment-variables)

---

## Key Features

QuickAI offers a tiered system, providing basic functionality for free and unlocking a powerful suite of advanced tools for premium subscribers.

### Free Tier Features

- **Personal Dashboard**: Access a private dashboard to view, manage, and publish all of your past creations.
- **Secure User Authentication**: Simple and secure sign-in, sign-up, and profile management powered by Clerk.
- **Blog Title Generator**: Generate up to 5 creative and catchy blog titles from keywords to kickstart your writing process.
- **Community Showcase**: Browse a gallery of creations shared by the QuickAI community.

### Premium Tier Features

A premium subscription gives you unlimited access to all features, including:

- **Article Generator**: Create well-structured, full-length articles from just a title and a specified word count. Perfect for content creators and marketers.
- **Image Generator**: Bring your ideas to life by generating high-quality images from descriptive text prompts.
- **AI-Powered Image Editing**:
    - **Background Remover**: Instantly remove the background from any uploaded image with a single click.
    - **Object Remover**: Clean up your photos by seamlessly removing any unwanted object from an uploaded image.
- **Resume Analyzer**: Get a competitive edge in your job search. Upload your resume (PDF) to receive a complete analysis, constructive feedback, and suggestions for improvement.

## Tech Stack

- **Frontend**: React, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (Neon)
- **Authentication**: Clerk
- **AI APIs**: Gemini, ClipDrop
- **Image Management**: Cloudinary
- **Containerization**: Docker, Docker Compose

## Project Structure

```
/
├── client/         # React Frontend
│   ├── Dockerfile
│   ├── .env
│   └── ...
├── server/         # Node.js/Express Backend
│   ├── Dockerfile
│   ├── .env
│   └── ...
├── docker-compose.yaml # Docker Compose configuration
└── README.md           # This file
```

## Getting Started

### Prerequisites

- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/en/) (for local development without Docker)
- A Git client

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/7Chethan007/QuickAI_PERN_SaaS
    cd QuickAI-PERN-SaaS
    ```

2.  **Set up environment variables:**
    You will need to create two `.env` files. See the [Environment Variables](#environment-variables) section below for details on what to include in each.
    - Create one at `client/.env`
    - Create another at `server/.env`

## Running the Application

### Using Docker Compose (Recommended)

This is the simplest way to get the entire application running. From the root directory of the project:

```sh
docker-compose up --build
```

This command will:
1.  Build the Docker images for both the `frontend` and `backend` services.
2.  Start the containers for both services.
3.  Network them together.

Your application will be available at:
- **Frontend**: `http://localhost:8080`
- **Backend**: `http://localhost:3000`

To stop the application, press `Ctrl + C` in the terminal where Docker Compose is running, and then run:
```sh
docker-compose down
```

### Running Services Individually

You can also build and run each service as a standalone container. See the `README.md` files in the `client/` and `server/` directories for detailed instructions.

## Vercel Deployment

While this project is optimized for Docker, it can also be deployed to Vercel. You will need to create a Vercel project for both the `client` and `server` directories and configure them correctly.

### 1. Frontend (`client`)

In your Vercel project settings for the frontend, set the **Root Directory** to `client`. Then, create a `vercel.json` file inside the `client` directory with the following content. This ensures that all routing is handled by React Router.

**`client/vercel.json`**
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/"
    }
  ]
}
```

### 2. Backend (`server`)

In your Vercel project settings for the backend, set the **Root Directory** to `server`. Then, create a `vercel.json` file inside the `server` directory with the following content. This tells Vercel how to build and route the Express API.

**`server/vercel.json`**
```json
{
  "version": 2,
  "builds": [
    {
      "src": "index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "index.js"
    }
  ]
}
```

## Docker Hub Images

Pre-built images for both the frontend and backend are available on Docker Hub.

- **Frontend**: `chethan0907/quick-ai`
  - `docker pull chethan0907/quick-ai`
  - [View on Docker Hub](https://hub.docker.com/repository/docker/chethan0907/quick-ai)

- **Backend**: `chethan0907/quick-ai-server`
  - `docker pull chethan0907/quick-ai-server`
  - [View on Docker Hub](https://hub.docker.com/repository/docker/chethan0907/quick-ai-server)

## Environment Variables

You need to create two separate `.env` files for the application to work.

### 1. Frontend (`client/.env`)

This file contains **public keys** that are safe to expose in a browser.

```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_BASE_URL=http://localhost:3000
```
- `VITE_CLERK_PUBLISHABLE_KEY`: Your public-facing API key from your Clerk application. It is used to identify your application to Clerk's frontend libraries.
- `VITE_BASE_URL`: The URL of your backend server. The frontend uses this to make API requests.

### 2. Backend (`server/.env`)

This file contains **secret keys** and should never be shared or committed to version control.

```
DATABASE_URL=postgresql://...
CLERK_SECRET_KEY=sk_test_...
GEMINI_API_KEY=...
CLIPDROP_API_KEY=...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```
- `DATABASE_URL`: The connection string for your Neon PostgreSQL database.
- `CLERK_SECRET_KEY`: Your secret API key from Clerk, used for backend user session verification.
- `GEMINI_API_KEY`: Your API key for Google's Gemini, used for text-based AI features.
- `CLIPDROP_API_KEY`: Your API key for ClipDrop, used for image-based AI features.
- `CLOUDINARY_*`: Your credentials for Cloudinary, used for storing and transforming images.
