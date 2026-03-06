FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY backend/package*.json ./backend/
RUN cd backend && npm ci

COPY backend ./backend/
RUN cd backend && npx prisma generate
RUN cd backend && npm run build

EXPOSE 3000

CMD ["sh", "-c", "npm run migrate && npm run start"]