FROM node:16.14-alpine as build-stage
WORKDIR /app
COPY package*.json yarn*.lock ./
RUN yarn install
COPY ./ .

ENV NODE_ENV=production
EXPOSE 3001
CMD ["npm", "start"]