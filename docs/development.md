# Development

## Architecture Overview
Flexydox splits the api generation process into two main parts:
1. **Create a unified documentation schema** from the input configuration file which defines the api sources, custom pages, categories, and examples.
   It will generate a `doc-schema.json` file, which schema is documented in the [`./docs/schemas/fxdx-doc-schema.md`](./schemas/fxdx-doc-schema.md) file, 
   and a `doc-config.json` file which is an input configuration file for the renderer.
2. **Render the documentation site** using the schema. The renderer is an Astro site 
   that uses the `doc-config.json` and `doc-schema.json` files to generate the documentation site.

## Prerequisites
- Node.js 
- Pnpm

## Installation

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

## Running the tests
```bash
pnpm test
pnpm e2e
```

## Development Workflow
```bash
flexydox -c ./fixtures/chess-game/flexydox.yaml build

# it should generate the doc-schema.json and doc-config.json in the ./_docs folder.

# Run the documentation site
pnpm dev # It will run `dev` script from `packages/renderer/package.json` 
# It will start the astro server at http://localhost:4321
# Renderer needs to have FXDX_DOC_CONFIG_FILE env variable set 
# to the path of the generated doc-config.json file.
 

```




## Project Structure

### Files and Directories

- `docs` - Flexydox documentation 
- `examples` - Example configurations and assets to showcase Flexydox features 
- `packages/*` - All libraries and application go here
- `packages/cli` - Flexydox cli application
- `packages/cli-e2e` - E2E tests for the cli app
- `packages/doc-provider` - Parses API schemas and generates [unified DocSchema][schema].
- `packages/doc-schema` - Shared Typescript types
- `packages/logger` - logger library
- `packages/renderer` - Astro site which renders a static documentation website from [DocSchema][schema].
- `schemas` - JSON schemas to support the auto-completion in the configuration files. 
- `script` - Scripts to help with the development process
- Dockerfile - Dockerfile to build the project


[schema]: ./schemas/fxdx-doc-schema.md
