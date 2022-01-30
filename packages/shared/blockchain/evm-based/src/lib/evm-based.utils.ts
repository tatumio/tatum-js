import ethWallet, { hdkey as ethHdKey } from 'ethereumjs-wallet'
import { ADDRESS_PREFIX, EvmBasedBlockchain, getDerivationPath } from '@tatumio/shared-core'
import { generateMnemonic, mnemonicToSeed } from 'bip39'
import { TronWallet } from '@tatumio/api-client'
import Web3 from 'web3'
import { TransactionConfig } from 'web3-core'
import { EvmBasedWeb3 } from '..'

export const evmBasedUtils = {
  generateAddressFromXPub: (xpub: string, i: number): string => {
    const w = ethHdKey.fromExtendedKey(xpub)
    const wallet = w.deriveChild(i).getWallet()
    return ADDRESS_PREFIX.EVM + wallet.getAddress().toString('hex').toLowerCase()
  },
  generatePrivateKeyFromMnemonic: async (
    blockchain: EvmBasedBlockchain,
    mnemonic: string,
    i: number,
    options?: { testnet: boolean },
  ): Promise<string> => {
    const derivationPath = getDerivationPath(blockchain, options)
    const hdwallet = ethHdKey.fromMasterSeed(await mnemonicToSeed(mnemonic))
    const derivePath = hdwallet.derivePath(derivationPath).deriveChild(i)
    return derivePath.getWallet().getPrivateKeyString()
  },
  generateAddressFromPrivateKey: (blockchain: EvmBasedBlockchain, privateKey: string): string => {
    const wallet = ethWallet.fromPrivateKey(Buffer.from(privateKey.replace(ADDRESS_PREFIX.EVM, ''), 'hex'))
    return wallet.getAddressString() as string
  },
  generateBlockchainWallet: async (
    blockchain: EvmBasedBlockchain,
    mnemonic?: string,
    options?: { testnet: boolean },
  ): Promise<TronWallet> => {
    const mnem = mnemonic ?? generateMnemonic(256)
    const derivationPath = getDerivationPath(blockchain, options)
    const hdwallet = ethHdKey.fromMasterSeed(await mnemonicToSeed(mnem))
    const derivePath = hdwallet.derivePath(derivationPath)
    return {
      xpub: derivePath.publicExtendedKey().toString(),
      mnemonic: mnem,
    }
  },
  prepareSignedTransactionAbstraction: async (
    client: Web3,
    transaction: TransactionConfig,
    signatureId: string | undefined,
    fromPrivateKey: string | undefined,
    web3: EvmBasedWeb3,
    gasLimit?: string,
    gasPrice?: string,
  ) => {
    const gasPriceDefined = gasPrice ? client.utils.toWei(gasPrice, 'gwei') : await web3.getGasPriceInWei()
    const tx = {
      ...transaction,
      gasPrice: gasPriceDefined,
    }

    tx.gas = gasLimit ?? (await client.eth.estimateGas(tx))

    if (signatureId) {
      return JSON.stringify(tx)
    }

    const signedTransaction = await client.eth.accounts.signTransaction(tx, fromPrivateKey)

    return signedTransaction.rawTransaction
  },
}
