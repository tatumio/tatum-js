import { AxiosRequestConfig } from 'axios'
import BigNumber from 'bignumber.js'
import { broadcast } from '../blockchain'
import {
  listing,
  trc721TokenABI as trc721_abi,
  trc721TokenBytecode as trc721_bytecode,
  trc721TokenABI as abi,
  trc20TokenBytecode as bytecode,
  validateBody,
  Currency,
  SmartContractMethodInvocation,
  TransactionKMS,
  TATUM_API_URL,
  axios,
  ChainTransactionKMS,
} from '@tatumio/tatum-core'
import { obtainCustodialAddressType } from '@tatumio/tatum-defi'
import {
  CreateTronTrc10,
  CreateTronTrc20,
  DeployTronMarketplaceListing,
  FreezeTron,
  TransferTron,
  TransferTronTrc10,
  TransferTronTrc20,
  TronBurnTrc721,
  TronDeployTrc721,
  TronMintMultipleTrc721,
  TronMintTrc721,
  TronTransferTrc721,
  TronUpdateCashbackTrc721,
  GenerateTronCustodialAddress,
  ChainTronDeployTrc721,
  ChainGenerateTronCustodialAddress,
  ChainDeployTronMarketplaceListing,
  ChainTronMintTrc721,
  ChainTronTransferTrc721,
  ChainTronBurnTrc721,
  ChainTronMintMultipleTrc721,
  ChainTronUpdateCashbackTrc721,
} from '../model'

// tslint:disable-next-line:no-var-requires
const TronWeb = require('tronweb')

const prepareWeb = (provider?: string) => {
  const HttpProvider = TronWeb.providers.HttpProvider
  const url = provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/tron/node/${process.env.TATUM_API_KEY}`
  const fullNode = new HttpProvider(url)
  const solidityNode = new HttpProvider(url)
  const eventServer = new HttpProvider(url)
  const tronWeb = new TronWeb(fullNode, solidityNode, eventServer)
  tronWeb.setHeader({ 'TRON-PRO-API-KEY': process.env.TRON_PRO_API_KEY })
  return tronWeb
}

/**
 * Send Tron transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBlockchainTransaction = async (body: TransferTron) => {
  return broadcast(await prepareSignedTransaction(body), body.signatureId)
}

/**
 * Send Tron Freeze balance transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const freezeTransaction = async (body: FreezeTron) => {
  return broadcast(await prepareFreezeTransaction(body), body.signatureId)
}

/**
 * Send Tron TRC10 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendTrc10Transaction = async (testnet: boolean, body: TransferTronTrc10) => {
  return broadcast(await prepareTrc10SignedTransaction(testnet, body), body.signatureId)
}

/**
 * Send Tron TRC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendTrc20Transaction = async (body: TransferTronTrc20) => {
  return broadcast(await prepareTrc20SignedTransaction(body), body.signatureId)
}

/**
 * Create Tron TRC10 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const createTrc10Transaction = async (body: CreateTronTrc10) => {
  return broadcast(await prepareCreateTrc10SignedTransaction(body), body.signatureId)
}

/**
 * Create Tron TRC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const createTrc20Transaction = async (body: CreateTronTrc20) => {
  return broadcast(await prepareCreateTrc20SignedTransaction(body), body.signatureId)
}

/**
 * Sign Tron pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @returns transaction data to be broadcast to blockchain.
//  */
export const signKMSTransaction = async (tx: ChainTransactionKMS, fromPrivateKey: string) => {
  ;(tx as TransactionKMS).chain = Currency.TRON
  const tronWeb = prepareWeb()
  const transactionConfig = JSON.parse(tx.serializedTransaction)
  return JSON.stringify(await tronWeb.trx.sign(transactionConfig, fromPrivateKey))
}

export const convertAddressFromHex = (address: string) => TronWeb.address.fromHex(address)

export const convertAddressToHex = (address: string) => TronWeb.address.toHex(address)

/**
 * Send Tron deploy trc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendDeployTrc721SignedTransaction = async (body: ChainTronDeployTrc721) =>
  await broadcast(await prepareDeployTrc721SignedTransaction(body), body.signatureId)

/**
 * Send Tron generate custodial wallet transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendGenerateCustodialWalletSignedTransaction = async (body: ChainGenerateTronCustodialAddress, provider?: string) =>
  await broadcast(await prepareGenerateCustodialWalletSignedTransaction(body, provider), body.signatureId)

/**
 * Deploy new smart contract for NFT marketplace logic. Smart contract enables marketplace operator to create new listing for NFT (ERC-721/1155).
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum provider will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendDeployMarketplaceListingSignedTransaction = async (body: ChainDeployTronMarketplaceListing, provider?: string) =>
  await broadcast(await prepareDeployMarketplaceListingSignedTransaction(body, provider), body.signatureId)

/**
 * Send Tron mint cashback trc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintCashbackTrc721SignedTransaction = async (body: ChainTronMintTrc721) =>
  await broadcast(await prepareMintCashbackTrc721SignedTransaction(body), body.signatureId)

/**
 * Send Tron mint trc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintTrc721SignedTransaction = async (body: ChainTronMintTrc721) =>
  await broadcast(await prepareMintTrc721SignedTransaction(body), body.signatureId)

/**
 * Send Tron transfer trc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendTransferTrc721SignedTransaction = async (body: ChainTronTransferTrc721) =>
  await broadcast(await prepareTransferTrc721SignedTransaction(body), body.signatureId)

/**
 * Send Tron burn trc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBurnTrc721SignedTransaction = async (body: ChainTronBurnTrc721) =>
  await broadcast(await prepareBurnTrc721SignedTransaction(body), body.signatureId)

/**
 * Send Tron mint multiple trc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintMultipleTrc721SignedTransaction = async (body: ChainTronMintMultipleTrc721) =>
  await broadcast(await prepareMintMultipleTrc721SignedTransaction(body), body.signatureId)

/**
 * Send Tron update cashback for author trc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @returns transaction id of the transaction in the blockchain
 */
export const sendUpdateCashbackForAuthorTrc721SignedTransaction = async (body: ChainTronUpdateCashbackTrc721) =>
  await broadcast(await prepareUpdateCashbackForAuthorTrc721SignedTransaction(body), body.signatureId)

/**
 * Sign Tron transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareSignedTransaction = async (body: TransferTron, provider?: string) => {
  await validateBody(body, TransferTron)
  const { fromPrivateKey, to, amount } = body

  const tronWeb = prepareWeb(provider)
  const tx = await tronWeb.transactionBuilder.sendTrx(
    to,
    tronWeb.toSun(amount),
    tronWeb.address.fromHex(tronWeb.address.fromPrivateKey(fromPrivateKey))
  )
  return JSON.stringify(await tronWeb.trx.sign(tx, fromPrivateKey))
}

/**
 * Sign Tron Freeze balance transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider optional provider to enter. if not present, Tatum provider will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareFreezeTransaction = async (body: FreezeTron, provider?: string) => {
  await validateBody(body, FreezeTron)
  const { fromPrivateKey, receiver, amount, resource, duration } = body

  const tronWeb = prepareWeb(provider)
  const tx = await tronWeb.transactionBuilder.freezeBalance(
    tronWeb.toSun(parseFloat(amount)),
    duration,
    resource,
    tronWeb.address.fromHex(tronWeb.address.fromPrivateKey(fromPrivateKey)),
    receiver
  )
  return JSON.stringify(await tronWeb.trx.sign(tx, fromPrivateKey))
}

/**
 * Sign Tron TRC10 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param precision
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTrc10SignedTransaction = async (testnet: boolean, body: TransferTronTrc10, precision?: number, provider?: string) => {
  await validateBody(body, TransferTronTrc10)
  const { fromPrivateKey, to, tokenId, amount } = body

  const tronWeb = prepareWeb(provider)
  const tx = await tronWeb.transactionBuilder.sendToken(
    to,
    new BigNumber(amount).multipliedBy(new BigNumber(10).pow(precision || (await getTrc10Precision(testnet, tokenId)))),
    tokenId,
    tronWeb.address.fromHex(tronWeb.address.fromPrivateKey(fromPrivateKey))
  )
  return JSON.stringify(await tronWeb.trx.sign(tx, fromPrivateKey))
}

/**
 * Get TRC20 balance for the given tron address.
 * @param address the address whose balance is returned
 * @param contractAddress the TRC20 contract address
 * @param provider
 */
export const getAccountTrc20Address = async (address: string, contractAddress: string, provider?: string) => {
  if (!contractAddress) {
    throw new Error('Contract address not set.')
  }
  const tronWeb = prepareWeb(provider)
  tronWeb.setAddress(contractAddress)
  const contractInstance = await tronWeb.contract().at(contractAddress)
  return await contractInstance.balanceOf(address).call()
}

export const getTrc20ContractDecimals = async (contractAddress: string, provider?: string) => {
  if (!contractAddress) {
    throw new Error('Contract address not set.')
  }
  const tronWeb = prepareWeb(provider)
  tronWeb.setAddress(contractAddress)
  const contractInstance = await tronWeb.contract().at(contractAddress)
  return await contractInstance.decimals().call()
}

/**
 * Sign Tron custodial transfer transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param feeLimit
 * @param from
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareSmartContractInvocation = async (
  body: SmartContractMethodInvocation,
  feeLimit: number,
  from?: string,
  provider?: string
) => {
  const tronWeb = prepareWeb(provider)
  tronWeb.setAddress(body.contractAddress)
  const sender = from || tronWeb.address.fromHex(tronWeb.address.fromPrivateKey(body.fromPrivateKey))
  const { transaction } = await tronWeb.transactionBuilder.triggerSmartContract(
    tronWeb.address.toHex(body.contractAddress),
    body.methodName,
    {
      feeLimit: tronWeb.toSun(feeLimit),
      from: sender,
      callValue: tronWeb.toSun(body.amount || 0),
    },
    body.params,
    sender
  )
  if (body.signatureId) {
    return JSON.stringify(transaction)
  }
  return JSON.stringify(await tronWeb.trx.sign(transaction, body.fromPrivateKey))
}

/**
 * Sign Tron custodial transfer batch transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param feeLimit
 * @param from
 * @param options
 * @param options.provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareCustodialTransferBatch = async (
  body: SmartContractMethodInvocation,
  feeLimit: number,
  from?: string,
  options?: {
    provider?: string
  }
) => {
  const tronWeb = prepareWeb(options?.provider)
  tronWeb.setAddress(body.contractAddress)
  const sender = from || tronWeb.address.fromHex(tronWeb.address.fromPrivateKey(body.fromPrivateKey))
  const { transaction } = await tronWeb.transactionBuilder.triggerSmartContract(
    tronWeb.address.toHex(body.contractAddress),
    'transferBatch(address[],uint256[],address[],uint256[],uint256[])',
    {
      feeLimit: tronWeb.toSun(feeLimit),
      from: sender,
    },
    [
      { type: 'address[]', value: body.params[0].map(tronWeb.address.toHex) },
      { type: 'uint256[]', value: body.params[1] },
      { type: 'address[]', value: body.params[2].map(tronWeb.address.toHex) },
      { type: 'uint256[]', value: body.params[3] },
      { type: 'uint256[]', value: body.params[4] },
    ],
    sender
  )
  if (body.signatureId) {
    return JSON.stringify(transaction)
  }
  return JSON.stringify(await tronWeb.trx.sign(transaction, body.fromPrivateKey))
}

/**
 * Sign Tron TRC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTrc20SignedTransaction = async (body: TransferTronTrc20, provider?: string) => {
  await validateBody(body, TransferTronTrc20)
  const { fromPrivateKey, to, tokenAddress, amount, feeLimit } = body

  const tronWeb = prepareWeb(provider)
  tronWeb.setAddress(tokenAddress)
  const contractInstance = await tronWeb.contract().at(tokenAddress)
  const decimals = await contractInstance.decimals().call()
  const { transaction } = await tronWeb.transactionBuilder.triggerSmartContract(
    tronWeb.address.toHex(tokenAddress),
    'transfer(address,uint256)',
    {
      feeLimit: tronWeb.toSun(feeLimit),
      from: tronWeb.address.fromHex(tronWeb.address.fromPrivateKey(fromPrivateKey)),
    },
    [
      { type: 'address', value: tronWeb.address.toHex(to) },
      {
        type: 'uint256',
        value: `0x${new BigNumber(amount).multipliedBy(new BigNumber(10).pow(decimals)).toString(16)}`,
      },
    ],
    tronWeb.address.fromHex(tronWeb.address.fromPrivateKey(fromPrivateKey))
  )
  return JSON.stringify(await tronWeb.trx.sign(transaction, fromPrivateKey))
}

/**
 * Sign create Tron TRC10 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareCreateTrc10SignedTransaction = async (body: CreateTronTrc10, provider?: string) => {
  await validateBody(body, CreateTronTrc10)
  const { fromPrivateKey, name, abbreviation, description, url, totalSupply, decimals } = body

  const tronWeb = prepareWeb(provider)
  const tx = await tronWeb.transactionBuilder.createToken(
    {
      name,
      abbreviation,
      description,
      url,
      totalSupply: new BigNumber(totalSupply).multipliedBy(new BigNumber(10).pow(decimals)),
      trxRatio: 1,
      tokenRatio: 1,
      saleStart: Date.now() + 60000,
      saleEnd: Date.now() + 100000,
      freeBandwidth: 0,
      freeBandwidthLimit: 0,
      frozenAmount: 0,
      frozenDuration: 0,
      precision: decimals,
    },
    tronWeb.address.fromPrivateKey(fromPrivateKey)
  )
  return JSON.stringify(await tronWeb.trx.sign(tx, fromPrivateKey))
}

/**
 * Sign create Tron TRC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareCreateTrc20SignedTransaction = async (body: CreateTronTrc20, provider?: string) => {
  await validateBody(body, CreateTronTrc20)
  const { fromPrivateKey, name, decimals, recipient, symbol, totalSupply } = body

  const tronWeb = prepareWeb(provider)
  const tx = await tronWeb.transactionBuilder.createSmartContract(
    {
      feeLimit: 1000000000,
      callValue: 0,
      userFeePercentage: 100,
      originEnergyLimit: 1,
      abi: JSON.stringify(abi),
      bytecode,
      parameters: [name, symbol, decimals, tronWeb.address.toHex(recipient), totalSupply],
      name,
    },
    tronWeb.address.fromPrivateKey(fromPrivateKey)
  )
  return JSON.stringify(await tronWeb.trx.sign(tx, fromPrivateKey))
}

/**
 * Prepare Tron transaction for KMS. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareSignedKMSTransaction = async (body: TransferTron, provider?: string) => {
  await validateBody(body, TransferTron)
  const { from, to, amount } = body

  const tronWeb = prepareWeb(provider)
  const tx = await tronWeb.transactionBuilder.sendTrx(to, tronWeb.toSun(amount), from)
  return JSON.stringify(tx)
}

/**
 * Prepare Tron Freeze balance transaction for KMS. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareFreezeKMSTransaction = async (body: FreezeTron, provider?: string) => {
  await validateBody(body, FreezeTron)
  const { from, receiver, amount, resource, duration } = body

  const tronWeb = prepareWeb(provider)
  const tx = await tronWeb.transactionBuilder.freezeBalance(tronWeb.toSun(parseFloat(amount)), duration, resource, from, receiver)
  return JSON.stringify(tx)
}

/**
 * Prepare Tron TRC10 transaction for KMS. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param precision
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTrc10SignedKMSTransaction = async (
  testnet: boolean,
  body: TransferTronTrc10,
  precision?: number,
  provider?: string
) => {
  await validateBody(body, TransferTronTrc10)
  const { from, to, tokenId, amount } = body

  const tronWeb = prepareWeb(provider)
  const tx = await tronWeb.transactionBuilder.sendToken(
    to,
    new BigNumber(amount).multipliedBy(new BigNumber(10).pow(precision || (await getTrc10Precision(testnet, tokenId)))),
    tokenId,
    from
  )
  return JSON.stringify(tx)
}

/**
 * Prepare Tron TRC20 transaction for KMS. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTrc20SignedKMSTransaction = async (body: TransferTronTrc20, provider?: string) => {
  await validateBody(body, TransferTronTrc20)
  const { from, to, tokenAddress, amount, feeLimit } = body

  const tronWeb = prepareWeb(provider)
  tronWeb.setAddress(tokenAddress)
  const contractInstance = await tronWeb.contract().at(tokenAddress)
  const decimals = await contractInstance.decimals().call()
  const { transaction } = await tronWeb.transactionBuilder.triggerSmartContract(
    tronWeb.address.toHex(tokenAddress),
    'transfer(address,uint256)',
    {
      feeLimit: tronWeb.toSun(feeLimit),
      from,
    },
    [
      { type: 'address', value: tronWeb.address.toHex(to) },
      {
        type: 'uint256',
        value: `0x${new BigNumber(amount).multipliedBy(new BigNumber(10).pow(decimals)).toString(16)}`,
      },
    ],
    from
  )
  return JSON.stringify(transaction)
}

/**
 * Prepare create Tron TRC10 transaction for KMS. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareCreateTrc10SignedKMSTransaction = async (body: CreateTronTrc10, provider?: string) => {
  await validateBody(body, CreateTronTrc10)
  const { from, name, abbreviation, description, url, totalSupply, decimals } = body

  const tronWeb = prepareWeb(provider)
  const tx = await tronWeb.transactionBuilder.createToken(
    {
      name,
      abbreviation,
      description,
      url,
      totalSupply: new BigNumber(totalSupply).multipliedBy(new BigNumber(10).pow(decimals)),
      trxRatio: 1,
      tokenRatio: 1,
      saleStart: Date.now() + 60000,
      saleEnd: Date.now() + 100000,
      freeBandwidth: 0,
      freeBandwidthLimit: 0,
      frozenAmount: 0,
      frozenDuration: 0,
      precision: decimals,
    },
    from
  )
  return JSON.stringify(tx)
}

/**
 * Prepare create Tron TRC20 transaction for KMS. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareCreateTrc20SignedKMSTransaction = async (body: CreateTronTrc20, provider?: string) => {
  await validateBody(body, CreateTronTrc20)
  const { from, name, decimals, recipient, symbol, totalSupply } = body

  const tronWeb = prepareWeb(provider)
  const tx = await tronWeb.transactionBuilder.createSmartContract(
    {
      feeLimit: 1000000000,
      callValue: 0,
      userFeePercentage: 100,
      originEnergyLimit: 1,
      abi: JSON.stringify(abi),
      bytecode,
      parameters: [name, symbol, decimals, tronWeb.address.toHex(recipient), totalSupply],
      name,
    },
    from
  )
  return JSON.stringify(tx)
}

/**
 * Sign Tron deploy trc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareDeployTrc721SignedTransaction = async (body: ChainTronDeployTrc721, provider?: string) => {
  ;(body as TronDeployTrc721).chain = Currency.TRON
  await validateBody(body, TronDeployTrc721)
  const { fromPrivateKey, name, symbol, feeLimit, signatureId, from } = body

  const tronWeb = prepareWeb(provider)
  const tx = await tronWeb.transactionBuilder.createSmartContract(
    {
      feeLimit: tronWeb.toSun(feeLimit),
      callValue: 0,
      userFeePercentage: 100,
      originEnergyLimit: 1,
      abi: JSON.stringify(trc721_abi),
      bytecode: trc721_bytecode,
      parameters: [name, symbol],
      name,
    },
    from || tronWeb.address.fromPrivateKey(fromPrivateKey)
  )
  if (signatureId) {
    return JSON.stringify(tx)
  }
  return JSON.stringify(await tronWeb.trx.sign(tx, fromPrivateKey))
}

/**
 * Sign Tron generate custodial wallet transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareGenerateCustodialWalletSignedTransaction = async (body: ChainGenerateTronCustodialAddress, provider?: string) => {
  ;(body as GenerateTronCustodialAddress).chain = Currency.TRON
  await validateBody(body, GenerateTronCustodialAddress)
  const tronWeb = prepareWeb(provider)
  const { abi, code } = obtainCustodialAddressType({ ...body, chain: Currency.TRON })
  const tx = await tronWeb.transactionBuilder.createSmartContract(
    {
      feeLimit: tronWeb.toSun(body.feeLimit || 100),
      callValue: 0,
      userFeePercentage: 100,
      originEnergyLimit: 1,
      abi: JSON.stringify(abi),
      bytecode: code,
      parameters: [],
      name: 'CustodialWallet',
    },
    body.from || tronWeb.address.fromPrivateKey(body.fromPrivateKey)
  )
  if (body.signatureId) {
    return JSON.stringify(tx)
  }
  return JSON.stringify(await tronWeb.trx.sign(tx, body.fromPrivateKey))
}

/**
 * Sign TRON deploy new smart contract for NFT marketplace transaction. Smart contract enables marketplace operator to create new listing for NFT (ERC-721/1155).
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum provider will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareDeployMarketplaceListingSignedTransaction = async (body: ChainDeployTronMarketplaceListing, provider?: string) => {
  ;(body as DeployTronMarketplaceListing).chain = Currency.TRON
  await validateBody(body, DeployTronMarketplaceListing)
  const tronWeb = prepareWeb(provider)
  const tx = await tronWeb.transactionBuilder.createSmartContract(
    {
      feeLimit: tronWeb.toSun(body.feeLimit || 300),
      callValue: 0,
      userFeePercentage: 100,
      originEnergyLimit: 1,
      abi: JSON.stringify(listing.abi),
      bytecode: listing.data,
      parameters: [body.marketplaceFee, body.feeRecipient],
      name: 'CustodialWallet',
    },
    body.from || tronWeb.address.fromPrivateKey(body.fromPrivateKey)
  )
  if (body.signatureId) {
    return JSON.stringify(tx)
  }
  return JSON.stringify(await tronWeb.trx.sign(tx, body.fromPrivateKey))
}

/**
 * Sign Tron deploy trc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintCashbackTrc721SignedTransaction = async (body: ChainTronMintTrc721, provider?: string) => {
  ;(body as TronMintTrc721).chain = Currency.TRON
  await validateBody(body, TronMintTrc721)
  const { fromPrivateKey, url, to, tokenId, contractAddress, feeLimit, from, signatureId, authorAddresses, cashbackValues } = body

  const tronWeb = prepareWeb(provider)
  tronWeb.setAddress(contractAddress)
  const sender = from || tronWeb.address.fromHex(tronWeb.address.fromPrivateKey(fromPrivateKey))
  const cb: string[] = []
  for (const c of cashbackValues!) {
    cb.push(`0x${new BigNumber(c).multipliedBy(1e6).toString(16)}`)
  }
  const { transaction } = await tronWeb.transactionBuilder.triggerSmartContract(
    tronWeb.address.toHex(contractAddress),
    'mintWithCashback(address,uint256,string,address[],uint256[])',
    {
      feeLimit: tronWeb.toSun(feeLimit),
      from: sender,
    },
    [
      { type: 'address', value: tronWeb.address.toHex(to) },
      {
        type: 'uint256',
        value: `0x${new BigNumber(tokenId).toString(16)}`,
      },
      {
        type: 'string',
        value: url,
      },
      {
        type: 'address[]',
        value: authorAddresses?.map((a) => tronWeb.address.toHex(a)),
      },
      {
        type: 'uint256[]',
        value: cb,
      },
    ],
    sender
  )
  return JSON.stringify(signatureId ? transaction : await tronWeb.trx.sign(transaction, fromPrivateKey))
}

/**
 * Sign Tron mint trc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintTrc721SignedTransaction = async (body: ChainTronMintTrc721, provider?: string) => {
  ;(body as TronMintTrc721).chain = Currency.TRON
  await validateBody(body, TronMintTrc721)
  const { fromPrivateKey, url, to, tokenId, contractAddress, from, feeLimit, signatureId } = body

  const tronWeb = prepareWeb(provider)
  tronWeb.setAddress(contractAddress)
  const sender = from || tronWeb.address.fromHex(tronWeb.address.fromPrivateKey(fromPrivateKey))
  const { transaction } = await tronWeb.transactionBuilder.triggerSmartContract(
    tronWeb.address.toHex(contractAddress),
    'mintWithTokenURI(address,uint256,string)',
    {
      feeLimit: tronWeb.toSun(feeLimit),
      from: sender,
    },
    [
      { type: 'address', value: tronWeb.address.toHex(to) },
      {
        type: 'uint256',
        value: `0x${new BigNumber(tokenId).toString(16)}`,
      },
      {
        type: 'string',
        value: url,
      },
    ],
    sender
  )
  return JSON.stringify(signatureId ? transaction : await tronWeb.trx.sign(transaction, fromPrivateKey))
}

/**
 * Sign Tron transfer trc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTransferTrc721SignedTransaction = async (body: ChainTronTransferTrc721, provider?: string) => {
  ;(body as TronTransferTrc721).chain = Currency.TRON
  await validateBody(body, TronTransferTrc721)
  const { fromPrivateKey, to, tokenId, contractAddress, feeLimit, from, signatureId, value } = body

  const tronWeb = prepareWeb(provider)
  tronWeb.setAddress(contractAddress)
  const sender = from || tronWeb.address.fromHex(tronWeb.address.fromPrivateKey(fromPrivateKey))
  const { transaction } = await tronWeb.transactionBuilder.triggerSmartContract(
    tronWeb.address.toHex(contractAddress),
    'safeTransfer(address,uint256)',
    {
      feeLimit: tronWeb.toSun(feeLimit),
      from: sender,
      callValue: value ? `0x${new BigNumber(value).multipliedBy(1e6).toString(16)}` : 0,
    },
    [
      { type: 'address', value: tronWeb.address.toHex(to) },
      {
        type: 'uint256',
        value: `0x${new BigNumber(tokenId as string).toString(16)}`,
      },
    ],
    sender
  )
  return JSON.stringify(signatureId ? transaction : await tronWeb.trx.sign(transaction, fromPrivateKey))
}

/**
 * Sign Tron burn trc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBurnTrc721SignedTransaction = async (body: ChainTronBurnTrc721, provider?: string) => {
  ;(body as TronBurnTrc721).chain = Currency.TRON
  await validateBody(body, TronBurnTrc721)
  const { fromPrivateKey, tokenId, contractAddress, feeLimit, from, signatureId } = body

  const tronWeb = prepareWeb(provider)
  tronWeb.setAddress(contractAddress)
  const sender = from || tronWeb.address.fromHex(tronWeb.address.fromPrivateKey(fromPrivateKey))
  const { transaction } = await tronWeb.transactionBuilder.triggerSmartContract(
    tronWeb.address.toHex(contractAddress),
    'burn(uint256)',
    {
      feeLimit: tronWeb.toSun(feeLimit),
      from: sender,
    },
    [
      {
        type: 'uint256',
        value: `0x${new BigNumber(tokenId).toString(16)}`,
      },
    ],
    sender
  )
  return JSON.stringify(signatureId ? transaction : await tronWeb.trx.sign(transaction, fromPrivateKey))
}

/**
 * Sign Tron mint multiple trc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintMultipleTrc721SignedTransaction = async (body: ChainTronMintMultipleTrc721, provider?: string) => {
  ;(body as TronMintMultipleTrc721).chain = Currency.TRON
  await validateBody(body, TronMintMultipleTrc721)
  const { fromPrivateKey, to, tokenId, contractAddress, url, feeLimit, from, signatureId } = body

  const tronWeb = prepareWeb(provider)
  tronWeb.setAddress(contractAddress)
  const sender = from || tronWeb.address.fromHex(tronWeb.address.fromPrivateKey(fromPrivateKey))
  const { transaction } = await tronWeb.transactionBuilder.triggerSmartContract(
    tronWeb.address.toHex(contractAddress),
    'mintMultiple(address[],uint256[],string[])',
    {
      feeLimit: tronWeb.toSun(feeLimit),
      from: sender,
    },
    [
      {
        type: 'address[]',
        value: to.map((a) => tronWeb.address.toHex(a)),
      },
      {
        type: 'uint256[]',
        value: tokenId.map((t) => `0x${new BigNumber(t).toString(16)}`),
      },
      {
        type: 'string[]',
        value: url,
      },
    ],
    sender
  )
  return JSON.stringify(signatureId ? transaction : await tronWeb.trx.sign(transaction, fromPrivateKey))
}

/**
 * Sign Tron update cashback for author trc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareUpdateCashbackForAuthorTrc721SignedTransaction = async (body: ChainTronUpdateCashbackTrc721, provider?: string) => {
  ;(body as TronUpdateCashbackTrc721).chain = Currency.TRON
  await validateBody(body, TronUpdateCashbackTrc721)
  const { fromPrivateKey, cashbackValue, tokenId, contractAddress, feeLimit, from, signatureId } = body

  const tronWeb = prepareWeb(provider)
  tronWeb.setAddress(contractAddress)
  const sender = from || tronWeb.address.fromHex(tronWeb.address.fromPrivateKey(fromPrivateKey))
  const { transaction } = await tronWeb.transactionBuilder.triggerSmartContract(
    tronWeb.address.toHex(contractAddress),
    'updateCashbackForAuthor(uint256,uint256)',
    {
      feeLimit: tronWeb.toSun(feeLimit),
      from: sender,
    },
    [
      {
        type: 'uint256',
        value: `0x${new BigNumber(tokenId).toString(16)}`,
      },
      {
        type: 'uint256',
        value: `0x${new BigNumber(cashbackValue).multipliedBy(1e6).toString(16)}`,
      },
    ],
    sender
  )
  return JSON.stringify(signatureId ? transaction : await tronWeb.trx.sign(transaction, fromPrivateKey))
}

/**
 * Sign Tron pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @returns transaction data to be broadcast to blockchain.
 */
export const signTrxKMSTransaction = async (tx: ChainTransactionKMS, fromPrivateKey: string) => {
  ;(tx as TransactionKMS).chain = Currency.TRON
  const transactionConfig = JSON.parse(tx.serializedTransaction)
  const tronWeb = prepareWeb()
  return JSON.stringify(await tronWeb.trx.sign(transactionConfig, fromPrivateKey))
}

export const transferHexToBase58Address = (address: string) => TronWeb.address.fromHex(address)

const getTrc10Precision = async (testnet: boolean, tokenId: string): Promise<number> => {
  const config = {
    method: 'GET',
    url: `/v1/assets/${tokenId}`,
    baseURL: `${testnet ? 'https://api.shasta.trongrid.io' : 'https://api.trongrid.io'}`,
    headers: {
      'content-type': 'application/json',
      'TRON-PRO-API-KEY': process.env.TRON_PRO_API_KEY,
    },
  }
  const { data } = (await axios.request(config as AxiosRequestConfig)).data
  if (!data?.length) {
    throw new Error('No such asset.')
  }
  return data[0].precision
  throw new Error('Get TRC10 precision error.')
}
