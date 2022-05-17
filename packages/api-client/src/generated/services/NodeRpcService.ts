/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class NodeRpcService {

    /**
     * RPC HTTP driver
     * <h4>2 credits per API call.</h4><br/>
     * <p>Use this endpoint URL as an http-based JSON RPC driver to connect directly to the blockchain node provided by Tatum.<br/>
     * Tatum now supports JSON RPC nodes on these blockchains:<br/>
     * <ul>
     * <li><b><a href="https://ethereum.org/en/developers/" target="_blank">Ethereum</a></b></li>
     * <li><b><a href="https://ethereum.org/en/developers/" target="_blank">Polygon (Matic)</a></b></li>
     * <li><b><a href="https://ethereum.org/en/developers/" target="_blank">Kcs (KCS)</a></b></li>
     * <li><b><a href="https://ethereum.org/en/developers/" target="_blank">XDC Network (XinFin)</a></b></li>
     * <li><b><a href="https://ethereum.org/en/developers/" target="_blank">Celo</a></b></li>
     * <li><b><a href="https://developers.stellar.org/api" target="_blank">Stellar</a></b></li>
     * <li><b><a href="https://developer.bitcoin.org/reference/rpc/index.html" target="_blank">Bitcoin</a></b></li>
     * <li><b><a href="https://developer.bitcoin.org/reference/rpc/index.html" target="_blank">Litecoin</a></b></li>
     * <li><b><a href="https://developer.bitcoin.org/reference/rpc/index.html" target="_blank">Bitcoin Cash</a></b></li>
     * <li><b><a href="https://developer.bitcoin.org/reference/rpc/index.html" target="_blank">Dogecoin</a></b></li>
     * <li><b><a href="https://ethereum.org/en/developers/" target="_blank">VeChain</a></b></li>
     * <li><b><a href="https://docs.cardano.org/cardano-components/cardano-graphql" target="_blank">Cardano</a></b></li>
     * <li><b><a href="https://docs.terra.money/docs/develop/reference/README.html" target="_blank">Terra Luna</a></b></li>
     * <li><b><a href="https://developers.eos.io/welcome/latest/reference/nodeos-rpc-api-reference" target="_blank">EOS</a></b></li>
     * <li><b><a href="https://docs.elrond.com/sdk-and-tools/rest-api/nodes/" target="_blank">Elrond</a></b></li>
     * <li><b><a href="https://developer.algorand.org/docs/rest-apis/restendpoints/" target="_blank">Algorand</a></b></li>
     * <li><b><a href="https://docs.solana.com/developing/clients/jsonrpc-api" target="_blank">Solana</a></b></li>
     * <li><b><a href="https://ethereum.org/en/developers/" target="_blank">Klaytn</a></b></li>
     * <li><b><a href="https://ethereum.org/en/developers/" target="_blank">Harmony.ONE</a></b></li>
     * <li><b><a href="https://ethereum.org/en/developers/" target="_blank">Binance Smart Chain</a></b></li>
     * <li><b><a href="https://lisk.com/documentation/lisk-service/references/api.html" target="_blank">Lisk</a></b></li>
     * </ul>
     * </p>
     *
     * @param chain Blockchain to communicate with.
     * @param rpcPath `**` path of rpc call.
     * @param requestBody
     * @param xApiKey Tatum X-API-Key used for authorization. You can omit this path parameter and either use the X-Api-Key header, or the API key tied to your IP address without any header.
     * @param nodeType Type of the node to access for Algorand.
     * @returns any OK
     * @throws ApiError
     */
    public static nodeJsonPostRpcDriver(
        chain: 'BTC' | 'ONE' | 'ADA' | 'BSC' | 'XDC' | 'LTC' | 'DOGE' | 'BCH' | 'ETH' | 'CELO' | 'XLM' | 'MATIC' | 'VET' | 'EGLD' | 'ALGO' | 'SOL' | 'KLAY' | 'KCS' | 'LUNA' | 'LISK' | 'EOS',
        rpcPath: string,
        requestBody: any,
        xApiKey?: string,
        nodeType?: 'ALGOD' | 'INDEXER',
    ): CancelablePromise<any> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/node/${chain}/${xApiKey}/${rpcPath}`,
            query: {
                'nodeType': nodeType,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * RPC HTTP driver
     * <h4>2 credits per API call.</h4><br/>
     * <p>Use this endpoint URL as an http-based JSON RPC driver to connect directly to the blockchain node provided by Tatum.<br/>
     * Tatum now supports JSON RPC nodes on these blockchains:<br/>
     * <ul>
     * <li><b><a href="https://docs.terra.money/docs/develop/reference/README.html" target="_blank">Terra Luna</a></b></li>
     * <li><b><a href="https://developers.stellar.org/api" target="_blank">Stellar</a></b></li>
     * <li><b><a href="https://docs.elrond.com/sdk-and-tools/rest-api/nodes/" target="_blank">Elrond</a></b></li>
     * <li><b><a href="https://developer.algorand.org/docs/rest-apis/restendpoints/" target="_blank">Algorand</a></b></li>
     * </ul>
     * </p>
     *
     * @param chain Blockchain to communicate with.
     * @param rpcPath `**` path of rpc call.
     * @param requestBody
     * @param xApiKey Tatum X-API-Key used for authorization. You can omit this path parameter and either use the X-Api-Key header, or the API key tied to your IP address without any header.
     * @param nodeType Type of the node to access for Algorand.
     * @returns any OK
     * @throws ApiError
     */
    public static nodeJsonRpcPutDriver(
        chain: 'EGLD' | 'ALGO' | 'LUNA' | 'XLM',
        rpcPath: string,
        requestBody: any,
        xApiKey?: string,
        nodeType?: 'ALGOD' | 'INDEXER',
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
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

    /**
     * RPC HTTP driver
     * <h4>2 credits per API call.</h4><br/>
     * <p>Use this endpoint URL as an http-based JSON RPC driver to connect directly to the blockchain node provided by Tatum.<br/>
     * Tatum now supports JSON RPC nodes on these blockchains:<br/>
     * <ul>
     * <li><b><a href="https://developers.stellar.org/api" target="_blank">Stellar</a></b></li>
     * <li><b><a href="https://docs.terra.money/docs/develop/reference/README.html" target="_blank">Terra Luna</a></b></li>
     * <li><b><a href="https://docs.elrond.com/sdk-and-tools/rest-api/nodes/" target="_blank">Elrond</a></b></li>
     * <li><b><a href="https://developer.algorand.org/docs/rest-apis/restendpoints/" target="_blank">Algorand</a></b></li>
     * <li><b><a href="https://lisk.com/documentation/lisk-service/references/api.html" target="_blank">Lisk</a></b></li>
     * </ul>
     * </p>
     *
     * @param chain Blockchain to communicate with.
     * @param rpcPath `**` path of rpc call.
     * @param xApiKey Tatum X-API-Key used for authorization. You can omit this path parameter and either use the X-Api-Key header, or the API key tied to your IP address without any header.
     * @param nodeType Type of the node to access for Algorand.
     * @returns any OK
     * @throws ApiError
     */
    public static nodeJsonRpcGetDriver(
        chain: 'EGLD' | 'ALGO' | 'XLM' | 'LUNA' | 'LISK' | 'VET',
        rpcPath: string,
        xApiKey?: string,
        nodeType?: 'ALGOD' | 'INDEXER',
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
                500: `Internal server error. There was an error on the server while processing the request.`,
            },
        });
    }

}