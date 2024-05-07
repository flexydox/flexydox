#!/bin/sh

# Helper script to test building the Docker image

docker build -t flexydox/flexydox .
docker push flexydox/flexydox
