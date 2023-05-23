#!/usr/bin/env bash
set -e

GENERATED_OUTPUT_PATH=_generated

echo "Accessing protobuf's folder..."
cd "shared/protobufs"

echo "Cleaning generated protobufs..."
rm -rf $(realpath ./_generated/*)

echo "Generating generated protobufs..."
protoc \
    --go_out=$GENERATED_OUTPUT_PATH \
    --go-grpc_out=$GENERATED_OUTPUT_PATH \
    --go_opt=paths=source_relative \
    --go-grpc_opt=paths=source_relative \
    $(find . -name "*.proto")