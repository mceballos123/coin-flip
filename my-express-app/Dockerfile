# Use a Node.js base image
FROM node:18-slim

# Set working directory inside container
WORKDIR /my-express-app

# Copy dependencty files first for caching
COPY package*.json ./

# Install dependencies
RUN npm install

#Copy the rest of the app
COPY . . 

# Expose port
EXPOSE 3000

# Run the app
CMD ["node","server.js"]