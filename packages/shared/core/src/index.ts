import { getDerivationPath } from './lib/derivation-path.common'
import { getNetworkConfig } from './lib/btc-based.network.common'

export * from './lib/models/Blockchain'
export * from './lib/models/ChainTransactionKMS'
export * from './lib/models/Currency'
export * from './lib/models/Fee'
export * from './lib/models/Fiat'
export * from './lib/models/PrivateKeyOrSignatureId'
export * from './lib/models/Web3'

export * from './lib/http.common'
export * from './lib/contract.common'
export * from './lib/blockchain.common'
export * from './lib/derivation-path.common'
export * from './lib/btc-based.network.common'
export * from './lib/address.common'
export * from './lib/third-party.common'

export const blockchainUtils = {
  getDerivationPath,
  getNetworkConfig,
}
