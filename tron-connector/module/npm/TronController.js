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
exports.TronController = void 0;
const common_1 = require("@nestjs/common");
const tatum_1 = require("@tatumio/tatum");
const PathAddress_1 = require("./dto/PathAddress");
const PathTxId_1 = require("./dto/PathTxId");
class TronController {
    constructor(service) {
        this.service = service;
    }
    async broadcast(body) {
        return await this.service.broadcast(body.txData, body.signatureId);
    }
    async generateAccount() {
        return this.service.generateWallet();
    }
    async getInfo() {
        return await this.service.getBlockChainInfo();
    }
    async getBlock(hashOrHeight) {
        return await this.service.getBlock(hashOrHeight);
    }
    async getAccount(path) {
        return await this.service.getAccount(path.address);
    }
    async getTransaction(path) {
        return await this.service.getTransaction(path.txId);
    }
    async getTransactionsByAccount(path, next) {
        return await this.service.getTransactionsByAccount(path.address, next);
    }
    async sendTransaction(body) {
        return this.service.sendTransaction(body);
    }
}
__decorate([
    common_1.Post('/v3/tron/broadcast'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tatum_1.BroadcastTx]),
    __metadata("design:returntype", Promise)
], TronController.prototype, "broadcast", null);
__decorate([
    common_1.Get('v3/tron/account'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TronController.prototype, "generateAccount", null);
__decorate([
    common_1.Get('/v3/tron/info'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TronController.prototype, "getInfo", null);
__decorate([
    common_1.Get('/v3/tron/block/:hashOrHeight'),
    __param(0, common_1.Param('hashOrHeight')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TronController.prototype, "getBlock", null);
__decorate([
    common_1.Get('/v3/tron/account/:address'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PathAddress_1.PathAddress]),
    __metadata("design:returntype", Promise)
], TronController.prototype, "getAccount", null);
__decorate([
    common_1.Get('/v3/tron/transaction/:txId'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PathTxId_1.PathTxId]),
    __metadata("design:returntype", Promise)
], TronController.prototype, "getTransaction", null);
__decorate([
    common_1.Get('/v3/tron/transaction/account/:address'),
    __param(0, common_1.Param()), __param(1, common_1.Query('next')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [PathAddress_1.PathAddress, String]),
    __metadata("design:returntype", Promise)
], TronController.prototype, "getTransactionsByAccount", null);
__decorate([
    common_1.Post('/v3/tron/transaction'),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [tatum_1.TransferTron]),
    __metadata("design:returntype", Promise)
], TronController.prototype, "sendTransaction", null);
exports.TronController = TronController;
