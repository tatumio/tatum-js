/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Account } from '../models/Account';
import type { CreateSubscriptionBalance } from '../models/CreateSubscriptionBalance';
import type { CreateSubscriptionIncoming } from '../models/CreateSubscriptionIncoming';
import type { CreateSubscriptionInterval } from '../models/CreateSubscriptionInterval';
import type { CreateSubscriptionKMSError } from '../models/CreateSubscriptionKMSError';
import type { CreateSubscriptionKMSSuccess } from '../models/CreateSubscriptionKMSSuccess';
import type { CreateSubscriptionNotification } from '../models/CreateSubscriptionNotification';
import type { CreateSubscriptionOffchain } from '../models/CreateSubscriptionOffchain';
import type { CreateSubscriptionPartialTradeMatch } from '../models/CreateSubscriptionPartialTradeMatch';
import type { CreateSubscriptionPending } from '../models/CreateSubscriptionPending';
import type { CreateSubscriptionTradeMatch } from '../models/CreateSubscriptionTradeMatch';
import type { CreateSubscriptionTxInTheBlock } from '../models/CreateSubscriptionTxInTheBlock';
import type { EntitiesCount } from '../models/EntitiesCount';
import type { HmacWebHook } from '../models/HmacWebHook';
import type { Id } from '../models/Id';
import type { Subscription } from '../models/Subscription';
import type { Transaction } from '../models/Transaction';
import type { WebHook } from '../models/WebHook';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class NotificationSubscriptionsService {

    /**
     * Create a subscription
     * <p><b>2 credits per API call + credits spent on subscriptions themselves<br/>
     * Each subscription type consumes a different number of credits.</b></p>
     * <p>Create a subscription as an HTTP web hook.</p>
     * <p>The following subscription types are available:</p>
     * <ul>
     * <li><b>ADDRESS_TRANSACTION</b> - Enable HTTP POST JSON notifications for any blockchain transaction (both incoming and outgoing) at a specified address. This notification applies to transactions in the native blockchain currency or with any type of blockchain tokens.<br/>
     * - For <b>EMV-based blockchains</b> (ETH), this web hook is first invoked when a transaction appears in the mempool, and then it is invoked again once the transaction is added to a block.<br/>
     * - For the <b>other blockchains</b>, this webhook is invoked when a transaction is added to a block.<br/>
     * Free community plans can monitor up to 10 addresses per plan.<br/>
     * The following table describes the availability of this notification type on different blockchains and the credit consumption:<br/>
     * <table>
     * <tr>
     * <th>Chain</th>
     * <th>Testnet/Mainnet</th>
     * <th>Token assets support</th>
     * <th>Plan limitation</th>
     * <th>Credit consumption / day / address</th>
     * </tr>
     * <tr>
     * <td>Solana</td>
     * <td>Yes/Yes</td>
     * <td>SOL, SPL and NFTs</td>
     * <td>Free plans - 10 addresses across all blockchains, Paid plans - unlimited addresses across all blockchains</td>
     * <td>50 credits / day / address</td>
     * </tr>
     * <tr>
     * <td>Ethereum</td>
     * <td>Yes/Yes</td>
     * <td>ETH, Internal transfers, ERC20, ERC721, ERC1155</td>
     * <td>Free plans - 10 addresses across all blockchains, Paid plans - unlimited addresses across all blockchains</td>
     * <td>25 credits / day / address</td>
     * </tr>
     * <tr>
     * <td>Polygon</td>
     * <td>Yes/Yes</td>
     * <td>MATIC, ERC20, ERC721, ERC1155</td>
     * <td>Free plans - 10 addresses across all blockchains, Paid plans - unlimited addresses across all blockchains</td>
     * <td>40 credits / day / address</td>
     * </tr>
     * <tr>
     * <td>Celo</td>
     * <td>Yes/Yes</td>
     * <td>CELO, Internal transfers, ERC20, ERC721, ERC1155</td>
     * <td>Free plans - 10 addresses across all blockchains, Paid plans - unlimited addresses across all blockchains</td>
     * <td>25 credits / day / address</td>
     * </tr>
     * <tr>
     * <td>Klaytn</td>
     * <td>Yes/Yes</td>
     * <td>Klay, ERC20, ERC721, ERC1155</td>
     * <td>Free plans - 10 addresses across all blockchains, Paid plans - unlimited addresses across all blockchains</td>
     * <td>25 credits / day / address</td>
     * </tr>
     * <tr>
     * <td>Bitcoin</td>
     * <td>Yes/Yes</td>
     * <td>BTC</td>
     * <td>Free plans - 10 addresses across all blockchains, Paid plans - unlimited addresses across all blockchains</td>
     * <td>20 credits / day / address</td>
     * </tr>
     * <tr>
     * <td>Litecoin</td>
     * <td>Yes/Yes</td>
     * <td>LTC</td>
     * <td>Free plans - 10 addresses across all blockchains, Paid plans - unlimited addresses across all blockchains</td>
     * <td>20 credits / day / address</td>
     * </tr>
     * <tr>
     * <td>Bitcoin Cash</td>
     * <td>Yes/Yes</td>
     * <td>BCH, only incoming transactions</td>
     * <td>Free plans - 10 addresses across all blockchains, Paid plans - unlimited addresses across all blockchains</td>
     * <td>20 credits / day / address</td>
     * </tr>
     * <tr>
     * <td>Dogecoin</td>
     * <td>Yes/Yes</td>
     * <td>DOGE, only incoming transactions</td>
     * <td>Free plans - 10 addresses across all blockchains, Paid plans - unlimited addresses across all blockchains</td>
     * <td>20 credits / day / address</td>
     * </tr>
     * <tr>
     * <td>Tron</td>
     * <td>Yes/Yes</td>
     * <td>Tron, TRC10/TRC20</td>
     * <td>Free plans - 10 addresses across all blockchains, Paid plans - unlimited addresses across all blockchains</td>
     * <td>30 credits / day / address</td>
     * </tr>
     * <tr>
     * <td>Binance Smart Chain</td>
     * <td>Yes/Yes</td>
     * <td>BSC, BEP20, ERC721, ERC1155</td>
     * <td>Free plans - 10 addresses across all blockchains, Paid plans - unlimited addresses across all blockchains</td>
     * <td>40 credits / day / address</td>
     * </tr>
     * </table>
     * The request body of the POST request is a JSON object with the following structure:<br/>
     * <pre>{
         * "address": "FykfMwA9WNShzPJbbb9DNXsfgDgS3XZzWiFgrVXfWoPJ", // the address on which the transaction occurs; for EVM-based chains, this is the recipient's address
         * "txId": "2rdy3YCZHSwvpWtuDom1d4Jjy5UU9STLxF3ffXau6GToReDkfw8wEgX541fvzvh6btVC5D8iNapcKTXfPsoDBk7A", // the transaction ID
         * "blockNumber": 110827114, // the block number; does not appear if the transaction is in the mempool (for EMV-based blockchains)
         * "asset": "3gUeeR3BfVhukYJMwtHownRtRkGcf1bvwiV8TbKMZBVz", // the asset of the transaction: for token assets, this is the token address; for native blochckain assets, this is the name of the asset (for example, SOL)
         * "amount": "1", // the amount of the asset that was credited to (+) or debited from (-) the address; for EVM-based chains, when "counterAddress" is present, the amount is always positive
         * "tokenId": "1", // (ERC-721 / ERC-1155 only) the ID of the transferred token
         * "type": "token", // the type of the transaction; can be either "native" or "token"
         * "mempool": true, // (EMV-based blockchains only) if appears and set to "true", the transaction is in the mempool; if set to "false" or does not appear at all, the transaction has been added to a block
         * "counterAddress": undefined // an optional counter party address of the transaction; for EVM-based blockchains, this is the recipient's address
         * }</pre>
         * 5 credits are debited for each fired web hook.<br/></li>
         * <li><b>ACCOUNT_INCOMING_BLOCKCHAIN_TRANSACTION</b> - Enable HTTP POST JSON notifications about incoming blockchain transactions on virtual accounts.
         * This web hook is invoked when an incoming transaction is reflected on the balance of the virtual account (the balance is credited with the transaction amount). This happens when the transaction has the sufficient number of blockchain confirmations: two confirmations for BTC, LTC, BCH, and DOGE, and one confirmation for the other blockchains.<br/>
         * The request body of the POST request is a JSON object with the following structure:
         * <pre>{
             * "date": 1619176527481,
             * "amount": "0.005",
             * "currency": "BTC",
             * "accountId": "6082ab462936b4478117c6a0",
             * "reference: "c9875708-4ba3-41c9-a4cd-271048b41b9a", // the reference of the transaction in the virtual account
             * "txId": "45af182a0ffab58e5ba32fee57b297b2260c6e23a1de5ddc76c7ee22d72dea99",
             * "blockHash": "45af182a0ffab58e5ba32fee57b297b2260c6e23a1de5ddc76c7ee22d72dea99", // the hash of the block, might not be present every time
             * "blockHeight": 12345,
             * "from": "SENDER_ADDRESS", // might not be present every time; not present for UTXO-based blockchains
             * "to": "RECIPIENT_ADDRESS_CONNECTED_TO_LEDGER_ACCOUNT", // the blockchain address of the recipient
             * "index": 5 // for UTXO-based blockchains (ADA, BCH, BTC, DOGE, LTC), this is the index of the output in the transaction
             * }</pre>
             * 1 credit is debited for each monitored account every day.</li>
             * <li><b>ACCOUNT_PENDING_BLOCKCHAIN_TRANSACTION</b> - Enable HTTP POST JSON notifications about incoming blockchain transactions on virtual accounts.<br />
             * This web hook is supported only for ADA, BCH, BTC, DOGE, ETH, and LTC accounts.<br />
             * - For <b>BTC-based blockchains</b> (ADA, BCH, BTC, DOGE, and LTC), this web hook is invoked when an incoming transaction appears in a block for the first time. At that time, the transaction has one confirmation but this is not enough for the transaction to be reflected on the balance of the virtual account yet. Instead, a deposit corresponding to the pending transaction with a status of "in progress" appears on the virtual account. Once the transaction is added to the block, the deposit's status changes to "done", and the account balance gets updated.<br />
             * - For <b>EMV-based blockchains</b> (ETH), this web hook is invoked when an incoming transaction appears in the mempool. The virtual account balance is not updated until the transaction is added to a block. Instead, a deposit corresponding to the pending transaction with a status of "in progress" appears on the virtual account. Once the transaction is added to the block, the deposit's status changes to "done", and the account balance gets updated.<br />
             * The request body of the POST request is a JSON object with the following structure:<br/>
             * <pre>{
                 * "date": 1619176527481,
                 * "amount": "0.005",
                 * "currency": "BTC",
                 * "accountId": "6082ab462936b4478117c6a0",
                 * "reference: "c9875708-4ba3-41c9-a4cd-271048b41b9a", // the reference of the transaction in the virtual account
                 * "txId": "45af182a0ffab58e5ba32fee57b297b2260c6e23a1de5ddc76c7ee22d72dea99",
                 * "blockHash": "45af182a0ffab58e5ba32fee57b297b2260c6e23a1de5ddc76c7ee22d72dea99", // the hash of the block, might not be present every time; if set to "null", the transaction is in the mempool (for EMV-based blockchains)
                 * "blockHeight": 12345, // if set to "null", the transaction is in the mempool (for EMV-based blockchains)
                 * "from": "SENDER_ADDRESS", // might not be present every time; not present for UTXO-based blockchains (ADA, BCH, BTC, DOGE, LTC)
                 * "to": "RECIPIENT_ADDRESS_CONNECTED_TO_LEDGER_ACCOUNT", // the blockchain address of the recipient
                 * "index": 5 // for UTXO-based blockchains (ADA, BCH, BTC, DOGE, LTC), this is the index of the output in the transaction
                 * }</pre>
                 * 1 credit is debited for each monitored account every day.</li>
                 * <li><b>CUSTOMER_TRADE_MATCH</b> - Enable HTTP POST JSON notifications on closed trade, which occurs on any customer account.
                 * This web hook will be invoked, when the open trade is filled and closed. Works also for the Trade Futures. If is triggered by the futures, bool field expiredWithoutMatch is present.
                 * Request body of the POST request will be JSON object with attributes:<br/>
                 * <pre>{
                     * "created": 1619176527481,
                     * "amount": "0.005",
                     * "price": "0.02",
                     * "type": "SELL",
                     * "pair": "VC_CHF/VC_CHF3",
                     * "id": "6082ab462936b4478117c6a0", // id of the trade
                     * "currency1AccountId": "6082ab462936b4478117c6a0",
                     * "currency2AccountId": "6082ab512936b4478117c6a2",
                     * "fee": null,
                     * "feeAccountId": null,
                     * "isMaker": true,
                     * "expiredWithoutMatch": false
                     * }</pre>
                     * 10 credits will be debited for every monitored customer every day.</li>
                     * <li><b>CUSTOMER_PARTIAL_TRADE_MATCH</b> - Enable HTTP POST JSON notifications on partialy filled trade, which occurs on any customer account.
                     * This web hook will be invoked, when the open trade is partialy filled.
                     * Request body of the POST request will be JSON object with attributes:<br/>
                     * <pre>{
                         * "created": 1619176527481,
                         * "amount": "0.005",
                         * "orderAmount": "0.1",
                         * "price": "0.02",
                         * "type": "SELL",
                         * "pair": "VC_CHF/VC_CHF3",
                         * "id": "6082ab462936b4478117c6a0", // id of the trade
                         * "currency1AccountId": "6082ab462936b4478117c6a0",
                         * "currency2AccountId": "6082ab512936b4478117c6a2",
                         * "fee": null,
                         * "feeAccountId": null,
                         * "isMaker": true,
                         * "expiredWithoutMatch": false
                         * }</pre>
                         * 10 credits will be debited for every monitored customer every day.</li>
                         * <li><b>TRANSACTION_IN_THE_BLOCK</b> - Enable HTTP POST JSON notifications on ledger => blockchain transaction, when transaction is included in the block.
                         * This web hook will be invoked, when the outgoing transaction is included in the block.
                         * Request body of the POST request will be JSON object with attributes:<br/>
                         * <pre>
                         * {
                             * "txId": "0x026f4f05b972c09279111da13dfd20d8df04eff436d7f604cd97b9ffaa690567",
                             * "reference": "90270634-5b07-4fad-b17b-f82899953533",
                             * "accountId": "6086ed0744c45b24d4fbd039",
                             * "currency": "BSC",
                             * "withdrawalId": "608fe5b73a893234ba379ab2",
                             * "address": "0x8ce4e40889a13971681391AAd29E88eFAF91f784",
                             * "amount": "0.1",
                             * "blockHeight": 8517664
                             * }</pre>
                             * 10 credits will be debited every day, 1 credit for every included transaction notified via web hook.</li>
                             * <li><b>KMS_FAILED_TX</b> - Enable HTTP POST JSON notifications on error during KMS signature process.
                             * This web hook will be invoked, when the Tatum KMS receives error during processing transactions.
                             * Request body of the POST request will be JSON object with attributes:<br/>
                             * <pre>{
                                 * "signatureId": "6082ab462936b4478117c6a0",
                                 * "error": "Error message from the KMS"
                                 * }</pre>
                                 * 10 credits will be debited every day.</li>
                                 * <li><b>KMS_COMPLETED_TX</b> - Enable HTTP POST JSON notifications on successful completion of KMS signature process.
                                 * This web hook will be invoked, when the Tatum KMS successfully completes the signature during processing transactions.
                                 * Request body of the POST request will be JSON object with attributes:<br/>
                                 * <pre>{
                                     * "signatureId": "6082ab462936b4478117c6a0",
                                     * "txId": "0x7bb7d3b90567e89f999f2e3d263bc3738a018dbbcfa9f5397678cf17cdf0235f"
                                     * }</pre>
                                     * 10 credits will be debited every day.</li>
                                     * <li><b>OFFCHAIN_WITHDRAWAL</b> - Off-chain scanning of outgoing transactions for BTC, BCH, LTC, DOGE and ETH blockchains - by default addresses in registered for off-chain
                                     * scanning are synchronized only against incoming transactions. By enabling this feature, off-chain accounts with connected blockchain addresses
                                     * will be scanned also for outgoing transactions. This transaction wil be recorder to the ledger and account balance will be decreased - don't use it if you perform your own transactions
                                     * from the account to the blockchain.<br/>
                                     * 20 credits will be debited for every address registered for scanning every day.</li>
                                     * <li><b>ACCOUNT_BALANCE_LIMIT</b> - Report with all account balances above desired limit.</li>
                                     * <li><b>TRANSACTION_HISTORY_REPORT</b> - Report with all ledger transactions for last X hours, where X is set by the subscription attribute as interval.
                                     * Maximum number of transactions returned by this report is 20000. Transactions are obtained from the time of the invocation of the GET method to obtain report - X hours.</li>
                                     * </ul>
                                     * In case of unsuccesful web hook response status - other then 2xx - web hook is repeated 9 more times with exponential backoff.
                                     * Parameters are T = 15 * 2.7925^9, where 15 is interval in s, backoff rate is 2.7925 and 9 is current number of retries. Last web hook is fired after 24 hours approximatelly. After last failed attempt, web hook is deleted from our system. The 2xx response must be returned in 10 seconds after web hook is fired.<br/>
                                     * Result of the operation is subscription ID, which can be used to cancel subscription or obtain additional data connected to it like reports.</p>
                                     *
                                     * @param requestBody
                                     * @returns Id OK
                                     * @throws ApiError
                                     */
                                    public static createSubscription(
                                        requestBody: (CreateSubscriptionNotification | CreateSubscriptionIncoming | CreateSubscriptionPending | CreateSubscriptionTradeMatch | CreateSubscriptionPartialTradeMatch | CreateSubscriptionKMSError | CreateSubscriptionKMSSuccess | CreateSubscriptionTxInTheBlock | CreateSubscriptionOffchain | CreateSubscriptionBalance | CreateSubscriptionInterval),
                                    ): CancelablePromise<Id> {
                                        return __request({
                                            method: 'POST',
                                            path: `/v3/subscription`,
                                            body: requestBody,
                                            mediaType: 'application/json',
                                            errors: {
                                                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                                                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                                                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                                                500: `Internal server error. There was an error on the server while processing the request.`,
                                            },
                                        });
                                    }

                                    /**
                                     * List all active subscriptions
                                     * <h4>1 credit per API call.</h4><br/><p>List all active subscriptions.</p>
                                     * @param pageSize Max number of items per page is 50.
                                     * @param offset Offset to obtain next page of the data.
                                     * @param address Value for filtering by address
                                     * @returns Subscription OK
                                     * @throws ApiError
                                     */
                                    public static getSubscriptions(
                                        pageSize: number,
                                        offset?: number,
                                        address?: string,
                                    ): CancelablePromise<Array<Subscription>> {
                                        return __request({
                                            method: 'GET',
                                            path: `/v3/subscription`,
                                            query: {
                                                'pageSize': pageSize,
                                                'offset': offset,
                                                'address': address,
                                            },
                                            errors: {
                                                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                                                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                                                500: `Internal server error. There was an error on the server while processing the request.`,
                                            },
                                        });
                                    }

                                    /**
                                     * Enable HMAC webhook digest
                                     * <h4>2 credits per API call.</h4><br/><p>Enable HMAC hash ID on the fired webhooks from Tatum API.
                                     * In order to make sure that a webhook is sent by us, we have the possibility to sign it with the HMAC Sha512 Hex algorithm.<br/>
                                     * To verify that a webhook is sent by us
                                     * <ol>
                                     * <li>Get a webhook <b>x-payload-hash</b> header value and payload as it is as a JSON file.</li>
                                     * <li>Convert the HTTP webhook body to stringify JSON without any spaces. In JavaScript, you would do it like this <pre>JSON.stringify(req.body)</pre></li>
                                     * <li>Perform calculations on your side to create a digest using Secret Key, webhook payload in bytes and HMAC SHA512 algorithm. JavaScript example:
                                     * <pre>require('crypto').createHmac('sha512', hmacSecret).update(JSON.stringify(req.body)).digest('base64')</pre>.</li>
                                     * <li>Compare x-payload-hash header value with calculated digest as a Base64 string.</li></p>
                                     *
                                     * @param requestBody
                                     * @returns void
                                     * @throws ApiError
                                     */
                                    public static enableWebHookHmac(
                                        requestBody: HmacWebHook,
                                    ): CancelablePromise<void> {
                                        return __request({
                                            method: 'PUT',
                                            path: `/v3/subscription`,
                                            body: requestBody,
                                            mediaType: 'application/json',
                                            errors: {
                                                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                                                500: `Internal server error. There was an error on the server while processing the request.`,
                                            },
                                        });
                                    }

                                    /**
                                     * Disable HMAC webhook digest
                                     * <h4>2 credits per API call.</h4><br/><p>Disable HMAC hash ID on the fired webhooks from Tatum API.</p>
                                     *
                                     * @returns void
                                     * @throws ApiError
                                     */
                                    public static disableWebHookHmac(): CancelablePromise<void> {
                                        return __request({
                                            method: 'DELETE',
                                            path: `/v3/subscription`,
                                            errors: {
                                                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                                                500: `Internal server error. There was an error on the server while processing the request.`,
                                            },
                                        });
                                    }

                                    /**
                                     * Count of found entities for get webhook request
                                     * <h4>1 credit per API call.</h4><br/><p>Count of subscriptions that were found from /v3/subscription</p>
                                     * @param pageSize Max number of items per page is 50.
                                     * @param offset Offset to obtain next page of the data.
                                     * @param address Value for filtering by address
                                     * @returns EntitiesCount OK
                                     * @throws ApiError
                                     */
                                    public static getSubscriptionsCount(
                                        pageSize: number,
                                        offset?: number,
                                        address?: string,
                                    ): CancelablePromise<EntitiesCount> {
                                        return __request({
                                            method: 'GET',
                                            path: `/v3/subscription/count`,
                                            query: {
                                                'pageSize': pageSize,
                                                'offset': offset,
                                                'address': address,
                                            },
                                            errors: {
                                                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                                                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                                                500: `Internal server error. There was an error on the server while processing the request.`,
                                            },
                                        });
                                    }

                                    /**
                                     * Cancel existing subscription
                                     * <h4>1 credit for API call</h4><br/><p>Cancel existing subscription.</p>
                                     * @param id Subscription ID
                                     * @returns void
                                     * @throws ApiError
                                     */
                                    public static deleteSubscription(
                                        id: string,
                                    ): CancelablePromise<void> {
                                        return __request({
                                            method: 'DELETE',
                                            path: `/v3/subscription/${id}`,
                                            errors: {
                                                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                                                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                                                500: `Internal server error. There was an error on the server while processing the request.`,
                                            },
                                        });
                                    }

                                    /**
                                     * Obtain report for subscription
                                     * <h4>1 credit for API call. Based on the required report type, additional credits may be charged.</h4><br/>
                                     * <p>Obtain report from subscription based on its type. Following reports are supported:
                                     * <ul>
                                     * <li><b>ACCOUNT_BALANCE_LIMIT</b> - obtain list of all ledger accounts with account balance above the limit. 1 credit per 50 returned records is charged.</li>
                                     * <li><b>TRANSACTION_HISTORY_REPORT</b> - obtain list of all ledger transaction for last X hours from the time of invocation. 1 credit per 50 returned records is charged.</li>
                                     * </ul></p>
                                     *
                                     * @param id Subscription ID
                                     * @returns any OK
                                     * @throws ApiError
                                     */
                                    public static getSubscriptionReport(
                                        id: string,
                                    ): CancelablePromise<(Array<Account> | Array<Transaction>)> {
                                        return __request({
                                            method: 'GET',
                                            path: `/v3/subscription/report/${id}`,
                                            errors: {
                                                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                                                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                                                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                                                500: `Internal server error. There was an error on the server while processing the request.`,
                                            },
                                        });
                                    }

                                    /**
                                     * List all executed webhooks
                                     * <h4>1 credit per API call.</h4><br/><p>List all webhooks.</p>
                                     * @param pageSize Max number of items per page is 50.
                                     * @param offset Offset to obtain the next page of data.
                                     * @param direction Direction of sorting
                                     * @param failed Flag indicating whether the webhook was successful or not
                                     * @returns WebHook OK
                                     * @throws ApiError
                                     */
                                    public static getAllWebhooks(
                                        pageSize: number,
                                        offset?: number,
                                        direction?: 'asc' | 'desc',
                                        failed?: boolean,
                                    ): CancelablePromise<Array<WebHook>> {
                                        return __request({
                                            method: 'GET',
                                            path: `/v3/subscription/webhook`,
                                            query: {
                                                'pageSize': pageSize,
                                                'offset': offset,
                                                'direction': direction,
                                                'failed': failed,
                                            },
                                            errors: {
                                                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                                                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                                                500: `Internal server error. There was an error on the server while processing the request.`,
                                            },
                                        });
                                    }

                                    /**
                                     * Count of found entities for get webhook request
                                     * <h4>1 credit per API call.</h4><br/><p>Count of webhooks that were found from /v3/subscription/webhook</p>
                                     * @param pageSize Max number of items per page is 50.
                                     * @param offset Offset to obtain the next page of data.
                                     * @param direction Direction of sorting
                                     * @param failed Flag indicating whether the webhook was successful or not
                                     * @returns EntitiesCount OK
                                     * @throws ApiError
                                     */
                                    public static getAllWebhooksCount(
                                        pageSize: number,
                                        offset?: number,
                                        direction?: 'asc' | 'desc',
                                        failed?: boolean,
                                    ): CancelablePromise<EntitiesCount> {
                                        return __request({
                                            method: 'GET',
                                            path: `/v3/subscription/webhook/count`,
                                            query: {
                                                'pageSize': pageSize,
                                                'offset': offset,
                                                'direction': direction,
                                                'failed': failed,
                                            },
                                            errors: {
                                                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                                                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                                                500: `Internal server error. There was an error on the server while processing the request.`,
                                            },
                                        });
                                    }

                                }