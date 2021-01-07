FROM node:12.1.0 as build

RUN mkdir -p /usr/src/app
#npm 6.14.4

WORKDIR /usr/src/app
COPY . .

RUN mkdir /ui-cert /ui-key && npm install
#RUN npm i -S -g serve
RUN npm run build || cat /root/.npm/_logs/*

FROM nginx:1.19.5-perl

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY main.conf /etc/nginx/nginx.conf

WORKDIR /usr/share/nginx/html
COPY ./env.sh .

RUN chmod +x env.sh

COPY --from=build /usr/src/app/build/ /usr/share/nginx/html
RUN mkdir public
EXPOSE 80

CMD ["/bin/bash", "-c", "./env.sh && nginx -g \"daemon off;\""]