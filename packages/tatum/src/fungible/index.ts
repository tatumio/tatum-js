import { ApproveErc20, Currency, prepareApproveErc20Abstraction, erc20TokenABI } from '@tatumio/tatum-core'
import { helperBroadcastTx, helperGetWeb3Client, helperPrepareSCCall } from '../helpers'
import { getOne20ContractDecimals } from '@tatumio/tatum-one'
import { getEthErc20ContractDecimals } from '@tatumio/tatum-eth'
import { getCeloErc20ContractDecimals } from '@tatumio/tatum-celo'
import { getBep20ContractDecimals as getBscBep20ContractDecimals } from '@tatumio/tatum-bsc'
import { getPolygonErc20ContractDecimals } from '@tatumio/tatum-polygon'

/**
 * Approve ERC20 transfer for spender.
 * @param testnet chain to work with
 * @param body request data
 * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
 * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
 */
export const sendApproveErc20 = async (testnet: boolean, body: ApproveErc20, provider?: string) =>
  helperBroadcastTx(body.chain, await prepareApproveErc20(testnet, body, provider), body.signatureId)

/**
 * Prepare approve ERC20 signed transaction.
 * @param testnet if we are on testnet or not
 * @param body body of the approve operation
 * @param provider optional Web3 provider
 */
export const prepareApproveErc20 = async (testnet: boolean, body: ApproveErc20, provider?: string) => {
  let getErc20ContractDecimalsFn: (contractAddress: string, provider?: string | undefined) => Promise<any>

  switch (body.chain) {
    case Currency.CELO:
      getErc20ContractDecimalsFn = getCeloErc20ContractDecimals
      break
    case Currency.ONE:
      getErc20ContractDecimalsFn = getOne20ContractDecimals
      break
    case Currency.ETH:
      getErc20ContractDecimalsFn = getEthErc20ContractDecimals
      break
    case Currency.BSC:
      getErc20ContractDecimalsFn = getBscBep20ContractDecimals
      break
    case Currency.MATIC:
      getErc20ContractDecimalsFn = getPolygonErc20ContractDecimals
      break
    default:
      throw new Error('Unsupported combination of inputs.')
  }

  const { body: validatedBody, params } = await prepareApproveErc20Abstraction(getErc20ContractDecimalsFn, testnet, body, provider)
  return await helperPrepareSCCall(testnet, validatedBody, 'approve', params, undefined, provider, erc20TokenABI)
}

/**
 * Get Decimals for the ERC20 token
 * @param chain chain to query for the token
 * @param contractAddress address of the token
 * @param provider optional provider
 */
export const getErc20Decimals = async (chain: Currency, contractAddress: string, provider?: string) => {
  const web3 = helperGetWeb3Client(chain, provider)
  // @ts-ignore
  return new web3.eth.Contract(token_abi, contractAddress).methods.decimals().call()
}
