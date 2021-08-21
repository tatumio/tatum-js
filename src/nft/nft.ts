import {axios, get, post} from '../connector/tatum';
import {
    CeloBurnErc721,
    CeloDeployErc721,
    CeloMintErc721,
    CeloMintMultipleErc721,
    CeloTransferErc721,
    CeloUpdateCashbackErc721,
    Currency,
    EthBurnErc721,
    EthDeployErc721,
    EthMintErc721,
    EthMintMultipleErc721,
    EthTransferErc721,
    FlowBurnNft,
    FlowDeployNft,
    FlowMintMultipleNft,
    FlowMintNft,
    FlowTransferNft,
    TransactionHash,
    TronBurnTrc721,
    TronDeployTrc721,
    TronMintMultipleTrc721,
    TronMintTrc721,
    TronTransferTrc721,
    TronUpdateCashbackTrc721,
    UpdateCashbackErc721,
} from '../model';
import {ipfsUpload} from '../storage';
import {
    sendBep721Transaction,
    sendBurnBep721Transaction,
    sendBurnErc721Transaction,
    sendCeloBurnErc721Transaction,
    sendCeloDeployErc721Transaction,
    sendCeloMintCashbackErc721Transaction,
    sendCeloMintErc721Transaction,
    sendCeloMintMultipleCashbackErc721Transaction,
    sendCeloMintMultipleErc721Transaction,
    sendCeloTransferErc721Transaction,
    sendCeloUpdateCashbackForAuthorErc721Transaction,
    sendDeployBep721Transaction,
    sendDeployErc721Transaction,
    sendErc721Transaction,
    sendEthMintMultipleCashbackErc721SignedTransaction,
    sendFlowNftBurnToken,
    sendFlowNftMintMultipleToken,
    sendFlowNftMintToken,
    sendFlowNftTransferToken,
    sendMintBep721Transaction,
    sendMintBepCashback721Transaction,
    sendMintCashbackErc721Transaction,
    sendMintErc721Transaction,
    sendMintMultipleBep721Transaction,
    sendMintMultipleCashbackBep721Transaction,
    sendMintMultipleErc721Transaction,
    sendOneBurn721SignedTransaction,
    sendOneDeploy721SignedTransaction,
    sendOneMint721SignedTransaction,
    sendOneMintCashback721SignedTransaction,
    sendOneMintMultiple721SignedTransaction,
    sendOneMintMultipleCashback721SignedTransaction,
    sendOneTransfer721SignedTransaction,
    sendOneUpdateCashbackForAuthor721SignedTransaction,
    sendPolygonBurnErc721SignedTransaction,
    sendPolygonDeployErc721SignedTransaction,
    sendPolygonMintCashbackErc721SignedTransaction,
    sendPolygonMintErc721SignedTransaction,
    sendPolygonMintMultipleCashbackErc721SignedTransaction,
    sendPolygonMintMultipleErc721SignedTransaction,
    sendPolygonTransferErc721SignedTransaction,
    sendPolygonUpdateCashbackForAuthorErc721SignedTransaction,
    sendTronBurnTrc721SignedTransaction,
    sendTronDeployTrc721SignedTransaction,
    sendTronMintCashbackTrc721SignedTransaction,
    sendTronMintMultipleTrc721SignedTransaction,
    sendTronMintTrc721SignedTransaction,
    sendTronTransferTrc721SignedTransaction,
    sendTronUpdateCashbackForAuthorTrc721SignedTransaction,
    sendUpdateCashbackForAuthorBep721Transaction,
    sendUpdateCashbackForAuthorErc721Transaction,
} from '../transaction';

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
    const {data: metadata} = await getNFTMetadataURI(chain, contractAddress, tokenId, account);
    const metadataUrl = `https://gateway.pinata.cloud/ipfs/${metadata.replace('ipfs://', '')}`;
    const {data} = await axios.get(metadataUrl);
    const imageUrl = data.properties.image.description;
    return {
        originalUrl: imageUrl,
        publicUrl: `https://gateway.pinata.cloud/ipfs/${imageUrl.replace('ipfs://', '')}`
    };
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
export const deployNFT = async (testnet: boolean, body: CeloDeployErc721 | EthDeployErc721 | TronDeployTrc721 | FlowDeployNft, provider?: string): Promise<TransactionHash> => {
    switch (body.chain) {
        case Currency.CELO:
            return sendCeloDeployErc721Transaction(testnet, body as CeloDeployErc721, provider);
        case Currency.ETH:
            return sendDeployErc721Transaction(body as EthDeployErc721, provider);
        case Currency.MATIC:
            return sendPolygonDeployErc721SignedTransaction(testnet, body as EthDeployErc721, provider);
        case Currency.ONE:
            return sendOneDeploy721SignedTransaction(testnet, body as EthDeployErc721, provider);
        case Currency.TRON:
            return sendTronDeployTrc721SignedTransaction(testnet, body as TronDeployTrc721);
        case Currency.BSC:
            return sendDeployBep721Transaction(body as EthDeployErc721, provider);
        case Currency.FLOW:
            return post('/v3/nft/deploy', body, FlowDeployNft);
        default:
            throw new Error('Unsupported currency');
    }
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
export const createNFT = async (testnet: boolean, body: CeloMintErc721 | EthMintErc721 | TronMintTrc721 | FlowMintNft,
                                file: Buffer,
                                name: string,
                                description?: string,
                                scheme?: any, provider?: string) => {
    const metadata = scheme || {
        title: 'Asset Metadata',
        type: 'object',
        properties: {}
    };
    metadata.properties.name = {type: 'string', description: name};
    if (description) {
        metadata.properties.description = {type: 'string', description};
    }
    const {ipfsHash} = await ipfsUpload(file, name);
    metadata.properties.image = {type: 'string', description: `ipfs://${ipfsHash}`};
    const {ipfsHash: metadataHash} = await ipfsUpload(Buffer.from(JSON.stringify(metadata)), 'metadata.json');
    body.url = `ipfs://${metadataHash}`;
    if (body.chain === Currency.FLOW) {
        (body as any).privateKey = (body as any).privateKey || (body as any).fromPrivateKey;
    }
    const result = await mintNFTWithUri(testnet, body, provider);
    return {
        tokenId: (body as any).tokenId,
        ...result,
        metadataUrl: body.url,
        metadataPublicUrl: `https://gateway.pinata.cloud/ipfs/${metadataHash}`,
        imageUrl: `ipfs://${ipfsHash}`,
        imagePublicUrl: `https://gateway.pinata.cloud/ipfs/${ipfsHash}`
    };
};

/**
 * Mint new NFT token.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintNFTWithUri = async (testnet: boolean, body: CeloMintErc721 | EthMintErc721 | TronMintTrc721 | FlowMintNft, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            if ((body as CeloMintErc721).authorAddresses) {
                return sendCeloMintCashbackErc721Transaction(testnet, body as CeloMintErc721, provider);
            } else {
                return sendCeloMintErc721Transaction(testnet, body as CeloMintErc721, provider);
            }
        case Currency.ETH:
            if ((body as EthMintErc721).authorAddresses) {
                return sendMintCashbackErc721Transaction(body as EthMintErc721, provider);
            } else {
                return sendMintErc721Transaction(body as EthMintErc721, provider);
            }
        case Currency.MATIC:
            if ((body as EthMintErc721).authorAddresses) {
                return sendPolygonMintCashbackErc721SignedTransaction(testnet, body as EthMintErc721, provider);
            } else {
                return sendPolygonMintErc721SignedTransaction(testnet, body as EthMintErc721, provider);
            }
        case Currency.ONE:
            if ((body as EthMintErc721).authorAddresses) {
                return sendOneMintCashback721SignedTransaction(testnet, body as EthMintErc721, provider);
            } else {
                return sendOneMint721SignedTransaction(testnet, body as EthMintErc721, provider);
            }
        case Currency.TRON:
            if ((body as TronMintTrc721).authorAddresses) {
                return sendTronMintCashbackTrc721SignedTransaction(testnet, body as TronMintTrc721);
            } else {
                return sendTronMintTrc721SignedTransaction(testnet, body as TronMintTrc721);
            }
        case Currency.BSC:
            if ((body as EthMintErc721).authorAddresses) {
                return sendMintBepCashback721Transaction(body as EthMintErc721, provider);
            }
            return sendMintBep721Transaction(body as EthMintErc721, provider);
        case Currency.FLOW:
            return sendFlowNftMintToken(testnet, body as FlowMintNft);
        default:
            throw new Error('Unsupported blockchain.');
    }
};

/**
 * Mint multiple new NFT tokens.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const mintMultipleNFTWithUri = async (testnet: boolean, body: CeloMintMultipleErc721 | EthMintMultipleErc721 | FlowMintMultipleNft, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            if ((body as CeloMintMultipleErc721).authorAddresses) {
                return sendCeloMintMultipleCashbackErc721Transaction(testnet, body as CeloMintMultipleErc721, provider);
            } else {
                return sendCeloMintMultipleErc721Transaction(testnet, body as CeloMintMultipleErc721, provider);
            }
        case Currency.TRON:
            if ((body as TronMintMultipleTrc721).authorAddresses) {
                throw new Error('Unsupported operation.');
            } else {
                return sendTronMintMultipleTrc721SignedTransaction(testnet, body as TronMintMultipleTrc721);
            }
        case Currency.ETH:
            if ((body as EthMintMultipleErc721).authorAddresses) {
                return sendEthMintMultipleCashbackErc721SignedTransaction(body as EthMintMultipleErc721, provider);
            } else {
                return sendMintMultipleErc721Transaction(body as EthMintMultipleErc721, provider);
            }
        case Currency.MATIC:
            if ((body as EthMintMultipleErc721).authorAddresses) {
                return sendPolygonMintMultipleCashbackErc721SignedTransaction(testnet, body as EthMintMultipleErc721, provider);
            } else {
                return sendPolygonMintMultipleErc721SignedTransaction(testnet, body as EthMintMultipleErc721, provider);
            }
        case Currency.ONE:
            if ((body as EthMintMultipleErc721).authorAddresses) {
                return sendOneMintMultipleCashback721SignedTransaction(testnet, body as EthMintMultipleErc721, provider);
            } else {
                return sendOneMintMultiple721SignedTransaction(testnet, body as EthMintMultipleErc721, provider);
            }
        case Currency.BSC:
            if ((body as EthMintMultipleErc721).authorAddresses) {
                return sendMintMultipleCashbackBep721Transaction(body as EthMintMultipleErc721, provider);
            } else {
                return sendMintMultipleBep721Transaction(body as EthMintMultipleErc721, provider);
            }
        case Currency.FLOW:
            return sendFlowNftMintMultipleToken(testnet, body as FlowMintMultipleNft);
        default:
            throw new Error('Unsupported blockchain.');
    }
};

/**
 * Burn new NFT token. Token will no longer exists.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const burnNFT = async (testnet: boolean, body: CeloBurnErc721 | EthBurnErc721 | TronBurnTrc721 | FlowBurnNft, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return sendCeloBurnErc721Transaction(testnet, body as CeloBurnErc721, provider);
        case Currency.TRON:
            return sendTronBurnTrc721SignedTransaction(testnet, body as TronBurnTrc721);
        case Currency.ETH:
            return sendBurnErc721Transaction(body, provider);
        case Currency.MATIC:
            return sendPolygonBurnErc721SignedTransaction(testnet, body, provider);
        case Currency.ONE:
            return sendOneBurn721SignedTransaction(testnet, body, provider);
        case Currency.BSC:
            return sendBurnBep721Transaction(body, provider);
        case Currency.FLOW:
            return sendFlowNftBurnToken(testnet, body as FlowBurnNft);
        default:
            throw new Error('Unsupported blockchain.');
    }
};

/**
 * Update royalty cashback as author of the NFT token.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const updateCashbackForAuthorNFT = async (testnet: boolean, body: UpdateCashbackErc721 | TronUpdateCashbackTrc721 | CeloUpdateCashbackErc721, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return sendCeloUpdateCashbackForAuthorErc721Transaction(testnet, body as CeloUpdateCashbackErc721, provider);
        case Currency.ETH:
            return sendUpdateCashbackForAuthorErc721Transaction(body, provider);
        case Currency.MATIC:
            return sendPolygonUpdateCashbackForAuthorErc721SignedTransaction(testnet, body, provider);
        case Currency.ONE:
            return sendOneUpdateCashbackForAuthor721SignedTransaction(testnet, body, provider);
        case Currency.TRON:
            return sendTronUpdateCashbackForAuthorTrc721SignedTransaction(testnet, body as TronUpdateCashbackTrc721);
        case Currency.BSC:
            return sendUpdateCashbackForAuthorBep721Transaction(body, provider);
        default:
            throw new Error('Unsupported blockchain.');
    }
};

/**
 * Transfer new NFT token to new recipient.
 * @param testnet if we use testnet or not
 * @param body body of the mint request
 * @param provider optional provider do broadcast tx
 */
export const transferNFT = async (testnet: boolean, body: CeloTransferErc721 | EthTransferErc721 | TronTransferTrc721 | FlowTransferNft, provider?: string) => {
    switch (body.chain) {
        case Currency.CELO:
            return sendCeloTransferErc721Transaction(testnet, body as CeloTransferErc721, provider);
        case Currency.ETH:
            return sendErc721Transaction(body, provider);
        case Currency.MATIC:
            return sendPolygonTransferErc721SignedTransaction(testnet, body, provider);
        case Currency.ONE:
            return sendOneTransfer721SignedTransaction(testnet, body, provider);
        case Currency.TRON:
            return sendTronTransferTrc721SignedTransaction(testnet, body as TronTransferTrc721);
        case Currency.BSC:
            return sendBep721Transaction(body, provider);
        case Currency.FLOW:
            return sendFlowNftTransferToken(testnet, body as FlowTransferNft);
        default:
            throw new Error('Unsupported blockchain.');
    }
};
