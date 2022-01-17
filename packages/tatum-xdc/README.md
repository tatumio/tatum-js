## XinFin (XDC) - List of features

#### Blockchain

| **Category**   | Function                        | Description                                       |
| -------------- | ------------------------------- | ------------------------------------------------- |
| _Account_      | **getBlockchainAccountBalance** | Returns XDC blockchain account balance.           |
|                | **getAccountErc20Balance**      | Returns ERC20 account balance.                    |
| _Block_        | **getBlock**                    | Get blockchain block by hash or block number.     |
|                | **getCurrentBlock**             | Returns information about XDC blockchain.         |
| _Transactions_ | **getTransaction**              | Returns transaction by hash from XDC blockchain.  |
|                | **getTransactionsCount**        | Returns count of transactions for XDC blockchain. |
|                | **estimateGas**                 | Returns estimate gas for XDC blockchain.          |
| _Broadcast_    | **postBroadcast**               | Returns transaction by hash from XDC blockchain.  |

#### NFT (ERC-721)

| **Category**      | Function                   | Description                                                          |
| ----------------- | -------------------------- | -------------------------------------------------------------------- |
| _Token operation_ | **mintNFT**                | Mint new NFT token with metadata stored on the IPFS.                 |
|                   | **deployNFT**              | Deploy new NFT smart contract, which will be used for later minting. |
|                   | **createNFT**              | Create new NFT token.                                                |
|                   | **mintNFTWithUri**         | Mint new NFT token.                                                  |
|                   | **mintMultipleNFTWithUri** | Mint multiple new NFT tokens.                                        |
|                   | **burnNFT**                | Burn new NFT token. Token will no longer exists.                     |
|                   | **transferNFT**            | Transfer new NFT token to new recipient.                             |
