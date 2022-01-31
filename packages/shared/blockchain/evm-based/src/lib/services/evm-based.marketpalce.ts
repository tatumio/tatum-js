import { GenerateMarketplace } from '@tatumio/api-client';
import { BroadcastFunction } from '@tatumio/shared-blockchain-abstract';
import { EvmBasedBlockchain } from '@tatumio/shared-core';
import { listing } from '../transactions/marketplace/listings';
import { EvmBasedWeb3 } from './evm-based.web3';

export const marketplace = (args: {
  blockchain: EvmBasedBlockchain
  web3: EvmBasedWeb3
  broadcastFunction: BroadcastFunction
}) => {
  return {
    listing: {
      prepare: (body: GenerateMarketplace, provider?: string) =>
        listing(args).prepare.deploySignedTransaction(body, provider),
      deploy: (body: GenerateMarketplace, provider?: string) =>
        listing(args).send.deploySignedTransaction(body, provider)
    }
  }
}