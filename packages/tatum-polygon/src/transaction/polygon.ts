import {
  auction,
  axios,
  BurnErc20,
  BaseBurnMultiToken,
  BaseBurnMultiTokenBatch,
  CONTRACT_ADDRESSES,
  CONTRACT_DECIMALS,
  CreateRecord,
  Currency,
  DeployErc20,
  DeployMarketplaceListing,
  DeployNftAuction,
  erc1155TokenBytecode,
  erc20TokenBytecode,
  erc721TokenBytecode,
  GenerateCustodialAddress,
  listing,
  MintErc20,
  MintMultiToken,
  MintMultiTokenBatch,
  obtainCustodialAddressType,
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
import { BigNumber } from 'bignumber.js'
import Web3 from 'web3'
import { TransactionConfig } from 'web3-core'
import { isHex, stringToHex, toHex, toWei } from 'web3-utils'
import { polygonBroadcast } from '../blockchain'
import { mintNFT } from '../nft'

/**
 * Estimate Gas price for the transaction.
 */
export const polygonGetGasPriceInWei = async () => {
  const { data } = await axios.get('https://gasstation-mainnet.matic.network')
  return Web3.utils.toWei(`${Math.max(30, Math.min(Math.ceil(data.fast / 10), 100))}`, 'gwei')
}

const prepareGeneralTx = async (
  client: Web3,
  testnet: boolean,
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
    gasPrice: gasPrice ? `0x${new BigNumber(toWei(gasPrice, 'gwei')).toString(16)}` : await polygonGetGasPriceInWei(),
  }

  if (signatureId) {
    return JSON.stringify(tx)
  }
  tx.gas = gasLimit || (await client.eth.estimateGas({ to, data: data || '', value: tx.value }))
  return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string
}

/**
 * Send Polygon transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendPolygonTransaction = async (testnet: boolean, body: TransferErc20, provider?: string) => {
  return polygonBroadcast(await preparePolygonSignedTransaction(testnet, body, provider))
}

export const preparePolygonClient = (testnet: boolean, provider?: string, fromPrivateKey?: string) => {
  const client = new Web3(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/polygon/web3/${process.env.TATUM_API_KEY}`)
  if (fromPrivateKey) {
    client.eth.accounts.wallet.clear()
    client.eth.accounts.wallet.add(fromPrivateKey)
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address
  }
  return client
}

/**
 * Sign Polygon pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @param testnet mainnet or testnet version
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const signPolygonKMSTransaction = async (tx: TransactionKMS, fromPrivateKey: string, testnet: boolean, provider?: string) => {
  if (tx.chain !== Currency.MATIC) {
    throw Error('Unsupported chain.')
  }
  const client = preparePolygonClient(testnet, provider, fromPrivateKey)
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
    transactionConfig.gasPrice = await polygonGetGasPriceInWei()
  }
  return (await client.eth.accounts.signTransaction(transactionConfig, fromPrivateKey)).rawTransaction as string
}

export const getPolygonErc20ContractDecimals = async (testnet: boolean, contractAddress: string, provider?: string) => {
  if (!contractAddress) {
    throw new Error('Contract address not set.')
  }
  const client = await preparePolygonClient(testnet, provider)
  // @ts-ignore
  const contract = new client.eth.Contract(erc20_abi, contractAddress.trim())
  return await contract.methods.decimals().call()
}

/**
 * Sign Polygon generate custodial wallet transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const preparePolygonGenerateCustodialWalletSignedTransaction = async (
  testnet: boolean,
  body: GenerateCustodialAddress,
  provider?: string
) => {
  await validateBody(body, GenerateCustodialAddress)
  const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey)
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
    testnet,
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
 * Sign Polygon transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const preparePolygonSignedTransaction = async (testnet: boolean, body: TransferErc20, provider?: string) => {
  await validateBody(body, TransferErc20)
  const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey)
  let data
  let to = body.to
  if (body.currency === Currency.MATIC) {
    data = body.data ? (client.utils.isHex(body.data) ? client.utils.stringToHex(body.data) : client.utils.toHex(body.data)) : undefined
  } else {
    to = CONTRACT_ADDRESSES[body.currency as string]
    // @ts-ignore
    const contract = new client.eth.Contract([TRANSFER_METHOD_ABI], to)
    const digits = new BigNumber(10).pow(CONTRACT_DECIMALS[body.currency as string])
    data = contract.methods.transfer(body.to.trim(), `0x${new BigNumber(body.amount).multipliedBy(digits).toString(16)}`).encodeABI()
  }
  return prepareGeneralTx(
    client,
    testnet,
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
 * Sign Polygon store data transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const preparePolygonStoreDataTransaction = async (testnet: boolean, body: CreateRecord, provider?: string) => {
  await validateBody(body, CreateRecord)
  const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey)
  const hexData = isHex(body.data) ? stringToHex(body.data) : toHex(body.data)
  return prepareGeneralTx(
    client,
    testnet,
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
 * Sign Polygon mint erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const preparePolygonMintErc20SignedTransaction = async (testnet: boolean, body: MintErc20, provider?: string) => {
  await validateBody(body, MintErc20)
  const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey)
  // @ts-ignore
  const contract = new client.eth.Contract(erc20TokenABI, body.contractAddress.trim().trim())
  const digits = new BigNumber(10).pow(await contract.methods.decimals().call())
  const data = contract.methods.mint(body.to.trim(), `0x${new BigNumber(body.amount).multipliedBy(digits).toString(16)}`).encodeABI()
  return prepareGeneralTx(
    client,
    testnet,
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
 * Sign Polygon burn erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const preparePolygonBurnErc20SignedTransaction = async (testnet: boolean, body: BurnErc20, provider?: string) => {
  await validateBody(body, BurnErc20)
  const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey)
  // @ts-ignore
  const contract = new client.eth.Contract(erc20TokenABI, body.contractAddress.trim().trim())
  const digits = new BigNumber(10).pow(await contract.methods.decimals().call())
  const data = contract.methods.burn(`0x${new BigNumber(body.amount).multipliedBy(digits).toString(16)}`).encodeABI()
  return prepareGeneralTx(
    client,
    testnet,
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
 * Sign Polygon transfer erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const preparePolygonTransferErc20SignedTransaction = async (testnet: boolean, body: TransferErc20, provider?: string) => {
  await validateBody(body, TransferErc20)
  const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey)
  const decimals = new BigNumber(10).pow(body.digits as number)
  // @ts-ignore
  const data = new client.eth.Contract(erc20TokenABI, body.contractAddress.trim().trim()).methods
    .transfer(body.to.trim(), `0x${new BigNumber(body.amount).multipliedBy(decimals).toString(16)}`)
    .encodeABI()
  return prepareGeneralTx(
    client,
    testnet,
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
 * Sign Polygon deploy erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const preparePolygonDeployErc20SignedTransaction = async (testnet: boolean, body: DeployErc20, provider?: string) => {
  await validateBody(body, DeployErc20)
  const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey)
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
    testnet,
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
 * Sign Polygon mint erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const preparePolygonMintErc721SignedTransaction = async (testnet: boolean, body: MintErc721, provider?: string) => {
  await validateBody(body, MintErc721)
  const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(erc721TokenABI, body.contractAddress.trim()).methods
    .mintWithTokenURI(body.to.trim(), body.tokenId, body.url)
    .encodeABI()
  if (body.contractAddress) {
    return prepareGeneralTx(
      client,
      testnet,
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
 * Sign Polygon mint cashback erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const preparePolygonMintCashbackErc721SignedTransaction = async (testnet: boolean, body: MintErc721, provider?: string) => {
  await validateBody(body, MintErc721)
  const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey)
  const cashbacks: string[] = body.cashbackValues!
  const cb = cashbacks.map((c) => `0x${new BigNumber(client.utils.toWei(c, 'ether')).toString(16)}`)
  // @ts-ignore
  const data = new client.eth.Contract(erc721TokenABI, body.contractAddress.trim()).methods
    .mintWithCashback(body.to.trim(), body.tokenId, body.url, body.authorAddresses, cb)
    .encodeABI()
  if (body.contractAddress) {
    return prepareGeneralTx(
      client,
      testnet,
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
 * Sign Polygon mint multiple cashback erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const preparePolygonMintMultipleCashbackErc721SignedTransaction = async (
  testnet: boolean,
  body: MintMultipleErc721,
  provider?: string
) => {
  await validateBody(body, MintMultipleErc721)
  const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey)
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
    testnet,
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
 * Sign Polygon mint multiple erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const preparePolygonMintMultipleErc721SignedTransaction = async (testnet: boolean, body: MintMultipleErc721, provider?: string) => {
  await validateBody(body, MintMultipleErc721)
  const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey)
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
    testnet,
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
 * Sign Polygon burn erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const preparePolygonBurnErc721SignedTransaction = async (testnet: boolean, body: BurnErc721, provider?: string) => {
  await validateBody(body, BurnErc721)
  const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(erc721TokenABI, body.contractAddress.trim()).methods.burn(body.tokenId).encodeABI()
  return prepareGeneralTx(
    client,
    testnet,
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
 * Sign Polygon transfer erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const preparePolygonTransferErc721SignedTransaction = async (testnet: boolean, body: TransferErc721, provider?: string) => {
  await validateBody(body, TransferErc721)
  const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(erc721TokenABI, body.contractAddress.trim()).methods
    .safeTransfer(body.to.trim(), body.tokenId)
    .encodeABI()
  return prepareGeneralTx(
    client,
    testnet,
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
 * Sign Polygon update cashback for author erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const preparePolygonUpdateCashbackForAuthorErc721SignedTransaction = async (
  testnet: boolean,
  body: UpdateCashbackErc721,
  provider?: string
) => {
  await validateBody(body, UpdateCashbackErc721)
  const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(erc721TokenABI, body.contractAddress.trim()).methods
    .updateCashbackForAuthor(body.tokenId, `0x${new BigNumber(toWei(body.cashbackValue, 'ether')).toString(16)}`)
    .encodeABI()
  return prepareGeneralTx(
    client,
    testnet,
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
 * Sign Polygon deploy erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const preparePolygonDeployErc721SignedTransaction = async (testnet: boolean, body: DeployErc721, provider?: string) => {
  await validateBody(body, DeployErc721)
  const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(erc721TokenABI)
    .deploy({
      arguments: [body.name, body.symbol],
      data: erc721TokenBytecode,
    })
    .encodeABI()
  return prepareGeneralTx(
    client,
    testnet,
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
 * Sign Polygon generate custodial wallet address transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
 */
export const preparePolygonDeployMarketplaceListingSignedTransaction = async (
  testnet: boolean,
  body: DeployMarketplaceListing,
  provider?: string
) => {
  await validateBody(body, DeployMarketplaceListing)
  const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(listing.abi)
    .deploy({
      arguments: [body.marketplaceFee, body.feeRecipient],
      data: listing.data,
    })
    .encodeABI()
  return prepareGeneralTx(
    client,
    testnet,
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
 * Sign Polygon deploy NFT Auction contract transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
 */
export const preparePolygonDeployAuctionSignedTransaction = async (testnet: boolean, body: DeployNftAuction, provider?: string) => {
  await validateBody(body, DeployNftAuction)
  const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(auction.abi)
    .deploy({
      arguments: [body.auctionFee, body.feeRecipient],
      data: auction.data,
    })
    .encodeABI()
  return prepareGeneralTx(
    client,
    testnet,
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
 * Sign Polygon burn multiple tokens transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const preparePolygonBurnMultiTokenSignedTransaction = async (testnet: boolean, body: BurnMultiToken, provider?: string) => {
  await validateBody(body, BurnMultiToken)
  const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(erc1155TokenABI, body.contractAddress.trim()).methods
    .burn(body.account.trim(), body.tokenId, body.amount)
    .encodeABI()
  return prepareGeneralTx(
    client,
    testnet,
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
 * Sign Polygon burn multiple tokens batch transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const preparePolygonBurnMultiTokenBatchSignedTransaction = async (
  testnet: boolean,
  body: BurnMultiTokenBatch,
  provider?: string
) => {
  await validateBody(body, BurnMultiTokenBatch)
  const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(erc1155TokenABI, body.contractAddress.trim()).methods
    .burnBatch(body.account.trim(), body.tokenId, body.amounts)
    .encodeABI()
  return prepareGeneralTx(
    client,
    testnet,
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
 * Sign Polygon transfer multiple tokens transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const preparePolygonTransferMultiTokenSignedTransaction = async (testnet: boolean, body: TransferMultiToken, provider?: string) => {
  await validateBody(body, TransferMultiToken)
  const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(erc1155TokenABI, body.contractAddress.trim()).methods
    .safeTransfer(body.to.trim(), body.tokenId, `0x${new BigNumber(body.amount).toString(16)}`, body.data ? body.data : '0x0')
    .encodeABI()
  return prepareGeneralTx(
    client,
    testnet,
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
 * Sign Polygon batch transfer multiple tokens transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const preparePolygonBatchTransferMultiTokenSignedTransaction = async (
  testnet: boolean,
  body: TransferMultiTokenBatch,
  provider?: string
) => {
  await validateBody(body, TransferMultiTokenBatch)
  const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey)
  const amts = body.amounts.map((amt) => `0x${new BigNumber(amt).toString(16)}`)
  // @ts-ignore
  const data = new client.eth.Contract(erc1155TokenABI, body.contractAddress.trim()).methods
    .safeBatchTransfer(
      body.to.trim(),
      body.tokenId.map((token) => token.trim()),
      amts,
      body.data ? body.data : '0x0'
    )
    .encodeABI()
  return prepareGeneralTx(
    client,
    testnet,
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
 * Sign Polygon mint multiple tokens transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const preparePolygonMintMultiTokenSignedTransaction = async (testnet: boolean, body: MintMultiToken, provider?: string) => {
  await validateBody(body, MintMultiToken)
  const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(erc1155TokenABI, body.contractAddress.trim()).methods
    .mint(body.to.trim(), body.tokenId, `0x${new BigNumber(body.amount).toString(16)}`, body.data ? body.data : '0x0')
    .encodeABI()
  return prepareGeneralTx(
    client,
    testnet,
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
 * Sign Polygon mint multiple tokens batch transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const preparePolygonMintMultiTokenBatchSignedTransaction = async (
  testnet: boolean,
  body: MintMultiTokenBatch,
  provider?: string
) => {
  await validateBody(body, MintMultiTokenBatch)
  const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey)
  const batchAmounts = body.amounts.map((amts) => amts.map((amt) => `0x${new BigNumber(amt).toString(16)}`))
  // @ts-ignore
  const data = new client.eth.Contract(erc1155TokenABI, body.contractAddress.trim()).methods
    .mintBatch(body.to, body.tokenId, batchAmounts, body.data ? body.data : '0x0')
    .encodeABI()
  return prepareGeneralTx(
    client,
    testnet,
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
 * Sign Polygon deploy multiple tokens transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const preparePolygonDeployMultiTokenSignedTransaction = async (testnet: boolean, body: DeployMultiToken, provider?: string) => {
  await validateBody(body, DeployMultiToken)
  const client = await preparePolygonClient(testnet, provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(erc1155TokenABI)
    .deploy({
      arguments: [body.uri],
      data: erc1155TokenBytecode,
    })
    .encodeABI()
  return prepareGeneralTx(
    client,
    testnet,
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
 * Sign Polygon smart contract write method invocation transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const preparePolygonSmartContractWriteMethodInvocation = async (
  testnet: boolean,
  body: SmartContractMethodInvocation,
  provider?: string
) => {
  await validateBody(body, SmartContractMethodInvocation)
  const { fromPrivateKey, fee, params, methodName, methodABI, contractAddress, nonce, amount, signatureId } = body
  const client = await preparePolygonClient(testnet, provider, fromPrivateKey)

  const data = new client.eth.Contract([methodABI]).methods[methodName as string](...params).encodeABI()
  return prepareGeneralTx(
    client,
    testnet,
    fromPrivateKey,
    signatureId,
    contractAddress.trim(),
    amount,
    nonce,
    data,
    fee?.gasLimit,
    fee?.gasPrice
  )
}

export const sendPolygonSmartContractReadMethodInvocationTransaction = async (
  testnet: boolean,
  body: SmartContractReadMethodInvocation,
  provider?: string
) => {
  await validateBody(body, SmartContractReadMethodInvocation)
  const { params, methodName, methodABI, contractAddress } = body
  const client = preparePolygonClient(testnet, provider)
  const contract = new client.eth.Contract([methodABI], contractAddress)
  return { data: await contract.methods[methodName as string](...params).call() }
}

/**
 * Send Polygon smart store data transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendPolygonStoreDataTransaction = async (testnet: boolean, body: CreateRecord, provider?: string) =>
  polygonBroadcast(await preparePolygonStoreDataTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Polygon mint erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendPolygonMintErc20SignedTransaction = async (testnet: boolean, body: MintErc20, provider?: string) =>
  polygonBroadcast(await preparePolygonMintErc20SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Polygon burn erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendPolygonBurnErc20SignedTransaction = async (testnet: boolean, body: BurnErc20, provider?: string) =>
  polygonBroadcast(await preparePolygonBurnErc20SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Polygon transfer erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendPolygonTransferErc20SignedTransaction = async (testnet: boolean, body: TransferErc20, provider?: string) =>
  polygonBroadcast(await preparePolygonTransferErc20SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Polygon deploy erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendPolygonDeployErc20SignedTransaction = async (testnet: boolean, body: DeployErc20, provider?: string) =>
  polygonBroadcast(await preparePolygonDeployErc20SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Polygon mint erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendPolygonMintErc721SignedTransaction = async (testnet: boolean, body: MintErc721, provider?: string) => {
  if (!body.fromPrivateKey && !body.fromPrivateKey) {
    return mintNFT(body)
  }
  return polygonBroadcast(await preparePolygonMintErc721SignedTransaction(testnet, body, provider), body.signatureId)
}

/**
 * Send Polygon mint cashback erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendPolygonMintCashbackErc721SignedTransaction = async (testnet: boolean, body: MintErc721, provider?: string) =>
  polygonBroadcast(await preparePolygonMintCashbackErc721SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Polygon mint multiple erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendPolygonMintMultipleCashbackErc721SignedTransaction = async (
  testnet: boolean,
  body: MintMultipleErc721,
  provider?: string
) => polygonBroadcast(await preparePolygonMintMultipleCashbackErc721SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Polygon mint multiple erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendPolygonMintMultipleErc721SignedTransaction = async (testnet: boolean, body: MintMultipleErc721, provider?: string) =>
  polygonBroadcast(await preparePolygonMintMultipleErc721SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Polygon burn erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendPolygonBurnErc721SignedTransaction = async (testnet: boolean, body: BurnErc721, provider?: string) =>
  polygonBroadcast(await preparePolygonBurnErc721SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Polygon transfer erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendPolygonTransferErc721SignedTransaction = async (testnet: boolean, body: TransferErc721, provider?: string) =>
  polygonBroadcast(await preparePolygonTransferErc721SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Polygon update cashback for author erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendPolygonUpdateCashbackForAuthorErc721SignedTransaction = async (
  testnet: boolean,
  body: UpdateCashbackErc721,
  provider?: string
) => polygonBroadcast(await preparePolygonUpdateCashbackForAuthorErc721SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Polygon deploy erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendPolygonDeployErc721SignedTransaction = async (testnet: boolean, body: DeployErc721, provider?: string) =>
  polygonBroadcast(await preparePolygonDeployErc721SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Polygon burn multiple tokens erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendPolygonBurnMultiTokenSignedTransaction = async (testnet: boolean, body: BaseBurnMultiToken, provider?: string) =>
  polygonBroadcast(await preparePolygonBurnMultiTokenSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Polygon burn multiple tokens batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendPolygonBurnMultiTokenBatchSignedTransaction = async (testnet: boolean, body: BaseBurnMultiTokenBatch, provider?: string) =>
  polygonBroadcast(await preparePolygonBurnMultiTokenBatchSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Polygon transfer multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendPolygonTransferMultiTokenSignedTransaction = async (testnet: boolean, body: TransferMultiToken, provider?: string) =>
  polygonBroadcast(await preparePolygonTransferMultiTokenSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Polygon batch transfer multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendPolygonBatchTransferMultiTokenSignedTransaction = async (
  testnet: boolean,
  body: TransferMultiTokenBatch,
  provider?: string
) => polygonBroadcast(await preparePolygonBatchTransferMultiTokenSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Polygon mint multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendPolygonMintMultiTokenSignedTransaction = async (testnet: boolean, body: MintMultiToken, provider?: string) =>
  polygonBroadcast(await preparePolygonMintMultiTokenSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Polygon mint multiple tokens batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendPolygonMintMultiTokenBatchSignedTransaction = async (testnet: boolean, body: MintMultiTokenBatch, provider?: string) =>
  polygonBroadcast(await preparePolygonMintMultiTokenBatchSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Polygon deploy multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendPolygonDeployMultiTokenSignedTransaction = async (testnet: boolean, body: DeployMultiToken, provider?: string) =>
  polygonBroadcast(await preparePolygonDeployMultiTokenSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Polygon generate custodial wallet transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendPolygonGenerateCustodialWalletSignedTransaction = async (
  testnet: boolean,
  body: GenerateCustodialAddress,
  provider?: string
) => polygonBroadcast(await preparePolygonGenerateCustodialWalletSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Polygon smart contract method invocation transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendPolygonSmartContractMethodInvocationTransaction = async (
  testnet: boolean,
  body: SmartContractMethodInvocation | SmartContractReadMethodInvocation,
  provider?: string
) => {
  if (body.methodABI.stateMutability === 'view') {
    return sendPolygonSmartContractReadMethodInvocationTransaction(testnet, body as SmartContractReadMethodInvocation, provider)
  }
  return polygonBroadcast(
    await preparePolygonSmartContractWriteMethodInvocation(testnet, body, provider),
    (body as SmartContractMethodInvocation).signatureId
  )
}
/**
 * Deploy new smart contract for NFT marketplace logic. Smart contract enables marketplace operator to create new listing for NFT (ERC-721/1155).
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendPolygonDeployMarketplaceListingSignedTransaction = async (
  testnet: boolean,
  body: DeployMarketplaceListing,
  provider?: string
) => polygonBroadcast(await preparePolygonDeployMarketplaceListingSignedTransaction(testnet, body, provider), body.signatureId)
