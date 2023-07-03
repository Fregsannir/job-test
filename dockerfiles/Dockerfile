FROM node:18-alpine

WORKDIR /usr/app/test-task
ENV NODE_ENV=development

COPY tsconfig.json package.json package-lock.json ./
RUN npm install

COPY . ./

ENTRYPOINT ["npm", "run", "start:dev"]xw