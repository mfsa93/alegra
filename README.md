# Alegra Project Setup

This guide outlines the steps to set up the network and services for the Alegra project, including the `warehouse-service`, `kitchen-service`, and `restaurant`.

## Step 1: Create Network

First, create a Docker network named `alegra-net` that will allow the containers to communicate with each other.

```bash
docker network create alegra-net
```

## Step 2: Start Services

Navigate to each service directory and start the services using Docker Compose.

### Warehouse Service
```bash
cd warehouse-service
docker-compose up -d
docker-compose exec warehouse php artisan migrate
docker-compose exec warehouse php artisan db:seed
```
### Kitchen Service

```bash
cd kitchen-service
docker-compose up -d
docker-compose exec kitchen php artisan migrate
docker-compose exec kitchen php artisan db:seed
```

### Restaurant

```bash
cd restaurant
docker-compose up -d
docker-compose exec restaurant php artisan migrate
docker-compose exec restaurant php artisan db:seed
```

## Step 3: Verify the Setup

After completing the setup, you can verify the running containers with the following command:

```bash
docker ps
```


