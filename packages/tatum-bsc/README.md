## Binance Smart Chain - List of features

#### Blockchain

| **Category**   | Function                        | Description                                                                        |
| -------------- | ------------------------------- | ---------------------------------------------------------------------------------- |
| _Block_        | **getBlockchainAccountBalance** | Returns balance on address from Bsc blockchain.                                    |
| _Account_      | **getAccount**                  | Returns account by address from Bsc blockchain.                                    |
|                | **getAccountBep20Address**      | Returns account BEP20 address from Bsc blockchain.                                 |
|                | **getBlock**                    | Returns block by its hash from Bsc blockchain.                                     |
| _Transactions_ | **getTransactionsCount**        | Returns a number of outgoing Bsc transactions for the address from Bsc blockchain. |
|                | **getTransaction**              | Returns transaction by hash from Bsc blockchain.                                   |
|                | **estimateGas**                 | Returns gasLimit and gasPrice estimation of the transaction from Bsc blockchain.   |
| _Broadcast_    | **postBroadcast**               | Returns information about Bsc blockchain.                                          |

#### Multitoken (ERC-1155)

| **Category**        | Function                         | Description                                                                                                         |
| ------------------- | -------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| _Token operation_   | **deployMultiToken**             | Deploy Multi Token Smart Contract. This method creates new ERC1155 Smart Contract (Multi Tokens) on the blockchain. |
|                     | **mintMultiToken**               | Mint a fixed amount of Multi Token and transfer it to destination account.                                          |
|                     | **mintMultiTokenBatch**          | Create a fixed amount of multiple Multi Tokens Tokens and transfer them to destination account in one transaction.  |
|                     | **burnMultiToken**               | Burn a fixed amount of Multi Tokens by id.                                                                          |
|                     | **burnMultiTokenBatch**          | Burn multiple Multi Token Tokens by id assigned to same address in one transaction.                                 |
|                     | **transferMultiToken**           | Transfer a certain amount of Multi Token from account to another account.                                           |
|                     | **AddMultiTokenMinter**          | Add Multi Token Minter.                                                                                             |
| _Token information_ | **getMultiTokenContractAddress** | Get Multi Token contract address from deploy transaction.                                                           |
|                     | **getMultiTokensBalance**        | Get Multi Tokens balance on Account.                                                                                |
|                     | **getMultiTokensBatchBalance**   | Get Multi Tokens batch balance on Account.                                                                          |
|                     | **getMultiTokenTransaction**     | Get Multi Token transaction by transaction hash.                                                                    |
|                     | **getMultiTokenMetadata**        | Get Multi Token metadata.                                                                                           |

#### NFT (ERC-721)

| **Category**        | Function                       | Description                                                          |
| ------------------- | ------------------------------ | -------------------------------------------------------------------- |
| _Token operation_   | **mintNFT**                    | Mint new NFT token with metadata stored on the IPFS.                 |
|                     | **deployNFT**                  | Deploy new NFT smart contract, which will be used for later minting. |
|                     | **createNFT**                  | Create new NFT token.                                                |
|                     | **mintNFTWithUri**             | Mint new NFT token.                                                  |
|                     | **mintMultipleNFTWithUri**     | Mint multiple new NFT tokens.                                        |
|                     | **burnNFT**                    | Burn new NFT token. Token will no longer exists.                     |
|                     | **transferNFT**                | Transfer new NFT token to new recipient.                             |
|                     | **AddNFTMinter**               | Add new minter to the NFT contract.                                  |
|                     | **updateCashbackForAuthorNFT** | Update royalty cashback as author of the NFT token.                  |
| _Token information_ | **getNFTProvenanceData**       | Get NFT Provenance data.                                             |
|                     | **getNFTImage**                | Get IPFS image URL from the NFT with the IPFS Metadata scheme. URL   |
|                     | **getNFTRoyalty**              | Burn new NFT token. Token will no longer exists.                     |

#### Fungible token (ERC20)

| **Category**      | Function             | Description                         |
| ----------------- | -------------------- | ----------------------------------- |
| Token operations  | **sendApproveErc20** | Approve ERC20 transfer for spender. |
|                   | **ApproveErc20**     | Approve ERC20 signed transaction.   |
| Token information | **getErc20Decimals** | Get Decimals for the ERC20 token    |

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

#### Marketplace

| **Category**              | Function                            | Description                                                                                                                       |
| ------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| _Marketplace information_ | **getMarketPlaceFee**               | Returns Marketplace fee.                                                                                                          |
|                           | **getMarketPlaceListing**           | Returns Marketplace listing.                                                                                                      |
|                           | **getMarketPlaceFeeRecipient**      | Returns Marketplace fee recipient.                                                                                                |
| _Marketplace operations_  | **deployMarketPlaceListing**        | Deploy new smart contract for NFT marketplace logic.                                                                              |
|                           | **MarketPlaceUpdateFee**            | Update marketplace fee.                                                                                                           |
|                           | **MarketPlaceUpdateFeeRecipient**   | Update marketplace fee recipient.                                                                                                 |
|                           | **MarketPlaceApproveErc20Spending** | Approve ERC20 spending for marketplace to perform buy with ERC20 token.                                                           |
|                           | **MarketPlaceCreateListing**        | Create new listing on the marketplace.                                                                                            |
|                           | **MarketPlaceBuyListing**           | Buy listing on the marketplace. Buyer must either send native assets with this operation, or approve ERC20 token spending before. |
|                           | **MarketPlaceCancelListing**        | Cancel listing on the marketplace. Only possible for the seller or the operator.                                                  |
