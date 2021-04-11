FROM node:12

# Create app directory
WORKDIR /app

# Install app dependencies
COPY package.json .
RUN npm install

# Build dist
COPY . /app
RUN npm run tsc

EXPOSE 8080
CMD npm run start
