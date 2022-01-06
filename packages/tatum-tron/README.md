## Tron - List of features

#### Blockchain

| **Category**   | Function            | Description                                       |
| -------------- | ------------------- | ------------------------------------------------- |
| _Account_      | **getAccount**      | Get Tron account by address.                      |
|                | **getTrc10Detail**  | Get Tron TRC10 token details.                     |
| _Block_        | **getBlock**        | Get blockchain block by hash or block number.     |
|                | **getCurrentBlock** | Returns information about Tron blockchain.        |
| _Transactions_ | **getTransaction**  | Returns transaction by hash from Tron blockchain. |
| _Broadcast_    | **postBroadcast**   | Returns transaction by hash from Tron blockchain. |

#### Multitoken (ERC-1155)

| **Category**      | Function               | Description                                       |
| ----------------- | ---------------------- | ------------------------------------------------- |
| _Token operation_ | **AddMultiTokenMinte** | Add new minter to the MultiToken (1155) contract. |

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
|                     | **AddNFTMinter**           | Add new minter to the NFT contract transaction.                        |
| _Token information_ | **getNFTImage**            | Get IPFS image URL from the NFT with the IPFS Metadata scheme. URL     |
|                     | **getNFTContractAddress**  | Get NFT Contract address.                                              |
|                     | **getNFTMetadataURI**      | Get NFT URI metadata.                                                  |
|                     | **getNFTRoyalty**          | Get Multi Tokens on Account. Returns tokenIDs of tokens Account holds. |
