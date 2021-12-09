import {
  AddMinter,
  axios,
  BaseMintErc721,
  Currency,
  get,
  ipfsUpload,
  post,
  TransactionHash,
  validateBody,
  Sort,
  EthMintErc721,
  DeployErc721,
  EthMintMultipleErc721,
  MintMultipleErc721,
  BurnErc721,
  UpdateCashbackErc721,
  TransferErc721,
  EthTransferErc721,
} from '@tatumio/tatum-core'
import { NftTransaction } from '../model'
import {
  burnNFT as celoBurnNFT,
  CeloBurnErc721,
  CeloDeployErc721,
  CeloMintErc721,
  CeloMintMultipleErc721,
  CeloTransferErc721,
  CeloUpdateCashbackErc721,
  deployNFT as celoDeployNFT,
  mintMultipleNFTWithUri as celoMintMultipleNFTWithUri,
  mintNFTWithUri as celoMintNFTWithUri,
  prepareAddNFTMinter as celoPrepareAddNFTMinter,
  sendAddNFTMinter as celoSendAddNFTMinter,
  transferNFT as celoTransferNFT,
  updateCashbackForAuthorNFT as celoUpdateCashbackForAuthorNFT,
} from '@tatumio/tatum-celo'
import {
  burnNFT as oneBurnNFT,
  deployNFT as oneDeployNFT,
  mintMultipleNFTWithUri as oneMintMultipleNFTWithUri,
  mintNFTWithUri as oneMintNFTWithUri,
  OneMint721,
  prepareAddNFTMinter as onePrepareAddNFTMinter,
  sendAddNFTMinter as oneSendAddNFTMinter,
  transferNFT as oneTransferNFT,
  updateCashbackForAuthorNFT as oneUpdateCashbackForAuthorNFT,
} from '@tatumio/tatum-one'
import {
  burnNFT as ethBurnNFT,
  deployNFT as ethDeployNFT,
  EthBurnErc721,
  EthDeployErc721,
  mintMultipleNFTWithUri as ethMintMultipleNFTWithUri,
  mintNFTWithUri as ethMintNFTWithUri,
  prepareAddNFTMinter as ethPrepareAddNFTMinter,
  sendAddNFTMinter as ethSendAddNFTMinter,
  transferNFT as ethTransferNFT,
  updateCashbackForAuthorNFT as ethUpdateCashbackForAuthorNFT,
} from '@tatumio/tatum-eth'
import {
  burnNFT as tronBurnNFT,
  deployNFT as tronDeployNFT,
  mintMultipleNFTWithUri as tronMintMultipleNFTWithUri,
  mintNFTWithUri as tronMintNFTWithUri,
  prepareAddNFTMinter as tronPrepareAddNFTMinter,
  sendAddNFTMinter as tronSendAddNFTMinter,
  transferNFT as tronTransferNFT,
  TronBurnTrc721,
  TronDeployTrc721,
  TronMintMultipleTrc721,
  TronMintTrc721,
  TronTransferTrc721,
  TronUpdateCashbackTrc721,
  updateCashbackForAuthorNFT as tronUpdateCashbackForAuthorNFT,
} from '@tatumio/tatum-tron'
import {
  burnNFT as flowBurnNFT,
  deployNFT as flowDeployNFT,
  FlowBurnNft,
  FlowDeployNft,
  FlowMintMultipleNft,
  FlowMintNft,
  FlowTransferNft,
  mintMultipleNFTWithUri as flowMintMultipleNFTWithUri,
  mintNFTWithUri as flowMintNFTWithUri,
  transferNFT as flowTransferNFT,
} from '@tatumio/tatum-flow'
import {
  burnNFT as polygonBurnNFT,
  deployNFT as polygonDeployNFT,
  mintMultipleNFTWithUri as polygonMintMultipleNFTWithUri,
  mintNFTWithUri as polygonMintNFTWithUri,
  prepareAddNFTMinter as polygonPrepareAddNFTMinter,
  sendAddNFTMinter as polygonSendAddNFTMinter,
  transferNFT as polygonTransferNFT,
  updateCashbackForAuthorNFT as polygonUpdateCashbackForAuthorNFT,
} from '@tatumio/tatum-polygon'
import {
  burnNFT as bscBurnNFT,
  deployNFT as bscDeployNFT,
  mintMultipleNFTWithUri as bscMintMultipleNFTWithUri,
  mintNFTWithUri as bscMintNFTWithUri,
  prepareAddNFTMinter as bscPrepareAddNFTMinter,
  sendAddNFTMinter as bscSendAddNFTMinter,
  transferNFT as bscTransferNFT,
  updateCashbackForAuthorNFT as bscUpdateCashbackForAuthorNFT,
} from '@tatumio/tatum-bsc'
import { burnNFT as algoBurnNFT, deployNFT as algoDeployNFT, transferNFT as algoTransferNFT } from '@tatumio/tatum-algo'

type MintNftWithUriFn<Body> = (body: Body, options?: { provider?: string; testnet?: boolean }) => Promise<TransactionHash>

export const mintNFTRequest = (body: BaseMintErc721): Promise<TransactionHash> => post(`/v3/nft/mint`, body)

/**
 * For more details, see <a href="https://tatum.io/apidoc.php#operation/NftGetTransactErc721" target="_blank">Tatum API documentation</a>
 */
export const getNFTTransaction = async <TX>(chain: Currency, hash: string): Promise<TX> => get<TX>(`/v3/nft/transaction/${chain}/${hash}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc.php#operation/NftGetTransactionByToken" target="_blank">Tatum API documentation</a>
 */
export const getNFTTransactionsByToken = async (
  chain: Currency,
  tokenId: number,
  tokenAddress: string,
  pageSize = 50,
  offset = 0,
  from?: number,
  to?: number,
  sort?: Sort
): Promise<NftTransaction[]> =>
  get<NftTransaction[]>(
    `/v3/nft/transaction/tokenId/${chain}/${tokenAddress}/${tokenId}?pageSize=${pageSize}&offset=${offset}&from=${from}&to=${to}&sort=${sort}`
  )

/**
 * For more details, see <a href="https://tatum.io/apidoc.php#operation/NftGetTransactionByAddress" target="_blank">Tatum API documentation</a>
 */
export const getNFTTransactionsByAddress = async (
  chain: Currency,
  address: string,
  tokenAddress: string,
  pageSize: number,
  offset?: number,
  from?: number,
  to?: number,
  sort?: Sort
): Promise<NftTransaction[]> =>
  get(`/v3/nft/transaction/${chain}/${address}/${tokenAddress}?pageSize=${pageSize}&offset=${offset}&from=${from}&to=${to}&sort=${sort}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftGetBalanceErc721" target="_blank">Tatum API documentation</a>
 */
export const getNFTsByAddress = async (chain: Currency, contractAddress: string, address: string): Promise<string[]> =>
  get(`/v3/nft/balance/${chain}/${contractAddress}/${address}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftProvenanceReadData" target="_blank">Tatum API documentation</a>
 */
export const getNFTProvenanceData = async (chain: Currency, contractAddress: string, tokenId: string): Promise<any> =>
  get(`/v3/nft/provenance/${chain}/${contractAddress}/${tokenId}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftGetContractAddress" target="_blank">Tatum API documentation</a>
 */
export const getNFTContractAddress = async (chain: Currency, txId: string): Promise<{ contractAddress: string }> =>
  get(`/v3/nft/address/${chain}/${txId}`)

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftGetMetadataErc721" target="_blank">Tatum API documentation</a>
 */
export const getNFTMetadataURI = async (
  chain: Currency,
  contractAddress: string,
  tokenId: string,
  account?: string
): Promise<{ data: string }> => {
  let url = `/v3/nft/metadata/${chain}/${contractAddress}/${tokenId}`
  if (account) {
    url += `?account=${account}`
  }
  return get(url)
}

/**
 * Get IPFS image URL from the NFT with the IPFS Metadata scheme. URL
 * @param chain chain where NFT token is
 * @param contractAddress contract address of the NFT token
 * @param tokenId ID of the token
 * @param account FLOW only - account where the token is minted
 */
export const getNFTImage = async (
  chain: Currency,
  contractAddress: string,
  tokenId: string,
  account?: string
): Promise<{ originalUrl: string; publicUrl: string }> => {
  const { data: metadata } = await getNFTMetadataURI(chain, contractAddress, tokenId, account)
  const metadataUrl = `https://gateway.pinata.cloud/ipfs/${metadata.replace('ipfs://', '')}`
  const { data } = await axios.get(metadataUrl)
  const imageUrl = data.image
  return {
    originalUrl: imageUrl,
    publicUrl: `https://gateway.pinata.cloud/ipfs/${imageUrl.replace('ipfs://', '')}`,
  }
}

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftGetRoyaltyErc721" target="_blank">Tatum API documentation</a>
 */
export const getNFTRoyalty = async (
  chain: Currency,
  contractAddress: string,
  tokenId?: string
): Promise<{ addresses: string[]; values: string[] }> => {
  let url = `/v3/nft/royalty/${chain}/${contractAddress}`
  if (tokenId) {
    url += `/${tokenId}`
  }
  return get(url)
}

/**
 * Mint new NFT token with metadata stored on the IPFS.
 * @param mintNftWithUri fn to mint new NFT token
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param file file to be stored on the IPFS
 * @param name name of the file
 * @param description description of the file
 * @param scheme optional JSON Metadata scheme
 * @param provider optional provider do broadcast tx
 */
export const createNFTAbstraction = async <MintRequestBody extends BaseMintErc721 & { privateKey?: string }>(
  mintNftWithUri: MintNftWithUriFn<MintRequestBody>,
  testnet: boolean,
  body: MintRequestBody,
  file: Buffer,
  name: string,
  description?: string,
  scheme?: any,
  provider?: string
) => {
  const metadata = scheme || {}
  metadata.name = name
  if (description) {
    metadata.description = description
  }
  const { ipfsHash } = await ipfsUpload(file, name)
  metadata.image = `ipfs://${ipfsHash}`
  const { ipfsHash: metadataHash } = await ipfsUpload(Buffer.from(JSON.stringify(metadata)), 'metadata.json')
  body.url = `ipfs://${metadataHash}`
  if (body.chain === Currency.FLOW) {
    body.privateKey ||= body.fromPrivateKey
  }
  const result = await mintNftWithUri(body, { provider, testnet })
  return {
    tokenId: body.tokenId,
    ...result,
    metadataUrl: body.url,
    metadataPublicUrl: `https://gateway.pinata.cloud/ipfs/${metadataHash}`,
    imageUrl: `ipfs://${ipfsHash}`,
    imagePublicUrl: `https://gateway.pinata.cloud/ipfs/${ipfsHash}`,
  }
}

/**
 * Prepare add new minter to the NFT contract transaction.
 * @param body body of the add minter request
 */
export const prepareAddNFTMinterAbstraction = async (body: AddMinter) => {
  await validateBody(body, AddMinter)
  return ['0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6', body.minter]
}

export const mintNFT = (body: CeloMintErc721 | EthMintErc721 | OneMint721): Promise<TransactionHash> => mintNFTRequest(body)

/**
 * Deploy new NFT smart contract, which will be used for later minting.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const deployNFT = async (
  testnet: boolean,
  body: DeployErc721 | CeloDeployErc721 | EthDeployErc721 | TronDeployTrc721 | FlowDeployNft,
  provider?: string
): Promise<TransactionHash> => {
  switch (body.chain) {
    case Currency.CELO:
      return celoDeployNFT(testnet, body as CeloDeployErc721, provider)
    case Currency.ETH:
      return ethDeployNFT(body as EthDeployErc721 & { chain: Currency.ETH }, provider)
    case Currency.MATIC:
      return polygonDeployNFT(body as EthDeployErc721)
    case Currency.ONE:
      return oneDeployNFT(body as EthDeployErc721)
    case Currency.TRON:
      return tronDeployNFT(body as TronDeployTrc721)
    case Currency.BSC:
      return bscDeployNFT(body as EthDeployErc721)
    case Currency.FLOW:
      return flowDeployNFT(body as FlowDeployNft)
    case Currency.ALGO:
      return algoDeployNFT(testnet, body as DeployErc721, provider)
    default:
      throw new Error('Unsupported currency')
  }
}

/**
 * Mint new NFT token with metadata stored on the IPFS.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param file file to be stored on the IPFS
 * @param name name of the file
 * @param description description of the file
 * @param scheme optional JSON Metadata scheme
 * @param provider optional provider do broadcast tx
 */
export const createNFT = async (
  testnet: boolean,
  body: CeloMintErc721 | EthMintErc721 | TronMintTrc721 | FlowMintNft,
  file: Buffer,
  name: string,
  description?: string,
  scheme?: any,
  provider?: string
) => {
  return await createNFTAbstraction(mintNFTWithUri, testnet, body, file, name, description, scheme, provider)
}

/**
 * Mint new NFT token.
 * @param body body of the mint request
 * @param options
 * @param options.testnet optional if we use testnet or not
 * @param options.provider optional provider do broadcast tx
 */
export const mintNFTWithUri = async (
  body: CeloMintErc721 | EthMintErc721 | TronMintTrc721 | FlowMintNft,
  options?: {
    testnet?: boolean
    provider?: string
  }
): Promise<TransactionHash> => {
  switch (body.chain) {
    case Currency.CELO:
      return celoMintNFTWithUri(body, options)
    case Currency.ETH:
      return ethMintNFTWithUri(body, options)
    case Currency.MATIC:
      return polygonMintNFTWithUri(body)
    case Currency.ONE:
      return oneMintNFTWithUri(body)
    case Currency.TRON:
      return tronMintNFTWithUri(body as TronMintTrc721)
    case Currency.BSC:
      return bscMintNFTWithUri(body)
    case Currency.FLOW:
      return flowMintNFTWithUri(body as FlowMintNft, options)
    default:
      throw new Error('Unsupported blockchain.')
  }
}

/**
 * Mint multiple new NFT tokens.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintMultipleNFTWithUri = async (
  testnet: boolean,
  body: CeloMintMultipleErc721 | EthMintMultipleErc721 | FlowMintMultipleNft | TronMintMultipleTrc721,
  provider?: string
): Promise<TransactionHash> => {
  switch (body.chain) {
    case Currency.CELO:
      return celoMintMultipleNFTWithUri(testnet, body as CeloMintMultipleErc721, provider)
    case Currency.TRON:
      return tronMintMultipleNFTWithUri(body as TronMintMultipleTrc721)
    case Currency.ETH:
      return ethMintMultipleNFTWithUri(body as EthMintMultipleErc721, provider)
    case Currency.MATIC:
      return polygonMintMultipleNFTWithUri(body as MintMultipleErc721)
    case Currency.ONE:
      return oneMintMultipleNFTWithUri(body as MintMultipleErc721)
    case Currency.BSC:
      return bscMintMultipleNFTWithUri(body as MintMultipleErc721)
    case Currency.FLOW:
      return flowMintMultipleNFTWithUri(testnet, body as FlowMintMultipleNft)
    default:
      throw new Error('Unsupported blockchain.')
  }
}

/**
 * Burn new NFT token. Token will no longer exists.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const burnNFT = async (
  testnet: boolean,
  body: BurnErc721 | CeloBurnErc721 | EthBurnErc721 | TronBurnTrc721 | FlowBurnNft,
  provider?: string
): Promise<TransactionHash> => {
  switch (body.chain) {
    case Currency.CELO:
      return celoBurnNFT(testnet, body as CeloBurnErc721, provider)
    case Currency.TRON:
      return tronBurnNFT(body as TronBurnTrc721)
    case Currency.ETH:
      return ethBurnNFT(body, provider)
    case Currency.MATIC:
      return polygonBurnNFT(body, provider)
    case Currency.ONE:
      return oneBurnNFT(body, provider)
    case Currency.BSC:
      return bscBurnNFT(body, provider)
    case Currency.FLOW:
      return flowBurnNFT(testnet, body as FlowBurnNft)
    case Currency.ALGO:
      return algoBurnNFT(testnet, body as BurnErc721, provider)
    default:
      throw new Error('Unsupported blockchain.')
  }
}

/**
 * Update royalty cashback as author of the NFT token.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const updateCashbackForAuthorNFT = async (
  testnet: boolean,
  body: UpdateCashbackErc721 | TronUpdateCashbackTrc721 | CeloUpdateCashbackErc721,
  provider?: string
): Promise<TransactionHash> => {
  switch (body.chain) {
    case Currency.CELO:
      return celoUpdateCashbackForAuthorNFT(testnet, body as CeloUpdateCashbackErc721, provider)
    case Currency.ETH:
      return ethUpdateCashbackForAuthorNFT(body, provider)
    case Currency.MATIC:
      return polygonUpdateCashbackForAuthorNFT(body, provider)
    case Currency.ONE:
      return oneUpdateCashbackForAuthorNFT(body, provider)
    case Currency.TRON:
      return tronUpdateCashbackForAuthorNFT(body as TronUpdateCashbackTrc721)
    case Currency.BSC:
      return bscUpdateCashbackForAuthorNFT(body, provider)
    default:
      throw new Error('Unsupported blockchain.')
  }
}

/**
 * Transfer new NFT token to new recipient.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const transferNFT = async (
  testnet: boolean,
  body: TransferErc721 | CeloTransferErc721 | EthTransferErc721 | TronTransferTrc721 | FlowTransferNft,
  provider?: string
): Promise<TransactionHash> => {
  switch (body.chain) {
    case Currency.CELO:
      return celoTransferNFT(testnet, body as CeloTransferErc721, provider)
    case Currency.ETH:
      return ethTransferNFT(body, provider)
    case Currency.MATIC:
      return polygonTransferNFT(body, provider)
    case Currency.ONE:
      return oneTransferNFT(body, provider)
    case Currency.TRON:
      return tronTransferNFT(body as TronTransferTrc721)
    case Currency.BSC:
      return bscTransferNFT(body, provider)
    case Currency.FLOW:
      return flowTransferNFT(testnet, body as FlowTransferNft)
    case Currency.ALGO:
      return algoTransferNFT(testnet, body as TransferErc721, provider)
    default:
      throw new Error('Unsupported blockchain.')
  }
}

/**
 * Prepare add new minter to the NFT contract transaction.
 * @param testnet if we use testnet or not
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const prepareAddNFTMinter = async (testnet: boolean, body: AddMinter, provider?: string) => {
  switch (body.chain) {
    case Currency.CELO:
      return celoPrepareAddNFTMinter(testnet, body, provider)
    case Currency.ETH:
      return ethPrepareAddNFTMinter(body, provider)
    case Currency.MATIC:
      return polygonPrepareAddNFTMinter(body, provider)
    case Currency.ONE:
      return onePrepareAddNFTMinter(body, provider)
    case Currency.TRON:
      return tronPrepareAddNFTMinter(body, provider)
    case Currency.BSC:
      return bscPrepareAddNFTMinter(body, provider)
    default:
      throw new Error('Unsupported blockchain.')
  }
}

/**
 * Add new minter to the NFT contract.
 * @param testnet if we use testnet or not
 * @param body body of the add minter request
 * @param provider optional provider do broadcast tx
 */
export const sendAddNFTMinter = async (testnet: boolean, body: AddMinter, provider?: string): Promise<TransactionHash> => {
  switch (body.chain) {
    case Currency.CELO:
      return celoSendAddNFTMinter(testnet, body, provider)
    case Currency.ETH:
      return ethSendAddNFTMinter(body, provider)
    case Currency.MATIC:
      return polygonSendAddNFTMinter(body, provider)
    case Currency.ONE:
      return oneSendAddNFTMinter(body, provider)
    case Currency.TRON:
      return tronSendAddNFTMinter(body, provider)
    case Currency.BSC:
      return bscSendAddNFTMinter(body, provider)
    default:
      throw new Error('Unsupported blockchain.')
  }
}
