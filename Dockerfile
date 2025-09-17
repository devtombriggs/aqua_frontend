# ---------- build ----------
FROM node:20-alpine AS build
WORKDIR /app
RUN apk add --no-cache libc6-compat
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# ---------- run ----------
FROM node:20-alpine
WORKDIR /app
RUN apk add --no-cache libc6-compat
ENV NODE_ENV=production

COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
COPY --from=build /app/package*.json ./

RUN npm ci --omit=dev
EXPOSE 3000
CMD ["npm", "start"]
