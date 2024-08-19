FROM ubuntu:24.04

ARG NODE_VERSION
ARG UID
ARG GID

RUN groupadd -g ${GID} -o user
RUN useradd -m -u ${UID} -g ${GID} -o -s /bin/bash user

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_PRODUCT=firefox
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/firefox

RUN <<EOT
#!/bin/bash
set -ex
# Install firefox (from PPA instead of snap)
apt-get -qq update >/dev/null
apt-get -qq install software-properties-common >/dev/null
add-apt-repository -y ppa:mozillateam/ppa >/dev/null
apt-get -qq update >/dev/null
apt-get -qq install --target-release 'o=LP-PPA-mozillateam' firefox >/dev/null
firefox --version
# Install dependencies needed to install node.js
apt-get -qq install curl gnupg xz-utils >/dev/null
# Clean up to reduce docker image size
apt-get -qq clean >/dev/null
rm -rf /var/lib/apt/lists/*
EOT

RUN <<EOT
#!/bin/bash
set -ex
ARCH="$(dpkg --print-architecture)"
case "${ARCH##*-}" in
  amd64) ARCH='x64';; \
  arm64) ARCH='arm64';;
  armhf) ARCH='armv7l';;
  i386) ARCH='x86';;
  *) echo "unsupported architecture"; exit 1 ;;
esac
# See https://github.com/nodejs/node#release-keys
for key in \
  4ED778F539E3634C779C87C6D7062848A1AB005C \
  141F07595B7B3FFE74309A937405533BE57C7D57 \
  74F12602B6F1C4E913FAA37AD3A89613643B6201 \
  DD792F5973C6DE52C432CBDAC77ABFA00DDBF2B7 \
  CC68F5A3106FF448322E48ED27F5E38D5B0A215F \
  8FCCA13FEF1D0C2E91008E09770F7A9A5AE15600 \
  890C08DB8579162FEE0DF9DB8BEAB4DFCF555EF4 \
  C82FA3AE1CBEDC6BE46B9360C43CEC45C17AB93C \
  108F52B48DB57BB0CC439B2997B01419BD92F80A \
  A363A499291CBBC940DD62E41F10027AF002F8B0 \
; do gpg --batch --keyserver keyserver.ubuntu.com --recv-keys $key; done
curl -fsSLO --compressed https://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-$ARCH.tar.xz
curl -fsSLO --compressed https://nodejs.org/dist/v$NODE_VERSION/SHASUMS256.txt.asc
gpg --batch --decrypt --output SHASUMS256.txt SHASUMS256.txt.asc
grep " node-v$NODE_VERSION-linux-$ARCH.tar.xz\$" SHASUMS256.txt | sha256sum -c -
tar -xJf node-v$NODE_VERSION-linux-$ARCH.tar.xz -C /usr/local --strip-components=1 --no-same-owner
rm node-v$NODE_VERSION-linux-$ARCH.tar.xz SHASUMS256.txt.asc SHASUMS256.txt
ln -s /usr/local/bin/node /usr/local/bin/nodejs
node --version
npm --version
EOT

WORKDIR /src
