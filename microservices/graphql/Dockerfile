FROM golang:1.20-alpine3.18 AS build
# RUN apk --no-cache add gcc g++ make ca-certificates
WORKDIR /app
COPY go.mod go.sum ./

# RUN go mod download
# COPY vendor vendor
# COPY account account
# COPY catalog catalog
# COPY order order

# Download all dependencies
# RUN go mod download

COPY ./microservices/graphql ./

RUN GO111MODULE=on go build -o /go/bin/app ./cmd/main.go
# RUN GO111MODULE=on go build /cmd/main.go
# RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o main cmd/main.go

FROM alpine:3.18
WORKDIR /usr/bin
COPY --from=build /go/bin .
EXPOSE 8080
CMD ["app"]

# FROM mcr.microsoft.com/devcontainers/go:0-1.20-bullseye

# # [Optional] Uncomment this section to install additional OS packages.
# # RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
# #     && apt-get -y install --no-install-recommends <your-package-list-here>

# # [Optional] Uncomment the next lines to use go get to install anything else you need
# USER vscode

# # Enforce SSH Url
# RUN git config --global --add url."git@github.com:".insteadOf "https://github.com/"

# # Protoc Compiler
# RUN go install google.golang.org/protobuf/cmd/protoc-gen-go@latest \
#     && go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

# # Protoc
# RUN sudo apt install unzip \
#     && cd /tmp \
#     && wget -O protobuf.zip https://github.com/protocolbuffers/protobuf/releases/download/v23.0/protoc-23.0-linux-x86_64.zip \
#     && unzip protobuf.zip -d protobuf \
#     && sudo mv protobuf /lib \
#     && sudo ln -s /lib/protobuf/bin/protoc /usr/local/bin/protoc
# # USER root

# # [Optional] Uncomment this line to install global node packages.
# # RUN su vscode -c "source /usr/local/share/nvm/nvm.sh && npm install -g <your-package-here>" 2>&1
