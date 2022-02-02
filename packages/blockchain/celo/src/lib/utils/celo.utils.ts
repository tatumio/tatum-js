import { Currency } from '@tatumio/shared-core'
import { FromPrivateKeyOrSignatureId } from '@tatumio/shared-blockchain-abstract'
import {
  BurnNftCelo,
  DeployNftCelo,
  MintMultipleNftCelo,
  MintNftCelo,
  TransferNftCelo,
  UpdateCashbackValueForAuthorNftCelo,
} from '@tatumio/api-client'
import { BigNumber as BN } from '@ethersproject/bignumber'
import { CeloWallet } from '@celo-tools/celo-ethers-wrapper'

export interface CeloTransactionConfig {
  from?: string
  to?: string
  value?: number | string
  gas?: number | string
  gasPrice?: BN
  gasLimit?: string | number
  data?: string
  nonce?: number
  chainId?: number
  chain?: string
  feeCurrency: string
}

export type ChainMintErc721Celo =
  | MintNftCelo & {
      signatureId?: string
      chain: 'CELO'
    }

export type ChainMintNftCelo = FromPrivateKeyOrSignatureId<MintNftCelo>

export type ChainMintMultipleNftCelo = FromPrivateKeyOrSignatureId<MintMultipleNftCelo> & {
  erc20?: string
}

export type ChainBurnErc721Celo = FromPrivateKeyOrSignatureId<BurnNftCelo>

export type ChainTransferErc721Celo = FromPrivateKeyOrSignatureId<TransferNftCelo>

export type ChainUpdateCashbackErc721Celo = FromPrivateKeyOrSignatureId<UpdateCashbackValueForAuthorNftCelo>

export type ChainDeployErc721Celo = FromPrivateKeyOrSignatureId<DeployNftCelo>

export const CELO_CONSTANTS = {
  CEUR_ADDRESS_MAINNET: '0xd8763cba276a3738e6de85b4b3bf5fded6d6ca73',
  CEUR_ADDRESS_TESTNET: '0x10c892a6ec43a53e45d0b916b4b7d383b1b78c0f',
  CUSD_ADDRESS_MAINNET: '0x765de816845861e75a25fca122bb6898b8b1282a',
  CUSD_ADDRESS_TESTNET: '0x874069fa1eb16d44d622f2e0ca25eea172369bc1',
}

export const celoUtils = {
  prepareSignedTransactionAbstraction: async (wallet: CeloWallet, transaction: CeloTransactionConfig) => {
    transaction.gasLimit = (await wallet.estimateGas(transaction))
      .add(transaction.feeCurrency === Currency.CELO ? 0 : 100000)
      .toHexString()

    return wallet.signTransaction(transaction)
  },
}
