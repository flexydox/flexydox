#!/bin/bash

pip install jsonschema2md
jsonschema2md --examples-as-yaml ./schemas/fxdx-cli-config.json ./docs/schemas/fxdx-config.md
jsonschema2md ./schemas/fxdx-doc-schema.json ./docs/schemas/fxdx-doc-schema.md
