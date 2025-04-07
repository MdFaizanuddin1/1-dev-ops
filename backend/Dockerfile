# Use Node.js 20 official image
FROM node:20.18.0-alpine

# Set working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app files
COPY . .

# Expose backend port (e.g., 8000)
EXPOSE 8000

# Start the application
CMD ["node","index.js"]
