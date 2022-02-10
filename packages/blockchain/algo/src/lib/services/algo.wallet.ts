import { AlgoWallet } from '@tatumio/api-client'
import * as algosdk from 'algosdk'
import base32 from 'base32.js'

export const algoWallet = () => {
  return {
    /**
     * Generate wallet
     * @param mnemonic optional mnemonic seed to use. If not present, new one will be generated
     * @returns wallet or a combination of address and private key
     */
    generateWallet(mnemonic?: string): AlgoWallet {
      const account = mnemonic ? algosdk.mnemonicToSecretKey(mnemonic) : algosdk.generateAccount()
      const encoder = new base32.Encoder({ type: 'rfc4648' })
      const secret = encoder.write(account.sk).finalize()

      return {
        address: account.addr,
        secret,
      }
    },
    /**
     * Generate Algo Address From Private Key
     * @param privateKey Private key to use
     * @returns blockchain address
     */
    generateAddressFromPrivatetKey(privateKey: string): string {
      const decoder = new base32.Decoder({ type: 'rfc4648' })
      const secretKey = decoder.write(privateKey).buf
      const mn = algosdk.secretKeyToMnemonic(secretKey)

      return algosdk.mnemonicToSecretKey(mn).addr
    },
  }
}
