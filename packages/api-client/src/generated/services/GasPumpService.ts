/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Activated } from '../models/Activated';
import type { ActivateGasPump } from '../models/ActivateGasPump';
import type { ActivateGasPumpCelo } from '../models/ActivateGasPumpCelo';
import type { ActivateGasPumpCeloKMS } from '../models/ActivateGasPumpCeloKMS';
import type { ActivateGasPumpKMS } from '../models/ActivateGasPumpKMS';
import type { ActivateGasPumpTatum } from '../models/ActivateGasPumpTatum';
import type { ActivateGasPumpTron } from '../models/ActivateGasPumpTron';
import type { ActivateGasPumpTronKMS } from '../models/ActivateGasPumpTronKMS';
import type { ApproveTransferCustodialWallet } from '../models/ApproveTransferCustodialWallet';
import type { ApproveTransferCustodialWalletCelo } from '../models/ApproveTransferCustodialWalletCelo';
import type { ApproveTransferCustodialWalletCeloKMS } from '../models/ApproveTransferCustodialWalletCeloKMS';
import type { ApproveTransferCustodialWalletKMS } from '../models/ApproveTransferCustodialWalletKMS';
import type { CreateGasPump } from '../models/CreateGasPump';
import type { GasPumpAddress } from '../models/GasPumpAddress';
import type { GasPumpTrxOut } from '../models/GasPumpTrxOut';
import type { GenerateCustodialWallet } from '../models/GenerateCustodialWallet';
import type { GenerateCustodialWalletBatch } from '../models/GenerateCustodialWalletBatch';
import type { GenerateCustodialWalletBatchCelo } from '../models/GenerateCustodialWalletBatchCelo';
import type { GenerateCustodialWalletBatchCeloKMS } from '../models/GenerateCustodialWalletBatchCeloKMS';
import type { GenerateCustodialWalletBatchKMS } from '../models/GenerateCustodialWalletBatchKMS';
import type { GenerateCustodialWalletBatchPayer } from '../models/GenerateCustodialWalletBatchPayer';
import type { GenerateCustodialWalletBatchTron } from '../models/GenerateCustodialWalletBatchTron';
import type { GenerateCustodialWalletBatchTronKMS } from '../models/GenerateCustodialWalletBatchTronKMS';
import type { GenerateCustodialWalletCelo } from '../models/GenerateCustodialWalletCelo';
import type { GenerateCustodialWalletCeloKMS } from '../models/GenerateCustodialWalletCeloKMS';
import type { GenerateCustodialWalletKMS } from '../models/GenerateCustodialWalletKMS';
import type { GenerateCustodialWalletTron } from '../models/GenerateCustodialWalletTron';
import type { GenerateCustodialWalletTronKMS } from '../models/GenerateCustodialWalletTronKMS';
import type { SignatureId } from '../models/SignatureId';
import type { TransactionHash } from '../models/TransactionHash';
import type { TransferCustodialWallet } from '../models/TransferCustodialWallet';
import type { TransferCustodialWalletBatch } from '../models/TransferCustodialWalletBatch';
import type { TransferCustodialWalletBatchCelo } from '../models/TransferCustodialWalletBatchCelo';
import type { TransferCustodialWalletBatchCeloKMS } from '../models/TransferCustodialWalletBatchCeloKMS';
import type { TransferCustodialWalletBatchKMS } from '../models/TransferCustodialWalletBatchKMS';
import type { TransferCustodialWalletBatchTron } from '../models/TransferCustodialWalletBatchTron';
import type { TransferCustodialWalletBatchTronKMS } from '../models/TransferCustodialWalletBatchTronKMS';
import type { TransferCustodialWalletCelo } from '../models/TransferCustodialWalletCelo';
import type { TransferCustodialWalletCeloKMS } from '../models/TransferCustodialWalletCeloKMS';
import type { TransferCustodialWalletKMS } from '../models/TransferCustodialWalletKMS';
import type { TransferCustodialWalletTron } from '../models/TransferCustodialWalletTron';
import type { TransferCustodialWalletTronKMS } from '../models/TransferCustodialWalletTronKMS';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class GasPumpService {

    /**
     * Precalculate gas pump addresses
     * <p><b>2 credits per API call</b></p>
     * <p>Precalculate (generate) gas pump addresses that you can assign to the customers of your custodial application.</p>
     * <p>This API does not make any changes on the blockchain itself, just generates addresses that follow the blockchain's requirements for the address format; therefore, no gas fee is applied.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>Polygon</li>
     * <li>TRON</li>
     * </ul>
     * <p><b>Address index</b><br/>
     * Each address should be associated with its own index. Use the <code>from</code> and <code>to</code> request body parameters to set a range of index values for the addresses to precalculate. You can start with any number, but we recommend that you start from 0.</p>
     * <p>In one API call, you can precalculate:</p>
     * <ul>
     * <li>Up to 4,000 addresses for Harmony</li>
     * <li>Up to 500 addresses for TRON</li>
     * <li>Up to 5,000 addresses for the other supported blockchains</li>
     * </ul>
     * <p>If you need more addresses than one API call can precalculate, make several API calls. For example, if you need 10,000 addresses on Ethereum, make an API call with an index range from 0 through 4,999 and then make another API call with an index range from 5,000 through 9,999.</p>
     * <p>The order in which the precalculated addresses are returned in the API response is the order of the values in the index range, and the index values are assigned to the addresses accordingly.<br/>For example, you precalculated three gas pump addresses with a range of index values from 3 to 5. The first address in the returned arrray is assigned the index value "3", the second one - "4", and the third one - "5".</p>
     * <pre>
     * [
         * "0x8cb76aed9c5e336ef961265c6079c14e9cd3d2ea", // index is 3
         * "0x5c6079c14e9cd3d2ea8cb76aed9c5e336ef96126", // index is 4
         * "0xc5e336ef9612614e9cd3d2ea8cb76aed95c6079c"  // index is 5
         * ]
         * </pre>
         * <p><b>The owner of the gas pump addresses</b><br/>
         * The owner (also referred to as "master address") is the blockchain address that will own the precalculated gas pump addresses. The owner will also be paying gas fees for operations made on the gas pump addresses. You have to make sure that the owner always has enough funds to cover these gas fees.</p>
         * <p><b>Activated and not activated addresses</b><br/>
         * The precalculated addresses can be immediately assigned to customers and can <b>receive</b> funds. However, they cannot be used to <b>send</b> funds to other addresses. This is because the addresses are not activated. To make the addresses be able to send funds, <a href="#operation/ActivateGasPumpAddresses">activate them</a>.</p>
         *
         * @param requestBody
         * @returns GasPumpAddress OK
         * @throws ApiError
         */
        public static precalculateGasPumpAddresses(
            requestBody?: CreateGasPump,
        ): CancelablePromise<Array<GasPumpAddress>> {
            return __request({
                method: 'POST',
                path: `/v3/gas-pump`,
                body: requestBody,
                mediaType: 'application/json',
                errors: {
                    400: `Bad Request`,
                    401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                    403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                    500: `Internal server error. There was an error on the server during the processing of the request.`,
                },
            });
        }

        /**
         * Activate gas pump addresses
         * <p><b>2 credits per API call</b></p>
         * <p>Activate the <a href="#operation/PrecalculateGasPumpAddresses">precalulated gas pump addresses</a>. Activating a gas pump address allows this address to send funds to other addresses.</p>
         * <p>You can activate up to 270 addresses in one call. If you need to activate more than 270 addresses, make several API calls. For example, if you need to activate 500 addresses, make an API call with 270 addresses (set up the range of their index values accordingly in the <code>from</code> and <code>to</code> request body parameters) and then make another API call with the remaining 230 addresses.</p>
         * <p><b>When to activate a gas pump address</b><br/>
         * Because activating a gas pump address costs some amount of gas on a blockchain, you want to activate only those addresses that will be used for sending funds to other addresses. If you know that a gas pump address will not be used for sending funds, you can leave this address not activated. The customer who uses this address will still be able to receive funds.</p>
         * <p>Depending on your business needs and requirements, you can choose when to activate the gas pump addresses. If you know for sure that all the precalculated addresses will be sending funds, you can activate all the addresses right after they have been precalculated.</p>
         * <p>Alternatively, you can set up the activation in such a way so that a gas pump address gets activated only when a specific event is triggered. For example, you can activate a gas pump address:</p>
         * <ul>
         * <li>When it receives an asset for the first time</li>
         * <li>When the customer tries to send an asset from this address for the first time</li>
         * </ul>
         * <p>After you make an API call to activate gas pump addresses, use the <a href="#operation/ActivatedNotActivatedGasPumpAddresses">API for getting the results of the address activation transaction</a>.</p>
         * <p><b>Paying the gas fee for activating gas pump addresses</b><br/>
         * You can pay the gas fees for each activation transaction yourself, or Tatum can cover it for you.</p>
         * <ul>
         * <li>When <b>paying the gas fees yourself</b>, you must sign the transaction with either the private key of the blockchain address from which you want to pay the fees or the signature ID of that private key (if you use <a href="https://apidoc.tatum.io/tag/Key-Management-System" target="_blank">Key Management System</a>, KMS).<br/>
         * To pay the fees yourself, use this API with any schema of the request body except for <code>ActivateGasPumpTatum</code>. For example, if you are activating gas pump addresses on Ethereum and you use KMS, use the <code>ActivateGasPumpKMS</code> schema.
         * </li>
         * <li>If you want <b>Tatum to cover the fees</b>, use this API with the <code>ActivateGasPumpTatum</code> schema of the request body.
         * <ul>
         * <li>On the <b>mainnet</b>, you have to have a <a href="https://tatum.io/pricing" target="_blank">paid pricing plan</a>.<br/>
         * Tatum pays the fees from its own blockchain address. Then, the fee amount paid by Tatum is converted to the number of credits, and these credits are deducted from the monthly credit allowance of your paid pricing plan. The transaction fees and the corresponding numbers of credits deducted from your allowance vary depending on what blockchain you activate the addresses.</li>
         * <li>On the <b>testnet</b>, only one credit is deducted from the monthly credit allowance for transaction fee. You can activate gas pump addresses regardless of your pricing plan.</li>
         * </ul>
         * </li>
         * </ul>
         * <p>This API is supported for the following blockchains:</p>
         * <ul>
         * <li>BNB Smart Chain</li>
         * <li>Celo</li>
         * <li>Ethereum</li>
         * <li>Harmony</li>
         * <li>Klaytn</li>
         * <li>Polygon</li>
         * <li>TRON</li>
         * </ul>
         *
         * @param requestBody
         * @returns any OK
         * @throws ApiError
         */
        public static activateGasPumpAddresses(
            requestBody: (ActivateGasPumpTatum | ActivateGasPump | ActivateGasPumpKMS | ActivateGasPumpCelo | ActivateGasPumpCeloKMS | ActivateGasPumpTron | ActivateGasPumpTronKMS),
        ): CancelablePromise<(TransactionHash | SignatureId)> {
            return __request({
                method: 'POST',
                path: `/v3/gas-pump/activate`,
                body: requestBody,
                mediaType: 'application/json',
                errors: {
                    400: `Bad Request`,
                    401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                    403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                    500: `Internal server error. There was an error on the server during the processing of the request.`,
                },
            });
        }

        /**
         * Get the results of the address activation transaction
         * <p><b>1 credit per API call</b></p>
         * <p>Get the results of the activation transaction after <a href="#operation/ActivateGasPumpAddresses">activating gas pump addresses</a>.</p>
         * <p>If the activation transaction got recorded into a block, the API returns two arrays:</p>
         * <ul>
         * <li><code>valid</code>, with the activated gas pump addresses</li>
         * <li><code>invalid</code>, with the gas pump addresses that for some reason did not get activated together with the reason why</li>
         * </ul>
         * <p>If the transaction is still being processed, the API returns an error message. In this case, repeat the call later.</p>
         * <p>This API is supported for the following blockchains:</p>
         * <ul>
         * <li>BNB Smart Chain</li>
         * <li>Celo</li>
         * <li>Ethereum</li>
         * <li>Harmony</li>
         * <li>Klaytn</li>
         * <li>Polygon</li>
         * <li>TRON</li>
         * </ul>
         *
         * @param chain The blockchain to work with
         * @param txId The ID of the address activation transaction
         * @returns GasPumpTrxOut OK
         * @throws ApiError
         */
        public static activatedNotActivatedGasPumpAddresses(
            chain: 'BSC' | 'CELO' | 'ETH' | 'KLAY' | 'MATIC' | 'ONE' | 'TRON',
            txId: string,
        ): CancelablePromise<GasPumpTrxOut> {
            return __request({
                method: 'GET',
                path: `/v3/gas-pump/address/${chain}/${txId}`,
                errors: {
                    400: `Bad Request`,
                    401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                    403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                    500: `Internal server error. There was an error on the server during the processing of the request.`,
                },
            });
        }

        /**
         * Check whether the gas pump address with a specified index is activated
         * <p><b>1 credit per API call</b></p>
         * <p>Check whether the gas pump address with a specified index is <a href="#operation/ActivateGasPumpAddresses">activated</a> and can send funds to other addresses.</p>
         * <p>You can use this API when a customer initiates a fund transfer and you need to check whether their gas pump address is allowed to send funds.</p>
         * <p>This API is supported for the following blockchains:</p>
         * <ul>
         * <li>BNB Smart Chain</li>
         * <li>Celo</li>
         * <li>Ethereum</li>
         * <li>Harmony</li>
         * <li>Klaytn</li>
         * <li>Polygon</li>
         * <li>TRON</li>
         * </ul>
         *
         * @param chain The blockchain to work with
         * @param owner The blockchain address that owns the gas pump address to check; can be referred to as "master address"
         * @param index The index of the gas pump address to check
         * @returns Activated OK
         * @throws ApiError
         */
        public static gasPumpAddressesActivatedOrNot(
            chain: 'BSC' | 'CELO' | 'ETH' | 'MATIC' | 'KLAY' | 'ONE' | 'TRON',
            owner: string,
            index: number,
        ): CancelablePromise<Activated> {
            return __request({
                method: 'GET',
                path: `/v3/gas-pump/activated/${chain}/${owner}/${index}`,
                errors: {
                    400: `Bad Request`,
                    401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                    403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                    500: `Internal server error. There was an error on the server during the processing of the request.`,
                },
            });
        }

        /**
         * Transfer an asset from a gas pump address
         * <p><b>2 credits per API call</b></p>
         * <p>Transfer (send) an asset from a gas pump address to the other address.</p>
         * <p>This operation is usually performed by users in your custodial application: a user who has a gas pump address assigned wants to transfer an asset to some address on the blockchain.</p>
         * <p>The gas fee for sending the asset will be covered by crypto funds on the master address. Make sure that the master address always has enough funds to cover gas fees.</p>
         * <p>To be able to send the asset:</p>
         * <ul>
         * <li>The gas pump address must be <a href="#operation/ActivateGasPumpAddresses">activated</a>.<br/>To check whether the gas pump address is activated, use <a href="#operation/GasPumpAddressesActivatedOrNot">this API</a>.</li>
         * <li>The gas pump address must be the owner of the asset.</li>
         * </ul>
         * <p>With this API, you can send only one asset per API call. If you want to send multiple assets, use the <a href="#operation/TransferCustodialWalletBatch">API for transferring multiple assets from a gas pump account</a>.</p>
         * <p>This API is supported for the following blockchains:</p>
         * <ul>
         * <li>BNB Smart Chain</li>
         * <li>Celo</li>
         * <li>Ethereum</li>
         * <li>Harmony</li>
         * <li>Klaytn</li>
         * <li>Polygon</li>
         * <li>TRON</li>
         * <li>XinFin</li>
         * </ul>
         * <p><b>Signing a transaction</b><br/>
         * When transferring an asset, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
         * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
         * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
         *
         * @param requestBody
         * @returns any OK
         * @throws ApiError
         */
        public static transferCustodialWallet(
            requestBody: (TransferCustodialWallet | TransferCustodialWalletKMS | TransferCustodialWalletCelo | TransferCustodialWalletCeloKMS | TransferCustodialWalletTron | TransferCustodialWalletTronKMS),
        ): CancelablePromise<(TransactionHash | SignatureId)> {
            return __request({
                method: 'POST',
                path: `/v3/blockchain/sc/custodial/transfer`,
                body: requestBody,
                mediaType: 'application/json',
                errors: {
                    400: `Bad Request`,
                    401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                    403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                    500: `Internal server error. There was an error on the server during the processing of the request.`,
                },
            });
        }

        /**
         * Transfer multiple assets from a gas pump address
         * <p><b>2 credits per API call</b></p>
         * <p>Transfer (send) multiple assets from a gas pump address to one or more addresses.</p>
         * <p>This operation is usually performed by users in your custodial application: a user who has a gas pump address assigned wants to transfer multiple assets to one or more addresses on the blockchain.</p>
         * <p>The gas fee for sending the assets will be covered by crypto funds on the master address. Make sure that the master address always has enough funds to cover gas fees.</p>
         * <p>To be able to send the assets:</p>
         * <ul>
         * <li>The gas pump address must be <a href="#operation/ActivateGasPumpAddresses">activated</a>.<br/>To check whether the gas pump address is activated, use <a href="#operation/GasPumpAddressesActivatedOrNot">this API</a>.</li>
         * <li>The gas pump address must be the owner of the assets.</li>
         * </ul>
         * <p>If you want to send only one asset, you can also use the <a href="#operation/TransferCustodialWallet">API for transferring an asset from a gas pump account</a>.</p>
         * <p>This API is supported for the following blockchains:</p>
         * <ul>
         * <li>BNB Smart Chain</li>
         * <li>Celo</li>
         * <li>Ethereum</li>
         * <li>Harmony</li>
         * <li>Klaytn</li>
         * <li>Polygon</li>
         * <li>TRON</li>
         * <li>XinFin</li>
         * </ul>
         * <p><b>Signing a transaction</b><br/>
         * When transferring assets, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
         * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
         * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
         *
         * @param requestBody
         * @returns any OK
         * @throws ApiError
         */
        public static transferCustodialWalletBatch(
            requestBody: (TransferCustodialWalletBatch | TransferCustodialWalletBatchKMS | TransferCustodialWalletBatchCelo | TransferCustodialWalletBatchCeloKMS | TransferCustodialWalletBatchTron | TransferCustodialWalletBatchTronKMS),
        ): CancelablePromise<(TransactionHash | SignatureId)> {
            return __request({
                method: 'POST',
                path: `/v3/blockchain/sc/custodial/transfer/batch`,
                body: requestBody,
                mediaType: 'application/json',
                errors: {
                    400: `Bad Request`,
                    401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                    403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                    500: `Internal server error. There was an error on the server during the processing of the request.`,
                },
            });
        }

        /**
         * Approve the transfer of an asset from a gas pump address
         * <p><b>2 credits per API call</b></p>
         * <p>Allow another blockchain address (the <code>spender</code> parameter in the request body) to transfer the asset from a gas pump address on behalf of the master address.</p>
         * <p>Use this API when the customer using the gas pump address sells assets on a marketplace or auction. After the customer creates a listing of the asset, they have to allow the marketplace/auction smart contract to transfer the asset to the buyer after the asset has been bought.</p>
         * <p>The asset can be one of the following types:</p>
         * <ul>
         * <li>Fungible token (ERC-20 or equivalent)</li>
         * <li>NFT (ERC-721 or equivalent)</li>
         * <li>Multi Token (ERC-1155 or equivalent)</li>
         * </ul>
         * <p>This API is supported for the following blockchains:</p>
         * <ul>
         * <li>BNB Smart Chain</li>
         * <li>Celo</li>
         * <li>Ethereum</li>
         * <li>Harmony</li>
         * <li>Klaytn</li>
         * <li>Polygon</li>
         * <li>XinFin</li>
         * </ul>
         * <p><b>Signing a transaction</b><br/>
         * When approving the transfer of an asset, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
         * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
         * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js/tree/v2" target="_blank">Tatum JavaScript client</a>.</p>
         *
         * @param requestBody
         * @returns any OK
         * @throws ApiError
         */
        public static approveTransferCustodialWallet(
            requestBody: (ApproveTransferCustodialWallet | ApproveTransferCustodialWalletKMS | ApproveTransferCustodialWalletCelo | ApproveTransferCustodialWalletCeloKMS),
        ): CancelablePromise<(TransactionHash | SignatureId)> {
            return __request({
                method: 'POST',
                path: `/v3/blockchain/sc/custodial/approve`,
                body: requestBody,
                mediaType: 'application/json',
                errors: {
                    400: `Bad Request`,
                    401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                    403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                    500: `Internal server error. There was an error on the server during the processing of the request.`,
                },
            });
        }

        /**
         * @deprecated
         * Generate a gas pump wallet address
         * <p><b>This API is deprecated.<br/>To start with the gas pump, use the <a href="#operation/PrecalculateGasPumpAddresses">API for precalculating the gas pump addresses</a>.</b></p><br/>
         * <p><b>2 credits per API call</b></p>
         * <p>Generate new gas pump smart contract address on the blockchain. This address enables custodial providers to receive native assets, ERC20 / ERC721 / ERC1155 tokens on behalf of their customers on dedicated blockchain address, but in the same time it can initiate transfer of those assets away. Gas required for the transfer from that address is going to be deducted from the providers address - the one, which was used to generate the address on the blockchain.</p>
         * <p>This operation deploys a smart contract on the blockchain.</p>
         * <p>For paid plans, it is possible to pay for the gas costs - you don't have to provide private key or signatureId. Blockchain fees will be covered by your credits.</p>
         * <p>This API is supported for the following blockchains:</p>
         * <ul>
         * <li>BNB Smart Chain</li>
         * <li>Celo</li>
         * <li>Ethereum</li>
         * <li>Harmony</li>
         * <li>Klaytn</li>
         * <li>Polygon</li>
         * <li>TRON</li>
         * <li>XinFin</li>
         * </ul>
         *
         * @param requestBody
         * @param xTestnetType Type of Ethereum testnet. Defaults to ethereum-sepolia.
         * @returns any OK
         * @throws ApiError
         */
        public static generateCustodialWalletBatch(
            requestBody: (GenerateCustodialWalletBatchPayer | GenerateCustodialWalletBatch | GenerateCustodialWalletBatchKMS | GenerateCustodialWalletBatchCelo | GenerateCustodialWalletBatchCeloKMS | GenerateCustodialWalletBatchTron | GenerateCustodialWalletBatchTronKMS),
            xTestnetType: 'ethereum-sepolia' = 'ethereum-sepolia',
        ): CancelablePromise<(TransactionHash | SignatureId)> {
            return __request({
                method: 'POST',
                path: `/v3/blockchain/sc/custodial/batch`,
                headers: {
                    'x-testnet-type': xTestnetType,
                },
                body: requestBody,
                mediaType: 'application/json',
                errors: {
                    400: `Bad Request`,
                    401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                    403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                    500: `Internal server error. There was an error on the server during the processing of the request.`,
                },
            });
        }

        /**
         * @deprecated
         * Generate a custodial wallet address
         * <p><b>This API is deprecated.<br/>To start with the gas pump, use the <a href="#operation/PrecalculateGasPumpAddresses">API for precalculating the gas pump addresses</a>.</b></p>
         * <p><b>If you built your gas pump solution using this API and the <a href="#operation/GenerateCustodialWalletBatch">API for generating a gas pump wallet address</a>, you can still use this API for creating more custodial addresses for your solution. However, we recommend that you switch to the <a href="#operation/PrecalculateGasPumpAddresses">API for precalculating the gas pump addresses</a></b>.</p><br/>
         * <p><b>2 credits per API call</b></p>
         * <p>Generate new gas pump smart contract address on the blockchain. It's possible to enable tokens, which should be detected and supported on that address. This address enables custodial providers to
         * receive native assets, ERC20 / ERC721 / ERC1155 tokens on behalf of their customers on dedicated blockchain address, but in the same time it can initiate transfer of those assets away.</p>
         * <p>Gas required for the transfer from that address is going to be deducted from the providers address - the one, which was used to generate the address on the blockchain.</p>
         * <p>There are multiple options, how this address can be setup - it cannot be changed in the future:</p>
         * <ul>
         * <li>Native assets only - ETH, BSC, CELO, MATIC, ONE, TRX</li>
         * <li>Native assets + ERC20 tokens</li>
         * <li>Native assets + ERC721 tokens</li>
         * <li>Native assets + ERC1155 tokens - TRON does not support 1155 standard</li>
         * <li>Native assets + ERC20 + ERC721 tokens</li>
         * <li>Native assets + ERC20 + ERC1155 tokens - TRON does not support 1155 standard</li>
         * <li>Native assets + ERC721 + ERC1155 tokens - TRON does not support 1155 standard</li>
         * <li>Native assets + ERC20 + ERC721 + ERC1155 tokens - TRON does not support 1155 standard</li>
         * </ul>
         * <p>All of these options could be enabled with a batch mode as well - in 1 transaction, it is possible to transfer multiple different assets from that address, e.g. ETH + USDC + ERC721 token.
         * Without batch mode, 3 separate transaction must have been performed.</p>
         * <p>This operation deploys a smart contract on the blockchain. More assets you will support, more intial gas will be used for address creation. Batch mode adds more gas for every type.</p>
         * <p>This API is supported for the following blockchains:</p>
         * <ul>
         * <li>BNB Smart Chain</li>
         * <li>Celo</li>
         * <li>Ethereum</li>
         * <li>Harmony</li>
         * <li>Polygon</li>
         * <li>TRON (except for Multi Tokens)</li>
         * </ul>
         *
         * @param requestBody
         * @returns any OK
         * @throws ApiError
         */
        public static generateCustodialWallet(
            requestBody: (GenerateCustodialWallet | GenerateCustodialWalletKMS | GenerateCustodialWalletCelo | GenerateCustodialWalletCeloKMS | GenerateCustodialWalletTron | GenerateCustodialWalletTronKMS),
        ): CancelablePromise<(TransactionHash | SignatureId)> {
            return __request({
                method: 'POST',
                path: `/v3/blockchain/sc/custodial`,
                body: requestBody,
                mediaType: 'application/json',
                errors: {
                    400: `Bad Request`,
                    401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                    403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                    500: `Internal server error. There was an error on the server during the processing of the request.`,
                },
            });
        }

        /**
         * @deprecated
         * Get the custodial wallet address from the transaction
         * <p><b>This API is deprecated.<br/>To start with the gas pump, use the <a href="#operation/PrecalculateGasPumpAddresses">API for precalculating the gas pump addresses</a>.</b></p>
         * <p><b>If you built your gas pump solution using the <a href="#operation/GenerateCustodialWalletBatch">API for generating a gas pump wallet address</a> and <a href="#operation/GenerateCustodialWallet">API for generating a custodial wallet address</a>, you can still use this API for getting the custodial wallet address from the transaction. However, we recommend that you switch to the <a href="#operation/PrecalculateGasPumpAddresses">API for precalculating the gas pump addresses</a></b>.</p><br/>
         * <p><b>1 credit per API call</b></p>
         * <p>Get gas pump smart contract addresses from deploy transaction.</p>
         * <p>This API is supported for the following blockchains:</p>
         * <ul>
         * <li>BNB Smart Chain</li>
         * <li>Celo</li>
         * <li>Ethereum</li>
         * <li>Harmony</li>
         * <li>Klaytn</li>
         * <li>Polygon</li>
         * <li>TRON</li>
         * </ul>
         *
         * @param chain Blockchain to work with
         * @param hash Transaction hash
         * @returns string OK
         * @throws ApiError
         */
        public static scGetCustodialAddresses(
            chain: 'CELO' | 'MATIC' | 'KLAY' | 'ETH' | 'ONE' | 'BSC' | 'TRON',
            hash: string,
        ): CancelablePromise<Array<string>> {
            return __request({
                method: 'GET',
                path: `/v3/blockchain/sc/custodial/${chain}/${hash}`,
                errors: {
                    400: `Bad Request`,
                    401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                    403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                    500: `Internal server error. There was an error on the server during the processing of the request.`,
                },
            });
        }

    }
