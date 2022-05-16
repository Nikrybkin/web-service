FROM node:alpine
WORKDIR /app
COPY ./backend/package*.json ./
ENV NODE_ENV="production"
RUN npm install
COPY ./backend ./
ENTRYPOINT npm run prod