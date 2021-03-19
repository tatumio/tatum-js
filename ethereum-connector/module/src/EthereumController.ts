import {
  Body,
  Get, HttpCode, HttpStatus,
  Param,  Post,
  Query,
} from '@nestjs/common';
import { EthereumService } from './EthereumService';
import { QueryMnemonic } from './dto/QueryMnemonic'
import { GeneratePrivateKey } from './dto/GeneratePrivateKey'
import { PathXpubI } from './dto/PathXpubI'
import {
  BroadcastTx,
  DeployEthErc20,
  EstimateGasEth, EthBurnErc721, EthDeployErc721,
  EthMintErc721, EthMintMultipleErc721, EthTransferErc721, SmartContractMethodInvocation,
  TransferCustomErc20,
  TransferEthErc20,
} from '@tatumio/tatum'
import { PathAddress } from './dto/PathAddress'
import { QueryCurrencyContractAddress } from './dto/QueryCurrencyContractAddress'
import { PathHash } from './dto/PathHash'
import { Pagination } from './dto/Pagination'
import { PathAddressContractAddress } from './dto/PathAddressContractAddress'
import { PathTokenContractAddress } from './dto/PathTokenContractAddress'
import { PathAddressContractAddressI } from './dto/PathAddressContractAddressI'
import { EthereumError } from './EthereumError'

export abstract class EthereumController {
  protected constructor(protected readonly service: EthereumService) {
  }

  @Post('v3/ethereum/web3/:xApiKey')
  @HttpCode(HttpStatus.OK)
  public async web3Driver(@Body() body: any) {
    try {
      return await this.service.web3Method(body);
    } catch (e) {
      throw new EthereumError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'ethereum.error');
    }
  }

  @Get('v3/ethereum/wallet')
  @HttpCode(HttpStatus.OK)
  async generateWallet(@Query() { mnemonic }: QueryMnemonic) {
    try {
      return await this.service.generateWallet(mnemonic)
    } catch (e) {
      throw new EthereumError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'ethereum.error');
    }
  }

  @Post('v3/ethereum/wallet/priv')
  @HttpCode(HttpStatus.OK)
  async generatePrivateKey(@Body() { mnemonic, index }: GeneratePrivateKey) {
    try {
      return await this.service.generatePrivateKey(mnemonic, index)
    } catch (e) {
      throw new EthereumError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'ethereum.error');
    }
  }

  @Post('v3/ethereum/transaction')
  @HttpCode(HttpStatus.OK)
  public async sendEthOrErc20Transaction(@Body() body: TransferEthErc20) {
    try {
      return await this.service.sendEthOrErc20Transaction(body);
    } catch (e) {
      throw new EthereumError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'ethereum.error');
    }
  }

  @Post('v3/ethereum/gas')
  @HttpCode(HttpStatus.OK)
  public async estimateGas(@Body() body: EstimateGasEth) {
    try {
      return await this.service.estimateGas(body);
    } catch (e) {
      throw new EthereumError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'ethereum.error');
    }
  }

  @Get('v3/ethereum/transaction/count/:address')
  @HttpCode(HttpStatus.OK)
  public async countTransactions(@Param() param: PathAddress) {
    try {
      return await this.service.getTransactionCount(param.address);
    } catch (e) {
      throw new EthereumError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'ethereum.error');
    }
  }

  @Post('v3/ethereum/smartcontract')
  @HttpCode(HttpStatus.OK)
  public async invokeSmartContractMethod(@Body() body: SmartContractMethodInvocation) {
    try {
      return await this.service.invokeSmartContractMethod(body);
    } catch (e) {
      throw new EthereumError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'ethereum.error');
    }
  }

  @Post('v3/ethereum/erc20/transaction')
  @HttpCode(HttpStatus.OK)
  public async transferErc20Blockchain(@Body() body: TransferCustomErc20) {
    try {
      return await this.service.sendCustomErc20Transaction(body);
    } catch (e) {
      throw new EthereumError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'ethereum.error');
    }
  }

  @Post('v3/ethereum/erc20/deploy')
  @HttpCode(HttpStatus.OK)
  public async deployErc20(@Body() body: DeployEthErc20) {
    try {
      return await await this.service.deployErc20Blockchain(body);
    } catch (e) {
      throw new EthereumError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'ethereum.error');
    }
  }

  @Get('v3/ethereum/erc721/balance/:address/:contractAddress')
  @HttpCode(HttpStatus.OK)
  public async getBalanceErc721(@Param() path: PathAddressContractAddress) {
    try {
      return await this.service.getBalanceErc721(path.address, path.contractAddress);
    } catch (e) {
      throw new EthereumError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'ethereum.error');
    }
  }

  @Get('v3/ethereum/erc721/owner/:token/:contractAddress')
  @HttpCode(HttpStatus.OK)
  public async getOwnerErc721(@Param() path: PathTokenContractAddress) {
    try {
      return await this.service.getOwnerErc721(path.token, path.contractAddress);
    } catch (e) {
      throw new EthereumError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'ethereum.error');
    }
  }

  @Get('v3/ethereum/erc721/token/:address/:contractAddress')
  @HttpCode(HttpStatus.OK)
  public async getTokensByAddress(@Param() path: PathAddressContractAddress) {
    try {
      return await this.service.getTokensOfOwner(path.address, path.contractAddress);
    } catch (e) {
      throw new EthereumError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'ethereum.error');
    }
  }

  @Get('v3/ethereum/erc721/metadata/:token/:contractAddress')
  @HttpCode(HttpStatus.OK)
  public async getMetadataErc721(@Param() path: PathTokenContractAddress) {
    try {
      return await this.service.getMetadataErc721(path.token, path.contractAddress);
    } catch (e) {
      throw new EthereumError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'ethereum.error');
    }
  }

  @Get('v3/ethereum/erc721/token/:address/:i/:contractAddress')
  @HttpCode(HttpStatus.OK)
  public async getTokenErc721(@Param() path: PathAddressContractAddressI) {
    try {
      return await this.service.getTokenErc721(path.address, path.i, path.contractAddress);
    } catch (e) {
      throw new EthereumError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'ethereum.error');
    }
  }

  @Post('v3/ethereum/erc721/transaction')
  @HttpCode(HttpStatus.OK)
  public async transactionErc721(@Body() body: EthTransferErc721) {
    try {
      return await this.service.transferErc721(body);
    } catch (e) {
      throw new EthereumError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'ethereum.error');
    }
  }

  @Post('v3/ethereum/erc721/mint')
  @HttpCode(HttpStatus.OK)
  public async mintErc721(@Body() body: EthMintErc721) {
    try {
      return await this.service.mintErc721(body);
    } catch (e) {
      throw new EthereumError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'ethereum.error');
    }
  }

  // Fails with return awaited error: execution reverted
  @Post('v3/ethereum/erc721/mint/batch')
  @HttpCode(HttpStatus.OK)
  public async mintMultipleErc721(@Body() body: EthMintMultipleErc721) {
    try {
      return await this.service.mintMultipleErc721(body);
    } catch (e) {
      throw new EthereumError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'ethereum.error');
    }
  }

  @Post('v3/ethereum/erc721/burn')
  @HttpCode(HttpStatus.OK)
  public async burnErc721(@Body() body: EthBurnErc721) {
    try {
      return await this.service.burnErc721(body);
    } catch (e) {
      throw new EthereumError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'ethereum.error');
    }
  }

  @Post('v3/ethereum/erc721/deploy')
  @HttpCode(HttpStatus.OK)
  public async deployErc721(@Body() body: EthDeployErc721) {
    try {
      return await this.service.deployErc721(body);
    } catch (e) {
      throw new EthereumError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'ethereum.error');
    }
  }

  @Post('v3/ethereum/broadcast')
  @HttpCode(HttpStatus.OK)
  public async broadcast(@Body() body: BroadcastTx) {
    try {
      return await this.service.broadcast(body.txData, body.signatureId);
    } catch (e) {
      throw new EthereumError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'ethereum.error');
    }
  }

  @Get('v3/ethereum/block/current')
  @HttpCode(HttpStatus.OK)
  public async getCurrentBlock() {
    try {
      return await this.service.getCurrentBlock();
    } catch (e) {
      throw new EthereumError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'ethereum.error');
    }
  }

  @Get('v3/ethereum/block/:hash')
  @HttpCode(HttpStatus.OK)
  public async getBlock(@Param() path: PathHash) {
    try {
      return await this.service.getBlock(path.hash);
    } catch (e) {
      throw new EthereumError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'ethereum.error');
    }
  }

  @Get('v3/ethereum/account/balance/:address')
  @HttpCode(HttpStatus.OK)
  public async getAccountBalance(@Param() path: PathAddress) {
    try {
      return await this.service.getBalance(path.address);
    } catch (e) {
      throw new EthereumError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'ethereum.error');
    }
  }

  @Get('v3/ethereum/account/transaction/:address')
  @HttpCode(HttpStatus.OK)
  public async getTransactionsByAddress(@Param() path: PathAddress, @Query() query: Pagination) {
    try {
      return await this.service.getTransactionsByAddress(path.address, query);
    } catch (e) {
      throw new EthereumError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'ethereum.error');
    }
  }

  @Get('v3/ethereum/account/transaction/erc20/internal/:address')
  @HttpCode(HttpStatus.OK)
  public async getAccountErc20InternalTransactions(@Param() path: PathAddress, @Query() query: Pagination) {
    try {
      return await this.service.getErc20InternalTransactionsByAddress(path.address, query);
    } catch (e) {
      throw new EthereumError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'ethereum.error');
    }
  }

  @Get('v3/ethereum/account/balance/erc20/:address')
  @HttpCode(HttpStatus.OK)
  public async getErc20Balance(@Param() path: PathAddress, @Query() query: QueryCurrencyContractAddress) {
    try {
      return await this.service.getErc20Balance(path.address, query.currency, query.contractAddress);
    } catch (e) {
      throw new EthereumError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'ethereum.error');
    }
  }

  @Get('v3/ethereum/address/:xpub/:i')
  @HttpCode(HttpStatus.OK)
  public async generateAddress(@Param() { xpub, i }: PathXpubI) {
    try {
      return await this.service.generateAddress(xpub, i);
    } catch (e) {
      throw new EthereumError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'ethereum.error');
    }
  }

  @Get('v3/ethereum/transaction/:hash')
  public async getTransaction(@Param() path: PathHash) {
    try {
      return await this.service.getTransaction(path.hash);
    } catch (e) {
      throw new EthereumError(`Unexpected error occurred. Reason: ${e.message || e.response?.data || e}`, 'ethereum.error');
    }
  }
}
