/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ChainEnum } from '../models/ChainEnum';
import type { FungibleInfo } from '../models/FungibleInfo';
import type { FungibleInfoTezos } from '../models/FungibleInfoTezos';
import type { MultitokenInfo } from '../models/MultitokenInfo';
import type { NftInfo } from '../models/NftInfo';
import type { NftInfoTezos } from '../models/NftInfoTezos';
import type { NftTokenInfo } from '../models/NftTokenInfo';
import type { TokenAddress } from '../models/TokenAddress';
import type { TokenId } from '../models/TokenId';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class TokenApiService {

    /**
     * Get information about collection or token
     * <p><b>1 credit per API call</b></p>
     * <p>Get information about your favorite token! Our API lets you search for all tokens on:</p>
     * <ul>
     * <li>Celo - celo / celo-testnet</li>
     * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
     * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
     * <li>Polygon - polygon</li>
     * <li>Horizen EON - eon-mainnet</li>
     * <li>Chiliz - chiliz-mainnet</li>
     * <li>Tezos - tezos-mainnet</li>
     * </ul>
     * <p>To get started:</p>
     * <ul>
     * <li>Provide a chain and address of any fungible token, NFT or multitoken collection. If available, our API will return information about them such as their name, symbol, supply, and more.</li>
     * <li>You can also get extra infomation (such as metadata) of a specific NFT or multitoken by passing <code>tokenId</code> as a query parameter.</li>
     * </ul>
     *
     * @param chain The blockchain to work with.
     * @param tokenAddress The blockchain address of the token (NFT collection or any fungible token).
     * @param tokenId The ID of a specific NFT token.
     * @returns any OK
     * @throws ApiError
     */
    public static getTokensV4(
        chain: ChainEnum,
        tokenAddress: TokenAddress,
        tokenId?: TokenId,
    ): CancelablePromise<(FungibleInfo | NftInfo | MultitokenInfo | NftTokenInfo | NftInfoTezos | FungibleInfoTezos)> {
        return __request({
            method: 'GET',
            path: `/v4/data/tokens`,
            query: {
                'chain': chain,
                'tokenAddress': tokenAddress,
                'tokenId': tokenId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                404: `Collection or token not found.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * @deprecated
     * Get information about collection or token
     * <p><b>1 credit per API call</b></p>
     * <p>Get information about your favorite token! Our API lets you search for all tokens on:</p>
     * <ul>
     * <li>Celo - celo / celo-testnet</li>
     * <li>Ethereum - ethereum / ethereum-sepolia / ethereum-holesky</li>
     * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
     * <li>Polygon - polygon</li>
     * <li>Horizen EON - eon-mainnet</li>
     * <li>Chiliz - chiliz-mainnet</li>
     * <li>Tezos - tezos-mainnet</li>
     * </ul>
     * <p>To get started:</p>
     * <ul>
     * <li>Provide a chain and address of any fungible token, NFT or multitoken collection. If available, our API will return information about them such as their name, symbol, supply, and more.</li>
     * <li>You can also get extra infomation (such as metadata) of a specific NFT or multitoken by passing <code>tokenId</code> as a query parameter.</li>
     * </ul>
     *
     * @param chain The blockchain to work with.
     * @param tokenAddress The blockchain address of the token (NFT collection or any fungible token).
     * @param tokenId The ID of a specific NFT token.
     * @returns any OK
     * @throws ApiError
     */
    public static getTokens(
        chain: ChainEnum,
        tokenAddress: TokenAddress,
        tokenId?: TokenId,
    ): CancelablePromise<(FungibleInfo | NftInfo | MultitokenInfo | NftTokenInfo | NftInfoTezos | FungibleInfoTezos)> {
        return __request({
            method: 'GET',
            path: `/v3/data/tokens`,
            query: {
                'chain': chain,
                'tokenAddress': tokenAddress,
                'tokenId': tokenId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to perform the operation due to logical error or invalid permissions.`,
                404: `Collection or token not found.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

}