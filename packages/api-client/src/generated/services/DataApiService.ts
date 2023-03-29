/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BlockNumber } from '../models/BlockNumber';
import type { Chain } from '../models/Chain';
import type { ChainEnum } from '../models/ChainEnum';
import type { ChainUtxoEnum } from '../models/ChainUtxoEnum';
import type { ExcludeMetadata } from '../models/ExcludeMetadata';
import type { NextPage } from '../models/NextPage';
import type { NftMetadata } from '../models/NftMetadata';
import type { NftMetadataURI } from '../models/NftMetadataURI';
import type { Offset } from '../models/Offset';
import type { PageSize } from '../models/PageSize';
import type { PrevPage } from '../models/PrevPage';
import type { TokenAddress } from '../models/TokenAddress';
import type { TokenId } from '../models/TokenId';
import type { TokenType } from '../models/TokenType';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class DataApiService {

  /**
   * Get tokens from a collection
   * <p><b>10 credits per API call</b></p>
   * <p>Get all NFTs (ERC-721 and ERC-1155) and multitokens (ERC-1155 only) of your favorite collections! Our API lets you search for all tokens on:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon / polygon-mumbai</li>
   * </ul>
   * <p>To get started:</p>
   * <ul>
   * <li>Provide a chain name and comma-separated list of collection addresses. Our API will return relevant information about each token, including its name, description, image, and more.</li>
   * <li>Aside from relevant information about each token, the response also contains metadata (they can, however, be excluded by setting <code>excludeMetadata</code> to <code>true</code>).</li>
   * <li>If not specified, the API returns results for all supported types of tokens (nft, multitokens), but you can also choose to filter only one <code>tokenType</code>.</li>
   * </ul>
   *
   * @param chain The blockchain to work with.
   * @param collectionAddresses The blockchain addresses of the collections.
   * It is possible to enter list of up to 10 addresses as a comma separated string.
   *
   * @param tokenTypes The option to select only specific token types.
   * It is possible to enter list of multiple types as a comma separated string.
   * Use nft (includes ERC-721 and ERC-1155) or multitoken (ERC-1155 only).
   *
   * @param excludeMetadata The option to exclude metadata from the response.
   * @param pageSize The number of items per page (default is 50).
   * @param offset The offset to obtain next page of the data.
   * @returns any OK
   * @throws ApiError
   */
  public static getCollections(
    chain: ChainEnum,
    collectionAddresses: string,
    tokenTypes?: 'nft' | 'multitoken',
    excludeMetadata?: ExcludeMetadata,
    pageSize?: PageSize,
    offset?: Offset,
  ): CancelablePromise<Array<{
    chain?: Chain;
    tokenId?: TokenId;
    tokenAddress?: TokenAddress;
    tokenType?: TokenType;
    metadataURI?: NftMetadataURI;
    metadata?: NftMetadata;
  }>> {
    return __request({
      method: 'GET',
      path: `/v3/data/collections`,
      query: {
        'chain': chain,
        'collectionAddresses': collectionAddresses,
        'tokenTypes': tokenTypes,
        'excludeMetadata': excludeMetadata,
        'pageSize': pageSize,
        'offset': offset,
      },
      errors: {
        400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
        401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
        403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
        500: `Internal server error. There was an error on the server during the processing of the request.`,
      },
    });
  }

  /**
   * Get token metadata
   * <p><b>5 credits per API call</b></p>
   * <p>Get metadata of NFTs (ERC-721 and ERC-1155) or multitokens (ERC-1155 only) by IDs for a given token address! Our API lets you search for all tokens on:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon / polygon-mumbai</li>
   * </ul>
   * <p>To get started:</p>
   * <ul>
   * <li>Provide a chain name, token address and comma-separated list of IDs. Our API will return relevant metadata about each specified token, including its name, description, image, and more.</li>
   * <li>Aside from the metadata information, the response also contains token types and metadata url minted in each token.</li>
   * </ul>
   *
   * @param chain The blockchain to work with.
   * @param tokenAddress The blockchain address of the NFT to get metadata for.
   * @param tokenIds The IDs of the tokens to get metadata for.
   * It is possible to enter list of multiple IDs as a comma separated string.
   *
   * @returns any OK
   * @throws ApiError
   */
  public static getMetadata(
    chain: ChainEnum,
    tokenAddress: TokenAddress,
    tokenIds: string,
  ): CancelablePromise<Array<{
    chain?: Chain;
    tokenId?: TokenId;
    tokenAddress?: TokenAddress;
    tokenType?: TokenType;
    metadataURI?: NftMetadataURI;
    metadata?: NftMetadata;
  }>> {
    return __request({
      method: 'GET',
      path: `/v3/data/metadata`,
      query: {
        'chain': chain,
        'tokenAddress': tokenAddress,
        'tokenIds': tokenIds,
      },
      errors: {
        400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
        401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
        403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
        500: `Internal server error. There was an error on the server during the processing of the request.`,
      },
    });
  }

  /**
   * Get balances of addresses
   * <p><b>50 credits per API call</b></p>
   * <p>Get balances of fungible tokens (ERC-20), NFTs (ERC-721 and ERC-1155) or multitokens (ERC-1155 only) for a specific wallet address on the following blockchains:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon / polygon-mumbai</li>
   * </ul>
   * <p>To get started:</p>
   * <ul>
   * <li>Provide a chain name and comma-separated list of addresses. Our API will return balances of each token along with further information such as its type, id, and more.</li>
   * <li>Aside from relevant information about each token and its balance, the response also contains metadata (they can, however, be excluded by setting <code>excludeMetadata</code> to <code>true</code>).</li>
   * <li>If not specified, the API returns balances for all supported types of tokens (fungible tokens, nft, multitokens), but you can also choose to filter specific <code>tokenTypes</code>.</li>
   * </ul>
   *
   * @param chain The blockchain to work with.
   * @param addresses The blockchain public wallet addresses.
   * It is possible to enter list of up to 10 addresses as a comma separated string.
   *
   * @param tokenTypes The option to select only specific token types.
   * It is possible to enter list of multiple types as a comma separated string.
   * Use fungible (ERC-20), nft (includes ERC-721 and ERC-1155) or multitoken (ERC-1155 only).
   *
   * @param excludeMetadata The option to exclude metadata from the response.
   * @param pageSize The number of items per page (default is 50).
   * @param offset The offset to obtain next page of the data.
   * @returns any OK
   * @throws ApiError
   */
  public static getBalances(
    chain: ChainEnum,
    addresses: string,
    tokenTypes?: 'nft' | 'multitoken' | 'fungible',
    excludeMetadata?: ExcludeMetadata,
    pageSize?: PageSize,
    offset?: Offset,
  ): CancelablePromise<{
    /**
     * List of all balances for all selected tokens.
     */
    result?: any[];
    prevPage?: PrevPage;
    nextPage?: NextPage;
  }> {
    return __request({
      method: 'GET',
      path: `/v3/data/balances`,
      query: {
        'chain': chain,
        'addresses': addresses,
        'tokenTypes': tokenTypes,
        'excludeMetadata': excludeMetadata,
        'pageSize': pageSize,
        'offset': offset,
      },
      errors: {
        400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
        401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
        403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
        500: `Internal server error. There was an error on the server during the processing of the request.`,
      },
    });
  }

  /**
   * Get owners of a token
   * <p><b>20 credits per API call</b></p>
   * <p>Get all addresses that own your favorite token (ERC-20, ERC-721 or ERC-1155)! Our API lets you search for all token owners on:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon / polygon-mumbai</li>
   * </ul>
   * <p>To get started:</p>
   * <ul>
   * <li>Provide a chain name and address of any fungible token, NFT or multitoken collection. Our API will return a list of addresses of all of their owners.</li>
   * <li>You can also get an owner of a specific NFT by specifying <code>tokenId</code>. In case of multitoken, result is an array of addresses.</li>
   * </ul>
   *
   * @param chain The blockchain to work with.
   * @param tokenAddress The blockchain address of the token (NFT collection or any fungible token).
   * @param tokenId The ID of a specific NFT token.
   * @param pageSize The number of items per page (default is 50).
   * @param offset The offset to obtain next page of the data.
   * @returns any[] OK
   * @throws ApiError
   */
  public static getOwners(
    chain: ChainEnum,
    tokenAddress: TokenAddress,
    tokenId?: TokenId,
    pageSize?: PageSize,
    offset?: Offset,
  ): CancelablePromise<any[]> {
    return __request({
      method: 'GET',
      path: `/v3/data/owners`,
      query: {
        'chain': chain,
        'tokenAddress': tokenAddress,
        'tokenId': tokenId,
        'pageSize': pageSize,
        'offset': offset,
      },
      errors: {
        400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
        401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
        403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
        500: `Internal server error. There was an error on the server during the processing of the request.`,
      },
    });
  }

  /**
   * Check owner of token
   * <p><b>1 credit per API call</b></p>
   * <p>Check if wallet address owns any specified token (ERC-20, ERC-721 or ERC-1155) on the following blockchains:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon / polygon-mumbai</li>
   * </ul>
   * <p>To get started:</p>
   * <ul>
   * <li>Provide a chain name, wallet address and address of any fungible token, NFT or multitoken collection. Our API will return <code>true</code> if provided wallet address owns them.</li>
   * <li>If wallet address does not own the specific token, response body is <code>false</code> and status code is <code>200</code>.</li>
   * <li>It is also possible to check if wallet address owns a specific NFT by specifying a <code>tokenId</code>.</li>
   * </ul>
   *
   * @param chain The blockchain to work with.
   * @param address The blockchain address of the wallet.
   * @param tokenAddress The blockchain address of the token (NFT collection or any fungible token).
   * @param tokenId The ID of a specific NFT token.
   * @returns boolean OK
   * @throws ApiError
   */
  public static checkOwner(
    chain: ChainEnum,
    address: string,
    tokenAddress: TokenAddress,
    tokenId?: TokenId,
  ): CancelablePromise<boolean> {
    return __request({
      method: 'GET',
      path: `/v3/data/owners/address`,
      query: {
        'chain': chain,
        'address': address,
        'tokenAddress': tokenAddress,
        'tokenId': tokenId,
      },
      errors: {
        400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
        401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
        403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
        500: `Internal server error. There was an error on the server during the processing of the request.`,
      },
    });
  }

  /**
   * Get transactions
   * <p><b>20 credits per API call</b></p>
   * <p>Get transactions on the following blockchains:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon / polygon-mumbai</li>
   * </ul>
   * <p>To get started:</p>
   * <ul>
   * <li>Provide a chain name and comma-separated list of addresses. Our API will return all of their transactions along with further information such as their block number, ID of involved token, and more.</li>
   * <li>If not specified, the API returns transactions of various types (fungible, nft, multitoken, native, internal), but you can also choose to filter specific <code>transactionTypes</code>.</li>
   * <li>On top of that, you can add further filters such as specifying block range where the transactions should have occurred, or address and ID of involved tokens.</li>
   * </ul>
   *
   * @param chain The blockchain to work with.
   * @param addresses The blockchain public wallet addresses.
   * It is possible to enter list of up to 10 addresses as a comma separated string.
   *
   * @param transactionTypes The option to filter transaction based on types.
   * It is possible to enter list of multiple types as a comma separated string.
   * Use fungible (ERC-20), nft (ERC-721 and ERC-1155), multitoken (ERC-1155), native or internal.
   *
   * @param tokenAddress Address of a token (smart contract).
   * @param tokenId ID of a token.
   * @param blockFrom Transactions from this block onwards will be included.
   * @param blockTo Transactions up to this block will be included.
   * @param pageSize The number of items per page (default is 50).
   * @param offset The offset to obtain next page of the data.
   * @returns any OK
   * @throws ApiError
   */
  public static getTransactions(
    chain: ChainEnum,
    addresses?: string,
    transactionTypes?: 'fungible,' | 'nft' | 'multitoken' | 'native' | 'internal',
    tokenAddress?: TokenAddress,
    tokenId?: TokenId,
    blockFrom?: BlockNumber,
    blockTo?: BlockNumber,
    pageSize?: PageSize,
    offset?: Offset,
  ): CancelablePromise<{
    /**
     * List of all selected transactions.
     */
    result?: any[];
    prevPage?: PrevPage;
    nextPage?: NextPage;
  }> {
    return __request({
      method: 'GET',
      path: `/v3/data/transactions`,
      query: {
        'chain': chain,
        'addresses': addresses,
        'transactionTypes': transactionTypes,
        'tokenAddress': tokenAddress,
        'tokenId': tokenId,
        'blockFrom': blockFrom,
        'blockTo': blockTo,
        'pageSize': pageSize,
        'offset': offset,
      },
      errors: {
        400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
        401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
        403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
        500: `Internal server error. There was an error on the server during the processing of the request.`,
      },
    });
  }

  /**
   * Get transactions by hash
   * <p><b>5 credits per API call</b></p>
   * <p>Get transactions by hash on the following blockchains:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon / polygon-mumbai</li>
   * </ul>
   * <p>To get started:</p>
   * <ul>
   * <li>Provide a chain name and transaction hash, and our API will return a list of transactions with that hash.</li>
   * <li>The response will contain all the relevant information about specified transactions such as their block number, IDs of involved token, and more.</li>
   * </ul>
   *
   * @param chain The blockchain to work with.
   * @param hash Hash of the transaction.
   * @returns any[] OK
   * @throws ApiError
   */
  public static getTransactionsByHash(
    chain: ChainEnum,
    hash: string,
  ): CancelablePromise<any[]> {
    return __request({
      method: 'GET',
      path: `/v3/data/transactions/hash`,
      query: {
        'chain': chain,
        'hash': hash,
      },
      errors: {
        400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
        401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
        403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
        500: `Internal server error. There was an error on the server during the processing of the request.`,
      },
    });
  }

  /**
   * Get specified events
   * <p><b>20 credits per API call</b></p>
   * <p>Get all events on given addresses and / or in the requested block range on the following blockchains:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon / polygon-mumbai</li>
   * </ul>
   * <p>To get started:</p>
   * <ul>
   * <li>To improve response times and obtain specific data, it is recommended to use proper filtering techniques. Please provide a chain name and a combination of filters that will accomplish this (at least block range or contract addresses must be specified).</li>
   * <li>It is possible to specify multiple contract addresses at once by passing them as a comma separated string.</li>
   * <li>If block range is not specified, the API attempts to go through all available blocks, which may result in a timeout error.</li>
   * <li>It is recommended to filter only one specific type of events, which comes with built-in decoding for all the supported types.</li>
   * <li>It is, however, also possible to filter by signature hashes, which can be passed together as a comma separated string.</li>
   * </ul>
   * <p>As noted above, aside from general info and hashed event data, the API also decodes them for you in case you filter by one of the following supported event types:</p>
   * <ul>
   * <li><code>tokenTransfer</code>: All transfers of fungible tokens (including stablecoins) and NFTs as per ERC-20 and ERC-721 standard.</li>
   * <li><code>multitokenTransfer</code>: All transfers of multitokens (both single transfers and batch transfers) as per ERC-1155 standard.</li>
   * <li><code>stablecoinTransfer</code>: Refers to the transfer of specific stablecoins on the mainnet. Typically, the top 10 to 16 stablecoins on each chain according to CoinMarketCap are included. If the <code>contractAddresses</code> parameter is also used in the filter combination, any tokens specified in it will also be included in the list.</li>
   * <li><code>uniswapTrade</code>: Provides all swap events that occur on both Uniswap V2 and V3. In some cases, it may not be possible to map the swapped amounts to specific tokens. As a result, certain decoded data such as token amounts might be missing or in the original big number format. This will be indicated by the response parameter <code>partiallyRaw: true</code>.</li>
   * </ul>
   *
   * @param chain The blockchain to work with.
   * @param contractAddresses The blockchain addresses of the contracts where requested events were emitted.
   * It is possible to enter list of up to 10 addresses as a comma separated string.
   *
   * @param blockFrom First block to start from (including this one).
   * @param blockTo Last block to finish on (including this one).
   * @param eventType The type of events that should be returned, which comes with decoded data in the response
   * (cannot be used together with signatures).
   *
   * @param signatures The types of events that should be returned, specified by hashed signature
   * (cannot be used together with eventType).
   * It is possible to enter list of multiple signatures as a comma separated string.
   *
   * @param pageSize The number of items per page (default is 50).
   * @param offset The offset to obtain next page of the data.
   * @returns any[] OK
   * @throws ApiError
   */
  public static getEvents(
    chain: ChainEnum,
    contractAddresses: string,
    blockFrom: BlockNumber,
    blockTo: BlockNumber,
    eventType: 'tokenTransfer' | 'multitokenTransfer' | 'stablecoinTransfer' | 'uniswapTrade',
    signatures?: string,
    pageSize?: PageSize,
    offset?: Offset,
  ): CancelablePromise<any[]> {
    return __request({
      method: 'GET',
      path: `/v3/data/events`,
      query: {
        'chain': chain,
        'contractAddresses': contractAddresses,
        'blockFrom': blockFrom,
        'blockTo': blockTo,
        'eventType': eventType,
        'signatures': signatures,
        'pageSize': pageSize,
        'offset': offset,
      },
      errors: {
        400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
        401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
        403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
        500: `Internal server error. There was an error on the server during the processing of the request.`,
      },
    });
  }

  /**
   * Get specified blocks
   * <p><b>10 credits per API call</b></p>
   * <p>Get information about blocks (when they were added, how many NFTs and events were ingested and list of transaction hashes that were processed within them) on the following blockchains:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon / polygon-mumbai</li>
   * </ul>
   * <p>To get started, provide a chain and specify one of the filters listed below (combination of these filters is not allowed):</p>
   * <ul>
   * <li>List of block numbers separated by comma</li>
   * <li>Range of block numbers</li>
   * <li>Date range when blocks were processed</li>
   * </ul>
   *
   * @param chain The blockchain to work with.
   * @param blockIds List of block numbers, separated by comma.
   * @param blockFrom Range of block numbers. Both blockFrom and blockTo need to be specified.
   * @param blockTo Range of block numbers. Both blockFrom and blockTo need to be specified.
   * @param timeFrom Date range when blocks were processed. Both timeFrom and timeTo need to be specified.
   * @param timeTo Date range when blocks were processed. Both timeFrom and timeTo need to be specified.
   * @param pageSize The number of items per page (default is 50).
   * @param offset The offset to obtain next page of the data.
   * @returns any[] OK
   * @throws ApiError
   */
  public static getBlocks(
    chain: ChainEnum,
    blockIds?: Array<number>,
    blockFrom?: BlockNumber,
    blockTo?: BlockNumber,
    timeFrom?: string,
    timeTo?: string,
    pageSize?: PageSize,
    offset?: Offset,
  ): CancelablePromise<any[]> {
    return __request({
      method: 'GET',
      path: `/v3/data/blocks`,
      query: {
        'chain': chain,
        'blockIds': blockIds,
        'blockFrom': blockFrom,
        'blockTo': blockTo,
        'timeFrom': timeFrom,
        'timeTo': timeTo,
        'pageSize': pageSize,
        'offset': offset,
      },
      errors: {
        400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
        401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
        403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
        500: `Internal server error. There was an error on the server during the processing of the request.`,
      },
    });
  }

  /**
   * Get latest block
   * <p><b>1 credit per API call</b></p>
   * <p>Get information about latest added block on the following blockchains:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon / polygon-mumbai</li>
   * </ul>
   * <p>To get started, you can just provide a chain.</p>
   *
   * @param chain The blockchain to work with.
   * @returns any OK
   * @throws ApiError
   */
  public static getLatestBlock(
    chain: ChainEnum,
  ): CancelablePromise<any> {
    return __request({
      method: 'GET',
      path: `/v3/data/blocks/latest`,
      query: {
        'chain': chain,
      },
      errors: {
        400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
        401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
        403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
        500: `Internal server error. There was an error on the server during the processing of the request.`,
      },
    });
  }

  /**
   * Get information about collection or token
   * <p><b>1 credit per API call</b></p>
   * <p>Get information about your favorite token! Our API lets you search for all tokens on:</p>
   * <ul>
   * <li>Celo - celo / celo-testnet</li>
   * <li>Ethereum - ethereum / ethereum-sepolia</li>
   * <li>BNB (Binance) Smart Chain - bsc / bsc-testnet</li>
   * <li>Polygon - polygon / polygon-mumbai</li>
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
  ): CancelablePromise<any> {
    return __request({
      method: 'GET',
      path: `/v3/data/tokens`,
      query: {
        'chain': chain,
        'tokenAddress': tokenAddress,
        'tokenId': tokenId,
      },
      errors: {
        400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
        401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
        403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
        404: `Collection or token not found.`,
        500: `Internal server error. There was an error on the server during the processing of the request.`,
      },
    });
  }

  /**
   * Get unspent UTXOs for an address
   * <p><b>100 credits per API call</b></p>
   * <p>Get unspent UTXOs for a specific address up to a specific total amount.
   * If you want to prepare a transaction on UTXO-based chains like Bitcoin, you need to enter unspent UTXOs to be able to perform a transaction. By providing ```totalValue``` as a total, our API will return a list of UTXOs that will be enough to cover the transaction.</p>
   * Our API lets you get the unpenst UTXOs for a specific address on:</p>
   * <ul>
   * <li>Bitcoin - bitcoin / bitcoin-testnet</li>
   * <li>Litecoin - litecoin / litecoin-testnet</li>
   * <li>Dogecoin - doge / doge-testnet</li>
   * </ul>
   * <p>To get started:</p>
   * <ul>
   * <li>Provide a chain and address you want to list unspent UTXOs for. If available, our API will return information about the unspent UTXOs for a specific address. API traverses latest 200k incoming transactoins.</li>
   * </ul>
   *
   * @param chain The blockchain to work with.
   * @param address The blockchain address.
   * @param totalValue The total amount of transaction you want to send. Only UTXOs up to this amount will be returned, so you will not spend more than you need.
   * @returns any OK
   * @throws ApiError
   */
  public static getUtxosByAddress(
    chain: ChainUtxoEnum,
    address: string,
    totalValue?: number,
  ): CancelablePromise<Array<{
    chain: ChainUtxoEnum;
    /**
     * Address of the UTXO
     */
    address: string;
    /**
     * Hash of the transaction this UTXO is present in
     */
    txHash: string;
    /**
     * Index of the UTXO in the transaction
     */
    index: number;
    /**
     * Value of the UTXO, in BTC, LTC or DOGE.
     */
    value: number;
  }>> {
    return __request({
      method: 'GET',
      path: `/v3/data/utxos`,
      query: {
        'chain': chain,
        'address': address,
        'totalValue': totalValue,
      },
      errors: {
        400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
        401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
        403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
        500: `Internal server error. There was an error on the server during the processing of the request.`,
      },
    });
  }

}