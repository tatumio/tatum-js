import {
  generatePrivateKey,
  getAddressFromPrivateKey,
  getAddressFromPublicKey,
  getPrivateKeyFromMnemonic,
  getPublicKeyFromPrivateKey,
} from '@binance-chain/javascript-sdk/lib/crypto'

const generateBnbWallet = async (testnet: boolean) => {
  const privateKey = generatePrivateKey()
  const prefix = testnet ? 'tbnb' : 'bnb'
  return {
    address: getAddressFromPrivateKey(privateKey, prefix),
    privateKey,
  }
}

export const bnbWallet = () => {
  return {
    generateWallet: generateBnbWallet,
    generatePrivateKey,
    getAddressFromPrivateKey,
    getPrivateKeyFromMnemonic,
    getPublicKeyFromPrivateKey,
    getAddressFromPublicKey,
  }
}
