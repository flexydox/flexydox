# Core Concepts

## Overview

Flexydox is a tool for generating documentation for APIs. 

## Features

- One **unified documentation** for multiple APIs - Open API, GraphQL (support for gRPC and tRPC is planned)
- **Custom markdown pages** (User Guide, FAQ, Authentication, ..)
- **Custom example requests** for operations.
- Concept of **groups** (domains) allows to logically group operations and types across APIs.

## Concepts

Flexydox generator is split into two main parts:

1. **DocProvider** - reads the API specification files (currently OpenAPI, GraphQL) and creates an [universal schema][schema] of the API. All the generated schemas are then merged into one.
2. **Renderer** - reads the merged schema file and generates the static documentation website. Renderer is using the [Astro][astro] to generate the website.

This separation allows to easily add support for new API types. You can even create a custom renderer to render the documentation, for example, as a PDF file. 

You may also split the documentation into multiple parts and generate and deploy them separately. 
For example, you may create a separate documentation for private and public APIs.



[schema]: ./schemas/fxdx-doc-schema.md
[astro]: https://astro.build/
