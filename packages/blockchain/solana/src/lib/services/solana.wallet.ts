import { Keypair } from '@solana/web3.js'
// @ts-ignore
import { decode, encode } from 'base-58'
import { DERIVATION_PATH } from '@tatumio/shared-core'
import { derivePath } from 'ed25519-hd-key'
import { generateMnemonic, mnemonicToSeedSync } from 'bip39'

const generateAddressFromMnemonic = (mnemonic: string, index: number) => {
  const seed = mnemonicToSeedSync(mnemonic).toString('hex')
  const { key } = derivePath(`${DERIVATION_PATH.SOL}/${index}'`, seed)
  const keypair = Keypair.fromSeed(key)
  return { address: keypair.publicKey.toBase58(), privateKey: encode(keypair.secretKey) }
}

export const solanaWallet = () => {
  return {
    wallet: (privateKey?: string): { mnemonic?: string, privateKey: string, address: string } => {
      const mnemonic = generateMnemonic(256)
      let keypair
      if (privateKey) {
        keypair = Keypair.fromSecretKey(
          privateKey.length === 128 ? Buffer.from(privateKey, 'hex') : decode(privateKey),
        )
      } else {
        return { mnemonic, ...generateAddressFromMnemonic(mnemonic, 0) }
      }
      return { address: keypair.publicKey.toBase58(), privateKey: encode(keypair.secretKey) }
    },
    generateAddressFromMnemonic,
  }
}
