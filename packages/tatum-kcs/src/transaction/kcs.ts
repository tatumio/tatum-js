import {
  auction,
  BurnErc20,
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
  ChainTransferErc20,
  ChainTransactionKMS,
  ChainGenerateCustodialAddress,
  ChainCreateRecord,
  ChainMintErc721,
  ChainMintMultipleErc721,
  ChainBurnErc721,
  ChainTransferErc721,
  ChainUpdateCashbackErc721,
  ChainDeployErc721,
  ChainDeployMarketplaceListing,
  ChainDeployNftAuction,
  ChainBurnMultiToken,
  ChainBurnMultiTokenBatch,
  ChainTransferMultiToken,
  ChainTransferMultiTokenBatch,
  ChainMintMultiToken,
  ChainMintMultiTokenBatch,
  ChainDeployMultiToken,
  ChainBaseBurnMultiToken,
  ChainBaseBurnMultiTokenBatch,
} from '@tatumio/tatum-core'
import { obtainCustodialAddressType } from '@tatumio/tatum-defi'
import { BigNumber } from 'bignumber.js'
import Web3 from 'web3'
import { TransactionConfig } from 'web3-core'
import { isHex, stringToHex, toHex, toWei } from 'web3-utils'
import { kcsBroadcast } from '../blockchain'
import { mintNFT } from '../nft'

/**
 * Estimate Gas price for the transaction.
 */
export const kcsGetGasPriceInWei = async () => {
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
    gasPrice: gasPrice ? `0x${new BigNumber(toWei(gasPrice, 'gwei')).toString(16)}` : await kcsGetGasPriceInWei(),
  }

  if (signatureId) {
    return JSON.stringify(tx)
  }
  tx.gas = gasLimit || (await client.eth.estimateGas({ to, data: data || '', value: tx.value }))
  return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string
}

/**
 * Send Kcs transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcs Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKcsTransaction = async (body: ChainTransferErc20, provider?: string) => {
  return kcsBroadcast(await prepareKcsSignedTransaction(body, provider))
}

export const prepareKcsClient = (provider?: string, fromPrivateKey?: string) => {
  const client = new Web3(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/kcs/web3/${process.env.TATUM_API_KEY}`)
  if (fromPrivateKey) {
    client.eth.accounts.wallet.clear()
    client.eth.accounts.wallet.add(fromPrivateKey)
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address
  }
  return client
}

/**
 * Sign Kcs pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @param provider url of the Kcs Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const signKcsKMSTransaction = async (tx: ChainTransactionKMS, fromPrivateKey: string, provider?: string) => {
  ;(tx as TransactionKMS).chain = Currency.KCS
  const client = prepareKcsClient(provider, fromPrivateKey)
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
    transactionConfig.gasPrice = await kcsGetGasPriceInWei()
  }
  return (await client.eth.accounts.signTransaction(transactionConfig, fromPrivateKey)).rawTransaction as string
}

export const getKcsErc20ContractDecimals = async (contractAddress: string, provider?: string) => {
  if (!contractAddress) {
    throw new Error('Contract address not set.')
  }
  const client = await prepareKcsClient(provider)
  // @ts-ignore
  const contract = new client.eth.Contract(erc20_abi, contractAddress.trim())
  return await contract.methods.decimals().call()
}

/**
 * Sign Kcs generate custodial wallet transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcs Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKcsGenerateCustodialWalletSignedTransaction = async (body: ChainGenerateCustodialAddress, provider?: string) => {
  ;(body as GenerateCustodialAddress).chain = Currency.KCS
  await validateBody(body, GenerateCustodialAddress)
  const client = await prepareKcsClient(provider, body.fromPrivateKey)
  const { abi, code } = obtainCustodialAddressType({ ...body, chain: Currency.KCS })
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
 * Sign Kcs transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcs Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKcsSignedTransaction = async (body: ChainTransferErc20, provider?: string) => {
  ;(body as TransferErc20).currency = Currency.KCS
  await validateBody(body, TransferErc20)
  const client = await prepareKcsClient(provider, body.fromPrivateKey)
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
 * Sign Kcs store data transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcs Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKcsStoreDataTransaction = async (body: ChainCreateRecord, provider?: string) => {
  ;(body as CreateRecord).chain = Currency.KCS
  await validateBody(body, CreateRecord)
  const client = await prepareKcsClient(provider, body.fromPrivateKey)
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
 * Sign Kcs mint erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcs Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKcsMintErc20SignedTransaction = async (body: MintErc20, provider?: string) => {
  await validateBody(body, MintErc20)
  const client = await prepareKcsClient(provider, body.fromPrivateKey)
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
 * Sign Kcs burn erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcs Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKcsBurnErc20SignedTransaction = async (body: BurnErc20, provider?: string) => {
  await validateBody(body, BurnErc20)
  const client = await prepareKcsClient(provider, body.fromPrivateKey)
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
 * Sign Kcs transfer erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcs Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKcsTransferErc20SignedTransaction = async (body: ChainTransferErc20, provider?: string) => {
  ;(body as TransferErc20).currency = Currency.KCS
  await validateBody(body, TransferErc20)
  const client = await prepareKcsClient(provider, body.fromPrivateKey)
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
 * Sign Kcs deploy erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcs Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKcsDeployErc20SignedTransaction = async (body: DeployErc20, provider?: string) => {
  await validateBody(body, DeployErc20)
  const client = await prepareKcsClient(provider, body.fromPrivateKey)
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
 * Sign Kcs mint erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcs Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKcsMintErc721SignedTransaction = async (body: ChainMintErc721, provider?: string) => {
  ;(body as MintErc721).chain = Currency.KCS
  await validateBody(body, MintErc721)
  const client = await prepareKcsClient(provider, body.fromPrivateKey)
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
 * Sign Kcs mint cashback erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcs Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKcsMintCashbackErc721SignedTransaction = async (body: ChainMintErc721, provider?: string) => {
  ;(body as MintErc721).chain = Currency.KCS
  await validateBody(body, MintErc721)
  const client = await prepareKcsClient(provider, body.fromPrivateKey)
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
 * Sign Kcs mint multiple cashback erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcs Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKcsMintMultipleCashbackErc721SignedTransaction = async (body: ChainMintMultipleErc721, provider?: string) => {
  ;(body as MintMultipleErc721).chain = Currency.KCS
  await validateBody(body, MintMultipleErc721)
  const client = await prepareKcsClient(provider, body.fromPrivateKey)
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
 * Sign Kcs mint multiple erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcs Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKcsMintMultipleErc721SignedTransaction = async (body: ChainMintMultipleErc721, provider?: string) => {
  ;(body as MintMultipleErc721).chain = Currency.KCS
  await validateBody(body, MintMultipleErc721)
  const client = await prepareKcsClient(provider, body.fromPrivateKey)
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
 * Sign Kcs burn erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcs Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKcsBurnErc721SignedTransaction = async (body: ChainBurnErc721, provider?: string) => {
  ;(body as BurnErc721).chain = Currency.KCS
  await validateBody(body, BurnErc721)
  const client = await prepareKcsClient(provider, body.fromPrivateKey)
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
 * Sign Kcs transfer erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcs Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKcsTransferErc721SignedTransaction = async (body: ChainTransferErc721, provider?: string) => {
  ;(body as TransferErc721).chain = Currency.KCS
  await validateBody(body, TransferErc721)
  const client = await prepareKcsClient(provider, body.fromPrivateKey)
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
 * Sign Kcs update cashback for author erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcs Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKcsUpdateCashbackForAuthorErc721SignedTransaction = async (body: ChainUpdateCashbackErc721, provider?: string) => {
  ;(body as UpdateCashbackErc721).chain = Currency.KCS
  await validateBody(body, UpdateCashbackErc721)
  const client = await prepareKcsClient(provider, body.fromPrivateKey)
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
 * Sign Kcs deploy erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcs Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKcsDeployErc721SignedTransaction = async (body: ChainDeployErc721, provider?: string) => {
  ;(body as DeployErc721).chain = Currency.KCS
  await validateBody(body, DeployErc721)
  const client = await prepareKcsClient(provider, body.fromPrivateKey)
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
 * Sign Kcs generate custodial wallet address transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcs Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
 */
export const prepareKcsDeployMarketplaceListingSignedTransaction = async (body: ChainDeployMarketplaceListing, provider?: string) => {
  ;(body as DeployMarketplaceListing).chain = Currency.KCS
  await validateBody(body, DeployMarketplaceListing)
  const client = await prepareKcsClient(provider, body.fromPrivateKey)
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
 * Sign Kcs deploy NFT Auction contract transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcs Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
 */
export const prepareKcsDeployAuctionSignedTransaction = async (body: ChainDeployNftAuction, provider?: string) => {
  ;(body as DeployNftAuction).chain = Currency.KCS
  await validateBody(body, DeployNftAuction)
  const client = await prepareKcsClient(provider, body.fromPrivateKey)
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
 * Sign Kcs burn multiple tokens transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcs Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKcsBurnMultiTokenSignedTransaction = async (body: ChainBurnMultiToken, provider?: string) => {
  ;(body as BurnMultiToken).chain = Currency.KCS
  await validateBody(body, BurnMultiToken)
  const client = await prepareKcsClient(provider, body.fromPrivateKey)
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
 * Sign Kcs burn multiple tokens batch transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcs Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKcsBurnMultiTokenBatchSignedTransaction = async (body: ChainBurnMultiTokenBatch, provider?: string) => {
  ;(body as BurnMultiTokenBatch).chain = Currency.KCS
  await validateBody(body, BurnMultiTokenBatch)
  const client = await prepareKcsClient(provider, body.fromPrivateKey)
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
 * Sign Kcs transfer multiple tokens transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcs Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKcsTransferMultiTokenSignedTransaction = async (body: ChainTransferMultiToken, provider?: string) => {
  ;(body as TransferMultiToken).chain = Currency.KCS
  await validateBody(body, TransferMultiToken)
  const client = await prepareKcsClient(provider, body.fromPrivateKey)
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
 * Sign Kcs batch transfer multiple tokens transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcs Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKcsBatchTransferMultiTokenSignedTransaction = async (body: ChainTransferMultiTokenBatch, provider?: string) => {
  ;(body as TransferMultiTokenBatch).chain = Currency.KCS
  await validateBody(body, TransferMultiTokenBatch)
  const client = await prepareKcsClient(provider, body.fromPrivateKey)
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
 * Sign Kcs mint multiple tokens transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcs Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKcsMintMultiTokenSignedTransaction = async (body: ChainMintMultiToken, provider?: string) => {
  ;(body as MintMultiToken).chain = Currency.KCS
  await validateBody(body, MintMultiToken)
  const client = await prepareKcsClient(provider, body.fromPrivateKey)
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
 * Sign Kcs mint multiple tokens batch transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcs Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKcsMintMultiTokenBatchSignedTransaction = async (body: ChainMintMultiTokenBatch, provider?: string) => {
  ;(body as MintMultiTokenBatch).chain = Currency.KCS
  await validateBody(body, MintMultiTokenBatch)
  const client = await prepareKcsClient(provider, body.fromPrivateKey)
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
 * Sign Kcs deploy multiple tokens transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Kcs Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKcsDeployMultiTokenSignedTransaction = async (body: ChainDeployMultiToken, provider?: string) => {
  ;(body as DeployMultiToken).chain = Currency.KCS
  await validateBody(body, DeployMultiToken)
  const client = await prepareKcsClient(provider, body.fromPrivateKey)
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
 * Sign Kcs smart contract write method invocation transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param options
 * @param options.provider optional url of the Kcs Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareKcsSmartContractWriteMethodInvocation = async (
  body: SmartContractMethodInvocation,
  options?: { provider?: string }
) => {
  await validateBody(body, SmartContractMethodInvocation)
  const { fromPrivateKey, fee, params, methodName, methodABI, contractAddress, nonce, amount, signatureId } = body
  const client = await prepareKcsClient(options?.provider, fromPrivateKey)

  const data = new client.eth.Contract([methodABI]).methods[methodName as string](...params).encodeABI()
  return prepareGeneralTx(client, fromPrivateKey, signatureId, contractAddress.trim(), amount, nonce, data, fee?.gasLimit, fee?.gasPrice)
}

export const sendKcsSmartContractReadMethodInvocationTransaction = async (body: SmartContractReadMethodInvocation, provider?: string) => {
  await validateBody(body, SmartContractReadMethodInvocation)
  const { params, methodName, methodABI, contractAddress } = body
  const client = prepareKcsClient(provider)
  const contract = new client.eth.Contract([methodABI], contractAddress)
  return { data: await contract.methods[methodName as string](...params).call() }
}

/**
 * Send Kcs smart store data transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKcsStoreDataTransaction = async (body: ChainCreateRecord, provider?: string) =>
  kcsBroadcast(await prepareKcsStoreDataTransaction(body, provider), body.signatureId)

/**
 * Send Kcs mint erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKcsMintErc20SignedTransaction = async (body: MintErc20, provider?: string) =>
  kcsBroadcast(await prepareKcsMintErc20SignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcs burn erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKcsBurnErc20SignedTransaction = async (body: BurnErc20, provider?: string) =>
  kcsBroadcast(await prepareKcsBurnErc20SignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcs transfer erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKcsTransferErc20SignedTransaction = async (body: ChainTransferErc20, provider?: string) =>
  kcsBroadcast(await prepareKcsTransferErc20SignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcs deploy erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKcsDeployErc20SignedTransaction = async (body: DeployErc20, provider?: string) =>
  kcsBroadcast(await prepareKcsDeployErc20SignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcs mint erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKcsMintErc721SignedTransaction = async (body: ChainMintErc721, provider?: string) => {
  if (!body.fromPrivateKey && !body.fromPrivateKey) {
    return mintNFT(body)
  }
  return kcsBroadcast(await prepareKcsMintErc721SignedTransaction(body, provider), body.signatureId)
}

/**
 * Send Kcs mint cashback erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKcsMintCashbackErc721SignedTransaction = async (body: ChainMintErc721, provider?: string) =>
  kcsBroadcast(await prepareKcsMintCashbackErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcs mint multiple erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKcsMintMultipleCashbackErc721SignedTransaction = async (body: ChainMintMultipleErc721, provider?: string) =>
  kcsBroadcast(await prepareKcsMintMultipleCashbackErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcs mint multiple erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKcsMintMultipleErc721SignedTransaction = async (body: ChainMintMultipleErc721, provider?: string) =>
  kcsBroadcast(await prepareKcsMintMultipleErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcs burn erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKcsBurnErc721SignedTransaction = async (body: ChainBurnErc721, provider?: string) =>
  kcsBroadcast(await prepareKcsBurnErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcs transfer erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKcsTransferErc721SignedTransaction = async (body: ChainTransferErc721, provider?: string) =>
  kcsBroadcast(await prepareKcsTransferErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcs update cashback for author erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKcsUpdateCashbackForAuthorErc721SignedTransaction = async (body: ChainUpdateCashbackErc721, provider?: string) =>
  kcsBroadcast(await prepareKcsUpdateCashbackForAuthorErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcs deploy erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKcsDeployErc721SignedTransaction = async (body: ChainDeployErc721, provider?: string) =>
  kcsBroadcast(await prepareKcsDeployErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcs burn multiple tokens erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKcsBurnMultiTokenSignedTransaction = async (body: ChainBaseBurnMultiToken, provider?: string) =>
  kcsBroadcast(await prepareKcsBurnMultiTokenSignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcs burn multiple tokens batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKcsBurnMultiTokenBatchSignedTransaction = async (body: ChainBaseBurnMultiTokenBatch, provider?: string) =>
  kcsBroadcast(await prepareKcsBurnMultiTokenBatchSignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcs transfer multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKcsTransferMultiTokenSignedTransaction = async (body: ChainTransferMultiToken, provider?: string) =>
  kcsBroadcast(await prepareKcsTransferMultiTokenSignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcs batch transfer multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKcsBatchTransferMultiTokenSignedTransaction = async (body: ChainTransferMultiTokenBatch, provider?: string) =>
  kcsBroadcast(await prepareKcsBatchTransferMultiTokenSignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcs mint multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKcsMintMultiTokenSignedTransaction = async (body: ChainMintMultiToken, provider?: string) =>
  kcsBroadcast(await prepareKcsMintMultiTokenSignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcs mint multiple tokens batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKcsMintMultiTokenBatchSignedTransaction = async (body: ChainMintMultiTokenBatch, provider?: string) =>
  kcsBroadcast(await prepareKcsMintMultiTokenBatchSignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcs deploy multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKcsDeployMultiTokenSignedTransaction = async (body: ChainDeployMultiToken, provider?: string) =>
  kcsBroadcast(await prepareKcsDeployMultiTokenSignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcs generate custodial wallet transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKcsGenerateCustodialWalletSignedTransaction = async (body: ChainGenerateCustodialAddress, provider?: string) =>
  kcsBroadcast(await prepareKcsGenerateCustodialWalletSignedTransaction(body, provider), body.signatureId)

/**
 * Send Kcs smart contract method invocation transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendKcsSmartContractMethodInvocationTransaction = async (
  body: SmartContractMethodInvocation | SmartContractReadMethodInvocation,
  provider?: string
) => {
  if (body.methodABI.stateMutability === 'view') {
    return sendKcsSmartContractReadMethodInvocationTransaction(body as SmartContractReadMethodInvocation, provider)
  }
  return kcsBroadcast(
    await prepareKcsSmartContractWriteMethodInvocation(body, { provider }),
    (body as SmartContractMethodInvocation).signatureId
  )
}
/**
 * Deploy new smart contract for NFT marketplace logic. Smart contract enables marketplace operator to create new listing for NFT (ERC-721/1155).
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendKcsDeployMarketplaceListingSignedTransaction = async (body: ChainDeployMarketplaceListing, provider?: string) =>
  kcsBroadcast(await prepareKcsDeployMarketplaceListingSignedTransaction(body, provider), body.signatureId)
