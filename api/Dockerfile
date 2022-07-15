FROM node:alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN npm install -D
COPY . .
RUN npm run build

FROM node:alpine
RUN apk add --no-cache bash
WORKDIR '/app'
ARG DATABASE_URL
ENV DATABASE_URL $DATABASE_URL
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/prisma /app/prisma
COPY --from=builder /app/package.json /app/
RUN npm install
CMD ["npm", "run", "prod"]

