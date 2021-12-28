## Harmony (ONE) - List of features

#### Blockchain

| **Category**   | Function                 | Description                                           |
| -------------- | ------------------------ | ----------------------------------------------------- |
| _Account_      | **gettBalance**          | Returns Harmony blockchain account balance.           |
| _Block_        | **getBlock**             | Get blockchain block by hash or block number.         |
|                | **getCurrentBlock**      | Returns information about Harmony blockchain.         |
| _Transactions_ | **getTransaction**       | Returns transaction by hash from Harmony blockchain.  |
|                | **getTransactionsCount** | Returns count of transactions for Harmony blockchain. |
| _Broadcast_    | **postBroadcast**        | Returns transaction by hash from Harmony blockchain.  |

#### Multitoken (ERC-1155)

| **Category**        | Function                         | Description                                                                                                         |
| ------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| _Token operation_   | **deployMultiToken**             | Deploy Multi Token Smart Contract. This method creates new ERC1155 Smart Contract (Multi Tokens) on the blockchain. |
|                     | **mintMultiToken**               | Mint a fixed amount of Multi Token and transfer it to destination account.                                          |
|                     | **mintMultiTokenBatch**          | Create a fixed amount of multiple Multi Tokens Tokens and transfer them to destination account in one transaction.  |
|                     | **burnMultiToken**               | Burn a fixed amount of Multi Tokens by id.                                                                          |
|                     | **burnMultiTokenBatch**          | Burn multiple Multi Token Tokens by id assigned to same address in one transaction.                                 |
|                     | **transferMultiToken**           | Transfer a certain amount of Multi Token from account to another account.                                           |
|                     | **transferMultiTokenBatch**      | Transfer multiple Multi Token from account to another account.                                                      |
|                     | **AddMultiTokenMinter**          | Add Multi Token Minter.                                                                                             |
| _Token information_ | **getMultiTokenContractAddress** | Get Multi Token contract address from deploy transaction.                                                           |
|                     | **getMultiTokensBalance**        | Get Multi Tokens balance on Account.                                                                                |
|                     | **getMultiTokensBatchBalance**   | Get Multi Tokens batch balance on Account.                                                                          |
|                     | **getMultiTokenTransaction**     | Get Multi Token transaction by transaction hash.                                                                    |
|                     | **getMultiTokenMetadata**        | Get Multi Token metadata.                                                                                           |

#### NFT (ERC-721)

| **Category**        | Function                        | Description                                                                                        |
| ------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------- |
| _Token operation_   | **mintNFT**                     | Mint new NFT token with metadata stored on the IPFS.                                               |
|                     | **deployNFT**                   | Deploy new NFT smart contract, which will be used for later minting.                               |
|                     | **createNFT**                   | Create new NFT token.                                                                              |
|                     | **mintNFTWithUri**              | Mint new NFT token.                                                                                |
|                     | **mintMultipleNFTWithUri**      | Mint multiple new NFT tokens.                                                                      |
|                     | **burnNFT**                     | Burn new NFT token. Token will no longer exists.                                                   |
|                     | **transferNFT**                 | Transfer new NFT token to new recipient.                                                           |
|                     | **AddNFTMinter**                | Add new minter to the NFT contract transaction.                                                    |
| _Token information_ | **getNFTImage**                 | Get IPFS image URL from the NFT with the IPFS Metadata scheme. URL                                 |
|                     | **getNFTTransactionsByToken**   | Get NFT transactions by token. This includes incoming and outgoing transactions for the token.     |
|                     | **getNFTTransactionsByAddress** | Get NFT transactions by address. This includes incoming and outgoing transactions for the address. |
|                     | **getNFTProvenanceData**        | Get NFT Provenance data.                                                                           |
|                     | **getNFTContractAddress**       | Get NFT Contract address.                                                                          |
|                     | **getNFTTransaction**           | Get NFT transaction by transaction hash.                                                           |
|                     | **getNFTsByAddress**            | Get NFTs by address.                                                                               |
|                     | **getNFTMetadataURI**           | Get NFT URI metadata.                                                                              |
|                     | **getNFTRoyalty**               | Get Multi Tokens on Account. Returns tokenIDs of tokens Account holds.                             |

#### Fungible token (ERC20)

| **Category**        | Function             | Description                         |
| ------------------- | -------------------- | ----------------------------------- |
| _Token operations_  | **sendApproveErc20** | Approve ERC20 transfer for spender. |
|                     | **ApproveErc20**     | Approve ERC20 signed transaction.   |
| _Token information_ | **getErc20Decimals** | Get Decimals for the ERC20 token    |

#### Auctions

| **Category**          | Function                        | Description                                                                                                           |
| --------------------- | ------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| _Auction information_ | **getAuctionFee**               | Returns Auction fee.                                                                                                  |
|                       | **getAuction**                  | Returns Auctions list.                                                                                                |
|                       | **getAuctionFeeRecipient**      | Returns Auction fee recipient.                                                                                        |
| _Auction operations_  | **deployAuction**               | Deploy new smart contract for NFT auction logic.                                                                      |
|                       | **AuctionBid**                  | Bid on the auction. Buyer must either send native assets with this operation, or approve ERC20 token spending before. |
|                       | **AuctionCreate**               | Create new auction on the auction contract.                                                                           |
|                       | **AuctionCancel**               | Cancel auction on the auction. Only possible for the seller or the operator.                                          |
|                       | **AuctionSettle**               | Settle auction. There must be buyer present for that auction.                                                         |
|                       | **AuctionUpdateFee**            | Update auction fee.                                                                                                   |
|                       | **AuctionUpdateFeeRecipient**   | Update auction fee recipient.                                                                                         |
|                       | **AuctionApproveNftTransfer**   | Approve NFT transfer for auction to perform listing of the asset.                                                     |
|                       | **AuctionApproveErc20Transfer** | Approve ERC20 transfer for auction to perform bidding on the asset in the auction.                                    |

#### MarketPlace

| **Category**              | Function                            | Description                                                                                                                       |
| ------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| _Marketplace information_ | **getMarketPlaceFee**               | Returns MarketPlace fee.                                                                                                          |
|                           | **getMarketPlaceListing**           | Returns MarketPlace listing.                                                                                                      |
|                           | **getMarketPlaceFeeRecipient**      | Returns MarketPlace fee recipient.                                                                                                |
| _Marketplace operations_  | **deployMarketPlaceListing**        | Deploy new smart contract for NFT marketplace logic.                                                                              |
|                           | **MarketPlaceUpdateFee**            | Update marketplace fee.                                                                                                           |
|                           | **MarketPlaceUpdateFeeRecipient**   | Update marketplace fee recipient.                                                                                                 |
|                           | **MarketPlaceApproveErc20Spending** | Approve ERC20 spending for marketplace to perform buy with ERC20 token.                                                           |
|                           | **MarketPlaceCreateListing**        | Create new listing on the marketplace.                                                                                            |
|                           | **MarketPlaceBuyListing**           | Buy listing on the marketplace. Buyer must either send native assets with this operation, or approve ERC20 token spending before. |
|                           | **MarketPlaceCancelListing**        | Cancel listing on the marketplace. Only possible for the seller or the operator.                                                  |
