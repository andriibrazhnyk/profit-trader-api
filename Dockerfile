FROM node:22-alpine

WORKDIR /app
COPY . .

RUN npm ci
RUN npm run build

EXPOSE 8000

CMD ["npm", "run", "start:prod"] 