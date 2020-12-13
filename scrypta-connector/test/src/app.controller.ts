import { Controller, Get, Request, Post } from '@nestjs/common';
import { ScryptaBlockchainService } from '@scrypta/tatum'
const blockchain = 'scrypta'
@Controller()
export class AppController {
  scrypta: any
  testnet: boolean = false
  constructor() {
    this.scrypta = new ScryptaBlockchainService(this.testnet, ["http://localhost:3001"], true)
  }

  // GENERAL ENDPOINTS
  @Get('/v3/' + blockchain + '/info')
  async getInfo(): Promise<object> {
    return await this.scrypta.getBlockChainInfo(this.testnet)
  }

  // WALLET ENDPOINTS
  @Get('/v3/' + blockchain + '/wallet')
  async generateWallet(): Promise<object> {
    return await this.scrypta.generateWallet()
  }

  @Post('/v3/' + blockchain + '/wallet/priv')
  async generateWalletPrivKey(@Request() req): Promise<object> {
    if (req.body.mnemonic !== undefined && req.body.index !== undefined) {
      return await this.scrypta.generateAddressPrivateKey(req.body.index, req.body.mnemonic, this.testnet)
    } else {
      return {
        message: "Error, `mnemonic` and `index` are required."
      }
    }
  }

  @Get('/v3/' + blockchain + '/address/:xpub/:index')
  async generateAddress(@Request() req): Promise<object> {
    return await this.scrypta.generateAddress(req.params.xpub, req.params.index, this.testnet)
  }

  // BLOCKCHAIN ENDPOINTS

  @Get('/v3/' + blockchain + '/block/hash/:i')
  async getBlockHash(@Request() req): Promise<object> {
    return await this.scrypta.getBlockHash(req.params.i, this.testnet)
  }

  @Get('/v3/' + blockchain + '/block/:hash')
  async getBlock(@Request() req): Promise<object> {
    if(req.params.hash.length === 64){
      return await this.scrypta.getBlock(req.params.hash, this.testnet)
    }else{
      let hash = await this.scrypta.getBlockHash(req.params.hash, this.testnet)
      return await this.scrypta.getBlock(hash, this.testnet)
    }
  }

  // TRANSACTIONS ENDPOINT

  @Get('/v3/' + blockchain + '/transaction/:hash')
  async getTransactionbyHash(@Request() req): Promise<object> {
    return await this.scrypta.getRawTransaction(req.params.hash, this.testnet)
  }

  @Get('/v3/' + blockchain + '/transaction/address/:address')
  async getTransactionsByAddress(@Request() req): Promise<object> {
    return await this.scrypta.getTransactionsByAddress(req.params.address, this.testnet)
  }

  // UTXO ENDPOINT

  @Get('/v3/' + blockchain + '/utxo/:address')
  async getUnspentsByAddress(@Request() req): Promise<object> {
    return await this.scrypta.getUnspentsByAddress(req.params.address, this.testnet)
  }


  @Get('/v3/' + blockchain + '/utxo/:hash/:index')
  async getUTXO(@Request() req): Promise<object> {
    return await this.scrypta.getUTXO(req.params.hash, req.params.index, this.testnet)
  }

  // TRANSACTION SIGNING AND BROADCASTING (WIP)

}
