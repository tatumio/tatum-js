import {BadRequestException, Body, Get, HttpCode, HttpStatus, Param, Post} from '@nestjs/common';
import {NftService} from './NftService';
import {NftError} from './NftError';
import {
    CeloBurnErc721,
    CeloDeployErc721,
    CeloMintErc721,
    CeloMintMultipleErc721,
    CeloTransferErc721,
    EthBurnErc721,
    EthDeployErc721,
    EthMintErc721,
    EthMintMultipleErc721,
    EthTransferErc721,
} from '@tatumio/tatum';
import {PathAddressContractAddressChain} from './dto/PathAddressContractAddressChain';
import {PathTokenIdContractAddressChain} from './dto/PathTokenIdContractAddressChain';
import {PathChain} from './dto/PathChain';
import {PathChainTxId} from './dto/PathChainTxId';

export abstract class NftController {
    protected constructor(protected readonly service: NftService) {
    }

    @Get('/v3/nft/balance/:chain/:contractAddress/:address')
    public async getBalanceErc721(@Param() path: PathAddressContractAddressChain) {
        try {
            return await this.service.getTokensOfOwner(path.chain, path.address, path.contractAddress);
        } catch (e) {
            throw new NftError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'nft.error');
        }
    }

    @Get('/v3/nft/transaction/:chain/:txId')
    public async getTransaction(@Param() path: PathChainTxId) {
        try {
            return await this.service.getTransaction(path.chain, path.txId);
        } catch (e) {
            throw new NftError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'nft.error');
        }
    }

    @Get('/v3/nft/metadata/:chain/:contractAddress/:tokenId')
    public async getMetadataErc721(@Param() path: PathTokenIdContractAddressChain) {
        try {
            return await this.service.getMetadataErc721(path.chain, path.tokenId, path.contractAddress);
        } catch (e) {
            throw new NftError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'nft.error');
        }
    }

    @Post('/v3/nft/transaction')
    @HttpCode(HttpStatus.OK)
    public async transactionErc721(@Param() path: PathChain, @Body() body: CeloTransferErc721 | EthTransferErc721) {
        try {
            return await this.service.transferErc721(path.chain, body);
        } catch (e) {
            if (e.constructor.name === 'Array' || e.constructor.name === 'ValidationError') {
                throw new BadRequestException(e);
            }
            throw new NftError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'nft.error');
        }
    }

    @Post('/v3/nft/mint')
    @HttpCode(HttpStatus.OK)
    public async mintErc721(@Param() path: PathChain, @Body() body: CeloMintErc721 | EthMintErc721) {
        try {
            return await this.service.mintErc721(path.chain, body);
        } catch (e) {
            if (e.constructor.name === 'Array' || e.constructor.name === 'ValidationError') {
                throw new BadRequestException(e);
            }
            throw new NftError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'nft.error');
        }
    }

    @Post('/v3/nft/mint/batch')
    @HttpCode(HttpStatus.OK)
    public async mintMultipleErc721(@Param() path: PathChain, @Body() body: CeloMintMultipleErc721 | EthMintMultipleErc721) {
        try {
            return await this.service.mintMultipleErc721(path.chain, body);
        } catch (e) {
            if (e.constructor.name === 'Array' || e.constructor.name === 'ValidationError') {
                throw new BadRequestException(e);
            }
            throw new NftError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'nft.error');
        }
    }

    @Post('/v3/nft/burn')
    @HttpCode(HttpStatus.OK)
    public async burnErc721(@Param() path: PathChain, @Body() body: CeloBurnErc721 | EthBurnErc721) {
        try {
            return await this.service.burnErc721(path.chain, body);
        } catch (e) {
            if (e.constructor.name === 'Array' || e.constructor.name === 'ValidationError') {
                throw new BadRequestException(e);
            }
            throw new NftError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'nft.error');
        }
    }

    @Post('/v3/nft/deploy')
    @HttpCode(HttpStatus.OK)
    public async deployErc721(@Param() path: PathChain, @Body() body: CeloDeployErc721 | EthDeployErc721) {
        try {
            return await this.service.deployErc721(path.chain, body);
        } catch (e) {
            if (e.constructor.name === 'Array' || e.constructor.name === 'ValidationError') {
                throw new BadRequestException(e);
            }
            throw new NftError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'nft.error');
        }
    }
}
