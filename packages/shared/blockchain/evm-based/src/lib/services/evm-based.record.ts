import {
  BlockchainRecordService,
  CancelablePromise,
  CreateRecord,
  CreateRecordCelo,
  TransactionHash,
} from '@tatumio/api-client'
import { Blockchain, blockchainHelper } from '@tatumio/shared-core'

export type RequestBody = CreateRecord | CreateRecordCelo
export type RequestBodyWithoutChain = Omit<CreateRecord, 'chain'> | Omit<CreateRecordCelo, 'chain'>

export const evmBlockchainRecord = (args: { blockchain: Blockchain }) => {
  return {
    // @TODO OPENAPI bug
    /**
     * Get log record
     * <h4>1 credit per API call.</h4><br/><p>Gets log data from blockchain.</p>
     * @param chain The blockchain to get the log record from
     * @param id ID of the log record / transaction on the blockchain
     * @returns any OK
     * @throws ApiError
     */
    getLog(id: string): CancelablePromise<{
      /**
       * Data stored in the record.
       */
      data: string
    }> {
      // @ts-ignore
      return BlockchainRecordService.getLog(args.blockchain, id)
    },

    /**
     * Store log record
     * <h4>2 credits per API call. Additional credits are debited based on the size of the stored data and the type of blockchain.</h4><br/>
     * <p>Stores record data on blockchain. Tatum currently supports the Ethereum, CELO, MATIC, ONE, XDC, Quorum, BSC, EGLD and Hyperledger Fabric blockchain and Quorum to store data.<br/>
     * The total cost of the transaction (in credits) on the Ethereum blockchain is dependent on the size of the data. Data are stored as a HEX string and the maximum data size is approximatelly 130 kB on mainnet, 30 kB on testnet.<br/>
     * Every 5 characters of data costs 1 credit, so an API call with a data of length 1 kB = 1024 characters and would cost 205 credits.
     * </p>
     *
     * @param requestBody
     * @returns TransactionHash OK
     * @throws ApiError
     */
    storeLog(requestBody: RequestBodyWithoutChain): CancelablePromise<TransactionHash> {
      return BlockchainRecordService.storeLog({
        ...requestBody,
        // @ts-ignore @TODO
        chain: blockchainHelper.getDefaultCurrencyByBlockchain(args.blockchain),
      })
    },
  }
}
