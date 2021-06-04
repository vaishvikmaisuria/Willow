FROM golang:latest

ENV GO111MODULE=on
ENV GOFLAGS=-mod=vendor
RUN mkdir -p /go/src/willow_api

WORKDIR /go/src/willow_api
COPY . /go/src/willow_api

RUN go install willow_api

CMD /go/bin/willow_api

EXPOSE 8080