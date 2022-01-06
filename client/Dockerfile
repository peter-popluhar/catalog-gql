FROM node:alpine

RUN mkdir -p /usr/src/client

ENV NEXT_TELEMETRY_DISABLED=1

WORKDIR /usr/src/client

COPY package*.json /usr/src/client

RUN npm install

COPY . /usr/src/client

RUN npm run build

EXPOSE 3000

ENTRYPOINT ["npm", "run", "dev"]
