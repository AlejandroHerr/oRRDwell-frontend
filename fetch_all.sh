#!/bin/bash
source ../common.sh

if [ ! -f "../config.yaml" ]; then
  exit 1
fi

eval $(parse_yaml "../config.yaml" "config")
if [ ! "$config_modules" ]; then
  exit 1
fi

mods=$config_modules
IFS=',' read -r -a modules <<< "$mods"

mkdir -p ./build/fetch

for module in "${!modules[@]}"; do
  wget http://junkyisland:8080/fetch/${modules[module]} -O ./build/fetch/${modules[module]}
done

wget http://junkyisland:8080/fetch/views -O ./build/fetch/views
