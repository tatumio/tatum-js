import {
  Fee,
  TransactionKMS,
  Currency,
  CreateRecord,
  validateBody,
  MintErc20,
  BurnErc20,
  TransferErc20,
  DeployErc20,
  erc20TokenBytecode,
  GenerateCustodialAddress,
  SmartContractMethodInvocation,
  UpdateCashbackErc721,
  erc721TokenBytecode,
  erc721Provenance_bytecode,
  DeployMarketplaceListing,
  listing,
  DeployNftAuction,
  auction,
  TransferMultiToken,
  TransferMultiTokenBatch,
  MintMultiToken,
  MintMultiTokenBatch,
  erc1155TokenBytecode,
  SmartContractReadMethodInvocation,
  CONTRACT_DECIMALS,
  CONTRACT_ADDRESSES,
  MintErc721,
  MintMultipleErc721,
  TATUM_API_URL,
  BurnErc721,
  BurnMultiToken,
  DeployErc721,
  TransferErc721,
  BurnMultiTokenBatch,
  DeployMultiToken,
  EthMintMultipleErc721,
  EthMintErc721,
} from '@tatumio/tatum-core'
import { obtainCustodialAddressType } from '@tatumio/tatum-defi'
import { BigNumber } from 'bignumber.js'
import Web3 from 'web3'
import { TransactionConfig } from 'web3-core'
import { toWei } from 'web3-utils'
import { bscBroadcast, bscGetTransactionsCount } from '../blockchain'
import { TransferBscBep20 } from '../model'
import { mintNFT } from '../nft'

/**
 * Estimate Gas price for the transaction.
 */
export const bscGetGasPriceInWei = async () => {
  return Web3.utils.toWei('10', 'gwei')
}

/**
 * Returns BSC server to connect to.
 *
 * @param provider url of the BSC Server to connect to. If not set, default public server will be used.
 * @param fromPrivateKey optional private key of sender account
 */
export const getBscClient = (provider?: string, fromPrivateKey?: string) => {
  const client = new Web3(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/bsc/web3/${process.env.TATUM_API_KEY}`)
  if (fromPrivateKey) {
    client.eth.accounts.wallet.clear()
    client.eth.accounts.wallet.add(fromPrivateKey)
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address
  }
  return client
}
const prepareBscSignedTransactionAbstraction = async (
  client: Web3,
  transaction: TransactionConfig,
  signatureId: string | undefined,
  fromPrivateKey: string | undefined,
  fee?: Fee | undefined
) => {
  const gasPrice = fee ? client.utils.toWei(fee.gasPrice, 'gwei') : await bscGetGasPriceInWei()
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
 * Sign BSC pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @param provider url of the BSC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const signBscKMSTransaction = async (tx: TransactionKMS, fromPrivateKey: string, provider?: string) => {
  if (tx.chain !== Currency.BSC) {
    throw Error('Unsupported chain.')
  }
  const client = getBscClient(provider, fromPrivateKey)
  const transactionConfig = JSON.parse(tx.serializedTransaction)
  const gas = await client.eth.estimateGas(transactionConfig)
  if (!transactionConfig.gas) {
    transactionConfig.gas = gas
  }
  if (!transactionConfig.nonce) {
    transactionConfig.nonce = await bscGetTransactionsCount(client.eth.defaultAccount as string)
  }
  if (
    !transactionConfig.gasPrice ||
    transactionConfig.gasPrice === '0' ||
    transactionConfig.gasPrice === 0 ||
    transactionConfig.gasPrice === '0x0'
  ) {
    transactionConfig.gasPrice = await bscGetGasPriceInWei()
  }
  return (await client.eth.accounts.signTransaction(transactionConfig, fromPrivateKey as string)).rawTransaction as string
}

export const getBscBep20ContractDecimals = async (contractAddress: string, provider?: string) => {
  if (!contractAddress) {
    throw new Error('Contract address not set.')
  }
  const client = await getBscClient(provider)
  // @ts-ignore
  const contract = new client.eth.Contract(erc20_abi, contractAddress.trim())
  return await contract.methods.decimals().call()
}

/**
 * Sign Bsc Store data transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBscStoreDataTransaction = async (body: CreateRecord, provider?: string) => {
  await validateBody(body, CreateRecord)
  const { fromPrivateKey, to, ethFee, data, nonce, signatureId } = body
  const client = getBscClient(provider, fromPrivateKey)
  const address = to || client.eth.defaultAccount
  if (!address) {
    throw new Error('Recipient must be provided.')
  }
  const hexData = client.utils.isHex(data) ? client.utils.stringToHex(data) : client.utils.toHex(data)
  const addressNonce = nonce ? nonce : await bscGetTransactionsCount(address)
  const customFee = ethFee
    ? {
        ...ethFee,
        gasPrice: client.utils.toWei(ethFee.gasPrice, 'gwei'),
      }
    : {
        gasLimit: `${hexData.length * 68 + 21000}`,
        gasPrice: await bscGetGasPriceInWei(),
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
 * Sign BEP20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintBep20SignedTransaction = async (body: MintErc20, provider?: string) => {
  await validateBody(body, MintErc20)
  const { fromPrivateKey, amount, to, contractAddress, nonce, signatureId } = body

  const client = getBscClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc20TokenABI, contractAddress.trim())
  const digits = new BigNumber(10).pow(await contract.methods.decimals().call())
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods.mint(to.trim(), `0x${new BigNumber(amount).multipliedBy(digits).toString(16)}`).encodeABI(),
    nonce,
  }
  return await prepareBscSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey)
}

/**
 * Sign BEP20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBurnBep20SignedTransaction = async (body: BurnErc20, provider?: string) => {
  await validateBody(body, BurnErc20)
  const { fromPrivateKey, amount, contractAddress, nonce, signatureId } = body

  const client = getBscClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc20TokenABI, contractAddress.trim())
  const digits = new BigNumber(10).pow(await contract.methods.decimals().call())
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods.burn(`0x${new BigNumber(amount).multipliedBy(digits).toString(16)}`).encodeABI(),
    nonce,
  }

  return await prepareBscSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey)
}

/**
 * Sign Bsc or supported BEP20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBscOrBep20SignedTransaction = async (body: TransferBscBep20, provider?: string) => {
  await validateBody(body, TransferBscBep20)
  const { fromPrivateKey, to, amount, currency, fee, data, nonce, signatureId } = body

  const client = getBscClient(provider, fromPrivateKey)

  let tx: TransactionConfig
  if (currency === Currency.BSC) {
    tx = {
      from: 0,
      to: to.trim(),
      value: client.utils.toWei(`${amount}`, 'ether'),
      data: data ? (client.utils.isHex(data) ? client.utils.stringToHex(data) : client.utils.toHex(data)) : undefined,
      nonce,
    }
  } else {
    // @ts-ignore
    const contract = new client.eth.Contract([TRANSFER_METHOD_ABI], CONTRACT_ADDRESSES[currency])
    const digits = new BigNumber(10).pow(CONTRACT_DECIMALS[currency as string])
    tx = {
      from: 0,
      to: CONTRACT_ADDRESSES[currency as string],
      data: contract.methods.transfer(to.trim(), `0x${new BigNumber(amount).multipliedBy(digits).toString(16)}`).encodeABI(),
      nonce,
    }
  }
  return await prepareBscSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Bsc custom BEP20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareCustomBep20SignedTransaction = async (body: TransferErc20, provider?: string) => {
  await validateBody(body, TransferErc20)
  const { fromPrivateKey, to, amount, contractAddress, digits, fee, nonce, signatureId } = body

  const client = getBscClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract([TRANSFER_METHOD_ABI], contractAddress)
  const decimals = new BigNumber(10).pow(digits as number)
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress,
    data: contract.methods.transfer(to.trim(), `0x${new BigNumber(amount).multipliedBy(decimals).toString(16)}`).encodeABI(),
    nonce,
  }

  return await prepareBscSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Bsc deploy BEP20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareDeployBep20SignedTransaction = async (body: DeployErc20, provider?: string) => {
  await validateBody(body, DeployErc20)
  const { name, address, symbol, supply, digits, fromPrivateKey, nonce, fee, signatureId, totalCap } = body

  const client = getBscClient(provider, fromPrivateKey)

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
  return await prepareBscSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Bsc generate custodial wallet address transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBscGenerateCustodialWalletSignedTransaction = async (body: GenerateCustodialAddress, provider?: string) => {
  await validateBody(body, GenerateCustodialAddress)

  const client = getBscClient(provider, body.fromPrivateKey)

  const { abi, code } = obtainCustodialAddressType(body)
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
  return await prepareBscSignedTransactionAbstraction(client, tx, body.signatureId, body.fromPrivateKey, body.fee)
}

/**
 * Sign Bsc invoke smart contract transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param options
 * @param options.provider optional url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBscSmartContractWriteMethodInvocation = async (
  body: SmartContractMethodInvocation,
  options?: { provider?: string }
) => {
  await validateBody(body, SmartContractMethodInvocation)
  const { fromPrivateKey, fee, params, methodName, methodABI, contractAddress, nonce, amount, signatureId } = body
  const client = getBscClient(options?.provider, fromPrivateKey)

  const contract = new client.eth.Contract([methodABI])

  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    value: amount ? `0x${new BigNumber(toWei(amount, 'ether')).toString(16)}` : undefined,
    data: contract.methods[methodName as string](...params).encodeABI(),
    nonce,
  }
  return await prepareBscSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Bsc mint ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBscMintBep721SignedTransaction = async (body: MintErc721, provider?: string) => {
  await validateBody(body, MintErc721)
  const { fromPrivateKey, to, tokenId, contractAddress, nonce, fee, url, signatureId } = body

  const client = getBscClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc721TokenABI, contractAddress)
  if (contractAddress) {
    const tx: TransactionConfig = {
      from: 0,
      to: contractAddress.trim(),
      data: contract.methods.mintWithTokenURI(to.trim(), tokenId, url).encodeABI(),
      nonce,
    }
    return await prepareBscSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
  }
  throw new Error('Contract address should not be empty')
}
/**
 * Sign Bsc mint multiple ERC 721 Cashback transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBscMintMultipleBep721ProvenanceSignedTransaction = async (body: EthMintMultipleErc721, provider?: string) => {
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
    erc20,
    fee,
  } = body

  const client = await getBscClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc721Provenance_abi, contractAddress)
  const cb: string[][] = []
  const fv: string[][] = []
  if (authorAddresses && cashbackValues && fixedValues) {
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
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: erc20
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
          .encodeABI(),
    nonce,
  }
  return await prepareBscSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}
/**
 * Sign Bsc mint ERC 721 provenance transaction with cashback via private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBscMintBep721ProvenanceSignedTransaction = async (body: EthMintErc721, provider?: string) => {
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

  const client = getBscClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc721Provenance_abi, contractAddress)
  const cb: string[] = []
  const fval: string[] = []
  if (authorAddresses && cashbackValues && fixedValues) {
    cashbackValues.map((c) => cb.push(`0x${new BigNumber(c).multipliedBy(100).toString(16)}`))
    fixedValues.map((c) => fval.push(`0x${new BigNumber(client.utils.toWei(c, 'ether')).toString(16)}`))
  }
  if (contractAddress) {
    const tx: TransactionConfig = {
      from: 0,
      to: contractAddress.trim(),
      data: contract.methods
        .mintWithTokenURI(to.trim(), tokenId, url, authorAddresses ? authorAddresses : [], cb, fval, erc20 ? erc20 : null)
        .encodeABI(),
      nonce,
    }

    return await prepareBscSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
  }
  throw new Error('Contract address should not be empty!')
}
/**
 * Sign Bsc mint ERC 721 transaction with cashback via private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBscMintBepCashback721SignedTransaction = async (body: MintErc721, provider?: string) => {
  await validateBody(body, MintErc721)
  const { fromPrivateKey, to, tokenId, contractAddress, nonce, fee, url, signatureId, authorAddresses, cashbackValues, erc20 } = body

  const client = getBscClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc721TokenABI, contractAddress)
  const cashbacks: string[] = cashbackValues!
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

    return await prepareBscSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
  }
  throw new Error('Contract address should not be empty!')
}
/**
 * Sign Bsc mint multiple ERC 721 Cashback transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBscMintMultipleCashbackBep721SignedTransaction = async (body: MintMultipleErc721, provider?: string) => {
  await validateBody(body, MintMultipleErc721)
  const { fromPrivateKey, to, tokenId, contractAddress, url, nonce, signatureId, authorAddresses, cashbackValues, fee, erc20 } = body

  const client = await getBscClient(provider, fromPrivateKey)

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
  return await prepareBscSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}
/**
 * Sign Bsc mint multiple ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBscMintMultipleBep721SignedTransaction = async (body: MintMultipleErc721, provider?: string) => {
  await validateBody(body, MintMultipleErc721)
  const { fromPrivateKey, to, tokenId, contractAddress, url, nonce, signatureId, fee } = body

  const client = await getBscClient(provider, fromPrivateKey)

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
  return await prepareBscSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Bsc burn ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBscBurnBep721SignedTransaction = async (body: BurnErc721, provider?: string) => {
  await validateBody(body, BurnErc721)
  const { fromPrivateKey, tokenId, fee, contractAddress, nonce, signatureId } = body

  const client = getBscClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc721TokenABI, contractAddress)
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods.burn(tokenId).encodeABI(),
    nonce,
  }

  return await prepareBscSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Bsc transfer ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBscTransferBep721SignedTransaction = async (body: TransferErc721, provider?: string) => {
  await validateBody(body, TransferErc721)
  const { fromPrivateKey, to, tokenId, fee, contractAddress, nonce, signatureId, value, provenance, provenanceData, tokenPrice } = body

  const client = await getBscClient(provider, fromPrivateKey)

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

  return await prepareBscSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Bsc update cashback ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBscUpdateCashbackForAuthorErc721SignedTransaction = async (body: UpdateCashbackErc721, provider?: string) => {
  await validateBody(body, UpdateCashbackErc721)
  const { fromPrivateKey, cashbackValue, tokenId, fee, contractAddress, nonce, signatureId } = body

  const client = await getBscClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc721TokenABI, contractAddress)

  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods.updateCashbackForAuthor(tokenId, `0x${new BigNumber(toWei(cashbackValue, 'ether')).toString(16)}`).encodeABI(),
    nonce,
  }
  return await prepareBscSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Bsc deploy ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBscDeployBep721SignedTransaction = async (body: DeployErc721, provider?: string) => {
  await validateBody(body, DeployErc721)
  const { fromPrivateKey, fee, name, symbol, nonce, signatureId, provenance } = body

  const client = await getBscClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(provenance ? erc721Provenance_abi : erc721TokenABI, null, {
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
  return await prepareBscSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign BSC generate custodial wallet address transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
 */
export const prepareBscDeployMarketplaceListingSignedTransaction = async (body: DeployMarketplaceListing, provider?: string) => {
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
 * Sign BSC deploy NFT Auction contract transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
 */
export const prepareBscDeployAuctionSignedTransaction = async (body: DeployNftAuction, provider?: string) => {
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
  const client = await getBscClient(provider, fromPrivateKey)
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
  return await prepareBscSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Bsc burn ERC 1155 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBscBurnMultiTokenSignedTransaction = async (body: BurnMultiToken, provider?: string) => {
  await validateBody(body, BurnMultiToken)
  const { fromPrivateKey, account, tokenId, amount, fee, contractAddress, nonce, signatureId } = body

  const client = await getBscClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc1155TokenABI, contractAddress)
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods.burn(account, tokenId, amount).encodeABI(),
    nonce,
  }
  return await prepareBscSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

export const prepareBscBurnMultiTokenBatchSignedTransaction = async (body: BurnMultiTokenBatch, provider?: string) => {
  await validateBody(body, BurnMultiTokenBatch)
  const { fromPrivateKey, account, tokenId, amounts, fee, contractAddress, nonce, signatureId } = body

  const client = await getBscClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc1155TokenABI, contractAddress)
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods.burnBatch(account, tokenId, amounts).encodeABI(),
    nonce,
  }

  return await prepareBscSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

export const prepareBscTransferMultiTokenSignedTransaction = async (body: TransferMultiToken, provider?: string) => {
  await validateBody(body, TransferMultiToken)
  const { fromPrivateKey, to, tokenId, fee, contractAddress, nonce, signatureId, amount, data } = body

  const client = await getBscClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc1155TokenABI, contractAddress)
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods.safeTransfer(to.trim(), tokenId, `0x${new BigNumber(amount).toString(16)}`, data ? data : '0x0').encodeABI(),
    nonce,
  }

  return await prepareBscSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}
export const prepareBscBatchTransferMultiTokenSignedTransaction = async (body: TransferMultiTokenBatch, provider?: string) => {
  await validateBody(body, TransferMultiTokenBatch)
  const { fromPrivateKey, to, tokenId, fee, contractAddress, nonce, signatureId, amounts, data } = body

  const client = await getBscClient(provider, fromPrivateKey)

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

  return await prepareBscSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}
/**
 * Sign Bsc mint ERC 1155 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBscMintMultiTokenSignedTransaction = async (body: MintMultiToken, provider?: string) => {
  await validateBody(body, MintMultiToken)
  const { fromPrivateKey, to, tokenId, contractAddress, nonce, data, fee, amount, signatureId } = body

  const client = await getBscClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc1155TokenABI, contractAddress)
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods.mint(to.trim(), tokenId, `0x${new BigNumber(amount).toString(16)}`, data ? data : '0x0').encodeABI(),
    nonce,
  }

  return await prepareBscSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}
/**
 * Sign BSC mint ERC 1155 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBscMintMultiTokenBatchSignedTransaction = async (body: MintMultiTokenBatch, provider?: string) => {
  await validateBody(body, MintMultiTokenBatch)
  const { fromPrivateKey, to, tokenId, contractAddress, nonce, data, fee, amounts, signatureId } = body

  const client = await getBscClient(provider, fromPrivateKey)
  // @ts-ignore
  const contract = new client.eth.Contract(erc1155TokenABI, contractAddress)
  const amts = amounts.map((amts) => amts.map((amt) => `0x${new BigNumber(amt).toString(16)}`))
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods.mintBatch(to, tokenId, amts, data ? data : '0x0').encodeABI(),
    nonce,
  }

  return await prepareBscSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Bsc deploy ERC 1155 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBscDeployMultiTokenSignedTransaction = async (body: DeployMultiToken, provider?: string) => {
  await validateBody(body, DeployMultiToken)
  const { fromPrivateKey, fee, uri, nonce, signatureId } = body

  const client = await getBscClient(provider, fromPrivateKey)

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

  return await prepareBscSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}
/**
 * Send Bsc invoke smart contract transaction to the blockchain.
 * Invoked method only reads from blockchain the data and returns them back.
 *
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 */
export const sendBscSmartContractReadMethodInvocationTransaction = async (body: SmartContractReadMethodInvocation, provider?: string) => {
  await validateBody(body, SmartContractReadMethodInvocation)
  const { params, methodName, methodABI, contractAddress } = body
  const client = getBscClient(provider)
  const contract = new client.eth.Contract([methodABI], contractAddress)
  return { data: await contract.methods[methodName as string](...params).call() }
}

/**
 * Send Bsc store data transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBscStoreDataTransaction = async (body: CreateRecord, provider?: string) =>
  bscBroadcast(await prepareBscStoreDataTransaction(body, provider), body.signatureId)

/**
 * Send Bsc or supported BEP20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBscOrBep20Transaction = async (body: TransferBscBep20, provider?: string) =>
  bscBroadcast(await prepareBscOrBep20SignedTransaction(body, provider), body.signatureId)

/**
 * Send Bsc custom BEP20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendCustomBep20Transaction = async (body: TransferErc20, provider?: string) =>
  bscBroadcast(await prepareCustomBep20SignedTransaction(body, provider), body.signatureId)

/**
 * Send Bsc deploy BEP20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendDeployBep20Transaction = async (body: DeployErc20, provider?: string) =>
  bscBroadcast(await prepareDeployBep20SignedTransaction(body, provider), body.signatureId)

/**
 * Send Bsc invoke smart contract transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBscSmartContractMethodInvocationTransaction = async (
  body: SmartContractMethodInvocation | SmartContractReadMethodInvocation,
  provider?: string
) => {
  if (body.methodABI.stateMutability === 'view') {
    return sendBscSmartContractReadMethodInvocationTransaction(body, provider)
  }
  return bscBroadcast(
    await prepareBscSmartContractWriteMethodInvocation(body, { provider }),
    (body as SmartContractMethodInvocation).signatureId
  )
}

/**
 * Send Bsc BEP721 mint transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintBep721Transaction = async (body: MintErc721, provider?: string) => {
  if (!body.fromPrivateKey && !body.fromPrivateKey) {
    return mintNFT(body)
  }
  return bscBroadcast(await prepareBscMintBep721SignedTransaction(body, provider), body.signatureId)
}

export const sendBscGenerateCustodialWalletSignedTransaction = async (body: GenerateCustodialAddress, provider?: string) =>
  bscBroadcast(await prepareBscGenerateCustodialWalletSignedTransaction(body, provider), body.signatureId)
// MultiToken
export const sendBscDeployMultiTokenTransaction = async (body: DeployMultiToken, provider?: string) =>
  bscBroadcast(await prepareBscDeployMultiTokenSignedTransaction(body, provider))
export const sendBscMintMultiTokenTransaction = async (body: MintMultiToken, provider?: string) =>
  bscBroadcast(await prepareBscMintMultiTokenSignedTransaction(body, provider), body.signatureId)
export const sendBscMintMultiTokenBatchTransaction = async (body: MintMultiTokenBatch, provider?: string) =>
  bscBroadcast(await prepareBscMintMultiTokenBatchSignedTransaction(body, provider), body.signatureId)

/**
 * Send Bsc BEP721 mint transaction to the blockchain with cashback details. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintBepCashback721Transaction = async (body: MintErc721, provider?: string) =>
  bscBroadcast(await prepareBscMintBepCashback721SignedTransaction(body, provider), body.signatureId)
/**
 * Send Bsc BEP721 mint multiple transaction with cashback to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintMultipleCashbackBep721Transaction = async (body: MintMultipleErc721, provider?: string) =>
  bscBroadcast(await prepareBscMintMultipleCashbackBep721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Bsc BEP721 mint multiple transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintMultipleBep721Transaction = async (body: MintMultipleErc721, provider?: string) =>
  bscBroadcast(await prepareBscMintMultipleBep721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Bsc BEP721 mint multiple provenance transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintMultipleBep721ProvenanceTransaction = async (body: EthMintMultipleErc721, provider?: string) =>
  bscBroadcast(await prepareBscMintMultipleBep721ProvenanceSignedTransaction(body, provider), body.signatureId)
/**
 * Send Bsc BEP721 mint provenance transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintBep721ProvenanceTransaction = async (body: EthMintErc721, provider?: string) => {
  return bscBroadcast(await prepareBscMintBep721ProvenanceSignedTransaction(body, provider), body.signatureId)
}
/**
 * Send Bsc BEP721 burn transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBurnBep721Transaction = async (body: BurnErc721, provider?: string) =>
  bscBroadcast(await prepareBscBurnBep721SignedTransaction(body, provider), body.signatureId)

export const sendUpdateCashbackForAuthorBep721Transaction = async (body: UpdateCashbackErc721, provider?: string) =>
  bscBroadcast(await prepareBscUpdateCashbackForAuthorErc721SignedTransaction(body, provider), body.signatureId)
// Burn 1155
export const sendBscBurnMultiTokenTransaction = async (body: BurnMultiToken, provider?: string) =>
  bscBroadcast(await prepareBscBurnMultiTokenSignedTransaction(body, provider), body.signatureId)

export const sendBscBurnBatchMultiTokenTransaction = async (body: BurnMultiTokenBatch, provider?: string) =>
  bscBroadcast(await prepareBscBurnMultiTokenBatchSignedTransaction(body, provider), body.signatureId)
/**
 * Send Bsc BEP721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBep721Transaction = async (body: TransferErc721, provider?: string) =>
  bscBroadcast(await prepareBscTransferBep721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Bsc MultiToken transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBscMultiTokenTransaction = async (body: TransferMultiToken, provider?: string) =>
  bscBroadcast(await prepareBscTransferMultiTokenSignedTransaction(body, provider), body.signatureId)

export const sendBscMultiTokenBatchTransaction = async (body: TransferMultiTokenBatch, provider?: string) =>
  bscBroadcast(await prepareBscBatchTransferMultiTokenSignedTransaction(body, provider), body.signatureId)
/**
 * Send Bsc BEP721 deploy to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendDeployBep721Transaction = async (body: DeployErc721, provider?: string) =>
  bscBroadcast(await prepareBscDeployBep721SignedTransaction(body, provider), body.signatureId)

/**
 * Deploy new smart contract for NFT marketplace logic. Smart contract enables marketplace operator to create new listing for NFT (ERC-721/1155).
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendBscDeployMarketplaceListingSignedTransaction = async (body: DeployMarketplaceListing, provider?: string) =>
  bscBroadcast(await prepareBscDeployMarketplaceListingSignedTransaction(body, provider), body.signatureId)
