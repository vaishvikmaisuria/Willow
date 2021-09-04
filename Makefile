build :
	docker-compose up --build

down :
	docker-compose down --remove-orphans

run : 
	docker-compose up

test :
	docker-compose up -d
	docker-compose run willow npm test
	docker-compose run willow_api npm test
	docker-compose down

prettier :
	cd willow && npx prettier --write .
	cd willow_api && npx prettier --write .

clean: 
	docker system prune 