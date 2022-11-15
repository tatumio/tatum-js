import { Wallet } from '@tatumio/api-client'
import { evmBasedUtils, evmBasedWallet } from '@tatumio/shared-blockchain-evm-based'
import ethWallet from 'ethereumjs-wallet'
import { ADDRESS_PREFIX, Blockchain } from '@tatumio/shared-core'

export const xdcWallet = () => {
  const blockchain = Blockchain.XDC
  const evm = evmBasedWallet({ blockchain })

  return {
    /**
     * Generate address
     * @param xpub extended public key to generate address from
     * @param i derivation index of address to generate. Up to 2^31 addresses can be generated.
     * @returns blockchain address
     */
    generateAddressFromXPub(xpub: string, i: number): string {
      return evmBasedUtils.generateAddressFromXPub(xpub, i, ADDRESS_PREFIX.XDC)
    },
    /**
     * Generate private key from mnemonic seed
     * @param mnemonic mnemonic to generate private key from
     * @param i derivation index of private key to generate.
     * @param options optional testnet or mainnet version of address. Default: mainnet
     * @returns blockchain private key to the address
     */
    generatePrivateKeyFromMnemonic: evm.generatePrivateKeyFromMnemonic,
    /**
     * Generate address from private key
     * @param privateKey private key to use
     * @returns blockchain private key to the address
     */
    generateAddressFromPrivateKey(privateKey: string): string {
      const wallet = ethWallet.fromPrivateKey(Buffer.from(privateKey.replace('0x', ''), 'hex'))
      return wallet.getAddressString().replace('0x', ADDRESS_PREFIX.XDC)
    },
    /**
     * Generate wallet
     * @param mnemonic mnemonic seed to use. If not present, new one will be generated
     * @param options optional testnet or mainnet version of address. Default: mainnet
     * @returns wallet or a combination of address and private key
     */
    async generateWallet(mnemonic?: string, options?: { testnet: boolean }): Promise<Wallet> {
      return evmBasedUtils.generateBlockchainWallet(blockchain, mnemonic, options)
    },
  }
}
