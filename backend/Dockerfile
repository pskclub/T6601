FROM golang:1.20.0-alpine3.16

RUN apk update && apk upgrade && \
apk add --no-cache bash git openssh
RUN apk add build-base

WORKDIR /app

ADD go.mod go.sum /app/
RUN go mod download
ADD . /app/

RUN go build -o main

FROM alpine:3.16
COPY --from=0 /app/main /main
CMD ./main
