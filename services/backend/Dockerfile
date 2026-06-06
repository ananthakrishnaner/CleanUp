FROM node:20-alpine

# Install dependencies
RUN apk add --no-cache dumb-init curl

# Create app directory
WORKDIR /app

# Copy package files
COPY services/shared ./services/shared
WORKDIR /app/services/shared
RUN npm install --omit=dev

COPY services/backend/package*.json /app/services/backend/
WORKDIR /app/services/backend

# Install dependencies
RUN npm install --omit=dev

# Copy source code
COPY services/backend /app/services/backend/

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