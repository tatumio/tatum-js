import { BroadcastFunction } from '@tatumio/shared-blockchain-abstract';
import { EvmBasedBlockchain } from '@tatumio/shared-core';
import { EvmBasedWeb3 } from '../../services/evm-based.web3';

export const erc721 = (args: {
  blockchain: EvmBasedBlockchain
  web3: EvmBasedWeb3
  broadcastFunction: BroadcastFunction
}) => {
  return {
    prepare: {
      mintSignedTransaction: undefined,
      mintCashbackSignedTransaction: undefined,
      mintMultipleCashbackSignedTransaction: undefined,
      mintMultipleSignedTransaction: undefined,
      burnSignedTransaction: undefined,
      transferSignedTransaction: undefined,
      updateCashbackForAutherSignedTransaction: undefined,
      deploySignedTransaction: undefined,
    },
    send: {
      mintSignedTransaction: undefined,
      mintCashbackSignedTransaction: undefined,
      mintMultipleCashbackSignedTransaction: undefined,
      mintMultipleSignedTransaction: undefined,
      burnSignedTransaction: undefined,
      transferSignedTransaction: undefined,
      updateCashbackForAutherSignedTransaction: undefined,
      deploySignedTransaction: undefined,
    }
  }
}
