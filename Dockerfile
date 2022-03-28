FROM node:14

RUN mkdir /bryllup

WORKDIR /bryllup

COPY ./package.json /bryllup

RUN npm install

COPY . /bryllup

RUN npm run build

CMD ["npm", "start"]