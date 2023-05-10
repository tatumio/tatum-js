# RPC
All RPC calls are implemented in the `tatum.rpc.*` submodule.

See the [RPC API Reference](https://docs.tatum.com/docs/rpc-api-reference) for more about supported chains and methods.

## Load Balancer

Load balancer is used managing RPC calls to nodes in a blockchain network.
It maintains a list of available nodes and their status, and it automatically selects the most responsive node for subsequent RPC calls.

> **_For use of the Load Balancer, you need to know how it is working!._**  Load Balancer works automatically in the background and selects the most responsive node for subsequent RPC calls. You can use the SDK without any knowledge of the Load Balancer.

Load Balancer implementation is available in [LoadBalancerRpc.ts](https://github.com/tatumio/tatum-js/blob/master/src/service/rpc/generic/LoadBalancerRpc.ts)

Using a load balancer to distribute traffic across multiple nodes, as opposed to routing all traffic to a single node, has several advantages:

- **Improved Performance and Responsiveness:** Load balancers can distribute network or application traffic across several servers, which can help prevent any single server from becoming a bottleneck. As a result, users often experience faster response times.

- **Scalability:** Load balancers enable you to handle larger amounts of traffic by simply adding more servers to the pool. This makes it easier to scale your infrastructure as your needs grow.

- **Redundancy and High Availability:** If a server goes down, a load balancer can automatically reroute traffic to the remaining online servers. This ensures that your service remains available even in the face of hardware failures or other issues.

- **Prevents Overloading of Nodes:** Load balancers can prevent any single server from being overloaded with too many requests, which can degrade the performance of the server and impact user experience.

- **Efficient Use of Resources:** By distributing the load, you can make sure that all your servers are being used efficiently, rather than having some servers idle while others are overloaded.

- **Flexibility and Maintenance:** With a load balancer, you can take servers offline for maintenance without disrupting service. The load balancer will simply stop sending traffic to the offline server.

- **Better User Experience:** Ultimately, all of these benefits can lead to a better user experience, with faster response times and higher availability of services.

### Initialization
At start the Load Balancer is initialized with a list of nodes. List of nodes are dynamically fetched from the remote server.
There is also option to pass your custom list of nodes instead of the dynamic list.
From the list of the nodes is randomly selected one node as a primary node, which is kept as a primary node until first load balancing is performed.
The Load Balancer maintain lists of two types of nodes, normal and archive nodes.


### Load Balancing
The load balancing process is running in the background and every minute it checks the status of all nodes in the list.
The status of each node is determined by making a request to the node's URL and checking the response.
The fastest responding node in each category is then selected as the active node for that normal and archive category.
The selected nodes are then used for subsequent RPC calls.

### Error Handling
If a RPC call fails, failure is logged, and the current active node is marked as failed, and load balancer selects a new active node.

### Destroy
When you need to stop load balancer, you should can call `destroy` method. This method stops the load balancing process on the background.

### List of nodes
The list of nodes is dynamically fetched from the remote server and it is defined for every blockchain.

```
https://rpc.tatum.com/${network}/list.json
```
Networks enum is available in the [Network.ts](https://github.com/tatumio/tatum-js/blob/master/src/dto/Network.ts)

For instance if we will need Bitcoin mainnet nodes, we will use this URL:

```
curl https://rpc.tatum.com/bitcoin-mainnet/list.json
```

The response is a list of nodes with their url, type (0 - normal, 1 - archive) and location.

```json
[
  {
    "location": "Sydney",
    "type": 0,
    "url": "https://02-sydney-007-01.rpc.tatum.com./"
  },
  {
    "location": "Tokyo",
    "type": 0,
    "url": "https://02-tokyo-007-02.rpc.tatum.com./"
  },
  {
    "location": "Dallas",
    "type": 0,
    "url": "https://02-dallas-007-03.rpc.tatum.com./"
  },
  {
    "location": "Sao Paulo",
    "type": 0,
    "url": "https://02-saopaulo-007-04.rpc.tatum.com./"
  },
  {
    "location": "Warsaw",
    "type": 0,
    "url": "https://01-warsaw-007-05.rpc.tatum.com./"
  }
]
```
Load Balancer selects from this list the most responsive node.


## Usage

### Default config

```typescript
const tatum = await TatumSDK.init<Ethereum>({ network: Network.ETHEREUM })
const info = await tatum.rpc.chainId()
tatum.rpc.destroy()
```

### Custom RPC node list

```typescript
const tatum = await TatumSDK.init<Ethereum>({
  network: Network.ETHEREUM,
  rpc: {
    nodes: [
      {
        url: 'https://api.tatum.io/v3/blockchain/node/ethereum-mainnet',
        type: NodeType.Normal,
      },
    ],
    allowedBlocksBehind: 20,
    oneTimeLoadBalancing: false
  }
})
const info = await tatum.rpc.chainId()
tatum.rpc.destroy()
```
