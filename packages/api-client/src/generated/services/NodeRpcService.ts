/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class NodeRpcService {

    /**
     * Connect to the blockchain node through an RPC driver
     * <p><b>2 credits per API call. 50 credits for debug*_/trace* methods for EVM-based blockchains.</b></p>
     * <p>Connect directly to the blockchain node provided by Tatum.</p>
     * <p>The <code>POST</code> method is used. The API endpoint URL acts as an HTTP-based RPC driver.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li><a href="https://developer.algorand.org/docs/rest-apis/restendpoints/" target="_blank">Algorand</a></li>
     * <li><a href="https://developer.bitcoin.org/reference/rpc/index.html" target="_blank">Bitcoin</a></li>
     * <li><a href="https://docs.bitcoincashnode.org/doc/json-rpc/" target="_blank">Bitcoin Cash</a></li>
     * <li><a href="https://docs.bnbchain.org/docs/rpc" target="_blank">BNB Smart Chain</a></li>
     * <li><a href="https://docs.cardano.org/cardano-components/cardano-graphql" target="_blank">Cardano</a></li>
     * <li><a href="https://explorer.celo.org/api-docs" target="_blank">Celo</a></li>
     * <li><a href="https://dogecoin.com/" target="_blank">Dogecoin</a></li>
     * <li><a href="https://docs.elrond.com/sdk-and-tools/rest-api/nodes/" target="_blank">Elrond</a></li>
     * <li><a href="https://developers.eos.io/welcome/latest/reference/nodeos-rpc-api-reference" target="_blank">EOSIO</a></li>
     * <li><a href="https://ethereum.org/en/developers/docs/apis/json-rpc/" target="_blank">Ethereum</a></li>
     * <li><a href="https://docs.fantom.foundation/api/public-api-endpoints" target="_blank">Fantom</a></li>
     * <li><a href="https://docs.harmony.one/home/developers/api" target="_blank">Harmony</a></li>
     * <li><a href="https://docs.klaytn.foundation/dapp/json-rpc" target="_blank">Klaytn</a></li>
     * <li><a href="https://docs.kcc.io/" target="_blank">KuCoin Community Chain</a></li>
     * <li><a href="https://lisk.com/documentation/lisk-service/references/api.html" target="_blank">Lisk</a></li>
     * <li><a href="https://litecoin.org/" target="_blank">Litecoin</a></li>
     * <li><a href="https://polygon.technology/developers" target="_blank">Polygon</a></li>
     * <li><a href="https://docs.solana.com/developing/clients/jsonrpc-api" target="_blank">Solana</a></li>
     * <li><a href="https://developers.stellar.org/api" target="_blank">Stellar</a></li>
     * <li><a href="https://www.vechain.org/" target="_blank">VeChain</a></li>
     * <li><a href="https://apidocs.xinfin.network/docs/" target="_blank">XinFin</a></li>
     * </ul>
     *
     * @param chain Blockchain to communicate with.
     * @param requestBody
     * @param xApiKey Tatum X-API-Key used for authorization. You can omit this path parameter and either use the X-Api-Key header, or the API key tied to your IP address without any header.
     * @param nodeType Type of the node to access for Algorand.
     * @param testnetType Type of Ethereum testnet. Defaults to ethereum-sepolia.
     * @param rpcPath Optional path of rpc call for non EVM nodes, e.g. Algorand or Stellar.
     * @returns any OK
     * @throws ApiError
     */
    public static nodeJsonPostRpcDriver(
        chain: 'ADA' | 'ALGO' | 'BCH' | 'BSC' | 'BTC' | 'CELO' | 'DOGE' | 'EGLD' | 'EOS' | 'ETH' | 'FTM' | 'KCS' | 'KLAY' | 'LISK' | 'LTC' | 'MATIC' | 'ONE' | 'SOL' | 'VET' | 'XDC' | 'XLM',
        requestBody: any,
        xApiKey?: string,
        nodeType?: 'ALGOD' | 'INDEXER',
        testnetType: 'ethereum-sepolia' = 'ethereum-sepolia',
        rpcPath?: string,
    ): CancelablePromise<any> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/node/${chain}/${xApiKey}/${rpcPath}`,
            query: {
                'nodeType': nodeType,
                'testnetType': testnetType,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Connect to the blockchain node through an RPC driver
     * <p><b>2 credits per API call</b></p>
     * <p>Connect directly to the blockchain node provided by Tatum.</p>
     * <p>The <code>PUT</code> method is used. The API endpoint URL acts as an HTTP-based RPC driver.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li><a href="https://developer.algorand.org/docs/rest-apis/restendpoints/" target="_blank">Algorand</a></li>
     * <li><a href="https://docs.elrond.com/sdk-and-tools/rest-api/nodes/" target="_blank">Elrond</a></li>
     * <li><a href="https://developers.stellar.org/api" target="_blank">Stellar</a></li>
     * </ul>
     *
     * @param chain Blockchain to communicate with.
     * @param requestBody
     * @param xApiKey Tatum X-API-Key used for authorization. You can omit this path parameter and either use the X-Api-Key header, or the API key tied to your IP address without any header.
     * @param nodeType Type of the node to access for Algorand.
     * @param rpcPath Optional path of rpc call for non EVM nodes, e.g. Algorand or Stellar.
     * @returns any OK
     * @throws ApiError
     */
    public static nodeJsonRpcPutDriver(
        chain: 'ALGO' | 'EGLD' | 'XLM',
        requestBody: any,
        xApiKey?: string,
        nodeType?: 'ALGOD' | 'INDEXER',
        rpcPath?: string,
    ): CancelablePromise<any> {
        return __request({
            method: 'PUT',
            path: `/v3/blockchain/node/${chain}/${xApiKey}/${rpcPath}`,
            query: {
                'nodeType': nodeType,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Connect to the blockchain node through an RPC driver
     * <p><b>2 credits per API call</b></p>
     * <p>Connect directly to the blockchain node provided by Tatum.</p>
     * <p>The <code>GET</code> method is used. The API endpoint URL acts as an HTTP-based RPC driver.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li><a href="https://developer.algorand.org/docs/rest-apis/restendpoints/" target="_blank">Algorand</a></li>
     * <li><a href="https://docs.elrond.com/sdk-and-tools/rest-api/nodes/" target="_blank">Elrond</a></li>
     * <li><a href="https://lisk.com/documentation/lisk-service/references/api.html" target="_blank">Lisk</a></li>
     * <li><a href="https://developers.stellar.org/api" target="_blank">Stellar</a></li>
     * </ul>
     *
     * @param chain Blockchain to communicate with.
     * @param xApiKey Tatum X-API-Key used for authorization. You can omit this path parameter and either use the X-Api-Key header, or the API key tied to your IP address without any header.
     * @param nodeType Type of the node to access for Algorand.
     * @param rpcPath Optional path of rpc call for non EVM nodes, e.g. Algorand or Stellar.
     * @returns any OK
     * @throws ApiError
     */
    public static nodeJsonRpcGetDriver(
        chain: 'ALGO' | 'EGLD' | 'LISK' | 'XLM',
        xApiKey?: string,
        nodeType?: 'ALGOD' | 'INDEXER',
        rpcPath?: string,
    ): CancelablePromise<any> {
        return __request({
            method: 'GET',
            path: `/v3/blockchain/node/${chain}/${xApiKey}/${rpcPath}`,
            query: {
                'nodeType': nodeType,
            },
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error`,
            },
        });
    }

}