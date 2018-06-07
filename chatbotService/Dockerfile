FROM docker.5cu9kz.cloud.boc.com/botservice:2.0

# Create app directory
WORKDIR /root/chatBotService

# Bundle app source
RUN npm install

EXPOSE 3005
CMD [ "npm", "start" ]
