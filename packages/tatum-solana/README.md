## Solana - List of features

#### Blockchain

| **Category**   | Function              | Description                                         |
| -------------- | --------------------- | --------------------------------------------------- |
| _Account_      | **getAccountBalance** | Returns Solana blockchain account balance.          |
| _Block_        | **getBlock**          | Get blockchain block by hash or block number.       |
|                | **getCurrentBlock**   | Returns information about Solana blockchain.        |
| _Transactions_ | **getTransaction**    | Returns transaction by hash from Solana blockchain. |
| _Broadcast_    | **postBroadcast**     | Returns transaction by hash from Solana blockchain. |

#### NFT (ERC-721)

| **Category**        | Function                        | Description                                                                                        |
| ------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------- |
| _Token operation_   | **mintNFT**                     | Mint new NFT token with metadata stored on the IPFS.                                               |
|                     | **transferNFT**                 | Transfer new NFT token to new recipient.                                                           |
| _Token information_ | **getNFTImage**                 | Get IPFS image URL from the NFT with the IPFS Metadata scheme. URL                                 |
|                     | **getNFTTransactionsByToken**   | Get NFT transactions by token. This includes incoming and outgoing transactions for the token.     |
|                     | **getNFTTransactionsByAddress** | Get NFT transactions by address. This includes incoming and outgoing transactions for the address. |
|                     | **getNFTMetadataURI**           | Get NFT URI metadata.                                                                              |
|                     | **getNFTRoyalty**               | Get Multi Tokens on Account. Returns tokenIDs of tokens Account holds.                             |
