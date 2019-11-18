#!/bin/sh
SERVICE="$1"
PORT="$2"
echo "deploy service: ${SERVICE}"
echo "on port: ${PORT}"

docker pull wltn3231/${SERVICE}
docker stop ${SERVICE}
docker rm ${SERVICE}
docker run --name=${SERVICE} -d -p ${PORT}:${PORT} wltn3231/${SERVICE}
