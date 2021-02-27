#!/bin/bash

echo What should the version be?
read VERSION

docker build -t fsoweb/profsoweb:$VERSION .
docker push fsoweb/profsoweb:$VERSION
ssh root@46.101.195.84 "docker pull fsoweb/profsoweb:$VERSION && docker tag fsoweb/profsoweb:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"

