## KuCoin (KCS) - List of features

#### Blockchain

| **Category**   | Function                         | Description                                       |
| -------------- | -------------------------------- | ------------------------------------------------- | --- |
| _Account_      | ** getBlockchainAccountBalance** | Returns account balance for KCS blockchain.       |
| _Block_        | **getBlock**                     | Get blockchain block by hash or block number.     | D   |
|                | **getCurrentBlock**              | Returns information about KCS blockchain.         | D   |
| _Transactions_ | **getTransaction**               | Returns transaction by hash from KCS blockchain.  | D   |
|                | **getTransactionsCount**         | Returns count of transactions for KCS blockchain. | D   |
| _Broadcast_    | **broadcastTx**                  | Returns transaction by hash from KCS blockchain.  | D   |
|                | **estimateGas**                  | Returns estimate gas for KCS blockchain.          |

#### Multitoken (ERC-1155)

| **Category**      | Function                    | Description                                                                                                         |
| ----------------- | --------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| _Token operation_ | **deployMultiToken**        | Deploy Multi Token Smart Contract. This method creates new ERC1155 Smart Contract (Multi Tokens) on the blockchain. |
|                   | **mintMultiToken**          | Mint a fixed amount of Multi Token and transfer it to destination account.                                          |
|                   | **mintMultiTokenBatch**     | Create a fixed amount of multiple Multi Tokens Tokens and transfer them to destination account in one transaction.  |
|                   | **burnMultiToken**          | Burn a fixed amount of Multi Tokens by id.                                                                          |
|                   | **burnMultiTokenBatch**     | Burn multiple Multi Token Tokens by id assigned to same address in one transaction.                                 |
|                   | **transferMultiToken**      | Transfer a certain amount of Multi Token from account to another account.                                           |
|                   | **transferMultiTokenBatch** | Transfer multiple Multi Token from account to another account.                                                      |

#### NFT (ERC-721)

| **Category**        | Function                   | Description                                                          |
| ------------------- | -------------------------- | -------------------------------------------------------------------- |
| _Token operation_   | **deployNFT**              | Deploy new NFT smart contract, which will be used for later minting. |
|                     | **createNFT**              | Create new NFT token.                                                |
|                     | **mintNFTWithUri**         | Mint new NFT token.                                                  |
|                     | **mintMultipleNFTWithUri** | Mint multiple new NFT tokens.                                        |
|                     | **transferNFT**            | Transfer new NFT token to new recipient.                             |
| _Token information_ | **getNFTImage**            | Get IPFS image URL from the NFT with the IPFS Metadata scheme. URL   |

#### Fungible token (ERC20)

| **Category**      | Function             | Description                         |
| ----------------- | -------------------- | ----------------------------------- |
| Token operations  | **sendApproveErc20** | Approve ERC20 transfer for spender. |
|                   | **ApproveErc20**     | Approve ERC20 signed transaction.   |
| Token information | **getErc20Decimals** | Get Decimals for the ERC20 token    |
