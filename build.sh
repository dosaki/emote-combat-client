#!/bin/bash

IMAGE="emote-combat-client"
NAME="emote-combat-client_owl-crescent"
PARENT=`ip route show | grep docker0 | awk '{print \$9}'`

if [[ "$1" == "rebuild" ]]; then
	docker stop "${NAME}" && docker rm "${NAME}"
fi

if [[ "$1" == "rebuildall" ]]; then
	docker stop "${NAME}" && docker rm "${NAME}"
	docker rmi "${IMAGE}"
fi

HAS_IMAGE=`docker images | grep ${IMAGE}`
if [[ "$HAS_IMAGE" == "" ]]; then
	docker build -t ${IMAGE} .
fi

docker run \
	--restart unless-stopped \
	--name "${NAME}" \
	-p 3001:8080/tcp \
	--add-host parent:${PARENT} \
	-tdi \
	"${IMAGE}" "$2"
