#FRONTEND
FROM node:20-alpine as frontend-builder

COPY ./frontend /app

WORKDIR /app

RUN npm install

RUN npm run build

#BACKEND
FROM node:20-alpine

COPY ./backend /app

WORKDIR /app

RUN npm install

RUN npm run build

COPY --from=frontend-builder /app/dist /app/public

CMD [ "node", "dist/server.js" ]