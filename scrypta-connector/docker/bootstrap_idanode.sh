#!/bin/bash

lyra-cli stop
touch /opt/scrypta-idanodejs/.BOOTSTRAPPING
rm idanode_bootstrap.gz
wget https://sfo2.digitaloceanspaces.com/scrypta/idanode_bootstrap.gz
lyra-cli stop
rm -rf /opt/data/idanode
mkdir /opt/data/idanode
tar -xvzf idanode_bootstrap.gz --strip-components 1
sleep 20s
mongod --dbpath=/opt/data/idanode &
mongorestore --db idanodejs --drop idanodejs
sleep 20s
rm -rf idanodejs
lyrad -datadir=/opt/data/lyra &
rm /opt/scrypta-idanodejs/.BOOTSTRAPPING