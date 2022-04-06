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
  if (!body.data) return ''

  const data = body.data && egldUtils.parseTransferEgldBlockchainData(body)

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

const prepareDeploy = async (body: TransferEgld) => {
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

  return await prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
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

export const prepareSignedTransaction = async (body: TransferEgld) => {
  const { fromPrivateKey, signatureId, from, to, amount, fee, data } = body

  const tx: TransactionConfig = {
    from: from || 0,
    to: to,
    value: amount,
    gasPrice: fee?.gasPrice,
    gas: fee?.gasLimit,
    data,
  }

  return await prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
}

export const prepareTransferEsdtSignedTransaction = async (body: TransferEgld) => {
  const { fromPrivateKey, signatureId, from, to, fee, data } = body

  const sender = from || (await generateAddressFromPrivatekey(fromPrivateKey as string))
  const parsedData = JSON.parse(data)

  const tx: TransactionConfig = {
    from: sender,
    to,
    gasPrice: fee?.gasPrice,
    gas: fee?.gasLimit,
    data: await prepareEsdtTransferData({
      ...(parsedData as EsdtTransfer),
      service: parsedData.service || 'ESDTTransfer',
    }),
  }

  return await prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
}

export const prepareTransferNft = async (body: TransferEgld) => {
  const { fromPrivateKey, signatureId, from, amount, fee, data } = body

  const value = amount ? new BigNumber(amount).toNumber() : 0
  const sender = from || (await generateAddressFromPrivatekey(fromPrivateKey as string))
  const parsedData = JSON.parse(data)

  const tx: TransactionConfig = {
    from: sender,
    to: sender,
    value,
    gasPrice: fee?.gasPrice,
    gas: fee?.gasLimit,
    data: await prepareTransferNftData({
      ...(parsedData as EsdtTransferNft),
      service: parsedData.service || 'ESDTNFTTransfer',
    }),
  }

  return await prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
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

export const prepareDeployNftOrSft = async (body: TransferEgld) => {
  const { fromPrivateKey, signatureId, from, amount, fee, data } = body

  const value = amount ? new BigNumber(amount).toNumber() : 0.05
  const sender = from || (await generateAddressFromPrivatekey(fromPrivateKey as string))
  const parsedData = JSON.parse(data)

  const tx: TransactionConfig = {
    from: sender,
    to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
    value,
    gasPrice: fee?.gasPrice,
    gas: fee?.gasLimit,
    data: await prepareIssuanceNftOrSftData({
      ...(parsedData as EsdtIssueNftOrSft),
      service: parsedData.service || 'issueNonFungible',
    }),
  }

  return await prepareSignedTransactionAbstraction(tx, signatureId, fromPrivateKey)
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
       * @returns transaction data to be broadcast to blockchain.
       */
      deploy: async (body: TransferEgld) => prepareDeploy(body),
      /**
       * Sign EGLD transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @returns transaction data to be broadcast to blockchain.
       */
      signedTransaction: async (body: TransferEgld) => prepareSignedTransaction(body),
      /**
       * Sign ESDT transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @returns transaction data to be broadcast to blockchain.
       */
      smartContractMethodInvocation: (body: TransferEgld) => prepareTransferEsdtSignedTransaction(body),
      /**
       * Sign ESDT transfer NFT transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @returns transaction data to be broadcast to blockchain.
       */
      transferNft: (body: TransferEgld) => prepareTransferNft(body),
      /**
       * Sign ESDT deploy NFT transaction with private keys locally. Nothing is broadcast to the blockchain.
       * @param body content of the transaction to broadcast
       * @returns transaction data to be broadcast to blockchain.
       */
      deployNft: (body: TransferEgld) => prepareDeployNftOrSft(body),
    },
    send: {
      /**
       * Send EGLD deploy ESDT transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      deploy: async (body: TransferEgld) =>
        await BlockchainElrondNetworkEgldService.egldBroadcast({
          txData: await prepareDeploy(body),
          signatureId: 'signatureId' in body && body.signatureId,
        }),
      /**
       * Send EGLD or supported ERC20 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      signedTransaction: async (body: TransferEgld) =>
        await BlockchainElrondNetworkEgldService.egldBroadcast({
          txData: await prepareSignedTransaction(body),
          signatureId: 'signatureId' in body && body.signatureId,
        }),
      /**
       * Send EGLD invoke smart contract transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      smartContractMethodInvocation: async (body: TransferEgld) =>
        await BlockchainElrondNetworkEgldService.egldBroadcast({
          txData: await prepareTransferEsdtSignedTransaction(body),
          signatureId: 'signatureId' in body && body.signatureId,
        }),

      /**
       * Send EGLD ERC721 transaction to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      transferNft: async (body: TransferEgld) =>
        await BlockchainElrondNetworkEgldService.egldBroadcast({
          txData: await prepareTransferNft(body),
          signatureId: 'signatureId' in body && body.signatureId,
        }),
      /**
       * Send EGLD NFT deploy to the blockchain. This method broadcasts signed transaction to the blockchain.
       * This operation is irreversible.
       * @param body content of the transaction to broadcast
       * @returns transaction id of the transaction in the blockchain
       */
      deployNft: async (body: TransferEgld) =>
        await BlockchainElrondNetworkEgldService.egldBroadcast({
          txData: await prepareDeployNftOrSft(body),
          signatureId: 'signatureId' in body && body.signatureId,
        }),
    },
  }
}
