import ScryptaCore from '@scrypta/core';
import {
  LYRA_NETWORK,
  LYRA_TEST_NETWORK,
  ScryptaBlock,
  ScryptaParsedTx,
  ScryptaUnspent,
} from './constants';
import { PinoLogger } from 'nestjs-pino';
import * as Tatum from '@tatumio/tatum';
import { Currency, TransferBtcBasedBlockchain } from '@tatumio/tatum';

export abstract class ScryptaBlockchainService {
  protected scrypta: any;

  protected constructor(protected readonly logger: PinoLogger) {
    this.scrypta = new ScryptaCore(false);
    this.scrypta.staticnodes = true;
  }

  protected abstract isTestnet(): Promise<boolean>;

  protected abstract getNodesUrl(): Promise<string[]>;
  //
  //  GENERIC FUNCTIONS
  //

  public async getNetwork() {
    return (await this.isTestnet()) ? LYRA_TEST_NETWORK : LYRA_NETWORK;
  }

  //
  // BLOCKCHAIN FUNCTIONS
  //

  /**
   * Get blcokchain informations
   */
  public async getBlockChainInfo(): Promise<any> {
    this.scrypta.testnet = await this.isTestnet();
    this.scrypta.nodes = await this.getNodesUrl();
    this.scrypta.staticnodes = true;
    try {
      const info = await this.scrypta.get('/wallet/getinfo');
      return info;
    } catch (e) {
      this.logger.error(e);
      throw new Error(`${e.message} Code: ${e.code}`);
    }
  }

  /**
   * Get current block height
   */
  public async getCurrentBlock(): Promise<number> {
    this.scrypta.testnet = await this.isTestnet();
    this.scrypta.nodes = await this.getNodesUrl();
    this.scrypta.staticnodes = true;

    try {
      const info = await this.scrypta.get('/wallet/getinfo');
      return info.blocks;
    } catch (e) {
      this.logger.error(e);
      throw new Error(`${e.message}`);
    }
  }

  /**
   * Get Block hash from index
   * @param i
   */
  public async getBlockHash(i: number): Promise<string> {
    this.scrypta.testnet = await this.isTestnet();
    this.scrypta.nodes = await this.getNodesUrl();
    this.scrypta.staticnodes = true;
    try {
      const block = await this.scrypta.get('/blockhash/' + i);
      return block.hash;
    } catch (e) {
      this.logger.error(e);
      throw new Error(`${e.message}`);
    }
  }

  /**
   * Get block details by hash
   * @param hash
   */
  public async getBlock(hash: string): Promise<ScryptaBlock> {
    this.scrypta.testnet = await this.isTestnet();
    this.scrypta.nodes = await this.getNodesUrl();
    this.scrypta.staticnodes = true;
    try {
      const block = await this.scrypta.get('/rawblock/' + hash);
      return {
        hash: block.data.hash,
        height: block.data.height,
        confirmations: block.data.confirmations,
        time: block.data.time,
        txs: block.data.txs,
      };
    } catch (e) {
      this.logger.error(e);
      throw new Error(`${e.message}`);
    }
  }

  //
  // ADDRESSES FUNCTIONS
  //

  /**
   * Generate new address from xpub
   * @param xpub
   * @param derivationIndex
   */
  public async generateAddress(xpub: string, derivationIndex: number) {
    try {
      return await Tatum.generateAddressFromXPub(
        Currency.LYRA,
        await this.isTestnet(),
        xpub,
        derivationIndex,
      );
    } catch (e) {
      this.logger.error(e);
      throw new Error(
        'Unable to generate address, wrong xpub and account type.',
      );
    }
  }

  public async generateWallet(mnem?: string) {
    return Tatum.generateWallet(Currency.LYRA, await this.isTestnet(), mnem);
  }

  public async generateAddressPrivateKey(
    derivationIndex: number,
    mnemonic: string,
  ): Promise<{ key: string }> {
    try {
      const privateKey = await Tatum.generatePrivateKeyFromMnemonic(
        Currency.LYRA,
        await this.isTestnet(),
        mnemonic,
        derivationIndex,
      );
      return { key: privateKey };
    } catch (e) {
      this.logger.error(e);
      throw new Error('Unable to generate address, wrong mnemonic and index.');
    }
  }

  //
  //  TRANSACTIONS FUNCTIONS
  //

  /**
   * Get all transactions by address
   * @param address
   * @param pagination
   */
  public async getTransactionsByAddress(
    address: string,
    pagination?: object,
  ): Promise<ScryptaParsedTx[]> {
    this.scrypta.testnet = await this.isTestnet();
    this.scrypta.nodes = await this.getNodesUrl();
    this.scrypta.staticnodes = true;
    try {
      const transactions = await this.scrypta.get('/transactions/' + address);
      const parsed = [];
      for (const k in transactions.data) {
        const tx = transactions.data[k];
        parsed.push({
          hash: tx.txid,
          from: tx.from,
          to: tx.to,
          value: tx.value,
          time: tx.time,
          type: tx.type,
          blockhash: tx.blockhash,
        });
      }
      return parsed;
    } catch (e) {
      this.logger.error(e);
      throw new Error(`${e.message}`);
    }
  }

  /**
   * List all unspent by address
   * @param address
   * @param pagination
   */
  public async getUnspentsByAddress(
    address: string,
    pagination?: object,
  ): Promise<ScryptaUnspent[]> {
    this.scrypta.testnet = await this.isTestnet();
    this.scrypta.nodes = await this.getNodesUrl();
    this.scrypta.staticnodes = true;
    try {
      const unspent = await this.scrypta.get('/unspent/' + address);
      const parsed = [];
      for (const k in unspent.unspent) {
        const utxo = unspent.unspent[k];
        parsed.push({
          txid: utxo.txid,
          vout: utxo.vout,
          amount: utxo.amount,
          scriptPubKey: utxo.scriptPubKey,
          block: utxo.block,
          redeemed: utxo.redeemed,
        });
      }
      return parsed;
    } catch (e) {
      this.logger.error(e);
      throw new Error(`${e.message}`);
    }
  }

  /**
   * Get single UTXO by hash and index
   * @param hash
   * @param index
   */
  public async getUTXO(hash: string, index: number): Promise<ScryptaUnspent> {
    this.scrypta.testnet = await this.isTestnet();
    this.scrypta.nodes = await this.getNodesUrl();
    this.scrypta.staticnodes = true;
    try {
      const utxo = await this.scrypta.get('/utxo/' + hash + '/' + index);
      if (utxo === false) {
        throw new Error('No such UTXO for transaction and index.');
      }
      return {
        txid: utxo.txid,
        vout: utxo.vout,
        amount: utxo.amount,
        scriptPubKey: utxo.scriptPubKey,
        block: utxo.block,
        redeemed: utxo.redeemed,
      };
    } catch (e) {
      this.logger.error(e);
      throw new Error('No such UTXO for transaction and index.');
    }
  }

  /**
   * Get raw transaction by txHash
   * @param txHash
   */
  public async getRawTransaction(txHash: string): Promise<any> {
    this.scrypta.testnet = await this.isTestnet();
    this.scrypta.nodes = await this.getNodesUrl();
    this.scrypta.staticnodes = true;
    try {
      const rawtx = await this.scrypta.get('/rawtransaction/' + txHash);
      if (rawtx === false) {
        throw new Error('No such transaction.');
      }
      return rawtx;
    } catch (e) {
      this.logger.error(e);
      throw new Error('No such transaction.');
    }
  }

  /**
   * Broadcast a signed transactions to the network
   * @param txData
   */
  public async broadcast(
    txData: string,
  ): Promise<{ txId: string; failed?: boolean }> {
    this.scrypta.testnet = await this.isTestnet();
    this.scrypta.nodes = await this.getNodesUrl();
    this.scrypta.staticnodes = true;
    try {
      const sendrawtransaction = await this.scrypta.post(
        '/sendrawtransaction',
        { rawtransaction: txData },
      );
      if (sendrawtransaction.data === null) {
        throw new Error('Transaction not accepted by network.');
      } else {
        const txid = sendrawtransaction.data as string;
        return { txId: txid, failed: false };
      }
    } catch (e) {
      this.logger.error(e);
      throw new Error("Can't send transaction.");
    }
  }

  /**
   * Send a transaction selecting utxo by address or sending them directly
   * @param fromAddress
   * @param fromUTXO
   * @param to
   */
  public async sendTransactionByAddressOrUtxo(body: TransferBtcBasedBlockchain): Promise<{ txId: string; failed?: boolean }> {
    this.scrypta.testnet = await this.isTestnet();
    this.scrypta.nodes = await this.getNodesUrl();
    this.scrypta.staticnodes = true;
    try {
      const rawtransaction = await Tatum.prepareScryptaSignedTransaction(this.scrypta.testnet, body)
      const sendrawtransaction = await this.scrypta.post(
        '/sendrawtransaction',
        { rawtransaction: rawtransaction },
      );
      if (sendrawtransaction.data === null) {
        throw new Error('Transaction not accepted by network.');
      } else {
        const txid = sendrawtransaction.data as string;
        return { txId: txid, failed: false };
      }
    } catch (e) {
      this.logger.error(e);
      throw new Error("Can't send transaction.");
    }
  }

}
