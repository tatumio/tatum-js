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
     * Deploy an NFT smart contract
     * <p><b>100 credits per API call on Flow<br/>
     * 2 credits per API call on the other blockchains</b></p>
     * <p>Deploy an NFT smart contract on the blockchain. In a deployed NFT smart contract, you can mint NFTs (one NFT at a time or multiple NFTs at once), burn, and transfer NFTs.<br/>
     * Smart contracts are standardized and audited.</p>
     * <p>This API is supported for the following blockchains:</p>
     * <ul>
     * <li>Algorand</li>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Flow</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>KuCoin Community Chain</li>
     * <li>Polygon</li>
     * <li>TRON</li>
     * </ul>
     * <p>By default, an NFT smart contract is deployed as a <b>general ERC-721 smart contract compatible with OpenSea royalties</b>. This is a standard ERC-721 contract with <code>AccessControl</code> and <code>Ownable</code>, enhanced with NFT batch minting. NFTs minted in this smart contract are compatible with OpenSea and its royalty structure.<p>
     * <p>In addition to the general ERC-721 contract, you can also deploy the following types of NFT smart contracts for the supported blockchains <b>except for Flow and TRON</b>:<p>
     * <ul>
     * <li><b>Cashback ERC-721 smart contract</b> is an ERC-721 smart contract that forces on-chain royalties to be paid every time an NFT is transferred. The royalties are defined as a fixed value and are <b>not</b> OpenSea-compatible.<br />
     * To deploy an NFT smart contract as a cashback contract, deploy the contract with the <code>cashback</code> parameter set to <code>true</code> in the request body.</li>
     * <li><b>Provenance ERC-721 smart contract</b> is an ERC-721 smart contract that forces on-chain royalties to be paid every time an NFT is transferred. The royalties are defined as a percentage of the NFT price and are <b>not</b> OpenSea-compatible.<br />
     * To deploy an NFT smart contract as a provenance contract, deploy the contract with the <code>provenance</code> parameter set to <code>true</code> in the request body.</li>
     * </ul>
     * <p>You can enable public minting for cashback and provenance smart contracts. By default, public minting is disabled, which means that only the blockchain address whose private key was used to create the smart contract or the blockchain addresses <a href="https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftAddMinter" target="_blank">added to the smart contract as NFT minters</a> will be able to mint NFTs for the contract. To enable public minting and allow anyone to mint NFTs on top of the smart contract, deploy the contract with the <code>publicMint</code> parameter set to <code>true</code> in the request body.</p>
     * <p>You can review the code of a deployed NFT smart contract <a href="https://github.com/tatumio/flow-contracts" target="_blank">here</a> (if the contract is deployed on Flow) or <a href="https://github.com/tatumio/smart-contracts/tree/master/contracts/tatum" target="_blank">here</a> (if the contract is deployed on any other supported blockchain).</p>
     * <p><b>Signing a transaction</b></p>
     * <p>When deploying an NFT smart contract, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
     * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
     * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js" target="_blank">Tatum JavaScript client</a>.</p>
     *
     * @param requestBody
     * @param xTestnetType Type of Ethereum testnet. Defaults to Sepolia. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
     * @returns any OK
     * @throws ApiError
     */
    public static nftDeployErc721(
        requestBody: (DeployNft | DeployNftCelo | DeployNftTron | DeployNftKMS | DeployNftCeloKMS | DeployNftTronKMS | DeployNftFlowPK | DeployNftFlowMnemonic | DeployNftFlowKMS),
        xTestnetType: 'ethereum-sepolia' = 'ethereum-sepolia',
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
     * Mint an NFT
     * <p><b>100 credits per API call on Flow<br/>
     * 2 credits per API call on the other blockchains</b></p>
     * <p>You can mint NFTs using either of the following methods:</p>
     * <ul>
     * <li><a href="#NftExpress">Using NFT Express</a></li>
     * <li><a href="#NftNative">Natively on a blockchain</a></li>
     * </ul>
     * <h3 id="NftExpress">Minting NFTs using NFT Express</h3>
     * <p>NFT Express is Tatum's feature that helps you mint NFTs easier than minting natively on a blockchain.</p>
     * <ul>
     * <li><b>You do not need to enter your private key or signature ID.</b><br/>NFT Express uses the private key provided by Tatum.</li>
     * <li><b>You do not need to hold crypto or keep addresses topped up with crypto to pay for minting transactions.</b>
     * <ul>
     * <li>To use NFT Express on the <b>mainnet</b>, you have to have a <a href="https://tatum.io/pricing" target="_blank">paid pricing plan</a>.<br/>Tatum covers your transaction fees for NFT minting and pays for them from its own blockchain address. Then, the fee amount paid by Tatum is converted to the number of credits, and these credits are deducted from the monthly credit allowance of your paid pricing plan.<br/>The transaction fees and the corresponding numbers of credits deducted from your allowance vary depending on what blockchain you mint NFTs on.</li>
     * <li>On the <b>testnet</b>, no credits are deducted from the monthly credit allowance. You can mint NFTs with NFT Express regardless of your pricing plan.</li>
     * </ul>
     * </li>
     * </ul>
     * <p>With NFT Express, you can choose whether to mint NFTs on the <a href="#NftExpressPrebuilt">pre-built NFT smart contract provided by Tatum</a> or on <a href="#NftExpressOwn">your own smart contract</a>.</p>
     * <h4 id="NftExpressPrebuilt">Minting NFTs using the pre-built smart contract provided by Tatum</h4>
     * <p>If you want to mint NFTs using the pre-built smart contract, you do not need to deploy your own NFT smart contract. You do not need to provide the address of the NFT smart contract and the token ID in the request body either. The address of the smart contract and the token ID are provided automatically by Tatum.<br/>The token ID is autogenerated. It starts with 0 and is increased by 1 for each new NFT. The token ID is calculated separately for each supported blockchain and its mainnet and testnet.</p>
     * <p>You can mint NFTs on the pre-built smart contract provided by Tatum on the following blockchains:</p>
     * <ul>
     * <li>Algorand</li>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>Polygon</li>
     * <li>Solana</li>
     * </ul>
     * <p>Depending on what blockchain you use, choose the request body schema to use in the API call.</p>
     * <ul>
     * <li>To mint NFTs on <b>BNB Smart Chain</b>, <b>Celo</b>, <b>Ethereum</b>, <b>Harmony</b>, <b>Klaytn</b>, or <b>Polygon</b>, use this API with the <code>MintNftExpress</code> schema of the request body.</li>
     * <li>To mint NFTs on <b>Algorand</b>, use this API with the <code>MintNftExpressAlgorand</code> schema of the request body.<br/>An NFT minted on Algorand is automatically transferred to your blockchain address. After the NFT is minted, you have to transfer it to the recipient's address. The recipient has to agree in advance to receive your NFT because Algorand charges users for storing NFTs on their addresses, and an Algorand blockchain address by default does not receive NFTs unless explicitly agreed.<br/>This how it works:
     * <ol>
     * <li>The recipient <a href="https://apidoc.tatum.io/tag/Algorand#operation/AlgorandBlockchainReceiveAsset" target="_blank">agrees to receive the NFT</a> to their address.</li>
     * <li>You <a href="#operation/NftTransferErc721">transfer the NFT</a> to the recipient's address (use the <code>transferNftAlgoExpress</code> schema of the request body).<br /><b>NOTE:</b> On the <b>mainnet</b>, Tatum covers your transaction fees for the NFT transfer and pays for them from its own blockchain address. Then, the fee amount paid by Tatum is converted to the number of credits, and these credits are deducted from the monthly credit allowance of your paid pricing plan. On the <b>testnet</b>, no credits are deducted from the monthly credit allowance.</li>
     * </ol></li>
     * <li>To mint NFTs on <b>Solana</b>, use this API with the <code>MintNftExpressSolana</code> schema of the request body.<br/>Solana uses the <a href="https://www.metaplex.com/" target="_blank">Metaplex Protocol</a>, a smart contract and metadata standard for creating and working with NFTs. When you mint an NFT on Solana with NFT Express, the pre-built smart contract based on the Metaplex Protocol is used.<br/>When an NFT is minted on Solana, a new blockchain address is created to receive the NFT under the recipient's account address (the one in the <code>to</code> parameter of the request body). This address is returned in the <code>nftAccountAddress</code> parameter in the response body, is owned by the recipient's address, and has the same private key.<br/>The response body also returns the address of the minted NFT itself, which is held in the <code>nftAddress</code> parameter.<br/>After the NFT is minted, you have to <a href="#operation/NftTransferErc721">transfer it</a> to the recipient's address (use the <code>transferNftSolana</code> or <code>transferNftSolanaKMS</code> schema of the request body). In the request body:
     * <ul>
     * <li>Set the <code>contractAddress</code> parameter to the address from the <code>nftAddress</code> parameter in the response body of the minting call.</li>
     * <li>Set both <code>from</code> and <code>to</code> parameters to the recipient's address from the <code>to</code> parameter in the response body of the minting call.</li>
     * </ul></li></ul>
     * <h4 id="NftExpressOwn">Minting NFTs with NFT Express using your own smart contract</h4>
     * <p>If you want to mint NFTs using your own smart contract, you are going to use an <b>NTF minter</b>, a special blockchain address provided by Tatum that will cover the minting fees. The number of credits equivalent to the fees will be then deducted from the monthly credit allowance of your paid pricing plan.<br/>
     * <p>You can mint NFTs on your own smart contract on the following blockchains:</p>
     * <ul>
     * <li>BNB Smart Chain</li>
     * <li>Celo</li>
     * <li>Ethereum</li>
     * <li>Harmony</li>
     * <li>Klaytn</li>
     * <li>Polygon</li>
     * </ul>
     * <p>To mint NFTs using your own smart contract, do the following:</p>
     * <ol>
     * <li>In the table located under this section, find the blockchain address of the Tatum NFT minter for your blockchain and network (mainnet or testnet).</li>
     * <li><a href="#operation/NftAddMinter">Add the minter address as an NFT minter to your smart contract</a>.</li>
     * <li>Use this API with the <code>MintNftMinter</code> schema of the request body.<br />In the request body, enter the following information:
     * <ul>
     * <li><code>chain</code> is the blockchain that you use.</li>
     * <li><code>to</code> is the blockchain address where to send the minted NFT to.</li>
     * <li><code>url</code> is the URL of the NFT metadata.</li>
     * <li><code>minter</code> is the address of the NFT minter that you found in Step 1.</li>
     * <li><code>contractAddress</code> is the address of your NFT smart contract.</li>
     * <li><code>tokenId</code> is the the token ID of the NFT.<br />For example:
     * <pre>
     * {
         * "chain": "CELO",
         * "to": "0x8ce4e40889a13971681391aad29e88efaf91f784",
         * "url": "ipfs://QmXJJ6UF5WkF4WTJvsdhiA1etGwBLfpva7Vr9AudGMe3pj",
         * "contractAddress": "0x687422eEA2cB73B5d3e242bA5456b782919AFc85",
         * "tokenId": "0123",
         * "minter": "0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F"
         * }
         * </pre>
         * When you make an API call with this request body, the private key of the NFT minter will be added to the request body automatically:
         * <pre>
         * {
             * "chain": "CELO",
             * "to": "0x8ce4e40889a13971681391aad29e88efaf91f784",
             * "url": "ipfs://QmXJJ6UF5WkF4WTJvsdhiA1etGwBLfpva7Vr9AudGMe3pj",
             * "contractAddress": "0x687422eEA2cB73B5d3e242bA5456b782919AFc85",
             * "tokenId": "0123",
             * "minter": "0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F",
             * "fromPrivateKey": "0x05e150c73f1920ec14caa1e0b6aa09940899678051a78542840c2668ce5080c2"
             * }
             * </pre>
             * </li></ul></li>
             * </ol>
             * <p>The following table lists the blockchain addresses of the Tatum NFT minters for the testnet and mainnet of the supported blockchains:</p>
             * <table>
             * <tr>
             * <th>Blockchain</th>
             * <th>Minter address - testnet*</th>
             * <th>Minter address - mainnet</th>
             * </tr>
             * <tr>
             * <td>BNB Smart Chain</td>
             * <td>0xc16ae5e8c985b906935a0cadf4e24f0400531883</td>
             * <td>0x49678AAB11E001eb3cB2cBD9aA96b36DC2461A94</td>
             * </tr>
             * <tr>
             * <td>Celo</td>
             * <td>0xBC2eBA680EE50d685cc4Fe65f102AA70AfB27D3F</td>
             * <td>0x49678AAB11E001eb3cB2cBD9aA96b36DC2461A94</td>
             * </tr>
             * <tr>
             * <td>Ethereum</td>
             * <td>0x53e8577C4347C365E4e0DA5B57A589cB6f2AB848</td>
             * <td>0x49678AAB11E001eb3cB2cBD9aA96b36DC2461A94</td>
             * </tr>
             * <tr>
             * <td>Harmony</td>
             * <td>0x8906f62d40293ddca77fdf6714c3f63265deddf0</td>
             * <td>0x49678AAB11E001eb3cB2cBD9aA96b36DC2461A94</td>
             * </tr>
             * <tr>
             * <td>Klaytn</td>
             * <td>0x80d8bac9a6901698b3749fe336bbd1385c1f98f2</td>
             * <td>0x49678AAB11E001eb3cB2cBD9aA96b36DC2461A94</td>
             * </tr>
             * <tr>
             * <td>Polygon</td>
             * <td>0x542b9ac4945a3836fd12ad98acbc76a0c8b743f5</td>
             * <td>0x49678AAB11E001eb3cB2cBD9aA96b36DC2461A94</td>
             * </tr>
             * </table>
             * <p>*If a minter blockchain address on the testnet does not have sufficient funds to cover the transaction fee, add some amount to it using a crypto faucet of the blockchain.</p>
             * <h3 id="NftNative">Minting NFTs natively on a blockchain</h3>
             * <p>When minting an NFT natively on a blockchain, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
             * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
             * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js" target="_blank">Tatum JavaScript client</a>.</p>
             * <p>You can mint NFTs natively on the following blockchains:</p>
             * <ul>
             * <li>Algorand</li>
             * <li>BNB Smart Chain</li>
             * <li>Celo</li>
             * <li>Ethereum</li>
             * <li>Flow</li>
             * <li>Harmony</li>
             * <li>Klaytn</li>
             * <li>KuCoin Community Chain</li>
             * <li>Polygon</li>
             * <li>Solana</li>
             * <li>TRON</li>
             * </ul>
             * <p>Depending on what blockchain you use, choose the request body schema to use in the API call.</p>
             * <ul>
             * <li>To mint NFTs natively on <b>Algorand</b> and:
             * <ul><li>To sign the transaction with your <b>private key</b>, use this API with the <code>MintNftAlgorand</code> schema of the request body.</li>
             * <li>To sign the transaction with your <b>signature ID</b>, use this API the <code>MintNftAlgorandKMS</code> schema of the request body.</li></ul></li>
             * <li>To mint NFTs natively on <b>BNB Smart Chain</b>, <b>Ethereum</b>, <b>Harmony</b>, <b>Klaytn</b>, <b>KuCoin Community Chain</b>, or <b>Polygon</b>, and:
             * <ul><li>To sign the transaction with your <b>private key</b>, use this API with the <code>MintNft</code> schema of the request body.</li>
             * <li>To sign the transaction with your <b>signature ID</b>, use this API the <code>MintNftKMS</code> schema of the request body.</li></ul></li>
             * <li>To mint NFTs natively on <b>Celo</b> and:
             * <ul><li>To sign the transaction with your <b>private key</b>, use this API with the <code>MintNftCelo</code> schema of the request body.</li>
             * <li>To sign the transaction with your <b>signature ID</b>, use this API the <code>MintNftKMSCelo</code> schema of the request body.</li></ul></li>
             * <li>To mint NFTs natively on <b>Flow</b> and:
             * <ul><li>To sign the transaction with your <b>private key</b>, use this API with the <code>MintNftFlowPK</code> schema of the request body.</li>
             * <li>To sign the transaction with your <b>signature ID</b>, use this API the <code>MintNftFlowMnemonic</code> schema of the request body.</li>
             * <li>To sign the transaction with your <b>wallet mnemonic</b>, use this API the <code>MintNftFlowKMS</code> schema of the request body.</li></ul></li>
             * <li>To mint NFTs natively on <b>Solana</b> and:
             * <ul><li>To sign the transaction with your <b>private key</b>, use this API with the <code>MintNftSolana</code> schema of the request body.</li>
             * <li>To sign the transaction with your <b>signature ID</b>, use this API the <code>MintNftSolanaKMS</code> schema of the request body.</li></ul></li>
             * <li>To mint NFTs natively on <b>TRON</b> and:
             * <ul><li>To sign the transaction with your <b>private key</b>, use this API with the <code>MintNftTron</code> schema of the request body.</li>
             * <li>To sign the transaction with your <b>signature ID</b>, use this API the <code>MintNftKMSTron</code> schema of the request body.</li></ul></li>
             * </ul>
             *
             * @param requestBody
             * @param xTestnetType Type of Ethereum testnet. Defaults to Sepolia. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
             * @returns any OK
             * @throws ApiError
             */
            public static nftMintErc721(
                requestBody: (MintNftExpress | MintNftExpressSolana | MintNftExpressAlgorand | MintNftSolana | MintNftMinter | MintNft | MintNftCelo | MintNftAlgorand | MintNftFlowPK | MintNftFlowMnemonic | MintNftTron | MintNftKMS | MintNftSolanaKMS | MintNftKMSCelo | MintNftKMSTron | MintNftAlgorandKMS | MintNftFlowKMS),
                xTestnetType: 'ethereum-sepolia' = 'ethereum-sepolia',
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
             * Transfer an NFT
             * <p><b>100 credits per API call on Flow<br/>
             * 2 credits per API call on the other blockchains</b></p>
             * <p>Transfer NFT Tokens from account to account. Transfer any NFT token from smart contract defined in contractAddress.
             * Only 1 specific token with specified tokenId can be transfered. This method invokes ERC721 method safeTransfer() to transfer the token in case of ETH, Celo and BSC.<br/><br/>
             * <p>This API is supported for the following blockchains:</p>
             * <ul>
             * <li>Algorand</li>
             * <li>BNB Smart Chain</li>
             * <li>Celo</li>
             * <li>Ethereum</li>
             * <li>Flow</li>
             * <li>Harmony</li>
             * <li>Klaytn</li>
             * <li>KuCoin Community Chain</li>
             * <li>Polygon</li>
             * <li>Solana</li>
             * <li>TRON</li>
             * </ul>
             * Algorand is unique a way that the receiving account should be ready before sending the NFT asset.
             * To perform this, the receiving account should transfer the NFT asset with 0 amount to itself.
             * During the process, it's using the same API as the main transaction: the only difference is that the "fromPrivateKey" should be the privateKey of the receiving account.
             * If you were minting NFTs on Algorand with NFT Express, you can skip the fromPrivateKey field in the request body and NFT will be transferred to you automatically from Tatum - this is tied to the API Key used during the mint.
             * </p>
             * <p><b>Signing a transaction</b></p>
             * <p>When transferring an NFT, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
             * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
             * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js" target="_blank">Tatum JavaScript client</a>.</p>
             *
             * @param requestBody
             * @param xTestnetType Type of Ethereum testnet. Defaults to Sepolia. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
             * @returns any OK
             * @throws ApiError
             */
            public static nftTransferErc721(
                requestBody: (TransferNft | TransferNftCelo | TransferNftTron | TransferNftSolana | TransferNftAlgo | TransferNftAlgoExpress | TransferNftFlowPK | TransferNftFlowMnemonic | TransferNftKMS | TransferNftKMSCelo | TransferNftAlgoKMS | TransferNftSolanaKMS | TransferNftFlowKMS | TransferNftKMSTron),
                xTestnetType: 'ethereum-sepolia' = 'ethereum-sepolia',
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
             * Mint multiple NFTs
             * <p><b>100 credits per API call on Flow<br/>
             * 2 credits per API call on the other blockchains</b></p>
             * <p>Create multiple NFT Tokens and transfer them to destination account. Create and transfer any NFT tokens from smart contract defined in contractAddress.<br/><br/>
             * <p>This API is supported for the following blockchains:</p>
             * <ul>
             * <li>BNB Smart Chain</li>
             * <li>Celo</li>
             * <li>Ethereum</li>
             * <li>Flow</li>
             * <li>Harmony</li>
             * <li>Klaytn</li>
             * <li>KuCoin Community Chain</li>
             * <li>Polygon</li>
             * <li>TRON</li>
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
                 * <td>ETH</td>
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
                 * @param xTestnetType Type of Ethereum testnet. Defaults to Sepolia. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
                 * @returns any OK
                 * @throws ApiError
                 */
                public static nftMintMultipleErc721(
                    requestBody: (MintMultipleNftMinter | MintMultipleNft | MintMultipleNftCelo | MintMultipleNftTron | MintMultipleNftFlowPK | MintMultipleNftFlowMnemonic | MintMultipleNftKMS | MintMultipleNftKMSCelo | MintMultipleNftKMSTron | MintMultipleNftFlowKMS),
                    xTestnetType: 'ethereum-sepolia' = 'ethereum-sepolia',
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
                 * Burn an NFT
                 * <p><b>100 credits per API call on Flow<br/>
                 * 2 credits per API call on the other blockchains</b></p>
                 * <p>Burn one NFT Token. This method destroys any NFT token from smart contract defined in contractAddress.<br/><br/>
                 * <p>This API is supported for the following blockchains:</p>
                 * <ul>
                 * <li>Algorand</li>
                 * <li>BNB Smart Chain</li>
                 * <li>Celo</li>
                 * <li>Ethereum</li>
                 * <li>Flow</li>
                 * <li>Harmony</li>
                 * <li>Klaytn</li>
                 * <li>KuCoin Community Chain</li>
                 * <li>Polygon</li>
                 * <li>TRON</li>
                 * </ul>
                 * <p><b>Signing a transaction</b></p>
                 * <p>When burning an NFT, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
                 * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
                 * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js" target="_blank">Tatum JavaScript client</a>.</p>
                 *
                 * @param requestBody
                 * @param xTestnetType Type of Ethereum testnet. Defaults to Sepolia. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
                 * @returns any OK
                 * @throws ApiError
                 */
                public static nftBurnErc721(
                    requestBody: (BurnNftCelo | BurnNftKMSCelo | BurnNftTron | BurnNftKMSTron | BurnNft | BurnNftKMS | BurnNftFlowPK | BurnNftFlowMnemonic | BurnNftFlowKMS),
                    xTestnetType: 'ethereum-sepolia' = 'ethereum-sepolia',
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
                 * Add an NFT minter
                 * <p><b>2 credits per API call</b></p>
                 * <p>Add new minter of NFT Tokens. This method adds minter permission to new minter address.<br/><br/>
                 * <p>This API is supported for the following blockchains:</p>
                 * <ul>
                 * <li>BNB Smart Chain</li>
                 * <li>Celo</li>
                 * <li>Ethereum</li>
                 * <li>Harmony</li>
                 * <li>Klaytn</li>
                 * <li>KuCoin Community Chain</li>
                 * <li>Polygon</li>
                 * </ul>
                 * <p><b>Signing a transaction</b></p>
                 * <p>When adding an NFT minter, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
                 * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
                 * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js" target="_blank">Tatum JavaScript client</a>.</p>
                 *
                 * @param requestBody
                 * @param xTestnetType Type of Ethereum testnet. Defaults to Sepolia. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
                 * @returns any OK
                 * @throws ApiError
                 */
                public static nftAddMinter(
                    requestBody: (AddNftMinter | AddNftMinterKMS),
                    xTestnetType: 'ethereum-sepolia' = 'ethereum-sepolia',
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
                 * Update NFT royalty
                 * <p><b>2 credits per API call</b></p>
                 * <p>Update royalty cashback value for one NFT Token. This method updates the first royalty value of specific author for 1 token.
                 * If royalty value is set to 0, it will disable the royalty system for the token. Only from author's address of the royalty can change it's royalty value, not the owner of the token.<br/><br/>
                 * <p>This API is supported for the following blockchains:</p>
                 * <ul>
                 * <li>BNB Smart Chain</li>
                 * <li>Celo</li>
                 * <li>Ethereum</li>
                 * <li>Harmony</li>
                 * <li>Klaytn</li>
                 * <li>KuCoin Community Chain</li>
                 * <li>Polygon</li>
                 * <li>TRON</li>
                 * <p><b>Signing a transaction</b></p>
                 * <p>When updating NFT royalty, you are charged a fee for the transaction, and you must sign the transaction with the private key of the blockchain address from which the fee will be deducted.</p>
                 * <p>Providing the private key in the API is not a secure way of signing transactions, because the private key can be stolen or exposed. Your private keys should never leave your security perimeter. You should use the private keys only for testing a solution you are building on the <b>testnet</b> of a blockchain.</p>
                 * <p>For signing transactions on the <b>mainnet</b>, we strongly recommend that you use the Tatum <a href="https://github.com/tatumio/tatum-kms" target="_blank">Key Management System (KMS)</a> and provide the signature ID instead of the private key in the API. Alternatively, you can use the <a href="https://github.com/tatumio/tatum-js" target="_blank">Tatum JavaScript client</a>.</p>
                 *
                 * @param requestBody
                 * @param xTestnetType Type of Ethereum testnet. Defaults to Sepolia. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
                 * @returns any OK
                 * @throws ApiError
                 */
                public static nftUpdateCashbackErc721(
                    requestBody: (UpdateCashbackValueForAuthorNftCelo | UpdateCashbackValueForAuthorNftKMSCelo | UpdateCashbackValueForAuthorNftTron | UpdateCashbackValueForAuthorNftKMSTron | UpdateCashbackValueForAuthorNft | UpdateCashbackValueForAuthorNftKMS),
                    xTestnetType: 'ethereum-sepolia' = 'ethereum-sepolia',
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
                 * Get NFT transactions for a blockchain address
                 * <p><b>1 credit per API call</b></p>
                 * <p>Get incoming and outgoing NFT transactions for a blockchain address.</p>
                 * <p>This API is supported for the following blockchains:</p>
                 * <ul>
                 * <li>Celo</li>
                 * <li>Ethereum</li>
                 * <li>Polygon</li>
                 * </ul>
                 *
                 * @param chain Blockchain to work with
                 * @param address Account address you want to get balance of
                 * @param tokenAddress Address of the token smart contract
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
                 * Get NFT transactions for an NFT
                 * <p><b>1 credit per API call</b></p> <p>Get NFT transactions by token. This includes incoming and outgoing transactions for the token.</p> <p>This API is supported for the following blockchains:</p> <ul> <li>Celo</li> <li>Ethereum</li> <li>Polygon</li> </ul>
                 * @param chain Blockchain to work with
                 * @param tokenId NFT Token ID
                 * @param tokenAddress Address of the token smart contract
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
                 * Get the address of an NFT smart contract by its transaction hash
                 * <p><p>This endpoint is deprecated. Do not use it.<br/>
                 * Instead, use <a href="https://apidoc.tatum.io/tag/Blockchain-utils#operation/SCGetContractAddress" target="_blank">this API</a>.</b></p><br/>
                 * <p><b>1 credit per API call</b></p>
                 * <p>Get NFT contract address from deploy transaction.</p>
                 * <p>This API is supported for the following blockchains:</p>
                 * <ul>
                 * <li>BNB Smart Chain</li>
                 * <li>Celo</li>
                 * <li>Ethereum</li>
                 * <li>Flow</li>
                 * <li>Harmony</li>
                 * <li>Klaytn</li>
                 * <li>KuCoin Community Chain</li>
                 * <li>Polygon</li>
                 * <li>TRON</li>
                 * </ul>
                 *
                 * @param chain Blockchain to work with
                 * @param hash Transaction hash
                 * @param xTestnetType Type of Ethereum testnet. Defaults to Sepolia. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
                 * @returns any OK
                 * @throws ApiError
                 */
                public static nftGetContractAddress(
                    chain: 'ETH' | 'ONE' | 'KLAY' | 'CELO' | 'TRON' | 'FLOW' | 'MATIC' | 'KCS' | 'BSC',
                    hash: string,
                    xTestnetType: 'ethereum-sepolia' = 'ethereum-sepolia',
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
                 * Get an NFT transaction by its hash
                 * <p><b>1 credit per API call</b></p>
                 * <p>Get NFT transaction by transaction hash.</p>
                 * <p>This API is supported for the following blockchains:</p>
                 * <ul>
                 * <li>BNB Smart Chain</li>
                 * <li>Celo</li>
                 * <li>Ethereum</li>
                 * <li>Flow</li>
                 * <li>Harmony</li>
                 * <li>Klaytn</li>
                 * <li>KuCoin Community Chain</li>
                 * <li>Polygon</li>
                 * <li>TRON</li>
                 * </ul>
                 *
                 * @param chain Blockchain to work with
                 * @param hash Transaction hash
                 * @param xTestnetType Type of Ethereum testnet. Defaults to Sepolia. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
                 * @returns any OK
                 * @throws ApiError
                 */
                public static nftGetTransactErc721(
                    chain: 'ETH' | 'MATIC' | 'KCS' | 'ONE' | 'KLAY' | 'CELO' | 'TRON' | 'FLOW' | 'BSC',
                    hash: string,
                    xTestnetType: 'ethereum-sepolia' = 'ethereum-sepolia',
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
                 * Get the NFT smart contracts and the NFTs for a blockchain address
                 * <p><b>1 credit per API call + 5 credits for each owned NFT</b></p>
                 * <p>For a blockchain address, get the NFT smart contracts where the address holds NFTs and the NFTs that the address holds in each of those contracts.</p>
                 * <p>This API is supported for the following blockchains:</p>
                 * <ul>
                 * <li>Algorand</li>
                 * <li>Celo</li>
                 * <li>Ethereum</li>
                 * <li>Polygon</li>
                 * <li>Solana</li>
                 * </ul>
                 * <p>On Solana and Algorand, if a blockchain address holds fewer than 50 NFTs, the API also returns each NFT's metadata. If the metadata is not returned, you can obtain it using the <a href="https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)/#operation/NftGetMetadataErc721">API for getting NFT metadata</a>.</p>
                 *
                 * @param chain Blockchain to work with
                 * @param address Account address you want to get balance of
                 * @returns any OK
                 * @throws ApiError
                 */
                public static nftGetTokensByAddressErc721(
                    chain: 'ALGO' | 'CELO' | 'ETH' | 'MATIC' | 'SOL',
                    address: string,
                ): CancelablePromise<Array<{
                    /**
                     * Contract address of the NFT. In Algorand case, it will be asset-id..
                     */
                    contractAddress: string;
                    balances: Array<string>;
                    metadata?: Array<{
                        /**
                         * TokenID of the NFT token owned by this address. Valid for EVM chains only.
                         */
                        tokenId?: string;
                        /**
                         * Metadata URL of the NFT. This data don't have to be present, safest way (if not present) is to obtain them from the NFT Contract.tokenURI() method call.
                         */
                        url?: string;
                        /**
                         * Metadata scheme obtained from the url. This data don't have to be present, safest way (if not present) is to obtain them from the <a href="#operation/NftGetMetadataErc721">Get Metadata</a> call.
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
                 * Get NFTs from a collection
                 * <p><b>1 credit per API call + 5 credits for each listed NFT</b></p>
                 * <p>Get all minted NFTs in the collection. Returns all NFTs this contract minted.</p>
                 * <p>This API is supported for the following blockchains:</p>
                 * <ul>
                 * <li>Celo</li>
                 * <li>Ethereum</li>
                 * <li>Polygon</li>
                 * </ul>
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
                 * Get the NFTs a blockchain address holds in a smart contract
                 * <p><b>1 credit per API call</b></p>
                 * <p>Get the NFTs that a blockchain address holds in the smart contract (the <code>contractAddress</code> parameter in the request body).</p>
                 * <p><b>NOTE:</b> This API works only for the NFT smart contracts deployed using the <a href="https://apidoc.tatum.io/tag/NFT-(ERC-721-or-compatible)#operation/NftDeployErc721" target="_blank">smart contract API</a>.</p>
                 * <p>This API is supported for the following blockchains:</p>
                 * <ul>
                 * <li>BNB Smart Chain</li>
                 * <li>Celo</li>
                 * <li>Ethereum</li>
                 * <li>Flow</li>
                 * <li>Harmony</li>
                 * <li>Klaytn</li>
                 * <li>KuCoin Community Chain</li>
                 * <li>Polygon</li>
                 * <li>Solana</li>
                 * <li>TRON</li>
                 * </ul>
                 *
                 * @param chain Blockchain to work with
                 * @param address Account address you want to get balance of
                 * @param contractAddress NFT contract address
                 * @param xTestnetType Type of Ethereum testnet. Defaults to Sepolia. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
                 * @returns string OK
                 * @throws ApiError
                 */
                public static nftGetBalanceErc721(
                    chain: 'ETH' | 'MATIC' | 'KCS' | 'ONE' | 'KLAY' | 'CELO' | 'TRON' | 'FLOW' | 'BSC' | 'SOL',
                    address: string,
                    contractAddress: string,
                    xTestnetType: 'ethereum-sepolia' = 'ethereum-sepolia',
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
                 * Get NFT provenance data
                 * <p><b>1 credit per API call</b></p>
                 * <p>Get NFT token provenance data, valid only for provenance contract.</p>
                 * <p>This API is supported for the following blockchains:</p>
                 * <ul>
                 * <li>BNB Smart Chain</li>
                 * <li>Celo</li>
                 * <li>Ethereum</li>
                 * <li>Harmony</li>
                 * <li>Klaytn</li>
                 * <li>KuCoin Community Chain</li>
                 * <li>Polygon</li>
                 * </ul>
                 *
                 * @param chain Blockchain to work with
                 * @param tokenId Token ID
                 * @param contractAddress NFT contract address
                 * @param xTestnetType Type of Ethereum testnet. Defaults to Sepolia. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
                 * @returns any OK
                 * @throws ApiError
                 */
                public static nftGetProvenanceDataErc721(
                    chain: 'ETH' | 'MATIC' | 'KCS' | 'ONE' | 'KLAY' | 'CELO' | 'BSC',
                    tokenId: string,
                    contractAddress: string,
                    xTestnetType: 'ethereum-sepolia' = 'ethereum-sepolia',
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
                 * Get NFT metadata
                 * <p><b>1 credit per API call</b></p>
                 * <p>Get NFT token metadata.</p>
                 * <p>This API is supported for the following blockchains:</p>
                 * <ul>
                 * <li>BNB Smart Chain</li>
                 * <li>Celo</li>
                 * <li>Ethereum</li>
                 * <li>Flow</li>
                 * <li>Harmony</li>
                 * <li>Klaytn</li>
                 * <li>KuCoin Community Chain</li>
                 * <li>Polygon</li>
                 * <li>TRON</li>
                 * </ul>
                 *
                 * @param chain Blockchain to work with
                 * @param contractAddress NFT contract address
                 * @param token Token ID, required for all except SOL
                 * @param account Account holding this token. FLOW only.
                 * @param xTestnetType Type of Ethereum testnet. Defaults to Sepolia. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
                 * @returns any OK
                 * @throws ApiError
                 */
                public static nftGetMetadataErc721(
                    chain: 'ETH' | 'MATIC' | 'KCS' | 'SOL' | 'ONE' | 'KLAY' | 'CELO' | 'TRON' | 'FLOW' | 'BSC',
                    contractAddress: string,
                    token: string,
                    account?: string,
                    xTestnetType: 'ethereum-sepolia' = 'ethereum-sepolia',
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
                 * Get NFT royalty information
                 * <p><b>1 credit per API call</b></p>
                 * <p>Get NFT token royalty.</p>
                 * <p>This API is supported for the following blockchains:</p>
                 * <ul>
                 * <li>BNB Smart Chain</li>
                 * <li>Celo</li>
                 * <li>Ethereum</li>
                 * <li>Flow</li>
                 * <li>Harmony</li>
                 * <li>Klaytn</li>
                 * <li>KuCoin Community Chain</li>
                 * <li>Polygon</li>
                 * <li>TRON</li>
                 * </ul>
                 *
                 * @param chain Blockchain to work with
                 * @param contractAddress NFT contract address
                 * @param token Token ID, required for all except SOL
                 * @param xTestnetType Type of Ethereum testnet. Defaults to Sepolia. Valid only for ETH invocations for testnet API Key. For mainnet API Key, this value is ignored.
                 * @returns any OK
                 * @throws ApiError
                 */
                public static nftGetRoyaltyErc721(
                    chain: 'ETH' | 'MATIC' | 'KCS' | 'SOL' | 'ONE' | 'KLAY' | 'CELO' | 'TRON' | 'BSC',
                    contractAddress: string,
                    token: string,
                    xTestnetType: 'ethereum-sepolia' = 'ethereum-sepolia',
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