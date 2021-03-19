import { PinoLogger } from 'nestjs-pino';
import {
  Currency,
  generateAddressFromXPub,
  generatePrivateKeyFromMnemonic,
  generateWallet,
  ethGetGasPriceInWei,
  EstimateGasEth,
  EthBlock,
  Transaction,
  TransactionHash,
  TransferEthErc20,
  prepareEthOrErc20SignedTransaction,
  ETH_BASED_CURRENCIES,
  TransferCustomErc20,
  prepareCustomErc20SignedTransaction,
  DeployEthErc20,
  prepareDeployErc20SignedTransaction,
  BroadcastTx,
  sendSmartContractReadMethodInvocationTransaction,
  prepareSmartContractWriteMethodInvocation,
  prepareEthTransferErc721SignedTransaction,
  prepareEthMintErc721SignedTransaction,
  EthTransferErc721,
  EthMintErc721,
  EthMintMultipleErc721,
  prepareEthMintMultipleErc721SignedTransaction,
  EthDeployErc721,
  prepareEthDeployErc721SignedTransaction,
  EthBurnErc721, prepareEthBurnErc721SignedTransaction, SmartContractMethodInvocation,
} from '@tatumio/tatum';
import Web3 from 'web3'
import { fromWei } from 'web3-utils'
import { Pagination } from './dto/Pagination'
import { TransactionReceipt } from 'web3-core'
import { TatumError } from '../../../scrypta-connector/module/npm/error'
import { CONTRACT_ADDRESSES } from '@tatumio/tatum/dist/src/constants'
import ERC20_TOKEN_ABI from '@tatumio/tatum/dist/src/contracts/erc20/token_abi'
import ERC721_TOKEN_ABI from '@tatumio/tatum/dist/src/contracts/erc721/erc721_abi'
import { randomNumber } from './utils'
import axios from 'axios'
import { SignatureId } from '@tatumio/tatum/dist/src/model/response/common/SignatureId'

export abstract class EthereumService {

  protected constructor(protected readonly logger: PinoLogger) {
  }

  protected abstract isTestnet(): Promise<boolean>

  protected abstract getNodesUrl(testnet: boolean): Promise<string[]>

  protected abstract storeKMSTransaction(txData: string, currency: string, signatureId: string[]): Promise<string>;

  protected abstract completeKMSTransaction(txId: string, signatureId: string): Promise<void>;

  protected abstract completeWebhookTransaction(withdrawalId: string): Promise<void>;

  public abstract checkInternalTransaction(txId: string, testnet: boolean): Promise<Array<{ address: string, value: string }>>

  public abstract getCurrentBlock(testnet?: boolean): Promise<number>

  public abstract getTransactionsByAddress(address: string, pagination: Pagination): Promise<any[]>

  public abstract getBlock(hash: string | number, testnet?: boolean): Promise<EthBlock>

  public abstract getTransaction(hash: string, testnet?: boolean): Promise<Transaction & TransactionReceipt>

  private async getFirstNodeUrl(): Promise<string> {
    const nodes = await this.getNodesUrl(await this.isTestnet())
    if (nodes.length === 0) {
      new TatumError('Nodes url array must have at least one element.', 'ethereum.nodes.url')
    }
    return nodes[0]
  }

  private async getClient(): Promise<Web3> {
    return new Web3(await this.getFirstNodeUrl())
  }

  public async broadcast(txData: string, signatureId?: string, withdrawalId?: string): Promise<{
    txId: string,
    failed?: boolean,
  }> {
    this.logger.info(`Broadcast tx for ETH with data '${txData}'`)
    const client = await this.getClient()
    const result: { txId: string } = await new Promise((async (resolve, reject) => {
      client.eth.sendSignedTransaction(txData)
        .once('transactionHash', txId => resolve({ txId }))
        .on('error', e => reject(new TatumError(`Unable to broadcast transaction due to ${e.message}.`, 'ethereum.broadcast.failed')));
    }));

    try {
      await this.completeWebhookTransaction(withdrawalId)
    } catch (e) {
      this.logger.error(e);
    }

    if (signatureId) {
      try {
        await this.completeKMSTransaction(result.txId, signatureId)
      } catch (e) {
        this.logger.error(e);
        return { txId: result.txId, failed: true };
      }
    }

    return result
  }

  private async broadcastOrStoreKMSTransaction({ transactionData, signatureId }: BroadcastOrStoreKMSTransaction) {
    if (signatureId) {
      return {
        signatureId: await this.storeKMSTransaction(transactionData, Currency.ETH, [signatureId]),
      }
    }
    return this.broadcast(transactionData)
  }

  public async web3Method(body: any) {
    const node = await this.getFirstNodeUrl()
    return (await axios.post(node, body, { headers: { 'Content-Type': 'application/json' } })).data;
  }

  public async generateWallet(mnemonic?: string) {
    return generateWallet(Currency.ETH, await this.isTestnet(), mnemonic)
  }

  public async generatePrivateKey(mnemonic: string, index: number) {
    const key = await generatePrivateKeyFromMnemonic(Currency.ETH, await this.isTestnet(), mnemonic, index)
    return { key }
  }

  public async generateAddress(xpub: string, derivationIndex: string): Promise<{ address: string }> {
    const address = await generateAddressFromXPub(Currency.ETH, await this.isTestnet(), xpub, parseInt(derivationIndex))
    return { address }
  }

  public async estimateGas(body: EstimateGasEth) {
    const client = await this.getClient();
    return {
      gasLimit: await client.eth.estimateGas(body),
      gasPrice: await ethGetGasPriceInWei(),
    };
  }

  public async getBalance(address: string): Promise<{ balance: string }> {
    const client = await this.getClient()
    return { balance: fromWei(await client.eth.getBalance(address), 'ether') };
  }

  public async getErc20Balance(address: string, currency?: string, contractAddress?: string): Promise<{ balance: string }> {
    if (await this.isTestnet() && currency) {
      throw new TatumError('Unsupported ERC20 currency for testnet, only mainet supports currency parameter. Please use contractAddress instead.', 'erc20.not.supported');
    }
    const contract = currency && ETH_BASED_CURRENCIES.includes(currency) ? CONTRACT_ADDRESSES[currency] : contractAddress

    const client = await this.getClient()
    // @ts-ignore
    const web3Contract = new client.eth.Contract(ERC20_TOKEN_ABI, contract);
    return { balance: await web3Contract.methods.balanceOf(address).call() }
  }

  public async sendEthOrErc20Transaction(transferEthErc20: TransferEthErc20): Promise<TransactionHash | SignatureId> {
    const transactionData = await prepareEthOrErc20SignedTransaction(transferEthErc20, await this.getFirstNodeUrl())
    return this.broadcastOrStoreKMSTransaction({ transactionData, signatureId: transferEthErc20.signatureId })
  }

  public async sendCustomErc20Transaction(transferCustomErc20: TransferCustomErc20): Promise<TransactionHash | SignatureId> {
    const transactionData = await prepareCustomErc20SignedTransaction(transferCustomErc20, await this.getFirstNodeUrl())
    return this.broadcastOrStoreKMSTransaction({ transactionData, signatureId: transferCustomErc20.signatureId })
  }

  public async getTransactionCount(address: string) {
    const client = await this.getClient();
    return client.eth.getTransactionCount(address, 'pending');
  }

  public async invokeSmartContractMethod(smartContractMethodInvocation: SmartContractMethodInvocation) {
    const node = await this.getFirstNodeUrl()
    if (smartContractMethodInvocation.methodABI.stateMutability === 'view') {
      return sendSmartContractReadMethodInvocationTransaction(smartContractMethodInvocation, node)
    }

    const transactionData = await prepareSmartContractWriteMethodInvocation(smartContractMethodInvocation, node)
    return this.broadcastOrStoreKMSTransaction({ transactionData, signatureId: smartContractMethodInvocation.signatureId })
  }

  public async deployErc20Blockchain(deployEthErc20: DeployEthErc20) {
    const transactionData = await prepareDeployErc20SignedTransaction(deployEthErc20, await this.getFirstNodeUrl())
    return this.broadcastOrStoreKMSTransaction({ transactionData, signatureId: deployEthErc20.signatureId })

  }

  public async getErc20InternalTransactionsByAddress(address: string, query: Pagination) {
    const page = Math.floor((Number(query.offset) || 0) / Number(query.pageSize) + 1);
    const apiKey = process.env.etherscan_api_key?.split(',') || [];
    const index = randomNumber(apiKey.length);
    const url = `https://${await this.isTestnet() ? 'api-ropsten' : 'api'}.etherscan.io/api?module=account&action=txlistinternal&address=${address}&sort=desc&apikey=${apiKey[index]}&page=${page}&offset=${Number(query.pageSize)}`;
    const { result } = (await axios.get(url)).data;
    return result;
  }

  public async getBalanceErc721(address: string, contractAddress: string): Promise<{ data: string }> {
    const client = await this.getClient()
    // @ts-ignore
    const web3Contract = new client.eth.Contract(ERC721_TOKEN_ABI, contractAddress);
    try {
      return { data: await web3Contract.methods.balanceOf(address).call() };
    } catch (e) {
      this.logger.error(e);
      throw new TatumError(`Unable to obtain information for token. ${e}`, 'eth.erc721.failed');
    }
  }

  public async getTokenErc721(address: string, index: string, contractAddress: string): Promise<{ data: string }> {
    // @ts-ignore
    const c = new (await this.getClient()).eth.Contract(ERC721_TOKEN_ABI, contractAddress);
    try {
      return { data: await c.methods.tokenOfOwnerByIndex(address, index).call() };
    } catch (e) {
      this.logger.error(e);
      throw new TatumError(`Unable to obtain information for token. ${e}`, 'eth.erc721.failed');
    }
  }

  public async getMetadataErc721(token: string, contractAddress: string): Promise<{ data: string }> {
    // @ts-ignore
    const c = new (await this.getClient()).eth.Contract(ERC721_TOKEN_ABI, contractAddress);
    try {
      return { data: await c.methods.tokenURI(token).call() };
    } catch (e) {
      this.logger.error(e);
      throw new TatumError(`Unable to obtain information for token. ${e}`, 'eth.erc721.failed');
    }
  }

  public async getOwnerErc721(token: string, contractAddress: string): Promise<{ data: string }> {
    // @ts-ignore
    const c = new (await this.getClient()).eth.Contract(ERC721_TOKEN_ABI, contractAddress);
    try {
      return { data: await c.methods.ownerOf(token).call() };
    } catch (e) {
      this.logger.error(e);
      throw new TatumError(`Unable to obtain information for token. ${e}`, 'eth.erc721.failed');
    }
  }

  public async getTokensOfOwner(address: string, contractAddress: string): Promise<{ data: string }> {
    // @ts-ignore
    const c = new (await this.getClient()).eth.Contract(ERC721_TOKEN_ABI, contractAddress);
    try {
      return { data: await c.methods.tokensOfOwner(address).call() };
    } catch (e) {
      this.logger.error(e);
      throw new TatumError(`Unable to obtain information for token. ${e}`, 'eth.erc721.failed');
    }
  }

  public async transferErc721(transferErc721: EthTransferErc721) {
    const transactionData = await prepareEthTransferErc721SignedTransaction(transferErc721, await this.getFirstNodeUrl())
    return this.broadcastOrStoreKMSTransaction({ transactionData, signatureId: transferErc721.signatureId })
  }

  public async mintErc721(mintErc721: EthMintErc721) {
    const transactionData = await prepareEthMintErc721SignedTransaction(mintErc721, await this.getFirstNodeUrl())
    return this.broadcastOrStoreKMSTransaction({ transactionData, signatureId: mintErc721.signatureId })
  }

  public async mintMultipleErc721(mintMultipleErc721: EthMintMultipleErc721) {
    const transactionData = await prepareEthMintMultipleErc721SignedTransaction(mintMultipleErc721, await this.getFirstNodeUrl())
    return this.broadcastOrStoreKMSTransaction({ transactionData, signatureId: mintMultipleErc721.signatureId })
  }

  public async deployErc721(deployErc721: EthDeployErc721) {
    const transactionData = await prepareEthDeployErc721SignedTransaction(deployErc721, await this.getFirstNodeUrl())
    return this.broadcastOrStoreKMSTransaction({ transactionData, signatureId: deployErc721.signatureId })
  }

  public async burnErc721(burnErc721: EthBurnErc721) {
    const transactionData = await prepareEthBurnErc721SignedTransaction(burnErc721, await this.getFirstNodeUrl())
    return this.broadcastOrStoreKMSTransaction({ transactionData, signatureId: burnErc721.signatureId })
  }
}
