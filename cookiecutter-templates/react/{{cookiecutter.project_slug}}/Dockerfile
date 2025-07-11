# Use Node.js {{cookiecutter.node_version}} slim image
FROM node:{{cookiecutter.node_version}}-slim as base

# Set environment variables
ENV NODE_ENV=production

# Set work directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Development stage
FROM base as development

# Install dev dependencies
RUN npm ci

# Copy source code explicitly
COPY src/ ./src/
COPY public/ ./public/
COPY index.html ./
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY .env.example ./

# Switch to node user (default for node images)
USER node

# Expose port
EXPOSE 3000 6006

# Start the development server
CMD ["npm", "run", "dev"]

# Production stage
FROM base as production

# Copy source code explicitly
COPY src/ ./src/
COPY public/ ./public/
COPY index.html ./
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY tailwind.config.js ./
COPY postcss.config.js ./

# Build the application
RUN npm run build

# Install serve for production
RUN npm install -g serve

# Switch to node user (default for node images)
USER node

# Expose port
EXPOSE 3000

# Start the production server
CMD ["serve", "-s", "dist", "-l", "3000"] 