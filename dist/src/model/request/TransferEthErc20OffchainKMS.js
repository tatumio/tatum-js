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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransferEthErc20OffchainKMS = void 0;
const class_validator_1 = require("class-validator");
const BaseTransferEthErc20Offchain_1 = require("./BaseTransferEthErc20Offchain");
class TransferEthErc20OffchainKMS extends BaseTransferEthErc20Offchain_1.BaseTransferEthErc20Offchain {
}
__decorate([
    class_validator_1.ValidateIf(o => !o.mnemonic && !o.privateKey),
    class_validator_1.Length(36, 36),
    class_validator_1.IsUUID('4'),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], TransferEthErc20OffchainKMS.prototype, "signatureId", void 0);
exports.TransferEthErc20OffchainKMS = TransferEthErc20OffchainKMS;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNmZXJFdGhFcmMyME9mZmNoYWluS01TLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZGVsL3JlcXVlc3QvVHJhbnNmZXJFdGhFcmMyME9mZmNoYWluS01TLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFEQUF3RTtBQUN4RSxpRkFBNEU7QUFFNUUsTUFBYSwyQkFBNEIsU0FBUSwyREFBNEI7Q0FPNUU7QUFERztJQUpDLDRCQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDO0lBQzdDLHdCQUFNLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNkLHdCQUFNLENBQUMsR0FBRyxDQUFDO0lBQ1gsNEJBQVUsRUFBRTs7Z0VBQ2U7QUFOaEMsa0VBT0MifQ==