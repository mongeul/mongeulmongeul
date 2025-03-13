FROM node:20.15.0 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20.15.0-alpine
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/next.config.mjs ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
RUN npm ci --only=production

EXPOSE 3000
CMD ["npm", "start"]
