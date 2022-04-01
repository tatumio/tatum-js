import { MnemonicKey } from '@terra-money/terra.js'
import { TerraWallet, XlmWallet, XrpWallet } from '@tatumio/api-client'
import { SdkWithXrpLikeWalletFunction } from '@tatumio/shared-blockchain-abstract'

export const terraWallet = (): SdkWithXrpLikeWalletFunction => {
  return {
    wallet: (): XrpWallet | XlmWallet | TerraWallet => {
      const key = new MnemonicKey()
      return { address: key.accAddress, privateKey: key.privateKey.toString('hex') }
    },
  }
}
