#!/usr/bin/env bash
set -e

GRAPHQL_FOLDER=microservices/graphql

echo "Accessing graphql's folder..."
cd $GRAPHQL_FOLDER

echo "Generating graphql files..."
go generate ./...

echo "Complete"
