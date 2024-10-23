FROM node:alpine

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_PRODUCT=firefox
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/firefox

RUN apk add --update-cache firefox font-dejavu \
  && rm -rf /var/cache/apk/*

RUN echo 'user_pref("layout.css.visited_links_enabled", false);' >> /usr/lib/firefox/defaults/pref/prefs.js

WORKDIR /src
