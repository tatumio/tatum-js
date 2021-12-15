import {
  auction,
  axios,
  BurnErc20,
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
  erc721Provenance_bytecode,
  erc721TokenABI,
  erc20TokenABI,
  erc1155TokenABI,
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
  EthMintErc721,
  EthMintMultipleErc721,
  ChainTransferErc20,
  ChainTransactionKMS,
  ChainGenerateCustodialAddress,
  ChainCreateRecord,
  ChainMintErc721,
  ChainMintMultipleErc721,
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
  ChainBurnErc721,
  ChainBaseBurnMultiToken,
  ChainBaseBurnMultiTokenBatch,
  ChainEthMintErc721,
  ChainEthMintMultipleErc721,
  obtainCustodialAddressType,
} from '@tatumio/tatum-core'
import { BigNumber } from 'bignumber.js'
import Web3 from 'web3'
import { TransactionConfig } from 'web3-core'
import { isHex, stringToHex, toHex, toWei } from 'web3-utils'
import { broadcast } from '../blockchain'
import { mintNFT } from '../nft'

/**
 * Estimate Gas price for the transaction.
 */
export const getGasPriceInWei = async () => {
  const { data } = await axios.get('https://gasstation-mainnet.matic.network')
  return Web3.utils.toWei(`${Math.max(30, Math.min(Math.ceil(data.fast / 10), 100))}`, 'gwei')
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
    gasPrice: gasPrice ? `0x${new BigNumber(toWei(gasPrice, 'gwei')).toString(16)}` : await getGasPriceInWei(),
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
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBlockchainTransaction = async (body: ChainTransferErc20, provider?: string) => {
  return broadcast(await prepareSignedTransaction(body, provider))
}

export const prepareClient = (provider?: string, fromPrivateKey?: string) => {
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
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const signKMSTransaction = async (tx: ChainTransactionKMS, fromPrivateKey: string, provider?: string) => {
  ;(tx as TransactionKMS).chain = Currency.MATIC
  const client = prepareClient(provider, fromPrivateKey)
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
    transactionConfig.gasPrice = await getGasPriceInWei()
  }
  return (await client.eth.accounts.signTransaction(transactionConfig, fromPrivateKey)).rawTransaction as string
}

export const getErc20ContractDecimals = async (contractAddress: string, provider?: string) => {
  if (!contractAddress) {
    throw new Error('Contract address not set.')
  }
  const client = await prepareClient(provider)
  // @ts-ignore
  const contract = new client.eth.Contract(erc20_abi, contractAddress.trim())
  return await contract.methods.decimals().call()
}

/**
 * Sign Polygon generate custodial wallet transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareGenerateCustodialWalletSignedTransaction = async (body: ChainGenerateCustodialAddress, provider?: string) => {
  ;(body as GenerateCustodialAddress).chain = Currency.MATIC
  await validateBody(body, GenerateCustodialAddress)
  const client = await prepareClient(provider, body.fromPrivateKey)
  const { abi, code } = obtainCustodialAddressType({ ...body, chain: Currency.MATIC })
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
 * Sign Polygon transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareSignedTransaction = async (body: ChainTransferErc20, provider?: string) => {
  const b: TransferErc20 = { ...body }
  b.currency = Currency.MATIC
  await validateBody(b, TransferErc20)
  const client = await prepareClient(provider, b.fromPrivateKey)
  let data
  let to = b.to
  if (b.currency === Currency.MATIC) {
    data = b.data ? (client.utils.isHex(b.data) ? client.utils.stringToHex(b.data) : client.utils.toHex(b.data)) : undefined
  } else {
    to = CONTRACT_ADDRESSES[b.currency as string]
    // @ts-ignore
    const contract = new client.eth.Contract([TRANSFER_METHOD_ABI], to)
    const digits = new BigNumber(10).pow(CONTRACT_DECIMALS[b.currency as string])
    data = contract.methods.transfer(b.to.trim(), `0x${new BigNumber(b.amount).multipliedBy(digits).toString(16)}`).encodeABI()
  }
  return prepareGeneralTx(client, b.fromPrivateKey, b.signatureId, b.to, b.amount, b.nonce, data, b.fee?.gasLimit, b.fee?.gasPrice)
}

/**
 * Sign Polygon store data transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareStoreDataTransaction = async (body: ChainCreateRecord, provider?: string) => {
  ;(body as CreateRecord).chain = Currency.MATIC
  await validateBody(body, CreateRecord)
  const client = await prepareClient(provider, body.fromPrivateKey)
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
 * Sign Polygon mint erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintErc20SignedTransaction = async (body: MintErc20, provider?: string) => {
  await validateBody(body, MintErc20)
  const client = await prepareClient(provider, body.fromPrivateKey)
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
 * Sign Polygon burn erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBurnErc20SignedTransaction = async (body: BurnErc20, provider?: string) => {
  await validateBody(body, BurnErc20)
  const client = await prepareClient(provider, body.fromPrivateKey)
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
 * Sign Polygon transfer erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTransferErc20SignedTransaction = async (body: ChainTransferErc20, provider?: string) => {
  ;(body as TransferErc20).currency = Currency.MATIC
  await validateBody(body, TransferErc20)
  const client = await prepareClient(provider, body.fromPrivateKey)
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
 * Sign Polygon deploy erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareDeployErc20SignedTransaction = async (body: DeployErc20, provider?: string) => {
  await validateBody(body, DeployErc20)
  const client = await prepareClient(provider, body.fromPrivateKey)
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
 * Sign Polygon mint erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintErc721SignedTransaction = async (body: ChainMintErc721, provider?: string) => {
  ;(body as MintErc721).chain = Currency.MATIC
  await validateBody(body, MintErc721)
  const client = await prepareClient(provider, body.fromPrivateKey)
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
 * Sign Polygon mint cashback erc721 provenance transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintErc721ProvenanceSignedTransaction = async (body: ChainEthMintErc721, provider?: string) => {
  ;(body as EthMintErc721).chain = Currency.MATIC
  await validateBody(body, EthMintErc721)
  const client = await prepareClient(provider, body.fromPrivateKey)
  const cb: string[] = []
  const fv: string[] = []
  if (body.cashbackValues && body.fixedValues && body.authorAddresses) {
    body.cashbackValues.map((c) => cb.push(`0x${new BigNumber(c).multipliedBy(100).toString(16)}`))
    body.fixedValues.map((c) => fv.push(`0x${new BigNumber(client.utils.toWei(c, 'ether')).toString(16)}`))
  }
  if (body.erc20) {
    // @ts-ignore
    const data = new client.eth.Contract(erc721Provenance_abi, body.contractAddress.trim()).methods
      .mintWithTokenURI(body.to.trim(), body.tokenId, body.url, body.authorAddresses ? body.authorAddresses : [], cb, fv, body.erc20)
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
  } else {
    // @ts-ignore
    const data = new client.eth.Contract(erc721Provenance_abi, body.contractAddress.trim()).methods
      .mintWithTokenURI(body.to.trim(), body.tokenId, body.url, body.authorAddresses ? body.authorAddresses : [], cb, fv)
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
}

/**
 * Sign Polygon mint cashback erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintCashbackErc721SignedTransaction = async (body: ChainMintErc721, provider?: string) => {
  ;(body as MintErc721).chain = Currency.MATIC
  await validateBody(body, MintErc721)
  const client = await prepareClient(provider, body.fromPrivateKey)
  const cashbacks: string[] = body.cashbackValues!
  const cb = cashbacks.map((c) => `0x${new BigNumber(client.utils.toWei(c, 'ether')).toString(16)}`)
  if (body.erc20) {
    // @ts-ignore
    const data = new client.eth.Contract(erc721TokenABI, body.contractAddress.trim()).methods
      .mintWithCashback(body.to.trim(), body.tokenId, body.url, body.authorAddresses, cb, body.erc20)
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
  } else {
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
}
/**
 * Sign Polygon mint multiple cashback erc721 provenance transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintMultipleErc721ProvenanceSignedTransaction = async (body: ChainEthMintMultipleErc721, provider?: string) => {
  ;(body as EthMintMultipleErc721).chain = Currency.MATIC
  await validateBody(body, EthMintMultipleErc721)
  const client = await prepareClient(provider, body.fromPrivateKey)
  const cb: string[][] = []
  const fv: string[][] = []
  if (body.cashbackValues && body.fixedValues && body.authorAddresses) {
    for (let i = 0; i < body.cashbackValues.length; i++) {
      const cb2: string[] = []
      const fv2: string[] = []
      for (let j = 0; j < body.cashbackValues[i].length; j++) {
        cb2.push(`0x${new BigNumber(body.cashbackValues[i][j]).multipliedBy(100).toString(16)}`)
        fv2.push(`0x${new BigNumber(toWei(body.fixedValues[i][j], 'ether')).toString(16)}`)
      }
      cb.push(cb2)
      fv.push(fv2)
    }
  }
  if (body.erc20) {
    // @ts-ignore
    const data = new client.eth.Contract(erc721Provenance_abi, body.contractAddress.trim()).methods
      .mintMultiple(
        body.to.map((t) => t.trim()),
        body.tokenId,
        body.url,
        body.authorAddresses ? body.authorAddresses : [],
        cb,
        fv,
        body.erc20
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
  } else {
    // @ts-ignore
    const data = new client.eth.Contract(erc721Provenance_abi, body.contractAddress.trim()).methods
      .mintMultiple(
        body.to.map((t) => t.trim()),
        body.tokenId,
        body.url,
        body.authorAddresses ? body.authorAddresses : [],
        cb,
        fv
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
}

/**
 * Sign Polygon mint multiple cashback erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintMultipleCashbackErc721SignedTransaction = async (body: ChainMintMultipleErc721, provider?: string) => {
  ;(body as MintMultipleErc721).chain = Currency.MATIC
  await validateBody(body, MintMultipleErc721)
  const client = await prepareClient(provider, body.fromPrivateKey)
  const cashbacks: string[][] = body.cashbackValues!
  const cb = cashbacks.map((cashback) => cashback.map((c) => `0x${new BigNumber(client.utils.toWei(c, 'ether')).toString(16)}`))
  if (body.erc20) {
    // @ts-ignore
    const data = new client.eth.Contract(erc721TokenABI, body.contractAddress.trim()).methods
      .mintMultipleCashback(
        body.to.map((t) => t.trim()),
        body.tokenId,
        body.url,
        body.authorAddresses,
        cb,
        body.erc20
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
  } else {
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
}

/**
 * Sign Polygon mint multiple erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintMultipleErc721SignedTransaction = async (body: ChainMintMultipleErc721, provider?: string) => {
  ;(body as MintMultipleErc721).chain = Currency.MATIC
  await validateBody(body, MintMultipleErc721)
  const client = await prepareClient(provider, body.fromPrivateKey)
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
 * Sign Polygon burn erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBurnErc721SignedTransaction = async (body: ChainBurnErc721, provider?: string) => {
  ;(body as BurnErc721).chain = Currency.MATIC
  await validateBody(body, BurnErc721)
  const client = await prepareClient(provider, body.fromPrivateKey)
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
 * Sign Polygon transfer erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTransferErc721SignedTransaction = async (body: ChainTransferErc721, provider?: string) => {
  ;(body as TransferErc721).chain = Currency.MATIC
  await validateBody(body, TransferErc721)
  const client = await prepareClient(provider, body.fromPrivateKey)
  // @ts-ignore
  const contract = new client.eth.Contract(body.provenance ? erc721Provenance_abi : erc721TokenABI, body.contractAddress.trim())
  const dataBytes = body.provenance ? Buffer.from(body.provenanceData + "'''###'''" + toWei(body.tokenPrice!, 'ether'), 'utf8') : ''
  const data = body.provenance
    ? contract.methods.safeTransfer(body.to.trim(), body.tokenId, `0x${dataBytes.toString('hex')}`).encodeABI()
    : contract.methods.safeTransfer(body.to.trim(), body.tokenId).encodeABI()
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
 * Sign Polygon update cashback for author erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareUpdateCashbackForAuthorErc721SignedTransaction = async (body: ChainUpdateCashbackErc721, provider?: string) => {
  ;(body as UpdateCashbackErc721).chain = Currency.MATIC
  await validateBody(body, UpdateCashbackErc721)
  const client = await prepareClient(provider, body.fromPrivateKey)
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
 * Sign Polygon deploy erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareDeployErc721SignedTransaction = async (body: ChainDeployErc721, provider?: string) => {
  ;(body as DeployErc721).chain = Currency.MATIC
  await validateBody(body, DeployErc721)
  const client = await prepareClient(provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(body.provenance ? erc721Provenance_abi : erc721TokenABI)
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
 * Sign Polygon generate custodial wallet address transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
 */
export const prepareDeployMarketplaceListingSignedTransaction = async (body: ChainDeployMarketplaceListing, provider?: string) => {
  ;(body as DeployMarketplaceListing).chain = Currency.MATIC
  await validateBody(body, DeployMarketplaceListing)
  const client = await prepareClient(provider, body.fromPrivateKey)
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
 * Sign Polygon deploy NFT Auction contract transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
 */
export const prepareDeployAuctionSignedTransaction = async (body: ChainDeployNftAuction, provider?: string) => {
  ;(body as DeployNftAuction).chain = Currency.MATIC
  await validateBody(body, DeployNftAuction)
  const client = await prepareClient(provider, body.fromPrivateKey)
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
 * Sign Polygon burn multiple tokens transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBurnMultiTokenSignedTransaction = async (body: ChainBurnMultiToken, provider?: string) => {
  ;(body as BurnMultiToken).chain = Currency.MATIC
  await validateBody(body, BurnMultiToken)
  const client = await prepareClient(provider, body.fromPrivateKey)
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
 * Sign Polygon burn multiple tokens batch transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBurnMultiTokenBatchSignedTransaction = async (body: ChainBurnMultiTokenBatch, provider?: string) => {
  ;(body as BurnMultiTokenBatch).chain = Currency.MATIC
  await validateBody(body, BurnMultiTokenBatch)
  const client = await prepareClient(provider, body.fromPrivateKey)
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
 * Sign Polygon transfer multiple tokens transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTransferMultiTokenSignedTransaction = async (body: ChainTransferMultiToken, provider?: string) => {
  ;(body as TransferMultiToken).chain = Currency.MATIC
  await validateBody(body, TransferMultiToken)
  const client = await prepareClient(provider, body.fromPrivateKey)
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
 * Sign Polygon batch transfer multiple tokens transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBatchTransferMultiTokenSignedTransaction = async (body: ChainTransferMultiTokenBatch, provider?: string) => {
  ;(body as TransferMultiTokenBatch).chain = Currency.MATIC
  await validateBody(body, TransferMultiTokenBatch)
  const client = await prepareClient(provider, body.fromPrivateKey)
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
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintMultiTokenSignedTransaction = async (body: ChainMintMultiToken, provider?: string) => {
  ;(body as MintMultiToken).chain = Currency.MATIC
  await validateBody(body, MintMultiToken)
  const client = await prepareClient(provider, body.fromPrivateKey)
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
 * Sign Polygon mint multiple tokens batch transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintMultiTokenBatchSignedTransaction = async (body: ChainMintMultiTokenBatch, provider?: string) => {
  ;(body as MintMultiTokenBatch).chain = Currency.MATIC
  await validateBody(body, MintMultiTokenBatch)
  const client = await prepareClient(provider, body.fromPrivateKey)
  const batchAmounts = body.amounts.map((amts) => amts.map((amt) => `0x${new BigNumber(amt).toString(16)}`))
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
 * Sign Polygon deploy multiple tokens transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareDeployMultiTokenSignedTransaction = async (body: ChainDeployMultiToken, provider?: string) => {
  ;(body as DeployMultiToken).chain = Currency.MATIC
  await validateBody(body, DeployMultiToken)
  const client = await prepareClient(provider, body.fromPrivateKey)
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
 * Sign Polygon smart contract write method invocation transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param options
 * @param options.provider optional url of the Polygon Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareSmartContractWriteMethodInvocation = async (body: SmartContractMethodInvocation, options?: { provider?: string }) => {
  await validateBody(body, SmartContractMethodInvocation)
  const { fromPrivateKey, fee, params, methodName, methodABI, contractAddress, nonce, amount, signatureId } = body
  const client = await prepareClient(options?.provider, fromPrivateKey)

  const data = new client.eth.Contract([methodABI]).methods[methodName as string](...params).encodeABI()
  return prepareGeneralTx(client, fromPrivateKey, signatureId, contractAddress.trim(), amount, nonce, data, fee?.gasLimit, fee?.gasPrice)
}

export const sendPolygonSmartContractReadMethodInvocationTransaction = async (
  body: SmartContractReadMethodInvocation,
  provider?: string
) => {
  await validateBody(body, SmartContractReadMethodInvocation)
  const { params, methodName, methodABI, contractAddress } = body
  const client = prepareClient(provider)
  const contract = new client.eth.Contract([methodABI], contractAddress)
  return { data: await contract.methods[methodName as string](...params).call() }
}

/**
 * Send Polygon smart store data transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendStoreDataTransaction = async (body: ChainCreateRecord, provider?: string) =>
  broadcast(await prepareStoreDataTransaction(body, provider), body.signatureId)

/**
 * Send Polygon mint erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintErc20SignedTransaction = async (body: MintErc20, provider?: string) =>
  broadcast(await prepareMintErc20SignedTransaction(body, provider), body.signatureId)

/**
 * Send Polygon burn erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBurnErc20SignedTransaction = async (body: BurnErc20, provider?: string) =>
  broadcast(await prepareBurnErc20SignedTransaction(body, provider), body.signatureId)

/**
 * Send Polygon transfer erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendTransferErc20SignedTransaction = async (body: ChainTransferErc20, provider?: string) =>
  broadcast(await prepareTransferErc20SignedTransaction(body, provider), body.signatureId)

/**
 * Send Polygon deploy erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendDeployErc20SignedTransaction = async (body: DeployErc20, provider?: string) =>
  broadcast(await prepareDeployErc20SignedTransaction(body, provider), body.signatureId)

/**
 * Send Polygon mint erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintErc721SignedTransaction = async (body: ChainMintErc721, provider?: string) => {
  if (!body.fromPrivateKey) {
    return mintNFT(body)
  }
  return broadcast(await prepareMintErc721SignedTransaction(body, provider), body.signatureId)
}

/**
 * Send Polygon mint cashback erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintCashbackErc721SignedTransaction = async (body: ChainMintErc721, provider?: string) =>
  broadcast(await prepareMintCashbackErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Polygon mint cashback erc721 provenance transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintErc721ProvenanceSignedTransaction = async (body: ChainEthMintErc721, provider?: string) =>
  broadcast(await prepareMintErc721ProvenanceSignedTransaction(body, provider), body.signatureId)

/**
 * Send Polygon mint multiple erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintMultipleCashbackErc721SignedTransaction = async (body: ChainMintMultipleErc721, provider?: string) =>
  broadcast(await prepareMintMultipleCashbackErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Polygon mint multiple erc721 Provenance transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintMultipleErc721ProvenanceSignedTransaction = async (body: ChainEthMintMultipleErc721, provider?: string) =>
  broadcast(await prepareMintMultipleErc721ProvenanceSignedTransaction(body, provider), body.signatureId)

/**
 * Send Polygon mint multiple erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintMultipleErc721SignedTransaction = async (body: ChainMintMultipleErc721, provider?: string) =>
  broadcast(await prepareMintMultipleErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Polygon burn erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBurnErc721SignedTransaction = async (body: ChainBurnErc721, provider?: string) =>
  broadcast(await prepareBurnErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Polygon transfer erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendTransferErc721SignedTransaction = async (body: ChainTransferErc721, provider?: string) =>
  broadcast(await prepareTransferErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Polygon update cashback for author erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendUpdateCashbackForAuthorErc721SignedTransaction = async (body: ChainUpdateCashbackErc721, provider?: string) =>
  broadcast(await prepareUpdateCashbackForAuthorErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Polygon deploy erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendDeployErc721SignedTransaction = async (body: ChainDeployErc721, provider?: string) =>
  broadcast(await prepareDeployErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Polygon burn multiple tokens erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBurnMultiTokenSignedTransaction = async (body: ChainBaseBurnMultiToken, provider?: string) =>
  broadcast(await prepareBurnMultiTokenSignedTransaction(body, provider), body.signatureId)

/**
 * Send Polygon burn multiple tokens batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBurnMultiTokenBatchSignedTransaction = async (body: ChainBaseBurnMultiTokenBatch, provider?: string) =>
  broadcast(await prepareBurnMultiTokenBatchSignedTransaction(body, provider), body.signatureId)

/**
 * Send Polygon transfer multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendTransferMultiTokenSignedTransaction = async (body: ChainTransferMultiToken, provider?: string) =>
  broadcast(await prepareTransferMultiTokenSignedTransaction(body, provider), body.signatureId)

/**
 * Send Polygon batch transfer multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBatchTransferMultiTokenSignedTransaction = async (body: ChainTransferMultiTokenBatch, provider?: string) =>
  broadcast(await prepareBatchTransferMultiTokenSignedTransaction(body, provider), body.signatureId)

/**
 * Send Polygon mint multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintMultiTokenSignedTransaction = async (body: ChainMintMultiToken, provider?: string) =>
  broadcast(await prepareMintMultiTokenSignedTransaction(body, provider), body.signatureId)

/**
 * Send Polygon mint multiple tokens batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintMultiTokenBatchSignedTransaction = async (body: ChainMintMultiTokenBatch, provider?: string) =>
  broadcast(await prepareMintMultiTokenBatchSignedTransaction(body, provider), body.signatureId)

/**
 * Send Polygon deploy multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendDeployMultiTokenSignedTransaction = async (body: ChainDeployMultiToken, provider?: string) =>
  broadcast(await prepareDeployMultiTokenSignedTransaction(body, provider), body.signatureId)

/**
 * Send Polygon generate custodial wallet transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendGenerateCustodialWalletSignedTransaction = async (body: ChainGenerateCustodialAddress, provider?: string) =>
  broadcast(await prepareGenerateCustodialWalletSignedTransaction(body, provider), body.signatureId)

/**
 * Send Polygon smart contract method invocation transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendSmartContractMethodInvocationTransaction = async (
  body: SmartContractMethodInvocation | SmartContractReadMethodInvocation,
  provider?: string
) => {
  if (body.methodABI.stateMutability === 'view') {
    return sendPolygonSmartContractReadMethodInvocationTransaction(body as SmartContractReadMethodInvocation, provider)
  }
  return broadcast(await prepareSmartContractWriteMethodInvocation(body, { provider }), (body as SmartContractMethodInvocation).signatureId)
}
/**
 * Deploy new smart contract for NFT marketplace logic. Smart contract enables marketplace operator to create new listing for NFT (ERC-721/1155).
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendDeployMarketplaceListingSignedTransaction = async (body: ChainDeployMarketplaceListing, provider?: string) =>
  broadcast(await prepareDeployMarketplaceListingSignedTransaction(body, provider), body.signatureId)
