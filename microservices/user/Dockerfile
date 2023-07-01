FROM golang:1.20-alpine3.18 AS builder

# RUN apk --no-cache add gcc g++ make ca-certificates
WORKDIR /go/src
ADD . /go/src/

COPY go.mod go.sum ./

COPY providers .
COPY shared .

# Copy files from main folder
COPY microservices/user .

RUN go mod download

RUN GO111MODULE=on go build -o /go/src/ ./cmd/main.go

# Build the final environment for deploy go app
FROM alpine:3.18

WORKDIR /usr/bin

COPY --from=builder /go/src/main ./

EXPOSE ${USER_SERVICE_PORT}

ENTRYPOINT ["./main"]