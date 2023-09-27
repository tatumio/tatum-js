import { evmBasedSdk } from '@tatumio/shared-blockchain-evm-based'
import { Blockchain } from '@tatumio/shared-core'
import { abstractSdkNft, SDKArguments } from '@tatumio/shared-abstract-sdk'
import { eonWeb3 } from './services/eon.web3'
import { eonTxService } from './services/eon.tx'

const blockchain = Blockchain.EON

export const TatumEonSDK = (args: SDKArguments) => {
  const web3 = eonWeb3({ blockchain })

  const txService = eonTxService({
    blockchain,
    web3,
  })
  const evmSdk = evmBasedSdk({ ...args, blockchain, web3 })
  const { nft } = abstractSdkNft()

  return {
    ...evmSdk,
    nft: {
      ...txService.erc721,
      ...nft,
    },
  }
}