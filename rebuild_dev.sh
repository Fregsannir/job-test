#!/bin/sh

DOCKER_FILE_PATH=./docker-compose.dev.yml
ENV_ALIAS=dev.env
FILE=$PWD/$ENV_ALIAS

if [ -f $FILE ]; then
  docker-compose -f $DOCKER_FILE_PATH --env-file=$ENV_ALIAS up -d --build --remove-orphans
else
  echo "Error: $FILE doesn't exist. Please specify $ENV_ALIAS for development environment."
fi