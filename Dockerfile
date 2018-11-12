FROM node:9

RUN mkdir -p /var/emote_combat_client/
ADD . /var/emote_combat_client/

EXPOSE 8080

WORKDIR /var/emote_combat_client
RUN npm install
ENTRYPOINT ["/var/emote_combat_client/entrypoint.sh"]
