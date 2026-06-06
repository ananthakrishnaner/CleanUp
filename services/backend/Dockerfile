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
COPY services/user-service/package*.json /app/services/user-service/
COPY services/booking-service/package*.json /app/services/booking-service/
COPY services/cleaner-service/package*.json /app/services/cleaner-service/
COPY services/review-service/package*.json /app/services/review-service/
COPY services/promo-service/package*.json /app/services/promo-service/
COPY services/admin-service/package*.json /app/services/admin-service/
COPY services/chat-service/package*.json /app/services/chat-service/
COPY services/config-service/package*.json /app/services/config-service/
COPY services/notification-service/package*.json /app/services/notification-service/
COPY services/support-service/package*.json /app/services/support-service/
COPY services/loyalty-service/package*.json /app/services/loyalty-service/
COPY services/analytics-service/package*.json /app/services/analytics-service/
COPY services/payment-service/package*.json /app/services/payment-service/
WORKDIR /app/services/backend

# Install backend dependencies
RUN npm install --omit=dev

# Install other service dependencies
WORKDIR /app/services/user-service && npm install --omit=dev
WORKDIR /app/services/booking-service && npm install --omit=dev
WORKDIR /app/services/cleaner-service && npm install --omit=dev
WORKDIR /app/services/review-service && npm install --omit=dev
WORKDIR /app/services/promo-service && npm install --omit=dev
WORKDIR /app/services/admin-service && npm install --omit=dev
WORKDIR /app/services/chat-service && npm install --omit=dev
WORKDIR /app/services/config-service && npm install --omit=dev
WORKDIR /app/services/notification-service && npm install --omit=dev
WORKDIR /app/services/support-service && npm install --omit=dev
WORKDIR /app/services/loyalty-service && npm install --omit=dev
WORKDIR /app/services/analytics-service && npm install --omit=dev
WORKDIR /app/services/payment-service && npm install --omit=dev
WORKDIR /app/services/backend

# Copy source code
COPY services/backend /app/services/backend/
COPY services/user-service /app/services/user-service/
COPY services/booking-service /app/services/booking-service/
COPY services/cleaner-service /app/services/cleaner-service/
COPY services/review-service /app/services/review-service/
COPY services/promo-service /app/services/promo-service/
COPY services/admin-service /app/services/admin-service/
COPY services/chat-service /app/services/chat-service/
COPY services/config-service /app/services/config-service/
COPY services/notification-service /app/services/notification-service/
COPY services/support-service /app/services/support-service/
COPY services/loyalty-service /app/services/loyalty-service/
COPY services/analytics-service /app/services/analytics-service/
COPY services/payment-service /app/services/payment-service/

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S app -u 1001 -G nodejs && \
    chown -R app:nodejs /app
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