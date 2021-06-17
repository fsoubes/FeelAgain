#!/bin/bash

echo Which Database you want to dump and copy to the cloud ?
read DB
echo Enter your password to connect ssh?
read -s PASSWORD

mongodump --db $DB --gzip --archive=$DB.archive
sudo sshpass -p $PASSWORD scp -r $DB.archive root@138.197.178.39:~/mongo
sudo sudo sshpass -p $PASSWORD  ssh root@138.197.178.39 "cd mongo && dokku mongo:import feelagain_mongo < $DB.archive"
# sudo sshpass -p $PASSWORD  sudo ssh root@138.197.178.39 "dokku mongo:connect feelagain_mongo && db.getCollectionNames().forEach(c=>db[c].drop()) && exit"
