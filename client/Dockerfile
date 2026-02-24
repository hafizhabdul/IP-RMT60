FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

ARG VITE_BASE_URL
ARG VITE_GOOGLE_CLIENT_ID
ARG VITE_WA_NUMBER
ARG VITE_HERO_VIDEO_URL

ENV VITE_BASE_URL=$VITE_BASE_URL
ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID
ENV VITE_WA_NUMBER=$VITE_WA_NUMBER
ENV VITE_HERO_VIDEO_URL=$VITE_HERO_VIDEO_URL

RUN npm run build

# Serve with nginx
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
