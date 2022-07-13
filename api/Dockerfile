FROM node:alpine as builder
WORKDIR '/app'
COPY ./package.json ./
RUN npm install -D
COPY . .
RUN npm run build

FROM node:alpine
WORKDIR '/app'
COPY --from=builder /app/dist /app/dist
COPY --from=builder /app/prisma /app/prisma
COPY --from=builder /app/package.json /app/
RUN npm install
RUN npx prisma migrate reset
CMD ["npm", "run", "start"]

