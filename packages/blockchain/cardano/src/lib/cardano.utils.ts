import * as Crypto from '@cardano-sdk/crypto'
import { Ed25519PrivateExtendedKeyHex } from '@cardano-sdk/crypto'
import { CML } from '@cardano-sdk/core'
import { HexBlob } from '@cardano-sdk/util'

export const cardanoUtils = {
  bip32Ed25519: new Crypto.CmlBip32Ed25519(CML),
  networkIdentifier: (testnet: boolean) => ({
    network_identifier: {
      blockchain: 'cardano',
      network: testnet ? 'preprod' : 'mainnet',
    },
  }),
  privateKeyToPublicHex: async (privateKey: string) => {
    return cardanoUtils.bip32Ed25519.getPublicKey(Ed25519PrivateExtendedKeyHex(privateKey))
  },
  sign: async (privateKey: string, message: string) => {
    return cardanoUtils.bip32Ed25519.sign(Ed25519PrivateExtendedKeyHex(privateKey), HexBlob(message))
  },
}
