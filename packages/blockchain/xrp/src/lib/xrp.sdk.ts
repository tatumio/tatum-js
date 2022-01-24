import {BlockchainXrpService} from '@tatumio/api-client'
import {SDKArguments} from '@tatumio/abstract-sdk'
import {abstractBlockchainSdk} from "@tatumio/shared-blockchain-abstract";
import {Blockchain} from "@tatumio/shared-core";

const blockchain = Blockchain.XRP

export const TatumXrpSDK = (args: SDKArguments) => {
  const api = BlockchainXrpService

  return {
    ...abstractBlockchainSdk({...args, blockchain }),
    api,
    blockchain: {
      wallet: BlockchainXrpService.xrpWallet,
      broadcast: BlockchainXrpService.xrpBroadcast,
      getLastClosedLedger: BlockchainXrpService.xrpGetLastClosedLedger,
      getFee: BlockchainXrpService.xrpGetFee,
      getAccountTx: BlockchainXrpService.xrpGetAccountTx,
      getLedger: BlockchainXrpService.xrpGetLedger,
      get: BlockchainXrpService.xrpGetTransaction,
      getAccountInfo: BlockchainXrpService.xrpGetAccountInfo,
      getAccountBalance: BlockchainXrpService.xrpGetAccountBalance,
      transferBlockchain: BlockchainXrpService.xrpTransferBlockchain,
      trustLineBlockchain: BlockchainXrpService.xrpTrustLineBlockchain,
      accountSettings: BlockchainXrpService.xrpAccountSettings,
    }
  }
}
