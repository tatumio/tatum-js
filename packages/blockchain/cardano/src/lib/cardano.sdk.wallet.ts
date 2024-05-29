import { generateMnemonic, mnemonicToEntropy } from 'bip39'
import { NodeRpcService, Wallet } from '@tatumio/api-client'
import { Buffer } from 'buffer'
import { SDKArguments } from '@tatumio/shared-abstract-sdk'
import { cardanoUtils } from './cardano.utils'
import { Bip32PublicKeyHex, Ed25519PrivateExtendedKeyHex } from '@cardano-sdk/crypto'

const harden = (num) => 2147483648 + num

export const cardanoWallet = (
  args: SDKArguments,
  apiCalls: {
    rpcCall: typeof NodeRpcService.nodeJsonPostRpcDriver
  } = {
    rpcCall: NodeRpcService.nodeJsonPostRpcDriver,
  },
) => {
  const deriveAddressFromPubKey = (key: string, testnet: boolean) =>
    apiCalls
      .rpcCall(
        args.apiKey,
        testnet ? 'cardano-preprod' : 'cardano-mainnet',
        'construction/derive',
        {
          ...cardanoUtils.networkIdentifier(testnet),
          public_key: {
            hex_bytes: key,
            curve_type: 'edwards25519',
          },
          metadata: {},
        },
      )
      .then((r) => r.account_identifier.address)

  return {
    generateAddressFromXPub: async (
      xpub: string,
      i: number,
      options: { testnet: boolean },
    ): Promise<string> => {
      const pubKey = await cardanoUtils.bip32Ed25519.derivePublicKey(Bip32PublicKeyHex(xpub), [i])
      const rawPubKey = await cardanoUtils.bip32Ed25519.getRawPublicKey(pubKey)
      return deriveAddressFromPubKey(rawPubKey, options.testnet)
    },
    generatePrivateKeyFromMnemonic: async (mnemonic: string, i: number): Promise<string> => {
      const privateKeyHex = await cardanoUtils.bip32Ed25519.fromBip39Entropy(
        Buffer.from(mnemonicToEntropy(mnemonic), 'hex'),
        '',
      )
      const key = await cardanoUtils.bip32Ed25519.derivePrivateKey(privateKeyHex, [
        harden(1852),
        harden(1815),
        harden(0),
        harden(0),
        i,
      ])
      return cardanoUtils.bip32Ed25519.getRawPrivateKey(key)
    },
    generateWallet: async (mnemonic?: string): Promise<Wallet> => {
      const m = mnemonic || generateMnemonic(256)
      const privateKeyHex = await cardanoUtils.bip32Ed25519.fromBip39Entropy(
        Buffer.from(mnemonicToEntropy(m), 'hex'),
        '',
      )
      const key = await cardanoUtils.bip32Ed25519.derivePrivateKey(privateKeyHex, [
        harden(1852),
        harden(1815),
        harden(0),
        harden(0),
      ])
      return { mnemonic: m, xpub: await cardanoUtils.bip32Ed25519.getBip32PublicKey(key) }
    },
    generateAddressFromPrivateKey: async (
      privateKey: string,
      options: { testnet: boolean },
    ): Promise<string> => {
      const pubKey = await cardanoUtils.bip32Ed25519.getPublicKey(Ed25519PrivateExtendedKeyHex(privateKey))
      return deriveAddressFromPubKey(pubKey, options.testnet)
    },
  }
}
