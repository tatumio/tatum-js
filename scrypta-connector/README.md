# Run Scrypta Docker

Run bash script to run mainnet idanode:
```
bash docker/docker.sh
```

Or use `-testnet` flag to run in testnet mode:
```
bash docker/docker.sh -testnet
```

If you want to rebuild the docker image pass `-rebuild` flag:
```
bash docker/docker.sh -rebuild
```

# Bootstrap blockchain and idanode (only for mainnet)

```
docker exec -it -w /opt/ idanode bash bootstrap_blockchain.sh
docker exec -it -w /opt/ idanode bash bootstrap_idanode.sh
```
