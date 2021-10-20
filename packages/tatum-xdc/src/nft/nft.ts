import {
    get,
    post,
    Currency,
    BurnErc721,
    DeployErc721,
    MintErc721,
    MintMultipleErc721,
    TransferErc721,
    TransactionHash,
    UpdateCashbackErc721,
} from '@tatumio/tatum-core';

export const mintNFT = (body: MintErc721): Promise<TransactionHash> => post(`/v3/nft/mint`, body);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftGetBalanceErc721" target="_blank">Tatum API documentation</a>
 */
export const getNFTsByAddress = async (chain: Currency, contractAddress: string, address: string): Promise<string[]> =>
    get(`/v3/nft/balance/${chain}/${contractAddress}/${address}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftGetContractAddress" target="_blank">Tatum API documentation</a>
 */
export const getNFTContractAddress = async (chain: Currency, txId: string): Promise<{ contractAddress: string }> =>
    get(`/v3/nft/address/${chain}/${txId}`);

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftGetMetadataErc721" target="_blank">Tatum API documentation</a>
 */
export const getNFTMetadataURI = async (chain: Currency, contractAddress: string, tokenId: string, account?: string): Promise<{ data: string }> => {
    let url = `/v3/nft/metadata/${chain}/${contractAddress}/${tokenId}`;
    if (account) {
        url += `?account=${account}`;
    }
    return get(url);
};

/**
 * Get IPFS image URL from the NFT with the IPFS Metadata scheme. URL
 * @param chain chain where NFT token is
 * @param contractAddress contract address of the NFT token
 * @param tokenId ID of the token
 * @param account FLOW only - account where the token is minted
 */
export const getNFTImage = async (chain: Currency, contractAddress: string, tokenId: string, account?: string): Promise<{ originalUrl: string, publicUrl: string }> => {
  throw new Error(`Unsupported chain ${chain || 'blockchain'}`);
};

/**
 * For more details, see <a href="https://tatum.io/apidoc#operation/NftGetRoyaltyErc721" target="_blank">Tatum API documentation</a>
 */
export const getNFTRoyalty = async (chain: Currency, contractAddress: string, tokenId: string): Promise<{ data: string }> => get(`/v3/nft/royalty/${chain}/${contractAddress}/${tokenId}`);

/**
 * Deploy new NFT smart contract, which will be used for later minting.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const deployNFT = async (testnet: boolean, body: DeployErc721, provider?: string): Promise<TransactionHash> => {
  throw new Error(`Unsupported chain ${body.chain || 'blockchain'}`);
};

/**
 * Mint new NFT token with metadata stored on the IPFS.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param file file to be stored on the IPFS
 * @param name name of the file
 * @param description description of the file
 * @param scheme optional JSON Metadata scheme
 * @param provider optional provider do broadcast tx
 */
export const createNFT = async (testnet: boolean, body: MintErc721,
                                file: Buffer,
                                name: string,
                                description?: string,
                                scheme?: any, provider?: string) => {
  throw new Error(`Unsupported chain ${body.chain || 'blockchain'}`);
};

/**
 * Mint new NFT token.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintNFTWithUri = async (testnet: boolean, body: MintErc721, provider?: string): Promise<TransactionHash> => {
  throw new Error(`Unsupported chain ${body.chain || 'blockchain'}`);
};

/**
 * Mint multiple new NFT tokens.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintMultipleNFTWithUri = async (testnet: boolean, body: MintMultipleErc721, provider?: string) => {
  throw new Error(`Unsupported chain ${body.chain || 'blockchain'}`);
};

/**
 * Burn new NFT token. Token will no longer exists.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const burnNFT = async (testnet: boolean, body: BurnErc721, provider?: string) => {
  throw new Error(`Unsupported chain ${body.chain || 'blockchain'}`);
};

/**
 * Update royalty cashback as author of the NFT token.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const updateCashbackForAuthorNFT = async (testnet: boolean, body: UpdateCashbackErc721, provider?: string) => {
  throw new Error(`Unsupported chain ${body.chain || 'blockchain'}`);
};

/**
 * Transfer new NFT token to new recipient.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const transferNFT = async (testnet: boolean, body: TransferErc721, provider?: string) => {
  throw new Error(`Unsupported chain ${body.chain || 'blockchain'}`);
};
