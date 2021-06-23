#!/bin/bash

echo What should the version be?
read VERSION
echo Enter your password to connect ssh?
read -s PASSWORD

sudo docker build -t fsoweb/profsoweb:$VERSION .
sudo docker push fsoweb/profsoweb:$VERSION
sudo sudo sshpass -p $PASSWORD ssh root@138.197.178.39 "docker pull fsoweb/profsoweb:$VERSION && docker tag fsoweb/profsoweb:$VERSION dokku/api:$VERSION && dokku deploy api $VERSION"

