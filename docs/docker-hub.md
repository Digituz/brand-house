## Updating Image on Docker Hub

Here are some commands to generate a new Docker image and upload to Docker Hub:

```bash
# from the project root
docker build -t digituz/brand-house .

# push it to Docker Hub
docker push digituz/brand-house

docker run --name brand-house \
  --network=digituz_digituz \
  -d digituz/brand-house
```
