FROM node:20-alpine

# Install dependencies
RUN apk add --no-cache dumb-init curl

# Create app directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY shared ./shared

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S app -u 1001 && \
    chown -R app:app /app
USER app

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD ["wget", "--no-verbose", "--tries=1", "--spider", "http://localhost:4003/health/ping"] || \
    exit 1

# Expose port
EXPOSE 4003

# Run as entrypoint
ENTRYPOINT ["dumb-init", "--"]
CMD ["node", "src/index.js"]