# Project
## Technologies used
1. DevContainer (TODO: Add more info about)
2. Gorm
3. Postgres
4. Gqlgen
5. Graphql
6. Grpc
7. Protobuf

# TODO
Need more detailed information

Commands to execute in devcontainer container, if has some change in proto files:

`
$ protoc --go_out=microservices/account/pb --go-grpc_out=microservices/account/pb microservices/**/protobufs/**/*.proto
`
