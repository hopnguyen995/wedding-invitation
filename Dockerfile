# Dev image for the Vite wedding-invitation app
FROM node:20-alpine

WORKDIR /app

# Install deps first for better layer caching
COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 5173

# --host exposes the dev server outside the container
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
