# Configuration
Flexydox uses a yaml configuration file to define the generated documentation.

## Configuration file example

```yaml
# Flexydox configuration file
# yaml-language-server $schema points to the schema file for 
# this configuration file, so you can use autocompletion and validation in your editor.
# yaml-language-server: $schema=https://raw.githubusercontent.com/flexydox/flexydox/main/schemas/fxdx-cli-config.json
# where to save the generated documentation
outputFolder: /docs 
# base url path prefix for the generated documentation
base: /chess 
# base host for the generated documentation
site: https://examples.flexydox.com
# title displayed in the header of the generated documentation
title: Chess Game API Example
# brand logo displayed in the header of the generated documentation
logo:
  url: ./logo.svg # logo file path / url
  width: 100 # logo width in pixels
  height: 100 # logo height in pixels
# apis to generate documentation for 
apis:
    # unique id of the api
  - id: openapi
    # name of the api
    name: Chess Game OpenAPI 3.0
    # file path / url to the api schema file
    url: ./schemas/chess-game-30.json
    # infer groups from openapi tags
    inferGroups: false 
  - id: graphql 
    name: Chess Game GraphQL API 
    url: ./schemas/chess-game-schema.graphql 
    
  
# custom pages folder path
customPagesFolder: ./custom-pages
# usage examples folder path
examplesFolder: ./usage-examples
# groups configuration
groups:
    # group name
  - name: Player
    # regex to match operations and types 
    regex: /player|move/i
  - name: Game
    regex: /game/i
  - name: Admin
    regex: /admin/i



```

You can see the full schema of the configuration file [here](./schemas/fxdx-cli-config.md).


## Groups

Groups are used to logically group operations and types across APIs. You can define groups in the configuration file using the `groups` key. Each group has a name and a regex to match operations and types.

You can use the `inferGroups` key in the API configuration to automatically infer groups from OpenAPI tags.


## Custom pages

Custom pages are used to add additional documentation pages to the generated documentation. You can define custom pages in the configuration file using the `customPagesFolder` key. Each markdown file in the custom pages folder will be rendered as a separate page in the generated documentation. Pages are sorted alphabetically by file name so you can prefix the file names with numbers to control the order of the pages.

### Custom page front matter

Each custom page markdown file can have front matter to define the title and slug of the page. 

Slug is used to generate the URL of the page.
Title is displayed in the header of the page.

```markdown
---
slug: overview
title: Overview
---

Markdown content goes here

```




## Example requests 

Example requests are used to generate example sections in the documentation. Examples for OpenAPI and GraphQL services are supported. 

We choose to use the `.http` file format for OpenAPI example requests and `.graphql` file format for GraphQL example requests. This decision was made to enable to run the example requests as tests in the future.


### OpenAPI Example requests


OpenAPI example requests are defined in `.http` files with front matter in the `examplesFolder/openapi` folder. 

Example request file structure:

```http
---
title: Create player example
description: Creates a player with minimal input provided
---
POST /players
X-Custom-Header: custom-header-value

{ "format": "json", "data": { "name": "Bob" } },

```

#### Front matter (OpenAPI)
| Field | Description |
| --- | --- |
| title | Title of the example request |
| description | Description of the example request |

Front matter is used to define the title and description of the example request which will be displayed in the documentation.

Http request is defined in the following format:

```http
METHOD /path
header1: value1
header2: value2
<empty line>

optional request body
```

#### `.shared.yaml` OpenAPI file

You can define shared variables in the `.shared.yaml` file in the `examplesFolder/openapi` folder. These variables will be available in all example requests files.

```yaml
headers:
  Content-type: application/json
  Authorization: Bearer <YOUR TOKEN>
```

### GraphQL Example requests

GraphQL example requests are defined in `.graphql` files with front matter in the `examplesFolder/graphql` folder.

Example request file structure:

```graphql
---
title: New game
description: Creates a chess game with minimal input provided
headers:
  X-CustomHeader: custom-header-value
---
mutation newGame {
  newGame(input: { whitePlayerId: "1", blackPlayerId: "2"}) {
    id
    startedAt
    movesCount
  }
}
```
#### Front matter (GraphQL)
| Field | Description |
| --- | --- |
| title | Title of the example request |
| description | Description of the example request |
| headers | Headers for the request |


#### `.shared.yaml` GraphQL file

You can define shared variables in the `.shared.yaml` file in the `examplesFolder/graphql` folder. These variables will be available in all example requests files.

```yaml
method: POST
headers:
  Content-type: application/json
  Authorization: Bearer <YOUR TOKEN>
```
