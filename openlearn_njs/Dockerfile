# Step 1: Build stage
FROM node:20-slim AS builder

# Set working directory
WORKDIR /app

# Copy only package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy rest of the app
COPY . .

# Build the Next.js app

ARG PUBLIC_API_URL
ENV PUBLIC_API_URL=$PUBLIC_API_URL

RUN npm run build

# Step 2: Production stage
FROM node:20-slim AS runner

WORKDIR /app

# Copy only necessary files from builder
# COPY --from=builder /app/package*.json ./
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public
# COPY --from=builder /app/node_modules ./node_modules
# COPY --from=builder /app/next.config.js ./
# COPY --from=builder /app/next-i18next.config.js ./ 
# COPY --from=builder /app/tsconfig.json ./      

COPY --from=builder /app ./  

# Expose port
EXPOSE 3000

# Start Next.js app
CMD ["npm", "start"]