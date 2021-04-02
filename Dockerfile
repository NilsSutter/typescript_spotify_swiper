FROM node:12

# Create app directory
WORKDIR /app

# Install app dependencies
COPY . .
RUN npm install

# Build dist
RUN npm run build

EXPOSE 8080
CMD npm run start
