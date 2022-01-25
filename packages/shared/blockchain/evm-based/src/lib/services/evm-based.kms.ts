import { EvmBasedBlockchain } from '@tatumio/shared-core';
import { EvmBasedWeb3 } from './evm-based.web3';

export interface EvmBasedKMSServiceArgs {
  blockchain: EvmBasedBlockchain;
  web3: EvmBasedWeb3
}
