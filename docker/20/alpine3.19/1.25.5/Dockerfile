FROM node:20-alpine3.19 AS node

FROM nginx:1.25.5-alpine

ENV NODE_VERSION=20
LABEL maintainer="Gideon St Maintainers <https://github.com/gideonstele>"

COPY --from=node /usr/lib /usr/lib
COPY --from=node /usr/local/lib /usr/local/lib
COPY --from=node /usr/local/include /usr/local/include
COPY --from=node /usr/local/bin /usr/local/bin

RUN node -v
