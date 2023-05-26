FROM node:lts-alpine

WORKDIR /app
COPY package.json .
RUN npm install
EXPOSE 5173
COPY . .
CMD ["npm","run", "dev"]