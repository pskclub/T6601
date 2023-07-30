start:
	docker-compose up -d

start-build:
	docker-compose up -d --build

stop:
	docker-compose down

restart:
	make stop && make start

restart-build:
	make stop && make start-build

dev:
	air

run:
	go run main.go

install:
	go get

logs:
	 docker logs -f api

migrate:
	docker-compose up -d --build migration

test:
	go test ./...
