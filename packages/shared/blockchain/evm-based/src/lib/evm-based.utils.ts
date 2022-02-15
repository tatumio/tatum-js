import ethWallet, { hdkey as ethHdKey } from 'ethereumjs-wallet'
import { ADDRESS_PREFIX, EvmBasedBlockchain, getDerivationPath } from '@tatumio/shared-core'
import { generateMnemonic, mnemonicToSeed } from 'bip39'
import { TronWallet } from '@tatumio/api-client'
import Web3 from 'web3'
import { TransactionConfig } from 'web3-core'
import { Erc20Token, EvmBasedWeb3 } from '..'
import { HarmonyAddress } from '@harmony-js/crypto'
import { toWei, Unit } from 'web3-utils'

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
    web3: EvmBasedWeb3,
    signatureId?: string,
    fromPrivateKey?: string,
    gasLimit?: string,
    gasPrice?: string,
  ) => {
    const gasPriceDefined = gasPrice ? client.utils.toWei(gasPrice, 'gwei') : await web3.getGasPriceInWei()
    const tx = {
      ...transaction,
      gasPrice: gasPriceDefined,
    }

    tx.gas = gasLimit ?? (await client.eth.estimateGas(tx))

    if (tx.to) {
      evmBasedUtils.transformAddress(tx.to)
    }

    if (signatureId) {
      return JSON.stringify(tx)
    }

    if (!fromPrivateKey) {
      throw new Error('signatureId or fromPrivateKey has to be defined')
    }

    tx.from = tx.from || client.eth.defaultAccount || 0
    const signedTransaction = await client.eth.accounts.signTransaction(tx, fromPrivateKey)

    if (!signedTransaction.rawTransaction) {
      throw new Error('Unable to get signed tx data')
    }

    return signedTransaction.rawTransaction
  },

  transformAddress: (address: string) => {
    return address.startsWith('one') ? new HarmonyAddress(address).basicHex : address
  },

  transformAmount: (amount: string, unit = 'ether') => {
    return toWei(amount, unit as Unit)
  },

  decimals: async (contractAddress: string, web3: EvmBasedWeb3, provider?: string) => {
    const client = web3.getClient(provider)

    return new client.eth.Contract(
      Erc20Token.abi as any,
      evmBasedUtils.transformAddress(contractAddress),
    ).methods
      .decimals()
      .call()
  },
}
