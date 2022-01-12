## Algorand (ALGO) - List of features

#### Blockchain

| **Category**   | Function                        | Description                                       |
| -------------- | ------------------------------- | ------------------------------------------------- |
| _Account_      | **getBlockchainAccountBalance** | Returns account balances for a given address.     |
| _Block_        | **getBlock**                    | Get blockchain block by hash or block number.     |
|                | **getCurrentBlock**             | Returns current block.                            |
| _Transactions_ | **getTransaction**              | Returns transaction by hash from Algo blockchain. |
|                | **getTransactionsCount**        | Returns count of transactions.                    |
| _Broadcast_    | **postBroadcast**               | Returns information about Algo blockchain.        |

#### Multitoken (ERC-1155)

| **Category**      | Function               | Description                                                               |
| ----------------- | ---------------------- | ------------------------------------------------------------------------- |
| _Token operation_ | **mintMultiToken**     | Mint a fixed amount of Multi Token.                                       |
|                   | **burnMultiToken**     | Burn a fixed amount of Multi Token.                                       |
|                   | **transferMultiToken** | Transfer a certain amount of Multi Token from account to another account. |

#### NFT (ERC-721)

| **Category**      | Function        | Description                                      |
| ----------------- | --------------- | ------------------------------------------------ |
| _Token operation_ | **deployNFT**   | Create new NFT token.                            |
|                   | **burnNFT**     | Burn new NFT token. Token will no longer exists. |
|                   | **transferNFT** | Transfer new NFT token to new recipient.         |
