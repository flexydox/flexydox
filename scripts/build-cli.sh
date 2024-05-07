#!/bin/bash
CLI_DIR=./dist/cli
ASTRO_SOURCE_DIR=./packages/renderer
ASTRO_OUTPUT_DIR=$CLI_DIR/astro

rm -rf $CLI_DIR


pnpm turbo build
pnpm deploy --filter=cli $CLI_DIR
mkdir -p $ASTRO_OUTPUT_DIR
cp -R $ASTRO_SOURCE_DIR/src $ASTRO_OUTPUT_DIR
cp -R $ASTRO_SOURCE_DIR/public $ASTRO_OUTPUT_DIR
cp -R $ASTRO_SOURCE_DIR/package.json $ASTRO_OUTPUT_DIR/package.json
cp -R $ASTRO_SOURCE_DIR/postcss.config.cjs $ASTRO_OUTPUT_DIR/postcss.config.cjs
pushd $CLI_DIR
echo "Unlinking @flexydox/cli"
pnpm uninstall --global @flexydox/cli
echo "Linking @flexydox/cli"
pnpm link --global
popd
