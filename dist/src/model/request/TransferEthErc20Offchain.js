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
exports.TransferEthErc20Offchain = void 0;
const class_validator_1 = require("class-validator");
const TransferEthOffchainValidator_1 = require("../validation/TransferEthOffchainValidator");
const BaseTransferEthErc20Offchain_1 = require("./BaseTransferEthErc20Offchain");
class TransferEthErc20Offchain extends BaseTransferEthErc20Offchain_1.BaseTransferEthErc20Offchain {
}
__decorate([
    class_validator_1.Length(1, 500),
    class_validator_1.Validate(TransferEthOffchainValidator_1.TransferEthOffchainValidator),
    class_validator_1.ValidateIf(o => (o.mnemonic && o.index >= 0 && o.privateKey) || o.index >= 0),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], TransferEthErc20Offchain.prototype, "mnemonic", void 0);
__decorate([
    class_validator_1.ValidateIf(o => (o.mnemonic && o.index >= 0 && o.privateKey) || o.mnemonic),
    class_validator_1.Validate(TransferEthOffchainValidator_1.TransferEthOffchainValidator),
    class_validator_1.Min(0),
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsInt(),
    __metadata("design:type", Number)
], TransferEthErc20Offchain.prototype, "index", void 0);
__decorate([
    class_validator_1.ValidateIf(o => (o.mnemonic && o.index >= 0 && o.privateKey) || (!o.mnemonic && !o.index)),
    class_validator_1.Validate(TransferEthOffchainValidator_1.TransferEthOffchainValidator),
    class_validator_1.Length(66, 66),
    class_validator_1.IsNotEmpty(),
    __metadata("design:type", String)
], TransferEthErc20Offchain.prototype, "privateKey", void 0);
exports.TransferEthErc20Offchain = TransferEthErc20Offchain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNmZXJFdGhFcmMyME9mZmNoYWluLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL21vZGVsL3JlcXVlc3QvVHJhbnNmZXJFdGhFcmMyME9mZmNoYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBLHFEQUFzRjtBQUN0Riw2RkFBd0Y7QUFDeEYsaUZBQTRFO0FBRTVFLE1BQWEsd0JBQXlCLFNBQVEsMkRBQTRCO0NBb0J6RTtBQWRHO0lBSkMsd0JBQU0sQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDO0lBQ2QsMEJBQVEsQ0FBQywyREFBNEIsQ0FBQztJQUN0Qyw0QkFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztJQUM3RSw0QkFBVSxFQUFFOzswREFDWTtBQU96QjtJQUxDLDRCQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDM0UsMEJBQVEsQ0FBQywyREFBNEIsQ0FBQztJQUN0QyxxQkFBRyxDQUFDLENBQUMsQ0FBQztJQUNOLDRCQUFVLEVBQUU7SUFDWix1QkFBSyxFQUFFOzt1REFDYztBQU10QjtJQUpDLDRCQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzFGLDBCQUFRLENBQUMsMkRBQTRCLENBQUM7SUFDdEMsd0JBQU0sQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ2QsNEJBQVUsRUFBRTs7NERBQ2M7QUFuQi9CLDREQW9CQyJ9