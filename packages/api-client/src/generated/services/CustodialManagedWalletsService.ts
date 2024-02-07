/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CustodialManagedAddress } from '../models/CustodialManagedAddress';
import type { TransactionHash } from '../models/TransactionHash';
import type { TransferManagedAddress } from '../models/TransferManagedAddress';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class CustodialManagedWalletsService {

    /**
     * Create managed address
     * <h4>2 credits per API call, 10 credits for each managed wallet every day.</h4><br/>
     * <p>Create new managed address for a specific chain. If the address is mainnet or testnet one depends on the API Key - testnet API Key manages testnet addresses, mainnet API Key manages mainnet addresses.
     * Result of the operation is address and walletId, which is used for identifying the wallet later on and/or exporting the private key if needed.<br/>
     * Free users can manage only 10 addresses per API Key.
     * </p>
     *
     * @param requestBody
     * @returns CustodialManagedAddress OK
     * @throws ApiError
     */
    public static custodialCreateWallet(
        requestBody?: {
            chain: 'BSC' | 'ETH' | 'KLAY' | 'ONE' | 'CELO' | 'MATIC' | 'SOL' | 'LTC' | 'BTC';
        },
    ): CancelablePromise<CustodialManagedAddress> {
        return __request({
            method: 'POST',
            path: `/v3/custodial/wallet`,
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get managed addresses
     * <h4>1 credit per API call.</h4><br/>
     * <p>Get all managed addresses for an API Key.</p>
     *
     * @returns CustodialManagedAddress OK
     * @throws ApiError
     */
    public static custodialGetWallets(): CancelablePromise<Array<CustodialManagedAddress>> {
        return __request({
            method: 'GET',
            path: `/v3/custodial/wallet`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Get managed address
     * <h4>1 credit per API call.</h4><br/>
     * <p>Get managed address for an API Key. It's possible to export the private key, if query parameter <b>export</b> is set to true.</p>
     *
     * @param id WalletID of the managed address
     * @param _export If set to "true", returns the private key in the response; if not set, defaults to "false" (the private key is not included in the response)
     * @returns CustodialManagedAddress OK
     * @throws ApiError
     */
    public static custodialGetWallet(
        id: string,
        _export: boolean = false,
    ): CancelablePromise<Array<CustodialManagedAddress>> {
        return __request({
            method: 'GET',
            path: `/v3/custodial/wallet/${id}`,
            query: {
                'export': _export,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Delete managed address
     * <h4>1 credit per API call.</h4><br/>
     * <p>Delete managed address. Once deleted, the address won't be charged in a daily credit usage, but it <b>won't be possible to get the private key</b> for it.</p>
     *
     * @param id WalletID of the managed address
     * @returns void
     * @throws ApiError
     */
    public static custodialDeleteWallet(
        id: string,
    ): CancelablePromise<void> {
        return __request({
            method: 'DELETE',
            path: `/v3/custodial/wallet/${id}`,
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Sign and transfer using managed address
     * <h4>2 credits per API call, additional credits are charged for each gas covered operation.</h4><br/>
     * <p>Sign transaction and transfer assets from a custodial managed address.<br/>
     * Supported chains:
     * <ul>
     * <li><b>Solana</b></li>
     * </ul>
     * <br/>
     * Logic for <b>Solana</b><br/>
     * In Solana, it's possible to cover the fees connected to any arbitrary transaction by a third party.
     * Tatum can cover these fees for any transaction on the Solana blockchain - transfer of SOL, SPL tokens, minting or transferring NFTs or invoking programs.
     * In order to do this, Tatum fee address must be used as a feePayer address during transaction creation:
     * <table>
     * <tr><td></td><td><b>Mainnet address</b></td><td><b>Devnet address</b></td></tr>
     * <tr><td><b>Address</b></td><td>DSpHmb7hLnetoybammcJBJiyqMVR3pDhCuW6hqVg9eBF</td><td>DSpHmb7hLnetoybammcJBJiyqMVR3pDhCuW6hqVg9eBF</td></tr>
     * </table>
     * Once transaction is constructed using <a href="https://github.com/solana-labs/solana-web3.js/" target="_blank">Solana SDK</a>, it can be serialized to HEX data string, which is then passed to the API and signed.<br/>
     * Transaction could require multiple private keys for signing - fee payer, sender of the SOL assets, minting key during NFT mint operation etc.
     * Some of the keys are used in Tatum - fee payer, or, in case of managed wallet holding SOL assets, the key of that managed wallet - those must be referenced in a list of walletIds to be used.
     * For external keys, which are not managed by Tatum, those could either sign the transaction before it's serialization, or could be passed to the API in it's raw form - this is OK only for keys, which could be exposed and there is no harm of loosing assets on them.<br/>
     * How to partially sign the transaction could be found <a href="https://solanacookbook.com/references/offline-transactions.html#partial-sign-transaction" target="_blank">here</a>.<br/>
     * <b>Fee payer key is used by default, doesn't have to be mentioned in the list of wallets used for signing.</b><br/><br/>
     * <b>Examples of different transaction payloads.</b><br/><br/>
     * 1. Send SOL from account HrJtQTy2RW9c6y41RvN8x3bEiD6Co74AuhER2MGCpa58 to FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU
     * <pre>
     * import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, Connection } from '@solana/web3.js'
     *
     * const connection = new Connection('https://api.tatum.io/v3/blockchain/node/SOL')
     * const from = 'HrJtQTy2RW9c6y41RvN8x3bEiD6Co74AuhER2MGCpa58'
     * const to = 'FZAS4mtPvswgVxbpc117SqfNgCDLTCtk5CoeAtt58FWU'
     * const amount = '0.000001'
     * const devnet_fee_payer = '5zPr5331CtBjgVeLedhmJPEpFaUsorLCnb3aCQPsUc9w'
     * const fromPubkey = new PublicKey(from)
     * const transaction = new Transaction({ feePayer: new PublicKey(devnet_fee_payer) })
     * transaction.add(
         * SystemProgram.transfer({
             * fromPubkey: fromPubkey,
             * toPubkey: new PublicKey(to),
             * lamports: new BigNumber(amount).multipliedBy(LAMPORTS_PER_SOL).toNumber(),
             * }),
             * )
             * const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash('finalized')
             * transaction.recentBlockhash = blockhash
             * transaction.lastValidBlockHeight = lastValidBlockHeight
             * transaction.partialSign(...signers)
             * return transaction.serialize({ requireAllSignatures: false }).toString('hex')
             * </pre>
             * For the above example, developer have 2 options how to sign transaction - if the sender address HrJtQTy2RW9c6y41RvN8x3bEiD6Co74AuhER2MGCpa58 is managed using a Tatum managed wallet with id 0b1eae3d-2520-4903-8bbf-5dec3ad2a5d4,
             * the final payload to the custodial/transaction endpoint should look like this:
             * <pre>
             * {
                 * "chain": "SOL",
                 * "txData": "020001044a22af97a838a504e6f7c0b18d779afcea612da50794cc1dac641861fc1ab14afa5cacaf91c298694e64bb5496916c3c68a32affb92d4bcd2736fbb00169d57bd840de2a454960308f688cd3ee308c1fa01ecfa0b03770aaaf3b52d71d46c31d000000000000000000000000000000000000000000000000000000000000000060d38e0da20dc5900b7e902c918eae6a95e2d90af154b53a422f4ab26b050f4f01030201020c02000000e803000000000000",
                 * "walletIds": [
                     * {
                         * "key": "0b1eae3d-2520-4903-8bbf-5dec3ad2a5d4",
                         * "type": "MANAGED"
                         * }
                         * ]
                         * }
                         * </pre>
                         * If the sender address is not managed, the transaction could be signed with the private key of that address before the serialization and the payload will look like this:
                         * <pre>
                         * {
                             * "chain": "SOL",
                             * "txData": "020001044a22af97a838a504e6f7c0b18d779afcea612da50794cc1dac641861fc1ab14afa5cacaf91c298694e64bb5496916c3c68a32affb92d4bcd2736fbb00169d57bd840de2a454960308f688cd3ee308c1fa01ecfa0b03770aaaf3b52d71d46c31d000000000000000000000000000000000000000000000000000000000000000060d38e0da20dc5900b7e902c918eae6a95e2d90af154b53a422f4ab26b050f4f01030201020c02000000e803000000000000",
                             * "walletIds": []
                             * }
                             * </pre>
                             * </p>
                             *
                             * @param requestBody
                             * @returns TransactionHash OK
                             * @throws ApiError
                             */
                            public static custodialTransferManagedAddress(
                                requestBody?: TransferManagedAddress,
                            ): CancelablePromise<TransactionHash> {
                                return __request({
                                    method: 'POST',
                                    path: `/v3/custodial/transaction`,
                                    body: requestBody,
                                    mediaType: 'application/json',
                                    errors: {
                                        400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                                        401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                                        500: `Internal server error. There was an error on the server during the processing of the request.`,
                                    },
                                });
                            }

                        }