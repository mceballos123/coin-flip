# Use a Node.js base image
FROM node:alpine

# Set working directory inside container
WORKDIR /coin_api

# Copy dependencty files first for caching
COPY package.json .

COPY package-lock.json .

# Install dependencies
RUN npm install

#Copy the rest of the app
COPY server.js .

# Expose port
EXPOSE 5000

# Run the app
CMD ["node","server.js"]