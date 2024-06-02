# Flexydox

 Create a **unified documentation** for your API Services effortlessly by combining Open API (Rest API) or GraphQL specification files and custom markdown files using a user-friendly YAML config file.

1. Given this config `./fixtures/chess-game/flexydox.yaml`: 

```yaml
outputFolder: ./_docs                 # Generated documentation output folder
title: Chess Game API Example         # Generated documentation title
base: /chess                          # Base path prefix for the generated documentation
logo:                                 # Generated documentation logo
  url: ./fixtures/logos/logo.svg     
  width: 100
  height: 100
apis:                                 # API definitions
  - id: graphql
    name: Chess Game GraphQL API
    url: ./fixtures/chess-game/schemas/chess-game-schema.graphql

  - id: openapi
    name: Chess Game OpenAPI 3.0
    url: ./fixtures/chess-game/schemas/chess-game-30.json 

customPagesFolder: ./fixtures/chess-game/custom-pages  # custom markdown files folder
examplesFolder: ./fixtures/chess-game/examples         # operation examples folder
groups:                              # Group defines a logical categorization of operation or type
  - name: Player                     # Create a group player
    regex: /player|move/i            # and assign to it any type or operation name matching regex 
  - name: Game
    regex: /game/i
  - name: Admin
    regex: /admin/i
```

2. By running Flexydox generator
```bash
flexydox -c ./fixtures/chess-game/flexydox.yaml
```

3. It will generate this example API documentation:

[http://examples.flexydox.org/chess](http://examples.flexydox.org/chess)




## Web

https://flexydox.org


## Features
- One unified generator for multiple APIs - Open API, GraphQL (support for gRPC and tRPC is planned).
- Custom markdown pages (User Guide, FAQ, Authentication, ..) can be added to the documentation.
- Custom examples for operations can be added to the documentation.
- Logical view - concept of groups (domains) allows to logically group operations and types across APIs.
- Possibility to assign operations or types to a group using regex pattern matching
- Categorize operations into Read / Modify / Subscribe groups to view them based on their intended usage



## Getting Started - Docker

The easiest way to get started is to use the `flexydox/flexydox` docker image.


To generate documentation for our Chess API example, you can run the following commands in your terminal:

```bash
# Docker compose
cd ./examples
docker-compose up chess # This run `chess` service from the ./examples/docker-compose.yml
```

```bash
# Docker CLI
# Mount the configuration file and the output folder to the container
# and run the flexydox build command to generate the documentation
cd ./examples
docker run                        \
  --volume ./sites/chess:/config  \
  --volume ./docs/chess-output    \
  flexydox/flexydox flexydox -c /config/fxdx.config.yaml build
```


## Configuration Reference


### CLI Configuration file
The configuration file is a YAML file that defines the generated documentation. 

The CLI configuration file reference is available [docs/schemas/fxdx-cli-config.md](docs/schemas/fxdx-cli-config.md).

### Configuration Examples 
You can find configuration examples of in the `./examples` folder.
Generated documentation examples are available at [http://examples.flexydox.org](http://examples.flexydox.org).


## Development


### Architecture Overview
Flexydox splits the api generation process into two main parts:
1. **Create a unified documentation schema** from the input configuration file which defines the api sources, custom pages, categories, and examples.
   It will generate a `doc-schema.json` file, which schema is documented in the [`./docs/schemas/fxdx-doc-schema.md`](docs/schemas/fxdx-doc-schema.md) file, 
   and a `doc-config.json` file which is an input configuration file for the renderer.
2. **Render the documentation site** using the schema. The renderer is an Astro site 
   that uses the `doc-config.json` and `doc-schema.json` files to generate the documentation site.

### Prerequisites
- Node.js 
- Pnpm

### Installation

1. Clone the repository
2. Install dependencies
```bash
pnpm install
```
3. Build the project
```bash
pnpm build

# build cli
pnpm build-cli
```

### Running the tests
```bash
pnpm test
pnpm e2e
```

### Development Workflow
```bash
flexydox -c ./fixtures/chess-game/flexydox.yaml build

# it should generate the doc-schema.json and doc-config.json in the ./_docs folder.

# Run the documentation site
pnpm dev # It will run `dev` script from `packages/renderer/package.json` 
# It will start the astro server at http://localhost:4321
# Renderer needs to have FXDX_DOC_CONFIG_FILE env variable set 
# to the path of the generated doc-config.json file.
 

```




### Project Structure

TBD: Describe the project structure and the main components of the project.


### Contributing
New contributors welcome! Check out our See [Contributors Guide](CONTRIBUTING.md) for help getting started.


## Credits

Flexydox is built on top of the following open-source projects:

- [astro](https://docs.astro.build/) - Used for rendering the documentation site.
- [commander](https://github.com/tj/commander.js) - Used for building the CLI.
- [open-props](https://open-props.style/) - Used for CSS styling.
- [GraphQL](https://graphql.org/) - Used for parsing GraphQL schemas.
- [@readme/openapi-parser](https://apitools.dev/swagger-parser/) - Used for parsing OpenAPI schemas.
  
and many more.

## Get help

- [GitHub Discussions](https://github.com/flexydox/flexydox/discussions)
