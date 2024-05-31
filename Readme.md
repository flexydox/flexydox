# Flexydox

 Create a **unified documentation** for your API Services effortlessly by combining Open API (Rest API) or GraphQL specification files and custom markdown files using a user-friendly YAML config file.

1. Given this config `./fixtures/chess-game/flexydox.yaml`: 

```yaml
outputFolder: ./_docs                 # Generated documentation output folder (required)
title: Chess Game API Example         # Generated doc title (required)
logo:                                 # Generated doc logo (optional)
  url: ./fixtures/logos/logo.svg     
  width: 100
  height: 100
apis:                                 # API definitions (optional)
  - id: graphql
    name: Chess Game GraphQL API
    url: ./fixtures/chess-game/schemas/chess-game-schema.graphql

  - id: openapi
    name: Chess Game OpenAPI 3.0
    url: ./fixtures/chess-game/schemas/chess-game-30.json 

customPagesFolder: ./fixtures/chess-game/custom-pages  # custom markdown files folder (optional)
examplesFolder: ./fixtures/chess-game/examples         # operation examples folder (optional)
groups:                              # Group defines a logical categorization of operation or type
  - name: Player                     # Create a group player
    regex: /player|move/i            # and assign to it any type or operation name matching regex 
  - name: Game
    regex: /game/i
  - name: Admin
    regex: /admin/i
```

2. By running flexydox generator
```bash
flexydox -c ./fixtures/chess-game/flexydox.yaml
```

3. It will generate this example API documentation:

[Example API Doc](http://fxdx-chess.s3-website.eu-central-1.amazonaws.com/doc/overview/)





## Web

https://flexydox.org


## Features
- One unified generator for multiple APIs - Open API, GraphQL (we plan to add gRPC and tRPC in near future).
- Custom markdown pages
- Logical view - concept of groups (domains) allows to logically group operations and types across APIs.
- Possibility to assign operations or types to a group using regex pattern matching
- Read / modify / subscribe concept - list operations by intended usage
- Technical view - filter operations by API Service


## Getting Started

TODO: 

### Docker




```bash



docker run -it --mount type=bind,source=https://github.com/flexydox/flexydox/tree/main/fixtures/chess-game,target=/app/fixtures flexydox/flexydox bash


```





## Configuration Reference



## Development

### Project Structure

### Contributing



## Credits

## Get help

- [GitHub Discussions](https://github.com/flexydox/flexydox/discussions)
