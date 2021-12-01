import {
  auction,
  BurnErc20,
  BaseBurnMultiToken,
  BaseBurnMultiTokenBatch,
  CreateRecord,
  Currency,
  DeployErc20,
  DeployMarketplaceListing,
  DeployNftAuction,
  erc1155TokenBytecode,
  erc20TokenBytecode,
  erc721TokenBytecode,
  erc721TokenABI,
  erc20TokenABI,
  erc1155TokenABI,
  erc721Provenance_bytecode,
  GenerateCustodialAddress,
  listing,
  MintErc20,
  MintMultiToken,
  MintMultiTokenBatch,
  SmartContractMethodInvocation,
  SmartContractReadMethodInvocation,
  TATUM_API_URL,
  TransactionKMS,
  TransferErc20,
  TransferMultiToken,
  TransferMultiTokenBatch,
  UpdateCashbackErc721,
  validateBody,
  MintErc721,
  MintMultipleErc721,
  BurnErc721,
  TransferErc721,
  DeployErc721,
  BurnMultiToken,
  BurnMultiTokenBatch,
  DeployMultiToken,
} from '@tatumio/tatum-core'
import { obtainCustodialAddressType } from '@tatumio/tatum-defi'
import { BigNumber } from 'bignumber.js'
import Web3 from 'web3'
import { TransactionConfig } from 'web3-core'
import { isHex, stringToHex, toHex, toWei } from 'web3-utils'
import { kccBroadcast } from '../blockchain'
import { mintNFT } from '../nft'

/**
 * Estimate Gas price for the transaction.
 */
export const kccGetGasPriceInWei = async () => {
  return Web3.utils.toWei('1', 'gwei')
}

const prepareGeneralTx = async (
  client: Web3,
  fromPrivateKey?: string,
  signatureId?: string,
  to?: string,
  amount?: string,
  nonce?: number,
  data?: string,
  gasLimit?: string,
  gasPrice?: string
) => {
  const tx: TransactionConfig = {
    from: 0,
    to,
    value: amount ? `0x${new BigNumber(toWei(amount, 'ether')).toString(16)}` : undefined,
    data,
    gas: gasLimit,
    nonce,
    gasPrice: gasPrice ? `0x${new BigNumber(toWei(gasPrice, 'gwei')).toString(16)}` : await kccGetGasPriceInWei(),
  }

  if (signatureId) {
    return JSON.stringify(tx)
  }
  tx.gas = gasLimit || (await client.eth.estimateGas({ to, data: data || '', value: tx.value }))
  return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string
}

/**
 * Send Kcc transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcc Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKccTransaction = async (body: TransferErc20, provider?: string) => {
  return kccBroadcast(await prepareKccSignedTransaction(body, provider))
}

export const prepareKccClient = (provider?: string, fromPrivateKey?: string) => {
  const client = new Web3(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/kcc/web3/${process.env.TATUM_API_KEY}`)
  if (fromPrivateKey) {
    client.eth.accounts.wallet.clear()
    client.eth.accounts.wallet.add(fromPrivateKey)
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address
  }
  return client
}

/**
 * Sign Kcc pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @param provider url of the Kcc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const signKccKMSTransaction = async (tx: TransactionKMS, fromPrivateKey: string, provider?: string) => {
  if (tx.chain !== Currency.KCS) {
    throw Error('Unsupported chain.')
  }
  const client = prepareKccClient(provider, fromPrivateKey)
  const transactionConfig = JSON.parse(tx.serializedTransaction)
  if (!transactionConfig.gas) {
    transactionConfig.gas = await client.eth.estimateGas({ to: transactionConfig.to, data: transactionConfig.data })
  }
  if (
    !transactionConfig.gasPrice ||
    transactionConfig.gasPrice === '0' ||
    transactionConfig.gasPrice === 0 ||
    transactionConfig.gasPrice === '0x0'
  ) {
    transactionConfig.gasPrice = await kccGetGasPriceInWei()
  }
  return (await client.eth.accounts.signTransaction(transactionConfig, fromPrivateKey)).rawTransaction as string
}

export const getKccErc20ContractDecimals = async (contractAddress: string, provider?: string) => {
  if (!contractAddress) {
    throw new Error('Contract address not set.')
  }
  const client = await prepareKccClient(provider)
  // @ts-ignore
  const contract = new client.eth.Contract(erc20_abi, contractAddress.trim())
  return await contract.methods.decimals().call()
}

/**
 * Sign Kcc generate custodial wallet transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKccGenerateCustodialWalletSignedTransaction = async (body: GenerateCustodialAddress, provider?: string) => {
  await validateBody(body, GenerateCustodialAddress)
  const client = await prepareKccClient(provider, body.fromPrivateKey)
  const { abi, code } = obtainCustodialAddressType(body)
  // @ts-ignore
  const contract = new client.eth.Contract(abi)
  const data = contract
    .deploy({
      data: code,
    })
    .encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    undefined,
    undefined,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Kcc transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKccSignedTransaction = async (body: TransferErc20, provider?: string) => {
  await validateBody(body, TransferErc20)
  const client = await prepareKccClient(provider, body.fromPrivateKey)
  const data = body.data ? (client.utils.isHex(body.data) ? client.utils.stringToHex(body.data) : client.utils.toHex(body.data)) : undefined
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    body.to,
    body.amount,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Kcc store data transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKccStoreDataTransaction = async (body: CreateRecord, provider?: string) => {
  await validateBody(body, CreateRecord)
  const client = await prepareKccClient(provider, body.fromPrivateKey)
  const hexData = isHex(body.data) ? stringToHex(body.data) : toHex(body.data)
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    body.to || client.eth.accounts.wallet[0].address,
    undefined,
    body.nonce,
    hexData,
    body.ethFee?.gasLimit,
    body.ethFee?.gasPrice
  )
}

/**
 * Sign Kcc mint erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKccMintErc20SignedTransaction = async (body: MintErc20, provider?: string) => {
  await validateBody(body, MintErc20)
  const client = await prepareKccClient(provider, body.fromPrivateKey)
  // @ts-ignore
  const contract = new client.eth.Contract(erc20TokenABI, body.contractAddress.trim().trim())
  const digits = new BigNumber(10).pow(await contract.methods.decimals().call())
  const data = contract.methods.mint(body.to.trim(), `0x${new BigNumber(body.amount).multipliedBy(digits).toString(16)}`).encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    body.contractAddress.trim(),
    undefined,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Kcc burn erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKccBurnErc20SignedTransaction = async (body: BurnErc20, provider?: string) => {
  await validateBody(body, BurnErc20)
  const client = await prepareKccClient(provider, body.fromPrivateKey)
  // @ts-ignore
  const contract = new client.eth.Contract(erc20TokenABI, body.contractAddress.trim().trim())
  const digits = new BigNumber(10).pow(await contract.methods.decimals().call())
  const data = contract.methods.burn(`0x${new BigNumber(body.amount).multipliedBy(digits).toString(16)}`).encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    body.contractAddress.trim(),
    undefined,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Kcc transfer erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKccTransferErc20SignedTransaction = async (body: TransferErc20, provider?: string) => {
  await validateBody(body, TransferErc20)
  const client = await prepareKccClient(provider, body.fromPrivateKey)
  const decimals = new BigNumber(10).pow(body.digits as number)
  // @ts-ignore
  const data = new client.eth.Contract(erc20TokenABI, body.contractAddress.trim().trim()).methods
    .transfer(body.to.trim(), `0x${new BigNumber(body.amount).multipliedBy(decimals).toString(16)}`)
    .encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    (body.contractAddress as string).trim(),
    undefined,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Kcc deploy erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKccDeployErc20SignedTransaction = async (body: DeployErc20, provider?: string) => {
  await validateBody(body, DeployErc20)
  const client = await prepareKccClient(provider, body.fromPrivateKey)
  // @ts-ignore
  const contract = new client.eth.Contract(erc20TokenABI)
  const data = contract
    .deploy({
      data: erc20TokenBytecode,
      arguments: [
        body.name,
        body.symbol,
        body.address.trim(),
        body.digits,
        `0x${new BigNumber(body.totalCap || body.supply).multipliedBy(new BigNumber(10).pow(body.digits)).toString(16)}`,
        `0x${new BigNumber(body.supply).multipliedBy(new BigNumber(10).pow(body.digits)).toString(16)}`,
      ],
    })
    .encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    undefined,
    undefined,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Kcc mint erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKccMintErc721SignedTransaction = async (body: MintErc721, provider?: string) => {
  await validateBody(body, MintErc721)
  const client = await prepareKccClient(provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(erc721TokenABI, body.contractAddress.trim()).methods
    .mintWithTokenURI(body.to.trim(), body.tokenId, body.url)
    .encodeABI()
  if (body.contractAddress) {
    return prepareGeneralTx(
      client,
      body.fromPrivateKey,
      body.signatureId,
      body.contractAddress.trim(),
      undefined,
      body.nonce,
      data,
      body.fee?.gasLimit,
      body.fee?.gasPrice
    )
  }
  throw new Error('Contract address should not be empty!')
}

/**
 * Sign Kcc mint cashback erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKccMintCashbackErc721SignedTransaction = async (body: MintErc721, provider?: string) => {
  await validateBody(body, MintErc721)
  const client = await prepareKccClient(provider, body.fromPrivateKey)
  const cashbacks: string[] = body.cashbackValues!
  const cb = cashbacks.map((c) => `0x${new BigNumber(client.utils.toWei(c, 'ether')).toString(16)}`)
  // @ts-ignore
  const data = new client.eth.Contract(erc721TokenABI, body.contractAddress.trim()).methods
    .mintWithCashback(body.to.trim(), body.tokenId, body.url, body.authorAddresses, cb)
    .encodeABI()
  if (body.contractAddress) {
    return prepareGeneralTx(
      client,
      body.fromPrivateKey,
      body.signatureId,
      body.contractAddress.trim(),
      undefined,
      body.nonce,
      data,
      body.fee?.gasLimit,
      body.fee?.gasPrice
    )
  }
  throw new Error('Contract address should not be empty!')
}

/**
 * Sign Kcc mint multiple cashback erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKccMintMultipleCashbackErc721SignedTransaction = async (body: MintMultipleErc721, provider?: string) => {
  await validateBody(body, MintMultipleErc721)
  const client = await prepareKccClient(provider, body.fromPrivateKey)
  const cashbacks: string[][] = body.cashbackValues!
  const cb = cashbacks.map((cashback) => cashback.map((c) => `0x${new BigNumber(client.utils.toWei(c, 'ether')).toString(16)}`))
  // @ts-ignore
  const data = new client.eth.Contract(erc721TokenABI, body.contractAddress.trim()).methods
    .mintMultipleCashback(
      body.to.map((t) => t.trim()),
      body.tokenId,
      body.url,
      body.authorAddresses,
      cb
    )
    .encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    body.contractAddress.trim(),
    undefined,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Kcc mint multiple erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKccMintMultipleErc721SignedTransaction = async (body: MintMultipleErc721, provider?: string) => {
  await validateBody(body, MintMultipleErc721)
  const client = await prepareKccClient(provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(erc721TokenABI, body.contractAddress.trim()).methods
    .mintMultiple(
      body.to.map((t) => t.trim()),
      body.tokenId,
      body.url
    )
    .encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    body.contractAddress.trim(),
    undefined,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Kcc burn erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKccBurnErc721SignedTransaction = async (body: BurnErc721, provider?: string) => {
  await validateBody(body, BurnErc721)
  const client = await prepareKccClient(provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(erc721TokenABI, body.contractAddress.trim()).methods.burn(body.tokenId).encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    body.contractAddress.trim(),
    undefined,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Kcc transfer erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKccTransferErc721SignedTransaction = async (body: TransferErc721, provider?: string) => {
  await validateBody(body, TransferErc721)
  const client = await prepareKccClient(provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(erc721TokenABI, body.contractAddress.trim()).methods
    .safeTransfer(body.to.trim(), body.tokenId)
    .encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    body.contractAddress.trim(),
    body.value,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Kcc update cashback for author erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKccUpdateCashbackForAuthorErc721SignedTransaction = async (body: UpdateCashbackErc721, provider?: string) => {
  await validateBody(body, UpdateCashbackErc721)
  const client = await prepareKccClient(provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(erc721TokenABI, body.contractAddress.trim()).methods
    .updateCashbackForAuthor(body.tokenId, `0x${new BigNumber(toWei(body.cashbackValue, 'ether')).toString(16)}`)
    .encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    body.contractAddress.trim(),
    undefined,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Kcc deploy erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKccDeployErc721SignedTransaction = async (body: DeployErc721, provider?: string) => {
  await validateBody(body, DeployErc721)
  const client = await prepareKccClient(provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(erc721TokenABI)
    .deploy({
      arguments: [body.name, body.symbol],
      data: body.provenance ? erc721Provenance_bytecode : erc721TokenBytecode,
    })
    .encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    undefined,
    undefined,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Kcc generate custodial wallet address transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
 */
export const prepareKccDeployMarketplaceListingSignedTransaction = async (body: DeployMarketplaceListing, provider?: string) => {
  await validateBody(body, DeployMarketplaceListing)
  const client = await prepareKccClient(provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(listing.abi)
    .deploy({
      arguments: [body.marketplaceFee, body.feeRecipient],
      data: listing.data,
    })
    .encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    undefined,
    undefined,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}
/**
 * Sign Kcc deploy NFT Auction contract transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
 */
export const prepareKccDeployAuctionSignedTransaction = async (body: DeployNftAuction, provider?: string) => {
  await validateBody(body, DeployNftAuction)
  const client = await prepareKccClient(provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(auction.abi)
    .deploy({
      arguments: [body.auctionFee, body.feeRecipient],
      data: auction.data,
    })
    .encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    undefined,
    undefined,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Kcc burn multiple tokens transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKccBurnMultiTokenSignedTransaction = async (body: BurnMultiToken, provider?: string) => {
  await validateBody(body, BurnMultiToken)
  const client = await prepareKccClient(provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(erc1155TokenABI, body.contractAddress.trim()).methods
    .burn(body.account.trim(), body.tokenId, body.amount)
    .encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    body.contractAddress.trim(),
    undefined,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Kcc burn multiple tokens batch transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKccBurnMultiTokenBatchSignedTransaction = async (body: BurnMultiTokenBatch, provider?: string) => {
  await validateBody(body, BurnMultiTokenBatch)
  const client = await prepareKccClient(provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(erc1155TokenABI, body.contractAddress.trim()).methods
    .burnBatch(body.account.trim(), body.tokenId, body.amounts)
    .encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    body.contractAddress.trim(),
    undefined,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Kcc transfer multiple tokens transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKccTransferMultiTokenSignedTransaction = async (body: TransferMultiToken, provider?: string) => {
  await validateBody(body, TransferMultiToken)
  const client = await prepareKccClient(provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(erc1155TokenABI, body.contractAddress.trim()).methods
    .safeTransfer(body.to.trim(), body.tokenId, `0x${new BigNumber(body.amount).toString(16)}`, body.data ? body.data : '0x0')
    .encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    body.contractAddress.trim(),
    undefined,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Kcc batch transfer multiple tokens transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKccBatchTransferMultiTokenSignedTransaction = async (body: TransferMultiTokenBatch, provider?: string) => {
  await validateBody(body, TransferMultiTokenBatch)
  const client = await prepareKccClient(provider, body.fromPrivateKey)
  const amts = body.amounts.map((amt: string) => `0x${new BigNumber(amt).toString(16)}`)
  // @ts-ignore
  const data = new client.eth.Contract(erc1155TokenABI, body.contractAddress.trim()).methods
    .safeBatchTransfer(
      body.to.trim(),
      body.tokenId.map((token: string) => token.trim()),
      amts,
      body.data ? body.data : '0x0'
    )
    .encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    body.contractAddress.trim(),
    undefined,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Kcc mint multiple tokens transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKccMintMultiTokenSignedTransaction = async (body: MintMultiToken, provider?: string) => {
  await validateBody(body, MintMultiToken)
  const client = await prepareKccClient(provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(erc1155TokenABI, body.contractAddress.trim()).methods
    .mint(body.to.trim(), body.tokenId, `0x${new BigNumber(body.amount).toString(16)}`, body.data ? body.data : '0x0')
    .encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    body.contractAddress.trim(),
    undefined,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Kcc mint multiple tokens batch transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKccMintMultiTokenBatchSignedTransaction = async (body: MintMultiTokenBatch, provider?: string) => {
  await validateBody(body, MintMultiTokenBatch)
  const client = await prepareKccClient(provider, body.fromPrivateKey)
  const batchAmounts = body.amounts.map((amts: string[]) => amts.map((amt: string) => `0x${new BigNumber(amt).toString(16)}`))
  // @ts-ignore
  const data = new client.eth.Contract(erc1155TokenABI, body.contractAddress.trim()).methods
    .mintBatch(body.to, body.tokenId, batchAmounts, body.data ? body.data : '0x0')
    .encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    body.contractAddress.trim(),
    undefined,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Kcc deploy multiple tokens transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKccDeployMultiTokenSignedTransaction = async (body: DeployMultiToken, provider?: string) => {
  await validateBody(body, DeployMultiToken)
  const client = await prepareKccClient(provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(erc1155TokenABI)
    .deploy({
      arguments: [body.uri],
      data: erc1155TokenBytecode,
    })
    .encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    undefined,
    undefined,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Kcc smart contract write method invocation transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param options
 * @param options.provider optional url of the Kcc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKccSmartContractWriteMethodInvocation = async (
  body: SmartContractMethodInvocation,
  options?: { provider?: string }
) => {
  await validateBody(body, SmartContractMethodInvocation)
  const { fromPrivateKey, fee, params, methodName, methodABI, contractAddress, nonce, amount, signatureId } = body
  const client = await prepareKccClient(options?.provider, fromPrivateKey)

  const data = new client.eth.Contract([methodABI]).methods[methodName as string](...params).encodeABI()
  return prepareGeneralTx(client, fromPrivateKey, signatureId, contractAddress.trim(), amount, nonce, data, fee?.gasLimit, fee?.gasPrice)
}

export const sendKccSmartContractReadMethodInvocationTransaction = async (body: SmartContractReadMethodInvocation, provider?: string) => {
  await validateBody(body, SmartContractReadMethodInvocation)
  const { params, methodName, methodABI, contractAddress } = body
  const client = prepareKccClient(provider)
  const contract = new client.eth.Contract([methodABI], contractAddress)
  return { data: await contract.methods[methodName as string](...params).call() }
}

/**
 * Send Kcc smart store data transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKccStoreDataTransaction = async (body: CreateRecord, provider?: string) =>
  kccBroadcast(await prepareKccStoreDataTransaction(body, provider), body.signatureId)

/**
 * Send Kcc mint erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKccMintErc20SignedTransaction = async (body: MintErc20, provider?: string) =>
  kccBroadcast(await prepareKccMintErc20SignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcc burn erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKccBurnErc20SignedTransaction = async (body: BurnErc20, provider?: string) =>
  kccBroadcast(await prepareKccBurnErc20SignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcc transfer erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKccTransferErc20SignedTransaction = async (body: TransferErc20, provider?: string) =>
  kccBroadcast(await prepareKccTransferErc20SignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcc deploy erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKccDeployErc20SignedTransaction = async (body: DeployErc20, provider?: string) =>
  kccBroadcast(await prepareKccDeployErc20SignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcc mint erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKccMintErc721SignedTransaction = async (body: MintErc721, provider?: string) => {
  if (!body.fromPrivateKey && !body.fromPrivateKey) {
    return mintNFT(body)
  }
  return kccBroadcast(await prepareKccMintErc721SignedTransaction(body, provider), body.signatureId)
}

/**
 * Send Kcc mint cashback erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKccMintCashbackErc721SignedTransaction = async (body: MintErc721, provider?: string) =>
  kccBroadcast(await prepareKccMintCashbackErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcc mint multiple erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKccMintMultipleCashbackErc721SignedTransaction = async (body: MintMultipleErc721, provider?: string) =>
  kccBroadcast(await prepareKccMintMultipleCashbackErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcc mint multiple erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKccMintMultipleErc721SignedTransaction = async (body: MintMultipleErc721, provider?: string) =>
  kccBroadcast(await prepareKccMintMultipleErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcc burn erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKccBurnErc721SignedTransaction = async (body: BurnErc721, provider?: string) =>
  kccBroadcast(await prepareKccBurnErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcc transfer erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKccTransferErc721SignedTransaction = async (body: TransferErc721, provider?: string) =>
  kccBroadcast(await prepareKccTransferErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcc update cashback for author erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKccUpdateCashbackForAuthorErc721SignedTransaction = async (body: UpdateCashbackErc721, provider?: string) =>
  kccBroadcast(await prepareKccUpdateCashbackForAuthorErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcc deploy erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKccDeployErc721SignedTransaction = async (body: DeployErc721, provider?: string) =>
  kccBroadcast(await prepareKccDeployErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcc burn multiple tokens erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKccBurnMultiTokenSignedTransaction = async (body: BaseBurnMultiToken, provider?: string) =>
  kccBroadcast(await prepareKccBurnMultiTokenSignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcc burn multiple tokens batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKccBurnMultiTokenBatchSignedTransaction = async (body: BaseBurnMultiTokenBatch, provider?: string) =>
  kccBroadcast(await prepareKccBurnMultiTokenBatchSignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcc transfer multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKccTransferMultiTokenSignedTransaction = async (body: TransferMultiToken, provider?: string) =>
  kccBroadcast(await prepareKccTransferMultiTokenSignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcc batch transfer multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKccBatchTransferMultiTokenSignedTransaction = async (body: TransferMultiTokenBatch, provider?: string) =>
  kccBroadcast(await prepareKccBatchTransferMultiTokenSignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcc mint multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKccMintMultiTokenSignedTransaction = async (body: MintMultiToken, provider?: string) =>
  kccBroadcast(await prepareKccMintMultiTokenSignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcc mint multiple tokens batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKccMintMultiTokenBatchSignedTransaction = async (body: MintMultiTokenBatch, provider?: string) =>
  kccBroadcast(await prepareKccMintMultiTokenBatchSignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcc deploy multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKccDeployMultiTokenSignedTransaction = async (body: DeployMultiToken, provider?: string) =>
  kccBroadcast(await prepareKccDeployMultiTokenSignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcc generate custodial wallet transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKccGenerateCustodialWalletSignedTransaction = async (body: GenerateCustodialAddress, provider?: string) =>
  kccBroadcast(await prepareKccGenerateCustodialWalletSignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcc smart contract method invocation transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKccSmartContractMethodInvocationTransaction = async (
  body: SmartContractMethodInvocation | SmartContractReadMethodInvocation,
  provider?: string
) => {
  if (body.methodABI.stateMutability === 'view') {
    return sendKccSmartContractReadMethodInvocationTransaction(body as SmartContractReadMethodInvocation, provider)
  }
  return kccBroadcast(
    await prepareKccSmartContractWriteMethodInvocation(body, { provider }),
    (body as SmartContractMethodInvocation).signatureId
  )
}
/**
 * Deploy new smart contract for NFT marketplace logic. Smart contract enables marketplace operator to create new listing for NFT (ERC-721/1155).
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendKccDeployMarketplaceListingSignedTransaction = async (body: DeployMarketplaceListing, provider?: string) =>
  kccBroadcast(await prepareKccDeployMarketplaceListingSignedTransaction(body, provider), body.signatureId)
