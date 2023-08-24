import { ITezosWeb } from './tezos.web'
import { Tezos_TZIP_12 } from '../contracts/tzip12'
import { InMemorySigner } from '@taquito/signer'
import { char2Bytes } from '@taquito/utils'
import * as fa2 from '@oxheadalpha/fa2-interfaces'
import { MichelsonMap } from '@taquito/taquito'

export type DeployTezosNft = {
  privateKey: string
  owner: string
  metadata: string
}

export type MintTezosNft = {
  privateKey: string
  contractAddress: string
  nfts: Nft[]
  owner: string
}
export type Nft = {
  id: string
  ipfs: string
}
export type BurnTezosNft = {
  privateKey: string
  contractAddress: string
  tokens: string[]
  owner: string
}

export type TransferTezosNft = {
  privateKey: string
  contractAddress: string
  tokenId: string
  from: string
  to: string
  amount: string
}

export type UpdateOperatorTezosNft = {
  privateKey: string
  contractAddress: string
  tokenId: string
  owner: string
  operator: string
}

const deployTzip12 = async (body: DeployTezosNft, tronWeb: ITezosWeb, provider?: string): Promise<string> => {
  const client = tronWeb.getClient(provider)
  const { privateKey, owner, metadata } = body

  const memorySigner = new InMemorySigner(privateKey)

  client.setSignerProvider(memorySigner)

  const storage = createStorage({ metadata, owner })

  const { contractAddress } = await client.contract.originate({
    code: Tezos_TZIP_12.michelson,
    storage,
  })

  return contractAddress
}
const mintNft = async (body: MintTezosNft, tronWeb: ITezosWeb, provider?: string): Promise<string> => {
  const { contractAddress, nfts, owner, privateKey } = body

  const client = tronWeb.getClient(provider)
  const memorySigner = new InMemorySigner(privateKey)

  client.setSignerProvider(memorySigner)

  const contract = await client.wallet.at(contractAddress)
  const tokens = nfts.map(({ id, ipfs }) => {
    const tokenInfoMap = new MichelsonMap<string, string>()

    tokenInfoMap.set('', char2Bytes(ipfs))
    return { token_id: id, token_info: tokenInfoMap }
  })

  const mintParams = [
    {
      owner,
      tokens,
    },
  ]

  const { opHash } = await contract.methods.mint(mintParams).send()
  return opHash
}

const burnNft = async (body: BurnTezosNft, tronWeb: ITezosWeb, provider?: string): Promise<string> => {
  const { contractAddress, tokens, privateKey, owner } = body

  const client = tronWeb.getClient(provider)
  const memorySigner = new InMemorySigner(privateKey)

  client.setSignerProvider(memorySigner)

  const contract = await client.wallet.at(contractAddress)

  const burnParams = [
    {
      owner,
      tokens,
    },
  ]

  const { opHash } = await contract.methods.burn(burnParams).send()
  return opHash
}

const transferNft = async (
  body: TransferTezosNft,
  tronWeb: ITezosWeb,
  provider?: string,
): Promise<string> => {
  const { contractAddress, privateKey, from, to, tokenId, amount } = body

  const client = tronWeb.getClient(provider)
  const memorySigner = new InMemorySigner(privateKey)

  client.setSignerProvider(memorySigner)

  const contract = await client.wallet.at(contractAddress)

  const transferParams = [
    {
      from_: from,
      txs: [
        {
          to_: to,
          token_id: tokenId,
          amount: amount,
        },
      ],
    },
  ]

  const { opHash } = await contract.methods.transfer(transferParams).send()

  return opHash
}

const updateOperator = async (
  body: UpdateOperatorTezosNft,
  tronWeb: ITezosWeb,
  addOperator: boolean,
  provider?: string,
): Promise<string> => {
  const { contractAddress, privateKey, owner, operator, tokenId } = body

  const client = tronWeb.getClient(provider)
  const memorySigner = new InMemorySigner(privateKey)

  client.setSignerProvider(memorySigner)

  const contract = await client.wallet.at(contractAddress)

  const operatorParams = [
    {
      [addOperator ? 'add_operator' : 'remove_operator']: {
        owner: owner,
        operator: operator,
        token_id: tokenId,
      },
    },
  ]

  const { opHash } = await contract.methods.update_operators(operatorParams).send()

  return opHash
}

export const tezosTzip = (args: { tezosWeb: ITezosWeb }) => ({
  deploy: {
    /**
     * Deploy tzip-12 contract with additional details in request body
     * @param body content for deploying contract to Tezos network
     * @param provider
     * @returns address of the deployed contract
     */
    tzip12: async (body: DeployTezosNft, provider?: string) => deployTzip12(body, args.tezosWeb, provider),
  },
  /**
   * Mint a new NFT collection
   * @param body content for minting NFTs on the Tezos network
   * @param provider
   * @returns The hash (ID) of the transaction
   */
  mintNft: async (body: MintTezosNft, provider?: string) => mintNft(body, args.tezosWeb, provider),
  /**
   * Burn an NFT
   * @param body content for burning NFTs on the Tezos network
   * @param provider
   * @returns The hash (ID) of the transaction
   */
  burnNft: async (body: BurnTezosNft, provider?: string) => burnNft(body, args.tezosWeb, provider),
  /**
   * Transfer an NFT
   * @param body content for transfering an NFT on the Tezos network
   * @param provider
   * @returns The hash (ID) of the transaction
   */
  transferNft: async (body: TransferTezosNft, provider?: string) =>
    transferNft(body, args.tezosWeb, provider),
  /**
   * Update operator of the token
   * @param body content for updating operators of the NFT on the Tezos network
   * @param addOperator boolean to add or remove operator
   * @param provider
   * @returns The hash (ID) of the transaction
   */
  updateOperator: async (body: UpdateOperatorTezosNft, addOperator: boolean, provider?: string) =>
    updateOperator(body, args.tezosWeb, addOperator, provider),
})

const createStorage = fa2.contractStorage.with(fa2.simpleAdminStorage).with(fa2.nftStorage).build
