import { BigNumber } from 'bignumber.js'
import Web3 from 'web3'
import { TransactionConfig } from 'web3-core'
import { toWei } from 'web3-utils'
import { broadcast, getTransactionsCount } from '../blockchain'
import {
  axios,
  validateBody,
  TATUM_API_URL,
  TRANSFER_METHOD_ABI,
  erc20TokenABI,
  erc20TokenBytecode,
  erc721TokenABI,
  erc721TokenBytecode,
  BurnErc20,
  CreateRecord,
  Currency,
  DeployErc20,
  BurnErc721,
  DeployErc721,
  MintErc721,
  MintMultipleErc721,
  TransferErc721,
  Fee,
  MintErc20,
  SmartContractMethodInvocation,
  SmartContractReadMethodInvocation,
  TransactionKMS,
  TransferErc20,
  UpdateCashbackErc721,
  ChainTransactionKMS,
  ChainCreateRecord,
  ChainMintErc721,
  ChainMintMultipleErc721,
  ChainBurnErc721,
  ChainTransferErc721,
  ChainUpdateCashbackErc721,
  ChainDeployErc721,
  ChainTransferErc20,
} from '@tatumio/tatum-core'

/**
 * Convert XDC address format.
 */
export const fromAddress = (xdcAddress: string): string => {
  return xdcAddress.trim().replace('xdc', '0x')
}

/**
 * Estimate Gas price for the transaction.
 */
export const getGasPriceInWei = async (): Promise<string> => {
  const gasStationUrl = 'https://rpc.xinfin.network/'
  try {
    const { data } = await axios.post(`${gasStationUrl}gasPrice`, { jsonrpc: '2.0', method: 'eth_gasPrice', params: [], id: 1 })
    const res = data ? Web3.utils.toWei(data, 'wei') : Web3.utils.toWei('5', 'kwei')
    return res.toString()
  } catch (e) {
    return Web3.utils.toWei('5', 'kwei').toString()
  }
  return Web3.utils.toWei('5', 'kwei').toString()
}

/**
 * Returns XDC server to connect to.
 *
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @param fromPrivateKey optional private key of sender account
 */
export const getClient = (provider?: string, fromPrivateKey?: string) => {
  const client = new Web3(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/xdc/web3/${process.env.TATUM_API_KEY}`)
  if (fromPrivateKey) {
    client.eth.accounts.wallet.clear()
    client.eth.accounts.wallet.add(fromPrivateKey)
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address
  }
  return client
}

/**
 * Sign XDC pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const signKMSTransaction = async (tx: ChainTransactionKMS, fromPrivateKey: string, provider?: string) => {
  ;(tx as TransactionKMS).chain = Currency.XDC
  const client = getClient(provider, fromPrivateKey)
  const transactionConfig = JSON.parse(tx.serializedTransaction)
  transactionConfig.gas = await client.eth.estimateGas(transactionConfig)
  if (!transactionConfig.nonce) {
    transactionConfig.nonce = await getTransactionsCount(client.eth.defaultAccount as string)
  }
  return (await client.eth.accounts.signTransaction(transactionConfig, fromPrivateKey as string)).rawTransaction as string
}

/**
 * Sign XDC Store data transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareStoreDataTransaction = async (body: ChainCreateRecord, provider?: string) => {
  ;(body as CreateRecord).chain = Currency.XDC
  await validateBody(body, CreateRecord)
  const { fromPrivateKey, to, ethFee, data, nonce, signatureId } = body
  const client = getClient(provider, fromPrivateKey)
  const address = to || client.eth.defaultAccount
  if (!address) {
    throw new Error('Recipient must be provided.')
  }
  const hexData = client.utils.isHex(data) ? client.utils.stringToHex(data) : client.utils.toHex(data)
  const addressNonce = nonce ? nonce : await getTransactionsCount(address)
  const customFee = ethFee
    ? {
        ...ethFee,
        gasPrice: client.utils.toWei(ethFee.gasPrice, 'gwei'),
      }
    : {
        gasLimit: `${hexData.length * 68 + 21000}`,
        gasPrice: await getGasPriceInWei(),
      }

  const tx: TransactionConfig = {
    from: 0,
    to: fromAddress(address),
    value: '0',
    gasPrice: customFee.gasPrice,
    gas: customFee.gasLimit,
    data: hexData,
    nonce: addressNonce,
  }

  if (signatureId) {
    return JSON.stringify(tx)
  }

  return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string
}

/**
 * Sign ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param client Web3 client of the XDC Server to connect to. If not set, default public server will be used.
 * @param transaction content of the transaction to broadcast
 * @param signatureId signature ID
 * @param fromPrivateKey private key
 * @param fee Fee object
 * @returns transaction data to be broadcast to blockchain.
 */
const prepareErc20SignedTransactionAbstraction = async (
  client: Web3,
  transaction: TransactionConfig,
  signatureId: string | undefined,
  fromPrivateKey: string | undefined,
  fee?: Fee | undefined
) => {
  const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await getGasPriceInWei()
  const tx = {
    ...transaction,
    gasPrice,
  }

  if (signatureId) {
    return JSON.stringify(tx)
  }

  tx.gas = fee?.gasLimit ?? (await client.eth.estimateGas(tx))
  return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string
}

/**
 * Sign ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintErc20SignedTransaction = async (body: MintErc20, provider?: string) => {
  await validateBody(body, MintErc20)
  const { fromPrivateKey, amount, to, contractAddress, nonce, signatureId } = body

  const client = getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc20TokenABI, fromAddress(contractAddress))
  const digits = new BigNumber(10).pow(await contract.methods.decimals().call())
  const tx: TransactionConfig = {
    from: 0,
    to: fromAddress(contractAddress),
    data: contract.methods.mint(fromAddress(to), `0x${new BigNumber(amount).multipliedBy(digits).toString(16)}`).encodeABI(),
    nonce,
  }

  return await prepareErc20SignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey)
}

/**
 * Sign ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBurnErc20SignedTransaction = async (body: BurnErc20, provider?: string) => {
  await validateBody(body, BurnErc20)
  const { fromPrivateKey, amount, contractAddress, nonce, signatureId } = body

  const client = getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc20TokenABI, fromAddress(contractAddress))
  const digits = new BigNumber(10).pow(await contract.methods.decimals().call())
  const tx: TransactionConfig = {
    from: 0,
    to: fromAddress(contractAddress),
    data: contract.methods.burn(`0x${new BigNumber(amount).multipliedBy(digits).toString(16)}`).encodeABI(),
    nonce,
  }

  return await prepareErc20SignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey)
}

/**
 * Sign XDC or supported ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareXdcOrErc20SignedTransaction = async (body: TransferErc20, provider?: string) => {
  await validateBody(body, TransferErc20)
  const { fromPrivateKey, to, amount, fee, data, nonce, signatureId } = body

  const client = getClient(provider, fromPrivateKey)

  const tx: TransactionConfig = {
    from: 0,
    to: fromAddress(to),
    value: client.utils.toWei(`${amount}`, 'ether'),
    data: client.utils.isHex(data as string | number)
      ? client.utils.stringToHex(data as string)
      : client.utils.toHex(data as string | number),
    nonce,
  }

  return await prepareErc20SignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign XDC custom ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareCustomErc20SignedTransaction = async (body: TransferErc20, provider?: string) => {
  await validateBody(body, TransferErc20)
  const { fromPrivateKey, to, amount, contractAddress, digits, fee, nonce, signatureId } = body

  const client = getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract([TRANSFER_METHOD_ABI], fromAddress(contractAddress))
  const decimals = new BigNumber(10).pow(digits as number)
  const tx: TransactionConfig = {
    from: 0,
    to: fromAddress(contractAddress as string),
    data: contract.methods.transfer(fromAddress(to), `0x${new BigNumber(amount).multipliedBy(decimals).toString(16)}`).encodeABI(),
    nonce,
  }

  return await prepareErc20SignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign XDC deploy ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareDeployErc20SignedTransaction = async (body: DeployErc20, provider?: string) => {
  await validateBody(body, DeployErc20)
  const { name, address, symbol, supply, digits, fromPrivateKey, nonce, fee, signatureId, totalCap } = body

  const client = getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc20TokenABI)
  const _digits = new BigNumber(10).pow(digits)
  const deploy = contract.deploy({
    data: erc20TokenBytecode,
    arguments: [
      name,
      symbol,
      address,
      digits,
      `0x${new BigNumber(totalCap || supply).multipliedBy(_digits).toString(16)}`,
      `0x${new BigNumber(supply).multipliedBy(_digits).toString(16)}`,
    ],
  })
  const tx: TransactionConfig = {
    from: 0,
    data: deploy.encodeABI(),
    nonce,
  }

  return await prepareErc20SignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign XDC invoke smart contract transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareSmartContractWriteMethodInvocation = async (body: SmartContractMethodInvocation, provider?: string) => {
  await validateBody(body, SmartContractMethodInvocation)
  const { fromPrivateKey, fee, params, methodName, methodABI, contractAddress, amount, nonce, signatureId } = body
  const client = getClient(provider, fromPrivateKey)

  const contract = new client.eth.Contract([methodABI])

  const tx: TransactionConfig = {
    from: 0,
    to: fromAddress(contractAddress),
    value: toWei(amount || '0', 'ether'),
    data: contract.methods[methodName as string](...params).encodeABI(),
    nonce,
  }

  return await prepareErc20SignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign XDC mint ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintErc721SignedTransaction = async (body: ChainMintErc721, provider?: string) => {
  ;(body as MintErc721).chain = Currency.XDC
  await validateBody(body, MintErc721)
  const { fromPrivateKey, to, tokenId, contractAddress, nonce, fee, url, signatureId } = body

  const client = getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc721TokenABI, fromAddress(contractAddress))
  if (contractAddress) {
    const tx: TransactionConfig = {
      from: 0,
      to: fromAddress(contractAddress),
      data: contract.methods.mintWithTokenURI(fromAddress(to), tokenId, url).encodeABI(),
      nonce,
    }

    return await prepareErc20SignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
  }
  throw new Error('Contract address should not be empty!')
}
/**
 * Sign XDC mint ERC 721 transaction with cashback via private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintErcCashback721SignedTransaction = async (body: ChainMintErc721, provider?: string) => {
  ;(body as MintErc721).chain = Currency.XDC
  await validateBody(body, MintErc721)
  const { fromPrivateKey, to, tokenId, contractAddress, nonce, fee, url, signatureId, authorAddresses, cashbackValues } = body

  const client = getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc721TokenABI, fromAddress(contractAddress))
  const cb: string[] = []
  const cashbacks: string[] = cashbackValues!
  for (const c of cashbacks) {
    cb.push(`0x${new BigNumber(client.utils.toWei(c, 'ether')).toString(16)}`)
  }

  if (contractAddress) {
    const tx: TransactionConfig = {
      from: 0,
      to: fromAddress(contractAddress),
      data: contract.methods.mintWithCashback(fromAddress(to), tokenId, url, authorAddresses, cb).encodeABI(),
      nonce,
    }

    return await prepareErc20SignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
  }
  throw new Error('Contract address should not be empty!')
}

/**
 * Sign XDC mint multiple ERC 721 Cashback transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintMultipleCashbackErc721SignedTransaction = async (body: ChainMintMultipleErc721, provider?: string) => {
  ;(body as MintMultipleErc721).chain = Currency.XDC
  await validateBody(body, MintMultipleErc721)
  const { fromPrivateKey, to, tokenId, contractAddress, url, nonce, signatureId, authorAddresses, cashbackValues, fee } = body

  const client = await getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc721TokenABI, fromAddress(contractAddress))
  const cashbacks: string[][] = cashbackValues!
  const cb: string[][] = []

  for (const c of cashbacks) {
    const cb2: string[] = []
    for (const c2 of c) {
      cb2.push(`0x${new BigNumber(client.utils.toWei(c2, 'ether')).toString(16)}`)
    }
    cb.push(cb2)
  }
  const tx: TransactionConfig = {
    from: 0,
    to: fromAddress(contractAddress),
    data: contract.methods
      .mintMultipleCashback(
        to.map((t) => fromAddress(t)),
        tokenId,
        url,
        authorAddresses,
        cb
      )
      .encodeABI(),
    nonce,
  }

  return await prepareErc20SignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign XDC mint multiple ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintMultipleErc721SignedTransaction = async (body: ChainMintMultipleErc721, provider?: string) => {
  ;(body as MintMultipleErc721).chain = Currency.XDC
  await validateBody(body, MintMultipleErc721)
  const { fromPrivateKey, to, tokenId, contractAddress, url, nonce, signatureId, fee } = body

  const client = await getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc721TokenABI, fromAddress(contractAddress))

  const tx: TransactionConfig = {
    from: 0,
    to: fromAddress(contractAddress),
    data: contract.methods
      .mintMultiple(
        to.map((t) => fromAddress(t)),
        tokenId,
        url
      )
      .encodeABI(),
    nonce,
  }

  return await prepareErc20SignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign XDC burn ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBurnErc721SignedTransaction = async (body: ChainBurnErc721, provider?: string) => {
  ;(body as BurnErc721).chain = Currency.XDC
  await validateBody(body, BurnErc721)
  const { fromPrivateKey, tokenId, fee, contractAddress, nonce, signatureId } = body

  const client = getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc721TokenABI, fromAddress(contractAddress))
  const tx: TransactionConfig = {
    from: 0,
    to: fromAddress(contractAddress),
    data: contract.methods.burn(tokenId).encodeABI(),
    nonce,
  }

  return await prepareErc20SignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign XDC transfer ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTransferErc721SignedTransaction = async (body: ChainTransferErc721, provider?: string) => {
  ;(body as TransferErc721).chain = Currency.XDC
  await validateBody(body, TransferErc721)
  const { fromPrivateKey, to, tokenId, fee, contractAddress, nonce, signatureId, value } = body

  const client = await getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc721TokenABI, fromAddress(contractAddress))

  const tx: TransactionConfig = {
    from: 0,
    to: fromAddress(contractAddress),
    data: contract.methods.safeTransfer(fromAddress(to), tokenId).encodeABI(),
    nonce,
    value: value ? `0x${new BigNumber(value).multipliedBy(1e18).toString(16)}` : undefined,
  }

  return await prepareErc20SignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign XDC update cashback ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareUpdateCashbackForAuthorErc721SignedTransaction = async (body: ChainUpdateCashbackErc721, provider?: string) => {
  ;(body as UpdateCashbackErc721).chain = Currency.XDC
  await validateBody(body, UpdateCashbackErc721)
  const { fromPrivateKey, cashbackValue, tokenId, fee, contractAddress, nonce, signatureId } = body

  const client = await getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc721TokenABI, fromAddress(contractAddress))

  const tx: TransactionConfig = {
    from: 0,
    to: fromAddress(contractAddress),
    data: contract.methods.updateCashbackForAuthor(tokenId, `0x${new BigNumber(toWei(cashbackValue, 'ether')).toString(16)}`).encodeABI(),
    nonce,
  }

  return await prepareErc20SignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign XDC deploy ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareDeployErc721SignedTransaction = async (body: ChainDeployErc721, provider?: string) => {
  ;(body as DeployErc721).chain = Currency.XDC
  await validateBody(body, DeployErc721)
  const { fromPrivateKey, fee, name, symbol, nonce, signatureId } = body

  const client = await getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc721TokenABI, null, {
    data: erc721TokenBytecode,
  })

  // @ts-ignore
  const deploy = contract.deploy({
    arguments: [name, symbol],
  })

  const tx: TransactionConfig = {
    from: 0,
    data: deploy.encodeABI(),
    nonce,
  }

  return await prepareErc20SignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Send XDC invoke smart contract transaction to the blockchain.
 * Invoked method only reads from blockchain the data and returns them back.
 *
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 */
export const sendSmartContractReadMethodInvocationTransaction = async (body: SmartContractReadMethodInvocation, provider?: string) => {
  await validateBody(body, SmartContractReadMethodInvocation)
  const { params, methodName, methodABI, contractAddress } = body
  const client = getClient(provider)
  const contract = new client.eth.Contract([methodABI], fromAddress(contractAddress))
  return { data: await contract.methods[methodName as string](...params).call() }
}

/**
 * Send XDC store data transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendStoreDataTransaction = async (body: ChainCreateRecord, provider?: string) =>
  broadcast(await prepareStoreDataTransaction(body, provider), body.signatureId)

/**
 * Send XDC or supported ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendXdcOrErc20Transaction = async (body: ChainTransferErc20, provider?: string) =>
  broadcast(await prepareXdcOrErc20SignedTransaction(body, provider), body.signatureId)

/**
 * Send XDC custom ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendCustomErc20Transaction = async (body: ChainTransferErc20, provider?: string) =>
  broadcast(await prepareCustomErc20SignedTransaction(body, provider), body.signatureId)

/**
 * Send XDC deploy ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendDeployErc20Transaction = async (body: DeployErc20, provider?: string) =>
  broadcast(await prepareDeployErc20SignedTransaction(body, provider), body.signatureId)

/**
 * Send XDC invoke smart contract transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendSmartContractMethodInvocationTransaction = async (
  body: SmartContractMethodInvocation | SmartContractReadMethodInvocation,
  provider?: string
) => {
  if (body.methodABI.stateMutability === 'view') {
    return sendSmartContractReadMethodInvocationTransaction(body, provider)
  }
  return broadcast(await prepareSmartContractWriteMethodInvocation(body, provider), (body as SmartContractMethodInvocation).signatureId)
}

/**
 * Send XDC ERC721 mint transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintErc721Transaction = async (body: ChainMintErc721, provider?: string) =>
  broadcast(await prepareMintErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send XDC ERC721 mint transaction to the blockchain with cashback details. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintErcCashback721Transaction = async (body: ChainMintErc721, provider?: string) =>
  broadcast(await prepareMintErcCashback721SignedTransaction(body, provider), body.signatureId)

/**
 * Send XDC ERC721 mint multiple transaction with cashback to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintMultipleCashbackErc721Transaction = async (body: ChainMintMultipleErc721, provider?: string) =>
  broadcast(await prepareMintMultipleCashbackErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send XDC ERC721 mint multiple transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintMultipleErc721Transaction = async (body: ChainMintMultipleErc721, provider?: string) =>
  broadcast(await prepareMintMultipleErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send XDC ERC721 burn transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBurnErc721Transaction = async (body: ChainBurnErc721, provider?: string) =>
  broadcast(await prepareBurnErc721SignedTransaction(body, provider), body.signatureId)

export const sendUpdateCashbackForAuthorErc721Transaction = async (body: ChainUpdateCashbackErc721, provider?: string) =>
  broadcast(await prepareUpdateCashbackForAuthorErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send XDC ERC721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendErc721Transaction = async (body: ChainTransferErc721, provider?: string) =>
  broadcast(await prepareTransferErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send XDC ERC721 deploy to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the XDC Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendDeployErc721Transaction = async (body: ChainDeployErc721, provider?: string) =>
  broadcast(await prepareDeployErc721SignedTransaction(body, provider), body.signatureId)

// TODO: add ERC-1155 support
