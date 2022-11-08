import { TatumAlgoSDK, TransferAlgoBlockchain } from '@tatumio/algo'
import { Currency, TransactionHash } from '@tatumio/api-client'
import { isTestnet, sdkArguments } from '../index'
import { BigNumber } from 'bignumber.js'

/**
 * Note: not able to burn ASA if creator doesnt own all assets
 * https://developer.algorand.org/docs/get-details/asa/#destroying-an-asset
 */

export async function algoAsaTransferExample() {
  const algoSDK = TatumAlgoSDK(sdkArguments)

  // generate "from" and "to" addresses for wallets
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandGenerateWallet
  const { address, secret } = algoSDK.wallet.generateWallet()
  const fromPrivateKey = secret
  const recipientAddress = algoSDK.wallet.generateWallet()
  const to = recipientAddress.address

  // FUND YOUR ACCOUNT WITH ALGOs FROM https://bank.testnet.algorand.network/

  // Send Algos to a recipient account using private key, to be able accept token
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandBlockchainTransfer
  const txData = (await algoSDK.transaction.signedTransaction(
    {
      amount: '2',
      fromPrivateKey,
      to,
    } as TransferAlgoBlockchain,
    isTestnet,
  )) as TransactionHash
  console.log(`Fund recipient account ${to} with ID ${txData.txId}`)

  // create ASA (erc20 fungible token) transaction
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Deploy
  const mintedAsa = (await algoSDK.token.fungible.send.createFTSignedTransaction(
    {
      symbol: 'ASA_ELGD',
      name: 'ALGO_ASA_TOKEN',
      address,
      supply: '100',
      fromPrivateKey,
      digits: 1,
      totalCap: '100',
      url: 'https://google.com',
    },
    isTestnet,
  )) as TransactionHash
  console.log(`Created ASA token with transaction ID ${mintedAsa.txId}`)

  // fetch deployed contract address from transaction hash
  // https://apidoc.tatum.io/tag/BNB-Smart-Chain#operation/ALGOGetTransaction
  const { contractAddress } = await algoSDK.token.nft.getNFTContractAddress(Currency.ALGO, mintedAsa.txId)
  console.log(`Created ASA token with contract address: ${contractAddress}`)

  // Enable receiving asset on account
  // https://docs.tatum.io/nft-express/use-nft-express-to-mint-nfts-on-algorand
  // https://apidoc.tatum.io/tag/Algorand#operation/AlgorandBlockchainReceiveAsset
  const assetEnabled = (await algoSDK.token.receiveAsset(
    {
      assetId: new BigNumber(contractAddress).toNumber(),
      fromPrivateKey: recipientAddress.secret,
    },
    isTestnet,
  )) as TransactionHash
  console.log(`Enabled token with transaction hash: ${assetEnabled.txId}`)

  // send ASA (fungible token) transaction
  // https://apidoc.tatum.io/tag/Fungible-Tokens-(ERC-20-or-compatible)#operation/Erc20Transfer
  const transferredAsa = (await algoSDK.token.fungible.send.transferFTSignedTransaction(
    {
      to,
      amount: '1',
      contractAddress,
      fromPrivateKey,
    },
    isTestnet,
  )) as TransactionHash
  console.log(`ASA transaction with transaction ID ${transferredAsa.txId} was sent.`)
}
