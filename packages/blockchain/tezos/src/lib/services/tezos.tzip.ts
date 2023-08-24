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
  to: string
}
export type Nft = {
  id: string
  ipfs: string
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
  const { contractAddress, nfts, to, privateKey } = body

  const client = tronWeb.getClient(provider)
  const memorySigner = new InMemorySigner(privateKey)

  client.setSignerProvider(memorySigner)

  const contract = await client.wallet.at(contractAddress)
  const tokens = nfts.map(({ id, ipfs }) => {
    const tokenInfoMap = new MichelsonMap<string, string>()

    tokenInfoMap.set('', char2Bytes(ipfs))
    return { token_id: id, token_info: tokenInfoMap }
  })

  console.log(tokens)

  const mintParams = [
    {
      owner: to, // assuming 'to' is the address you want to mint to
      tokens: tokens, // assuming 'tokens' is a list of tokens you want to mint
    },
  ]

  const { opHash } = await contract.methods.mint(mintParams).send()
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
   * Mint a new NFT
   * @param body content for minting a new NFT on the Tezos network
   * @param provider
   * @returns address of a transaction
   */
  mintNft: async (body: MintTezosNft, provider?: string) => mintNft(body, args.tezosWeb, provider),
})

const createStorage = fa2.contractStorage.with(fa2.simpleAdminStorage).with(fa2.nftStorage).build
