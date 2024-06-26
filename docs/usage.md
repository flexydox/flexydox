# Usage
The easiest way to get started is to use the [flexydox/flexydox](https://hub.docker.com/r/flexydox/flexydox) docker image. To be able to use examples in this documentation, you need also clone the `flexydox/flexydox` repository.

## Clone Repository

```bash
git clone https://github.com/flexydox/flexydox.git 
# or git clone git@github.com:flexydox/flexydox.git

# Change directory to the flexydox repository
cd flexydox
```


## Docker


To generate documentation for our Chess API example, 
you can run the following commands in your terminal:

Start **inside the cloned flexydox** repository.


If you prefer to use the `docker-compose`:
```bash
# ** Inside the flexydox repository **

# Docker compose example
# https://github.com/flexydox
cd ./examples
# This will run `chess` service 
# from the ./examples/docker-compose.yml file
docker-compose up chess 
```

Or if you prefer to use the plain `docker CLI`:
```bash
# Docker CLI example
# https://github.com/flexydox
# Mount the configuration file 
# and the output folder to the container and run 
# the flexydox build command to generate 
# the documentation
cd ./examples
docker run                        \
  --volume ./sites/chess:/config  \
  --volume ./docs/chess-output    \
  flexydox/flexydox flexydox -c /config/fxdx.config.yaml build
```

You can now update the example configuration file `fxdx.config.yaml` 
to point to your own API schema files 
and generate the documentation for your own API.

