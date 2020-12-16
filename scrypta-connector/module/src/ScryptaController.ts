import { Body, Get, Param, Post, Request } from '@nestjs/common';
import { ScryptaBlockchainService } from './ScryptaBlockchainService';
import { GeneratePrivateKey } from './dto/GeneratePrivateKey';
import { PathXpubI } from './dto/PathXpubI';
import { PathI } from './dto/PathI';
import { PathHash } from './dto/PathHash';
import { PathAddress } from './dto/PathAddress';
import { PathHashI } from './dto/PathHashI';

export abstract class ScryptaController {
  protected constructor(protected readonly scrypta: ScryptaBlockchainService) {}

  // GENERAL ENDPOINTS
  @Get('/v3/scrypta/info')
  async getInfo() {
    return await this.scrypta.getBlockChainInfo();
  }

  // WALLET ENDPOINTS
  @Get('/v3/scrypta/wallet')
  async generateWallet() {
    return this.scrypta.generateWallet();
  }

  @Post('/v3/scrypta/wallet/priv')
  async generateWalletPrivKey(@Body() body: GeneratePrivateKey) {
    return await this.scrypta.generateAddressPrivateKey(
      body.index,
      body.mnemonic,
    );
  }

  @Get('/v3/scrypta/address/:xpub/:i')
  async generateAddress(@Param() param: PathXpubI) {
    return await this.scrypta.generateAddress(param.xpub, param.i);
  }

  // BLOCKCHAIN ENDPOINTS

  @Get('/v3/scrypta/block/hash/:i')
  async getBlockHash(@Param() param: PathI) {
    return await this.scrypta.getBlockHash(param.i);
  }

  @Get('/v3/scrypta/block/:hash')
  async getBlock(@Param() param: PathHash) {
    if (param.hash.length === 64) {
      return await this.scrypta.getBlock(param.hash);
    } else {
      const hash = await this.scrypta.getBlockHash(parseInt(param.hash, 10));
      return await this.scrypta.getBlock(hash);
    }
  }

  // TRANSACTIONS ENDPOINT

  @Get('/v3/scrypta/transaction/:hash')
  async getTransactionbyHash(@Param() param: PathHash) {
    return await this.scrypta.getRawTransaction(param.hash);
  }

  @Get('/v3/scrypta/transaction/address/:address')
  async getTransactionsByAddress(@Param() param: PathAddress) {
    return await this.scrypta.getTransactionsByAddress(param.address);
  }

  // UTXO ENDPOINT

  @Get('/v3/scrypta/utxo/:address')
  async getUnspentsByAddress(@Param() param: PathAddress) {
    return await this.scrypta.getUnspentsByAddress(param.address);
  }

  @Get('/v3/scrypta/utxo/:hash/:i')
  async getUTXO(@Param() param: PathHashI) {
    return await this.scrypta.getUTXO(param.hash, param.i);
  }

  // TRANSACTION SIGNING AND BROADCASTING (WIP)
}
