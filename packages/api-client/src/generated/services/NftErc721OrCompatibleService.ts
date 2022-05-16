/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AddNftMinter } from '../models/AddNftMinter';
import type { AddNftMinterKMS } from '../models/AddNftMinterKMS';
import type { AlgorandMintedResult } from '../models/AlgorandMintedResult';
import type { BurnNft } from '../models/BurnNft';
import type { BurnNftCelo } from '../models/BurnNftCelo';
import type { BurnNftFlowKMS } from '../models/BurnNftFlowKMS';
import type { BurnNftFlowMnemonic } from '../models/BurnNftFlowMnemonic';
import type { BurnNftFlowPK } from '../models/BurnNftFlowPK';
import type { BurnNftKMS } from '../models/BurnNftKMS';
import type { BurnNftKMSCelo } from '../models/BurnNftKMSCelo';
import type { BurnNftKMSTron } from '../models/BurnNftKMSTron';
import type { BurnNftTron } from '../models/BurnNftTron';
import type { CeloTx } from '../models/CeloTx';
import type { DeployNft } from '../models/DeployNft';
import type { DeployNftCelo } from '../models/DeployNftCelo';
import type { DeployNftCeloKMS } from '../models/DeployNftCeloKMS';
import type { DeployNftFlowKMS } from '../models/DeployNftFlowKMS';
import type { DeployNftFlowMnemonic } from '../models/DeployNftFlowMnemonic';
import type { DeployNftFlowPK } from '../models/DeployNftFlowPK';
import type { DeployNftKMS } from '../models/DeployNftKMS';
import type { DeployNftTron } from '../models/DeployNftTron';
import type { DeployNftTronKMS } from '../models/DeployNftTronKMS';
import type { EthTx } from '../models/EthTx';
import type { FlowMintedMultipleResult } from '../models/FlowMintedMultipleResult';
import type { FlowMintedResult } from '../models/FlowMintedResult';
import type { FlowTx } from '../models/FlowTx';
import type { MintMultipleNft } from '../models/MintMultipleNft';
import type { MintMultipleNftCelo } from '../models/MintMultipleNftCelo';
import type { MintMultipleNftFlowKMS } from '../models/MintMultipleNftFlowKMS';
import type { MintMultipleNftFlowMnemonic } from '../models/MintMultipleNftFlowMnemonic';
import type { MintMultipleNftFlowPK } from '../models/MintMultipleNftFlowPK';
import type { MintMultipleNftKMS } from '../models/MintMultipleNftKMS';
import type { MintMultipleNftKMSCelo } from '../models/MintMultipleNftKMSCelo';
import type { MintMultipleNftKMSTron } from '../models/MintMultipleNftKMSTron';
import type { MintMultipleNftMinter } from '../models/MintMultipleNftMinter';
import type { MintMultipleNftTron } from '../models/MintMultipleNftTron';
import type { MintNft } from '../models/MintNft';
import type { MintNftAlgorand } from '../models/MintNftAlgorand';
import type { MintNftAlgorandKMS } from '../models/MintNftAlgorandKMS';
import type { MintNftCelo } from '../models/MintNftCelo';
import type { MintNftExpress } from '../models/MintNftExpress';
import type { MintNftExpressAlgorand } from '../models/MintNftExpressAlgorand';
import type { MintNftExpressSolana } from '../models/MintNftExpressSolana';
import type { MintNftFlowKMS } from '../models/MintNftFlowKMS';
import type { MintNftFlowMnemonic } from '../models/MintNftFlowMnemonic';
import type { MintNftFlowPK } from '../models/MintNftFlowPK';
import type { MintNftKMS } from '../models/MintNftKMS';
import type { MintNftKMSCelo } from '../models/MintNftKMSCelo';
import type { MintNftKMSTron } from '../models/MintNftKMSTron';
import type { MintNftMinter } from '../models/MintNftMinter';
import type { MintNftSolana } from '../models/MintNftSolana';
import type { MintNftSolanaKMS } from '../models/MintNftSolanaKMS';
import type { MintNftTron } from '../models/MintNftTron';
import type { NftTx } from '../models/NftTx';
import type { SignatureId } from '../models/SignatureId';
import type { SolanaMintedResult } from '../models/SolanaMintedResult';
import type { TransactionHashKMS } from '../models/TransactionHashKMS';
import type { TransferNft } from '../models/TransferNft';
import type { TransferNftAlgo } from '../models/TransferNftAlgo';
import type { TransferNftAlgoExpress } from '../models/TransferNftAlgoExpress';
import type { TransferNftAlgoKMS } from '../models/TransferNftAlgoKMS';
import type { TransferNftCelo } from '../models/TransferNftCelo';
import type { TransferNftFlowKMS } from '../models/TransferNftFlowKMS';
import type { TransferNftFlowMnemonic } from '../models/TransferNftFlowMnemonic';
import type { TransferNftFlowPK } from '../models/TransferNftFlowPK';
import type { TransferNftKMS } from '../models/TransferNftKMS';
import type { TransferNftKMSCelo } from '../models/TransferNftKMSCelo';
import type { TransferNftKMSTron } from '../models/TransferNftKMSTron';
import type { TransferNftSolana } from '../models/TransferNftSolana';
import type { TransferNftSolanaKMS } from '../models/TransferNftSolanaKMS';
import type { TransferNftTron } from '../models/TransferNftTron';
import type { UpdateCashbackValueForAuthorNft } from '../models/UpdateCashbackValueForAuthorNft';
import type { UpdateCashbackValueForAuthorNftCelo } from '../models/UpdateCashbackValueForAuthorNftCelo';
import type { UpdateCashbackValueForAuthorNftKMS } from '../models/UpdateCashbackValueForAuthorNftKMS';
import type { UpdateCashbackValueForAuthorNftKMSCelo } from '../models/UpdateCashbackValueForAuthorNftKMSCelo';
import type { UpdateCashbackValueForAuthorNftKMSTron } from '../models/UpdateCashbackValueForAuthorNftKMSTron';
import type { UpdateCashbackValueForAuthorNftTron } from '../models/UpdateCashbackValueForAuthorNftTron';
import type { CancelablePromise } from '../core/CancelablePromise';
import { request as __request } from '../core/request';

export class NftErc721OrCompatibleService {

    /**
     * Deploy NFT Smart Contract
     * <h4>100 credits per API call on FLOW, 2 credits on another chains. Tatum covers the fee connected to the transaction costs in subscription credits for FLOW. This operation can be done on mainnet only for paid plans.</h4><br/>
     * <p>Deploy NFT Smart Contract. This method creates new ERC721 Smart Contract (Non-Fungible Tokens) on the blockchain. Smart contract is standardized and audited.
     * It is possible to mint, burn and transfer tokens. It is also possible to mint multiple tokens at once.<br/>
     * Tatum now supports NFT these blockchains:<br/>
     * <ul>
     * <li><b>Ethereum</b></li>
     * <li><b>Polygon (Matic)</b></li>
     * <li><b>Kcs (KCS)</b></li>
     * <li><b>Celo</b></li>
     * <li><b>Harmony.ONE</b></li>
     * <li><b>Klaytn</b></li>
     * <li><b>Flow</b></li>
     * <li><b>Tron</b></li>
     * <li><b>Binance Smart Chain</b></li>
     * </ul>
     * There are 3 types of ERC721 contracts you can deploy:
     * <ol>
     * <li>General ERC-721 Contract compatible with OpenSea royalties - Standard ERC-721 contract with Access roles and Ownable, enhanced with batch minting of the NFTs. NFTs minted on this contract are compatible with OpenSea and their royalty structure. This type is deployed by default.</li>
     * <li>Cashback ERC-721 Contract - ERC-721 contract which forces on-chain royalties to be paid every time the token is transferred. Royalties are defined as a fixed value and are <b>not</b> OpenSea compatible.</li>
     * <li>Provenance ERC-721 Contract - ERC-721 contract which forces on-chain royalties to be paid every time the token is transferred. Royalties are defined as a percentage of the price of the token and are <b>not</b> OpenSea compatible.</li>
     * </ol>
     * Each of the token can be deployed with public minting enabled - anyone will be able to mint the tokens on top of it - defaults to false.<br/>
     * It is possible to see the code of the deployed contract <a href="https://github.com/tatumio/smart-contracts/tree/master/contracts/tatum" target="_blank">for EVM chains here</a>
     * or here <a href="https://github.com/tatumio/flow-contracts" target="_blank">for Flow</a>.<br/><br/>
     * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
     * Alternatively, using the Tatum client library for supported languages.
     * </p>
     *
     * @param requestBody
     * @param xTestnetType Type of Ethereum testnet. Defaults to Ropsten. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
     * @returns any OK
     * @throws ApiError
     */
    public static nftDeployErc721(
        requestBody: (DeployNft | DeployNftCelo | DeployNftTron | DeployNftKMS | DeployNftCeloKMS | DeployNftTronKMS | DeployNftFlowPK | DeployNftFlowMnemonic | DeployNftFlowKMS),
        xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
    ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
        return __request({
            method: 'POST',
            path: `/v3/nft/deploy`,
            headers: {
                'x-testnet-type': xTestnetType,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                500: `Internal server error. There was an error on the server during the processing of the request.`,
            },
        });
    }

    /**
     * Mint NFT
     * <h4>100 credits per API call on FLOW, 2 credits on another chains. Tatum covers the fee connected to the transaction costs in subscription credits for FLOW. This operation can be done on mainnet only for paid plans.</h4><br/>
     * <p>Create one NFT Token and transfer it to destination account. Create and transfer any NFT token from smart contract defined in contractAddress.
     * It is possible to add URL to the created token with a more detailed information about it.<br/><br/>
     * Tatum now supports NFT these blockchains:<br/>
     * <ul>
     * <li><b>Ethereum</b></li>
     * <li><b>Polygon (Matic)</b></li>
     * <li><b>Kcs (KCS)</b></li>
     * <li><b>Celo</b></li>
     * <li><b>Klaytn</b></li>
     * <li><b>Solana</b></li>
     * <li><b>Harmony.ONE</b></li>
     * <li><b>Tron</b></li>
     * <li><b>Flow</b></li>
     * <li><b>Binance Smart Chain</b></li>
     * <li><b>Algorand</b></li>
     * </ul>
     * <br/>
     * For Solana, NFTs are not deployed, only minted right away. Newly created NFT creates new address on the blockchain and owner of the NFT owns with it's private key the account of the NFT.
     * <br/>
     * This operation works in three modes.
     *
     * First mode works just like other NFT endpoints. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
     * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey
     * or signatureId. PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
     * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
     * Alternatively, using the Tatum client library for supported languages.
     *
     * Second mode works without private key or signature id - NFT Express.
     * Mint NFT requests use built-in smart contract, private key and token id which are provided by Tatum.
     * You dont need to provide fromPrivateKey (or signatureId), contractAddress and tokenId fields to perform the mint NFT request.
     * In case of Algorand, you can mint Algorand-based NFTs to our internal address. Due to requirement of previously enabling the recipient address to receive the NFT, you must perform <a href="#operation/AlgorandBlockchainReceiveAsset">receive operation</a> and then <a href="#operation/NftTransferErc721">transfer the NFT</a> to the final recipient.
     *
     * Third mode enables you to mint on any custom NFT ERC-721 smart contract, on which specified minter address is approved as a minter. You don't specify private key or signatureId, only minter address, from which the NFT will be minted.
     * You can use addresses specified in the bellow table to be used as a minter.
     *
     * Performed request without fromPrivateKey or signatureId fields will be populated with following attributes:
     *
     * <ul>
     * <li><b>fromPrivateKey</b> - a built-in private key connected to the address from which will be NFT transaction fees paid.</li>
     * <li><b>tokenId</b> - a counter which starts from 0 and is increased for each NFT mint request by 1. The tokenId is provided per each chain and mainnet/testnet version of network.</li>
     * <li><b>contractAddress</b> - represents Tatum built in smart contract address of the minted NFT.</li>
     * </ul>
     *
     * The blockchain fee of the performed transaction is paid from the address connected with built-in private key and is debitted in form of credits. The credits are debitted only if NFT mint requests are performed with paid API key plan.
     * We transform fee to the credits in accordance to the rates provided by the Tatum.
     *
     * It means if you perform mint NFT request with following body:
     *
     * <pre>{
         * "chain": "CELO",
         * "to": "0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F",
         * "url": "ipfs://QmXJJ6UF5WkF4WTJvsdhiA1etGwBLfpva7Vr9AudGMe3pj"
         * }</pre>
         *
         * The fields contractAddress, fromPrivateKey and tokenId will be internally filled in following way:
         *
         * <pre>{
             * "chain": "CELO",
             * "to": "0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F",
             * "url": "ipfs://QmXJJ6UF5WkF4WTJvsdhiA1etGwBLfpva7Vr9AudGMe3pj",
             * "fromPrivateKey": "{tatumBuiltInPrivateKey}",
             * "tokenId": "{tatumBuiltInTokenId + 1}",
             * "contractAddress": "0x45871ED5F15203C0ce791eFE5f4B5044833aE10e"
             * }</pre>
             *
             * Keep in mind that your credit amount will be debitted accordingly to the rate of the selected blockchain and cost of transaction fees.
             *
             *
             * We have prepared following smart contracts for minting without private key:
             * <table>
             * <tr>
             * <th>Chain</th>
             * <th>Testnet/Mainnet</th>
             * <th>Address</th>
             * <th>Smart contract address</th>
             * </tr>
             * <tr>
             * <td>MATIC</td>
             * <td>Testnet</td>
             * <td>0x542b9ac4945a3836fd12ad98acbc76a0c8b743f5</td>
             * <td>0xCd2AdA00c48A27FAa5Cc67F9A1ed55B89dDf7F77</td>
             * </tr>
             * <tr>
             * <td>BSC</td>
             * <td>Testnet</td>
             * <td>0xc16ae5e8c985b906935a0cadf4e24f0400531883</td>
             * <td>0xF73075aa67561791352fbEe8278115487Fd90ab6</td>
             * </tr>
             * <tr>
             * <td>ONE</td>
             * <td>Testnet</td>
             * <td>0x8906f62d40293ddca77fdf6714c3f63265deddf0</td>
             * <td>0x427ddbe3ad5e1e77e010c02e61e9bdef82dcaeea</td>
             * </tr>
             * <tr>
             * <td>ETH</td>
             * <td>Testnet</td>
             * <td>0x53e8577C4347C365E4e0DA5B57A589cB6f2AB848</td>
             * <td>0xAe7D8842D0295B1f24a8842cBd5eB83Ae2fd0946</td>
             * </tr>
             * <tr>
             * <td>CELO</td>
             * <td>Testnet</td>
             * <td>0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F</td>
             * <td>0x45871ED5F15203C0ce791eFE5f4B5044833aE10e</td>
             * </tr>
             * <tr>
             * <td>KLAY</td>
             * <td>Testnet</td>
             * <td>0x80d8bac9a6901698b3749fe336bbd1385c1f98f2</td>
             * <td>0x45871ED5F15203C0ce791eFE5f4B5044833aE10e</td>
             * </tr>
             * <tr>
             * <td>MATIC</td>
             * <td>Mainnet</td>
             * <td>0xcf9e127455d28e7362380aec1b92ddee8200b295</td>
             * <td>0x329F549Cbf3a2b1b95C622A77F701254eC80352d</td>
             * </tr>
             * <tr>
             * <td>BSC</td>
             * <td>Mainnet</td>
             * <td>0xcf9e127455d28e7362380aec1b92ddee8200b295</td>
             * <td>0x4f83793245abE92cc8B978a16C898005c69e5e27</td>
             * </tr>
             * <tr>
             * <td>ONE</td>
             * <td>Mainnet</td>
             * <td>0xcf9e127455d28e7362380aec1b92ddee8200b295</td>
             * <td>0x559f11123bb892159cd33f652624e40e8b43d4ad</td>
             * </tr>
             * <tr>
             * <td>ETH</td>
             * <td>Mainnet</td>
             * <td>0xcf9e127455d28e7362380aec1b92ddee8200b295</td>
             * <td>0x789c00ed7ddd72a806dbac40df926df32fde3c2f</td>
             * </tr>
             * <tr>
             * <td>CELO</td>
             * <td>Mainnet</td>
             * <td>0xcf9e127455d28e7362380aec1b92ddee8200b295</td>
             * <td>0x5F35fd593243B059cBf580D0335B1c21881a248b</td>
             * </tr>
             * <tr>
             * <td>KLAY</td>
             * <td>Mainnet</td>
             * <td>0xcf9e127455d28e7362380aec1b92ddee8200b295</td>
             * <td>0x44bf563b999823b22b0b165020f0e090aad88f11</td>
             * </tr>
             * </table>
             * If there are not enough coins on any testnet address, feel free to send coins there.</p>
             *
             * @param requestBody
             * @param xTestnetType Type of Ethereum testnet. Defaults to Ropsten. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
             * @returns any OK
             * @throws ApiError
             */
            public static nftMintErc721(
                requestBody: (MintNftExpress | MintNftExpressSolana | MintNftExpressAlgorand | MintNftSolana | MintNftMinter | MintNft | MintNftCelo | MintNftAlgorand | MintNftFlowPK | MintNftFlowMnemonic | MintNftTron | MintNftKMS | MintNftSolanaKMS | MintNftKMSCelo | MintNftKMSTron | MintNftAlgorandKMS | MintNftFlowKMS),
                xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
            ): CancelablePromise<(TransactionHashKMS | FlowMintedResult | SolanaMintedResult | AlgorandMintedResult | SignatureId)> {
                return __request({
                    method: 'POST',
                    path: `/v3/nft/mint`,
                    headers: {
                        'x-testnet-type': xTestnetType,
                    },
                    body: requestBody,
                    mediaType: 'application/json',
                    errors: {
                        400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                        401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                        403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                        500: `Internal server error. There was an error on the server during the processing of the request.`,
                    },
                });
            }

            /**
             * Transfer NFT Token
             * <h4>100 credits per API call on FLOW, 2 credits on another chains. Tatum covers the fee connected to the transaction costs in subscription credits for FLOW. This operation can be done on mainnet only for paid plans.</h4><br/>
             * <p>Transfer NFT Tokens from account to account. Transfer any NFT token from smart contract defined in contractAddress.
             * Only 1 specific token with specified tokenId can be transfered. This method invokes ERC721 method safeTransfer() to transfer the token in case of ETH, Celo and BSC.<br/><br/>
             * Tatum now supports NFT these blockchains:<br/>
             * <ul>
             * <li><b>Ethereum</b></li>
             * <li><b>Polygon (Matic)</b></li>
             * <li><b>Kcs (KCS)</b></li>
             * <li><b>Flow</b></li>
             * <li><b>Celo</b></li>
             * <li><b>Harmony.ONE</b></li>
             * <li><b>Tron</b></li>
             * <li><b>Binance Smart Chain</b></li>
             * <li><b>Algorand</b></li>
             * <li><b>Klaytn</b></li>
             * <li><b>Solana</b></li>
             * </ul>
             * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
             * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey
             * or signatureId. PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
             * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
             * Alternatively, using the Tatum client library for supported languages.
             *
             * Algorand is unique a way that the receiving account should be ready before sending the NFT asset.
             * To perform this, the receiving account should transfer the NFT asset with 0 amount to itself.
             * During the process, it's using the same API as the main transaction: the only difference is that the "fromPrivateKey" should be the privateKey of the receiving account.
             * If you were minting NFTs on Algorand with NFT Express, you can skip the fromPrivateKey field in the request body and NFT will be transferred to you automatically from Tatum - this is tied to the API Key used during the mint.
             * </p>
             *
             * @param requestBody
             * @param xTestnetType Type of Ethereum testnet. Defaults to Ropsten. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
             * @returns any OK
             * @throws ApiError
             */
            public static nftTransferErc721(
                requestBody: (TransferNft | TransferNftCelo | TransferNftTron | TransferNftSolana | TransferNftAlgo | TransferNftAlgoExpress | TransferNftFlowPK | TransferNftFlowMnemonic | TransferNftKMS | TransferNftKMSCelo | TransferNftAlgoKMS | TransferNftSolanaKMS | TransferNftFlowKMS | TransferNftKMSTron),
                xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
            ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
                return __request({
                    method: 'POST',
                    path: `/v3/nft/transaction`,
                    headers: {
                        'x-testnet-type': xTestnetType,
                    },
                    body: requestBody,
                    mediaType: 'application/json',
                    errors: {
                        400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                        401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                        403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                        500: `Internal server error. There was an error on the server during the processing of the request.`,
                    },
                });
            }

            /**
             * Mint Multiple NFT Tokens
             * <h4>100 credits per API call on FLOW, 2 credits on another chains. Tatum covers the fee connected to the transaction costs in subscription credits for FLOW. This operation can be done on mainnet only for paid plans.</h4><br/>
             * <p>Create multiple NFT Tokens and transfer them to destination account. Create and transfer any NFT tokens from smart contract defined in contractAddress.<br/><br/>
             * Tatum now supports NFT these blockchains:<br/>
             * <ul>
             * <li><b>Ethereum</b></li>
             * <li><b>Polygon (Matic)</b></li>
             * <li><b>Kcs (KCS)</b></li>
             * <li><b>Celo</b></li>
             * <li><b>Harmony.ONE</b></li>
             * <li><b>Tron</b></li>
             * <li><b>Flow</b></li>
             * <li><b>Klaytn</b></li>
             * <li><b>Binance Smart Chain</b></li>
             * </ul>
             * This operation works in two modes.
             *
             * First mode works just like other NFT endpoints. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
             * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey
             * or signatureId. PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
             * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
             * Alternatively, using the Tatum client library for supported languages.
             *
             * Second mode enables you to mint on any custom NFT ERC-721 smart contract, on which specified minter address is approved as a minter. You don't specify private key or signatureId, only minter address, from which the NFT will be minted.<br/>
             * It means you perform mint multiple NFT request with following body:
             * <pre>{
                 * "to": ["0x80d8bac9a6901698b3749fe336bbd1385c1f98f2"],
                 * "url": ["ipfs://QmXJJ6UF5WkF4WTJvsdhiA1etGwBLfpva7Vr9AudGMe3pj"],
                 * "tokenId": ["9876541124516"],
                 * "contractAddress":"0xcd2ada00c48a27faa5cc67f9a1ed55b89ddf7f77",
                 * "minter": "0x542b9ac4945a3836fd12ad98acbc76a0c8b743f5",
                 * "chain": "MATIC"
                 * }</pre>
                 * The blockchain fee of the performed transaction is paid from the address connected with built-in private key and is debitted in form of credits. The credits are debitted only if NFT mint requests are performed with paid API key plan.
                 * We transform fee to the credits in accordance to the rates provided by the Tatum.
                 * If you want to batch mint on ERC-721 contract which is not deployed via Tatum API, your smart contract must contain this method:
                 * <pre>mintMultiple(address[] to, uint256[] tokenId, string[] uri): boolean</pre>
                 * You can use addresses specified in the bellow table to be used as a minter.
                 * <table>
                 * <tr>
                 * <th>Chain</th>
                 * <th>Testnet address</th>
                 * <th>Mainnet Address</th>
                 * </tr>
                 * <tr>
                 * <td>MATIC</td>
                 * <td>0x542b9ac4945a3836fd12ad98acbc76a0c8b743f5</td>
                 * <td>0xcf9e127455d28e7362380aec1b92ddee8200b295</td>
                 * </tr>
                 * <tr>
                 * <td>BSC</td>
                 * <td>0xc16ae5e8c985b906935a0cadf4e24f0400531883</td>
                 * <td>0xcf9e127455d28e7362380aec1b92ddee8200b295</td>
                 * </tr>
                 * <tr>
                 * <td>ONE</td>
                 * <td>0x8906f62d40293ddca77fdf6714c3f63265deddf0</td>
                 * <td>0xcf9e127455d28e7362380aec1b92ddee8200b295</td>
                 * </tr>
                 * <tr>
                 * <td>ETH</td>0x53e8577c4347c365e4e0da5b57a589cb6f2ab848
                 * <td>0x53e8577C4347C365E4e0DA5B57A589cB6f2AB848</td>
                 * <td>0xcf9e127455d28e7362380aec1b92ddee8200b295</td>
                 * </tr>
                 * <tr>
                 * <td>CELO</td>
                 * <td>0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F</td>
                 * <td>0xcf9e127455d28e7362380aec1b92ddee8200b295</td>
                 * </tr>
                 * <tr>
                 * <td>KLAY</td>
                 * <td>0x80d8bac9a6901698b3749fe336bbd1385c1f98f2</td>
                 * <td>0xcf9e127455d28e7362380aec1b92ddee8200b295</td>
                 * </tr>
                 * </table>
                 * If there are not enough coins on any testnet address, feel free to send coins there.</p>
                 *
                 * @param requestBody
                 * @param xTestnetType Type of Ethereum testnet. Defaults to Ropsten. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
                 * @returns any OK
                 * @throws ApiError
                 */
                public static nftMintMultipleErc721(
                    requestBody: (MintMultipleNftMinter | MintMultipleNft | MintMultipleNftCelo | MintMultipleNftTron | MintMultipleNftFlowPK | MintMultipleNftFlowMnemonic | MintMultipleNftKMS | MintMultipleNftKMSCelo | MintMultipleNftKMSTron | MintMultipleNftFlowKMS),
                    xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
                ): CancelablePromise<(TransactionHashKMS | FlowMintedMultipleResult | SignatureId)> {
                    return __request({
                        method: 'POST',
                        path: `/v3/nft/mint/batch`,
                        headers: {
                            'x-testnet-type': xTestnetType,
                        },
                        body: requestBody,
                        mediaType: 'application/json',
                        errors: {
                            400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                            401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                            403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                            500: `Internal server error. There was an error on the server during the processing of the request.`,
                        },
                    });
                }

                /**
                 * Burn NFT
                 * <h4>100 credits per API call on FLOW, 2 credits on another chains. Tatum covers the fee connected to the transaction costs in subscription credits for FLOW. This operation can be done on mainnet only for paid plans.</h4><br/>
                 * <p>Burn one NFT Token. This method destroys any NFT token from smart contract defined in contractAddress.<br/><br/>
                 * Tatum now supports NFT these blockchains:<br/>
                 * <ul>
                 * <li><b>Ethereum</b></li>
                 * <li><b>Polygon (Matic)</b></li>
                 * <li><b>Kcs (KCS)</b></li>
                 * <li><b>Celo</b></li>
                 * <li><b>Harmony.ONE</b></li>
                 * <li><b>Tron</b></li>
                 * <li><b>Flow</b></li>
                 * <li><b>Binance Smart Chain</b></li>
                 * <li><b>Klaytn</b></li>
                 * <li><b>Algorand</b></li>
                 * </ul>
                 * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
                 * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey
                 * or signatureId. PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
                 * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
                 * Alternatively, using the Tatum client library for supported languages.
                 * </p>
                 *
                 * @param requestBody
                 * @param xTestnetType Type of Ethereum testnet. Defaults to Ropsten. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
                 * @returns any OK
                 * @throws ApiError
                 */
                public static nftBurnErc721(
                    requestBody: (BurnNftCelo | BurnNftKMSCelo | BurnNftTron | BurnNftKMSTron | BurnNft | BurnNftKMS | BurnNftFlowPK | BurnNftFlowMnemonic | BurnNftFlowKMS),
                    xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
                ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
                    return __request({
                        method: 'POST',
                        path: `/v3/nft/burn`,
                        headers: {
                            'x-testnet-type': xTestnetType,
                        },
                        body: requestBody,
                        mediaType: 'application/json',
                        errors: {
                            400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                            401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                            403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                            500: `Internal server error. There was an error on the server during the processing of the request.`,
                        },
                    });
                }

                /**
                 * Add NFT Minter
                 * <h4>2 credits.</h4><br/>
                 * <p>Add new minter of NFT Tokens. This method adds minter permission to new minter address.<br/><br/>
                 * Tatum now supports NFT these blockchains:<br/>
                 * <ul>
                 * <li><b>Ethereum</b></li>
                 * <li><b>Polygon (Matic)</b></li>
                 * <li><b>Kcs (KCS)</b></li>
                 * <li><b>Celo</b></li>
                 * <li><b>Harmony.ONE</b></li>
                 * <li><b>Klaytn</b></li>
                 * <li><b>Binance Smart Chain</b></li>
                 * </ul>
                 * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
                 * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey
                 * or signatureId. PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
                 * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
                 * Alternatively, using the Tatum client library for supported languages.
                 * </p>
                 *
                 * @param requestBody
                 * @param xTestnetType Type of Ethereum testnet. Defaults to Ropsten. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
                 * @returns any OK
                 * @throws ApiError
                 */
                public static nftAddMinter(
                    requestBody: (AddNftMinter | AddNftMinterKMS),
                    xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
                ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
                    return __request({
                        method: 'POST',
                        path: `/v3/nft/mint/add`,
                        headers: {
                            'x-testnet-type': xTestnetType,
                        },
                        body: requestBody,
                        mediaType: 'application/json',
                        errors: {
                            400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                            401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                            403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                            500: `Internal server error. There was an error on the server during the processing of the request.`,
                        },
                    });
                }

                /**
                 * Update Royalty NFT
                 * <h4>2 credits per API call.</h4><br/>
                 * <p>Update royalty cashback value for one NFT Token. This method updates the first royalty value of specific author for 1 token.
                 * If royalty value is set to 0, it will disable the royalty system for the token. Only from author's address of the royalty can change it's royalty value, not the owner of the token.<br/><br/>
                 * Tatum now supports NFT these blockchains:<br/>
                 * <ul>
                 * <li><b>Ethereum</b></li>
                 * <li><b>Polygon (Matic)</b></li>
                 * <li><b>Kcs (KCS)</b></li>
                 * <li><b>Celo</b></li>
                 * <li><b>Harmony.ONE</b></li>
                 * <li><b>Tron</b></li>
                 * <li><b>Binance Smart Chain</b></li>
                 * <li><b>Klaytn</b></li>
                 * </ul>
                 * This operation needs the private key of the blockchain address. Every time the funds are transferred, the transaction must be signed with the corresponding private key.
                 * No one should ever send it's own private keys to the internet because there is a strong possibility of stealing keys and loss of funds. In this method, it is possible to enter privateKey
                 * or signatureId. PrivateKey should be used only for quick development on testnet versions of blockchain when there is no risk of losing funds. In production,
                 * <a href="https://github.com/tatumio/tatum-kms" target="_blank">Tatum KMS</a> should be used for the highest security standards, and signatureId should be present in the request.
                 * Alternatively, using the Tatum client library for supported languages.
                 * </p>
                 *
                 * @param requestBody
                 * @param xTestnetType Type of Ethereum testnet. Defaults to Ropsten. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
                 * @returns any OK
                 * @throws ApiError
                 */
                public static nftUpdateCashbackErc721(
                    requestBody: (UpdateCashbackValueForAuthorNftCelo | UpdateCashbackValueForAuthorNftKMSCelo | UpdateCashbackValueForAuthorNftTron | UpdateCashbackValueForAuthorNftKMSTron | UpdateCashbackValueForAuthorNft | UpdateCashbackValueForAuthorNftKMS),
                    xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
                ): CancelablePromise<(TransactionHashKMS | SignatureId)> {
                    return __request({
                        method: 'PUT',
                        path: `/v3/nft/royalty`,
                        headers: {
                            'x-testnet-type': xTestnetType,
                        },
                        body: requestBody,
                        mediaType: 'application/json',
                        errors: {
                            400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                            401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                            403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                            500: `Internal server error. There was an error on the server during the processing of the request.`,
                        },
                    });
                }

                /**
                 * Get NFT transactions by address
                 * <h4>1 credit per API call.</h4><br/><p>Get NFT transactions by address. This includes incoming and outgoing transactions for the address.</p>
                 * @param chain Blockchain to work with
                 * @param address Account address
                 * @param tokenAddress Token address
                 * @param pageSize Max number of items per page is 50.
                 * @param offset Offset to obtain next page of the data.
                 * @param from Transactions from this block onwords will be included.
                 * @param to Transactions up to this block will be included.
                 * @returns any OK
                 * @throws ApiError
                 */
                public static nftGetTransactionByAddress(
                    chain: 'CELO' | 'ETH' | 'MATIC',
                    address: string,
                    tokenAddress: string,
                    pageSize: number,
                    offset?: number,
                    from?: number,
                    to?: number,
                ): CancelablePromise<Array<NftTx>> {
                    return __request({
                        method: 'GET',
                        path: `/v3/nft/transaction/${chain}/${address}/${tokenAddress}`,
                        query: {
                            'pageSize': pageSize,
                            'offset': offset,
                            'from': from,
                            'to': to,
                        },
                        errors: {
                            400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                            401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                            500: `Internal server error. There was an error on the server during the processing of the request.`,
                        },
                    });
                }

                /**
                 * Get NFT transactions by token
                 * <h4>1 credit per API call.</h4><br/><p>Get NFT transactions by token. This includes incoming and outgoing transactions for the token.</p>
                 * @param chain Blockchain to work with
                 * @param tokenId NFT Token ID
                 * @param tokenAddress Token address
                 * @param pageSize Max number of items per page is 50.
                 * @param offset Offset to obtain next page of the data.
                 * @param from Transactions from this block onwords will be included.
                 * @param to Transactions up to this block will be included.
                 * @returns any OK
                 * @throws ApiError
                 */
                public static nftGetTransactionByToken(
                    chain: 'CELO' | 'ETH' | 'MATIC',
                    tokenId: number,
                    tokenAddress: string,
                    pageSize: number,
                    offset?: number,
                    from?: number,
                    to?: number,
                ): CancelablePromise<Array<NftTx>> {
                    return __request({
                        method: 'GET',
                        path: `/v3/nft/transaction/tokenId/${chain}/${tokenAddress}/${tokenId}`,
                        query: {
                            'pageSize': pageSize,
                            'offset': offset,
                            'from': from,
                            'to': to,
                        },
                        errors: {
                            400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                            401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                            500: `Internal server error. There was an error on the server during the processing of the request.`,
                        },
                    });
                }

                /**
                 * @deprecated
                 * Get contract address from transaction
                 * <h4>1 credit per API call.</h4><br/>
                 * <p>Get NFT contract address from deploy transaction. This method is deprecated, use <a href="#operation/SCGetContractAddress">Get contract address</a> instead.</p>
                 *
                 * @param chain Blockchain to work with
                 * @param hash Transaction hash
                 * @param xTestnetType Type of Ethereum testnet. Defaults to Ropsten. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
                 * @returns any OK
                 * @throws ApiError
                 */
                public static nftGetContractAddress(
                    chain: 'ETH' | 'ONE' | 'KLAY' | 'CELO' | 'TRON' | 'FLOW' | 'MATIC' | 'KCS' | 'BSC',
                    hash: string,
                    xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
                ): CancelablePromise<{
                    /**
                     * Address of the NFT token.
                     */
                    contractAddress?: string;
                }> {
                    return __request({
                        method: 'GET',
                        path: `/v3/nft/address/${chain}/${hash}`,
                        headers: {
                            'x-testnet-type': xTestnetType,
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
                 * Get Transaction
                 * <h4>1 credit per API call.</h4><br/><p>Get NFT transaction by transaction hash.</p>
                 * @param chain Blockchain to work with
                 * @param hash Transaction hash
                 * @param xTestnetType Type of Ethereum testnet. Defaults to Ropsten. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
                 * @returns any OK
                 * @throws ApiError
                 */
                public static nftGetTransactErc721(
                    chain: 'ETH' | 'MATIC' | 'KCS' | 'ONE' | 'KLAY' | 'CELO' | 'TRON' | 'FLOW' | 'BSC',
                    hash: string,
                    xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
                ): CancelablePromise<(CeloTx | EthTx | FlowTx)> {
                    return __request({
                        method: 'GET',
                        path: `/v3/nft/transaction/${chain}/${hash}`,
                        headers: {
                            'x-testnet-type': xTestnetType,
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
                 * Get NFT tokens for address
                 * <h4>1 credit per API call + 5 credits for each owned token.</h4><br/><p>Get NFTs on address. Returns all NFTs this address holds.</p>
                 *
                 * @param chain Blockchain to work with
                 * @param address Account address
                 * @returns any OK
                 * @throws ApiError
                 */
                public static nftGetTokensByAddressErc721(
                    chain: 'ALGO' | 'CELO' | 'MATIC' | 'ETH',
                    address: string,
                ): CancelablePromise<Array<{
                    /**
                     * Contract address of the NFT. In Algorand case, it will be asset-id..
                     */
                    contractAddress: string;
                    balances: Array<string>;
                    metadata?: Array<{
                        /**
                         * TokenID of the NFT token owned by this address.
                         */
                        tokenId?: string;
                        /**
                         * Metadata URL of the TokenID. This data don't have to be present, safest way (if not present) is to obtain them from the NFT Contract.tokenURI() method call.
                         */
                        url?: string;
                        /**
                         * Metadata scheme obtained from the url. This data don't have to be present, safest way (if not present) is to obtain them from the NFT Contract.tokenURI() method call.
                         */
                        metadata?: any;
                    }>;
                }>> {
                    return __request({
                        method: 'GET',
                        path: `/v3/nft/address/balance/${chain}/${address}`,
                        errors: {
                            400: `Bad Request. Validation failed for the given object in the HTTP Body or Request parameters.`,
                            401: `Unauthorized. Not valid or inactive subscription key present in the HTTP Header.`,
                            403: `Forbidden. The request is authenticated, but it is not possible to required perform operation due to logical error or invalid permissions.`,
                            500: `Internal server error. There was an error on the server during the processing of the request.`,
                        },
                    });
                }

                /**
                 * Get NFT tokens in collection
                 * <h4>1 credit per API call + 5 credits for each listed token.</h4><br/><p>Get all minted NFTs in the collection. Returns all NFTs this contract minted.</p>
                 *
                 * @param chain Blockchain to work with
                 * @param pageSize Max number of items per page is 50.
                 * @param address Collection address
                 * @param offset Offset to obtain next page of the data.
                 * @returns any OK
                 * @throws ApiError
                 */
                public static nftGetTokensByCollectionErc721(
                    chain: 'CELO' | 'MATIC' | 'ETH',
                    pageSize: number,
                    address: string,
                    offset?: number,
                ): CancelablePromise<Array<{
                    /**
                     * ID of the token.
                     */
                    tokenId: string;
                    metadata: Array<{
                        /**
                         * TokenID of the NFT token owned by this address.
                         */
                        tokenId?: string;
                        /**
                         * Metadata URL of the TokenID. This data don't have to be present, safest way (if not present) is to obtain them from the NFT Contract.tokenURI() method call.
                         */
                        url?: string;
                        /**
                         * Metadata scheme obtained from the url. This data don't have to be present, safest way (if not present) is to obtain them from the NFT Contract.tokenURI() method call.
                         */
                        metadata?: any;
                    }>;
                }>> {
                    return __request({
                        method: 'GET',
                        path: `/v3/nft/collection/${chain}/${address}`,
                        query: {
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
                 * Get NFT Account balance
                 * <h4>1 credit per API call.</h4><br/><p>Get NFTs on Account. Returns tokenIDs of tokens Account holds. This method is valid only for tokens deplyed using Tatum API - it reads data from the smart contract.</p>
                 *
                 * @param chain Blockchain to work with
                 * @param address Account address
                 * @param contractAddress NFT contract address
                 * @param xTestnetType Type of Ethereum testnet. Defaults to Ropsten. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
                 * @returns string OK
                 * @throws ApiError
                 */
                public static nftGetBalanceErc721(
                    chain: 'ETH' | 'MATIC' | 'KCS' | 'ONE' | 'KLAY' | 'CELO' | 'TRON' | 'FLOW' | 'BSC' | 'SOL',
                    address: string,
                    contractAddress: string,
                    xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
                ): CancelablePromise<Array<string>> {
                    return __request({
                        method: 'GET',
                        path: `/v3/nft/balance/${chain}/${contractAddress}/${address}`,
                        headers: {
                            'x-testnet-type': xTestnetType,
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
                 * Get NFT Token Provenance Data
                 * <h4>1 credit per API call.</h4><br/><p>Get NFT token provenance data, valid only for provenance contract.</p>
                 * @param chain Blockchain to work with
                 * @param tokenId Token ID
                 * @param contractAddress NFT contract address
                 * @param xTestnetType Type of Ethereum testnet. Defaults to Ropsten. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
                 * @returns any OK
                 * @throws ApiError
                 */
                public static nftGetProvenanceDataErc721(
                    chain: 'ETH' | 'MATIC' | 'KCS' | 'ONE' | 'KLAY' | 'CELO' | 'BSC',
                    tokenId: string,
                    contractAddress: string,
                    xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
                ): CancelablePromise<Array<{
                    provenanceData?: string;
                    tokenPrice?: string;
                }>> {
                    return __request({
                        method: 'GET',
                        path: `/v3/nft/provenance/${chain}/${contractAddress}/${tokenId}`,
                        headers: {
                            'x-testnet-type': xTestnetType,
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
                 * Get NFT Token Metadata
                 * <h4>1 credit per API call.</h4><br/><p>Get NFT token metadata.</p>
                 * @param chain Blockchain to work with
                 * @param contractAddress NFT contract address
                 * @param token Token ID, required for all except SOL
                 * @param account Account holding this token. FLOW only.
                 * @param xTestnetType Type of Ethereum testnet. Defaults to Ropsten. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
                 * @returns any OK
                 * @throws ApiError
                 */
                public static nftGetMetadataErc721(
                    chain: 'ETH' | 'MATIC' | 'KCS' | 'SOL' | 'ONE' | 'KLAY' | 'CELO' | 'TRON' | 'FLOW' | 'BSC',
                    contractAddress: string,
                    token: string,
                    account?: string,
                    xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
                ): CancelablePromise<{
                    /**
                     * Metadata associated with token.
                     */
                    data?: string;
                }> {
                    return __request({
                        method: 'GET',
                        path: `/v3/nft/metadata/${chain}/${contractAddress}/${token}`,
                        headers: {
                            'x-testnet-type': xTestnetType,
                        },
                        query: {
                            'account': account,
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
                 * Get NFT Token Royalty information
                 * <h4>1 credit per API call.</h4><br/><p>Get NFT token royalty.</p>
                 * @param chain Blockchain to work with
                 * @param contractAddress NFT contract address
                 * @param token Token ID, required for all except SOL
                 * @param xTestnetType Type of Ethereum testnet. Defaults to Ropsten. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
                 * @returns any OK
                 * @throws ApiError
                 */
                public static nftGetRoyaltyErc721(
                    chain: 'ETH' | 'MATIC' | 'KCS' | 'SOL' | 'ONE' | 'KLAY' | 'CELO' | 'TRON' | 'BSC',
                    contractAddress: string,
                    token: string,
                    xTestnetType: 'ethereum-ropsten' | 'ethereum-rinkeby' = 'ethereum-ropsten',
                ): CancelablePromise<{
                    /**
                     * Addresses of the authors where cashback will be paid.
                     */
                    addresses?: Array<string>;
                    /**
                     * Values of the royalties, which will be paid to the authors with every token transfer.
                     * Amount is in native asset of the blockchain or in percents for SOL NFTs.
                     *
                     */
                    values?: Array<string>;
                }> {
                    return __request({
                        method: 'GET',
                        path: `/v3/nft/royalty/${chain}/${contractAddress}/${token}`,
                        headers: {
                            'x-testnet-type': xTestnetType,
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