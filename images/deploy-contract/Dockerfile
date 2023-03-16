FROM node:18.14.2-slim

COPY ./package.json /root/package.json
COPY ./main.js /root/main.js

WORKDIR /root

RUN npm i

ENTRYPOINT ["node", "./main.js"]
