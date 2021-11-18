import { BigNumber } from 'bignumber.js'
import {
  validateBody,
  CustodialFullTokenWallet,
  CustodialFullTokenWalletWithBatch,
  Custodial_1155_TokenWallet,
  Custodial_1155_TokenWalletWithBatch,
  Custodial_20_1155_TokenWallet,
  Custodial_20_1155_TokenWalletWithBatch,
  Custodial_20_721_TokenWallet,
  Custodial_20_721_TokenWalletWithBatch,
  Custodial_20_TokenWallet,
  Custodial_20_TokenWalletWithBatch,
  Custodial_721_1155_TokenWallet,
  Custodial_721_1155_TokenWalletWithBatch,
  Custodial_721_TokenWallet,
  Custodial_721_TokenWalletWithBatch,
  ContractType,
  Currency,
  GenerateCustodialAddress,
  SmartContractMethodInvocation,
  TransferFromCustodialAddress,
  TransferFromCustodialAddressBatch,
} from '@tatumio/tatum-core'

export const obtainCustodialAddressType = (body: GenerateCustodialAddress) => {
  if (body.chain === Currency.TRON && body.enableSemiFungibleTokens) {
    throw new Error('MultiToken not supported for TRON.')
  }
  let abi
  let code
  if (body.enableFungibleTokens && body.enableNonFungibleTokens && body.enableSemiFungibleTokens && body.enableBatchTransactions) {
    code = CustodialFullTokenWalletWithBatch.bytecode
    abi = CustodialFullTokenWalletWithBatch.abi
  } else if (body.enableFungibleTokens && body.enableNonFungibleTokens && body.enableSemiFungibleTokens && !body.enableBatchTransactions) {
    code = CustodialFullTokenWallet.bytecode
    abi = CustodialFullTokenWallet.abi
  } else if (body.enableFungibleTokens && body.enableNonFungibleTokens && !body.enableSemiFungibleTokens && body.enableBatchTransactions) {
    code = Custodial_20_721_TokenWalletWithBatch.bytecode
    abi = Custodial_20_721_TokenWalletWithBatch.abi
  } else if (body.enableFungibleTokens && body.enableNonFungibleTokens && !body.enableSemiFungibleTokens && !body.enableBatchTransactions) {
    code = Custodial_20_721_TokenWallet.bytecode
    abi = Custodial_20_721_TokenWallet.abi
  } else if (body.enableFungibleTokens && !body.enableNonFungibleTokens && body.enableSemiFungibleTokens && body.enableBatchTransactions) {
    code = Custodial_20_1155_TokenWalletWithBatch.bytecode
    abi = Custodial_20_1155_TokenWalletWithBatch.abi
  } else if (body.enableFungibleTokens && !body.enableNonFungibleTokens && body.enableSemiFungibleTokens && !body.enableBatchTransactions) {
    code = Custodial_20_1155_TokenWallet.bytecode
    abi = Custodial_20_1155_TokenWallet.abi
  } else if (!body.enableFungibleTokens && body.enableNonFungibleTokens && body.enableSemiFungibleTokens && body.enableBatchTransactions) {
    code = Custodial_721_1155_TokenWalletWithBatch.bytecode
    abi = Custodial_721_1155_TokenWalletWithBatch.abi
  } else if (!body.enableFungibleTokens && body.enableNonFungibleTokens && body.enableSemiFungibleTokens && !body.enableBatchTransactions) {
    code = Custodial_721_1155_TokenWallet.bytecode
    abi = Custodial_721_1155_TokenWallet.abi
  } else if (body.enableFungibleTokens && !body.enableNonFungibleTokens && !body.enableSemiFungibleTokens && body.enableBatchTransactions) {
    code = Custodial_20_TokenWalletWithBatch.bytecode
    abi = Custodial_20_TokenWalletWithBatch.abi
  } else if (
    body.enableFungibleTokens &&
    !body.enableNonFungibleTokens &&
    !body.enableSemiFungibleTokens &&
    !body.enableBatchTransactions
  ) {
    code = Custodial_20_TokenWallet.bytecode
    abi = Custodial_20_TokenWallet.abi
  } else if (!body.enableFungibleTokens && body.enableNonFungibleTokens && !body.enableSemiFungibleTokens && body.enableBatchTransactions) {
    code = Custodial_721_TokenWalletWithBatch.bytecode
    abi = Custodial_721_TokenWalletWithBatch.abi
  } else if (
    !body.enableFungibleTokens &&
    body.enableNonFungibleTokens &&
    !body.enableSemiFungibleTokens &&
    !body.enableBatchTransactions
  ) {
    code = Custodial_721_TokenWallet.bytecode
    abi = Custodial_721_TokenWallet.abi
  } else if (!body.enableFungibleTokens && !body.enableNonFungibleTokens && body.enableSemiFungibleTokens && body.enableBatchTransactions) {
    code = Custodial_1155_TokenWalletWithBatch.bytecode
    abi = Custodial_1155_TokenWalletWithBatch.abi
  } else if (
    !body.enableFungibleTokens &&
    !body.enableNonFungibleTokens &&
    body.enableSemiFungibleTokens &&
    !body.enableBatchTransactions
  ) {
    code = Custodial_1155_TokenWallet.bytecode
    abi = Custodial_1155_TokenWallet.abi
  } else {
    throw new Error('Unsupported combination of inputs.')
  }
  return { abi, code }
}

/**
 * Prepare signed transaction from the custodial SC wallet.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareTransferFromCustodialWalletAbstract = async (
  testnet: boolean,
  body: TransferFromCustodialAddress,
  getContractDecimals: (contractAddress: string, provider?: string, testnet?: boolean) => Promise<any>,
  prepareSmartContractWriteMethodInvocation: (
    r: SmartContractMethodInvocation,
    provider?: string,
    testnet?: boolean
  ) => Promise<string>,
  SmartContractMethodInvocationCtor: any,
  decimals: number,
  validateClass: any,
  provider?: string
) => {
  await validateBody(body, validateClass)
  const r: SmartContractMethodInvocation = new SmartContractMethodInvocationCtor()
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
    amount = amount.multipliedBy(new BigNumber(10).pow(await getContractDecimals(body.tokenAddress, provider, testnet)))
  }
  r.params = [
    body.tokenAddress || '0x000000000000000000000000000000000000dEaD',
    body.contractType,
    body.recipient,
    `0x${amount.toString(16)}`,
    `0x${new BigNumber(tokenId).toString(16)}`,
  ]
  r.methodABI = CustodialFullTokenWallet.abi.find((a) => a.name === 'transfer')
  return await prepareSmartContractWriteMethodInvocation(r, provider, testnet)
}

/**
 * Prepare signed batch transaction from the custodial SC wallet.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const prepareBatchTransferFromCustodialWalletAbstract = async (
  testnet: boolean,
  body: TransferFromCustodialAddressBatch,
  getContractDecimals: (contractAddress: string, provider?: string, testnet?: boolean) => Promise<any>,
  prepareSmartContractWriteMethodInvocation: (
    r: SmartContractMethodInvocation,
    provider?: string,
    testnet?: boolean,
  ) => Promise<string>,
  SmartContractMethodInvocationCtor: any,
  decimals: number,
  validateClass: any,
  provider?: string
) => {
  if (body.chain === Currency.TRON) {
    await validateBody(body, validateClass)
    decimals = 6
  } else {
    await validateBody(body, validateClass)
    decimals = 18
  }
  const r: SmartContractMethodInvocation = new SmartContractMethodInvocationCtor()
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
    let amount = new BigNumber(body.amount[i])
    let tokenId = new BigNumber(body.tokenId[i])
    if (body.contractType[i] === ContractType.NATIVE_ASSET) {
      amount = amount.multipliedBy(new BigNumber(10).pow(decimals))
    } else if (body.contractType[i] === ContractType.NON_FUNGIBLE_TOKEN) {
      amount = new BigNumber(0)
    } else if (body.contractType[i] === ContractType.FUNGIBLE_TOKEN) {
      tokenId = new BigNumber(0)
      amount = amount.multipliedBy(new BigNumber(10).pow(await getContractDecimals(body.tokenAddress[i], provider, testnet)))
    }
    amounts.push(`0x${amount.toString(16)}`)
    tokenIds.push(`0x${tokenId.toString(16)}`)
  }
  r.params = [
    body.tokenAddress.map((t) => (t === '0' ? '0x000000000000000000000000000000000000dEaD' : t)),
    body.contractType,
    body.recipient,
    amounts,
    tokenIds,
  ]
  r.methodABI = CustodialFullTokenWalletWithBatch.abi.find((a) => a.name === 'transferBatch')
  return await prepareSmartContractWriteMethodInvocation(r, provider, testnet)
}
