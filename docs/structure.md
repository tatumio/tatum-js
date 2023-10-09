## Structure of the SDK

TatumSDK is thoughtfully designed and organized into these submodules to provide a clean and efficient way of interacting with blockchains:

* **[RPC submodule](https://github.com/tatumio/tatum-js/blob/master/docs/rpc.md) - `tatum.rpc.*`**: This submodule enables you to make direct Remote Procedure Call (RPC) calls to multiple blockchains, providing seamless access to various on-chain data and functionalities. With the RPC submodule, you can fetch account balances, send transactions, interact with smart contracts, and more. RPC submodule is using load balancer to select the most responsive node from the list of nodes.

* **Notification submodule - `tatum.notification.*`**: This submodule allows you to subscribe to real-time notifications for a wide range of events related to specified blockchain addresses. By leveraging the notification submodule, you can effortlessly track incoming and outgoing transactions, NFT transfers, and other events without constantly polling the blockchain.

* **NFT submodule - `tatum.nft.*`**: This submodule offers a comprehensive suite of tools for working with Non-Fungible Tokens (NFTs). With the NFT submodule, you can query the balance of NFTs on an address, retrieve NFT transactions associated with a specific address, explore NFTs within a collection or identify the owners of a particular NFT.

* **Address submodule - `tatum.address.*`**: This submodule simplifies wallet management across multiple blockchains by allowing you to fetch wallet balances and retrieve transactions for a given address. With the Address submodule, you can easily manage your wallets and monitor transactions, making your blockchain application development more efficient and user-friendly.

* **Wallet Provider submodule - `tatum.walletProvider.*`**: This submodule enables seamless interaction with external wallets like Metamask or Phantom within the browser. The Wallet Provider submodule allows the SDK to communicate with various wallet providers, streamlining the process of signing transactions, querying account balances, and interacting with smart contracts directly through popular browser wallets.

* **Rate Exchange submodule - `tatum.rates.*`**: This submodule enables allows you to easily obtain exchange rates for fiat/crypto.

* **Faucet submodule - `tatum.faucet.*`**: This submodule allows you to get testnet faucet funds for all supported chains (http://faucets.tatum.io).

By dividing the library into these submodules, TatumSDK offers an organized, easy-to-use interface that makes interacting with Ethereum and other blockchains a breeze. Both beginners and advanced developers can benefit from the streamlined architecture, enabling them to focus on building powerful blockchain applications.
