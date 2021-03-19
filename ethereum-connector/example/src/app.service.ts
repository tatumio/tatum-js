import { Injectable } from '@nestjs/common';
import { PinoLogger } from 'pino-logger';
import { InjectPinoLogger } from 'nestjs-pino';
import { EthereumService } from '../../module';
import { EthBlock, Transaction } from '@tatumio/tatum';
import { TransactionReceipt } from 'web3-core';
import { Pagination } from '../../module/npm/dto/Pagination';

@Injectable()
export class AppService extends EthereumService {
  constructor(@InjectPinoLogger(AppService.name) logger: PinoLogger) {
    super(logger);
  }
  protected getNodesUrl(testnet: boolean): Promise<string[]> {
    return Promise.resolve([
      'https://ropsten.infura.io/v3/ab6162e91013410aa46123ef71b67da3',
    ]);
  }

  protected isTestnet(): Promise<boolean> {
    return Promise.resolve(true);
  }

  protected async storeKMSTransaction(
    txData: string,
    currency: string,
    signatureId: string[],
  ): Promise<string> {
    this.logger.info(txData);
    return txData;
  }

  protected completeKMSTransaction(
    txId: string,
    signatureId: string,
  ): Promise<void> {
    this.logger.info(txId);
    return Promise.resolve();
  }

  public getCurrentBlock(testnet?: boolean): Promise<number> {
    return Promise.resolve(0);
  }

  public checkInternalTransaction(
    txId: string,
    testnet: boolean,
  ): Promise<Array<{ address: string; value: string }>> {
    return Promise.resolve(undefined);
  }

  public getBlock(hash: string | number, testnet?: boolean): Promise<EthBlock> {
    return Promise.resolve(undefined);
  }

  public getTransaction(
    hash: string,
    testnet?: boolean,
  ): Promise<Transaction & TransactionReceipt> {
    return Promise.resolve(undefined);
  }

  public getTransactionsByAddress(
    address: string,
    pagination: Pagination,
  ): Promise<any[]> {
    return Promise.resolve([]);
  }

  public completeWebhookTransaction(withdrawalId: string): Promise<void> {
    return Promise.resolve();
  }
}
