build :
	docker-compose up --build

down :
	docker-compose down --remove-orphans

run : 
	docker-compose up

test :
	docker-compose up -d
	docker-compose run consumesniffle npm test
	docker-compose run pricesniffle npm test
	docker-compose run sniffle npm test
	docker-compose down


prettier :
	cd consumesniffle && npx prettier --write .
	cd pricesniffle && npx prettier --write .
	cd sniffle && npx prettier --write .

clean: 
	docker system prune 