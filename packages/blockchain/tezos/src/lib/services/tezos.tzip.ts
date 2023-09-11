import { ITezosWeb } from './tezos.web'
import { Tezos_TZIP_12 } from '../contracts/tzip12'
import { InMemorySigner } from '@taquito/signer'
import { char2Bytes } from '@taquito/utils'
import * as fa2 from '@oxheadalpha/fa2-interfaces'
import { MichelsonMap } from '@taquito/taquito'

export type DeployContractData = {
  privateKey: string
  owner: string
  metadata: string
  minter: string
}
export type MintTezosToken = {
  privateKey: string
  contractAddress: string
  nfts: Token[]
  owner: string
}
export type Token = {
  id: string
  ipfs: string
}
export type BurnTezosToken = {
  privateKey: string
  contractAddress: string
  tokens: string[]
  owner: string
}

export type TransferTezosToken = {
  privateKey: string
  contractAddress: string
  tokenId: string
  from: string
  to: string
  amount: string
}

export type UpdateOperatorTezosToken = {
  privateKey: string
  contractAddress: string
  tokenId: string
  owner: string
  operator: string
}

export type AddRemoveTokenMinter = {
  privateKey: string
  contractAddress: string
  minter: string
}

const deployTzip12 = async (
  body: DeployContractData,
  tronWeb: ITezosWeb,
  provider?: string,
): Promise<string> => {
  const client = tronWeb.getClient(provider)
  const { privateKey, owner, metadata, minter } = body

  const memorySigner = new InMemorySigner(privateKey)

  client.setSignerProvider(memorySigner)

  const storage = createStorage({ metadata, owner, minter })

  storage.minter_admin.set(owner, null)
  const { hash } = await client.contract.originate({
    code: Tezos_TZIP_12.michelson,
    storage,
  })

  return hash
}

const mintToken = async (body: MintTezosToken, tronWeb: ITezosWeb, provider?: string): Promise<string> => {
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

const burnToken = async (body: BurnTezosToken, tronWeb: ITezosWeb, provider?: string): Promise<string> => {
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

const transferToken = async (
  body: TransferTezosToken,
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
  body: UpdateOperatorTezosToken,
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

const addRemoveMinter = async (
  body: AddRemoveTokenMinter,
  tronWeb: ITezosWeb,
  addMinter: boolean,
  provider?: string,
): Promise<string> => {
  const { contractAddress, privateKey, minter } = body

  const client = tronWeb.getClient(provider)
  const memorySigner = new InMemorySigner(privateKey)

  client.setSignerProvider(memorySigner)

  const contract = await client.wallet.at(contractAddress)

  if (addMinter) {
    return (await contract.methods.add_minter(minter).send()).opHash
  }
  return (await contract.methods.remove_minter(minter).send()).opHash
}

const estimateContractDeploy = async (
  body: DeployContractData,
  tronWeb: ITezosWeb,
  provider?: string,
): Promise<number> => {
  const client = tronWeb.getClient(provider)
  const { privateKey, owner, metadata, minter } = body

  const memorySigner = new InMemorySigner(privateKey)

  client.setSignerProvider(memorySigner)

  const storage = createStorage({ metadata, owner, minter })

  const { burnFeeMutez, suggestedFeeMutez } = await client.estimate.originate({
    code: Tezos_TZIP_12.michelson,
    storage,
  })

  return burnFeeMutez + suggestedFeeMutez
}

const estimateTokenMint = async (
  body: MintTezosToken,
  tronWeb: ITezosWeb,
  provider?: string,
): Promise<number> => {
  const { contractAddress, nfts, owner, privateKey } = body

  const client = tronWeb.getClient(provider)
  const memorySigner = new InMemorySigner(privateKey)

  client.setSignerProvider(memorySigner)

  const contract = await client.contract.at(contractAddress)
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

  const op = contract.methods.mint(mintParams)

  const { burnFeeMutez, suggestedFeeMutez } = await client.estimate.contractCall(op)
  return burnFeeMutez + suggestedFeeMutez
}

const estimateTransferToken = async (
  body: TransferTezosToken,
  tronWeb: ITezosWeb,
  provider?: string,
): Promise<number> => {
  const { contractAddress, privateKey, from, to, tokenId, amount } = body

  const client = tronWeb.getClient(provider)
  const memorySigner = new InMemorySigner(privateKey)

  client.setSignerProvider(memorySigner)

  const contract = await client.contract.at(contractAddress)

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

  const op = contract.methods.transfer(transferParams)

  const { burnFeeMutez, suggestedFeeMutez } = await client.estimate.contractCall(op)
  return burnFeeMutez + suggestedFeeMutez
}

export const tezosTzip = (args: { tezosWeb: ITezosWeb }) => ({
  deploy: {
    /**
     * Deploy tzip-12 contract with additional details in request body
     * @param body content for deploying contract to Tezos network
     * @param provider
     * @returns The hash (ID) of the transaction
     */
    tzip12: async (body: DeployContractData, provider?: string) =>
      deployTzip12(body, args.tezosWeb, provider),
  },
  estimate: {
    contractDeploy: async (body: DeployContractData, provider?: string) =>
      estimateContractDeploy(body, args.tezosWeb, provider),
    tokenMint: async (body: MintTezosToken, provider?: string) =>
      estimateTokenMint(body, args.tezosWeb, provider),
    tokenTransfer: async (body: TransferTezosToken, provider?: string) =>
      estimateTransferToken(body, args.tezosWeb, provider),
  },
  /**
   * Mint a new NFT collection
   * @param body content for minting NFTs on the Tezos network
   * @param provider
   * @returns The hash (ID) of the transaction
   */
  mintTzip12: async (body: MintTezosToken, provider?: string) => mintToken(body, args.tezosWeb, provider),
  /**
   * Burn an NFT
   * @param body content for burning NFTs on the Tezos network
   * @param provider
   * @returns The hash (ID) of the transaction
   */
  burnTzip12: async (body: BurnTezosToken, provider?: string) => burnToken(body, args.tezosWeb, provider),
  /**
   * Transfer an NFT
   * @param body content for transfering an NFT on the Tezos network
   * @param provider
   * @returns The hash (ID) of the transaction
   */
  transferTzip12: async (body: TransferTezosToken, provider?: string) =>
    transferToken(body, args.tezosWeb, provider),
  /**
   * Update operator of the token
   * @param body content for updating operators of the NFT on the Tezos network
   * @param addOperator boolean to add or remove operator
   * @param provider
   * @returns The hash (ID) of the transaction
   */
  updateOperator: async (body: UpdateOperatorTezosToken, addOperator: boolean, provider?: string) =>
    updateOperator(body, args.tezosWeb, addOperator, provider),
  /**
   * Add or remove minter
   * @param body content for adding or removing minter on the Tezos network
   * @param addMinter boolean to add or remove minter
   * @param provider
   * @returns The hash (ID) of the transaction
   */
  addRemoveMinter: async (body: AddRemoveTokenMinter, addMinter: boolean, provider?: string) =>
    addRemoveMinter(body, args.tezosWeb, addMinter, provider),
})

const createStorage = fa2.contractStorage
  .with(fa2.simpleAdminStorage)
  .with(fa2.nftStorage)
  .with(fa2.multiMinterAdminStorage).build
