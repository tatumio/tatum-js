import {Body, Get, Param, Post, Query} from '@nestjs/common';
import {TronBlockchainService} from './TronBlockchainService';
import {BroadcastTx, TransferTron} from '@tatumio/tatum';
import {PathAddress} from './dto/PathAddress';
import {PathTxId} from './dto/PathTxId';

export abstract class TronController {
  protected constructor(protected readonly service: TronBlockchainService) {}

  @Post('/v3/tron/broadcast')
  async broadcast(@Body() body: BroadcastTx) {
    return await this.service.broadcast(body.txData, body.signatureId);
  }

  @Get('v3/tron/account')
  async generateAccount() {
    return this.service.generateWallet();
  }

  @Get('/v3/tron/info')
  async getInfo() {
    return await this.service.getBlockChainInfo();
  }

  @Get('/v3/tron/block/:hashOrHeight')
  async getBlock(@Param('hashOrHeight') hashOrHeight: string) {
    return await this.service.getBlock(hashOrHeight);
  }

  @Get('/v3/tron/account/:address')
  async getAccount(@Param() path: PathAddress) {
    return await this.service.getAccount(path.address);
  }

  @Get('/v3/tron/transaction/:txId')
  async getTransaction(@Param() path: PathTxId) {
    return await this.service.getTransaction(path.txId);
  }

  @Get('/v3/tron/transaction/account/:address')
  async getTransactionsByAccount(@Param() path: PathAddress, @Query('next') next?: string) {
    return await this.service.getTransactionsByAccount(path.address, next);
  }

  @Post('/v3/tron/transaction')
  async sendTransaction(@Body() body: TransferTron) {
    return this.service.sendTransaction(body);
  }
}
