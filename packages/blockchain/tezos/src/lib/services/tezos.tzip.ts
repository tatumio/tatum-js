import { ITezosWeb } from './tezos.web'
import { Tezos_TZIP_12 } from '../contracts/tzip12'
import { InMemorySigner } from '@taquito/signer'
import * as fa2 from '@oxheadalpha/fa2-interfaces'

export type DeployTezosNft = {
  privateKey: string
  owner: string
  metadata: string
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

export const tezosTzip = (args: { tezosWeb: ITezosWeb }) => ({
  deploy: {
    /**
     * Deploy tzip-12 contract with additional details in request body
     * @param body content of the transaction to broadcast
     * @param provider
     * @returns transaction data to be broadcast to blockchain.
     */
    deployTzip12: async (body: DeployTezosNft, provider?: string) =>
      deployTzip12(body, args.tezosWeb, provider),
  },
})

const createStorage = fa2.contractStorage.with(fa2.simpleAdminStorage).with(fa2.nftStorage).build
