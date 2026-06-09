FROM node:20-alpine AS build
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . .
RUN yarn run build

FROM nginx:alpine
COPY --from=build /app/dist/password-kata/browser /usr/share/nginx/html
EXPOSE 80
