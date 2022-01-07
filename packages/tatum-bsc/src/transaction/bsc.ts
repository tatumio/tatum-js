import {
  auction,
  BurnErc20,
  BurnErc721,
  BurnMultiToken,
  BurnMultiTokenBatch,
  ChainBurnErc721,
  ChainBurnMultiToken,
  ChainBurnMultiTokenBatch,
  ChainCreateRecord,
  ChainDeployErc721,
  ChainDeployMarketplaceListing,
  ChainDeployMultiToken,
  ChainDeployNftAuction,
  ChainEthMintErc721,
  ChainEthMintMultipleErc721,
  ChainGenerateCustodialAddress,
  ChainMintErc721,
  ChainMintMultipleErc721,
  ChainMintMultiToken,
  ChainMintMultiTokenBatch,
  ChainTransactionKMS,
  ChainTransferErc20,
  ChainTransferErc721,
  ChainTransferMultiToken,
  ChainTransferMultiTokenBatch,
  ChainUpdateCashbackErc721,
  CONTRACT_ADDRESSES,
  CONTRACT_DECIMALS,
  CreateRecord,
  Currency,
  DeployErc20,
  DeployErc721,
  DeployMarketplaceListing,
  DeployMultiToken,
  DeployNftAuction,
  erc1155TokenBytecode,
  erc20TokenBytecode,
  erc721Provenance_bytecode,
  erc721TokenBytecode,
  EthMintErc721,
  EthMintMultipleErc721,
  Fee,
  GenerateCustodialAddress,
  listing,
  MintErc20,
  MintErc721,
  MintMultipleErc721,
  MintMultiToken,
  MintMultiTokenBatch,
  SmartContractMethodInvocation,
  SmartContractReadMethodInvocation,
  TATUM_API_URL,
  TransactionKMS,
  TransferErc20,
  TransferErc721,
  TransferMultiToken,
  TransferMultiTokenBatch,
  UpdateCashbackErc721,
  validateBody,
  obtainCustodialAddressType,
  erc721Provenance_abi,
  erc721TokenABI,
} from '@tatumio/tatum-core'
import { TransferBscBep20, ChainTransferBscBep20 } from '../model'
import { BigNumber } from 'bignumber.js'
import Web3 from 'web3'
import { TransactionConfig } from 'web3-core'
import { toWei } from 'web3-utils'
import { broadcast, getTransactionsCount } from '../blockchain'
import { mintNFT } from '../nft'

/**
 * Estimate Gas price for the transaction.
 */
export const getGasPriceInWei = async () => {
  return Web3.utils.toWei('10', 'gwei')
}

/**
 * Returns BSC server to connect to.
 *
 * @param provider url of the BSC Server to connect to. If not set, default public server will be used.
 * @param fromPrivateKey optional private key of sender account
 */
export const getClient = (provider?: string, fromPrivateKey?: string) => {
  const client = new Web3(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/bsc/web3/${process.env.TATUM_API_KEY}`)
  if (fromPrivateKey) {
    client.eth.accounts.wallet.clear()
    client.eth.accounts.wallet.add(fromPrivateKey)
    client.eth.defaultAccount = client.eth.accounts.wallet[0].address
  }
  return client
}
const prepareSignedTransactionAbstraction = async (
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
 * Sign BSC pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @param provider url of the BSC Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const signKMSTransaction = async (tx: ChainTransactionKMS, fromPrivateKey: string, provider?: string) => {
  ;(tx as TransactionKMS).chain = Currency.BSC
  const client = getClient(provider, fromPrivateKey)
  const transactionConfig = JSON.parse(tx.serializedTransaction)
  const gas = await client.eth.estimateGas(transactionConfig)
  if (!transactionConfig.gas) {
    transactionConfig.gas = gas
  }
  if (!transactionConfig.nonce) {
    transactionConfig.nonce = await getTransactionsCount(client.eth.defaultAccount as string)
  }
  if (
    !transactionConfig.gasPrice ||
    transactionConfig.gasPrice === '0' ||
    transactionConfig.gasPrice === 0 ||
    transactionConfig.gasPrice === '0x0'
  ) {
    transactionConfig.gasPrice = await getGasPriceInWei()
  }
  return (await client.eth.accounts.signTransaction(transactionConfig, fromPrivateKey as string)).rawTransaction as string
}

export const getBep20ContractDecimals = async (contractAddress: string, provider?: string) => {
  if (!contractAddress) {
    throw new Error('Contract address not set.')
  }
  const client = await getClient(provider)
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
export const prepareStoreDataTransaction = async (body: ChainCreateRecord, provider?: string) => {
  ;(body as CreateRecord).chain = Currency.BSC
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
  return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey)
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

  return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey)
}

/**
 * Sign Bsc or supported BEP20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBscOrBep20SignedTransaction = async (body: ChainTransferBscBep20, provider?: string) => {
  ;(body as TransferBscBep20).currency = Currency.BSC
  await validateBody(body, TransferBscBep20)
  const { fromPrivateKey, to, amount, currency, fee, data, nonce, signatureId } = body

  const client = getClient(provider, fromPrivateKey)

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
  return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Bsc custom BEP20 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareCustomBep20SignedTransaction = async (body: ChainTransferErc20, provider?: string) => {
  ;(body as TransferErc20).currency = Currency.BSC
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

  return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
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
  return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Bsc generate custodial wallet address transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareGenerateCustodialWalletSignedTransaction = async (body: ChainGenerateCustodialAddress, provider?: string) => {
  ;(body as GenerateCustodialAddress).chain = Currency.BSC
  await validateBody(body, GenerateCustodialAddress)

  const client = getClient(provider, body.fromPrivateKey)

  const { abi, code } = obtainCustodialAddressType({ ...body, chain: Currency.BSC })
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
  return await prepareSignedTransactionAbstraction(client, tx, body.signatureId, body.fromPrivateKey, body.fee)
}

/**
 * Sign Bsc invoke smart contract transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param options
 * @param options.provider optional url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareSmartContractWriteMethodInvocation = async (body: SmartContractMethodInvocation, options?: { provider?: string }) => {
  await validateBody(body, SmartContractMethodInvocation)
  const { fromPrivateKey, fee, params, methodName, methodABI, contractAddress, nonce, amount, signatureId } = body
  const client = getClient(options?.provider, fromPrivateKey)

  const contract = new client.eth.Contract([methodABI])

  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    value: amount ? `0x${new BigNumber(toWei(amount, 'ether')).toString(16)}` : undefined,
    data: contract.methods[methodName as string](...params).encodeABI(),
    nonce,
  }
  return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Bsc mint ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintBep721SignedTransaction = async (body: ChainMintErc721, provider?: string) => {
  ;(body as MintErc721).chain = Currency.BSC
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
    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
  }
  throw new Error('Contract address should not be empty')
}
/**
 * Sign Bsc mint multiple ERC 721 Cashback transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintMultipleBep721ProvenanceSignedTransaction = async (body: ChainEthMintMultipleErc721, provider?: string) => {
  ;(body as EthMintMultipleErc721).chain = Currency.BSC
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

  const client = await getClient(provider, fromPrivateKey)

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
  return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}
/**
 * Sign Bsc mint ERC 721 provenance transaction with cashback via private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintBep721ProvenanceSignedTransaction = async (body: ChainEthMintErc721, provider?: string) => {
  ;(body as EthMintErc721).chain = Currency.BSC
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

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
  }
  throw new Error('Contract address should not be empty!')
}
/**
 * Sign Bsc mint ERC 721 transaction with cashback via private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintBepCashback721SignedTransaction = async (body: ChainMintErc721, provider?: string) => {
  ;(body as MintErc721).chain = Currency.BSC
  await validateBody(body, MintErc721)
  const { fromPrivateKey, to, tokenId, contractAddress, nonce, fee, url, signatureId, authorAddresses, cashbackValues, erc20 } = body

  const client = getClient(provider, fromPrivateKey)

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

    return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
  }
  throw new Error('Contract address should not be empty!')
}
/**
 * Sign Bsc mint multiple ERC 721 Cashback transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintMultipleCashbackBep721SignedTransaction = async (body: ChainMintMultipleErc721, provider?: string) => {
  ;(body as MintMultipleErc721).chain = Currency.BSC
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
  return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}
/**
 * Sign Bsc mint multiple ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintMultipleBep721SignedTransaction = async (body: ChainMintMultipleErc721, provider?: string) => {
  ;(body as MintMultipleErc721).chain = Currency.BSC
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
  return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Bsc burn ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBurnBep721SignedTransaction = async (body: ChainBurnErc721, provider?: string) => {
  ;(body as BurnErc721).chain = Currency.BSC
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

  return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Bsc transfer ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareTransferBep721SignedTransaction = async (body: ChainTransferErc721, provider?: string) => {
  ;(body as TransferErc721).chain = Currency.BSC
  await validateBody(body, TransferErc721)
  const { fromPrivateKey, to, tokenId, fee, contractAddress, nonce, signatureId, value, provenance, provenanceData, tokenPrice } = body

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

  return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Bsc update cashback ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareUpdateCashbackForAuthorErc721SignedTransaction = async (body: ChainUpdateCashbackErc721, provider?: string) => {
  ;(body as UpdateCashbackErc721).chain = Currency.BSC
  await validateBody(body, UpdateCashbackErc721)
  const { fromPrivateKey, cashbackValue, tokenId, fee, contractAddress, nonce, signatureId } = body

  const client = await getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc721TokenABI, contractAddress)

  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods.updateCashbackForAuthor(tokenId, `0x${new BigNumber(toWei(cashbackValue, 'ether')).toString(16)}`).encodeABI(),
    nonce,
  }
  return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Bsc deploy ERC 721 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareDeployBep721SignedTransaction = async (body: ChainDeployErc721, provider?: string) => {
  ;(body as DeployErc721).chain = Currency.BSC
  await validateBody(body, DeployErc721)
  const { fromPrivateKey, fee, name, symbol, nonce, signatureId, provenance } = body

  const client = await getClient(provider, fromPrivateKey)

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
  return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign BSC generate custodial wallet address transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
 */
export const prepareDeployMarketplaceListingSignedTransaction = async (body: ChainDeployMarketplaceListing, provider?: string) => {
  ;(body as DeployMarketplaceListing).chain = Currency.BSC
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
export const prepareDeployAuctionSignedTransaction = async (body: ChainDeployNftAuction, provider?: string) => {
  ;(body as DeployNftAuction).chain = Currency.BSC
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
  return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Bsc burn ERC 1155 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareBurnMultiTokenSignedTransaction = async (body: ChainBurnMultiToken, provider?: string) => {
  ;(body as BurnMultiToken).chain = Currency.BSC
  await validateBody(body, BurnMultiToken)
  const { fromPrivateKey, account, tokenId, amount, fee, contractAddress, nonce, signatureId } = body

  const client = await getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc1155TokenABI, contractAddress)
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods.burn(account, tokenId, amount).encodeABI(),
    nonce,
  }
  return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

export const prepareBurnMultiTokenBatchSignedTransaction = async (body: ChainBurnMultiTokenBatch, provider?: string) => {
  ;(body as BurnMultiTokenBatch).chain = Currency.BSC
  await validateBody(body, BurnMultiTokenBatch)
  const { fromPrivateKey, account, tokenId, amounts, fee, contractAddress, nonce, signatureId } = body

  const client = await getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc1155TokenABI, contractAddress)
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods.burnBatch(account, tokenId, amounts).encodeABI(),
    nonce,
  }

  return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

export const prepareTransferMultiTokenSignedTransaction = async (body: ChainTransferMultiToken, provider?: string) => {
  ;(body as TransferMultiToken).chain = Currency.BSC
  await validateBody(body, TransferMultiToken)
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

  return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}
export const prepareBatchTransferMultiTokenSignedTransaction = async (body: ChainTransferMultiTokenBatch, provider?: string) => {
  ;(body as TransferMultiTokenBatch).chain = Currency.BSC
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

  return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}
/**
 * Sign Bsc mint ERC 1155 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintMultiTokenSignedTransaction = async (body: ChainMintMultiToken, provider?: string) => {
  ;(body as MintMultiToken).chain = Currency.BSC
  await validateBody(body, MintMultiToken)
  const { fromPrivateKey, to, tokenId, contractAddress, nonce, data, fee, amount, signatureId } = body

  const client = await getClient(provider, fromPrivateKey)

  // @ts-ignore
  const contract = new client.eth.Contract(erc1155TokenABI, contractAddress)
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods.mint(to.trim(), tokenId, `0x${new BigNumber(amount).toString(16)}`, data ? data : '0x0').encodeABI(),
    nonce,
  }

  return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}
/**
 * Sign BSC mint ERC 1155 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareMintMultiTokenBatchSignedTransaction = async (body: ChainMintMultiTokenBatch, provider?: string) => {
  ;(body as MintMultiTokenBatch).chain = Currency.BSC
  await validateBody(body, MintMultiTokenBatch)
  const { fromPrivateKey, to, tokenId, contractAddress, nonce, data, fee, amounts, signatureId } = body

  const client = await getClient(provider, fromPrivateKey)
  // @ts-ignore
  const contract = new client.eth.Contract(erc1155TokenABI, contractAddress)
  const amts = amounts.map((amts) => amts.map((amt) => `0x${new BigNumber(amt).toString(16)}`))
  const tx: TransactionConfig = {
    from: 0,
    to: contractAddress.trim(),
    data: contract.methods.mintBatch(to, tokenId, amts, data ? data : '0x0').encodeABI(),
    nonce,
  }

  return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}

/**
 * Sign Bsc deploy ERC 1155 transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain.
 */
export const prepareDeployMultiTokenSignedTransaction = async (body: ChainDeployMultiToken, provider?: string) => {
  ;(body as DeployMultiToken).chain = Currency.BSC
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

  return await prepareSignedTransactionAbstraction(client, tx, signatureId, fromPrivateKey, fee)
}
/**
 * Send Bsc invoke smart contract transaction to the blockchain.
 * Invoked method only reads from blockchain the data and returns them back.
 *
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 */
export const sendSmartContractReadMethodInvocationTransaction = async (body: SmartContractReadMethodInvocation, provider?: string) => {
  await validateBody(body, SmartContractReadMethodInvocation)
  const { params, methodName, methodABI, contractAddress } = body
  const client = getClient(provider)
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
export const sendStoreDataTransaction = async (body: ChainCreateRecord, provider?: string) =>
  broadcast(await prepareStoreDataTransaction(body, provider), body.signatureId)

/**
 * Send Bsc or supported BEP20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBscOrBep20Transaction = async (body: ChainTransferBscBep20, provider?: string) =>
  broadcast(await prepareBscOrBep20SignedTransaction(body, provider), body.signatureId)

/**
 * Send Bsc custom BEP20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendCustomBep20Transaction = async (body: ChainTransferErc20, provider?: string) =>
  broadcast(await prepareCustomBep20SignedTransaction(body, provider), body.signatureId)

/**
 * Send Bsc deploy BEP20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendDeployBep20Transaction = async (body: DeployErc20, provider?: string) =>
  broadcast(await prepareDeployBep20SignedTransaction(body, provider), body.signatureId)

/**
 * Send Bsc invoke smart contract transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendSmartContractMethodInvocationTransaction = async (
  body: SmartContractMethodInvocation | SmartContractReadMethodInvocation,
  provider?: string
) => {
  if (body.methodABI.stateMutability === 'view') {
    return sendSmartContractReadMethodInvocationTransaction(body, provider)
  }
  return broadcast(await prepareSmartContractWriteMethodInvocation(body, { provider }), (body as SmartContractMethodInvocation).signatureId)
}

/**
 * Send Bsc BEP721 mint transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintBep721Transaction = async (body: ChainMintErc721, provider?: string) => {
  ;(body as MintErc721).chain = Currency.BSC
  if (!body.fromPrivateKey && !body.fromPrivateKey) {
    return mintNFT(body)
  }
  return broadcast(await prepareMintBep721SignedTransaction(body, provider), body.signatureId)
}

export const sendGenerateCustodialWalletSignedTransaction = async (body: ChainGenerateCustodialAddress, provider?: string) =>
  broadcast(await prepareGenerateCustodialWalletSignedTransaction(body, provider), body.signatureId)
// MultiToken
export const sendDeployMultiTokenTransaction = async (body: ChainDeployMultiToken, provider?: string) =>
  broadcast(await prepareDeployMultiTokenSignedTransaction(body, provider))
export const sendMintMultiTokenTransaction = async (body: ChainMintMultiToken, provider?: string) =>
  broadcast(await prepareMintMultiTokenSignedTransaction(body, provider), body.signatureId)
export const sendMintMultiTokenBatchTransaction = async (body: ChainMintMultiTokenBatch, provider?: string) =>
  broadcast(await prepareMintMultiTokenBatchSignedTransaction(body, provider), body.signatureId)

/**
 * Send Bsc BEP721 mint transaction to the blockchain with cashback details. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintBepCashback721Transaction = async (body: ChainMintErc721, provider?: string) =>
  broadcast(await prepareMintBepCashback721SignedTransaction(body, provider), body.signatureId)
/**
 * Send Bsc BEP721 mint multiple transaction with cashback to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintMultipleCashbackBep721Transaction = async (body: ChainMintMultipleErc721, provider?: string) =>
  broadcast(await prepareMintMultipleCashbackBep721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Bsc BEP721 mint multiple transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintMultipleBep721Transaction = async (body: ChainMintMultipleErc721, provider?: string) =>
  broadcast(await prepareMintMultipleBep721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Bsc BEP721 mint multiple provenance transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintMultipleBep721ProvenanceTransaction = async (body: ChainEthMintMultipleErc721, provider?: string) =>
  broadcast(await prepareMintMultipleBep721ProvenanceSignedTransaction(body, provider), body.signatureId)
/**
 * Send Bsc BEP721 mint provenance transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintBep721ProvenanceTransaction = async (body: ChainEthMintErc721, provider?: string) => {
  return broadcast(await prepareMintBep721ProvenanceSignedTransaction(body, provider), body.signatureId)
}
/**
 * Send Bsc BEP721 burn transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBurnBep721Transaction = async (body: ChainBurnErc721, provider?: string) =>
  broadcast(await prepareBurnBep721SignedTransaction(body, provider), body.signatureId)

export const sendUpdateCashbackForAuthorBep721Transaction = async (body: ChainUpdateCashbackErc721, provider?: string) =>
  broadcast(await prepareUpdateCashbackForAuthorErc721SignedTransaction(body, provider), body.signatureId)
// Burn 1155
export const sendBurnMultiTokenTransaction = async (body: ChainBurnMultiToken, provider?: string) =>
  broadcast(await prepareBurnMultiTokenSignedTransaction(body, provider), body.signatureId)

export const sendBurnBatchMultiTokenTransaction = async (body: ChainBurnMultiTokenBatch, provider?: string) =>
  broadcast(await prepareBurnMultiTokenBatchSignedTransaction(body, provider), body.signatureId)
/**
 * Send Bsc BEP721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBep721Transaction = async (body: ChainTransferErc721, provider?: string) =>
  broadcast(await prepareTransferBep721SignedTransaction(body, provider), body.signatureId)

/**
 * Send Bsc MultiToken transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMultiTokenTransaction = async (body: ChainTransferMultiToken, provider?: string) =>
  broadcast(await prepareTransferMultiTokenSignedTransaction(body, provider), body.signatureId)

export const sendMultiTokenBatchTransaction = async (body: ChainTransferMultiTokenBatch, provider?: string) =>
  broadcast(await prepareBatchTransferMultiTokenSignedTransaction(body, provider), body.signatureId)
/**
 * Send Bsc BEP721 deploy to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendDeployBep721Transaction = async (body: ChainDeployErc721, provider?: string) =>
  broadcast(await prepareDeployBep721SignedTransaction(body, provider), body.signatureId)

/**
 * Deploy new smart contract for NFT marketplace logic. Smart contract enables marketplace operator to create new listing for NFT (ERC-721/1155).
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendDeployMarketplaceListingSignedTransaction = async (body: ChainDeployMarketplaceListing, provider?: string) =>
  broadcast(await prepareDeployMarketplaceListingSignedTransaction(body, provider), body.signatureId)
