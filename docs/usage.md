# Usage

The easiest way to get started is to use the `flexydox/flexydox` docker image.

## Docker

To generate documentation for our Chess API example, you can run the following commands in your terminal:

```bash
# Docker compose example
# https://github.com/flexydox
cd ./examples
# This will run `chess` service 
# from the ./examples/docker-compose.yml file
docker-compose up chess 
```

```bash
# Docker CLI example
# https://github.com/flexydox
# Mount the configuration file 
# and the output folder to the container and run 
# the flexydox build command to generate the documentation
cd ./examples
docker run                        \
  --volume ./sites/chess:/config  \
  --volume ./docs/chess-output    \
  flexydox/flexydox flexydox -c /config/fxdx.config.yaml build
```

Replace the example configuration file `fxdx.config.yaml` with your api configuration. 
