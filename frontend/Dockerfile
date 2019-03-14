FROM node:11 as builder

WORKDIR /src
COPY package.json yarn.lock ./
RUN yarn install

COPY . . 
RUN yarn build --prod

EXPOSE 80
# In a prod env, copy this to an nginx-alpine container (if not doing SSR)
CMD ["/bin/bash", "-c", "yarn serve"]