import { EvmBasedWeb3, gasPump } from '@tatumio/shared-blockchain-evm-based'
import { EvmBasedBlockchain } from '@tatumio/shared-core'
import { oneCustodial } from './one.custodial'
import { oneErc20 } from './one.erc20'
import { oneErc721 } from './one.erc721'
import { oneMarketplace } from './one.marketplace'
import { oneMultiToken } from './one.multitoken'
import { oneNative } from './one.native'
import { oneSmartContract } from './one.smartContract'
import { oneGasPump } from './one.gasPump'

export const oneTxService = (args: { blockchain: EvmBasedBlockchain; web3: EvmBasedWeb3 }) => {
  return {
    native: oneNative(args),
    erc20: oneErc20(args),
    erc721: oneErc721(args),
    marketplace: oneMarketplace(args),
    multiToken: oneMultiToken(args),
    custodial: oneCustodial(args),
    gasPump: oneGasPump(args),
    smartContract: oneSmartContract(args),
  }
}
