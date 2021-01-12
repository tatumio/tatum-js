import {Body, Get, HttpCode, HttpStatus, Param, Post, Query} from '@nestjs/common';
import {TronBlockchainService} from './TronBlockchainService';
import {BroadcastTx, TransferTron} from '@tatumio/tatum';
import {PathAddress} from './dto/PathAddress';
import {PathTxId} from './dto/PathTxId';
import {TronError} from './TronError';

export abstract class TronController {
    protected constructor(protected readonly service: TronBlockchainService) {
    }

    @Post('/v3/tron/broadcast')
    @HttpCode(HttpStatus.OK)
    async broadcast(@Body() body: BroadcastTx) {
        try {
            return await this.service.broadcast(body.txData, body.signatureId);
        } catch (e) {
            throw new TronError(`Unexpected error occurred. Reason: ${e.message || e.response?.data}`, 'tron.error');
        }
    }

    @Get('v3/tron/account')
    async generateAccount() {
        try {
            return await this.service.generateWallet();
        } catch (e) {
            throw new TronError(`Unexpected error occurred. Reason: ${e.message || e.response?.data}`, 'tron.error');
        }
    }

    @Get('/v3/tron/info')
    async getInfo() {
        try {
            return await this.service.getBlockChainInfo();
        } catch (e) {
            throw new TronError(`Unexpected error occurred. Reason: ${e.message || e.response?.data}`, 'tron.error');
        }
    }

    @Get('/v3/tron/block/:hashOrHeight')
    async getBlock(@Param('hashOrHeight') hashOrHeight: string) {
        try {
            return await this.service.getBlock(hashOrHeight);
        } catch (e) {
            throw new TronError(`Unexpected error occurred. Reason: ${e.message || e.response?.data}`, 'tron.error');
        }
    }

    @Get('/v3/tron/account/:address')
    async getAccount(@Param() path: PathAddress) {
        try {
            return await this.service.getAccount(path.address);
        } catch (e) {
            throw new TronError(`Unexpected error occurred. Reason: ${e.message}` || e.response?.data, 'tron.error');
        }
    }

    @Get('/v3/tron/transaction/:txId')
    async getTransaction(@Param() path: PathTxId) {
        try {
            return await this.service.getTransaction(path.txId);
        } catch (e) {
            throw new TronError(`Unexpected error occurred. Reason: ${e.message || e.response?.data}`, 'tron.error');
        }
    }

    @Get('/v3/tron/transaction/account/:address')
    async getTransactionsByAccount(@Param() path: PathAddress, @Query('next') next?: string) {
        try {
            return await this.service.getTransactionsByAccount(path.address, next);
        } catch (e) {
            throw new TronError(`Unexpected error occurred. Reason: ${e.message || e.response?.data}`, 'tron.error');
        }
    }

    @Post('/v3/tron/transaction')
    @HttpCode(HttpStatus.OK)
    async sendTransaction(@Body() body: TransferTron) {
        try {
            return await this.service.sendTransaction(body);
        } catch (e) {
            throw new TronError(`Unexpected error occurred. Reason: ${e.message || e.response?.data}`, 'tron.error');
        }
    }
}
