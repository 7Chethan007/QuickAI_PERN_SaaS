# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
# Use --only=production if you have devDependencies that you don't need in the final image
RUN npm install

# Bundle app source
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define the command to run your app
CMD ["node", "server.js"]
