import {
  DeployErc20,
  EgldTx,
  TransferAda,
  TransferEgldBlockchain,
  TransferEgldBlockchainKMS,
  TransferNft,
} from '@tatumio/api-client'
import BigNumber from 'bignumber.js'
import { generateAddressFromPrivatekey } from '../egld.utils'
import { TransactionConfig } from 'web3-core'
import { isWithSignatureId } from '@tatumio/shared-abstract-sdk'
import { ESDT_SYSTEM_SMART_CONTRACT_ADDRESS } from '../../constants'

interface EsdtData {
  name: string
  symbol: string
  supply: number
  digits: number
  service?: string
  tokenId?: string
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

function isEsdtData(input?: object): input is EsdtData {
  return input && 'name' in input && 'symbol' in input && 'supply' in input && 'digits' in input
}

function parseTransferEgldBlockchainData(body: Pick<TransferEgldBlockchain, 'data'>): EsdtData {
  let parsed: object
  try {
    parsed = JSON.parse(body.data)
  } catch {
    throw new Error('Unable to parse Egld data input')
  }

  if (!isEsdtData(parsed)) {
    throw new Error('Unable to parse Egld data input')
  }

  return parsed
}

const prepareEsdtData = async (body: Pick<TransferEgldBlockchain, 'data'>): Promise<string> => {
  const data = parseTransferEgldBlockchainData(body)

  const tokenName = Buffer.from(data.name).toString('hex')
  const tokenTicker = Buffer.from(data.symbol).toString('hex')
  const initialSupply = encodeNumber(data.supply)
  const decimals = encodeNumber(data.digits)
  const properties = prepareProperties(
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

const prepareDeploySignedTransaction = async (body: TransferEgldBlockchain | TransferEgldBlockchainKMS) => {
  const { amount, fee, ...data } = body

  const value = amount ? new BigNumber(amount).toNumber() : 0.05

  const sender = isWithSignatureId(body) ? body.from : generateAddressFromPrivatekey(body.fromPrivateKey)

  const tx: TransactionConfig = {
    from: sender,
    to: ESDT_SYSTEM_SMART_CONTRACT_ADDRESS,
    value,
    gasPrice: fee?.gasPrice,
    gas: fee?.gasLimit,
    data: await prepareEsdtIssuanceData({
      ...(data as EsdtIssue),
      service: (data as EsdtIssue).service || 'issue',
    }),
  }
}

export const egldEsdt = () => {
  return {
    prepare: {
      deploy: async (body: EgldTx) => prepareDeploySignedTransaction(body),
    },
  }
}
