# Build stage
FROM node:20.18.0-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# ------------------- Stage 2: Final Stage ------------------------------
FROM node:21-slim

# Set the working directory to /app
WORKDIR /app
    
# Copy built assets and dependencies from frontend-builder stage
COPY --from=build /app .
    
# Expose port 5173 for the Node.js application
EXPOSE 5173
    
# Define the default command to run the application in development mode
CMD ["npm", "run", "dev", "--", "--host"]
