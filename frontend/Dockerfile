FROM node:16.14-alpine as build-stage
WORKDIR /app
COPY package*.json yarn*.lock ./
RUN yarn install
COPY ./ .
RUN yarn build

ENV NEXTAUTH_URL=http://localhost
EXPOSE 3000
CMD ["npm", "start"]