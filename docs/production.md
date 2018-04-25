## Running Project in Production

There are just a few steps needed to bootstrap this project into production. First, you will need to define a [Docker network](https://docs.docker.com/network/bridge/#connect-a-container-to-a-user-defined-bridge) where your microservices will run:

```bash
docker network create digituz
```

Then, you will need to create a MongoDB instance to hold your data:

```bash
docker run --name brand-house-db \
  -p 27017:27017 \
  --network digituz \
  -d mongo
```

After that, you can start creating the RestFlex servers:

```bash
run_rest_flex () {
  docker run --name $1-api \
    -e "DOMAIN=$1" \
    -e "MONGODB_URL=brand-house-db:27017/$1" \
    -e "AUTH0_DOMAIN=digituz-corp.auth0.com" \
    -e "AUTH0_AUDIENCE=https://$1.digituz.com.br" \
    --network digituz_digituz \
    -d digituz/rest-flex
}

run_rest_flex projects
run_rest_flex companies
run_rest_flex project-stages
```

> **Note:** [You will need to create Auth0 APIs to represent these RestFlex servers](./create-entity.md).

Lastly, you can bootstrap this project inside a Docker container:

```bash
docker run --name brand-house \
  --network digituz \
  -d digituz/brand-house
```
