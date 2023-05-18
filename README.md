# Project
## Technologies used
1. Gorm
2. Postgres
3. Gqlgen
4. Graphql
5. Grpc
6. Protobuf

# TODO
Need more detailed information

Commands to execute in devcontainer container, if has some change in proto files:

`
$ protoc --go_out=microservices/account/pb --go-grpc_out=microservices/account/pb microservices/**/protobufs/**/*.proto
`
