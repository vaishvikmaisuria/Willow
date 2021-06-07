FROM node:alpine
WORKDIR /willow
# install app dependencies
COPY ./package.json ./
# install node modules
RUN npm install --silent
RUN npm install react-scripts@3.4.0 -g --silent
# add app
COPY . ./
# start app
CMD ["npm", "start"]