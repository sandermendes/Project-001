FROM golang:1.20-alpine3.18 AS builder

WORKDIR /go/src
ADD . /go/src/

COPY go.mod go.sum ./

COPY providers .
COPY shared .

# Copy files from main folder
COPY microservices/graphql .

RUN go mod download

RUN GO111MODULE=on go build -o /go/src/ ./cmd/main.go

# Generate a set of keys for JWT tasks
FROM nginx:1.25.1-alpine as generator-key

RUN apk update && \
    apk add --no-cache openssl && \
    openssl genrsa -out /etc/ssl/private.pem 2048 && \
    openssl rsa -in /etc/ssl/private.pem -outform PEM -pubout -out /etc/ssl/public.pem

# Build the final environment for deploy go app
FROM alpine:3.18

WORKDIR /usr/bin

COPY --from=builder /go/src .
# COPY --from=generator-key /etc/ssl/private.pem /etc/ssl/public.pem ./

EXPOSE ${GRAPHQL_PUBLIC_SERVICE_PORT}

ENTRYPOINT ["./main"]