## Flow - List of features

#### Blockchain

| **Category**   | Function            | Description                                       |
| -------------- | ------------------- | ------------------------------------------------- |
| _Account_      | **signWithKey**     | Sing with Flow key.                               |
|                | **getSignKey**      | Returns sign Flow key.                            |
|                | **getAccount**      | Returns ERC20 account address.                    |
| _Block_        | **getBlock**        | Get blockchain block by hash or block number.     |
|                | **getCurrentBlock** | Returns information about Flow blockchain.        |
| _Transactions_ | **getTransaction**  | Returns transaction by hash from Flow blockchain. |
| _Broadcast_    | **broadcastTx**     | Returns transaction by hash from blockchain.      |

#### NFT (ERC-721)

| **Category**        | Function                   | Description                                                            |
| ------------------- | -------------------------- | ---------------------------------------------------------------------- |
| _Token operation_   | **mintNFT**                | Mint new NFT token with metadata stored on the IPFS.                   |
|                     | **deployNFT**              | Deploy new NFT smart contract, which will be used for later minting.   |
|                     | **createNFT**              | Create new NFT token.                                                  |
|                     | **mintNFTWithUri**         | Mint new NFT token.                                                    |
|                     | **mintMultipleNFTWithUri** | Mint multiple new NFT tokens.                                          |
|                     | **burnNFT**                | Burn new NFT token. Token will no longer exists.                       |
|                     | **transferNFT**            | Transfer new NFT token to new recipient.                               |
| _Token information_ | **getNFTImage**            | Get IPFS image URL from the NFT with the IPFS Metadata scheme. URL     |
|                     | **getNFTsByAddress**       | Get NFTs by address.                                                   |
|                     | **getNFTMetadataURI**      | Get NFT URI metadata.                                                  |
|                     | **getNFTRoyalty**          | Get Multi Tokens on Account. Returns tokenIDs of tokens Account holds. |
