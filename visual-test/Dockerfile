FROM node:alpine

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_PRODUCT=firefox
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/firefox

RUN apk add --update-cache firefox font-dejavu \
  && rm -rf /var/cache/apk/*

WORKDIR /src
