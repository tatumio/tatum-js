import { BigNumber } from 'bignumber.js'
import {
  ApproveCustodialTransfer,
  CeloSmartContractMethodInvocation,
  ContractType,
  Currency,
  CustodialFullTokenWallet,
  CustodialFullTokenWalletWithBatch,
  GenerateCustodialAddress,
  GenerateCustodialAddressBatch,
  SmartContractMethodInvocation,
  TransferFromCustodialAddress,
  TransferFromCustodialAddressBatch,
  validateBody,
} from '@tatumio/tatum-core'
import {
  convertAddressToHex,
  generateCustodialWallet as sendTronGenerateCustodialWalletSignedTransaction,
  generateCustodialWalletBatch as tronGenerateCustodialWalletBatch,
  GenerateTronCustodialAddress,
  getTrc20ContractDecimals as getTronTrc20ContractDecimals,
  prepareCustodialTransferBatch as prepareTronCustodialTransferBatch,
  prepareCustodialWallet as prepareTronGenerateCustodialWalletSignedTransaction,
  prepareCustodialWalletBatch as tronPrepareCustodialWalletBatch,
  prepareSmartContractInvocation as prepareTronSmartContractInvocation,
  TransferFromTronCustodialAddress,
  TransferFromTronCustodialAddressBatch,
} from '@tatumio/tatum-tron'
import {
  generateCustodialWallet as sendCeloGenerateCustodialWalletSignedTransaction,
  generateCustodialWalletBatch as celoGenerateCustodialWalletBatch,
  getErc20ContractDecimals as getCeloErc20ContractDecimals,
  prepareCustodialWallet as prepareCeloGenerateCustodialWalletSignedTransaction,
  prepareCustodialWalletBatch as celoPrepareCustodialWalletBatch,
  prepareSmartContractWriteMethodInvocation as prepareCeloSmartContractWriteMethodInvocation,
} from '@tatumio/tatum-celo'
import {
  generateCustodialWallet as sendOneGenerateCustodialWalletSignedTransaction,
  get20ContractDecimals as getOne20ContractDecimals,
  prepareCustodialWallet as prepareOneGenerateCustodialWalletSignedTransaction,
  prepareSmartContractWriteMethodInvocation as prepareOneSmartContractWriteMethodInvocation,
} from '@tatumio/tatum-one'
import {
  generateCustodialWallet as sendEthGenerateCustodialWalletSignedTransaction,
  generateCustodialWalletBatch as ethGenerateCustodialWalletBatch,
  getErc20ContractDecimals as getEthErc20ContractDecimals,
  prepareCustodialWallet as prepareEthGenerateCustodialWalletSignedTransaction,
  prepareCustodialWalletBatch as ethPrepareCustodialWalletBatch,
  prepareSmartContractWriteMethodInvocation,
} from '@tatumio/tatum-eth'
import {
  generateCustodialWallet as sendBscGenerateCustodialWalletSignedTransaction,
  generateCustodialWalletBatch as bscGenerateCustodialWalletBatch,
  getBep20ContractDecimals as getBscBep20ContractDecimals,
  prepareCustodialWallet as prepareBscGenerateCustodialWalletSignedTransaction,
  prepareCustodialWalletBatch as bscPrepareCustodialWalletBatch,
  prepareSmartContractWriteMethodInvocation as prepareBscSmartContractWriteMethodInvocation,
} from '@tatumio/tatum-bsc'
import {
  generateCustodialWallet as sendMoonbeamGenerateCustodialWalletSignedTransaction,
  generateCustodialWalletBatch as moonbeamGenerateCustodialWalletBatch,
  getErc20ContractDecimals as getMoonbeamErc20ContractDecimals,
  prepareCustodialWallet as prepareMoonbeamGenerateCustodialWalletSignedTransaction,
  prepareCustodialWalletBatch as moonbeamPrepareCustodialWalletBatch,
  prepareSmartContractWriteMethodInvocation as prepareMoonbeamSmartContractWriteMethodInvocation,
} from '@tatumio/tatum-moonbeam'
import {
  generateCustodialWallet as sendPolygonGenerateCustodialWalletSignedTransaction,
  generateCustodialWalletBatch as polygonGenerateCustodialWalletBatch,
  getErc20ContractDecimals as getPolygonErc20ContractDecimals,
  prepareCustodialWallet as preparePolygonGenerateCustodialWalletSignedTransaction,
  prepareCustodialWalletBatch as polygonPrepareCustodialWalletBatch,
  prepareSmartContractWriteMethodInvocation as preparePolygonSmartContractWriteMethodInvocation,
} from '@tatumio/tatum-polygon'
import { helperBroadcastTx, helperPrepareSCCall } from '../helpers'
import { getErc20Decimals } from '../fungible'

/**
 * This method is @Deprecated. Use @link{generateCustodialWalletBatch} instead
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const generateCustodialWallet = async (
  testnet: boolean,
  body: GenerateCustodialAddress | GenerateTronCustodialAddress,
  provider?: string
): Promise<{ txId: string }> => {
  console.log('This method is deprecated. For better gas consumption, use generateCustodialWalletBatch.')
  switch (body.chain) {
    case Currency.CELO:
      return await sendCeloGenerateCustodialWalletSignedTransaction(testnet, body, provider)
    case Currency.ONE:
      return await sendOneGenerateCustodialWalletSignedTransaction(body, provider)
    case Currency.ETH:
      return await sendEthGenerateCustodialWalletSignedTransaction(body, provider)
    case Currency.BSC:
      return await sendBscGenerateCustodialWalletSignedTransaction(body, provider)
    case Currency.GLMR:
      return await sendMoonbeamGenerateCustodialWalletSignedTransaction(body, provider)
    case Currency.MATIC:
      return await sendPolygonGenerateCustodialWalletSignedTransaction(body, provider)
    case Currency.TRON:
      return await sendTronGenerateCustodialWalletSignedTransaction(body as GenerateTronCustodialAddress, provider)
    default:
      throw new Error('Unsupported chain')
  }
}

/**
 * This method is @Deprecated. Use @link{prepareCustodialWalletBatch} instead
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareCustodialWallet = async (
  testnet: boolean,
  body: GenerateCustodialAddress | GenerateTronCustodialAddress,
  provider?: string
) => {
  console.log('This method is deprecated. For better gas consumption, use prepareCustodialWalletBatch.')
  switch (body.chain) {
    case Currency.CELO:
      return await prepareCeloGenerateCustodialWalletSignedTransaction(testnet, body, provider)
    case Currency.ONE:
      return await prepareOneGenerateCustodialWalletSignedTransaction(body, provider)
    case Currency.ETH:
      return await prepareEthGenerateCustodialWalletSignedTransaction(body, provider)
    case Currency.BSC:
      return await prepareBscGenerateCustodialWalletSignedTransaction(body, provider)
    case Currency.GLMR:
      return await prepareMoonbeamGenerateCustodialWalletSignedTransaction(body, provider)
    case Currency.MATIC:
      return await preparePolygonGenerateCustodialWalletSignedTransaction(body, provider)
    case Currency.TRON:
      return await prepareTronGenerateCustodialWalletSignedTransaction(body as GenerateTronCustodialAddress, provider)
    default:
      throw new Error('Unsupported chain')
  }
}

/**
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendCustodialWallet = async (
  testnet: boolean,
  body: GenerateCustodialAddress | GenerateTronCustodialAddress,
  provider?: string
): Promise<{ txId: string }> => {
  let txData
  switch (body.chain) {
    case Currency.CELO:
      txData = await prepareCeloGenerateCustodialWalletSignedTransaction(testnet, body, provider)
      break
    case Currency.ONE:
      txData = await prepareOneGenerateCustodialWalletSignedTransaction(body, provider)
      break
    case Currency.ETH:
      txData = await prepareEthGenerateCustodialWalletSignedTransaction(body, provider)
      break
    case Currency.BSC:
      txData = await prepareBscGenerateCustodialWalletSignedTransaction(body, provider)
      break
    case Currency.GLMR:
      txData = await prepareMoonbeamGenerateCustodialWalletSignedTransaction(body, provider)
      break
    case Currency.MATIC:
      txData = await preparePolygonGenerateCustodialWalletSignedTransaction(body, provider)
      break
    case Currency.TRON:
      txData = await prepareTronGenerateCustodialWalletSignedTransaction(body, provider)
      break
    default:
      throw new Error('Unsupported chain')
  }
  return helperBroadcastTx(body.chain, txData, body.signatureId)
}

/**
 * Prepare signed transaction from the custodial SC wallet.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareTransferFromCustodialWallet = async (
  testnet: boolean,
  body: TransferFromCustodialAddress | TransferFromTronCustodialAddress,
  provider?: string
) => {
  let r: SmartContractMethodInvocation | CeloSmartContractMethodInvocation
  let decimals
  if (body.chain === Currency.TRON) {
    decimals = 6
    await validateBody(body, TransferFromTronCustodialAddress)
  } else {
    decimals = 18
    await validateBody(body, TransferFromCustodialAddress)
  }
  if (body.chain === Currency.CELO) {
    r = new CeloSmartContractMethodInvocation()
  } else {
    r = new SmartContractMethodInvocation()
  }
  r.fee = body.fee
  r.nonce = body.nonce
  r.fromPrivateKey = body.fromPrivateKey
  r.signatureId = body.signatureId
  r.index = body.index
  r.contractAddress = body.custodialAddress
  r.methodName = 'transfer'
  let amount = new BigNumber(body.amount || 0)
  let tokenId = new BigNumber(body.tokenId || 0)
  if (body.contractType === ContractType.NATIVE_ASSET) {
    amount = amount.multipliedBy(new BigNumber(10).pow(decimals))
  } else if (body.contractType === ContractType.FUNGIBLE_TOKEN) {
    tokenId = new BigNumber(0)
    switch (body.chain) {
      case Currency.CELO:
        amount = amount.multipliedBy(new BigNumber(10).pow(await getCeloErc20ContractDecimals(body.tokenAddress, provider)))
        break
      case Currency.ONE:
        amount = amount.multipliedBy(new BigNumber(10).pow(await getOne20ContractDecimals(body.tokenAddress, provider)))
        break
      case Currency.ETH:
        amount = amount.multipliedBy(new BigNumber(10).pow(await getEthErc20ContractDecimals(body.tokenAddress, provider)))
        break
      case Currency.BSC:
        amount = amount.multipliedBy(new BigNumber(10).pow(await getBscBep20ContractDecimals(body.tokenAddress, provider)))
        break
      case Currency.GLMR:
        amount = amount.multipliedBy(new BigNumber(10).pow(await getMoonbeamErc20ContractDecimals(body.tokenAddress, provider)))
        break
      case Currency.MATIC:
        amount = amount.multipliedBy(new BigNumber(10).pow(await getPolygonErc20ContractDecimals(body.tokenAddress, provider)))
        break
      case Currency.TRON:
        amount = amount.multipliedBy(new BigNumber(10).pow(await getTronTrc20ContractDecimals(body.tokenAddress, provider)))
        break
      default:
        throw new Error('Unsupported combination of inputs.')
    }
  }
  r.params = [
    body.tokenAddress || '0x000000000000000000000000000000000000dEaD',
    body.contractType,
    body.recipient,
    `0x${amount.toString(16)}`,
    `0x${new BigNumber(tokenId).toString(16)}`,
  ]
  r.methodABI = CustodialFullTokenWallet.abi.find((a) => a.name === 'transfer')
  switch (body.chain) {
    case Currency.CELO:
      return await prepareCeloSmartContractWriteMethodInvocation(
        {
          ...r,
          feeCurrency: body.feeCurrency || Currency.CELO,
        },
        {
          provider,
          testnet,
        }
      )
    case Currency.ONE:
      return await prepareOneSmartContractWriteMethodInvocation(r, { provider })
    case Currency.ETH:
      return await prepareSmartContractWriteMethodInvocation(r, { provider })
    case Currency.BSC:
      return await prepareBscSmartContractWriteMethodInvocation(r, { provider })
    case Currency.GLMR:
      return await prepareMoonbeamSmartContractWriteMethodInvocation(r, { provider })
    case Currency.MATIC:
      return await preparePolygonSmartContractWriteMethodInvocation(r, { provider })
    case Currency.TRON: {
      const { feeLimit, from } = body as TransferFromTronCustodialAddress
      r.methodName = 'transfer(address,uint256,address,uint256,uint256)'
      r.params = [
        { type: 'address', value: convertAddressToHex(r.params[0]) },
        { type: 'uint256', value: r.params[1] },
        { type: 'address', value: convertAddressToHex(r.params[2]) },
        { type: 'uint256', value: r.params[3] },
        { type: 'uint256', value: r.params[4] },
      ]
      return await prepareTronSmartContractInvocation(r, feeLimit as number, from, provider)
    }
    default:
      throw new Error('Unsupported combination of inputs.')
  }
}

/**
 * Send signed transaction from the custodial SC wallet.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendTransferFromCustodialWallet = async (
  testnet: boolean,
  body: TransferFromCustodialAddress | TransferFromTronCustodialAddress,
  provider?: string
): Promise<{ txId: string }> =>
  helperBroadcastTx(body.chain, await prepareTransferFromCustodialWallet(testnet, body, provider), body.signatureId)

/**
 * Prepare signed batch transaction from the custodial SC wallet.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareBatchTransferFromCustodialWallet = async (
  testnet: boolean,
  body: TransferFromCustodialAddressBatch | TransferFromTronCustodialAddressBatch,
  provider?: string
) => {
  let r: SmartContractMethodInvocation | CeloSmartContractMethodInvocation
  let decimals
  if (body.chain === Currency.TRON) {
    await validateBody(body, TransferFromTronCustodialAddressBatch)
    decimals = 6
  } else {
    await validateBody(body, TransferFromCustodialAddressBatch)
    decimals = 18
  }
  if (body.chain === Currency.CELO) {
    r = new CeloSmartContractMethodInvocation()
  } else {
    r = new SmartContractMethodInvocation()
  }
  r.fee = body.fee
  r.nonce = body.nonce
  r.fromPrivateKey = body.fromPrivateKey
  r.signatureId = body.signatureId
  r.index = body.index
  r.contractAddress = body.custodialAddress
  r.methodName = 'transferBatch'
  const amounts = []
  const tokenIds = []
  for (let i = 0; i < body.contractType.length; i++) {
    let amount = new BigNumber(body.amount ? body.amount[i] : 0)
    let tokenId = new BigNumber(body.tokenId ? body.tokenId[i] : 0)
    if (body.contractType[i] === ContractType.NATIVE_ASSET) {
      amount = amount.multipliedBy(new BigNumber(10).pow(decimals))
    } else if (body.contractType[i] === ContractType.NON_FUNGIBLE_TOKEN) {
      amount = new BigNumber(0)
    } else if (body.contractType[i] === ContractType.FUNGIBLE_TOKEN && body.tokenAddress) {
      tokenId = new BigNumber(0)
      switch (body.chain) {
        case Currency.CELO:
          amount = amount.multipliedBy(new BigNumber(10).pow(await getCeloErc20ContractDecimals(body.tokenAddress[i], provider)))
          break
        case Currency.ONE:
          amount = amount.multipliedBy(new BigNumber(10).pow(await getOne20ContractDecimals(body.tokenAddress[i], provider)))
          break
        case Currency.ETH:
          amount = amount.multipliedBy(new BigNumber(10).pow(await getEthErc20ContractDecimals(body.tokenAddress[i], provider)))
          break
        case Currency.BSC:
          amount = amount.multipliedBy(new BigNumber(10).pow(await getBscBep20ContractDecimals(body.tokenAddress[i], provider)))
          break
        case Currency.GLMR:
          amount = amount.multipliedBy(new BigNumber(10).pow(await getMoonbeamErc20ContractDecimals(body.tokenAddress[i], provider)))
          break
        case Currency.MATIC:
          amount = amount.multipliedBy(new BigNumber(10).pow(await getPolygonErc20ContractDecimals(body.tokenAddress[i], provider)))
          break
        case Currency.TRON:
          amount = amount.multipliedBy(new BigNumber(10).pow(await getTronTrc20ContractDecimals(body.tokenAddress[i], provider)))
          break
        default:
          throw new Error('Unsupported combination of inputs.')
      }
    }
    amounts.push(`0x${amount.toString(16)}`)
    tokenIds.push(`0x${tokenId.toString(16)}`)
  }
  r.params = [
    (body.tokenAddress || []).map((t) => (t === '0' ? '0x000000000000000000000000000000000000dEaD' : t)),
    body.contractType,
    body.recipient,
    amounts,
    tokenIds,
  ]
  r.methodABI = CustodialFullTokenWalletWithBatch.abi.find((a) => a.name === 'transferBatch')
  switch (body.chain) {
    case Currency.CELO:
      return await prepareCeloSmartContractWriteMethodInvocation(
        {
          ...r,
          feeCurrency: body.feeCurrency || Currency.CELO,
        },
        {
          provider,
          testnet,
        }
      )
    case Currency.ONE:
      return await prepareOneSmartContractWriteMethodInvocation(r, { provider })
    case Currency.ETH:
      return await prepareSmartContractWriteMethodInvocation(r, { provider })
    case Currency.BSC:
      return await prepareBscSmartContractWriteMethodInvocation(r, { provider })
    case Currency.GLMR:
      return await prepareMoonbeamSmartContractWriteMethodInvocation(r, { provider })
    case Currency.MATIC:
      return await preparePolygonSmartContractWriteMethodInvocation(r, { provider })
    case Currency.TRON: {
      const body1 = body as TransferFromTronCustodialAddressBatch
      return await prepareTronCustodialTransferBatch(r, body1.feeLimit as number, body1.from, { provider })
    }
    default:
      throw new Error('Unsupported combination of inputs.')
  }
}

/**
 * Send signed batch transaction from the custodial SC wallet.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendBatchTransferFromCustodialWallet = async (
  testnet: boolean,
  body: TransferFromCustodialAddressBatch | TransferFromTronCustodialAddressBatch,
  provider?: string
): Promise<{ txId: string }> =>
  helperBroadcastTx(body.chain, await prepareBatchTransferFromCustodialWallet(testnet, body, provider), body.signatureId)

/**
 * Prepare signed approve transaction from the custodial SC wallet.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareApproveFromCustodialWallet = async (testnet: boolean, body: ApproveCustodialTransfer, provider?: string) => {
  await validateBody(body, ApproveCustodialTransfer)

  const decimals = body.contractType === ContractType.FUNGIBLE_TOKEN ? await getErc20Decimals(body.chain, body.tokenAddress, provider) : 0
  const params = [
    body.tokenAddress.trim(),
    body.contractType,
    body.spender,
    `0x${new BigNumber(body.amount || 0).multipliedBy(new BigNumber(10).pow(decimals)).toString(16)}`,
    `0x${new BigNumber(body.tokenId || 0).toString(16)}`,
  ]
  delete body.amount
  return await helperPrepareSCCall(
    testnet,
    {
      ...body,
      contractAddress: body.custodialAddress,
    },
    'approve',
    params,
    undefined,
    provider,
    CustodialFullTokenWallet.abi
  )
}

/**
 * Send signed approve transaction from the custodial SC wallet.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendApproveFromCustodialWallet = async (
  testnet: boolean,
  body: ApproveCustodialTransfer,
  provider?: string
): Promise<{ txId: string }> =>
  helperBroadcastTx(body.chain, await prepareApproveFromCustodialWallet(testnet, body, provider), body.signatureId)

/**
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, but transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const generateCustodialWalletBatch = async (
  testnet: boolean,
  body: GenerateCustodialAddressBatch,
  provider?: string
): Promise<{ txId: string }> => {
  switch (body.chain) {
    case Currency.CELO:
      return await celoGenerateCustodialWalletBatch(testnet, body, provider)
    case Currency.TRON:
      return await tronGenerateCustodialWalletBatch(testnet, body, provider)
    case Currency.ETH:
      return await ethGenerateCustodialWalletBatch(testnet, body, provider)
    case Currency.MATIC:
      return await polygonGenerateCustodialWalletBatch(testnet, body, provider)
    case Currency.BSC:
      return await bscGenerateCustodialWalletBatch(testnet, body, provider)
    case Currency.GLMR:
      return await moonbeamGenerateCustodialWalletBatch(testnet, body, provider)
    default:
      throw new Error('Unsupported chain')
  }
}

/**
 * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, but transaction costs connected to the withdrawal
 * of assets is covered by the deployer.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareCustodialWalletBatch = async (testnet: boolean, body: GenerateCustodialAddressBatch, provider?: string) => {
  switch (body.chain) {
    case Currency.CELO:
      return await celoPrepareCustodialWalletBatch(testnet, body, provider)
    case Currency.TRON:
      return await tronPrepareCustodialWalletBatch(testnet, body, provider)
    case Currency.ETH:
      return await ethPrepareCustodialWalletBatch(testnet, body, provider)
    case Currency.MATIC:
      return await polygonPrepareCustodialWalletBatch(testnet, body, provider)
    case Currency.BSC:
      return await bscPrepareCustodialWalletBatch(testnet, body, provider)
    case Currency.GLMR:
      return await moonbeamPrepareCustodialWalletBatch(testnet, body, provider)
    default:
      throw new Error('Unsupported chain')
  }
}
export { obtainCustodialAddressType, getCustodialAddresses } from '@tatumio/tatum-core'
