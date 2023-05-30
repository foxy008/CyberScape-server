FROM node:16-alpine3.17

# Create app directory
WORKDIR /app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# RUN cp .env.example .env

RUN npm install --force

COPY . .

# If you are building your code for production
# RUN npm ci --only=production

# setup database


# Bundle app source
# COPY . .

CMD [ "npm", "run", "dev" ]
