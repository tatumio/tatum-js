"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScryptaController = void 0;
const common_1 = require("@nestjs/common");
const GeneratePrivateKey_1 = require("./dto/GeneratePrivateKey");
const PathXpubI_1 = require("./dto/PathXpubI");
const PathI_1 = require("./dto/PathI");
const PathHash_1 = require("./dto/PathHash");
const PathAddress_1 = require("./dto/PathAddress");
const PathHashI_1 = require("./dto/PathHashI");
class ScryptaController {
    constructor(scrypta) {
        this.scrypta = scrypta;
    }
    async getInfo() {
        return await this.scrypta.getBlockChainInfo();
    }
    async generateWallet() {
        return this.scrypta.generateWallet();
    }
    async generateWalletPrivKey(body) {
        return await this.scrypta.generateAddressPrivateKey(body.index, body.mnemonic);
    }
    async generateAddress(param) {
        return await this.scrypta.generateAddress(param.xpub, param.i);
    }
    async getBlockHash(param) {
        return await this.scrypta.getBlockHash(param.i);
    }
    async getBlock(param) {
        if (param.hash.length === 64) {
            return await this.scrypta.getBlock(param.hash);
        }
        else {
            const hash = await this.scrypta.getBlockHash(parseInt(param.hash, 10));
            return await this.scrypta.getBlock(hash);
        }
    }
    async getTransactionbyHash(param) {
        return await this.scrypta.getRawTransaction(param.hash);
    }
    async getTransactionsByAddress(param) {
        return await this.scrypta.getTransactionsByAddress(param.address);
    }
    async getUnspentsByAddress(param) {
        return await this.scrypta.getUnspentsByAddress(param.address);
    }
    async getUTXO(param) {
        return await this.scrypta.getUTXO(param.hash, param.i);
    }
    async broadcast(body) {
        if (body.txData !== undefined) {
            return await this.scrypta.broadcast(body.txData);
        }
        else {
            return { message: "txData parameter can't be empty", failed: true };
        }
    }
}
__decorate([
    common_1.Get('/info'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScryptaController.prototype, "getInfo", null);
__decorate([
    common_1.Get('/wallet'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ScryptaController.prototype, "generateWallet", null);
__decorate([
    common_1.Post('/wallet/priv'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [GeneratePrivateKey_1.GeneratePrivateKey]),
    __metadata("design:returntype", Promise)
], ScryptaController.prototype, "generateWalletPrivKey", null);
__decorate([
    common_1.Get('/address/:xpub/:i'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PathXpubI_1.PathXpubI]),
    __metadata("design:returntype", Promise)
], ScryptaController.prototype, "generateAddress", null);
__decorate([
    common_1.Get('/block/hash/:i'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PathI_1.PathI]),
    __metadata("design:returntype", Promise)
], ScryptaController.prototype, "getBlockHash", null);
__decorate([
    common_1.Get('/block/:hash'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PathHash_1.PathHash]),
    __metadata("design:returntype", Promise)
], ScryptaController.prototype, "getBlock", null);
__decorate([
    common_1.Get('/transaction/:hash'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PathHash_1.PathHash]),
    __metadata("design:returntype", Promise)
], ScryptaController.prototype, "getTransactionbyHash", null);
__decorate([
    common_1.Get('/transaction/address/:address'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PathAddress_1.PathAddress]),
    __metadata("design:returntype", Promise)
], ScryptaController.prototype, "getTransactionsByAddress", null);
__decorate([
    common_1.Get('/utxo/:address'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PathAddress_1.PathAddress]),
    __metadata("design:returntype", Promise)
], ScryptaController.prototype, "getUnspentsByAddress", null);
__decorate([
    common_1.Get('/utxo/:hash/:i'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PathHashI_1.PathHashI]),
    __metadata("design:returntype", Promise)
], ScryptaController.prototype, "getUTXO", null);
__decorate([
    common_1.Post('/broadcast'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ScryptaController.prototype, "broadcast", null);
exports.ScryptaController = ScryptaController;
