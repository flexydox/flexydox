# Flexydox

 Create a **unified documentation** for your API Services effortlessly by combining Open API (Rest API) or GraphQL specification files and custom markdown files using a user-friendly YAML config file.

1. Given this example config `./fixtures/chess-game/flexydox.yaml`: 

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
    inferGroups: false

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

3. Flexydox will generate this example API documentation:

[http://examples.flexydox.org/chess](http://examples.flexydox.org/chess)



## Web

https://flexydox.org


## Features
- One **unified documentation** for multiple APIs - Open API, GraphQL (support for gRPC and tRPC is planned)
- **Custom markdown pages** (User Guide, FAQ, Authentication, ..)
- **Custom example requests** for operations.
- Concept of **groups** (domains) allows to logically group operations and types across APIs.

## [Usage](./docs/usage.md).

## [Roadmap](./docs/roadmap.md)

## [Core Concepts](./docs/core-concepts.md)

## [Configuration](./docs/configuration.md)


## [CLI](./docs/cli.md)




## Development



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
