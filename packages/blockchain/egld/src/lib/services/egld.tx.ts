import { BlockchainElrondNetworkEgldService } from '@tatumio/api-client'
import BigNumber from 'bignumber.js'
import {
  generateAddressFromPrivatekey,
  prepareSignedTransactionAbstraction,
  TransferEgld,
  egldUtils,
} from '../egld.utils'
import { TransactionConfig } from 'web3-core'
import { ESDT_SYSTEM_SMART_CONTRACT_ADDRESS } from '../../constants'
export interface EsdtData extends EsdtToken {
  name: string
  symbol: string
  supply: number
  digits: number
  properties?: EsdtProperties
}
interface EsdtProperties {
  properties?: {
    canFreeze?: boolean
    canWipe?: boolean
    canPause?: boolean
    canMint?: boolean
    canBurn?: boolean
    canChangeOwner?: boolean
    canUpgrade?: boolean
    canAddSpecialRoles?: boolean
  }
}
interface EsdtToken {
  service?: string
  tokenId?: string
}

interface EsdtIssue extends EsdtToken {
  name: string
  symbol: string
  supply: number
  digits: number
  properties?: EsdtProperties
}

interface EsdtTransfer extends EsdtToken {
  value: number
  methodName: string
  arguments?: (number | string)[]
}

interface EsdtTransferNft extends EsdtToken {
  nonce: number
  quantity: number
  to: string
  methodName: string
  arguments?: (number | string)[]
}
interface EsdtIssueNftOrSft extends EsdtToken {
  name: string
  symbol: string
  properties?: EsdtPropertiesNftOrSft
}

interface EsdtPropertiesNftOrSft {
  canFreeze?: boolean
  canWipe?: boolean
  canPause?: boolean
  canTransferNFTCreateRole?: boolean
}

const prepareEsdtIssuanceData = async (body: TransferEgld): Promise<string> => {
  const data = egldUtils.parseTransferEgldBlockchainData(body)

  const tokenName = Buffer.from(data.name).toString('hex')
  const tokenTicker = Buffer.from(data.symbol).toString('hex')
  const initialSupply = egldUtils.encodeNumber(data.supply)
  const decimals = egldUtils.encodeNumber(data.digits)
  const properties = egldUtils.prepareProperties(
    data.properties || {
      canAddSpecialRoles: true,
      canChangeOwner: true,
      canUpgrade: true,
      canMint: true,
      canBurn: true,
    },
  )

  return `${data.service}@${tokenName}@${tokenTicker}@${initialSupply}@${decimals}` + properties
}

const prepareDeploy = async (body: TransferEgld, provider?: string) => {
  const { amount, fee, fromPrivateKey, signatureId, from, ...data } = body

  const value = amount ? new BigNumber(amount).toNumber() : 0.05

  const sender = from || generateAddressFromPrivatekey(fromPrivateKey)

  const tx: TransactionConfig = {
    from: sender,
    to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
    value,
    gasPrice: fee?.gasPrice,
    gas: fee?.gasLimit,
    data: await prepareEsdtIssuanceData({
      ...(data as EsdtIssue),
      service: data.service || 'issue',
    }),
  }

  return await prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey, provider)
}

const prepareEsdtTransferData = async (data: EsdtTransfer): Promise<string> => {
  const tokenId = Buffer.from(data.tokenId as string).toString('hex')
  const value = egldUtils.encodeNumber(data.value)
  let args = ''
  if (data.methodName) {
    args += '@' + Buffer.from(data.methodName).toString('hex')
    for (const k of data.arguments || []) {
      if (new BigNumber(k).isNaN()) {
        args += `@${Buffer.from(k as string).toString('hex')}`
      } else {
        args += `@${egldUtils.encodeNumber(new BigNumber(k))}`
      }
    }
  }

  return `${data.service}@${tokenId}@${value}` + args
}

export const prepareSignedTransaction = async (body: TransferEgld, provider?: string) => {
  const { fromPrivateKey, signatureId, from, to, amount, fee, data } = body

  const tx: TransactionConfig = {
    from: from || 0,
    to: to,
    value: amount,
    gasPrice: fee?.gasPrice,
    gas: fee?.gasLimit,
    data,
  }

  return await prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey, provider)
}

export const prepareTransferEsdtSignedTransaction = async (body: TransferEgld, provider?: string) => {
  const { fromPrivateKey, signatureId, from, to, fee, ...data } = body

  const sender = from || (await generateAddressFromPrivatekey(fromPrivateKey as string))

  const tx: TransactionConfig = {
    from: sender,
    to,
    gasPrice: fee?.gasPrice,
    gas: fee?.gasLimit,
    data: await prepareEsdtTransferData({
      ...(data as EsdtTransfer),
      service: data.service || 'ESDTTransfer',
    }),
  }

  return await prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey, provider)
}

export const prepareTransferNft = async (body: TransferEgld, provider?: string) => {
  const { fromPrivateKey, signatureId, from, amount, fee, ...data } = body

  const value = amount ? new BigNumber(amount).toNumber() : 0
  const sender = from || (await generateAddressFromPrivatekey(fromPrivateKey as string))

  const tx: TransactionConfig = {
    from: sender,
    to: sender,
    value,
    gasPrice: fee?.gasPrice,
    gas: fee?.gasLimit,
    data: await prepareTransferNftData({
      ...(data as EsdtTransferNft),
      service: data.service || 'ESDTNFTTransfer',
    }),
  }

  return await prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey, provider)
}

const prepareTransferNftData = async (data: EsdtTransferNft): Promise<string> => {
  const tokenId = Buffer.from(data.tokenId).toString('hex')
  const nonce = egldUtils.encodeNumber(data.nonce)
  const quantity = egldUtils.encodeNumber(data.quantity)
  const to = Buffer.from(data.to).toString('hex')

  let args = ''
  if (data.methodName) {
    args += '@' + Buffer.from(data.methodName).toString('hex')
    for (const k of data.arguments || []) {
      if (new BigNumber(k).isNaN()) {
        args += `@${Buffer.from(k as string).toString('hex')}`
      } else {
        args += `@${egldUtils.encodeNumber(new BigNumber(k))}`
      }
    }
  }

  return `${data.service}@${tokenId}@${nonce}@${quantity}@${to}` + args
}

export const prepareDeployNftOrSft = async (body: TransferEgld, provider?: string) => {
  const { fromPrivateKey, signatureId, from, amount, fee, ...data } = body

  const value = amount ? new BigNumber(amount).toNumber() : 0.05
  const sender = from || (await generateAddressFromPrivatekey(fromPrivateKey as string))

  const tx: TransactionConfig = {
    from: sender,
    to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
    value,
    gasPrice: fee?.gasPrice,
    gas: fee?.gasLimit,
    data: await prepareIssuanceNftOrSftData({
      ...(data as EsdtIssueNftOrSft),
      service: data.service || 'issueNonFungible',
    }),
  }

  return await prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey, provider)
}

const prepareIssuanceNftOrSftData = async (data: EsdtIssueNftOrSft): Promise<string> => {
  const tokenName = Buffer.from(data.name).toString('hex')
  const tokenTicker = Buffer.from(data.symbol).toString('hex')
  const properties = egldUtils.prepareProperties(data.properties)

  return `${data.service}@${tokenName}@${tokenTicker}` + properties
}

export const egldTransactionService = () => {
  return {
    prepare: {
      /**
       * Sign ESDT transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      deploy: async (body: TransferEgld, provider?: string) => prepareDeploy(body, provider),
      /**
       * Sign EGLD transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @returns transaction data to be broadcast to blockchain.
       */
      signedTransaction: async (body: TransferEgld, provider?: string) =>
        prepareSignedTransaction(body, provider),
      /**
       * Sign ESDT transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      smartContractMethodInvocation: (body: TransferEgld, provider?: string) =>
        prepareTransferEsdtSignedTransaction(body, provider),
      /**
       * Sign ESDT transfer NFT transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      transferNft: (body: TransferEgld, provider?: string) => prepareTransferNft(body, provider),
      /**
       * Sign ESDT deploy NFT transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
       * @returns transaction data to be broadcast to blockchain.
       */
      deployNft: (body: TransferEgld, provider?: string) => prepareDeployNftOrSft(body, provider),
    },
    send: {
      /**
       * Send EGLD deploy ESDT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      deploy: async (body: TransferEgld, provider?: string) =>
        await BlockchainElrondNetworkEgldService.egldBroadcast({
          txData: await prepareDeploy(body, provider),
          signatureId: 'signatureId' in body && body.signatureId,
        }),
      /**
       * Send EGLD or supported ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      signedTransaction: async (body: TransferEgld, provider?: string) =>
        await BlockchainElrondNetworkEgldService.egldBroadcast({
          txData: await prepareSignedTransaction(body, provider),
          signatureId: 'signatureId' in body && body.signatureId,
        }),
      /**
       * Send EGLD invoke smart contract transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      smartContractMethodInvocation: async (body: TransferEgld, provider?: string) =>
        await BlockchainElrondNetworkEgldService.egldBroadcast({
          txData: await prepareTransferEsdtSignedTransaction(body, provider),
          signatureId: 'signatureId' in body && body.signatureId,
        }),

      /**
       * Send EGLD ERC721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      transferNft: async (body: TransferEgld, provider?: string) =>
        await BlockchainElrondNetworkEgldService.egldBroadcast({
          txData: await prepareTransferNft(body, provider),
          signatureId: 'signatureId' in body && body.signatureId,
        }),
      /**
       * Send EGLD NFT deploy to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @param provider url of the EGLD Server to connect to. If not set, default public server will be used.
       * @returns transaction id of the transaction in the blockchain
       */
      deployNft: async (body: TransferEgld, provider?: string) =>
        await BlockchainElrondNetworkEgldService.egldBroadcast({
          txData: await prepareDeployNftOrSft(body, provider),
          signatureId: 'signatureId' in body && body.signatureId,
        }),
    },
  }
}
