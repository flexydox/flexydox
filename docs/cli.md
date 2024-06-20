# CLI

Flexydox CLI is a command line tool for generating documentation. 

## Usage

```bash
Usage: flexydox [options] [command]

Flexydox CLI

Options:
  -V, --version        output the version number
  -c, --config <path>  Path to the config file
  -v, --verbose        Verbose mode
  -vv, --very-verbose  Very verbose mode
  -h, --help           display help for command

Commands:
  build                Build documentation
  build-schema         Build schema json file only
  preview              Build and preview documentation
  help [command]       display help for command
```

## Commands

### `flexydox build`

It will create a schema file and generate the static documentation website.

#### Example

```bash
flexydox build -c ./config.yaml
```

### `flexydox build-schema`

It will create a schema file only and skip the website generation.

#### Example

```bash
flexydox build-schema -c ./config.yaml
```

### `flexydox preview`

It will create a schema file and generate the static documentation website. It will also start a local server to preview the documentation.

#### Example

```bash
flexydox preview -c ./config.yaml
```

