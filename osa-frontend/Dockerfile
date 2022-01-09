# pull official base image
FROM node:14-alpine

# set working directory
WORKDIR /osa-frontend

# add `/app/node_modules/.bin` to $PATH
ENV PATH /osa-frontend/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN yarn install

# add app
COPY . ./

# start app
CMD ["npm", "start"]
