import { HarmonyAddress } from '@harmony-js/crypto'
import {
  TransactionKMS,
  Currency,
  CreateRecord,
  GenerateCustodialAddress,
  DeployMarketplaceListing,
  DeployNftAuction,
  SmartContractMethodInvocation,
  SmartContractReadMethodInvocation,
  auction,
  erc1155TokenBytecode,
  erc20TokenBytecode,
  erc721TokenBytecode,
  listing,
  TATUM_API_URL,
  validateBody,
  erc721Provenance_abi,
  erc721TokenABI,
  erc721Provenance_bytecode,
  ChainTransactionKMS,
  ChainCreateRecord,
  ChainGenerateCustodialAddress,
  ChainDeployMarketplaceListing,
  ChainDeployNftAuction,
  obtainCustodialAddressType,
  ChainOneMint721,
  OneMint721,
} from '@tatumio/tatum-core'
import { BigNumber } from 'bignumber.js'
import Web3 from 'web3'
import { TransactionConfig } from 'web3-core'
import { toWei } from 'web3-utils'
import { broadcast } from '../blockchain'
import {
  ChainOneBurn721,
  ChainOneBurnMultiToken,
  ChainOneBurnMultiTokenBatch,
  ChainOneDeploy721,
  ChainOneDeployMultiToken,
  ChainOneMintMultiple721,
  ChainOneMintMultiToken,
  ChainOneMintMultiTokenBatch,
  ChainOneTransfer,
  ChainOneTransfer20,
  ChainOneTransfer721,
  ChainOneTransferMultiToken,
  ChainOneTransferMultiTokenBatch,
  ChainOneUpdateCashback721,
  OneBurn20,
  OneBurn721,
  OneBurnMultiToken,
  OneBurnMultiTokenBatch,
  OneDeploy20,
  OneDeploy721,
  OneDeployMultiToken,
  OneMint20,
  OneMintMultiple721,
  OneMintMultiToken,
  OneMintMultiTokenBatch,
  OneTransfer,
  OneTransfer20,
  OneTransfer721,
  OneTransferMultiToken,
  OneTransferMultiTokenBatch,
  OneUpdateCashback721,
} from '../model'
import { mintNFT } from '../nft'

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
  const recipient = to?.includes('one') ? new HarmonyAddress(to).basicHex : to
  const tx: TransactionConfig = {
    from: 0,
    to: recipient,
    value: amount ? `0x${new BigNumber(toWei(amount, 'ether')).toString(16)}` : undefined,
    data,
    gas: gasLimit,
    nonce,
    gasPrice: gasPrice ? `0x${new BigNumber(toWei(gasPrice, 'gwei')).toString(16)}` : await client.eth.getGasPrice(),
  }

  if (signatureId) {
    return JSON.stringify(tx)
  }
  tx.gas = gasLimit || (await client.eth.estimateGas({ to: recipient, data: data || '', value: tx.value }))
  return (await client.eth.accounts.signTransaction(tx, fromPrivateKey as string)).rawTransaction as string
}

/**
 * Send Harmony transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBlockchainTransaction = async (body: ChainOneTransfer, provider?: string) => {
  return broadcast(await prepareSignedTransaction(body, provider))
}

export const prepareClient = (provider?: string, fromPrivateKey?: string) => {
  const client = new Web3(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/one/web3/${process.env.TATUM_API_KEY}`)
  if (fromPrivateKey) {
    client.eth.accounts.wallet.clear()
    client.eth.accounts.wallet.add(fromPrivateKey)
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address
  }
  return client
}

/**
 * Sign Harmony pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const signKMSTransaction = async (tx: ChainTransactionKMS, fromPrivateKey: string, provider?: string) => {
  ;(tx as TransactionKMS).chain = Currency.ONE
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
    transactionConfig.gasPrice = await client.eth.getGasPrice()
  }
  return (await client.eth.accounts.signTransaction(transactionConfig, fromPrivateKey)).rawTransaction as string
}

/**
 * Sign Harmony transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareSignedTransaction = async (body: ChainOneTransfer, provider?: string) => {
  ;(body as OneTransfer).currency = Currency.ONE
  await validateBody(body, OneTransfer)
  const client = await prepareClient(provider, body.fromPrivateKey)
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    body.to,
    body.amount,
    body.nonce,
    undefined,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Harmony store data transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareStoreDataTransaction = async (body: ChainCreateRecord, provider?: string) => {
  ;(body as CreateRecord).chain = Currency.ONE
  await validateBody(body, CreateRecord)
  const client = await prepareClient(provider, body.fromPrivateKey)
  const hexData = client.utils.isHex(body.data) ? client.utils.stringToHex(body.data) : client.utils.toHex(body.data)
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
 * Sign Harmony mint erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMint20SignedTransaction = async (body: OneMint20, provider?: string) => {
  await validateBody(body, OneMint20)
  const client = await prepareClient(provider, body.fromPrivateKey)
  // @ts-ignore
  const contract = new client.eth.Contract(erc20TokenABI, new HarmonyAddress(body.contractAddress).basicHex.trim())
  const digits = new BigNumber(10).pow(await contract.methods.decimals().call())
  const data = contract.methods
    .mint(new HarmonyAddress(body.to).basicHex, `0x${new BigNumber(body.amount).multipliedBy(digits).toString(16)}`)
    .encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    new HarmonyAddress(body.contractAddress).basicHex,
    undefined,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Harmony burn erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBurn20SignedTransaction = async (body: OneBurn20, provider?: string) => {
  await validateBody(body, OneBurn20)
  const client = await prepareClient(provider, body.fromPrivateKey)
  // @ts-ignore
  const contract = new client.eth.Contract(erc20TokenABI, new HarmonyAddress(body.contractAddress).basicHex.trim())
  const digits = new BigNumber(10).pow(await contract.methods.decimals().call())
  const data = contract.methods.burn(`0x${new BigNumber(body.amount).multipliedBy(digits).toString(16)}`).encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    new HarmonyAddress(body.contractAddress).basicHex,
    undefined,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Harmony transfer erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTransfer20SignedTransaction = async (body: ChainOneTransfer20, provider?: string) => {
  ;(body as OneTransfer20).currency = Currency.ONE
  await validateBody(body, OneTransfer20)
  const client = await prepareClient(provider, body.fromPrivateKey)
  const decimals = new BigNumber(10).pow(body.digits as number)
  // @ts-ignore
  const data = new client.eth.Contract(erc20TokenABI, new HarmonyAddress(body.contractAddress).basicHex.trim()).methods
    .transfer(new HarmonyAddress(body.to).basicHex, `0x${new BigNumber(body.amount).multipliedBy(decimals).toString(16)}`)
    .encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    new HarmonyAddress(body.contractAddress as string).basicHex,
    undefined,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

export const get20ContractDecimals = async (contractAddress: string, provider?: string) => {
  if (!contractAddress) {
    throw new Error('Contract address not set.')
  }
  const client = await prepareClient(provider)
  // @ts-ignore
  const contract = new client.eth.Contract(erc20_abi, contractAddress.trim())
  return await contract.methods.decimals().call()
}

/**
 * Sign Harmony generate custodial wallet transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareGenerateCustodialWalletSignedTransaction = async (body: ChainGenerateCustodialAddress, provider?: string) => {
  ;(body as GenerateCustodialAddress).chain = Currency.ONE
  await validateBody(body, GenerateCustodialAddress)
  const client = await prepareClient(provider, body.fromPrivateKey)
  const { abi, code } = obtainCustodialAddressType({ ...body, chain: Currency.ONE })
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
 * Sign ONE generate custodial wallet address transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the One Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
 */
export const prepareDeployMarketplaceListingSignedTransaction = async (body: ChainDeployMarketplaceListing, provider?: string) => {
  ;(body as DeployMarketplaceListing).chain = Currency.ONE
  await validateBody(body, DeployMarketplaceListing)
  const client = await prepareClient(provider, body.fromPrivateKey)
  // @ts-ignore
  const contract = new client.eth.Contract(auction.abi)
  const data = contract
    .deploy({
      data: auction.data,
      arguments: [body.marketplaceFee, body.feeRecipient],
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
 * Sign ONE deploy NFT Auction contract transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the One Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
 */
export const prepareDeployAuctionSignedTransaction = async (body: ChainDeployNftAuction, provider?: string) => {
  ;(body as DeployNftAuction).chain = Currency.ONE
  await validateBody(body, DeployNftAuction)
  const client = await prepareClient(provider, body.fromPrivateKey)
  // @ts-ignore
  const contract = new client.eth.Contract(listing.abi)
  const data = contract
    .deploy({
      data: listing.data,
      arguments: [body.auctionFee, body.feeRecipient],
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
 * Sign Harmony deploy erc20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareDeploy20SignedTransaction = async (body: OneDeploy20, provider?: string) => {
  await validateBody(body, OneDeploy20)
  const client = await prepareClient(provider, body.fromPrivateKey)
  // @ts-ignore
  const contract = new client.eth.Contract(erc20TokenABI)
  const data = contract
    .deploy({
      data: erc20TokenBytecode,
      arguments: [
        body.name,
        body.symbol,
        new HarmonyAddress(body.address).basicHex,
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
 * Sign Harmony mint erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMint721SignedTransaction = async (body: ChainOneMint721, provider?: string) => {
  ;(body as OneMint721).chain = Currency.ONE
  await validateBody(body, OneMint721)
  const client = await prepareClient(provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(erc721TokenABI, new HarmonyAddress(body.contractAddress).basicHex).methods
    .mintWithTokenURI(new HarmonyAddress(body.to).basicHex, body.tokenId, body.url)
    .encodeABI()
  if (body.contractAddress) {
    return prepareGeneralTx(
      client,
      body.fromPrivateKey,
      body.signatureId,
      new HarmonyAddress(body.contractAddress).basicHex,
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
 * Sign Harmony mint cashback erc721 provenance transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMint721ProvenanceSignedTransaction = async (body: ChainOneMint721, provider?: string) => {
  ;(body as OneMint721).chain = Currency.ONE
  await validateBody(body, OneMint721)
  const client = await prepareClient(provider, body.fromPrivateKey)
  const cb: string[] = []
  const fv: string[] = []
  const authors: string[] = []
  if (body.cashbackValues && body.fixedValues && body.authorAddresses) {
    body.cashbackValues.map((c) => cb.push(`0x${new BigNumber(c).multipliedBy(100).toString(16)}`))
    body.fixedValues.map((c) => fv.push(`0x${new BigNumber(client.utils.toWei(c, 'ether')).toString(16)}`))
    body.authorAddresses.map((a) => authors.push(new HarmonyAddress(a).basicHex))
  }
  if (body.erc20) {
    // @ts-ignore
    const data = new client.eth.Contract(erc721Provenance_abi, new HarmonyAddress(body.contractAddress).basicHex).methods
      .mintWithTokenURI(new HarmonyAddress(body.to).basicHex, body.tokenId, body.url, authors, cb, fv)
      .encodeABI()
    if (body.contractAddress) {
      return prepareGeneralTx(
        client,
        body.fromPrivateKey,
        body.signatureId,
        new HarmonyAddress(body.contractAddress).basicHex,
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
    const data = new client.eth.Contract(erc721Provenance_abi, new HarmonyAddress(body.contractAddress).basicHex).methods
      .mintWithTokenURI(new HarmonyAddress(body.to).basicHex, body.tokenId, body.url, authors, cb, fv, body.erc20)
      .encodeABI()
    if (body.contractAddress) {
      return prepareGeneralTx(
        client,
        body.fromPrivateKey,
        body.signatureId,
        new HarmonyAddress(body.contractAddress).basicHex,
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
 * Sign Harmony mint multiple cashback erc721 provenance transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintMultiple721ProvenanceSignedTransaction = async (body: ChainOneMintMultiple721, provider?: string) => {
  ;(body as OneMintMultiple721).chain = Currency.ONE
  await validateBody(body, OneMintMultiple721)
  const client = await prepareClient(provider, body.fromPrivateKey)
  const cb: string[][] = []
  const fv: string[][] = []
  if (body.authorAddresses && body.cashbackValues && body.fixedValues) {
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
  // const cashbacks: string[][] = body.cashbackValues!
  // const cb = cashbacks.map(cashback => cashback.map(c => `0x${new BigNumber(client.utils.toWei(c, 'ether')).toString(16)}`))
  if (body.erc20) {
    // @ts-ignore
    const data = new client.eth.Contract(erc721Provenance_abi, new HarmonyAddress(body.contractAddress).basicHex).methods
      .mintMultiple(
        body.to.map((t) => new HarmonyAddress(t).basicHex),
        body.tokenId,
        body.url,
        body.authorAddresses?.map((a) => a.map((a1) => new HarmonyAddress(a1).basicHex)),
        cb,
        fv,
        body.erc20
      )
      .encodeABI()
    return prepareGeneralTx(
      client,
      body.fromPrivateKey,
      body.signatureId,
      new HarmonyAddress(body.contractAddress).basicHex,
      undefined,
      body.nonce,
      data,
      body.fee?.gasLimit,
      body.fee?.gasPrice
    )
  } else {
    // @ts-ignore
    const data = new client.eth.Contract(erc721Provenance_abi, new HarmonyAddress(body.contractAddress).basicHex).methods
      .mintMultiple(
        body.to.map((t) => new HarmonyAddress(t).basicHex),
        body.tokenId,
        body.url,
        body.authorAddresses?.map((a) => a.map((a1) => new HarmonyAddress(a1).basicHex)),
        cb,
        fv
      )
      .encodeABI()
    return prepareGeneralTx(
      client,
      body.fromPrivateKey,
      body.signatureId,
      new HarmonyAddress(body.contractAddress).basicHex,
      undefined,
      body.nonce,
      data,
      body.fee?.gasLimit,
      body.fee?.gasPrice
    )
  }
}

/**
 * Sign Harmony mint cashback erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintCashback721SignedTransaction = async (body: ChainOneMint721, provider?: string) => {
  ;(body as OneMint721).chain = Currency.ONE
  await validateBody(body, OneMint721)
  const client = await prepareClient(provider, body.fromPrivateKey)
  const cashbacks: string[] = body.cashbackValues!
  const cb = cashbacks.map((c) => `0x${new BigNumber(client.utils.toWei(c, 'ether')).toString(16)}`)
  // @ts-ignore
  if (body.erc20) {
    // @ts-ignore
    const data = new client.eth.Contract(erc721TokenABI, new HarmonyAddress(body.contractAddress).basicHex).methods
      .mintWithCashback(
        new HarmonyAddress(body.to).basicHex,
        body.tokenId,
        body.url,
        body.authorAddresses?.map((a) => new HarmonyAddress(a).basicHex),
        cb,
        body.erc20
      )
      .encodeABI()
    if (body.contractAddress) {
      return prepareGeneralTx(
        client,
        body.fromPrivateKey,
        body.signatureId,
        new HarmonyAddress(body.contractAddress).basicHex,
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
    const data = new client.eth.Contract(erc721TokenABI, new HarmonyAddress(body.contractAddress).basicHex).methods
      .mintWithCashback(
        new HarmonyAddress(body.to).basicHex,
        body.tokenId,
        body.url,
        body.authorAddresses?.map((a) => new HarmonyAddress(a).basicHex),
        cb
      )
      .encodeABI()
    if (body.contractAddress) {
      return prepareGeneralTx(
        client,
        body.fromPrivateKey,
        body.signatureId,
        new HarmonyAddress(body.contractAddress).basicHex,
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
 * Sign Harmony mint multiple cashback erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintMultipleCashback721SignedTransaction = async (body: ChainOneMintMultiple721, provider?: string) => {
  ;(body as OneMintMultiple721).chain = Currency.ONE
  await validateBody(body, OneMintMultiple721)
  const client = await prepareClient(provider, body.fromPrivateKey)
  const cashbacks: string[][] = body.cashbackValues!
  const cb = cashbacks.map((cashback) => cashback.map((c) => `0x${new BigNumber(client.utils.toWei(c, 'ether')).toString(16)}`))
  if (body.erc20) {
    // @ts-ignore
    const data = new client.eth.Contract(erc721TokenABI, new HarmonyAddress(body.contractAddress).basicHex).methods
      .mintMultipleCashback(
        body.to.map((t) => new HarmonyAddress(t).basicHex),
        body.tokenId,
        body.url,
        body.authorAddresses?.map((a) => a.map((a1) => new HarmonyAddress(a1).basicHex)),
        cb,
        body.erc20
      )
      .encodeABI()
    return prepareGeneralTx(
      client,
      body.fromPrivateKey,
      body.signatureId,
      new HarmonyAddress(body.contractAddress).basicHex,
      undefined,
      body.nonce,
      data,
      body.fee?.gasLimit,
      body.fee?.gasPrice
    )
  } else {
    // @ts-ignore
    const data = new client.eth.Contract(erc721TokenABI, new HarmonyAddress(body.contractAddress).basicHex).methods
      .mintMultipleCashback(
        body.to.map((t) => new HarmonyAddress(t).basicHex),
        body.tokenId,
        body.url,
        body.authorAddresses?.map((a) => a.map((a1) => new HarmonyAddress(a1).basicHex)),
        cb
      )
      .encodeABI()
    return prepareGeneralTx(
      client,
      body.fromPrivateKey,
      body.signatureId,
      new HarmonyAddress(body.contractAddress).basicHex,
      undefined,
      body.nonce,
      data,
      body.fee?.gasLimit,
      body.fee?.gasPrice
    )
  }
}

/**
 * Sign Harmony mint multiple erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintMultiple721SignedTransaction = async (body: ChainOneMintMultiple721, provider?: string) => {
  ;(body as OneMintMultiple721).chain = Currency.ONE
  await validateBody(body, OneMintMultiple721)
  const client = await prepareClient(provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(erc721TokenABI, new HarmonyAddress(body.contractAddress).basicHex).methods
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
    new HarmonyAddress(body.contractAddress).basicHex,
    undefined,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Harmony burn erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBurn721SignedTransaction = async (body: ChainOneBurn721, provider?: string) => {
  ;(body as OneBurn721).chain = Currency.ONE
  await validateBody(body, OneBurn721)
  const client = await prepareClient(provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(erc721TokenABI, new HarmonyAddress(body.contractAddress).basicHex).methods
    .burn(body.tokenId)
    .encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    new HarmonyAddress(body.contractAddress).basicHex,
    undefined,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Harmony transfer erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTransfer721SignedTransaction = async (body: ChainOneTransfer721, provider?: string) => {
  ;(body as OneTransfer721).chain = Currency.ONE
  await validateBody(body, OneTransfer721)
  const client = await prepareClient(provider, body.fromPrivateKey)
  const contract = new client.eth.Contract(
    // @ts-ignore
    body.provenance ? erc721Provenance_abi : erc721TokenABI,
    new HarmonyAddress(body.contractAddress).basicHex
  )
  const dataBytes = body.provenance ? Buffer.from(body.provenanceData + "'''###'''" + toWei(body.tokenPrice!, 'ether'), 'utf8') : ''
  const data = body.provenance
    ? contract.methods.safeTransfer(new HarmonyAddress(body.to).basicHex, body.tokenId, `0x${dataBytes.toString('hex')}`).encodeABI()
    : contract.methods.safeTransfer(new HarmonyAddress(body.to).basicHex, body.tokenId).encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    new HarmonyAddress(body.contractAddress).basicHex,
    body.value,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Harmony update cashback for author 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareUpdateCashbackForAuthor721SignedTransaction = async (body: ChainOneUpdateCashback721, provider?: string) => {
  ;(body as OneUpdateCashback721).chain = Currency.ONE
  await validateBody(body, OneUpdateCashback721)
  const client = await prepareClient(provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(erc721TokenABI, new HarmonyAddress(body.contractAddress).basicHex).methods
    .updateCashbackForAuthor(body.tokenId, `0x${new BigNumber(toWei(body.cashbackValue, 'ether')).toString(16)}`)
    .encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    new HarmonyAddress(body.contractAddress).basicHex,
    undefined,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Harmony deploy erc721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareDeploy721SignedTransaction = async (body: ChainOneDeploy721, provider?: string) => {
  ;(body as OneDeploy721).chain = Currency.ONE
  await validateBody(body, OneDeploy721)
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
 * Sign Harmony burn multiple tokens transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBurnMultiTokenSignedTransaction = async (body: ChainOneBurnMultiToken, provider?: string) => {
  ;(body as OneBurnMultiToken).chain = Currency.ONE
  await validateBody(body, OneBurnMultiToken)
  const client = await prepareClient(provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(erc1155TokenABI, new HarmonyAddress(body.contractAddress).basicHex).methods
    .burn(new HarmonyAddress(body.account).basicHex, body.tokenId, body.amount)
    .encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    new HarmonyAddress(body.contractAddress).basicHex,
    undefined,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Harmony burn multiple tokens batch transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBurnMultiTokenBatchSignedTransaction = async (body: ChainOneBurnMultiTokenBatch, provider?: string) => {
  ;(body as OneBurnMultiTokenBatch).chain = Currency.ONE
  await validateBody(body, OneBurnMultiTokenBatch)
  const client = await prepareClient(provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(erc1155TokenABI, new HarmonyAddress(body.contractAddress).basicHex).methods
    .burnBatch(new HarmonyAddress(body.account).basicHex, body.tokenId, body.amounts)
    .encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    new HarmonyAddress(body.contractAddress).basicHex,
    undefined,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Harmony transfer multiple tokens transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTransferMultiTokenSignedTransaction = async (body: ChainOneTransferMultiToken, provider?: string) => {
  ;(body as OneTransferMultiToken).chain = Currency.ONE
  await validateBody(body, OneTransferMultiToken)
  const client = await prepareClient(provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(erc1155TokenABI, new HarmonyAddress(body.contractAddress).basicHex).methods
    .safeTransfer(
      new HarmonyAddress(body.to).basicHex,
      body.tokenId,
      `0x${new BigNumber(body.amount).toString(16)}`,
      body.data ? body.data : '0x0'
    )
    .encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    new HarmonyAddress(body.contractAddress).basicHex,
    undefined,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Harmony batch transfer multiple tokens transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBatchTransferMultiTokenSignedTransaction = async (body: ChainOneTransferMultiTokenBatch, provider?: string) => {
  ;(body as OneTransferMultiTokenBatch).chain = Currency.ONE
  await validateBody(body, OneTransferMultiTokenBatch)
  const client = await prepareClient(provider, body.fromPrivateKey)
  const amts = body.amounts.map((amt) => `0x${new BigNumber(amt).toString(16)}`)
  // @ts-ignore
  const data = new client.eth.Contract(erc1155TokenABI, new HarmonyAddress(body.contractAddress).basicHex).methods
    .safeBatchTransfer(
      new HarmonyAddress(body.to).basicHex,
      body.tokenId.map((token) => token.trim()),
      amts,
      body.data ? body.data : '0x0'
    )
    .encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    new HarmonyAddress(body.contractAddress).basicHex,
    undefined,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Harmony mint multiple tokens transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintMultiTokenSignedTransaction = async (body: ChainOneMintMultiToken, provider?: string) => {
  ;(body as OneMintMultiToken).chain = Currency.ONE
  await validateBody(body, OneMintMultiToken)
  const client = await prepareClient(provider, body.fromPrivateKey)
  // @ts-ignore
  const data = new client.eth.Contract(erc1155TokenABI, new HarmonyAddress(body.contractAddress).basicHex).methods
    .mint(new HarmonyAddress(body.to).basicHex, body.tokenId, `0x${new BigNumber(body.amount).toString(16)}`, body.data ? body.data : '0x0')
    .encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    new HarmonyAddress(body.contractAddress).basicHex,
    undefined,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Harmony mint multiple tokens transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintMultiTokenBatchSignedTransaction = async (body: ChainOneMintMultiTokenBatch, provider?: string) => {
  ;(body as OneMintMultiTokenBatch).chain = Currency.ONE
  await validateBody(body, OneMintMultiTokenBatch)
  const client = await prepareClient(provider, body.fromPrivateKey)
  const batchAmounts = body.amounts.map((amts) => amts.map((amt) => `0x${new BigNumber(amt).toString(16)}`))
  // @ts-ignore
  const data = new client.eth.Contract(erc1155TokenABI, new HarmonyAddress(body.contractAddress).basicHex).methods
    .mintBatch(
      body.to.map((a) => new HarmonyAddress(a).basicHex),
      body.tokenId,
      batchAmounts,
      body.data ? body.data : '0x0'
    )
    .encodeABI()
  return prepareGeneralTx(
    client,
    body.fromPrivateKey,
    body.signatureId,
    new HarmonyAddress(body.contractAddress).basicHex,
    undefined,
    body.nonce,
    data,
    body.fee?.gasLimit,
    body.fee?.gasPrice
  )
}

/**
 * Sign Harmony deploy multiple tokens transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareDeployMultiTokenSignedTransaction = async (body: ChainOneDeployMultiToken, provider?: string) => {
  ;(body as OneDeployMultiToken).chain = Currency.ONE
  await validateBody(body, OneDeployMultiToken)
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
 * Sign Harmony smart contract write method invocation transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param options
 * @param options.provider optional url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareSmartContractWriteMethodInvocation = async (body: SmartContractMethodInvocation, options?: { provider?: string }) => {
  await validateBody(body, SmartContractMethodInvocation)
  const { fromPrivateKey, fee, params, methodName, methodABI, amount, contractAddress, nonce, signatureId } = body
  const client = await prepareClient(options?.provider, fromPrivateKey)

  const data = new client.eth.Contract([methodABI]).methods[methodName as string](...params).encodeABI()
  return prepareGeneralTx(
    client,
    fromPrivateKey,
    signatureId,
    new HarmonyAddress(contractAddress).basicHex,
    amount,
    nonce,
    data,
    fee?.gasLimit,
    fee?.gasPrice
  )
}

/**
 * Send Harmony smart contract read method invocation transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendSmartContractReadMethodInvocationTransaction = async (body: SmartContractReadMethodInvocation, provider?: string) => {
  await validateBody(body, SmartContractReadMethodInvocation)
  const { params, methodName, methodABI, contractAddress } = body
  const client = prepareClient(provider)
  const contract = new client.eth.Contract([methodABI], contractAddress)
  return { data: await contract.methods[methodName as string](...params).call() }
}

/**
 * Send Harmony store data transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendStoreDataTransaction = async (body: ChainCreateRecord, provider?: string) =>
  broadcast(await prepareStoreDataTransaction(body, provider))

/**
 * Send Harmony mint erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMint20SignedTransaction = async (body: OneMint20, provider?: string) =>
  broadcast(await prepareMint20SignedTransaction(body, provider))

/**
 * Send Harmony burn erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBurn20SignedTransaction = async (body: OneBurn20, provider?: string) =>
  broadcast(await prepareBurn20SignedTransaction(body, provider))

/**
 * Send Harmony transfer erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendTransfer20SignedTransaction = async (body: OneTransfer20, provider?: string) =>
  broadcast(await prepareTransfer20SignedTransaction(body, provider))
/**
 * Send Harmony deploy erc20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendDeploy20SignedTransaction = async (body: OneDeploy20, provider?: string) =>
  broadcast(await prepareDeploy20SignedTransaction(body, provider))

/**
 * Send Harmony mint erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMint721SignedTransaction = async (body: ChainOneMint721, provider?: string) => {
  if (!body.fromPrivateKey) {
    return mintNFT(body)
  }

  return broadcast(await prepareMint721SignedTransaction(body, provider))
}

/**
 * Send Harmony mint erc721 Provenance transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMint721ProvenanceSignedTransaction = async (body: ChainOneMint721, provider?: string) => {
  if (!body.fromPrivateKey) {
    return mintNFT(body)
  }

  return broadcast(await prepareMint721ProvenanceSignedTransaction(body, provider))
}
/**
 * Send Harmony mint multiple cashback erc721 provenance transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintMultiple721ProvenanceSignedTransaction = async (body: ChainOneMintMultiple721, provider?: string) =>
  broadcast(await prepareMintMultiple721ProvenanceSignedTransaction(body, provider))

/**
 * Send Harmony mint cashback erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintCashback721SignedTransaction = async (body: ChainOneMint721, provider?: string) =>
  broadcast(await prepareMintCashback721SignedTransaction(body, provider))

/**
 * Send Harmony mint multiple cashback erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintMultipleCashback721SignedTransaction = async (body: ChainOneMintMultiple721, provider?: string) =>
  broadcast(await prepareMintMultipleCashback721SignedTransaction(body, provider))

/**
 * Send Harmony mint multiple erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintMultiple721SignedTransaction = async (body: ChainOneMintMultiple721, provider?: string) =>
  broadcast(await prepareMintMultiple721SignedTransaction(body, provider))

/**
 * Send Harmony burn erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBurn721SignedTransaction = async (body: ChainOneBurn721, provider?: string) =>
  broadcast(await prepareBurn721SignedTransaction(body, provider))

/**
 * Send Harmony transfer erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendTransfer721SignedTransaction = async (body: ChainOneTransfer721, provider?: string) =>
  broadcast(await prepareTransfer721SignedTransaction(body, provider))

/**
 * Send Harmony update cashback for author erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendUpdateCashbackForAuthor721SignedTransaction = async (body: ChainOneUpdateCashback721, provider?: string) =>
  broadcast(await prepareUpdateCashbackForAuthor721SignedTransaction(body, provider))

/**
 * Send Harmony deploy erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendDeploy721SignedTransaction = async (body: ChainOneDeploy721, provider?: string) =>
  broadcast(await prepareDeploy721SignedTransaction(body, provider))

/**
 * Send Harmony burn multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBurnMultiTokenSignedTransaction = async (body: ChainOneBurnMultiToken, provider?: string) =>
  broadcast(await prepareBurnMultiTokenSignedTransaction(body, provider))

/**
 * Send Harmony burn multiple tokens batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBurnMultiTokenBatchSignedTransaction = async (body: ChainOneBurnMultiTokenBatch, provider?: string) =>
  broadcast(await prepareBurnMultiTokenBatchSignedTransaction(body, provider))

/**
 * Send Harmony transfer multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendTransferMultiTokenSignedTransaction = async (body: ChainOneTransferMultiToken, provider?: string) =>
  broadcast(await prepareTransferMultiTokenSignedTransaction(body, provider))

/**
 * Send Harmony batch transfer multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBatchTransferMultiTokenSignedTransaction = async (body: ChainOneTransferMultiTokenBatch, provider?: string) =>
  broadcast(await prepareBatchTransferMultiTokenSignedTransaction(body, provider))

/**
 * Send Harmony mint multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintMultiTokenSignedTransaction = async (body: ChainOneMintMultiToken, provider?: string) =>
  broadcast(await prepareMintMultiTokenSignedTransaction(body, provider))

/**
 * Send Harmony mint multiple tokens batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintMultiTokenBatchSignedTransaction = async (body: ChainOneMintMultiTokenBatch, provider?: string) =>
  broadcast(await prepareMintMultiTokenBatchSignedTransaction(body, provider))

/**
 * Send Harmony deploy multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendDeployMultiTokenSignedTransaction = async (body: ChainOneDeployMultiToken, provider?: string) =>
  broadcast(await prepareDeployMultiTokenSignedTransaction(body, provider))

/**
 * Send Harmony mint generate custodial wallet signed transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Harmony Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendGenerateCustodialWalletSignedTransaction = async (body: ChainGenerateCustodialAddress, provider?: string) =>
  broadcast(await prepareGenerateCustodialWalletSignedTransaction(body, provider), body.signatureId)

/**
 * Deploy new smart contract for NFT marketplace logic. Smart contract enables marketplace operator to create new listing for NFT (ERC-721/1155).
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendDeployMarketplaceListingSignedTransaction = async (body: ChainDeployMarketplaceListing, provider?: string) =>
  broadcast(await prepareDeployMarketplaceListingSignedTransaction(body, provider), body.signatureId)

/**
 * Send Harmony smart contract method invocation transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
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
    return sendSmartContractReadMethodInvocationTransaction(body as SmartContractReadMethodInvocation, provider)
  }
  return broadcast(await prepareSmartContractWriteMethodInvocation(body, { provider }), (body as SmartContractMethodInvocation).signatureId)
}
