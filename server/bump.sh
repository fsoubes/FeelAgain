#!/bin/bash

source /etc/environment
echo Which Database you want to dump and copy to the cloud ?
read DB

sudo sshpass -p $PASSWORD_FEELAGAIN  sudo ssh root@$IP_FEELAGAIN "dokku mongo:connect feelagain_mongo <<EOF
    db.getCollectionNames().forEach(c=>db[c].drop())
EOF"
mongodump --db $DB --gzip --archive=$DB.archive
sudo sshpass -p $PASSWORD_FEELAGAIN scp -r $DB.archive root@$IP_FEELAGAIN:~/mongo
sudo sudo sshpass -p $PASSWORD_FEELAGAIN  ssh root@$IP_FEELAGAIN "cd mongo && dokku mongo:import feelagain_mongo < $DB.archive"
