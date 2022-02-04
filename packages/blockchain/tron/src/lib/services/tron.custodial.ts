import {
  BlockchainTronService,
  CallSmartContractMethod,
  CallSmartContractMethodKMS,
  GenerateCustodialWalletTron,
  GenerateCustodialWalletTronKMS,
  TransferCustodialWalletBatchTron,
  TransferCustodialWalletBatchTronKMS,
  TransferCustodialWalletTron,
  TransferCustodialWalletTronKMS,
} from '@tatumio/api-client'
import { ITronWeb } from './tron.web'
import { tronTx } from './tron.tx'
import { CustodialFullTokenWallet } from '@tatumio/shared-blockchain-evm-based'
import BigNumber from 'bignumber.js'

const NATIVE_ASSET_CONTRACT_TYPE = 3
const NON_FUNGIBLE_TOKEN_CONTRACT_TYPE = 1
const FUNGIBLE_TOKEN_CONTRACT_TYPE = 0

const prepareTransferFromCustodialWallet = async (
  body: TransferCustodialWalletTron | TransferCustodialWalletTronKMS,
  decimals = 18,
  getContractDecimals: (contractAddress: string, provider?: string, testnet?: boolean) => Promise<number>,
  testnet = false,
  tronWeb: ITronWeb,
  provider?: string,
) => {
  const methodName = 'transfer'

  let tokenId = new BigNumber(body.tokenId ?? 0)
  let amount = new BigNumber(body.amount ?? 0)
  if (body.contractType === NATIVE_ASSET_CONTRACT_TYPE) {
    amount = amount.multipliedBy(new BigNumber(10).pow(decimals))
  } else if (body.contractType === FUNGIBLE_TOKEN_CONTRACT_TYPE) {
    tokenId = new BigNumber(0)
    amount = amount.multipliedBy(
      new BigNumber(10).pow(await getContractDecimals(body.tokenAddress, provider, testnet)),
    )
  }

  const params: CallSmartContractMethod | CallSmartContractMethodKMS = {
    ...body,
    methodName,
    contractAddress: body.custodialAddress,
    methodABI: CustodialFullTokenWallet.abi.find((abi) => abi.name === methodName),
    params: [
      body.tokenAddress || '0x000000000000000000000000000000000000dEaD',
      body.contractType,
      body.recipient,
      `0x${amount.toString(16)}`,
      `0x${new BigNumber(tokenId).toString(16)}`,
    ],
  }

  return tronTx({ tronWeb }).prepare.smartContractInvocation(params, provider)
}

const prepareBatchTransferFromCustodialWallet = async (
  body: TransferCustodialWalletBatchTron | TransferCustodialWalletBatchTronKMS,
  decimals = 6,
  getContractDecimals: (contractAddress: string, provider?: string, testnet?: boolean) => Promise<number>,
  testnet = false,
  tronWeb: ITronWeb,
  provider?: string,
) => {
  const methodName = 'transferBatch'

  const amounts: string[] = []
  const tokenIds: string[] = []
  for (let i = 0; i < body.contractType.length; i++) {
    let amount = new BigNumber(body.amount ? body.amount[i] : 0)
    let tokenId = new BigNumber(body.tokenId ? body.tokenId[i] : 0)

    if (body.contractType[i] === NATIVE_ASSET_CONTRACT_TYPE) {
      amount = amount.multipliedBy(new BigNumber(10).pow(decimals))
    } else if (body.contractType[i] === NON_FUNGIBLE_TOKEN_CONTRACT_TYPE) {
      amount = new BigNumber(0)
    } else if (body.contractType[i] === FUNGIBLE_TOKEN_CONTRACT_TYPE && body.tokenAddress) {
      tokenId = new BigNumber(0)
      amount = amount.multipliedBy(
        new BigNumber(10).pow(await getContractDecimals(body.tokenAddress[i], provider, testnet)),
      )
    }

    amounts.push(`0x${amount.toString(16)}`)
    tokenIds.push(`0x${tokenId.toString(16)}`)
  }

  const params: CallSmartContractMethod | CallSmartContractMethodKMS = {
    ...body,
    amount: undefined,
    methodName,
    contractAddress: body.custodialAddress,
    methodABI: CustodialFullTokenWallet.abi.find((abi) => abi.name === methodName),
    params: [
      (body.tokenAddress || []).map((t) => (t === '0' ? '0x000000000000000000000000000000000000dEaD' : t)),
      body.contractType,
      body.recipient,
      amounts,
      tokenIds,
    ],
  }

  return tronTx({ tronWeb }).prepare.smartContractInvocation(params, provider)
}

export const tronCustodial = (args: { tronWeb: ITronWeb }) => {
  return {
    prepare: {
      /**
       * This method is @Deprecated. Use @link{prepareCustodialWalletBatch} instead
       * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
       * of assets is covered by the deployer.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      custodialWallet: async (
        body: GenerateCustodialWalletTron | GenerateCustodialWalletTronKMS,
        provider?: string,
      ) => tronTx(args).prepare.generateCustodialWalletSignedTransaction(body, provider),
      /**
       * Prepare signed transaction from the custodial SC wallet.
       * @param testnet chain to work with
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      transferFromCustodialWallet: (
        body: TransferCustodialWalletTron | TransferCustodialWalletTronKMS,
        decimals = 18,
        getContractDecimals: (
          contractAddress: string,
          provider?: string,
          testnet?: boolean,
        ) => Promise<number>,
        testnet = false,
        provider?: string,
      ) =>
        prepareTransferFromCustodialWallet(
          body,
          decimals,
          getContractDecimals,
          testnet,
          args.tronWeb,
          provider,
        ),
      /**
       * Prepare signed batch transaction from the custodial SC wallet.
       * @param testnet chain to work with
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      batchTransferFromCustodialWallet: (
        body: TransferCustodialWalletBatchTron | TransferCustodialWalletBatchTronKMS,
        decimals = 6,
        getContractDecimals: (
          contractAddress: string,
          provider?: string,
          testnet?: boolean,
        ) => Promise<number>,
        testnet = false,
        provider?: string,
      ) =>
        prepareBatchTransferFromCustodialWallet(
          body,
          decimals,
          getContractDecimals,
          testnet,
          args.tronWeb,
          provider,
        ),
    },
    send: {
      /**
       * Generate new smart contract based custodial wallet. This wallet is able to receive any type of assets, btu transaction costs connected to the withdrawal
       * of assets is covered by the deployer.
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      custodialWallet: async (
        body: GenerateCustodialWalletTron | GenerateCustodialWalletTronKMS,
        provider?: string,
      ) => tronTx(args).send.generateCustodialWalletSignedTransaction(body, provider),
      /**
       * Send signed transaction from the custodial SC wallet.
       * @param testnet chain to work with
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      transferFromCustodialWallet: async (
        body: TransferCustodialWalletTron | TransferCustodialWalletTronKMS,
        decimals = 18,
        getContractDecimals: (
          contractAddress: string,
          provider?: string,
          testnet?: boolean,
        ) => Promise<number>,
        testnet = false,
        provider?: string,
      ) =>
        BlockchainTronService.tronBroadcast({
          txData: await prepareTransferFromCustodialWallet(
            body,
            decimals,
            getContractDecimals,
            testnet,
            args.tronWeb,
            provider,
          ),
        }),
      /**
       * Send signed batch transaction from the custodial SC wallet.
       * @param testnet chain to work with
       * @param body request data
       * @param provider optional provider to enter. if not present, Tatum Web3 will be used.
       * @returns {txId: string} Transaction ID of the operation, or signatureID in case of Tatum KMS
       */
      batchTransferFromCustodialWallet: async (
        body: TransferCustodialWalletBatchTron | TransferCustodialWalletBatchTronKMS,
        decimals = 6,
        getContractDecimals: (
          contractAddress: string,
          provider?: string,
          testnet?: boolean,
        ) => Promise<number>,
        testnet = false,
        provider?: string,
      ) =>
        BlockchainTronService.tronBroadcast({
          txData: await prepareBatchTransferFromCustodialWallet(
            body,
            decimals,
            getContractDecimals,
            testnet,
            args.tronWeb,
            provider,
          ),
        }),
    },
  }
}
