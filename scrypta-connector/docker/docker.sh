#!/bin/bash

cd docker
if [[ "$@" =~ "-rebuild" ]]
then
    echo "Rebuilding Docker Image"
    docker build --no-cache -t scrypta:idanode .
else
    docker build -t scrypta:idanode .
fi

if [[ "$@" =~ "-testnet" ]]
then
    echo "Running Scrypta IdaNode inside Docker, in testnet mode."
    docker run --restart=unless-stopped -d --name=idanode_testnet -dit -p 4001:3001 scrypta:idanode -testnet
else
    echo "Running Scrypta IdaNode inside Docker, in mainnet mode."
    docker run --restart=unless-stopped -d --name=idanode -dit -p 3001:3001 scrypta:idanode
    docker exec -it -w /opt/ idanode bash bootstrap_blockchain.sh
    docker exec -it -w /opt/ idanode bash bootstrap_idanode.sh
    docker restart idanode
fi