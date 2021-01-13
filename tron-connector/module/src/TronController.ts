import {Body, Get, HttpCode, HttpStatus, Param, Post, Query} from '@nestjs/common';
import {TronBlockchainService} from './TronBlockchainService';
import {BroadcastTx, TransferTron, FreezeTron, TransferTronTrc10,TransferTronTrc20, CreateTronTrc10, CreateTronTrc20} from '@tatumio/tatum';
import {PathAddress} from './dto/PathAddress';
import {PathTxId} from './dto/PathTxId';
import {TronError} from './TronError';
import {PathTokenId} from './dto/PathTokenId';

export abstract class TronController {
    protected constructor(protected readonly service: TronBlockchainService) {
    }

    @Post('/v3/tron/broadcast')
    @HttpCode(HttpStatus.OK)
    async broadcast(@Body() body: BroadcastTx) {
        try {
            return await this.service.broadcast(body.txData, body.signatureId);
        } catch (e) {
            throw new TronError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'tron.error');
        }
    }

    @Get('v3/tron/account')
    async generateAccount() {
        try {
            return await this.service.generateWallet();
        } catch (e) {
            throw new TronError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'tron.error');
        }
    }

    @Get('/v3/tron/info')
    async getInfo() {
        try {
            return await this.service.getBlockChainInfo();
        } catch (e) {
            throw new TronError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'tron.error');
        }
    }

    @Get('/v3/tron/block/:hashOrHeight')
    async getBlock(@Param('hashOrHeight') hashOrHeight: string) {
        try {
            return await this.service.getBlock(hashOrHeight);
        } catch (e) {
            throw new TronError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'tron.error');
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
            throw new TronError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'tron.error');
        }
    }

    @Get('/v3/tron/transaction/account/:address')
    async getTransactionsByAccount(@Param() path: PathAddress, @Query('next') next?: string) {
        try {
            return await this.service.getTransactionsByAccount(path.address, next);
        } catch (e) {
            throw new TronError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'tron.error');
        }
    }

    @Post('/v3/tron/transaction')
    @HttpCode(HttpStatus.OK)
    async sendTransaction(@Body() body: TransferTron) {
        try {
            return await this.service.sendTransaction(body);
        } catch (e) {
            throw new TronError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'tron.error');
        }
    }

    @Post('/v3/tron/freezeBalance')
    @HttpCode(HttpStatus.OK)
    async freezeBalance(@Body() body: FreezeTron) {
        try {
            return await this.service.freezeBalance(body);
        } catch (e) {
            throw new TronError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'tron.error');
        }
    }

    @Get('/v3/tron/trc10/detail/:id')
    async getTrc10Detail(@Param() path: PathTokenId) {
        try {
            return await this.service.getTrc10Detail(path.id);
        } catch (e) {
            throw new TronError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'tron.error');
        }
    }

    @Post('/v3/tron/trc10/transaction')
    @HttpCode(HttpStatus.OK)
    async sendTrc10Transaction(@Body() body: TransferTronTrc10) {
        try {
            return await this.service.sendTrc10Transaction(body);
        } catch (e) {
            throw new TronError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'tron.error');
        }
    }

    @Post('/v3/tron/trc10/deploy')
    @HttpCode(HttpStatus.OK)
    async createTrc10(@Body() body: CreateTronTrc10) {
        try {
            return await this.service.createTrc10Transaction(body);
        } catch (e) {
            throw new TronError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'tron.error');
        }
    }

    @Post('/v3/tron/trc20/deploy')
    @HttpCode(HttpStatus.OK)
    async createTrc20(@Body() body: CreateTronTrc20) {
        try {
            return await this.service.createTrc20Transaction(body);
        } catch (e) {
            throw new TronError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'tron.error');
        }
    }

    @Post('/v3/tron/trc20/transaction')
    @HttpCode(HttpStatus.OK)
    async sendTrc20Transaction(@Body() body: TransferTronTrc20) {
        try {
            return await this.service.sendTrc20Transaction(body);
        } catch (e) {
            throw new TronError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'tron.error');
        }
    }
}
