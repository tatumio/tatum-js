import { CeloProvider, CeloWallet } from '@celo-tools/celo-ethers-wrapper'
import { BigNumber as BN } from '@ethersproject/bignumber'
import { BigNumber } from 'bignumber.js'
import Web3 from 'web3'
import { isHex, stringToHex, toHex, toWei } from 'web3-utils'
import { broadcast } from '../blockchain'
import { mintNFT } from '../nft'
import {
  auction,
  CeloSmartContractMethodInvocation,
  ChainCreateRecord,
  ChainDeployMarketplaceListing,
  ChainDeployNftAuction,
  ChainGenerateCustodialAddress,
  ChainTransactionKMS,
  CreateRecord,
  Currency,
  DeployMarketplaceListing,
  DeployNftAuction,
  erc721TokenABI as erc721_abi,
  erc1155TokenBytecode as erc1155_bytecode,
  erc20TokenBytecode as erc20_bytecode,
  erc721Provenance_bytecode,
  erc721TokenBytecode as erc721_bytecode,
  GenerateCustodialAddress,
  listing,
  SmartContractReadMethodInvocation,
  TATUM_API_URL,
  TransactionKMS,
  validateBody,
  obtainCustodialAddressType,
  CeloMintErc721,
  erc721Provenance_abi,
} from '@tatumio/tatum-core'
import {
  BurnCeloErc20,
  CeloBurnErc721,
  CeloBurnMultiToken,
  CeloBurnMultiTokenBatch,
  CeloDeployErc721,
  CeloDeployMultiToken,
  CeloMintMultipleErc721,
  CeloMintMultiToken,
  CeloMintMultiTokenBatch,
  CeloTransferErc721,
  CeloTransferMultiToken,
  CeloTransferMultiTokenBatch,
  CeloUpdateCashbackErc721,
  DeployCeloErc20,
  MintCeloErc20,
  TransferCeloOrCeloErc20Token,
} from '../'
import { CEUR_ADDRESS_MAINNET, CEUR_ADDRESS_TESTNET, CUSD_ADDRESS_MAINNET, CUSD_ADDRESS_TESTNET } from '../constants'

const obtainWalletInformation = async (wallet: CeloWallet, feeCurrencyContractAddress?: string) => {
  const [txCount, gasPrice, from] = await Promise.all([
    wallet.getTransactionCount(),
    wallet.getGasPrice(feeCurrencyContractAddress),
    wallet.getAddress(),
  ])
  return {
    txCount,
    gasPrice:
      [CUSD_ADDRESS_MAINNET, CUSD_ADDRESS_TESTNET].includes(feeCurrencyContractAddress || '') && gasPrice.lte(0x1dcd6500)
        ? BN.from(0x3b9aca00)
        : gasPrice,
    from,
  }
}

const getFeeCurrency = (feeCurrency: Currency, testnet: boolean) => {
  switch (feeCurrency) {
    case Currency.CEUR:
      return testnet ? CEUR_ADDRESS_TESTNET : CEUR_ADDRESS_MAINNET
    case Currency.CUSD:
      return testnet ? CUSD_ADDRESS_TESTNET : CUSD_ADDRESS_MAINNET
    default:
      return undefined
  }
}

/**
 * Sign CELO generate custodial wallet address transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
 */
export const prepareGenerateCustodialWalletSignedTransaction = async (
  testnet: boolean,
  body: ChainGenerateCustodialAddress,
  provider?: string
) => {
  ;(body as GenerateCustodialAddress).chain = Currency.CELO
  await validateBody(body, GenerateCustodialAddress)

  const p = new CeloProvider(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
  const network = await p.ready
  const feeCurrency = body.feeCurrency || Currency.CELO
  const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)
  const { abi, code } = obtainCustodialAddressType({ ...body, chain: Currency.CELO })
  // @ts-ignore
  const contract = new new Web3().eth.Contract(abi)
  const deploy = contract.deploy({
    data: code,
  })

  if (body.signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce: body.nonce,
      gasLimit: '0',
      data: deploy.encodeABI(),
    })
  }
  const wallet = new CeloWallet(body.fromPrivateKey as string, p)
  const { txCount, gasPrice, from } = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
  const transaction = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: body.nonce || txCount,
    gasLimit: '0',
    gasPrice,
    data: deploy.encodeABI(),
    from,
  }
  transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
  return wallet.signTransaction(transaction)
}

const deployContract = async (
  testnet: boolean,
  abi: any[],
  bytecode: string,
  args: any[],
  feeCurrency = Currency.CELO,
  fromPrivateKey?: string,
  nonce?: number,
  signatureId?: string,
  provider?: string
) => {
  const p = new CeloProvider(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
  const network = await p.ready
  const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)
  // @ts-ignore
  const contract = new new Web3().eth.Contract(abi)
  const deploy = contract.deploy({
    data: bytecode,
    arguments: args,
  })

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      gasLimit: '0',
      data: deploy.encodeABI(),
    })
  }
  const wallet = new CeloWallet(fromPrivateKey as string, p)
  const { txCount, gasPrice, from } = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
  const transaction = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    gasLimit: '0',
    gasPrice,
    data: deploy.encodeABI(),
    from,
  }
  transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
  return wallet.signTransaction(transaction)
}

/**
 * Sign CELO generate custodial wallet address transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
 */
export const prepareDeployMarketplaceListingSignedTransaction = async (
  testnet: boolean,
  body: ChainDeployMarketplaceListing,
  provider?: string
) => {
  ;(body as DeployMarketplaceListing).chain = Currency.CELO
  await validateBody(body, DeployMarketplaceListing)

  return deployContract(
    testnet,
    listing.abi,
    listing.data,
    [body.marketplaceFee, body.feeRecipient],
    body.feeCurrency,
    body.fromPrivateKey,
    body.nonce,
    body.signatureId,
    provider
  )
}

/**
 * Sign CELO deploy NFT Auction contract transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider url of the Bsc Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
 */
export const prepareDeployAuctionSignedTransaction = async (testnet: boolean, body: ChainDeployNftAuction, provider?: string) => {
  const b: DeployNftAuction = { ...body, chain: Currency.CELO }
  await validateBody(b, DeployNftAuction)

  return deployContract(
    testnet,
    auction.abi,
    auction.data,
    [b.auctionFee, b.feeRecipient],
    b.feeCurrency,
    b.fromPrivateKey,
    b.nonce,
    b.signatureId,
    provider
  )
}
/**
 * Sign Celo pending transaction from Tatum KMS
 * @param tx pending transaction from KMS
 * @param fromPrivateKey private key to sign transaction with.
 * @param provider url of the Ethereum Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
 */
export const signKMSTransaction = async (tx: ChainTransactionKMS, fromPrivateKey: string, provider?: string) => {
  ;(tx as TransactionKMS).chain = Currency.CELO
  const p = new CeloProvider(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
  await p.ready
  const wallet = new CeloWallet(fromPrivateKey as string, p)
  const transaction = JSON.parse(tx.serializedTransaction)
  const { txCount, gasPrice, from } = await obtainWalletInformation(wallet, transaction.feeCurrency)
  transaction.nonce = transaction.nonce || txCount
  transaction.gasPrice = transaction.gasPrice || gasPrice
  transaction.from = from
  transaction.gasLimit =
    transaction.gasLimit === '0' || !transaction.gasLimit
      ? (await wallet.estimateGas(transaction)).add(100000).toHexString()
      : transaction.gasLimit
  return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo deploy multi token transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareDeployMultiTokenSignedTransaction = async (testnet: boolean, body: CeloDeployMultiToken, provider?: string) => {
  await validateBody(body, CeloDeployMultiToken)
  const { fromPrivateKey, uri, feeCurrency, nonce, signatureId } = body

  const p = new CeloProvider(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
  const network = await p.ready
  const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)

  // @ts-ignore
  const contract = new new Web3().eth.Contract(erc1155_abi)
  const deploy = contract.deploy({
    data: erc1155_bytecode,
    arguments: [uri],
  })

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      gasLimit: '0',
      data: deploy.encodeABI(),
    })
  }
  const wallet = new CeloWallet(fromPrivateKey as string, p)
  const { txCount, gasPrice, from } = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
  const transaction = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    gasLimit: '0',
    gasPrice,
    data: deploy.encodeABI(),
    from,
  }
  transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
  return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo deploy erc721 transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareDeployErc721SignedTransaction = async (testnet: boolean, body: CeloDeployErc721, provider?: string) => {
  await validateBody(body, CeloDeployErc721)
  const { fromPrivateKey, name, symbol, feeCurrency, nonce, signatureId, provenance } = body

  const p = new CeloProvider(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
  const network = await p.ready
  const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)

  // @ts-ignore
  const contract = new new Web3().eth.Contract(provenance ? erc721Provenance_abi : erc721_abi)
  const deploy = contract.deploy({
    data: provenance ? erc721Provenance_bytecode : erc721_bytecode,
    arguments: [name, symbol],
  })

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      gasLimit: '0',
      data: deploy.encodeABI(),
    })
  }
  const wallet = new CeloWallet(fromPrivateKey as string, p)
  const { txCount, gasPrice, from } = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
  const transaction = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    gasLimit: '0',
    gasPrice,
    data: deploy.encodeABI(),
    from,
  }
  transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
  return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo mint cashback erc721 transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareMintCashbackErc721SignedTransaction = async (testnet: boolean, body: CeloMintErc721, provider?: string) => {
  await validateBody(body, CeloMintErc721)
  const { fromPrivateKey, url, to, tokenId, contractAddress, feeCurrency, nonce, signatureId, authorAddresses, cashbackValues, erc20 } =
    body

  const p = new CeloProvider(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
  const network = await p.ready
  if (contractAddress && feeCurrency) {
    const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)
    // @ts-ignore
    const contract = new new Web3().eth.Contract(erc721_abi, contractAddress.trim())
    const cb: string[] = []
    for (const c of cashbackValues!) {
      cb.push(`0x${new BigNumber(toWei(c, 'ether')).toString(16)}`)
    }
    if (signatureId) {
      return JSON.stringify({
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce,
        to: contractAddress.trim(),
        gasLimit: '0',
        data: erc20
          ? contract.methods.mintWithCashback(to.trim(), tokenId, url, authorAddresses, cb, erc20).encodeABI()
          : contract.methods.mintWithCashback(to.trim(), tokenId, url, authorAddresses, cb).encodeABI(),
      })
    }
    const wallet = new CeloWallet(fromPrivateKey as string, p)
    const { txCount, gasPrice, from } = await obtainWalletInformation(wallet, feeCurrencyContractAddress)

    const transaction = {
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce: nonce || txCount,
      gasLimit: '0',
      to: contractAddress.trim(),
      gasPrice,
      data: erc20
        ? contract.methods.mintWithCashback(to.trim(), tokenId, url, authorAddresses, cb, erc20).encodeABI()
        : contract.methods.mintWithCashback(to.trim(), tokenId, url, authorAddresses, cb).encodeABI(),
      from,
    }
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
    return wallet.signTransaction(transaction)
  }
  throw new Error('Contract address and fee currency should not be empty!')
}
/**
 * Prepare a signed Celo mint provenance erc732 transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareMintErc721ProvenanceSignedTransaction = async (testnet: boolean, body: CeloMintErc721, provider?: string) => {
  await validateBody(body, CeloMintErc721)
  const {
    fromPrivateKey,
    url,
    to,
    tokenId,
    contractAddress,
    feeCurrency,
    nonce,
    signatureId,
    cashbackValues,
    authorAddresses,
    fixedValues,
    erc20,
  } = body

  const p = new CeloProvider(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
  const network = await p.ready

  if (contractAddress && feeCurrency) {
    const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)
    // @ts-ignore
    const contract = new new Web3().eth.Contract(erc721Provenance_abi, contractAddress.trim())
    const cb: string[] = []
    const fv: string[] = []
    if (cashbackValues && fixedValues && authorAddresses) {
      cashbackValues.map((c) => cb.push(`0x${new BigNumber(c).multipliedBy(100).toString(16)}`))
      fixedValues.map((c) => fv.push(`0x${new BigNumber(toWei(c, 'ether')).toString(16)}`))
    }
    const data = erc20
      ? contract.methods.mintWithTokenURI(to.trim(), tokenId, url, authorAddresses ? authorAddresses : [], cb, fv, erc20).encodeABI()
      : contract.methods.mintWithTokenURI(to.trim(), tokenId, url, authorAddresses ? authorAddresses : [], cb, fv).encodeABI()
    if (signatureId) {
      return JSON.stringify({
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce,
        to: contractAddress.trim(),
        gasLimit: '0',
        data: data,
      })
    }
    const wallet = new CeloWallet(fromPrivateKey as string, p)
    const { txCount, gasPrice, from } = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
    const transaction = {
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce: nonce || txCount,
      gasLimit: '0',
      to: contractAddress.trim(),
      gasPrice,
      data: data,
      from,
    }
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
    return wallet.signTransaction(transaction)
  }
  throw new Error('Contract address and fee currency should not be empty!')
}
/**
 * Prepare a signed Celo mint multiple provenance cashback erc721 transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareMintMultipleErc721ProvenanceSignedTransaction = async (
  testnet: boolean,
  body: CeloMintMultipleErc721,
  provider?: string
) => {
  await validateBody(body, CeloMintMultipleErc721)
  const {
    fromPrivateKey,
    to,
    tokenId,
    contractAddress,
    url,
    feeCurrency,
    nonce,
    signatureId,
    authorAddresses,
    cashbackValues,
    fixedValues,
    erc20,
  } = body

  const p = new CeloProvider(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
  const network = await p.ready

  const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)

  // @ts-ignore
  const contract = new new Web3().eth.Contract(erc721Provenance_abi, contractAddress.trim())

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
  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      gasLimit: '0',
      to: contractAddress.trim(),
      data: data,
    })
  }
  const wallet = new CeloWallet(fromPrivateKey as string, p)
  const { txCount, gasPrice, from } = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
  const transaction = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    gasLimit: '0',
    to: contractAddress.trim(),
    gasPrice,
    data: data,
    from,
  }
  transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
  return wallet.signTransaction(transaction)
}
/**
 * Prepare a signed Celo mint erc732 transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareMintErc721SignedTransaction = async (testnet: boolean, body: CeloMintErc721, provider?: string) => {
  await validateBody(body, CeloMintErc721)
  const { fromPrivateKey, url, to, tokenId, contractAddress, feeCurrency, nonce, signatureId } = body

  const p = new CeloProvider(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
  const network = await p.ready

  if (contractAddress && feeCurrency) {
    const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)
    // @ts-ignore
    const contract = new new Web3().eth.Contract(erc721_abi, contractAddress.trim())

    if (signatureId) {
      return JSON.stringify({
        chainId: network.chainId,
        feeCurrency: feeCurrencyContractAddress,
        nonce,
        to: contractAddress.trim(),
        gasLimit: '0',
        data: contract.methods.mintWithTokenURI(to.trim(), tokenId, url).encodeABI(),
      })
    }
    const wallet = new CeloWallet(fromPrivateKey as string, p)
    const { txCount, gasPrice, from } = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
    const transaction = {
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce: nonce || txCount,
      gasLimit: '0',
      to: contractAddress.trim(),
      gasPrice,
      data: contract.methods.mintWithTokenURI(to.trim(), tokenId, url).encodeABI(),
      from,
    }
    transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
    return wallet.signTransaction(transaction)
  }
  throw new Error('Contract address and fee currency should not be empty!')
}

/**
 * Prepare a signed Celo transfer erc721 transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareTransferErc721SignedTransaction = async (testnet: boolean, body: CeloTransferErc721, provider?: string) => {
  await validateBody(body, CeloTransferErc721)
  const { fromPrivateKey, to, tokenId, contractAddress, feeCurrency, nonce, signatureId, value, provenance, provenanceData, tokenPrice } =
    body

  const p = new CeloProvider(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
  const network = await p.ready
  const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)

  // @ts-ignore
  const contract = new new Web3().eth.Contract(provenance ? erc721Provenance_abi : erc721_abi, contractAddress.trim())
  const dataBytes = provenance ? Buffer.from(provenanceData + "'''###'''" + toWei(tokenPrice!, 'ether'), 'utf8') : ''
  const tokenData = provenance
    ? contract.methods.safeTransfer(to.trim(), tokenId, `0x${dataBytes.toString('hex')}`).encodeABI()
    : contract.methods.safeTransfer(to.trim(), tokenId).encodeABI()

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      gasLimit: '0',
      nonce,
      to: contractAddress.trim(),
      data: tokenData,
      value: value ? `0x${new BigNumber(value).multipliedBy(1e18).toString(16)}` : undefined,
    })
  }
  const wallet = new CeloWallet(fromPrivateKey as string, p)
  const { txCount, gasPrice, from } = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
  const transaction = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    gasLimit: '0',
    to: contractAddress.trim(),
    gasPrice,
    data: contract.methods.safeTransfer(to.trim(), tokenId).encodeABI(),
    from,
    value: value ? `0x${new BigNumber(value).multipliedBy(1e18).toString(16)}` : undefined,
  }
  transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
  return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo burn erc721 transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareBurnErc721SignedTransaction = async (testnet: boolean, body: CeloBurnErc721, provider?: string) => {
  await validateBody(body, CeloBurnErc721)
  const { fromPrivateKey, tokenId, contractAddress, feeCurrency, nonce, signatureId } = body

  const p = new CeloProvider(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
  const network = await p.ready

  const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)

  // @ts-ignore
  const contract = new new Web3().eth.Contract(erc721_abi, contractAddress.trim())

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      gasLimit: '0',
      to: contractAddress.trim(),
      data: contract.methods.burn(tokenId).encodeABI(),
    })
  }
  const wallet = new CeloWallet(fromPrivateKey as string, p)
  const { txCount, gasPrice, from } = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
  const transaction = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    gasLimit: '0',
    to: contractAddress.trim(),
    gasPrice,
    data: contract.methods.burn(tokenId).encodeABI(),
    from,
  }
  transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
  return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo deploy erc20 transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareDeployErc20SignedTransaction = async (testnet: boolean, body: DeployCeloErc20, provider?: string) => {
  await validateBody(body, DeployCeloErc20)
  const { fromPrivateKey, name, symbol, supply, address, digits, feeCurrency, nonce, signatureId, totalCap } = body

  const p = new CeloProvider(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
  const network = await p.ready

  const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)

  // @ts-ignore
  const contract = new new Web3().eth.Contract(erc20_abi)
  const deploy = contract.deploy({
    data: erc20_bytecode,
    arguments: [
      name,
      symbol,
      address,
      digits,
      `0x${new BigNumber(totalCap || supply).multipliedBy(new BigNumber(10).pow(digits)).toString(16)}`,
      `0x${new BigNumber(supply).multipliedBy(new BigNumber(10).pow(digits)).toString(16)}`,
    ],
  })
  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      gasLimit: '0',
      data: deploy.encodeABI(),
    })
  }
  const wallet = new CeloWallet(fromPrivateKey as string, p)
  const { txCount, gasPrice, from } = await obtainWalletInformation(wallet, feeCurrencyContractAddress)

  const transaction = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    gasLimit: '0',
    gasPrice,
    data: deploy.encodeABI(),
    from,
  }
  transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
  return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo mint erc20 transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareMintErc20SignedTransaction = async (testnet: boolean, body: MintCeloErc20, provider?: string) => {
  await validateBody(body, MintCeloErc20)
  const { fromPrivateKey, amount, to, contractAddress, feeCurrency, nonce, signatureId } = body

  const url = provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`
  const p = new CeloProvider(url)
  const network = await p.ready

  const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)
  // @ts-ignore
  const contract = new new Web3(url).eth.Contract(erc20_abi, contractAddress.trim())
  const decimals = await contract.methods.decimals().call()
  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      gasLimit: '0',
      to: contractAddress.trim(),
      data: contract.methods.mint(to.trim(), '0x' + new BigNumber(amount).multipliedBy(10 ** decimals).toString(16)).encodeABI(),
    })
  }
  const wallet = new CeloWallet(fromPrivateKey as string, p)
  const { txCount, gasPrice, from } = await obtainWalletInformation(wallet, feeCurrencyContractAddress)

  const transaction = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    gasLimit: '0',
    to: contractAddress.trim(),
    gasPrice,
    data: contract.methods.mint(to.trim(), '0x' + new BigNumber(amount).multipliedBy(10 ** decimals).toString(16)).encodeABI(),
    from,
  }
  transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
  return wallet.signTransaction(transaction)
}

export const getClient = (provider?: string) =>
  new Web3(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)

/**
 * Prepare a smart contract write method invocation transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareSmartContractWriteMethodInvocation = async (
  body: CeloSmartContractMethodInvocation,
  options?: {
    provider?: string
    testnet?: boolean
  }
) => {
  await validateBody(body, CeloSmartContractMethodInvocation)
  const { fromPrivateKey, feeCurrency, fee, params, methodName, methodABI, contractAddress, nonce, signatureId, amount } = body

  const url = options?.provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`
  const p = new CeloProvider(url)
  const network = await p.ready

  const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, !!options?.testnet)

  // @ts-ignore
  const contract = new new Web3(url).eth.Contract([methodABI], contractAddress.trim())

  const transaction: any = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce,
    value: amount ? `0x${new BigNumber(toWei(amount, 'ether')).toString(16)}` : undefined,
    gasLimit: fee?.gasLimit ? `0x${new BigNumber(fee.gasLimit).toString(16)}` : undefined,
    gasPrice: fee?.gasPrice ? `0x${new BigNumber(toWei(fee.gasPrice, 'gwei')).toString(16)}` : undefined,
    to: contractAddress.trim(),
    data: contract.methods[methodName as string](...params).encodeABI(),
  }
  if (signatureId) {
    return JSON.stringify(transaction)
  }

  const wallet = new CeloWallet(fromPrivateKey as string, p)
  const { txCount, gasPrice, from } = await obtainWalletInformation(wallet, feeCurrencyContractAddress)

  transaction.nonce = transaction.nonce || txCount
  transaction.from = from
  transaction.gasLimit =
    transaction.gasLimit ?? (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
  transaction.gasPrice = fee?.gasPrice ? '0x' + new BigNumber(toWei(fee.gasPrice, 'gwei')).toString(16) : gasPrice.toHexString()
  return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo smart contract read method invocation transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const sendSmartContractReadMethodInvocationTransaction = async (body: SmartContractReadMethodInvocation, provider?: string) => {
  await validateBody(body, SmartContractReadMethodInvocation)
  const { params, methodName, methodABI, contractAddress } = body

  const url = provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`

  // @ts-ignore
  const contract = new new Web3(url).eth.Contract([methodABI], contractAddress.trim())
  return { data: await contract.methods[methodName as string](...params).call() }
}
export const sendDeployErc20Transaction = async (testnet: boolean, body: DeployCeloErc20, provider?: string) =>
  broadcast(await prepareDeployErc20SignedTransaction(testnet, body, provider), body.signatureId)
export const sendStoreDataSignedTransaction = async (testnet: boolean, body: ChainCreateRecord, provider?: string) =>
  broadcast(await prepareStoreDataSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Celo smart contract method invocation transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet
 * @param body content of the transaction to broadcast
 * @param provider
 * @returns transaction id of the transaction in the blockchain
 */
export const sendSmartContractMethodInvocationTransaction = async (
  testnet: boolean,
  body: CeloSmartContractMethodInvocation | SmartContractReadMethodInvocation,
  provider?: string
) => {
  if (body.methodABI.stateMutability === 'view') {
    return sendSmartContractReadMethodInvocationTransaction(body, provider)
  }
  const celoBody = body as CeloSmartContractMethodInvocation
  return broadcast(
    await prepareSmartContractWriteMethodInvocation(celoBody, {
      provider,
      testnet,
    }),
    celoBody.signatureId
  )
}

export const getErc20ContractDecimals = async (contractAddress: string, provider?: string) => {
  if (!contractAddress) {
    throw new Error('Contract address not set.')
  }
  const url = provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`
  // @ts-ignore
  const contract = new new Web3(url).eth.Contract(erc20_abi, contractAddress.trim())
  return await contract.methods.decimals().call()
}

/**
 * Prepare a signed Celo transfer erc20 transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareTransferErc20SignedTransaction = async (testnet: boolean, body: TransferCeloOrCeloErc20Token, provider?: string) => {
  await validateBody(body, TransferCeloOrCeloErc20Token)
  const { fromPrivateKey, to, amount, contractAddress, feeCurrency, nonce, signatureId, fee } = body

  if (!contractAddress) {
    throw new Error('Contract address not set.')
  }
  const url = provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`
  const p = new CeloProvider(url)
  const network = await p.ready

  const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)

  // @ts-ignore
  const contract = new new Web3(url).eth.Contract(erc20_abi, contractAddress.trim())
  const decimals = await contract.methods.decimals().call()
  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      gasLimit: fee?.gasLimit ? '0x' + new BigNumber(fee.gasLimit).toString(16) : undefined,
      gasPrice: fee?.gasPrice ? '0x' + new BigNumber(toWei(fee.gasPrice, 'gwei')).toString(16) : undefined,
      to: contractAddress.trim(),
      data: contract.methods.transfer(to.trim(), '0x' + new BigNumber(amount).multipliedBy(10 ** decimals).toString(16)).encodeABI(),
    })
  }
  const wallet = new CeloWallet(fromPrivateKey as string, p)
  const { txCount, gasPrice, from } = await obtainWalletInformation(wallet, feeCurrencyContractAddress)

  const transaction = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    gasLimit: fee?.gasLimit ? '0x' + new BigNumber(fee.gasLimit).toString(16) : undefined,
    to: contractAddress.trim(),
    gasPrice: fee?.gasPrice ? '0x' + new BigNumber(toWei(fee.gasPrice, 'gwei')).toString(16) : gasPrice,
    data: contract.methods.transfer(to.trim(), '0x' + new BigNumber(amount).multipliedBy(10 ** decimals).toString(16)).encodeABI(),
    from,
  }
  transaction.gasLimit =
    transaction.gasLimit || (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
  return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo burn erc20 transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareBurnErc20SignedTransaction = async (testnet: boolean, body: BurnCeloErc20, provider?: string) => {
  await validateBody(body, BurnCeloErc20)
  const { fromPrivateKey, amount, contractAddress, feeCurrency, nonce, signatureId } = body

  const url = provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`
  const p = new CeloProvider(url)
  const network = await p.ready

  const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)

  // @ts-ignore
  const contract = new new Web3(url).eth.Contract(erc20_abi, contractAddress.trim())
  const decimals = await contract.methods.decimals().call()
  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      gasLimit: '0',
      to: contractAddress.trim(),
      data: contract.methods.burn('0x' + new BigNumber(amount).multipliedBy(10 ** decimals).toString(16)).encodeABI(),
    })
  }
  const wallet = new CeloWallet(fromPrivateKey as string, p)
  const { txCount, gasPrice, from } = await obtainWalletInformation(wallet, feeCurrencyContractAddress)

  const transaction = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    gasLimit: '0',
    to: contractAddress.trim(),
    gasPrice,
    data: contract.methods.burn('0x' + new BigNumber(amount).multipliedBy(10 ** decimals).toString(16)).encodeABI(),
    from,
  }
  transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
  return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo mint multiple cashback erc721 transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareMintMultipleCashbackErc721SignedTransaction = async (
  testnet: boolean,
  body: CeloMintMultipleErc721,
  provider?: string
) => {
  await validateBody(body, CeloMintMultipleErc721)
  const { fromPrivateKey, to, tokenId, contractAddress, url, feeCurrency, nonce, signatureId, authorAddresses, cashbackValues, erc20 } =
    body

  const p = new CeloProvider(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
  const network = await p.ready

  const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)

  // @ts-ignore
  const contract = new new Web3().eth.Contract(erc721_abi, contractAddress.trim())
  const cashbacks: string[][] = cashbackValues!
  const cb: string[][] = []

  for (const c of cashbacks) {
    const cb2: string[] = []
    for (const c2 of c) {
      cb2.push(`0x${new BigNumber(toWei(c2, 'ether')).toString(16)}`)
    }
    cb.push(cb2)
  }
  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      gasLimit: '0',
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
    })
  }
  const wallet = new CeloWallet(fromPrivateKey as string, p)
  const { txCount, gasPrice, from } = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
  const transaction = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    gasLimit: '0',
    to: contractAddress.trim(),
    gasPrice,
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
    from,
  }
  transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
  return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo mint multiple erc721 transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareMintMultipleErc721SignedTransaction = async (testnet: boolean, body: CeloMintMultipleErc721, provider?: string) => {
  await validateBody(body, CeloMintMultipleErc721)
  const { fromPrivateKey, to, tokenId, contractAddress, url, feeCurrency, nonce, signatureId } = body

  const p = new CeloProvider(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
  const network = await p.ready

  const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)

  // @ts-ignore
  const contract = new new Web3().eth.Contract(erc721_abi, contractAddress.trim())

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      gasLimit: '0',
      to: contractAddress.trim(),
      data: contract.methods
        .mintMultiple(
          to.map((t) => t.trim()),
          tokenId,
          url
        )
        .encodeABI(),
    })
  }
  const wallet = new CeloWallet(fromPrivateKey as string, p)
  const { txCount, gasPrice, from } = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
  const transaction = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    gasLimit: '0',
    to: contractAddress.trim(),
    gasPrice,
    data: contract.methods
      .mintMultiple(
        to.map((t) => t.trim()),
        tokenId,
        url
      )
      .encodeABI(),
    from,
  }
  transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
  return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo update cashback for author erc721 transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareUpdateCashbackForAuthorErc721SignedTransaction = async (
  testnet: boolean,
  body: CeloUpdateCashbackErc721,
  provider?: string
) => {
  await validateBody(body, CeloUpdateCashbackErc721)
  const { fromPrivateKey, cashbackValue, tokenId, contractAddress, feeCurrency, nonce, signatureId } = body

  const p = new CeloProvider(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
  const network = await p.ready

  const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)

  // @ts-ignore
  const contract = new new Web3().eth.Contract(erc721_abi, contractAddress.trim())

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      gasLimit: '0',
      to: contractAddress.trim(),
      data: contract.methods.updateCashbackForAuthor(tokenId, `0x${new BigNumber(toWei(cashbackValue, 'ether')).toString(16)}`).encodeABI(),
    })
  }
  const wallet = new CeloWallet(fromPrivateKey as string, p)
  const { txCount, gasPrice, from } = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
  const transaction = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    gasLimit: '0',
    to: contractAddress.trim(),
    gasPrice,
    data: contract.methods.updateCashbackForAuthor(tokenId, `0x${new BigNumber(toWei(cashbackValue, 'ether')).toString(16)}`).encodeABI(),
    from,
  }
  transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
  return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo mint multiple tokens transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareMintMultiTokenSignedTransaction = async (testnet: boolean, body: CeloMintMultiToken, provider?: string) => {
  await validateBody(body, CeloMintMultiToken)
  const { fromPrivateKey, to, tokenId, contractAddress, feeCurrency, data, amount, nonce, signatureId } = body

  const p = new CeloProvider(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
  const network = await p.ready
  const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)
  // @ts-ignore
  const contract = new new Web3().eth.Contract(erc1155_abi, contractAddress.trim())

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      to: contractAddress.trim(),
      gasLimit: '0',
      data: contract.methods.mint(to.trim(), tokenId, `0x${new BigNumber(amount).toString(16)}`, data ? data : '0x0').encodeABI(),
    })
  }
  const wallet = new CeloWallet(fromPrivateKey as string, p)
  const { txCount, gasPrice, from } = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
  const transaction = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    gasLimit: '0',
    to: contractAddress.trim(),
    gasPrice,
    data: contract.methods.mint(to.trim(), tokenId, `0x${new BigNumber(amount).toString(16)}`, data ? data : '0x0').encodeABI(),
    from,
  }
  transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
  return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo mint multiple tokens batch transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareMintMultiTokenBatchSignedTransaction = async (testnet: boolean, body: CeloMintMultiTokenBatch, provider?: string) => {
  await validateBody(body, CeloMintMultiTokenBatch)
  const { fromPrivateKey, to, tokenId, contractAddress, amounts, data, feeCurrency, nonce, signatureId } = body

  const p = new CeloProvider(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
  const network = await p.ready

  const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)

  // @ts-ignore
  const contract = new new Web3().eth.Contract(erc1155_abi, contractAddress.trim())
  const amts = amounts.map((amts) => amts.map((amt) => `0x${new BigNumber(amt).toString(16)}`))
  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      gasLimit: '0',
      to: contractAddress.trim(),
      data: contract.methods
        .mintBatch(
          to.map((t) => t.trim()),
          tokenId,
          amts,
          data ? data : '0x0'
        )
        .encodeABI(),
    })
  }
  const wallet = new CeloWallet(fromPrivateKey as string, p)
  const { txCount, gasPrice, from } = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
  const transaction = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    gasLimit: '0',
    to: contractAddress.trim(),
    gasPrice,
    data: contract.methods
      .mintBatch(
        to.map((t) => t.trim()),
        tokenId,
        amts,
        data ? data : '0x0'
      )
      .encodeABI(),
    from,
  }
  transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
  return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo transfer multiple tokens transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareTransferMultiTokenSignedTransaction = async (testnet: boolean, body: CeloTransferMultiToken, provider?: string) => {
  await validateBody(body, CeloTransferMultiToken)
  const { fromPrivateKey, to, tokenId, contractAddress, feeCurrency, nonce, amount, data, signatureId } = body

  const p = new CeloProvider(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
  const network = await p.ready
  const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)

  // @ts-ignore
  const contract = new new Web3().eth.Contract(erc1155_abi, contractAddress.trim())

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      gasLimit: '0',
      nonce,
      to: contractAddress.trim(),
      data: contract.methods.safeTransfer(to.trim(), tokenId, `0x${new BigNumber(amount).toString(16)}`, data ? data : '0x0').encodeABI(),
    })
  }
  const wallet = new CeloWallet(fromPrivateKey as string, p)
  const { txCount, gasPrice, from } = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
  const transaction = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    gasLimit: '0',
    to: contractAddress.trim(),
    gasPrice,
    data: contract.methods.safeTransfer(to.trim(), tokenId, `0x${new BigNumber(amount).toString(16)}`, data ? data : '0x0').encodeABI(),
    from,
  }
  transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
  return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo batch transfer multiple tokens transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareBatchTransferMultiTokenSignedTransaction = async (
  testnet: boolean,
  body: CeloTransferMultiTokenBatch,
  provider?: string
) => {
  await validateBody(body, CeloTransferMultiTokenBatch)
  const { fromPrivateKey, to, tokenId, contractAddress, feeCurrency, nonce, amounts, data, signatureId } = body

  const p = new CeloProvider(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
  const network = await p.ready
  const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)
  const amts = amounts.map((amt) => `0x${new BigNumber(amt).toString(16)}`)
  // @ts-ignore
  const contract = new new Web3().eth.Contract(erc1155_abi, contractAddress.trim())

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      gasLimit: '0',
      nonce,
      to: contractAddress.trim(),
      data: contract.methods
        .safeBatchTransfer(
          to.trim(),
          tokenId.map((token) => token.trim()),
          amts,
          data ? data : '0x0'
        )
        .encodeABI(),
    })
  }
  const wallet = new CeloWallet(fromPrivateKey as string, p)
  const { txCount, gasPrice, from } = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
  const transaction = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    gasLimit: '0',
    to: contractAddress.trim(),
    gasPrice,
    data: contract.methods
      .safeBatchTransfer(
        to.trim(),
        tokenId.map((token) => token.trim()),
        amts,
        data ? data : '0x0'
      )
      .encodeABI(),
    from,
  }
  transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
  return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo burn multiple tokens batch transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareBurnMultiTokenBatchSignedTransaction = async (testnet: boolean, body: CeloBurnMultiTokenBatch, provider?: string) => {
  await validateBody(body, CeloBurnMultiTokenBatch)
  const { fromPrivateKey, tokenId, account, amounts, contractAddress, feeCurrency, nonce, signatureId } = body

  const p = new CeloProvider(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
  const network = await p.ready

  const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)

  // @ts-ignore
  const contract = new new Web3().eth.Contract(erc1155_abi, contractAddress.trim())

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      gasLimit: '0',
      to: contractAddress.trim(),
      data: contract.methods.burnBatch(account, tokenId, amounts).encodeABI(),
    })
  }
  const wallet = new CeloWallet(fromPrivateKey as string, p)
  const { txCount, gasPrice, from } = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
  const transaction = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    gasLimit: '0',
    to: contractAddress.trim(),
    gasPrice,
    data: contract.methods.burnBatch(account, tokenId, amounts).encodeABI(),
    from,
  }
  transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
  return wallet.signTransaction(transaction)
}

/**
 * Prepare a signed Celo burn multiple tokens transaction with the private key locally. Nothing is broadcasted to the blockchain.
 * @returns raw transaction data in hex, to be broadcasted to blockchain.
 */
export const prepareBurnMultiTokenSignedTransaction = async (testnet: boolean, body: CeloBurnMultiToken, provider?: string) => {
  await validateBody(body, CeloBurnMultiToken)
  const { fromPrivateKey, tokenId, account, amount, contractAddress, feeCurrency, nonce, signatureId } = body

  const p = new CeloProvider(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
  const network = await p.ready

  const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)

  // @ts-ignore
  const contract = new new Web3().eth.Contract(erc1155_abi, contractAddress.trim())

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      gasLimit: '0',
      to: contractAddress.trim(),
      data: contract.methods.burn(account, tokenId, amount).encodeABI(),
    })
  }
  const wallet = new CeloWallet(fromPrivateKey as string, p)
  const { txCount, gasPrice, from } = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
  const transaction = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    gasLimit: '0',
    to: contractAddress.trim(),
    gasPrice,
    data: contract.methods.burn(account, tokenId, amount).encodeABI(),
    from,
  }
  transaction.gasLimit = (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
  return wallet.signTransaction(transaction)
}

/**
 * Sign Celo, cUsd or cEur transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
 */
export const prepareCeloOrCUsdSignedTransaction = async (testnet: boolean, body: TransferCeloOrCeloErc20Token, provider?: string) => {
  await validateBody(body, TransferCeloOrCeloErc20Token)
  const { fromPrivateKey, to, feeCurrency, nonce, data, amount, currency, fee, signatureId } = body

  const p = new CeloProvider(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
  const network = await p.ready

  const cUsdAddress = testnet ? CUSD_ADDRESS_TESTNET : CUSD_ADDRESS_MAINNET
  const cEurAddress = testnet ? CEUR_ADDRESS_TESTNET : CEUR_ADDRESS_MAINNET
  const feeCurrencyContractAddress = getFeeCurrency(feeCurrency, testnet)
  const value = `0x${new BigNumber(amount).multipliedBy(1e18).toString(16)}`

  let recipient
  switch (currency) {
    case Currency.CEUR:
      recipient = cEurAddress
      break
    case Currency.CUSD:
      recipient = cUsdAddress
      break
    default:
      recipient = to.trim()
  }
  // @ts-ignore
  const contract = new new Web3().eth.Contract([TRANSFER_METHOD_ABI], cUsdAddress.trim())

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      to: recipient,
      data: currency === Currency.CELO ? data : contract.methods.transfer(to.trim(), value).encodeABI(),
      gasLimit: fee?.gasLimit ? '0x' + new BigNumber(fee.gasLimit).toString(16) : undefined,
      gasPrice: fee?.gasPrice ? '0x' + new BigNumber(toWei(fee.gasPrice, 'gwei')).toString(16) : undefined,
      value: currency === Currency.CELO ? value : undefined,
    })
  }
  const wallet = new CeloWallet(fromPrivateKey as string, p)
  const { txCount, gasPrice, from } = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
  const transaction = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    to: recipient,
    data: currency === Currency.CELO ? data : contract.methods.transfer(to.trim(), value).encodeABI(),
    gasLimit: fee?.gasLimit ? '0x' + new BigNumber(fee.gasLimit).toString(16) : undefined,
    gasPrice: fee?.gasPrice ? '0x' + new BigNumber(toWei(fee.gasPrice, 'gwei')).toString(16) : gasPrice,
    value: currency === Currency.CELO ? value : undefined,
    from,
  }
  transaction.gasLimit =
    transaction.gasLimit || (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
  return wallet.signTransaction(transaction)
}

/**
 * Sign store data transaction with private keys locally. Nothing is broadcast to the blockchain.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction data to be broadcast to blockchain, or signatureId in case of Tatum KMS
 */
export const prepareStoreDataSignedTransaction = async (testnet: boolean, body: ChainCreateRecord, provider?: string) => {
  ;(body as CreateRecord).chain = Currency.CELO
  await validateBody(body, CreateRecord)
  const { fromPrivateKey, to, feeCurrency, nonce, data, ethFee: fee, signatureId } = body

  const p = new CeloProvider(provider || `${process.env.TATUM_API_URL || TATUM_API_URL}/v3/celo/web3/${process.env.TATUM_API_KEY}`)
  const network = await p.ready

  const feeCurrencyContractAddress = getFeeCurrency(feeCurrency as Currency, testnet)

  if (signatureId) {
    return JSON.stringify({
      chainId: network.chainId,
      feeCurrency: feeCurrencyContractAddress,
      nonce,
      to: to?.trim(),
      data: data ? (isHex(data) ? stringToHex(data) : toHex(data)) : undefined,
      gasLimit: fee?.gasLimit ? '0x' + new BigNumber(fee.gasLimit).toString(16) : undefined,
      gasPrice: fee?.gasPrice ? '0x' + new BigNumber(toWei(fee.gasPrice, 'gwei')).toString(16) : undefined,
      value: undefined,
    })
  }
  const wallet = new CeloWallet(fromPrivateKey as string, p)
  const { txCount, gasPrice, from } = await obtainWalletInformation(wallet, feeCurrencyContractAddress)
  const transaction = {
    chainId: network.chainId,
    feeCurrency: feeCurrencyContractAddress,
    nonce: nonce || txCount,
    to: to?.trim() || from,
    data: data ? (isHex(data) ? stringToHex(data) : toHex(data)) : undefined,
    gasLimit: fee?.gasLimit ? '0x' + new BigNumber(fee.gasLimit).toString(16) : undefined,
    gasPrice: fee?.gasPrice ? '0x' + new BigNumber(toWei(fee.gasPrice, 'gwei')).toString(16) : gasPrice,
    value: undefined,
    from,
  }
  transaction.gasLimit =
    transaction.gasLimit || (await wallet.estimateGas(transaction)).add(feeCurrency === Currency.CELO ? 0 : 100000).toHexString()
  return wallet.signTransaction(transaction)
}

/**
 * Send Celo or cUsd transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendCeloOrcUsdTransaction = async (testnet: boolean, body: TransferCeloOrCeloErc20Token, provider?: string) =>
  broadcast(await prepareCeloOrCUsdSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Celo or cUsd transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendErc20Transaction = async (testnet: boolean, body: TransferCeloOrCeloErc20Token, provider?: string) =>
  broadcast(await prepareTransferErc20SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Celo mint erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintErc721Transaction = async (testnet: boolean, body: CeloMintErc721, provider?: string) => {
  if (!body.fromPrivateKey) {
    return mintNFT(body)
  }
  return broadcast(await prepareMintErc721SignedTransaction(testnet, body, provider), body.signatureId)
}

/**
 * Send Celo mint cashback erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintCashbackErc721Transaction = async (testnet: boolean, body: CeloMintErc721, provider?: string) =>
  broadcast(await prepareMintCashbackErc721SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Celo mint provenance cashback erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintErc721ProvenanceTransaction = async (testnet: boolean, body: CeloMintErc721, provider?: string) => {
  if (!body.fromPrivateKey) {
    return mintNFT(body)
  }
  return broadcast(await prepareMintErc721ProvenanceSignedTransaction(testnet, body, provider), body.signatureId)
}

/**
 * Send Celo mint multiple provenance erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintMultipleErc721ProvenanceTransaction = async (testnet: boolean, body: CeloMintMultipleErc721, provider?: string) =>
  broadcast(await prepareMintMultipleErc721ProvenanceSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Celo mint multiple erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintMultipleErc721Transaction = async (testnet: boolean, body: CeloMintMultipleErc721, provider?: string) =>
  broadcast(await prepareMintMultipleErc721SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Celo mint multiple cashback erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintMultipleCashbackErc721Transaction = async (testnet: boolean, body: CeloMintMultipleErc721, provider?: string) =>
  broadcast(await prepareMintMultipleCashbackErc721SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Celo burn erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBurnErc721Transaction = async (testnet: boolean, body: CeloBurnErc721, provider?: string) =>
  broadcast(await prepareBurnErc721SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Celo update cashback for author erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendUpdateCashbackForAuthorErc721Transaction = async (testnet: boolean, body: CeloUpdateCashbackErc721, provider?: string) =>
  broadcast(await prepareUpdateCashbackForAuthorErc721SignedTransaction(testnet, body, provider), body.signatureId)
/**
 * Send Celo transfer nft transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendTransferErc721Transaction = async (testnet: boolean, body: CeloTransferErc721, provider?: string) =>
  broadcast(await prepareTransferErc721SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Celo deploy erc721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendDeployErc721Transaction = async (testnet: boolean, body: CeloDeployErc721, provider?: string) =>
  broadcast(await prepareDeployErc721SignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Celo deploy multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendDeployMultiTokenTransaction = async (testnet: boolean, body: CeloDeployMultiToken, provider?: string) =>
  broadcast(await prepareDeployMultiTokenSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Celo mint multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintMultiTokenTransaction = async (testnet: boolean, body: CeloMintMultiToken, provider?: string) =>
  broadcast(await prepareMintMultiTokenSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Celo mint multiple tokens batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendMintMultiTokenBatchTransaction = async (testnet: boolean, body: CeloMintMultiTokenBatch, provider?: string) =>
  broadcast(await prepareMintMultiTokenBatchSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Celo transfer multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendTransferMultiTokenTransaction = async (testnet: boolean, body: CeloTransferMultiToken, provider?: string) =>
  broadcast(await prepareTransferMultiTokenSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Celo transfer multiple tokens batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendTransferMultiTokenBatchTransaction = async (testnet: boolean, body: CeloTransferMultiTokenBatch, provider?: string) =>
  broadcast(await prepareBatchTransferMultiTokenSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Celo burn multiple tokens transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBurnMultiTokenTransaction = async (testnet: boolean, body: CeloBurnMultiToken, provider?: string) =>
  broadcast(await prepareBurnMultiTokenSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send Celo burn multiple tokens batch transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendBurnMultiTokenBatchTransaction = async (testnet: boolean, body: CeloBurnMultiTokenBatch, provider?: string) =>
  broadcast(await prepareBurnMultiTokenBatchSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Send generate custodial wallet transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
 * This operation is irreversible.
 * @param testnet mainnet or testnet version
 * @param body content of the transaction to broadcast
 * @param provider url of the Celo Server to connect to. If not set, default public server will be used.
 * @returns transaction id of the transaction in the blockchain
 */
export const sendGenerateCustodialWalletSignedTransaction = async (
  testnet: boolean,
  body: ChainGenerateCustodialAddress,
  provider?: string
) => broadcast(await prepareGenerateCustodialWalletSignedTransaction(testnet, body, provider), body.signatureId)

/**
 * Deploy new smart contract for NFT marketplace logic. Smart contract enables marketplace operator to create new listing for NFT (ERC-721/1155).
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendDeployMarketplaceListingSignedTransaction = async (
  testnet: boolean,
  body: ChainDeployMarketplaceListing,
  provider?: string
) => broadcast(await prepareDeployMarketplaceListingSignedTransaction(testnet, body, provider), body.signatureId)
