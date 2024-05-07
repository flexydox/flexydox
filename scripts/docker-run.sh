#!/bin/sh

# Helper script to test the Docker image
docker run -it --mount type=bind,source=./fixtures,target=/app/fixtures flexydox/flexydox bash
# flexydox build -c /app/fixtures/configs/chess-game-docker.yaml
