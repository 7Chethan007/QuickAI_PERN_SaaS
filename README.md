# my-PERN-SaaS
Building and deploying a fully functional AI SaaS Application with Subscriptions billings using the PERN stack (PostgreSQL, Express, React and Node.js).

# Key Features:

User Authentication: Secure sign-in, sign-up and profile management using Clerk
Subscription Billing: Premium subscriptions to access premium AI features
PostgreSQL Database: Serverless postgres Database by Neon

# AI features:

Article Generator: Provide Title & length to generate article using AI
Blog Title Generator: Provide Keyword and category to generate blog titles
Image Generator: Provide prompt to generate images using AI
Background remover: Upload image and get transparent background image using AI
Image object remover: upload image and describe the object name to be removed from any image
Resume Analyzer: Upload resume and get complete analysis of your resume using AI



## Vercel configuration

Vercel json config for the Express backend:

```json
{
    "version": 2,
    "builds": [
        {
            "src": "server.js",
            "use": "@vercel/node",
            "config": {
                "includeFiles": [
                    "dist/**"
                ]
            }
        }
    ],
    "routes": [
        {
            "src": "/(.*)",
            "dest": "server.js"
        }
    ]
}
```

Vercel json config to support React Router in the frontend:

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