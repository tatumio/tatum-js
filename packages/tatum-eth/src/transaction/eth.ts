import { BigNumber } from 'bignumber.js'
import Web3 from 'web3'
import { TransactionConfig } from 'web3-core'
import { toWei } from 'web3-utils'
import { ethBroadcast, ethGetTransactionsCount } from '../blockchain'
import {
  CONTRACT_ADDRESSES,
  CONTRACT_DECIMALS,
  TATUM_API_URL,
  TRANSFER_METHOD_ABI,
  auction,
  listing,
  axios,
  validateBody,
  erc1155TokenABI,
  erc1155TokenBytecode,
  erc20TokenABI,
  erc20TokenBytecode,
  erc721TokenABI,
  erc721TokenBytecode,
  BurnErc20,
  CreateRecord,
  Currency,
  DeployErc20,
  DeployMarketplaceListing,
  DeployNftAuction,
  Fee,
  GenerateCustodialAddress,
  MintErc20,
  MintMultiToken,
  MintMultiTokenBatch,
  SmartContractMethodInvocation,
  SmartContractReadMethodInvocation,
  TransactionKMS,
  TransferErc20,
  TransferMultiToken,
  TransferMultiTokenBatch,
  UpdateCashbackErc721,
  BurnErc721,
  BurnMultiToken,
  BurnMultiTokenBatch,
  DeployErc721,
  DeployMultiToken,
  MintErc721,
  MintMultipleErc721,
  TransferErc721,
  EthMintMultipleErc721,
  EthMintErc721,
  erc721Provenance_bytecode,
  ChainTransactionKMS,
  ChainGenerateCustodialAddress,
  ChainCreateRecord,
  ChainTransferErc20,
  ChainDeployMarketplaceListing,
  ChainDeployNftAuction,
  ChainMintErc721,
  ChainMintMultipleErc721,
  ChainBurnErc721,
  ChainUpdateCashbackErc721,
  ChainTransferErc721,
  ChainMintMultiTokenBatch,
  ChainMintMultiToken,
  ChainBurnMultiTokenBatch,
  ChainBurnMultiToken,
  ChainTransferMultiTokenBatch,
  ChainTransferMultiToken,
  ChainDeployMultiToken,
  ChainDeployErc721,
} from '@tatumio/tatum-core'
import { obtainCustodialAddressType } from '@tatumio/tatum-defi'
import { mintNFT } from '../nft'

/**
 * Estimate Gas price for the transaction.
 */
export const ethGetGasPriceInWei = async () => {
  let gasStationUrl = 'https://ethgasstation.info/json/ethgasAPI.json'
  if (process.env.TATUM_GAS_STATION_API_KEY) {
    gasStationUrl = `${gasStationUrl}?apiKey=${process.env.TATUM_GAS_STATION_API_KEY}`
  }
  const data = await Promise.all([axios.get(gasStationUrl.toString()).then((response) => `${response.data.fastest / 10}`)])
  const gasPrice = data[0] === '0' ? '20' : data[0]
  return Web3.utils.toWei(gasPrice, 'gwei')
}

/**
 * Returns Ethereum server to connect to.
 *
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @param privateKey
 */
export const getClient = (provider?: string, privateKey?: string) => {
  let url = provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/ethereum/web3/${process.env.TATUM_API_KEY}`
  if (process.env.TESTNET_TYPE === 'ethereum-rinkeby') {
    url += '?testnetType=ethereum-rinkeby'
  }
  const web3 = new Web3(url)
  if (privateKey) {
    web3.eth.accounts.wallet.add(privateKey)
    web3.eth.defaultAccount = web3.eth.accounts.wallet[0].address
  }
  return web3
}

/**
 * Sign Ethereum pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const signEthKMSTransaction = async (tx: ChainTransactionKMS, fromPrivateKey: string, provider?: string) => {
  ;(tx as TransactionKMS).chain = Currency.ETH
  const client = getClient(provider, fromPrivateKey)
  const transactionConfig = JSON.parse(tx.serializedTransaction)
  transactionConfig.gas = await client.eth.estimateGas(transactionConfig)
  if (!transactionConfig.nonce) {
    transactionConfig.nonce = await ethGetTransactionsCount(client.eth.defaultAccount as string)
  }
  if (
    !transactionConfig.gasPrice ||
    transactionConfig.gasPrice === '0' ||
    transactionConfig.gasPrice === 0 ||
    transactionConfig.gasPrice === '0x0'
  ) {
    transactionConfig.gasPrice = await ethGetGasPriceInWei()
  }
  return (await client.eth.accounts.signTransaction(transactionConfig, fromPrivateKey as string)).rawTransaction as string
}

/**
 * Sign Eth generate custodial wallet address transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the ETH Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthGenerateCustodialWalletSignedTransaction = async (body: ChainGenerateCustodialAddress, provider?: string) => {
  ;(body as GenerateCustodialAddress).chain = Currency.ETH
  await validateBody(body, GenerateCustodialAddress)

  const client = getClient(provider, body.fromPrivateKey)

  const { abi, code } = obtainCustodialAddressType({ ...body, chain: Currency.ETH })
  // @ts-ignore
  const contract = new client.eth.Contract(abi)
  const deploy = contract.deploy({
    data: code,
  })
  const tx: TransactionConfig = {
    from: 0,
    data: deploy.encodeABI(),
    nonce: body.nonce,
  }
  return await prepareEthSignedTransactionAbstraction(client, tx, body.signatureId, body.fromPrivateKey, body.fee)
}

/**
 * Sign Ethereum Store data transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareStoreDataTransaction = async (body: ChainCreateRecord, provider?: string) => {
  ;(body as CreateRecord).chain = Currency.ETH
  await validateBody(body, CreateRecord)
  const { fromPrivateKey, to, ethFee, data, nonce, signatureId } = body
  const client = getClient(provider, fromPrivateKey)
  const address = (to || client.eth.defaultAccount) as string
  const hexData = client.utils.isHex(data) ? client.utils.stringToHex(data) : client.utils.toHex(data)
  const addressNonce = nonce ? nonce : await ethGetTransactionsCount(address)
  const customFee = ethFee
    ? {
        ...ethFee,
        gasPrice: client.utils.toWei(ethFee.gasPrice, 'gwei'),
      }
    : {
        gasLimit: `${hexData.length * 68 + 21000}`,
        gasPrice: await ethGetGasPriceInWei(),
      }

  const tx: TransactionConfig = {
    from: 0,
    to: address.trim(),
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
 * Sign Ethereum mint ERC 20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthMintErc20SignedTransaction = async (body: MintErc20, provider?: string) => {
  await validateBody(body, MintErc20)
  const { fromPrivateKey, amount, to, contractAddress, nonce, signatureId } = body

  const client = getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc20TokenABI, contractAddress.trim())
  const digits = new BigNumber(10).pow(await contract.methods.decimals().call())
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods.mint(to.trim(), `0x${new BigNumber(amount).multipliedBy(digits).toString(16)}`).encodeABI(),
    nonce,
  }

  return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey)
}
const prepareEthSignedTransactionAbstraction = async (
  client: Web3,
  transaction: TransactionConfig,
  signatureId: string | undefined,
  fromPrivateKey: string | undefined,
  fee?: Fee | undefined
) => {
  const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await ethGetGasPriceInWei()
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
 * Sign Ethereum burn ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthBurnErc20SignedTransaction = async (body: BurnErc20, provider?: string) => {
  await validateBody(body, BurnErc20)
  const { fromPrivateKey, amount, contractAddress, nonce, signatureId } = body

  const client = getClient(provider, fromPrivateKey)
  // @ts-ignore
  const contract = new client.eth.Contract(erc20TokenABI, contractAddress.trim())
  const digits = new BigNumber(10).pow(await contract.methods.decimals().call())
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods.burn(`0x${new BigNumber(amount).multipliedBy(digits).toString(16)}`).encodeABI(),
    nonce,
  }
  return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey)
}

/**
 * Sign Ethereum or supported ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthOrErc20SignedTransaction = async (body: ChainTransferErc20, provider?: string) => {
  ;(body as TransferErc20).currency = Currency.ETH
  await validateBody(body, TransferErc20)
  const { fromPrivateKey, to, amount, currency, fee, data, nonce, signatureId } = body as TransferErc20

  const client = getClient(provider, fromPrivateKey)

  let tx: TransactionConfig
  if (currency === Currency.ETH) {
    tx = {
      from: 0,
      to: to.trim(),
      value: client.utils.toWei(`${amount}`, 'ether'),
      data: data ? (client.utils.isHex(data) ? client.utils.stringToHex(data) : client.utils.toHex(data)) : undefined,
      nonce,
    }
  } else {
    // @ts-ignore
    const contract = new client.eth.Contract([TRANSFER_METHOD_ABI], CONTRACT_ADDRESSES[currency as string])
    const digits = new BigNumber(10).pow(CONTRACT_DECIMALS[currency as string])
    tx = {
      from: 0,
      to: CONTRACT_ADDRESSES[currency as string],
      data: contract.methods.transfer(to.trim(), `0x${new BigNumber(amount).multipliedBy(digits).toString(16)}`).encodeABI(),
      nonce,
    }
  }

  return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Ethereum custom ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareCustomErc20SignedTransaction = async (body: ChainTransferErc20, provider?: string) => {
  ;(body as TransferErc20).currency = Currency.ETH
  await validateBody(body, TransferErc20)
  const { fromPrivateKey, to, amount, contractAddress, digits, fee, nonce, signatureId } = body

  const client = getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract([TRANSFER_METHOD_ABI], contractAddress)
  const decimals = new BigNumber(10).pow(digits as number)
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress,
    data: contract.methods.transfer(to.trim(), `0x${new BigNumber(amount).multipliedBy(decimals).toString(16)}`).encodeABI(),
    nonce,
  }

  return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Ethereum deploy ERC20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareDeployErc20SignedTransaction = async (body: DeployErc20, provider?: string) => {
  await validateBody(body, DeployErc20)
  const { name, address, symbol, supply, digits, fromPrivateKey, nonce, fee, signatureId, totalCap } = body

  const client = getClient(provider, fromPrivateKey)
  // @ts-ignore
  const contract = new client.eth.Contract(erc20TokenABI)
  const deploy = contract.deploy({
    data: erc20TokenBytecode,
    arguments: [
      name,
      symbol,
      address,
      digits,
      `0x${new BigNumber(totalCap || supply).multipliedBy(new BigNumber(10).pow(digits)).toString(16)}`,
      `0x${new BigNumber(supply).multipliedBy(new BigNumber(10).pow(digits)).toString(16)}`,
    ],
  })
  const tx: TransactionConfig = {
    from: 0,
    data: deploy.encodeABI(),
    nonce,
  }
  return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Ethereum invoke smart contract transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param options
 * @param options.provider optional url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareSmartContractWriteMethodInvocation = async (body: SmartContractMethodInvocation, options?: { provider?: string }) => {
  await validateBody(body, SmartContractMethodInvocation)
  const { fromPrivateKey, fee, params, methodName, methodABI, amount, contractAddress, nonce, signatureId } = body
  const client = getClient(options?.provider, fromPrivateKey)

  const contract = new client.eth.Contract([methodABI])
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    value: amount ? `0x${new BigNumber(toWei(amount, 'ether')).toString(16)}` : undefined,
    data: contract.methods[methodName as string](...params).encodeABI(),
    nonce,
  }
  return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

const deployContract = async (
  abi: any[],
  bytecode: string,
  args: any[],
  fromPrivateKey?: string,
  fee?: Fee,
  nonce?: number,
  signatureId?: string,
  provider?: string
) => {
  const client = await getClient(provider, fromPrivateKey)
  // @ts-ignore
  const contract = new client.eth.Contract(abi, null, {
    data: bytecode,
  })
  // @ts-ignore
  const deploy = contract.deploy({
    arguments: args,
  })

  const tx: TransactionConfig = {
    from: 0,
    data: deploy.encodeABI(),
    nonce,
  }
  return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign ETH generate custodial wallet address transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the ETH Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
 */
export const prepareEthDeployMarketplaceListingSignedTransaction = async (body: ChainDeployMarketplaceListing, provider?: string) => {
  ;(body as DeployMarketplaceListing).chain = Currency.ETH
  await validateBody(body, DeployMarketplaceListing)
  return deployContract(
    listing.abi,
    listing.data,
    [body.marketplaceFee, body.feeRecipient],
    body.fromPrivateKey,
    body.fee,
    body.nonce,
    body.signatureId,
    provider
  )
}

/**
 * Sign ETH deploy NFT Auction contract transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the ETH Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
 */
export const prepareEthDeployAuctionSignedTransaction = async (body: ChainDeployNftAuction, provider?: string) => {
  ;(body as DeployNftAuction).chain = Currency.ETH
  await validateBody(body, DeployNftAuction)
  return deployContract(
    auction.abi,
    auction.data,
    [body.auctionFee, body.feeRecipient],
    body.fromPrivateKey,
    body.fee,
    body.nonce,
    body.signatureId,
    provider
  )
}

/**
 * Sign Ethereum mint ERC 721 provenance transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthMintErc721ProvenanceSignedTransaction = async (body: EthMintErc721, provider?: string) => {
  await validateBody(body, EthMintErc721)
  const {
    fromPrivateKey,
    to,
    tokenId,
    contractAddress,
    nonce,
    fee,
    url,
    signatureId,
    authorAddresses,
    cashbackValues,
    fixedValues,
    erc20,
  } = body

  const client = getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc721Provenance_abi, contractAddress)
  const cb: string[] = []
  const fv: string[] = []
  if (cashbackValues && fixedValues && authorAddresses) {
    cashbackValues.map((c) => cb.push(`0x${new BigNumber(c).multipliedBy(100).toString(16)}`))
    fixedValues.map((c) => fv.push(`0x${new BigNumber(toWei(c, 'ether')).toString(16)}`))
  }
  const data = erc20
    ? contract.methods.mintWithTokenURI(to.trim(), tokenId, url, authorAddresses ? authorAddresses : [], cb, fv, erc20).encodeABI()
    : contract.methods.mintWithTokenURI(to.trim(), tokenId, url, authorAddresses ? authorAddresses : [], cb, fv).encodeABI()
  if (contractAddress) {
    const tx: TransactionConfig = {
      from: 0,
      to: contractAddress.trim(),
      data: data,
      nonce,
    }
    return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
  }
  throw new Error('Contract address should not be empty!')
}
/**
 * Sign Ethereum mint multiple ERC 721 Provenance transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthMintMultipleErc721ProvenanceSignedTransaction = async (body: EthMintMultipleErc721, provider?: string) => {
  await validateBody(body, EthMintMultipleErc721)
  const {
    fromPrivateKey,
    to,
    tokenId,
    contractAddress,
    url,
    nonce,
    signatureId,
    authorAddresses,
    cashbackValues,
    fixedValues,
    fee,
    erc20,
  } = body

  const client = await getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc721Provenance_abi, contractAddress)
  const cb: string[][] = []
  const fv: string[][] = []
  if (cashbackValues && fixedValues && authorAddresses) {
    for (let i = 0; i < cashbackValues.length; i++) {
      const cb2: string[] = []
      const fv2: string[] = []
      for (let j = 0; j < cashbackValues[i].length; j++) {
        cb2.push(`0x${new BigNumber(cashbackValues[i][j]).multipliedBy(100).toString(16)}`)
        fv2.push(`0x${new BigNumber(toWei(fixedValues[i][j], 'ether')).toString(16)}`)
      }
      cb.push(cb2)
      fv.push(fv2)
    }
  }
  const data = erc20
    ? contract.methods
        .mintMultiple(
          to.map((t) => t.trim()),
          tokenId,
          url,
          authorAddresses ? authorAddresses : [],
          cb,
          fv,
          erc20
        )
        .encodeABI()
    : contract.methods
        .mintMultiple(
          to.map((t) => t.trim()),
          tokenId,
          url,
          authorAddresses ? authorAddresses : [],
          cb,
          fv
        )
        .encodeABI()
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: data,
    nonce,
  }
  return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Ethereum mint ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthMintErc721SignedTransaction = async (body: ChainMintErc721, provider?: string) => {
  ;(body as MintErc721).chain = Currency.ETH
  await validateBody(body, MintErc721)
  const { fromPrivateKey, to, tokenId, contractAddress, nonce, fee, url, signatureId } = body

  const client = getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc721TokenABI, contractAddress)
  if (contractAddress) {
    const tx: TransactionConfig = {
      from: 0,
      to: contractAddress.trim(),
      data: contract.methods.mintWithTokenURI(to.trim(), tokenId, url).encodeABI(),
      nonce,
    }
    return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
  }
  throw new Error('Contract address should not be empty!')
}
/**
 * Sign Ethereum mint multiple ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthMintCashbackErc721SignedTransaction = async (body: ChainMintErc721, provider?: string) => {
  ;(body as MintErc721).chain = Currency.ETH
  await validateBody(body, MintErc721)
  const { fromPrivateKey, to, tokenId, contractAddress, authorAddresses, cashbackValues, url, nonce, signatureId, fee, erc20 } = body

  const client = await getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc721TokenABI, contractAddress)
  const cashbacks: string[] = cashbackValues!
  // tslint:disable-next-line: prefer-for-of
  const cb = cashbacks.map((c) => `0x${new BigNumber(client.utils.toWei(c, 'ether')).toString(16)}`)
  if (contractAddress) {
    const tx: TransactionConfig = {
      from: 0,
      to: contractAddress.trim(),
      data: erc20
        ? contract.methods.mintWithCashback(to.trim(), tokenId, url, authorAddresses, cb, erc20).encodeABI()
        : contract.methods.mintWithCashback(to.trim(), tokenId, url, authorAddresses, cb).encodeABI(),
      nonce,
    }
    return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
  }
  throw new Error('Contract address should not be empty!')
}
/**
 * Sign Ethereum mint multiple ERC 721 Cashback transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthMintMultipleCashbackErc721SignedTransaction = async (body: ChainMintMultipleErc721, provider?: string) => {
  ;(body as MintMultipleErc721).chain = Currency.ETH
  await validateBody(body, MintMultipleErc721)
  const { fromPrivateKey, to, tokenId, contractAddress, url, nonce, signatureId, authorAddresses, cashbackValues, fee, erc20 } = body

  const client = await getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc721TokenABI, contractAddress)
  const cashbacks: string[][] = cashbackValues!
  const cb = cashbacks.map((cashback) => cashback.map((c) => `0x${new BigNumber(client.utils.toWei(c, 'ether')).toString(16)}`))
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: erc20
      ? contract.methods
          .mintMultipleCashback(
            to.map((t) => t.trim()),
            tokenId,
            url,
            authorAddresses,
            cb,
            erc20
          )
          .encodeABI()
      : contract.methods
          .mintMultipleCashback(
            to.map((t) => t.trim()),
            tokenId,
            url,
            authorAddresses,
            cb
          )
          .encodeABI(),
    nonce,
  }
  return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}
/**
 * Sign Ethereum mint multiple ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthMintMultipleErc721SignedTransaction = async (body: ChainMintMultipleErc721, provider?: string) => {
  ;(body as MintMultipleErc721).chain = Currency.ETH
  await validateBody(body, MintMultipleErc721)
  const { fromPrivateKey, to, tokenId, contractAddress, url, nonce, signatureId, fee } = body

  const client = await getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc721TokenABI, contractAddress)
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods
      .mintMultiple(
        to.map((t) => t.trim()),
        tokenId,
        url
      )
      .encodeABI(),
    nonce,
  }
  return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Ethereum burn ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthBurnErc721SignedTransaction = async (body: ChainBurnErc721, provider?: string) => {
  ;(body as BurnErc721).chain = Currency.ETH
  await validateBody(body, BurnErc721)
  const { fromPrivateKey, tokenId, fee, contractAddress, nonce, signatureId } = body

  const client = getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc721TokenABI, contractAddress)
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods.burn(tokenId).encodeABI(),
    nonce,
  }
  return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Ethereum update cashback ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthUpdateCashbackForAuthorErc721SignedTransaction = async (body: ChainUpdateCashbackErc721, provider?: string) => {
  ;(body as UpdateCashbackErc721).chain = Currency.ETH
  await validateBody(body, BurnErc721)
  const { fromPrivateKey, cashbackValue, tokenId, fee, contractAddress, nonce, signatureId } = body

  const client = getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc721TokenABI, contractAddress)
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods.updateCashbackForAuthor(tokenId, `0x${new BigNumber(toWei(cashbackValue, 'ether')).toString(16)}`).encodeABI(),
    nonce,
  }
  return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Ethereum transfer ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthTransferErc721SignedTransaction = async (body: ChainTransferErc721, provider?: string) => {
  ;(body as TransferErc721).chain = Currency.ETH
  await validateBody(body, TransferErc721)
  const { fromPrivateKey, to, tokenId, fee, contractAddress, nonce, signatureId, value, provenanceData, tokenPrice, provenance } = body

  const client = await getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(provenance ? erc721Provenance_abi : erc721TokenABI, contractAddress)
  const dataBytes = provenance ? Buffer.from(provenanceData + "'''###'''" + toWei(tokenPrice!, 'ether'), 'utf8') : ''
  const tokenData = provenance
    ? contract.methods.safeTransfer(to.trim(), tokenId, `0x${dataBytes.toString('hex')}`).encodeABI()
    : contract.methods.safeTransfer(to.trim(), tokenId).encodeABI()
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: tokenData,
    nonce,
    value: value ? `0x${new BigNumber(value).multipliedBy(1e18).toString(16)}` : undefined,
  }
  return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}
/**
 * Sign Ethereum mint ERC 1155 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthMintMultiTokenBatchSignedTransaction = async (body: ChainMintMultiTokenBatch, provider?: string) => {
  ;(body as MintMultiTokenBatch).chain = Currency.ETH
  await validateBody(body, MintMultiTokenBatch)
  const { fromPrivateKey, to, tokenId, contractAddress, nonce, data, fee, amounts, signatureId } = body

  const client = getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc1155TokenABI, contractAddress)
  const amts = amounts.map((amts) => amts.map((amt) => `0x${new BigNumber(amt).toString(16)}`))
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods.mintBatch(to, tokenId, amts, data ? data : '0x0').encodeABI(),
    nonce,
  }

  return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}
/**
 * Sign Ethereum mint ERC 1155 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthMintMultiTokenSignedTransaction = async (body: ChainMintMultiToken, provider?: string) => {
  ;(body as MintMultiToken).chain = Currency.ETH
  await validateBody(body, MintMultiToken)
  const { fromPrivateKey, to, tokenId, contractAddress, nonce, data, fee, amount, signatureId } = body

  const client = getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc1155TokenABI, contractAddress)
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods.mint(to.trim(), tokenId, `0x${new BigNumber(amount).toString(16)}`, data ? data : '0x0').encodeABI(),
    nonce,
  }
  return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Ethereum burn ERC 1155 batch transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthBurnBatchMultiTokenSignedTransaction = async (body: ChainBurnMultiTokenBatch, provider?: string) => {
  ;(body as BurnMultiTokenBatch).chain = Currency.ETH
  await validateBody(body, BurnMultiTokenBatch)
  const { fromPrivateKey, account, tokenId, amounts, fee, contractAddress, nonce, signatureId } = body

  const client = getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc1155TokenABI, contractAddress)
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods.burnBatch(account, tokenId, amounts).encodeABI(),
    nonce,
  }
  return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}
/**
 * Sign Ethereum burn ERC 1155 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthBurnMultiTokenSignedTransaction = async (body: ChainBurnMultiToken, provider?: string) => {
  ;(body as BurnMultiToken).chain = Currency.ETH
  await validateBody(body, BurnMultiToken)
  const { fromPrivateKey, account, tokenId, amount, fee, contractAddress, nonce, signatureId } = body

  const client = getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc1155TokenABI, contractAddress)
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods.burn(account, tokenId, amount).encodeABI(),
    nonce,
  }
  return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Ethereum transfer ERC 1155 Batch transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthBatchTransferMultiTokenSignedTransaction = async (body: ChainTransferMultiTokenBatch, provider?: string) => {
  ;(body as TransferMultiTokenBatch).chain = Currency.ETH
  await validateBody(body, TransferMultiTokenBatch)
  const { fromPrivateKey, to, tokenId, fee, contractAddress, nonce, signatureId, amounts, data } = body

  const client = await getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc1155TokenABI, contractAddress)
  const amts = amounts.map((amt) => `0x${new BigNumber(amt).toString(16)}`)

  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods
      .safeBatchTransfer(
        to.trim(),
        tokenId.map((token) => token.trim()),
        amts,
        data ? data : '0x0'
      )
      .encodeABI(),
    nonce,
  }

  return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}
/**
 * Sign Ethereum transfer ERC 1155 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthTransferMultiTokenSignedTransaction = async (body: ChainTransferMultiToken, provider?: string) => {
  ;(body as TransferMultiToken).chain = Currency.ETH
  await validateBody(body, TransferErc721)
  const { fromPrivateKey, to, tokenId, fee, contractAddress, nonce, signatureId, amount, data } = body

  const client = await getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc1155TokenABI, contractAddress)
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods.safeTransfer(to.trim(), tokenId, `0x${new BigNumber(amount).toString(16)}`, data ? data : '0x0').encodeABI(),
    nonce,
  }
  return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}
/**
 * Sign Ethereum deploy ERC 1155 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthDeployMultiTokenSignedTransaction = async (body: ChainDeployMultiToken, provider?: string) => {
  ;(body as DeployMultiToken).chain = Currency.ETH
  await validateBody(body, DeployMultiToken)
  const { fromPrivateKey, fee, uri, nonce, signatureId } = body

  const client = await getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc1155TokenABI, null, {
    data: erc1155TokenBytecode,
  })

  // @ts-ignore
  const deploy = contract.deploy({
    arguments: [uri],
  })

  const tx: TransactionConfig = {
    from: 0,
    data: deploy.encodeABI(),
    nonce,
  }
  return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}
/**
 * Sign Ethereum deploy ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareEthDeployErc721SignedTransaction = async (body: ChainDeployErc721, provider?: string) => {
  ;(body as DeployErc721).chain = Currency.ETH
  await validateBody(body, DeployErc721)
  const { fromPrivateKey, fee, name, symbol, nonce, signatureId, provenance } = body

  const client = await getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc721TokenABI, null, {
    data: provenance ? erc721Provenance_bytecode : erc721TokenBytecode,
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

  return await prepareEthSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

export const getEthErc20ContractDecimals = async (contractAddress: string, provider?: string) => {
  if (!contractAddress) {
    throw new Error('Contract address not set.')
  }
  const client = await getClient(provider)
  // @ts-ignore
  const contract = new client.eth.Contract(erc20TokenABI, contractAddress.trim())
  return await contract.methods.decimals().call()
}

/**
 * Send Ethereum invoke smart contract transaction to the blockchain.
 * Invoked method only reads from blockchain the data and returns them back.
 *
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 */
export const sendSmartContractReadMethodInvocationTransaction = async (body: SmartContractReadMethodInvocation, provider?: string) => {
  await validateBody(body, SmartContractReadMethodInvocation)
  const { params, methodName, methodABI, contractAddress } = body
  const client = getClient(provider)
  const contract = new client.eth.Contract([methodABI], contractAddress)
  return { data: await contract.methods[methodName as string](...params).call() }
}

/**
 * Send Ethereum store data transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendStoreDataTransaction = async (body: ChainCreateRecord, provider?: string) =>
  ethBroadcast(await prepareStoreDataTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum or supported ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendEthOrErc20Transaction = async (body: ChainTransferErc20, provider?: string) =>
  ethBroadcast(await prepareEthOrErc20SignedTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum custom ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendCustomErc20Transaction = async (body: ChainTransferErc20, provider?: string) =>
  ethBroadcast(await prepareCustomErc20SignedTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum deploy ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendDeployErc20Transaction = async (body: DeployErc20, provider?: string) =>
  ethBroadcast(await prepareDeployErc20SignedTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum invoke smart contract transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendSmartContractMethodInvocationTransaction = async (
  body: SmartContractMethodInvocation | SmartContractReadMethodInvocation,
  provider?: string
) => {
  if (body.methodABI.stateMutability === 'view') {
    return sendSmartContractReadMethodInvocationTransaction(body, provider)
  }
  return ethBroadcast(
    await prepareSmartContractWriteMethodInvocation(body, { provider }),
    (body as SmartContractMethodInvocation).signatureId
  )
}

/**
 * Send Ethereum ERC721 mint transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintErc721Transaction = async (body: ChainMintErc721, provider?: string) => {
  if (!body.fromPrivateKey) {
    return mintNFT(body)
  }
  return ethBroadcast(await prepareEthMintErc721SignedTransaction(body, provider), body.signatureId)
}

/**
 * Send Ethereum ERC721 mint with cashback transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintCashbackErc721Transaction = async (body: ChainMintErc721, provider?: string) =>
  ethBroadcast(await prepareEthMintCashbackErc721SignedTransaction(body, provider), body.signatureId)
/**
 * Send Ethereum ERC721 provenance mint with cashback transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintErc721ProvenanceTransaction = async (body: EthMintErc721, provider?: string) =>
  ethBroadcast(await prepareEthMintErc721ProvenanceSignedTransaction(body, provider), body.signatureId)
/**
 * Send Ethereum ERC721 mint multiple cashback transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendEthMintMultipleCashbackErc721SignedTransaction = async (body: ChainMintMultipleErc721, provider?: string) =>
  ethBroadcast(await prepareEthMintMultipleCashbackErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum ERC721 mint multiple transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintMultipleErc721Transaction = async (body: ChainMintMultipleErc721, provider?: string) =>
  ethBroadcast(await prepareEthMintMultipleErc721SignedTransaction(body, provider), body.signatureId)
/**
 * Send Ethereum ERC721 burn transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBurnErc721Transaction = async (body: ChainBurnErc721, provider?: string) =>
  ethBroadcast(await prepareEthBurnErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum ERC721 update cashback for author transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendUpdateCashbackForAuthorErc721Transaction = async (body: ChainUpdateCashbackErc721, provider?: string) =>
  ethBroadcast(await prepareEthUpdateCashbackForAuthorErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum ERC721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendErc721Transaction = async (body: ChainTransferErc721, provider?: string) =>
  ethBroadcast(await prepareEthTransferErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum ERC721 deploy to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendDeployErc721Transaction = async (body: ChainDeployErc721, provider?: string) =>
  ethBroadcast(await prepareEthDeployErc721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum MultiToken transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendEthMultiTokenTransaction = async (body: ChainTransferMultiToken, provider?: string) =>
  ethBroadcast(await prepareEthTransferMultiTokenSignedTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum MultiToken batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendEthMultiTokenBatchTransaction = async (body: ChainTransferMultiTokenBatch, provider?: string) =>
  ethBroadcast(await prepareEthBatchTransferMultiTokenSignedTransaction(body, provider), body.signatureId)
/**
 * Send Ethereum MultiToken deploy to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendEthDeployMultiTokenTransaction = async (body: ChainDeployMultiToken, provider?: string) =>
  ethBroadcast(await prepareEthDeployMultiTokenSignedTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum MultiToken mint transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendEthMintMultiTokenTransaction = async (body: ChainMintMultiToken, provider?: string) =>
  ethBroadcast(await prepareEthMintMultiTokenSignedTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum MultiToken mint batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendEthMintMultiTokenBatchTransaction = async (body: ChainMintMultiTokenBatch, provider?: string) =>
  ethBroadcast(await prepareEthMintMultiTokenBatchSignedTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum MultiToken burn transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendEthBurnMultiTokenTransaction = async (body: ChainBurnMultiToken, provider?: string) =>
  ethBroadcast(await prepareEthBurnMultiTokenSignedTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum MultiToken burn batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendEthBurnBatchMultiTokenTransaction = async (body: ChainBurnMultiTokenBatch, provider?: string) =>
  ethBroadcast(await prepareEthBurnBatchMultiTokenSignedTransaction(body, provider), body.signatureId)

/**
 * Send Ethereum generate custodial wallet transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendEthGenerateCustodialWalletSignedTransaction = async (body: ChainGenerateCustodialAddress, provider?: string) =>
  ethBroadcast(await prepareEthGenerateCustodialWalletSignedTransaction(body, provider), body.signatureId)

/**
 * Deploy new smart contract for NFT marketplace logic. Smart contract enables marketplace operator to create new listing for NFT (ERC-721/1155).
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendEthDeployMarketplaceListingSignedTransaction = async (body: ChainDeployMarketplaceListing, provider?: string) =>
  ethBroadcast(await prepareEthDeployMarketplaceListingSignedTransaction(body, provider), body.signatureId)
