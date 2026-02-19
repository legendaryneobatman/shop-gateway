FROM node:22-alpine AS development
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --omit=production
COPY . .

# Command to run the application in development mode
CMD [ "npm", "run", "start:dev" ]

# Stage 2: Production (optional, but good practice)
FROM node:22-alpine AS production
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install --omit=dev
COPY . .
RUN npm run build
CMD [ "node", "dist/main.js" ]
