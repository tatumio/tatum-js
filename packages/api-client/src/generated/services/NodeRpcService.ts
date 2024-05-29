/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NodeRpcGetChains } from '../models/NodeRpcGetChains';
import type { NodeRpcPostChains } from '../models/NodeRpcPostChains';
import type { NodeRpcPutChains } from '../models/NodeRpcPutChains';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class NodeRpcService {

    /**
     * Connect to the blockchain node through an RPC driver
     * <p><b>The number of credits consumed depends on the number of methods submitted in an API call:<br/>
     * * 50 credits per debug*_/trace* method (for EVM-based blockchains)<br/>
     * * 50 credits per EOS <a href="https://developers.eos.io/manuals/eos/v2.0/nodeos/plugins/trace_api_plugin/api-reference/index" target="_blank">Trace API</a> methods <br/>
     * * 5 credits per eth_call method (for EVM-based blockchains)<br/>
     * * 2 credits per any other RPC method</b></p>
     * <p>Connect directly to the blockchain node provided by Tatum.</p>
     * <p>The <code>POST</code> method is used. The API endpoint URL acts as an HTTP-based RPC driver.</p>
     *
     * @param xApiKey Tatum X-API-Key used for authorization. You can omit this path parameter and either use the X-Api-Key header, or the API key tied to your IP address without any header.
     * @param chain Blockchain to communicate with.
     * @param rpcPath Optional path of rpc call for non EVM nodes, e.g. Algorand or Stellar.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static nodeJsonPostRpcDriver(
        xApiKey: string,
        chain: NodeRpcPostChains,
        rpcPath: string,
        requestBody: any,
    ): CancelablePromise<any> {
        return __request({
            method: 'POST',
            path: `/v3/blockchain/node/${chain}/${xApiKey}/${rpcPath}`,
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
     * Connect to the blockchain node through an RPC driver
     * <p><b>2 credits per RPC method in an API call</b></p>
     * <p>Connect directly to the blockchain node provided by Tatum.</p>
     * <p>The <code>PUT</code> method is used. The API endpoint URL acts as an HTTP-based RPC driver.</p>
     *
     * @param xApiKey Tatum X-API-Key used for authorization. You can omit this path parameter and either use the X-Api-Key header, or the API key tied to your IP address without any header.
     * @param chain Blockchain to communicate with.
     * @param rpcPath Optional path of rpc call for non EVM nodes, e.g. Algorand or Stellar.
     * @param requestBody
     * @returns any OK
     * @throws ApiError
     */
    public static nodeJsonRpcPutDriver(
        xApiKey: string,
        chain: NodeRpcPutChains,
        rpcPath: string,
        requestBody: any,
    ): CancelablePromise<any> {
        return __request({
            method: 'PUT',
            path: `/v3/blockchain/node/${chain}/${xApiKey}/${rpcPath}`,
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
     * Connect to the blockchain node through an RPC driver
     * <p><b>2 credits per RPC method in an API call</b></p>
     * <p>Connect directly to the blockchain node provided by Tatum.</p>
     * <p>The <code>GET</code> method is used. The API endpoint URL acts as an HTTP-based RPC driver.</p>
     *
     * @param xApiKey Tatum X-API-Key used for authorization. You can omit this path parameter and either use the X-Api-Key header, or the API key tied to your IP address without any header.
     * @param chain Blockchain to communicate with.
     * @param rpcPath Optional path of rpc call for non EVM nodes, e.g. Algorand or Stellar.
     * @returns any OK
     * @throws ApiError
     */
    public static nodeJsonRpcGetDriver(
        xApiKey: string,
        chain: NodeRpcGetChains,
        rpcPath: string,
    ): CancelablePromise<any> {
        return __request({
            method: 'GET',
            path: `/v3/blockchain/node/${chain}/${xApiKey}/${rpcPath}`,
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

}
