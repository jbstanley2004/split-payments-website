FROM node:20-slim

WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Expose port (default 3030)
EXPOSE 3030

# Start server
CMD ["node", "server.mjs"]
