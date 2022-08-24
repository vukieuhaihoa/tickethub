FROM node:alpine as builder
WORKDIR /app
COPY package*.json ./  
RUN npm install
COPY . .
RUN npm run build

FROM node:alpine as production
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist/ ./dist

COPY .env .

USER node
EXPOSE 3000
CMD [ "node", "dist/index.js" ]
