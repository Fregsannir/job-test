#!/bin/sh

DOCKER_FILE_PATH=./docker-compose.prod.yml
ENV_ALIAS=.env
FILE=$PWD/$ENV_ALIAS

if [ -f $FILE ]; then
  docker-compose -f $DOCKER_FILE_PATH --env-file=$ENV_ALIAS up -d
else
  echo "Error: $FILE doesn't exist. Please specify $ENV_ALIAS for development environment."
fi