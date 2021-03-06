FROM node:10

# Create app directory
WORKDIR /home/deploy/leaderboard

# Declaration of the environement of the project
ENV NODE_ENV=production

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 3001
CMD [ "sh", "-c", "npm run migrate && npm start" ]
