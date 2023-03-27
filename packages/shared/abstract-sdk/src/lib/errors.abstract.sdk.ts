import { placeArgsToString } from './utils'

export type SdkOriginalError = {
  originalError?: Error
  originalErrorAsString?: string
  errorSubstringMapping?: { [key: string]: SdkErrorCode }
  errorSubstringDefaultMapper?: (errorString: string) => string
}

export type SdkCodeError = {
  code: SdkErrorCode
  messageArgs?: SdkMessageArgs
  originalError?: Error
}

function stringifyError(errorCode?: SdkErrorCode, errorMessage?: string, originalError?: Error | string) {
  return JSON.stringify(
    {
      errorCode,
      errorMessage,
      originalError,
    },
    null,
    2,
  )
}

function isApiError(args: SdkOriginalError) {
  return args.originalError && 'name' in args.originalError && args.originalError?.name === 'ApiError' // bypassing jest mock
}

export function isSdkError(error: Error | unknown): error is SdkError {
  return error instanceof SdkError
}

export class SdkError extends Error {
  readonly errorCode?: SdkErrorCode
  readonly errorMessage?: string
  readonly originalError?: Error | string

  constructor(args: SdkOriginalError | SdkCodeError) {
    let errorCode
    let originalError
    let errorMessage

    if ('code' in args) {
      errorCode = args.code
      if (args.originalError) {
        errorMessage = errorMessage = args?.originalError?.message
      } else {
        errorMessage = placeArgsToString(SdkErrorMessage.get(errorCode), args.messageArgs)
      }
    } else {
      if (args.originalError instanceof SdkError) {
        errorCode = args.originalError.errorCode
        originalError = args.originalError.originalError
        errorMessage = args.originalError.errorMessage
      } else if (isApiError(args)) {
        errorCode = SdkErrorCode.API_ERROR
        errorMessage = SdkErrorMessage.get(errorCode)
        originalError = args.originalError
      } else {
        const errorMessageAsString = args.originalErrorAsString
          ? args.originalErrorAsString
          : args.originalError?.toString()

        if (args.errorSubstringMapping) {
          const errorCodeFromMapping = args.errorSubstringMapping
            ? Object.keys(args.errorSubstringMapping).find(
              (k) => errorMessageAsString && errorMessageAsString.indexOf(k) !== -1,
            )
            : undefined
          errorCode = errorCodeFromMapping
            ? args.errorSubstringMapping[errorCodeFromMapping]
            : SdkErrorCode.COMMON_ERROR
        } else {
          errorCode = SdkErrorCode.COMMON_ERROR
        }

        originalError = args?.originalError?.message
        errorMessage = SdkErrorMessage.get(errorCode)
      }
    }

    super(stringifyError(errorCode, errorMessage, originalError))
    this.errorCode = errorCode
    this.errorMessage = errorMessage
    this.originalError = originalError
  }
}

export type SdkMessageArgs = (string | number)[]

export enum SdkErrorCode {
  API_ERROR = 'api.error',
  COMMON_ERROR = 'sdk.common.error',
  BTC_BASED_FEE_TOO_SMALL = 'btc-based.fee.too-small',
  BTC_BASED_UTXO_NOT_FOUND = 'btc-based.utxo.not-found',
  BTC_BASED_NO_INPUTS = 'btc-based.no.inputs',
  BTC_BASED_NOT_ENOUGH_BALANCE = 'btc-based.balance.not-enough',
  BTC_FEE_IS_TOO_LARGE = 'btc-based.fee.too-large',
  XRP_SECRET_DOES_NOT_MATCH = 'xrp.secret.does-not-match',
  FEE_TOO_SMALL = 'fee.too-small',
  TX_NOT_FOUND = 'tx.not.found',
  ADA_BASED_AMOUNT = 'ada.validation.amount',
  BTC_BASED_AMOUNT = 'btc-based.validation.amount',
  BTC_BASED_MISSING_PRIVATE_KEY = 'btc-based.validation.private-key.missing',
  BTC_BASED_WRONG_BODY = 'btc-based.validation.body.wrong-body',
  BTC_BASED_TX_PREPARATION_UTXO = 'transaction.preparation.failed.utxo',
  BTC_BASED_DESTINATION_LESS_THAN_ZERO = 'transaction.preparation.destination.less.than.zero',
  BTC_BASED_MNEMONIC_OR_KEYPAIR_EXPECTED = 'transaction.preparation.mnemonic.or.keypair.not.present',
  BTC_BASED_TX_FAILED = 'transaction.preparation.failed',
  BTC_BASED_BLOCKCHAIN_ERROR = 'transaction.preparation.blockchain.error',

  VALIDATION_AMOUNT = 'validation.amount',
  SECRET_CHECKSUM = 'validation.secret.checksum',
  VALIDATION_TO_ADDRESS = 'validation.to-address',

  TX_PREPARATION_FAILED = 'tx.preparation',

  // CARDANO
  FEE_CHANGE_ADDRESS = 'fee.change-address',

  // XLM
  XLM_NO_SEQUENCE = 'xlm.account.no-sequence',

  // FLOW
  FLOW_MISSING_PRIVATE_KEY = 'flow.private-key.missing',
  FLOW_MISSING_MNEMONIC = 'flow.mnemonic.missing',
  FLOW_MISSING_NETWORK = 'flow.network.missing',

  // CELO
  CELO_MISSING_CURRENCY = 'celo.missing.currency',
  CELO_MISSING_CONTRACT_ADDRESS = 'celo.missing.contract-address',
  CELO_NATIVE_CANNOT_PREPARE_TRANSFER_CELO_OR_CUSD_TX = 'celo.native.cannot.prepare.transfer-celo-or-cusd-tx',

  // SOLANA
  SOLANA_KMS_COMBINATION = 'solana.kms.combination',
  SOLANA_DECIMAL_PLACES = 'solana.amount.decimals',

  // ALGO
  ALGO_TOKEN_NAME_TOO_LONG = 'algo.token.name.too-long',

  // EVM General
  EVM_CANNOT_SIGN_TRANSACTION = 'evm-based.cannot.sign-transaction',
  EVM_CANNOT_ESTIMATE_GAS_LIMIT = 'evm-based.cannot.estimate-gas-limit',
  EVM_INVALID_ADDRESS_SINGLE = 'evm-based.invalid.single-address',
  EVM_INVALID_ADDRESS_ARRAY = 'evm-based.invalid.array-address',

  // EVM Native
  EVM_NATIVE_CANNOT_PREPARE_TRANSFER_TX = 'evm-based.native.cannot.prepare.transfer-tx',
  EVM_NATIVE_CANNOT_PREPARE_STORE_DATA_TX = 'evm-based.native.cannot.prepare.store-data-tx',

  // ERC20
  EVM_ERC20_CANNOT_PREPARE_DEPLOY_TX = 'evm-based.erc20.cannot.prepare.deploy-tx',
  EVM_ERC20_CANNOT_PREPARE_MINT_TX = 'evm-based.erc20.cannot.prepare.mint-tx',
  EVM_ERC20_CANNOT_PREPARE_TRANSFER_TX = 'evm-based.erc20.cannot.prepare.transfer-tx',
  EVM_ERC20_CANNOT_PREPARE_BURN_TX = 'evm-based.erc20.cannot.prepare.burn-tx',
  EVM_ERC20_CANNOT_PREPARE_APPROVE_TX = 'evm-based.erc20.cannot.prepare.approve-tx',

  // ERC721
  EVM_ERC721_CANNOT_PREPARE_DEPLOY_TX = 'evm-based.erc721.cannot.prepare.deploy-tx',
  EVM_ERC721_CANNOT_PREPARE_MINT_TX = 'evm-based.erc721.cannot.prepare.mint-tx',
  EVM_ERC721_CANNOT_PREPARE_MINT_CASHBACK_TX = 'evm-based.erc721.cannot.prepare.mint-cashback-tx',
  EVM_ERC721_CANNOT_PREPARE_MINT_MULTIPLE_CASHBACK_TX = 'evm-based.erc721.cannot.prepare.mint-multiple-cashback-tx',
  EVM_ERC721_CANNOT_PREPARE_MINT_MULTIPLE_TX = 'evm-based.erc721.cannot.prepare.mint-multiple-tx',
  EVM_ERC721_CANNOT_PREPARE_MINT_PROVENANCE_TX = 'evm-based.erc721.cannot.prepare.mint-provenance-tx',
  EVM_ERC721_CANNOT_PREPARE_MINT_MULTIPLE_PROVENANCE_TX = 'evm-based.erc721.cannot.prepare.mint-multiple-provenance-tx',
  EVM_ERC721_CANNOT_PREPARE_ADD_MINTER = 'evm-based.erc721.cannot.prepare.add-minter',
  EVM_ERC721_CANNOT_PREPARE_BURN_TX = 'evm-based.erc721.cannot.prepare.burn-tx',
  EVM_ERC721_CANNOT_PREPARE_TRANSFER_TX = 'evm-based.erc721.cannot.prepare.transfer-tx',
  EVM_ERC721_CANNOT_PREPARE_UPDATE_CASHBACK_TX = 'evm-based.erc721.cannot.prepare.update-cashback-tx',
  EVM_ERC721_CANNOT_PREPARE_MINT_ALREADY_MINTED = 'evm-based.erc721.cannot.prepare.mint-minted',

  // ERC1155
  EVM_ERC1155_CANNOT_PREPARE_DEPLOY_TX = 'evm-based.erc1155.cannot.prepare.deploy-tx',
  EVM_ERC1155_CANNOT_PREPARE_MINT_TX = 'evm-based.erc1155.cannot.prepare.mint-tx',
  EVM_ERC1155_CANNOT_PREPARE_MINT_BATCH_TX = 'evm-based.erc1155.cannot.prepare.mint-batch-tx',
  EVM_ERC1155_CANNOT_PREPARE_TRANSFER_TX = 'evm-based.erc1155.cannot.prepare.transfer-tx',
  EVM_ERC1155_CANNOT_PREPARE_TRANSFER_BATCH_TX = 'evm-based.erc1155.cannot.prepare.transfer-batch-tx',
  EVM_ERC1155_CANNOT_PREPARE_BURN_TX = 'evm-based.erc1155.cannot.prepare.burn-tx',
  EVM_ERC1155_CANNOT_PREPARE_BURN_BATCH_TX = 'evm-based.erc1155.cannot.prepare.burn-batch-tx',

  // Custodial
  EVM_CUSTODIAL_CANNOT_PREPARE_DEPLOY_TX = 'evm-based.custodial.cannot.prepare.deploy-tx',
  EVM_CUSTODIAL_CANNOT_PREPARE_TRANSFER_TX = 'evm-based.custodial.cannot.prepare.transfer-tx',
  EVM_CUSTODIAL_CANNOT_PREPARE_TRANSFER_BATCH_TX = 'evm-based.custodial.cannot.prepare.transfer-batch-tx',
  EVM_CUSTODIAL_CANNOT_PREPARE_APPROVE_TX = 'evm-based.custodial.cannot.prepare.approve-tx',

  //Gas Pump
  EVM_GAS_PUMP_CANNOT_PREPARE_DEPLOY_BATCH_TX = 'evm-based.custodial.cannot.prepare.deploy-batch-tx',

  // Smart Contract
  EVM_SMART_CONTRACT_CANNOT_PREPARE_TX = 'evm-based.smart-contract.cannot.prepare.tx',

  // KMS errors
  KMS_CHAIN_MISMATCH = 'kms.chain.mismatch',

  // Validation errors
  INSUFFICIENT_FUNDS = 'insufficient.funds.on.sender.account',
  EVM_TRANSACTION_ERROR = 'evm-based.smart-contract.transaction.error',
  PARAMETER_MISMATCH = 'parameter.mismatch',
}

// @TODO pass params?
export const SdkErrorMessage: Map<SdkErrorCode, string> = new Map([
  // General
  [SdkErrorCode.API_ERROR, `Error during api request`],
  [SdkErrorCode.COMMON_ERROR, `Error during execution`],
  [SdkErrorCode.FEE_TOO_SMALL, `Fee is too small`],
  [SdkErrorCode.VALIDATION_AMOUNT, `Amount has to be positive number`],
  [SdkErrorCode.TX_NOT_FOUND, `TX not found`],

  // BTC
  [SdkErrorCode.BTC_BASED_FEE_TOO_SMALL, `Fee is too small. Please make sure that amount to send < balance`],
  [
    SdkErrorCode.BTC_BASED_UTXO_NOT_FOUND,
    `UTXO with hash {0} and index {1} not found. Please check that outputs are valid`,
  ],
  [SdkErrorCode.BTC_BASED_NO_INPUTS, `Not found spendable inputs`],
  [SdkErrorCode.BTC_BASED_NOT_ENOUGH_BALANCE, `Not enough coins on addresses to perform this transaction`],
  [SdkErrorCode.BTC_FEE_IS_TOO_LARGE, `Fee is too big, make sure it's not a mistake`],
  [
    SdkErrorCode.BTC_BASED_AMOUNT,
    `Amount {0} is incorrect btc-based amount. Should be positive integer and have 8 decimal numbers max`,
  ],
  [
    SdkErrorCode.ADA_BASED_AMOUNT,
    `Amount {0} is incorrect ADA amount. Should be positive integer and have 6 decimal numbers max`,
  ],
  [SdkErrorCode.BTC_BASED_MISSING_PRIVATE_KEY, `Some of private keys is wrong or missing`],

  // XRP
  [SdkErrorCode.XRP_SECRET_DOES_NOT_MATCH, `Secret not valid or doesn't match address`],

  // XLM
  [SdkErrorCode.SECRET_CHECKSUM, `Secret is not valid. Please check your secret for typos`],
  [SdkErrorCode.VALIDATION_TO_ADDRESS, `To address is wrong`],
  [SdkErrorCode.XLM_NO_SEQUENCE, `Account does not contain sequence. Please check account info`],

  // FLOW
  [SdkErrorCode.FLOW_MISSING_PRIVATE_KEY, `No private key available`],
  [SdkErrorCode.FLOW_MISSING_MNEMONIC, `Mnemonic required`],
  [SdkErrorCode.FLOW_MISSING_NETWORK, `Network [testnet/mainnet] required`],

  // CELO
  [
    SdkErrorCode.CELO_MISSING_CURRENCY,
    `The target (to) address, currency, feeCurrency or the amount cannot be empty`,
  ],
  [SdkErrorCode.CELO_MISSING_CONTRACT_ADDRESS, `Contract address and fee currency should not be empty`],

  // SOLANA
  [
    SdkErrorCode.SOLANA_KMS_COMBINATION,
    'Either signatureId with feePayerSignatureId, or fromPrivateKey with feePayerPrivateKey must be present. Combination is not allowed.',
  ],

  // ALGO
  [SdkErrorCode.ALGO_TOKEN_NAME_TOO_LONG, 'Token name should not be more than 8 characters long'],

  // CARDANO
  [SdkErrorCode.FEE_CHANGE_ADDRESS, 'Fee and change address must be both set or both unset.'],

  // EVM
  [
    SdkErrorCode.EVM_INVALID_ADDRESS_SINGLE,
    `invalid address (argument="address", value="someinvalidaddress", code=INVALID_ARGUMENT, version=address/5.7.0) (argument="to", value="someinvalidaddress", code=INVALID_ARGUMENT, version=abi/5.7.0)`,
  ],
  [
    SdkErrorCode.EVM_INVALID_ADDRESS_ARRAY,
    `invalid address (argument="address", value="someinvalidaddress", code=INVALID_ARGUMENT, version=address/5.7.0) (argument=null, value="someinvalidaddress", code=INVALID_ARGUMENT, version=abi/5.7.0)`,
  ],

  // ERC721
  [SdkErrorCode.EVM_ERC721_CANNOT_PREPARE_MINT_ALREADY_MINTED, `Token with provided tokenId already minted`],
])
